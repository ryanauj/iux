// ABOUTME: Violin — a React component (components).

import { useMemo } from 'react'
import './Violin.css'

// ABOUTME: ViolinVariant — a type alias.
export type ViolinVariant = 'simple' | 'withBox' | 'split'

// ABOUTME: ViolinIntent — a type alias.
export type ViolinIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: ViolinSeries — an interface.
export interface ViolinSeries {
  id: string
  label: string
  values: number[]
  intent?: ViolinIntent
}

// ABOUTME: Props for Violin.
export interface ViolinProps {
  variant?: ViolinVariant
  series: ViolinSeries[]
  width?: number
  height?: number
  /** Force a y-range. Defaults to the union of all series, with 6% padding. */
  yDomain?: [number, number]
  /** Density bins along the y axis. */
  bins?: number
  formatY?: (n: number) => string
  className?: string
}

const PAD = { top: 16, right: 16, bottom: 36, left: 48 }
const INTENTS: ViolinIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(s: ViolinSeries, i: number): ViolinIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const idx = (sorted.length - 1) * p
  const lo = Math.floor(idx)
  const hi = Math.ceil(idx)
  if (lo === hi) return sorted[lo]
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo)
}

interface Density { center: number; weight: number }

/** Coarse, fast KDE: gaussian on a uniform y-grid using Silverman bandwidth. */
function kde(values: number[], yDom: [number, number], bins: number): Density[] {
  if (values.length === 0) return []
  const n = values.length
  const mean = values.reduce((s, v) => s + v, 0) / n
  const variance = values.reduce((s, v) => s + (v - mean) * (v - mean), 0) / Math.max(1, n - 1)
  const stdev = Math.sqrt(Math.max(variance, 1e-9))
  const h = Math.max(1e-6, 1.06 * stdev * Math.pow(n, -1 / 5))
  const step = (yDom[1] - yDom[0]) / bins
  const out: Density[] = []
  for (let i = 0; i < bins; i++) {
    const y = yDom[0] + (i + 0.5) * step
    let sum = 0
    for (const v of values) {
      const z = (y - v) / h
      sum += Math.exp(-0.5 * z * z)
    }
    out.push({ center: y, weight: sum / (n * h * Math.sqrt(2 * Math.PI)) })
  }
  // Normalize to [0, 1] per series.
  const max = out.reduce((m, d) => Math.max(m, d.weight), 0) || 1
  for (const d of out) d.weight = d.weight / max
  return out
}

// ABOUTME: Violin — a React component.
export function Violin({
  variant = 'simple',
  series,
  width = 480,
  height = 300,
  yDomain,
  bins = 28,
  formatY,
  className,
}: ViolinProps) {
  const fmt = formatY ?? (n => n.toFixed(1))

  const { rendered, yDom } = useMemo(() => {
    let lo = Infinity, hi = -Infinity
    for (const s of series) for (const v of s.values) { if (v < lo) lo = v; if (v > hi) hi = v }
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) { lo = 0; hi = 1 }
    const padY = (hi - lo) * 0.06 || 1
    const yDom: [number, number] = yDomain ?? [lo - padY, hi + padY]

    const rendered = series.map(s => {
      const sorted = s.values.slice().sort((a, b) => a - b)
      return {
        ...s,
        density: kde(s.values, yDom, bins),
        q1: quantile(sorted, 0.25),
        q2: quantile(sorted, 0.5),
        q3: quantile(sorted, 0.75),
        min: sorted[0] ?? 0,
        max: sorted[sorted.length - 1] ?? 0,
      }
    })
    return { rendered, yDom }
  }, [series, yDomain, bins])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const ys = (v: number) => PAD.top + (1 - (v - yDom[0]) / (yDom[1] - yDom[0])) * plotH

  const isSplit = variant === 'split'
  const groupSize = isSplit ? 2 : 1
  const groups = Math.ceil(rendered.length / groupSize)
  const band = plotW / Math.max(1, groups)
  const violinW = Math.min(70, band * 0.55)

  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]

  return (
    <div className={['iux-violin', `iux-violin--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-violin__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Violin plot, ${series.length} series`}>
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-violin__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-violin__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{fmt(tick)}</text>
          </g>
        ))}
        <line className="iux-violin__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {rendered.map((s, i) => {
          const intent = intentFor(s, i)
          const gIdx = Math.floor(i / groupSize)
          const half = i % groupSize // 0 = left, 1 = right (split mode)
          const cx = PAD.left + gIdx * band + band / 2
          const halfW = violinW / 2

          const leftPath = s.density.map((d, k) => {
            const x = cx - d.weight * halfW
            const y = ys(d.center)
            return `${k === 0 ? 'M' : 'L'} ${x} ${y}`
          }).join(' ')
          const rightPath = s.density.slice().reverse().map((d, k) => {
            const x = cx + d.weight * halfW
            const y = ys(d.center)
            return `${k === 0 ? 'L' : 'L'} ${x} ${y}`
          }).join(' ')

          let fullPath: string
          if (isSplit) {
            if (half === 0) {
              const close = `L ${cx} ${ys(s.density[s.density.length - 1].center)} L ${cx} ${ys(s.density[0].center)} Z`
              fullPath = `${leftPath} ${close}`
            } else {
              const open = `M ${cx} ${ys(s.density[0].center)}`
              const right = s.density.map((d, k) => {
                const x = cx + d.weight * halfW
                const y = ys(d.center)
                return `${k === 0 ? 'L' : 'L'} ${x} ${y}`
              }).join(' ')
              fullPath = `${open} ${right} L ${cx} ${ys(s.density[s.density.length - 1].center)} Z`
            }
          } else {
            fullPath = `${leftPath} ${rightPath} Z`
          }

          const showBox = variant === 'withBox'

          return (
            <g key={s.id} className={`iux-violin__series iux-violin__series--${intent} iux-violin__series--${isSplit ? (half === 0 ? 'left' : 'right') : 'full'}`}>
              <path className="iux-violin__shape" d={fullPath} />
              {showBox && (
                <>
                  <rect className="iux-violin__box" x={cx - 5} y={ys(s.q3)} width={10} height={Math.max(1, ys(s.q1) - ys(s.q3))} />
                  <line className="iux-violin__median" x1={cx - 7} x2={cx + 7} y1={ys(s.q2)} y2={ys(s.q2)} vectorEffect="non-scaling-stroke" />
                  <line className="iux-violin__whisker" x1={cx} x2={cx} y1={ys(s.min)} y2={ys(s.q1)} vectorEffect="non-scaling-stroke" />
                  <line className="iux-violin__whisker" x1={cx} x2={cx} y1={ys(s.q3)} y2={ys(s.max)} vectorEffect="non-scaling-stroke" />
                </>
              )}
              {(!isSplit || half === 1 || rendered.length === 1) && (
                <text className="iux-violin__label" x={cx} y={height - PAD.bottom + 6} textAnchor="middle" dominantBaseline="hanging">{isSplit ? `${rendered[gIdx * 2]?.label ?? ''} · ${rendered[gIdx * 2 + 1]?.label ?? ''}` : s.label}</text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
