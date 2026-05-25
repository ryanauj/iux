import { useMemo } from 'react'
import './CoefficientPlot.css'

export type CoefficientPlotVariant = 'point' | 'interval' | 'sorted'

export type CoefficientIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface Coefficient {
  key: string
  label: string
  estimate: number
  /** lower bound of confidence interval (e.g. 95%) */
  lower?: number
  /** upper bound of confidence interval (e.g. 95%) */
  upper?: number
  intent?: CoefficientIntent
}

export interface CoefficientPlotProps {
  variant?: CoefficientPlotVariant
  coefficients: Coefficient[]
  width?: number
  height?: number
  /** Reference value for the vertical line. Defaults to 0 (null effect). */
  reference?: number
  xLabel?: string
  xDomain?: [number, number]
  formatValue?: (n: number) => string
  className?: string
}

const PAD = { top: 16, right: 16, bottom: 32, left: 128 }

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 100) return n.toFixed(1)
  if (Math.abs(n) >= 1) return n.toFixed(2)
  return n.toFixed(3)
}

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function intentFor(c: Coefficient): CoefficientIntent {
  if (c.intent) return c.intent
  if (c.lower !== undefined && c.upper !== undefined) {
    if (c.lower > 0) return 'success'
    if (c.upper < 0) return 'danger'
    return 'neutral'
  }
  return c.estimate >= 0 ? 'primary' : 'info'
}

export function CoefficientPlot({
  variant = 'interval',
  coefficients,
  width = 520,
  height,
  reference = 0,
  xLabel,
  xDomain,
  formatValue,
  className,
}: CoefficientPlotProps) {
  const fmt = formatValue ?? defaultFormat

  const rows = useMemo(() => {
    const out = coefficients.slice()
    if (variant === 'sorted') {
      out.sort((a, b) => Math.abs(b.estimate) - Math.abs(a.estimate))
    }
    return out
  }, [coefficients, variant])

  const rowH = 26
  const H = height ?? PAD.top + PAD.bottom + rowH * rows.length

  const { xDom, xs } = useMemo(() => {
    const vals = rows.flatMap(c => [c.estimate, c.lower ?? c.estimate, c.upper ?? c.estimate, reference])
    const lo = Math.min(...vals)
    const hi = Math.max(...vals)
    const pad = (hi - lo) * 0.1 || 1
    const xDom: [number, number] = xDomain ?? [lo - pad, hi + pad]
    const xs = (v: number) => scale(v, xDom[0], xDom[1], PAD.left, width - PAD.right)
    return { xDom, xs }
  }, [rows, width, xDomain, reference])

  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const showIntervals = variant !== 'point'

  return (
    <div className={['iux-coefplot', `iux-coefplot--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-coefplot__svg" viewBox={`0 0 ${width} ${H}`} width={width} height={H} role="img" aria-label={`Coefficient plot, ${rows.length} predictors`}>
        {xTicks.map((tick, i) => {
          const x = xs(tick)
          return (
            <g key={`x-${i}`}>
              <line className="iux-coefplot__gridline" x1={x} x2={x} y1={PAD.top} y2={H - PAD.bottom} vectorEffect="non-scaling-stroke" />
              <text className="iux-coefplot__tick-label" x={x} y={H - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmt(tick)}</text>
            </g>
          )
        })}

        <line className="iux-coefplot__reference" x1={xs(reference)} x2={xs(reference)} y1={PAD.top} y2={H - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {rows.map((c, i) => {
          const intent = intentFor(c)
          const y = PAD.top + rowH * i + rowH / 2
          const cx = xs(c.estimate)
          const x0 = c.lower !== undefined ? xs(c.lower) : cx
          const x1 = c.upper !== undefined ? xs(c.upper) : cx
          return (
            <g key={c.key} className={`iux-coefplot__row iux-coefplot__row--${intent}`}>
              <text className="iux-coefplot__row-label" x={PAD.left - 8} y={y} textAnchor="end" dominantBaseline="central">{c.label}</text>
              {showIntervals && c.lower !== undefined && c.upper !== undefined && (
                <>
                  <line className="iux-coefplot__interval" x1={x0} x2={x1} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
                  <line className="iux-coefplot__cap" x1={x0} x2={x0} y1={y - 4} y2={y + 4} vectorEffect="non-scaling-stroke" />
                  <line className="iux-coefplot__cap" x1={x1} x2={x1} y1={y - 4} y2={y + 4} vectorEffect="non-scaling-stroke" />
                </>
              )}
              <circle className="iux-coefplot__point" cx={cx} cy={y} r={4} />
              <text className="iux-coefplot__value" x={x1 + 8} y={y} dominantBaseline="central">{fmt(c.estimate)}</text>
            </g>
          )
        })}
      </svg>
      {xLabel && (
        <div className="iux-coefplot__axis-labels">
          <span className="iux-coefplot__axis-label">{xLabel}</span>
        </div>
      )}
    </div>
  )
}
