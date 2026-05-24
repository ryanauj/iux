import { useMemo } from 'react'
import './Sankey.css'

export type SankeyVariant = 'simple' | 'labeled' | 'highlighted'

export type SankeyIntent =
  | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface SankeyNode {
  key: string
  label: string
  /** Stage/column the node lives in. Stages are ordered left-to-right. */
  stage: number
  intent?: SankeyIntent
}

export interface SankeyLink {
  from: string
  to: string
  value: number
  /** When set on `highlighted` variant, this link receives the accent color. */
  highlight?: boolean
}

export interface SankeyProps {
  variant?: SankeyVariant
  nodes: SankeyNode[]
  links: SankeyLink[]
  width?: number
  height?: number
  formatValue?: (n: number) => string
  className?: string
}

const NODE_W = 12
const NODE_GAP = 12

const INTENTS: SankeyIntent[] = ['primary', 'info', 'success', 'warning', 'danger', 'neutral']

interface PlacedNode { node: SankeyNode; x: number; y: number; h: number; resolvedIntent: SankeyIntent; outValue: number; inValue: number }

function defaultFormat(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  return n.toFixed(1)
}

function curvedLink(x0: number, y0: number, x1: number, y1: number, thickness: number): string {
  const mx = (x0 + x1) / 2
  const half = thickness / 2
  return `M ${x0} ${y0 - half}
          C ${mx} ${y0 - half}, ${mx} ${y1 - half}, ${x1} ${y1 - half}
          L ${x1} ${y1 + half}
          C ${mx} ${y1 + half}, ${mx} ${y0 + half}, ${x0} ${y0 + half} Z`
}

export function Sankey({
  variant = 'simple',
  nodes,
  links,
  width = 560,
  height = 320,
  formatValue,
  className,
}: SankeyProps) {
  const fmt = formatValue ?? defaultFormat

  const layout = useMemo(() => {
    const byKey = new Map<string, SankeyNode>()
    for (const n of nodes) byKey.set(n.key, n)
    const stages = new Map<number, SankeyNode[]>()
    for (const n of nodes) {
      if (!stages.has(n.stage)) stages.set(n.stage, [])
      stages.get(n.stage)!.push(n)
    }
    const stageKeys = Array.from(stages.keys()).sort((a, b) => a - b)
    const stageCount = stageKeys.length
    const pad = 12
    const colSpacing = (width - NODE_W - pad * 2) / Math.max(1, stageCount - 1)

    // Per-node totals: max of in / out flow drives the height.
    const totals = new Map<string, { inV: number; outV: number }>()
    for (const n of nodes) totals.set(n.key, { inV: 0, outV: 0 })
    for (const l of links) {
      const f = totals.get(l.from); if (f) f.outV += l.value
      const t = totals.get(l.to); if (t) t.inV += l.value
    }

    // Compute scaling so the largest column fits within height.
    let maxColSum = 1
    for (const sNodes of stages.values()) {
      const sum = sNodes.reduce((s, n) => {
        const t = totals.get(n.key)!
        return s + Math.max(t.inV, t.outV)
      }, 0)
      if (sum > maxColSum) maxColSum = sum
    }
    const usableH = height - pad * 2 - NODE_GAP * Math.max(0, ...Array.from(stages.values(), s => s.length - 1))
    const scale = usableH / maxColSum

    const placed = new Map<string, PlacedNode>()
    stageKeys.forEach((stage, sIdx) => {
      const sNodes = stages.get(stage)!.slice()
      // Stable order: by inbound value descending, then label
      sNodes.sort((a, b) => (totals.get(b.key)!.inV + totals.get(b.key)!.outV) - (totals.get(a.key)!.inV + totals.get(a.key)!.outV))
      let y = pad
      const totalH = sNodes.reduce((s, n) => s + Math.max(totals.get(n.key)!.inV, totals.get(n.key)!.outV) * scale, 0) + NODE_GAP * (sNodes.length - 1)
      y = pad + (height - pad * 2 - totalH) / 2
      for (const n of sNodes) {
        const t = totals.get(n.key)!
        const h = Math.max(2, Math.max(t.inV, t.outV) * scale)
        placed.set(n.key, {
          node: n,
          x: pad + sIdx * colSpacing,
          y,
          h,
          resolvedIntent: n.intent ?? INTENTS[sIdx % INTENTS.length],
          outValue: t.outV,
          inValue: t.inV,
        })
        y += h + NODE_GAP
      }
    })

    // Compute per-link source/target Y by tracking running offsets.
    const sortedLinks = links.slice().sort((a, b) => {
      const ap = placed.get(a.from); const bp = placed.get(b.from)
      if (!ap || !bp) return 0
      return ap.y - bp.y
    })
    const outOffset = new Map<string, number>()
    const inOffset = new Map<string, number>()
    const ribbons = sortedLinks.map(l => {
      const from = placed.get(l.from)
      const to = placed.get(l.to)
      if (!from || !to) return null
      const t = (from.outValue || 1)
      const u = (to.inValue || 1)
      const thicknessFrom = (l.value / t) * from.h
      const thicknessTo = (l.value / u) * to.h
      const thickness = Math.min(thicknessFrom, thicknessTo)
      const oOff = (outOffset.get(l.from) ?? 0)
      const iOff = (inOffset.get(l.to) ?? 0)
      const y0 = from.y + oOff + thicknessFrom / 2
      const y1 = to.y + iOff + thicknessTo / 2
      outOffset.set(l.from, oOff + thicknessFrom)
      inOffset.set(l.to, iOff + thicknessTo)
      return {
        link: l,
        path: curvedLink(from.x + NODE_W, y0, to.x, y1, Math.max(1, thickness)),
        intent: from.resolvedIntent,
      }
    }).filter(Boolean) as { link: SankeyLink; path: string; intent: SankeyIntent }[]

    return { placed: Array.from(placed.values()), ribbons }
  }, [nodes, links, width, height])

  const showLabels = variant === 'labeled' || variant === 'highlighted'

  return (
    <div className={['iux-sankey', `iux-sankey--${variant}`, className].filter(Boolean).join(' ')} style={{ width: `${width}px` }}>
      <svg className="iux-sankey__svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Sankey, ${nodes.length} nodes, ${links.length} flows`}>
        {layout.ribbons.map((r, i) => (
          <path
            key={`r-${i}`}
            className={`iux-sankey__link iux-sankey__link--${r.intent}${variant === 'highlighted' && r.link.highlight ? ' iux-sankey__link--accent' : ''}`}
            d={r.path}
          >
            <title>{`${r.link.from} → ${r.link.to}: ${fmt(r.link.value)}`}</title>
          </path>
        ))}
        {layout.placed.map(p => (
          <g key={p.node.key} className={`iux-sankey__node iux-sankey__node--${p.resolvedIntent}`}>
            <rect x={p.x} y={p.y} width={NODE_W} height={p.h} rx={2} />
            {showLabels && (
              <text className="iux-sankey__label" x={p.x + NODE_W + 4} y={p.y + p.h / 2} dominantBaseline="central">
                {p.node.label}
                {variant === 'labeled' && (
                  <tspan className="iux-sankey__label-meta" dx={4}>{fmt(Math.max(p.inValue, p.outValue))}</tspan>
                )}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
