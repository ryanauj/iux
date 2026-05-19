import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import './BezierEditor.css'

export type BezierVariant = 'single' | 'multi' | 'snap' | 'presets'

export interface BezierAnchor {
  id: string
  x: number
  y: number
  smooth?: boolean
  inHandle?: { dx: number; dy: number }
  outHandle?: { dx: number; dy: number }
}

export interface BezierPreset {
  name: string
  anchors: BezierAnchor[]
}

export interface BezierEditorProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: BezierVariant
  anchors: BezierAnchor[]
  onAnchorsChange?: (next: BezierAnchor[]) => void
  selectedId?: string
  defaultSelectedId?: string
  onSelectedChange?: (id: string | undefined) => void

  width?: number
  height?: number
  gridSize?: number

  presets?: BezierPreset[]
  onSavePreset?: (name: string, anchors: BezierAnchor[]) => void
  onApplyPreset?: (preset: BezierPreset) => void

  className?: string
}

function clamp01(n: number) { return Math.max(0, Math.min(1, n)) }

function snap(n: number, step: number) {
  if (step <= 0) return n
  return Math.round(n / step) * step
}

function snapToOtherAnchor(n: number, others: number[], tol: number): number {
  for (const o of others) if (Math.abs(o - n) <= tol) return o
  return n
}

