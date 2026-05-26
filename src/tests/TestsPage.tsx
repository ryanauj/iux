import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { readHash, replaceParams, useHashLocation } from '../apps/router'
import { Segmented } from '../components/Segmented/Segmented'
import { PaletteRoot } from '../theme/PaletteRoot'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
import { buildPaletteField, useSelectedStyle } from '../lib/persistedStyle'
import { CoverageViz } from './visualizations/CoverageViz'
import { TestsViz } from './visualizations/TestsViz'
import './visualizations/viz.css'
import { INTEGRATION_TESTS } from './registry'
import { runTest, type RunOptions } from './runner'
import type { RunResult } from './types'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../components/AppShell/navLinks'
import { useNavLayout } from '../components/AppShell/navLayouts'

export type VizId = 'tests' | 'coverage'

export type RunFor = (
  id: string,
  mountEl: HTMLElement,
  opts?: RunOptions,
) => Promise<RunResult | undefined>

const VIZ_OPTIONS: { value: VizId; label: string; hint: string }[] = [
  { value: 'tests', label: 'Tests', hint: 'Browse tests as cards — click Run to expand a card into a live workbench with sandbox and stepped playback' },
  { value: 'coverage', label: 'Coverage', hint: 'See which components each test exercises, as a table or as a network graph' },
]

const VIZ_VALUES: VizId[] = VIZ_OPTIONS.map(v => v.value)
const DEFAULT_VIZ: VizId = 'tests'
const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

const isVizId = (v: string): v is VizId => (VIZ_VALUES as string[]).includes(v)

export function TestsPage() {
  const location = useHashLocation()
  const vizRaw = location.params.get('viz') ?? ''
  const viz: VizId = isVizId(vizRaw) ? vizRaw : DEFAULT_VIZ
  // Read autorun once on first mount so we don't re-trigger on every hash change.
  const autorunOnMount = useMemo(() => readHash().params.get('autorun') === '1', [])

  const [results, setResults] = useState<Record<string, RunResult>>({})
  const [runningId, setRunningId] = useState<string | null>(null)
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

  // URL wins on a fresh visit (pasted permalink); the site-wide
  // persisted style is the fallback so navigating in from Stories /
  // Apps / Quiz / Engine guides keeps the same look without depending
  // on the hash carrying `?palette=`.
  const paletteParam = location.params.get('palette')
  const paletteId: PaletteId =
    paletteParam && (PALETTE_IDS as string[]).includes(paletteParam)
      ? (paletteParam as PaletteId)
      : selectedStyle

  // Seed the persisted store from the URL on first mount so a pasted
  // permalink wins over the user's previous selection.
  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (paletteParam && paletteId !== selectedStyle) {
      setSelectedStyle(paletteId)
    }
  }

  const setViz = useCallback((next: VizId) => {
    replaceParams({ viz: next === DEFAULT_VIZ ? undefined : next })
  }, [])

  const handlePaletteChange = (next: string) => {
    if ((PALETTE_IDS as string[]).includes(next)) {
      setSelectedStyle(next as PaletteId)
    }
    replaceParams({ palette: next })
  }

  // Each viz mounts the test composition into its own DOM ref and then asks
  // TestsPage to drive a run against that ref. This keeps run state shared
  // while letting the focused-card workbench keep its sandbox visible.
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

  const palette = palettes[paletteId]
  const activeHint = VIZ_OPTIONS.find(v => v.value === viz)?.hint
  const [navLayout] = useNavLayout()

  const fields: Field[] = [
    buildPaletteField(paletteId, handlePaletteChange),
  ]

  const brand = (
    <h1 className="iux-tests__title">iux — integration tests</h1>
  )

  return (
    <PaletteRoot palette={palette} as="section" motionScale={1}>
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="tests"
      >
        <div className="iux-tests">
          <header className="iux-tests__header">
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
            {viz === 'tests' && <TestsViz results={results} runningId={runningId} runFor={runFor} />}
            {viz === 'coverage' && <CoverageViz results={results} runningId={runningId} runFor={runFor} />}
          </div>

          <div ref={autorunRef} className="iux-tests__sandbox iux-tests__sandbox--offscreen" aria-hidden="true">
            {autorunTest && <div key={autorunTest.id}>{autorunTest.render()}</div>}
          </div>
        </div>
      </AppShell>
      <DraggableControls
        style={controlsStyle}
        onStyleChange={setControlsStyle}
        fields={fields}
      />
    </PaletteRoot>
  )
}
