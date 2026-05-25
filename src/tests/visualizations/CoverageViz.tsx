import { useEffect, useMemo, useRef, useState } from 'react'
import { Segmented } from '../../components/Segmented/Segmented'
import { INTEGRATION_TESTS, involvedComponentIds } from '../registry'
import type { RunFor } from '../TestsPage'
import type { IntegrationTest, RunResult } from '../types'

interface Props {
  results: Record<string, RunResult>
  runningId: string | null
  runFor: RunFor
}

type Mode = 'table' | 'network'
type Status = 'idle' | 'running' | 'passed' | 'failed'

export function CoverageViz({ results, runningId, runFor }: Props) {
  const [mode, setMode] = useState<Mode>('table')
  const [selected, setSelected] = useState<string | null>(null)
  const [mountKey, setMountKey] = useState(0)
  const [mountedTestId, setMountedTestId] = useState<string | null>(null)
  const sandboxRef = useRef<HTMLDivElement>(null)

  const handleRun = async (testId: string) => {
    setMountedTestId(testId)
    setMountKey(k => k + 1)
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
    if (sandboxRef.current) await runFor(testId, sandboxRef.current)
  }

  const handleRunAll = async () => {
    for (const t of INTEGRATION_TESTS) {
      if (runningId) break
      await handleRun(t.id)
    }
  }

  const statusFor = (testId: string): Status =>
    runningId === testId ? 'running'
    : results[testId] ? (results[testId].passed ? 'passed' : 'failed')
    : 'idle'

  const mountedTest = mountedTestId
    ? INTEGRATION_TESTS.find(t => t.id === mountedTestId)
    : null

  return (
    <div className="viz-coverage">
      <div className="viz-coverage__toolbar">
        <Segmented
          variant="pill"
          size="sm"
          ariaLabel="Coverage view"
          value={mode}
          onValueChange={v => setMode(v as Mode)}
          items={[
            { value: 'table', label: 'Table' },
            { value: 'network', label: 'Network' },
          ]}
        />
        <button
          type="button"
          className="viz-btn viz-btn--primary"
          onClick={handleRunAll}
          disabled={!!runningId}
        >
          ▶ Run all
        </button>
        <span className="viz-coverage__legend">
          <LegendDot status="passed" /> passed
          <LegendDot status="failed" /> failed
          <LegendDot status="running" /> running
          <LegendDot status="idle" /> not run
        </span>
      </div>

      <div className="viz-coverage__body">
        <div className="viz-coverage__stage">
          {mode === 'table' ? (
            <TableMode
              selected={selected}
              onSelect={setSelected}
              statusFor={statusFor}
              runningId={runningId}
              onRun={handleRun}
            />
          ) : (
            <NetworkMode
              selected={selected}
              onSelect={setSelected}
            />
          )}
        </div>
        <SidePanel
          selected={selected}
          statusFor={statusFor}
          runningId={runningId}
          onRun={handleRun}
        />
      </div>

      <div
        ref={sandboxRef}
        className="iux-tests__sandbox iux-tests__sandbox--offscreen"
        aria-hidden="true"
      >
        {mountedTest && <div key={mountKey}>{mountedTest.render()}</div>}
      </div>
    </div>
  )
}

/* --------------------------------- Table --------------------------------- */

