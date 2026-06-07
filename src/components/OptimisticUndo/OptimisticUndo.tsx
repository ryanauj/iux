// ABOUTME: OptimisticUndo — a React component (components).

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { getPortalTarget } from '../../theme/portalTarget'
import './OptimisticUndo.css'

// ABOUTME: OptimisticUndoVariant — a type alias.
export type OptimisticUndoVariant = 'toast' | 'countdown' | 'queue' | 'log'

// ABOUTME: UndoAction — an interface.
export interface UndoAction {
  id: string
  label: string
  description?: string
  /** Undo handler — reverses the optimistic mutation. */
  undo: () => void | Promise<void>
  /** ms since epoch when the toast auto-commits. */
  expiresAt: number
}

// ABOUTME: CommittedAction — an interface.
export interface CommittedAction {
  id: string
  label: string
  at: number
  /** Optional reverse handler for the log variant. */
  undo?: () => void | Promise<void>
}

// ABOUTME: Props for OptimisticUndo.
export interface OptimisticUndoProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: OptimisticUndoVariant
  actions: UndoAction[]
  /** Called when an action's timer elapses or an explicit commit is requested. */
  onCommit: (id: string) => void
  onUndo: (id: string) => void
  /** log variant: prior committed actions. */
  history?: CommittedAction[]
  position?: 'bottom-left' | 'bottom-right' | 'top-right' | 'top-left'
  inlineRender?: boolean
}

// ABOUTME: OptimisticUndo — a React component.
export function OptimisticUndo({
  variant = 'toast',
  actions,
  onCommit,
  onUndo,
  history = [],
  position = 'bottom-left',
  inlineRender = false,
}: OptimisticUndoProps) {
  // Expire timers — each action with a future expiresAt schedules a commit.
  const timersRef = useRef<Map<string, number>>(new Map())
  useEffect(() => {
    const live = new Set(actions.map(a => a.id))
    // Cancel timers for actions that no longer exist.
    for (const [id, handle] of timersRef.current) {
      if (!live.has(id)) {
        window.clearTimeout(handle)
        timersRef.current.delete(id)
      }
    }
    // Schedule timers for new actions.
    for (const a of actions) {
      if (timersRef.current.has(a.id)) continue
      const ms = a.expiresAt - Date.now()
      if (ms <= 0) {
        onCommit(a.id)
        continue
      }
      const handle = window.setTimeout(() => {
        timersRef.current.delete(a.id)
        onCommit(a.id)
      }, ms)
      timersRef.current.set(a.id, handle)
    }
    return () => {
      // do not clear on every render; keep timers across re-renders.
    }
  }, [actions, onCommit])

  // Tick to update countdown rings.
  const [, setTick] = useState(0)
  useEffect(() => {
    if (variant !== 'countdown' && variant !== 'queue') return
    if (actions.length === 0) return
    const handle = window.setInterval(() => setTick(t => t + 1), 200)
    return () => window.clearInterval(handle)
  }, [variant, actions.length])

  const [showLog, setShowLog] = useState(false)

  const renderRing = useCallback((a: UndoAction) => {
    const total = Math.max(1, a.expiresAt - (a.expiresAt - 5000)) // assume 5s default if not derivable
    const remaining = Math.max(0, a.expiresAt - Date.now())
    const pct = Math.max(0, Math.min(1, remaining / total))
    const r = 9
    const c = 2 * Math.PI * r
    const offset = c * (1 - pct)
    return (
      <svg className="iux-undo__ring" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <circle cx="12" cy="12" r={r} stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
        <circle cx="12" cy="12" r={r} stroke="currentColor" strokeWidth="2" fill="none"
          strokeDasharray={c} strokeDashoffset={offset} transform="rotate(-90 12 12)" />
      </svg>
    )
  }, [])

  const items = variant === 'queue' ? actions : actions.slice(0, 1)

  const stack = (
    <div className={`iux-undo iux-undo--${variant} iux-undo--${position}`} aria-live="polite" data-inline={inlineRender ? 'true' : undefined}>
      {items.map(a => (
        <div key={a.id} className="iux-undo__item" role="status">
          {(variant === 'countdown' || variant === 'queue') && renderRing(a)}
          <div className="iux-undo__text">
            <div className="iux-undo__label">{a.label}</div>
            {a.description && <div className="iux-undo__description">{a.description}</div>}
          </div>
          <button type="button" className="iux-undo__btn iux-undo__btn--ghost" onClick={() => onUndo(a.id)}>Undo</button>
        </div>
      ))}
      {variant === 'queue' && actions.length === 0 && (
        <div className="iux-undo__empty">No actions in flight</div>
      )}
      {variant === 'log' && (
        <>
          <button type="button" className="iux-undo__log-toggle" onClick={() => setShowLog(s => !s)} aria-expanded={showLog}>
            {showLog ? 'Hide history' : `History (${history.length})`}
          </button>
          {showLog && (
            <ol className="iux-undo__log">
              {history.map(h => (
                <li key={h.id}>
                  <span className="iux-undo__log-meta">{new Date(h.at).toLocaleTimeString()}</span>
                  <span className="iux-undo__log-label">{h.label}</span>
                  {h.undo && (
                    <button type="button" className="iux-undo__btn iux-undo__btn--ghost" onClick={() => h.undo?.()}>Revert</button>
                  )}
                </li>
              ))}
              {history.length === 0 && <li className="iux-undo__empty">No history yet</li>}
            </ol>
          )}
        </>
      )}
    </div>
  )

  if (inlineRender) return stack
  if (typeof document === 'undefined') return null
  return createPortal(stack, getPortalTarget())
}

// ABOUTME: useOptimisticUndo — a React hook.
// Minimal hook that owns the action queue + history.
export function useOptimisticUndo(defaultTtlMs: number = 5000) {
  const [actions, setActions] = useState<UndoAction[]>([])
  const [history, setHistory] = useState<CommittedAction[]>([])

  const push = useCallback((label: string, undo: () => void | Promise<void>, opts?: { description?: string; ttlMs?: number; id?: string }) => {
    const id = opts?.id ?? Math.random().toString(36).slice(2, 9)
    const expiresAt = Date.now() + (opts?.ttlMs ?? defaultTtlMs)
    setActions(prev => [...prev, { id, label, description: opts?.description, undo, expiresAt }])
    return id
  }, [defaultTtlMs])

  const commit = useCallback((id: string) => {
    setActions(prev => {
      const found = prev.find(a => a.id === id)
      if (found) {
        setHistory(h => [{ id: found.id, label: found.label, at: Date.now(), undo: found.undo }, ...h])
      }
      return prev.filter(a => a.id !== id)
    })
  }, [])

  const undo = useCallback(async (id: string) => {
    const a = actions.find(aa => aa.id === id)
    setActions(prev => prev.filter(aa => aa.id !== id))
    if (a) await a.undo()
  }, [actions])

  return { actions, history, push, commit, undo }
}

