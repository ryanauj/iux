import { useMemo, type ReactNode } from 'react'
import './IndentTree.css'

export type IndentTreeVariant = 'plain' | 'guides' | 'meta'

export type IndentTreeIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

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

export interface IndentTreeProps {
  variant?: IndentTreeVariant
  root: IndentTreeNode
  width?: number
  className?: string
}

interface Row {
  node: IndentTreeNode
  depth: number
  isLast: boolean
  ancestorsLast: boolean[]
  intent: IndentTreeIntent
  weight: number
}

const INTENTS: IndentTreeIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

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

function maxWeight(rows: Row[]): number {
  let m = 0
  for (const r of rows) if (r.weight > m) m = r.weight
  return m || 1
}

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

