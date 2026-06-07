// ABOUTME: DagLayered — a React component (components).

import { useMemo } from 'react'
import './DagLayered.css'

// ABOUTME: DagLayeredVariant — a type alias.
export type DagLayeredVariant = 'vertical' | 'horizontal' | 'highlighted'

// ABOUTME: DagLayeredIntent — a type alias.
export type DagLayeredIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: DagNode — an interface.
export interface DagNode {
  id: string
  label: string
  intent?: DagLayeredIntent
}

// ABOUTME: DagEdge — an interface.
export interface DagEdge {
  from: string
  to: string
  value?: number
  highlight?: boolean
}

// ABOUTME: Props for DagLayered.
export interface DagLayeredProps {
  variant?: DagLayeredVariant
  nodes: DagNode[]
  edges: DagEdge[]
  width?: number
  height?: number
  className?: string
}

interface PlacedNode {
  node: DagNode
  layer: number
  slot: number
  x: number
  y: number
  intent: DagLayeredIntent
}

const INTENTS: DagLayeredIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

/** Longest-path layer assignment for a DAG. Nodes with no incoming edges go to
 * layer 0; everything else lands at `max(parent.layer) + 1`. Ignores cycles
 * by stopping at the first revisit — safe for input that is, by contract, a DAG. */
function assignLayers(nodes: DagNode[], edges: DagEdge[]): Map<string, number> {
  const incoming = new Map<string, string[]>()
  const outgoing = new Map<string, string[]>()
  for (const n of nodes) { incoming.set(n.id, []); outgoing.set(n.id, []) }
  for (const e of edges) {
    if (!incoming.has(e.to)) incoming.set(e.to, [])
    if (!outgoing.has(e.from)) outgoing.set(e.from, [])
    incoming.get(e.to)!.push(e.from)
    outgoing.get(e.from)!.push(e.to)
  }
  const layer = new Map<string, number>()
  const visiting = new Set<string>()
  function depth(id: string): number {
    if (layer.has(id)) return layer.get(id)!
    if (visiting.has(id)) return 0
    visiting.add(id)
    const ins = incoming.get(id) ?? []
    let d = 0
    for (const p of ins) d = Math.max(d, depth(p) + 1)
    visiting.delete(id)
    layer.set(id, d)
    return d
  }
  for (const n of nodes) depth(n.id)
  return layer
}

/** One pass of barycentric reordering within each layer to reduce crossings. */
function orderWithinLayers(
  nodes: DagNode[],
  edges: DagEdge[],
  layer: Map<string, number>,
): Map<number, string[]> {
  const layers = new Map<number, string[]>()
  for (const n of nodes) {
    const L = layer.get(n.id) ?? 0
    if (!layers.has(L)) layers.set(L, [])
    layers.get(L)!.push(n.id)
  }
  const incoming = new Map<string, string[]>()
  for (const n of nodes) incoming.set(n.id, [])
  for (const e of edges) {
    if (!incoming.has(e.to)) incoming.set(e.to, [])
    incoming.get(e.to)!.push(e.from)
  }
  const maxL = Math.max(...Array.from(layers.keys()))
  // Position by deterministic input order initially.
  const pos = new Map<string, number>()
  for (let L = 0; L <= maxL; L++) {
    const arr = layers.get(L) ?? []
    arr.forEach((id, i) => pos.set(id, i))
  }
  // Sweep top→bottom, sort by mean of parent positions.
  for (let pass = 0; pass < 4; pass++) {
    for (let L = 1; L <= maxL; L++) {
      const arr = layers.get(L) ?? []
      arr.sort((a, b) => {
        const pa = (incoming.get(a) ?? []).map(p => pos.get(p) ?? 0)
        const pb = (incoming.get(b) ?? []).map(p => pos.get(p) ?? 0)
        const ma = pa.length ? pa.reduce((s, v) => s + v, 0) / pa.length : 0
        const mb = pb.length ? pb.reduce((s, v) => s + v, 0) / pb.length : 0
        return ma - mb
      })
      arr.forEach((id, i) => pos.set(id, i))
    }
  }
  return layers
}

