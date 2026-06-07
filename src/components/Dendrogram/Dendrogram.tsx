// ABOUTME: SVG dendrogram renderer displaying a hierarchy of nodes as a tree with three layout modes: horizontal cluster, radial, and linkage-distance-weighted.

import { useMemo } from 'react'
import './Dendrogram.css'

// ABOUTME: Layout mode: 'cluster' arranges leaves evenly on a horizontal axis with right-angle links, 'radial' fans them around a circle, 'weighted' positions internal nodes by their merge distance so link lengths encode similarity.
export type DendrogramVariant = 'cluster' | 'radial' | 'weighted'

// ABOUTME: Semantic colour applied to a node and its links; defaults to the intent palette cycling by depth level.
export type DendrogramIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A tree node with an id, display label, optional linkage distance for the 'weighted' variant, optional intent colour, and optional child array (leaf nodes have no children).
export interface DendrogramNode {
  id: string
  label: string
  /** Distance at which children were joined. Drives `weighted` layout. */
  distance?: number
  intent?: DendrogramIntent
  children?: DendrogramNode[]
}

// ABOUTME: Props for Dendrogram — variant chooses the layout algorithm, root supplies the full tree, and width/height size the SVG viewport.
export interface DendrogramProps {
  variant?: DendrogramVariant
  root: DendrogramNode
  width?: number
  height?: number
  className?: string
}

const INTENTS: DendrogramIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

interface Placed { node: DendrogramNode; depth: number; slot: number; distance: number; children: Placed[]; intent: DendrogramIntent }

function layout(root: DendrogramNode, intents: DendrogramIntent[]): { all: Placed[]; leafSlots: number; maxDepth: number; maxDistance: number } {
  let leaf = 0
  let maxDepth = 0
  let maxDistance = 0
  const all: Placed[] = []

  function visit(n: DendrogramNode, depth: number): Placed {
    if (depth > maxDepth) maxDepth = depth
    const dist = n.distance ?? 0
    if (dist > maxDistance) maxDistance = dist
    const children = (n.children ?? []).map(c => visit(c, depth + 1))
    let slot: number
    if (children.length === 0) {
      slot = leaf
      leaf += 1
    } else {
      slot = (children[0].slot + children[children.length - 1].slot) / 2
    }
    const intent: DendrogramIntent = n.intent ?? intents[Math.min(depth, intents.length - 1)]
    const p: Placed = { node: n, depth, slot, distance: dist, children, intent }
    all.push(p)
    return p
  }

  visit(root, 0)
  return { all, leafSlots: Math.max(1, leaf), maxDepth, maxDistance: maxDistance || 1 }
}

// ABOUTME: Renders a dendrogram SVG from a DendrogramNode tree; places leaves evenly (cluster), radially, or by merge distance (weighted), connecting them with right-angle or arc links and intent-coloured dots.
/**
 * Internally runs a recursive `layout` pass to assign each node a depth and
 * a fractional slot (leaves 0…n, internals = mean of children). Pixel positions
 * are computed in a `useMemo` that applies the chosen variant's geometry: for
 * 'cluster' and 'weighted' depth maps to x and slots to y; for 'radial' they
 * map to radius and angle. Links between parent and child are right-angle
 * "ㅁ" paths for horizontal variants, or arc-then-radial paths for radial mode.
 */
export function Dendrogram({
  variant = 'cluster',
  root,
  width = 560,
  height = 360,
  className,
}: DendrogramProps) {
  const lay = useMemo(() => layout(root, INTENTS), [root])

  const placed = useMemo(() => {
    const pad = 24
    const usableW = width - pad * 2
    const usableH = height - pad * 2

    const positions = new Map<string, { x: number; y: number }>()
    if (variant === 'radial') {
      const cx = width / 2
      const cy = height / 2
      const rMax = Math.min(usableW, usableH) / 2 - 20
      lay.all.forEach(p => {
        const a = (p.slot / Math.max(1, lay.leafSlots - 1)) * Math.PI * 2 - Math.PI / 2
        const r = (p.depth / Math.max(1, lay.maxDepth)) * rMax
        positions.set(p.node.id, { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r })
      })
    } else {
      // Horizontal: depth on x, slots on y. For `weighted`, x reflects
      // 1 - (distance / maxDistance) so deeper merges (smaller distance)
      // land farther right (toward leaves at x=usableW).
      const slotPx = lay.leafSlots === 1 ? 0 : usableH / (lay.leafSlots - 1)
      lay.all.forEach(p => {
        let x: number
        if (variant === 'weighted') {
          // Leaves: rightmost; root: leftmost.
          if (p.children.length === 0) {
            x = pad + usableW
          } else {
            x = pad + (1 - p.distance / lay.maxDistance) * usableW
          }
        } else {
          x = pad + (p.depth / Math.max(1, lay.maxDepth)) * usableW
        }
        const y = pad + p.slot * slotPx
        positions.set(p.node.id, { x, y })
      })
    }
    return positions
  }, [lay, variant, width, height])

  return (
    <div className={['iux-dendro', `iux-dendro--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-dendro__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Dendrogram">
        {lay.all.map(p => p.children.map(c => {
          const pp = placed.get(p.node.id)!
          const cp = placed.get(c.node.id)!
          if (variant === 'radial') {
            const cx = width / 2; const cy = height / 2
            // Path: from parent out radially to child's angle along an arc, then radially to child.
            const a1 = Math.atan2(cp.y - cy, cp.x - cx)
            const r1 = Math.hypot(pp.x - cx, pp.y - cy)
            const arcEnd = { x: cx + Math.cos(a1) * r1, y: cy + Math.sin(a1) * r1 }
            const a0 = Math.atan2(pp.y - cy, pp.x - cx)
            const sweep = a1 > a0 ? 1 : 0
            const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0
            const d = `M ${pp.x} ${pp.y} A ${r1} ${r1} 0 ${large} ${sweep} ${arcEnd.x} ${arcEnd.y} L ${cp.x} ${cp.y}`
            return <path key={`${p.node.id}-${c.node.id}`} className="iux-dendro__link" d={d} fill="none" vectorEffect="non-scaling-stroke" />
          }
          // Right-angle "ㅁ" link: horizontal from parent to child x at parent y, then vertical down.
          const d = `M ${pp.x} ${pp.y} L ${pp.x} ${cp.y} L ${cp.x} ${cp.y}`
          return <path key={`${p.node.id}-${c.node.id}`} className="iux-dendro__link" d={d} fill="none" vectorEffect="non-scaling-stroke" />
        }))}
        {lay.all.map(p => {
          const pp = placed.get(p.node.id)!
          const isLeaf = p.children.length === 0
          return (
            <g key={p.node.id} className={`iux-dendro__node iux-dendro__node--${p.intent}${isLeaf ? ' iux-dendro__node--leaf' : ''}`}>
              <circle cx={pp.x} cy={pp.y} r={isLeaf ? 5 : 3.5} />
              {isLeaf && (
                <text
                  className="iux-dendro__label"
                  x={variant === 'radial' ? pp.x : pp.x + 8}
                  y={variant === 'radial' ? pp.y - 8 : pp.y}
                  textAnchor={variant === 'radial' ? 'middle' : 'start'}
                  dominantBaseline={variant === 'radial' ? 'auto' : 'central'}
                >
                  {p.node.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
