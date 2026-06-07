// ABOUTME: SVG adjacency-matrix chart that renders node-to-node connections as a grid of colored cells, with binary, weighted, and clustered variants.

import { useMemo } from 'react'
import './AdjacencyMatrix.css'

// ABOUTME: Display style — 'binary' fills cells uniformly, 'weighted' tints by edge value, 'clustered' groups nodes and bands rows/columns by group intent.
export type AdjacencyMatrixVariant = 'binary' | 'weighted' | 'clustered'

// ABOUTME: Semantic color token applied to matrix cells and cluster bands, matching the six contract intents.
export type AdjacencyMatrixIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A graph node with an optional group id that drives cluster-band color on the 'clustered' variant.
export interface AdjacencyNode {
  id: string
  label: string
  /** Group / cluster id — drives row & column band color on `clustered`. */
  group?: string
}

// ABOUTME: A directed edge between two node ids with an optional numeric weight used by the 'weighted' variant for tint-level scaling.
export interface AdjacencyEdge {
  from: string
  to: string
  value?: number
}

// ABOUTME: Props for AdjacencyMatrix — supplies node/edge data, variant, symmetric-mirroring toggle, cell pixel size, and optional fixed width.
export interface AdjacencyMatrixProps {
  variant?: AdjacencyMatrixVariant
  nodes: AdjacencyNode[]
  edges: AdjacencyEdge[]
  /** Treat the graph as undirected (mirror cells). Default true. */
  symmetric?: boolean
  cellSize?: number
  width?: number
  className?: string
}

const INTENTS: AdjacencyMatrixIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

function tintLevel(v: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (max <= 0 || v <= 0) return 0
  const r = v / max
  if (r < 0.2) return 1
  if (r < 0.45) return 2
  if (r < 0.72) return 3
  return 4
}

// ABOUTME: Renders a square SVG grid where each cell [row, col] is filled when an edge exists from the row node to the column node; supports binary presence, weighted tint levels, and cluster-banded color groupings.
/**
 * Computes a square matrix from `nodes` and `edges`, then renders each
 * cell as an SVG `<rect>` colored by presence (binary), edge weight
 * (weighted), or group membership (clustered). On `clustered`, nodes are
 * sorted so same-group rows and columns are adjacent and colored accent
 * bands mark each group boundary. `symmetric` mirrors every edge so the
 * matrix stays symmetric for undirected graphs.
 */
