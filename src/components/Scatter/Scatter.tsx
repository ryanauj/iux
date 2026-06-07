// ABOUTME: Scatter — a React component (components).

import { useMemo } from 'react'
import './Scatter.css'

// ABOUTME: ScatterVariant — a type alias.
export type ScatterVariant = 'dots' | 'grouped' | 'regression'

// ABOUTME: ScatterIntent — a type alias.
export type ScatterIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: ScatterPoint — an interface.
export interface ScatterPoint {
  x: number
  y: number
  group?: string
  size?: number
  label?: string
}

// ABOUTME: ScatterSeries — an interface.
export interface ScatterSeries {
  id: string
  label: string
  intent?: ScatterIntent
  points: ScatterPoint[]
}

// ABOUTME: Props for Scatter.
export interface ScatterProps {
  variant?: ScatterVariant
  series: ScatterSeries[]
  width?: number
  height?: number
  xLabel?: string
  yLabel?: string
  xDomain?: [number, number]
  yDomain?: [number, number]
  formatX?: (n: number) => string
  formatY?: (n: number) => string
  className?: string
}

const PAD = { top: 16, right: 16, bottom: 32, left: 44 }
const INTENTS: ScatterIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(s: ScatterSeries, i: number): ScatterIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function leastSquares(pts: ScatterPoint[]): { m: number; b: number; r2: number } | null {
  if (pts.length < 2) return null
  const n = pts.length
  let sx = 0, sy = 0, sxx = 0, sxy = 0
  for (const p of pts) { sx += p.x; sy += p.y; sxx += p.x * p.x; sxy += p.x * p.y }
  const mean = sx / n
  const meanY = sy / n
  const denom = sxx - n * mean * mean
  if (denom === 0) return null
  const m = (sxy - n * mean * meanY) / denom
  const b = meanY - m * mean
  let ssTot = 0, ssRes = 0
  for (const p of pts) {
    ssTot += (p.y - meanY) ** 2
    const pred = m * p.x + b
    ssRes += (p.y - pred) ** 2
  }
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot
  return { m, b, r2 }
}

// ABOUTME: Scatter — a React component.
export function Scatter({
  variant = 'dots',
  series,
  width = 480,
  height = 280,
  xLabel,
  yLabel,
  xDomain,
  yDomain,
  formatX,
  formatY,
  className,
}: ScatterProps) {
  const fmtX = formatX ?? defaultFormat
  const fmtY = formatY ?? defaultFormat

  const { xDom, yDom, xs, ys, fit } = useMemo(() => {
    const all = series.flatMap(s => s.points)
    const xDom: [number, number] = xDomain ?? (all.length ? [Math.min(...all.map(p => p.x)), Math.max(...all.map(p => p.x))] : [0, 1])
    const yDom: [number, number] = yDomain ?? (all.length ? [Math.min(...all.map(p => p.y)), Math.max(...all.map(p => p.y))] : [0, 1])
    const padX = (xDom[1] - xDom[0]) * 0.04 || 1
    const padY = (yDom[1] - yDom[0]) * 0.04 || 1
    const dx: [number, number] = [xDom[0] - padX, xDom[1] + padX]
    const dy: [number, number] = [yDom[0] - padY, yDom[1] + padY]
    const xs = (v: number) => scale(v, dx[0], dx[1], PAD.left, width - PAD.right)
    const ys = (v: number) => scale(v, dy[0], dy[1], height - PAD.bottom, PAD.top)
    const fit = variant === 'regression' ? leastSquares(all) : null
    return { xDom: dx, yDom: dy, xs, ys, fit }
  }, [series, width, height, xDomain, yDomain, variant])

  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]
  const showLegend = variant === 'grouped' || series.length > 1

  return (
    <div className={['iux-scatter', `iux-scatter--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      {showLegend && (
        <div className="iux-scatter__legend">
          {series.map((s, i) => (
            <span key={s.id} className={`iux-scatter__legend-item iux-scatter__legend-item--${intentFor(s, i)}`}>
              <span className="iux-scatter__swatch" aria-hidden="true" />
              {s.label}
            </span>
          ))}
        </div>
      )}
      <svg className="iux-scatter__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Scatter plot, ${series.reduce((n, s) => n + s.points.length, 0)} points`}>
        {yTicks.map((tick, i) => {
          const y = ys(tick)
          return (
            <g key={`y-${i}`}>
              <line className="iux-scatter__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <text className="iux-scatter__tick-label" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">{fmtY(tick)}</text>
            </g>
          )
        })}
        {xTicks.map((tick, i) => {
          const x = xs(tick)
          return (
            <g key={`x-${i}`}>
              <line className="iux-scatter__gridline" x1={x} x2={x} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
              <text className="iux-scatter__tick-label" x={x} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmtX(tick)}</text>
            </g>
          )
        })}
        <line className="iux-scatter__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-scatter__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {fit && (
          <line
            className="iux-scatter__fit"
            x1={xs(xDom[0])}
            y1={ys(fit.m * xDom[0] + fit.b)}
            x2={xs(xDom[1])}
            y2={ys(fit.m * xDom[1] + fit.b)}
            vectorEffect="non-scaling-stroke"
          />
        )}

        {series.map((s, i) => {
          const intent = intentFor(s, i)
          return (
            <g key={s.id} className={`iux-scatter__series iux-scatter__series--${intent}`}>
              {s.points.map((p, j) => (
                <circle key={j} className="iux-scatter__dot" cx={xs(p.x)} cy={ys(p.y)} r={p.size ?? 3}>
                  {p.label && <title>{p.label}</title>}
                </circle>
              ))}
            </g>
          )
        })}
      </svg>
      {(xLabel || yLabel || fit) && (
        <div className="iux-scatter__axis-labels">
          {yLabel && <span className="iux-scatter__axis-label iux-scatter__axis-label--y">y: {yLabel}</span>}
          {xLabel && <span className="iux-scatter__axis-label">x: {xLabel}</span>}
          {fit && <span className="iux-scatter__fit-label">y = {fit.m.toFixed(2)}x + {fit.b.toFixed(2)} · R² {fit.r2.toFixed(2)}</span>}
        </div>
      )}
    </div>
  )
}
