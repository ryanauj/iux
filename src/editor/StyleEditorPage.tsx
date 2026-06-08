// ABOUTME: Page for creating and editing custom palette patterns: lets users clone a built-in palette, tweak token knobs (colors, radius, spacing, fonts, motion), preview changes live in a PreviewSampler, and save/share/delete the result; URL params drive initial state and are kept in sync as the user edits.

import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../components/AppShell/navLinks'
import { useNavLayout } from '../components/AppShell/navLayouts'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Select } from '../components/Select/Select'
import { Slider } from '../components/Slider/Slider'
import { buildPaletteField, useSelectedStyle } from '../lib/persistedStyle'
import {
  baseOf,
  buildWorkingPalette,
  deleteAtPath,
  getAtPath,
  resolveStyle,
  setAtPath,
  uniqueCustomId,
  useCustomPatterns,
  type CustomPatternId,
  type TokenOverrides,
} from '../lib/customPatterns'
import { useGroups } from '../lib/paletteTags'
import { encodePattern, decodePattern } from '../lib/patternCodec'
import { applyPickedHex, toPickerHex } from '../lib/color'
import { useHashLocation, replaceParams } from '../apps/router'
import {
  KNOBS,
  KNOB_GROUPS,
  LENGTH_UNITS,
  FONT_FAMILY_OPTIONS,
  type Knob,
} from './knobRegistry'
import './style-editor.css'

// ABOUTME: Select options list for the "Clone of" built-in palette dropdown, mapping every palette id to a "Name (engine)" label.
const BASE_OPTIONS = (Object.keys(palettes) as PaletteId[]).map(id => ({
  value: id,
  label: `${palettes[id].name} (${palettes[id].engine})`,
}))

// ABOUTME: Local editor state: the built-in base palette, the pattern name, the sparse token overrides, and the id of the pattern being edited in place (null for a new clone).
interface WorkingState {
  base: PaletteId
  name: string
  overrides: TokenOverrides
  /** The custom pattern being edited in place, or `null` for a fresh clone. */
  editingId: CustomPatternId | null
}

// ABOUTME: Derive the editor's initial WorkingState from URL params and the selected style: prefers ?edit= (edit in place) over ?palette= (shared token clone) over the current selected style (silent clone).
/**
 * Derive the editor's starting state from the URL and the selected style:
 *   1. `?edit=custom:slug` — edit an existing custom pattern in place.
 *   2. `?palette=<token>` — clone from a shared/encoded pattern.
 *   3. otherwise — clone the currently selected style (a custom pattern's
 *      overrides carry over; a built-in starts with an empty override set).
 */
function deriveInitial(
  editParam: string | null,
  paletteParam: string | null,
  patterns: Record<string, { name: string; base: PaletteId; overrides: TokenOverrides }>,
  selectedStyle: string,
): WorkingState {
  if (editParam && patterns[editParam]) {
    const rec = patterns[editParam]
    return { base: rec.base, name: rec.name, overrides: rec.overrides, editingId: editParam as CustomPatternId }
  }
  if (paletteParam) {
    const decoded = decodePattern(paletteParam)
    if (decoded?.kind === 'custom') {
      const { base, name, overrides } = decoded.share
      return { base, name, overrides, editingId: null }
    }
  }
  const selectedCustom = patterns[selectedStyle]
  const base = baseOf(selectedStyle)
  if (selectedCustom) {
    return { base, name: `${selectedCustom.name} copy`, overrides: selectedCustom.overrides, editingId: null }
  }
  return { base, name: `${palettes[base].name} copy`, overrides: {}, editingId: null }
}

