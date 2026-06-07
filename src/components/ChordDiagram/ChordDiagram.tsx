// ABOUTME: SVG chord diagram that arranges nodes as arcs on a circle and draws bi-directional ribbon paths between them, with simple, value-weighted opacity, and highlighted accent variants.

import { useMemo } from 'react'
import './ChordDiagram.css'

// ABOUTME: Display mode — 'simple' draws ribbons at uniform opacity, 'weighted' scales ribbon tint level (1–4) by link value relative to max, 'highlighted' elevates links with `highlight: true` to an accent class while dimming the rest.
export type ChordDiagramVariant = 'simple' | 'weighted' | 'highlighted'

// ABOUTME: Semantic color token applied to a node's arc segment and its outgoing ribbons, drawn from the six contract intents.
export type ChordIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// ABOUTME: A chord diagram node — a unique id, display label, and optional explicit intent override (otherwise assigned by index from the intent rotation).
export interface ChordNode {
  id: string
  label: string
  intent?: ChordIntent
}

// ABOUTME: A flow link between two node ids with a mandatory numeric value that determines arc sub-span and ribbon area; `highlight` flags the link for accent coloring on the 'highlighted' variant.
export interface ChordLink {
  from: string
  to: string
  value: number
  highlight?: boolean
}

// ABOUTME: Props for ChordDiagram — supplies node and link data, variant, and SVG dimensions.
export interface ChordDiagramProps {
  variant?: ChordDiagramVariant
  nodes: ChordNode[]
  links: ChordLink[]
  width?: number
  height?: number
  className?: string
}

const INTENTS: ChordIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']
const ARC_GAP = 0.04
const ARC_W = 14

function polar(cx: number, cy: number, r: number, a: number) {
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
}

function arcPath(cx: number, cy: number, rIn: number, rOut: number, a0: number, a1: number): string {
  const p0 = polar(cx, cy, rOut, a0)
  const p1 = polar(cx, cy, rOut, a1)
  const p2 = polar(cx, cy, rIn, a1)
  const p3 = polar(cx, cy, rIn, a0)
  const large = a1 - a0 > Math.PI ? 1 : 0
  return `M ${p0.x} ${p0.y} A ${rOut} ${rOut} 0 ${large} 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${rIn} ${rIn} 0 ${large} 0 ${p3.x} ${p3.y} Z`
}

function ribbonPath(cx: number, cy: number, r: number, a0: number, a1: number, b0: number, b1: number): string {
  const p0 = polar(cx, cy, r, a0)
  const p1 = polar(cx, cy, r, a1)
  const p2 = polar(cx, cy, r, b0)
  const p3 = polar(cx, cy, r, b1)
  const large1 = a1 - a0 > Math.PI ? 1 : 0
  const large2 = b1 - b0 > Math.PI ? 1 : 0
  return `M ${p0.x} ${p0.y}
          A ${r} ${r} 0 ${large1} 1 ${p1.x} ${p1.y}
          Q ${cx} ${cy} ${p2.x} ${p2.y}
          A ${r} ${r} 0 ${large2} 1 ${p3.x} ${p3.y}
          Q ${cx} ${cy} ${p0.x} ${p0.y} Z`
}

// ABOUTME: Allocates each node a proportional arc on a circle based on its total flow, then subdivides each arc into per-link sub-spans and draws a `ribbonPath` cubic Bézier between matching sub-spans; arc labels are positioned radially outside each arc midpoint.
/**
 * Node arc spans are proportional to total flow (in + out), divided across
 * `2π − gapTotal` radians. For each link, `offset` cursors track how much of
 * each node's arc span has been consumed, so ribbons tile cleanly inside their
 * parent arc. On 'weighted', the tint-level class (1–4) is computed as
 * `ceil((value / maxValue) × 4)`. On 'highlighted', links without
 * `highlight: true` render with the default class, accented ones get
 * `iux-chord__ribbon--accent`.
 */
