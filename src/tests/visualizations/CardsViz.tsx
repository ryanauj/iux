import { useRef, useState } from 'react'
import { INTEGRATION_TESTS } from '../registry'
import type { RunFor } from '../TestsPage'
import type { IntegrationTest, RunResult, StepResult } from '../types'

interface Props {
  results: Record<string, RunResult>
  runningId: string | null
  runFor: RunFor
}

export function CardsViz({ results, runningId, runFor }: Props) {
  return (
    <div className="viz-cards">
      {INTEGRATION_TESTS.map(test => (
        <TestCard
          key={test.id}
          test={test}
          result={results[test.id]}
          running={runningId === test.id}
          runFor={runFor}
        />
      ))}
    </div>
  )
}

function TestCard({
  test,
  result,
  running,
  runFor,
}: {
  test: IntegrationTest
  result: RunResult | undefined
  running: boolean
  runFor: RunFor
}) {
  const [open, setOpen] = useState(false)
  const [mountKey, setMountKey] = useState(0)
  const mountRef = useRef<HTMLDivElement>(null)

  const handleRun = async () => {
    setMountKey(k => k + 1)
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
    if (mountRef.current) await runFor(test.id, mountRef.current)
  }

  const status = running ? 'running' : result ? (result.passed ? 'passed' : 'failed') : 'idle'

  return (
    <article className="viz-card showcase-card">
      <header className="viz-card__head">
        <h3 className="viz-card__title showcase-card__title">{test.name}</h3>
        <StatusPill status={status} />
      </header>
      <p className="viz-card__desc">{test.description}</p>
      <div className="viz-card__chips">
        {test.components.map(c => (
          <span key={c} className="viz-chip">{c}</span>
        ))}
      </div>
      <div className="viz-card__actions">
        <button
          type="button"
          className="viz-btn viz-btn--primary"
          disabled={running}
          onClick={handleRun}
        >
          {running ? 'Running…' : '▶ Run'}
        </button>
        <button
          type="button"
          className="viz-btn"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          {open ? 'Hide steps' : `Show ${test.steps.length} steps`}
        </button>
      </div>
      {open && (
        <ol className="viz-card__steps">
          {test.steps.map((s, i) => {
            const r = result?.steps[i]
            return (
              <li key={i} className={`viz-step viz-step--${r?.status ?? 'pending'}`}>
                <span className="viz-step__num">{i + 1}</span>
                <span className="viz-step__kind">{s.kind}</span>
                <span className="viz-step__label">{s.label ?? describeStep(s, i)}</span>
                {r?.error && <span className="viz-step__error">{r.error}</span>}
              </li>
            )
          })}
        </ol>
      )}
      <div ref={mountRef} className="iux-tests__sandbox iux-tests__sandbox--offscreen" aria-hidden="true">
        <div key={mountKey}>{test.render()}</div>
      </div>
    </article>
  )
}

function StatusPill({ status }: { status: 'idle' | 'running' | 'passed' | 'failed' }) {
  const label = status === 'idle' ? 'Not run' : status[0].toUpperCase() + status.slice(1)
  return <span className={`viz-pill viz-pill--${status}`}>{label}</span>
}

function describeStep(step: IntegrationTest['steps'][number], _i: number): string {
  switch (step.kind) {
    case 'click': return `click ${step.selector}`
    case 'type': return `type "${step.text}" → ${step.selector}`
    case 'press': return `press ${step.key}${step.modifiers ? ` (+${step.modifiers.join('+')})` : ''}`
    case 'waitFor': return `wait for ${step.selector}`
    case 'assertVisible': return `assert visible ${step.selector}`
    case 'assertText': return `assert text "${step.text}" in ${step.selector}`
    case 'assertCount': return `assert ${step.count} of ${step.selector}`
    case 'assertGone': return `assert gone ${step.selector}`
  }
}

export { describeStep }
export type { StepResult }
