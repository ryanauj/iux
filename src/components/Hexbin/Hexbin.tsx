// ABOUTME: SVG hexagonal binning chart that aggregates 2D scatter points into a pointy-top hex grid and encodes per-bin count as tint intensity, hex size, or inline count labels depending on variant.

import { useMemo } from 'react'
import './Hexbin.css'

// ABOUTME: Encoding mode: 'density' uses tint level (l0–l4) to show relative count with fixed hex size, 'count' shows the raw count as a text label inside each hex, 'sized' scales each hex radius proportionally to the square root of its count.
export type HexbinVariant = 'density' | 'count' | 'sized'

// ABOUTME: A single data point in data-space coordinates; the component projects it into pixel space and snaps it to the nearest hex grid cell.
export interface HexbinPoint {
  x: number
  y: number
}

// ABOUTME: Props for Hexbin — variant selects the count encoding, points is the raw (x,y) array, radius sets the hex circumradius in plot pixels, and xDomain/yDomain optionally clamp the data extents used for projection.
export interface HexbinProps {
  variant?: HexbinVariant
  points: HexbinPoint[]
  width?: number
  height?: number
  /** Hex circumradius in plot pixels. */
  radius?: number
  xDomain?: [number, number]
  yDomain?: [number, number]
  xLabel?: string
  yLabel?: string
  formatX?: (n: number) => string
  formatY?: (n: number) => string
  className?: string
}

// ABOUTME: Pixel padding around the plot area: top/right/bottom/left margins that reserve space for axis tick labels.
const PAD = { top: 16, right: 16, bottom: 32, left: 44 }

// ABOUTME: Formats axis tick values: locale thousands for ≥ 1000, one decimal for ≥ 10, two decimals otherwise.
function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toFixed(1)
  return n.toFixed(2)
}

// ABOUTME: Returns an SVG path string for a pointy-top regular hexagon centred at (cx, cy) with circumradius r.
function hexPath(cx: number, cy: number, r: number): string {
  const pts: string[] = []
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI / 3) * i + Math.PI / 6
    pts.push(`${cx + r * Math.cos(ang)},${cy + r * Math.sin(ang)}`)
  }
  return `M${pts.join('L')}Z`
}

// ABOUTME: Maps a bin count to a discrete tint level (0–4) relative to the peak bin count, driving the CSS fill class on density and count hexes.
function tintLevel(v: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (max <= 0 || v <= 0) return 0
  const r = v / max
  if (r < 0.2) return 1
  if (r < 0.45) return 2
  if (r < 0.72) return 3
  return 4
}

// ABOUTME: Renders a hexbin SVG by projecting each point through linear x/y scales then snapping to axial hex-grid coordinates; bins are tinted by count level, sized by sqrt(count), or labelled with raw counts depending on variant.
/**
 * Bin assignment: each pixel point is converted to (col, row) axial coordinates
 * on a pointy-top grid (odd rows offset by dx/2). Bins accumulate counts in a
 * Map keyed by `"col|row"`. The 'sized' variant scales each hex radius from
 * `max(2, radius * sqrt(n/max))`. The 'count' variant draws full-radius hexes
 * and overlays an `n` text label when both n > 0 and radius >= 12. X/Y axis
 * tick lines and labels are drawn for three evenly-spaced domain values.
 */
