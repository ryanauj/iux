// ABOUTME: Area — a React component (components).

import { useMemo } from 'react'
import './Area.css'

// ABOUTME: AreaVariant — a type alias.
export type AreaVariant = 'filled' | 'baselined' | 'gradient'

// ABOUTME: AreaIntent — a type alias.
export type AreaIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: AreaPoint — an interface.
export interface AreaPoint { t: number; y: number }

// ABOUTME: Props for Area.
export interface AreaProps {
  variant?: AreaVariant
  points: AreaPoint[]
  intent?: AreaIntent
  /** Baseline value for `baselined` variant; defaults to 0 then domain min. */
  baseline?: number
  width?: number
  height?: number
  yDomain?: [number, number]
  formatT?: (t: number) => string
  formatY?: (y: number) => string
  label?: string
  className?: string
}

const PAD = { top: 12, right: 12, bottom: 24, left: 40 }

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function defaultFormatT(t: number): string {
  const d = new Date(t)
  if (!Number.isFinite(d.getTime())) return String(t)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function defaultFormatY(y: number): string {
  if (Math.abs(y) >= 1000) return y.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(y) >= 10) return y.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return y.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

// ABOUTME: Area — a React component.
export function Area({
  variant = 'filled',
  points,
  intent = 'primary',
  baseline,
  width = 480,
  height = 200,
  yDomain,
  formatT,
  formatY,
  label,
  className,
}: AreaProps) {
  const fmtT = formatT ?? defaultFormatT
  const fmtY = formatY ?? defaultFormatY

  const { dLine, dFill, xs, ys, yDom, xDom, base } = useMemo(() => {
    if (points.length === 0) {
      return { dLine: '', dFill: '', xs: (_: number) => 0, ys: (_: number) => 0, yDom: [0, 1] as [number, number], xDom: [0, 1] as [number, number], base: 0 }
    }
    const xDom: [number, number] = [Math.min(...points.map(p => p.t)), Math.max(...points.map(p => p.t))]
    const computed: [number, number] = [Math.min(...points.map(p => p.y)), Math.max(...points.map(p => p.y))]
    const yDom: [number, number] = yDomain ?? (variant === 'baselined' ? computed : [Math.min(0, computed[0]), Math.max(0, computed[1])])
    const xs = (t: number) => scale(t, xDom[0], xDom[1], PAD.left, width - PAD.right)
    const ys = (y: number) => scale(y, yDom[0], yDom[1], height - PAD.bottom, PAD.top)
    const base = baseline ?? (variant === 'baselined' ? yDom[0] : 0)
    const baseY = ys(base)
    const lineParts: string[] = []
    points.forEach((p, i) => lineParts.push(`${i === 0 ? 'M' : 'L'} ${xs(p.t)} ${ys(p.y)}`))
    const fillParts: string[] = []
    fillParts.push(`M ${xs(points[0].t)} ${baseY}`)
    points.forEach(p => fillParts.push(`L ${xs(p.t)} ${ys(p.y)}`))
    fillParts.push(`L ${xs(points[points.length - 1].t)} ${baseY} Z`)
    return { dLine: lineParts.join(' '), dFill: fillParts.join(' '), xs, ys, yDom, xDom, base }
  }, [points, width, height, yDomain, variant, baseline])

  if (points.length === 0) return <div className={['iux-area', className].filter(Boolean).join(' ')} />

  const xTicks = [xDom[0], xDom[1]]
  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]
  const gradId = `iux-area-grad-${intent}`

  return (
    <div className={['iux-area', `iux-area--${variant}`, `iux-area--${intent}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      {label && <span className="iux-area__label">{label}</span>}
      <svg className="iux-area__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Area chart, ${points.length} points`} preserveAspectRatio="none">
        {variant === 'gradient' && (
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" className="iux-area__grad-top" />
              <stop offset="100%" className="iux-area__grad-bot" />
            </linearGradient>
          </defs>
        )}
        {yTicks.map((tick, i) => {
          const y = ys(tick)
          return (
            <g key={`y-${i}`}>
              <line className="iux-area__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <text className="iux-area__tick-label" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">{fmtY(tick)}</text>
            </g>
          )
        })}
        <path
          className="iux-area__fill"
          d={dFill}
          fill={variant === 'gradient' ? `url(#${gradId})` : undefined}
        />
        <path className="iux-area__stroke" d={dLine} fill="none" vectorEffect="non-scaling-stroke" />
        {variant === 'baselined' && (
          <line className="iux-area__baseline" x1={PAD.left} x2={width - PAD.right} y1={ys(base)} y2={ys(base)} vectorEffect="non-scaling-stroke" />
        )}
        <line className="iux-area__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        {xTicks.map((tick, i) => (
          <text key={`x-${i}`} className="iux-area__tick-label" x={xs(tick)} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : 'end'} dominantBaseline="hanging">{fmtT(tick)}</text>
        ))}
      </svg>
    </div>
  )
}
