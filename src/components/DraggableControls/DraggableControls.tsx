// ABOUTME: Floating, freely draggable demo-controls overlay that renders either as a circular FAB (Button style) or a compact Edge Strip; persists position and open state to localStorage and adapts layout to phone-sized viewports.

import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'
import { usePersistedPref } from '../../lib/usePersistedPref'
import { PalettePicker } from '../PalettePicker/PalettePicker'
import { Select } from '../Select/Select'
import './DraggableControls.css'

/**
 * Threshold at which an in-popover search input is shown (Strip variant).
 * Below this, the list fits comfortably without filtering; above it, long
 * lists like the palette catalogue (40+) benefit from typing to narrow.
 */
// ABOUTME: Minimum option count at which a search/filter input is added to Strip popovers; lists shorter than this are shown without a filter field.
const SEARCHABLE_THRESHOLD = 6

// ABOUTME: Presentation mode: 'button' is a circular FAB that opens a floating panel, 'strip' is a compact icon bar anchored to an edge with slot-level popovers.
export type ControlsStyle = 'button' | 'strip'

// ABOUTME: localStorage key under which the user's preferred controls style (button or strip) is persisted.
const CONTROLS_STYLE_KEY = 'iux-controls-style'
// ABOUTME: Fallback controls style used when no persisted preference exists.
const DEFAULT_CONTROLS_STYLE: ControlsStyle = 'button'

/**
 * Open state of the "Settings" group that nests the non-palette fields
 * (view, layout, nav, motion). Collapsed by default — these are reached
 * occasionally, so the panel opens to just the palette picker and a single
 * disclosure rather than the full settings stack. Persisted so the choice
 * sticks across pages and reopens.
 */
// ABOUTME: localStorage key for the open/closed state of the Settings disclosure group inside the Button-variant panel.
const SETTINGS_OPEN_KEY = 'iux-controls-settings-open'
// ABOUTME: Type guard that accepts only the '0' or '1' string literals stored for boolean localStorage prefs.
const isBoolPref = (raw: string): raw is '0' | '1' => raw === '0' || raw === '1'

// ABOUTME: Type guard that validates a raw localStorage string as a ControlsStyle value before applying it.
const isControlsStyle = (raw: string): raw is ControlsStyle =>
  raw === 'button' || raw === 'strip'

// ABOUTME: Shared user preference for the floating controls' style (Button FAB vs Edge Strip).
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

// ABOUTME: A single control field descriptor: key, label, short label for the Strip icon, current value, options array, onChange callback, and an optional kind='palette' flag that substitutes PalettePicker for a generic select.
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

// ABOUTME: An x/y pixel coordinate representing the floating container's top-left position within the viewport.
type Position = { x: number; y: number }

// ABOUTME: Props for the DraggableControls root — the current controls style, a callback to change it, and the array of control field descriptors to render.
type Props = {
  style: ControlsStyle
  onStyleChange: (next: ControlsStyle) => void
  fields: Field[]
}

// ABOUTME: Returns the per-style localStorage key used to persist the floating container's position.
const POS_KEY = (s: ControlsStyle) => `iux-controls-pos-${s}`
// ABOUTME: Returns the per-style localStorage key used to persist the panel's open/closed state.
const OPEN_KEY = (s: ControlsStyle) => `iux-controls-open-${s}`

// ABOUTME: Factory-default pixel positions for each controls style when no saved position exists on a desktop viewport.
const DEFAULTS: Record<ControlsStyle, Position> = {
  button: { x: 24, y: 24 },
  strip: { x: 16, y: 96 },
}

// ABOUTME: Clamps n to the inclusive [lo, hi] range; used to keep the draggable container within the viewport bounds.
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
// ABOUTME: Computes the initial position for a controls style, placing the button FAB in the bottom-right thumb zone and the strip near the left edge on phone-sized viewports (≤640px wide or ≤480px tall).
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

// ABOUTME: Reads the saved Position for a controls style from localStorage; falls back to defaultPos when absent or unparseable.
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

// ABOUTME: Reads the saved open/closed state for a controls style from localStorage; returns the fallback boolean when no stored value is found.
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

// ABOUTME: The two available controls-style options rendered by the StyleSwitcher radiogroup.
const STYLE_OPTIONS: { value: ControlsStyle; label: string }[] = [
  { value: 'button', label: 'Button' },
  { value: 'strip', label: 'Strip' },
]

