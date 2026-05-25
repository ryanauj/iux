import { useMemo } from 'react'
import './QQPlot.css'

export type QQPlotVariant = 'normal' | 'sampleVsSample' | 'banded'

export type QQIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface QQPlotProps {
  variant?: QQPlotVariant
  /** The sample being assessed; required in every variant. */
  sample: number[]
  /** Reference sample (used by `sampleVsSample`); ignored otherwise. */
  reference?: number[]
  intent?: QQIntent
  width?: number
  height?: number
  className?: string
}

const PAD = { top: 16, right: 16, bottom: 32, left: 44 }

/** Inverse normal CDF via Beasley-Springer-Moro approximation. Good enough
 * for plotting positions; the bounds get clamped before use. */
function probit(p: number): number {
  const a = [-39.696830, 220.946098, -275.928510, 138.357751, -30.664798, 2.506628]
  const b = [-54.476098, 161.585836, -155.698979, 66.801311, -13.280681]
  const c = [-0.007784894002, -0.32239645, -2.400758, -2.549732, 4.374664, 2.938163]
  const d = [0.007784695709, 0.32246712, 2.445134, 3.754408]
  const pLow = 0.02425
  const pHigh = 1 - pLow
  if (p < pLow) {
    const q = Math.sqrt(-2 * Math.log(p))
    return (((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) /
           ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1)
  } else if (p <= pHigh) {
    const q = p - 0.5
    const r = q * q
    return (((((a[0]*r + a[1])*r + a[2])*r + a[3])*r + a[4])*r + a[5]) * q /
           (((((b[0]*r + b[1])*r + b[2])*r + b[3])*r + b[4])*r + 1)
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p))
    return -(((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) /
            ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1)
  }
}

function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const idx = (sorted.length - 1) * p
  const lo = Math.floor(idx); const hi = Math.ceil(idx)
  if (lo === hi) return sorted[lo]
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo)
}

function stats(values: number[]) {
  const n = values.length
  const mean = values.reduce((s, v) => s + v, 0) / Math.max(1, n)
  const variance = values.reduce((s, v) => s + (v - mean) * (v - mean), 0) / Math.max(1, n - 1)
  return { mean, sd: Math.sqrt(Math.max(variance, 1e-9)), n }
}

export function QQPlot({
  variant = 'normal',
  sample,
  reference,
  intent = 'primary',
  width = 420,
  height = 320,
  className,
}: QQPlotProps) {
  const { points, xDom, yDom, line, banded } = useMemo(() => {
    const sorted = sample.slice().sort((a, b) => a - b)
    const n = sorted.length

    let xs: number[] = []
    let ys: number[] = []
    if (variant === 'sampleVsSample' && reference && reference.length > 0) {
      const refSorted = reference.slice().sort((a, b) => a - b)
      // Same-grid quantiles: sample uses its own plotting positions, reference
      // is interpolated to those plotting positions.
      for (let i = 0; i < n; i++) {
        const p = (i + 0.5) / n
        xs.push(quantile(refSorted, p))
        ys.push(sorted[i])
      }
    } else {
      const { mean, sd } = stats(sorted)
      for (let i = 0; i < n; i++) {
        const p = (i + 0.5) / n
        xs.push(probit(Math.max(1e-6, Math.min(1 - 1e-6, p))))
        ys.push((sorted[i] - mean) / sd)
      }
    }

    const points = xs.map((x, i) => ({ x, y: ys[i] }))
    const xMin = Math.min(...xs); const xMax = Math.max(...xs)
    const yMin = Math.min(...ys); const yMax = Math.max(...ys)
    const padX = (xMax - xMin) * 0.06 || 1
    const padY = (yMax - yMin) * 0.06 || 1
    const xDom: [number, number] = [xMin - padX, xMax + padX]
    const yDom: [number, number] = [yMin - padY, yMax + padY]

    // Reference line: y = x (after standardization or when distributions match).
    const line = { from: { x: xDom[0], y: xDom[0] }, to: { x: xDom[1], y: xDom[1] } }

    // 95% pointwise band for normal Q-Q (Filliben-ish): se = sqrt(p(1-p)/n)/phi(z)
    // expressed in standardized units. Quick-and-honest approximation.
    let banded: { lower: { x: number; y: number }[]; upper: { x: number; y: number }[] } | null = null
    if (variant === 'banded') {
      const lower: { x: number; y: number }[] = []
      const upper: { x: number; y: number }[] = []
      for (let i = 0; i < n; i++) {
        const p = (i + 0.5) / n
        const z = xs[i]
        const phi = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI)
        const se = Math.sqrt((p * (1 - p)) / Math.max(1, n)) / Math.max(1e-6, phi)
        const w = 1.96 * se
        lower.push({ x: z, y: z - w })
        upper.push({ x: z, y: z + w })
      }
      banded = { lower, upper }
    }

    return { points, xDom, yDom, line, banded }
  }, [sample, reference, variant])

  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const xs = (x: number) => PAD.left + ((x - xDom[0]) / (xDom[1] - xDom[0])) * plotW
  const ys = (y: number) => PAD.top + (1 - (y - yDom[0]) / (yDom[1] - yDom[0])) * plotH
  const baselineY = height - PAD.bottom

  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]

  const xAxisLabel = variant === 'sampleVsSample' ? 'reference quantile' : 'theoretical z'
  const yAxisLabel = variant === 'sampleVsSample' ? 'sample quantile' : 'sample z'

  return (
    <div className={['iux-qq', `iux-qq--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-qq__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Q-Q plot, n=${sample.length}`}>
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-qq__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-qq__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{tick.toFixed(1)}</text>
          </g>
        ))}
        <line className="iux-qq__axis-line" x1={PAD.left} x2={width - PAD.right} y1={baselineY} y2={baselineY} vectorEffect="non-scaling-stroke" />

        {banded && (
          <>
            <path
              className="iux-qq__band"
              d={`M ${xs(banded.lower[0].x)} ${ys(banded.lower[0].y)} ${banded.lower.slice(1).map(p => `L ${xs(p.x)} ${ys(p.y)}`).join(' ')} L ${xs(banded.upper[banded.upper.length - 1].x)} ${ys(banded.upper[banded.upper.length - 1].y)} ${banded.upper.slice(0, -1).reverse().map(p => `L ${xs(p.x)} ${ys(p.y)}`).join(' ')} Z`}
            />
          </>
        )}
        {/* Reference line y = x */}
        <line className="iux-qq__refline" x1={xs(line.from.x)} y1={ys(line.from.y)} x2={xs(line.to.x)} y2={ys(line.to.y)} vectorEffect="non-scaling-stroke" />

        {/* Points */}
        {points.map((p, i) => (
          <circle key={i} className={`iux-qq__dot iux-qq__dot--${intent}`} cx={xs(p.x)} cy={ys(p.y)} r={2.5}>
            <title>{`(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`}</title>
          </circle>
        ))}

        {/* X-axis ticks */}
        {xTicks.map((tick, i) => (
          <text key={`xt-${i}`} className="iux-qq__tick-label" x={xs(tick)} y={baselineY + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{tick.toFixed(1)}</text>
        ))}
        <text className="iux-qq__axis-label" x={width - PAD.right} y={height - 6} textAnchor="end">{xAxisLabel}</text>
        <text className="iux-qq__axis-label" x={PAD.left + 4} y={PAD.top - 4} textAnchor="start">{yAxisLabel}</text>
      </svg>
    </div>
  )
}
