// ABOUTME: Donut — a React component (components).

import { useMemo } from 'react'
import './Donut.css'

// ABOUTME: DonutVariant — a type alias.
export type DonutVariant = 'solid' | 'donut' | 'labeled'

// ABOUTME: DonutIntent — a type alias.
export type DonutIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: DonutSlice — an interface.
export interface DonutSlice {
  key: string
  label: string
  value: number
  intent?: DonutIntent
}

// ABOUTME: Props for Donut.
export interface DonutProps {
  variant?: DonutVariant
  data: DonutSlice[]
  size?: number
  /** Center caption (donut/labeled). */
  caption?: string
  /** Whether to show a center total. Defaults to true for donut/labeled. */
  showTotal?: boolean
  formatValue?: (n: number) => string
  className?: string
}

const INTENTS: DonutIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(s: DonutSlice, i: number): DonutIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function arcPath(cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number): string {
  const large = a1 - a0 > Math.PI ? 1 : 0
  const x0o = cx + rOuter * Math.cos(a0)
  const y0o = cy + rOuter * Math.sin(a0)
  const x1o = cx + rOuter * Math.cos(a1)
  const y1o = cy + rOuter * Math.sin(a1)
  if (rInner <= 0) {
    return `M ${cx} ${cy} L ${x0o} ${y0o} A ${rOuter} ${rOuter} 0 ${large} 1 ${x1o} ${y1o} Z`
  }
  const x0i = cx + rInner * Math.cos(a1)
  const y0i = cy + rInner * Math.sin(a1)
  const x1i = cx + rInner * Math.cos(a0)
  const y1i = cy + rInner * Math.sin(a0)
  return `M ${x0o} ${y0o} A ${rOuter} ${rOuter} 0 ${large} 1 ${x1o} ${y1o} L ${x0i} ${y0i} A ${rInner} ${rInner} 0 ${large} 0 ${x1i} ${y1i} Z`
}

// ABOUTME: Donut — a React component.
export function Donut({
  variant = 'donut',
  data,
  size = 220,
  caption,
  showTotal,
  formatValue,
  className,
}: DonutProps) {
  const fmt = formatValue ?? defaultFormat
  const cx = size / 2
  const cy = size / 2
  const rOuter = size / 2 - 6
  const rInner = variant === 'solid' ? 0 : rOuter * 0.62

  const { slices, total } = useMemo(() => {
    const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1
    let a = -Math.PI / 2
    const slices = data.map((d, i) => {
      const frac = Math.max(0, d.value) / total
      const a0 = a
      const a1 = a + frac * Math.PI * 2
      a = a1
      return { ...d, intent: intentFor(d, i), a0, a1, frac, mid: (a0 + a1) / 2 }
    })
    return { slices, total }
  }, [data])

  const showLegend = variant === 'donut' || variant === 'labeled'
  const showLabels = variant === 'labeled'
  const showCenter = (showTotal ?? (variant !== 'solid')) && rInner > 0

  return (
    <div className={['iux-donut', `iux-donut--${variant}`, className].filter(Boolean).join(' ')}>
      <div className="iux-donut__chart-wrap" style={{ width: `${size}px`, height: `${size}px` }}>
        <svg className="iux-donut__svg" viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={`Donut chart, ${data.length} parts`}>
          {slices.map(s => (
            <path
              key={s.key}
              className={`iux-donut__slice iux-donut__slice--${s.intent}`}
              d={arcPath(cx, cy, rOuter, rInner, s.a0, s.a1)}
            >
              <title>{`${s.label}: ${fmt(s.value)} (${(s.frac * 100).toFixed(1)}%)`}</title>
            </path>
          ))}
          {showLabels && slices.map(s => {
            if (s.frac < 0.05) return null
            const r = (rOuter + rInner) / 2
            const x = cx + r * Math.cos(s.mid)
            const y = cy + r * Math.sin(s.mid)
            return (
              <text key={`l-${s.key}`} className={`iux-donut__slice-label iux-donut__slice-label--${s.intent}`} x={x} y={y} textAnchor="middle" dominantBaseline="central">
                {Math.round(s.frac * 100)}%
              </text>
            )
          })}
          {showCenter && (
            <g className="iux-donut__center">
              <text className="iux-donut__total" x={cx} y={cy - 4} textAnchor="middle" dominantBaseline="central">{fmt(total)}</text>
              {caption && (
                <text className="iux-donut__caption" x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="central">{caption}</text>
              )}
            </g>
          )}
        </svg>
      </div>
      {showLegend && (
        <ul className="iux-donut__legend">
          {slices.map(s => (
            <li key={s.key} className={`iux-donut__legend-item iux-donut__legend-item--${s.intent}`}>
              <span className="iux-donut__swatch" aria-hidden="true" />
              <span className="iux-donut__legend-label">{s.label}</span>
              <span className="iux-donut__legend-value">{fmt(s.value)} · {Math.round(s.frac * 100)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
