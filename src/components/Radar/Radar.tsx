import { useMemo } from 'react'
import './Radar.css'

export type RadarVariant = 'filled' | 'multiple' | 'rings'

export type RadarIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface RadarSeries {
  id: string
  label: string
  values: number[]
  intent?: RadarIntent
}

export interface RadarProps {
  variant?: RadarVariant
  /** Axis labels, ordered clockwise from 12 o'clock. */
  axes: string[]
  series: RadarSeries[]
  size?: number
  /** Axis max value. Defaults to the maximum across all series, rounded up. */
  max?: number
  /** Number of concentric reference rings. */
  rings?: number
  formatValue?: (n: number) => string
  className?: string
}

const INTENTS: RadarIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(s: RadarSeries, i: number): RadarIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

export function Radar({
  variant = 'filled',
  axes,
  series,
  size = 280,
  max,
  rings = 4,
  formatValue,
  className,
}: RadarProps) {
  const fmt = formatValue ?? (n => n.toFixed(0))

  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 28
  const n = axes.length

  const domainMax = useMemo(() => {
    if (max !== undefined) return max
    let m = 0
    for (const s of series) for (const v of s.values) if (v > m) m = v
    if (m <= 0) return 1
    // round up to a nice number
    const mag = Math.pow(10, Math.floor(Math.log10(m)))
    return Math.ceil(m / mag) * mag
  }, [series, max])

  const angle = (i: number) => -Math.PI / 2 + (i / n) * Math.PI * 2

  const polyPoints = (vals: number[]): string => vals.map((v, i) => {
    const a = angle(i)
    const rad = (Math.max(0, Math.min(domainMax, v)) / domainMax) * r
    return `${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`
  }).join(' ')

  const ringRadii = Array.from({ length: rings }, (_, i) => r * ((i + 1) / rings))

  return (
    <div className={['iux-radar', `iux-radar--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${size}px` }}>
      <svg className="iux-radar__svg" viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={`Radar chart, ${series.length} series across ${n} axes`}>
        {ringRadii.map((rr, i) => (
          <polygon
            key={`ring-${i}`}
            className={`iux-radar__ring${i === ringRadii.length - 1 ? ' iux-radar__ring--outer' : ''}`}
            points={Array.from({ length: n }, (_, k) => `${cx + Math.cos(angle(k)) * rr},${cy + Math.sin(angle(k)) * rr}`).join(' ')}
          />
        ))}
        {variant === 'rings' && ringRadii.map((rr, i) => (
          <text
            key={`rl-${i}`}
            className="iux-radar__ring-label"
            x={cx + 3}
            y={cy - rr - 2}
            textAnchor="start"
          >{fmt(domainMax * ((i + 1) / rings))}</text>
        ))}
        {axes.map((_, i) => {
          const a = angle(i)
          return (
            <line
              key={`spoke-${i}`}
              className="iux-radar__spoke"
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(a) * r}
              y2={cy + Math.sin(a) * r}
              vectorEffect="non-scaling-stroke"
            />
          )
        })}

        {series.map((s, i) => {
          const intent = intentFor(s, i)
          return (
            <g key={s.id} className={`iux-radar__series iux-radar__series--${intent}`}>
              <polygon className="iux-radar__poly" points={polyPoints(s.values)} />
              {s.values.map((v, k) => {
                const a = angle(k)
                const rad = (Math.max(0, Math.min(domainMax, v)) / domainMax) * r
                return <circle key={k} className="iux-radar__dot" cx={cx + Math.cos(a) * rad} cy={cy + Math.sin(a) * rad} r={3}>
                  <title>{`${s.label} · ${axes[k]}: ${fmt(v)}`}</title>
                </circle>
              })}
            </g>
          )
        })}

        {axes.map((label, i) => {
          const a = angle(i)
          const lr = r + 14
          const x = cx + Math.cos(a) * lr
          const y = cy + Math.sin(a) * lr
          const anchor = Math.abs(Math.cos(a)) < 0.2 ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end')
          return (
            <text key={`ax-${i}`} className="iux-radar__axis-label" x={x} y={y} textAnchor={anchor} dominantBaseline="central">{label}</text>
          )
        })}
      </svg>
      {(variant === 'multiple' || series.length > 1) && (
        <div className="iux-radar__legend">
          {series.map((s, i) => (
            <span key={s.id} className={`iux-radar__legend-item iux-radar__legend-item--${intentFor(s, i)}`}>
              <span className="iux-radar__swatch" aria-hidden="true" />{s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
