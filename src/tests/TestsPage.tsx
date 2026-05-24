import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { readHash, replaceParams, useHashLocation } from '../apps/router'
import { Segmented } from '../components/Segmented/Segmented'
import { PaletteRoot } from '../theme/PaletteRoot'
import { CardsViz } from './visualizations/CardsViz'
import { GraphViz } from './visualizations/GraphViz'
import { MatrixViz } from './visualizations/MatrixViz'
import { RunnerViz } from './visualizations/RunnerViz'
import { SequenceViz } from './visualizations/SequenceViz'
import './visualizations/viz.css'
import { INTEGRATION_TESTS } from './registry'
import { runTest, type RunOptions } from './runner'
import type { RunResult } from './types'

export type VizId = 'cards' | 'matrix' | 'graph' | 'sequence' | 'runner'

export type RunFor = (
  id: string,
  mountEl: HTMLElement,
  opts?: RunOptions,
) => Promise<RunResult | undefined>

const VIZ_OPTIONS: { value: VizId; label: string; hint: string }[] = [
  { value: 'cards', label: 'Cards', hint: 'Browse tests as cards with run buttons' },
  { value: 'matrix', label: 'Matrix', hint: 'Coverage heatmap: components × tests' },
  { value: 'graph', label: 'Graph', hint: 'Component co-usage network' },
  { value: 'sequence', label: 'Sequence', hint: 'Step-by-step storyboards' },
  { value: 'runner', label: 'Runner', hint: 'Watch tests execute live' },
]

const VIZ_VALUES: VizId[] = VIZ_OPTIONS.map(v => v.value)
const DEFAULT_VIZ: VizId = 'cards'
const DEFAULT_PALETTE: PaletteId = 'flat-classic'

const isVizId = (v: string): v is VizId => (VIZ_VALUES as string[]).includes(v)

export function TestsPage() {
  const location = useHashLocation()
  const vizRaw = location.params.get('viz') ?? ''
  const viz: VizId = isVizId(vizRaw) ? vizRaw : DEFAULT_VIZ
  // Read autorun once on first mount so we don't re-trigger on every hash change.
  const autorunOnMount = useMemo(() => readHash().params.get('autorun') === '1', [])

  const [results, setResults] = useState<Record<string, RunResult>>({})
  const [runningId, setRunningId] = useState<string | null>(null)

  const setViz = useCallback((next: VizId) => {
    replaceParams({ viz: next === DEFAULT_VIZ ? undefined : next })
  }, [])

  // Each viz mounts the test composition into its own DOM ref and then asks
  // TestsPage to drive a run against that ref. This keeps run state shared
  // while letting RunnerViz keep its sandbox visible for step-by-step display.
  const runFor: RunFor = useCallback(async (id, mountEl, opts) => {
    const test = INTEGRATION_TESTS.find(t => t.id === id)
    if (!test) return undefined
    setRunningId(id)
    try {
      const result = await runTest(test, mountEl, opts)
      setResults(prev => ({ ...prev, [id]: result }))
      return result
    } finally {
      setRunningId(null)
    }
  }, [])

  // ----- autorun hook for CI / Playwright -----
  const autorunRef = useRef<HTMLDivElement>(null)
  const [autorunTestId, setAutorunTestId] = useState<string | null>(null)
  useEffect(() => {
    if (!autorunOnMount) return
    let cancelled = false
    delete document.body.dataset.iuxRunComplete
    ;(async () => {
      const all: RunResult[] = []
      for (const test of INTEGRATION_TESTS) {
        if (cancelled) return
        setAutorunTestId(test.id)
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
        if (!autorunRef.current) continue
        const r = await runTest(test, autorunRef.current)
        all.push(r)
        setResults(prev => ({ ...prev, [test.id]: r }))
      }
      if (cancelled) return
      setAutorunTestId(null)
      ;(window as unknown as { __iuxTestResults: RunResult[] }).__iuxTestResults = all
      document.body.dataset.iuxRunComplete = 'true'
    })()
    return () => {
      cancelled = true
    }
  }, [autorunOnMount])

  const autorunTest = autorunTestId
    ? INTEGRATION_TESTS.find(t => t.id === autorunTestId)
    : null

  const palette = palettes[DEFAULT_PALETTE]
  const activeHint = VIZ_OPTIONS.find(v => v.value === viz)?.hint

  return (
    <PaletteRoot palette={palette} as="section" motionScale={1}>
      <main className="iux-tests">
        <header className="iux-tests__header">
          <div className="iux-tests__title-row">
            <h1 className="iux-tests__title">iux — integration tests</h1>
            <a className="stories__apps-link" href="#/">← back to stories</a>
          </div>
          <div className="iux-tests__chrome">
            <Segmented
              variant="pill"
              size="md"
              ariaLabel="Visualization"
              value={viz}
              onValueChange={v => setViz(v as VizId)}
              items={VIZ_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
            />
            {activeHint && <p className="iux-tests__hint">{activeHint}</p>}
          </div>
        </header>

        <div className="iux-tests__viz">
          {viz === 'cards' && <CardsViz results={results} runningId={runningId} runFor={runFor} />}
          {viz === 'matrix' && <MatrixViz results={results} runningId={runningId} runFor={runFor} />}
          {viz === 'graph' && <GraphViz results={results} />}
          {viz === 'sequence' && <SequenceViz results={results} />}
          {viz === 'runner' && <RunnerViz results={results} runningId={runningId} runFor={runFor} />}
        </div>

        <div ref={autorunRef} className="iux-tests__sandbox iux-tests__sandbox--offscreen" aria-hidden="true">
          {autorunTest && <div key={autorunTest.id}>{autorunTest.render()}</div>}
        </div>
      </main>
    </PaletteRoot>
  )
}
