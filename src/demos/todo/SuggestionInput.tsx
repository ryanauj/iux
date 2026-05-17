import { useEffect, useId, useRef, useState } from 'react'
import { todoApi } from './api'

interface Props {
  onSubmit: (text: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function SuggestionInput({ onSubmit, placeholder, disabled }: Props) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [focusIdx, setFocusIdx] = useState(-1)
  const [open, setOpen] = useState(false)
  const listboxId = useId()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const controller = new AbortController()
    setLoading(true)
    const timer = window.setTimeout(async () => {
      try {
        const result = await todoApi.suggestions(value, controller.signal)
        setSuggestions(result)
        setFocusIdx((idx) => (idx >= result.length ? -1 : idx))
      } catch {
        // aborted or network error — leave suggestions as-is
      } finally {
        setLoading(false)
      }
    }, 150)
    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [value, open])

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setFocusIdx(-1)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setValue('')
    setSuggestions([])
    setFocusIdx(-1)
    setOpen(false)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setFocusIdx((i) => Math.min(suggestions.length - 1, i + 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setFocusIdx((i) => Math.max(-1, i - 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const picked = focusIdx >= 0 && focusIdx < suggestions.length ? suggestions[focusIdx] : value
      submit(picked)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      setFocusIdx(-1)
    }
  }

  const showList = open && (loading || suggestions.length > 0)

  return (
    <div className='todo-suggest' ref={containerRef}>
      <input
        type='text'
        className='todo-suggest__input'
        role='combobox'
        aria-expanded={showList}
        aria-controls={listboxId}
        aria-autocomplete='list'
        aria-activedescendant={focusIdx >= 0 ? `${listboxId}-opt-${focusIdx}` : undefined}
        placeholder={placeholder ?? 'What needs doing?'}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setOpen(true)
          setFocusIdx(-1)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        autoComplete='off'
        spellCheck={false}
      />
      {showList && (
        <ul
          id={listboxId}
          className='todo-suggest__list'
          role='listbox'
        >
          {loading && suggestions.length === 0 && (
            <li className='todo-suggest__hint'>searching…</li>
          )}
          {suggestions.map((text, i) => (
            <li
              id={`${listboxId}-opt-${i}`}
              key={`${text}:${i}`}
              role='option'
              aria-selected={focusIdx === i}
              className={`todo-suggest__opt ${focusIdx === i ? 'todo-suggest__opt--focus' : ''}`}
              onPointerDown={(e) => {
                e.preventDefault()
                submit(text)
              }}
              onMouseEnter={() => setFocusIdx(i)}
            >
              {highlight(text, value)}
            </li>
          ))}
        </ul>
      )}
      <p className='todo-suggest__help'>
        ↑↓ to navigate · enter to add · esc to close
      </p>
    </div>
  )
}

function highlight(text: string, query: string) {
  const q = query.trim()
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className='todo-suggest__match'>{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  )
}
