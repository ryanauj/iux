import { useMemo } from 'react'
import './StackedArea.css'

export type StackedAreaVariant = 'stacked' | 'normalized' | 'streamgraph'

export type StackedAreaIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface StackedAreaSeries {
  id: string
  label: string
  intent?: StackedAreaIntent
  /** Aligned by index with sibling series. */
  values: number[]
}

export interface StackedAreaProps {
  variant?: StackedAreaVariant
  series: StackedAreaSeries[]
  /** Aligned time stamps; length must match series[].values length. */
  times: number[]
  width?: number
  height?: number
  formatT?: (t: number) => string
  formatY?: (y: number) => string
  className?: string
}

const PAD = { top: 12, right: 12, bottom: 28, left: 44 }
const INTENTS: StackedAreaIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(s: StackedAreaSeries, i: number): StackedAreaIntent {
  return s.intent ?? INTENTS[i % INTENTS.length]
}

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function defaultFormatT(t: number): string {
  const d = new Date(t)
  if (!Number.isFinite(d.getTime())) return String(t)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function StackedArea({
  variant = 'stacked',
  series,
  times,
  width = 520,
  height = 260,
  formatT,
  formatY,
  className,
}: StackedAreaProps) {
  const fmtT = formatT ?? defaultFormatT
  const fmtY = formatY ?? (n => n.toLocaleString())

  const { paths, yDom, xs, ys } = useMemo(() => {
    const n = times.length
    if (n === 0) return { paths: [] as { id: string; intent: StackedAreaIntent; label: string; d: string }[], yDom: [0, 1] as [number, number], xs: (_: number) => 0, ys: (_: number) => 0 }

    const totals = new Array(n).fill(0)
    for (const s of series) for (let i = 0; i < n; i++) totals[i] += s.values[i] ?? 0
    const maxTotal = Math.max(1, ...totals)

    let yDom: [number, number]
    let baseline: number[]
    let lowers: number[][]
    let uppers: number[][]

    if (variant === 'streamgraph') {
      baseline = totals.map(t => -t / 2)
      let min = 0, max = 0
      lowers = []
      uppers = []
      let runningLo = baseline.slice()
      for (const s of series) {
        const lo = runningLo.slice()
        const up = runningLo.map((b, i) => b + (s.values[i] ?? 0))
        lowers.push(lo)
        uppers.push(up)
        runningLo = up
        for (let i = 0; i < n; i++) { if (lo[i] < min) min = lo[i]; if (up[i] > max) max = up[i] }
      }
      yDom = [min, max]
    } else {
      baseline = new Array(n).fill(0)
      lowers = []
      uppers = []
      let runningLo = baseline.slice()
      for (const s of series) {
        const lo = runningLo.slice()
        const up = runningLo.map((b, i) => {
          if (variant === 'normalized') {
            const denom = totals[i] || 1
            return b + ((s.values[i] ?? 0) / denom) * 1
          }
          return b + (s.values[i] ?? 0)
        })
        lowers.push(lo)
        uppers.push(up)
        runningLo = up
      }
      yDom = variant === 'normalized' ? [0, 1] : [0, maxTotal]
    }

    const xs = (t: number) => scale(t, times[0], times[n - 1], PAD.left, width - PAD.right)
    const ys = (y: number) => scale(y, yDom[0], yDom[1], height - PAD.bottom, PAD.top)

    const paths = series.map((s, idx) => {
      const lo = lowers[idx]
      const up = uppers[idx]
      const parts: string[] = []
      parts.push(`M ${xs(times[0])} ${ys(up[0])}`)
      for (let i = 1; i < n; i++) parts.push(`L ${xs(times[i])} ${ys(up[i])}`)
      for (let i = n - 1; i >= 0; i--) parts.push(`L ${xs(times[i])} ${ys(lo[i])}`)
      parts.push('Z')
      return { id: s.id, intent: intentFor(s, idx), label: s.label, d: parts.join(' ') }
    })

    return { paths, yDom, xs, ys }
  }, [series, times, variant, width, height])

  if (paths.length === 0) return <div className={['iux-stackedarea', className].filter(Boolean).join(' ')} />

  const yTicks = variant === 'normalized' ? [0, 0.5, 1] : variant === 'streamgraph' ? [yDom[0], 0, yDom[1]] : [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]
  const xTicks = [times[0], times[Math.floor(times.length / 2)], times[times.length - 1]]
  const formatYTick = variant === 'normalized' ? (v: number) => `${Math.round(v * 100)}%` : fmtY

  return (
    <div className={['iux-stackedarea', `iux-stackedarea--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <div className="iux-stackedarea__legend">
        {series.map((s, i) => (
          <span key={s.id} className={`iux-stackedarea__legend-item iux-stackedarea__legend-item--${intentFor(s, i)}`}>
            <span className="iux-stackedarea__swatch" aria-hidden="true" />{s.label}
          </span>
        ))}
      </div>
      <svg className="iux-stackedarea__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Stacked area, ${series.length} series`} preserveAspectRatio="none">
        {yTicks.map((tick, i) => {
          const y = ys(tick)
          return (
            <g key={`y-${i}`}>
              <line className="iux-stackedarea__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              <text className="iux-stackedarea__tick-label" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">{formatYTick(tick)}</text>
            </g>
          )
        })}
        {paths.map(p => (
          <path key={p.id} className={`iux-stackedarea__band iux-stackedarea__band--${p.intent}`} d={p.d} />
        ))}
        <line className="iux-stackedarea__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        {xTicks.map((tick, i) => (
          <text key={`x-${i}`} className="iux-stackedarea__tick-label" x={xs(tick)} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmtT(tick)}</text>
        ))}
      </svg>
    </div>
  )
}
