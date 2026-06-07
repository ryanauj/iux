// ABOUTME: Table — a React component (components).

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import './Table.css'

// ABOUTME: TableVariant — a type alias.
export type TableVariant = 'static' | 'sortable' | 'resizable' | 'editable'

// ABOUTME: TableColumn — an interface.
export interface TableColumn<T> {
  key: string
  header: ReactNode
  /** Reads the displayed value from a row. */
  accessor: (row: T) => ReactNode
  /** Sort comparator. Presence makes the column sortable in sortable+ variants. */
  sortBy?: (a: T, b: T) => number
  /** Initial width in pixels (resizable variant uses this as the starting size). */
  width?: number
  /** Default hidden in the column-visibility menu (resizable+). */
  hiddenByDefault?: boolean
  /** Inline editor renderer (editable variant). */
  editor?: (row: T, commit: (nextValue: unknown) => void, cancel: () => void) => ReactNode
  /** Plain-value accessor for inline editing diffing (editable variant). */
  valueOf?: (row: T) => unknown
  align?: 'start' | 'end' | 'center'
}

// ABOUTME: Props for Table.
export interface TableProps<T> {
  /** Functional axis. The same prop, never a forked component. */
  variant?: TableVariant
  data: T[]
  columns: TableColumn<T>[]
  getRowId?: (row: T, index: number) => string

  /** sortable+ defaults. */
  defaultSort?: { key: string; dir: 'asc' | 'desc' }
  selectable?: boolean
  selectedIds?: string[]
  defaultSelectedIds?: string[]
  onSelectedIdsChange?: (ids: string[]) => void

  /** editable: persist a cell edit. Resolves with the new authoritative value. */
  onCellSave?: (args: { rowId: string; columnKey: string; value: unknown }) => Promise<unknown> | unknown

  /** virtualization (editable variant) row pixel height. */
  rowHeight?: number
  /** Max visible viewport (editable). */
  height?: number

  caption?: string
  className?: string
}

type SortState = { key: string; dir: 'asc' | 'desc' } | null

interface CellSaveState {
  /** 'dirty' = locally changed; 'saving' = in-flight; 'saved' = settled OK; 'error' = rejected. */
  status: 'idle' | 'dirty' | 'saving' | 'saved' | 'error'
  value?: unknown
  pendingValue?: unknown
}

function defaultGetId(_row: unknown, index: number): string {
  return String(index)
}

