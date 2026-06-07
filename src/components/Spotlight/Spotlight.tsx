// ABOUTME: Spotlight — a React component (components).

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { getPortalTarget } from '../../theme/portalTarget'
import './Spotlight.css'

// ABOUTME: SpotlightVariant — a type alias.
export type SpotlightVariant = 'single' | 'sequence' | 'anchor-aware' | 'adaptive'

// ABOUTME: SpotlightStep — an interface.
export interface SpotlightStep {
  id: string
  title?: string
  body: ReactNode
  /** A CSS selector, an HTMLElement, or a callable returning one. */
  target: string | HTMLElement | (() => HTMLElement | null)
  /** adaptive: skip this step when the user has already done `feature`. */
  feature?: string
}

// ABOUTME: Props for Spotlight.
export interface SpotlightProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: SpotlightVariant
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  steps: SpotlightStep[]
  stepIndex?: number
  defaultStepIndex?: number
  onStepChange?: (next: number) => void

  /** adaptive: features the user has already exercised. */
  usedFeatures?: Set<string>
}

function resolveTarget(target: SpotlightStep['target']): HTMLElement | null {
  if (!target) return null
  if (typeof target === 'string') return document.querySelector(target) as HTMLElement | null
  if (typeof target === 'function') return target()
  return target
}

// ABOUTME: Spotlight — a React component.
export function Spotlight({
  variant = 'single',
  open,
  defaultOpen = false,
  onOpenChange,
  steps,
  stepIndex,
  defaultStepIndex = 0,
  onStepChange,
  usedFeatures,
}: SpotlightProps) {
  const isControlled = open !== undefined
  const [innerOpen, setInnerOpen] = useState<boolean>(defaultOpen)
  const isOpen = isControlled ? open! : innerOpen
  const setOpenState = useCallback((next: boolean) => {
    if (!isControlled) setInnerOpen(next)
    onOpenChange?.(next)
  }, [isControlled, onOpenChange])

  const filteredSteps = useMemo<SpotlightStep[]>(() => {
    if (variant !== 'adaptive' || !usedFeatures) return steps
    return steps.filter(s => !s.feature || !usedFeatures.has(s.feature))
  }, [variant, steps, usedFeatures])

  const isStepControlled = stepIndex !== undefined
  const [innerStep, setInnerStep] = useState<number>(defaultStepIndex)
  const currentStep = isStepControlled ? stepIndex! : innerStep
  const setStep = useCallback((next: number) => {
    if (!isStepControlled) setInnerStep(next)
    onStepChange?.(next)
  }, [isStepControlled, onStepChange])

  const step = filteredSteps[currentStep]

  // ---------- Track target rect with mutation + resize awareness ----------
  const [rect, setRect] = useState<DOMRect | null>(null)
  const targetRef = useRef<HTMLElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const measure = useCallback(() => {
    const t = targetRef.current
    if (!t) { setRect(null); return }
    setRect(t.getBoundingClientRect())
  }, [])

  useEffect(() => {
    if (!isOpen || !step) return
    const found = resolveTarget(step.target)
    targetRef.current = found
    if (!found) {
      // anchor-aware: advance past missing targets if there are more steps.
      if (variant === 'anchor-aware' && currentStep < filteredSteps.length - 1) {
        setStep(currentStep + 1)
      } else {
        setRect(null)
      }
      return
    }
    measure()
    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(measure)
    }
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    let resizeObs: ResizeObserver | undefined
    let mutObs: MutationObserver | undefined
    if (variant === 'anchor-aware') {
      if (typeof ResizeObserver !== 'undefined') {
        resizeObs = new ResizeObserver(onScroll)
        resizeObs.observe(found)
      }
      mutObs = new MutationObserver(() => {
        if (!document.contains(found)) {
          if (currentStep < filteredSteps.length - 1) setStep(currentStep + 1)
          else setOpenState(false)
        } else onScroll()
      })
      mutObs.observe(document.body, { childList: true, subtree: true })
    }
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
      resizeObs?.disconnect()
      mutObs?.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isOpen, step, variant, currentStep, filteredSteps.length, measure, setStep, setOpenState])

  // ---------- Hotkeys ----------
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); setOpenState(false) }
      else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        if (currentStep < filteredSteps.length - 1) setStep(currentStep + 1)
        else setOpenState(false)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (currentStep > 0) setStep(currentStep - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, currentStep, filteredSteps.length, setStep, setOpenState])

  if (!isOpen || !step) return null

  // ---------- Geometry ----------
  const pad = 6
  const cutout = rect
    ? { x: rect.left - pad, y: rect.top - pad, w: rect.width + pad * 2, h: rect.height + pad * 2 }
    : null

  // Tooltip placement: below if there's room, else above.
  const tipWidth = 280
  const tipHeight = 120
  let tipTop = 0
  let tipLeft = 0
  if (cutout) {
    const spaceBelow = window.innerHeight - (cutout.y + cutout.h)
    if (spaceBelow >= tipHeight + 16) tipTop = cutout.y + cutout.h + 12
    else tipTop = Math.max(8, cutout.y - tipHeight - 12)
    tipLeft = Math.max(8, Math.min(window.innerWidth - tipWidth - 8, cutout.x + cutout.w / 2 - tipWidth / 2))
  } else {
    tipTop = window.innerHeight / 2 - tipHeight / 2
    tipLeft = window.innerWidth / 2 - tipWidth / 2
  }

  const overlay = (
    <div className="iux-spotlight" role="dialog" aria-modal="true" aria-label="Coachmark">
      <svg className="iux-spotlight__svg" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <mask id="iux-spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {cutout && <rect x={cutout.x} y={cutout.y} width={cutout.w} height={cutout.h} rx="8" ry="8" fill="black" />}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="currentColor" mask="url(#iux-spotlight-mask)" className="iux-spotlight__dim" />
        {cutout && (
          <rect
            x={cutout.x} y={cutout.y} width={cutout.w} height={cutout.h} rx="8" ry="8"
            fill="none" stroke="currentColor" strokeWidth="2" className="iux-spotlight__ring"
          />
        )}
      </svg>
      <div
        className="iux-spotlight__tip"
        style={{ top: `${tipTop}px`, left: `${tipLeft}px`, width: `${tipWidth}px` }}
      >
        {(variant === 'sequence' || variant === 'anchor-aware' || variant === 'adaptive') && (
          <div className="iux-spotlight__meta">Step {currentStep + 1} of {filteredSteps.length}</div>
        )}
        {step.title && <div className="iux-spotlight__title">{step.title}</div>}
        <div className="iux-spotlight__body">{step.body}</div>
        <div className="iux-spotlight__actions">
          <button type="button" className="iux-spotlight__btn iux-spotlight__btn--ghost" onClick={() => setOpenState(false)}>Skip</button>
          {currentStep > 0 && (
            <button type="button" className="iux-spotlight__btn iux-spotlight__btn--ghost" onClick={() => setStep(currentStep - 1)}>Back</button>
          )}
          <button type="button" className="iux-spotlight__btn iux-spotlight__btn--primary" onClick={() => {
            if (currentStep < filteredSteps.length - 1) setStep(currentStep + 1)
            else setOpenState(false)
          }}>{currentStep === filteredSteps.length - 1 ? 'Done' : 'Next'}</button>
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined') return null
  return createPortal(overlay, getPortalTarget())
}
