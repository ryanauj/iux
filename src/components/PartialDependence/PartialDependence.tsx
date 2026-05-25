import { useMemo } from 'react'
import './PartialDependence.css'

export type PartialDependenceVariant = 'line' | 'band' | 'rug'

export type PartialDependenceIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface PartialPoint {
  x: number
  y: number
  lower?: number
  upper?: number
}

export interface PartialDependenceProps {
  variant?: PartialDependenceVariant
  /** Predicted Y across the range of the focal predictor, others held fixed. */
  curve: PartialPoint[]
  /** Optional rug — the actual x-values observed in the data. */
  rug?: number[]
  width?: number
  height?: number
  xLabel?: string
  yLabel?: string
  xDomain?: [number, number]
  yDomain?: [number, number]
  intent?: PartialDependenceIntent
  formatX?: (n: number) => string
  formatY?: (n: number) => string
  className?: string
}

const PAD = { top: 16, right: 16, bottom: 36, left: 44 }

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

export function PartialDependence({
  variant = 'band',
  curve,
  rug,
  width = 480,
  height = 280,
  xLabel,
  yLabel,
  xDomain,
  yDomain,
  intent = 'primary',
  formatX,
  formatY,
  className,
}: PartialDependenceProps) {
  const fmtX = formatX ?? defaultFormat
  const fmtY = formatY ?? defaultFormat
  const showRug = variant === 'rug' && rug && rug.length > 0

  const { xDom, yDom, xs, ys, linePath, bandPath } = useMemo(() => {
    const lo = curve.length ? Math.min(...curve.map(p => p.lower ?? p.y)) : 0
    const hi = curve.length ? Math.max(...curve.map(p => p.upper ?? p.y)) : 1
    const xLo = curve.length ? Math.min(...curve.map(p => p.x)) : 0
    const xHi = curve.length ? Math.max(...curve.map(p => p.x)) : 1
    const padY = (hi - lo) * 0.08 || 1
    const padX = (xHi - xLo) * 0.02 || 1
    const xDom: [number, number] = xDomain ?? [xLo - padX, xHi + padX]
    const yDom: [number, number] = yDomain ?? [lo - padY, hi + padY]
    const innerL = showRug ? PAD.bottom + 12 : PAD.bottom
    const xs = (v: number) => scale(v, xDom[0], xDom[1], PAD.left, width - PAD.right)
    const ys = (v: number) => scale(v, yDom[0], yDom[1], height - innerL, PAD.top)

    const linePath = curve.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(p.x).toFixed(2)} ${ys(p.y).toFixed(2)}`).join(' ')
    let bandPath: string | null = null
    if (variant !== 'line' && curve.every(p => p.lower !== undefined && p.upper !== undefined)) {
      const up = curve.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(p.x).toFixed(2)} ${ys(p.upper!).toFixed(2)}`).join(' ')
      const dn = [...curve].reverse().map(p => `L${xs(p.x).toFixed(2)} ${ys(p.lower!).toFixed(2)}`).join(' ')
      bandPath = `${up} ${dn} Z`
    }
    return { xDom, yDom, xs, ys, linePath, bandPath }
  }, [curve, width, height, xDomain, yDomain, variant, showRug])

  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]
  const baseY = height - (showRug ? PAD.bottom + 12 : PAD.bottom)

  return (
    <div className={['iux-partdep', `iux-partdep--${variant}`, `iux-partdep--${intent}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-partdep__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Partial dependence curve, ${curve.length} steps`}>
        {yTicks.map((tick, i) => {
          const y = ys(tick)
          return (
            <g key={`y-${i}`}>
              <line className="iux-partdep__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <text className="iux-partdep__tick-label" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">{fmtY(tick)}</text>
            </g>
          )
        })}
        {xTicks.map((tick, i) => {
          const x = xs(tick)
          return (
            <g key={`x-${i}`}>
              <line className="iux-partdep__gridline" x1={x} x2={x} y1={PAD.top} y2={baseY} vectorEffect="non-scaling-stroke" />
              <text className="iux-partdep__tick-label" x={x} y={baseY + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmtX(tick)}</text>
            </g>
          )
        })}
        <line className="iux-partdep__axis-line" x1={PAD.left} x2={width - PAD.right} y1={baseY} y2={baseY} vectorEffect="non-scaling-stroke" />
        <line className="iux-partdep__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={baseY} vectorEffect="non-scaling-stroke" />

        {bandPath && <path className="iux-partdep__band" d={bandPath} />}
        <path className="iux-partdep__line" d={linePath} vectorEffect="non-scaling-stroke" />

        {showRug && rug!.map((v, i) => (
          <line key={i} className="iux-partdep__rug" x1={xs(v)} x2={xs(v)} y1={baseY + 2} y2={baseY + 10} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {(xLabel || yLabel) && (
        <div className="iux-partdep__axis-labels">
          {yLabel && <span className="iux-partdep__axis-label iux-partdep__axis-label--y">y: {yLabel}</span>}
          {xLabel && <span className="iux-partdep__axis-label">x: {xLabel}</span>}
        </div>
      )}
    </div>
  )
}
