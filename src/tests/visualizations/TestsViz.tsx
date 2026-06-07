// ABOUTME: TestsViz — a React component (tests).

import { useCallback, useEffect, useRef, useState } from 'react'
import { Segmented } from '../../components/Segmented/Segmented'
import { INTEGRATION_TESTS } from '../registry'
import type { RunFor } from '../TestsPage'
import type { IntegrationTest, RunResult, StepResult } from '../types'
import { bubbleLabel, describeStep, stepIcon } from './step-format'

interface Props {
  results: Record<string, RunResult>
  runningId: string | null
  runFor: RunFor
}

type Density = 'storyboard' | 'compact'
type Status = 'idle' | 'running' | 'passed' | 'failed'
type RunAllMode = 'live' | 'fast'

interface Override {
  stepped?: boolean
  delayMs?: number
}

// ABOUTME: TestsViz — a React component.
export function TestsViz({ results, runningId, runFor }: Props) {
  const [density, setDensity] = useState<Density>('storyboard')
  const [globalStepped, setGlobalStepped] = useState(false)
  const [globalDelayMs, setGlobalDelayMs] = useState(300)
  const [runAllMode, setRunAllMode] = useState<RunAllMode>('live')
  const [overrides, setOverrides] = useState<Record<string, Override>>({})

  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [mountKey, setMountKey] = useState(0)
  const [live, setLive] = useState<StepResult[] | null>(null)
  const [pausedAt, setPausedAt] = useState<number | null>(null)

  const [offscreenTestId, setOffscreenTestId] = useState<string | null>(null)
  const [offscreenMountKey, setOffscreenMountKey] = useState(0)

  const [runAllActive, setRunAllActive] = useState(false)
  const runAllAbortRef = useRef<AbortController | null>(null)

  const focusedSandboxRef = useRef<HTMLDivElement>(null)
  const offscreenSandboxRef = useRef<HTMLDivElement>(null)
  const continueResolverRef = useRef<(() => void) | null>(null)
  const skipRestRef = useRef(false)

  const effectiveFor = useCallback(
    (id: string) => {
      const ov = overrides[id] ?? {}
      return {
        stepped: ov.stepped ?? globalStepped,
        delayMs: ov.delayMs ?? globalDelayMs,
      }
    },
    [overrides, globalStepped, globalDelayMs],
  )

  const runWithFocus = useCallback(
    async (id: string, signal?: AbortSignal) => {
      const eff = effectiveFor(id)
      setFocusedId(id)
      setMountKey(k => k + 1)
      setLive(null)
      setPausedAt(null)
      skipRestRef.current = false
      continueResolverRef.current = null
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
      if (!focusedSandboxRef.current) return
      const test = INTEGRATION_TESTS.find(t => t.id === id)
      if (!test) return
      const stream: StepResult[] = test.steps.map(s => ({ step: s, status: 'pending' }))
      setLive([...stream])
      await runFor(id, focusedSandboxRef.current, {
        stepDelayMs: eff.stepped ? 0 : eff.delayMs,
        signal,
        onStep: (i, r) => {
          stream[i] = r
          setLive([...stream])
        },
        awaitContinue: eff.stepped
          ? i =>
              new Promise<void>(resolve => {
                if (skipRestRef.current || signal?.aborted) {
                  resolve()
                  return
                }
                continueResolverRef.current = () => {
                  continueResolverRef.current = null
                  setPausedAt(null)
                  resolve()
                }
                setPausedAt(i)
              })
          : undefined,
      })
      setPausedAt(null)
      continueResolverRef.current = null
      if (!eff.stepped) {
        setFocusedId(null)
        setLive(null)
      }
    },
    [effectiveFor, runFor],
  )

  const runOffscreen = useCallback(
    async (id: string, signal?: AbortSignal) => {
      setOffscreenTestId(id)
      setOffscreenMountKey(k => k + 1)
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
      if (offscreenSandboxRef.current) await runFor(id, offscreenSandboxRef.current, { signal })
    },
    [runFor],
  )

  const handleRunAll = useCallback(async () => {
    const ac = new AbortController()
    runAllAbortRef.current = ac
    setRunAllActive(true)
    try {
      for (const t of INTEGRATION_TESTS) {
        if (ac.signal.aborted) break
        if (runAllMode === 'fast') await runOffscreen(t.id, ac.signal)
        else await runWithFocus(t.id, ac.signal)
      }
    } finally {
      setRunAllActive(false)
      runAllAbortRef.current = null
    }
  }, [runAllMode, runOffscreen, runWithFocus])

  const handleStopAll = () => {
    runAllAbortRef.current?.abort()
    skipRestRef.current = true
    continueResolverRef.current?.()
  }

  const handleNextStep = () => continueResolverRef.current?.()
  const handleRunToEnd = () => {
    skipRestRef.current = true
    continueResolverRef.current?.()
  }

  // ESC collapses the focused card when nothing is running.
  useEffect(() => {
    if (!focusedId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !runningId) {
        setFocusedId(null)
        setLive(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focusedId, runningId])

  const offscreenTest = offscreenTestId
    ? INTEGRATION_TESTS.find(t => t.id === offscreenTestId)
    : null

  return (
    <div className="viz-tests">
      <div className="viz-tests__toolbar">
        <div className="viz-tests__runall">
          <button
            type="button"
            className="viz-btn viz-btn--primary"
            onClick={handleRunAll}
            disabled={!!runningId || runAllActive}
          >
            ▶ Run all
          </button>
          <Segmented
            variant="pill"
            size="sm"
            ariaLabel="Run all mode"
            value={runAllMode}
            onValueChange={v => setRunAllMode(v as RunAllMode)}
            items={[
              { value: 'live', label: 'Live' },
              { value: 'fast', label: 'Fast' },
            ]}
          />
        </div>
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
        <label className="viz-tests__stepped">
          <input
            type="checkbox"
            checked={globalStepped}
            onChange={e => setGlobalStepped(e.target.checked)}
            disabled={!!runningId}
          />
          stepped
        </label>
        <label className="viz-tests__delay">
          delay
          <input
            type="range"
            min={0}
            max={1000}
            step={50}
            value={globalDelayMs}
            onChange={e => setGlobalDelayMs(Number(e.target.value))}
            disabled={!!runningId || globalStepped}
          />
          <span>{globalDelayMs}ms</span>
        </label>
      </div>

      <div className="viz-cards">
        {INTEGRATION_TESTS.map(test => {
          const isFocused = focusedId === test.id
          const isRunning = runningId === test.id
          return (
            <TestCard
              key={test.id}
              test={test}
              result={results[test.id]}
              running={isRunning}
              density={density}
              focused={isFocused}
              live={isFocused ? live : null}
              pausedAt={isFocused ? pausedAt : null}
              effective={effectiveFor(test.id)}
              override={overrides[test.id]}
              globalStepped={globalStepped}
              globalDelayMs={globalDelayMs}
              anyRunning={!!runningId}
              onRun={() => runWithFocus(test.id)}
              onCollapse={() => {
                if (runningId) return
                setFocusedId(null)
                setLive(null)
              }}
              onNextStep={handleNextStep}
              onRunToEnd={handleRunToEnd}
              onOverrideChange={patch =>
                setOverrides(prev => {
                  const next = { ...prev[test.id], ...patch }
                  // drop keys equal to global, drop entry if empty
                  if (next.stepped === globalStepped) delete next.stepped
                  if (next.delayMs === globalDelayMs) delete next.delayMs
                  const out = { ...prev }
                  if (next.stepped === undefined && next.delayMs === undefined) {
                    delete out[test.id]
                  } else {
                    out[test.id] = next
                  }
                  return out
                })
              }
              onResetOverride={() =>
                setOverrides(prev => {
                  const out = { ...prev }
                  delete out[test.id]
                  return out
                })
              }
              sandboxRef={focusedSandboxRef}
              mountKey={mountKey}
            />
          )
        })}
      </div>

      <div
        ref={offscreenSandboxRef}
        className="iux-tests__sandbox iux-tests__sandbox--offscreen"
        aria-hidden="true"
      >
        {offscreenTest && <div key={offscreenMountKey}>{offscreenTest.render()}</div>}
      </div>

      {runAllActive && (
        <button
          type="button"
          className="viz-tests__stop-fab"
          onClick={handleStopAll}
          aria-label="Stop run all"
        >
          <span className="viz-tests__stop-fab__dot" aria-hidden="true" />
          Stop run
        </button>
      )}
    </div>
  )
}

interface CardProps {
  test: IntegrationTest
  result: RunResult | undefined
  running: boolean
  density: Density
  focused: boolean
  live: StepResult[] | null
  pausedAt: number | null
  effective: { stepped: boolean; delayMs: number }
  override: Override | undefined
  globalStepped: boolean
  globalDelayMs: number
  anyRunning: boolean
  onRun: () => void
  onCollapse: () => void
  onNextStep: () => void
  onRunToEnd: () => void
  onOverrideChange: (patch: Override) => void
  onResetOverride: () => void
  sandboxRef: React.RefObject<HTMLDivElement>
  mountKey: number
}

function TestCard({
  test,
  result,
  running,
  density,
  focused,
  live,
  pausedAt,
  effective,
  override,
  globalStepped,
  globalDelayMs,
  anyRunning,
  onRun,
  onCollapse,
  onNextStep,
  onRunToEnd,
  onOverrideChange,
  onResetOverride,
  sandboxRef,
  mountKey,
}: CardProps) {
  const status: Status = running ? 'running' : result ? (result.passed ? 'passed' : 'failed') : 'idle'
  const stepsToShow: StepResult[] =
    focused && live ? live : (result?.steps ?? test.steps.map(s => ({ step: s, status: 'pending' as const })))

  const articleRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!focused) return
    articleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [focused])

  return (
    <article
      ref={articleRef}
      className={`viz-card showcase-card${focused ? ' viz-card--focused' : ''}`}
    >
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
          disabled={anyRunning}
          onClick={onRun}
        >
          {running ? 'Running…' : '▶ Run'}
        </button>
        <span className="viz-card__stepcount">{test.steps.length} steps</span>
        {focused && !running && (
          <button type="button" className="viz-btn viz-btn--mini" onClick={onCollapse}>
            Collapse
          </button>
        )}
      </div>

      {focused ? (
        <div className="viz-card__workbench">
          <CardOverrides
            effective={effective}
            override={override}
            globalStepped={globalStepped}
            globalDelayMs={globalDelayMs}
            running={running}
            onOverrideChange={onOverrideChange}
            onResetOverride={onResetOverride}
          />
          <div className="viz-card__stage">
            <div ref={sandboxRef} className="iux-tests__sandbox iux-tests__sandbox--live">
              <div key={mountKey}>{test.render()}</div>
            </div>
          </div>
          {effective.stepped && pausedAt !== null && (
            <div className="viz-card__stepctl">
              <span className="viz-card__paused">paused at step {pausedAt + 1}</span>
              <button type="button" className="viz-btn viz-btn--primary" onClick={onNextStep}>
                Next ▸
              </button>
              <button type="button" className="viz-btn" onClick={onRunToEnd}>
                Run to end
              </button>
            </div>
          )}
          <LiveSteps steps={stepsToShow} pausedAt={pausedAt} />
        </div>
      ) : density === 'storyboard' ? (
        <StoryboardStrip test={test} result={result} />
      ) : (
        <CompactSteps test={test} result={result} />
      )}
    </article>
  )
}

