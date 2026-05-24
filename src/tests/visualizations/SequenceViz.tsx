import { INTEGRATION_TESTS } from '../registry'
import type { IntegrationTest, RunResult, Step } from '../types'

interface Props {
  results: Record<string, RunResult>
}

export function SequenceViz({ results }: Props) {
  return (
    <div className="viz-sequence">
      {INTEGRATION_TESTS.map(test => (
        <TestStrip key={test.id} test={test} result={results[test.id]} />
      ))}
    </div>
  )
}

function TestStrip({ test, result }: { test: IntegrationTest; result: RunResult | undefined }) {
  return (
    <section className="viz-sequence__row showcase-card">
      <header className="viz-sequence__head">
        <h3 className="viz-sequence__title showcase-card__title">{test.name}</h3>
        <div className="viz-card__chips">
          {test.components.map(c => (
            <span key={c} className="viz-chip">{c}</span>
          ))}
        </div>
      </header>
      <ol className="viz-sequence__strip" aria-label="Steps">
        {test.steps.map((s, i) => {
          const r = result?.steps[i]
          return (
            <li key={i} className={`viz-bubble viz-bubble--${r?.status ?? 'pending'}`}>
              <span className="viz-bubble__icon" aria-hidden="true">{stepIcon(s)}</span>
              <span className="viz-bubble__kind">{s.kind}</span>
              <span className="viz-bubble__detail">{s.label ?? defaultLabel(s)}</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function stepIcon(s: Step): string {
  switch (s.kind) {
    case 'click': return '▶'
    case 'type': return '⌨'
    case 'press': return '⏎'
    case 'waitFor': return '⏱'
    case 'assertVisible': return '👁'
    case 'assertText': return '✎'
    case 'assertCount': return '#'
    case 'assertGone': return '∅'
  }
}

function defaultLabel(s: Step): string {
  switch (s.kind) {
    case 'click': return s.selector
    case 'type': return `"${s.text}"`
    case 'press': return s.key
    case 'waitFor': return s.selector
    case 'assertVisible': return s.selector
    case 'assertText': return `"${s.text}"`
    case 'assertCount': return `${s.count}× ${s.selector}`
    case 'assertGone': return s.selector
  }
}
