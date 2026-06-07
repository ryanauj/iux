// ABOUTME: SVG line chart with shaded uncertainty intervals; supports a single outer band, a dual ribbon (outer + 50% inner), and a multi-series compare mode.

import { useMemo } from 'react'
import './ConfidenceBand.css'

// ABOUTME: Display mode: 'band' shows one outer uncertainty region, 'ribbon' adds an inner 50% interval, 'compare' overlays multiple series with a shared axis.
export type ConfidenceBandVariant = 'band' | 'ribbon' | 'compare'

// ABOUTME: Semantic colour token applied to a series' band and line — maps to the design-system intent palette.
export type ConfidenceIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A single time-series observation: a timestamp `t`, central estimate `y`, outer interval bounds `lo`/`hi`, and optional inner 50% bounds `lo50`/`hi50` used by the ribbon variant.
export interface ConfidencePoint {
  t: number
  /** Central estimate (mean / median / forecast). */
  y: number
  /** Lower bound of the interval. */
  lo: number
  /** Upper bound of the interval. */
  hi: number
  /** Inner band (e.g., 50% interval) — `ribbon` variant draws these too. */
  lo50?: number
  hi50?: number
}

// ABOUTME: One named data series consisting of an id, display label, ordered ConfidencePoint array, and optional intent override.
export interface ConfidenceSeries {
  id: string
  label: string
  points: ConfidencePoint[]
  intent?: ConfidenceIntent
}

// ABOUTME: Props for ConfidenceBand — variant selects the band style, series supplies the data, optional yDomain clamps the y axis, and splitT draws a vertical "now" marker.
export interface ConfidenceBandProps {
  variant?: ConfidenceBandVariant
  series: ConfidenceSeries[]
  width?: number
  height?: number
  yDomain?: [number, number]
  /** Optional vertical marker (e.g., "today" between observed and forecast). */
  splitT?: number
  formatT?: (t: number) => string
  formatY?: (y: number) => string
  className?: string
}

const PAD = { top: 16, right: 16, bottom: 28, left: 44 }
const INTENTS: ConfidenceIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(s: ConfidenceSeries, i: number): ConfidenceIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function defaultFormatT(t: number): string {
  const d = new Date(t)
  if (!Number.isFinite(d.getTime())) return String(t)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

// ABOUTME: Renders an SVG with grid lines, a horizontal baseline, per-series uncertainty bands and centre lines, an optional vertical split marker, x/y tick labels, and a multi-series legend.
/**
 * Computes the time and y domains from all series points, then scales coordinates
 * into the plot area bounded by PAD constants. For each series it builds closed SVG
 * polygon paths for the outer band (and inner 50% band in ribbon mode) plus a centre
 * polyline. The split marker, tick labels, and intent-coloured legend are all drawn
 * inline in the SVG or as a sibling div.
 */
export function ConfidenceBand({
  variant = 'band',
  series,
  width = 560,
  height = 280,
  yDomain,
  splitT,
  formatT,
  formatY,
  className,
}: ConfidenceBandProps) {
  const fmtT = formatT ?? defaultFormatT
  const fmtY = formatY ?? defaultFormat

  const { tDom, yDom } = useMemo(() => {
    let tLo = Infinity, tHi = -Infinity
    let yLo = Infinity, yHi = -Infinity
    for (const s of series) for (const p of s.points) {
      if (p.t < tLo) tLo = p.t
      if (p.t > tHi) tHi = p.t
      const lo = p.lo50 !== undefined ? Math.min(p.lo, p.lo50) : p.lo
      const hi = p.hi50 !== undefined ? Math.max(p.hi, p.hi50) : p.hi
      if (lo < yLo) yLo = lo
      if (hi > yHi) yHi = hi
    }
    if (!Number.isFinite(tLo) || !Number.isFinite(tHi)) { tLo = 0; tHi = 1 }
    if (!Number.isFinite(yLo) || !Number.isFinite(yHi)) { yLo = 0; yHi = 1 }
    const pad = (yHi - yLo) * 0.08 || 1
    return { tDom: [tLo, tHi] as [number, number], yDom: yDomain ?? [yLo - pad, yHi + pad] as [number, number] }
  }, [series, yDomain])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const xs = (t: number) => PAD.left + ((t - tDom[0]) / (tDom[1] - tDom[0] || 1)) * plotW
  const ys = (y: number) => PAD.top + (1 - (y - yDom[0]) / (yDom[1] - yDom[0] || 1)) * plotH
  const baselineY = height - PAD.bottom

  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]
  const tTicks = [tDom[0], (tDom[0] + tDom[1]) / 2, tDom[1]]

  function buildBand(points: ConfidencePoint[], picker: (p: ConfidencePoint) => { lo: number; hi: number }): string {
    if (points.length === 0) return ''
    const tops = points.map(p => `L ${xs(p.t)} ${ys(picker(p).hi)}`).join(' ')
    const bots = points.slice().reverse().map(p => `L ${xs(p.t)} ${ys(picker(p).lo)}`).join(' ')
    const start = picker(points[0])
    return `M ${xs(points[0].t)} ${ys(start.hi)} ${tops} ${bots} Z`
  }

  function buildLine(points: ConfidencePoint[]): string {
    if (points.length === 0) return ''
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs(p.t)} ${ys(p.y)}`).join(' ')
  }

  return (
    <div className={['iux-confband', `iux-confband--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-confband__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Line with confidence band, ${series.length} series`}>
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-confband__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-confband__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{fmtY(tick)}</text>
          </g>
        ))}
        <line className="iux-confband__axis-line" x1={PAD.left} x2={width - PAD.right} y1={baselineY} y2={baselineY} vectorEffect="non-scaling-stroke" />

        {series.map((s, i) => {
          const intent = intentFor(s, i)
          const cls = `iux-confband__series iux-confband__series--${intent}`
          const showInner = variant === 'ribbon' && s.points.some(p => p.lo50 !== undefined && p.hi50 !== undefined)
          return (
            <g key={s.id} className={cls}>
              <path className="iux-confband__band iux-confband__band--outer" d={buildBand(s.points, p => ({ lo: p.lo, hi: p.hi }))} />
              {showInner && (
                <path className="iux-confband__band iux-confband__band--inner" d={buildBand(s.points, p => ({ lo: p.lo50 ?? p.lo, hi: p.hi50 ?? p.hi }))} />
              )}
              <path className="iux-confband__line" d={buildLine(s.points)} fill="none" vectorEffect="non-scaling-stroke" />
            </g>
          )
        })}

        {splitT !== undefined && splitT >= tDom[0] && splitT <= tDom[1] && (
          <g className="iux-confband__split">
            <line className="iux-confband__split-line" x1={xs(splitT)} x2={xs(splitT)} y1={PAD.top} y2={baselineY} vectorEffect="non-scaling-stroke" />
            <text className="iux-confband__split-label" x={xs(splitT) + 4} y={PAD.top + 10} textAnchor="start">{fmtT(splitT)}</text>
          </g>
        )}

        {tTicks.map((tick, i) => (
          <text key={`tt-${i}`} className="iux-confband__tick-label" x={xs(tick)} y={baselineY + 6} textAnchor={i === 0 ? 'start' : i === tTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmtT(tick)}</text>
        ))}
      </svg>
      {series.length > 1 && (
        <div className="iux-confband__legend">
          {series.map((s, i) => (
            <span key={s.id} className={`iux-confband__legend-item iux-confband__legend-item--${intentFor(s, i)}`}>
              <span className="iux-confband__swatch" aria-hidden="true" />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
