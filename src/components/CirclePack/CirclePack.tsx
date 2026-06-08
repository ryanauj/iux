// ABOUTME: SVG circle-packing visualization that recursively packs a tree of nodes into nested or flat circles using a front-chain layout algorithm, with flat, nested, and labeled display variants.

import { useMemo } from 'react'
import './CirclePack.css'

// ABOUTME: Display mode — 'flat' fills only leaf circles (parents shown as outlines), 'nested' fills every depth level, 'labeled' fills all levels and overlays text labels on circles larger than 14px radius.
export type CirclePackVariant = 'flat' | 'nested' | 'labeled'

// ABOUTME: Semantic color token applied to a node's circle fill, inherited by children unless overridden, drawn from the six contract intents.
export type CirclePackIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A tree node with a unique id, display label, optional numeric value (leaf size), optional explicit intent, and optional children for recursive nesting.
export interface CirclePackNode {
  id: string
  label: string
  value?: number
  intent?: CirclePackIntent
  children?: CirclePackNode[]
}

// ABOUTME: Props for CirclePack — supplies the root tree node, variant, and SVG dimensions; the entire hierarchy is packed from a single `root`.
export interface CirclePackProps {
  variant?: CirclePackVariant
  root: CirclePackNode
  width?: number
  height?: number
  className?: string
}

// ABOUTME: Rotation of the six contract intents used to assign distinct colors to root-level nodes when no explicit intent is provided; propagated down to children as the parent intent.
const INTENTS: CirclePackIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: A fully resolved circle placement — the original tree node, its nesting depth, center coordinates, radius, and resolved intent color, output by `packTree` for direct rendering.
interface Placed { node: CirclePackNode; depth: number; x: number; y: number; r: number; intent: CirclePackIntent }

// ABOUTME: Recursively sums the `value` fields of all leaf descendants of `n`, returning the subtree's total weight; used to size parent circles proportionally in `packChildren`.
function sumValue(n: CirclePackNode): number {
  if (n.children && n.children.length > 0) return n.children.reduce((s, c) => s + sumValue(c), 0)
  return Math.max(0.0001, n.value ?? 1)
}

// ABOUTME: Places `children` inside a bounding circle of radius `R` using a deterministic front-chain algorithm: scales each child's radius so the summed area fills 75% of the parent, places the first two on the x-axis, then iterates — placing each new circle tangent to the best adjacent pair in the convex-envelope chain.
/** Pack children inside a bounding circle using a deterministic front-chain
 * algorithm (Wang et al., simplified). */
function packChildren(children: { value: number }[], R: number): { x: number; y: number; r: number }[] {
  if (children.length === 0) return []
  const total = children.reduce((s, c) => s + c.value, 0) || 1
  // Area scaling. Sum of πr² must equal a fraction of πR² so the children fit.
  // We pick a packing fraction of ~0.75 to leave breathing room.
  const fill = 0.75
  const scale = (fill * R * R) / total
  const radii = children.map(c => Math.sqrt(c.value * scale))

  if (children.length === 1) {
    return [{ x: 0, y: 0, r: radii[0] }]
  }

  // Place first two side by side on the x-axis.
  const placed: { x: number; y: number; r: number }[] = []
  placed.push({ x: -radii[0], y: 0, r: radii[0] })
  placed.push({ x: radii[1], y: 0, r: radii[1] })
  if (children.length === 2) {
    // Center the pair.
    const mid = (placed[0].x + placed[1].x) / 2
    placed[0].x -= mid
    placed[1].x -= mid
    return placed
  }
  // Front chain — a circular linked list of nodes that form the current
  // convex envelope. We just keep an array and recompute "best" each step.
  let chain: number[] = [0, 1]

  function placeTangentTo(a: { x: number; y: number; r: number }, b: { x: number; y: number; r: number }, r: number): [{ x: number; y: number }, { x: number; y: number }] {
    // Find points tangent to both a (r=a.r+r) and b (r=b.r+r).
    const dx = b.x - a.x
    const dy = b.y - a.y
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d === 0) return [{ x: a.x, y: a.y + a.r + r }, { x: a.x, y: a.y - a.r - r }]
    const ra = a.r + r
    const rb = b.r + r
    const a2 = (ra * ra - rb * rb + d * d) / (2 * d)
    const h2 = ra * ra - a2 * a2
    if (h2 < 0) return [{ x: a.x + (dx / d) * ra, y: a.y + (dy / d) * ra }, { x: a.x - (dx / d) * ra, y: a.y - (dy / d) * ra }]
    const h = Math.sqrt(h2)
    const cx = a.x + (dx / d) * a2
    const cy = a.y + (dy / d) * a2
    const nx = -dy / d
    const ny = dx / d
    return [{ x: cx + nx * h, y: cy + ny * h }, { x: cx - nx * h, y: cy - ny * h }]
  }

  for (let i = 2; i < children.length; i++) {
    const r = radii[i]
    // Try every adjacent pair in chain; pick the one whose candidate position is
    // closest to the origin and doesn't overlap any other placed circle.
    let best: { x: number; y: number; insertAfter: number } | null = null
    for (let j = 0; j < chain.length; j++) {
      const a = placed[chain[j]]
      const b = placed[chain[(j + 1) % chain.length]]
      const cands = placeTangentTo(a, b, r)
      for (const c of cands) {
        let overlap = false
        for (let k = 0; k < placed.length; k++) {
          const p = placed[k]
          const dx = p.x - c.x; const dy = p.y - c.y
          if (Math.sqrt(dx * dx + dy * dy) < p.r + r - 0.001) { overlap = true; break }
        }
        if (overlap) continue
        const dist = Math.sqrt(c.x * c.x + c.y * c.y)
        if (!best || dist < (best.x * best.x + best.y * best.y) ** 0.5) {
          best = { x: c.x, y: c.y, insertAfter: j }
        }
      }
    }
    if (!best) {
      // Fall back: place on the right of the last node.
      const last = placed[placed.length - 1]
      best = { x: last.x + last.r + r, y: 0, insertAfter: chain.length - 1 }
    }
    placed.push({ x: best.x, y: best.y, r })
    const idx = placed.length - 1
    chain.splice(best.insertAfter + 1, 0, idx)
  }

  // Center & scale so everything fits in R.
  let cxSum = 0, cySum = 0, w = 0
  for (const p of placed) { cxSum += p.x * p.r; cySum += p.y * p.r; w += p.r }
  const mx = cxSum / w
  const my = cySum / w
  let maxR = 0
  for (const p of placed) {
    const d = Math.sqrt((p.x - mx) * (p.x - mx) + (p.y - my) * (p.y - my)) + p.r
    if (d > maxR) maxR = d
  }
  const k = R / Math.max(0.0001, maxR)
  return placed.map(p => ({ x: (p.x - mx) * k, y: (p.y - my) * k, r: p.r * k }))
}

