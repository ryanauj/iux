// ABOUTME: SVG node-link network diagram with a deterministic force-relaxation layout, supporting simple uniform edges, weighted stroke-width scaling, and directed arrowhead edges; node radius scales with the optional `weight` field.

import { useMemo } from 'react'
import './NodeLink.css'

// ABOUTME: Controls edge rendering: 'simple' uses uniform 1-px strokes, 'weighted' scales stroke width by edge value, 'directed' adds an SVG arrowhead marker at each edge target.
export type NodeLinkVariant = 'simple' | 'weighted' | 'directed'

// ABOUTME: Semantic colour intent applied per node, derived from the node's `group` when no explicit `intent` is set; each distinct group receives the next intent in the rotation.
export type NodeLinkIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A node in the network: a stable `id`, a display `label` rendered below the circle, an optional `group` string for intent colouring and initial cluster placement, an optional `weight` that scales the circle radius, and optional explicit `x`/`y` in [0, 1] to override the force layout.
export interface GraphNode {
  id: string
  label: string
  /** Group/cluster id — drives intent if no explicit intent is set. */
  group?: string
  intent?: NodeLinkIntent
  /** Importance value — drives node radius. */
  weight?: number
  /** Optional explicit x/y in [0, 1] for hand-placed layouts; if omitted, a deterministic layout is used. */
  x?: number
  y?: number
}

// ABOUTME: A directed connection between two node ids; the optional `value` drives stroke width in the 'weighted'/'directed' variants and appears in the SVG `<title>` tooltip.
export interface GraphEdge {
  from: string
  to: string
  /** Edge weight — drives stroke thickness (`weighted` and `directed`). */
  value?: number
}

// ABOUTME: Configures NodeLink — supplies the node and edge arrays, canvas dimensions, and the rendering variant.
export interface NodeLinkProps {
  variant?: NodeLinkVariant
  nodes: GraphNode[]
  edges: GraphEdge[]
  width?: number
  height?: number
  className?: string
}

// ABOUTME: Ordered intent cycle used to assign distinct colors to node groups when no explicit intent is set on a node; wraps modularly so any number of groups is handled.
const INTENTS: NodeLinkIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Internal record produced by the layout pass: combines the original GraphNode with its computed canvas pixel position, circle radius, and resolved intent.
interface Placed { node: GraphNode; x: number; y: number; r: number; intent: NodeLinkIntent }

// ABOUTME: Places nodes on a canvas by clustering them on concentric arcs by group, then iterates 60 steps of Fruchterman-Reingold repulsion+spring attraction with linear cooling; returns a map from node id to pixel x/y.
function deterministicLayout(nodes: GraphNode[], edges: GraphEdge[], width: number, height: number): Map<string, { x: number; y: number }> {
  // Pre-position by group on concentric arcs, then run a few iterations of
  // a simple repulsion / spring relaxation (no animation, deterministic).
  const cx = width / 2
  const cy = height / 2
  const r0 = Math.min(width, height) / 2 - 32

  // Resolve groups; if no groups, treat all as one group.
  const groups = new Map<string, GraphNode[]>()
  for (const n of nodes) {
    const g = n.group ?? '__'
    if (!groups.has(g)) groups.set(g, [])
    groups.get(g)!.push(n)
  }
  const groupKeys = Array.from(groups.keys())
  const ring: Map<string, { x: number; y: number }> = new Map()
  groupKeys.forEach((g, gi) => {
    const gnodes = groups.get(g)!
    const ang0 = (gi / groupKeys.length) * Math.PI * 2
    const arcSpan = (Math.PI * 2) / groupKeys.length * 0.85
    gnodes.forEach((n, i) => {
      if (n.x !== undefined && n.y !== undefined) {
        ring.set(n.id, { x: n.x * width, y: n.y * height })
        return
      }
      const a = ang0 - arcSpan / 2 + arcSpan * ((i + 0.5) / gnodes.length)
      ring.set(n.id, { x: cx + Math.cos(a) * r0, y: cy + Math.sin(a) * r0 })
    })
  })

  // Adjacency lookup.
  const adj = new Map<string, Set<string>>()
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, new Set())
    if (!adj.has(e.to)) adj.set(e.to, new Set())
    adj.get(e.from)!.add(e.to)
    adj.get(e.to)!.add(e.from)
  }

  // Relaxation: pull connected nodes together, push all others apart.
  const k = 80
  for (let iter = 0; iter < 60; iter++) {
    const force = new Map<string, { dx: number; dy: number }>()
    for (const n of nodes) force.set(n.id, { dx: 0, dy: 0 })
    // Repulsion.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = ring.get(nodes[i].id)!
        const b = ring.get(nodes[j].id)!
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d2 = Math.max(40, dx * dx + dy * dy)
        const f = (k * k) / d2
        const fx = f * dx / Math.sqrt(d2)
        const fy = f * dy / Math.sqrt(d2)
        force.get(nodes[i].id)!.dx += fx
        force.get(nodes[i].id)!.dy += fy
        force.get(nodes[j].id)!.dx -= fx
        force.get(nodes[j].id)!.dy -= fy
      }
    }
    // Attraction.
    for (const e of edges) {
      const a = ring.get(e.from); const b = ring.get(e.to)
      if (!a || !b) continue
      const dx = b.x - a.x
      const dy = b.y - a.y
      const d = Math.sqrt(dx * dx + dy * dy) || 1
      const f = (d * d) / (k * 6)
      const fx = f * dx / d
      const fy = f * dy / d
      force.get(e.from)!.dx += fx
      force.get(e.from)!.dy += fy
      force.get(e.to)!.dx -= fx
      force.get(e.to)!.dy -= fy
    }
    // Apply with cooling.
    const cool = Math.max(0.3, 1 - iter / 60)
    for (const n of nodes) {
      const f = force.get(n.id)!
      const p = ring.get(n.id)!
      const mag = Math.sqrt(f.dx * f.dx + f.dy * f.dy) || 1
      const limit = Math.min(mag, 18 * cool)
      p.x = Math.max(20, Math.min(width - 20, p.x + (f.dx / mag) * limit))
      p.y = Math.max(20, Math.min(height - 20, p.y + (f.dy / mag) * limit))
    }
  }

  return ring
}

