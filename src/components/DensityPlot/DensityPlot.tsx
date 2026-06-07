// ABOUTME: SVG kernel density estimation plot that smooths raw value arrays into continuous curves using Silverman's bandwidth rule; supports single filled, multi-series overlay, and filled-area modes.

import { useMemo } from 'react'
import './DensityPlot.css'

// ABOUTME: Display mode: 'single' renders one filled KDE curve, 'multiple' overlays several unfilled curves on a shared axis, 'filled' forces shaded fill for all curves in a multi-series overlay.
export type DensityPlotVariant = 'single' | 'multiple' | 'filled'

// ABOUTME: Semantic colour applied to a series' curve and fill area; defaults to cycling through the intent palette by series index.
export type DensityIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: One named data series: an id, display label, raw numeric values array that will be smoothed by KDE, and optional intent colour override.
export interface DensitySeries {
  id: string
  label: string
  values: number[]
  intent?: DensityIntent
}

// ABOUTME: Props for DensityPlot — variant selects fill/overlay mode, series supplies raw value arrays, xDomain clamps the x axis, and resolution controls how many KDE evaluation points are computed.
export interface DensityPlotProps {
  variant?: DensityPlotVariant
  series: DensitySeries[]
  width?: number
  height?: number
  xDomain?: [number, number]
  /** Number of evaluation points along the x axis. */
  resolution?: number
  formatX?: (n: number) => string
  className?: string
}

const PAD = { top: 16, right: 16, bottom: 28, left: 44 }
const INTENTS: DensityIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(s: DensitySeries, i: number): DensityIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

interface Curve { x: number; y: number }

function kde(values: number[], xDom: [number, number], res: number): Curve[] {
  if (values.length === 0) return []
  const n = values.length
  const mean = values.reduce((s, v) => s + v, 0) / n
  const variance = values.reduce((s, v) => s + (v - mean) * (v - mean), 0) / Math.max(1, n - 1)
  const stdev = Math.sqrt(Math.max(variance, 1e-9))
  // Silverman's rule of thumb.
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

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

// ABOUTME: Renders an SVG density plot by running Gaussian KDE (Silverman bandwidth) over each series' values, then drawing the resulting curve as an SVG polyline with an optional filled area beneath it.
/**
 * Auto-derives x domain from the union of all values, padding by 6%, then
 * evaluates each curve at `resolution` equally-spaced points. 'single' and
 * 'filled' render both a filled area path and a stroke line; 'multiple' renders
 * only the stroke lines. The y-axis is normalised to the peak density across all
 * series, with four horizontal grid lines at 25%/50%/75%/100%. A colour-coded
 * legend with sample count appears below when more than one series is provided.
 */
export function DensityPlot({
  variant = 'single',
  series,
  width = 520,
  height = 280,
  xDomain,
  resolution = 96,
  formatX,
  className,
}: DensityPlotProps) {
  const fmt = formatX ?? defaultFormat

  const { curves, xDom, yMax } = useMemo(() => {
    let lo = Infinity, hi = -Infinity
    for (const s of series) for (const v of s.values) { if (v < lo) lo = v; if (v > hi) hi = v }
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) { lo = 0; hi = 1 }
    const pad = (hi - lo) * 0.06 || 1
    const xDom: [number, number] = xDomain ?? [lo - pad, hi + pad]
    const curves = series.map(s => ({ s, points: kde(s.values, xDom, resolution) }))
    let yMax = 0
    for (const c of curves) for (const p of c.points) if (p.y > yMax) yMax = p.y
    if (yMax === 0) yMax = 1
    return { curves, xDom, yMax }
  }, [series, xDomain, resolution])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const xs = (x: number) => PAD.left + ((x - xDom[0]) / (xDom[1] - xDom[0])) * plotW
  const ys = (y: number) => PAD.top + (1 - y / yMax) * plotH
  const baselineY = height - PAD.bottom

  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]

  const isFilled = variant === 'filled' || variant === 'single'

  return (
    <div className={['iux-density', `iux-density--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-density__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Density plot, ${series.length} series`}>
        {/* Gridlines */}
        {[0.25, 0.5, 0.75, 1].map((p, i) => {
          const y = PAD.top + (1 - p) * plotH
          return <line key={`g-${i}`} className="iux-density__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
        })}
        <line className="iux-density__axis-line" x1={PAD.left} x2={width - PAD.right} y1={baselineY} y2={baselineY} vectorEffect="non-scaling-stroke" />

        {curves.map((c, i) => {
          const intent = intentFor(c.s, i)
          const path = c.points.map((p, k) => `${k === 0 ? 'M' : 'L'} ${xs(p.x)} ${ys(p.y)}`).join(' ')
          const filledPath = `M ${xs(c.points[0].x)} ${baselineY} L ${xs(c.points[0].x)} ${ys(c.points[0].y)} ${c.points.slice(1).map(p => `L ${xs(p.x)} ${ys(p.y)}`).join(' ')} L ${xs(c.points[c.points.length - 1].x)} ${baselineY} Z`
          return (
            <g key={c.s.id} className={`iux-density__series iux-density__series--${intent}`}>
              {isFilled && (
                <path className="iux-density__area" d={filledPath} />
              )}
              <path className="iux-density__line" d={path} fill="none" vectorEffect="non-scaling-stroke" />
            </g>
          )
        })}

        {/* X-axis ticks */}
        {xTicks.map((tick, i) => (
          <text key={`xt-${i}`} className="iux-density__tick-label" x={xs(tick)} y={baselineY + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">
            {fmt(tick)}
          </text>
        ))}
      </svg>
      {series.length > 1 && (
        <div className="iux-density__legend">
          {series.map((s, i) => (
            <span key={s.id} className={`iux-density__legend-item iux-density__legend-item--${intentFor(s, i)}`}>
              <span className="iux-density__swatch" aria-hidden="true" />
              {s.label}
              <span className="iux-density__meta">n={s.values.length}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
