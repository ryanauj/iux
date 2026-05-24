import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { usePersistedPref } from '../../lib/usePersistedPref'
import './DraggableControls.css'

export type ControlsStyle = 'button' | 'strip'

const CONTROLS_STYLE_KEY = 'iux-controls-style'
const DEFAULT_CONTROLS_STYLE: ControlsStyle = 'button'

const isControlsStyle = (raw: string): raw is ControlsStyle =>
  raw === 'button' || raw === 'strip'

/**
 * Shared user preference for the floating controls' style (Button FAB vs
 * Edge Strip). Backed by localStorage so the choice survives navigation
 * between the showcase pages and the standalone apps, and stays in sync
 * across every mounted DraggableControls in the same tab.
 */
export function useControlsStyle() {
  return usePersistedPref<ControlsStyle>(
    CONTROLS_STYLE_KEY,
    DEFAULT_CONTROLS_STYLE,
    isControlsStyle,
  )
}

export type Field = {
  key: string
  label: string
  short: string
  value: string
  options: { value: string; label: string }[]
  onChange: (next: string) => void
}

type Position = { x: number; y: number }

type Props = {
  style: ControlsStyle
  onStyleChange: (next: ControlsStyle) => void
  fields: Field[]
}

const POS_KEY = (s: ControlsStyle) => `iux-controls-pos-${s}`
const OPEN_KEY = (s: ControlsStyle) => `iux-controls-open-${s}`

const DEFAULTS: Record<ControlsStyle, Position> = {
  button: { x: 24, y: 24 },
  strip: { x: 16, y: 96 },
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/*
 * On a phone the page header ("iux — component stories") sits at the top
 * edge — the same corner the desktop default puts the floating button.
 * The FAB then floats above the title text and chops "iu" off the start.
 * Drop the FAB to the bottom-right gutter on phone-sized viewports so the
 * title is clear and the FAB sits in the thumb-reachable zone. The check
 * uses BOTH width and height so phone landscape (e.g. iPhone 13 at
 * 664×390 — just over the 640px width breakpoint) is still treated as a
 * phone. Strip starts mid-left on desktop; on phones we keep it on the
 * left edge but push it down past the header.
 */
function defaultPos(style: ControlsStyle): Position {
  if (typeof window === 'undefined') return DEFAULTS[style]
  const isPhone = window.innerWidth <= 640 || window.innerHeight <= 480
  if (isPhone) {
    if (style === 'button') {
      // 3rem button + 16px margin on each side ≈ 64px.
      return {
        x: Math.max(16, window.innerWidth - 64),
        y: Math.max(16, window.innerHeight - 96),
      }
    }
    return { x: 16, y: 72 }
  }
  return DEFAULTS[style]
}

function loadPos(style: ControlsStyle): Position {
  try {
    const raw = localStorage.getItem(POS_KEY(style))
    if (raw) {
      const p = JSON.parse(raw) as Position
      if (typeof p.x === 'number' && typeof p.y === 'number') return p
    }
  } catch {
    /* ignore */
  }
  return defaultPos(style)
}

function loadOpen(style: ControlsStyle, fallback: boolean): boolean {
  try {
    const raw = localStorage.getItem(OPEN_KEY(style))
    if (raw === 'true') return true
    if (raw === 'false') return false
  } catch {
    /* ignore */
  }
  return fallback
}

const STYLE_OPTIONS: { value: ControlsStyle; label: string }[] = [
  { value: 'button', label: 'Button' },
  { value: 'strip', label: 'Strip' },
]

type VerticalDir = 'up' | 'down'
type HorizontalDir = 'left' | 'right'
type Quadrant = `${VerticalDir}-${HorizontalDir}`

function pickQuadrant(rect: DOMRect): Quadrant {
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const spaceRight = window.innerWidth - rect.right
  const spaceLeft = rect.left
  const v: VerticalDir = spaceBelow >= spaceAbove ? 'down' : 'up'
  const h: HorizontalDir = spaceRight >= spaceLeft ? 'right' : 'left'
  return `${v}-${h}`
}

export function DraggableControls({ style, onStyleChange, fields }: Props) {
  const [pos, setPos] = useState<Position>(() => loadPos(style))
  const [open, setOpen] = useState<boolean>(() => loadOpen(style, style !== 'button'))
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    sx: number; sy: number; ox: number; oy: number; pointerId: number; el: Element
  } | null>(null)

  useEffect(() => {
    setPos(loadPos(style))
    setOpen(loadOpen(style, style !== 'button'))
  }, [style])

  useEffect(() => {
    try { localStorage.setItem(POS_KEY(style), JSON.stringify(pos)) } catch { /* */ }
  }, [style, pos])

  useEffect(() => {
    try { localStorage.setItem(OPEN_KEY(style), String(open)) } catch { /* */ }
  }, [style, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const clampToViewport = () => {
      const el = containerRef.current
      if (!el) return
      const w = el.offsetWidth
      const h = el.offsetHeight
      setPos(prev => {
        const nx = clamp(prev.x, 4, Math.max(4, window.innerWidth - w - 4))
        const ny = clamp(prev.y, 4, Math.max(4, window.innerHeight - h - 4))
        return nx === prev.x && ny === prev.y ? prev : { x: nx, y: ny }
      })
    }
    clampToViewport()
    window.addEventListener('resize', clampToViewport)
    window.addEventListener('orientationchange', clampToViewport)
    return () => {
      window.removeEventListener('resize', clampToViewport)
      window.removeEventListener('orientationchange', clampToViewport)
    }
  }, [style, open])

  const onDragStart = (e: ReactPointerEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    const el = e.currentTarget
    dragRef.current = {
      sx: e.clientX, sy: e.clientY,
      ox: pos.x, oy: pos.y,
      pointerId: e.pointerId,
      el,
    }
    try { el.setPointerCapture(e.pointerId) } catch { /* */ }
  }

  const onDragMove = (e: ReactPointerEvent) => {
    const s = dragRef.current
    if (!s) return
    const el = containerRef.current
    const w = el?.offsetWidth ?? 80
    const h = el?.offsetHeight ?? 60
    setPos({
      x: clamp(s.ox + (e.clientX - s.sx), 4, window.innerWidth - w - 4),
      y: clamp(s.oy + (e.clientY - s.sy), 4, window.innerHeight - h - 4),
    })
  }

  const onDragEnd = (_e: ReactPointerEvent) => {
    const s = dragRef.current
    if (!s) return
    try { (s.el as Element & { releasePointerCapture: (id: number) => void }).releasePointerCapture(s.pointerId) } catch { /* */ }
    dragRef.current = null
  }

  const dragHandlers = {
    onPointerDown: onDragStart,
    onPointerMove: onDragMove,
    onPointerUp: onDragEnd,
    onPointerCancel: onDragEnd,
  }

  const containerStyle: CSSProperties = { left: pos.x, top: pos.y }
  const summaries = fields.map(f => {
    const opt = f.options.find(o => o.value === f.value)
    return opt?.label ?? f.value
  })

  return (
    <div
      ref={containerRef}
      className={`ctrl ctrl--${style}${open ? ' ctrl--open' : ' ctrl--closed'}`}
      style={containerStyle}
      role="region"
      aria-label="Demo controls"
    >
      {style === 'button' && (
        <ButtonVariant
          fields={fields}
          summaries={summaries}
          open={open}
          setOpen={setOpen}
          dragHandlers={dragHandlers}
          variantStyle={style}
          onStyleChange={onStyleChange}
        />
      )}
      {style === 'strip' && (
        <StripVariant
          fields={fields}
          summaries={summaries}
          open={open}
          setOpen={setOpen}
          dragHandlers={dragHandlers}
          variantStyle={style}
          onStyleChange={onStyleChange}
        />
      )}
    </div>
  )
}