// ABOUTME: Computes node positions via `deterministicLayout` (group-clustered initial placement followed by 60 iterations of Fruchterman-Reingold repulsion+attraction), then renders edges as straight lines and nodes as intent-coloured circles with text labels.
/**
 * Layout is memoized on `[nodes, edges, width, height]`; explicit node `x`/`y`
 * props bypass the force pass and are scaled from [0,1] to canvas coordinates.
 * Circle radius is `6 + 10 * sqrt(weight / maxWeight)`, so heavier nodes are
 * visually prominent. In the 'directed' variant an SVG `<marker>` arrowhead is
 * defined once in `<defs>` and referenced by all edge `markerEnd` attributes.
 */
export function NodeLink({
  variant = 'simple',
  nodes,
  edges,
  width = 520,
  height = 360,
  className,
}: NodeLinkProps) {
  const layout = useMemo(() => {
    const positions = deterministicLayout(nodes, edges, width, height)
    const groupIntent = new Map<string, NodeLinkIntent>()
    let gi = 0
    for (const n of nodes) {
      const g = n.group ?? '__'
      if (!groupIntent.has(g)) groupIntent.set(g, INTENTS[gi++ % INTENTS.length])
    }
    let maxW = 0
    for (const n of nodes) if ((n.weight ?? 1) > maxW) maxW = n.weight ?? 1
    if (maxW <= 0) maxW = 1
    const placed: Placed[] = nodes.map(n => {
      const p = positions.get(n.id)!
      const intent: NodeLinkIntent = n.intent ?? groupIntent.get(n.group ?? '__')!
      const r = 6 + 10 * Math.sqrt((n.weight ?? 1) / maxW)
      return { node: n, x: p.x, y: p.y, r, intent }
    })
    return placed
  }, [nodes, edges, width, height])

  const byId = useMemo(() => {
    const m = new Map<string, Placed>()
    for (const p of layout) m.set(p.node.id, p)
    return m
  }, [layout])

  let maxEdge = 0
  for (const e of edges) if ((e.value ?? 1) > maxEdge) maxEdge = e.value ?? 1
  if (maxEdge <= 0) maxEdge = 1

  return (
    <div className={['iux-nodelink', `iux-nodelink--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-nodelink__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Network, ${nodes.length} nodes, ${edges.length} edges`}>
        {variant === 'directed' && (
          <defs>
            <marker id="iux-nodelink-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="iux-nodelink__arrow" />
            </marker>
          </defs>
        )}
        {edges.map((e, i) => {
          const a = byId.get(e.from); const b = byId.get(e.to)
          if (!a || !b) return null
          const w = variant === 'simple' ? 1 : 0.75 + ((e.value ?? 1) / maxEdge) * 3
          const dx = b.x - a.x; const dy = b.y - a.y
          const d = Math.sqrt(dx * dx + dy * dy) || 1
          // shorten to node radius
          const ax = a.x + (dx / d) * a.r
          const ay = a.y + (dy / d) * a.r
          const bx = b.x - (dx / d) * b.r
          const by = b.y - (dy / d) * b.r
          return (
            <line
              key={i}
              className="iux-nodelink__edge"
              x1={ax}
              y1={ay}
              x2={bx}
              y2={by}
              strokeWidth={w}
              vectorEffect="non-scaling-stroke"
              markerEnd={variant === 'directed' ? 'url(#iux-nodelink-arrow)' : undefined}
            >
              <title>{`${e.from} → ${e.to}${e.value !== undefined ? `: ${e.value}` : ''}`}</title>
            </line>
          )
        })}
        {layout.map(p => (
          <g key={p.node.id} className={`iux-nodelink__node iux-nodelink__node--${p.intent}`}>
            <circle cx={p.x} cy={p.y} r={p.r} />
            <text className="iux-nodelink__label" x={p.x} y={p.y + p.r + 4} textAnchor="middle" dominantBaseline="hanging">{p.node.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
