import { useMemo } from 'react'
import './Bar.css'

export type BarVariant = 'simple' | 'sorted' | 'targeted'

export type BarIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface BarDatum {
  key: string
  label: string
  value: number
  intent?: BarIntent
}

export interface BarProps {
  variant?: BarVariant
  data: BarDatum[]
  width?: number
  height?: number
  target?: number
  formatValue?: (n: number) => string
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

const PAD = { top: 12, right: 12, bottom: 28, left: 40 }

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

export function Bar({
  variant = 'simple',
  data,
  width = 480,
  height = 240,
  target,
  formatValue,
  orientation = 'vertical',
  className,
}: BarProps) {
  const fmt = formatValue ?? defaultFormat

  const rows = useMemo(() => {
    const out = data.slice()
    if (variant === 'sorted' || variant === 'targeted') out.sort((a, b) => b.value - a.value)
    return out
  }, [data, variant])

  const showTarget = variant === 'targeted' && target !== undefined
  const showValueLabels = variant === 'sorted' || variant === 'targeted'

  const maxV = Math.max(0, ...rows.map(r => r.value), target ?? -Infinity)
  const minV = Math.min(0, ...rows.map(r => r.value))
  const yDomain: [number, number] = [minV, maxV === minV ? maxV + 1 : maxV]

  if (orientation === 'horizontal') {
    const pad = { top: 8, right: 56, bottom: 18, left: 100 }
    const plotW = width - pad.left - pad.right
    const plotH = height - pad.top - pad.bottom
    const band = plotH / Math.max(1, rows.length)
    const barH = Math.max(4, band - 6)

    const xs = (v: number) => pad.left + (Math.max(0, v) / Math.max(1, yDomain[1])) * plotW
    const targetX = showTarget && target !== undefined ? xs(target) : 0

    return (
      <div className={['iux-bar', `iux-bar--${variant}`, 'iux-bar--horizontal', className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
        <svg className="iux-bar__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Bar chart, ${rows.length} categories`}>
          <line className="iux-bar__axis-line" x1={pad.left} x2={pad.left} y1={pad.top} y2={height - pad.bottom} vectorEffect="non-scaling-stroke" />
          {rows.map((r, i) => {
            const y = pad.top + i * band + (band - barH) / 2
            const w = xs(r.value) - pad.left
            const intent = r.intent ?? 'primary'
            const overTarget = showTarget && target !== undefined && r.value >= target
            const tintIntent: BarIntent = showTarget
              ? (overTarget ? 'success' : 'danger')
              : intent
            return (
              <g key={r.key} className={`iux-bar__row iux-bar__row--${tintIntent}`}>
                <rect className="iux-bar__rect" x={pad.left} y={y} width={Math.max(0, w)} height={barH} rx={2} />
                <text className="iux-bar__category" x={pad.left - 8} y={y + barH / 2} textAnchor="end" dominantBaseline="central">{r.label}</text>
                {showValueLabels && (
                  <text className="iux-bar__value" x={pad.left + w + 4} y={y + barH / 2} textAnchor="start" dominantBaseline="central">{fmt(r.value)}</text>
                )}
              </g>
            )
          })}
          {showTarget && (
            <line className="iux-bar__target" x1={targetX} x2={targetX} y1={pad.top} y2={height - pad.bottom} vectorEffect="non-scaling-stroke">
              <title>target {fmt(target!)}</title>
            </line>
          )}
        </svg>
      </div>
    )
  }

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const band = plotW / Math.max(1, rows.length)
  const barW = Math.max(4, band - 6)

  const ys = (v: number) => PAD.top + (1 - (v - yDomain[0]) / (yDomain[1] - yDomain[0])) * plotH
  const targetY = showTarget && target !== undefined ? ys(target) : 0
  const baselineY = ys(Math.max(0, yDomain[0]))

  const yTicks = [yDomain[0], (yDomain[0] + yDomain[1]) / 2, yDomain[1]]

  return (
    <div className={['iux-bar', `iux-bar--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-bar__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Bar chart, ${rows.length} categories`}>
        {yTicks.map((tick, i) => {
          const y = ys(tick)
          return (
            <g key={`y-${i}`}>
              <line className="iux-bar__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <text className="iux-bar__tick-label" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">{fmt(tick)}</text>
            </g>
          )
        })}
        <line className="iux-bar__axis-line" x1={PAD.left} x2={width - PAD.right} y1={baselineY} y2={baselineY} vectorEffect="non-scaling-stroke" />
        {rows.map((r, i) => {
          const x = PAD.left + i * band + (band - barW) / 2
          const top = ys(Math.max(r.value, 0))
          const bottom = ys(Math.min(r.value, 0))
          const h = Math.max(1, bottom - top)
          const intent = r.intent ?? 'primary'
          const overTarget = showTarget && target !== undefined && r.value >= target
          const tintIntent: BarIntent = showTarget
            ? (overTarget ? 'success' : 'danger')
            : intent
          return (
            <g key={r.key} className={`iux-bar__row iux-bar__row--${tintIntent}`}>
              <rect className="iux-bar__rect" x={x} y={top} width={barW} height={h} rx={2} />
              {showValueLabels && (
                <text className="iux-bar__value" x={x + barW / 2} y={top - 4} textAnchor="middle">{fmt(r.value)}</text>
              )}
              <text className="iux-bar__category iux-bar__category--bottom" x={x + barW / 2} y={height - PAD.bottom + 6} textAnchor="middle" dominantBaseline="hanging">{r.label}</text>
            </g>
          )
        })}
        {showTarget && (
          <line className="iux-bar__target" x1={PAD.left} x2={width - PAD.right} y1={targetY} y2={targetY} vectorEffect="non-scaling-stroke">
            <title>target {fmt(target!)}</title>
          </line>
        )}
      </svg>
    </div>
  )
}
