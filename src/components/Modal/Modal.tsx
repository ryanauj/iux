import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

export type ModalVariant = 'centered' | 'sectioned' | 'wizard' | 'routed'
export type ModalSize = 'sm' | 'md' | 'lg'
export type ModalIntent = 'primary' | 'danger'

export interface ModalAction {
  label: string
  onClick?: () => void
  intent?: ModalIntent
  disabled?: boolean
}

export interface WizardStep {
  id: string
  title: string
  content: ReactNode
  canAdvance?: boolean
}

export interface ModalProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: ModalVariant
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void

  title?: string
  description?: string
  size?: ModalSize
  /** centered / sectioned actions. */
  primaryAction?: ModalAction
  secondaryAction?: ModalAction

  /** wizard variant. */
  steps?: WizardStep[]
  stepIndex?: number
  defaultStepIndex?: number
  onStepChange?: (next: number) => void
  onComplete?: () => void

  /** routed variant — query string key & value to bind to. */
  routeKey?: string
  routeValue?: string

  /** Common toggles. */
  closeOnScrim?: boolean
  closeOnEsc?: boolean
  ariaLabel?: string
  children?: ReactNode
  className?: string
  /** Story-only: render inline in stories without portaling to body. */
  inlineRender?: boolean
}

const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter(el => !el.hasAttribute('hidden'))
}

