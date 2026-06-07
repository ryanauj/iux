// ABOUTME: NLBar — a React component (components).

import { useCallback, useEffect, useId, useState } from 'react'
import './NLBar.css'

// ABOUTME: NLBarVariant — a type alias.
export type NLBarVariant = 'parsed' | 'editable' | 'execute' | 'disambig'

// ABOUTME: ParsedChip — an interface.
export interface ParsedChip {
  key: string
  label: string
  value: string
  /** editable variant: render an inline editor when clicked. */
  editable?: boolean
  /** editable / disambig: available choices for the chip value. */
  options?: string[]
}

// ABOUTME: ParsedIntent — an interface.
export interface ParsedIntent {
  action: string
  chips: ParsedChip[]
  /** disambig: alternate parses; the user picks one. */
  alternatives?: Array<{ label: string; chips: ParsedChip[]; action?: string }>
}

// ABOUTME: Props for NLBar.
export interface NLBarProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: NLBarVariant
  parse: (text: string) => ParsedIntent | null
  onExecute?: (intent: ParsedIntent) => void
  placeholder?: string
  label?: string
  className?: string
}

// ABOUTME: NLBar — a React component.
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

interface ChipViewProps {
  chip: ParsedChip
  variant: NLBarVariant
  isEditing: boolean
  onSetEditing: (key: string | null) => void
  onChange: (v: string) => void
}

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

