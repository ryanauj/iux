// ABOUTME: EdgeBundle — a React component (components).

import { useMemo } from 'react'
import './EdgeBundle.css'

// ABOUTME: EdgeBundleVariant — a type alias.
export type EdgeBundleVariant = 'simple' | 'bundled' | 'directional'

// ABOUTME: EdgeBundleIntent — a type alias.
export type EdgeBundleIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: EdgeBundleNode — an interface.
export interface EdgeBundleNode {
  id: string
  label: string
  intent?: EdgeBundleIntent
  children?: EdgeBundleNode[]
}

// ABOUTME: EdgeBundleEdge — an interface.
export interface EdgeBundleEdge {
  from: string
  to: string
  value?: number
}

// ABOUTME: Props for EdgeBundle.
export interface EdgeBundleProps {
  variant?: EdgeBundleVariant
  /** Hierarchy root. Leaves are the nodes that participate in edges. */
  root: EdgeBundleNode
  /** Edges between leaf ids. */
  edges: EdgeBundleEdge[]
  width?: number
  height?: number
  className?: string
}

const INTENTS: EdgeBundleIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

interface Placed { node: EdgeBundleNode; depth: number; a0: number; a1: number; r: number; x: number; y: number; isLeaf: boolean; intent: EdgeBundleIntent; parent?: Placed; children: Placed[] }

function layoutRadial(root: EdgeBundleNode, cx: number, cy: number, rMax: number): { all: Placed[]; leaves: Placed[]; byId: Map<string, Placed> } {
  const leavesFirst: EdgeBundleNode[] = []
  function collectLeaves(n: EdgeBundleNode) {
    if (!n.children || n.children.length === 0) { leavesFirst.push(n); return }
    n.children.forEach(collectLeaves)
  }
  collectLeaves(root)
  const leafCount = Math.max(1, leavesFirst.length)
  let maxDepth = 0
  function getDepth(n: EdgeBundleNode, d: number): number {
    if (!n.children || n.children.length === 0) { if (d > maxDepth) maxDepth = d; return d }
    return Math.max(...n.children.map(c => getDepth(c, d + 1)))
  }
  getDepth(root, 0)

  let leafCursor = 0
  const all: Placed[] = []
  const leaves: Placed[] = []
  const byId = new Map<string, Placed>()

  function visit(n: EdgeBundleNode, depth: number, parent: Placed | undefined, parentIntent?: EdgeBundleIntent, siblingIdx = 0): Placed {
    const isLeaf = !n.children || n.children.length === 0
    let a0: number, a1: number
    let childPlaced: Placed[] = []
    if (isLeaf) {
      const a = -Math.PI / 2 + (leafCursor / leafCount) * Math.PI * 2
      a0 = a - 0.0001; a1 = a + 0.0001
      leafCursor += 1
    } else {
      const childIntents = depth === 0
      childPlaced = n.children!.map((c, i) => visit(c, depth + 1, undefined as unknown as Placed, parentIntent ?? (childIntents ? INTENTS[i % INTENTS.length] : undefined), i))
      a0 = childPlaced[0].a0
      a1 = childPlaced[childPlaced.length - 1].a1
    }
    const mid = (a0 + a1) / 2
    const r = (depth / Math.max(1, maxDepth)) * rMax
    const intent: EdgeBundleIntent = n.intent ?? parentIntent ?? INTENTS[siblingIdx % INTENTS.length]
    const p: Placed = {
      node: n,
      depth,
      a0,
      a1,
      r,
      x: cx + Math.cos(mid) * r,
      y: cy + Math.sin(mid) * r,
      isLeaf,
      intent,
      parent,
      children: childPlaced,
    }
    for (const c of childPlaced) (c as Placed).parent = p
    all.push(p)
    if (isLeaf) leaves.push(p)
    byId.set(n.id, p)
    return p
  }

  visit(root, 0, undefined)
  return { all, leaves, byId }
}

/** Build the path from a leaf up to the root. */
function ancestors(n: Placed): Placed[] {
  const out: Placed[] = []
  let cur: Placed | undefined = n
  while (cur) { out.push(cur); cur = cur.parent }
  return out
}

