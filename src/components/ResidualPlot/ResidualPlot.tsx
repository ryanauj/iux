// ABOUTME: SVG residuals-vs-fitted diagnostic plot with three variants: raw scatter ('scatter'), scatter plus a tricube-weighted smooth curve ('smoothed'), and scatter plus smooth plus a ±N·σ shaded band ('banded').

import { useMemo } from 'react'
import './ResidualPlot.css'

// ABOUTME: Display mode for the residual plot: 'scatter' shows points only, 'smoothed' adds a tricube-weighted lowess-style curve, 'banded' also draws a ±sdBand·σ shaded rectangle and reports the σ estimate in the footer.
export type ResidualPlotVariant = 'scatter' | 'smoothed' | 'banded'

// ABOUTME: Semantic intent color applied to scatter dots and the smooth curve; maps to the standard intent palette.
export type ResidualIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: One observation: fitted value on x, residual on y, and an optional tooltip label shown on hover.
export interface ResidualPoint {
  fitted: number
  residual: number
  label?: string
}

// ABOUTME: Configures ResidualPlot: 'points' supplies the fitted/residual pairs, 'smoothWindow' sets the tricube bandwidth as a fraction of the x range, 'sdBand' sets the ±N·σ multiplier for the 'banded' variant, and 'intent' colors the dots and smoother.
export interface ResidualPlotProps {
  variant?: ResidualPlotVariant
  points: ResidualPoint[]
  width?: number
  height?: number
  /** width of moving-average window for the smoother, as fraction of x-range */
  smoothWindow?: number
  /** ±N residual-sd band, drawn on the banded rung */
  sdBand?: number
  xLabel?: string
  yLabel?: string
  intent?: ResidualIntent
  className?: string
}

// ABOUTME: Pixel inset for the SVG plot area on each side, leaving room for axis tick labels and the x-axis label below.
const PAD = { top: 16, right: 16, bottom: 32, left: 44 }

// ABOUTME: Formats a residual or fitted value for axis tick labels and the σ footer: no decimals for |n|≥100, one decimal for |n|≥10, two decimals otherwise.
function num(n: number): string {
  if (Math.abs(n) >= 100) return n.toFixed(0)
  if (Math.abs(n) >= 10)  return n.toFixed(1)
  return n.toFixed(2)
}

// ABOUTME: Linear interpolation from a domain interval to a pixel range; returns the midpoint when the domain is degenerate (d0 === d1) to avoid division by zero.
function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

// ABOUTME: Computes a tricube-weighted moving mean at 60 evenly-spaced x positions across the fitted range; used as a cheap lowess stand-in for the 'smoothed' and 'banded' variants.
/** Tricube-weighted moving mean — a cheap lowess stand-in. */
function smooth(pts: ResidualPoint[], windowFrac: number): { x: number; y: number }[] {
  if (pts.length < 3) return []
  const sorted = pts.slice().sort((a, b) => a.fitted - b.fitted)
  const xs = sorted.map(p => p.fitted)
  const ys = sorted.map(p => p.residual)
  const range = xs[xs.length - 1] - xs[0]
  const h = Math.max(range * windowFrac, 1e-9)
  const grid = 60
  const out: { x: number; y: number }[] = []
  for (let i = 0; i < grid; i++) {
    const x = xs[0] + (range * i) / (grid - 1)
    let wsum = 0, ysum = 0
    for (let k = 0; k < xs.length; k++) {
      const u = Math.abs(xs[k] - x) / h
      if (u >= 1) continue
      const w = (1 - u ** 3) ** 3
      wsum += w
      ysum += w * ys[k]
    }
    if (wsum > 0) out.push({ x, y: ysum / wsum })
  }
  return out
}

// ABOUTME: Renders an SVG residuals-vs-fitted plot: symmetric y domain centered at zero, a zero-reference line, scatter dots with optional tooltips, a tricube-weighted smooth (60-point grid) in 'smoothed'/'banded' modes, and a shaded ±sdBand·σ rectangle in 'banded' mode with the σ estimate in the footer.
/**
 * The y axis is always symmetric around zero so deviations above and below the
 * reference line are visually comparable. The smoother is a kernel moving mean
 * with tricube weights, evaluated on a 60-point evenly-spaced grid — a cheap
 * lowess stand-in that is fast enough to recompute on each render without
 * memoization concerns.
 */
