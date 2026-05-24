import { useMemo } from 'react'
import './Funnel.css'

export type FunnelVariant = 'stages' | 'dropoff' | 'mirrored'

export type FunnelIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface FunnelStage {
  key: string
  label: string
  value: number
  intent?: FunnelIntent
}

export interface FunnelProps {
  variant?: FunnelVariant
  stages: FunnelStage[]
  width?: number
  height?: number
  formatValue?: (n: number) => string
  /** Show percentage of the first stage on each row. Defaults to true. */
  showOverall?: boolean
  className?: string
}

const INTENTS: FunnelIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(s: FunnelStage, i: number): FunnelIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  return n.toString()
}

export function Funnel({
  variant = 'stages',
  stages,
  width = 480,
  height = 280,
  formatValue,
  showOverall = true,
  className,
}: FunnelProps) {
  const fmt = formatValue ?? defaultFormat

  const { rows, top } = useMemo(() => {
    const top = stages.length > 0 ? Math.max(1, stages[0].value) : 1
    let prev = top
    const rows = stages.map((s, i) => {
      const dropFromPrev = i === 0 ? 0 : Math.max(0, prev - s.value)
      const conversionFromPrev = i === 0 ? 1 : (prev > 0 ? s.value / prev : 0)
      const overall = s.value / top
      prev = s.value
      return { ...s, dropFromPrev, conversionFromPrev, overall, intent: intentFor(s, i) }
    })
    return { rows, top }
  }, [stages])

  const PAD = { top: 12, right: 96, bottom: 12, left: 120 }
  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const band = plotH / Math.max(1, rows.length)
  const barH = Math.max(8, band - 8)

  return (
    <div className={['iux-funnel', `iux-funnel--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-funnel__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Funnel chart, ${stages.length} stages`}>
        {rows.map((r, i) => {
          const w = r.overall * plotW
          const y = PAD.top + i * band + (band - barH) / 2
          const x = variant === 'mirrored' ? PAD.left + (plotW - w) / 2 : PAD.left
          return (
            <g key={r.key} className={`iux-funnel__row iux-funnel__row--${r.intent}`}>
              <text className="iux-funnel__label" x={PAD.left - 10} y={y + barH / 2} textAnchor="end" dominantBaseline="central">{r.label}</text>
              <rect className="iux-funnel__bar" x={x} y={y} width={Math.max(2, w)} height={barH} rx={3}>
                <title>{`${r.label}: ${fmt(r.value)} (${Math.round(r.overall * 100)}% of top)`}</title>
              </rect>

              {variant === 'dropoff' && i > 0 && r.dropFromPrev > 0 && (
                <rect
                  className="iux-funnel__drop"
                  x={x + Math.max(2, w)}
                  y={y}
                  width={Math.max(0, (r.dropFromPrev / top) * plotW)}
                  height={barH}
                  rx={3}
                >
                  <title>{`Drop-off: ${fmt(r.dropFromPrev)} (${Math.round((1 - r.conversionFromPrev) * 100)}%)`}</title>
                </rect>
              )}

              <text className="iux-funnel__value" x={x + Math.max(2, w) + 8} y={y + barH / 2} textAnchor="start" dominantBaseline="central">
                {fmt(r.value)}{showOverall && i > 0 && (
                  <tspan className="iux-funnel__meta" dx={6}>{Math.round(r.overall * 100)}%</tspan>
                )}
              </text>

              {variant === 'dropoff' && i > 0 && (
                <text className="iux-funnel__rate" x={PAD.left - 10} y={y + barH + 2} textAnchor="end" dominantBaseline="hanging">
                  {Math.round(r.conversionFromPrev * 100)}%
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
