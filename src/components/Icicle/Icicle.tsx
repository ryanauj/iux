// ABOUTME: SVG icicle/flame chart that recursively partitions a weighted tree into rectangular blocks, supporting top-down icicle, left-to-right, and bottom-up flame layouts.

import { useMemo } from 'react'
import './Icicle.css'

// ABOUTME: Sets the growth direction of the chart: 'down' fills from the root at the top, 'right' fans left-to-right, 'flame' flips so leaves are at the bottom.
export type IcicleVariant = 'down' | 'right' | 'flame'

// ABOUTME: Semantic colour intent cycling applied to top-level children; each subtree inherits its root child's colour.
export type IcicleIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A recursive tree node; leaf size is driven by `value`, branch size is the sum of its children's values; `intent` overrides the inherited colour, `children` nests subtrees.
export interface IcicleNode {
  id: string
  label: string
  value?: number
  intent?: IcicleIntent
  children?: IcicleNode[]
}

// ABOUTME: Props for Icicle — accepts the tree root, layout variant, and optional canvas dimensions.
export interface IcicleProps {
  variant?: IcicleVariant
  root: IcicleNode
  width?: number
  height?: number
  className?: string
}

const INTENTS: IcicleIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

interface Block {
  node: IcicleNode
  depth: number
  x: number
  y: number
  w: number
  h: number
  intent: IcicleIntent
  tintLevel: number
}

function sumValue(n: IcicleNode): number {
  if (n.children && n.children.length > 0) return n.children.reduce((s, c) => s + sumValue(c), 0)
  return Math.max(0, n.value ?? 0)
}

function maxDepth(n: IcicleNode): number {
  if (!n.children || n.children.length === 0) return 0
  return 1 + Math.max(...n.children.map(maxDepth))
}

// ABOUTME: Recursively partitions the tree into a flat list of screen-space blocks (via `visit`), then renders each as a `<rect>` labelled when wide/tall enough; the root block is always omitted so the chart shows only children.
/**
 * Layout walks the tree depth-first, allocating each node a band across the
 * cross-axis proportional to its value fraction of its parent. Depth drives
 * the layer along the main axis. The 'flame' variant mirrors the layer
 * direction so depth 0 sits at the bottom. Intent cycles over the
 * `INTENTS` palette for direct children of the root; all deeper descendants
 * inherit their subtree root's intent. A depth-based `tintLevel` CSS class
 * (`lv-1` … `lv-4`) provides progressive lightening.
 */
export function Icicle({
  variant = 'down',
  root,
  width = 560,
  height = 280,
  className,
}: IcicleProps) {
  const layout = useMemo(() => {
    const horizontal = variant === 'right'
    const flame = variant === 'flame'
    const depth = maxDepth(root) || 1
    const total = sumValue(root) || 1
    const blocks: Block[] = []

    const axisLen = horizontal ? width : height
    const crossLen = horizontal ? height : width
    const layerLen = axisLen / (depth + 1)

    function visit(n: IcicleNode, d: number, offset: number, span: number, parentIntent?: IcicleIntent, idxAmongSiblings = 0) {
      const intent: IcicleIntent = n.intent ?? parentIntent ?? INTENTS[idxAmongSiblings % INTENTS.length]
      const tintLevel = Math.min(4, d + 1)

      const layerStart = flame ? (axisLen - (d + 1) * layerLen) : d * layerLen
      const x = horizontal ? layerStart : offset
      const y = horizontal ? offset : layerStart
      const w = horizontal ? layerLen : span
      const h = horizontal ? span : layerLen
      blocks.push({ node: n, depth: d, x, y, w, h, intent, tintLevel })

      if (!n.children || n.children.length === 0) return
      const childTotal = n.children.reduce((s, c) => s + sumValue(c), 0) || 1
      let cursor = offset
      n.children.forEach((c, i) => {
        const cVal = sumValue(c) || 0
        const cSpan = (cVal / childTotal) * span
        const childIntent: IcicleIntent = d === 0
          ? (c.intent ?? INTENTS[i % INTENTS.length])
          : (c.intent ?? intent)
        visit(c, d + 1, cursor, cSpan, childIntent, i)
        cursor += cSpan
      })
    }

    visit(root, 0, 0, crossLen, undefined, 0)
    return { blocks, total }
  }, [root, variant, width, height])

  return (
    <div className={['iux-icicle', `iux-icicle--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-icicle__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Icicle diagram, ${layout.blocks.length} blocks`}>
        {layout.blocks.map((b, i) => {
          if (b.depth === 0) return null
          const labelFits = b.w > 36 && b.h > 16
          const value = sumValue(b.node)
          return (
            <g key={`${b.node.id}-${i}`} className={`iux-icicle__cell iux-icicle__cell--${b.intent} iux-icicle__cell--lv-${b.tintLevel}`}>
              <rect className="iux-icicle__rect" x={b.x + 1} y={b.y + 1} width={Math.max(0, b.w - 2)} height={Math.max(0, b.h - 2)} rx={2} ry={2}>
                <title>{`${b.node.label}: ${value} (depth ${b.depth})`}</title>
              </rect>
              {labelFits && (
                <text
                  className="iux-icicle__label"
                  x={b.x + 6}
                  y={b.y + b.h / 2}
                  textAnchor="start"
                  dominantBaseline="central"
                >
                  {b.node.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