function CardOverrides({
  effective,
  override,
  globalStepped,
  globalDelayMs,
  running,
  onOverrideChange,
  onResetOverride,
}: {
  effective: { stepped: boolean; delayMs: number }
  override: Override | undefined
  globalStepped: boolean
  globalDelayMs: number
  running: boolean
  onOverrideChange: (patch: Override) => void
  onResetOverride: () => void
}) {
  const hasOverride = override && (override.stepped !== undefined || override.delayMs !== undefined)
  return (
    <div className="viz-card__overrides">
      <label className="viz-tests__stepped">
        <input
          type="checkbox"
          checked={effective.stepped}
          onChange={e => onOverrideChange({ stepped: e.target.checked })}
          disabled={running}
        />
        stepped
        {override?.stepped !== undefined && override.stepped !== globalStepped && (
          <span className="viz-card__override-badge">override</span>
        )}
      </label>
      <label className="viz-tests__delay">
        delay
        <input
          type="range"
          min={0}
          max={1000}
          step={50}
          value={effective.delayMs}
          onChange={e => onOverrideChange({ delayMs: Number(e.target.value) })}
          disabled={running || effective.stepped}
        />
        <span>{effective.delayMs}ms</span>
        {override?.delayMs !== undefined && override.delayMs !== globalDelayMs && (
          <span className="viz-card__override-badge">override</span>
        )}
      </label>
      {hasOverride && (
        <button
          type="button"
          className="viz-btn viz-btn--mini"
          onClick={onResetOverride}
          disabled={running}
        >
          Match global
        </button>
      )}
    </div>
  )
}

function LiveSteps({ steps, pausedAt }: { steps: StepResult[]; pausedAt: number | null }) {
  return (
    <ol className="viz-card__steps">
      {steps.map((sr, i) => {
        const isNextUp = pausedAt !== null && i === pausedAt + 1
        return (
          <li
            key={i}
            className={[
              'viz-step',
              `viz-step--${sr.status}`,
              isNextUp && 'viz-step--next-up',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="viz-step__num">{i + 1}</span>
            <span className="viz-step__kind">{sr.step.kind}</span>
            <span className="viz-step__label">{sr.step.label ?? describeStep(sr.step)}</span>
            {sr.ms !== undefined && sr.status !== 'pending' && (
              <span className="viz-step__ms">{Math.round(sr.ms)}ms</span>
            )}
            {sr.error && <span className="viz-step__error">{sr.error}</span>}
          </li>
        )
      })}
    </ol>
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
