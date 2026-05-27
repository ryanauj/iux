import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { palettes, type PaletteId } from '../../../palettes'
import { FAVORITES_GROUP } from '../../../palettes/defaultGroups'
import { notify } from '../../lib/_persistedShared'
import {
  ARROWS_MODE_KEY,
  cycleInGroup,
  isDefaultGroup,
  resolveGroupMembers,
  searchPalettes,
  useActiveGroup,
  useArrowsMode,
  useGroups,
  type ArrowsMode,
  type GroupsApi,
} from '../../lib/paletteTags'
import { usePersistedPref } from '../../lib/usePersistedPref'
import './PalettePicker.css'

const LIST_OPEN_KEY = 'palette-picker:list-open'
const isBoolPref = (raw: string): raw is '0' | '1' => raw === '0' || raw === '1'

export type PalettePickerVariant = 'button' | 'strip'

/**
 * Quadrant identifier from DraggableControls — re-declared locally to
 * keep PalettePicker independent of DraggableControls's internal types
 * (only the strip variant uses it, and only for positioning).
 */
type StripQuadrant = 'right-down' | 'right-up' | 'left-down' | 'left-up'

interface FieldShape {
  value: string
  onChange: (next: string) => void
  label?: string
  short?: string
}

interface PalettePickerProps {
  field: FieldShape
  variant: PalettePickerVariant
  /**
   * Strip variant only. Controlled-open state for the popover; the
   * parent (StripVariant) manages a single `activeKey` so only one slot
   * popover is shown at a time. Button variant manages its own state.
   */
  popoverOpen?: boolean
  /**
   * Strip variant only. Forwarded slot-button click event so the parent
   * can capture the slot's bounding rect for popover positioning and
   * toggle its `activeKey` state.
   */
  onSlotClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void
  /**
   * Strip variant only. Called when the panel wants to close (option
   * selected, Escape pressed). Button variant manages its own state.
   */
  onPanelClose?: () => void
  popoverQuadrant?: StripQuadrant
  slotRect?: DOMRect | null
}

export function PalettePicker(props: PalettePickerProps) {
  const { field, variant } = props
  const current = field.value as PaletteId

  const [arrowsMode] = useArrowsMode()
  const [activeGroup, setActiveGroup] = useActiveGroup()
  const [groups, groupsApi] = useGroups()

  const activeMembers = useMemo(
    () => resolveGroupMembers(activeGroup, groups),
    [activeGroup, groups],
  )

  const showInlineArrows =
    arrowsMode !== 'popover' && activeGroup !== null && activeMembers.length > 0

  const stepPalette = useCallback(
    (dir: -1 | 1) => {
      if (activeMembers.length === 0) return
      const next = cycleInGroup(dir, activeMembers, current)
      if (next !== current) field.onChange(next)
    },
    [activeMembers, current, field],
  )

  /* Internal open state — only used by the button variant. The strip
   * variant is parent-controlled. */
  const [internalOpen, setInternalOpen] = useState(false)
  const open = variant === 'strip' ? props.popoverOpen ?? false : internalOpen
  const closePanel = useCallback(() => {
    if (variant === 'strip') props.onPanelClose?.()
    else setInternalOpen(false)
  }, [variant, props])
  const onTriggerClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (variant === 'strip') props.onSlotClick?.(e)
    else setInternalOpen(o => !o)
  }

  const inlineLabel = palettes[current]?.name ?? current

  if (variant === 'strip') {
    return (
      <div className="ctrl-strip__palette-slot">
        <div className="ctrl-strip__palette-row">
          {showInlineArrows && (
            <button
              type="button"
              className="ctrl-strip__palette-arrow"
              aria-label={`Previous palette in ${activeGroup ?? 'group'}`}
              onClick={() => stepPalette(-1)}
            >
              ◀&#xFE0E;
            </button>
          )}
          <button
            type="button"
            className={`ctrl-strip__icon${open ? ' ctrl-strip__icon--active' : ''}`}
            aria-label={`${field.label ?? 'Palette'}: ${inlineLabel}`}
            aria-expanded={open}
            onClick={onTriggerClick}
          >
            <span className="ctrl-strip__icon-short" aria-hidden="true">
              {field.short ?? 'P'}
            </span>
            <span className="ctrl-strip__icon-val">{inlineLabel}</span>
          </button>
          {showInlineArrows && (
            <button
              type="button"
              className="ctrl-strip__palette-arrow"
              aria-label={`Next palette in ${activeGroup ?? 'group'}`}
              onClick={() => stepPalette(1)}
            >
              ▶&#xFE0E;
            </button>
          )}
        </div>
        {open && (
          <PalettePickerPanel
            field={field}
            current={current}
            variant="strip"
            quadrant={props.popoverQuadrant ?? 'right-down'}
            slotRect={props.slotRect ?? null}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            groups={groups}
            groupsApi={groupsApi}
            arrowsMode={arrowsMode}
            activeMembers={activeMembers}
            onStepPalette={stepPalette}
            onClose={closePanel}
          />
        )}
      </div>
    )
  }

  return (
    <div className={`ctrl-button__tile ctrl-button__tile--palette${open ? ' is-open' : ''}`}>
      <div className="palette-picker__inline-row">
        {showInlineArrows && (
          <button
            type="button"
            className="palette-picker__arrow"
            aria-label={`Previous palette in ${activeGroup ?? 'group'}`}
            onClick={() => stepPalette(-1)}
          >
            ◀&#xFE0E;
          </button>
        )}
        <button
          type="button"
          className="palette-picker__trigger"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={onTriggerClick}
        >
          <span className="palette-picker__trigger-label">{field.label ?? 'Palette'}</span>
          <span className="palette-picker__trigger-value">{inlineLabel}</span>
        </button>
        {showInlineArrows && (
          <button
            type="button"
            className="palette-picker__arrow"
            aria-label={`Next palette in ${activeGroup ?? 'group'}`}
            onClick={() => stepPalette(1)}
          >
            ▶&#xFE0E;
          </button>
        )}
      </div>
      {open && (
        <PalettePickerPanel
          field={field}
          current={current}
          variant="button"
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          groups={groups}
          groupsApi={groupsApi}
          arrowsMode={arrowsMode}
          activeMembers={activeMembers}
          onStepPalette={stepPalette}
          onClose={closePanel}
        />
      )}
    </div>
  )
}

