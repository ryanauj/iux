import { useMemo } from 'react'
import './Hexbin.css'

export type HexbinVariant = 'density' | 'count' | 'sized'

export interface HexbinPoint {
  x: number
  y: number
}

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

const PAD = { top: 16, right: 16, bottom: 32, left: 44 }

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(n) >= 10) return n.toFixed(1)
  return n.toFixed(2)
}

function hexPath(cx: number, cy: number, r: number): string {
  const pts: string[] = []
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI / 3) * i + Math.PI / 6
    pts.push(`${cx + r * Math.cos(ang)},${cy + r * Math.sin(ang)}`)
  }
  return `M${pts.join('L')}Z`
}

function tintLevel(v: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (max <= 0 || v <= 0) return 0
  const r = v / max
  if (r < 0.2) return 1
  if (r < 0.45) return 2
  if (r < 0.72) return 3
  return 4
}

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
