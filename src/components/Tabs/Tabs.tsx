// ABOUTME: Tabs — a React component (components).

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './Tabs.css'

// ABOUTME: TabsVariant — a type alias.
export type TabsVariant = 'basic' | 'rich' | 'overflow' | 'editable'

// ABOUTME: TabItem — an interface.
export interface TabItem {
  id: string
  label: ReactNode
  icon?: ReactNode
  badge?: ReactNode
  disabled?: boolean
}

// ABOUTME: Props for Tabs.
export interface TabsProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: TabsVariant
  tabs: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  /** editable: close a tab. */
  onClose?: (id: string) => void
  /** editable: reorder tabs (called with new full list). */
  onReorder?: (next: TabItem[]) => void
  /** editable: add a new tab. */
  onAdd?: () => void
  /** Render the active tab's panel. */
  renderPanel?: (activeId: string) => ReactNode
  className?: string
  ariaLabel?: string
}

// ABOUTME: Tabs — a React component.
export function Tabs({
  variant = 'basic',
  tabs,
  value,
  defaultValue,
  onValueChange,
  onClose,
  onReorder,
  onAdd,
  renderPanel,
  className,
  ariaLabel,
}: TabsProps) {
  const baseId = useId()
  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<string>(defaultValue ?? tabs[0]?.id ?? '')
  const currentValue = isControlled ? value! : innerValue

  // Keep inner value pointed at an existing tab.
  useEffect(() => {
    if (isControlled) return
    if (!tabs.some(t => t.id === innerValue)) {
      setInnerValue(tabs[0]?.id ?? '')
    }
  }, [tabs, innerValue, isControlled])

  const setValue = useCallback(
    (id: string) => {
      if (!isControlled) setInnerValue(id)
      onValueChange?.(id)
    },
    [isControlled, onValueChange],
  )

  // ---------- Keyboard nav on the tab list ----------
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const focusTab = (id: string) => {
    tabRefs.current[id]?.focus()
  }

  const handleListKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = tabs.filter(t => !t.disabled)
    if (enabled.length === 0) return
    const idx = enabled.findIndex(t => t.id === currentValue)
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      const next = enabled[(idx + 1) % enabled.length]
      setValue(next.id); focusTab(next.id)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      const next = enabled[(idx - 1 + enabled.length) % enabled.length]
      setValue(next.id); focusTab(next.id)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setValue(enabled[0].id); focusTab(enabled[0].id)
    } else if (event.key === 'End') {
      event.preventDefault()
      const last = enabled[enabled.length - 1]
      setValue(last.id); focusTab(last.id)
    }
  }

  // ---------- Overflow detection (variant=overflow) ----------
  const listRef = useRef<HTMLDivElement>(null)
  const [overflowIds, setOverflowIds] = useState<string[]>([])

  useLayoutEffect(() => {
    if (variant !== 'overflow') return
    const list = listRef.current
    if (!list) return
    const recompute = () => {
      const buttons = list.querySelectorAll<HTMLButtonElement>('[data-tab-id]')
      const next: string[] = []
      const listRight = list.getBoundingClientRect().right
      const moreBtn = list.querySelector<HTMLButtonElement>('.iux-tabs__more')
      const moreW = moreBtn?.getBoundingClientRect().width ?? 0
      buttons.forEach(b => {
        const id = b.dataset.tabId
        if (!id) return
        const r = b.getBoundingClientRect()
        if (r.right > listRight - moreW - 8) next.push(id)
      })
      setOverflowIds(next)
    }
    recompute()
    const obs = new ResizeObserver(recompute)
    obs.observe(list)
    return () => obs.disconnect()
  }, [variant, tabs])

  const [moreOpen, setMoreOpen] = useState(false)

  // ---------- Reorder (editable) — pointer-event drag swap ----------
  const dragStateRef = useRef<{ id: string; startX: number } | null>(null)

  const handleDragStart = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (variant !== 'editable') return
    dragStateRef.current = { id, startX: e.clientX }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current
    if (!drag || variant !== 'editable') return
    const list = listRef.current
    if (!list) return
    const overEl = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
    const overBtn = overEl?.closest<HTMLButtonElement>('[data-tab-id]')
    if (!overBtn) return
    const overId = overBtn.dataset.tabId!
    if (overId === drag.id) return
    const fromIdx = tabs.findIndex(t => t.id === drag.id)
    const toIdx = tabs.findIndex(t => t.id === overId)
    if (fromIdx < 0 || toIdx < 0) return
    const next = tabs.slice()
    const [moved] = next.splice(fromIdx, 1)
    next.splice(toIdx, 0, moved)
    onReorder?.(next)
  }

  const handleDragEnd = () => { dragStateRef.current = null }

  const classes = ['iux-tabs', `iux-tabs--${variant}`, className].filter(Boolean).join(' ')
  const listId = `${baseId}-list`

  const renderTabButton = (t: TabItem, opts?: { hideContent?: boolean }) => {
    const selected = t.id === currentValue
    return (
      <button
        key={t.id}
        ref={el => { tabRefs.current[t.id] = el }}
        type="button"
        role="tab"
        id={`${baseId}-tab-${t.id}`}
        data-tab-id={t.id}
        aria-selected={selected}
        aria-controls={`${baseId}-panel-${t.id}`}
        aria-disabled={t.disabled || undefined}
        disabled={t.disabled}
        tabIndex={selected ? 0 : -1}
        className={[
          'iux-tabs__tab',
          selected && 'is-selected',
          opts?.hideContent && 'iux-tabs__tab--overflowed',
        ].filter(Boolean).join(' ')}
        onClick={() => !t.disabled && setValue(t.id)}
      >
        {t.icon && <span className="iux-tabs__icon" aria-hidden="true">{t.icon}</span>}
        <span className="iux-tabs__label">{t.label}</span>
        {t.badge !== undefined && <span className="iux-tabs__badge">{t.badge}</span>}
        {variant === 'editable' && (
          <span
            role="button"
            tabIndex={-1}
            aria-label={`Close ${typeof t.label === 'string' ? t.label : 'tab'}`}
            className="iux-tabs__close"
            onClick={ev => { ev.stopPropagation(); onClose?.(t.id) }}
          >
            ×
          </span>
        )}
      </button>
    )
  }

  return (
    <div className={classes} data-variant={variant}>
      <div
        ref={listRef}
        id={listId}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        className="iux-tabs__list"
        onKeyDown={handleListKey}
        onPointerMove={variant === 'editable' ? handleDragMove : undefined}
        onPointerUp={variant === 'editable' ? handleDragEnd : undefined}
        onPointerCancel={variant === 'editable' ? handleDragEnd : undefined}
      >
        {variant === 'editable'
          ? tabs.map(t => (
              <div
                key={t.id}
                className="iux-tabs__drag-wrap"
                onPointerDown={e => handleDragStart(t.id, e)}
              >
                {renderTabButton(t)}
              </div>
            ))
          : tabs.map(t => renderTabButton(t))}

        {variant === 'editable' && onAdd && (
          <button
            type="button"
            className="iux-tabs__add"
            onClick={onAdd}
            aria-label="New tab"
          >
            +
          </button>
        )}

        {variant === 'overflow' && (
          <button
            type="button"
            className="iux-tabs__more"
            aria-haspopup="menu"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen(o => !o)}
            data-visible={overflowIds.length > 0 ? 'true' : 'false'}
          >
            More ▾
          </button>
        )}
      </div>

      {variant === 'overflow' && moreOpen && (
        <div role="menu" className="iux-tabs__more-menu">
          {tabs.filter(t => overflowIds.includes(t.id)).map(t => (
            <button
              key={t.id}
              type="button"
              role="menuitem"
              className="iux-tabs__more-item"
              onClick={() => { setValue(t.id); setMoreOpen(false) }}
            >
              {t.icon && <span className="iux-tabs__icon" aria-hidden="true">{t.icon}</span>}
              {t.label}
            </button>
          ))}
        </div>
      )}

      {renderPanel && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${currentValue}`}
          aria-labelledby={`${baseId}-tab-${currentValue}`}
          tabIndex={0}
          className="iux-tabs__panel"
        >
          {renderPanel(currentValue)}
        </div>
      )}
    </div>
  )
}
