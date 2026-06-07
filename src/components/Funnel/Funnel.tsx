// ABOUTME: SVG funnel/conversion chart with three layouts — plain stages with proportional bars, drop-off mode that appends a red loss bar to each stage, and a mirrored layout that centres bars horizontally.

import { useMemo } from 'react'
import './Funnel.css'

// ABOUTME: Layout mode: 'stages' renders left-aligned proportional bars, 'dropoff' appends a secondary bar showing the absolute count lost versus the previous stage plus a step-conversion rate label, 'mirrored' centres each bar so the funnel narrows symmetrically.
export type FunnelVariant = 'stages' | 'dropoff' | 'mirrored'

// ABOUTME: Semantic colour applied to a stage's bar fill; defaults to cycling through the intent palette by stage index.
export type FunnelIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A single funnel stage with a unique key, display label, numeric value (e.g. user count), and optional intent colour override.
export interface FunnelStage {
  key: string
  label: string
  value: number
  intent?: FunnelIntent
}

// ABOUTME: Props for Funnel — variant selects the layout, stages supplies the ordered data, showOverall controls whether the overall-conversion percentage appears beside each bar's value label.
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

// ABOUTME: Renders a horizontal bar funnel SVG where each stage's bar width is proportional to its value relative to the first stage; 'dropoff' appends a secondary drop bar and a step-conversion rate, 'mirrored' centres bars symmetrically.
/**
 * Computes each row's `overall` fraction (value / top), `dropFromPrev`, and
 * `conversionFromPrev` in a `useMemo` pass. Bar x position shifts to
 * `(plotW - w) / 2` in 'mirrored' mode. The 'dropoff' variant renders a
 * secondary rect in the drop CSS class immediately after the main bar, plus a
 * small step-rate text label below the stage name.
 */
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
