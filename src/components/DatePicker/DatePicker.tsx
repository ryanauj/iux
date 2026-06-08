// ABOUTME: Date input supporting four interaction modes — text field, calendar popover, two-date range picker with preset shortcuts, and natural-language entry (e.g., "next tue at 9am").

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './DatePicker.css'

// ABOUTME: Interaction mode: 'input' for free-text entry, 'calendar' for a popover month grid, 'range' for a two-date popover with optional presets, 'nl' for natural-language phrases parsed into dates.
export type DatePickerVariant = 'input' | 'calendar' | 'range' | 'nl'

// ABOUTME: A named quick-select shortcut that returns a start/end Date pair; consumed by the 'range' variant's preset button row.
export interface DatePreset {
  label: string
  getRange: () => [Date, Date]
}

// ABOUTME: Props for DatePicker — variant selects the interaction mode; single-date state uses value/onValueChange, range state uses range/onRangeChange; presets, min/max, label, hint, and error complete the field API.
/**
 * Controlled or uncontrolled. Single-date modes (input, calendar) use `value` /
 * `defaultValue` / `onValueChange`; range modes (range, nl) use `range` /
 * `defaultRange` / `onRangeChange`. The `nl` variant parses phrases like
 * "tomorrow at 9am" or "next tue" and accumulates a [start, end] range across
 * two Enter presses. `timeZone` (IANA string) affects display formatting only.
 */
export interface DatePickerProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: DatePickerVariant

  /** input + calendar — single date. */
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (next: Date | null) => void

  /** range + nl — date range. */
  range?: [Date | null, Date | null]
  defaultRange?: [Date | null, Date | null]
  onRangeChange?: (next: [Date | null, Date | null]) => void

  /** range: quick presets. */
  presets?: DatePreset[]

  /** nl: time zone for display formatting. */
  timeZone?: string

  /** Bounds. */
  min?: Date
  max?: Date

  label?: ReactNode
  hint?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  className?: string
}

// ---------- Date helpers ----------

// ABOUTME: Short month name strings used to populate the calendar navigation month-select dropdown.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// ABOUTME: Single-character weekday header labels rendered above the calendar day grid, starting Sunday.
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// ABOUTME: Returns a new Date with the time component zeroed to midnight local time, used for day-boundary comparisons throughout the picker.
function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

// ABOUTME: Returns true when two nullable Dates fall on the same calendar day (year, month, date); used to apply selected and today CSS modifiers to grid cells.
function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// ABOUTME: Returns true when date d falls strictly between lo and hi at day granularity; used to apply the is-in-range CSS modifier to calendar cells inside a committed or hover range.
function inRange(d: Date, lo: Date | null, hi: Date | null): boolean {
  if (!lo || !hi) return false
  const t = startOfDay(d).getTime()
  return t > startOfDay(lo).getTime() && t < startOfDay(hi).getTime()
}

// ABOUTME: Formats a nullable Date as a short "Mon D, YYYY" locale string using Intl.DateTimeFormat; used for the trigger button label in calendar and range modes.
function formatDate(d: Date | null | undefined, tz?: string): string {
  if (!d) return ''
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    timeZone: tz,
  }).format(d)
}

// ABOUTME: Formats a nullable Date with both date and time components (and optional time zone name) for the NL variant's range readout display.
function formatDateTime(d: Date | null | undefined, tz?: string): string {
  if (!d) return ''
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
    timeZone: tz, timeZoneName: tz ? 'short' : undefined,
  }).format(d)
}

// ABOUTME: Attempts to parse a free-text date string via Date.parse; returns a Date on success or null when the string cannot be interpreted.
function tryParseInput(s: string): Date | null {
  const t = Date.parse(s)
  if (!Number.isNaN(t)) return new Date(t)
  return null
}

