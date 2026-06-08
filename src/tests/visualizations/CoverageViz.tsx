// ABOUTME: Coverage visualization for the integration test suite: renders a component × test matrix table (with per-row run buttons and a failure summary) and a force-directed network graph of component co-usage, toggled by a pill segmented control; reads INTEGRATION_TESTS and involvedComponentIds from the registry.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Segmented } from '../../components/Segmented/Segmented'
import { INTEGRATION_TESTS, involvedComponentIds } from '../registry'
import type { RunFor } from '../TestsPage'
import type { IntegrationTest, RunResult } from '../types'

// ABOUTME: Props shared by CoverageViz: the accumulated result map, the currently running test id (or null), and the runFor callback to trigger execution against an offscreen sandbox.
interface Props {
  results: Record<string, RunResult>
  runningId: string | null
  runFor: RunFor
}

// ABOUTME: Discriminated union for the two sub-views inside CoverageViz: 'table' (matrix grid) or 'network' (force-directed graph).
type Mode = 'table' | 'network'
// ABOUTME: Per-test run status used to drive CSS modifiers and glyph icons throughout the coverage views.
type Status = 'idle' | 'running' | 'passed' | 'failed'

// ABOUTME: Root component that owns the coverage view: switches between TableMode (matrix of test rows × component columns with run-status glyphs) and NetworkMode (force-directed SVG of component co-usage), and runs tests against an offscreen sandbox div via the runFor callback from TestsPage.
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

      {mode === 'table' && (
        <FailureSummary results={results} />
      )}

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

// ABOUTME: Renders the component × test matrix as an HTML table with per-column hover highlighting, per-row run-status glyphs, and an inline run button for each test row.
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
            <th className="viz-matrix__corner" scope="col">test &nbsp;/&nbsp; component</th>
            {components.map(c => {
              const isSelected = selected === c
              return (
                <th
                  key={c}
                  scope="col"
                  className={[
                    'viz-matrix__col-head',
                    isSelected && 'is-selected',
                  ].filter(Boolean).join(' ')}
                  onMouseEnter={() => onSelect(c)}
                  onMouseLeave={() => onSelect(null)}
                >
                  <span className="viz-matrix__col-label" title={c}>{c}</span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {INTEGRATION_TESTS.map(t => {
            const status = statusFor(t.id)
            return (
              <tr key={t.id} id={`test-row-${t.id}`} className={`viz-matrix__row viz-matrix__row--${status}`}>
                <th scope="row" className="viz-matrix__row-head">
                  <div className="viz-matrix__row-head-inner">
                    <span
                      className={`viz-matrix__row-status viz-matrix__row-status--${status}`}
                      aria-hidden="true"
                    >
                      <CellGlyph status={status} />
                    </span>
                    <span className="viz-matrix__row-name" title={t.name}>{t.id}</span>
                    <button
                      type="button"
                      className="viz-matrix__row-run"
                      onClick={() => onRun(t.id)}
                      disabled={!!runningId}
                      aria-label={`Run ${t.name}`}
                      title={`Run ${t.id}`}
                    >
                      ▶
                    </button>
                  </div>
                </th>
                {components.map(c => {
                  const participates = t.components.includes(c)
                  const isSelected = selected === c
                  return (
                    <td
                      key={c}
                      className={[
                        'viz-matrix__cell',
                        participates && `viz-matrix__cell--${status}`,
                        isSelected && participates && 'viz-matrix__cell--highlight',
                        isSelected && 'viz-matrix__cell--in-selected-col',
                      ].filter(Boolean).join(' ')}
                      aria-label={participates ? `${t.id} uses ${c}: ${status}` : `${t.id} does not use ${c}`}
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

// ABOUTME: Renders the status glyph (✓, ✗, spinning dot, or ·) shown inside each matrix cell and in the row-head status indicator.
function CellGlyph({ status }: { status: Status }) {
  if (status === 'passed') return <span aria-hidden="true">✓</span>
  if (status === 'failed') return <span aria-hidden="true">✗</span>
  if (status === 'running') return <span aria-hidden="true" className="viz-matrix__spinner">●</span>
  return <span aria-hidden="true">·</span>
}

// ABOUTME: Banner listing failed test ids as clickable chips that scroll-and-flash their row in the matrix table; hidden when no tests have failed.
function FailureSummary({ results }: { results: Record<string, RunResult> }) {
  const scrollToRow = useCallback((testId: string) => {
    const el = document.getElementById(`test-row-${testId}`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('viz-matrix__row--flash')
    setTimeout(() => el.classList.remove('viz-matrix__row--flash'), 1200)
  }, [])

  const failed = useMemo(
    () => INTEGRATION_TESTS.filter(t => results[t.id] && !results[t.id].passed),
    [results],
  )
  if (failed.length === 0) return null
  return (
    <div className="viz-matrix__failures" role="status">
      <span className="viz-matrix__failures-count">
        {failed.length} failed
      </span>
      <ul className="viz-matrix__failures-list">
        {failed.map(t => (
          <li key={t.id}>
            <button
              type="button"
              className="viz-matrix__failures-chip"
              onClick={() => scrollToRow(t.id)}
              title={t.name}
            >
              {t.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ABOUTME: Tiny color dot used in the toolbar legend to illustrate each run-status color.
function LegendDot({ status }: { status: Status }) {
  return <span className={`viz-matrix__legend-dot viz-matrix__cell--${status}`} aria-hidden="true" />
}

/* --------------------------------- Network -------------------------------- */

// ABOUTME: Mutable node record used in the force simulation: tracks position, velocity, and degree (test-participation count) for each component.
interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  degree: number
}

// ABOUTME: Weighted edge between two component nodes in the network graph; weight counts how many tests co-exercise both components.
interface Edge {
  a: string
  b: string
  weight: number
}

// ABOUTME: SVG canvas width in pixels for the force-directed network graph.
const WIDTH = 720
// ABOUTME: SVG canvas height in pixels for the force-directed network graph.
const HEIGHT = 480
// ABOUTME: Minimum margin in pixels keeping nodes away from the SVG edges during force simulation.
const PAD = 40

// ABOUTME: Renders the force-directed SVG graph of component co-usage: nodes sized by degree, edges weighted by co-test count, with hover highlighting and a self-stopping simulation.
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

// ABOUTME: Derives node and edge data from INTEGRATION_TESTS: places nodes in a circle, computes per-component degree, and counts co-usage edges between component pairs.
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

// ABOUTME: Runs a rAF-based force simulation (repulsion + spring + centering + friction) for up to 200 ticks, calling onTick after each frame; returns a stop handle to cancel the loop.
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

// ABOUTME: Aside panel listing the tests that include the hovered/selected component, with per-test run buttons; shows a hint prompt when nothing is selected.
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
          Hover a component column (in Table) or node (in Network) to see the tests it participates in.
          Click ▶ next to any test row to run it, or use “Run all” above.
        </p>
      )}
    </aside>
  )
}
