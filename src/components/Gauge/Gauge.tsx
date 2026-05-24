import { useMemo } from 'react'
import './Gauge.css'

export type GaugeVariant = 'arc' | 'zones' | 'full'

export type GaugeIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface GaugeZone {
  /** Fraction of the range this zone covers, [0..1]. Zones run low → high. */
  fraction: number
  intent: GaugeIntent
}

export interface GaugeProps {
  variant?: GaugeVariant
  value: number
  /** Defaults to 0. */
  min?: number
  /** Defaults to 100. */
  max?: number
  /** Optional target marker drawn as a notch on the arc. */
  target?: number
  /** Used by the `zones` variant. Fractions must sum to ≤ 1; remainder is danger. */
  zones?: GaugeZone[]
  size?: number
  /** Short label under the value (e.g. "uptime", "score"). */
  caption?: string
  formatValue?: (n: number) => string
  className?: string
}

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toFixed(1)
  return n.toFixed(2)
}

function polar(cx: number, cy: number, r: number, ang: number): [number, number] {
  return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
}

function arcPath(cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number): string {
  const large = a1 - a0 > Math.PI ? 1 : 0
  const [x0o, y0o] = polar(cx, cy, rOuter, a0)
  const [x1o, y1o] = polar(cx, cy, rOuter, a1)
  const [x0i, y0i] = polar(cx, cy, rInner, a1)
  const [x1i, y1i] = polar(cx, cy, rInner, a0)
  return `M ${x0o} ${y0o} A ${rOuter} ${rOuter} 0 ${large} 1 ${x1o} ${y1o} L ${x0i} ${y0i} A ${rInner} ${rInner} 0 ${large} 0 ${x1i} ${y1i} Z`
}

export function Gauge({
  variant = 'arc',
  value,
  min = 0,
  max = 100,
  target,
  zones,
  size = 200,
  caption,
  formatValue,
  className,
}: GaugeProps) {
  const fmt = formatValue ?? defaultFormat

  const isFull = variant === 'full'
  const startAngle = isFull ? -Math.PI / 2 : Math.PI * 0.85
  const endAngle = isFull ? Math.PI * 1.5 : Math.PI * 0.15
  const sweep = endAngle - startAngle
  const cx = size / 2
  const cy = isFull ? size / 2 : size * 0.62
  const rOuter = size / 2 - 6
  const rInner = rOuter * 0.72

  const clamped = Math.max(min, Math.min(max, value))
  const frac = (clamped - min) / Math.max(1e-9, max - min)

  const valueAngle = startAngle + frac * sweep

  const arcBands = useMemo(() => {
    if (variant !== 'zones') return null
    const zs = zones && zones.length > 0
      ? zones
      : [{ fraction: 0.6, intent: 'success' as GaugeIntent }, { fraction: 0.25, intent: 'warning' as GaugeIntent }, { fraction: 0.15, intent: 'danger' as GaugeIntent }]
    let acc = 0
    return zs.map(z => {
      const a0 = startAngle + acc * sweep
      acc += Math.max(0, z.fraction)
      const a1 = startAngle + Math.min(1, acc) * sweep
      return { intent: z.intent, a0, a1 }
    })
  }, [variant, zones, startAngle, sweep])

  const valueIntent: GaugeIntent = useMemo(() => {
    if (!arcBands) return 'primary'
    let acc = 0
    for (const b of arcBands) {
      const top = acc + (b.a1 - b.a0) / sweep
      if (frac <= top + 1e-6) return b.intent
      acc = top
    }
    return arcBands[arcBands.length - 1]?.intent ?? 'primary'
  }, [arcBands, frac, sweep])

  const targetAngle = target !== undefined ? startAngle + ((Math.max(min, Math.min(max, target)) - min) / Math.max(1e-9, max - min)) * sweep : null

  const width = size
  const height = isFull ? size : size * 0.78

  return (
    <div className={['iux-gauge', `iux-gauge--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-gauge__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Gauge value ${fmt(value)} of ${fmt(max)}`}>
        <path className="iux-gauge__track" d={arcPath(cx, cy, rOuter, rInner, startAngle, endAngle)} />

        {variant === 'zones' && arcBands?.map((b, i) => (
          <path key={i} className={`iux-gauge__zone iux-gauge__zone--${b.intent}`} d={arcPath(cx, cy, rOuter, rInner, b.a0, b.a1)} />
        ))}

        {variant !== 'zones' && (
          <path className="iux-gauge__value-arc" d={arcPath(cx, cy, rOuter, rInner, startAngle, valueAngle)} />
        )}

        {targetAngle !== null && (() => {
          const [x0, y0] = polar(cx, cy, rInner - 2, targetAngle)
          const [x1, y1] = polar(cx, cy, rOuter + 4, targetAngle)
          return <line className="iux-gauge__target" x1={x0} y1={y0} x2={x1} y2={y1} vectorEffect="non-scaling-stroke">
            <title>target {fmt(target!)}</title>
          </line>
        })()}

        {(() => {
          const [tx, ty] = polar(cx, cy, (rOuter + rInner) / 2, valueAngle)
          return <circle className={`iux-gauge__needle iux-gauge__needle--${valueIntent}`} cx={tx} cy={ty} r={5} />
        })()}

        <text className={`iux-gauge__value iux-gauge__value--${valueIntent}`} x={cx} y={isFull ? cy : cy - 8} textAnchor="middle" dominantBaseline="central">{fmt(value)}</text>
        {caption && (
          <text className="iux-gauge__caption" x={cx} y={isFull ? cy + 22 : cy + 14} textAnchor="middle" dominantBaseline="central">{caption}</text>
        )}

        {!isFull && (
          <>
            <text className="iux-gauge__bound" x={cx + Math.cos(startAngle) * (rOuter + 2)} y={cy + Math.sin(startAngle) * (rOuter + 2)} textAnchor="end" dominantBaseline="hanging">{fmt(min)}</text>
            <text className="iux-gauge__bound" x={cx + Math.cos(endAngle) * (rOuter + 2)} y={cy + Math.sin(endAngle) * (rOuter + 2)} textAnchor="start" dominantBaseline="hanging">{fmt(max)}</text>
          </>
        )}
      </svg>
    </div>
  )
}