// ABOUTME: Converts natural-language date phrases such as "tomorrow at 9am", "next tue", or "in 3 days" to a Date; falls back to tryParseInput for ISO-style strings.
function parseNaturalLanguage(input: string, now: Date = new Date()): Date | null {
  const s = input.trim().toLowerCase()
  if (!s) return null
  const today = startOfDay(now)
  if (s === 'today') return today
  if (s === 'tomorrow') return addDays(today, 1)
  if (s === 'yesterday') return addDays(today, -1)
  const inXDays = s.match(/^in\s+(\d+)\s+days?$/)
  if (inXDays) return addDays(today, Number(inXDays[1]))
  const xDaysAgo = s.match(/^(\d+)\s+days?\s+ago$/)
  if (xDaysAgo) return addDays(today, -Number(xDaysAgo[1]))
  const nextWeekday = s.match(/^next\s+(sun|mon|tue|wed|thu|fri|sat)/)
  if (nextWeekday) {
    const target = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(nextWeekday[1])
    const cur = today.getDay()
    const add = ((target - cur + 7) % 7) || 7
    return addDays(today, add)
  }
  // Allow "tomorrow at 9am" / "next tue at 10:30"
  const timeMatch = s.match(/at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/)
  let baseDate: Date | null = null
  if (s.startsWith('tomorrow')) baseDate = addDays(today, 1)
  else if (s.startsWith('today')) baseDate = today
  else if (s.startsWith('yesterday')) baseDate = addDays(today, -1)
  else if (s.startsWith('next')) {
    const m = s.match(/^next\s+(sun|mon|tue|wed|thu|fri|sat)/)
    if (m) {
      const target = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(m[1])
      const cur = today.getDay()
      const add = ((target - cur + 7) % 7) || 7
      baseDate = addDays(today, add)
    }
  }
  if (baseDate && timeMatch) {
    let hour = Number(timeMatch[1])
    const minute = Number(timeMatch[2] ?? '0')
    const meridiem = timeMatch[3]
    if (meridiem === 'pm' && hour < 12) hour += 12
    if (meridiem === 'am' && hour === 12) hour = 0
    baseDate.setHours(hour, minute, 0, 0)
    return baseDate
  }
  if (baseDate) return baseDate
  return tryParseInput(input)
}

// ABOUTME: Returns a new Date offset by the given number of days from d, used by natural-language parsing and calendar keyboard navigation.
function addDays(d: Date, days: number): Date {
  const x = new Date(d)
  x.setDate(x.getDate() + days)
  return x
}

// ABOUTME: Builds a 6×7 matrix of Date objects for the calendar grid, padding the first row with days from the preceding month to align Sunday as the first column.
function monthMatrix(viewYear: number, viewMonth: number): Date[][] {
  const first = new Date(viewYear, viewMonth, 1)
  const start = new Date(first)
  start.setDate(1 - first.getDay())
  const rows: Date[][] = []
  for (let r = 0; r < 6; r++) {
    const row: Date[] = []
    for (let c = 0; c < 7; c++) {
      row.push(addDays(start, r * 7 + c))
    }
    rows.push(row)
  }
  return rows
}

// ABOUTME: Date picker field that renders an input, calendar popover, range popover, or NL entry field depending on variant; manages both controlled and uncontrolled single-date and range states.
/**
 * For 'input': a text field that parses on blur. For 'calendar' and 'range': a
 * button that opens a popover containing a navigable month grid with keyboard
 * support (arrow keys, PageUp/Down, Home/End, Enter). For 'range': optional
 * preset shortcuts and two-click selection with hover-highlight. For 'nl':
 * a text input that interprets natural-language expressions on Enter, building
 * a [start, end] pair across successive submissions.
 */