// ABOUTME: Table — a React component.
export function Table<T>(props: TableProps<T>) {
  const {
    variant = 'static',
    data,
    columns,
    getRowId = defaultGetId,
    defaultSort,
    selectable = false,
    selectedIds,
    defaultSelectedIds,
    onSelectedIdsChange,
    onCellSave,
    rowHeight = 36,
    height,
    caption,
    className,
  } = props

  const tableId = useId()

  // ---------- Sort state ----------
  const [sort, setSort] = useState<SortState>(defaultSort ?? null)

  const sortedData = useMemo<T[]>(() => {
    if (!sort) return data
    const col = columns.find(c => c.key === sort.key)
    if (!col || !col.sortBy) return data
    const out = data.slice()
    out.sort((a, b) => sort.dir === 'asc' ? col.sortBy!(a, b) : -col.sortBy!(a, b))
    return out
  }, [data, sort, columns])

  // ---------- Selection ----------
  const isSelControlled = selectedIds !== undefined
  const [innerSel, setInnerSel] = useState<Set<string>>(new Set(defaultSelectedIds ?? []))
  const currentSel = isSelControlled ? new Set(selectedIds!) : innerSel

  const commitSel = useCallback(
    (next: Set<string>) => {
      if (!isSelControlled) setInnerSel(next)
      onSelectedIdsChange?.(Array.from(next))
    },
    [isSelControlled, onSelectedIdsChange],
  )

  const toggleRowSel = (id: string) => {
    const next = new Set(currentSel)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    commitSel(next)
  }

  const allOnPageIds = sortedData.map((r, i) => getRowId(r, i))
  const allSelected = allOnPageIds.length > 0 && allOnPageIds.every(id => currentSel.has(id))
  const someSelected = allOnPageIds.some(id => currentSel.has(id)) && !allSelected

  const toggleSelectAll = () => {
    const next = new Set(currentSel)
    if (allSelected) for (const id of allOnPageIds) next.delete(id)
    else for (const id of allOnPageIds) next.add(id)
    commitSel(next)
  }

  // ---------- Column widths (resizable) ----------
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const out: Record<string, number> = {}
    for (const c of columns) if (c.width !== undefined) out[c.key] = c.width
    return out
  })

  const resizingRef = useRef<{ key: string; startX: number; startW: number } | null>(null)

  const handleResizeStart = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, key: string) => {
      const w = colWidths[key] ?? 120
      resizingRef.current = { key, startX: event.clientX, startW: w }
      ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
    },
    [colWidths],
  )

  const handleResizeMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const r = resizingRef.current
      if (!r) return
      const delta = event.clientX - r.startX
      const next = Math.max(60, r.startW + delta)
      setColWidths(prev => ({ ...prev, [r.key]: next }))
    },
    [],
  )

  const handleResizeEnd = useCallback(() => {
    resizingRef.current = null
  }, [])

  // ---------- Column visibility ----------
  const [hidden, setHidden] = useState<Set<string>>(
    () => new Set(columns.filter(c => c.hiddenByDefault).map(c => c.key)),
  )
  const [visibilityOpen, setVisibilityOpen] = useState(false)

  const visibleColumns = useMemo(
    () => columns.filter(c => !hidden.has(c.key)),
    [columns, hidden],
  )

  // ---------- Editable state ----------
  const [editing, setEditing] = useState<{ rowId: string; key: string } | null>(null)
  const [saveStates, setSaveStates] = useState<Record<string, CellSaveState>>({})

  const setSaveState = (rowId: string, columnKey: string, st: CellSaveState) => {
    setSaveStates(prev => ({ ...prev, [`${rowId}:${columnKey}`]: st }))
  }

  const getSaveState = (rowId: string, columnKey: string): CellSaveState => {
    return saveStates[`${rowId}:${columnKey}`] ?? { status: 'idle' }
  }

  const startEditing = useCallback((rowId: string, key: string) => {
    if (variant !== 'editable') return
    const col = columns.find(c => c.key === key)
    if (!col?.editor) return
    setEditing({ rowId, key })
  }, [variant, columns])

  const cancelEditing = useCallback(() => setEditing(null), [])

  const commitEdit = useCallback(async (rowId: string, key: string, value: unknown) => {
    setEditing(null)
    setSaveState(rowId, key, { status: 'dirty', pendingValue: value })
    try {
      setSaveState(rowId, key, { status: 'saving', pendingValue: value })
      const result = onCellSave ? await onCellSave({ rowId, columnKey: key, value }) : value
      setSaveState(rowId, key, { status: 'saved', value: result ?? value })
      // After a settle, clear back to idle so the dot goes away.
      window.setTimeout(() => setSaveState(rowId, key, { status: 'idle' }), 1500)
    } catch {
      setSaveState(rowId, key, { status: 'error', pendingValue: value })
    }
  }, [onCellSave])

  // ---------- Virtualization (editable) ----------
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const handleScroll = () => setScrollTop(scrollRef.current?.scrollTop ?? 0)
  const isVirtualized = variant === 'editable' && height !== undefined
  const visibleRowCount = isVirtualized && height ? Math.ceil(height / rowHeight) + 6 : sortedData.length
  const startIndex = isVirtualized ? Math.max(0, Math.floor(scrollTop / rowHeight) - 3) : 0
  const endIndex = isVirtualized ? Math.min(sortedData.length, startIndex + visibleRowCount) : sortedData.length
  const rowsToRender = sortedData.slice(startIndex, endIndex)
  const topPadding = isVirtualized ? startIndex * rowHeight : 0
  const bottomPadding = isVirtualized ? Math.max(0, (sortedData.length - endIndex) * rowHeight) : 0

  const hasResize = variant === 'resizable'
  const hasSort = variant === 'sortable' || variant === 'resizable' || variant === 'editable'
  const hasSelect = selectable && (variant === 'sortable' || variant === 'resizable' || variant === 'editable')
  const hasSticky = variant === 'resizable' || variant === 'editable'

  const cycleSort = (key: string) => {
    const col = columns.find(c => c.key === key)
    if (!col?.sortBy) return
    setSort(prev => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }

  const handleHeaderKey = (event: KeyboardEvent<HTMLButtonElement>, key: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      cycleSort(key)
    }
  }

  const classes = [
    'iux-table',
    `iux-table--${variant}`,
    hasSticky && 'iux-table--sticky',
    className,
  ].filter(Boolean).join(' ')

  const wrapperStyle: CSSProperties = isVirtualized ? { maxHeight: `${height}px` } : {}

  return (
    <div className={classes}>
      {/*
       * Character-border corners (Terminal-TUI engine). See Card / Modal
       * for the pattern note: always rendered, hidden by default,
       * revealed under `@container palette style(--border-style:
       * character)`. The table outline ends up reading like a `top` /
       * `htop` panel: single-character grid separators on every column
       * + row boundary, corner glyphs at the four edges.
       */}
      <span className="iux-table__corner iux-table__corner--tl" aria-hidden="true">┌</span>
      <span className="iux-table__corner iux-table__corner--tr" aria-hidden="true">┐</span>
      <span className="iux-table__corner iux-table__corner--bl" aria-hidden="true">└</span>
      <span className="iux-table__corner iux-table__corner--br" aria-hidden="true">┘</span>
      {hasResize && (
        <div className="iux-table__toolbar">
          <button
            type="button"
            className="iux-table__visibility-trigger"
            aria-haspopup="true"
            aria-expanded={visibilityOpen}
            onClick={() => setVisibilityOpen(o => !o)}
          >
            Columns ▾
          </button>
          {visibilityOpen && (
            <div className="iux-table__visibility-menu" role="menu">
              {columns.map(c => (
                <label key={c.key} className="iux-table__visibility-row">
                  <input
                    type="checkbox"
                    checked={!hidden.has(c.key)}
                    onChange={() => {
                      setHidden(prev => {
                        const next = new Set(prev)
                        if (next.has(c.key)) next.delete(c.key)
                        else next.add(c.key)
                        return next
                      })
                    }}
                  />
                  {c.header}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <div
        ref={scrollRef}
        className="iux-table__scroll"
        style={wrapperStyle}
        onScroll={isVirtualized ? handleScroll : undefined}
      >
        <table
          id={tableId}
          className="iux-table__table"
          role="table"
        >
          {caption && <caption className="iux-table__caption">{caption}</caption>}
          <thead className="iux-table__thead">
            <tr>
              {hasSelect && (
                <th scope="col" className="iux-table__th iux-table__th--select">
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={allSelected}
                    ref={el => {
                      if (el) el.indeterminate = someSelected
                    }}
                    onChange={toggleSelectAll}
                  />
                </th>
              )}
              {visibleColumns.map(col => {
                const sortable = hasSort && col.sortBy !== undefined
                const isSorted = sort?.key === col.key
                const style: CSSProperties = colWidths[col.key]
                  ? { width: `${colWidths[col.key]}px` }
                  : {}
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={[
                      'iux-table__th',
                      col.align && `iux-table__th--align-${col.align}`,
                      isSorted && `iux-table__th--sorted-${sort?.dir}`,
                    ].filter(Boolean).join(' ')}
                    style={style}
                    aria-sort={isSorted ? (sort?.dir === 'asc' ? 'ascending' : 'descending') : (sortable ? 'none' : undefined)}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        className="iux-table__th-button"
                        onClick={() => cycleSort(col.key)}
                        onKeyDown={e => handleHeaderKey(e, col.key)}
                      >
                        {col.header}
                        <SortGlyph dir={isSorted ? sort?.dir : undefined} />
                      </button>
                    ) : (
                      <span>{col.header}</span>
                    )}
                    {hasResize && (
                      <div
                        className="iux-table__resize-handle"
                        role="separator"
                        aria-orientation="vertical"
                        onPointerDown={ev => handleResizeStart(ev, col.key)}
                        onPointerMove={handleResizeMove}
                        onPointerUp={handleResizeEnd}
                        onPointerCancel={handleResizeEnd}
                      />
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="iux-table__tbody">
            {isVirtualized && topPadding > 0 && (
              <tr aria-hidden="true" style={{ height: `${topPadding}px` }}><td colSpan={visibleColumns.length + (hasSelect ? 1 : 0)} /></tr>
            )}
            {rowsToRender.map((row, i) => {
              const absoluteIndex = startIndex + i
              const rowId = getRowId(row, absoluteIndex)
              const selected = currentSel.has(rowId)
              return (
                <tr
                  key={rowId}
                  className={[
                    'iux-table__tr',
                    selected && 'is-selected',
                  ].filter(Boolean).join(' ')}
                  aria-selected={hasSelect ? selected : undefined}
                  style={isVirtualized ? { height: `${rowHeight}px` } : undefined}
                >
                  {hasSelect && (
                    <td className="iux-table__td iux-table__td--select">
                      <input
                        type="checkbox"
                        aria-label={`Select row ${absoluteIndex + 1}`}
                        checked={selected}
                        onChange={() => toggleRowSel(rowId)}
                      />
                    </td>
                  )}
                  {visibleColumns.map(col => {
                    const isEditing = editing?.rowId === rowId && editing?.key === col.key
                    const state = getSaveState(rowId, col.key)
                    return (
                      <td
                        key={col.key}
                        className={[
                          'iux-table__td',
                          col.align && `iux-table__td--align-${col.align}`,
                        ].filter(Boolean).join(' ')}
                        onDoubleClick={() => startEditing(rowId, col.key)}
                      >
                        {isEditing && col.editor ? (
                          col.editor(
                            row,
                            (value: unknown) => commitEdit(rowId, col.key, value),
                            cancelEditing,
                          )
                        ) : (
                          <span className="iux-table__cell-value">
                            {state.status !== 'idle' && state.pendingValue !== undefined
                              ? String(state.pendingValue)
                              : col.accessor(row)}
                            {variant === 'editable' && state.status !== 'idle' && (
                              <SaveDot status={state.status} />
                            )}
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {isVirtualized && bottomPadding > 0 && (
              <tr aria-hidden="true" style={{ height: `${bottomPadding}px` }}><td colSpan={visibleColumns.length + (hasSelect ? 1 : 0)} /></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SortGlyph({ dir }: { dir?: 'asc' | 'desc' }) {
  return (
    <svg viewBox="0 0 16 16" width="0.85em" height="0.85em" aria-hidden="true" className="iux-table__sort-glyph" data-dir={dir ?? 'none'}>
      <path d="M5 6l3-3 3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-arrow="up" />
      <path d="M5 10l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-arrow="down" />
    </svg>
  )
}

function SaveDot({ status }: { status: CellSaveState['status'] }) {
  if (status === 'idle') return null
  const tone =
    status === 'saving' ? 'iux-table__save-dot--saving'
    : status === 'saved' ? 'iux-table__save-dot--saved'
    : status === 'error' ? 'iux-table__save-dot--error'
    : 'iux-table__save-dot--dirty'
  const label =
    status === 'saving' ? 'Saving' :
    status === 'saved'  ? 'Saved'  :
    status === 'error'  ? 'Save failed' : 'Dirty'
  return (
    <span className={`iux-table__save-dot ${tone}`} title={label} aria-label={label} role="status" />
  )
}

