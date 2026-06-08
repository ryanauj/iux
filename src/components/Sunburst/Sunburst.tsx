// ABOUTME: SVG sunburst chart that recursively partitions a tree of SunburstNode values into concentric arc rings; supports flat (first ring only), nested (full depth with lightness tinting), and labeled (arc-following text) variants.

import { useMemo } from 'react'
import './Sunburst.css'

// ABOUTME: Rendering mode: flat renders only the first ring of children; nested renders all depth levels with lightness tinting per depth; labeled adds arc-aligned text labels on each slice.
export type SunburstVariant = 'flat' | 'nested' | 'labeled'

// ABOUTME: Semantic color intent applied to each arc slice, inheriting from parent when not explicitly set on the node.
export type SunburstIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A tree node for the sunburst chart: leaf nodes carry a numeric value; branch nodes derive their value from the sum of their children; intent overrides the inherited color.
export interface SunburstNode {
  id: string
  label: string
  value?: number
  intent?: SunburstIntent
  children?: SunburstNode[]
}

// ABOUTME: Props for Sunburst — passes the root node of the tree, optional pixel dimensions, variant mode, and an optional className.
export interface SunburstProps {
  variant?: SunburstVariant
  root: SunburstNode
  width?: number
  height?: number
  className?: string
}

// ABOUTME: Ordered intent palette assigned to root-level children in cycle order; deeper nodes inherit their parent's intent unless explicitly overridden.
const INTENTS: SunburstIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Recursively sums the leaf values of a node tree; branch nodes have no own value, only the sum of their children.
function sumValue(n: SunburstNode): number {
  if (n.children && n.children.length > 0) return n.children.reduce((s, c) => s + sumValue(c), 0)
  return Math.max(0, n.value ?? 0)
}

// ABOUTME: Flat arc descriptor produced after the recursive tree walk: the source node, its ring depth, start/end angles in radians, and resolved intent color.
interface Slice {
  node: SunburstNode
  depth: number
  a0: number
  a1: number
  intent: SunburstIntent
}

// ABOUTME: Converts polar coordinates (center cx/cy, radius r, angle a in radians) to a Cartesian {x, y} point on the SVG canvas.
function polar(cx: number, cy: number, r: number, a: number) {
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
}

// ABOUTME: Builds a closed SVG arc-ring path for a slice spanning angles [a0, a1] between inner radius rIn and outer radius rOut; uses a two-circle shortcut for full rings to avoid SVG arc degenerate cases.
function ringPath(cx: number, cy: number, rIn: number, rOut: number, a0: number, a1: number): string {
  const span = a1 - a0
  if (span <= 0) return ''
  // Full ring shortcut.
  if (span >= Math.PI * 2 - 0.001) {
    return (
      `M ${cx + rOut} ${cy} A ${rOut} ${rOut} 0 1 1 ${cx - rOut} ${cy} A ${rOut} ${rOut} 0 1 1 ${cx + rOut} ${cy} ` +
      `M ${cx + rIn} ${cy} A ${rIn} ${rIn} 0 1 0 ${cx - rIn} ${cy} A ${rIn} ${rIn} 0 1 0 ${cx + rIn} ${cy} Z`
    )
  }
  const p0 = polar(cx, cy, rOut, a0)
  const p1 = polar(cx, cy, rOut, a1)
  const p2 = polar(cx, cy, rIn, a1)
  const p3 = polar(cx, cy, rIn, a0)
  const large = span > Math.PI ? 1 : 0
  return `M ${p0.x} ${p0.y} A ${rOut} ${rOut} 0 ${large} 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${rIn} ${rIn} 0 ${large} 0 ${p3.x} ${p3.y} Z`
}

// ABOUTME: Renders a proportional ring-chart SVG by recursively walking the node tree, computing arc angles from proportional values, and emitting SVG path elements via ringPath(); the labeled variant overlays rotated text at each arc midpoint.
/**
 * Traverses the root tree depth-first to accumulate a flat list of arc slices,
 * then maps depth to ring band width. In `flat` mode only depth-1 slices are
 * drawn. `nested` adds a depth-based tint class to show hierarchy. `labeled`
 * renders rotated `<text>` elements at arc mid-radii, flipping text that would
 * appear upside-down.
 */
export function Sunburst({
  variant = 'flat',
  root,
  width = 360,
  height = 360,
  className,
}: SunburstProps) {
  const slices = useMemo(() => {
    const out: Slice[] = []
    const total = sumValue(root) || 1
    function visit(n: SunburstNode, depth: number, a0: number, a1: number, parentIntent?: SunburstIntent) {
      const intent: SunburstIntent = n.intent ?? parentIntent ?? INTENTS[0]
      if (depth > 0) {
        out.push({ node: n, depth, a0, a1, intent })
      }
      const span = a1 - a0
      if (!n.children || n.children.length === 0) return
      const childTotal = n.children.reduce((s, c) => s + sumValue(c), 0) || 1
      let cursor = a0
      for (let i = 0; i < n.children.length; i++) {
        const c = n.children[i]
        const cVal = sumValue(c)
        const cSpan = (cVal / childTotal) * span
        const childIntent: SunburstIntent = depth === 0
          ? (c.intent ?? INTENTS[i % INTENTS.length])
          : (c.intent ?? intent)
        visit(c, depth + 1, cursor, cursor + cSpan, childIntent)
        cursor += cSpan
      }
    }
    visit(root, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2, undefined)
    return { slices: out, total }
  }, [root])

  const cx = width / 2
  const cy = height / 2
  const rMax = Math.min(width, height) / 2 - 12
  const maxDepth = useMemo(() => slices.slices.reduce((m, s) => Math.max(m, s.depth), 1), [slices])
  const ringW = rMax / Math.max(1, maxDepth)

  return (
    <div className={['iux-sun', `iux-sun--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-sun__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Sunburst, depth ${maxDepth}`}>
        {/* In flat mode, only render the innermost layer. */}
        {slices.slices.map((s, i) => {
          if (variant === 'flat' && s.depth !== 1) return null
          const rIn = (s.depth - 1) * ringW
          const rOut = s.depth * ringW
          const tintLevel = Math.min(4, 1 + maxDepth - s.depth)
          const lvlClass = variant === 'nested' || variant === 'labeled' ? ` iux-sun__slice--lv-${tintLevel}` : ''
          return (
            <path
              key={`s-${i}`}
              className={`iux-sun__slice iux-sun__slice--${s.intent}${lvlClass}`}
              d={ringPath(cx, cy, rIn, rOut, s.a0, s.a1)}
            >
              <title>{`${s.node.label}: ${sumValue(s.node)}`}</title>
            </path>
          )
        })}
        {variant === 'labeled' && slices.slices.map((s, i) => {
          const span = s.a1 - s.a0
          // Skip labels for slices that are too narrow to read.
          if (span < 0.18) return null
          const rMid = ((s.depth - 0.5) * ringW)
          const aMid = (s.a0 + s.a1) / 2
          const p = polar(cx, cy, rMid, aMid)
          // Rotate the label to follow the arc; flip when on the bottom half so it reads upright.
          let angleDeg = (aMid * 180) / Math.PI
          if (angleDeg > 90 || angleDeg < -90) angleDeg += 180
          return (
            <text
              key={`l-${i}`}
              className="iux-sun__label"
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${angleDeg} ${p.x} ${p.y})`}
            >
              {s.node.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
