// ABOUTME: VirtualList — a React component (components).

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import './VirtualList.css'

// ABOUTME: VirtualListVariant — a type alias.
export type VirtualListVariant = 'fixed' | 'variable' | 'sections' | 'grid'

// ABOUTME: SectionSpec — an interface.
export interface SectionSpec {
  id: string
  title: ReactNode
  /** Inclusive [from, to] indices into the items array. */
  itemRange: [number, number]
}

// ABOUTME: Props for VirtualList.
export interface VirtualListProps<T> {
  /** Functional axis. The same prop, never a forked component. */
  variant?: VirtualListVariant
  items: T[]
  renderItem: (item: T, index: number) => ReactNode

  /** fixed / sections: per-row height in pixels. */
  rowHeight?: number
  /** variable: initial estimate while a row hasn't been measured. */
  estimatedRowHeight?: number

  /** Viewport height. */
  height: number

  /** sections: contiguous groups; jump-to-section affordance. */
  sections?: SectionSpec[]

  /** grid: columns and cell sizing. */
  cols?: number
  cellHeight?: number

  className?: string
  ariaLabel?: string
}

// ABOUTME: VirtualList — a React component.
export function VirtualList<T>({
  variant = 'fixed',
  items,
  renderItem,
  rowHeight = 36,
  estimatedRowHeight = 40,
  height,
  sections,
  cols = 3,
  cellHeight = 120,
  className,
  ariaLabel,
}: VirtualListProps<T>) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const handleScroll = () => setScrollTop(scrollRef.current?.scrollTop ?? 0)

  // ---------- Variable-height measurement cache ----------
  const heightsRef = useRef<Map<number, number>>(new Map())
  const [versionId, setVersionId] = useState(0)
  const setHeight = useCallback((index: number, h: number) => {
    const prev = heightsRef.current.get(index)
    if (prev !== undefined && Math.abs(prev - h) < 1) return
    heightsRef.current.set(index, h)
    setVersionId(v => v + 1)
  }, [])

  const variableHeight = (index: number): number =>
    heightsRef.current.get(index) ?? estimatedRowHeight

  // ---------- Compute layout (offsets + total) ----------
  const layout = useMemo(() => {
    if (variant === 'fixed' || variant === 'sections') {
      return { offsets: null as null | number[], total: items.length * rowHeight }
    }
    if (variant === 'variable') {
      const offsets: number[] = new Array(items.length + 1)
      offsets[0] = 0
      for (let i = 0; i < items.length; i++) {
        offsets[i + 1] = offsets[i] + variableHeight(i)
      }
      return { offsets, total: offsets[items.length] }
    }
    if (variant === 'grid') {
      const rowCount = Math.ceil(items.length / cols)
      return { offsets: null, total: rowCount * cellHeight }
    }
    return { offsets: null, total: 0 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, items.length, rowHeight, cellHeight, cols, versionId])

  // ---------- Visible window ----------
  const computeWindow = (): { start: number; end: number } => {
    if (variant === 'grid') {
      const rowsVisible = Math.ceil(height / cellHeight) + 4
      const startRow = Math.max(0, Math.floor(scrollTop / cellHeight) - 2)
      const start = startRow * cols
      const end = Math.min(items.length, start + rowsVisible * cols)
      return { start, end }
    }
    if (variant === 'variable' && layout.offsets) {
      let start = binarySearchOffset(layout.offsets, scrollTop) - 2
      if (start < 0) start = 0
      let end = start
      while (end < items.length && layout.offsets[end] < scrollTop + height + 200) end++
      end = Math.min(items.length, end + 2)
      return { start, end }
    }
    // fixed / sections
    const rowsVisible = Math.ceil(height / rowHeight) + 4
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - 2)
    const end = Math.min(items.length, start + rowsVisible)
    return { start, end }
  }
  const { start, end } = computeWindow()

  const itemsToRender: { item: T; index: number; top: number }[] = []
  for (let i = start; i < end; i++) {
    let top: number
    if (variant === 'fixed' || variant === 'sections') top = i * rowHeight
    else if (variant === 'variable' && layout.offsets) top = layout.offsets[i]
    else if (variant === 'grid') top = Math.floor(i / cols) * cellHeight
    else top = 0
    itemsToRender.push({ item: items[i], index: i, top })
  }

  // ---------- Section header (sticky) for sections variant ----------
  const activeSection = useMemo<SectionSpec | undefined>(() => {
    if (variant !== 'sections' || !sections) return undefined
    const firstVisibleIdx = Math.floor(scrollTop / rowHeight)
    return sections.find(s => firstVisibleIdx >= s.itemRange[0] && firstVisibleIdx <= s.itemRange[1])
  }, [variant, sections, scrollTop, rowHeight])

  const jumpToSection = useCallback((s: SectionSpec) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: s.itemRange[0] * rowHeight, behavior: 'smooth' })
  }, [rowHeight])

  const classes = ['iux-vlist', `iux-vlist--${variant}`, className].filter(Boolean).join(' ')

  const wrapperStyle: CSSProperties = { height: `${height}px` }
  const padderStyle: CSSProperties = { height: `${layout.total}px` }

  return (
    <div className={classes} aria-label={ariaLabel}>
      {variant === 'sections' && sections && (
        <nav className="iux-vlist__section-nav" aria-label="Sections">
          {sections.map(s => (
            <button
              key={s.id}
              type="button"
              className={['iux-vlist__section-btn', activeSection?.id === s.id && 'is-active'].filter(Boolean).join(' ')}
              onClick={() => jumpToSection(s)}
            >{s.title}</button>
          ))}
        </nav>
      )}
      <div
        ref={scrollRef}
        className="iux-vlist__scroll"
        style={wrapperStyle}
        onScroll={handleScroll}
      >
        {variant === 'sections' && activeSection && (
          <div className="iux-vlist__sticky-header" style={{ top: 0 }}>
            {activeSection.title}
          </div>
        )}
        <div className="iux-vlist__padder" style={padderStyle}>
          {itemsToRender.map(({ item, index, top }) =>
            variant === 'grid' ? (
              <GridCell
                key={index}
                index={index}
                cols={cols}
                cellHeight={cellHeight}
                top={top}
              >
                {renderItem(item, index)}
              </GridCell>
            ) : variant === 'variable' ? (
              <MeasuredRow
                key={index}
                index={index}
                top={top}
                onMeasure={setHeight}
              >
                {renderItem(item, index)}
              </MeasuredRow>
            ) : (
              <div
                key={index}
                className="iux-vlist__row"
                style={{ top: `${top}px`, height: `${rowHeight}px` }}
              >
                {renderItem(item, index)}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

function GridCell({ index, cols, cellHeight, top, children }: {
  index: number
  cols: number
  cellHeight: number
  top: number
  children: ReactNode
}) {
  const col = index % cols
  return (
    <div
      className="iux-vlist__grid-cell"
      style={{
        top: `${top}px`,
        height: `${cellHeight}px`,
        insetInlineStart: `${(col / cols) * 100}%`,
        width: `${100 / cols}%`,
      }}
    >
      {children}
    </div>
  )
}

function MeasuredRow({ index, top, onMeasure, children }: {
  index: number
  top: number
  onMeasure: (i: number, h: number) => void
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    onMeasure(index, ref.current.offsetHeight)
  })
  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === 'undefined') return
    const obs = new ResizeObserver(entries => {
      const e = entries[0]
      if (e) onMeasure(index, e.contentRect.height + 0)
    })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [index, onMeasure])
  return (
    <div ref={ref} className="iux-vlist__row iux-vlist__row--measured" style={{ top: `${top}px` }}>
      {children}
    </div>
  )
}

function binarySearchOffset(offsets: number[], scrollTop: number): number {
  let lo = 0
  let hi = offsets.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >>> 1
    if (offsets[mid] < scrollTop) lo = mid + 1
    else hi = mid
  }
  return Math.max(0, lo - 1)
}