// ABOUTME: Root component of the style editor: derives initial working state from URL params (?edit= to edit in place, ?palette= to clone a shared token), renders KNOB_GROUPS as fieldsets of KnobControl rows, and shows a live PreviewSampler in the right panel; save/save-as-new/share/delete actions persist to the custom patterns store via useCustomPatterns.
export function StyleEditorPage() {
  const location = useHashLocation()
  const editParam = location.params.get('edit')
  const paletteParam = location.params.get('palette')

  const [patterns, setPatterns] = useCustomPatterns()
  const [, groupsApi] = useGroups()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()
  const [navLayout] = useNavLayout()
  const [controlsStyle, setControlsStyle] = useControlsStyle()

  // Seed once from the URL / selected style. Subsequent edits live in local
  // state; the URL is updated explicitly on save.
  const initial = useMemo(
    () => deriveInitial(editParam, paletteParam, patterns, selectedStyle),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const [base, setBase] = useState<PaletteId>(initial.base)
  const [name, setName] = useState(initial.name)
  const [overrides, setOverrides] = useState<TokenOverrides>(initial.overrides)
  const [editingId, setEditingId] = useState<CustomPatternId | null>(initial.editingId)
  const [note, setNote] = useState<string | null>(null)

  const working = useMemo(
    () => buildWorkingPalette(base, name || palettes[base].name, overrides),
    [base, name, overrides],
  )

  const setKnob = useCallback(
    (knob: Knob, value: string) => {
      const baseValue = getAtPath(palettes[base].tokens, knob.path)
      setOverrides(prev =>
        value === '' || value === baseValue
          ? deleteAtPath(prev, knob.path)
          : setAtPath(prev, knob.path, value),
      )
      setNote(null)
    },
    [base],
  )

  const resetKnob = useCallback((knob: Knob) => {
    setOverrides(prev => deleteAtPath(prev, knob.path))
  }, [])

  const overrideCount = useMemo(() => KNOBS.filter(k => getAtPath(overrides, k.path) !== undefined).length, [overrides])

  const persist = useCallback(
    (id: CustomPatternId) => {
      setPatterns({ ...patterns, [id]: { id, name: name.trim() || 'Untitled', base, overrides } })
      setSelectedStyle(id)
      setEditingId(id)
      replaceParams({ edit: id, palette: id })
    },
    [patterns, name, base, overrides, setPatterns, setSelectedStyle],
  )

  const onSave = useCallback(() => {
    if (editingId) {
      persist(editingId)
      setNote('Saved.')
    } else {
      const id = uniqueCustomId(name, patterns)
      persist(id)
      setNote('Saved as a new pattern.')
    }
  }, [editingId, name, patterns, persist])

  const onSaveAsNew = useCallback(() => {
    const id = uniqueCustomId(name, patterns)
    persist(id)
    setNote('Saved as a new pattern.')
  }, [name, patterns, persist])

  const onShare = useCallback(async () => {
    const token = encodePattern({ base, name: name.trim() || 'Untitled', overrides })
    const url = `${window.location.origin}${window.location.pathname}#/?palette=${token}`
    try {
      await navigator.clipboard.writeText(url)
      setNote('Share link copied to clipboard.')
    } catch {
      setNote(url)
    }
  }, [base, name, overrides])

  const onDelete = useCallback(() => {
    if (!editingId) return
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    const next = { ...patterns }
    delete next[editingId]
    setPatterns(next)
    /* Drop the deleted pattern from every list so no favorite or group
     * keeps a dangling reference. */
    groupsApi.removeFromAllGroups(editingId)
    if (selectedStyle === editingId) setSelectedStyle(base)
    setEditingId(null)
    replaceParams({ edit: undefined, palette: undefined })
    setNote('Pattern deleted.')
  }, [editingId, name, patterns, selectedStyle, base, setPatterns, setSelectedStyle, groupsApi])

  const chromeField: Field = buildPaletteField(selectedStyle, setSelectedStyle)
  const brand = <h1 className="iux-style-editor__title">iux — style editor</h1>

  return (
    <PaletteRoot palette={resolveStyle(selectedStyle)} as="section">
      <AppShell layoutId={navLayout} brand={brand} nav={APP_SHELL_NAV} activeId="editor">
        <div className="iux-style-editor">
          <header className="iux-style-editor__head">
            <p className="iux-style-editor__intro">
              Clone a built-in palette, tweak the common knobs, and save it as your own.
              Built-in palettes stay read-only; your patterns are stored locally and the
              whole configuration travels in the share link.
            </p>
            <div className="iux-style-editor__meta">
              <label className="iux-style-editor__label">
                Name
                <input
                  className="iux-style-editor__name-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="My pattern"
                />
              </label>
              <label className="iux-style-editor__label">
                Clone of
                <Select
                  variant="dropdown"
                  value={base}
                  options={BASE_OPTIONS}
                  onChange={v => setBase(v as PaletteId)}
                />
              </label>
              <span className="iux-style-editor__badge">
                {editingId ? 'Editing saved pattern' : 'New pattern'} · {overrideCount} override
                {overrideCount === 1 ? '' : 's'}
              </span>
            </div>
            <div className="iux-style-editor__actions">
              <Button intent="primary" onClick={onSave}>
                {editingId ? 'Save' : 'Save pattern'}
              </Button>
              {editingId && (
                <Button variant="solid" intent="neutral" onClick={onSaveAsNew}>
                  Save as new
                </Button>
              )}
              <Button variant="solid" intent="neutral" onClick={onShare}>
                Copy share link
              </Button>
              {editingId && (
                <Button variant="solid" intent="danger" onClick={onDelete}>
                  Delete
                </Button>
              )}
            </div>
            {note && (
              <p className="iux-style-editor__note" role="status">
                {note}
              </p>
            )}
          </header>

          <div className="iux-style-editor__body">
            <section className="iux-style-editor__knobs" aria-label="Token controls">
              {KNOB_GROUPS.map(group => {
                const groupKnobs = KNOBS.filter(k => k.group === group)
                if (groupKnobs.length === 0) return null
                return (
                  <fieldset key={group} className="iux-style-editor__group">
                    <legend className="iux-style-editor__group-title">{group}</legend>
                    {groupKnobs.map(knob => (
                      <KnobControl
                        key={knob.path}
                        knob={knob}
                        value={String(getAtPath(working.tokens, knob.path) ?? '')}
                        overridden={getAtPath(overrides, knob.path) !== undefined}
                        onChange={v => setKnob(knob, v)}
                        onReset={() => resetKnob(knob)}
                      />
                    ))}
                  </fieldset>
                )
              })}
            </section>

            <section className="iux-style-editor__preview" aria-label="Live preview">
              <PaletteRoot palette={working} as="div" className="iux-style-editor__preview-root">
                <PreviewSampler />
              </PaletteRoot>
            </section>
          </div>
        </div>
        <DraggableControls
          style={controlsStyle}
          onStyleChange={setControlsStyle}
          fields={[chromeField]}
        />
      </AppShell>
    </PaletteRoot>
  )
}

// ABOUTME: Props shared by all KnobControl variants: the knob descriptor, the current resolved value, whether the value is overridden from the base, and change/reset callbacks.
interface KnobControlProps {
  knob: Knob
  value: string
  overridden: boolean
  onChange: (value: string) => void
  onReset: () => void
}

// ABOUTME: Dispatcher that routes a knob descriptor to the correct control widget: LengthKnob for length tokens, BlockKnob+FontControl for font stacks, or SimpleKnob for colors/text/select.
function KnobControl(props: KnobControlProps) {
  if (props.knob.kind === 'length') return <LengthKnob {...props} />
  if (props.knob.kind === 'font') {
    return (
      <BlockKnob knob={props.knob} overridden={props.overridden} onReset={props.onReset}>
        <FontControl value={props.value} onChange={props.onChange} />
      </BlockKnob>
    )
  }
  return <SimpleKnob {...props} />
}

// ABOUTME: Small circular reset button that clears a single knob's override back to its base-palette value; disabled when the knob is already at the base value.
function ResetButton({ knob, overridden, onReset }: { knob: Knob; overridden: boolean; onReset: () => void }) {
  return (
    <button
      type="button"
      className="iux-knob__reset"
      onClick={onReset}
      disabled={!overridden}
      aria-label={`Reset ${knob.label}`}
      title="Reset to base value"
    >
      ↺
    </button>
  )
}

// ABOUTME: Compact two-column knob row (label | control) for color, text, and select kinds; highlights the row when the value differs from the base palette.
/** Compact two-column knob (label | control) for color / text / select. */
function SimpleKnob({ knob, value, overridden, onChange, onReset }: KnobControlProps) {
  return (
    <div className={`iux-knob${overridden ? ' is-overridden' : ''}`}>
      <span className="iux-knob__label" title={knob.path}>
        {knob.label}
      </span>
      <div className="iux-knob__control">
        {knob.kind === 'color' && <ColorControl knob={knob} value={value} onChange={onChange} />}
        {knob.kind === 'text' && (
          <input
            type="text"
            className="iux-knob__text"
            value={value}
            onChange={e => onChange(e.target.value)}
            aria-label={knob.label}
          />
        )}
        {knob.kind === 'select' && (
          <Select variant="dropdown" value={value} options={knob.options ?? []} onChange={onChange} />
        )}
        <ResetButton knob={knob} overridden={overridden} onReset={onReset} />
      </div>
    </div>
  )
}

// ABOUTME: Full-width knob layout with a head row (label + optional actions + reset button) above a control body that spans the full width; used by LengthKnob in slider mode and FontControl, both of which need the extra horizontal space.
/**
 * Full-width knob: a head row (label + actions + reset) over a control body
 * that owns the whole row. Used for the font-stack builder and for length
 * knobs while in slider mode, both of which need real horizontal space.
 */
function BlockKnob({
  knob,
  overridden,
  onReset,
  actions,
  children,
}: {
  knob: Knob
  overridden: boolean
  onReset: () => void
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`iux-knob iux-knob--block${overridden ? ' is-overridden' : ''}`}>
      <div className="iux-knob__head">
        <span className="iux-knob__label" title={knob.path}>
          {knob.label}
        </span>
        <div className="iux-knob__head-actions">
          {actions}
          <ResetButton knob={knob} overridden={overridden} onReset={onReset} />
        </div>
      </div>
      <div className="iux-knob__control">{children}</div>
    </div>
  )
}

