import { useEffect, useMemo, useRef, useState } from 'react'
import { INTEGRATION_TESTS, involvedComponentIds } from '../registry'
import type { RunResult } from '../types'

interface Props {
  results: Record<string, RunResult>
}

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  degree: number  // number of tests participating in
}

interface Edge {
  a: string
  b: string
  weight: number  // co-occurrence count across tests
}

const WIDTH = 720
const HEIGHT = 480
const PAD = 40

export function GraphViz({ results }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  const { nodes, edges } = useMemo(() => buildGraph(), [])
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const init: Record<string, { x: number; y: number }> = {}
    for (const n of nodes) init[n.id] = { x: n.x, y: n.y }
    return init
  })
  const positionsRef = useRef(positions)
  positionsRef.current = positions

  // Tiny force simulation: repulsion between nodes, spring on edges, centering.
  useEffect(() => {
    const sim = simulateForces(nodes, edges, (next) => {
      positionsRef.current = next
      setPositions(next)
    })
    return () => sim.stop()
  }, [nodes, edges])

  const hoveredTests = hovered
    ? INTEGRATION_TESTS.filter(t => t.components.includes(hovered))
    : []

  return (
    <div className="viz-graph">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="viz-graph__svg" role="img" aria-label="Component co-usage graph">
        <defs>
          <marker id="arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L6 3 L0 6 z" fill="var(--color-border-default)" />
          </marker>
        </defs>
        {edges.map(e => {
          const a = positions[e.a]
          const b = positions[e.b]
          if (!a || !b) return null
          const highlighted = hovered === e.a || hovered === e.b
          return (
            <line
              key={`${e.a}-${e.b}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={highlighted ? 'var(--color-intent-primary-bg)' : 'var(--color-border-default)'}
              strokeWidth={Math.max(1, e.weight * 1.5)}
              opacity={hovered && !highlighted ? 0.2 : 0.9}
            />
          )
        })}
        {nodes.map(n => {
          const p = positions[n.id]
          if (!p) return null
          const r = 12 + n.degree * 6
          const isHovered = hovered === n.id
          return (
            <g
              key={n.id}
              transform={`translate(${p.x},${p.y})`}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                r={r}
                fill={isHovered ? 'var(--color-intent-primary-bg)' : 'var(--color-surface-raised)'}
                stroke={isHovered ? 'var(--color-intent-primary-bg)' : 'var(--color-border-default)'}
                strokeWidth={2}
                opacity={hovered && !isHovered ? 0.4 : 1}
              />
              <text
                textAnchor="middle"
                dy="0.32em"
                fontSize={11}
                fill={isHovered ? 'var(--color-intent-primary-text)' : 'var(--color-content-primary)'}
              >
                {n.id}
              </text>
            </g>
          )
        })}
      </svg>
      <aside className="viz-graph__side">
        <h3>Component</h3>
        {hovered ? (
          <>
            <p className="viz-graph__label">{hovered}</p>
            <p className="viz-graph__meta">{hoveredTests.length} test{hoveredTests.length === 1 ? '' : 's'}</p>
            <ul className="viz-graph__list">
              {hoveredTests.map(t => {
                const r = results[t.id]
                const status = r ? (r.passed ? 'passed' : 'failed') : 'idle'
                return (
                  <li key={t.id} className={`viz-graph__test viz-graph__test--${status}`}>
                    {t.name}
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <p className="viz-graph__hint">Hover a node to see tests it participates in. Node radius grows with the number of tests; edge thickness with co-usage frequency.</p>
        )}
      </aside>
    </div>
  )
}

function buildGraph() {
  const ids = involvedComponentIds()
  const degree = new Map<string, number>()
  for (const t of INTEGRATION_TESTS) for (const c of t.components) {
    degree.set(c, (degree.get(c) ?? 0) + 1)
  }

  const cx = WIDTH / 2
  const cy = HEIGHT / 2
  const radius = Math.min(WIDTH, HEIGHT) / 2.6
  const nodes: Node[] = ids.map((id, i) => {
    const angle = (i / ids.length) * Math.PI * 2
    return {
      id,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      vx: 0,
      vy: 0,
      degree: degree.get(id) ?? 0,
    }
  })

  const edgeMap = new Map<string, Edge>()
  for (const t of INTEGRATION_TESTS) {
    for (let i = 0; i < t.components.length; i++) {
      for (let j = i + 1; j < t.components.length; j++) {
        const [a, b] = [t.components[i], t.components[j]].sort()
        const key = `${a}|${b}`
        const existing = edgeMap.get(key)
        if (existing) existing.weight += 1
        else edgeMap.set(key, { a, b, weight: 1 })
      }
    }
  }

  return { nodes, edges: Array.from(edgeMap.values()) }
}

function simulateForces(
  nodes: Node[],
  edges: Edge[],
  onTick: (positions: Record<string, { x: number; y: number }>) => void,
) {
  const REPULSION = 8000
  const SPRING = 0.04
  const SPRING_LEN = 140
  const CENTER = 0.005
  const FRICTION = 0.82
  const MAX_TICKS = 200

  let raf = 0
  let tick = 0

  const step = () => {
    tick++
    for (const n of nodes) {
      let fx = 0
      let fy = 0
      // repulsion
      for (const m of nodes) {
        if (m === n) continue
        const dx = n.x - m.x
        const dy = n.y - m.y
        const d2 = Math.max(50, dx * dx + dy * dy)
        const f = REPULSION / d2
        fx += (dx / Math.sqrt(d2)) * f
        fy += (dy / Math.sqrt(d2)) * f
      }
      // centering
      fx += (WIDTH / 2 - n.x) * CENTER
      fy += (HEIGHT / 2 - n.y) * CENTER
      n.vx = (n.vx + fx) * FRICTION
      n.vy = (n.vy + fy) * FRICTION
    }
    // springs
    for (const e of edges) {
      const a = nodes.find(n => n.id === e.a)
      const b = nodes.find(n => n.id === e.b)
      if (!a || !b) continue
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const offset = dist - SPRING_LEN
      const fx = (dx / dist) * offset * SPRING
      const fy = (dy / dist) * offset * SPRING
      a.vx += fx
      a.vy += fy
      b.vx -= fx
      b.vy -= fy
    }
    for (const n of nodes) {
      n.x = Math.max(PAD, Math.min(WIDTH - PAD, n.x + n.vx))
      n.y = Math.max(PAD, Math.min(HEIGHT - PAD, n.y + n.vy))
    }
    const positions: Record<string, { x: number; y: number }> = {}
    for (const n of nodes) positions[n.id] = { x: n.x, y: n.y }
    onTick(positions)
    if (tick < MAX_TICKS) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)

  return { stop: () => cancelAnimationFrame(raf) }
}
