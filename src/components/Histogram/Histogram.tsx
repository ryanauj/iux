// ABOUTME: SVG histogram component that displays a numeric distribution as binned bars with mean/median markers, supporting counts, density, and cumulative views.

import { useMemo } from 'react'
import './Histogram.css'

// ABOUTME: Selects how bar heights are scaled: raw bin counts, probability density, or cumulative proportion (0–1).
export type HistogramVariant = 'counts' | 'density' | 'cumulative'

// ABOUTME: Props for Histogram — configures the data array, bin count, optional domain clamp, display size, and a custom number formatter.
export interface HistogramProps {
  variant?: HistogramVariant
  values: number[]
  bins?: number
  domain?: [number, number]
  width?: number
  height?: number
  formatValue?: (n: number) => string
  className?: string
}

const PAD = { top: 12, right: 12, bottom: 28, left: 40 }

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

interface Bin { x0: number; x1: number; count: number }

function binValues(values: number[], binCount: number, domain?: [number, number]): Bin[] {
  if (values.length === 0) return []
  const lo = domain ? domain[0] : Math.min(...values)
  const hi = domain ? domain[1] : Math.max(...values)
  const span = hi - lo || 1
  const step = span / binCount
  const out: Bin[] = []
  for (let i = 0; i < binCount; i++) out.push({ x0: lo + step * i, x1: lo + step * (i + 1), count: 0 })
  for (const v of values) {
    if (v < lo || v > hi) continue
    const idx = Math.min(binCount - 1, Math.max(0, Math.floor((v - lo) / step)))
    out[idx].count++
  }
  return out
}

// ABOUTME: Renders a binned SVG histogram of a numeric array; bins data internally, draws y-axis gridlines and x-axis tick labels, and overlays vertical mean/median marker lines with a legend (hidden on the cumulative variant).
/**
 * Accepts a flat `values` array and bins it into `bins` equal-width buckets
 * (default 16) over the data range or an explicit `domain`. The `variant`
 * prop switches the y-axis between raw counts, probability density, and
 * running cumulative proportion. Mean and median markers are drawn as
 * vertical lines and labelled in a below-chart legend for the counts and
 * density variants. An SVG `<title>` on every bar provides an accessible
 * tooltip with the bucket range and raw count.
 */
export function Histogram({
  variant = 'counts',
  values,
  bins = 16,
  domain,
  width = 480,
  height = 240,
  formatValue,
  className,
}: HistogramProps) {
  const fmt = formatValue ?? defaultFormat

  const { bars, yMax, mean, median } = useMemo(() => {
    const raw = binValues(values, bins, domain)
    const total = values.length || 1
    let running = 0
    const bars = raw.map(b => {
      const density = b.count / total
      running += b.count
      const cumulative = running / total
      return { ...b, density, cumulative }
    })
    let yMax = 0
    if (variant === 'counts') yMax = Math.max(0, ...bars.map(b => b.count))
    else if (variant === 'density') yMax = Math.max(0, ...bars.map(b => b.density))
    else yMax = 1
    const sorted = values.slice().sort((a, b) => a - b)
    const mean = values.reduce((s, v) => s + v, 0) / Math.max(1, values.length)
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)]
    return { bars, yMax: yMax || 1, mean, median }
  }, [values, bins, domain, variant])

  if (bars.length === 0) return <div className={['iux-histogram', className].filter(Boolean).join(' ')} />

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const xLo = bars[0].x0
  const xHi = bars[bars.length - 1].x1
  const xs = (v: number) => PAD.left + ((v - xLo) / (xHi - xLo || 1)) * plotW
  const barH = (val: number) => (val / yMax) * plotH
  const baselineY = height - PAD.bottom

  const yTicks = [0, yMax / 2, yMax]
  const xTicks = [xLo, (xLo + xHi) / 2, xHi]

  const meanX = xs(mean)
  const medianX = xs(median)

  return (
    <div className={['iux-histogram', `iux-histogram--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-histogram__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Histogram of ${values.length} values, ${bins} bins`}>
        {yTicks.map((tick, i) => {
          const y = baselineY - (tick / yMax) * plotH
          return (
            <g key={`y-${i}`}>
              <line className="iux-histogram__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <text className="iux-histogram__tick-label" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">
                {variant === 'counts' ? Math.round(tick) : variant === 'cumulative' ? `${Math.round(tick * 100)}%` : tick.toFixed(2)}
              </text>
            </g>
          )
        })}
        <line className="iux-histogram__axis-line" x1={PAD.left} x2={width - PAD.right} y1={baselineY} y2={baselineY} vectorEffect="non-scaling-stroke" />
        {bars.map((b, i) => {
          const x = xs(b.x0)
          const w = Math.max(1, xs(b.x1) - xs(b.x0) - 1)
          const val = variant === 'counts' ? b.count : variant === 'density' ? b.density : b.cumulative
          const h = barH(val)
          return (
            <g key={i}>
              <rect className="iux-histogram__bar" x={x} y={baselineY - h} width={w} height={h}>
                <title>{`${fmt(b.x0)} — ${fmt(b.x1)}: ${b.count}`}</title>
              </rect>
            </g>
          )
        })}
        {variant !== 'cumulative' && (
          <>
            <line className="iux-histogram__marker iux-histogram__marker--mean" x1={meanX} x2={meanX} y1={PAD.top} y2={baselineY} vectorEffect="non-scaling-stroke">
              <title>mean {fmt(mean)}</title>
            </line>
            <line className="iux-histogram__marker iux-histogram__marker--median" x1={medianX} x2={medianX} y1={PAD.top} y2={baselineY} vectorEffect="non-scaling-stroke">
              <title>median {fmt(median)}</title>
            </line>
          </>
        )}
        {xTicks.map((tick, i) => (
          <text key={`x-${i}`} className="iux-histogram__tick-label" x={xs(tick)} y={baselineY + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">
            {fmt(tick)}
          </text>
        ))}
      </svg>
      {variant !== 'cumulative' && (
        <div className="iux-histogram__legend">
          <span className="iux-histogram__legend-item iux-histogram__legend-item--mean"><span className="iux-histogram__legend-mark" aria-hidden="true" />mean {fmt(mean)}</span>
          <span className="iux-histogram__legend-item iux-histogram__legend-item--median"><span className="iux-histogram__legend-mark" aria-hidden="true" />median {fmt(median)}</span>
          <span className="iux-histogram__legend-item"><span className="iux-histogram__legend-meta">n={values.length}</span></span>
        </div>
      )}
    </div>
  )
}
