// ABOUTME: SVG arc-diagram that plots nodes along one or two axes and draws curved arcs between connected pairs, supporting simple, weighted-stroke, and bipartite S-curve layouts.

import { useMemo } from 'react'
import './ArcDiagram.css'

// ABOUTME: Layout mode — 'simple' places all nodes on one axis with uniform arcs; 'weighted' scales stroke width by edge value; 'bipartite' splits nodes onto two parallel axes connected by S-curves.
export type ArcDiagramVariant = 'simple' | 'weighted' | 'bipartite'

// ABOUTME: Semantic color token applied to arc edges and node dots, matching the six contract intents.
export type ArcDiagramIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A graph node with an optional group (drives color assignment and bipartite axis placement) and explicit intent override.
export interface ArcNode {
  id: string
  label: string
  /** On `bipartite` the group decides which side; otherwise drives color. */
  group?: string
  intent?: ArcDiagramIntent
}

// ABOUTME: A directed edge between two node ids with an optional numeric weight used by the 'weighted' variant to scale stroke thickness.
export interface ArcEdge {
  from: string
  to: string
  value?: number
}

// ABOUTME: Props for ArcDiagram — supplies node/edge data, variant, optional SVG dimensions, and a className.
export interface ArcDiagramProps {
  variant?: ArcDiagramVariant
  nodes: ArcNode[]
  edges: ArcEdge[]
  width?: number
  height?: number
  className?: string
}

const INTENTS: ArcDiagramIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

// ABOUTME: Renders an SVG arc diagram: nodes are placed along one axis (or two axes for bipartite), with semicircular arcs (or S-curves) connecting related pairs; stroke width scales with edge value on 'weighted'.
/**
 * Positions nodes along a horizontal axis, grouped and sorted by `group`,
 * then draws a semicircular SVG arc between each connected pair. On
 * `bipartite`, two separate horizontal axes are used (one per group) and
 * edges become cubic S-curves spanning the gap. On `weighted`, stroke
 * width scales proportionally to `ArcEdge.value` relative to the maximum.
 */
export function ArcDiagram({
  variant = 'simple',
  nodes,
  edges,
  width = 600,
  height = 280,
  className,
}: ArcDiagramProps) {
  const layout = useMemo(() => {
    const groupIntent = new Map<string, ArcDiagramIntent>()
    let gi = 0
    for (const n of nodes) {
      const g = n.group ?? '__'
      if (!groupIntent.has(g)) groupIntent.set(g, INTENTS[gi++ % INTENTS.length])
    }

    const padX = 36
    const labelW = width - padX * 2
    const axisY = variant === 'bipartite' ? height / 2 : height - 50

    // For bipartite, split nodes into two groups (in encounter order) on
    // two axes, one above and one below center.
    const placed = new Map<string, { x: number; y: number; intent: ArcDiagramIntent }>()
    if (variant === 'bipartite') {
      const groups = Array.from(new Set(nodes.map(n => n.group ?? '__')))
      const top = nodes.filter(n => (n.group ?? '__') === groups[0])
      const bot = nodes.filter(n => (n.group ?? '__') !== groups[0])
      top.forEach((n, i) => {
        const x = padX + (top.length === 1 ? labelW / 2 : (labelW * i) / (top.length - 1))
        placed.set(n.id, { x, y: height * 0.28, intent: n.intent ?? groupIntent.get(n.group ?? '__')! })
      })
      bot.forEach((n, i) => {
        const x = padX + (bot.length === 1 ? labelW / 2 : (labelW * i) / (bot.length - 1))
        placed.set(n.id, { x, y: height * 0.78, intent: n.intent ?? groupIntent.get(n.group ?? '__')! })
      })
    } else {
      // Sort by group, then by label, so connected nodes tend to be near.
      const ordered = nodes.slice().sort((a, b) => {
        const ga = a.group ?? ''
        const gb = b.group ?? ''
        if (ga !== gb) return ga.localeCompare(gb)
        return a.label.localeCompare(b.label)
      })
      ordered.forEach((n, i) => {
        const x = padX + (ordered.length === 1 ? labelW / 2 : (labelW * i) / (ordered.length - 1))
        placed.set(n.id, { x, y: axisY, intent: n.intent ?? groupIntent.get(n.group ?? '__')! })
      })
    }

    return { placed, axisY }
  }, [nodes, edges, variant, width, height])

  let maxEdge = 0
  for (const e of edges) if ((e.value ?? 1) > maxEdge) maxEdge = e.value ?? 1
  if (maxEdge <= 0) maxEdge = 1

  return (
    <div className={['iux-arc', `iux-arc--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-arc__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Arc diagram, ${nodes.length} nodes, ${edges.length} edges`}>
        {/* Axis */}
        {variant !== 'bipartite' ? (
          <line className="iux-arc__axis" x1={20} y1={layout.axisY} x2={width - 20} y2={layout.axisY} />
        ) : (
          <>
            <line className="iux-arc__axis" x1={20} y1={height * 0.28} x2={width - 20} y2={height * 0.28} />
            <line className="iux-arc__axis" x1={20} y1={height * 0.78} x2={width - 20} y2={height * 0.78} />
          </>
        )}

        {edges.map((e, i) => {
          const a = layout.placed.get(e.from); const b = layout.placed.get(e.to)
          if (!a || !b) return null
          const sw = variant === 'simple' ? 1.2 : 1 + ((e.value ?? 1) / maxEdge) * 4
          if (variant === 'bipartite') {
            // S-curve between the two axes.
            const mx = (a.x + b.x) / 2
            const path = `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
            return (
              <path key={`e-${i}`} className={`iux-arc__edge iux-arc__edge--${a.intent}`} d={path} strokeWidth={sw} fill="none" vectorEffect="non-scaling-stroke">
                <title>{`${e.from} → ${e.to}${e.value !== undefined ? `: ${e.value}` : ''}`}</title>
              </path>
            )
          }
          const dx = b.x - a.x
          const r = Math.abs(dx) / 2
          const sweep = 1
          const path = `M ${a.x} ${a.y} A ${r} ${r} 0 0 ${sweep} ${b.x} ${b.y}`
          return (
            <path key={`e-${i}`} className={`iux-arc__edge iux-arc__edge--${a.intent}`} d={path} strokeWidth={sw} fill="none" vectorEffect="non-scaling-stroke">
              <title>{`${e.from} → ${e.to}${e.value !== undefined ? `: ${e.value}` : ''}`}</title>
            </path>
          )
        })}

        {nodes.map(n => {
          const p = layout.placed.get(n.id)!
          const above = variant === 'bipartite' && p.y < height / 2
          return (
            <g key={n.id} className={`iux-arc__node iux-arc__node--${p.intent}`}>
              <circle cx={p.x} cy={p.y} r={4} />
              <text
                className="iux-arc__label"
                x={p.x}
                y={above ? p.y - 8 : p.y + 8}
                textAnchor="end"
                dominantBaseline={above ? 'auto' : 'hanging'}
                transform={`rotate(-50 ${p.x} ${above ? p.y - 8 : p.y + 8})`}
              >
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