// ABOUTME: Recursively visits every node in the tree, calling `packChildren` for each branch to place children within their parent's circle, and collects all placed nodes as a flat `Placed[]` array for rendering.
function packTree(root: CirclePackNode, cx: number, cy: number, R: number): Placed[] {
  const out: Placed[] = []
  function visit(n: CirclePackNode, depth: number, x: number, y: number, r: number, parentIntent?: CirclePackIntent, siblingIndex = 0) {
    const intent: CirclePackIntent = n.intent ?? parentIntent ?? INTENTS[siblingIndex % INTENTS.length]
    out.push({ node: n, depth, x, y, r, intent })
    if (!n.children || n.children.length === 0) return
    const childRadius = r * 0.92
    const childValues = n.children.map(c => ({ value: sumValue(c) }))
    const packed = packChildren(childValues, childRadius)
    n.children.forEach((c, i) => {
      visit(c, depth + 1, x + packed[i].x, y + packed[i].y, packed[i].r, intent, i)
    })
  }
  visit(root, 0, cx, cy, R)
  return out
}

// ABOUTME: Runs `packTree` to produce a flat `Placed[]` array of (x, y, r, intent, depth) via `packChildren`'s front-chain algorithm, then maps each entry to an SVG `<circle>`, coloring by intent and depth-relative tint level; 'labeled' adds centered `<text>` for circles with r > 14.
/**
 * `packChildren` scales children radii so their summed area equals 75% of the
 * parent circle's area, then places them using a front-chain algorithm: the
 * first two are placed on the x-axis; subsequent circles are tangent to the
 * best (lowest-distance-to-origin, non-overlapping) adjacent chain pair. The
 * result is centered and scaled to fit in the parent radius. `packTree`
 * recurses this for every branch node, passing the parent's intent down as the
 * default for children.
 */
export function CirclePack({
  variant = 'flat',
  root,
  width = 360,
  height = 360,
  className,
}: CirclePackProps) {
  const layout = useMemo(() => {
    const cx = width / 2
    const cy = height / 2
    const R = Math.min(width, height) / 2 - 6
    return packTree(root, cx, cy, R)
  }, [root, width, height])

  const maxDepth = useMemo(() => layout.reduce((m, p) => Math.max(m, p.depth), 0), [layout])

  return (
    <div className={['iux-pack', `iux-pack--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-pack__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Circle pack">
        {layout.map(p => {
          // The root is rendered as a faint outline only.
          if (p.depth === 0) {
            return (
              <circle key="root" className="iux-pack__root" cx={p.x} cy={p.y} r={p.r} fill="none" />
            )
          }
          // In `flat`, only show leaves; in `nested`/`labeled`, show every level.
          const isLeaf = !p.node.children || p.node.children.length === 0
          if (variant === 'flat' && !isLeaf) {
            return (
              <circle
                key={`o-${p.node.id}`}
                className={`iux-pack__outline iux-pack__outline--${p.intent}`}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill="none"
              />
            )
          }
          const lvl = Math.min(4, maxDepth - p.depth + 1)
          return (
            <g key={p.node.id} className={`iux-pack__node iux-pack__node--${p.intent} iux-pack__node--lv-${lvl}`}>
              <circle cx={p.x} cy={p.y} r={p.r} />
              {variant === 'labeled' && p.r > 14 && (
                <text className="iux-pack__label" x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central">
                  {p.node.label}
                </text>
              )}
              <title>{`${p.node.label}: ${sumValue(p.node).toFixed(1)}`}</title>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