export function Hexbin({
  variant = 'density',
  points,
  width = 480,
  height = 320,
  radius = 14,
  xDomain,
  yDomain,
  xLabel,
  yLabel,
  formatX,
  formatY,
  className,
}: HexbinProps) {
  const fmtX = formatX ?? defaultFormat
  const fmtY = formatY ?? defaultFormat

  const { bins, max, xDom, yDom } = useMemo(() => {
    const xDom: [number, number] = xDomain ?? (points.length ? [Math.min(...points.map(p => p.x)), Math.max(...points.map(p => p.x))] : [0, 1])
    const yDom: [number, number] = yDomain ?? (points.length ? [Math.min(...points.map(p => p.y)), Math.max(...points.map(p => p.y))] : [0, 1])
    const px = (v: number) => PAD.left + ((v - xDom[0]) / Math.max(1e-9, xDom[1] - xDom[0])) * (width - PAD.left - PAD.right)
    const py = (v: number) => PAD.top + (1 - (v - yDom[0]) / Math.max(1e-9, yDom[1] - yDom[0])) * (height - PAD.top - PAD.bottom)

    const dx = radius * Math.sqrt(3)
    const dy = radius * 1.5
    const map = new Map<string, { cx: number; cy: number; n: number }>()
    for (const p of points) {
      const x = px(p.x)
      const y = py(p.y)
      // Convert to axial coords on a pointy-top hex grid.
      const row = Math.round(y / dy)
      const offset = (row % 2 === 0) ? 0 : dx / 2
      const col = Math.round((x - offset) / dx)
      const cx = col * dx + offset
      const cy = row * dy
      const key = `${col}|${row}`
      const b = map.get(key)
      if (b) b.n += 1
      else map.set(key, { cx, cy, n: 1 })
    }
    let max = 0
    for (const b of map.values()) if (b.n > max) max = b.n
    return { bins: Array.from(map.values()), max: max || 1, xDom, yDom }
  }, [points, width, height, radius, xDomain, yDomain])

  const xTicks = [xDom[0], (xDom[0] + xDom[1]) / 2, xDom[1]]
  const yTicks = [yDom[0], (yDom[0] + yDom[1]) / 2, yDom[1]]

  const ys = (v: number) => PAD.top + (1 - (v - yDom[0]) / Math.max(1e-9, yDom[1] - yDom[0])) * (height - PAD.top - PAD.bottom)
  const xs = (v: number) => PAD.left + ((v - xDom[0]) / Math.max(1e-9, xDom[1] - xDom[0])) * (width - PAD.left - PAD.right)

  return (
    <div className={['iux-hexbin', `iux-hexbin--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-hexbin__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Hexbin, ${points.length} points binned`}>
        {yTicks.map((tick, i) => (
          <g key={`y-${i}`}>
            <line className="iux-hexbin__gridline" x1={PAD.left} x2={width - PAD.right} y1={ys(tick)} y2={ys(tick)} vectorEffect="non-scaling-stroke" />
            <text className="iux-hexbin__tick-label" x={PAD.left - 6} y={ys(tick)} textAnchor="end" dominantBaseline="central">{fmtY(tick)}</text>
          </g>
        ))}
        {xTicks.map((tick, i) => (
          <g key={`x-${i}`}>
            <line className="iux-hexbin__gridline" x1={xs(tick)} x2={xs(tick)} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
            <text className="iux-hexbin__tick-label" x={xs(tick)} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">{fmtX(tick)}</text>
          </g>
        ))}
        <line className="iux-hexbin__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
        <line className="iux-hexbin__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />

        {bins.map((b, i) => {
          const level = tintLevel(b.n, max)
          const sized = variant === 'sized'
          const r = sized ? Math.max(2, radius * Math.sqrt(b.n / max)) : radius - 1
          if (variant === 'count') {
            return (
              <g key={i} className={`iux-hexbin__bin iux-hexbin__bin--l${level}`}>
                <path d={hexPath(b.cx, b.cy, radius - 1)}>
                  <title>{`bin: ${b.n} points`}</title>
                </path>
                {b.n > 0 && radius >= 12 && (
                  <text className={`iux-hexbin__bin-label iux-hexbin__bin-label--l${level}`} x={b.cx} y={b.cy} textAnchor="middle" dominantBaseline="central">{b.n}</text>
                )}
              </g>
            )
          }
          return (
            <path
              key={i}
              className={`iux-hexbin__bin iux-hexbin__bin--l${level}`}
              d={hexPath(b.cx, b.cy, r)}
            >
              <title>{`bin: ${b.n} points`}</title>
            </path>
          )
        })}
      </svg>
      {(xLabel || yLabel) && (
        <div className="iux-hexbin__axis-labels">
          {yLabel && <span className="iux-hexbin__axis-label">y: {yLabel}</span>}
          {xLabel && <span className="iux-hexbin__axis-label">x: {xLabel}</span>}
          <span className="iux-hexbin__axis-label iux-hexbin__axis-label--meta">peak {max} per bin</span>
        </div>
      )}
    </div>
  )
}
