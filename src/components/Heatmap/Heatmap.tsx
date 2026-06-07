// ABOUTME: SVG grid heatmap that maps cell values to one of five tint levels in three colour schemes — continuous single-hue intensity, diverging positive/negative, and sparse (highlights only the top two intensity levels).

import { useMemo } from 'react'
import './Heatmap.css'

// ABOUTME: Colour scheme: 'continuous' maps absolute magnitude to five tint levels (l0–l4) in a single hue, 'diverging' uses separate pos/neg hues scaled from a configurable centre, 'sparse' applies tinting only at levels l3–l4 and suppresses labels on low-intensity cells.
export type HeatmapVariant = 'continuous' | 'diverging' | 'sparse'

// ABOUTME: A single cell value at a named row/column intersection; missing row×col combinations render as a 'missing' placeholder rect.
export interface HeatmapCell {
  row: string
  col: string
  value: number
}

// ABOUTME: Props for Heatmap.
export interface HeatmapProps {
  variant?: HeatmapVariant
  cells: HeatmapCell[]
  /** Row order, top-to-bottom. Defaults to discovery order in `cells`. */
  rows?: string[]
  /** Column order, left-to-right. Defaults to discovery order in `cells`. */
  cols?: string[]
  cellSize?: number
  /** Forces the diverging center on `diverging`. Defaults to 0. */
  center?: number
  formatValue?: (n: number) => string
  className?: string
}

function tintLevel(v: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (max <= 0 || v <= 0) return 0
  const r = v / max
  if (r < 0.2) return 1
  if (r < 0.45) return 2
  if (r < 0.72) return 3
  return 4
}

function divergingLevel(v: number, center: number, span: number): { side: 'pos' | 'neg' | 'zero'; level: 0 | 1 | 2 | 3 | 4 } {
  if (span <= 0 || v === center) return { side: 'zero', level: 0 }
  const r = Math.min(1, Math.abs(v - center) / span)
  const level = (r < 0.2 ? 1 : r < 0.45 ? 2 : r < 0.72 ? 3 : 4) as 1 | 2 | 3 | 4
  return { side: v > center ? 'pos' : 'neg', level }
}

function discoveryOrder(list: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const v of list) if (!seen.has(v)) { seen.add(v); out.push(v) }
  return out
}

// ABOUTME: Heatmap — a React component.
export function Heatmap({
  variant = 'continuous',
  cells,
  rows,
  cols,
  cellSize = 28,
  center = 0,
  formatValue,
  className,
}: HeatmapProps) {
  const fmt = formatValue ?? (n => Math.abs(n) >= 10 ? n.toFixed(0) : n.toFixed(1))

  const { rowList, colList, lookup, max, span } = useMemo(() => {
    const rl = rows ?? discoveryOrder(cells.map(c => c.row))
    const cl = cols ?? discoveryOrder(cells.map(c => c.col))
    const lookup = new Map<string, number>()
    let max = 0
    let span = 0
    for (const c of cells) {
      lookup.set(`${c.row}::${c.col}`, c.value)
      if (Math.abs(c.value) > max) max = Math.abs(c.value)
      const d = Math.abs(c.value - center)
      if (d > span) span = d
    }
    return { rowList: rl, colList: cl, lookup, max: max || 1, span: span || 1 }
  }, [cells, rows, cols, center])

  const gap = 2
  const labelW = 96
  const labelH = 22
  const gridW = colList.length * (cellSize + gap)
  const gridH = rowList.length * (cellSize + gap)
  const width = labelW + gridW
  const height = labelH + gridH

  const sparseFilter = variant === 'sparse'

  return (
    <div className={['iux-heatmap', `iux-heatmap--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-heatmap__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Heatmap, ${rowList.length} rows × ${colList.length} columns`}>
        {colList.map((c, i) => (
          <text
            key={`c-${c}`}
            className="iux-heatmap__col-label"
            x={labelW + i * (cellSize + gap) + cellSize / 2}
            y={labelH - 6}
            textAnchor="middle"
            dominantBaseline="alphabetic"
          >{c}</text>
        ))}
        {rowList.map((r, i) => (
          <text
            key={`r-${r}`}
            className="iux-heatmap__row-label"
            x={labelW - 8}
            y={labelH + i * (cellSize + gap) + cellSize / 2}
            textAnchor="end"
            dominantBaseline="central"
          >{r}</text>
        ))}
        {rowList.map((r, i) => colList.map((c, j) => {
          const key = `${r}::${c}`
          const v = lookup.get(key)
          const x = labelW + j * (cellSize + gap)
          const y = labelH + i * (cellSize + gap)
          if (v === undefined) {
            return <rect key={key} className="iux-heatmap__cell iux-heatmap__cell--missing" x={x} y={y} width={cellSize} height={cellSize} rx={3} />
          }
          if (variant === 'diverging') {
            const { side, level } = divergingLevel(v, center, span)
            return (
              <g key={key}>
                <rect className={`iux-heatmap__cell iux-heatmap__cell--${side} iux-heatmap__cell--l${level}`} x={x} y={y} width={cellSize} height={cellSize} rx={3}>
                  <title>{`${r} × ${c}: ${fmt(v)}`}</title>
                </rect>
              </g>
            )
          }
          const level = tintLevel(Math.abs(v), max)
          if (sparseFilter && level === 0) {
            return <rect key={key} className="iux-heatmap__cell iux-heatmap__cell--l0" x={x} y={y} width={cellSize} height={cellSize} rx={3} />
          }
          return (
            <g key={key}>
              <rect className={`iux-heatmap__cell iux-heatmap__cell--l${level}`} x={x} y={y} width={cellSize} height={cellSize} rx={3}>
                <title>{`${r} × ${c}: ${fmt(v)}`}</title>
              </rect>
              {variant !== 'sparse' && cellSize >= 26 && (
                <text className={`iux-heatmap__cell-label iux-heatmap__cell-label--l${level}`} x={x + cellSize / 2} y={y + cellSize / 2} textAnchor="middle" dominantBaseline="central">{fmt(v)}</text>
              )}
              {variant === 'sparse' && level >= 3 && cellSize >= 26 && (
                <text className={`iux-heatmap__cell-label iux-heatmap__cell-label--l${level}`} x={x + cellSize / 2} y={y + cellSize / 2} textAnchor="middle" dominantBaseline="central">{fmt(v)}</text>
              )}
            </g>
          )
        }))}
      </svg>
    </div>
  )
}
