import { useRef, useState } from 'react'
import { INTEGRATION_TESTS, involvedComponentIds } from '../registry'
import type { RunFor } from '../TestsPage'
import type { RunResult } from '../types'

interface Props {
  results: Record<string, RunResult>
  runningId: string | null
  runFor: RunFor
}

export function MatrixViz({ results, runningId, runFor }: Props) {
  const components = involvedComponentIds()
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

  const mountedTest = mountedTestId
    ? INTEGRATION_TESTS.find(t => t.id === mountedTestId)
    : null

  return (
    <div className="viz-matrix">
      <div className="viz-matrix__toolbar">
        <button type="button" className="viz-btn viz-btn--primary" onClick={handleRunAll} disabled={!!runningId}>
          ▶ Run all
        </button>
        <span className="viz-matrix__legend">
          <LegendDot status="passed" /> passed
          <LegendDot status="failed" /> failed
          <LegendDot status="running" /> running
          <LegendDot status="idle" /> not run
        </span>
      </div>
      <div className="viz-matrix__table-wrap">
        <table className="viz-matrix__table">
          <thead>
            <tr>
              <th className="viz-matrix__corner" scope="col">component &nbsp;/&nbsp; test</th>
              {INTEGRATION_TESTS.map(t => {
                const status = runningId === t.id ? 'running'
                  : results[t.id] ? (results[t.id].passed ? 'passed' : 'failed')
                  : 'idle'
                return (
                  <th key={t.id} scope="col" className="viz-matrix__col-head">
                    <button
                      type="button"
                      className="viz-matrix__col-btn"
                      title={t.name}
                      onClick={() => handleRun(t.id)}
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
            {components.map(c => (
              <tr key={c}>
                <th scope="row" className="viz-matrix__row-head">{c}</th>
                {INTEGRATION_TESTS.map(t => {
                  const participates = t.components.includes(c)
                  const status = runningId === t.id ? 'running'
                    : results[t.id] ? (results[t.id].passed ? 'passed' : 'failed')
                    : 'idle'
                  return (
                    <td
                      key={t.id}
                      className={[
                        'viz-matrix__cell',
                        participates && `viz-matrix__cell--${status}`,
                      ].filter(Boolean).join(' ')}
                      aria-label={participates ? `${c} in ${t.id}: ${status}` : `${c} not in ${t.id}`}
                    >
                      {participates && <CellGlyph status={status} />}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div ref={sandboxRef} className="iux-tests__sandbox iux-tests__sandbox--offscreen" aria-hidden="true">
        {mountedTest && <div key={mountKey}>{mountedTest.render()}</div>}
      </div>
    </div>
  )
}

function CellGlyph({ status }: { status: 'idle' | 'running' | 'passed' | 'failed' }) {
  if (status === 'passed') return <span aria-hidden="true">✓</span>
  if (status === 'failed') return <span aria-hidden="true">✗</span>
  if (status === 'running') return <span aria-hidden="true" className="viz-matrix__spinner">●</span>
  return <span aria-hidden="true">·</span>
}

function LegendDot({ status }: { status: 'idle' | 'running' | 'passed' | 'failed' }) {
  return <span className={`viz-matrix__legend-dot viz-matrix__cell--${status}`} aria-hidden="true" />
}
