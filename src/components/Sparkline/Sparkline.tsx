// ABOUTME: Sparkline — a React component (components).

import { useMemo } from 'react'
import './Sparkline.css'

// ABOUTME: SparklineVariant — a type alias.
export type SparklineVariant = 'glyph' | 'labeled' | 'delta' | 'targeted'

// ABOUTME: Props for Sparkline.
export interface SparklineProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: SparklineVariant
  values: number[]
  label?: string
  unit?: string
  /** Target line for the `targeted` rung. */
  target?: number
  formatValue?: (n: number) => string
  width?: number
  height?: number
  className?: string
}

const PAD = 4

function scaleLinear(value: number, domain: [number, number], range: [number, number]): number {
  const [d0, d1] = domain
  const [r0, r1] = range
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function defaultFormat(n: number): string {
  if (!Number.isFinite(n)) return '—'
  const abs = Math.abs(n)
  if (abs >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (abs >= 10) return n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

// ABOUTME: Sparkline — a React component.
export function Sparkline({
  variant = 'glyph',
  values,
  label,
  unit,
  target,
  formatValue,
  width = 160,
  height = 48,
  className,
}: SparklineProps) {
  const showHeader = variant !== 'glyph'
  const showDelta = variant === 'delta' || variant === 'targeted'
  const showExtrema = variant === 'delta' || variant === 'targeted'
  const showTarget = variant === 'targeted' && target !== undefined

  const fmt = formatValue ?? defaultFormat

  const { d, dots, current, previous, min, max, targetY } = useMemo(() => {
    if (values.length === 0) {
      return { d: '', dots: { min: null, max: null }, current: NaN, previous: NaN, min: NaN, max: NaN, targetY: NaN }
    }
    const xs = (i: number) => scaleLinear(i, [0, Math.max(1, values.length - 1)], [PAD, width - PAD])
    const lo = Math.min(...values, target ?? Infinity)
    const hi = Math.max(...values, target ?? -Infinity)
    const yDomain: [number, number] = lo === hi ? [lo - 1, hi + 1] : [lo, hi]
    const ys = (v: number) => scaleLinear(v, yDomain, [height - PAD, PAD])

    const parts: string[] = []
    values.forEach((v, i) => parts.push(`${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`))

    let minIdx = 0
    let maxIdx = 0
    for (let i = 1; i < values.length; i++) {
      if (values[i] < values[minIdx]) minIdx = i
      if (values[i] > values[maxIdx]) maxIdx = i
    }

    return {
      d: parts.join(' '),
      dots: {
        min: { x: xs(minIdx), y: ys(values[minIdx]), v: values[minIdx] },
        max: { x: xs(maxIdx), y: ys(values[maxIdx]), v: values[maxIdx] },
      },
      current: values[values.length - 1],
      previous: values.length > 1 ? values[values.length - 2] : values[values.length - 1],
      min: values[minIdx],
      max: values[maxIdx],
      targetY: target !== undefined ? ys(target) : NaN,
    }
  }, [values, width, height, target])

  const delta = current - previous
  const deltaPct = previous !== 0 ? (delta / Math.abs(previous)) * 100 : 0
  const deltaIntent: 'success' | 'danger' | 'neutral' =
    delta > 0 ? 'success' : delta < 0 ? 'danger' : 'neutral'
  const overTarget = showTarget && target !== undefined && current >= target
  const targetIntent: 'success' | 'danger' = overTarget ? 'success' : 'danger'

  const ariaLabel = label
    ? `${label}: current ${fmt(current)}${unit ?? ''}, min ${fmt(min)}, max ${fmt(max)}`
    : `Trend: current ${fmt(current)}, min ${fmt(min)}, max ${fmt(max)}`

  return (
    <div
      className={['iux-sparkline', `iux-sparkline--${variant}`, className].filter(Boolean).join(' ')}
      style={{ width: `${width}px` }}
    >
      {showHeader && (
        <div className="iux-sparkline__head">
          {label && <span className="iux-sparkline__label">{label}</span>}
          <div className="iux-sparkline__values">
            <span className="iux-sparkline__number">
              {fmt(current)}
              {unit && <span className="iux-sparkline__unit">{unit}</span>}
            </span>
            {showDelta && Number.isFinite(delta) && (
              <span
                className={`iux-sparkline__delta iux-sparkline__delta--${deltaIntent}`}
                aria-label={`change ${delta >= 0 ? 'up' : 'down'} ${fmt(Math.abs(delta))}`}
              >
                <span aria-hidden="true">{delta > 0 ? '▲' : delta < 0 ? '▼' : '·'}</span>
                {fmt(Math.abs(delta))}
                {Number.isFinite(deltaPct) && Math.abs(deltaPct) < 10000 && (
                  <span className="iux-sparkline__delta-pct">{deltaPct >= 0 ? '+' : ''}{deltaPct.toFixed(1)}%</span>
                )}
              </span>
            )}
            {showTarget && target !== undefined && (
              <span
                className={`iux-sparkline__pill iux-sparkline__pill--${targetIntent}`}
                aria-label={`${overTarget ? 'above' : 'below'} target ${fmt(target)}`}
              >
                {overTarget ? 'on target' : 'below target'}
              </span>
            )}
          </div>
        </div>
      )}

      <svg
        className="iux-sparkline__svg"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="none"
      >
        {showTarget && Number.isFinite(targetY) && (
          <line
            className="iux-sparkline__target"
            x1={PAD}
            x2={width - PAD}
            y1={targetY}
            y2={targetY}
            vectorEffect="non-scaling-stroke"
          />
        )}
        {d && (
          <path
            className="iux-sparkline__path"
            d={d}
            fill="none"
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
          />
        )}
        {showExtrema && dots.min && dots.max && (
          <>
            <circle className="iux-sparkline__dot iux-sparkline__dot--min" cx={dots.min.x} cy={dots.min.y} r="2.5">
              <title>min {fmt(dots.min.v)}{unit ?? ''}</title>
            </circle>
            <circle className="iux-sparkline__dot iux-sparkline__dot--max" cx={dots.max.x} cy={dots.max.y} r="2.5">
              <title>max {fmt(dots.max.v)}{unit ?? ''}</title>
            </circle>
          </>
        )}
      </svg>
    </div>
  )
}