function bundlePath(from: Placed, to: Placed, beta: number): string {
  // Hierarchical edge bundling: control points = least-common-ancestor path.
  // We pull each intermediate point toward the straight line by (1 - beta).
  const aChain = ancestors(from).reverse()
  const bChain = ancestors(to).reverse()
  let lca = 0
  while (lca < Math.min(aChain.length, bChain.length) && aChain[lca].node.id === bChain[lca].node.id) lca += 1
  // Path: from leaf up to LCA, then down to other leaf.
  const path: Placed[] = []
  for (let i = aChain.length - 1; i >= lca - 1; i--) if (aChain[i]) path.push(aChain[i])
  for (let i = lca; i < bChain.length; i++) path.push(bChain[i])
  if (path.length < 2) return ''
  // Straighten with beta.
  const ax = path[0].x; const ay = path[0].y
  const bx = path[path.length - 1].x; const by = path[path.length - 1].y
  const pulled = path.map((p, i) => {
    const t = path.length === 1 ? 0 : i / (path.length - 1)
    const sx = ax + (bx - ax) * t
    const sy = ay + (by - ay) * t
    return { x: beta * p.x + (1 - beta) * sx, y: beta * p.y + (1 - beta) * sy }
  })
  let d = `M ${pulled[0].x} ${pulled[0].y}`
  // Catmull-Rom-ish: chain quads through midpoints.
  for (let i = 1; i < pulled.length - 1; i++) {
    const mx = (pulled[i].x + pulled[i + 1].x) / 2
    const my = (pulled[i].y + pulled[i + 1].y) / 2
    d += ` Q ${pulled[i].x} ${pulled[i].y} ${mx} ${my}`
  }
  d += ` L ${pulled[pulled.length - 1].x} ${pulled[pulled.length - 1].y}`
  return d
}

// ABOUTME: EdgeBundle — a React component.
export function EdgeBundle({
  variant = 'bundled',
  root,
  edges,
  width = 460,
  height = 460,
  className,
}: EdgeBundleProps) {
  const layout = useMemo(() => {
    const cx = width / 2
    const cy = height / 2
    const rMax = Math.min(width, height) / 2 - 56
    return layoutRadial(root, cx, cy, rMax)
  }, [root, width, height])

  const beta = variant === 'simple' ? 0 : variant === 'bundled' ? 0.82 : 0.78

  return (
    <div className={['iux-bundle', `iux-bundle--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-bundle__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Edge-bundled hierarchy">
        {/* Edges first, leaves on top. */}
        {edges.map((e, i) => {
          const a = layout.byId.get(e.from); const b = layout.byId.get(e.to)
          if (!a || !b || !a.isLeaf || !b.isLeaf) return null
          const d = bundlePath(a, b, beta)
          const intent: EdgeBundleIntent = variant === 'directional' ? a.intent : 'neutral'
          return (
            <path
              key={`e-${i}`}
              className={`iux-bundle__edge iux-bundle__edge--${intent}`}
              d={d}
              fill="none"
              vectorEffect="non-scaling-stroke"
            >
              <title>{`${e.from} → ${e.to}${e.value !== undefined ? `: ${e.value}` : ''}`}</title>
            </path>
          )
        })}
        {layout.leaves.map(p => {
          const a = (p.a0 + p.a1) / 2
          const cx = width / 2; const cy = height / 2
          const lp = { x: cx + Math.cos(a) * (p.r + 12), y: cy + Math.sin(a) * (p.r + 12) }
          const anchor = Math.cos(a) > 0.1 ? 'start' : Math.cos(a) < -0.1 ? 'end' : 'middle'
          return (
            <g key={p.node.id} className={`iux-bundle__leaf iux-bundle__leaf--${p.intent}`}>
              <circle cx={p.x} cy={p.y} r={3.5} />
              <text className="iux-bundle__label" x={lp.x} y={lp.y} textAnchor={anchor} dominantBaseline="central">{p.node.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
