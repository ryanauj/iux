import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { getPortalTarget } from '../../theme/portalTarget'
import './Tooltip.css'

export type TooltipVariant = 'plain' | 'shortcut' | 'rich' | 'coach'
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

export interface CoachStep {
  current: number
  total: number
  onNext?: () => void
  onSkip?: () => void
}

export interface TooltipProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: TooltipVariant
  content: ReactNode
  /** rich: bold heading above content. */
  title?: ReactNode
  /** rich: optional thumbnail node (image or icon block). */
  thumbnail?: ReactNode
  /** shortcut: keyboard chip rendered on the trailing edge. */
  shortcut?: string
  /** coach: step indicator + next/skip buttons. */
  step?: CoachStep
  /** rich: click-to-pin. */
  pinnable?: boolean

  side?: TooltipSide
  /** Show delay (ms). */
  delayMs?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void

  /** Trigger element — single React element that accepts ref + standard event handlers. */
  children: ReactElement
  className?: string
}

interface Position {
  top: number
  left: number
  side: TooltipSide
}

export function Tooltip({
  variant = 'plain',
  content,
  title,
  thumbnail,
  shortcut,
  step,
  pinnable = false,
  side = 'top',
  delayMs = 250,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: TooltipProps) {
  const id = useId()
  const isControlled = open !== undefined
  const [innerOpen, setInnerOpen] = useState<boolean>(defaultOpen)
  const isOpen = isControlled ? open! : innerOpen
  const [pinned, setPinned] = useState(false)

  const triggerRef = useRef<HTMLElement | null>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const showTimerRef = useRef<number | null>(null)

  const setOpenState = useCallback((next: boolean) => {
    if (!isControlled) setInnerOpen(next)
    onOpenChange?.(next)
  }, [isControlled, onOpenChange])

  const show = useCallback(() => {
    if (showTimerRef.current !== null) window.clearTimeout(showTimerRef.current)
    if (delayMs <= 0) { setOpenState(true); return }
    showTimerRef.current = window.setTimeout(() => setOpenState(true), delayMs)
  }, [delayMs, setOpenState])

  const hide = useCallback(() => {
    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current)
      showTimerRef.current = null
    }
    if (pinned) return
    setOpenState(false)
  }, [pinned, setOpenState])

  // Hide on Escape.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPinned(false); setOpenState(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, setOpenState])

  // ---------- Positioning ----------
  const [position, setPosition] = useState<Position | null>(null)

  useLayoutEffect(() => {
    if (!isOpen) return
    const trigger = triggerRef.current
    const tip = tipRef.current
    if (!trigger || !tip) return
    const tRect = trigger.getBoundingClientRect()
    const ttRect = tip.getBoundingClientRect()
    const margin = 8
    let top = 0; let left = 0
    switch (side) {
      case 'top':
        top = tRect.top - ttRect.height - margin
        left = tRect.left + tRect.width / 2 - ttRect.width / 2
        break
      case 'bottom':
        top = tRect.bottom + margin
        left = tRect.left + tRect.width / 2 - ttRect.width / 2
        break
      case 'left':
        top = tRect.top + tRect.height / 2 - ttRect.height / 2
        left = tRect.left - ttRect.width - margin
        break
      case 'right':
        top = tRect.top + tRect.height / 2 - ttRect.height / 2
        left = tRect.right + margin
        break
    }
    setPosition({ top: top + window.scrollY, left: left + window.scrollX, side })
  }, [isOpen, side, content, title])

  // Dismiss the tooltip when a touch lands outside the trigger or tooltip — gives
  // touch users a way to close, since hover-leave never fires.
  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      const target = e.target as Node | null
      if (!target) return
      if (triggerRef.current?.contains(target)) return
      if (tipRef.current?.contains(target)) return
      setPinned(false)
      setOpenState(false)
    }
    window.addEventListener('pointerdown', onPointerDown, true)
    return () => window.removeEventListener('pointerdown', onPointerDown, true)
  }, [isOpen, setOpenState])

  // ---------- Inject event handlers on the trigger ----------
  if (!isValidElement(children)) {
    throw new Error('Tooltip requires a single React element child')
  }

  const triggerProps = {
    onPointerEnter: (e: React.PointerEvent) => {
      const orig = (children.props as { onPointerEnter?: (e: React.PointerEvent) => void }).onPointerEnter
      orig?.(e)
      // Touch enter fires on tap-down but is followed immediately by leave on tap-up;
      // for touch we rely on the click handler below instead.
      if (e.pointerType === 'touch') return
      show()
    },
    onPointerLeave: (e: React.PointerEvent) => {
      const orig = (children.props as { onPointerLeave?: (e: React.PointerEvent) => void }).onPointerLeave
      orig?.(e)
      if (e.pointerType === 'touch') return
      hide()
    },
    onFocus: (e: React.FocusEvent) => {
      const orig = (children.props as { onFocus?: (e: React.FocusEvent) => void }).onFocus
      orig?.(e)
      show()
    },
    onBlur: (e: React.FocusEvent) => {
      const orig = (children.props as { onBlur?: (e: React.FocusEvent) => void }).onBlur
      orig?.(e)
      hide()
    },
    onClick: (e: React.MouseEvent) => {
      const orig = (children.props as { onClick?: (e: React.MouseEvent) => void }).onClick
      orig?.(e)
      if (pinnable) {
        setPinned(p => {
          const next = !p
          if (next) setOpenState(true)
          return next
        })
        return
      }
      // Non-pinnable: on touch a click is the only way to surface the tooltip,
      // so toggle visibility. Desktop already handles this via hover/focus.
      const nativeType = (e.nativeEvent as PointerEvent | MouseEvent | undefined)
      const pointerType = (nativeType && 'pointerType' in nativeType) ? nativeType.pointerType : ''
      if (pointerType === 'touch') {
        if (isOpen) setOpenState(false)
        else show()
      }
    },
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node
      const childRef = (children as ReactElement & { ref?: unknown }).ref
      if (typeof childRef === 'function') childRef(node)
      else if (childRef && typeof childRef === 'object') (childRef as { current: unknown }).current = node
    },
    'aria-describedby': isOpen ? id : undefined,
  }

  const triggerEl = cloneElement(children, triggerProps as Partial<typeof children.props>)

  const style: CSSProperties = position
    ? { top: `${position.top}px`, left: `${position.left}px` }
    : { opacity: 0, top: 0, left: 0 }

  const tooltip = isOpen ? (
    <div
      ref={tipRef}
      id={id}
      role={variant === 'coach' ? 'dialog' : 'tooltip'}
      aria-modal={variant === 'coach' ? false : undefined}
      className={[
        'iux-tooltip',
        `iux-tooltip--${variant}`,
        `iux-tooltip--side-${side}`,
        pinned && 'is-pinned',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
      onMouseEnter={() => { if (showTimerRef.current !== null) { window.clearTimeout(showTimerRef.current); showTimerRef.current = null } }}
    >
      {variant === 'rich' && thumbnail && (
        <div className="iux-tooltip__thumb">{thumbnail}</div>
      )}

      <div className="iux-tooltip__body">
        {variant === 'rich' && title && (
          <div className="iux-tooltip__title">{title}</div>
        )}
        {variant === 'coach' && step && (
          <div className="iux-tooltip__step-meta">Step {step.current} of {step.total}</div>
        )}
        <div className="iux-tooltip__content">{content}</div>
        {variant === 'shortcut' && shortcut && (
          <kbd className="iux-tooltip__kbd">{shortcut}</kbd>
        )}
        {variant === 'coach' && step && (
          <div className="iux-tooltip__step-actions">
            <button type="button" className="iux-tooltip__btn iux-tooltip__btn--ghost" onClick={() => { step.onSkip?.(); setOpenState(false) }}>Skip</button>
            <button type="button" className="iux-tooltip__btn iux-tooltip__btn--primary" onClick={() => { step.onNext?.() }}>
              {step.current >= step.total ? 'Done' : 'Next'}
            </button>
          </div>
        )}
        {variant === 'rich' && pinnable && pinned && (
          <button
            type="button"
            className="iux-tooltip__btn iux-tooltip__btn--ghost"
            onClick={() => { setPinned(false); setOpenState(false) }}
          >Close</button>
        )}
      </div>

      <span className="iux-tooltip__arrow" aria-hidden="true" />
    </div>
  ) : null

  return (
    <>
      {triggerEl}
      {tooltip && typeof document !== 'undefined' && createPortal(tooltip, getPortalTarget())}
    </>
  )
}