// ABOUTME: Color knob control: a native color-picker swatch when the value parses as a hex color (with applyPickedHex to preserve alpha), plus a free-text input for arbitrary CSS values like oklch() or var().
function ColorControl({ knob, value, onChange }: { knob: Knob; value: string; onChange: (v: string) => void }) {
  const pickerHex = toPickerHex(value)
  return (
    <>
      {pickerHex !== null ? (
        <input
          type="color"
          className="iux-knob__swatch"
          value={pickerHex}
          onChange={e => onChange(applyPickedHex(value, e.target.value))}
          aria-label={`${knob.label} color`}
        />
      ) : (
        <span
          className="iux-knob__swatch iux-knob__swatch--preview"
          style={{ background: value }}
          aria-hidden="true"
        />
      )}
      <input
        type="text"
        className="iux-knob__text"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={`${knob.label} value`}
      />
    </>
  )
}

// ABOUTME: Parses a CSS length string like "12px" or "1.5rem" into a numeric value and unit suffix; returns null for values that can't be cleanly split (e.g. calc() expressions), disabling the slider mode.
/** Split a CSS `<number><unit>` value (e.g. `12px`, `1.5rem`, `0`). */
function parseLength(value: string): { num: number; unit: string } | null {
  const m = /^(-?\d*\.?\d+)([a-z%]*)$/i.exec(value.trim())
  if (!m) return null
  const num = Number(m[1])
  if (!Number.isFinite(num)) return null
  return { num, unit: m[2] }
}

