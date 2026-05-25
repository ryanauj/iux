import { useRef, useState } from 'react'
import { Segmented } from '../../components/Segmented/Segmented'
import { INTEGRATION_TESTS } from '../registry'
import type { RunFor } from '../TestsPage'
import type { IntegrationTest, RunResult } from '../types'
import { bubbleLabel, describeStep, stepIcon } from './step-format'

interface Props {
  results: Record<string, RunResult>
  runningId: string | null
  runFor: RunFor
}

type Density = 'storyboard' | 'compact'
type Status = 'idle' | 'running' | 'passed' | 'failed'

export function TestsViz({ results, runningId, runFor }: Props) {
  const [density, setDensity] = useState<Density>('storyboard')
  const [mountedTestId, setMountedTestId] = useState<string | null>(null)
  const [mountKey, setMountKey] = useState(0)
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
    <div className="viz-tests">
      <div className="viz-tests__toolbar">
        <button
          type="button"
          className="viz-btn viz-btn--primary"
          onClick={handleRunAll}
          disabled={!!runningId}
        >
          ▶ Run all
        </button>
        <Segmented
          variant="pill"
          size="sm"
          ariaLabel="Step density"
          value={density}
          onValueChange={v => setDensity(v as Density)}
          items={[
            { value: 'storyboard', label: 'Storyboard' },
            { value: 'compact', label: 'Compact' },
          ]}
        />
      </div>
      <div className="viz-cards">
        {INTEGRATION_TESTS.map(test => (
          <TestCard
            key={test.id}
            test={test}
            result={results[test.id]}
            running={runningId === test.id}
            density={density}
            onRun={() => handleRun(test.id)}
          />
        ))}
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

function TestCard({
  test,
  result,
  running,
  density,
  onRun,
}: {
  test: IntegrationTest
  result: RunResult | undefined
  running: boolean
  density: Density
  onRun: () => void
}) {
  const status: Status = running ? 'running' : result ? (result.passed ? 'passed' : 'failed') : 'idle'
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
          onClick={onRun}
        >
          {running ? 'Running…' : '▶ Run'}
        </button>
        <span className="viz-card__stepcount">{test.steps.length} steps</span>
      </div>
      {density === 'storyboard'
        ? <StoryboardStrip test={test} result={result} />
        : <CompactSteps test={test} result={result} />
      }
    </article>
  )
}

function StoryboardStrip({ test, result }: { test: IntegrationTest; result: RunResult | undefined }) {
  return (
    <ol className="viz-sequence__strip" aria-label="Steps">
      {test.steps.map((s, i) => {
        const r = result?.steps[i]
        return (
          <li key={i} className={`viz-bubble viz-bubble--${r?.status ?? 'pending'}`}>
            <span className="viz-bubble__icon" aria-hidden="true">{stepIcon(s)}</span>
            <span className="viz-bubble__kind">{s.kind}</span>
            <span className="viz-bubble__detail">{s.label ?? bubbleLabel(s)}</span>
          </li>
        )
      })}
    </ol>
  )
}

function CompactSteps({ test, result }: { test: IntegrationTest; result: RunResult | undefined }) {
  return (
    <ol className="viz-card__steps">
      {test.steps.map((s, i) => {
        const r = result?.steps[i]
        return (
          <li key={i} className={`viz-step viz-step--${r?.status ?? 'pending'}`}>
            <span className="viz-step__num">{i + 1}</span>
            <span className="viz-step__kind">{s.kind}</span>
            <span className="viz-step__label">{s.label ?? describeStep(s)}</span>
            {r?.error && <span className="viz-step__error">{r.error}</span>}
          </li>
        )
      })}
    </ol>
  )
}

function StatusPill({ status }: { status: Status }) {
  const label = status === 'idle' ? 'Not run' : status[0].toUpperCase() + status.slice(1)
  return <span className={`viz-pill viz-pill--${status}`}>{label}</span>
}
