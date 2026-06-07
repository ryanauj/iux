// ABOUTME: Multi-step wizard with a horizontal progress strip and content panel, supporting four completion strategies: linear (sequential), validated (per-step validation gates Next), branching (dynamic next-step routing), and resumable (localStorage + URL-hash persistence across sessions).

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import './Stepper.css'

// ABOUTME: Progression strategy: linear advances sequentially; validated runs each step's validate() before allowing Next; branching routes via step.next(); resumable stores position in localStorage and the URL hash.
export type StepperVariant = 'linear' | 'validated' | 'branching' | 'resumable'
// ABOUTME: Visual and semantic state of a single step dot — drives CSS class and aria-current assignment.
export type StepStatus = 'complete' | 'active' | 'error' | 'disabled'

// ABOUTME: Definition of a single wizard step: its id, display text, rendered content panel, optional explicit status, a validate() hook for the validated variant, and a next() router for the branching variant.
export interface StepperStep {
  id: string
  title: string
  description?: string
  content: ReactNode
  status?: StepStatus
  /** validated: return true or an error string; failure blocks Next. */
  validate?: () => true | string
  /** branching: returns the id of the next step (or null = end). */
  next?: () => string | null
}

// ABOUTME: Props for Stepper — supplies the step list, optional controlled/uncontrolled current-step id, variant strategy, resumable storageKey, and a completion callback fired when the last step's Next is clicked.
export interface StepperProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: StepperVariant
  steps: StepperStep[]
  currentId?: string
  defaultCurrentId?: string
  onCurrentChange?: (id: string) => void

  /** resumable: storage key for persistence (also synced to URL hash). */
  storageKey?: string
  onComplete?: () => void
  className?: string
  ariaLabel?: string
}

// ABOUTME: Renders a horizontal step-indicator strip above a content panel with Back/Next controls; handles validated blocking, branching routing, and resumable URL-hash/localStorage sync.
/**
 * The strip renders one `<li>` per step showing a numbered dot (✓ when
 * complete, ! on error) connected by a line. Clicking a completed dot jumps
 * back (disabled in branching mode). The panel below shows the active step's
 * `content` with Back and Next/Done buttons. Validation errors from
 * `validate()` are shown inline below the offending step title.
 */