export function AdjacencyMatrix({
  variant = 'binary',
  nodes,
  edges,
  symmetric = true,
  cellSize = 22,
  width,
  className,
}: AdjacencyMatrixProps) {
  const layout = useMemo(() => {
    // On `clustered`, sort nodes so groups land next to each other.
    const ordered = variant === 'clustered'
      ? nodes.slice().sort((a, b) => {
          const ga = a.group ?? ''
          const gb = b.group ?? ''
          if (ga === gb) return a.label.localeCompare(b.label)
          return ga.localeCompare(gb)
        })
      : nodes
    const indexById = new Map<string, number>()
    ordered.forEach((n, i) => indexById.set(n.id, i))

    const groupIntent = new Map<string, AdjacencyMatrixIntent>()
    let gi = 0
    for (const n of ordered) {
      const g = n.group ?? '__'
      if (!groupIntent.has(g)) groupIntent.set(g, INTENTS[gi++ % INTENTS.length])
    }

    let max = 0
    const matrix = new Map<string, number>()
    for (const e of edges) {
      const v = e.value ?? 1
      if (v > max) max = v
      const a = e.from
      const b = e.to
      matrix.set(`${a}::${b}`, (matrix.get(`${a}::${b}`) ?? 0) + v)
      if (symmetric && a !== b) {
        matrix.set(`${b}::${a}`, (matrix.get(`${b}::${a}`) ?? 0) + v)
      }
    }

    return { ordered, indexById, groupIntent, matrix, max: max || 1 }
  }, [nodes, edges, symmetric, variant])

  const { ordered, groupIntent, matrix, max } = layout

  const gap = 1
  const labelW = 84
  const labelH = 70
  const gridW = ordered.length * (cellSize + gap)
  const gridH = gridW
  const svgW = labelW + gridW + 8
  const svgH = labelH + gridH + 8

  // Build cluster bands on the `clustered` variant.
  const bands = useMemo(() => {
    if (variant !== 'clustered') return [] as { i0: number; i1: number; intent: AdjacencyMatrixIntent; group: string }[]
    const out: { i0: number; i1: number; intent: AdjacencyMatrixIntent; group: string }[] = []
    let i0 = 0
    for (let i = 1; i <= ordered.length; i++) {
      const cur = ordered[i]?.group ?? '__end'
      const prev = ordered[i0].group ?? '__end'
      if (cur !== prev) {
        out.push({ i0, i1: i - 1, intent: groupIntent.get(prev)!, group: prev })
        i0 = i
      }
    }
    return out
  }, [variant, ordered, groupIntent])

  return (
    <div
      className={['iux-adjmatrix', `iux-adjmatrix--${variant}`, className].filter(Boolean).join(' ')}
      style={{ width: width ? `${width}px` : `${svgW}px` }}
    >
      <svg
        className="iux-adjmatrix__svg"
        viewBox={`0 0 ${svgW} ${svgH}`}
        width={svgW}
        height={svgH}
        role="img"
        aria-label={`Adjacency matrix, ${ordered.length} nodes, ${edges.length} edges`}
      >
        {/* Cluster bands behind the grid. */}
        {bands.map(b => {
          const x = labelW + b.i0 * (cellSize + gap) - gap / 2
          const y = labelH + b.i0 * (cellSize + gap) - gap / 2
          const w = (b.i1 - b.i0 + 1) * (cellSize + gap)
          return (
            <g key={`band-${b.group}`} className={`iux-adjmatrix__band iux-adjmatrix__band--${b.intent}`}>
              <rect x={labelW - 6} y={y} width={4} height={w} rx={1} />
              <rect x={x} y={labelH - 6} width={w} height={4} rx={1} />
            </g>
          )
        })}

        {/* Row labels. */}
        {ordered.map((n, i) => {
          const y = labelH + i * (cellSize + gap) + cellSize / 2
          const intent = groupIntent.get(n.group ?? '__')!
          return (
            <text
              key={`r-${n.id}`}
              className={`iux-adjmatrix__rowlabel${variant === 'clustered' ? ` iux-adjmatrix__rowlabel--${intent}` : ''}`}
              x={labelW - 6}
              y={y}
              textAnchor="end"
              dominantBaseline="central"
            >
              {n.label}
            </text>
          )
        })}

        {/* Column labels (rotated). */}
        {ordered.map((n, i) => {
          const x = labelW + i * (cellSize + gap) + cellSize / 2
          const intent = groupIntent.get(n.group ?? '__')!
          return (
            <text
              key={`c-${n.id}`}
              className={`iux-adjmatrix__collabel${variant === 'clustered' ? ` iux-adjmatrix__collabel--${intent}` : ''}`}
              x={x}
              y={labelH - 6}
              textAnchor="start"
              dominantBaseline="central"
              transform={`rotate(-45 ${x} ${labelH - 6})`}
            >
              {n.label}
            </text>
          )
        })}

        {/* Cells. */}
        {ordered.map((row, ri) => ordered.map((col, ci) => {
          const v = matrix.get(`${row.id}::${col.id}`) ?? 0
          const x = labelW + ci * (cellSize + gap)
          const y = labelH + ri * (cellSize + gap)
          if (v <= 0) {
            return (
              <rect
                key={`cell-${row.id}-${col.id}`}
                className="iux-adjmatrix__cell iux-adjmatrix__cell--empty"
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
              />
            )
          }
          const level = variant === 'binary' ? 4 : tintLevel(v, max)
          const intent: AdjacencyMatrixIntent = variant === 'clustered'
            ? (row.group === col.group ? groupIntent.get(row.group ?? '__')! : 'neutral')
            : 'primary'
          return (
            <rect
              key={`cell-${row.id}-${col.id}`}
              className={`iux-adjmatrix__cell iux-adjmatrix__cell--${intent} iux-adjmatrix__cell--lv-${level}`}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
            >
              <title>{`${row.label} → ${col.label}${v > 1 || variant === 'weighted' ? `: ${v}` : ''}`}</title>
            </rect>
          )
        }))}
      </svg>
    </div>
  )
}
