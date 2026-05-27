import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { usePersistedPref } from '../../lib/usePersistedPref'
import { PalettePicker } from '../PalettePicker/PalettePicker'
import { Select } from '../Select/Select'
import './DraggableControls.css'

/**
 * Threshold at which an in-popover search input is shown (Strip variant).
 * Below this, the list fits comfortably without filtering; above it, long
 * lists like the palette catalogue (40+) benefit from typing to narrow.
 */
const SEARCHABLE_THRESHOLD = 6

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
  /**
   * Optional marker that swaps the generic Select / StripPopover for a
   * dedicated picker. `'palette'` substitutes `PalettePicker`, which
   * handles tag search, pinned / active groups, inline arrow cycling,
   * and custom-group management. The full palette registry is read by
   * the picker itself, so `options` can be empty for palette fields.
   */
  kind?: 'palette'
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

  const paletteFields = fields.filter(f => f.kind === 'palette')
  const otherFields = fields.filter(f => f.kind !== 'palette')

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
          {paletteFields.length > 0 && (
            <div className="ctrl-button__palette">
              {paletteFields.map(f => (
                <PalettePicker key={f.key} field={f} variant="button" />
              ))}
            </div>
          )}
          {otherFields.length > 0 && (
            <div className="ctrl-button__sections">
              {otherFields.map(f => (
                <CollapsibleSection key={f.key} field={f} />
              ))}
            </div>
          )}
          <div className="ctrl-button__footer">
            <StyleSwitcher value={variantStyle} onChange={onStyleChange} />
          </div>
        </div>
      )}
    </div>
  )
}

function CollapsibleSection({ field }: { field: Field }) {
  const [open, setOpen] = useState(false)
  const current = field.options.find(o => o.value === field.value)
  const currentLabel = current?.label ?? field.value
  const useSelect = field.options.length >= SEARCHABLE_THRESHOLD
  return (
    <div className={`ctrl-button__section${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="ctrl-button__section-toggle"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="ctrl-button__section-caret" aria-hidden="true">{open ? '▾' : '▸'}</span>
        <span className="ctrl-button__section-label">{field.label}</span>
        <span className="ctrl-button__section-value">{currentLabel}</span>
      </button>
      {open && (
        <div className="ctrl-button__section-body">
          {useSelect ? (
            <Select
              variant="combobox"
              value={field.value}
              options={field.options}
              onChange={next => { if (next) field.onChange(next) }}
            />
          ) : (
            <div className="ctrl-button__section-options" role="radiogroup" aria-label={field.label}>
              {field.options.map(o => {
                const active = o.value === field.value
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={`ctrl-button__section-option${active ? ' is-active' : ''}`}
                    onClick={() => field.onChange(o.value)}
                  >
                    {o.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface StripPopoverProps {
  field: Field
  quadrant: StripQuadrant
  slotRect: DOMRect | null
  onSelect: (value: string) => void
}

function StripPopover({ field, quadrant, slotRect, onSelect }: StripPopoverProps) {
  const [query, setQuery] = useState('')
  const searchable = field.options.length >= SEARCHABLE_THRESHOLD
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchable) inputRef.current?.focus()
  }, [searchable])

  const filtered = useMemo(() => {
    if (!searchable) return field.options
    const q = query.trim().toLowerCase()
    if (!q) return field.options
    return field.options.filter(o => o.label.toLowerCase().includes(q))
  }, [searchable, query, field.options])

  /*
   * Grow max-height to fill the viewport space available from the slot
   * anchor instead of capping at a fixed ~22rem. Without this, long lists
   * (e.g. the 40+ palette catalogue) get clipped and force an awkward
   * inner scroll even when there's plenty of room on screen. The CSS
   * custom property keeps the mobile media-query override authoritative.
   *
   * Cap at the actual available space — flooring to a minimum that
   * exceeds it pushes the popover past the opposite viewport edge.
   */
  const dynamicStyle = useMemo<CSSProperties>(() => {
    if (!slotRect) return {}
    const margin = 16
    const available = quadrant.endsWith('down')
      ? window.innerHeight - slotRect.top - margin
      : slotRect.bottom - margin
    return { '--popover-max-height': `${Math.max(0, Math.round(available))}px` } as CSSProperties
  }, [slotRect, quadrant])

  return (
    <div
      className={`ctrl-strip__popover ctrl-strip__popover--${quadrant}`}
      style={dynamicStyle}
      role="menu"
      aria-label={field.label}
    >
      <div className="ctrl-strip__popover-title">{field.label}</div>
      {searchable && (
        <input
          ref={inputRef}
          type="text"
          className="ctrl-strip__popover-search"
          placeholder={`Filter ${field.options.length} options…`}
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label={`Filter ${field.label} options`}
        />
      )}
      {filtered.length === 0 ? (
        <div className="ctrl-strip__popover-empty">No matches</div>
      ) : (
        <ul className="ctrl-strip__list">
          {filtered.map(o => {
            const selected = o.value === field.value
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  className={`ctrl-strip__list-item${selected ? ' ctrl-strip__list-item--selected' : ''}`}
                  onClick={() => onSelect(o.value)}
                >
                  {o.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/* ===== Variation B: Edge Strip ===== */
type StripQuadrant = `${HorizontalDir}-${VerticalDir}`

interface PaletteStripSlotProps {
  field: Field
  isActive: boolean
  quadrant: StripQuadrant
  slotRect: DOMRect | null
  onToggle: (e: ReactMouseEvent<HTMLButtonElement>) => void
  onClose: () => void
}

/**
 * Strip-variant wrapper for the palette picker. Forwards the slot
 * button's click event to the parent so it can capture the rect for
 * popover positioning the same way `toggleSlot` does for generic fields.
 */
function PaletteStripSlot({
  field,
  isActive,
  quadrant,
  slotRect,
  onToggle,
  onClose,
}: PaletteStripSlotProps) {
  return (
    <PalettePicker
      field={field}
      variant="strip"
      popoverOpen={isActive}
      onSlotClick={onToggle}
      onPanelClose={onClose}
      popoverQuadrant={quadrant}
      slotRect={slotRect}
    />
  )
}

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
  const [slotRect, setSlotRect] = useState<DOMRect | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const toggleSlot = (key: string, e: ReactMouseEvent<HTMLButtonElement>) => {
    if (activeKey === key) {
      setActiveKey(null)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    setPopoverQuadrant(pickStripQuadrant(rect))
    setSlotRect(rect)
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
            {[...fields.filter(f => f.kind === 'palette'), ...fields.filter(f => f.kind !== 'palette')].map(f => {
              const opt = f.options.find(o => o.value === f.value)
              const isActive = activeKey === f.key
              if (f.kind === 'palette') {
                return (
                  <PaletteStripSlot
                    key={f.key}
                    field={f}
                    isActive={isActive}
                    quadrant={popoverQuadrant}
                    slotRect={slotRect}
                    onToggle={e => toggleSlot(f.key, e)}
                    onClose={() => setActiveKey(null)}
                  />
                )
              }
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
                    <StripPopover
                      field={f}
                      quadrant={popoverQuadrant}
                      slotRect={slotRect}
                      onSelect={value => {
                        f.onChange(value)
                        setActiveKey(null)
                      }}
                    />
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
