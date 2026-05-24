import { useMemo } from 'react'
import './Waffle.css'

export type WaffleVariant = 'dots' | 'blocks' | 'icons'

export type WaffleIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface WaffleCategory {
  key: string
  label: string
  value: number
  intent?: WaffleIntent
}

export interface WaffleProps {
  variant?: WaffleVariant
  data: WaffleCategory[]
  /** Total cells along one side. Total dots = rows * rows. Defaults to 10. */
  rows?: number
  /** Size of one cell in CSS px (the unit string is added in the component). */
  cellSize?: number
  /** Optional caption above the grid (e.g. "of 100 customers"). */
  caption?: string
  className?: string
}

const INTENTS: WaffleIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(c: WaffleCategory, i: number): WaffleIntent {
  return c.intent ?? INTENTS[i % INTENTS.length]
}

export function Waffle({
  variant = 'dots',
  data,
  rows = 10,
  cellSize = 16,
  caption,
  className,
}: WaffleProps) {
  const totalCells = rows * rows

  const { assignments, total } = useMemo(() => {
    const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1
    // Largest-remainder allocation so the matrix sums exactly to totalCells.
    const raw = data.map(d => (Math.max(0, d.value) / total) * totalCells)
    const floors = raw.map(r => Math.floor(r))
    let used = floors.reduce((s, n) => s + n, 0)
    const remainders = raw
      .map((r, i) => ({ i, frac: r - Math.floor(r) }))
      .sort((a, b) => b.frac - a.frac)
    let k = 0
    while (used < totalCells && k < remainders.length) {
      floors[remainders[k].i] += 1
      used += 1
      k += 1
    }
    const assignments: { cat: WaffleCategory; intent: WaffleIntent }[] = []
    data.forEach((cat, i) => {
      const n = floors[i]
      for (let j = 0; j < n; j++) assignments.push({ cat, intent: intentFor(cat, i) })
    })
    return { assignments, total }
  }, [data, totalCells])

  const gap = variant === 'blocks' ? 2 : 3
  const width = rows * cellSize + (rows - 1) * gap
  const isIcons = variant === 'icons'
  const radiusVar = variant === 'dots' ? '50%' : '15%'

  return (
    <div className={['iux-waffle', `iux-waffle--${variant}`, className].filter(Boolean).join(' ')}>
      {caption && <div className="iux-waffle__caption">{caption}</div>}
      <svg
        className="iux-waffle__svg"
        viewBox={`0 0 ${width} ${width}`}
        width={width}
        height={width}
        role="img"
        aria-label={`Waffle chart, ${data.length} categories totalling ${total}`}
      >
        {Array.from({ length: totalCells }, (_, i) => {
          const col = i % rows
          const row = Math.floor(i / rows)
          const a = assignments[i]
          const intent = a?.intent ?? 'neutral'
          const x = col * (cellSize + gap)
          const y = row * (cellSize + gap)
          const r = cellSize / 2
          if (isIcons) {
            return (
              <g key={i} className={`iux-waffle__cell iux-waffle__cell--${intent}${a ? '' : ' iux-waffle__cell--empty'}`}>
                <circle cx={x + r} cy={y + r} r={r * 0.7}>
                  {a && <title>{`${a.cat.label}`}</title>}
                </circle>
                <circle className="iux-waffle__cell-inner" cx={x + r} cy={y + r} r={r * 0.32} />
              </g>
            )
          }
          return (
            <rect
              key={i}
              className={`iux-waffle__cell iux-waffle__cell--${intent}${a ? '' : ' iux-waffle__cell--empty'}`}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              rx={variant === 'dots' ? r : 2}
              ry={variant === 'dots' ? r : 2}
              style={{ borderRadius: radiusVar }}
            >
              {a && <title>{`${a.cat.label}`}</title>}
            </rect>
          )
        })}
      </svg>
      <ul className="iux-waffle__legend">
        {data.map((c, i) => {
          const intent = intentFor(c, i)
          const pct = Math.round((Math.max(0, c.value) / total) * 100)
          return (
            <li key={c.key} className={`iux-waffle__legend-item iux-waffle__legend-item--${intent}`}>
              <span className="iux-waffle__swatch" aria-hidden="true" />
              <span className="iux-waffle__legend-label">{c.label}</span>
              <span className="iux-waffle__legend-value">{pct}%</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
