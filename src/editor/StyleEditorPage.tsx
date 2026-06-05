import { useCallback, useMemo, useState } from 'react'
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
import { encodePattern, decodePattern } from '../lib/patternCodec'
import { useHashLocation, replaceParams } from '../apps/router'
import { KNOBS, KNOB_GROUPS, type Knob } from './knobRegistry'
import './style-editor.css'

const BASE_OPTIONS = (Object.keys(palettes) as PaletteId[]).map(id => ({
  value: id,
  label: `${palettes[id].name} (${palettes[id].engine})`,
}))

interface WorkingState {
  base: PaletteId
  name: string
  overrides: TokenOverrides
  /** The custom pattern being edited in place, or `null` for a fresh clone. */
  editingId: CustomPatternId | null
}

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

export function StyleEditorPage() {
  const location = useHashLocation()
  const editParam = location.params.get('edit')
  const paletteParam = location.params.get('palette')

  const [patterns, setPatterns] = useCustomPatterns()
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
    if (selectedStyle === editingId) setSelectedStyle(base)
    setEditingId(null)
    replaceParams({ edit: undefined, palette: undefined })
    setNote('Pattern deleted.')
  }, [editingId, name, patterns, selectedStyle, base, setPatterns, setSelectedStyle])

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

interface KnobControlProps {
  knob: Knob
  value: string
  overridden: boolean
  onChange: (value: string) => void
  onReset: () => void
}

function KnobControl({ knob, value, overridden, onChange, onReset }: KnobControlProps) {
  return (
    <div className={`iux-knob${overridden ? ' is-overridden' : ''}`}>
      <span className="iux-knob__label" title={knob.path}>
        {knob.label}
      </span>
      <div className="iux-knob__control">
        {knob.kind === 'color' && (
          <>
            {isHexColor(value) ? (
              <input
                type="color"
                className="iux-knob__swatch"
                value={value}
                onChange={e => onChange(e.target.value)}
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
        )}
        {(knob.kind === 'length' || knob.kind === 'text') && (
          <input
            type="text"
            className="iux-knob__text"
            value={value}
            onChange={e => onChange(e.target.value)}
            aria-label={knob.label}
          />
        )}
        {knob.kind === 'select' && (
          <Select
            variant="dropdown"
            value={value}
            options={knob.options ?? []}
            onChange={onChange}
          />
        )}
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
      </div>
    </div>
  )
}

/** Whether a value is a hex color the native color picker can edit directly. */
function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{3,8}$/.test(value)
}

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