export function DatePicker(props: DatePickerProps) {
  const {
    variant = 'input',
    value,
    defaultValue,
    onValueChange,
    range,
    defaultRange,
    onRangeChange,
    presets,
    timeZone,
    min, max,
    label,
    hint,
    error,
    placeholder,
    disabled,
    id,
    className,
  } = props

  const fallbackId = useId()
  const inputId = id ?? fallbackId

  const isValueControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<Date | null>(defaultValue ?? null)
  const currentValue = isValueControlled ? (value ?? null) : innerValue

  const isRangeControlled = range !== undefined
  const [innerRange, setInnerRange] = useState<[Date | null, Date | null]>(defaultRange ?? [null, null])
  const currentRange = isRangeControlled ? range! : innerRange

  const commitValue = (next: Date | null) => {
    if (!isValueControlled) setInnerValue(next)
    onValueChange?.(next)
  }
  const commitRange = (next: [Date | null, Date | null]) => {
    if (!isRangeControlled) setInnerRange(next)
    onRangeChange?.(next)
  }

  const [text, setText] = useState<string>(() => formatDate(currentValue, timeZone))
  useEffect(() => {
    if (variant === 'input') setText(formatDate(currentValue, timeZone))
    if (variant === 'nl') setText('')
  }, [currentValue, timeZone, variant])

  // ---------- Calendar / range popover state ----------
  const [open, setOpen] = useState(false)
  const today = useMemo(() => startOfDay(new Date()), [])
  const anchor = currentValue ?? currentRange[0] ?? today
  const [viewYear, setViewYear] = useState<number>(anchor.getFullYear())
  const [viewMonth, setViewMonth] = useState<number>(anchor.getMonth())
  const [focusedDay, setFocusedDay] = useState<Date>(anchor)
  const [hoverDay, setHoverDay] = useState<Date | null>(null)
  const [rangeAnchor, setRangeAnchor] = useState<Date | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // ---------- Day selection ----------
  const selectDay = useCallback((d: Date) => {
    if (variant === 'range') {
      if (!rangeAnchor || (currentRange[0] && currentRange[1])) {
        setRangeAnchor(d)
        commitRange([d, null])
      } else {
        const lo = startOfDay(rangeAnchor).getTime() <= startOfDay(d).getTime() ? rangeAnchor : d
        const hi = startOfDay(rangeAnchor).getTime() <= startOfDay(d).getTime() ? d : rangeAnchor
        commitRange([lo, hi])
        setRangeAnchor(null)
        setOpen(false)
      }
    } else {
      commitValue(d)
      setOpen(false)
    }
  }, [variant, rangeAnchor, currentRange])

  const moveFocus = (deltaDays: number) => {
    setFocusedDay(prev => {
      const next = addDays(prev, deltaDays)
      if (next.getMonth() !== viewMonth || next.getFullYear() !== viewYear) {
        setViewYear(next.getFullYear())
        setViewMonth(next.getMonth())
      }
      return next
    })
  }

  const handleGridKey = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft':  event.preventDefault(); moveFocus(-1); break
      case 'ArrowRight': event.preventDefault(); moveFocus(1); break
      case 'ArrowUp':    event.preventDefault(); moveFocus(-7); break
      case 'ArrowDown':  event.preventDefault(); moveFocus(7); break
      case 'PageUp':     event.preventDefault(); shiftMonth(-1); break
      case 'PageDown':   event.preventDefault(); shiftMonth(1); break
      case 'Home':       event.preventDefault(); moveFocus(-focusedDay.getDay()); break
      case 'End':        event.preventDefault(); moveFocus(6 - focusedDay.getDay()); break
      case 'Enter': case ' ':
        event.preventDefault()
        selectDay(focusedDay)
        break
    }
  }

  const shiftMonth = (delta: number) => {
    let m = viewMonth + delta
    let y = viewYear
    while (m < 0) { m += 12; y-- }
    while (m > 11) { m -= 12; y++ }
    setViewMonth(m); setViewYear(y)
    setFocusedDay(new Date(y, m, 1))
  }

  // ---------- Render: input ---------
  const beforeMin = (d: Date) => (min && startOfDay(d).getTime() < startOfDay(min).getTime())
  const afterMax = (d: Date) => (max && startOfDay(d).getTime() > startOfDay(max).getTime())

  const matrix = useMemo(() => monthMatrix(viewYear, viewMonth), [viewYear, viewMonth])

  const classes = ['iux-datepicker', `iux-datepicker--${variant}`, error && 'iux-datepicker--has-error', className].filter(Boolean).join(' ')

  const handleInputBlur = () => {
    if (variant !== 'input') return
    if (text.trim() === '') { commitValue(null); return }
    const parsed = tryParseInput(text)
    if (parsed) commitValue(parsed)
    else setText(formatDate(currentValue, timeZone))
  }

  const handleNlSubmit = () => {
    if (variant !== 'nl') return
    const parsed = parseNaturalLanguage(text)
    if (parsed) {
      if (currentRange[0] && !currentRange[1]) {
        const lo = currentRange[0]
        const ordered: [Date, Date] = parsed.getTime() < lo.getTime() ? [parsed, lo] : [lo, parsed]
        commitRange(ordered)
        setText('')
      } else {
        commitRange([parsed, null])
        setText('')
      }
    }
  }

  return (
    <div ref={rootRef} className={classes} data-variant={variant}>
      {label && (
        <label htmlFor={inputId} className="iux-datepicker__label">{label}</label>
      )}

      {variant === 'input' && (
        <input
          id={inputId}
          type="text"
          className="iux-datepicker__field"
          placeholder={placeholder ?? 'YYYY-MM-DD'}
          value={text}
          disabled={disabled}
          onChange={e => setText(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }}
          aria-invalid={error ? true : undefined}
        />
      )}

      {variant === 'nl' && (
        <input
          id={inputId}
          type="text"
          className="iux-datepicker__field"
          placeholder={placeholder ?? 'tomorrow at 9am, next tue, in 3 days…'}
          value={text}
          disabled={disabled}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleNlSubmit() } }}
          aria-invalid={error ? true : undefined}
        />
      )}

      {(variant === 'calendar' || variant === 'range') && (
        <button
          id={inputId}
          type="button"
          className="iux-datepicker__field iux-datepicker__trigger"
          onClick={() => setOpen(o => !o)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
        >
          {variant === 'range'
            ? (currentRange[0] || currentRange[1]
                ? `${formatDate(currentRange[0], timeZone) || '…'} → ${formatDate(currentRange[1], timeZone) || '…'}`
                : placeholder ?? 'Select range')
            : (formatDate(currentValue, timeZone) || placeholder || 'Select date')}
        </button>
      )}

      {variant === 'nl' && (currentRange[0] || currentRange[1]) && (
        <div className="iux-datepicker__nl-readout">
          <strong>Range:</strong>{' '}
          {formatDateTime(currentRange[0], timeZone) || '…'}
          {' → '}
          {formatDateTime(currentRange[1], timeZone) || '…'}
        </div>
      )}

      {(variant === 'calendar' || variant === 'range') && open && (
        <div className="iux-datepicker__popover" role="dialog" aria-label="Pick a date">
          {variant === 'range' && presets && presets.length > 0 && (
            <div className="iux-datepicker__presets">
              {presets.map(p => (
                <button
                  key={p.label}
                  type="button"
                  className="iux-datepicker__preset"
                  onClick={() => {
                    const r = p.getRange()
                    commitRange([startOfDay(r[0]), startOfDay(r[1])])
                    setOpen(false)
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          <div className="iux-datepicker__calendar">
            <div className="iux-datepicker__nav">
              <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)} className="iux-datepicker__nav-btn">‹</button>
              <select
                aria-label="Month"
                value={viewMonth}
                onChange={e => setViewMonth(Number(e.target.value))}
                className="iux-datepicker__nav-select"
              >
                {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <input
                type="number"
                aria-label="Year"
                value={viewYear}
                onChange={e => setViewYear(Number(e.target.value))}
                className="iux-datepicker__nav-year"
              />
              <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)} className="iux-datepicker__nav-btn">›</button>
            </div>

            <div className="iux-datepicker__weekdays" aria-hidden="true">
              {WEEKDAYS.map((d, i) => <span key={i}>{d}</span>)}
            </div>

            <div
              role="grid"
              aria-label="Days"
              className="iux-datepicker__grid"
              onKeyDown={handleGridKey}
              tabIndex={0}
            >
              {matrix.flatMap((row, r) =>
                row.map((d, c) => {
                  const inMonth = d.getMonth() === viewMonth
                  const selected = variant === 'range'
                    ? (isSameDay(d, currentRange[0]) || isSameDay(d, currentRange[1]))
                    : isSameDay(d, currentValue)
                  const isHoverHi = variant === 'range' && rangeAnchor && hoverDay
                    ? inRange(d, rangeAnchor, hoverDay) || inRange(d, hoverDay, rangeAnchor)
                    : false
                  const isCommitted = variant === 'range' && currentRange[0] && currentRange[1]
                    ? inRange(d, currentRange[0], currentRange[1])
                    : false
                  const dis = beforeMin(d) || afterMax(d)
                  return (
                    <button
                      key={`${r}-${c}`}
                      role="gridcell"
                      type="button"
                      className={[
                        'iux-datepicker__day',
                        !inMonth && 'is-outside',
                        isSameDay(d, today) && 'is-today',
                        selected && 'is-selected',
                        (isHoverHi || isCommitted) && 'is-in-range',
                        isSameDay(d, focusedDay) && 'is-focused',
                      ].filter(Boolean).join(' ')}
                      aria-selected={selected}
                      tabIndex={isSameDay(d, focusedDay) ? 0 : -1}
                      disabled={dis || undefined}
                      onMouseEnter={() => setHoverDay(d)}
                      onMouseLeave={() => setHoverDay(prev => isSameDay(prev, d) ? null : prev)}
                      onClick={() => selectDay(d)}
                      onFocus={() => setFocusedDay(d)}
                    >
                      {d.getDate()}
                    </button>
                  )
                }),
              )}
            </div>
          </div>
        </div>
      )}

      {hint && !error && <span className="iux-datepicker__hint">{hint}</span>}
      {error && <span className="iux-datepicker__error" role="alert">{error}</span>}
      {timeZone && variant === 'nl' && (
        <span className="iux-datepicker__hint">Time zone: {timeZone}</span>
      )}
    </div>
  )
}

// ABOUTME: Returns a DatePreset covering the last N calendar days (inclusive of today), suitable for the 'range' variant's preset list.
export function presetLastNDays(n: number, label?: string): DatePreset {
  return { label: label ?? `Last ${n} days`, getRange: () => [addDays(startOfDay(new Date()), -n + 1), startOfDay(new Date())] }
}
// ABOUTME: Returns a DatePreset spanning the first to last day of the current calendar month; suitable for the 'range' variant's preset list.
export function presetThisMonth(): DatePreset {
  return {
    label: 'This month',
    getRange: () => {
      const now = new Date()
      const s = new Date(now.getFullYear(), now.getMonth(), 1)
      const e = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      return [s, e]
    },
  }
}

