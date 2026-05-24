import { useMemo } from 'react'
import './CalendarHeatmap.css'

export type CalendarHeatmapVariant = 'month' | 'year' | 'streak'

export interface CalendarDatum {
  date: string // ISO yyyy-mm-dd
  value: number
}

export interface CalendarHeatmapProps {
  variant?: CalendarHeatmapVariant
  data: CalendarDatum[]
  /** End date for the year view (default today). */
  endDate?: Date
  cellSize?: number
  formatValue?: (n: number) => string
  className?: string
}

const WEEKDAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']

function parseISO(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1))
}

function isoKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d.getTime())
  out.setUTCDate(out.getUTCDate() + n)
  return out
}

/** ISO-style week: Monday = 0, Sunday = 6. */
function isoWeekday(d: Date): number {
  const js = d.getUTCDay() // 0=Sun..6=Sat
  return (js + 6) % 7
}

function tintLevel(value: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (max <= 0 || value <= 0) return 0
  const r = value / max
  if (r < 0.25) return 1
  if (r < 0.5) return 2
  if (r < 0.75) return 3
  return 4
}

export function CalendarHeatmap({
  variant = 'year',
  data,
  endDate,
  cellSize = 12,
  formatValue,
  className,
}: CalendarHeatmapProps) {
  const fmt = formatValue ?? (n => n.toString())

  const map = useMemo(() => {
    const m = new Map<string, number>()
    for (const d of data) m.set(d.date, d.value)
    return m
  }, [data])

  const max = useMemo(() => data.reduce((mx, d) => Math.max(mx, d.value), 0), [data])

  if (variant === 'month') {
    const ref = endDate ?? (data.length ? parseISO(data[data.length - 1].date) : new Date())
    const monthStart = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), 1))
    const leadDays = isoWeekday(monthStart)
    const firstCell = addDays(monthStart, -leadDays)
    const daysInMonth = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth() + 1, 0)).getUTCDate()
    const totalCells = Math.ceil((leadDays + daysInMonth) / 7) * 7
    const gap = 3
    const width = 7 * (cellSize + gap)
    const rows = totalCells / 7
    const height = rows * (cellSize + gap) + 18

    return (
      <div className={['iux-calheat', `iux-calheat--month`, className].filter(Boolean).join(' ')}>
        <div className="iux-calheat__head">
          <span className="iux-calheat__title">{monthStart.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
          <Scale max={max} fmt={fmt} />
        </div>
        <svg className="iux-calheat__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Monthly heatmap">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((l, i) => (
            <text key={i} className="iux-calheat__dow" x={i * (cellSize + gap) + cellSize / 2} y={10} textAnchor="middle">{l}</text>
          ))}
          {Array.from({ length: totalCells }, (_, i) => {
            const d = addDays(firstCell, i)
            const inMonth = d.getUTCMonth() === ref.getUTCMonth()
            const value = inMonth ? (map.get(isoKey(d)) ?? 0) : -1
            const level = inMonth ? tintLevel(value, max) : 0
            const col = i % 7
            const row = Math.floor(i / 7)
            return (
              <rect
                key={i}
                className={`iux-calheat__cell iux-calheat__cell--l${level} ${inMonth ? '' : 'iux-calheat__cell--out'}`}
                x={col * (cellSize + gap)}
                y={18 + row * (cellSize + gap)}
                width={cellSize}
                height={cellSize}
                rx={2}
              >
                {inMonth && <title>{isoKey(d)}: {fmt(value)}</title>}
              </rect>
            )
          })}
        </svg>
      </div>
    )
  }

  // year + streak share a 53-week column layout
  const ref = endDate ?? (data.length ? parseISO(data[data.length - 1].date) : new Date())
  const endUTC = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate()))
  // End on Sunday of the current week to get clean week columns.
  const endWeekOffset = (6 - isoWeekday(endUTC) + 7) % 7
  const lastCell = addDays(endUTC, endWeekOffset)
  const totalDays = 53 * 7
  const firstCell = addDays(lastCell, -(totalDays - 1))
  const gap = 2
  const widthFull = 53 * (cellSize + gap) + 28
  const heightFull = 7 * (cellSize + gap) + 24

  let bestStreak = 0
  let currStreak = 0
  if (variant === 'streak') {
    for (let i = 0; i < totalDays; i++) {
      const d = addDays(firstCell, i)
      const v = map.get(isoKey(d)) ?? 0
      if (v > 0) {
        currStreak++
        if (currStreak > bestStreak) bestStreak = currStreak
      } else {
        currStreak = 0
      }
    }
  }

  const monthLabels: { x: number; label: string }[] = []
  let lastMonth = -1
  for (let w = 0; w < 53; w++) {
    const d = addDays(firstCell, w * 7)
    if (d.getUTCMonth() !== lastMonth) {
      monthLabels.push({ x: 28 + w * (cellSize + gap), label: d.toLocaleDateString(undefined, { month: 'short' }) })
      lastMonth = d.getUTCMonth()
    }
  }

  return (
    <div className={['iux-calheat', `iux-calheat--${variant}`, className].filter(Boolean).join(' ')}>
      <div className="iux-calheat__head">
        <span className="iux-calheat__title">
          {variant === 'streak'
            ? `Best streak ${bestStreak} day${bestStreak === 1 ? '' : 's'}`
            : `${firstCell.getUTCFullYear()}–${lastCell.getUTCFullYear()}`}
        </span>
        <Scale max={max} fmt={fmt} />
      </div>
      <svg className="iux-calheat__svg" viewBox={`0 0 ${widthFull} ${heightFull}`} width={widthFull} height={heightFull} role="img" aria-label="Yearly heatmap">
        {WEEKDAY_LABELS.map((label, row) => (
          label && (
            <text key={row} className="iux-calheat__dow" x={24} y={20 + row * (cellSize + gap) + cellSize / 2} textAnchor="end" dominantBaseline="central">{label}</text>
          )
        ))}
        {monthLabels.map((m, i) => (
          <text key={i} className="iux-calheat__month" x={m.x} y={12}>{m.label}</text>
        ))}
        {Array.from({ length: totalDays }, (_, i) => {
          const d = addDays(firstCell, i)
          const col = Math.floor(i / 7)
          const row = i % 7
          const value = map.get(isoKey(d)) ?? 0
          const level = tintLevel(value, max)
          return (
            <rect
              key={i}
              className={`iux-calheat__cell iux-calheat__cell--l${level}`}
              x={28 + col * (cellSize + gap)}
              y={20 + row * (cellSize + gap)}
              width={cellSize}
              height={cellSize}
              rx={2}
            >
              <title>{isoKey(d)}: {fmt(value)}</title>
            </rect>
          )
        })}
      </svg>
    </div>
  )
}

function Scale({ max, fmt }: { max: number; fmt: (n: number) => string }) {
  return (
    <span className="iux-calheat__scale" aria-hidden="true">
      <span className="iux-calheat__scale-label">less</span>
      {[0, 1, 2, 3, 4].map(l => <span key={l} className={`iux-calheat__scale-chip iux-calheat__cell--l${l}`} />)}
      <span className="iux-calheat__scale-label">more · max {fmt(max)}</span>
    </span>
  )
}
