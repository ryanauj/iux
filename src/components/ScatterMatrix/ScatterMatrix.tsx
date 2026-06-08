// ABOUTME: SVG scatterplot matrix (SPLOM) showing pairwise relationships between numeric fields: full grid with Pearson r in upper cells ('pairs'), lower triangle only ('lower'), or diagonal histograms only ('diagonal').

import { useMemo } from 'react'
import './ScatterMatrix.css'

// ABOUTME: Layout mode: 'pairs' fills all cells (lower=scatter, diagonal=histogram, upper=Pearson r), 'lower' renders only the lower triangle plus diagonal, 'diagonal' renders only the diagonal histograms.
export type ScatterMatrixVariant = 'pairs' | 'lower' | 'diagonal'

// ABOUTME: Semantic intent color applied to scatter dots; maps to the standard intent palette.
export type ScatterMatrixIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: One numeric field in the matrix: 'key' indexes into each row record and 'label' is displayed on the diagonal cell.
export interface ScatterMatrixField {
  key: string
  label: string
}

// ABOUTME: Configures ScatterMatrix: 'fields' declares the numeric variables, 'rows' provides the record array (one entry per observation), 'cellSize' sets the pixel size of each square cell, and 'intent' colors the scatter dots.
export interface ScatterMatrixProps {
  variant?: ScatterMatrixVariant
  fields: ScatterMatrixField[]
  /** Row-major data: each object has a numeric value per field key. */
  rows: Record<string, number>[]
  cellSize?: number
  intent?: ScatterMatrixIntent
  className?: string
}

// ABOUTME: Inner padding (pixels) applied to each edge of a cell's coordinate area.
const PAD = 8

// ABOUTME: Linear interpolation from domain [d0, d1] to range [r0, r1]; returns the midpoint for a degenerate domain.
function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

// ABOUTME: Computes the Pearson correlation coefficient between two equal-length numeric arrays; returns 0 when fewer than two points or zero variance.
function pearson(xs: number[], ys: number[]): number {
  const n = xs.length
  if (n < 2) return 0
  let sx = 0, sy = 0
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i] }
  const mx = sx / n, my = sy / n
  let num = 0, dxs = 0, dys = 0
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - mx, dy = ys[i] - my
    num += dx * dy; dxs += dx * dx; dys += dy * dy
  }
  const denom = Math.sqrt(dxs * dys)
  return denom === 0 ? 0 : num / denom
}

// ABOUTME: Builds a filled SVG step-path for a histogram of the given values using the specified bin count; returns an empty string when values are empty or all equal.
function histPath(values: number[], w: number, h: number, bins = 14): string {
  if (!values.length) return ''
  const lo = Math.min(...values), hi = Math.max(...values)
  if (lo === hi) return ''
  const counts = Array(bins).fill(0)
  for (const v of values) {
    const k = Math.min(bins - 1, Math.floor(((v - lo) / (hi - lo)) * bins))
    counts[k]++
  }
  const maxC = Math.max(...counts, 1)
  const bw = (w - 2 * PAD) / bins
  let d = `M${PAD} ${h - PAD}`
  for (let i = 0; i < bins; i++) {
    const x0 = PAD + i * bw
    const x1 = PAD + (i + 1) * bw
    const y = h - PAD - (counts[i] / maxC) * (h - 2 * PAD)
    d += ` L${x0} ${y} L${x1} ${y}`
  }
  d += ` L${w - PAD} ${h - PAD} Z`
  return d
}

// ABOUTME: Renders a square grid of SVG cells: lower-triangle cells show scatter points for each field pair, diagonal cells show a 14-bin histogram of that field's values, and upper-triangle cells (in 'pairs' mode) show the Pearson r coefficient scaled by magnitude.
/**
 * Per-field domain and values are memoized from `rows`. Diagonal histograms
 * are constructed inline with a simple bin-count path. Upper-triangle r values
 * are styled with font-size proportional to |r| and colored by sign. Cells are
 * all `cellSize × cellSize` squares composed into a single SVG at `cellSize *
 * fields.length` overall dimensions.
 */
export function ScatterMatrix({
  variant = 'pairs',
  fields,
  rows,
  cellSize = 110,
  intent = 'primary',
  className,
}: ScatterMatrixProps) {
  const columns = useMemo(() => {
    const out: Record<string, { values: number[]; dom: [number, number] }> = {}
    for (const f of fields) {
      const vals = rows.map(r => r[f.key]).filter(v => Number.isFinite(v))
      const lo = Math.min(...vals), hi = Math.max(...vals)
      const pad = (hi - lo) * 0.05 || 1
      out[f.key] = { values: vals, dom: [lo - pad, hi + pad] }
    }
    return out
  }, [fields, rows])

  const totalSize = cellSize * fields.length

  return (
    <div className={['iux-splom', `iux-splom--${variant}`, `iux-splom--${intent}`, className].filter(Boolean).join(' ')} style={{ width: `${totalSize}px` }}>
      <svg className="iux-splom__svg" viewBox={`0 0 ${totalSize} ${totalSize}`} width={totalSize} height={totalSize} role="img" aria-label={`Scatterplot matrix, ${fields.length}x${fields.length}`}>
        {fields.map((rowField, i) =>
          fields.map((colField, j) => {
            const x = j * cellSize
            const y = i * cellSize
            const isDiag = i === j
            const isLower = i > j
            const isUpper = i < j
            const skip =
              (variant === 'lower' && isUpper) ||
              (variant === 'diagonal' && !isDiag && !isLower)
            if (skip) return null

            if (isDiag) {
              const d = histPath(columns[rowField.key].values, cellSize, cellSize)
              return (
                <g key={`${i}-${j}`} transform={`translate(${x} ${y})`}>
                  <rect className="iux-splom__cell" x={0} y={0} width={cellSize} height={cellSize} />
                  <path className="iux-splom__hist" d={d} />
                  <text className="iux-splom__label" x={cellSize / 2} y={cellSize / 2} textAnchor="middle" dominantBaseline="middle">{rowField.label}</text>
                </g>
              )
            }

            const xDom = columns[colField.key].dom
            const yDom = columns[rowField.key].dom
            const xs = (v: number) => scale(v, xDom[0], xDom[1], PAD, cellSize - PAD)
            const ys = (v: number) => scale(v, yDom[0], yDom[1], cellSize - PAD, PAD)

            if (variant === 'pairs' && isUpper) {
              const r = pearson(rows.map(r => r[colField.key]), rows.map(r => r[rowField.key]))
              const mag = Math.min(1, Math.abs(r))
              return (
                <g key={`${i}-${j}`} transform={`translate(${x} ${y})`}>
                  <rect className="iux-splom__cell" x={0} y={0} width={cellSize} height={cellSize} />
                  <text className={`iux-splom__corr iux-splom__corr--${r >= 0 ? 'pos' : 'neg'}`} x={cellSize / 2} y={cellSize / 2} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: `${0.8 + mag * 0.9}em` }}>{r.toFixed(2)}</text>
                </g>
              )
            }

            return (
              <g key={`${i}-${j}`} transform={`translate(${x} ${y})`}>
                <rect className="iux-splom__cell" x={0} y={0} width={cellSize} height={cellSize} />
                {rows.map((row, k) => (
                  <circle key={k} className="iux-splom__dot" cx={xs(row[colField.key])} cy={ys(row[rowField.key])} r={1.6} />
                ))}
              </g>
            )
          }),
        )}
      </svg>
    </div>
  )
}
