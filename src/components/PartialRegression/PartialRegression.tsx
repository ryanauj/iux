// ABOUTME: Added-variable (partial regression) plot collection that renders one scatter facet per predictor, each showing residualized x vs residualized y with the partial slope (beta) as a fit line, supporting single-panel, CSS-grid, and annotated variants.

import { useMemo } from 'react'
import './PartialRegression.css'

// ABOUTME: Controls the facet layout and annotation level: 'single' renders only the first facet, 'grid' arranges all facets in a CSS grid up to 3 columns wide, 'annotated' is like 'grid' but adds a "slope = β" label inside each SVG panel.
export type PartialRegressionVariant = 'single' | 'grid' | 'annotated'

// ABOUTME: Semantic colour intent applied per facet panel; cycles over the INTENTS palette when not set on a PartialFacet.
export type PartialRegressionIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: One observation in an added-variable plot: `xRes` is the residual of the focal predictor after partialling out the other predictors, and `yRes` is the residual of y after partialling them out — their slope equals the multiple-regression coefficient.
export interface PartialResidualPoint {
  /** residual of the focal predictor after regressing on the others */
  xRes: number
  /** residual of y after regressing on the other predictors */
  yRes: number
  label?: string
}

// ABOUTME: One predictor facet in the partial regression display: a display `label`, the regression `beta` coefficient shown in the panel header, and an array of PartialResidualPoints that form the scatter and the fit line.
export interface PartialFacet {
  id: string
  label: string
  /** slope when this facet is regressed alone — equals the multiple-regression coefficient */
  beta: number
  points: PartialResidualPoint[]
  intent?: PartialRegressionIntent
}

// ABOUTME: Configures PartialRegression — `facets` is the per-predictor data array, `facetWidth`/`facetHeight` set each panel's SVG canvas, `columns` overrides the auto column count, and `variant` controls layout and annotation.
export interface PartialRegressionProps {
  variant?: PartialRegressionVariant
  facets: PartialFacet[]
  facetWidth?: number
  facetHeight?: number
  columns?: number
  className?: string
}

// ABOUTME: Pixel inset for each facet's SVG plot area, leaving room for axis tick labels and the residual-label footer below.
const PAD = { top: 14, right: 12, bottom: 28, left: 36 }
// ABOUTME: Ordered intent cycle used to assign distinct colors to facets when no explicit intent is set on a PartialFacet; wraps modularly.
const INTENTS: PartialRegressionIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Returns the intent for a facet: uses the facet's own intent if set, otherwise picks from the INTENTS cycle by index.
function intentFor(f: PartialFacet, i: number): PartialRegressionIntent {
  return f.intent ?? INTENTS[i % INTENTS.length]
}

// ABOUTME: Linear interpolation from a domain interval to a pixel range; returns the midpoint when the domain is degenerate (d0 === d1) to avoid division by zero.
function scale(value: number, d0: number, d1: number, r0: number, r1: number): number {
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

// ABOUTME: Formats a regression coefficient or residual value for display: one decimal for |n|≥10, two for |n|≥1, three decimals otherwise.
function num(n: number): string {
  if (Math.abs(n) >= 10) return n.toFixed(1)
  if (Math.abs(n) >= 1)  return n.toFixed(2)
  return n.toFixed(3)
}

// ABOUTME: Renders a single added-variable facet panel: computes per-predictor axis domains with 6% padding floored to include zero, draws horizontal/vertical zero lines, the partial-slope fit line, scatter dots, and optionally a "slope = β" annotation text.
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

// ABOUTME: Slices the `facets` array (only the first for 'single'), computes the column count from `columns` or capping at 3, then renders a grid of internal `Facet` components with the active variant's `annotated` flag forwarded.
/**
 * Each `Facet` sub-component independently computes its own per-predictor
 * axis domain (padded 6 % on both axes, floored to include 0), derives
 * the fit line from `beta` across the full x range, and draws horizontal
 * and vertical zero-reference lines through the origin. The 'annotated'
 * variant adds a "slope = β" text label inside the SVG near the upper-right
 * corner. Axis-residual labels below each panel read "resid(label)" / "resid(y)".
 */
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