// ABOUTME: Rounds a float to at most 4 decimal places and strips trailing zeros, keeping slider output values compact (e.g. 0.5 not 0.5000).
function tidy(n: number): number {
  return Number.parseFloat(n.toFixed(4))
}

// ABOUTME: Length knob that defaults to a text input (accepting calc(), clamp(), etc.) with a toggle into a full-width BlockKnob slider + unit-picker via SliderUnit; the slider toggle is disabled when parseLength returns null.
/**
 * Length knob: a text input by default, with a toggle into a full-width
 * slider + unit picker. The text input stays the source of truth (it accepts
 * `calc()`, `clamp()`, etc.); the toggle is disabled when the current value
 * doesn't parse as a plain `<number><unit>`.
 */
function LengthKnob({ knob, value, overridden, onChange, onReset }: KnobControlProps) {
  const parsed = parseLength(value)
  const [slider, setSlider] = useState(false)
  const showSlider = slider && parsed !== null

  const modeToggle = (
    <button
      type="button"
      className={`iux-knob__mode${showSlider ? ' is-active' : ''}`}
      aria-pressed={showSlider}
      disabled={parsed === null}
      onClick={() => setSlider(s => !s)}
      title={showSlider ? 'Switch to text input' : 'Switch to slider + units'}
    >
      {showSlider ? 'Text' : 'Slider'}
    </button>
  )

  if (showSlider && parsed) {
    return (
      <BlockKnob knob={knob} overridden={overridden} onReset={onReset} actions={modeToggle}>
        <SliderUnit num={parsed.num} unit={parsed.unit} label={knob.label} onChange={onChange} />
      </BlockKnob>
    )
  }

  return (
    <div className={`iux-knob${overridden ? ' is-overridden' : ''}`}>
      <span className="iux-knob__label" title={knob.path}>
        {knob.label}
      </span>
      <div className="iux-knob__control">
        <input
          type="text"
          className="iux-knob__text"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label={knob.label}
        />
        {modeToggle}
        <ResetButton knob={knob} overridden={overridden} onReset={onReset} />
      </div>
    </div>
  )
}

