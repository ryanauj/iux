// ABOUTME: SVG radial tree layout with three edge styles: straight lines ('straight'), midpoint-quadratic curves ('curved'), and a compact mode with a guiding outer ring ('compact').

import { useMemo } from 'react'
import './RadialTree.css'

// ABOUTME: Controls edge rendering: 'straight' draws direct lines, 'curved' draws quadratic arcs through a midpoint, 'compact' uses straight lines and adds an outer ring guide for dense label reading.
export type RadialTreeVariant = 'straight' | 'curved' | 'compact'

// ABOUTME: Semantic intent applied per node; leaf color inherits from the top-level child's intent, cycling through the standard palette when not set explicitly.
export type RadialTreeIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: One node in the tree: a stable 'id', 'label' shown at root and leaf positions, an optional intent color override, and optional 'children' array for inner nodes.
export interface RadialTreeNode {
  id: string
  label: string
  intent?: RadialTreeIntent
  children?: RadialTreeNode[]
}

// ABOUTME: Configures RadialTree: 'root' is the tree root node; 'variant' controls edge style; 'width'/'height' set SVG dimensions (square recommended); depth rings and leaf slots are computed automatically from the tree structure.
export interface RadialTreeProps {
  variant?: RadialTreeVariant
  root: RadialTreeNode
  width?: number
  height?: number
  className?: string
}

const INTENTS: RadialTreeIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

interface Positioned {
  node: RadialTreeNode
  depth: number
  /** Angle in radians around the center. */
  a: number
  intent: RadialTreeIntent
  children: Positioned[]
}

function layout(root: RadialTreeNode): { nodes: Positioned[]; leafCount: number; maxDepth: number } {
  let leaf = 0
  let maxDepth = 0
  const flat: Positioned[] = []
  function visit(n: RadialTreeNode, depth: number, intentByTop?: RadialTreeIntent, topIdx = 0): Positioned {
    if (depth > maxDepth) maxDepth = depth
    const children: Positioned[] = (n.children ?? []).map((c, i) =>
      visit(c, depth + 1, depth === 0 ? (c.intent ?? INTENTS[i % INTENTS.length]) : intentByTop, depth === 0 ? i : topIdx)
    )
    let a: number
    if (children.length === 0) {
      a = leaf
      leaf += 1
    } else {
      a = (children[0].a + children[children.length - 1].a) / 2
    }
    const intent: RadialTreeIntent = n.intent ?? intentByTop ?? INTENTS[topIdx % INTENTS.length]
    const placed: Positioned = { node: n, depth, a, intent, children }
    flat.push(placed)
    return placed
  }
  visit(root, 0, undefined, 0)
  return { nodes: flat, leafCount: Math.max(1, leaf), maxDepth: Math.max(1, maxDepth) }
}

// ABOUTME: Renders an SVG radial tree: assigns polar coordinates by counting leaves (one angular slot each), evenly distributes depth rings between center and edge, colors nodes by their top-level ancestor's intent, shows labels only at root and leaf nodes, and draws edges as straight lines or midpoint-quadratic curves depending on 'variant'.
/**
 * Layout is computed in a single DFS pass that assigns angular positions based
 * on leaf count so siblings are spread evenly around the circle. Node
 * coordinates start at −π/2 (12 o'clock) and rotate clockwise. Leaf labels
 * are rotated and anchored so they always read left-to-right regardless of
 * their position on the circle.
 */
export function RadialTree({
  variant = 'straight',
  root,
  width = 420,
  height = 420,
  className,
}: RadialTreeProps) {
  const { rendered, byId, cx, cy, rMax, isCurved } = useMemo(() => {
    const t = layout(root)
    const cx = width / 2
    const cy = height / 2
    const isCompact = variant === 'compact'
    const rMax = Math.min(width, height) / 2 - (isCompact ? 22 : 30)
    const ringR = rMax / t.maxDepth
    const angOf = (slot: number) => (slot / t.leafCount) * Math.PI * 2 - Math.PI / 2
    const rendered = t.nodes.map(p => {
      const a = angOf(p.a + 0.5)
      const r = p.depth * ringR
      return { p, a, r, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
    })
    const byId = new Map<string, { x: number; y: number; a: number; r: number }>()
    for (const it of rendered) byId.set(it.p.node.id, { x: it.x, y: it.y, a: it.a, r: it.r })
    return { rendered, byId, cx, cy, rMax, isCurved: variant === 'curved' }
  }, [root, variant, width, height])

  const dotR = variant === 'compact' ? 3 : 4.5

  return (
    <div className={['iux-radialtree', `iux-radialtree--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-radialtree__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Radial tree">
        {/* Edges */}
        {rendered.map(it => it.p.children.map(c => {
          const cp = byId.get(c.node.id)!
          let d: string
          if (isCurved) {
            // Quadratic curve toward an inner control point — soft radial sweep.
            const mr = (it.r + cp.r) / 2
            const ma = (it.a + cp.a) / 2
            const mx = cx + Math.cos(ma) * mr
            const my = cy + Math.sin(ma) * mr
            d = `M ${it.x} ${it.y} Q ${mx} ${my} ${cp.x} ${cp.y}`
          } else {
            d = `M ${it.x} ${it.y} L ${cp.x} ${cp.y}`
          }
          return <path key={`${it.p.node.id}-${c.node.id}`} className="iux-radialtree__edge" d={d} fill="none" vectorEffect="non-scaling-stroke" />
        }))}
        {/* Nodes */}
        {rendered.map(it => {
          const isRoot = it.p.depth === 0
          const isLeaf = it.p.children.length === 0
          const labelR = it.r + (isLeaf ? 8 : 0)
          const lx = cx + Math.cos(it.a) * labelR
          const ly = cy + Math.sin(it.a) * labelR
          let angleDeg = (it.a * 180) / Math.PI
          let anchor: 'start' | 'middle' | 'end' = 'middle'
          if (isLeaf) {
            const flip = angleDeg > 90 || angleDeg < -90
            if (flip) {
              angleDeg += 180
              anchor = 'end'
            } else {
              anchor = 'start'
            }
          }
          return (
            <g key={it.p.node.id} className={`iux-radialtree__node iux-radialtree__node--${it.p.intent}`}>
              <circle cx={it.x} cy={it.y} r={isRoot ? dotR + 2 : dotR} />
              {(isLeaf || isRoot) && (
                <text
                  className="iux-radialtree__label"
                  x={lx}
                  y={ly}
                  textAnchor={isRoot ? 'middle' : anchor}
                  dominantBaseline="central"
                  transform={isLeaf ? `rotate(${angleDeg} ${lx} ${ly})` : undefined}
                >
                  {it.p.node.label}
                </text>
              )}
            </g>
          )
        })}
        {/* Outer ring guide for compact reading */}
        {variant === 'compact' && (
          <circle className="iux-radialtree__ring" cx={cx} cy={cy} r={rMax} fill="none" />
        )}
      </svg>
    </div>
  )
}