export function Stepper({
  variant = 'linear',
  steps,
  currentId,
  defaultCurrentId,
  onCurrentChange,
  storageKey,
  onComplete,
  className,
  ariaLabel = 'Steps',
}: StepperProps) {
  const isControlled = currentId !== undefined
  const initialId = useMemo<string>(() => {
    if (defaultCurrentId) return defaultCurrentId
    if (variant === 'resumable' && storageKey && typeof window !== 'undefined') {
      const fromHash = window.location.hash.match(/step=([^&]+)/)?.[1]
      if (fromHash && steps.some(s => s.id === fromHash)) return fromHash
      const stored = window.localStorage.getItem(`iux:stepper:${storageKey}`)
      if (stored && steps.some(s => s.id === stored)) return stored
    }
    return steps[0]?.id ?? ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCurrentId, storageKey, variant])

  const [innerId, setInnerId] = useState<string>(initialId)
  const currentStepId = isControlled ? currentId! : innerId
  const currentIndex = steps.findIndex(s => s.id === currentStepId)
  const currentStep = steps[currentIndex]

  // ---------- Resumable storage + URL sync ----------
  useEffect(() => {
    if (variant !== 'resumable' || !storageKey || typeof window === 'undefined') return
    window.localStorage.setItem(`iux:stepper:${storageKey}`, currentStepId)
    const url = new URL(window.location.href)
    url.hash = `step=${encodeURIComponent(currentStepId)}`
    window.history.replaceState({}, '', url.toString())
  }, [variant, storageKey, currentStepId])

  useEffect(() => {
    if (variant !== 'resumable' || !storageKey || typeof window === 'undefined') return
    const onPop = () => {
      const fromHash = window.location.hash.match(/step=([^&]+)/)?.[1]
      if (fromHash && steps.some(s => s.id === fromHash)) {
        if (!isControlled) setInnerId(decodeURIComponent(fromHash))
        onCurrentChange?.(decodeURIComponent(fromHash))
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [variant, storageKey, steps, isControlled, onCurrentChange])

  // ---------- Validation errors per step ----------
  const [errors, setErrors] = useState<Record<string, string>>({})

  const commitTo = useCallback((id: string) => {
    if (!isControlled) setInnerId(id)
    onCurrentChange?.(id)
  }, [isControlled, onCurrentChange])

  const goNext = useCallback(() => {
    if (!currentStep) return
    if (variant === 'validated' && currentStep.validate) {
      const r = currentStep.validate()
      if (r !== true) { setErrors(prev => ({ ...prev, [currentStep.id]: r })); return }
    }
    setErrors(prev => { const n = { ...prev }; delete n[currentStep.id]; return n })

    let nextId: string | null = null
    if (variant === 'branching' && currentStep.next) {
      nextId = currentStep.next()
    } else if (currentIndex < steps.length - 1) {
      nextId = steps[currentIndex + 1].id
    }
    if (nextId) commitTo(nextId)
    else onComplete?.()
  }, [currentStep, currentIndex, steps, variant, commitTo, onComplete])

  const goBack = useCallback(() => {
    if (currentIndex <= 0) return
    commitTo(steps[currentIndex - 1].id)
  }, [currentIndex, steps, commitTo])

  const goTo = useCallback((id: string) => {
    const idx = steps.findIndex(s => s.id === id)
    if (idx <= currentIndex) commitTo(id)  // only allow going back (or to current)
  }, [steps, currentIndex, commitTo])

  // ---------- Status resolution ----------
  const statusOf = (s: StepperStep, i: number): StepStatus => {
    if (s.status) return s.status
    if (i < currentIndex) return 'complete'
    if (i === currentIndex) return 'active'
    return 'disabled'
  }

  const isLast = currentIndex >= steps.length - 1
  const classes = ['iux-stepper', `iux-stepper--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} aria-label={ariaLabel}>
      <ol className="iux-stepper__strip">
        {steps.map((s, i) => {
          const st = statusOf(s, i)
          const clickable = variant !== 'branching' && i <= currentIndex && st !== 'disabled'
          return (
            <li
              key={s.id}
              className={['iux-stepper__step', `is-${st}`].join(' ')}
              aria-current={st === 'active' ? 'step' : undefined}
            >
              <button
                type="button"
                className="iux-stepper__dot"
                onClick={() => clickable && goTo(s.id)}
                aria-label={`${s.title} — ${st}`}
                disabled={!clickable && st !== 'active'}
              >
                {st === 'complete' ? '✓' : st === 'error' ? '!' : (i + 1)}
              </button>
              <div className="iux-stepper__step-text">
                <div className="iux-stepper__step-title">{s.title}</div>
                {s.description && <div className="iux-stepper__step-description">{s.description}</div>}
                {errors[s.id] && <div className="iux-stepper__step-error">{errors[s.id]}</div>}
              </div>
              {i < steps.length - 1 && <span className="iux-stepper__connector" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>

      {currentStep && (
        <section className="iux-stepper__panel" aria-labelledby={`step-${currentStep.id}`}>
          <h3 id={`step-${currentStep.id}`} className="iux-stepper__panel-title">{currentStep.title}</h3>
          <div className="iux-stepper__panel-body">{currentStep.content}</div>
          <div className="iux-stepper__actions">
            <button
              type="button"
              className="iux-stepper__btn iux-stepper__btn--ghost"
              onClick={goBack}
              disabled={currentIndex <= 0}
            >Back</button>
            <button
              type="button"
              className="iux-stepper__btn iux-stepper__btn--primary"
              onClick={goNext}
            >{isLast ? 'Done' : 'Next'}</button>
          </div>
        </section>
      )}
    </div>
  )
}
