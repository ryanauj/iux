// ABOUTME: SVG ridge plot (joy plot) stacking KDE density curves for multiple series, with three modes: outline-only ('lines'), filled areas ('filled'), and per-series normalized peaks ('normalized').

import { useMemo } from 'react'
import './RidgePlot.css'

// ABOUTME: Display mode: 'lines' draws only the KDE outline path, 'filled' fills the area under each curve, 'normalized' scales each series to its own peak so small-n series are visually comparable to large ones.
export type RidgePlotVariant = 'lines' | 'filled' | 'normalized'

// ABOUTME: Semantic color intent applied to a series' curve and fill; falls back to the cycling intent palette when not set.
export type RidgeIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: One density series: stable 'id', display 'label', raw 'values' (the KDE is computed internally), and an optional intent color override.
export interface RidgeSeries {
  id: string
  label: string
  values: number[]
  intent?: RidgeIntent
}

// ABOUTME: Configures RidgePlot: 'series' are drawn top-to-bottom, 'overlap' controls how far each ridge overshoots into the row above (in row-height units), 'resolution' is the number of KDE sample points, and 'xDomain' pins the shared x axis.
export interface RidgePlotProps {
  variant?: RidgePlotVariant
  /** Series rendered top → bottom. Order is the story. */
  series: RidgeSeries[]
  width?: number
  height?: number
  xDomain?: [number, number]
  /** How much each ridge can overshoot into the row above (in row heights). */
  overlap?: number
  resolution?: number
  formatX?: (n: number) => string
  className?: string
}

// ABOUTME: Pixel inset for the SVG plot area; the large left value reserves horizontal space for series name labels to the left of each baseline.
const PAD = { top: 14, right: 16, bottom: 28, left: 100 }
// ABOUTME: Ordered intent cycle used to assign distinct colors to ridge series when no explicit intent is set on a RidgeSeries; wraps modularly.
const INTENTS: RidgeIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Returns the intent for a ridge series: uses the series' own intent if set, otherwise picks from the INTENTS cycle by index.
function intentFor(s: RidgeSeries, i: number): RidgeIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

// ABOUTME: Represents one point on a computed KDE curve: the x value in data space and the corresponding density estimate y.
interface Curve { x: number; y: number }

// ABOUTME: Computes a Gaussian KDE for a value array using Silverman's rule-of-thumb bandwidth (1.06 * σ * n^{-1/5}); evaluates density at `res+1` evenly spaced points across the given domain.
function kde(values: number[], xDom: [number, number], res: number): Curve[] {
  if (values.length === 0) return []
  const n = values.length
  const mean = values.reduce((s, v) => s + v, 0) / n
  const variance = values.reduce((s, v) => s + (v - mean) * (v - mean), 0) / Math.max(1, n - 1)
  const stdev = Math.sqrt(Math.max(variance, 1e-9))
  const h = Math.max(1e-6, 1.06 * stdev * Math.pow(n, -1 / 5))
  const step = (xDom[1] - xDom[0]) / res
  const out: Curve[] = []
  const norm = 1 / (n * h * Math.sqrt(2 * Math.PI))
  for (let i = 0; i <= res; i++) {
    const x = xDom[0] + i * step
    let sum = 0
    for (const v of values) {
      const z = (x - v) / h
      sum += Math.exp(-0.5 * z * z)
    }
    out.push({ x, y: sum * norm })
  }
  return out
}

// ABOUTME: Locale-aware number formatter for x-axis tick labels: no decimals for |n|≥1000, one decimal for |n|≥10, two decimals otherwise; used when no custom formatX is provided.
function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

// ABOUTME: Renders stacked Gaussian KDE ridges using Silverman's rule-of-thumb bandwidth; each series occupies one row, curves can overlap into the row above by the 'overlap' factor, and in 'normalized' mode each curve is scaled to its own peak so amplitudes are independent.
/**
 * KDE is computed with a Gaussian kernel at `resolution` evenly-spaced x
 * points across the shared domain. In `filled` and `lines` modes a global
 * peak is used so amplitudes are comparable across series. In `normalized`
 * mode each series uses its own peak, making the shape — not the magnitude —
 * the visual story. Series labels appear left of their baseline.
 */
export function RidgePlot({
  variant = 'filled',
  series,
  width = 560,
  height = 360,
  xDomain,
  overlap = 1.6,
  resolution = 96,
  formatX,
  className,
}: RidgePlotProps) {
  const fmt = formatX ?? defaultFormat

  const { rows, xDom } = useMemo(() => {
    let lo = Infinity, hi = -Infinity
    for (const s of series) for (const v of s.values) { if (v < lo) lo = v; if (v > hi) hi = v }
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) { lo = 0; hi = 1 }
    const pad = (hi - lo) * 0.06 || 1
    const xDom: [number, number] = xDomain ?? [lo - pad, hi + pad]
    const rows = series.map(s => {
      const points = kde(s.values, xDom, resolution)
      const peak = points.reduce((m, p) => Math.max(m, p.y), 0) || 1
      return { s, points, peak }
    })
    return { rows, xDom }
  }, [series, xDomain, resolution])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const rowGap = plotH / Math.max(1, rows.length)
  const xs = (x: number) => PAD.left + ((x - xDom[0]) / (xDom[1] - xDom[0] || 1)) * plotW

  // Shared peak across series so heights are comparable (unless normalized).
  const globalPeak = rows.reduce((m, r) => Math.max(m, r.peak), 0) || 1

  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const baselineY = height - PAD.bottom

  return (
    <div className={['iux-ridge', `iux-ridge--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-ridge__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Ridge plot, ${series.length} series`}>
        {rows.map((r, i) => {
          const intent = intentFor(r.s, i)
          const baseY = PAD.top + (i + 1) * rowGap
          const peak = variant === 'normalized' ? r.peak : globalPeak
          const amp = rowGap * overlap
          const ys = (y: number) => baseY - (y / peak) * amp
          const linePath = r.points.map((p, k) => `${k === 0 ? 'M' : 'L'} ${xs(p.x)} ${ys(p.y)}`).join(' ')
          const fillPath = `${linePath} L ${xs(r.points[r.points.length - 1].x)} ${baseY} L ${xs(r.points[0].x)} ${baseY} Z`
          return (
            <g key={r.s.id} className={`iux-ridge__row iux-ridge__row--${intent}`}>
              <line className="iux-ridge__baseline" x1={PAD.left} x2={width - PAD.right} y1={baseY} y2={baseY} vectorEffect="non-scaling-stroke" />
              {variant !== 'lines' && (
                <path className="iux-ridge__fill" d={fillPath} />
              )}
              <path className="iux-ridge__line" d={linePath} fill="none" vectorEffect="non-scaling-stroke" />
              <text className="iux-ridge__label" x={PAD.left - 8} y={baseY} textAnchor="end" dominantBaseline="central">{r.s.label}</text>
            </g>
          )
        })}

        {xTicks.map((tick, i) => (
          <text key={`xt-${i}`} className="iux-ridge__tick-label" x={xs(tick)} y={baselineY + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmt(tick)}</text>
        ))}
        <line className="iux-ridge__axis-line" x1={PAD.left} x2={width - PAD.right} y1={baselineY} y2={baselineY} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
