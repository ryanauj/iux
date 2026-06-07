// ABOUTME: SVG treemap chart using a squarified layout algorithm; supports flat (single-level rectangles), grouped (recursive child rectangles inset inside parents), and labeled (adds a formatted value line below each cell label) variants.

import { useMemo } from 'react'
import './Treemap.css'

// ABOUTME: Layout tier — flat draws only the top-level nodes; grouped recurses into children, inset inside their parent rect; labeled adds a second text line showing the formatted value below the node label.
export type TreemapVariant = 'flat' | 'grouped' | 'labeled'

// ABOUTME: Colour intent applied to a treemap cell; inherited from parent when absent; cycles through INTENTS by sibling index when not specified.
export type TreemapIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A node in the treemap data tree: unique key, display label, numeric value (used directly for leaves; branch nodes derive their size from child sums), optional intent, and optional children for grouped/labeled variants.
export interface TreemapNode {
  key: string
  label: string
  value: number
  intent?: TreemapIntent
  children?: TreemapNode[]
}

// ABOUTME: Props for Treemap — the flat top-level node array, optional pixel dimensions, variant, an optional formatValue formatter for the labeled variant's value lines, and className.
export interface TreemapProps {
  variant?: TreemapVariant
  data: TreemapNode[]
  width?: number
  height?: number
  formatValue?: (n: number) => string
  className?: string
}

const INTENTS: TreemapIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

interface Rect { x: number; y: number; w: number; h: number }
interface LaidOutNode extends TreemapNode { rect: Rect; depth: number; resolvedIntent: TreemapIntent }

function nodeValue(n: TreemapNode): number {
  if (n.children && n.children.length > 0) return n.children.reduce((s, c) => s + nodeValue(c), 0)
  return Math.max(0, n.value)
}

/** Squarified treemap (Bruls/Huijing/van Wijk, simplified). */
function squarify(nodes: TreemapNode[], rect: Rect): { node: TreemapNode; rect: Rect }[] {
  const total = nodes.reduce((s, n) => s + nodeValue(n), 0) || 1
  const area = rect.w * rect.h
  const scale = area / total
  const items = nodes.map(n => ({ node: n, area: nodeValue(n) * scale })).filter(i => i.area > 0)
  items.sort((a, b) => b.area - a.area)
  const out: { node: TreemapNode; rect: Rect }[] = []
  let remaining: Rect = { ...rect }

  let row: typeof items = []
  const worst = (areas: number[], w: number): number => {
    const s = areas.reduce((a, b) => a + b, 0)
    const r = w * w
    let mn = Infinity, mx = -Infinity
    for (const a of areas) { if (a < mn) mn = a; if (a > mx) mx = a }
    if (s === 0) return Infinity
    return Math.max((r * mx) / (s * s), (s * s) / (r * mn))
  }

  let i = 0
  while (i < items.length) {
    const short = Math.min(remaining.w, remaining.h)
    const next = items[i]
    const currentRow = [...row, next]
    const currentAreas = currentRow.map(x => x.area)
    const rowAreas = row.map(x => x.area)
    if (row.length === 0 || worst(currentAreas, short) <= worst(rowAreas, short)) {
      row = currentRow
      i++
    } else {
      const placed = layoutRow(row, remaining)
      out.push(...placed.rects)
      remaining = placed.remaining
      row = []
    }
  }
  if (row.length > 0) {
    const placed = layoutRow(row, remaining)
    out.push(...placed.rects)
  }
  return out
}

function layoutRow(row: { node: TreemapNode; area: number }[], rect: Rect): { rects: { node: TreemapNode; rect: Rect }[]; remaining: Rect } {
  const sum = row.reduce((s, r) => s + r.area, 0)
  if (rect.w >= rect.h) {
    const w = sum / rect.h
    let y = rect.y
    const rects = row.map(r => {
      const h = r.area / w
      const out = { node: r.node, rect: { x: rect.x, y, w, h } }
      y += h
      return out
    })
    return { rects, remaining: { x: rect.x + w, y: rect.y, w: rect.w - w, h: rect.h } }
  } else {
    const h = sum / rect.w
    let x = rect.x
    const rects = row.map(r => {
      const w = r.area / h
      const out = { node: r.node, rect: { x, y: rect.y, w, h } }
      x += w
      return out
    })
    return { rects, remaining: { x: rect.x, y: rect.y + h, w: rect.w, h: rect.h - h } }
  }
}