export function ResidualPlot({
  variant = 'smoothed',
  points,
  width = 480,
  height = 280,
  smoothWindow = 0.3,
  sdBand = 2,
  xLabel = 'fitted',
  yLabel = 'residual',
  intent = 'info',
  className,
}: ResidualPlotProps) {
  const { xDom, yDom, sd, smoothPath } = useMemo(() => {
    const fs = points.map(p => p.fitted)
    const rs = points.map(p => p.residual)
    const xLo = Math.min(...fs), xHi = Math.max(...fs)
    const yMax = Math.max(...rs.map(Math.abs))
    const padX = (xHi - xLo) * 0.04 || 1
    const padY = yMax * 0.1 || 1
    const xDom: [number, number] = [xLo - padX, xHi + padX]
    const yDom: [number, number] = [-yMax - padY, yMax + padY]
    const mean = rs.reduce((a, b) => a + b, 0) / rs.length
    const variance = rs.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, rs.length - 1)
    const sd = Math.sqrt(variance)
    const xs = (v: number) => scale(v, xDom[0], xDom[1], PAD.left, width - PAD.right)
    const ys = (v: number) => scale(v, yDom[0], yDom[1], height - PAD.bottom, PAD.top)
    let smoothPath = ''
    if (variant !== 'scatter') {
      const sm = smooth(points, smoothWindow)
      smoothPath = sm.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(p.x).toFixed(2)} ${ys(p.y).toFixed(2)}`).join(' ')
    }
    return { xDom, yDom, sd, smoothPath, xs, ys }
  }, [points, width, height, smoothWindow, variant])

  const xs = (v: number) => scale(v, xDom[0], xDom[1], PAD.left, width - PAD.right)
  const ys = (v: number) => scale(v, yDom[0], yDom[1], height - PAD.bottom, PAD.top)
  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const yTicks = [yDom[0], 0, yDom[1]]

  return (
    <div className={['iux-residplot', `iux-residplot--${variant}`, `iux-residplot--${intent}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-residplot__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Residuals vs fitted, ${points.length} points`}>
        {yTicks.map((tick, i) => {
          const y = ys(tick)
          return (
            <g key={`y-${i}`}>
              <line className="iux-residplot__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <text className="iux-residplot__tick-label" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">{num(tick)}</text>
            </g>
          )
        })}
        {xTicks.map((tick, i) => {
          const x = xs(tick)
          return (
            <g key={`x-${i}`}>
              <line className="iux-residplot__gridline" x1={x} x2={x} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
              <text className="iux-residplot__tick-label" x={x} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{num(tick)}</text>
            </g>
          )
        })}

        {variant === 'banded' && (
          <rect
            className="iux-residplot__band"
            x={PAD.left}
            y={ys(sdBand * sd)}
            width={width - PAD.left - PAD.right}
            height={ys(-sdBand * sd) - ys(sdBand * sd)}
          />
        )}

        <line className="iux-residplot__zero" x1={PAD.left} x2={width - PAD.right} y1={ys(0)} y2={ys(0)} vectorEffect="non-scaling-stroke" />
        <line className="iux-residplot__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-residplot__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {points.map((p, i) => (
          <circle key={i} className="iux-residplot__dot" cx={xs(p.fitted)} cy={ys(p.residual)} r={2.5}>
            {p.label && <title>{p.label}</title>}
          </circle>
        ))}

        {smoothPath && <path className="iux-residplot__smooth" d={smoothPath} vectorEffect="non-scaling-stroke" />}
      </svg>
      <div className="iux-residplot__axis-labels">
        <span className="iux-residplot__axis-label iux-residplot__axis-label--y">y: {yLabel}</span>
        <span className="iux-residplot__axis-label">x: {xLabel}</span>
        {variant === 'banded' && <span className="iux-residplot__legend">±{sdBand}σ band: {num(sd)}</span>}
      </div>
    </div>
  )
}
