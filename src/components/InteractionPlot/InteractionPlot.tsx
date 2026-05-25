import { useMemo } from 'react'
import './InteractionPlot.css'

export type InteractionPlotVariant = 'lines' | 'bands' | 'spaghetti'

export type InteractionIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface InteractionLine {
  id: string
  /** label for this moderator level, e.g. "low", "median", "high" */
  label: string
  intent?: InteractionIntent
  /** predicted Y across the focal predictor's range */
  points: { x: number; y: number; lower?: number; upper?: number }[]
}

export interface InteractionPlotProps {
  variant?: InteractionPlotVariant
  lines: InteractionLine[]
  width?: number
  height?: number
  xLabel?: string
  yLabel?: string
  moderatorLabel?: string
  className?: string
}

const PAD = { top: 16, right: 96, bottom: 32, left: 44 }
const INTENTS: InteractionIntent[] = ['info', 'primary', 'success', 'warning', 'danger', 'neutral']

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function num(n: number): string {
  if (Math.abs(n) >= 100) return n.toFixed(0)
  if (Math.abs(n) >= 10)  return n.toFixed(1)
  return n.toFixed(2)
}

function intentFor(l: InteractionLine, i: number): InteractionIntent {
  return l.intent ?? INTENTS[i % INTENTS.length]
}

export function InteractionPlot({
  variant = 'lines',
  lines,
  width = 520,
  height = 320,
  xLabel,
  yLabel,
  moderatorLabel,
  className,
}: InteractionPlotProps) {
  const { xDom, yDom } = useMemo(() => {
    const all = lines.flatMap(l => l.points)
    const xs = all.map(p => p.x)
    const ys = all.flatMap(p => [p.y, p.lower ?? p.y, p.upper ?? p.y])
    const xLo = Math.min(...xs), xHi = Math.max(...xs)
    const yLo = Math.min(...ys), yHi = Math.max(...ys)
    const padX = (xHi - xLo) * 0.04 || 1
    const padY = (yHi - yLo) * 0.08 || 1
    return { xDom: [xLo - padX, xHi + padX] as [number, number], yDom: [yLo - padY, yHi + padY] as [number, number] }
  }, [lines])

  const xs = (v: number) => scale(v, xDom[0], xDom[1], PAD.left, width - PAD.right)
  const ys = (v: number) => scale(v, yDom[0], yDom[1], height - PAD.bottom, PAD.top)
  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]
  const showBands = variant === 'bands'

  return (
    <div className={['iux-inter', `iux-inter--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-inter__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Interaction plot, ${lines.length} levels`}>
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-inter__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-inter__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{num(tick)}</text>
          </g>
        ))}
        {xTicks.map((tick, i) => (
          <g key={`x-${i}`}>
            <line className="iux-inter__gridline" x1={xs(tick)} x2={xs(tick)} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
            <text className="iux-inter__tick-label" x={xs(tick)} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{num(tick)}</text>
          </g>
        ))}

        <line className="iux-inter__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-inter__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {showBands && lines.map((l, i) => {
          const intent = intentFor(l, i)
          if (!l.points.every(p => p.lower !== undefined && p.upper !== undefined)) return null
          const up = l.points.map((p, j) => `${j === 0 ? 'M' : 'L'}${xs(p.x).toFixed(2)} ${ys(p.upper!).toFixed(2)}`).join(' ')
          const dn = [...l.points].reverse().map(p => `L${xs(p.x).toFixed(2)} ${ys(p.lower!).toFixed(2)}`).join(' ')
          return <path key={`b-${l.id}`} className={`iux-inter__band iux-inter__band--${intent}`} d={`${up} ${dn} Z`} />
        })}

        {lines.map((l, i) => {
          const intent = intentFor(l, i)
          const d = l.points.map((p, j) => `${j === 0 ? 'M' : 'L'}${xs(p.x).toFixed(2)} ${ys(p.y).toFixed(2)}`).join(' ')
          const cls = `iux-inter__line iux-inter__line--${intent}${variant === 'spaghetti' ? ' iux-inter__line--thin' : ''}`
          return <path key={`l-${l.id}`} className={cls} d={d} vectorEffect="non-scaling-stroke" />
        })}

        {lines.map((l, i) => {
          const intent = intentFor(l, i)
          const last = l.points[l.points.length - 1]
          return (
            <g key={`lab-${l.id}`}>
              <circle className={`iux-inter__endpoint iux-inter__endpoint--${intent}`} cx={xs(last.x)} cy={ys(last.y)} r={3.5} />
              <text className={`iux-inter__legend iux-inter__legend--${intent}`} x={xs(last.x) + 8} y={ys(last.y)} dominantBaseline="central">{l.label}</text>
            </g>
          )
        })}
      </svg>
      {(xLabel || yLabel || moderatorLabel) && (
        <div className="iux-inter__axis-labels">
          {yLabel && <span className="iux-inter__axis-label iux-inter__axis-label--y">y: {yLabel}</span>}
          {xLabel && <span className="iux-inter__axis-label">x: {xLabel}</span>}
          {moderatorLabel && <span className="iux-inter__axis-label">lines: {moderatorLabel}</span>}
        </div>
      )}
    </div>
  )
}