// ABOUTME: Slider-plus-unit-picker control used inside LengthKnob's block mode: a Slider component for the numeric part and a Select dropdown for the unit suffix, emitting combined CSS length strings on every change.
function SliderUnit({
  num,
  unit,
  label,
  onChange,
}: {
  num: number
  unit: string
  label: string
  onChange: (v: string) => void
}) {
  const def = LENGTH_UNITS.find(u => u.value === unit) ?? LENGTH_UNITS[LENGTH_UNITS.length - 1]
  const max = Math.max(def.max, num)
  return (
    <div className="iux-knob__slider">
      <Slider
        variant="single"
        value={num}
        min={def.min}
        max={max}
        step={def.step}
        label={label}
        formatValue={n => `${tidy(n)}${unit || ''}`}
        onChange={n => onChange(`${tidy(n)}${unit}`)}
      />
      <label className="iux-knob__unit">
        <span className="iux-knob__unit-label">Unit</span>
        <Select
          variant="dropdown"
          value={unit}
          options={LENGTH_UNITS.map(u => ({ value: u.value, label: u.label || '— none —' }))}
          onChange={nextUnit => onChange(`${tidy(num)}${nextUnit}`)}
        />
      </label>
    </div>
  )
}

// ABOUTME: Splits a CSS font-family stack string (comma-separated) into individual trimmed family tokens for FontControl to render as a reorderable list.
/** Split a font stack into its ordered family tokens. */
function splitStack(value: string): string[] {
  return value.split(',').map(s => s.trim()).filter(Boolean)
}

// ABOUTME: Font-stack builder used inside the font knob's BlockKnob: renders each CSS family as a Select dropdown with up/down/remove buttons; injects unknown families from the current value as options so nothing is lost, and emits the full comma-joined stack on every change.
/**
 * Font knob: an ordered, rearrangeable list of family dropdowns that compose
 * a CSS font stack. Families from the current value that aren't in the
 * curated list are injected as options so nothing is lost on edit.
 */
function FontControl({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const families = splitStack(value)
  const update = (next: string[]) => onChange(next.join(', '))

  const options = useMemo(() => {
    const opts = FONT_FAMILY_OPTIONS.slice()
    const known = new Set(opts.map(o => o.value))
    for (const fam of families) {
      if (fam && !known.has(fam)) {
        known.add(fam)
        opts.push({ value: fam, label: fam.replace(/^["']|["']$/g, '') })
      }
    }
    return opts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [families.join('')])

  const addFamily = () => {
    const next = FONT_FAMILY_OPTIONS.find(o => !families.includes(o.value))?.value ?? 'sans-serif'
    update([...families, next])
  }

  const swap = (i: number, j: number) => {
    const next = families.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    update(next)
  }

  return (
    <div className="iux-font-stack">
      {families.length === 0 && (
        <p className="iux-font-stack__empty">No fonts yet — add one.</p>
      )}
      {families.map((fam, i) => (
        <div className="iux-font-stack__row" key={`${fam}-${i}`}>
          <span className="iux-font-stack__rank" aria-hidden="true">{i + 1}</span>
          <Select
            variant="dropdown"
            value={fam}
            options={options}
            onChange={nv => {
              const next = families.slice()
              next[i] = nv
              update(next)
            }}
          />
          <button
            type="button"
            className="iux-font-stack__btn"
            aria-label={`Move ${fam} up`}
            disabled={i === 0}
            onClick={() => swap(i, i - 1)}
          >
            ↑
          </button>
          <button
            type="button"
            className="iux-font-stack__btn"
            aria-label={`Move ${fam} down`}
            disabled={i === families.length - 1}
            onClick={() => swap(i, i + 1)}
          >
            ↓
          </button>
          <button
            type="button"
            className="iux-font-stack__btn"
            aria-label={`Remove ${fam}`}
            onClick={() => update(families.filter((_, j) => j !== i))}
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" className="iux-font-stack__add" onClick={addFamily}>
        + Add font
      </button>
    </div>
  )
}

// ABOUTME: Live preview panel rendered inside a nested PaletteRoot that uses the working (edited) palette: shows headings, body text, a link, all six intent buttons, and two Card variants so token changes are visible immediately.
/** A compact spread of components so token edits are visible immediately. */
function PreviewSampler() {
  const intents = ['primary', 'neutral', 'success', 'warning', 'danger', 'info'] as const
  return (
    <div className="iux-preview-sampler">
      <h2 className="iux-preview-sampler__heading">The quick brown fox</h2>
      <p className="iux-preview-sampler__text">
        Jumps over the lazy dog. Secondary text and a <a href="#/editor">link</a> sit on the
        page surface.
      </p>
      <div className="iux-preview-sampler__buttons">
        {intents.map(intent => (
          <Button key={intent} intent={intent}>
            {intent}
          </Button>
        ))}
      </div>
      <div className="iux-preview-sampler__cards">
        <Card title="Card title" subtitle="On a raised surface">
          A raised surface with a border, radius, and elevation from the tokens.
        </Card>
        <Card variant="bento" accent="primary" title="Accent card">
          The primary intent tints this bento accent stripe.
        </Card>
      </div>
    </div>
  )
}
