// ABOUTME: Navigation sidebar in four variants: a flat item list ('links'), items grouped into collapsible sections ('groups'), a pointer-resizable rail with icon-only collapsed state and a pinned section ('rail'), and a live-filter search sidebar with keyword matching ('search').

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import './Sidebar.css'

// ABOUTME: The functional axis: 'links' renders a flat list, 'groups' adds collapsible section headings, 'rail' adds pointer-drag resize and an icon-only collapsed state, 'search' adds a live filter input that matches labels and keywords.
export type SidebarVariant = 'links' | 'groups' | 'rail' | 'search'

// ABOUTME: One navigation item: 'id' is the stable key for active state, 'label' and 'icon' are displayed, 'href' renders an <a> element, 'pinned' surfaces the item at the top of the 'rail' pinned section, and 'keywords' extends label matching in 'search' mode.
export interface SidebarItem {
  id: string
  label: string
  icon?: ReactNode
  badge?: ReactNode
  href?: string
  onSelect?: () => void
  pinned?: boolean
  disabled?: boolean
  /** search variant: secondary keywords for fuzzy match. */
  keywords?: string[]
}

// ABOUTME: A named group of sidebar items: 'collapsible' enables a toggle button, 'defaultCollapsed' sets the initial collapsed state, and 'items' are the items within the section.
export interface SidebarGroup {
  id: string
  label: string
  items: SidebarItem[]
  collapsible?: boolean
  defaultCollapsed?: boolean
}

// ABOUTME: Configures Sidebar: 'items' or 'groups' supply the navigation data (groups used in 'groups' variant), 'activeId'/'defaultActiveId' control the highlighted item, and 'width'/'collapsed' control the 'rail' variant's resize and collapse state.
export interface SidebarProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: SidebarVariant
  items?: SidebarItem[]
  groups?: SidebarGroup[]
  activeId?: string
  defaultActiveId?: string
  onActiveChange?: (id: string) => void

  /** rail: collapsed to icon-only. */
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (next: boolean) => void

  /** rail: starting width; supports pointer-drag resize. */
  width?: number
  defaultWidth?: number
  onWidthChange?: (w: number) => void

  searchPlaceholder?: string
  className?: string
  ariaLabel?: string
}

// ABOUTME: Renders a <nav> element with variant-specific layout: flat list, grouped collapsible sections, or a rail with pointer-capture resize handle (clamped 180–420px) and toggle between full and icon-only mode; 'search' variant filters all items by label and keywords in real time.
/**
 * Controlled and uncontrolled modes are both supported for activeId, collapsed,
 * and width. Items render as <a> tags when `href` is set, otherwise <button>.
 * In 'rail' mode, pinned items appear in their own "Pinned" section at the top
 * when the sidebar is expanded. Group collapse state is maintained per-group in
 * a local Set.
 */
