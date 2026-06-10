// ABOUTME: Floating, freely draggable demo-controls overlay that renders either as a circular FAB (Button style) or as nothing at all (Hidden style, summoned by a tap gesture or the keyboard "Open preferences" skip-link); persists position and open state to localStorage, moves focus into the panel on open, and adapts layout to phone-sized viewports.

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'
import { usePersistedPref } from '../../lib/usePersistedPref'
import { PalettePicker } from '../PalettePicker/PalettePicker'
import { Select } from '../Select/Select'
import { NavAnchor } from '../AppShell/AppShell'
import type { NavControls } from '../AppShell/navLayouts'
import './DraggableControls.css'

/**
 * Threshold at which a single field's Select switches from an inline radio
 * group to a searchable combobox in the Button panel. Below this, the list
 * fits comfortably as buttons; above it (e.g. the palette catalogue, 40+),
 * typing to narrow is faster.
 */
// ABOUTME: Minimum option count at which a CollapsibleSection renders a searchable combobox instead of an inline radio group; shorter lists stay as buttons.
const SEARCHABLE_THRESHOLD = 6

// ABOUTME: Presentation mode: 'button' is a circular FAB that opens a floating panel; 'hidden' shows nothing on screen and is summoned only by the tap gesture, which relocates the panel under the tap and opens it.
export type ControlsStyle = 'button' | 'hidden'

// ABOUTME: localStorage key under which the user's preferred controls style (button or hidden) is persisted.
const CONTROLS_STYLE_KEY = 'iux-controls-style'
// ABOUTME: Fallback controls style used when no persisted preference exists.
const DEFAULT_CONTROLS_STYLE: ControlsStyle = 'button'

/**
 * Open state of the "Settings" group that nests the non-palette fields
 * (view, layout, nav, motion, open-gesture). Collapsed by default — these
 * are reached occasionally, so the panel opens to just the palette picker
 * and a single disclosure rather than the full settings stack. Persisted so
 * the choice sticks across pages and reopens.
 */
// ABOUTME: localStorage key for the open/closed state of the Settings disclosure group inside the Button-variant panel.
const SETTINGS_OPEN_KEY = 'iux-controls-settings-open'
// ABOUTME: Type guard that accepts only the '0' or '1' string literals stored for boolean localStorage prefs.
const isBoolPref = (raw: string): raw is '0' | '1' => raw === '0' || raw === '1'

// ABOUTME: Type guard that validates a raw localStorage string as a ControlsStyle value before applying it.
const isControlsStyle = (raw: string): raw is ControlsStyle =>
  raw === 'button' || raw === 'hidden'

// ABOUTME: localStorage key for the open/closed state of the Navigation disclosure shown in the panel when the active nav layout is 'in-controls'.
const NAV_OPEN_KEY = 'iux-controls-nav-open'

// ABOUTME: Which tap gesture summons the floating controls — 'double' for a double-tap, 'triple' for a triple-tap. The gesture always relocates the controls under the tap and opens them; only the trigger is configurable.
export type TapGesture = 'double' | 'triple'

// ABOUTME: localStorage key under which the open-gesture (double- vs triple-tap) is persisted.
const TAP_GESTURE_KEY = 'iux-controls-tap-gesture'
// ABOUTME: Fallback open-gesture when no preference is stored — a double-tap summons the controls.
const DEFAULT_TAP_GESTURE: TapGesture = 'double'

// ABOUTME: Type guard that validates a raw localStorage string as a TapGesture before applying it.
const isTapGesture = (raw: string): raw is TapGesture =>
  raw === 'double' || raw === 'triple'

// ABOUTME: The selectable open-gestures used to build the "Open gesture" field shown inside the controls' Settings group.
const TAP_GESTURE_OPTIONS: { value: TapGesture; label: string }[] = [
  { value: 'double', label: 'Double-tap' },
  { value: 'triple', label: 'Triple-tap' },
]

// ABOUTME: Shared user preference for which tap gesture (double- or triple-tap) summons the floating controls.
/**
 * Shared user preference for the open-gesture, backed by localStorage so the
 * choice survives navigation and stays in sync across every mounted
 * DraggableControls in the tab. The root container reads it to decide how
 * many rapid clicks (2 or 3) relocate and open the controls at the tap
 * point; `OpenControlsHint` / `OpenControlsHelp` read it to describe the
 * gesture in plain English.
 */
export function useTapGesture() {
  return usePersistedPref<TapGesture>(
    TAP_GESTURE_KEY,
    DEFAULT_TAP_GESTURE,
    isTapGesture,
  )
}

