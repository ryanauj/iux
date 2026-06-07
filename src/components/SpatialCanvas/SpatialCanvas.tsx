// ABOUTME: Pan/zoom infinite canvas with four variants: pan-only ('pan'), pan+pinch+scroll zoom with minimap ('zoom'), zoom plus draggable objects and marquee selection ('objects'), and objects plus live remote-cursor overlays ('collab').

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react'
import './SpatialCanvas.css'

// ABOUTME: Controls which interactions are enabled: 'pan' is scroll-only, 'zoom' adds ctrl+wheel and two-finger pinch with a minimap, 'objects' adds selectable/draggable objects and marquee selection, 'collab' adds remote cursor overlays on top of 'objects' capabilities.
export type CanvasVariant = 'pan' | 'zoom' | 'objects' | 'collab'

// ABOUTME: One draggable/selectable canvas object in world-space coordinates: position (x, y), size (w, h), an optional label, a CSS color string, and a 'selected' hint (selection state is managed internally).
export interface CanvasObject {
  id: string
  x: number
  y: number
  w: number
  h: number
  label?: string
  /** Any CSS color string. */
  color?: string
  selected?: boolean
}

// ABOUTME: One remote collaborator's cursor in world-space coordinates; rendered as a colored SVG cursor with a name badge in 'collab' mode.
export interface RemoteCursor {
  id: string
  name: string
  color: string
  /** World-space coordinates. */
  x: number
  y: number
}

// ABOUTME: Configures SpatialCanvas: 'objects' and 'onObjectsChange' wire the object layer, 'selectedIds'/'onSelectedIdsChange' expose selection (controlled or uncontrolled), 'remoteCursors' feeds the 'collab' cursor overlay, and 'worldBounds' defines the scrollable world extent.
export interface SpatialCanvasProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: CanvasVariant
  objects?: CanvasObject[]
  onObjectsChange?: (next: CanvasObject[]) => void
  selectedIds?: string[]
  onSelectedIdsChange?: (ids: string[]) => void
  remoteCursors?: RemoteCursor[]
  width?: number
  height?: number
  worldBounds?: { x: number; y: number; w: number; h: number }
  /** Show a minimap (zoom variant default). */
  showMinimap?: boolean
  className?: string
}

interface Transform {
  x: number
  y: number
  scale: number
}

// ABOUTME: Renders a viewport div with a CSS-transform layer for pan/zoom; handles pointer-capture panning, two-finger pinch-to-zoom (zooming toward the pinch midpoint), ctrl+wheel zoom, marquee selection (world-space AABB test), object drag, and an optional Minimap that click-pans the viewport.
/**
 * The transform is `translate(tx, ty) scale(s)` with origin at (0,0), so
 * world-space → screen-space is `screen = world * s + t`. Pointer events use
 * `setPointerCapture` for smooth drags outside the element. Zoom clamps to
 * 0.25–4× scale. The Minimap renders a 140×90 thumbnail with a viewport
 * indicator and click-to-pan support.
 */