function buildLayout(
  data: TreemapNode[],
  rect: Rect,
  depth: number,
  parentIntent: TreemapIntent | undefined,
  out: LaidOutNode[],
  recurse: boolean,
) {
  const placed = squarify(data, rect)
  placed.forEach((p, i) => {
    const resolvedIntent = p.node.intent ?? parentIntent ?? INTENTS[i % INTENTS.length]
    const node: LaidOutNode = { ...p.node, rect: p.rect, depth, resolvedIntent }
    out.push(node)
    if (recurse && p.node.children && p.node.children.length > 0 && p.rect.w > 16 && p.rect.h > 16) {
      const inset = { x: p.rect.x + 2, y: p.rect.y + 14, w: Math.max(0, p.rect.w - 4), h: Math.max(0, p.rect.h - 16) }
      buildLayout(p.node.children, inset, depth + 1, resolvedIntent, out, recurse)
    }
  })
}

// ABOUTME: Runs buildLayout (squarify + optional recursion) in a useMemo, then maps the resulting LaidOutNode list to SVG <g> elements each containing a <rect>, a label <text>, and a value <text> for large-enough cells.
/**
 * Each cell is sized by the squarified algorithm (Bruls/Huijing/van Wijk)
 * which iterates over nodes placing them into rows while minimising the
 * worst aspect ratio. In grouped/labeled mode, children are recursed with a
 * 2 px horizontal and 14 px top inset so the parent label remains visible.
 * The `<title>` element on each `<rect>` provides a screen-reader-accessible
 * label showing the node's name, formatted value, and percentage of total.
 */
export function Treemap({
  variant = 'flat',
  data,
  width = 520,
  height = 320,
  formatValue,
  className,
}: TreemapProps) {
  const fmt = formatValue ?? (n => n.toLocaleString())

  const laid = useMemo(() => {
    const out: LaidOutNode[] = []
    buildLayout(data, { x: 0, y: 0, w: width, h: height }, 0, undefined, out, variant !== 'flat')
    return out
  }, [data, width, height, variant])

  const total = data.reduce((s, n) => s + nodeValue(n), 0) || 1
  const showLabels = variant === 'labeled'

  return (
    <div className={['iux-treemap', `iux-treemap--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-treemap__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Treemap, ${data.length} top-level entries`}>
        {laid.map(node => {
          const isBranch = !!(node.children && node.children.length > 0) && variant !== 'flat' && node.depth === 0
          const v = nodeValue(node)
          const frac = v / total
          return (
            <g key={`${node.key}-${node.depth}-${node.rect.x}-${node.rect.y}`} className={`iux-treemap__cell iux-treemap__cell--${node.resolvedIntent}${isBranch ? ' iux-treemap__cell--branch' : ' iux-treemap__cell--leaf'}`}>
              <rect className="iux-treemap__rect" x={node.rect.x + 1} y={node.rect.y + 1} width={Math.max(0, node.rect.w - 2)} height={Math.max(0, node.rect.h - 2)} rx={2}>
                <title>{`${node.label}: ${fmt(v)} (${(frac * 100).toFixed(1)}%)`}</title>
              </rect>
              {node.rect.w > 56 && node.rect.h > 24 && (
                <text className="iux-treemap__label" x={node.rect.x + 6} y={node.rect.y + 14}>{node.label}</text>
              )}
              {showLabels && node.rect.w > 56 && node.rect.h > 38 && (
                <text className="iux-treemap__value" x={node.rect.x + 6} y={node.rect.y + 28}>{fmt(v)}</text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