// ABOUTME: Shared user preference for the floating controls' style (Button FAB vs Hidden).
/**
 * Shared user preference for the floating controls' style (Button FAB vs
 * Hidden). Backed by localStorage so the choice survives navigation between
 * the showcase pages and the standalone apps, and stays in sync across
 * every mounted DraggableControls in the same tab.
 */
export function useControlsStyle() {
  return usePersistedPref<ControlsStyle>(
    CONTROLS_STYLE_KEY,
    DEFAULT_CONTROLS_STYLE,
    isControlsStyle,
  )
}

// ABOUTME: Plain-English sentence describing how to open the floating preferences for a given style and tap gesture, plus the keyboard "Open preferences" button; reused by the page info popovers (OpenControlsHelp) and the Hidden-mode "?" badge (OpenControlsHint).
/**
 * Builds the one-sentence "how to open the preferences" explanation. When
 * the float is hidden there is no on-screen affordance, so the sentence
 * leads with the tap gesture; when the Button FAB is shown, it names the
 * button first and offers the gesture as a shortcut. The gesture word
 * (double-/triple-tap) tracks the user's `useTapGesture` choice so the help
 * never drifts from the behaviour, and a closing clause points keyboard
 * users at the focusable "Open preferences" button that works in both
 * styles.
 */
export function openControlsHelpText(style: ControlsStyle, gesture: TapGesture): string {
  const lower = gesture === 'triple' ? 'triple-tap' : 'double-tap'
  const Upper = gesture === 'triple' ? 'Triple-tap' : 'Double-tap'
  const keyboard = ' Keyboard users can Tab to the "Open preferences" button.'
  return style === 'hidden'
    ? `The floating preferences are hidden. ${Upper} anywhere on the page to open them where you tap.${keyboard}`
    : `Open the floating preferences from the ◉ button, or ${lower} anywhere on the page to summon them where you tap.${keyboard}`
}

// ABOUTME: One-line "how to open preferences" note for a page's info/help popover, reading the live controls style and open-gesture so the help stays accurate whether the float is shown or hidden.
/**
 * Drop this inside a page's info popover (the help section) so every surface
 * states how to reach the preferences. It reads `useControlsStyle` and
 * `useTapGesture` and renders `openControlsHelpText`, re-rendering whenever
 * the user changes either pref — so a reader who has hidden the float still
 * learns the tap gesture, and a reader on Button learns the shortcut.
 */
export function OpenControlsHelp() {
  const [style] = useControlsStyle()
  const [gesture] = useTapGesture()
  return <p className="ctrl-howto">{openControlsHelpText(style, gesture)}</p>
}

// ABOUTME: A "?" badge shown beside a page's info button only when the floating preferences are Hidden; clicking it reveals a short popover explaining the tap gesture that opens them, keeping the controls discoverable with no float on screen.
/**
 * Renders nothing while the Button FAB is on screen (the FAB is its own
 * affordance). When the float is hidden it shows a circular "?" next to the
 * page's info "i" and, on click, a small popover with the same sentence
 * `OpenControlsHelp` shows — so a user who picked Hidden can still discover
 * the double-/triple-tap that summons the panel. Closes on outside click or
 * Escape, mirroring the page info popover.
 */
