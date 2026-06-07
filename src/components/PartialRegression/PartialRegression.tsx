// ABOUTME: PartialRegression — a React component (components).

import { useMemo } from 'react'
import './PartialRegression.css'

// ABOUTME: PartialRegressionVariant — a type alias.
export type PartialRegressionVariant = 'single' | 'grid' | 'annotated'

// ABOUTME: PartialRegressionIntent — a type alias.
export type PartialRegressionIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: PartialResidualPoint — an interface.
export interface PartialResidualPoint {
  /** residual of the focal predictor after regressing on the others */
  xRes: number
  /** residual of y after regressing on the other predictors */
  yRes: number
  label?: string
}

// ABOUTME: PartialFacet — an interface.
export interface PartialFacet {
  id: string
  label: string
  /** slope when this facet is regressed alone — equals the multiple-regression coefficient */
  beta: number
  points: PartialResidualPoint[]
  intent?: PartialRegressionIntent
}

// ABOUTME: Props for PartialRegression.
export interface PartialRegressionProps {
  variant?: PartialRegressionVariant
  facets: PartialFacet[]
  facetWidth?: number
  facetHeight?: number
  columns?: number
  className?: string
}

const PAD = { top: 14, right: 12, bottom: 28, left: 36 }
const INTENTS: PartialRegressionIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function intentFor(f: PartialFacet, i: number): PartialRegressionIntent {
  return f.intent ?? INTENTS[i % INTENTS.length]
}

function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function num(n: number): string {
  if (Math.abs(n) >= 10) return n.toFixed(1)
  if (Math.abs(n) >= 1)  return n.toFixed(2)
  return n.toFixed(3)
}

function Facet({ facet, index, w, h, annotated }: { facet: PartialFacet; index: number; w: number; h: number; annotated: boolean }) {
  const intent = intentFor(facet, index)
  const dom = useMemo(() => {
    const xs = facet.points.map(p => p.xRes)
    const ys = facet.points.map(p => p.yRes)
    const xLo = Math.min(...xs, 0), xHi = Math.max(...xs, 0)
    const yLo = Math.min(...ys, 0), yHi = Math.max(...ys, 0)
    const padX = (xHi - xLo) * 0.06 || 1
    const padY = (yHi - yLo) * 0.06 || 1
    return { dx: [xLo - padX, xHi + padX] as [number, number], dy: [yLo - padY, yHi + padY] as [number, number] }
  }, [facet])

  const xs = (v: number) => scale(v, dom.dx[0], dom.dx[1], PAD.left, w - PAD.right)
  const ys = (v: number) => scale(v, dom.dy[0], dom.dy[1], h - PAD.bottom, PAD.top)
  const y0 = ys(0), x0 = xs(0)
  const fitX0 = dom.dx[0], fitX1 = dom.dx[1]

  return (
    <div className={`iux-partreg__facet iux-partreg__facet--${intent}`}>
      <div className="iux-partreg__facet-head">
        <span className="iux-partreg__facet-label">{facet.label}</span>
        <span className="iux-partreg__facet-beta">β = {num(facet.beta)}</span>
      </div>
      <svg className="iux-partreg__svg" viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label={`Added-variable plot for ${facet.label}`}>
        <line className="iux-partreg__zero" x1={PAD.left} x2={w - PAD.right} y1={y0} y2={y0} vectorEffect="non-scaling-stroke" />
        <line className="iux-partreg__zero" x1={x0} x2={x0} y1={PAD.top} y2={h - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-partreg__axis-line" x1={PAD.left} x2={w - PAD.right} y1={h - PAD.bottom} y2={h - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-partreg__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={h - PAD.bottom} vectorEffect="non-scaling-stroke" />

        <line
          className="iux-partreg__fit"
          x1={xs(fitX0)} y1={ys(facet.beta * fitX0)}
          x2={xs(fitX1)} y2={ys(facet.beta * fitX1)}
          vectorEffect="non-scaling-stroke"
        />

        {facet.points.map((p, j) => (
          <circle key={j} className="iux-partreg__dot" cx={xs(p.xRes)} cy={ys(p.yRes)} r={2.5}>
            {p.label && <title>{p.label}</title>}
          </circle>
        ))}

        {annotated && (
          <text className="iux-partreg__slope" x={w - PAD.right - 6} y={PAD.top + 4} textAnchor="end" dominantBaseline="hanging">slope = β</text>
        )}
      </svg>
      <div className="iux-partreg__axis-labels">
        <span>resid({facet.label})</span>
        <span>resid(y)</span>
      </div>
    </div>
  )
}

// ABOUTME: PartialRegression — a React component.
export function PartialRegression({
  variant = 'grid',
  facets,
  facetWidth = 240,
  facetHeight = 180,
  columns,
  className,
}: PartialRegressionProps) {
  const shown = variant === 'single' ? facets.slice(0, 1) : facets
  const cols = columns ?? (variant === 'single' ? 1 : Math.min(3, shown.length))
  return (
    <div
      className={['iux-partreg', `iux-partreg--${variant}`, className].filter(Boolean).join(' ')}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {shown.map((f, i) => (
        <Facet key={f.id} facet={f} index={i} w={facetWidth} h={facetHeight} annotated={variant === 'annotated'} />
      ))}
    </div>
  )
}
