// ABOUTME: SVG network graph that groups nodes by a string group key, runs a deterministic force-relaxation layout, and renders cluster convex-hull outlines in three modes — plain hull, shaded hull, and labelled clusters.

import { useMemo } from 'react'
import './ForceCluster.css'

// ABOUTME: Rendering style: 'hull' draws a smooth convex boundary around each cluster, 'shaded' fills those hulls with a translucent intent colour, 'labeled' additionally overlays the group name at each cluster's centroid.
export type ForceClusterVariant = 'hull' | 'shaded' | 'labeled'

// ABOUTME: Semantic colour assigned to a group and all its nodes; one intent per group, cycling through the palette by group discovery order.
export type ForceClusterIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A graph node with an id, display label, group key that determines cluster membership and intent colour, and optional numeric weight that scales the node's circle radius.
export interface ForceNode {
  id: string
  label: string
  group: string
  weight?: number
}

// ABOUTME: A connection between two node ids with an optional numeric value that scales stroke width; intra-cluster and inter-cluster edges receive different CSS class modifiers.
export interface ForceEdge {
  from: string
  to: string
  value?: number
}

// ABOUTME: Props for ForceCluster — variant selects hull/shaded/labeled rendering; nodes carry group membership and optional weights; edges drive the force attraction used during layout relaxation.
export interface ForceClusterProps {
  variant?: ForceClusterVariant
  nodes: ForceNode[]
  edges: ForceEdge[]
  width?: number
  height?: number
  className?: string
}

// ABOUTME: Default rotation through the six intent tokens applied per group in discovery order.
const INTENTS: ForceClusterIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: A node after force-layout placement — carries the original ForceNode, final (x, y) pixel coordinates, circle radius scaled from the node's weight, its resolved intent, and its group key.
interface Placed { node: ForceNode; x: number; y: number; r: number; intent: ForceClusterIntent; group: string }

/** Deterministic seeded RNG so the layout is stable across renders. */
// ABOUTME: Returns a deterministic pseudo-random number generator seeded from the given value; used to initialise node positions so the layout is identical on every render.
function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

/**
 * Two-tier relaxation: cluster centers laid out on a coarse ring, then
 * a per-node pass with intra-cluster attraction plus all-pairs repulsion.
 * No animation, no randomness once the seeded layout is built.
 */
// ABOUTME: Runs 80 iterations of force relaxation — places cluster centres on a ring, then applies all-pairs repulsion, per-cluster gravity, and edge attraction — returning a map of node id to final pixel position.
function relax(nodes: ForceNode[], edges: ForceEdge[], width: number, height: number): Map<string, { x: number; y: number }> {
  const cx = width / 2; const cy = height / 2
  const groups = new Map<string, ForceNode[]>()
  for (const n of nodes) {
    if (!groups.has(n.group)) groups.set(n.group, [])
    groups.get(n.group)!.push(n)
  }
  const groupKeys = Array.from(groups.keys())
  const centerR = Math.min(width, height) / 2 - 80
  const centers = new Map<string, { x: number; y: number }>()
  groupKeys.forEach((g, gi) => {
    const a = (gi / groupKeys.length) * Math.PI * 2 - Math.PI / 2
    centers.set(g, { x: cx + Math.cos(a) * centerR, y: cy + Math.sin(a) * centerR })
  })

  const r = rng(7)
  const pos = new Map<string, { x: number; y: number }>()
  for (const n of nodes) {
    const c = centers.get(n.group)!
    pos.set(n.id, { x: c.x + (r() - 0.5) * 60, y: c.y + (r() - 0.5) * 60 })
  }

  const adj = new Map<string, Set<string>>()
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, new Set())
    if (!adj.has(e.to)) adj.set(e.to, new Set())
    adj.get(e.from)!.add(e.to)
    adj.get(e.to)!.add(e.from)
  }

  const k = 60
  for (let iter = 0; iter < 80; iter++) {
    const force = new Map<string, { dx: number; dy: number }>()
    for (const n of nodes) force.set(n.id, { dx: 0, dy: 0 })

    // Repulsion between every pair.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = pos.get(nodes[i].id)!; const b = pos.get(nodes[j].id)!
        const dx = a.x - b.x; const dy = a.y - b.y
        const d2 = Math.max(36, dx * dx + dy * dy)
        const f = (k * k) / d2
        const d = Math.sqrt(d2)
        force.get(nodes[i].id)!.dx += (dx / d) * f
        force.get(nodes[i].id)!.dy += (dy / d) * f
        force.get(nodes[j].id)!.dx -= (dx / d) * f
        force.get(nodes[j].id)!.dy -= (dy / d) * f
      }
    }
    // Cluster gravity — pull each node toward its cluster center.
    for (const n of nodes) {
      const p = pos.get(n.id)!; const c = centers.get(n.group)!
      const dx = c.x - p.x; const dy = c.y - p.y
      force.get(n.id)!.dx += dx * 0.04
      force.get(n.id)!.dy += dy * 0.04
    }
    // Edge attraction.
    for (const e of edges) {
      const a = pos.get(e.from); const b = pos.get(e.to)
      if (!a || !b) continue
      const dx = b.x - a.x; const dy = b.y - a.y
      const d = Math.sqrt(dx * dx + dy * dy) || 1
      const f = (d * d) / (k * 8)
      force.get(e.from)!.dx += (dx / d) * f
      force.get(e.from)!.dy += (dy / d) * f
      force.get(e.to)!.dx -= (dx / d) * f
      force.get(e.to)!.dy -= (dy / d) * f
    }
    const cool = Math.max(0.25, 1 - iter / 80)
    for (const n of nodes) {
      const f = force.get(n.id)!; const p = pos.get(n.id)!
      const m = Math.sqrt(f.dx * f.dx + f.dy * f.dy) || 1
      const limit = Math.min(m, 18 * cool)
      p.x = Math.max(28, Math.min(width - 28, p.x + (f.dx / m) * limit))
      p.y = Math.max(28, Math.min(height - 28, p.y + (f.dy / m) * limit))
    }
  }
  return pos
}

