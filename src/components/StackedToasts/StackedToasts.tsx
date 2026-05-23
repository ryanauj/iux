import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Toast, type ToastIntent, type ToastItem } from '../Toast/Toast'
import { getPortalTarget } from '../../theme/portalTarget'
import './StackedToasts.css'

export type StackedToastsVariant = 'cap' | 'dedupe' | 'severity' | 'tray'
export type StackPosition = 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center'

export interface StackedToastsProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: StackedToastsVariant
  toasts: ToastItem[]
  onDismiss: (id: string) => void
  position?: StackPosition
  max?: number
  /** Story-only: render inline (no portal). */
  inlineRender?: boolean
}

const SEVERITY_RANK: Record<ToastIntent, number> = {
  danger: 0, warning: 1, info: 2, neutral: 3, success: 4,
}

// Decay (override durationMs) per intent for severity variant: info fades
// fastest, danger sticks.
const SEVERITY_FADE: Record<ToastIntent, number> = {
  info: 2000,
  success: 3000,
  neutral: 4000,
  warning: 6000,
  danger: 0,
}

function fingerprint(t: ToastItem): string {
  return `${t.intent ?? 'neutral'}::${String(t.title ?? '')}::${String(t.body ?? '')}`
}

export function StackedToasts({
  variant = 'cap',
  toasts,
  onDismiss,
  position = 'bottom-right',
  max = 4,
  inlineRender = false,
}: StackedToastsProps) {
  const [trayCollapsed, setTrayCollapsed] = useState<boolean>(false)

  const collapsed = useMemo(() => {
    if (variant !== 'dedupe') return null
    const groups = new Map<string, { sample: ToastItem; ids: string[]; count: number }>()
    for (const t of toasts) {
      const fp = fingerprint(t)
      const existing = groups.get(fp)
      if (existing) {
        existing.count++
        existing.ids.push(t.id)
      } else {
        groups.set(fp, { sample: t, ids: [t.id], count: 1 })
      }
    }
    return Array.from(groups.values())
  }, [toasts, variant])

  const ordered = useMemo(() => {
    if (variant === 'severity') {
      return toasts.slice().sort((a, b) => SEVERITY_RANK[a.intent ?? 'neutral'] - SEVERITY_RANK[b.intent ?? 'neutral'])
    }
    return toasts
  }, [toasts, variant])

  const dismissGroup = useCallback((ids: string[]) => {
    for (const id of ids) onDismiss(id)
  }, [onDismiss])

  const dismissAll = useCallback(() => {
    for (const t of toasts) onDismiss(t.id)
  }, [toasts, onDismiss])

  // ---------- Render ----------
  let body: ReactNode
  if (variant === 'tray' && trayCollapsed) {
    body = (
      <button
        type="button"
        className="iux-stacked__tray-button"
        onClick={() => setTrayCollapsed(false)}
        aria-label={`Show ${toasts.length} notifications`}
      >
        {toasts.length} notifications
      </button>
    )
  } else if (variant === 'dedupe' && collapsed) {
    body = (
      <>
        {collapsed.map(g => (
          <Toast
            key={g.sample.id}
            {...g.sample}
            durationMs={0}
            body={g.count > 1 ? <>{g.sample.body} <strong>+{g.count - 1}</strong></> : g.sample.body}
            onDismiss={() => dismissGroup(g.ids)}
            inlineRender={inlineRender}
          />
        ))}
      </>
    )
  } else if (variant === 'severity') {
    body = (
      <>
        {ordered.slice(0, max).map(t => {
          const fade = SEVERITY_FADE[t.intent ?? 'neutral']
          return (
            <Toast
              key={t.id}
              {...t}
              durationMs={fade > 0 ? fade : 0}
              onDismiss={onDismiss}
              inlineRender={inlineRender}
            />
          )
        })}
        {ordered.length > max && (
          <div className="iux-stacked__more">+{ordered.length - max} more</div>
        )}
      </>
    )
  } else {
    // cap (default)
    body = (
      <>
        {toasts.slice(-max).map(t => <Toast key={t.id} {...t} onDismiss={onDismiss} inlineRender={inlineRender} />)}
        {toasts.length > max && <div className="iux-stacked__more">+{toasts.length - max} hidden</div>}
      </>
    )
  }

  const node = (
    <div
      className={`iux-stacked iux-stacked--${variant} iux-stacked--${position}`}
      aria-live="polite"
      data-inline={inlineRender ? 'true' : undefined}
    >
      {variant === 'tray' && !trayCollapsed && toasts.length > 0 && (
        <div className="iux-stacked__tray-header">
          <span>Notifications · {toasts.length}</span>
          <button type="button" className="iux-stacked__tray-action" onClick={() => setTrayCollapsed(true)}>Collapse</button>
          <button type="button" className="iux-stacked__tray-action" onClick={dismissAll}>Clear all</button>
        </div>
      )}
      <div className="iux-stacked__items">{body}</div>
    </div>
  )

  if (inlineRender) return node
  if (typeof document === 'undefined') return null
  return createPortal(node, getPortalTarget())
}
