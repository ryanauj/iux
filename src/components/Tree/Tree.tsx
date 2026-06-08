// ABOUTME: SVG tree diagram that lays out a TreeNode hierarchy using a Reingold-Tilford-style leaf-centering algorithm and renders right-angle edge paths; supports vertical (top-down), horizontal (left-right), and compact (tighter padding) variants.

import { useMemo } from 'react'
import './Tree.css'

// ABOUTME: Layout axis — vertical draws the tree top-down; horizontal draws it left-right; compact uses smaller padding constants while keeping the same layout algorithm.
export type TreeVariant = 'vertical' | 'horizontal' | 'compact'

// ABOUTME: Semantic colour intent applied to a node's circle; inherits cycling through the INTENTS palette by depth when not explicitly set on the node.
export type TreeIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A single node in the tree hierarchy: a unique id, display label, optional intent override, and optional children array; leaf nodes have no children.
export interface TreeNode {
  id: string
  label: string
  intent?: TreeIntent
  children?: TreeNode[]
}

// ABOUTME: Props for Tree — the root node of the hierarchy, optional pixel dimensions, layout variant, and an optional className.
export interface TreeProps {
  variant?: TreeVariant
  root: TreeNode
  width?: number
  height?: number
  className?: string
}

// ABOUTME: Ordered palette of intent tokens cycled by node depth when no explicit intent is set on a TreeNode.
const INTENTS: TreeIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Internal layout record produced by layoutTree: mirrors TreeNode but adds the computed leaf-slot x position, depth level, resolved intent colour, and recursively linked positioned children.
interface PositionedNode {
  node: TreeNode
  depth: number
  /** First-pass x in "leaf slot" units; resolved to pixels later. */
  x: number
  /** Resolved children positions (linked back). */
  children: PositionedNode[]
  intent: TreeIntent
}

// ABOUTME: Walks the TreeNode hierarchy recursively, assigning incrementing leaf-slot x positions to leaf nodes and centering parent nodes between their children's x extents; returns the flat node list, total leaf slot count, and tree depth.
/** Reingold-Tilford-ish simple layout: leaves get incrementing x, parents
 * are centered between their children. */
function layoutTree(root: TreeNode, intentByDepth: TreeIntent[]): { nodes: PositionedNode[]; leafSlots: number; maxDepth: number } {
  let leaf = 0
  let maxDepth = 0
  const flat: PositionedNode[] = []

  function visit(n: TreeNode, depth: number): PositionedNode {
    if (depth > maxDepth) maxDepth = depth
    const children = (n.children ?? []).map(c => visit(c, depth + 1))
    let x: number
    if (children.length === 0) {
      x = leaf
      leaf += 1
    } else {
      x = (children[0].x + children[children.length - 1].x) / 2
    }
    const intent: TreeIntent = n.intent ?? intentByDepth[Math.min(depth, intentByDepth.length - 1)]
    const placed: PositionedNode = { node: n, depth, x, children, intent }
    flat.push(placed)
    return placed
  }

  visit(root, 0)
  return { nodes: flat, leafSlots: Math.max(1, leaf), maxDepth }
}

// ABOUTME: Runs the layoutTree algorithm in a useMemo, maps leaf-slot and depth units to pixel coordinates, then renders SVG right-angle path edges followed by intent-coloured circle + label groups for each node.
/**
 * The horizontal variant swaps x/y roles (depth drives the x axis, leaf-slot
 * drives y). A node-id-keyed Map is built to look up parent pixel positions
 * efficiently when drawing edges. Text anchoring and dominant-baseline are
 * adjusted per variant so labels appear beside nodes in horizontal mode and
 * below nodes in vertical/compact mode.
 */
export function Tree({
  variant = 'vertical',
  root,
  width = 560,
  height = 360,
  className,
}: TreeProps) {
  const layout = useMemo(() => {
    const t = layoutTree(root, INTENTS)
    const padX = variant === 'compact' ? 16 : 24
    const padY = variant === 'compact' ? 16 : 24
    const usableW = width - padX * 2
    const usableH = height - padY * 2
    // Map leaf slots [0..leafSlots-1] to [0..usable]; treat as bands.
    const slotPx = t.leafSlots === 1 ? 0 : usableW / (t.leafSlots - 1)
    const depthPx = t.maxDepth === 0 ? 0 : usableH / t.maxDepth

    const horiz = variant === 'horizontal'
    const slotPxH = t.leafSlots === 1 ? 0 : usableH / (t.leafSlots - 1)
    const depthPxH = t.maxDepth === 0 ? 0 : usableW / t.maxDepth

    const placed = t.nodes.map(p => {
      const x = horiz ? padX + p.depth * depthPxH : padX + p.x * slotPx
      const y = horiz ? padY + p.x * slotPxH : padY + p.depth * depthPx
      return { p, x, y }
    })
    return { placed, horiz, t }
  }, [root, width, height, variant])

  const map = useMemo(() => {
    const m = new Map<string, { x: number; y: number; intent: TreeIntent; depth: number }>()
    for (const it of layout.placed) m.set(it.p.node.id, { x: it.x, y: it.y, intent: it.p.intent, depth: it.p.depth })
    return m
  }, [layout])

  const r = variant === 'compact' ? 4.5 : 6

  return (
    <div className={['iux-tree', `iux-tree--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-tree__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Tree diagram">
        {layout.placed.map(it => it.p.children.map((c, i) => {
          const cp = map.get(c.node.id)!
          const pp = { x: it.x, y: it.y }
          // Right-angle link routing.
          let d: string
          if (layout.horiz) {
            const mx = (pp.x + cp.x) / 2
            d = `M ${pp.x} ${pp.y} L ${mx} ${pp.y} L ${mx} ${cp.y} L ${cp.x} ${cp.y}`
          } else {
            const my = (pp.y + cp.y) / 2
            d = `M ${pp.x} ${pp.y} L ${pp.x} ${my} L ${cp.x} ${my} L ${cp.x} ${cp.y}`
          }
          return <path key={`${it.p.node.id}-${c.node.id}-${i}`} className="iux-tree__edge" d={d} fill="none" vectorEffect="non-scaling-stroke" />
        }))}
        {layout.placed.map(it => (
          <g key={it.p.node.id} className={`iux-tree__node iux-tree__node--${it.p.intent}`}>
            <circle cx={it.x} cy={it.y} r={r} />
            <text
              className="iux-tree__label"
              x={layout.horiz ? it.x + r + 4 : it.x}
              y={layout.horiz ? it.y : it.y + r + 4}
              textAnchor={layout.horiz ? 'start' : 'middle'}
              dominantBaseline={layout.horiz ? 'central' : 'hanging'}
            >
              {it.p.node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
