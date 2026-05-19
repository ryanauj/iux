import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import './Drawer.css'

export type DrawerVariant = 'side' | 'sectioned' | 'navigable' | 'sheet'
export type DrawerSide = 'right' | 'left' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg'

export interface DrawerView {
  id: string
  title: string
  render: (push: (id: string) => void, pop: () => void) => ReactNode
}

export interface DrawerProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: DrawerVariant
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: DrawerSide
  size?: DrawerSize
  title?: ReactNode

  /** sectioned actions. */
  primaryAction?: { label: string; onClick?: () => void }
  secondaryAction?: { label: string; onClick?: () => void }

  /** navigable: stack of views with breadcrumb + back stack. */
  views?: DrawerView[]
  initialViewId?: string

  /** sheet: relative snap points (0..1 of available height). */
  snapPoints?: number[]
  defaultSnapIndex?: number

  closeOnScrim?: boolean
  closeOnEsc?: boolean
  ariaLabel?: string
  children?: ReactNode
  className?: string
  /** Story-only: render without a portal. */
  inlineRender?: boolean
}

export function Drawer(props: DrawerProps) {
  const {
    variant = 'side',
    open,
    defaultOpen = false,
    onOpenChange,
    side: rawSide,
    size = 'md',
    title,
    primaryAction,
    secondaryAction,
    views,
    initialViewId,
    snapPoints = [0.4, 0.8],
    defaultSnapIndex = 0,
    closeOnScrim = true,
    closeOnEsc = true,
    ariaLabel,
    children,
    className,
    inlineRender = false,
  } = props

  const side: DrawerSide = variant === 'sheet' ? 'bottom' : (rawSide ?? 'right')

  const titleId = useId()
  const isControlled = open !== undefined
  const [innerOpen, setInnerOpen] = useState<boolean>(defaultOpen)
  const isOpen = isControlled ? open! : innerOpen

  const setOpenState = useCallback((next: boolean) => {
    if (!isControlled) setInnerOpen(next)
    onOpenChange?.(next)
  }, [isControlled, onOpenChange])

  // ---------- Navigation stack ----------
  const [stack, setStack] = useState<string[]>(() => initialViewId ? [initialViewId] : (views?.[0] ? [views[0].id] : []))
  const top = stack[stack.length - 1]
  const pushView = (id: string) => setStack(prev => [...prev, id])
  const popView = () => setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev)

  useEffect(() => {
    if (!isOpen) {
      // Reset stack when fully closed.
      setStack(initialViewId ? [initialViewId] : (views?.[0] ? [views[0].id] : []))
    }
  }, [isOpen, initialViewId, views])

  // ---------- Sheet snap points ----------
  const [snapIndex, setSnapIndex] = useState<number>(defaultSnapIndex)
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<{ startY: number; startSnap: number } | null>(null)
  const [dragOffset, setDragOffset] = useState(0)

  const handleSheetPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (variant !== 'sheet') return
    dragRef.current = { startY: event.clientY, startSnap: snapIndex }
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
  }
  const handleSheetPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    const delta = event.clientY - dragRef.current.startY
    setDragOffset(delta)
  }
  const handleSheetPointerUp = () => {
    if (!dragRef.current) return
    const delta = dragOffset
    const sheetEl = sheetRef.current
    const h = sheetEl?.getBoundingClientRect().height ?? 0
    if (delta > h * 0.25) {
      // Drag-to-dismiss
      setOpenState(false)
    } else if (delta < -40 && snapIndex < snapPoints.length - 1) {
      setSnapIndex(i => Math.min(snapPoints.length - 1, i + 1))
    } else if (delta > 40 && snapIndex > 0) {
      setSnapIndex(i => Math.max(0, i - 1))
    }
    setDragOffset(0)
    dragRef.current = null
  }

  // ---------- Focus management ----------
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement | null
    const id = requestAnimationFrame(() => {
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')
      const first = focusables?.[0]
      if (first) first.focus()
      else dialogRef.current?.focus()
    })
    return () => {
      cancelAnimationFrame(id)
      previousFocusRef.current?.focus?.()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || inlineRender) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen, inlineRender])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && closeOnEsc) {
      event.stopPropagation()
      setOpenState(false)
    }
  }, [closeOnEsc, setOpenState])

  if (!isOpen) return null

  const handleScrimDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!closeOnScrim) return
    if (event.target === event.currentTarget) setOpenState(false)
  }

  const classes = [
    'iux-drawer',
    `iux-drawer--${variant}`,
    `iux-drawer--side-${side}`,
    `iux-drawer--size-${size}`,
    className,
  ].filter(Boolean).join(' ')

  const sheetStyle: CSSProperties = variant === 'sheet'
    ? {
        height: `${(snapPoints[snapIndex] ?? 0.5) * 100}%`,
        transform: `translateY(${Math.max(0, dragOffset)}px)`,
      }
    : {}

  const currentView = views?.find(v => v.id === top)

  const dialog = (
    <div
      className="iux-drawer__scrim"
      onMouseDown={handleScrimDown}
      role="presentation"
    >
      <div
        ref={el => {
          dialogRef.current = el
          if (variant === 'sheet') sheetRef.current = el
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        className={classes}
        style={sheetStyle}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {variant === 'sheet' && (
          <div
            className="iux-drawer__handle"
            onPointerDown={handleSheetPointerDown}
            onPointerMove={handleSheetPointerMove}
            onPointerUp={handleSheetPointerUp}
            onPointerCancel={handleSheetPointerUp}
            aria-label="Drag handle"
          />
        )}

        {(title || variant === 'navigable') && (
          <header className="iux-drawer__header">
            {variant === 'navigable' && stack.length > 1 && (
              <button type="button" className="iux-drawer__back" onClick={popView} aria-label="Back">‹</button>
            )}
            <div className="iux-drawer__header-text">
              {title && <h2 id={titleId} className="iux-drawer__title">{title}</h2>}
              {variant === 'navigable' && (
                <nav className="iux-drawer__breadcrumb" aria-label="Breadcrumb">
                  {stack.map((id, i) => {
                    const v = views?.find(vv => vv.id === id)
                    return (
                      <span key={`${id}-${i}`} className="iux-drawer__crumb">
                        {i > 0 && <span aria-hidden="true">/</span>}
                        <span>{v?.title ?? id}</span>
                      </span>
                    )
                  })}
                </nav>
              )}
            </div>
            <button type="button" className="iux-drawer__close" onClick={() => setOpenState(false)} aria-label="Close">×</button>
          </header>
        )}

        <div className={variant === 'sectioned' || variant === 'navigable' ? 'iux-drawer__body iux-drawer__body--scroll' : 'iux-drawer__body'}>
          {variant === 'navigable' && currentView ? currentView.render(pushView, popView) : children}
        </div>

        {(primaryAction || secondaryAction) && (
          <footer
            className={
              variant === 'sectioned' || variant === 'navigable'
                ? 'iux-drawer__footer iux-drawer__footer--sticky'
                : 'iux-drawer__footer'
            }
          >
            {secondaryAction && (
              <button
                type="button"
                className="iux-drawer__btn iux-drawer__btn--neutral"
                onClick={() => { secondaryAction.onClick?.(); setOpenState(false) }}
              >{secondaryAction.label}</button>
            )}
            {primaryAction && (
              <button
                type="button"
                className="iux-drawer__btn iux-drawer__btn--primary"
                onClick={() => { primaryAction.onClick?.(); setOpenState(false) }}
              >{primaryAction.label}</button>
            )}
          </footer>
        )}
      </div>
    </div>
  )

  if (inlineRender) return dialog
  return createPortal(dialog, document.body)
}
