import { useRef, useState } from 'react'
import { INTEGRATION_TESTS } from '../registry'
import type { RunFor } from '../TestsPage'
import type { RunResult, StepResult } from '../types'
import { describeStep } from './CardsViz'

interface Props {
  results: Record<string, RunResult>
  runningId: string | null
  runFor: RunFor
}

export function RunnerViz({ results, runningId, runFor }: Props) {
  const [selectedId, setSelectedId] = useState<string>(INTEGRATION_TESTS[0].id)
  const [stepDelayMs, setStepDelayMs] = useState(300)
  const [live, setLive] = useState<StepResult[] | null>(null)
  const [mountKey, setMountKey] = useState(0)
  const sandboxRef = useRef<HTMLDivElement>(null)

  const selected = INTEGRATION_TESTS.find(t => t.id === selectedId)!

  const handleRun = async (id: string) => {
    setSelectedId(id)
    setMountKey(k => k + 1)
    setLive(null)
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
    if (!sandboxRef.current) return
    const test = INTEGRATION_TESTS.find(t => t.id === id)!
    const stream: StepResult[] = test.steps.map(s => ({ step: s, status: 'pending' as const }))
    setLive([...stream])
    await runFor(id, sandboxRef.current, {
      stepDelayMs,
      onStep: (i, r) => {
        stream[i] = r
        setLive([...stream])
      },
    })
  }

  const handleRunAll = async () => {
    for (const t of INTEGRATION_TESTS) {
      if (runningId) break
      await handleRun(t.id)
    }
  }

  const stepsToShow: StepResult[] = live ?? (results[selectedId]?.steps ?? selected.steps.map(s => ({ step: s, status: 'pending' as const })))

  return (
    <div className="viz-runner">
      <aside className="viz-runner__list">
        <div className="viz-runner__toolbar">
          <button type="button" className="viz-btn viz-btn--primary" disabled={!!runningId} onClick={handleRunAll}>
            ▶ Run all
          </button>
          <label className="viz-runner__delay">
            delay
            <input
              type="range"
              min={0}
              max={1000}
              step={50}
              value={stepDelayMs}
              onChange={e => setStepDelayMs(Number(e.target.value))}
              disabled={!!runningId}
            />
            <span>{stepDelayMs}ms</span>
          </label>
        </div>
        <ul className="viz-runner__tests">
          {INTEGRATION_TESTS.map(t => {
            const r = results[t.id]
            const status = runningId === t.id ? 'running' : r ? (r.passed ? 'passed' : 'failed') : 'idle'
            return (
              <li key={t.id}>
                <button
                  type="button"
                  className={[
                    'viz-runner__test',
                    selectedId === t.id && 'is-selected',
                  ].filter(Boolean).join(' ')}
                  onClick={() => { setSelectedId(t.id); setLive(null); setMountKey(k => k + 1) }}
                >
                  <span className={`viz-runner__dot viz-runner__dot--${status}`} aria-hidden="true" />
                  <span className="viz-runner__test-name">{t.name}</span>
                </button>
                <button
                  type="button"
                  className="viz-btn viz-btn--mini"
                  disabled={!!runningId}
                  onClick={() => handleRun(t.id)}
                  aria-label={`Run ${t.name}`}
                >
                  ▶
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      <section className="viz-runner__stage">
        <div className="viz-runner__stage-head">
          <h3 className="viz-runner__stage-title">{selected.name}</h3>
          <span className="viz-runner__stage-meta">{selected.components.join(' · ')}</span>
        </div>
        <div ref={sandboxRef} className="iux-tests__sandbox iux-tests__sandbox--live">
          <div key={mountKey}>{selected.render()}</div>
        </div>
      </section>

      <section className="viz-runner__steps">
        <h4 className="viz-runner__steps-title">Steps</h4>
        <ol>
          {stepsToShow.map((sr, i) => (
            <li key={i} className={`viz-step viz-step--${sr.status}`}>
              <span className="viz-step__num">{i + 1}</span>
              <span className="viz-step__kind">{sr.step.kind}</span>
              <span className="viz-step__label">{sr.step.label ?? describeStep(sr.step, i)}</span>
              {sr.ms !== undefined && sr.status !== 'pending' && (
                <span className="viz-step__ms">{Math.round(sr.ms)}ms</span>
              )}
              {sr.error && <span className="viz-step__error">{sr.error}</span>}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
