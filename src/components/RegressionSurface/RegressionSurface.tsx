// ABOUTME: SVG visualization of a fitted 2D regression surface in three modes: iso-contour lines with value labels ('contour'), opacity-scaled heat cells ('heat'), or both combined with observed data points sized by response value ('overlay').

import { useMemo } from 'react'
import './RegressionSurface.css'

// ABOUTME: Display mode: 'contour' draws isolines with numeric labels, 'heat' rasterizes predicted values as opacity-scaled rectangles, 'overlay' combines both plus scatter circles sized by observed y.
export type RegressionSurfaceVariant = 'contour' | 'heat' | 'overlay'

// ABOUTME: Semantic intent color applied to contour strokes, heat cells, and overlay points; maps to the standard intent palette.
export type RegressionSurfaceIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: One observed sample point with feature coordinates (x1, x2) and an observed response (y); used only in 'overlay' mode where y drives the circle's radius.
export interface SurfacePoint {
  x1: number
  x2: number
  /** observed y — drawn as a circle size on the overlay rung */
  y: number
}

// ABOUTME: Configures RegressionSurface: 'predict' is the fitted model function ŷ=f(x1,x2), 'x1Domain'/'x2Domain' set the feature axes, 'resolution' controls the sampling grid density, 'levels' sets the number of isolines, and 'points' adds observed data to 'overlay' mode.
export interface RegressionSurfaceProps {
  variant?: RegressionSurfaceVariant
  /** Fitted surface evaluator: ŷ = f(x1, x2). */
  predict: (x1: number, x2: number) => number
  /** Domain in feature space. */
  x1Domain: [number, number]
  x2Domain: [number, number]
  /** Observed sample to overlay (optional). */
  points?: SurfacePoint[]
  /** Resolution of the rasterized surface. */
  resolution?: number
  /** Number of contour levels. */
  levels?: number
  width?: number
  height?: number
  x1Label?: string
  x2Label?: string
  intent?: RegressionSurfaceIntent
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

// ABOUTME: Evaluates the predict function on an NxN grid, computes marching-squares contours at evenly spaced level values, and renders the surface as an SVG with optional heat-map cells and observed-point scatter; shows a ŷ range footer and labeled axes.
/**
 * The grid is sampled at `resolution × resolution` points across the feature
 * domains. Contours are extracted per cell using a 16-case marching-squares
 * lookup table. Heat cells use opacity interpolated over [gMin, gMax]. In
 * `overlay` mode, each observed point's radius scales linearly with its y
 * relative to the sample's own [min, max].
 */
export function RegressionSurface({
  variant = 'contour',
  predict,
  x1Domain,
  x2Domain,
  points,
  resolution = 32,
  levels = 8,
  width = 420,
  height = 360,
  x1Label = 'x₁',
  x2Label = 'x₂',
  intent = 'primary',
  className,
}: RegressionSurfaceProps) {
  const { grid, gMin, gMax, contours } = useMemo(() => {
    const grid: number[][] = []
    for (let i = 0; i < resolution; i++) {
      const x2 = x2Domain[0] + (i / (resolution - 1)) * (x2Domain[1] - x2Domain[0])
      const row: number[] = []
      for (let j = 0; j < resolution; j++) {
        const x1 = x1Domain[0] + (j / (resolution - 1)) * (x1Domain[1] - x1Domain[0])
        row.push(predict(x1, x2))
      }
      grid.push(row)
    }
    let gMin = Infinity, gMax = -Infinity
    for (const r of grid) for (const v of r) { if (v < gMin) gMin = v; if (v > gMax) gMax = v }
    const contours = Array.from({ length: levels }, (_, k) => gMin + ((k + 1) / (levels + 1)) * (gMax - gMin))
    return { grid, gMin, gMax, contours }
  }, [predict, x1Domain, x2Domain, resolution, levels])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const xs = (v: number) => scale(v, x1Domain[0], x1Domain[1], PAD.left, width - PAD.right)
  const ys = (v: number) => scale(v, x2Domain[0], x2Domain[1], height - PAD.bottom, PAD.top)

  const cellW = plotW / (resolution - 1)
  const cellH = plotH / (resolution - 1)

  const showHeat = variant !== 'contour'
  const showContours = variant !== 'heat'
  const showPoints = variant === 'overlay' && !!points

  return (
    <div className={['iux-regsurf', `iux-regsurf--${variant}`, `iux-regsurf--${intent}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-regsurf__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Fitted regression surface">
        <clipPath id="iux-regsurf-clip"><rect x={PAD.left} y={PAD.top} width={plotW} height={plotH} /></clipPath>

        {showHeat && grid.flatMap((row, i) =>
          row.map((v, j) => {
            const t = gMax === gMin ? 0.5 : (v - gMin) / (gMax - gMin)
            const x = PAD.left + j * cellW - cellW / 2
            const y = PAD.top + (resolution - 1 - i) * cellH - cellH / 2
            return <rect key={`h-${i}-${j}`} className="iux-regsurf__cell" x={x} y={y} width={cellW + 0.5} height={cellH + 0.5} style={{ opacity: 0.12 + t * 0.65 }} />
          }),
        )}

        {showContours && contours.map((level, k) => {
          const t = (k + 1) / (levels + 1)
          const cls = `iux-regsurf__contour iux-regsurf__contour--${Math.round(t * 4)}`
          const segs: string[] = []
          for (let i = 0; i < resolution - 1; i++) {
            for (let j = 0; j < resolution - 1; j++) {
              const v = [grid[i][j], grid[i][j+1], grid[i+1][j+1], grid[i+1][j]]
              const px = [j, j+1, j+1, j].map(c => PAD.left + c * cellW)
              const py = [i, i, i+1, i+1].map(c => PAD.top + (resolution - 1 - c) * cellH)
              const bits: number[] = v.map(x => x >= level ? 1 : 0)
              const code = bits.reduce((a, b, i) => a + b * (1 << (3 - i)), 0)
              const interp = (a: number, b: number, va: number, vb: number) => (level - va) / (vb - va || 1) * (b - a) + a
              const lines: [number, number, number, number][] = []
              const E = [
                () => [interp(px[0], px[1], v[0], v[1]), py[0], px[1], interp(py[1], py[2], v[1], v[2])] as [number, number, number, number],
                () => [interp(px[3], px[2], v[3], v[2]), py[3], px[1], interp(py[1], py[2], v[1], v[2])] as [number, number, number, number],
                () => [interp(px[0], px[1], v[0], v[1]), py[0], interp(px[3], px[2], v[3], v[2]), py[3]] as [number, number, number, number],
                () => [px[0], interp(py[0], py[3], v[0], v[3]), interp(px[3], px[2], v[3], v[2]), py[3]] as [number, number, number, number],
                () => [px[0], interp(py[0], py[3], v[0], v[3]), interp(px[0], px[1], v[0], v[1]), py[0]] as [number, number, number, number],
                () => [px[0], interp(py[0], py[3], v[0], v[3]), px[1], interp(py[1], py[2], v[1], v[2])] as [number, number, number, number],
              ]
              switch (code) {
                case 1: case 14: lines.push(E[3]()); break
                case 2: case 13: lines.push(E[1]()); break
                case 4: case 11: lines.push(E[0]()); break
                case 8: case 7:  lines.push(E[4]()); break
                case 3: case 12: lines.push(E[5]()); break
                case 6: case 9:  lines.push(E[2]()); break
                case 5: lines.push(E[3]()); lines.push(E[0]()); break
                case 10: lines.push(E[4]()); lines.push(E[1]()); break
              }
              for (const [x0, y0, x1, y1] of lines) {
                segs.push(`M${x0.toFixed(2)} ${y0.toFixed(2)} L${x1.toFixed(2)} ${y1.toFixed(2)}`)
              }
            }
          }
          return (
            <g key={`c-${k}`} clipPath="url(#iux-regsurf-clip)">
              <path className={cls} d={segs.join(' ')} vectorEffect="non-scaling-stroke" />
              <text className="iux-regsurf__contour-label" x={width - PAD.right - 4} y={PAD.top + (1 - t) * plotH} textAnchor="end" dominantBaseline="central">{num(level)}</text>
            </g>
          )
        })}

        <line className="iux-regsurf__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-regsurf__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {[x1Domain[0], (x1Domain[0]+x1Domain[1])/2, x1Domain[1]].map((t, i, arr) => (
          <text key={`xt-${i}`} className="iux-regsurf__tick-label" x={xs(t)} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === arr.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{num(t)}</text>
        ))}
        {[x2Domain[0], (x2Domain[0]+x2Domain[1])/2, x2Domain[1]].map((t, i) => (
          <text key={`yt-${i}`} className="iux-regsurf__tick-label" x={PAD.left - 6} y={ys(t)} textAnchor="end" dominantBaseline="central">{num(t)}</text>
        ))}

        {showPoints && points!.map((p, i) => {
          const yLo = points!.reduce((m, q) => Math.min(m, q.y), Infinity)
          const yHi = points!.reduce((m, q) => Math.max(m, q.y), -Infinity)
          const t = yHi === yLo ? 0.5 : (p.y - yLo) / (yHi - yLo)
          return <circle key={i} className="iux-regsurf__point" cx={xs(p.x1)} cy={ys(p.x2)} r={2 + t * 4} />
        })}
      </svg>
      <div className="iux-regsurf__axis-labels">
        <span className="iux-regsurf__axis-label iux-regsurf__axis-label--y">y: {x2Label}</span>
        <span className="iux-regsurf__axis-label">x: {x1Label}</span>
        <span className="iux-regsurf__range">ŷ ∈ [{num(gMin)}, {num(gMax)}]</span>
      </div>
    </div>
  )
}
