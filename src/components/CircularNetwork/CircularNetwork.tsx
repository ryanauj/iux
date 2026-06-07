// ABOUTME: SVG network graph that arranges nodes evenly on a circle and connects them with center-curving quadratic Bézier edges, with simple, weighted-stroke, and directed (arrowhead) variants.

import { useMemo } from 'react'
import './CircularNetwork.css'

// ABOUTME: Display mode — 'simple' draws uniform-weight edges, 'weighted' scales stroke width by edge value, 'directed' adds an arrowhead marker at the target node.
export type CircularNetworkVariant = 'simple' | 'weighted' | 'directed'

// ABOUTME: Semantic color token applied to a node's circle and its outgoing edges, drawn from the six contract intents.
export type CircularNetworkIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A network node placed on the circle ring — id, label, optional group (drives intent color), optional explicit intent, and optional weight (drives node circle radius).
export interface CircularNode {
  id: string
  label: string
  group?: string
  intent?: CircularNetworkIntent
  weight?: number
}

// ABOUTME: A directed edge between two node ids with an optional numeric value used by the 'weighted' variant to scale stroke width.
export interface CircularEdge {
  from: string
  to: string
  value?: number
}

// ABOUTME: Props for CircularNetwork — supplies node and edge data, variant, and SVG dimensions.
export interface CircularNetworkProps {
  variant?: CircularNetworkVariant
  nodes: CircularNode[]
  edges: CircularEdge[]
  width?: number
  height?: number
  className?: string
}

const INTENTS: CircularNetworkIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Sorts nodes by group so clusters are adjacent on the ring, places each node at an equal angular step, scales node radius by `weight`, then draws quadratic Bézier edges that curve toward the center; 'directed' injects an SVG `<marker>` arrowhead.
/**
 * The layout memo sorts nodes by group (then label) so same-group nodes cluster
 * adjacently on the ring. Edge control points are computed as the midpoint
 * between endpoints pulled toward the center by a fraction of the chord length
 * (`curl`), creating the characteristic inward curve. Edge endpoints are
 * shortened by each node's radius so strokes don't overlap the circles.
 * Labels are positioned radially just outside `r0` with text-anchor adjusted
 * by the cosine of the node's angle.
 */
export function CircularNetwork({
  variant = 'simple',
  nodes,
  edges,
  width = 420,
  height = 420,
  className,
}: CircularNetworkProps) {
  const layout = useMemo(() => {
    const cx = width / 2
    const cy = height / 2
    const r0 = Math.min(width, height) / 2 - 36

    const groupIntent = new Map<string, CircularNetworkIntent>()
    let gi = 0
    for (const n of nodes) {
      const g = n.group ?? '__'
      if (!groupIntent.has(g)) groupIntent.set(g, INTENTS[gi++ % INTENTS.length])
    }

    // Sort by group so clusters land adjacent on the ring.
    const ordered = nodes.slice().sort((a, b) => {
      const ga = a.group ?? ''
      const gb = b.group ?? ''
      if (ga !== gb) return ga.localeCompare(gb)
      return a.label.localeCompare(b.label)
    })

    let maxW = 0
    for (const n of nodes) if ((n.weight ?? 1) > maxW) maxW = n.weight ?? 1
    if (maxW <= 0) maxW = 1

    const placed = new Map<string, { x: number; y: number; r: number; intent: CircularNetworkIntent; angle: number }>()
    ordered.forEach((n, i) => {
      const a = -Math.PI / 2 + (i / ordered.length) * Math.PI * 2
      const x = cx + Math.cos(a) * r0
      const y = cy + Math.sin(a) * r0
      const r = 5 + 7 * Math.sqrt((n.weight ?? 1) / maxW)
      const intent = n.intent ?? groupIntent.get(n.group ?? '__')!
      placed.set(n.id, { x, y, r, intent, angle: a })
    })

    return { cx, cy, r0, placed }
  }, [nodes, width, height])

  let maxEdge = 0
  for (const e of edges) if ((e.value ?? 1) > maxEdge) maxEdge = e.value ?? 1
  if (maxEdge <= 0) maxEdge = 1

  return (
    <div className={['iux-circnet', `iux-circnet--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-circnet__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Circular network, ${nodes.length} nodes, ${edges.length} edges`}>
        {variant === 'directed' && (
          <defs>
            <marker id="iux-circnet-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="iux-circnet__arrow" />
            </marker>
          </defs>
        )}
        {/* Ring guide. */}
        <circle className="iux-circnet__guide" cx={layout.cx} cy={layout.cy} r={layout.r0} />
        {edges.map((e, i) => {
          const a = layout.placed.get(e.from); const b = layout.placed.get(e.to)
          if (!a || !b) return null
          const sw = variant === 'simple' ? 1 : 0.8 + ((e.value ?? 1) / maxEdge) * 3
          // Quadratic Bezier curving toward the center.
          const dx = b.x - a.x; const dy = b.y - a.y
          const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
          const toCenter = { x: layout.cx - mid.x, y: layout.cy - mid.y }
          const len = Math.sqrt(toCenter.x * toCenter.x + toCenter.y * toCenter.y) || 1
          const curl = Math.min(0.55, Math.sqrt(dx * dx + dy * dy) / (layout.r0 * 2))
          const ctrl = { x: mid.x + toCenter.x * curl, y: mid.y + toCenter.y * curl }
          // Shorten ends to node radius.
          const d1 = Math.sqrt(dx * dx + dy * dy) || 1
          const ax = a.x + (dx / d1) * a.r
          const ay = a.y + (dy / d1) * a.r
          const bx = b.x - (dx / d1) * b.r
          const by = b.y - (dy / d1) * b.r
          const path = `M ${ax} ${ay} Q ${ctrl.x} ${ctrl.y} ${bx} ${by}`
          return (
            <path
              key={`e-${i}`}
              className={`iux-circnet__edge iux-circnet__edge--${a.intent}`}
              d={path}
              strokeWidth={sw}
              fill="none"
              vectorEffect="non-scaling-stroke"
              markerEnd={variant === 'directed' ? 'url(#iux-circnet-arrow)' : undefined}
              data-len={len}
            >
              <title>{`${e.from} → ${e.to}${e.value !== undefined ? `: ${e.value}` : ''}`}</title>
            </path>
          )
        })}
        {nodes.map(n => {
          const p = layout.placed.get(n.id)!
          const labelR = layout.r0 + 14
          const lx = layout.cx + Math.cos(p.angle) * labelR
          const ly = layout.cy + Math.sin(p.angle) * labelR
          const anchor = Math.cos(p.angle) > 0.1 ? 'start' : Math.cos(p.angle) < -0.1 ? 'end' : 'middle'
          return (
            <g key={n.id} className={`iux-circnet__node iux-circnet__node--${p.intent}`}>
              <circle cx={p.x} cy={p.y} r={p.r} />
              <text className="iux-circnet__label" x={lx} y={ly} textAnchor={anchor} dominantBaseline="central">{n.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
