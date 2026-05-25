import { useMemo } from 'react'
import './ObservedPredicted.css'

export type ObservedPredictedVariant = 'identity' | 'metric' | 'errors'

export type ObservedPredictedIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface ObservedPredictedPoint {
  predicted: number
  observed: number
  label?: string
}

export interface ObservedPredictedProps {
  variant?: ObservedPredictedVariant
  points: ObservedPredictedPoint[]
  width?: number
  height?: number
  intent?: ObservedPredictedIntent
  xLabel?: string
  yLabel?: string
  className?: string
}

const PAD = { top: 16, right: 16, bottom: 32, left: 44 }

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function num(n: number): string {
  if (Math.abs(n) >= 100) return n.toFixed(0)
  if (Math.abs(n) >= 10)  return n.toFixed(1)
  return n.toFixed(2)
}

export function ObservedPredicted({
  variant = 'identity',
  points,
  width = 360,
  height = 320,
  intent = 'primary',
  xLabel = 'predicted',
  yLabel = 'observed',
  className,
}: ObservedPredictedProps) {
  const { dom, metrics } = useMemo(() => {
    const all = points.flatMap(p => [p.predicted, p.observed])
    const lo = Math.min(...all), hi = Math.max(...all)
    const pad = (hi - lo) * 0.06 || 1
    const dom: [number, number] = [lo - pad, hi + pad]
    const obsMean = points.reduce((a, p) => a + p.observed, 0) / Math.max(1, points.length)
    let ssTot = 0, ssRes = 0, absSum = 0, sqSum = 0
    for (const p of points) {
      ssTot += (p.observed - obsMean) ** 2
      const e = p.observed - p.predicted
      ssRes += e * e
      absSum += Math.abs(e)
      sqSum += e * e
    }
    const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot
    const rmse = Math.sqrt(sqSum / Math.max(1, points.length))
    const mae = absSum / Math.max(1, points.length)
    return { dom, metrics: { r2, rmse, mae } }
  }, [points])

  const xs = (v: number) => scale(v, dom[0], dom[1], PAD.left, width - PAD.right)
  const ys = (v: number) => scale(v, dom[0], dom[1], height - PAD.bottom, PAD.top)
  const ticks = [dom[0], (dom[0] + dom[1]) / 2, dom[1]]

  return (
    <div className={['iux-obspred', `iux-obspred--${variant}`, `iux-obspred--${intent}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-obspred__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Observed vs predicted, ${points.length} points`}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line className="iux-obspred__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(t)} y2={ys(t)} vectorEffect="non-scaling-stroke" />
            <line className="iux-obspred__gridline" x1={xs(t)} x2={xs(t)} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
            <text className="iux-obspred__tick-label" x={PAD.left - 6} y={ys(t)} textAnchor="end" dominantBaseline="central">{num(t)}</text>
            <text className="iux-obspred__tick-label" x={xs(t)} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === ticks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{num(t)}</text>
          </g>
        ))}

        <line className="iux-obspred__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-obspred__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        <line
          className="iux-obspred__identity"
          x1={xs(dom[0])} y1={ys(dom[0])}
          x2={xs(dom[1])} y2={ys(dom[1])}
          vectorEffect="non-scaling-stroke"
        />

        {variant === 'errors' && points.map((p, i) => (
          <line key={`e-${i}`} className="iux-obspred__error" x1={xs(p.predicted)} y1={ys(p.predicted)} x2={xs(p.predicted)} y2={ys(p.observed)} vectorEffect="non-scaling-stroke" />
        ))}

        {points.map((p, i) => (
          <circle key={i} className="iux-obspred__dot" cx={xs(p.predicted)} cy={ys(p.observed)} r={2.6}>
            {p.label && <title>{p.label}</title>}
          </circle>
        ))}
      </svg>
      <div className="iux-obspred__axis-labels">
        <span className="iux-obspred__axis-label iux-obspred__axis-label--y">y: {yLabel}</span>
        <span className="iux-obspred__axis-label">x: {xLabel}</span>
        {variant !== 'identity' && (
          <span className="iux-obspred__metrics">R² {metrics.r2.toFixed(3)} · RMSE {num(metrics.rmse)} · MAE {num(metrics.mae)}</span>
        )}
      </div>
    </div>
  )
}