// ABOUTME: Vertical half of the popover quadrant — 'up' means the panel opens upward from the anchor, 'down' means downward.
type VerticalDir = 'up' | 'down'
// ABOUTME: Horizontal half of the popover quadrant — 'left' means the panel extends leftward from the anchor, 'right' means rightward.
type HorizontalDir = 'left' | 'right'
// ABOUTME: The four possible quadrants for the Button-variant panel, expressed as a vertical-horizontal direction pair.
type Quadrant = `${VerticalDir}-${HorizontalDir}`

// ABOUTME: Inspects the trigger button's bounding rect and returns the quadrant with the most available viewport space, used to anchor the floating panel away from viewport edges.
function pickQuadrant(rect: DOMRect): Quadrant {
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const spaceRight = window.innerWidth - rect.right
  const spaceLeft = rect.left
  const v: VerticalDir = spaceBelow >= spaceAbove ? 'down' : 'up'
  const h: HorizontalDir = spaceRight >= spaceLeft ? 'right' : 'left'
  return `${v}-${h}`
}

/**
 * Reflect a scroll container's overflow onto `data-overflow-top` /
 * `data-overflow-bottom` attributes so CSS can fade the edge that still
 * has hidden content beyond it. The panel routinely outgrows a phone
 * viewport, and without a cue a clipped panel just looks like the whole
 * thing. Recomputes on scroll, on container resize, and on subtree
 * mutations — the palette Browse disclosure and the settings group add and remove
 * rows, which changes how much is hidden.
 */
// ABOUTME: Hook that toggles data-overflow-top and data-overflow-bottom attributes on a scrollable panel element when content is hidden above or below the visible area, enabling CSS fade indicators.
function useOverflowEdges(ref: RefObject<HTMLElement>, active: boolean) {
  useEffect(() => {
    if (!active) return
    const el = ref.current
    if (!el) return
    const update = () => {
      const hiddenBelow = el.scrollHeight - el.clientHeight - el.scrollTop
      el.toggleAttribute('data-overflow-top', el.scrollTop > 1)
      el.toggleAttribute('data-overflow-bottom', hiddenBelow > 1)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    const mo = new MutationObserver(update)
    mo.observe(el, { childList: true, subtree: true })
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
      mo.disconnect()
    }
  }, [ref, active])
}

// ABOUTME: Root draggable container that handles pointer-based drag positioning, viewport clamping on resize/orientation-change, and localStorage persistence of position and open state; delegates to ButtonVariant or StripVariant based on the style prop.
/**
 * Uses pointer capture (`setPointerCapture`) for smooth drag without losing
 * the pointer on fast movement. Position is stored per style key so Button and
 * Strip remember independent locations. Delegates rendering to `ButtonVariant`
 * (FAB + expandable panel) or `StripVariant` (icon row with per-slot popovers)
 * according to the `style` prop; both sub-renderers receive shared drag handlers.
 */
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

// ABOUTME: Shared props passed down to both ButtonVariant and StripVariant — the field list, current-value summary strings, open state, drag event handlers, the active controls style, and the style-change callback.
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