export function BezierEditor({
  variant = 'single',
  anchors,
  onAnchorsChange,
  selectedId,
  defaultSelectedId,
  onSelectedChange,
  width = 320,
  height = 200,
  gridSize = 0.05,
  presets,
  onSavePreset,
  onApplyPreset,
  className,
}: BezierEditorProps) {
  const isControlled = selectedId !== undefined
  const [innerSelected, setInnerSelected] = useState<string | undefined>(defaultSelectedId ?? anchors[0]?.id)
  const currentSelected = isControlled ? selectedId : innerSelected

  const setSelected = useCallback((id: string | undefined) => {
    if (!isControlled) setInnerSelected(id)
    onSelectedChange?.(id)
  }, [isControlled, onSelectedChange])

  const svgRef = useRef<SVGSVGElement | null>(null)
  const dragRef = useRef<{ id: string; kind: 'anchor' | 'in' | 'out' } | null>(null)

  const updateAnchor = useCallback((id: string, patch: Partial<BezierAnchor>) => {
    onAnchorsChange?.(anchors.map(a => a.id === id ? { ...a, ...patch } : a))
  }, [anchors, onAnchorsChange])

  const ptFromEvent = (event: ReactPointerEvent<SVGSVGElement | SVGElement>): { x: number; y: number } => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    return { x: clamp01((event.clientX - rect.left) / rect.width), y: clamp01((event.clientY - rect.top) / rect.height) }
  }

  const applySnaps = (n: number, others: number[]): number => {
    if (variant !== 'snap') return n
    const snapped = snap(n, gridSize)
    return snapToOtherAnchor(snapped, others, 0.02)
  }

  const handleDownAnchor = (event: ReactPointerEvent<SVGElement>, id: string, kind: 'anchor' | 'in' | 'out') => {
    event.stopPropagation()
    ;(event.currentTarget as SVGElement).setPointerCapture(event.pointerId)
    dragRef.current = { id, kind }
    setSelected(id)
  }

  const handleSvgMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const d = dragRef.current
    if (!d) return
    const a = anchors.find(aa => aa.id === d.id)
    if (!a) return
    const pt = ptFromEvent(event)
    const otherXs = anchors.filter(o => o.id !== a.id).map(o => o.x)
    const otherYs = anchors.filter(o => o.id !== a.id).map(o => o.y)
    if (d.kind === 'anchor') {
      updateAnchor(a.id, { x: applySnaps(pt.x, otherXs), y: applySnaps(pt.y, otherYs) })
    } else if (d.kind === 'in') {
      const dx = pt.x - a.x
      const dy = pt.y - a.y
      const patch: Partial<BezierAnchor> = { inHandle: { dx, dy } }
      if (a.smooth) patch.outHandle = { dx: -dx, dy: -dy }
      updateAnchor(a.id, patch)
    } else {
      const dx = pt.x - a.x
      const dy = pt.y - a.y
      const patch: Partial<BezierAnchor> = { outHandle: { dx, dy } }
      if (a.smooth) patch.inHandle = { dx: -dx, dy: -dy }
      updateAnchor(a.id, patch)
    }
  }
  const handleSvgUp = () => { dragRef.current = null }

  // ---------- Multi: add anchor on background click ----------
  const handleBackgroundClick = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (variant !== 'multi' && variant !== 'snap' && variant !== 'presets') return
    if (event.target !== event.currentTarget) return
    const pt = ptFromEvent(event)
    const id = `a${Math.random().toString(36).slice(2, 7)}`
    const next = { id, x: pt.x, y: pt.y, smooth: true, inHandle: { dx: -0.08, dy: 0 }, outHandle: { dx: 0.08, dy: 0 } }
    onAnchorsChange?.([...anchors, next].sort((a, b) => a.x - b.x))
    setSelected(id)
  }

  // ---------- Keyboard: delete selected, toggle smooth ----------
  useEffect(() => {
    if (variant === 'single') return
    const onKey = (e: KeyboardEvent) => {
      if (!currentSelected) return
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (anchors.length <= 2) return
        e.preventDefault()
        const next = anchors.filter(a => a.id !== currentSelected)
        onAnchorsChange?.(next)
        setSelected(next[0]?.id)
      } else if (e.key === 's' || e.key === 'S') {
        const a = anchors.find(aa => aa.id === currentSelected)
        if (a) updateAnchor(a.id, { smooth: !a.smooth })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [variant, currentSelected, anchors, onAnchorsChange, setSelected, updateAnchor])

  // ---------- Path string ----------
  const pathD = useMemo(() => buildPath(anchors), [anchors])

  const selected = anchors.find(a => a.id === currentSelected)

  return (
    <div className={['iux-bezier', `iux-bezier--${variant}`, className].filter(Boolean).join(' ')}>
      <div className="iux-bezier__canvas-wrap" style={{ width: `${width}px` }}>
        <svg
          ref={svgRef}
          className="iux-bezier__canvas"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          width={width}
          height={height}
          onPointerMove={handleSvgMove}
          onPointerUp={handleSvgUp}
          onPointerCancel={handleSvgUp}
          onPointerDown={handleBackgroundClick}
        >
          {(variant === 'snap') && (
            <g className="iux-bezier__grid">
              {Array.from({ length: Math.floor(1 / gridSize) + 1 }).map((_, i) => (
                <g key={i}>
                  <line x1={i * gridSize} y1={0} x2={i * gridSize} y2={1} stroke="currentColor" strokeWidth="0.002" />
                  <line x1={0} y1={i * gridSize} x2={1} y2={i * gridSize} stroke="currentColor" strokeWidth="0.002" />
                </g>
              ))}
            </g>
          )}

          <path d={pathD} fill="none" stroke="currentColor" strokeWidth="0.01" className="iux-bezier__path" vectorEffect="non-scaling-stroke" />

          {anchors.map((a, i) => {
            const next = anchors[i + 1]
            return (
              <g key={a.id}>
                {/* handles */}
                {a.outHandle && next && (
                  <>
                    <line x1={a.x} y1={a.y} x2={a.x + a.outHandle.dx} y2={a.y + a.outHandle.dy} stroke="currentColor" strokeWidth="0.003" opacity="0.4" />
                    <circle cx={a.x + a.outHandle.dx} cy={a.y + a.outHandle.dy} r="0.015" className="iux-bezier__handle" onPointerDown={ev => handleDownAnchor(ev, a.id, 'out')} />
                  </>
                )}
                {a.inHandle && i > 0 && (
                  <>
                    <line x1={a.x} y1={a.y} x2={a.x + a.inHandle.dx} y2={a.y + a.inHandle.dy} stroke="currentColor" strokeWidth="0.003" opacity="0.4" />
                    <circle cx={a.x + a.inHandle.dx} cy={a.y + a.inHandle.dy} r="0.015" className="iux-bezier__handle" onPointerDown={ev => handleDownAnchor(ev, a.id, 'in')} />
                  </>
                )}
                {/* anchor point */}
                <rect
                  x={a.x - 0.018} y={a.y - 0.018} width="0.036" height="0.036"
                  className={['iux-bezier__anchor', currentSelected === a.id && 'is-selected', a.smooth && 'is-smooth'].filter(Boolean).join(' ')}
                  rx={a.smooth ? '0.018' : '0.005'} ry={a.smooth ? '0.018' : '0.005'}
                  onPointerDown={ev => handleDownAnchor(ev, a.id, 'anchor')}
                />
              </g>
            )
          })}
        </svg>
      </div>

      <aside className="iux-bezier__panel">
        {selected ? (
          <>
            <h4 className="iux-bezier__panel-title">Anchor {selected.id}</h4>
            <NumericRow label="x" value={selected.x} onChange={v => updateAnchor(selected.id, { x: clamp01(v) })} />
            <NumericRow label="y" value={selected.y} onChange={v => updateAnchor(selected.id, { y: clamp01(v) })} />
            {variant !== 'single' && (
              <label className="iux-bezier__row">
                <span>smooth</span>
                <input
                  type="checkbox"
                  checked={!!selected.smooth}
                  onChange={e => updateAnchor(selected.id, { smooth: e.target.checked })}
                />
              </label>
            )}
            {variant === 'snap' && (
              <p className="iux-bezier__hint">Grid step: {gridSize}. Snaps to other anchors within {0.02 * 100}%.</p>
            )}
            {variant !== 'single' && (
              <p className="iux-bezier__hint">Delete / Backspace removes the selected anchor; S toggles smooth.</p>
            )}
          </>
        ) : (
          <p className="iux-bezier__hint">Click an anchor to edit.</p>
        )}

        {variant === 'presets' && (
          <PresetPanel
            anchors={anchors}
            presets={presets ?? []}
            onApply={p => onApplyPreset?.(p)}
            onSave={name => onSavePreset?.(name, anchors)}
          />
        )}
      </aside>
    </div>
  )
}

function NumericRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="iux-bezier__row">
      <span>{label}</span>
      <input
        type="number"
        step="0.01"
        value={Math.round(value * 1000) / 1000}
        onChange={e => onChange(Number(e.target.value))}
      />
    </label>
  )
}

