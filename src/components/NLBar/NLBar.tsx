// ABOUTME: Natural-language command bar that pipes typed text through a caller-supplied parser and renders the parsed intent as editable key/value chips, with variants for read-only display, chip editing, one-shot execution, and parse disambiguation.

import { useCallback, useEffect, useId, useState } from 'react'
import './NLBar.css'

// ABOUTME: Controls chip interactivity and commit behaviour: 'parsed' shows chips read-only, 'editable' lets users click chips to change values via select/input, 'execute' clears and shows a committed-action flash after Run, 'disambig' adds alternate-parse buttons below the chips.
export type NLBarVariant = 'parsed' | 'editable' | 'execute' | 'disambig'

// ABOUTME: A key/value token extracted from the parsed intent: the `key` is a stable identifier, `label` is shown in the chip, `value` is the current string, and `options` supplies a select list for editable variants.
export interface ParsedChip {
  key: string
  label: string
  value: string
  /** editable variant: render an inline editor when clicked. */
  editable?: boolean
  /** editable / disambig: available choices for the chip value. */
  options?: string[]
}

// ABOUTME: The structured parse result returned by the caller's `parse` function: an `action` verb, an array of ParsedChips, and optional `alternatives` for the 'disambig' variant's "Did you mean?" row.
export interface ParsedIntent {
  action: string
  chips: ParsedChip[]
  /** disambig: alternate parses; the user picks one. */
  alternatives?: Array<{ label: string; chips: ParsedChip[]; action?: string }>
}

// ABOUTME: Configures NLBar — the required `parse` function transforms raw text into a ParsedIntent on every keystroke; `onExecute` receives the final (possibly chip-edited) intent when the user commits via Enter or the Run button.
export interface NLBarProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: NLBarVariant
  parse: (text: string) => ParsedIntent | null
  onExecute?: (intent: ParsedIntent) => void
  placeholder?: string
  label?: string
  className?: string
}

// ABOUTME: Renders a text input whose value is parsed on every change; the resulting action label and editable chip row appear in a live-region preview panel below, with a Run button that calls `onExecute` and resets the field in the 'execute' variant.
/**
 * The internal `editedChips` state is seeded from the latest parse result and
 * can be mutated per-chip before commit. The 'disambig' variant shows
 * `intent.alternatives` as buttons that swap the entire chip set.
 * The 'execute' variant flashes a committed-action banner for 2 s after
 * commit. The internal `ChipView` subcomponent renders each chip as a
 * button that opens an `<input>` or `<select>` depending on whether the
 * chip has `options`.
 */
export function NLBar({
  variant = 'parsed',
  parse,
  onExecute,
  placeholder = 'Type intent…',
  label,
  className,
}: NLBarProps) {
  const id = useId()
  const [text, setText] = useState('')
  const [intent, setIntent] = useState<ParsedIntent | null>(null)
  const [editedChips, setEditedChips] = useState<ParsedChip[]>([])
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [committed, setCommitted] = useState<ParsedIntent | null>(null)

  useEffect(() => {
    if (!text.trim()) { setIntent(null); setEditedChips([]); return }
    const next = parse(text)
    setIntent(next)
    setEditedChips(next?.chips ?? [])
  }, [text, parse])

  const setChipValue = useCallback((key: string, value: string) => {
    setEditedChips(prev => prev.map(c => c.key === key ? { ...c, value } : c))
  }, [])

  const commit = useCallback(() => {
    if (!intent) return
    const final: ParsedIntent = { ...intent, chips: editedChips }
    onExecute?.(final)
    setCommitted(final)
    // Clear after commit so the field returns to empty in 'execute' style.
    setText('')
    setIntent(null)
    setEditedChips([])
    window.setTimeout(() => setCommitted(null), 2000)
  }, [intent, editedChips, onExecute])

  const classes = ['iux-nlbar', `iux-nlbar--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {label && <label htmlFor={id} className="iux-nlbar__label">{label}</label>}
      <input
        id={id}
        type="text"
        className="iux-nlbar__input"
        value={text}
        placeholder={placeholder}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commit() } }}
        autoComplete="off"
      />

      {intent && (
        <div className="iux-nlbar__preview" role="status" aria-live="polite">
          <div className="iux-nlbar__action">{intent.action}</div>
          <div className="iux-nlbar__chips">
            {editedChips.map(c => (
              <ChipView
                key={c.key}
                chip={c}
                variant={variant}
                isEditing={editingKey === c.key}
                onSetEditing={key => setEditingKey(key)}
                onChange={v => setChipValue(c.key, v)}
              />
            ))}
          </div>

          {variant === 'disambig' && intent.alternatives && intent.alternatives.length > 0 && (
            <div className="iux-nlbar__alts">
              <span className="iux-nlbar__alts-label">Did you mean</span>
              {intent.alternatives.map((alt, i) => (
                <button
                  key={i}
                  type="button"
                  className="iux-nlbar__alt"
                  onClick={() => {
                    setIntent({ action: alt.action ?? alt.label, chips: alt.chips })
                    setEditedChips(alt.chips)
                  }}
                >{alt.label}</button>
              ))}?
            </div>
          )}

          <div className="iux-nlbar__commit">
            <button type="button" className="iux-nlbar__btn iux-nlbar__btn--primary" onClick={commit}>Run</button>
          </div>
        </div>
      )}

      {variant === 'execute' && committed && (
        <div className="iux-nlbar__committed" role="status" aria-live="polite">
          <strong>{committed.action}</strong>
          {' — '}
          {committed.chips.map(c => `${c.key}: ${c.value}`).join(' · ')}
        </div>
      )}
    </div>
  )
}

// ABOUTME: Props passed from NLBar to ChipView: the chip data, current variant (determines editability), the currently-editing key, the open/close callback, and the value-change callback.
interface ChipViewProps {
  chip: ParsedChip
  variant: NLBarVariant
  isEditing: boolean
  onSetEditing: (key: string | null) => void
  onChange: (v: string) => void
}

// ABOUTME: Renders a single parsed chip as either a read-only disabled button, a focused `<select>` (when the chip has options and is being edited), or a focused `<input>` (free-text edit mode); commits the new value on blur or Enter and collapses back to button form.
function ChipView({ chip, variant, isEditing, onSetEditing, onChange }: ChipViewProps) {
  const editable = (variant === 'editable' || variant === 'disambig') && chip.editable !== false

  if (isEditing && editable) {
    if (chip.options && chip.options.length > 0) {
      return (
        <select
          autoFocus
          className="iux-nlbar__chip-select"
          value={chip.value}
          onChange={e => { onChange(e.target.value); onSetEditing(null) }}
          onBlur={() => onSetEditing(null)}
        >
          {chip.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      )
    }
    return (
      <input
        autoFocus
        className="iux-nlbar__chip-input"
        defaultValue={chip.value}
        onBlur={e => { onChange(e.target.value); onSetEditing(null) }}
        onKeyDown={e => {
          if (e.key === 'Enter') { onChange((e.target as HTMLInputElement).value); onSetEditing(null) }
          if (e.key === 'Escape') { onSetEditing(null) }
        }}
      />
    )
  }

  return (
    <button
      type="button"
      className={['iux-nlbar__chip', editable && 'iux-nlbar__chip--editable'].filter(Boolean).join(' ')}
      onClick={() => editable && onSetEditing(chip.key)}
      disabled={!editable}
      title={editable ? `Edit ${chip.label}` : undefined}
    >
      <span className="iux-nlbar__chip-key">{chip.label}</span>
      <span className="iux-nlbar__chip-value">{chip.value}</span>
    </button>
  )
}