// ABOUTME: Radiogroup of two buttons (Button / Strip) that lets the user switch the controls presentation style; used in the footer of both ButtonVariant and StripVariant.
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
// ABOUTME: Renders the Button-style controls variant — a circular FAB that opens a floating panel containing the palette picker, a collapsible Settings group for other fields, and a footer style-switcher; computes available height and panel quadrant on open.
function ButtonVariant({ fields, summaries, open, setOpen, dragHandlers, variantStyle, onStyleChange }: VariantProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [quadrant, setQuadrant] = useState<Quadrant>('down-right')
  const [maxHeight, setMaxHeight] = useState<number | null>(null)

  /*
   * Recompute which corner the panel expands toward AND cap its height to
   * the space actually available in that direction. Up quadrants anchor by
   * the panel's bottom edge (at the FAB top, less the 0.5rem gap), so the
   * room to grow is everything from there up to the top margin; down
   * quadrants mirror it downward. Without this cap a bottom-anchored panel
   * taller than the space above runs straight off the top of the screen
   * with its first rows clipped and unreachable — `max-height` alone
   * (sized to the viewport) doesn't help, because it measures content, not
   * the gap above the anchor.
   */
  const recompute = () => {
    const el = triggerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const q = pickQuadrant(rect)
    setQuadrant(q)
    const gap = 8
    const margin = 8
    const available = q.startsWith('up')
      ? rect.top - gap - margin
      : window.innerHeight - rect.bottom - gap - margin
    setMaxHeight(Math.max(0, Math.round(available)))
  }

  useEffect(() => {
    if (!open) return
    recompute()
    window.addEventListener('resize', recompute)
    window.addEventListener('orientationchange', recompute)
    return () => {
      window.removeEventListener('resize', recompute)
      window.removeEventListener('orientationchange', recompute)
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
    if (!open) recompute()
    setOpen(!open)
  }

  useOverflowEdges(panelRef, open)

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
          style={maxHeight != null ? ({ '--panel-max-height': `${maxHeight}px` } as CSSProperties) : undefined}
          role="group"
          aria-label="Demo controls"
        >
          <span className="ctrl-button__edge ctrl-button__edge--top" aria-hidden="true" />
          {paletteFields.length > 0 && (
            <div className="ctrl-button__palette">
              {paletteFields.map(f => (
                <PalettePicker key={f.key} field={f} variant="button" />
              ))}
            </div>
          )}
          {otherFields.length > 0 && (
            <div className="ctrl-button__sections">
              <SettingsGroup fields={otherFields} />
            </div>
          )}
          <div className="ctrl-button__footer">
            <StyleSwitcher value={variantStyle} onChange={onStyleChange} />
          </div>
          <span className="ctrl-button__edge ctrl-button__edge--bottom" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

/**
 * Wraps the non-palette fields (view, layout, nav, motion) in one
 * collapsed-by-default disclosure so the panel stays compact — the palette
 * picker is the everyday control, and these sit one click away under
 * "Settings" rather than always stacked open. Each field keeps its own
 * inner CollapsibleSection so only the chosen one expands.
 */
// ABOUTME: Persisted collapsible disclosure that wraps the non-palette fields under a "Settings" heading; persists its own open state to localStorage so it re-opens in the same state on next visit.
function SettingsGroup({ fields }: { fields: Field[] }) {
  const [openRaw, setOpenRaw] = usePersistedPref<'0' | '1'>(
    SETTINGS_OPEN_KEY,
    '0',
    isBoolPref,
  )
  const open = openRaw === '1'
  return (
    <div className={`ctrl-button__group${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="ctrl-button__group-toggle"
        aria-expanded={open}
        onClick={() => setOpenRaw(open ? '0' : '1')}
      >
        <span className="ctrl-button__group-caret" aria-hidden="true">{open ? '▾' : '▸'}</span>
        <span className="ctrl-button__group-label">Settings</span>
      </button>
      {open && (
        <div className="ctrl-button__group-body">
          {fields.map(f => (
            <CollapsibleSection key={f.key} field={f} />
          ))}
        </div>
      )}
    </div>
  )
}

// ABOUTME: Accordion-style disclosure for a single non-palette field inside the Settings group — shows the current value in the collapsed header and expands to a Select combobox or a radio button group depending on option count.
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

// ABOUTME: Props for the StripPopover sub-component — the field to display, the computed quadrant for positioning, the slot button's bounding rect for max-height calculation, and an onSelect callback.
interface StripPopoverProps {
  field: Field
  quadrant: StripQuadrant
  slotRect: DOMRect | null
  onSelect: (value: string) => void
}

// ABOUTME: Floating popover for a single Strip slot — renders the field label, an optional search input (above SEARCHABLE_THRESHOLD options), a filtered option list, and fires onSelect when an option is chosen.
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
// ABOUTME: The four possible quadrants for Strip-variant popovers, combining horizontal (left/right) and vertical (up/down) directions relative to the slot button.
type StripQuadrant = `${HorizontalDir}-${VerticalDir}`

// ABOUTME: Props for the PaletteStripSlot wrapper — the palette field, popover open state, the computed quadrant and slot rect for positioning, and toggle/close event handlers.
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

// ABOUTME: Inspects a slot button's bounding rect and returns the StripQuadrant with the most viewport space on each axis, determining which direction the Strip popover opens.
function pickStripQuadrant(rect: DOMRect): StripQuadrant {
  const spaceRight = window.innerWidth - rect.right
  const spaceLeft = rect.left
  const spaceDown = window.innerHeight - rect.top
  const spaceUp = rect.bottom
  const h: HorizontalDir = spaceRight >= spaceLeft ? 'right' : 'left'
  const v: VerticalDir = spaceDown >= spaceUp ? 'down' : 'up'
  return `${h}-${v}`
}

// ABOUTME: Renders the Strip-style controls variant — a vertical icon bar with a grip handle and per-slot expand buttons that open positioned popovers; palette fields use PaletteStripSlot, others use StripPopover.
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