type VariantProps = {
  fields: Field[]
  summaries: string[]
  open: boolean
  setOpen: (next: boolean) => void
  dragHandlers: {
    onPointerDown: (e: ReactPointerEvent) => void
    onPointerMove: (e: ReactPointerEvent) => void
    onPointerUp: (e: ReactPointerEvent) => void
    onPointerCancel: (e: ReactPointerEvent) => void
  }
  variantStyle: ControlsStyle
  onStyleChange: (next: ControlsStyle) => void
}

function StyleSwitcher({ value, onChange }: { value: ControlsStyle; onChange: (next: ControlsStyle) => void }) {
  return (
    <div className="ctrl__style-switcher" role="radiogroup" aria-label="Controls style">
      {STYLE_OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          className={`ctrl__style-btn${value === opt.value ? ' ctrl__style-btn--active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

/* ===== Variation A: Floating Button ===== */
function ButtonVariant({ fields, summaries, open, setOpen, dragHandlers, variantStyle, onStyleChange }: VariantProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [quadrant, setQuadrant] = useState<Quadrant>('down-right')

  const recomputeQuadrant = () => {
    const el = triggerRef.current
    if (!el) return
    setQuadrant(pickQuadrant(el.getBoundingClientRect()))
  }

  useEffect(() => {
    if (!open) return
    recomputeQuadrant()
    window.addEventListener('resize', recomputeQuadrant)
    window.addEventListener('orientationchange', recomputeQuadrant)
    return () => {
      window.removeEventListener('resize', recomputeQuadrant)
      window.removeEventListener('orientationchange', recomputeQuadrant)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDocPointer = (e: MouseEvent) => {
      const t = e.target as Node
      if (
        panelRef.current && !panelRef.current.contains(t) &&
        triggerRef.current && !triggerRef.current.contains(t)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocPointer)
    return () => document.removeEventListener('mousedown', onDocPointer)
  }, [open, setOpen])

  const handleClick = () => {
    if (!open) recomputeQuadrant()
    setOpen(!open)
  }

  return (
    <div className="ctrl-button">
      <button
        ref={triggerRef}
        type="button"
        className={`ctrl-button__fab${open ? ' ctrl-button__fab--open' : ''}`}
        aria-label={open ? 'Close controls. Drag to move.' : `Open controls. Current: ${summaries.join(', ')}. Drag to move.`}
        aria-expanded={open}
        onClick={handleClick}
        {...dragHandlers}
      >
        <span className="ctrl-button__fab-icon" aria-hidden="true">{open ? '×' : '◉'}</span>
      </button>
      {open && (
        <div
          ref={panelRef}
          className={`ctrl-button__panel ctrl-button__panel--${quadrant}`}
          role="group"
          aria-label="Demo controls"
        >
          <div className="ctrl-button__grid">
            {fields.map(f => (
              <label key={f.key} className="ctrl-button__tile">
                <span className="ctrl-button__tile-label">{f.label}</span>
                <select
                  className="ctrl-button__select"
                  value={f.value}
                  onChange={e => f.onChange(e.target.value)}
                >
                  {f.options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="ctrl-button__footer">
            <StyleSwitcher value={variantStyle} onChange={onStyleChange} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ===== Variation B: Edge Strip ===== */
type StripQuadrant = `${HorizontalDir}-${VerticalDir}`

function pickStripQuadrant(rect: DOMRect): StripQuadrant {
  const spaceRight = window.innerWidth - rect.right
  const spaceLeft = rect.left
  const spaceDown = window.innerHeight - rect.top
  const spaceUp = rect.bottom
  const h: HorizontalDir = spaceRight >= spaceLeft ? 'right' : 'left'
  const v: VerticalDir = spaceDown >= spaceUp ? 'down' : 'up'
  return `${h}-${v}`
}

function StripVariant({ fields, open, setOpen, dragHandlers, variantStyle, onStyleChange }: VariantProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [popoverQuadrant, setPopoverQuadrant] = useState<StripQuadrant>('right-down')
  const stripRef = useRef<HTMLDivElement>(null)

  const toggleSlot = (key: string, e: ReactMouseEvent<HTMLButtonElement>) => {
    if (activeKey === key) {
      setActiveKey(null)
      return
    }
    setPopoverQuadrant(pickStripQuadrant(e.currentTarget.getBoundingClientRect()))
    setActiveKey(key)
  }

  useEffect(() => {
    if (!activeKey) return
    const onDocPointer = (e: MouseEvent) => {
      const t = e.target as Node
      if (stripRef.current && !stripRef.current.contains(t)) {
        setActiveKey(null)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveKey(null)
    }
    document.addEventListener('mousedown', onDocPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [activeKey])

  return (
    <div className="ctrl-strip" ref={stripRef}>
      <button
        type="button"
        className="ctrl-strip__grip"
        aria-label="Drag controls"
        {...dragHandlers}
      >
        <span className="ctrl-strip__grip-dots" aria-hidden="true">⋮⋮</span>
      </button>
      {open ? (
        <>
          <div className="ctrl-strip__icons" role="toolbar" aria-label="Demo controls">
            {fields.map(f => {
              const opt = f.options.find(o => o.value === f.value)
              const isActive = activeKey === f.key
              return (
                <div key={f.key} className="ctrl-strip__slot">
                  <button
                    type="button"
                    className={`ctrl-strip__icon${isActive ? ' ctrl-strip__icon--active' : ''}`}
                    aria-label={`${f.label}: ${opt?.label ?? f.value}`}
                    aria-expanded={isActive}
                    onClick={e => toggleSlot(f.key, e)}
                  >
                    <span className="ctrl-strip__icon-short" aria-hidden="true">{f.short}</span>
                    <span className="ctrl-strip__icon-val">{opt?.label ?? f.value}</span>
                  </button>
                  {isActive && (
                    <div
                      className={`ctrl-strip__popover ctrl-strip__popover--${popoverQuadrant}`}
                      role="menu"
                      aria-label={f.label}
                    >
                      <div className="ctrl-strip__popover-title">{f.label}</div>
                      <ul className="ctrl-strip__list">
                        {f.options.map(o => {
                          const selected = o.value === f.value
                          return (
                            <li key={o.value}>
                              <button
                                type="button"
                                role="menuitemradio"
                                aria-checked={selected}
                                className={`ctrl-strip__list-item${selected ? ' ctrl-strip__list-item--selected' : ''}`}
                                onClick={() => {
                                  f.onChange(o.value)
                                  setActiveKey(null)
                                }}
                              >
                                {o.label}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="ctrl-strip__footer">
            <StyleSwitcher value={variantStyle} onChange={onStyleChange} />
            <button
              type="button"
              className="ctrl-strip__collapse"
              aria-label="Collapse controls"
              onClick={() => { setActiveKey(null); setOpen(false) }}
            >
              −
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="ctrl-strip__expand"
          aria-label="Expand controls"
          onClick={() => setOpen(true)}
        >
          +
        </button>
      )}
    </div>
  )
}
