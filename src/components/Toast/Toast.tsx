import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { getPortalTarget } from '../../theme/portalTarget'
import './Toast.css'

export type ToastVariant = 'plain' | 'action' | 'severity' | 'progress'
export type ToastIntent = 'info' | 'success' | 'warning' | 'danger' | 'neutral'

export interface ToastItem {
  id: string
  variant?: ToastVariant
  intent?: ToastIntent
  title?: ReactNode
  body?: ReactNode
  icon?: ReactNode
  /** Auto-dismiss timer; 0 disables. */
  durationMs?: number
  action?: { label: string; onClick: () => void }
  /** progress variant: 0..1. */
  progress?: number
}

export interface ToastProps extends ToastItem {
  onDismiss?: (id: string) => void
  /** Story-only: render without a portal. */
  inlineRender?: boolean
}

const SEVERITY_RANK: Record<ToastIntent, number> = {
  danger: 0, warning: 1, info: 2, neutral: 3, success: 4,
}

export function sortBySeverity(items: ToastItem[]): ToastItem[] {
  return items.slice().sort((a, b) => SEVERITY_RANK[a.intent ?? 'neutral'] - SEVERITY_RANK[b.intent ?? 'neutral'])
}

export function Toast({
  id, variant = 'plain', intent = 'neutral', title, body, icon, durationMs = 5000, action, progress, onDismiss, inlineRender,
}: ToastProps) {
  const timerRef = useRef<number | null>(null)
  const pausedRef = useRef<boolean>(false)
  const remainingRef = useRef<number>(durationMs)
  const startedAtRef = useRef<number>(Date.now())

  const dismiss = useCallback(() => {
    onDismiss?.(id)
  }, [id, onDismiss])

  useEffect(() => {
    if (!durationMs || durationMs <= 0) return
    if (variant === 'progress') return  // progress controls its own lifecycle
    startedAtRef.current = Date.now()
    remainingRef.current = durationMs
    timerRef.current = window.setTimeout(dismiss, durationMs)
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [durationMs, dismiss, variant])

  const pauseTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAtRef.current))
      timerRef.current = null
      pausedRef.current = true
    }
  }, [])

  const resumeTimer = useCallback(() => {
    if (pausedRef.current && remainingRef.current > 0) {
      startedAtRef.current = Date.now()
      timerRef.current = window.setTimeout(dismiss, remainingRef.current)
      pausedRef.current = false
    }
  }, [dismiss])

  const classes = [
    'iux-toast',
    `iux-toast--${variant}`,
    `iux-toast--intent-${intent}`,
  ].join(' ')

  return (
    <div
      role={intent === 'danger' || intent === 'warning' ? 'alert' : 'status'}
      aria-live={intent === 'danger' || intent === 'warning' ? 'assertive' : 'polite'}
      className={classes}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      onFocus={pauseTimer}
      onBlur={resumeTimer}
      data-inline={inlineRender ? 'true' : undefined}
    >
      {(icon || variant === 'severity') && (
        <span className="iux-toast__icon" aria-hidden="true">
          {icon ?? <IntentGlyph intent={intent} />}
        </span>
      )}
      <div className="iux-toast__main">
        {title && <div className="iux-toast__title">{title}</div>}
        {body && <div className="iux-toast__body">{body}</div>}
      </div>
      {action && (
        <button
          type="button"
          className="iux-toast__action"
          onClick={() => { action.onClick(); dismiss() }}
        >
          {action.label}
        </button>
      )}
      <button
        type="button"
        className="iux-toast__close"
        onClick={dismiss}
        aria-label="Dismiss"
      >
        ×
      </button>
      {variant === 'progress' && (
        <span
          className="iux-toast__progress"
          aria-hidden="true"
          style={{ width: `${Math.max(0, Math.min(1, progress ?? 0)) * 100}%` }}
        />
      )}
    </div>
  )
}

export type ToasterPosition = 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center'

export interface ToasterProps {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
  position?: ToasterPosition
  /** Severity-ordered display. */
  severityOrder?: boolean
  max?: number
  /** Story-only: render inline (no portal). */
  inlineRender?: boolean
}

export function Toaster({ toasts, onDismiss, position = 'top-right', severityOrder = false, max = 6, inlineRender = false }: ToasterProps) {
  const ordered = severityOrder ? sortBySeverity(toasts) : toasts
  const visible = ordered.slice(0, max)
  const overflow = ordered.length - visible.length

  const node = (
    <div className={`iux-toast-stack iux-toast-stack--${position}`} aria-live="polite" data-inline={inlineRender ? 'true' : undefined}>
      {visible.map(t => <Toast key={t.id} {...t} onDismiss={onDismiss} inlineRender={inlineRender} />)}
      {overflow > 0 && (
        <div className="iux-toast iux-toast--more" aria-label={`${overflow} more`}>+{overflow} more</div>
      )}
    </div>
  )

  if (inlineRender) return node
  if (typeof document === 'undefined') return null
  return createPortal(node, getPortalTarget())
}

function IntentGlyph({ intent }: { intent: ToastIntent }) {
  if (intent === 'danger' || intent === 'warning') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 3v6" />
        <circle cx="8" cy="12" r="0.6" fill="currentColor" />
        <circle cx="8" cy="8" r="6.4" />
      </svg>
    )
  }
  if (intent === 'success') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.4" />
        <path d="M5 8.5l2.2 2L11 6" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.4" />
      <path d="M8 7v4" />
      <circle cx="8" cy="5" r="0.6" fill="currentColor" />
    </svg>
  )
}

// ---------- minimal hook helper ----------

export function useToastQueue() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const push = useCallback((item: Omit<ToastItem, 'id'> & { id?: string }) => {
    const id = item.id ?? Math.random().toString(36).slice(2, 9)
    setToasts(prev => [...prev, { ...item, id }])
    return id
  }, [])
  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])
  const update = useCallback((id: string, patch: Partial<ToastItem>) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t))
  }, [])
  return { toasts, push, dismiss, update }
}
