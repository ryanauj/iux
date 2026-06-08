// ABOUTME: SVG calendar heatmap that renders daily activity data as colored cells in month, year (53-week), or streak-counting layouts.

import { useMemo } from 'react'
import './CalendarHeatmap.css'

// ABOUTME: Layout mode — 'month' shows one calendar-grid month, 'year' renders 53 weeks of columns, 'streak' uses the year layout and displays the best consecutive-day streak in the header.
export type CalendarHeatmapVariant = 'month' | 'year' | 'streak'

// ABOUTME: A single day's data point — ISO yyyy-mm-dd date string and a numeric activity value used to determine tint level (0–4).
export interface CalendarDatum {
  date: string // ISO yyyy-mm-dd
  value: number
}

// ABOUTME: Props for CalendarHeatmap — supplies daily data, variant, optional reference end date, cell pixel size, and a value formatter for tooltips and the scale legend.
export interface CalendarHeatmapProps {
  variant?: CalendarHeatmapVariant
  data: CalendarDatum[]
  /** End date for the year view (default today). */
  endDate?: Date
  cellSize?: number
  formatValue?: (n: number) => string
  className?: string
}

// ABOUTME: Monday-first weekday labels for the year/streak row axis; empty strings for Tuesday, Thursday, Saturday, Sunday keep the axis uncluttered.
const WEEKDAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']

// ABOUTME: Parses an ISO yyyy-mm-dd string into a UTC `Date` object; used to convert datum keys into date values for cell placement.
function parseISO(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1))
}

// ABOUTME: Formats a UTC `Date` as an ISO yyyy-mm-dd string, matching the format used as keys in the datum map for O(1) cell lookup.
function isoKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

// ABOUTME: Returns a new `Date` that is `n` days after `d` in UTC, used to iterate over the cell grid from `firstCell` to `lastCell`.
function addDays(d: Date, n: number): Date {
  const out = new Date(d.getTime())
  out.setUTCDate(out.getUTCDate() + n)
  return out
}

// ABOUTME: Returns the ISO weekday index (Monday = 0 … Sunday = 6) for a UTC date, used to compute leading-cell padding and week-column alignment.
/** ISO-style week: Monday = 0, Sunday = 6. */
function isoWeekday(d: Date): number {
  const js = d.getUTCDay() // 0=Sun..6=Sat
  return (js + 6) % 7
}

// ABOUTME: Maps a day's activity value to one of five discrete tint levels (0 = no activity, 1–4 = quartile bands relative to the dataset max) for CSS cell coloring.
function tintLevel(value: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (max <= 0 || value <= 0) return 0
  const r = value / max
  if (r < 0.25) return 1
  if (r < 0.5) return 2
  if (r < 0.75) return 3
  return 4
}

// ABOUTME: Renders day cells as SVG `<rect>` elements colored at one of five tint levels relative to the data maximum; 'month' builds a 7-column grid padded to Monday start, 'year'/'streak' build a 53-column week grid ending on the Sunday of `endDate`'s week.
/**
 * Builds a `Map<isoKey, value>` from `data` for O(1) lookup. 'month' computes
 * leading padding from the Monday-based weekday of the first day and renders a
 * 7×N grid. 'year' and 'streak' build a 53-week grid; 'streak' additionally
 * walks all 371 cells to count the longest consecutive non-zero run and
 * displays it in the header. A `Scale` legend strip is appended to every header.
 */
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

// ABOUTME: Renders a small five-chip tint legend strip ("less · · · · · more · max N") appended to the header of every heatmap variant for scale reference.
function Scale({ max, fmt }: { max: number; fmt: (n: number) => string }) {
  return (
    <span className="iux-calheat__scale" aria-hidden="true">
      <span className="iux-calheat__scale-label">less</span>
      {[0, 1, 2, 3, 4].map(l => <span key={l} className={`iux-calheat__scale-chip iux-calheat__cell--l${l}`} />)}
      <span className="iux-calheat__scale-label">more · max {fmt(max)}</span>
    </span>
  )
}