// ABOUTME: DagLayered — a React component.
export function DagLayered({
  variant = 'vertical',
  nodes,
  edges,
  width = 560,
  height = 360,
  className,
}: DagLayeredProps) {
  const isHorizontal = variant === 'horizontal'

  const { placed, byId, edgesH } = useMemo(() => {
    const layer = assignLayers(nodes, edges)
    const layers = orderWithinLayers(nodes, edges, layer)
    const maxL = Math.max(...Array.from(layers.keys()))
    const layerCount = maxL + 1
    const maxRow = Math.max(...Array.from(layers.values()).map(arr => arr.length))

    const padX = 32
    const padY = 32
    const layerStep = ((isHorizontal ? width : height) - padX * 2) / Math.max(1, layerCount - 1 || 1)
    const slotStep = ((isHorizontal ? height : width) - padY * 2) / Math.max(1, maxRow)

    const placed: PlacedNode[] = []
    layers.forEach((ids, L) => {
      const offset = (maxRow - ids.length) * slotStep / 2
      ids.forEach((id, i) => {
        const n = nodes.find(nd => nd.id === id)!
        const intent: DagLayeredIntent = n.intent ?? INTENTS[L % INTENTS.length]
        const along = padX + L * layerStep
        const across = padY + offset + (i + 0.5) * slotStep
        placed.push({
          node: n,
          layer: L,
          slot: i,
          x: isHorizontal ? along : across,
          y: isHorizontal ? across : along,
          intent,
        })
      })
    })

    const byId = new Map<string, PlacedNode>()
    for (const p of placed) byId.set(p.node.id, p)

    return { placed, byId, edgesH: edges }
  }, [nodes, edges, variant, width, height, isHorizontal])

  let maxEdge = 0
  for (const e of edgesH) if ((e.value ?? 1) > maxEdge) maxEdge = e.value ?? 1
  if (maxEdge <= 0) maxEdge = 1

  return (
    <div className={['iux-daglayered', `iux-daglayered--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-daglayered__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Layered DAG, ${nodes.length} nodes, ${edges.length} edges`}>
        <defs>
          <marker id="iux-dag-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="iux-daglayered__arrow" />
          </marker>
        </defs>
        {/* Edges */}
        {edgesH.map((e, i) => {
          const a = byId.get(e.from); const b = byId.get(e.to)
          if (!a || !b) return null
          // Route as a sigmoid between the layers; keeps a constant cross-axis.
          let d: string
          if (isHorizontal) {
            const mx = (a.x + b.x) / 2
            d = `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
          } else {
            const my = (a.y + b.y) / 2
            d = `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`
          }
          const w = 0.8 + ((e.value ?? 1) / maxEdge) * 1.6
          const highlighted = !!e.highlight
          const cls = ['iux-daglayered__edge']
          if (variant === 'highlighted') cls.push(highlighted ? 'iux-daglayered__edge--on' : 'iux-daglayered__edge--off')
          return (
            <path
              key={i}
              className={cls.join(' ')}
              d={d}
              fill="none"
              strokeWidth={w}
              vectorEffect="non-scaling-stroke"
              markerEnd="url(#iux-dag-arrow)"
            >
              <title>{`${e.from} → ${e.to}${e.value !== undefined ? `: ${e.value}` : ''}`}</title>
            </path>
          )
        })}
        {/* Nodes (drawn as pill rects with the label inside) */}
        {placed.map(p => {
          const w = Math.max(48, p.node.label.length * 8 + 18)
          const h = 24
          return (
            <g key={p.node.id} className={`iux-daglayered__node iux-daglayered__node--${p.intent}`}>
              <rect x={p.x - w / 2} y={p.y - h / 2} width={w} height={h} rx={h / 2} ry={h / 2} />
              <text className="iux-daglayered__label" x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="central">{p.node.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
