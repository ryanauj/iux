import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import './InlineEdit.css'

export type InlineEditVariant = 'click' | 'validated' | 'autosave' | 'history'

export type SaveStatus = 'idle' | 'dirty' | 'saving' | 'saved' | 'error'

export interface HistoryEntry {
  at: number
  value: string
}

export interface InlineEditProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: InlineEditVariant
  value: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** autosave + history: persist a committed value. Throws to flag error. */
  onSave?: (value: string) => Promise<unknown> | unknown
  /** autosave: debounce window before invoking onSave. */
  debounceMs?: number
  /** validated: return error message or true. */
  validate?: (value: string) => true | string
  /** history: prior values (newest first or any order). */
  history?: HistoryEntry[]
  placeholder?: string
  label?: string
  ariaLabel?: string
  disabled?: boolean
  className?: string
  /** Story-only: render in edit mode by default. */
  defaultEditing?: boolean
}

export function InlineEdit({
  variant = 'click',
  value,
  defaultValue,
  onChange,
  onSave,
  debounceMs = 600,
  validate,
  history,
  placeholder,
  label,
  ariaLabel,
  disabled,
  className,
  defaultEditing = false,
}: InlineEditProps) {
  const fallbackId = useId()
  const inputId = fallbackId
  const initial = defaultValue ?? value ?? ''
  const [draft, setDraft] = useState<string>(initial)
  const [editing, setEditing] = useState<boolean>(defaultEditing)
  const [status, setStatus] = useState<SaveStatus>('idle')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)

  // Keep draft in sync with value when not editing.
  useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  // ---------- Autosave debounce ----------
  const saveTimerRef = useRef<number | null>(null)
  const lastCommittedRef = useRef<string>(value)

  const performSave = useCallback(async (next: string) => {
    if (!onSave) return
    setStatus('saving')
    try {
      await onSave(next)
      lastCommittedRef.current = next
      setStatus('saved')
      window.setTimeout(() => setStatus(prev => prev === 'saved' ? 'idle' : prev), 1500)
    } catch {
      setStatus('error')
    }
  }, [onSave])

  useEffect(() => {
    if (variant !== 'autosave') return
    if (draft === lastCommittedRef.current) return
    setStatus('dirty')
    if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current)
    saveTimerRef.current = window.setTimeout(() => performSave(draft), debounceMs)
    return () => {
      if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current)
    }
  }, [draft, variant, debounceMs, performSave])

  // ---------- Commit / cancel ----------
  const commit = useCallback(async () => {
    if (variant === 'validated' && validate) {
      const v = validate(draft)
      if (v !== true) {
        setValidationError(v)
        return
      }
      setValidationError(null)
    }
    onChange?.(draft)
    if (variant !== 'autosave' && onSave) {
      await performSave(draft)
    }
    setEditing(false)
  }, [variant, validate, draft, onChange, onSave, performSave])

  const cancel = useCallback(() => {
    setDraft(value)
    setValidationError(null)
    setEditing(false)
  }, [value])

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      commit()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      cancel()
    }
  }

  const classes = [
    'iux-inline-edit',
    `iux-inline-edit--${variant}`,
    editing && 'is-editing',
    status !== 'idle' && `iux-inline-edit--status-${status}`,
    disabled && 'is-disabled',
    className,
  ].filter(Boolean).join(' ')

  const displayValue = draft || value || placeholder || ''

  return (
    <div className={classes}>
      {label && <label htmlFor={inputId} className="iux-inline-edit__label">{label}</label>}
      <div className="iux-inline-edit__row">
        {editing ? (
          <input
            id={inputId}
            autoFocus
            className="iux-inline-edit__input"
            value={draft}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={ariaLabel ?? label}
            aria-invalid={validationError ? true : undefined}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKey}
            onBlur={() => { if (variant !== 'autosave') commit() }}
          />
        ) : (
          <button
            type="button"
            className="iux-inline-edit__display"
            onClick={() => !disabled && setEditing(true)}
            aria-label={`Edit ${label ?? ariaLabel ?? 'value'}`}
            disabled={disabled}
          >
            <span className="iux-inline-edit__value" data-empty={value ? undefined : 'true'}>{displayValue}</span>
            <PencilGlyph />
          </button>
        )}

        {variant === 'autosave' && status !== 'idle' && (
          <StatusBadge status={status} />
        )}

        {variant === 'history' && history && history.length > 0 && (
          <button
            type="button"
            className="iux-inline-edit__history-btn"
            aria-label="Show edit history"
            aria-expanded={historyOpen}
            onClick={() => setHistoryOpen(o => !o)}
          >
            ⟲
          </button>
        )}
      </div>

      {validationError && (
        <span className="iux-inline-edit__error" role="alert">{validationError}</span>
      )}

      {variant === 'history' && historyOpen && history && (
        <div className="iux-inline-edit__history" role="dialog" aria-label="History">
          <p className="iux-inline-edit__history-current">Current: <strong>{value || '(empty)'}</strong></p>
          <ol className="iux-inline-edit__history-list">
            {history.map((h, i) => (
              <li key={i}>
                <div className="iux-inline-edit__history-meta">{new Date(h.at).toLocaleString()}</div>
                <div className="iux-inline-edit__history-diff">
                  <span className="iux-inline-edit__history-prev">{h.value}</span>
                  <span aria-hidden="true">→</span>
                  <span className="iux-inline-edit__history-next">
                    {history[i - 1]?.value ?? value}
                  </span>
                </div>
                <button
                  type="button"
                  className="iux-inline-edit__history-revert"
                  onClick={() => { setDraft(h.value); setEditing(true); setHistoryOpen(false) }}
                >Restore</button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: SaveStatus }) {
  if (status === 'dirty') return <span className="iux-inline-edit__badge iux-inline-edit__badge--dirty" role="status">unsaved</span>
  if (status === 'saving') return <span className="iux-inline-edit__badge iux-inline-edit__badge--saving" role="status" aria-live="polite">saving…</span>
  if (status === 'saved') return <span className="iux-inline-edit__badge iux-inline-edit__badge--saved" role="status" aria-live="polite">saved</span>
  if (status === 'error') return <span className="iux-inline-edit__badge iux-inline-edit__badge--error" role="alert">save failed</span>
  return null
}

function PencilGlyph() {
  return (
    <svg className="iux-inline-edit__pencil" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M11 3l2 2-7 7H4v-2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
