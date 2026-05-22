import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import './DraggableControls.css'

export type ControlsStyle = 'bar' | 'strip'

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
  bar: { x: 16, y: 16 },
  strip: { x: 16, y: 96 },
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

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
  return DEFAULTS[style]
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
  { value: 'bar', label: 'Bar' },
  { value: 'strip', label: 'Strip' },
]

export function DraggableControls({ style, onStyleChange, fields }: Props) {
  const [pos, setPos] = useState<Position>(() => loadPos(style))
  const [open, setOpen] = useState<boolean>(() => loadOpen(style, true))
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    sx: number; sy: number; ox: number; oy: number; pointerId: number; el: Element
  } | null>(null)

  useEffect(() => {
    setPos(loadPos(style))
    setOpen(loadOpen(style, true))
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
      {style === 'bar' && (
        <BarVariant
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

/* ===== Variation A: Compact Bar ===== */
function BarVariant({ fields, summaries, open, setOpen, dragHandlers, variantStyle, onStyleChange }: VariantProps) {
  if (!open) {
    return (
      <div className="ctrl-bar ctrl-bar--collapsed">
        <button
          type="button"
          className="ctrl-bar__grip"
          aria-label="Drag controls"
          {...dragHandlers}
        >
          <span className="ctrl-bar__grip-dots" aria-hidden="true">⋮⋮</span>
        </button>
        <button
          type="button"
          className="ctrl-bar__chip"
          onClick={() => setOpen(true)}
          aria-label={`Expand controls. Current: ${summaries.join(', ')}`}
        >
          {summaries.map((s, i) => (
            <span key={fields[i].key} className="ctrl-bar__chip-item">
              {i > 0 && <span className="ctrl-bar__chip-sep" aria-hidden="true">·</span>}
              <span className="ctrl-bar__chip-val">{s}</span>
            </span>
          ))}
        </button>
      </div>
    )
  }
  return (
    <div className="ctrl-bar ctrl-bar--open">
      <button
        type="button"
        className="ctrl-bar__grip"
        aria-label="Drag controls"
        {...dragHandlers}
      >
        <span className="ctrl-bar__grip-dots" aria-hidden="true">⋮⋮</span>
      </button>
      <div className="ctrl-bar__fields">
        {fields.map(f => (
          <label key={f.key} className="ctrl-bar__field">
            <span className="ctrl-bar__field-label">{f.label}</span>
            <select
              className="ctrl-bar__select"
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
      <div className="ctrl-bar__tail">
        <StyleSwitcher value={variantStyle} onChange={onStyleChange} />
        <button
          type="button"
          className="ctrl-bar__close"
          aria-label="Collapse controls"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
      </div>
    </div>
  )
}

/* ===== Variation B: Edge Strip ===== */
function StripVariant({ fields, open, setOpen, dragHandlers, variantStyle, onStyleChange }: VariantProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [popoverSide, setPopoverSide] = useState<'left' | 'right'>('right')
  const stripRef = useRef<HTMLDivElement>(null)

  const toggleSlot = (key: string) => {
    if (activeKey === key) {
      setActiveKey(null)
      return
    }
    const rect = stripRef.current?.getBoundingClientRect()
    if (rect) {
      const spaceRight = window.innerWidth - rect.right
      const spaceLeft = rect.left
      setPopoverSide(spaceLeft > spaceRight ? 'left' : 'right')
    }
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
                    onClick={() => toggleSlot(f.key)}
                  >
                    <span className="ctrl-strip__icon-short" aria-hidden="true">{f.short}</span>
                    <span className="ctrl-strip__icon-val">{opt?.label ?? f.value}</span>
                  </button>
                  {isActive && (
                    <div
                      className={`ctrl-strip__popover ctrl-strip__popover--${popoverSide}`}
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
