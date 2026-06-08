// ABOUTME: SVG empirical cumulative distribution function chart that sorts raw values and draws a step-function curve from 0 to 100%; supports single, multi-series overlay, and percentile-annotated modes.

import { useMemo } from 'react'
import './EcdfPlot.css'

// ABOUTME: Display mode: 'single' renders one ECDF step curve, 'multiple' overlays several series on a shared axis, 'percentiles' adds crosshair markers at p50/p90/p95/p99 for a single series.
export type EcdfPlotVariant = 'single' | 'multiple' | 'percentiles'

// ABOUTME: Semantic colour applied to a series' step path and legend swatch; defaults to cycling through the intent palette by series index.
export type EcdfIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: One named data series: an id, display label, raw unsorted numeric values array that will be sorted internally to produce the ECDF step curve, and optional intent colour.
export interface EcdfSeries {
  id: string
  label: string
  values: number[]
  intent?: EcdfIntent
}

// ABOUTME: Props for EcdfPlot — variant selects display mode, series supplies the raw value arrays, xDomain optionally clamps the x axis, and formatX formats x-axis tick labels.
export interface EcdfPlotProps {
  variant?: EcdfPlotVariant
  series: EcdfSeries[]
  width?: number
  height?: number
  xDomain?: [number, number]
  formatX?: (n: number) => string
  className?: string
}

// ABOUTME: SVG padding insets (px) — left accommodates y-axis percentage labels, bottom the x-axis value labels.
const PAD = { top: 16, right: 16, bottom: 28, left: 44 }
// ABOUTME: Default rotation through the six intent tokens applied to series when no per-series intent is provided.
const INTENTS: EcdfIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']
// ABOUTME: The four percentile levels (p50/p90/p95/p99) annotated with crosshair markers in the 'percentiles' variant.
const HIGHLIGHT_P = [0.5, 0.9, 0.95, 0.99] as const

// ABOUTME: Returns the intent for a series at index i — uses the explicit series.intent override if set, otherwise cycles through INTENTS.
function intentFor(s: EcdfSeries, i: number): EcdfIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

// ABOUTME: Computes the p-th quantile of a pre-sorted array using linear interpolation between adjacent values; used to locate the crosshair positions at the HIGHLIGHT_P percentile levels.
function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const idx = (sorted.length - 1) * p
  const lo = Math.floor(idx); const hi = Math.ceil(idx)
  if (lo === hi) return sorted[lo]
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo)
}

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

// ABOUTME: Renders an SVG ECDF chart by sorting each series' values and building a vertical-then-horizontal step path; the 'percentiles' variant overlays crosshair lines and dot markers at p50/p90/p95/p99.
/**
 * For each series, sorts values in a `useMemo` and maps them to (x, cumulative
 * fraction) step coordinates. The step path is built by alternating horizontal
 * segments (holding the prior CDF value) with vertical jumps at each observed
 * value. Five horizontal grid lines label 0%/25%/50%/75%/100% on the y axis.
 * A colour-coded legend appears below for multi-series data.
 */
export function EcdfPlot({
  variant = 'single',
  series,
  width = 520,
  height = 280,
  xDomain,
  formatX,
  className,
}: EcdfPlotProps) {
  const fmt = formatX ?? defaultFormat

  const { rendered, xDom } = useMemo(() => {
    let lo = Infinity, hi = -Infinity
    for (const s of series) for (const v of s.values) { if (v < lo) lo = v; if (v > hi) hi = v }
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) { lo = 0; hi = 1 }
    const pad = (hi - lo) * 0.04 || 1
    const xDom: [number, number] = xDomain ?? [lo - pad, hi + pad]
    const rendered = series.map(s => {
      const sorted = s.values.slice().sort((a, b) => a - b)
      const n = sorted.length
      const steps = sorted.map((v, i) => ({ x: v, y: (i + 1) / n }))
      const quantiles = HIGHLIGHT_P.map(p => ({ p, x: quantile(sorted, p) }))
      return { s, steps, sorted, n, quantiles }
    })
    return { rendered, xDom }
  }, [series, xDomain])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const xs = (x: number) => PAD.left + ((x - xDom[0]) / (xDom[1] - xDom[0])) * plotW
  const ys = (y: number) => PAD.top + (1 - y) * plotH
  const baselineY = height - PAD.bottom

  const yTicks = [0, 0.25, 0.5, 0.75, 1]
  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]

  return (
    <div className={['iux-ecdf', `iux-ecdf--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-ecdf__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Empirical CDF, ${series.length} series`}>
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-ecdf__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-ecdf__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{(tick * 100).toFixed(0)}%</text>
          </g>
        ))}
        <line className="iux-ecdf__axis-line" x1={PAD.left} x2={width - PAD.right} y1={baselineY} y2={baselineY} vectorEffect="non-scaling-stroke" />

        {/* Step paths */}
        {rendered.map((r, i) => {
          const intent = intentFor(r.s, i)
          if (r.steps.length === 0) return null
          // Build step path: vertical-then-horizontal between each point.
          const segments: string[] = [`M ${xs(xDom[0])} ${ys(0)}`]
          let lastY = 0
          for (const p of r.steps) {
            segments.push(`L ${xs(p.x)} ${ys(lastY)}`)
            segments.push(`L ${xs(p.x)} ${ys(p.y)}`)
            lastY = p.y
          }
          segments.push(`L ${xs(xDom[1])} ${ys(lastY)}`)
          return (
            <path
              key={r.s.id}
              className={`iux-ecdf__step iux-ecdf__step--${intent}`}
              d={segments.join(' ')}
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}

        {/* Percentile guides (variant 3) */}
        {variant === 'percentiles' && rendered.length === 1 && rendered[0].quantiles.map((q, i) => (
          <g key={`pq-${i}`} className="iux-ecdf__pmark">
            <line className="iux-ecdf__pmark-line" x1={xs(q.x)} x2={xs(q.x)} y1={ys(q.p)} y2={baselineY} vectorEffect="non-scaling-stroke" />
            <line className="iux-ecdf__pmark-line" x1={PAD.left} x2={xs(q.x)} y1={ys(q.p)} y2={ys(q.p)} vectorEffect="non-scaling-stroke" />
            <circle className="iux-ecdf__pmark-dot" cx={xs(q.x)} cy={ys(q.p)} r={3} />
            <text className="iux-ecdf__pmark-label" x={xs(q.x) + 4} y={ys(q.p) - 4} textAnchor="start">{`p${Math.round(q.p * 100)} ${fmt(q.x)}`}</text>
          </g>
        ))}

        {/* X-axis ticks */}
        {xTicks.map((tick, i) => (
          <text key={`xt-${i}`} className="iux-ecdf__tick-label" x={xs(tick)} y={baselineY + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmt(tick)}</text>
        ))}
      </svg>
      {series.length > 1 && (
        <div className="iux-ecdf__legend">
          {series.map((s, i) => (
            <span key={s.id} className={`iux-ecdf__legend-item iux-ecdf__legend-item--${intentFor(s, i)}`}>
              <span className="iux-ecdf__swatch" aria-hidden="true" />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