function TableMode({
  selected,
  onSelect,
  statusFor,
  runningId,
  onRun,
}: {
  selected: string | null
  onSelect: (id: string | null) => void
  statusFor: (testId: string) => Status
  runningId: string | null
  onRun: (testId: string) => void
}) {
  const components = involvedComponentIds()
  return (
    <div className="viz-matrix__table-wrap">
      <table className="viz-matrix__table">
        <thead>
          <tr>
            <th className="viz-matrix__corner" scope="col">component &nbsp;/&nbsp; test</th>
            {INTEGRATION_TESTS.map(t => {
              const status = statusFor(t.id)
              return (
                <th key={t.id} scope="col" className="viz-matrix__col-head">
                  <button
                    type="button"
                    className="viz-matrix__col-btn"
                    title={t.name}
                    onClick={() => onRun(t.id)}
                    disabled={!!runningId}
                  >
                    <span className={`viz-matrix__col-status viz-matrix__col-status--${status}`} />
                    {t.id}
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {components.map(c => {
            const isSelected = selected === c
            return (
              <tr
                key={c}
                className={isSelected ? 'is-selected' : undefined}
                onMouseEnter={() => onSelect(c)}
                onMouseLeave={() => onSelect(null)}
              >
                <th scope="row" className="viz-matrix__row-head">{c}</th>
                {INTEGRATION_TESTS.map(t => {
                  const participates = t.components.includes(c)
                  const status = statusFor(t.id)
                  return (
                    <td
                      key={t.id}
                      className={[
                        'viz-matrix__cell',
                        participates && `viz-matrix__cell--${status}`,
                        isSelected && participates && 'viz-matrix__cell--highlight',
                      ].filter(Boolean).join(' ')}
                      aria-label={participates ? `${c} in ${t.id}: ${status}` : `${c} not in ${t.id}`}
                    >
                      {participates && <CellGlyph status={status} />}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function CellGlyph({ status }: { status: Status }) {
  if (status === 'passed') return <span aria-hidden="true">✓</span>
  if (status === 'failed') return <span aria-hidden="true">✗</span>
  if (status === 'running') return <span aria-hidden="true" className="viz-matrix__spinner">●</span>
  return <span aria-hidden="true">·</span>
}

function LegendDot({ status }: { status: Status }) {
  return <span className={`viz-matrix__legend-dot viz-matrix__cell--${status}`} aria-hidden="true" />
}

/* --------------------------------- Network -------------------------------- */

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  degree: number
}

interface Edge {
  a: string
  b: string
  weight: number
}

const WIDTH = 720
const HEIGHT = 480
const PAD = 40

function NetworkMode({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (id: string | null) => void
}) {
  const { nodes, edges } = useMemo(() => buildGraph(), [])
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const init: Record<string, { x: number; y: number }> = {}
    for (const n of nodes) init[n.id] = { x: n.x, y: n.y }
    return init
  })
  const positionsRef = useRef(positions)
  positionsRef.current = positions

  useEffect(() => {
    const sim = simulateForces(nodes, edges, next => {
      positionsRef.current = next
      setPositions(next)
    })
    return () => sim.stop()
  }, [nodes, edges])

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="viz-graph__svg"
      role="img"
      aria-label="Component co-usage graph"
    >
      {edges.map(e => {
        const a = positions[e.a]
        const b = positions[e.b]
        if (!a || !b) return null
        const highlighted = selected === e.a || selected === e.b
        return (
          <line
            key={`${e.a}-${e.b}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={highlighted ? 'var(--color-intent-primary-bg)' : 'var(--color-border-default)'}
            strokeWidth={Math.max(1, e.weight * 1.5)}
            opacity={selected && !highlighted ? 0.2 : 0.9}
          />
        )
      })}
      {nodes.map(n => {
        const p = positions[n.id]
        if (!p) return null
        const r = 12 + n.degree * 6
        const isSelected = selected === n.id
        return (
          <g
            key={n.id}
            transform={`translate(${p.x},${p.y})`}
            onMouseEnter={() => onSelect(n.id)}
            onMouseLeave={() => onSelect(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              r={r}
              fill={isSelected ? 'var(--color-intent-primary-bg)' : 'var(--color-surface-raised)'}
              stroke={isSelected ? 'var(--color-intent-primary-bg)' : 'var(--color-border-default)'}
              strokeWidth={2}
              opacity={selected && !isSelected ? 0.4 : 1}
            />
            <text
              textAnchor="middle"
              dy="0.32em"
              fontSize={11}
              fill={isSelected ? 'var(--color-intent-primary-content)' : 'var(--color-content-primary)'}
            >
              {n.id}
            </text>
          </g>
        )
      })}
    </svg>
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
      for (const m of nodes) {
        if (m === n) continue
        const dx = n.x - m.x
        const dy = n.y - m.y
        const d2 = Math.max(50, dx * dx + dy * dy)
        const f = REPULSION / d2
        fx += (dx / Math.sqrt(d2)) * f
        fy += (dy / Math.sqrt(d2)) * f
      }
      fx += (WIDTH / 2 - n.x) * CENTER
      fy += (HEIGHT / 2 - n.y) * CENTER
      n.vx = (n.vx + fx) * FRICTION
      n.vy = (n.vy + fy) * FRICTION
    }
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

/* -------------------------------- Side panel ------------------------------ */

function SidePanel({
  selected,
  statusFor,
  runningId,
  onRun,
}: {
  selected: string | null
  statusFor: (testId: string) => Status
  runningId: string | null
  onRun: (testId: string) => void
}) {
  const tests: IntegrationTest[] = selected
    ? INTEGRATION_TESTS.filter(t => t.components.includes(selected))
    : []

  return (
    <aside className="viz-coverage__side">
      <h3>Component</h3>
      {selected ? (
        <>
          <p className="viz-graph__label">{selected}</p>
          <p className="viz-graph__meta">{tests.length} test{tests.length === 1 ? '' : 's'}</p>
          <ul className="viz-coverage__tests">
            {tests.map(t => {
              const status = statusFor(t.id)
              return (
                <li key={t.id} className={`viz-coverage__test viz-coverage__test--${status}`}>
                  <span className="viz-coverage__test-name">{t.name}</span>
                  <button
                    type="button"
                    className="viz-btn viz-btn--mini"
                    onClick={() => onRun(t.id)}
                    disabled={!!runningId}
                    aria-label={`Run ${t.name}`}
                  >
                    ▶
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <p className="viz-graph__hint">
          Hover a component (row in Table or node in Network) to see the tests it participates in.
          Click ▶ to run a single test from here, or use “Run all” above.
        </p>
      )}
    </aside>
  )
}
