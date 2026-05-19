import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './TokenField.css'

export type TokenFieldVariant = 'split' | 'typeahead' | 'grouped' | 'structured'

export interface TokenOption {
  value: string
  label: string
  group?: string
  description?: string
  meta?: Record<string, string>
}

export interface Token {
  value: string
  label: string
  invalid?: boolean
  meta?: Record<string, string>
}

export interface TokenFieldProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: TokenFieldVariant
  value?: Token[]
  defaultValue?: Token[]
  onChange?: (tokens: Token[]) => void
  /** typeahead + grouped + structured: option list. */
  options?: TokenOption[]
  /** grouped: hard ceiling on chip count. */
  maxCount?: number
  /** grouped: return string error message or false to flag invalid. */
  validate?: (label: string) => true | string
  /** structured: per-chip popover editor. */
  editor?: (token: Token, commit: (next: Token) => void, remove: () => void) => ReactNode

  placeholder?: string
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  className?: string
  id?: string
}

function uniqByValue(tokens: Token[]): Token[] {
  const seen = new Set<string>()
  const out: Token[] = []
  for (const t of tokens) {
    if (seen.has(t.value)) continue
    seen.add(t.value)
    out.push(t)
  }
  return out
}

export function TokenField({
  variant = 'split',
  value,
  defaultValue,
  onChange,
  options = [],
  maxCount,
  validate,
  editor,
  placeholder,
  label,
  hint,
  error,
  disabled,
  className,
  id,
}: TokenFieldProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<Token[]>(defaultValue ?? [])
  const tokens = isControlled ? value! : innerValue

  const commit = useCallback((next: Token[]) => {
    const limited = maxCount !== undefined ? next.slice(0, maxCount) : next
    const deduped = uniqByValue(limited)
    if (!isControlled) setInnerValue(deduped)
    onChange?.(deduped)
  }, [isControlled, maxCount, onChange])

  const [text, setText] = useState('')
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [open, setOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // Close popover / editor on outside click.
  useEffect(() => {
    if (!open && editingIndex === null) return
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
        setEditingIndex(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, editingIndex])

  const filtered = useMemo<TokenOption[]>(() => {
    const q = text.trim().toLowerCase()
    if (!q) return options
    return options.filter(o => o.label.toLowerCase().includes(q))
  }, [text, options])

  const grouped = useMemo<{ group: string | null; opts: TokenOption[] }[]>(() => {
    if (variant !== 'grouped') return [{ group: null, opts: filtered }]
    const order: (string | null)[] = []
    const buckets = new Map<string | null, TokenOption[]>()
    for (const o of filtered) {
      const key = o.group ?? null
      if (!buckets.has(key)) { order.push(key); buckets.set(key, []) }
      buckets.get(key)!.push(o)
    }
    return order.map(group => ({ group, opts: buckets.get(group)! }))
  }, [filtered, variant])

  const addLabel = useCallback((label: string) => {
    const clean = label.trim()
    if (!clean) return
    const existing = options.find(o => o.label.toLowerCase() === clean.toLowerCase())
    const validation = validate ? validate(clean) : true
    const token: Token = existing
      ? { value: existing.value, label: existing.label, meta: existing.meta }
      : { value: clean, label: clean, invalid: validation !== true || undefined }
    if (validation !== true && !existing) token.invalid = true
    commit([...tokens, token])
    setText('')
    setActiveIndex(-1)
  }, [options, validate, commit, tokens])

  const handleInputKey = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (event.key === 'Enter') {
      event.preventDefault()
      if (open && activeIndex >= 0 && filtered[activeIndex]) {
        addLabel(filtered[activeIndex].label)
      } else if (text.trim()) {
        addLabel(text)
      }
    } else if (event.key === ',') {
      event.preventDefault()
      if (text.trim()) addLabel(text)
    } else if (event.key === 'Backspace' && text === '') {
      event.preventDefault()
      if (tokens.length > 0) commit(tokens.slice(0, -1))
    } else if (event.key === 'ArrowDown') {
      if (!open) setOpen(true)
      setActiveIndex(i => Math.min(filtered.length - 1, i + 1))
    } else if (event.key === 'ArrowUp') {
      setActiveIndex(i => Math.max(-1, i - 1))
    } else if (event.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }, [disabled, open, activeIndex, filtered, text, addLabel, tokens, commit])

  const handlePaste = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData('text')
    if (!/[,\n]/.test(pasted)) return
    event.preventDefault()
    const parts = pasted.split(/[,\n]/).map(s => s.trim()).filter(Boolean)
    let next: Token[] = [...tokens]
    for (const p of parts) {
      const existing = options.find(o => o.label.toLowerCase() === p.toLowerCase())
      const v = validate ? validate(p) : true
      const t: Token = existing
        ? { value: existing.value, label: existing.label, meta: existing.meta }
        : { value: p, label: p, invalid: v !== true || undefined }
      next.push(t)
    }
    commit(next)
    setText('')
  }, [tokens, options, validate, commit])

  const removeAt = (i: number) => {
    commit(tokens.filter((_, j) => j !== i))
  }

  const classes = [
    'iux-tokens',
    `iux-tokens--${variant}`,
    error && 'iux-tokens--has-error',
    disabled && 'iux-tokens--disabled',
    className,
  ].filter(Boolean).join(' ')

  const showPopover = (variant === 'typeahead' || variant === 'grouped' || variant === 'structured') && open && filtered.length > 0

  const atMax = maxCount !== undefined && tokens.length >= maxCount

  return (
    <div ref={rootRef} className={classes} data-variant={variant}>
      {label && (
        <label htmlFor={inputId} className="iux-tokens__label">
          {label}
          {maxCount !== undefined && <span className="iux-tokens__count">({tokens.length}/{maxCount})</span>}
        </label>
      )}
      <div className="iux-tokens__control" onClick={() => inputRef.current?.focus()}>
        {tokens.map((t, i) => (
          <span
            key={`${t.value}-${i}`}
            className={[
              'iux-tokens__chip',
              t.invalid && 'iux-tokens__chip--invalid',
              variant === 'structured' && 'iux-tokens__chip--interactive',
            ].filter(Boolean).join(' ')}
            onClick={ev => {
              if (variant !== 'structured') return
              ev.stopPropagation()
              setEditingIndex(idx => idx === i ? null : i)
            }}
          >
            <span className="iux-tokens__chip-label">{t.label}</span>
            <button
              type="button"
              className="iux-tokens__chip-remove"
              aria-label={`Remove ${t.label}`}
              onClick={ev => { ev.stopPropagation(); removeAt(i) }}
            >×</button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          className="iux-tokens__input"
          type="text"
          value={text}
          placeholder={tokens.length === 0 ? placeholder : ''}
          disabled={disabled || atMax}
          onChange={e => { setText(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleInputKey}
          onPaste={handlePaste}
          onBlur={() => { if (text.trim()) addLabel(text) }}
          aria-invalid={error || tokens.some(t => t.invalid) ? true : undefined}
        />
      </div>

      {showPopover && (
        <div className="iux-tokens__popover" role="listbox">
          {grouped.map(g => (
            <div key={g.group ?? '__'} className="iux-tokens__group">
              {g.group && <div className="iux-tokens__group-heading">{g.group}</div>}
              {g.opts.map(opt => {
                const absIdx = filtered.indexOf(opt)
                const isActive = absIdx === activeIndex
                return (
                  <div
                    key={opt.value}
                    className={['iux-tokens__option', isActive && 'is-active'].filter(Boolean).join(' ')}
                    role="option"
                    aria-selected={isActive}
                    onMouseDown={ev => { ev.preventDefault(); addLabel(opt.label) }}
                    onMouseEnter={() => setActiveIndex(absIdx)}
                  >
                    <span className="iux-tokens__option-label">{opt.label}</span>
                    {opt.description && <span className="iux-tokens__option-description">{opt.description}</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {variant === 'structured' && editingIndex !== null && tokens[editingIndex] && (
        <div className="iux-tokens__editor" role="dialog" aria-label="Edit token">
          {editor
            ? editor(
                tokens[editingIndex],
                next => { commit(tokens.map((t, i) => i === editingIndex ? next : t)); setEditingIndex(null) },
                () => { removeAt(editingIndex); setEditingIndex(null) },
              )
            : (
              <DefaultStructuredEditor
                token={tokens[editingIndex]}
                commit={next => { commit(tokens.map((t, i) => i === editingIndex ? next : t)); setEditingIndex(null) }}
                remove={() => { removeAt(editingIndex); setEditingIndex(null) }}
              />
            )
          }
        </div>
      )}

      {hint && !error && <span className="iux-tokens__hint">{hint}</span>}
      {error && <span className="iux-tokens__error" role="alert">{error}</span>}
    </div>
  )
}

function DefaultStructuredEditor({ token, commit, remove }: { token: Token; commit: (t: Token) => void; remove: () => void }) {
  const [draft, setDraft] = useState<Token>(token)
  return (
    <div className="iux-tokens__editor-body">
      <label className="iux-tokens__editor-field">
        <span>Label</span>
        <input
          value={draft.label}
          onChange={e => setDraft(d => ({ ...d, label: e.target.value }))}
        />
      </label>
      {draft.meta && Object.keys(draft.meta).map(k => (
        <label key={k} className="iux-tokens__editor-field">
          <span>{k}</span>
          <input
            value={draft.meta?.[k] ?? ''}
            onChange={e => setDraft(d => ({ ...d, meta: { ...d.meta, [k]: e.target.value } }))}
          />
        </label>
      ))}
      <div className="iux-tokens__editor-actions">
        <button type="button" className="iux-tokens__btn iux-tokens__btn--ghost" onClick={remove}>Remove</button>
        <button type="button" className="iux-tokens__btn iux-tokens__btn--primary" onClick={() => commit(draft)}>Save</button>
      </div>
    </div>
  )
}

