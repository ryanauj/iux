import { useMemo } from 'react'
import './BoxPlot.css'

export type BoxPlotVariant = 'simple' | 'outliers' | 'jitter'

export type BoxIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface BoxSeries {
  id: string
  label: string
  values: number[]
  intent?: BoxIntent
}

export interface BoxPlotProps {
  variant?: BoxPlotVariant
  series: BoxSeries[]
  width?: number
  height?: number
  yDomain?: [number, number]
  formatY?: (n: number) => string
  className?: string
}

const PAD = { top: 12, right: 12, bottom: 36, left: 44 }
const INTENTS: BoxIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

interface Stats { q1: number; q2: number; q3: number; iqr: number; loFence: number; hiFence: number; whiskLo: number; whiskHi: number; outliers: number[] }

function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const idx = (sorted.length - 1) * p
  const lo = Math.floor(idx)
  const hi = Math.ceil(idx)
  if (lo === hi) return sorted[lo]
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo)
}

function computeStats(values: number[]): Stats {
  const sorted = values.slice().sort((a, b) => a - b)
  const q1 = quantile(sorted, 0.25)
  const q2 = quantile(sorted, 0.5)
  const q3 = quantile(sorted, 0.75)
  const iqr = q3 - q1
  const loFence = q1 - 1.5 * iqr
  const hiFence = q3 + 1.5 * iqr
  let whiskLo = q1, whiskHi = q3
  for (const v of sorted) {
    if (v >= loFence && v < whiskLo) whiskLo = v
    if (v <= hiFence && v > whiskHi) whiskHi = v
  }
  const outliers = sorted.filter(v => v < loFence || v > hiFence)
  return { q1, q2, q3, iqr, loFence, hiFence, whiskLo, whiskHi, outliers }
}

function intentFor(s: BoxSeries, i: number): BoxIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

export function BoxPlot({
  variant = 'simple',
  series,
  width = 480,
  height = 280,
  yDomain,
  formatY,
  className,
}: BoxPlotProps) {
  const fmt = formatY ?? (n => n.toFixed(1))

  const { stats, yDom } = useMemo(() => {
    const stats = series.map(s => ({ ...s, stats: computeStats(s.values) }))
    let lo = Infinity, hi = -Infinity
    for (const s of stats) {
      lo = Math.min(lo, s.stats.whiskLo, ...s.stats.outliers)
      hi = Math.max(hi, s.stats.whiskHi, ...s.stats.outliers)
    }
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) { lo = 0; hi = 1 }
    const pad = (hi - lo) * 0.06 || 1
    const yDom: [number, number] = yDomain ?? [lo - pad, hi + pad]
    return { stats, yDom }
  }, [series, yDomain])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const band = plotW / Math.max(1, series.length)
  const boxW = Math.min(60, band * 0.55)
  const ys = (v: number) => PAD.top + (1 - (v - yDom[0]) / (yDom[1] - yDom[0])) * plotH

  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]

  return (
    <div className={['iux-boxplot', `iux-boxplot--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-boxplot__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Box plot, ${series.length} series`}>
        {yTicks.map((tick, i) => {
          const y = ys(tick)
          return (
            <g key={`y-${i}`}>
              <line className="iux-boxplot__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <text className="iux-boxplot__tick-label" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">{fmt(tick)}</text>
            </g>
          )
        })}
        <line className="iux-boxplot__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        {stats.map((s, i) => {
          const intent = intentFor(s, i)
          const cx = PAD.left + i * band + band / 2
          const q1y = ys(s.stats.q1)
          const q3y = ys(s.stats.q3)
          const q2y = ys(s.stats.q2)
          const wLo = ys(s.stats.whiskLo)
          const wHi = ys(s.stats.whiskHi)
          const r = rng(i * 977 + 13)
          return (
            <g key={s.id} className={`iux-boxplot__series iux-boxplot__series--${intent}`}>
              <line className="iux-boxplot__whisker" x1={cx} x2={cx} y1={wHi} y2={q3y} vectorEffect="non-scaling-stroke" />
              <line className="iux-boxplot__whisker" x1={cx} x2={cx} y1={q1y} y2={wLo} vectorEffect="non-scaling-stroke" />
              <line className="iux-boxplot__whisker-cap" x1={cx - boxW / 4} x2={cx + boxW / 4} y1={wHi} y2={wHi} vectorEffect="non-scaling-stroke" />
              <line className="iux-boxplot__whisker-cap" x1={cx - boxW / 4} x2={cx + boxW / 4} y1={wLo} y2={wLo} vectorEffect="non-scaling-stroke" />
              <rect className="iux-boxplot__box" x={cx - boxW / 2} y={q3y} width={boxW} height={Math.max(2, q1y - q3y)} />
              <line className="iux-boxplot__median" x1={cx - boxW / 2} x2={cx + boxW / 2} y1={q2y} y2={q2y} vectorEffect="non-scaling-stroke" />
              {variant === 'jitter' && s.values.map((v, j) => {
                const jitter = (r() - 0.5) * boxW * 0.7
                return <circle key={j} className="iux-boxplot__jitter" cx={cx + jitter} cy={ys(v)} r={2}><title>{fmt(v)}</title></circle>
              })}
              {variant === 'outliers' && s.stats.outliers.map((v, j) => (
                <circle key={j} className="iux-boxplot__outlier" cx={cx} cy={ys(v)} r={2.5}><title>outlier {fmt(v)}</title></circle>
              ))}
              <text className="iux-boxplot__label" x={cx} y={height - PAD.bottom + 6} textAnchor="middle" dominantBaseline="hanging">{s.label}</text>
              <text className="iux-boxplot__n" x={cx} y={height - PAD.bottom + 20} textAnchor="middle" dominantBaseline="hanging">n={s.values.length}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