// ABOUTME: Computes the convex hull of a point set using Andrew's monotone chain algorithm (O(n log n)); returns the minimal bounding polygon used as the base for cluster outlines.
function convexHull(points: Array<{ x: number; y: number }>): Array<{ x: number; y: number }> {
  if (points.length < 3) return points.slice()
  const pts = points.slice().sort((a, b) => a.x - b.x || a.y - b.y)
  const cross = (o: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
  const lower: Array<{ x: number; y: number }> = []
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop()
    lower.push(p)
  }
  const upper: Array<{ x: number; y: number }> = []
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop()
    upper.push(p)
  }
  upper.pop(); lower.pop()
  return lower.concat(upper)
}

// ABOUTME: Expands each hull vertex outward from the polygon centroid by `pad` pixels, producing a slightly larger "bubble" boundary that visually encloses the node circles.
function inflateHull(hull: Array<{ x: number; y: number }>, pad: number): Array<{ x: number; y: number }> {
  if (hull.length === 0) return hull
  const cx = hull.reduce((s, p) => s + p.x, 0) / hull.length
  const cy = hull.reduce((s, p) => s + p.y, 0) / hull.length
  return hull.map(p => {
    const dx = p.x - cx; const dy = p.y - cy
    const d = Math.sqrt(dx * dx + dy * dy) || 1
    return { x: p.x + (dx / d) * pad, y: p.y + (dy / d) * pad }
  })
}

// ABOUTME: Converts a convex hull polygon into a smooth closed SVG path by rendering midpoint-anchored quadratic Bézier curves between successive vertices, producing a rounded bubble outline.
function smoothHull(hull: Array<{ x: number; y: number }>): string {
  if (hull.length === 0) return ''
  if (hull.length < 3) return ''
  // Catmull-Rom-ish closed curve using midpoints + quadratic curves.
  let d = ''
  const n = hull.length
  for (let i = 0; i < n; i++) {
    const p0 = hull[i]
    const p1 = hull[(i + 1) % n]
    const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 }
    if (i === 0) d += `M ${mid.x} ${mid.y} `
    else d += `Q ${p0.x} ${p0.y} ${mid.x} ${mid.y} `
  }
  d += 'Z'
  return d
}

