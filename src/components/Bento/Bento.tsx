// ABOUTME: CSS grid layout container where each cell can span multiple columns/rows, with static, reflow, drag-reorder, and resize-handle variants.

import {
  useMemo,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import './Bento.css'

// ABOUTME: Layout mode — 'static' uses fixed spans, 'reflow' uses preferred spans, 'drag' enables pointer-driven cell reordering, 'resize' enables SE-corner drag to snap cell sizes.
export type BentoVariant = 'static' | 'reflow' | 'drag' | 'resize'

// ABOUTME: A single grid cell with content, optional title, explicit column/row spans, preferred spans for reflow, and a list of legible size presets for resize snapping.
export interface BentoCell {
  id: string
  title?: ReactNode
  content: ReactNode
  /** Explicit span (number of grid columns / rows the cell occupies). */
  cols?: number
  rows?: number
  /** reflow: preferred span when `cols`/`rows` aren't explicit. */
  prefCols?: number
  prefRows?: number
  /** resize: list of legible (cols × rows) presets. */
  legibleSizes?: Array<{ cols: number; rows: number }>
}

// ABOUTME: Props for Bento — supplies cell data, variant, column count, optional row height, and callbacks for reorder and resize events.
export interface BentoProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: BentoVariant
  cells: BentoCell[]
  cols?: number
  rowHeight?: number
  onReorder?: (cells: BentoCell[]) => void
  onResize?: (id: string, cols: number, rows: number) => void
  className?: string
}

// ABOUTME: Clamps `n` to the inclusive range [lo, hi]; used to bound column/row span values during drag-resize.
function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

// ABOUTME: Renders an N-column CSS grid where each BentoCell spans configurable columns and rows; the 'drag' variant enables pointer-captured reordering by hover-swap, and 'resize' adds a SE-corner handle that snaps to declared legible sizes.
/**
 * Uses `grid-template-columns: repeat(cols, 1fr)` and `gridAutoRows` for the
 * container. On 'drag', pointer capture tracks which cell is being dragged and
 * swaps it with the cell currently under the pointer, calling `onReorder` with
 * the new order. On 'resize', a corner handle computes delta columns/rows from
 * pointer movement and snaps to the nearest `legibleSizes` preset before
 * calling `onResize`.
 */
export function Bento({
  variant = 'static',
  cells,
  cols = 4,
  rowHeight,
  onReorder,
  onResize,
  className,
}: BentoProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  // For drag-reorder: pointer-driven swap on hover.
  const dragStateRef = useRef<string | null>(null)

  const handleDragStart = (id: string, e: ReactPointerEvent<HTMLDivElement>) => {
    if (variant !== 'drag') return
    dragStateRef.current = id
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const handleDragMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const dragId = dragStateRef.current
    if (!dragId) return
    const root = rootRef.current
    if (!root) return
    const overEl = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
    const cell = overEl?.closest<HTMLElement>('[data-bento-id]')
    if (!cell) return
    const overId = cell.dataset.bentoId!
    if (overId === dragId) return
    const fromIdx = cells.findIndex(c => c.id === dragId)
    const toIdx = cells.findIndex(c => c.id === overId)
    if (fromIdx < 0 || toIdx < 0) return
    const next = cells.slice()
    const [moved] = next.splice(fromIdx, 1)
    next.splice(toIdx, 0, moved)
    onReorder?.(next)
  }
  const handleDragEnd = () => { dragStateRef.current = null }

  // For resize: SE-corner handle drag that snaps to nearest legible size.
  const resizeRef = useRef<{ id: string; startX: number; startY: number; startCols: number; startRows: number } | null>(null)
  const handleResizeDown = (id: string, e: ReactPointerEvent<HTMLSpanElement>) => {
    if (variant !== 'resize') return
    e.stopPropagation()
    const c = cells.find(cc => cc.id === id)
    if (!c) return
    resizeRef.current = { id, startX: e.clientX, startY: e.clientY, startCols: c.cols ?? 1, startRows: c.rows ?? 1 }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const handleResizeMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const r = resizeRef.current
    if (!r) return
    const cellEl = (e.currentTarget as HTMLElement).closest<HTMLElement>('[data-bento-id]')
    if (!cellEl) return
    const colWidth = (cellEl.parentElement?.getBoundingClientRect().width ?? cols * 100) / cols
    const rH = rowHeight ?? 96
    const deltaCols = Math.round((e.clientX - r.startX) / colWidth)
    const deltaRows = Math.round((e.clientY - r.startY) / rH)
    let nextCols = clamp(r.startCols + deltaCols, 1, cols)
    let nextRows = Math.max(1, r.startRows + deltaRows)
    const c = cells.find(cc => cc.id === r.id)
    if (c?.legibleSizes && c.legibleSizes.length > 0) {
      let best = c.legibleSizes[0]
      let bestD = Infinity
      for (const sz of c.legibleSizes) {
        const d = Math.abs(sz.cols - nextCols) + Math.abs(sz.rows - nextRows)
        if (d < bestD) { best = sz; bestD = d }
      }
      nextCols = best.cols
      nextRows = best.rows
    }
    onResize?.(r.id, nextCols, nextRows)
  }
  const handleResizeUp = () => { resizeRef.current = null }

  const gridStyle: CSSProperties = useMemo(() => ({
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridAutoRows: rowHeight ? `${rowHeight}px` : `minmax(6rem, auto)`,
  }), [cols, rowHeight])

  const classes = ['iux-bento', `iux-bento--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div ref={rootRef} className={classes} style={gridStyle}>
      {cells.map(c => {
        const span = c.cols ?? (variant === 'reflow' ? (c.prefCols ?? 1) : 1)
        const rowSpan = c.rows ?? (variant === 'reflow' ? (c.prefRows ?? 1) : 1)
        const style: CSSProperties = {
          gridColumn: `span ${clamp(span, 1, cols)}`,
          gridRow: `span ${Math.max(1, rowSpan)}`,
        }
        return (
          <div
            key={c.id}
            data-bento-id={c.id}
            className={[
              'iux-bento__cell',
              variant === 'drag' && 'iux-bento__cell--draggable',
            ].filter(Boolean).join(' ')}
            style={style}
            onPointerDown={variant === 'drag' ? e => handleDragStart(c.id, e) : undefined}
            onPointerMove={variant === 'drag' ? handleDragMove : undefined}
            onPointerUp={variant === 'drag' ? handleDragEnd : undefined}
            onPointerCancel={variant === 'drag' ? handleDragEnd : undefined}
          >
            {c.title && <div className="iux-bento__title">{c.title}</div>}
            <div className="iux-bento__content">{c.content}</div>
            {variant === 'drag' && <span className="iux-bento__handle" aria-hidden="true">⋮⋮</span>}
            {variant === 'resize' && (
              <span
                className="iux-bento__resize"
                aria-hidden="true"
                onPointerDown={e => handleResizeDown(c.id, e)}
                onPointerMove={handleResizeMove}
                onPointerUp={handleResizeUp}
                onPointerCancel={handleResizeUp}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

