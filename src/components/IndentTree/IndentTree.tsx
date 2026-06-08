// ABOUTME: Accessible tree list component that renders a nested node hierarchy as indented rows, with optional box-drawing connector guides and a proportional weight bar in the 'meta' variant.

import { useMemo, type ReactNode } from 'react'
import './IndentTree.css'

// ABOUTME: 'plain' indents by blank spacers only; 'guides' adds box-drawing pipe/elbow/tee connectors; 'meta' additionally renders a right-aligned proportion bar and meta string.
export type IndentTreeVariant = 'plain' | 'guides' | 'meta'

// ABOUTME: Semantic colour intent applied per row; inherited from the parent node when not set on a child.
export type IndentTreeIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A tree node with an optional right-aligned `meta` string, a numeric `weight` that drives the 'meta' variant's proportion bar, and nested `children` for deeper levels.
export interface IndentTreeNode {
  id: string
  label: string
  intent?: IndentTreeIntent
  /** Right-aligned summary value (size, count, %). */
  meta?: string
  /** Optional weight that drives the meta bar in the `meta` variant. */
  weight?: number
  children?: IndentTreeNode[]
}

// ABOUTME: Props for IndentTree — supplies the root node, display variant, and optional container width.
export interface IndentTreeProps {
  variant?: IndentTreeVariant
  root: IndentTreeNode
  width?: number
  className?: string
}

// ABOUTME: Internal flat record for one rendered tree row: carries the source node, its nesting depth, whether it is its parent's last child (for elbow vs tee guide), an ancestor-last boolean list (for pipe vs blank column guides), its resolved intent, and effective weight.
interface Row {
  node: IndentTreeNode
  depth: number
  isLast: boolean
  ancestorsLast: boolean[]
  intent: IndentTreeIntent
  weight: number
}

// ABOUTME: Intent palette cycled over top-level children; each node's colour is inherited by its descendants unless overridden.
const INTENTS: IndentTreeIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Performs a depth-first traversal of the tree, emitting one Row per node with its guide metadata (isLast, ancestorsLast), resolved intent, and aggregated weight.
function flatten(root: IndentTreeNode): Row[] {
  const out: Row[] = []
  function visit(n: IndentTreeNode, depth: number, isLast: boolean, ancestorsLast: boolean[], parentIntent?: IndentTreeIntent, idx = 0) {
    const intent: IndentTreeIntent = n.intent ?? parentIntent ?? INTENTS[idx % INTENTS.length]
    const weight = n.weight ?? (n.children && n.children.length > 0
      ? n.children.reduce((s, c) => s + (c.weight ?? 0), 0)
      : 0)
    out.push({ node: n, depth, isLast, ancestorsLast, intent, weight })
    if (!n.children) return
    n.children.forEach((c, i) => {
      const last = i === n.children!.length - 1
      visit(c, depth + 1, last, [...ancestorsLast, isLast], intent, i)
    })
  }
  // Root sits at depth 0 with no guide ancestors; its own intent rotates per
  // top-level child when not set.
  visit(root, 0, true, [], undefined, 0)
  return out
}

// ABOUTME: Scans all rows for the maximum weight value, returning at least 1 so the 'meta' bar proportions are safe to compute.
function maxWeight(rows: Row[]): number {
  let m = 0
  for (const r of rows) if (r.weight > m) m = r.weight
  return m || 1
}

// ABOUTME: Flattens the tree depth-first into a row array (tracking `isLast` and ancestor-last flags per level), then renders a `<ul role="tree">` where each `<li>` composes guide spans, a folder/leaf bullet, the label, and optionally a weight bar and meta string.
/**
 * The `flatten` helper records `ancestorsLast` booleans for every ancestor
 * so the 'guides' variant can decide whether each depth column draws a
 * vertical pipe or a blank. Intent rotates over the `INTENTS` palette for
 * top-level children and is inherited downward. The 'meta' variant computes
 * each node's weight as the sum of direct children weights (or its own
 * weight for leaves), normalises against the global maximum, and maps to a
 * fixed 80 px bar track.
 */
export function IndentTree({
  variant = 'plain',
  root,
  width = 480,
  className,
}: IndentTreeProps) {
  const rows = useMemo(() => flatten(root), [root])
  const wMax = useMemo(() => maxWeight(rows), [rows])
  const showGuides = variant !== 'plain'
  const showMeta = variant === 'meta'

  return (
    <div className={['iux-indenttree', `iux-indenttree--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <ul className="iux-indenttree__list" role="tree">
        {rows.map(r => {
          const isRoot = r.depth === 0
          const indent: ReactNode[] = []
          if (showGuides) {
            r.ancestorsLast.forEach((wasLast, i) => {
              if (i === 0) return
              indent.push(
                <span key={`g-${i}`} className={`iux-indenttree__guide ${wasLast ? 'iux-indenttree__guide--blank' : 'iux-indenttree__guide--pipe'}`} aria-hidden="true" />
              )
            })
            if (!isRoot) {
              indent.push(
                <span key="elbow" className={`iux-indenttree__guide ${r.isLast ? 'iux-indenttree__guide--elbow' : 'iux-indenttree__guide--tee'}`} aria-hidden="true" />
              )
            }
          } else if (!isRoot) {
            for (let i = 0; i < r.depth; i++) {
              indent.push(<span key={`p-${i}`} className="iux-indenttree__guide iux-indenttree__guide--blank" aria-hidden="true" />)
            }
          }
          const hasChildren = !!(r.node.children && r.node.children.length > 0)
          const tickW = showMeta && r.weight > 0 ? Math.max(2, (r.weight / wMax) * 80) : 0
          return (
            <li key={r.node.id} className={`iux-indenttree__row iux-indenttree__row--${r.intent} ${isRoot ? 'iux-indenttree__row--root' : ''}`} role="treeitem">
              <span className="iux-indenttree__indent" aria-hidden="true">{indent}</span>
              <span className={`iux-indenttree__bullet ${hasChildren ? 'iux-indenttree__bullet--folder' : 'iux-indenttree__bullet--leaf'}`} aria-hidden="true" />
              <span className="iux-indenttree__label">{r.node.label}</span>
              {showMeta && tickW > 0 && (
                <span className="iux-indenttree__bar" aria-hidden="true">
                  <span className="iux-indenttree__bar-fill" style={{ width: `${tickW}px` }} />
                </span>
              )}
              {r.node.meta !== undefined && (
                <span className="iux-indenttree__meta">{r.node.meta}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