export function Sidebar({
  variant = 'links',
  items,
  groups,
  activeId,
  defaultActiveId,
  onActiveChange,
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  width,
  defaultWidth = 240,
  onWidthChange,
  searchPlaceholder = 'Search…',
  className,
  ariaLabel = 'Primary navigation',
}: SidebarProps) {
  const isActiveControlled = activeId !== undefined
  const [innerActive, setInnerActive] = useState<string | undefined>(defaultActiveId)
  const currentActive = isActiveControlled ? activeId : innerActive

  const commitActive = (id: string) => {
    if (!isActiveControlled) setInnerActive(id)
    onActiveChange?.(id)
  }

  const isCollapsedControlled = collapsed !== undefined
  const [innerCollapsed, setInnerCollapsed] = useState<boolean>(defaultCollapsed)
  const currentCollapsed = isCollapsedControlled ? collapsed : innerCollapsed
  const setCollapsedState = (next: boolean) => {
    if (!isCollapsedControlled) setInnerCollapsed(next)
    onCollapsedChange?.(next)
  }

  const isWidthControlled = width !== undefined
  const [innerWidth, setInnerWidth] = useState<number>(defaultWidth)
  const currentWidth = isWidthControlled ? width! : innerWidth
  const setWidthState = (w: number) => {
    const clamped = Math.max(180, Math.min(420, w))
    if (!isWidthControlled) setInnerWidth(clamped)
    onWidthChange?.(clamped)
  }

  // ---------- Group collapsed state ----------
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    () => new Set((groups ?? []).filter(g => g.defaultCollapsed).map(g => g.id)),
  )
  const toggleGroup = (gid: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(gid)) next.delete(gid); else next.add(gid)
      return next
    })
  }

  // ---------- Resize ----------
  const resizingRef = useRef<{ startX: number; startW: number } | null>(null)
  const handleResizeStart = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      resizingRef.current = { startX: event.clientX, startW: currentWidth }
      ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
    },
    [currentWidth],
  )
  const handleResizeMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const r = resizingRef.current
      if (!r) return
      setWidthState(r.startW + (event.clientX - r.startX))
    },
    [],
  )
  const handleResizeEnd = useCallback(() => { resizingRef.current = null }, [])

  // ---------- Search ----------
  const [query, setQuery] = useState('')
  const allItems = useMemo<SidebarItem[]>(() => {
    if (items) return items
    return (groups ?? []).flatMap(g => g.items)
  }, [items, groups])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allItems
    return allItems.filter(i => i.label.toLowerCase().includes(q) || (i.keywords ?? []).some(k => k.toLowerCase().includes(q)))
  }, [query, allItems])

  const pinned = useMemo(() => allItems.filter(i => i.pinned), [allItems])

  const handleSelect = (item: SidebarItem) => {
    if (item.disabled) return
    commitActive(item.id)
    item.onSelect?.()
  }

  const showRail = variant === 'rail' && currentCollapsed

  const classes = [
    'iux-sidebar',
    `iux-sidebar--${variant}`,
    showRail && 'is-collapsed',
    className,
  ].filter(Boolean).join(' ')

  return (
    <nav
      className={classes}
      aria-label={ariaLabel}
      data-variant={variant}
      style={variant === 'rail' ? { width: showRail ? '4rem' : `${currentWidth}px` } : undefined}
    >
      {(variant === 'rail') && (
        <button
          type="button"
          className="iux-sidebar__collapse-btn"
          aria-label={showRail ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!showRail}
          onClick={() => setCollapsedState(!currentCollapsed)}
        >
          {showRail ? '›' : '‹'}
        </button>
      )}

      {variant === 'search' && (
        <div className="iux-sidebar__search">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label="Filter navigation"
            className="iux-sidebar__search-input"
          />
        </div>
      )}

      <div className="iux-sidebar__scroll">
        {variant === 'rail' && pinned.length > 0 && (
          <section className="iux-sidebar__section">
            <h3 className="iux-sidebar__section-title">Pinned</h3>
            <ul className="iux-sidebar__list" role="list">
              {pinned.map(item => renderItem(item, currentActive, handleSelect, showRail))}
            </ul>
          </section>
        )}

        {variant === 'search' ? (
          <ul className="iux-sidebar__list" role="list">
            {filtered.length === 0 && <li className="iux-sidebar__empty">No matches</li>}
            {filtered.map(item => renderItem(item, currentActive, handleSelect, false))}
          </ul>
        ) : items ? (
          <ul className="iux-sidebar__list" role="list">
            {items.map(item => renderItem(item, currentActive, handleSelect, showRail))}
          </ul>
        ) : (
          (groups ?? []).map(g => {
            const isCollapsed = collapsedGroups.has(g.id)
            return (
              <section key={g.id} className="iux-sidebar__section">
                {g.collapsible ? (
                  <button
                    type="button"
                    className="iux-sidebar__section-toggle"
                    aria-expanded={!isCollapsed}
                    onClick={() => toggleGroup(g.id)}
                  >
                    <span>{g.label}</span>
                    <Chevron expanded={!isCollapsed} />
                  </button>
                ) : (
                  <h3 className="iux-sidebar__section-title">{g.label}</h3>
                )}
                {!isCollapsed && (
                  <ul className="iux-sidebar__list" role="list">
                    {g.items.map(item => renderItem(item, currentActive, handleSelect, showRail))}
                  </ul>
                )}
              </section>
            )
          })
        )}
      </div>

      {variant === 'rail' && (
        <div
          className="iux-sidebar__resize-handle"
          role="separator"
          aria-orientation="vertical"
          onPointerDown={handleResizeStart}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
          onPointerCancel={handleResizeEnd}
        />
      )}
    </nav>
  )
}

function renderItem(
  item: SidebarItem,
  activeId: string | undefined,
  onSelect: (item: SidebarItem) => void,
  iconOnly: boolean,
): ReactNode {
  const selected = item.id === activeId
  const content = (
    <>
      {item.icon && <span className="iux-sidebar__icon" aria-hidden="true">{item.icon}</span>}
      <span className="iux-sidebar__label">{item.label}</span>
      {item.badge !== undefined && !iconOnly && (
        <span className="iux-sidebar__badge">{item.badge}</span>
      )}
    </>
  )
  return (
    <li
      key={item.id}
      className={[
        'iux-sidebar__item',
        selected && 'is-active',
        item.disabled && 'is-disabled',
        iconOnly && 'is-icon-only',
      ].filter(Boolean).join(' ')}
    >
      {item.href ? (
        <a
          href={item.href}
          aria-current={selected ? 'page' : undefined}
          aria-disabled={item.disabled || undefined}
          className="iux-sidebar__link"
          onClick={e => {
            if (item.disabled) { e.preventDefault(); return }
            // Let the link work, but also fire onSelect to update local state.
            onSelect(item)
          }}
          title={iconOnly ? item.label : undefined}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          className="iux-sidebar__link"
          aria-current={selected ? 'page' : undefined}
          aria-disabled={item.disabled || undefined}
          disabled={item.disabled}
          onClick={() => onSelect(item)}
          title={iconOnly ? item.label : undefined}
        >
          {content}
        </button>
      )}
    </li>
  )
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : undefined, transition: `transform var(--motion-duration-fast) var(--motion-easing-standard)` }}>
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
