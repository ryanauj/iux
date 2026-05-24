import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import './LineChart.css'

export type LineChartVariant = 'static' | 'hover' | 'multiples' | 'annotated'

export type SeriesIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface LinePoint {
  t: number
  y: number
}

export interface LineSeries {
  id: string
  label: string
  points: LinePoint[]
  intent?: SeriesIntent
}

export interface LineAnnotation {
  t: number
  label: string
  intent?: SeriesIntent
}

export interface LineChartProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: LineChartVariant
  series: LineSeries[]
  annotations?: LineAnnotation[]
  width?: number
  height?: number
  yDomain?: [number, number]
  formatT?: (t: number) => string
  formatY?: (y: number) => string
  /** Brushable x-range callback for the `multiples` rung. */
  onBrush?: (range: [number, number] | null) => void
  className?: string
}

const DEFAULT_INTENTS: SeriesIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

interface Padding { top: number; right: number; bottom: number; left: number }
const PAD: Padding = { top: 12, right: 12, bottom: 24, left: 40 }
const PAD_DENSE: Padding = { top: 8, right: 8, bottom: 18, left: 28 }

function scaleLinear(value: number, domain: [number, number], range: [number, number]): number {
  const [d0, d1] = domain
  const [r0, r1] = range
  if (d0 === d1) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

function niceTicks(domain: [number, number], count: number): number[] {
  const [d0, d1] = domain
  if (d0 === d1) return [d0]
  const step = (d1 - d0) / Math.max(1, count - 1)
  const out: number[] = []
  for (let i = 0; i < count; i++) out.push(d0 + step * i)
  return out
}

function defaultFormatT(t: number): string {
  const d = new Date(t)
  if (!Number.isFinite(d.getTime())) return String(t)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function defaultFormatY(y: number): string {
  if (Math.abs(y) >= 1000) return y.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (Math.abs(y) >= 10) return y.toLocaleString(undefined, { maximumFractionDigits: 1 })
  return y.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function intentFor(s: LineSeries, idx: number): SeriesIntent {
  return s.intent ?? DEFAULT_INTENTS[idx % DEFAULT_INTENTS.length]
}

function buildPath(points: LinePoint[], xs: (t: number) => number, ys: (y: number) => number): string {
  if (points.length === 0) return ''
  const parts: string[] = []
  points.forEach((p, i) => parts.push(`${i === 0 ? 'M' : 'L'} ${xs(p.t)} ${ys(p.y)}`))
  return parts.join(' ')
}

interface Scales {
  xDomain: [number, number]
  yDomain: [number, number]
  xs: (t: number) => number
  ys: (y: number) => number
}

function buildScales(
  series: LineSeries[],
  width: number,
  height: number,
  pad: Padding,
  yDomainOverride?: [number, number],
): Scales {
  const allT: number[] = []
  const allY: number[] = []
  for (const s of series) for (const p of s.points) { allT.push(p.t); allY.push(p.y) }
  const xDomain: [number, number] = allT.length
    ? [Math.min(...allT), Math.max(...allT)]
    : [0, 1]
  const yDomain: [number, number] = yDomainOverride
    ?? (allY.length ? [Math.min(...allY), Math.max(...allY)] : [0, 1])
  const xs = (t: number) => scaleLinear(t, xDomain, [pad.left, width - pad.right])
  const ys = (y: number) => scaleLinear(y, yDomain, [height - pad.bottom, pad.top])
  return { xDomain, yDomain, xs, ys }
}

export function LineChart({
  variant = 'static',
  series,
  annotations,
  width = 480,
  height = 240,
  yDomain,
  formatT,
  formatY,
  onBrush,
  className,
}: LineChartProps) {
  const fmtT = formatT ?? defaultFormatT
  const fmtY = formatY ?? defaultFormatY

  if (variant === 'multiples' && series.length > 1) {
    return (
      <MultiplesChart
        series={series}
        width={width}
        height={height}
        yDomain={yDomain}
        formatT={fmtT}
        formatY={fmtY}
        onBrush={onBrush}
        className={className}
      />
    )
  }

  return (
    <SingleChart
      variant={variant}
      series={series}
      annotations={annotations}
      width={width}
      height={height}
      yDomain={yDomain}
      formatT={fmtT}
      formatY={fmtY}
      className={className}
    />
  )
}

interface SingleChartProps {
  variant: LineChartVariant
  series: LineSeries[]
  annotations?: LineAnnotation[]
  width: number
  height: number
  yDomain?: [number, number]
  formatT: (t: number) => string
  formatY: (y: number) => string
  className?: string
}

function SingleChart({
  variant,
  series,
  annotations,
  width,
  height,
  yDomain,
  formatT,
  formatY,
  className,
}: SingleChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [hoverT, setHoverT] = useState<number | null>(null)

  const showAxes = true
  const showHover = variant === 'hover' || variant === 'annotated'
  const showAnnotations = variant === 'annotated' && !!annotations?.length
  const xTickCount = variant === 'static' ? 2 : 3
  const yTickCount = variant === 'static' ? 2 : 3

  const { xDomain, yDomain: yDom, xs, ys } = useMemo(
    () => buildScales(series, width, height, PAD, yDomain),
    [series, width, height, yDomain],
  )

  const xTicks = useMemo(() => niceTicks(xDomain, xTickCount), [xDomain, xTickCount])
  const yTicks = useMemo(() => niceTicks(yDom, yTickCount), [yDom, yTickCount])

  const handleMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!showHover) return
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width) * width
    if (px < PAD.left || px > width - PAD.right) { setHoverT(null); return }
    const t = scaleLinear(px, [PAD.left, width - PAD.right], xDomain)
    setHoverT(t)
  }
  const handleLeave = () => setHoverT(null)

  const hoverPoints: { series: LineSeries; intent: SeriesIntent; point: LinePoint; x: number; y: number }[] = []
  if (showHover && hoverT !== null) {
    series.forEach((s, i) => {
      if (s.points.length === 0) return
      let nearest = s.points[0]
      let bestDist = Math.abs(nearest.t - hoverT)
      for (const p of s.points) {
        const d = Math.abs(p.t - hoverT)
        if (d < bestDist) { bestDist = d; nearest = p }
      }
      hoverPoints.push({
        series: s,
        intent: intentFor(s, i),
        point: nearest,
        x: xs(nearest.t),
        y: ys(nearest.y),
      })
    })
  }
  const hoverX = hoverPoints[0]?.x

  const ariaLabel =
    `Line chart with ${series.length} series. ` +
    series.map(s => `${s.label}: ${s.points.length} points`).join('; ')

  const showLegend = series.length > 1 || variant !== 'static'

  return (
    <div
      className={['iux-linechart', `iux-linechart--${variant}`, className].filter(Boolean).join(' ')}
      style={{ width: `${width}px` }}
    >
      {showLegend && (
        <div className="iux-linechart__legend" role="list">
          {series.map((s, i) => (
            <span
              key={s.id}
              role="listitem"
              className={`iux-linechart__legend-item iux-linechart__legend-item--${intentFor(s, i)}`}
            >
              <span className="iux-linechart__swatch" aria-hidden="true" />
              {s.label}
            </span>
          ))}
        </div>
      )}

      <svg
        ref={svgRef}
        className="iux-linechart__svg"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="none"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onPointerCancel={handleLeave}
      >
        {showAxes && (
          <g className="iux-linechart__axes">
            {yTicks.map((tick, i) => {
              const y = ys(tick)
              return (
                <g key={`y-${i}`} className="iux-linechart__y-tick">
                  <line className="iux-linechart__gridline" x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
                  <text className="iux-linechart__tick-label iux-linechart__tick-label--y" x={PAD.left - 6} y={y} textAnchor="end" dominantBaseline="central">
                    {formatY(tick)}
                  </text>
                </g>
              )
            })}
            {xTicks.map((tick, i) => {
              const x = xs(tick)
              return (
                <g key={`x-${i}`} className="iux-linechart__x-tick">
                  <line className="iux-linechart__tick" x1={x} x2={x} y1={height - PAD.bottom} y2={height - PAD.bottom + 3} vectorEffect="non-scaling-stroke" />
                  <text className="iux-linechart__tick-label iux-linechart__tick-label--x" x={x} y={height - PAD.bottom + 6} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} dominantBaseline="hanging">
                    {formatT(tick)}
                  </text>
                </g>
              )
            })}
            <line className="iux-linechart__axis-line" x1={PAD.left} x2={width - PAD.right} y1={height - PAD.bottom} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
            <line className="iux-linechart__axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
          </g>
        )}

        {showAnnotations && annotations!.length === 2 && (
          <rect
            className="iux-linechart__band"
            x={Math.min(xs(annotations![0].t), xs(annotations![1].t))}
            y={PAD.top}
            width={Math.abs(xs(annotations![1].t) - xs(annotations![0].t))}
            height={height - PAD.top - PAD.bottom}
          />
        )}

        <g className="iux-linechart__series">
          {series.map((s, i) => {
            const intent = intentFor(s, i)
            return (
              <path
                key={s.id}
                className={`iux-linechart__line iux-linechart__line--${intent}`}
                d={buildPath(s.points, xs, ys)}
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </g>

        {showAnnotations && annotations!.map((a, i) => {
          const x = xs(a.t)
          const intent = a.intent ?? 'warning'
          const labelHeight = 14
          const labelY = PAD.top - 2
          const padX = 4
          const labelWidth = Math.max(12, a.label.length * 6.5 + padX * 2)
          // Flag to the right of the vertical line; flip to the left if it would overflow the plot area.
          let labelX = x - 2
          if (labelX + labelWidth > width - PAD.right) labelX = x + 2 - labelWidth
          if (labelX < PAD.left) labelX = PAD.left
          return (
            <g key={`ann-${i}`} className={`iux-linechart__annotation iux-linechart__annotation--${intent}`}>
              <line x1={x} x2={x} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
              <rect x={labelX} y={labelY} width={labelWidth} height={labelHeight} rx={2} />
              <text x={labelX + padX} y={labelY + labelHeight / 2} dominantBaseline="central">{a.label}</text>
            </g>
          )
        })}

        {showHover && hoverT !== null && hoverX !== undefined && (
          <g className="iux-linechart__crosshair">
            <line x1={hoverX} x2={hoverX} y1={PAD.top} y2={height - PAD.bottom} vectorEffect="non-scaling-stroke" />
            {hoverPoints.map(h => (
              <circle
                key={h.series.id}
                className={`iux-linechart__hover-dot iux-linechart__hover-dot--${h.intent}`}
                cx={h.x}
                cy={h.y}
                r={3}
              />
            ))}
          </g>
        )}
      </svg>

      {showHover && hoverPoints.length > 0 && (
        <div className="iux-linechart__readout" aria-live="polite">
          <span className="iux-linechart__readout-t">{formatT(hoverPoints[0].point.t)}</span>
          <div className="iux-linechart__readout-rows">
            {hoverPoints.map(h => (
              <span
                key={h.series.id}
                className={`iux-linechart__readout-row iux-linechart__readout-row--${h.intent}`}
              >
                <span className="iux-linechart__swatch" aria-hidden="true" />
                <span className="iux-linechart__readout-label">{h.series.label}</span>
                <span className="iux-linechart__readout-value">{formatY(h.point.y)}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface MultiplesChartProps {
  series: LineSeries[]
  width: number
  height: number
  yDomain?: [number, number]
  formatT: (t: number) => string
  formatY: (y: number) => string
  onBrush?: (range: [number, number] | null) => void
  className?: string
}

function MultiplesChart({
  series,
  width,
  height,
  yDomain,
  formatT,
  formatY,
  onBrush,
  className,
}: MultiplesChartProps) {
  const cols = series.length <= 2 ? series.length : 2
  const rows = Math.ceil(series.length / cols)
  const gap = 8
  const panelW = Math.floor((width - gap * (cols - 1)) / cols)
  const panelH = Math.max(80, Math.floor((height - gap * (rows - 1)) / rows))

  const sharedY: [number, number] = useMemo(() => {
    if (yDomain) return yDomain
    const all: number[] = []
    for (const s of series) for (const p of s.points) all.push(p.y)
    return all.length ? [Math.min(...all), Math.max(...all)] : [0, 1]
  }, [series, yDomain])

  return (
    <div
      className={['iux-linechart', 'iux-linechart--multiples-grid', className].filter(Boolean).join(' ')}
      style={{
        width: `${width}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {series.map((s, i) => (
        <MultiplesPanel
          key={s.id}
          series={s}
          intent={intentFor(s, i)}
          width={panelW}
          height={panelH}
          yDomain={sharedY}
          formatT={formatT}
          formatY={formatY}
          onBrush={onBrush}
        />
      ))}
    </div>
  )
}

interface MultiplesPanelProps {
  series: LineSeries
  intent: SeriesIntent
  width: number
  height: number
  yDomain: [number, number]
  formatT: (t: number) => string
  formatY: (y: number) => string
  onBrush?: (range: [number, number] | null) => void
}

function MultiplesPanel({
  series,
  intent,
  width,
  height,
  yDomain,
  formatT,
  formatY,
  onBrush,
}: MultiplesPanelProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [brush, setBrush] = useState<{ start: number; end: number } | null>(null)
  const dragRef = useRef<number | null>(null)
  const pad = PAD_DENSE

  const { xDomain, xs, ys } = useMemo(
    () => buildScales([series], width, height, pad, yDomain),
    [series, width, height, yDomain, pad],
  )

  const xTicks = useMemo(() => niceTicks(xDomain, 2), [xDomain])

  const pxToT = (clientX: number): number => {
    const svg = svgRef.current
    if (!svg) return xDomain[0]
    const rect = svg.getBoundingClientRect()
    const px = ((clientX - rect.left) / rect.width) * width
    const clamped = Math.max(pad.left, Math.min(width - pad.right, px))
    return scaleLinear(clamped, [pad.left, width - pad.right], xDomain)
  }

  const handleDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!onBrush) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const t = pxToT(event.clientX)
    dragRef.current = t
    setBrush({ start: t, end: t })
  }
  const handleMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!onBrush || dragRef.current === null) return
    const t = pxToT(event.clientX)
    setBrush({ start: dragRef.current, end: t })
  }
  const handleUp = () => {
    if (!onBrush || dragRef.current === null) return
    dragRef.current = null
    setBrush(prev => {
      if (!prev) return null
      const [a, b] = prev.start <= prev.end ? [prev.start, prev.end] : [prev.end, prev.start]
      if (Math.abs(a - b) < (xDomain[1] - xDomain[0]) * 0.005) {
        onBrush(null)
        return null
      }
      onBrush([a, b])
      return prev
    })
  }

  const brushX = brush ? Math.min(xs(brush.start), xs(brush.end)) : 0
  const brushW = brush ? Math.abs(xs(brush.end) - xs(brush.start)) : 0

  return (
    <div className="iux-linechart__panel">
      <div className={`iux-linechart__panel-head iux-linechart__panel-head--${intent}`}>
        <span className="iux-linechart__swatch" aria-hidden="true" />
        <span className="iux-linechart__panel-label">{series.label}</span>
      </div>
      <svg
        ref={svgRef}
        className="iux-linechart__svg"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`${series.label}: ${series.points.length} points`}
        preserveAspectRatio="none"
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        style={{ touchAction: onBrush ? 'none' : undefined, cursor: onBrush ? 'ew-resize' : undefined }}
      >
        <line className="iux-linechart__axis-line" x1={pad.left} x2={width - pad.right} y1={height - pad.bottom} y2={height - pad.bottom} vectorEffect="non-scaling-stroke" />
        <text className="iux-linechart__tick-label iux-linechart__tick-label--y" x={pad.left - 4} y={ys(yDomain[1])} textAnchor="end" dominantBaseline="central">{formatY(yDomain[1])}</text>
        <text className="iux-linechart__tick-label iux-linechart__tick-label--y" x={pad.left - 4} y={ys(yDomain[0])} textAnchor="end" dominantBaseline="central">{formatY(yDomain[0])}</text>
        {xTicks.map((tick, i) => (
          <text
            key={i}
            className="iux-linechart__tick-label iux-linechart__tick-label--x"
            x={xs(tick)}
            y={height - pad.bottom + 4}
            textAnchor={i === 0 ? 'start' : 'end'}
            dominantBaseline="hanging"
          >
            {formatT(tick)}
          </text>
        ))}
        {brush && brushW > 0 && (
          <rect className="iux-linechart__brush" x={brushX} y={pad.top} width={brushW} height={height - pad.top - pad.bottom} />
        )}
        <path
          className={`iux-linechart__line iux-linechart__line--${intent}`}
          d={buildPath(series.points, xs, ys)}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
