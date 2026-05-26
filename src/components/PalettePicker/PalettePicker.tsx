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
import { notify } from '../../lib/_persistedShared'
import {
  ARROWS_MODE_KEY,
  PINNING_MODE_KEY,
  allTags,
  cycleInGroup,
  getPaletteTags,
  resolveGroupMembers,
  searchPalettes,
  tagToPaletteIds,
  useActiveGroup,
  useArrowsMode,
  useCustomGroups,
  usePinnedGroups,
  usePinningMode,
  type ArrowsMode,
  type PinningMode,
} from '../../lib/paletteTags'
import './PalettePicker.css'

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
  const [pinningMode] = usePinningMode()
  const [pinned, setPinned] = usePinnedGroups()
  const [activeGroup, setActiveGroup] = useActiveGroup()
  const [customGroups, setCustomGroups] = useCustomGroups()

  /* Resolve active-group members for the arrow cycle. Custom groups
   * shadow same-named tags so a user can curate their own set. */
  const activeMembers = useMemo(
    () => resolveGroupMembers(activeGroup, customGroups),
    [activeGroup, customGroups],
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
              ◀
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
              {field.short ?? 'C'}
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
              ▶
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
            pinned={pinned}
            setPinned={setPinned}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            customGroups={customGroups}
            setCustomGroups={setCustomGroups}
            arrowsMode={arrowsMode}
            pinningMode={pinningMode}
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
            ◀
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
            ▶
          </button>
        )}
      </div>
      {open && (
        <PalettePickerPanel
          field={field}
          current={current}
          variant="button"
          pinned={pinned}
          setPinned={setPinned}
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          customGroups={customGroups}
          setCustomGroups={setCustomGroups}
          arrowsMode={arrowsMode}
          pinningMode={pinningMode}
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
  pinned: string[]
  setPinned: (next: string[]) => void
  activeGroup: string | null
  setActiveGroup: (next: string | null) => void
  customGroups: Record<string, PaletteId[]>
  setCustomGroups: (next: Record<string, PaletteId[]>) => void
  arrowsMode: ArrowsMode
  pinningMode: PinningMode
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
    pinned,
    setPinned,
    activeGroup,
    setActiveGroup,
    customGroups,
    setCustomGroups,
    arrowsMode,
    pinningMode,
    activeMembers,
    onStepPalette,
    onClose,
  } = props

  const [query, setQuery] = useState('')
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [groupPaletteId, setGroupPaletteId] = useState<PaletteId | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  const showActiveGroupControl = pinningMode !== 'pinned'
  const showPinnedRow = pinningMode !== 'active'
  const showPopoverArrows =
    arrowsMode !== 'inline' && activeGroup !== null && activeMembers.length > 0

  /* Compose the visible palette list. Search wins over tag filter; tag
   * filter wins over no filter. Order is preserved from `searchPalettes`
   * so the name-prefix ranking lands on top. */
  const visiblePalettes = useMemo<PaletteId[]>(() => {
    let ids: PaletteId[]
    if (query.trim()) {
      ids = searchPalettes(query)
    } else if (tagFilter) {
      ids = tagToPaletteIds.get(tagFilter) ?? []
    } else {
      ids = searchPalettes('')
    }
    if (activeGroup && pinningMode === 'active') {
      const memberSet = new Set(activeMembers)
      ids = ids.filter(id => memberSet.has(id))
    }
    return ids
  }, [query, tagFilter, activeGroup, pinningMode, activeMembers])

  /* Tags surfaced as chips alongside each row. Restrict to the tags
   * actually present in the filtered set so the rail stays meaningful. */
  const visibleTags = useMemo(() => {
    const set = new Set<string>()
    for (const id of visiblePalettes) {
      for (const t of getPaletteTags(id)) set.add(t)
    }
    return Array.from(set).sort()
  }, [visiblePalettes])

  const togglePinned = useCallback(
    (name: string) => {
      if (pinned.includes(name)) setPinned(pinned.filter(p => p !== name))
      else setPinned([...pinned, name])
    },
    [pinned, setPinned],
  )

  const onCreateGroupFromResults = useCallback(() => {
    const proposed = query.trim() || tagFilter || 'New group'
    const name = window.prompt('Name this custom group', proposed)?.trim()
    if (!name) return
    setCustomGroups({ ...customGroups, [name]: visiblePalettes.slice() })
    setActiveGroup(name)
  }, [query, tagFilter, customGroups, visiblePalettes, setCustomGroups, setActiveGroup])

  const onDeleteCustomGroup = useCallback(
    (name: string) => {
      if (!window.confirm(`Delete custom group "${name}"?`)) return
      const next = { ...customGroups }
      delete next[name]
      setCustomGroups(next)
      if (activeGroup === name) setActiveGroup(null)
      if (pinned.includes(name)) setPinned(pinned.filter(p => p !== name))
    },
    [customGroups, setCustomGroups, activeGroup, setActiveGroup, pinned, setPinned],
  )

  const onAddToCustomGroup = useCallback(
    (groupName: string, paletteId: PaletteId) => {
      const existing = customGroups[groupName] ?? []
      if (existing.includes(paletteId)) {
        const filtered = existing.filter(id => id !== paletteId)
        setCustomGroups({ ...customGroups, [groupName]: filtered })
      } else {
        setCustomGroups({ ...customGroups, [groupName]: [...existing, paletteId] })
      }
    },
    [customGroups, setCustomGroups],
  )

  const onNewGroupForPalette = useCallback(
    (paletteId: PaletteId) => {
      const name = window.prompt('New custom group name')?.trim()
      if (!name) return
      const existing = customGroups[name] ?? []
      setCustomGroups({
        ...customGroups,
        [name]: existing.includes(paletteId) ? existing : [...existing, paletteId],
      })
    },
    [customGroups, setCustomGroups],
  )

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

  const containerClass =
    variant === 'strip'
      ? `ctrl-strip__popover ctrl-strip__popover--${quadrant ?? 'right-down'} palette-picker palette-picker--strip`
      : 'palette-picker palette-picker--button'

  const customGroupNames = Object.keys(customGroups).sort()

  return (
    <div
      className={containerClass}
      style={stripStyle}
      role="dialog"
      aria-label="Palette picker"
      onKeyDown={onKey}
    >
      {/* Search */}
      <div className="palette-picker__search-row">
        <input
          ref={searchRef}
          type="text"
          className="palette-picker__search"
          placeholder={`Search ${Object.keys(palettes).length} palettes by name or tag…`}
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            if (tagFilter) setTagFilter(null)
          }}
          aria-label="Search palettes"
        />
        {showPopoverArrows && (
          <div className="palette-picker__popover-arrows" role="group" aria-label="Cycle group">
            <button
              type="button"
              className="palette-picker__arrow"
              aria-label={`Previous in ${activeGroup}`}
              onClick={() => onStepPalette(-1)}
            >
              ◀
            </button>
            <button
              type="button"
              className="palette-picker__arrow"
              aria-label={`Next in ${activeGroup}`}
              onClick={() => onStepPalette(1)}
            >
              ▶
            </button>
          </div>
        )}
      </div>

      {/* Pinned chip row */}
      {showPinnedRow && pinned.length > 0 && (
        <div className="palette-picker__pinned" role="group" aria-label="Pinned groups">
          {pinned.map(name => {
            const active = tagFilter === name
            const isCustom = !!customGroups[name]
            return (
              <span key={name} className={`palette-picker__chip${active ? ' is-active' : ''}`}>
                <button
                  type="button"
                  className="palette-picker__chip-label"
                  onClick={() => setTagFilter(active ? null : name)}
                  aria-pressed={active}
                >
                  {isCustom ? '★ ' : ''}{name}
                </button>
                <button
                  type="button"
                  className="palette-picker__chip-remove"
                  aria-label={`Unpin ${name}`}
                  onClick={() => togglePinned(name)}
                >
                  ×
                </button>
              </span>
            )
          })}
        </div>
      )}

      {/* Active group selector */}
      {showActiveGroupControl && (
        <div className="palette-picker__active-group">
          <label className="palette-picker__active-label">
            Active group
            <select
              className="palette-picker__active-select"
              value={activeGroup ?? ''}
              onChange={e => setActiveGroup(e.target.value === '' ? null : e.target.value)}
            >
              <option value="">— none —</option>
              {customGroupNames.length > 0 && (
                <optgroup label="Custom groups">
                  {customGroupNames.map(name => (
                    <option key={`cg-${name}`} value={name}>★ {name}</option>
                  ))}
                </optgroup>
              )}
              <optgroup label="Tags">
                {allTags.map(tag => (
                  <option key={`tag-${tag}`} value={tag}>{tag}</option>
                ))}
              </optgroup>
            </select>
          </label>
          {activeGroup && customGroups[activeGroup] && (
            <button
              type="button"
              className="palette-picker__delete-group"
              onClick={() => onDeleteCustomGroup(activeGroup)}
            >
              Delete group
            </button>
          )}
        </div>
      )}

      {/* Tag chip rail (filters; pinnable) */}
      {visibleTags.length > 0 && (
        <div className="palette-picker__tag-rail" role="group" aria-label="Filter by tag">
          {visibleTags.map(tag => {
            const active = tagFilter === tag
            const isPinned = pinned.includes(tag)
            return (
              <span key={tag} className={`palette-picker__chip${active ? ' is-active' : ''}`}>
                <button
                  type="button"
                  className="palette-picker__chip-label"
                  onClick={() => {
                    setTagFilter(active ? null : tag)
                    setQuery('')
                  }}
                  aria-pressed={active}
                >
                  {tag}
                </button>
                <button
                  type="button"
                  className={`palette-picker__chip-pin${isPinned ? ' is-pinned' : ''}`}
                  aria-label={isPinned ? `Unpin ${tag}` : `Pin ${tag}`}
                  onClick={() => togglePinned(tag)}
                >
                  {isPinned ? '★' : '☆'}
                </button>
              </span>
            )
          })}
        </div>
      )}

      {/* List */}
      {visiblePalettes.length === 0 ? (
        <div className="palette-picker__empty">
          <span>No matches</span>
          {(query.trim() || tagFilter) && (
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
            const tags = getPaletteTags(id).slice(0, 4)
            const selected = id === current
            const isGroupOpen = groupPaletteId === id
            return (
              <li key={id} className="palette-picker__row">
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
                  <span className="palette-picker__option-tags" aria-hidden="true">
                    {tags.map(t => (
                      <span key={t} className="palette-picker__option-tag">{t}</span>
                    ))}
                  </span>
                </button>
                <button
                  type="button"
                  className="palette-picker__option-menu"
                  aria-label={`Add ${palette.name} to a custom group`}
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
                    {customGroupNames.length === 0 && (
                      <div className="palette-picker__group-menu-empty">No custom groups yet</div>
                    )}
                    {customGroupNames.map(name => {
                      const inGroup = (customGroups[name] ?? []).includes(id)
                      return (
                        <button
                          key={name}
                          type="button"
                          className={`palette-picker__group-menu-item${inGroup ? ' is-in-group' : ''}`}
                          onClick={() => onAddToCustomGroup(name, id)}
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
              storageKey={PINNING_MODE_KEY}
              label="Grouping"
              current={pinningMode}
              options={[
                { value: 'both', label: 'Pinned + active' },
                { value: 'pinned', label: 'Pinned only' },
                { value: 'active', label: 'Active only' },
              ]}
            />
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
              {(query.trim() || tagFilter) && (
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
