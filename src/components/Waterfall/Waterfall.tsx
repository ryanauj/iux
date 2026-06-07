// ABOUTME: Waterfall — a React component (components).

import { useMemo } from 'react'
import './Waterfall.css'

// ABOUTME: WaterfallVariant — a type alias.
export type WaterfallVariant = 'simple' | 'signed' | 'subtotals'

// ABOUTME: WaterfallStep — an interface.
export interface WaterfallStep {
  key: string
  label: string
  /** Change to apply at this step. Negative for losses. Ignored for `subtotal`. */
  value: number
  /** Marks this step as a subtotal: bar starts at zero with height = running total. */
  subtotal?: boolean
}

// ABOUTME: Props for Waterfall.
export interface WaterfallProps {
  variant?: WaterfallVariant
  steps: WaterfallStep[]
  width?: number
  height?: number
  formatValue?: (n: number) => string
  className?: string
}

const PAD = { top: 24, right: 16, bottom: 36, left: 56 }

function defaultFormat(n: number): string {
  const abs = Math.abs(n)
  const s = abs >= 1000 ? n.toLocaleString(undefined, { maximumFractionDigits: 0 }) : n.toFixed(0)
  return n > 0 ? `+${s}` : s
}

// ABOUTME: Waterfall — a React component.
export function Waterfall({
  variant = 'simple',
  steps,
  width = 540,
  height = 280,
  formatValue,
  className,
}: WaterfallProps) {
  const fmt = formatValue ?? defaultFormat

  const { bars, yDom } = useMemo(() => {
    let running = 0
    let lo = 0
    let hi = 0
    const showSubtotals = variant === 'subtotals'
    const bars = steps.map((s, i) => {
      const isSubtotal = showSubtotals && s.subtotal
      const isFinal = i === steps.length - 1 && !isSubtotal && showSubtotals === false ? false : (i === steps.length - 1)
      let y0 = running
      let y1: number
      let kind: 'pos' | 'neg' | 'total'
      if (isSubtotal) {
        y0 = 0
        y1 = running
        kind = 'total'
      } else if (isFinal && !showSubtotals) {
        // No automatic final-as-total in simple/signed; treat like step.
        y1 = running + s.value
        running = y1
        kind = s.value >= 0 ? 'pos' : 'neg'
      } else {
        y1 = running + s.value
        running = y1
        kind = s.value >= 0 ? 'pos' : 'neg'
      }
      lo = Math.min(lo, y0, y1)
      hi = Math.max(hi, y0, y1)
      return { step: s, y0, y1, kind, runningAfter: running }
    })
    const pad = (hi - lo) * 0.08 || 1
    return { bars, yDom: [lo - pad, hi + pad] as [number, number] }
  }, [steps, variant])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const band = plotW / Math.max(1, bars.length)
  const barW = Math.max(8, band - 14)
  const ys = (v: number) => PAD.top + (1 - (v - yDom[0]) / (yDom[1] - yDom[0])) * plotH

  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]

  return (
    <div className={['iux-waterfall', `iux-waterfall--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-waterfall__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Waterfall, ${bars.length} steps`}>
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-waterfall__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-waterfall__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{fmt(tick)}</text>
          </g>
        ))}
        <line className="iux-waterfall__axis-line" x1={PAD.left} x2={width - PAD.right} y1={ys(0)} y2={ys(0)} vectorEffect="non-scaling-stroke" />

        {bars.map((b, i) => {
          const x = PAD.left + i * band + (band - barW) / 2
          const top = Math.min(ys(b.y0), ys(b.y1))
          const h = Math.max(1, Math.abs(ys(b.y0) - ys(b.y1)))
          const nextX = PAD.left + (i + 1) * band + (band - barW) / 2
          const connectorY = ys(b.y1)
          return (
            <g key={b.step.key} className={`iux-waterfall__step iux-waterfall__step--${b.kind}`}>
              <rect className="iux-waterfall__bar" x={x} y={top} width={barW} height={h} rx={2}>
                <title>{`${b.step.label}: ${fmt(b.step.value)} → running ${fmt(b.runningAfter)}`}</title>
              </rect>
              {i < bars.length - 1 && (
                <line className="iux-waterfall__connector" x1={x + barW} y1={connectorY} x2={nextX} y2={connectorY} vectorEffect="non-scaling-stroke" />
              )}
              <text className="iux-waterfall__value" x={x + barW / 2} y={Math.min(ys(b.y0), ys(b.y1)) - 6} textAnchor="middle">
                {b.kind === 'total' ? fmt(b.runningAfter) : fmt(b.step.value)}
              </text>
              <text className="iux-waterfall__category" x={x + barW / 2} y={height - PAD.bottom + 6} textAnchor="middle" dominantBaseline="hanging">{b.step.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