// ABOUTME: Renders a force-clustered network SVG: runs `relax` (80-iteration force simulation with all-pairs repulsion, cluster gravity, and edge attraction) then draws smooth inflated convex hulls behind edges and intent-coloured node circles.
/**
 * All layout is computed synchronously in `useMemo` — no animation loop.
 * Node positions are seeded from a deterministic RNG (seed=7) so the layout
 * is stable across re-renders with the same input. Hull paths are built by
 * `convexHull` (Andrew's monotone chain) then inflated 14px outward and
 * smoothed into a closed quadratic-curve path. Edge stroke width scales from
 * 0.6 to 2.4 px proportional to the normalised edge value.
 */
export function ForceCluster({
  variant = 'hull',
  nodes,
  edges,
  width = 560,
  height = 380,
  className,
}: ForceClusterProps) {
  const { placed, byId, clusters } = useMemo(() => {
    const positions = relax(nodes, edges, width, height)
    const groups = new Map<string, ForceNode[]>()
    for (const n of nodes) {
      if (!groups.has(n.group)) groups.set(n.group, [])
      groups.get(n.group)!.push(n)
    }
    const groupKeys = Array.from(groups.keys())
    const groupIntent = new Map<string, ForceClusterIntent>()
    groupKeys.forEach((g, i) => groupIntent.set(g, INTENTS[i % INTENTS.length]))

    let maxW = 0
    for (const n of nodes) if ((n.weight ?? 1) > maxW) maxW = n.weight ?? 1
    if (maxW <= 0) maxW = 1

    const placed: Placed[] = nodes.map(n => {
      const p = positions.get(n.id)!
      const intent = groupIntent.get(n.group)!
      const r = 5 + 8 * Math.sqrt((n.weight ?? 1) / maxW)
      return { node: n, x: p.x, y: p.y, r, intent, group: n.group }
    })

    const byId = new Map<string, Placed>()
    for (const p of placed) byId.set(p.node.id, p)

    const clusters = groupKeys.map(g => {
      const members = groups.get(g)!.map(n => byId.get(n.id)!).filter(Boolean)
      const hull = convexHull(members.map(m => ({ x: m.x, y: m.y })))
      const inflated = inflateHull(hull, 14)
      const cx = members.reduce((s, m) => s + m.x, 0) / Math.max(1, members.length)
      const cy = members.reduce((s, m) => s + m.y, 0) / Math.max(1, members.length)
      return { group: g, intent: groupIntent.get(g)!, hullPath: smoothHull(inflated), members, cx, cy }
    })

    return { placed, byId, clusters }
  }, [nodes, edges, width, height])

  let maxEdge = 0
  for (const e of edges) if ((e.value ?? 1) > maxEdge) maxEdge = e.value ?? 1
  if (maxEdge <= 0) maxEdge = 1

  return (
    <div className={['iux-forcecluster', `iux-forcecluster--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-forcecluster__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Clustered network, ${clusters.length} groups, ${nodes.length} nodes`}>
        {/* Cluster hulls behind everything */}
        {clusters.map(c => (
          <path
            key={`hull-${c.group}`}
            className={`iux-forcecluster__hull iux-forcecluster__hull--${c.intent}`}
            d={c.hullPath}
          />
        ))}
        {/* Edges */}
        {edges.map((e, i) => {
          const a = byId.get(e.from); const b = byId.get(e.to)
          if (!a || !b) return null
          const w = 0.6 + ((e.value ?? 1) / maxEdge) * 1.8
          const sameGroup = a.group === b.group
          return (
            <line
              key={i}
              className={`iux-forcecluster__edge ${sameGroup ? 'iux-forcecluster__edge--intra' : 'iux-forcecluster__edge--inter'}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              strokeWidth={w}
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
        {/* Nodes */}
        {placed.map(p => (
          <g key={p.node.id} className={`iux-forcecluster__node iux-forcecluster__node--${p.intent}`}>
            <circle cx={p.x} cy={p.y} r={p.r} />
            <text className="iux-forcecluster__label" x={p.x} y={p.y + p.r + 3} textAnchor="middle" dominantBaseline="hanging">{p.node.label}</text>
          </g>
        ))}
        {/* Cluster labels */}
        {variant === 'labeled' && clusters.map(c => (
          <text
            key={`gl-${c.group}`}
            className={`iux-forcecluster__group-label iux-forcecluster__group-label--${c.intent}`}
            x={c.cx} y={c.cy}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {c.group}
          </text>
        ))}
      </svg>
    </div>
  )
}