export function Modal(props: ModalProps) {
  const {
    variant = 'centered',
    open,
    defaultOpen = false,
    onOpenChange,
    title,
    description,
    size = 'md',
    primaryAction,
    secondaryAction,
    steps,
    stepIndex,
    defaultStepIndex = 0,
    onStepChange,
    onComplete,
    routeKey = 'modal',
    routeValue,
    closeOnScrim = true,
    closeOnEsc = true,
    ariaLabel,
    children,
    className,
    inlineRender = false,
  } = props

  const titleId = useId()
  const descId = useId()
  const isControlled = open !== undefined
  const [innerOpen, setInnerOpen] = useState<boolean>(defaultOpen)
  const isOpen = isControlled ? open! : innerOpen

  const setOpenState = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  // ---------- Routed variant ----------
  useEffect(() => {
    if (variant !== 'routed' || !routeValue || inlineRender) return
    const url = new URL(window.location.href)
    const has = url.searchParams.get(routeKey) === routeValue
    if (has !== isOpen) setOpenState(has)

    const onPop = () => {
      const u = new URL(window.location.href)
      setOpenState(u.searchParams.get(routeKey) === routeValue)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // We only want to listen at mount; isOpen sync is the synchronous branch above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, routeKey, routeValue, inlineRender])

  useEffect(() => {
    if (variant !== 'routed' || !routeValue || inlineRender) return
    const url = new URL(window.location.href)
    const has = url.searchParams.get(routeKey) === routeValue
    if (isOpen && !has) {
      url.searchParams.set(routeKey, routeValue)
      window.history.pushState({ routed: routeValue }, '', url.toString())
    } else if (!isOpen && has) {
      url.searchParams.delete(routeKey)
      window.history.replaceState({}, '', url.toString())
    }
  }, [isOpen, variant, routeKey, routeValue, inlineRender])

  // ---------- Focus management ----------
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement | null
    const id = requestAnimationFrame(() => {
      const f = getFocusable(dialogRef.current)
      if (f.length > 0) f[0].focus()
      else dialogRef.current?.focus()
    })
    return () => {
      cancelAnimationFrame(id)
      previousFocusRef.current?.focus?.()
    }
  }, [isOpen])

  // ---------- Body scroll lock while open ----------
  useEffect(() => {
    if (!isOpen || inlineRender) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen, inlineRender])

  // ---------- Keyboard ----------
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape' && closeOnEsc) {
        event.stopPropagation()
        setOpenState(false)
        return
      }
      if (event.key === 'Tab') {
        const f = getFocusable(dialogRef.current)
        if (f.length === 0) {
          event.preventDefault()
          dialogRef.current?.focus()
          return
        }
        const first = f[0]
        const last = f[f.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (event.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        }
      }
    },
    [closeOnEsc, setOpenState],
  )

  // ---------- Wizard state ----------
  const isStepControlled = stepIndex !== undefined
  const [innerStep, setInnerStep] = useState<number>(defaultStepIndex)
  const currentStep = isStepControlled ? stepIndex! : innerStep

  const setStep = useCallback(
    (next: number) => {
      if (!isStepControlled) setInnerStep(next)
      onStepChange?.(next)
    },
    [isStepControlled, onStepChange],
  )

  useEffect(() => {
    if (!isOpen) setInnerStep(defaultStepIndex)
  }, [isOpen, defaultStepIndex])

  // ---------- Render ----------
  if (!isOpen) return null

  const handleScrimMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!closeOnScrim) return
    if (event.target === event.currentTarget) setOpenState(false)
  }

  const classes = [
    'iux-modal',
    `iux-modal--${variant}`,
    `iux-modal--size-${size}`,
    className,
  ].filter(Boolean).join(' ')

  const wizardActiveStep = steps?.[currentStep]
  const canAdvance = wizardActiveStep?.canAdvance !== false

  const dialog = (
    <div
      className={`iux-modal__scrim${inlineRender ? ' iux-modal__scrim--inline' : ''}`}
      onMouseDown={handleScrimMouseDown}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        className={classes}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {variant === 'wizard' && steps ? (
          <>
            <header className="iux-modal__header">
              {title && <h2 id={titleId} className="iux-modal__title">{title}</h2>}
              <WizardProgress steps={steps} currentStep={currentStep} />
            </header>
            <div className="iux-modal__body iux-modal__body--scroll">
              {wizardActiveStep && (
                <>
                  <h3 className="iux-modal__step-title">{wizardActiveStep.title}</h3>
                  <div>{wizardActiveStep.content}</div>
                </>
              )}
            </div>
            <footer className="iux-modal__footer iux-modal__footer--sticky">
              <button
                type="button"
                className="iux-modal__btn iux-modal__btn--neutral"
                onClick={() => (currentStep === 0 ? setOpenState(false) : setStep(currentStep - 1))}
              >
                {currentStep === 0 ? 'Cancel' : 'Back'}
              </button>
              <button
                type="button"
                className="iux-modal__btn iux-modal__btn--primary"
                disabled={!canAdvance}
                onClick={() => {
                  if (currentStep === steps.length - 1) {
                    onComplete?.()
                    setOpenState(false)
                  } else {
                    setStep(currentStep + 1)
                  }
                }}
              >
                {currentStep === steps.length - 1 ? 'Done' : 'Next'}
              </button>
            </footer>
          </>
        ) : (
          <>
            {(title || description) && (
              <header className="iux-modal__header">
                {title && <h2 id={titleId} className="iux-modal__title">{title}</h2>}
                {description && <p id={descId} className="iux-modal__description">{description}</p>}
              </header>
            )}
            <div className={variant === 'sectioned' ? 'iux-modal__body iux-modal__body--scroll' : 'iux-modal__body'}>
              {children}
            </div>
            {(primaryAction || secondaryAction) && (
              <footer
                className={
                  variant === 'sectioned'
                    ? 'iux-modal__footer iux-modal__footer--sticky'
                    : 'iux-modal__footer'
                }
              >
                {secondaryAction && (
                  <button
                    type="button"
                    className="iux-modal__btn iux-modal__btn--neutral"
                    disabled={secondaryAction.disabled}
                    onClick={() => { secondaryAction.onClick?.(); setOpenState(false) }}
                  >
                    {secondaryAction.label}
                  </button>
                )}
                {primaryAction && (
                  <button
                    type="button"
                    className={`iux-modal__btn iux-modal__btn--${primaryAction.intent ?? 'primary'}`}
                    disabled={primaryAction.disabled}
                    onClick={() => { primaryAction.onClick?.(); setOpenState(false) }}
                  >
                    {primaryAction.label}
                  </button>
                )}
              </footer>
            )}
          </>
        )}
      </div>
    </div>
  )

  if (inlineRender) return dialog
  return createPortal(dialog, document.body)
}

interface WizardProgressProps {
  steps: WizardStep[]
  currentStep: number
}

function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <ol className="iux-modal__progress" aria-label="Progress">
      {steps.map((s, i) => (
        <li
          key={s.id}
          className={[
            'iux-modal__progress-step',
            i < currentStep && 'is-complete',
            i === currentStep && 'is-current',
          ].filter(Boolean).join(' ')}
          aria-current={i === currentStep ? 'step' : undefined}
        >
          <span className="iux-modal__progress-dot" aria-hidden="true">{i + 1}</span>
          <span className="iux-modal__progress-label">{s.title}</span>
        </li>
      ))}
    </ol>
  )
}