interface PresetPanelProps {
  anchors: BezierAnchor[]
  presets: BezierPreset[]
  onApply: (p: BezierPreset) => void
  onSave: (name: string) => void
}

function PresetPanel({ presets, onApply, onSave }: PresetPanelProps) {
  const [name, setName] = useState('myCurve')
  return (
    <div className="iux-bezier__presets">
      <h4 className="iux-bezier__panel-title">Presets</h4>
      <ul>
        {presets.map(p => (
          <li key={p.name}>
            <button type="button" onClick={() => onApply(p)}>{p.name}</button>
          </li>
        ))}
        {presets.length === 0 && <li className="iux-bezier__hint">No saved curves yet.</li>}
      </ul>
      <label className="iux-bezier__row">
        <span>name</span>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button type="button" className="iux-bezier__save" onClick={() => name && onSave(name)}>Save current</button>
    </div>
  )
}

function buildPath(anchors: BezierAnchor[]): string {
  if (anchors.length === 0) return ''
  const out: string[] = []
  out.push(`M ${anchors[0].x} ${anchors[0].y}`)
  for (let i = 1; i < anchors.length; i++) {
    const a0 = anchors[i - 1]
    const a1 = anchors[i]
    const c1 = a0.outHandle ? [a0.x + a0.outHandle.dx, a0.y + a0.outHandle.dy] : [a0.x, a0.y]
    const c2 = a1.inHandle ? [a1.x + a1.inHandle.dx, a1.y + a1.inHandle.dy] : [a1.x, a1.y]
    out.push(`C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${a1.x} ${a1.y}`)
  }
  return out.join(' ')
}

