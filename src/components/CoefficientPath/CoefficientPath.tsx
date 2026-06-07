// ABOUTME: CoefficientPath — a React component (components).

import { useMemo } from 'react'
import './CoefficientPath.css'

// ABOUTME: CoefficientPathVariant — a type alias.
export type CoefficientPathVariant = 'paths' | 'highlighted' | 'selected'

// ABOUTME: CoefficientPathIntent — a type alias.
export type CoefficientPathIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: CoefficientPathLine — an interface.
export interface CoefficientPathLine {
  id: string
  label: string
  intent?: CoefficientPathIntent
  /** trajectory of this coefficient as λ varies */
  points: { lambda: number; beta: number }[]
}

// ABOUTME: Props for CoefficientPath.
export interface CoefficientPathProps {
  variant?: CoefficientPathVariant
  paths: CoefficientPathLine[]
  /** Reference λ — the value chosen by CV. Drawn as a vertical line. */
  selectedLambda?: number
  width?: number
  height?: number
  /** When true, draw log10(λ) on the x-axis (typical for LASSO). */
  logX?: boolean
  className?: string
}

const PAD = { top: 16, right: 96, bottom: 36, left: 48 }
const INTENTS: CoefficientPathIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function num(n: number): string {
  if (Math.abs(n) >= 100) return n.toFixed(0)
  if (Math.abs(n) >= 1)   return n.toFixed(2)
  return n.toFixed(3)
}

function fmtLambda(n: number, log: boolean): string {
  if (log) return n.toFixed(1)
  return n.toFixed(3)
}

// ABOUTME: CoefficientPath — a React component.
export function CoefficientPath({
  variant = 'highlighted',
  paths,
  selectedLambda,
  width = 560,
  height = 320,
  logX = true,
  className,
}: CoefficientPathProps) {
  const transformed = useMemo(() =>
    paths.map(p => ({
      ...p,
      points: p.points.map(pt => ({ lambda: logX ? Math.log10(Math.max(1e-9, pt.lambda)) : pt.lambda, beta: pt.beta })),
    })), [paths, logX])

  const { xDom, yDom, maxAbsBeta } = useMemo(() => {
    const all = transformed.flatMap(p => p.points)
    const xs = all.map(p => p.lambda)
    const ys = all.map(p => p.beta)
    const xLo = Math.min(...xs), xHi = Math.max(...xs)
    const yMax = Math.max(...ys.map(Math.abs))
    const padX = (xHi - xLo) * 0.04 || 1
    return {
      xDom: [xLo - padX, xHi + padX] as [number, number],
      yDom: [-yMax * 1.1, yMax * 1.1] as [number, number],
      maxAbsBeta: yMax,
    }
  }, [transformed])

  const xs = (v: number) => scale(v, xDom[0], xDom[1], PAD.left, width - PAD.right)
  const ys = (v: number) => scale(v, yDom[0], yDom[1], height - PAD.bottom, PAD.top)
  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const yTicks = [yDom[0], 0, yDom[1]]
  const selX = selectedLambda !== undefined ? (logX ? Math.log10(Math.max(1e-9, selectedLambda)) : selectedLambda) : null

  const dim = (i: number, intent: CoefficientPathIntent | undefined) => {
    const resolved = intent ?? INTENTS[i % INTENTS.length]
    return resolved
  }

  return (
    <div className={['iux-coefpath', `iux-coefpath--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-coefpath__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Coefficient regularization path">
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-coefpath__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-coefpath__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{num(tick)}</text>
          </g>
        ))}
        {xTicks.map((tick, i) => (
          <g key={`x-${i}`}>
            <line className="iux-coefpath__gridline" x1={xs(tick)} x2={xs(tick)} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
            <text className="iux-coefpath__tick-label" x={xs(tick)} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmtLambda(tick, logX)}</text>
          </g>
        ))}

        <line className="iux-coefpath__zero" x1={PAD.left} x2={width - PAD.right} y1={ys(0)} y2={ys(0)} vectorEffect="non-scaling-stroke" />

        <line className="iux-coefpath__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-coefpath__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {selX !== null && (
          <line className="iux-coefpath__selected" x1={xs(selX)} x2={xs(selX)} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        )}

        {transformed.map((p, i) => {
          const intent = dim(i, paths[i].intent)
          const d = p.points.map((pt, j) => `${j === 0 ? 'M' : 'L'}${xs(pt.lambda).toFixed(2)} ${ys(pt.beta).toFixed(2)}`).join(' ')
          const endpoint = p.points[p.points.length - 1]
          const startBeta = p.points[0].beta
          const isLargest = variant === 'highlighted' && Math.abs(startBeta) > 0.45 * maxAbsBeta
          const cls = [
            'iux-coefpath__line',
            `iux-coefpath__line--${intent}`,
            variant === 'highlighted' && !isLargest ? 'iux-coefpath__line--dim' : '',
            variant === 'selected' ? 'iux-coefpath__line--narrow' : '',
          ].filter(Boolean).join(' ')
          return (
            <g key={p.id}>
              <path className={cls} d={d} vectorEffect="non-scaling-stroke" />
              {variant !== 'paths' && Math.abs(startBeta) > 0.2 * maxAbsBeta && (
                <text className={`iux-coefpath__legend iux-coefpath__legend--${intent}`} x={xs(endpoint.lambda) + 8} y={ys(startBeta)} dominantBaseline="central">{p.label}</text>
              )}
            </g>
          )
        })}
      </svg>
      <div className="iux-coefpath__axis-labels">
        <span className="iux-coefpath__axis-label iux-coefpath__axis-label--y">y: β coefficient</span>
        <span className="iux-coefpath__axis-label">x: {logX ? 'log₁₀(λ)' : 'λ'}</span>
        {selectedLambda !== undefined && <span className="iux-coefpath__legend-cv">λ_cv = {num(selectedLambda)}</span>}
      </div>
    </div>
  )
}