export function SpatialCanvas({
  variant = 'pan',
  objects = [],
  onObjectsChange,
  selectedIds: selectedIdsProp,
  onSelectedIdsChange,
  remoteCursors = [],
  width = 600,
  height = 400,
  worldBounds = { x: 0, y: 0, w: 2000, h: 1400 },
  showMinimap = variant === 'zoom' || variant === 'objects' || variant === 'collab',
  className,
}: SpatialCanvasProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: 1 })

  const isSelControlled = selectedIdsProp !== undefined
  const [innerSel, setInnerSel] = useState<Set<string>>(new Set())
  const selSet = isSelControlled ? new Set(selectedIdsProp!) : innerSel
  const commitSel = useCallback((next: Set<string>) => {
    if (!isSelControlled) setInnerSel(next)
    onSelectedIdsChange?.(Array.from(next))
  }, [isSelControlled, onSelectedIdsChange])

  // ---------- Pan / zoom interactions ----------
  const dragRef = useRef<
    | { kind: 'pan'; startX: number; startY: number; tx: number; ty: number }
    | { kind: 'marquee'; startX: number; startY: number; addToSel: boolean }
    | { kind: 'object'; ids: string[]; startX: number; startY: number; startObjs: CanvasObject[] }
    | { kind: 'pinch'; startDist: number; startScale: number; startCx: number; startCy: number; startTx: number; startTy: number }
    | null
  >(null)
  // Active pointers on the viewport — used to detect two-finger pinch on touch.
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map())
  const [marquee, setMarquee] = useState<{ x: number; y: number; w: number; h: number } | null>(null)

  const canZoom = variant === 'zoom' || variant === 'objects' || variant === 'collab'

  const screenToWorld = (clientX: number, clientY: number): { x: number; y: number } => {
    const el = viewportRef.current
    if (!el) return { x: 0, y: 0 }
    const rect = el.getBoundingClientRect()
    return { x: (clientX - rect.left - transform.x) / transform.scale, y: (clientY - rect.top - transform.y) / transform.scale }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    // Two-finger pinch — supersedes whatever single-finger gesture was in flight.
    if (canZoom && pointersRef.current.size >= 2) {
      const [p0, p1] = Array.from(pointersRef.current.values()).slice(0, 2)
      const startDist = Math.hypot(p1.x - p0.x, p1.y - p0.y) || 1
      dragRef.current = {
        kind: 'pinch',
        startDist,
        startScale: transform.scale,
        startCx: (p0.x + p1.x) / 2,
        startCy: (p0.y + p1.y) / 2,
        startTx: transform.x,
        startTy: transform.y,
      }
      setMarquee(null)
      return
    }

    const target = event.target as HTMLElement
    const objId = target.closest<HTMLElement>('[data-canvas-obj-id]')?.dataset.canvasObjId

    if ((variant === 'objects' || variant === 'collab') && objId) {
      // Click an object: select (or toggle with shift) and start drag.
      const next = new Set(event.shiftKey ? selSet : new Set<string>())
      if (event.shiftKey && next.has(objId)) next.delete(objId)
      else next.add(objId)
      commitSel(next)
      const ids = Array.from(next)
      dragRef.current = {
        kind: 'object',
        ids,
        startX: event.clientX,
        startY: event.clientY,
        startObjs: objects.map(o => ({ ...o })),
      }
      return
    }

    if ((variant === 'objects' || variant === 'collab') && event.shiftKey) {
      // Empty marquee (shift to additive).
      const start = screenToWorld(event.clientX, event.clientY)
      dragRef.current = { kind: 'marquee', startX: start.x, startY: start.y, addToSel: true }
      setMarquee({ x: start.x, y: start.y, w: 0, h: 0 })
      return
    }

    if (variant === 'objects' || variant === 'collab') {
      // Empty: clear selection + marquee.
      commitSel(new Set())
      const start = screenToWorld(event.clientX, event.clientY)
      dragRef.current = { kind: 'marquee', startX: start.x, startY: start.y, addToSel: false }
      setMarquee({ x: start.x, y: start.y, w: 0, h: 0 })
      return
    }

    // pan / zoom variants: pan only.
    dragRef.current = { kind: 'pan', startX: event.clientX, startY: event.clientY, tx: transform.x, ty: transform.y }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    }
    const d = dragRef.current
    if (!d) return
    if (d.kind === 'pinch') {
      if (pointersRef.current.size < 2) return
      const [p0, p1] = Array.from(pointersRef.current.values()).slice(0, 2)
      const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y) || 1
      const cx = (p0.x + p1.x) / 2
      const cy = (p0.y + p1.y) / 2
      const el = viewportRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const nextScale = Math.max(0.25, Math.min(4, d.startScale * (dist / d.startDist)))
      // World point under the initial pinch midpoint stays under the live midpoint
      // (combines zoom toward midpoint with two-finger pan).
      const wx = (d.startCx - rect.left - d.startTx) / d.startScale
      const wy = (d.startCy - rect.top - d.startTy) / d.startScale
      setTransform({
        scale: nextScale,
        x: cx - rect.left - wx * nextScale,
        y: cy - rect.top - wy * nextScale,
      })
      return
    }
    if (d.kind === 'pan') {
      setTransform(t => ({ ...t, x: d.tx + (event.clientX - d.startX), y: d.ty + (event.clientY - d.startY) }))
    } else if (d.kind === 'marquee') {
      const cur = screenToWorld(event.clientX, event.clientY)
      const x = Math.min(d.startX, cur.x)
      const y = Math.min(d.startY, cur.y)
      const w = Math.abs(cur.x - d.startX)
      const h = Math.abs(cur.y - d.startY)
      setMarquee({ x, y, w, h })
    } else if (d.kind === 'object') {
      const dx = (event.clientX - d.startX) / transform.scale
      const dy = (event.clientY - d.startY) / transform.scale
      const movedSet = new Set(d.ids)
      const moved = d.startObjs.map(o => movedSet.has(o.id) ? { ...o, x: o.x + dx, y: o.y + dy } : o)
      onObjectsChange?.(moved)
    }
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId)
    const d = dragRef.current
    if (d?.kind === 'pinch') {
      // End the pinch gesture even if one finger remains; user re-engages with a fresh press.
      dragRef.current = null
      return
    }
    if (d?.kind === 'marquee' && marquee) {
      const hit = new Set<string>()
      for (const o of objects) {
        if (
          o.x + o.w >= marquee.x && o.x <= marquee.x + marquee.w &&
          o.y + o.h >= marquee.y && o.y <= marquee.y + marquee.h
        ) hit.add(o.id)
      }
      commitSel(d.addToSel ? new Set([...Array.from(selSet), ...Array.from(hit)]) : hit)
    }
    dragRef.current = null
    setMarquee(null)
  }

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (variant !== 'zoom' && variant !== 'objects' && variant !== 'collab') return
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault()
      const el = viewportRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = event.clientX - rect.left
      const cy = event.clientY - rect.top
      const factor = Math.exp(-event.deltaY * 0.0015)
      setTransform(t => {
        const nextScale = Math.max(0.25, Math.min(4, t.scale * factor))
        // Zoom toward cursor: world point under cursor must stay fixed.
        const wx = (cx - t.x) / t.scale
        const wy = (cy - t.y) / t.scale
        return { scale: nextScale, x: cx - wx * nextScale, y: cy - wy * nextScale }
      })
    }
  }

  // ---------- Zoom-to-fit ----------
  const fitToWorld = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const scale = Math.min(r.width / worldBounds.w, r.height / worldBounds.h) * 0.9
    setTransform({ scale, x: r.width / 2 - (worldBounds.x + worldBounds.w / 2) * scale, y: r.height / 2 - (worldBounds.y + worldBounds.h / 2) * scale })
  }, [worldBounds])

  useEffect(() => {
    if (variant === 'pan') return
    fitToWorld()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant])

  // ---------- Render ----------
  const layerStyle: CSSProperties = {
    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
    transformOrigin: '0 0',
  }

  const minimap = useMemo(() => {
    if (!showMinimap) return null
    return (
      <Minimap
        worldBounds={worldBounds}
        objects={objects}
        viewportTransform={transform}
        viewportSize={{ w: width, h: height }}
        onPanTo={world => {
          const el = viewportRef.current
          if (!el) return
          const r = el.getBoundingClientRect()
          setTransform(t => ({ ...t, x: r.width / 2 - world.x * t.scale, y: r.height / 2 - world.y * t.scale }))
        }}
      />
    )
  }, [showMinimap, worldBounds, objects, transform, width, height])

  return (
    <div className={['iux-canvas', `iux-canvas--${variant}`, className].filter(Boolean).join(' ')}>
      <div
        ref={viewportRef}
        className="iux-canvas__viewport"
        style={{ width: `${width}px`, height: `${height}px` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div className="iux-canvas__layer" style={layerStyle}>
          <div
            className="iux-canvas__world"
            style={{ width: `${worldBounds.w}px`, height: `${worldBounds.h}px` }}
          />
          {objects.map(o => (
            <div
              key={o.id}
              data-canvas-obj-id={o.id}
              className={['iux-canvas__object', selSet.has(o.id) && 'is-selected'].filter(Boolean).join(' ')}
              style={{
                left: `${o.x}px`,
                top: `${o.y}px`,
                width: `${o.w}px`,
                height: `${o.h}px`,
                ['--iux-canvas-color' as string]: o.color ?? 'var(--color-intent-primary-bg)',
              } as CSSProperties}
            >
              {o.label}
            </div>
          ))}
          {marquee && (
            <div
              className="iux-canvas__marquee"
              style={{ left: `${marquee.x}px`, top: `${marquee.y}px`, width: `${marquee.w}px`, height: `${marquee.h}px` }}
            />
          )}
          {variant === 'collab' && remoteCursors.map(c => (
            <div
              key={c.id}
              className="iux-canvas__remote-cursor"
              style={{ left: `${c.x}px`, top: `${c.y}px`, ['--iux-canvas-color' as string]: c.color } as CSSProperties}
            >
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path d="M2 2l4 12 2-5 5-2z" fill="currentColor" stroke="white" strokeWidth="0.5" />
              </svg>
              <span className="iux-canvas__remote-name">{c.name}</span>
            </div>
          ))}
        </div>
        {variant !== 'pan' && (
          <div className="iux-canvas__hud">
            <span>{Math.round(transform.scale * 100)}%</span>
            <button type="button" onClick={fitToWorld}>Fit</button>
          </div>
        )}
      </div>
      {minimap}
    </div>
  )
}

interface MinimapProps {
  worldBounds: { x: number; y: number; w: number; h: number }
  objects: CanvasObject[]
  viewportTransform: Transform
  viewportSize: { w: number; h: number }
  onPanTo: (world: { x: number; y: number }) => void
}

function Minimap({ worldBounds, objects, viewportTransform, viewportSize, onPanTo }: MinimapProps) {
  const mmW = 140
  const mmH = 90
  const sx = mmW / worldBounds.w
  const sy = mmH / worldBounds.h
  const vpW = viewportSize.w / viewportTransform.scale * sx
  const vpH = viewportSize.h / viewportTransform.scale * sy
  const vpX = (-viewportTransform.x / viewportTransform.scale) * sx
  const vpY = (-viewportTransform.y / viewportTransform.scale) * sy

  return (
    <div
      className="iux-canvas__minimap"
      style={{ width: `${mmW}px`, height: `${mmH}px` }}
      onPointerDown={e => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const wx = ((e.clientX - rect.left) / mmW) * worldBounds.w
        const wy = ((e.clientY - rect.top) / mmH) * worldBounds.h
        onPanTo({ x: wx, y: wy })
      }}
    >
      {objects.map(o => (
        <span
          key={o.id}
          className="iux-canvas__minimap-obj"
          style={{ left: `${o.x * sx}px`, top: `${o.y * sy}px`, width: `${o.w * sx}px`, height: `${o.h * sy}px` }}
        />
      ))}
      <span
        className="iux-canvas__minimap-vp"
        style={{ left: `${vpX}px`, top: `${vpY}px`, width: `${vpW}px`, height: `${vpH}px` }}
        aria-hidden="true"
      />
    </div>
  )
}