export function ChordDiagram({
  variant = 'simple',
  nodes,
  links,
  width = 420,
  height = 420,
  className,
}: ChordDiagramProps) {
  const layout = useMemo(() => {
    const cx = width / 2
    const cy = height / 2
    const rOut = Math.min(width, height) / 2 - 32
    const rIn = rOut - ARC_W

    // Per-node total weight (sum of in + out flow, double-counting self-loops once).
    const totals = new Map<string, number>()
    for (const n of nodes) totals.set(n.id, 0)
    for (const l of links) {
      totals.set(l.from, (totals.get(l.from) ?? 0) + l.value)
      if (l.from !== l.to) totals.set(l.to, (totals.get(l.to) ?? 0) + l.value)
    }
    const sum = Array.from(totals.values()).reduce((a, b) => a + b, 0) || 1

    const gapTotal = ARC_GAP * nodes.length
    const available = Math.PI * 2 - gapTotal
    let cursor = -Math.PI / 2 + ARC_GAP / 2

    const arcs = new Map<string, { a0: number; a1: number; intent: ChordIntent }>()
    nodes.forEach((n, i) => {
      const span = ((totals.get(n.id) ?? 0) / sum) * available
      const a0 = cursor
      const a1 = cursor + Math.max(0.04, span)
      arcs.set(n.id, { a0, a1, intent: n.intent ?? INTENTS[i % INTENTS.length] })
      cursor = a1 + ARC_GAP
    })

    // Allocate sub-arcs per node, walked in node order, to draw ribbons.
    const offsets = new Map<string, number>()
    for (const n of nodes) offsets.set(n.id, 0)
    const ribbons = links.map((l, i) => {
      const fa = arcs.get(l.from); const ta = arcs.get(l.to)
      if (!fa || !ta) return null
      const fSpan = fa.a1 - fa.a0
      const tSpan = ta.a1 - ta.a0
      const ftotal = totals.get(l.from) ?? 1
      const ttotal = totals.get(l.to) ?? 1
      const f0 = fa.a0 + (offsets.get(l.from) ?? 0)
      const f1 = f0 + (l.value / ftotal) * fSpan
      offsets.set(l.from, (offsets.get(l.from) ?? 0) + (l.value / ftotal) * fSpan)
      const t0 = ta.a0 + (offsets.get(l.to) ?? 0)
      const t1 = t0 + (l.value / ttotal) * tSpan
      offsets.set(l.to, (offsets.get(l.to) ?? 0) + (l.value / ttotal) * tSpan)
      return {
        idx: i,
        link: l,
        path: ribbonPath(cx, cy, rIn, f0, f1, t0, t1),
        intent: fa.intent,
      }
    }).filter(Boolean) as { idx: number; link: ChordLink; path: string; intent: ChordIntent }[]

    return { cx, cy, rIn, rOut, arcs, ribbons }
  }, [nodes, links, width, height])

  return (
    <div className={['iux-chord', `iux-chord--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-chord__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Chord diagram, ${nodes.length} segments, ${links.length} links`}>
        {layout.ribbons.map(r => {
          const isAccent = variant === 'highlighted' && r.link.highlight
          const lvl = variant === 'weighted'
            ? Math.min(4, Math.max(1, Math.ceil((r.link.value / Math.max(...links.map(l => l.value))) * 4)))
            : 3
          return (
            <path
              key={`r-${r.idx}`}
              className={`iux-chord__ribbon iux-chord__ribbon--${r.intent} iux-chord__ribbon--lv-${lvl}${isAccent ? ' iux-chord__ribbon--accent' : ''}`}
              d={r.path}
            >
              <title>{`${r.link.from} ↔ ${r.link.to}: ${r.link.value}`}</title>
            </path>
          )
        })}
        {nodes.map(n => {
          const a = layout.arcs.get(n.id)!
          const mid = (a.a0 + a.a1) / 2
          const lp = polar(layout.cx, layout.cy, layout.rOut + 10, mid)
          const anchor = Math.cos(mid) > 0.05 ? 'start' : Math.cos(mid) < -0.05 ? 'end' : 'middle'
          return (
            <g key={n.id} className={`iux-chord__arc iux-chord__arc--${a.intent}`}>
              <path d={arcPath(layout.cx, layout.cy, layout.rIn, layout.rOut, a.a0, a.a1)} />
              <text className="iux-chord__label" x={lp.x} y={lp.y} textAnchor={anchor} dominantBaseline="central">{n.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
