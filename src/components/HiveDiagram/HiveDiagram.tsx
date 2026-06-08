// ABOUTME: SVG hive diagram component that places nodes on three radial axes by a named axis attribute and connects them with curved edges, supporting simple, weighted, and directed variants.

import { useMemo } from 'react'
import './HiveDiagram.css'

// ABOUTME: Controls edge rendering: 'simple' uses uniform 1-px strokes, 'weighted' scales stroke width by edge value, 'directed' adds arrowhead markers.
export type HiveDiagramVariant = 'simple' | 'weighted' | 'directed'

// ABOUTME: Semantic colour intent applied to nodes and axes; assignment follows axis discovery order when not set explicitly on a node.
export type HiveIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A single node in the hive diagram: belongs to a named axis, carries a normalised [0, 1] position along that axis, and optionally overrides its colour intent.
export interface HiveNode {
  id: string
  label: string
  /** Axis the node lives on. The hive uses three axes; nodes are assigned by
   * their `axis` value's discovery order. */
  axis: string
  /** Position along the axis in [0, 1] (0 = near center, 1 = far end). */
  position: number
  intent?: HiveIntent
}

// ABOUTME: A directed connection between two node ids; an optional numeric value drives stroke width in the 'weighted' and 'directed' variants.
export interface HiveEdge {
  from: string
  to: string
  value?: number
}

// ABOUTME: Props for HiveDiagram — supplies the node and edge arrays, optional canvas size, and the rendering variant.
export interface HiveDiagramProps {
  variant?: HiveDiagramVariant
  nodes: HiveNode[]
  edges: HiveEdge[]
  width?: number
  height?: number
  className?: string
}

// ABOUTME: Ordered intent palette used to assign a distinct colour to each axis and its nodes in discovery order.
const INTENTS: HiveIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Fixed angles (in radians) for the three hive axes: pointing up, lower-right, and lower-left — evenly spaced 120° apart.
const AXIS_ANGLES_3 = [-Math.PI / 2, -Math.PI / 2 + (Math.PI * 2) / 3, -Math.PI / 2 + (Math.PI * 4) / 3]

// ABOUTME: Renders nodes on three evenly-spaced radial axes (excess axes collapse onto axis 3), connects them with quadratic Bézier curves that bow away from the centre, and labels each axis at its far end; edge stroke widths and an arrowhead marker are activated by the 'weighted'/'directed' variants.
/**
 * Layout is computed once in a `useMemo` block: node positions are derived
 * from each node's `axis` string (up to three distinct values) and its
 * normalised `position` in [0, 1]. Edges are drawn as quadratic curves whose
 * control point pulls away from the centroid. In the 'directed' variant an
 * SVG `<marker>` arrowhead is appended via `markerEnd`. Axis labels appear
 * past the outer radius, and each node circle carries an SVG `<title>` with
 * axis and position details.
 */
export function HiveDiagram({
  variant = 'simple',
  nodes,
  edges,
  width = 420,
  height = 420,
  className,
}: HiveDiagramProps) {
  const layout = useMemo(() => {
    const cx = width / 2
    const cy = height / 2
    const rIn = 16
    const rOut = Math.min(width, height) / 2 - 28

    const axisOrder: string[] = []
    const axisIntent = new Map<string, HiveIntent>()
    for (const n of nodes) {
      if (!axisOrder.includes(n.axis)) {
        axisOrder.push(n.axis)
        axisIntent.set(n.axis, INTENTS[(axisOrder.length - 1) % INTENTS.length])
      }
    }
    // Cap to 3 axes — extras collapse to axis 3 visually.
    const angleOf = (axis: string) => {
      const idx = Math.min(2, axisOrder.indexOf(axis))
      return AXIS_ANGLES_3[idx]
    }

    const placed = new Map<string, { x: number; y: number; intent: HiveIntent; axisIdx: number }>()
    for (const n of nodes) {
      const a = angleOf(n.axis)
      const r = rIn + Math.max(0, Math.min(1, n.position)) * (rOut - rIn)
      const intent = n.intent ?? axisIntent.get(n.axis)!
      placed.set(n.id, {
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        intent,
        axisIdx: axisOrder.indexOf(n.axis),
      })
    }

    return { cx, cy, rIn, rOut, axisOrder, axisIntent, placed }
  }, [nodes, width, height])

  let maxEdge = 0
  for (const e of edges) if ((e.value ?? 1) > maxEdge) maxEdge = e.value ?? 1
  if (maxEdge <= 0) maxEdge = 1

  return (
    <div className={['iux-hive', `iux-hive--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-hive__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Hive diagram">
        {variant === 'directed' && (
          <defs>
            <marker id="iux-hive-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="iux-hive__arrow" />
            </marker>
          </defs>
        )}
        {/* Axes. */}
        {AXIS_ANGLES_3.map((a, i) => {
          const x1 = layout.cx + Math.cos(a) * layout.rIn
          const y1 = layout.cy + Math.sin(a) * layout.rIn
          const x2 = layout.cx + Math.cos(a) * layout.rOut
          const y2 = layout.cy + Math.sin(a) * layout.rOut
          const axis = layout.axisOrder[i] ?? ''
          const intent = axis ? layout.axisIntent.get(axis)! : 'neutral'
          // Label past the axis end.
          const lp = { x: layout.cx + Math.cos(a) * (layout.rOut + 14), y: layout.cy + Math.sin(a) * (layout.rOut + 14) }
          return (
            <g key={`axis-${i}`} className={`iux-hive__axis iux-hive__axis--${intent}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} vectorEffect="non-scaling-stroke" />
              {axis && (
                <text className="iux-hive__axis-label" x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="central">{axis}</text>
              )}
            </g>
          )
        })}

        {edges.map((e, i) => {
          const a = layout.placed.get(e.from); const b = layout.placed.get(e.to)
          if (!a || !b) return null
          // Curve away from the center.
          const mx = (a.x + b.x) / 2; const my = (a.y + b.y) / 2
          const dxToCenter = layout.cx - mx; const dyToCenter = layout.cy - my
          const ctrl = { x: mx - dxToCenter * 0.3, y: my - dyToCenter * 0.3 }
          const sw = variant === 'simple' ? 1 : 0.75 + ((e.value ?? 1) / maxEdge) * 3
          const dx = b.x - a.x; const dy = b.y - a.y
          const d1 = Math.sqrt(dx * dx + dy * dy) || 1
          const r = 4
          const ax = a.x + (dx / d1) * r
          const ay = a.y + (dy / d1) * r
          const bx = b.x - (dx / d1) * r
          const by = b.y - (dy / d1) * r
          const path = `M ${ax} ${ay} Q ${ctrl.x} ${ctrl.y} ${bx} ${by}`
          return (
            <path
              key={`e-${i}`}
              className={`iux-hive__edge iux-hive__edge--${a.intent}`}
              d={path}
              strokeWidth={sw}
              fill="none"
              vectorEffect="non-scaling-stroke"
              markerEnd={variant === 'directed' ? 'url(#iux-hive-arrow)' : undefined}
            >
              <title>{`${e.from} → ${e.to}${e.value !== undefined ? `: ${e.value}` : ''}`}</title>
            </path>
          )
        })}

        {nodes.map(n => {
          const p = layout.placed.get(n.id)!
          return (
            <g key={n.id} className={`iux-hive__node iux-hive__node--${p.intent}`}>
              <circle cx={p.x} cy={p.y} r={4} />
              <title>{`${n.label} — axis ${n.axis} @ ${(n.position * 100).toFixed(0)}%`}</title>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
