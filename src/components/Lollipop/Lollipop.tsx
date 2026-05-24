import { useMemo } from 'react'
import './Lollipop.css'

export type LollipopVariant = 'sticks' | 'ranked' | 'paired'

export type LollipopIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface LollipopDatum {
  key: string
  label: string
  value: number
  /** Optional comparison value used by the `paired` variant. */
  compare?: number
  intent?: LollipopIntent
}

export interface LollipopProps {
  variant?: LollipopVariant
  data: LollipopDatum[]
  width?: number
  height?: number
  formatValue?: (n: number) => string
  /** Series label for the primary value (used in `paired` legend). */
  valueLabel?: string
  /** Series label for the compare value (used in `paired` legend). */
  compareLabel?: string
  className?: string
}

const PAD = { top: 12, right: 56, bottom: 12, left: 112 }

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

export function Lollipop({
  variant = 'sticks',
  data,
  width = 480,
  height = 240,
  formatValue,
  valueLabel = 'current',
  compareLabel = 'previous',
  className,
}: LollipopProps) {
  const fmt = formatValue ?? defaultFormat

  const rows = useMemo(() => {
    const out = data.slice()
    if (variant === 'ranked') out.sort((a, b) => b.value - a.value)
    return out
  }, [data, variant])

  const showValue = variant !== 'sticks'
  const showCompare = variant === 'paired'

  const allValues: number[] = rows.flatMap(r => showCompare && r.compare !== undefined ? [r.value, r.compare] : [r.value])
  const maxV = Math.max(1, ...allValues)
  const minV = Math.min(0, ...allValues)
  const domain: [number, number] = [minV, maxV]

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const band = plotH / Math.max(1, rows.length)
  const xs = (v: number) => PAD.left + ((v - domain[0]) / (domain[1] - domain[0])) * plotW
  const zeroX = xs(0)

  return (
    <div className={['iux-lollipop', `iux-lollipop--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      {showCompare && (
        <div className="iux-lollipop__legend">
          <span className="iux-lollipop__legend-item iux-lollipop__legend-item--current">
            <span className="iux-lollipop__legend-dot" aria-hidden="true" />{valueLabel}
          </span>
          <span className="iux-lollipop__legend-item iux-lollipop__legend-item--compare">
            <span className="iux-lollipop__legend-dot iux-lollipop__legend-dot--compare" aria-hidden="true" />{compareLabel}
          </span>
        </div>
      )}
      <svg className="iux-lollipop__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Lollipop chart, ${rows.length} categories`}>
        <line className="iux-lollipop__axis-line" x1={zeroX} x2={zeroX} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        {rows.map((r, i) => {
          const y = PAD.top + i * band + band / 2
          const intent = r.intent ?? 'primary'
          const cx = xs(r.value)
          const compareX = showCompare && r.compare !== undefined ? xs(r.compare) : null
          return (
            <g key={r.key} className={`iux-lollipop__row iux-lollipop__row--${intent}`}>
              <text className="iux-lollipop__category" x={PAD.left - 8} y={y} textAnchor="end" dominantBaseline="central">{r.label}</text>
              {compareX !== null && (
                <>
                  <line className="iux-lollipop__stick iux-lollipop__stick--compare" x1={zeroX} x2={compareX} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
                  <circle className="iux-lollipop__dot iux-lollipop__dot--compare" cx={compareX} cy={y} r={4.5}>
                    <title>{`${r.label} · ${compareLabel}: ${fmt(r.compare!)}`}</title>
                  </circle>
                </>
              )}
              <line className="iux-lollipop__stick" x1={zeroX} x2={cx} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <circle className="iux-lollipop__dot" cx={cx} cy={y} r={5.5}>
                <title>{`${r.label}: ${fmt(r.value)}`}</title>
              </circle>
              {showValue && (
                <text className="iux-lollipop__value" x={Math.max(cx, compareX ?? -Infinity) + 8} y={y} textAnchor="start" dominantBaseline="central">{fmt(r.value)}</text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