export function OpenControlsHint() {
  const [style] = useControlsStyle()
  const [gesture] = useTapGesture()
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<{ side: 'left' | 'right'; maxWidth: number }>({ side: 'left', maxWidth: 320 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLDivElement>(null)

  /*
   * Open toward whichever side of the "?" has more room and cap the width
   * to it, so the popover never runs off the viewport edge — the info "i"
   * and "?" sit at the end of the title, which lands near the right edge on
   * phones (left-anchored, the help text was clipped). Measured with
   * useLayoutEffect so the side is chosen before paint, avoiding a flash of
   * the overflowing default.
   */
  useLayoutEffect(() => {
    if (!open) return
    const r = btnRef.current?.getBoundingClientRect()
    if (!r) return
    const margin = 12
    const spaceRight = window.innerWidth - r.left - margin
    const spaceLeft = r.right - margin
    const side: 'left' | 'right' = spaceRight >= spaceLeft ? 'left' : 'right'
    const maxWidth = Math.min(320, Math.round(Math.max(spaceRight, spaceLeft)))
    setPlacement({ side, maxWidth })
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (btnRef.current?.contains(t) || popRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (style !== 'hidden') return null

  return (
    <span className="ctrl-hint">
      <button
        ref={btnRef}
        type="button"
        className="ctrl-hint__btn"
        aria-label="How to open preferences"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        ?
      </button>
      {open && (
        <div
          ref={popRef}
          role="region"
          aria-label="How to open preferences"
          className={`ctrl-hint__popover ctrl-hint__popover--${placement.side}`}
          style={{ maxWidth: placement.maxWidth }}
        >
          {openControlsHelpText(style, gesture)}
        </div>
      )}
    </span>
  )
}

// ABOUTME: A single control field descriptor: key, label, short label, current value, options array, onChange callback, and an optional kind='palette' flag that substitutes PalettePicker for a generic select.
export type Field = {
  key: string
  label: string
  short: string
  value: string
  options: { value: string; label: string }[]
  onChange: (next: string) => void
  /**
   * Optional marker that swaps the generic Select for a dedicated picker.
   * `'palette'` substitutes `PalettePicker`, which handles tag search,
   * pinned / active groups, inline arrow cycling, and custom-group
   * management. The full palette registry is read by the picker itself, so
   * `options` can be empty for palette fields.
   */
  kind?: 'palette'
}

// ABOUTME: An x/y pixel coordinate representing the floating container's top-left position within the viewport.
type Position = { x: number; y: number }

// ABOUTME: Props for the DraggableControls root — the current controls style, a callback to change it, the array of control field descriptors to render, and an optional NavControls bundle that renders the cross-page nav as a collapsible section when the active layout is 'in-controls'.
type Props = {
  style: ControlsStyle
  onStyleChange: (next: ControlsStyle) => void
  fields: Field[]
  /**
   * When supplied with `inControls: true` (the `in-controls` nav layout),
   * the panel grows a collapsible Navigation section listing these links.
   * Built by `navControlsFor`; omitted or `inControls: false` renders no
   * nav, leaving it to AppShell's fixed-slot layouts.
   */
  nav?: NavControls
}

// ABOUTME: Returns the per-style localStorage key used to persist the floating container's position.
const POS_KEY = (s: ControlsStyle) => `iux-controls-pos-${s}`
// ABOUTME: Returns the per-style localStorage key used to persist the panel's open/closed state.
const OPEN_KEY = (s: ControlsStyle) => `iux-controls-open-${s}`

// ABOUTME: Factory-default pixel positions for each controls style when no saved position exists on a desktop viewport.
const DEFAULTS: Record<ControlsStyle, Position> = {
  button: { x: 24, y: 24 },
  hidden: { x: 24, y: 24 },
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
 * phone. Hidden has no on-screen anchor until a tap relocates it, so its
 * default only matters for the first summon and reuses the desktop spot.
 */
// ABOUTME: Computes the initial position for a controls style, placing the button FAB in the bottom-right thumb zone on phone-sized viewports (≤640px wide or ≤480px tall).
function defaultPos(style: ControlsStyle): Position {
  if (typeof window === 'undefined') return DEFAULTS[style]
  const isPhone = window.innerWidth <= 640 || window.innerHeight <= 480
  if (isPhone && style === 'button') {
    // 3rem button + 16px margin on each side ≈ 64px.
    return {
      x: Math.max(16, window.innerWidth - 64),
      y: Math.max(16, window.innerHeight - 96),
    }
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
  { value: 'hidden', label: 'Hidden' },
]

// ABOUTME: Vertical half of the popover quadrant — 'up' means the panel opens upward from the anchor, 'down' means downward.
type VerticalDir = 'up' | 'down'
// ABOUTME: Horizontal half of the popover quadrant — 'left' means the panel extends leftward from the anchor, 'right' means rightward.
type HorizontalDir = 'left' | 'right'
// ABOUTME: The four possible quadrants for the Button-variant panel, expressed as a vertical-horizontal direction pair.
type Quadrant = `${VerticalDir}-${HorizontalDir}`

// ABOUTME: Inspects the trigger's bounding rect and returns the quadrant with the most available viewport space, used to anchor the floating panel away from viewport edges.
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

// ABOUTME: Root draggable container that handles pointer-based drag positioning, viewport clamping on resize/orientation-change, the tap-to-summon gesture, and localStorage persistence of position and open state; delegates rendering to ButtonVariant (which shows a FAB for 'button' or an invisible anchor for 'hidden').
/**
 * Uses pointer capture (`setPointerCapture`) for smooth drag without losing
 * the pointer on fast movement. Position is stored per style key so Button
 * and Hidden remember independent locations. A document-level click handler
 * implements tap-to-summon: a double- or triple-click (per `useTapGesture`)
 * anywhere outside the controls relocates them under the tap and opens them
 * — the only way to reach the panel in Hidden mode, and a shortcut in Button
 * mode. Rendering is delegated to `ButtonVariant`.
 */
export function DraggableControls({ style, onStyleChange, fields, nav }: Props) {
  const [pos, setPos] = useState<Position>(() => loadPos(style))
  const [open, setOpen] = useState<boolean>(() => loadOpen(style, false))
  const [gesture, setGesture] = useTapGesture()
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    sx: number; sy: number; ox: number; oy: number; pointerId: number; el: Element
  } | null>(null)

  useEffect(() => {
    setPos(loadPos(style))
    setOpen(loadOpen(style, false))
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

  /*
   * Tap-to-summon. A double- or triple-click anywhere on the page (except
   * inside the controls themselves) relocates the container so its top-left
   * sits at the tap point — clamped to stay on-screen — and opens it. The
   * gesture always moves AND opens: it is the only way to reach the panel in
   * Hidden mode and a shortcut in Button mode. `click`'s `detail` counts the
   * rapid-click run (2 for double, 3 for triple), which covers both mouse
   * multi-clicks and the touch taps browsers synthesise from them.
   */
  useEffect(() => {
    const want = gesture === 'triple' ? 3 : 2
    const onClick = (e: MouseEvent) => {
      if (e.detail !== want) return
      const el = containerRef.current
      if (!el) return
      // Ignore taps that land inside the controls — those are interactions
      // with the panel, not a request to summon it.
      if (el.contains(e.target as Node)) return
      const w = el.offsetWidth
      const h = el.offsetHeight
      setPos({
        x: clamp(e.clientX, 4, Math.max(4, window.innerWidth - w - 4)),
        y: clamp(e.clientY, 4, Math.max(4, window.innerHeight - h - 4)),
      })
      setOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [gesture])

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

  // The open-gesture is a control of the controls themselves, so it's
  // injected here rather than passed in by every page — it lands in the
  // Settings group alongside the page's own fields.
  const gestureField: Field = {
    key: 'gesture',
    label: 'Open gesture',
    short: '⊙',
    value: gesture,
    options: TAP_GESTURE_OPTIONS,
    onChange: v => setGesture(v as TapGesture),
  }
  const allFields = [...fields, gestureField]

  const containerStyle: CSSProperties = { left: pos.x, top: pos.y }
  const summaries = allFields.map(f => {
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
      <ButtonVariant
        fields={allFields}
        nav={nav}
        summaries={summaries}
        open={open}
        setOpen={setOpen}
        dragHandlers={dragHandlers}
        variantStyle={style}
        onStyleChange={onStyleChange}
      />
    </div>
  )
}

// ABOUTME: Props passed down to ButtonVariant — the field list, the optional in-controls nav bundle, current-value summary strings, open state, drag event handlers, the active controls style, and the style-change callback.
type VariantProps = {
  fields: Field[]
  nav?: NavControls
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

// ABOUTME: Radiogroup of two buttons (Button / Hidden) that lets the user switch the controls presentation style; used in the footer of the Button panel so a user who summoned a Hidden panel can switch back to the always-visible FAB.
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

/* ===== Button / Hidden variant ===== */
// ABOUTME: Renders the floating panel and its triggers — a visually-hidden "Open preferences" skip-link (the keyboard/AT entry point, present in both styles) plus, in Button style, a draggable circular FAB; in Hidden style the skip-link is the only trigger and also anchors the panel. Moves focus into the panel on open and restores it on close. The open panel holds the palette picker, a collapsible Settings group, and a footer style-switcher; it computes available height and quadrant on open and translates the panel back inside the viewport so a double-tap summon or Button open never renders off-screen (the FAB stays put, so it can still be dragged anywhere).
function ButtonVariant({ fields, nav, summaries, open, setOpen, dragHandlers, variantStyle, onStyleChange }: VariantProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const wasOpen = useRef(false)
  const [quadrant, setQuadrant] = useState<Quadrant>('down-right')
  const [maxHeight, setMaxHeight] = useState<number | null>(null)
  const [panelOffset, setPanelOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const panelOffsetRef = useRef(panelOffset)
  panelOffsetRef.current = panelOffset
  const hidden = variantStyle === 'hidden'

  /*
   * Recompute which corner the panel expands toward AND cap its height to
   * the space actually available in that direction. Up quadrants anchor by
   * the panel's bottom edge (at the trigger top, less the 0.5rem gap), so
   * the room to grow is everything from there up to the top margin; down
   * quadrants mirror it downward. Without this cap a bottom-anchored panel
   * taller than the space above runs straight off the top of the screen
   * with its first rows clipped and unreachable — `max-height` alone
   * (sized to the viewport) doesn't help, because it measures content, not
   * the gap above the anchor. In Hidden mode the trigger is a zero-size
   * anchor at the tap point, so the rect still drives the quadrant.
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

  /*
   * Re-pick the quadrant synchronously, before paint, whenever the panel
   * opens. Running it in a layout effect — not a post-paint effect — is what
   * stops the panel from flashing a frame in its previous orientation and
   * then flipping: a double-tap that relocates the panel closes and re-opens
   * it, and this recompute lands the new orientation before the browser
   * paints the re-opened panel.
   */
  useLayoutEffect(() => {
    if (!open) return
    recompute()
  }, [open])

  useEffect(() => {
    if (!open) return
    window.addEventListener('resize', recompute)
    window.addEventListener('orientationchange', recompute)
    return () => {
      window.removeEventListener('resize', recompute)
      window.removeEventListener('orientationchange', recompute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  /*
   * Keep the opened panel fully on-screen. The quadrant + max-height maths
   * anchor the panel to the trigger and cap its height, but they only pick
   * the side with more room — they never guarantee the panel's fixed width
   * actually fits it. A wide panel summoned by a double-tap near the middle
   * of a narrow viewport (or a FAB opened near an edge) then overflows past
   * the side it expands into — the off-screen render in the report. After the
   * panel lays out, measure it and translate it back inside the viewport so
   * neither a double-tap summon nor a Button open ever renders off-screen.
   * The FAB itself is untouched, so it can still be dragged anywhere.
   * Re-runs when the quadrant or height cap changes and on resize; reads the
   * applied offset from a ref to recover the panel's natural position, so it
   * settles in one pass instead of chasing its own transform.
   */
  useLayoutEffect(() => {
    if (!open) {
      if (panelOffsetRef.current.x !== 0 || panelOffsetRef.current.y !== 0) {
        setPanelOffset({ x: 0, y: 0 })
      }
      return
    }
    const clampPanel = () => {
      const el = panelRef.current
      if (!el) return
      const margin = 8
      const cur = panelOffsetRef.current
      const rect = el.getBoundingClientRect()
      // Undo the currently-applied offset to find the panel's natural position.
      const left = rect.left - cur.x
      const right = rect.right - cur.x
      const top = rect.top - cur.y
      const bottom = rect.bottom - cur.y
      let dx = 0
      if (left < margin) dx = margin - left
      else if (right > window.innerWidth - margin) dx = window.innerWidth - margin - right
      let dy = 0
      if (top < margin) dy = margin - top
      else if (bottom > window.innerHeight - margin) dy = window.innerHeight - margin - bottom
      dx = Math.round(dx)
      dy = Math.round(dy)
      if (dx !== cur.x || dy !== cur.y) setPanelOffset({ x: dx, y: dy })
    }
    clampPanel()
    window.addEventListener('resize', clampPanel)
    window.addEventListener('orientationchange', clampPanel)
    return () => {
      window.removeEventListener('resize', clampPanel)
      window.removeEventListener('orientationchange', clampPanel)
    }
  }, [open, quadrant, maxHeight])

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

  // Keyboard entry point. The visually-hidden "Open preferences" button is
  // the focusable affordance that summons the panel without a pointer — the
  // only way in for keyboard / AT users in Hidden mode, and a labelled
  // alternative to the FAB in Button mode. Re-activating while open just
  // sends focus back into the panel.
  const openViaKeyboard = () => {
    if (!open) {
      recompute()
      setOpen(true)
    } else {
      panelRef.current?.focus({ preventScroll: true })
    }
  }

  /*
   * Move focus into the panel when it opens and restore it when it closes.
   * Non-modal: Tab can still leave the panel (no focus trap). On open we
   * remember whatever had focus (the trigger, for keyboard opens) and move
   * focus to the panel container so AT lands on the labelled group. On
   * close we only restore if focus fell back to the body — i.e. it was
   * inside the now-unmounted panel — so we never yank focus away from
   * wherever a pointer user clicked to dismiss it.
   */
  useEffect(() => {
    if (open && !wasOpen.current) {
      restoreRef.current = (document.activeElement as HTMLElement | null) ?? null
      requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }))
    } else if (!open && wasOpen.current) {
      const el = restoreRef.current
      restoreRef.current = null
      const active = document.activeElement
      const focusFellToBody = !active || active === document.body
      if (focusFellToBody && el && document.contains(el)) {
        el.focus?.({ preventScroll: true })
      }
    }
    wasOpen.current = open
  }, [open])

  useOverflowEdges(panelRef, open)

  const paletteFields = fields.filter(f => f.kind === 'palette')
  const otherFields = fields.filter(f => f.kind !== 'palette')

  return (
    <div className="ctrl-button">
      <button
        ref={hidden ? (triggerRef as RefObject<HTMLButtonElement>) : undefined}
        type="button"
        className="ctrl-button__open-sr"
        aria-expanded={open}
        onClick={openViaKeyboard}
      >
        Open preferences
      </button>
      {!hidden && (
        <button
          ref={triggerRef as RefObject<HTMLButtonElement>}
          type="button"
          /*
           * Pointer-only. The visually-hidden "Open preferences" skip-link
           * is the sole keyboard trigger and carries the accessible name and
           * expanded state, so the FAB is a redundant duplicate for AT: keep
           * it out of the tab order and out of the accessibility tree so a
           * screen reader doesn't announce a second open/close control.
           * Escape and the skip-link still drive it for keyboard users.
           */
          tabIndex={-1}
          aria-hidden="true"
          title={open ? 'Close controls' : `Controls: ${summaries.join(', ')}`}
          className={`ctrl-button__fab${open ? ' ctrl-button__fab--open' : ''}`}
          onClick={handleClick}
          {...dragHandlers}
        >
          <span className="ctrl-button__fab-icon" aria-hidden="true">{open ? '×' : '◉'}</span>
        </button>
      )}
      {open && (
        <div
          ref={panelRef}
          className={`ctrl-button__panel ctrl-button__panel--${quadrant}`}
          style={{
            ...(maxHeight != null ? { '--panel-max-height': `${maxHeight}px` } : {}),
            ...(panelOffset.x !== 0 || panelOffset.y !== 0
              ? { transform: `translate(${panelOffset.x}px, ${panelOffset.y}px)` }
              : {}),
          } as CSSProperties}
          role="group"
          aria-label="Demo controls"
          tabIndex={-1}
        >
          <span className="ctrl-button__edge ctrl-button__edge--top" aria-hidden="true" />
          {paletteFields.length > 0 && (
            <div className="ctrl-button__palette">
              {paletteFields.map(f => (
                <PalettePicker key={f.key} field={f} variant="button" />
              ))}
            </div>
          )}
          {(nav?.inControls || otherFields.length > 0) && (
            <div className="ctrl-button__sections">
              {nav?.inControls && <NavGroup nav={nav} />}
              {otherFields.length > 0 && <SettingsGroup fields={otherFields} />}
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

// ABOUTME: Persisted collapsible disclosure that lists the cross-page nav links inside the Button panel when the active layout is 'in-controls'; reuses the routing-aware NavAnchor from AppShell and persists its own open state (default open) so the nav stays reachable across visits.
/**
 * The in-controls nav. Rendered only when the `in-controls` layout routes
 * the cross-page nav into the floating panel (gated by `nav.inControls`
 * upstream). Mirrors `SettingsGroup`'s disclosure chrome but defaults to
 * open — the nav is the page's primary way to move between sections, so it
 * should be visible the moment the panel opens — and lists the links with
 * the same `NavAnchor` the fixed-slot AppShell layouts use, so hash- and
 * path-routed entries behave identically here.
 */
function NavGroup({ nav }: { nav: NavControls }) {
  const [openRaw, setOpenRaw] = usePersistedPref<'0' | '1'>(
    NAV_OPEN_KEY,
    '1',
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
        <span className="ctrl-button__group-label">Navigation</span>
      </button>
      {open && (
        <nav className="ctrl-button__group-body ctrl-button__nav" aria-label="Site sections">
          {nav.links.map(link => (
            <NavAnchor
              key={link.id}
              link={link}
              active={link.id === nav.activeId}
              className="ctrl-button__nav-link"
            />
          ))}
        </nav>
      )}
    </div>
  )
}

/**
 * Wraps the non-palette fields (view, layout, nav, motion, open-gesture) in
 * one collapsed-by-default disclosure so the panel stays compact — the
 * palette picker is the everyday control, and these sit one click away under
 * "Settings" rather than always stacked open. Each field keeps its own inner
 * CollapsibleSection so only the chosen one expands.
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