/* ────────────────────────── Panel ────────────────────────── */

interface PanelProps {
  field: FieldShape
  current: PaletteId
  variant: PalettePickerVariant
  quadrant?: StripQuadrant
  slotRect?: DOMRect | null
  activeGroup: string | null
  setActiveGroup: (next: string | null) => void
  groups: Record<string, PaletteId[]>
  groupsApi: GroupsApi
  arrowsMode: ArrowsMode
  activeMembers: PaletteId[]
  onStepPalette: (dir: -1 | 1) => void
  onClose: () => void
}

function PalettePickerPanel(props: PanelProps) {
  const {
    field,
    current,
    variant,
    quadrant,
    slotRect,
    activeGroup,
    setActiveGroup,
    groups,
    groupsApi,
    arrowsMode,
    activeMembers,
    onStepPalette,
    onClose,
  } = props

  const [query, setQuery] = useState('')
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [listOpenRaw, setListOpenRaw] = usePersistedPref<'0' | '1'>(
    LIST_OPEN_KEY,
    '1',
    isBoolPref,
  )
  const listOpen = listOpenRaw === '1'
  const setListOpen = useCallback(
    (next: boolean) => setListOpenRaw(next ? '1' : '0'),
    [setListOpenRaw],
  )
  const [groupPaletteId, setGroupPaletteId] = useState<PaletteId | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /* Auto-focus the search input only when the list is actually visible —
   * otherwise focusing a hidden field is a no-op that silently swallows
   * the keyboard intent. */
  useEffect(() => {
    if (listOpen) searchRef.current?.focus()
  }, [listOpen])

  const showPopoverArrows =
    arrowsMode !== 'inline' && activeGroup !== null && activeMembers.length > 0

  /* Compose the visible palette list. When an active group is set, the
   * list narrows to its members so the picker doubles as a group editor.
   * Search wins over the group filter so a name lookup still reaches
   * everything. */
  const visiblePalettes = useMemo<PaletteId[]>(() => {
    if (query.trim()) return searchPalettes(query)
    if (activeGroup) {
      const ranked = searchPalettes('')
      const memberSet = new Set(activeMembers)
      return ranked.filter(id => memberSet.has(id))
    }
    return searchPalettes('')
  }, [query, activeGroup, activeMembers])

  const onCreateGroupFromResults = useCallback(() => {
    const proposed = query.trim() || 'New group'
    const name = window.prompt('Name this group', proposed)?.trim()
    if (!name) return
    groupsApi.createGroup(name, visiblePalettes.slice())
    setActiveGroup(name)
  }, [query, visiblePalettes, groupsApi, setActiveGroup])

  const onDeleteGroup = useCallback(
    (name: string) => {
      const detail = isDefaultGroup(name)
        ? `Reset "${name}" to its default members?`
        : `Delete group "${name}"?`
      if (!window.confirm(detail)) return
      groupsApi.deleteGroup(name)
      if (!isDefaultGroup(name) && activeGroup === name) setActiveGroup(null)
    },
    [groupsApi, activeGroup, setActiveGroup],
  )

  const onNewGroupForPalette = useCallback(
    (paletteId: PaletteId) => {
      const name = window.prompt('New group name')?.trim()
      if (!name) return
      groupsApi.createGroup(name, [paletteId])
    },
    [groupsApi],
  )

  const onResetDefaults = useCallback(() => {
    if (!window.confirm('Reset all default groups to their starting members? Groups you created will be kept.')) return
    groupsApi.resetDefaults()
  }, [groupsApi])

  const onKey = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    },
    [onClose],
  )

  /* Strip popover positioning matches the existing StripPopover. */
  const stripStyle = useMemo<CSSProperties>(() => {
    if (variant !== 'strip' || !slotRect) return {}
    const margin = 16
    const available = quadrant && quadrant.endsWith('down')
      ? window.innerHeight - slotRect.top - margin
      : slotRect.bottom - margin
    return { '--popover-max-height': `${Math.max(220, Math.round(available))}px` } as CSSProperties
  }, [variant, slotRect, quadrant])

  const isUp = variant === 'strip' && (quadrant ?? 'right-down').endsWith('-up')
  const containerClass =
    variant === 'strip'
      ? `ctrl-strip__popover ctrl-strip__popover--${quadrant ?? 'right-down'} palette-picker palette-picker--strip${isUp ? ' palette-picker--up' : ''}`
      : 'palette-picker palette-picker--button'

  /* When the popover opens upward, the section stack is reversed via
   * `palette-picker--up` so the active-group control sits nearest the
   * trigger (= bottom of the popover). The browser's default scrollTop=0
   * would show the far edge (preferences) instead. Scroll to the bottom
   * once on mount so the thumb-side anchor is in view. */
  useEffect(() => {
    if (!isUp) return
    const el = panelRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [isUp])

  /* All group names, sorted with Favorites first so it sits at the top
   * of the dropdown and the per-row group menu. */
  const groupNames = useMemo(() => {
    const names = Object.keys(groups).filter(n => n !== FAVORITES_GROUP).sort()
    return [FAVORITES_GROUP, ...names]
  }, [groups])

  const activeGroupExists = activeGroup !== null && activeGroup in groups
  const activeGroupAction = activeGroupExists
    ? isDefaultGroup(activeGroup!)
      ? 'Reset members'
      : 'Delete group'
    : null

  return (
    <div
      ref={panelRef}
      className={containerClass}
      style={stripStyle}
      role="dialog"
      aria-label="Palette picker"
      onKeyDown={onKey}
    >
      {/* Active group selector — always visible so the user can switch
       * groups and cycle palettes even when the browse list is collapsed. */}
      <div className="palette-picker__active-group">
        <label className="palette-picker__active-label">
          Active group
          <select
            className="palette-picker__active-select"
            value={activeGroup ?? ''}
            onChange={e => setActiveGroup(e.target.value === '' ? null : e.target.value)}
          >
            <option value="">— none —</option>
            {groupNames.map(name => (
              <option key={name} value={name}>
                {name} ({groups[name].length})
              </option>
            ))}
          </select>
        </label>
        {showPopoverArrows && (
          <div className="palette-picker__popover-arrows" role="group" aria-label="Cycle group">
            <button
              type="button"
              className="palette-picker__arrow"
              aria-label={`Previous in ${activeGroup}`}
              onClick={() => onStepPalette(-1)}
            >
              ◀&#xFE0E;
            </button>
            <button
              type="button"
              className="palette-picker__arrow"
              aria-label={`Next in ${activeGroup}`}
              onClick={() => onStepPalette(1)}
            >
              ▶&#xFE0E;
            </button>
          </div>
        )}
        {activeGroupAction && (
          <button
            type="button"
            className="palette-picker__delete-group"
            onClick={() => onDeleteGroup(activeGroup!)}
          >
            {activeGroupAction}
          </button>
        )}
      </div>

      {/* Browse disclosure — collapses the heavy search + list section so
       * the popover shrinks to a compact pill on small screens. */}
      <div className="palette-picker__browse">
        <button
          type="button"
          className="palette-picker__browse-toggle"
          aria-expanded={listOpen}
          onClick={() => setListOpen(!listOpen)}
        >
          {listOpen ? '▾' : '▸'} Browse {Object.keys(palettes).length} palettes
        </button>
        {listOpen && (
          <div className="palette-picker__browse-body">
            <div className="palette-picker__search-row">
              <input
                ref={searchRef}
                type="text"
                className="palette-picker__search"
                placeholder={`Search ${Object.keys(palettes).length} palettes…`}
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search palettes"
              />
            </div>
            {visiblePalettes.length === 0 ? (
              <div className="palette-picker__empty">
                <span>No matches</span>
                {query.trim() && (
                  <button
                    type="button"
                    className="palette-picker__inline-action"
                    onClick={onCreateGroupFromResults}
                  >
                    Create group from results
                  </button>
                )}
              </div>
            ) : (
              <ul className="palette-picker__list" role="menu">
          {visiblePalettes.map(id => {
            const palette = palettes[id]
            const selected = id === current
            const isGroupOpen = groupPaletteId === id
            const favorited = groupsApi.isFavorite(id)
            return (
              <li key={id} className="palette-picker__row">
                <button
                  type="button"
                  className={`palette-picker__star${favorited ? ' is-favorited' : ''}`}
                  aria-label={favorited ? `Unfavorite ${palette.name}` : `Favorite ${palette.name}`}
                  aria-pressed={favorited}
                  onClick={(e: ReactMouseEvent) => {
                    e.stopPropagation()
                    groupsApi.toggleFavorite(id)
                  }}
                >
                  {favorited ? '★' : '☆'}
                </button>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  className={`palette-picker__option${selected ? ' is-selected' : ''}`}
                  onClick={() => {
                    field.onChange(id)
                    onClose()
                  }}
                >
                  <span className="palette-picker__option-name">{palette.name}</span>
                  <span className="palette-picker__option-engine">{palette.engine}</span>
                </button>
                <button
                  type="button"
                  className="palette-picker__option-menu"
                  aria-label={`Add ${palette.name} to a group`}
                  aria-expanded={isGroupOpen}
                  onClick={(e: ReactMouseEvent) => {
                    e.stopPropagation()
                    setGroupPaletteId(isGroupOpen ? null : id)
                  }}
                >
                  +
                </button>
                {isGroupOpen && (
                  <div className="palette-picker__group-menu" role="menu">
                    {groupNames.map(name => {
                      const inGroup = (groups[name] ?? []).includes(id)
                      return (
                        <button
                          key={name}
                          type="button"
                          className={`palette-picker__group-menu-item${inGroup ? ' is-in-group' : ''}`}
                          onClick={() => groupsApi.toggleMembership(name, id)}
                        >
                          {inGroup ? '✓' : '+'} {name}
                        </button>
                      )
                    })}
                    <button
                      type="button"
                      className="palette-picker__group-menu-item palette-picker__group-menu-item--new"
                      onClick={() => {
                        onNewGroupForPalette(id)
                        setGroupPaletteId(null)
                      }}
                    >
                      + New group…
                    </button>
                  </div>
                )}
              </li>
            )
                  })}
                </ul>
              )}
          </div>
        )}
      </div>

      {/* Preferences disclosure */}
      <div className="palette-picker__prefs">
        <button
          type="button"
          className="palette-picker__prefs-toggle"
          aria-expanded={prefsOpen}
          onClick={() => setPrefsOpen(o => !o)}
        >
          {prefsOpen ? '▾' : '▸'} Preferences
        </button>
        {prefsOpen && (
          <div className="palette-picker__prefs-body">
            <PrefRow
              storageKey={ARROWS_MODE_KEY}
              label="Arrows"
              current={arrowsMode}
              options={[
                { value: 'both', label: 'Inline + popover' },
                { value: 'inline', label: 'Inline only' },
                { value: 'popover', label: 'Popover only' },
              ]}
            />
            <div className="palette-picker__prefs-actions">
              <button
                type="button"
                className="palette-picker__inline-action"
                onClick={onResetDefaults}
              >
                Reset default groups
              </button>
              {query.trim() && (
                <button
                  type="button"
                  className="palette-picker__inline-action"
                  onClick={onCreateGroupFromResults}
                >
                  Create group from results
                </button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

/* ──────────────── Preferences row ──────────────── */

interface PrefOption {
  value: string
  label: string
}

function PrefRow({
  storageKey,
  label,
  current,
  options,
}: {
  storageKey: string
  label: string
  current: string
  options: PrefOption[]
}) {
  /* Writes through localStorage + the listeners bus directly so the
   * pref hooks pick it up without us threading setters down. */
  const set = (next: string) => {
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      /* ignore */
    }
    /* Notify the in-tab bus so the active hook re-reads. */
    notify(storageKey, next)
  }
  return (
    <div className="palette-picker__pref-row" role="radiogroup" aria-label={label}>
      <span className="palette-picker__pref-label">{label}</span>
      <div className="palette-picker__pref-options">
        {options.map(o => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={current === o.value}
            className={`palette-picker__pref-btn${current === o.value ? ' is-active' : ''}`}
            onClick={() => set(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
