// ABOUTME: SVG regression diagnostic plot of studentized residuals vs leverage (hᵢᵢ), with optional Cook's-distance dot sizing and flagging of influential points beyond threshold lines.

import { useMemo } from 'react'
import './LeveragePlot.css'

// ABOUTME: Controls point rendering: 'plain' draws uniform circles, 'sized' scales radius by √Cook's D, 'flagged' additionally highlights points that exceed the Cook's distance or residual threshold.
export type LeveragePlotVariant = 'plain' | 'sized' | 'flagged'

// ABOUTME: Semantic colour intent applied to the dot layer; a single intent colours all points uniformly, defaulting to 'info'.
export type LeverageIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A single observation in the leverage plot: its hat-matrix diagonal leverage value, studentized residual, and Cook's distance which drives dot radius in the 'sized'/'flagged' variants.
export interface LeveragePoint {
  leverage: number
  /** studentized residual */
  residual: number
  /** Cook's distance (>= 0) — encoded as point size on `sized`/`flagged` rungs */
  cook: number
  label?: string
}

// ABOUTME: Configures LeveragePlot — provides the point array, variant, optional residual and Cook's distance thresholds that drive reference lines and flagging, and canvas dimensions.
export interface LeveragePlotProps {
  variant?: LeveragePlotVariant
  points: LeveragePoint[]
  width?: number
  height?: number
  /** Reference horizontal lines for ±N studentized residuals. */
  residualThreshold?: number
  /** Cook's distance threshold; points above are flagged on the `flagged` rung. */
  cookThreshold?: number
  intent?: LeverageIntent
  className?: string
}

// ABOUTME: Pixel padding around the plot area: top/right/bottom/left margins that reserve space for y-axis tick labels and the x-axis tick labels below.
const PAD = { top: 16, right: 16, bottom: 32, left: 44 }

// ABOUTME: Maps a data-space value to a pixel coordinate via linear interpolation between domain [d0, d1] and range [r0, r1]; returns the midpoint when the domain collapses.
function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

// ABOUTME: Formats axis tick values for the leverage/residual axes: 1 decimal for ≥ 10, 2 decimals for ≥ 1, 3 decimals for small values near zero.
function num(n: number): string {
  if (Math.abs(n) >= 10) return n.toFixed(1)
  if (Math.abs(n) >= 1)  return n.toFixed(2)
  return n.toFixed(3)
}

// ABOUTME: Draws an SVG scatter plot of studentized residuals (y) vs leverage (x) with symmetric ±residualThreshold reference lines, a zero-residual baseline, and per-point Cook's distance encoding; axis labels and a "size ∝ √Cook's D" legend appear below the SVG.
/**
 * Computes the x-domain from leverage values (floored at 0) and the y-domain
 * symmetrically around the larger of the data range or `residualThreshold + 0.5`.
 * In the 'sized'/'flagged' variants, each circle's radius is `2 + sqrt(cook / cookMax) * 10`.
 * The 'flagged' variant additionally applies `iux-lev__dot--flag` to any point
 * whose Cook's D exceeds `cookThreshold` or whose absolute residual exceeds
 * `residualThreshold`, allowing CSS to highlight them distinctly.
 */
export function LeveragePlot({
  variant = 'sized',
  points,
  width = 480,
  height = 300,
  residualThreshold = 2,
  cookThreshold = 0.5,
  intent = 'info',
  className,
}: LeveragePlotProps) {
  const { xDom, yDom, cookMax } = useMemo(() => {
    const xs = points.map(p => p.leverage)
    const ys = points.map(p => p.residual)
    const cooks = points.map(p => p.cook)
    const xLo = Math.min(...xs, 0)
    const xHi = Math.max(...xs)
    const yMax = Math.max(...ys.map(Math.abs), residualThreshold + 0.5)
    const padX = (xHi - xLo) * 0.06 || 1
    return {
      xDom: [xLo, xHi + padX] as [number, number],
      yDom: [-yMax * 1.1, yMax * 1.1] as [number, number],
      cookMax: Math.max(...cooks, cookThreshold),
    }
  }, [points, residualThreshold, cookThreshold])

  const xs = (v: number) => scale(v, xDom[0], xDom[1], PAD.left, width - PAD.right)
  const ys = (v: number) => scale(v, yDom[0], yDom[1], height - PAD.bottom, PAD.top)
  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const yTicks = [yDom[0], -residualThreshold, 0, residualThreshold, yDom[1]]

  const sized = variant !== 'plain'
  const flagged = variant === 'flagged'

  return (
    <div className={['iux-lev', `iux-lev--${variant}`, `iux-lev--${intent}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-lev__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Residuals vs leverage">
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-lev__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-lev__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{num(tick)}</text>
          </g>
        ))}
        {xTicks.map((tick, i) => (
          <g key={`x-${i}`}>
            <line className="iux-lev__gridline" x1={xs(tick)} x2={xs(tick)} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
            <text className="iux-lev__tick-label" x={xs(tick)} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{num(tick)}</text>
          </g>
        ))}

        <line className="iux-lev__threshold" x1={PAD.left} x2={width - PAD.right} y1={ys(residualThreshold)} y2={ys(residualThreshold)} vectorEffect="non-scaling-stroke" />
        <line className="iux-lev__threshold" x1={PAD.left} x2={width - PAD.right} y1={ys(-residualThreshold)} y2={ys(-residualThreshold)} vectorEffect="non-scaling-stroke" />
        <line className="iux-lev__zero" x1={PAD.left} x2={width - PAD.right} y1={ys(0)} y2={ys(0)} vectorEffect="non-scaling-stroke" />

        <line className="iux-lev__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-lev__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {points.map((p, i) => {
          const r = sized ? 2 + Math.sqrt(p.cook / Math.max(cookMax, 1e-9)) * 10 : 3
          const flag = flagged && (p.cook > cookThreshold || Math.abs(p.residual) > residualThreshold)
          return (
            <circle key={i} className={`iux-lev__dot${flag ? ' iux-lev__dot--flag' : ''}`} cx={xs(p.leverage)} cy={ys(p.residual)} r={r}>
              {p.label && <title>{`${p.label} · D = ${p.cook.toFixed(3)}`}</title>}
            </circle>
          )
        })}
      </svg>
      <div className="iux-lev__axis-labels">
        <span className="iux-lev__axis-label iux-lev__axis-label--y">y: studentized residual</span>
        <span className="iux-lev__axis-label">x: leverage (hᵢᵢ)</span>
        {sized && <span className="iux-lev__legend">size ∝ √Cook's D</span>}
      </div>
    </div>
  )
}
