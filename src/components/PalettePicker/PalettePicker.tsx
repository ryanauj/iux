// ABOUTME: Palette and custom-pattern selector used in the DraggableControls strip and button tile; renders prev/next cycle arrows and a popover panel with search, group management, custom pattern CRUD, and favorite toggling — backed by `paletteTags` and `customPatterns` hooks.

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
import {
  cycleInGroup,
  isDefaultGroup,
  resolveGroupMembers,
  searchPalettes,
  useActiveGroup,
  useGroups,
  type GroupsApi,
} from '../../lib/paletteTags'
import { usePersistedPref } from '../../lib/usePersistedPref'
import {
  isCustomPatternId,
  useCustomPatterns,
  type CustomPatternMap,
  type StyleId,
} from '../../lib/customPatterns'
import { navigate } from '../../apps/router'
import './PalettePicker.css'

// ABOUTME: Full list of built-in palette ids derived from the palettes registry at module load; used as the fallback cycle list when no active group narrows the arrow-key selection.
const ALL_PALETTE_IDS = Object.keys(palettes) as PaletteId[]

// ABOUTME: Returns the human-readable display name for a style id: looks up custom pattern names first, then falls back to the built-in palette registry, then returns the raw id.
/** Display name for either a built-in palette or a custom pattern id. */
function styleName(id: string, customs: CustomPatternMap): string {
  if (isCustomPatternId(id)) return customs[id]?.name ?? id
  return palettes[id as PaletteId]?.name ?? id
}

// ABOUTME: localStorage key used by usePersistedPref to remember whether the Browse palette list section is expanded across sessions.
const LIST_OPEN_KEY = 'palette-picker:list-open'
// ABOUTME: localStorage key used by usePersistedPref to remember whether the Custom patterns section is expanded across sessions.
const CUSTOM_OPEN_KEY = 'palette-picker:custom-open'
// ABOUTME: Type guard for the '0'/'1' string preference values stored by usePersistedPref; rejects any other string so the hook falls back to the default.
const isBoolPref = (raw: string): raw is '0' | '1' => raw === '0' || raw === '1'

// ABOUTME: Determines the layout context: 'button' manages its own open state and renders inside the button tile, 'strip' delegates open/close to the parent DraggableControls strip so only one slot popover is shown at a time.
export type PalettePickerVariant = 'button' | 'strip'

// ABOUTME: Quadrant of the viewport where the DraggableControls strip slot sits; used by the strip variant to position the popover so it opens toward available screen space rather than off-edge.
/**
 * Quadrant identifier from DraggableControls — re-declared locally to
 * keep PalettePicker independent of DraggableControls's internal types
 * (only the strip variant uses it, and only for positioning).
 */
type StripQuadrant = 'right-down' | 'right-up' | 'left-down' | 'left-up'

// ABOUTME: Minimal field descriptor passed into PalettePicker: the current style id as 'value', the setter as 'onChange', an optional human label, and a short abbreviation for the strip icon slot.
interface FieldShape {
  value: string
  onChange: (next: string) => void
  label?: string
  short?: string
}

// ABOUTME: Internal props for PalettePicker: wraps the FieldShape plus variant-specific controlled-open, slot-click, and close callbacks for the strip variant, and popover positioning data forwarded from DraggableControls.
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

// ABOUTME: Renders prev/next arrow buttons that cycle through the active group (or the full catalog when no group is active) and a trigger button that opens the `PalettePickerPanel` popover; the 'strip' variant proxies open state and click events to the parent, while 'button' manages its own `internalOpen`.
/**
 * Uses `useActiveGroup` and `useGroups` from `paletteTags` to determine which
 * palette ids the arrows should cycle through. The `cycleInGroup` helper
 * wraps the cycle so the current palette always advances to the next member
 * without leaving the group. The popover panel is only mounted when `open`
 * is true; the 'strip' variant positions it via `slotRect` and `popoverQuadrant`
 * forwarded from DraggableControls.
 */
export function PalettePicker(props: PalettePickerProps) {
  const { field, variant } = props
  const current = field.value as StyleId

  const [activeGroup, setActiveGroup] = useActiveGroup()
  const [groups, groupsApi] = useGroups()

  const activeMembers = useMemo(
    () => resolveGroupMembers(activeGroup, groups),
    [activeGroup, groups],
  )

  /* When no group is active, the arrows step through the whole catalog so
   * the row is always usable — picking a group just narrows the cycle. */
  const cycleMembers = activeMembers.length > 0 ? activeMembers : ALL_PALETTE_IDS

  const stepPalette = useCallback(
    (dir: -1 | 1) => {
      const next = cycleInGroup(dir, cycleMembers, current)
      if (next !== current) field.onChange(next)
    },
    [cycleMembers, current, field],
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

  const [customPatterns] = useCustomPatterns()
  const inlineLabel = styleName(current, customPatterns)
  const cycleScope = activeGroup ?? 'catalog'

  if (variant === 'strip') {
    return (
      <div className="ctrl-strip__palette-slot">
        <div className="ctrl-strip__palette-row">
          <button
            type="button"
            className="ctrl-strip__palette-arrow"
            aria-label={`Previous palette in ${cycleScope}`}
            onClick={() => stepPalette(-1)}
          >
            ◀&#xFE0E;
          </button>
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
          <button
            type="button"
            className="ctrl-strip__palette-arrow"
            aria-label={`Next palette in ${cycleScope}`}
            onClick={() => stepPalette(1)}
          >
            ▶&#xFE0E;
          </button>
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
            activeMembers={activeMembers}
            onClose={closePanel}
          />
        )}
      </div>
    )
  }

  return (
    <div className={`ctrl-button__tile ctrl-button__tile--palette${open ? ' is-open' : ''}`}>
      <div className="palette-picker__inline-row">
        <button
          type="button"
          className="palette-picker__arrow"
          aria-label={`Previous palette in ${cycleScope}`}
          onClick={() => stepPalette(-1)}
        >
          ◀&#xFE0E;
        </button>
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
        <button
          type="button"
          className="palette-picker__arrow"
          aria-label={`Next palette in ${cycleScope}`}
          onClick={() => stepPalette(1)}
        >
          ▶&#xFE0E;
        </button>
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
          activeMembers={activeMembers}
          onClose={closePanel}
        />
      )}
    </div>
  )
}

/* ────────────────────────── Panel ────────────────────────── */

// ABOUTME: Props forwarded from PalettePicker to PalettePickerPanel: the full group/API state, the current StyleId, popover-positioning geometry, and the onClose callback.
interface PanelProps {
  field: FieldShape
  current: StyleId
  variant: PalettePickerVariant
  quadrant?: StripQuadrant
  slotRect?: DOMRect | null
  activeGroup: string | null
  setActiveGroup: (next: string | null) => void
  groups: Record<string, StyleId[]>
  groupsApi: GroupsApi
  activeMembers: StyleId[]
  onClose: () => void
}

// ABOUTME: The popover dialog body rendered when the picker is open: contains a current-style quick-action row (favorite, add-to-list, edit for custom), the active-group selector, the collapsible custom-patterns list, and the collapsible search + full-catalog browse list; positions itself via CSS custom property for the strip variant.
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
    activeMembers,
    onClose,
  } = props

  const [customPatterns, setCustomPatterns] = useCustomPatterns()
  const currentIsCustom = isCustomPatternId(current)
  const currentName = styleName(current, customPatterns)

  const [query, setQuery] = useState('')
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
  const [customOpenRaw, setCustomOpenRaw] = usePersistedPref<'0' | '1'>(
    CUSTOM_OPEN_KEY,
    '1',
    isBoolPref,
  )
  const customOpen = customOpenRaw === '1'
  const setCustomOpen = useCallback(
    (next: boolean) => setCustomOpenRaw(next ? '1' : '0'),
    [setCustomOpenRaw],
  )
  const [groupPaletteId, setGroupPaletteId] = useState<PaletteId | null>(null)
  /* Add-to-list menu for a custom pattern row (separate from the built-in
   * browse list's `groupPaletteId` so opening one closes the other). */
  const [groupCustomId, setGroupCustomId] = useState<StyleId | null>(null)
  /* Add-to-list menu for the current palette's quick-action row (distinct
   * from the per-row menus inside the lists below). */
  const [currentMenuOpen, setCurrentMenuOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /* Auto-focus the search input only when the list is actually visible —
   * otherwise focusing a hidden field is a no-op that silently swallows
   * the keyboard intent. */
  useEffect(() => {
    if (listOpen) searchRef.current?.focus()
  }, [listOpen])

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
    (styleId: StyleId) => {
      const name = window.prompt('New group name')?.trim()
      if (!name) return
      groupsApi.createGroup(name, [styleId])
    },
    [groupsApi],
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

  /* Strip popover positioning matches the existing StripPopover.
   * Cap max-height at the actual available space — never floor it to a
   * minimum that exceeds what's there, or the popover anchors past the
   * opposite viewport edge (e.g. landscape phone with a slot near the
   * bottom: a 220px floor on ~200px of space pushes the top off-screen). */
  const stripStyle = useMemo<CSSProperties>(() => {
    if (variant !== 'strip' || !slotRect) return {}
    const margin = 16
    const available = quadrant && quadrant.endsWith('down')
      ? window.innerHeight - slotRect.top - margin
      : slotRect.bottom - margin
    return { '--popover-max-height': `${Math.max(0, Math.round(available))}px` } as CSSProperties
  }, [variant, slotRect, quadrant])

  const isUp = variant === 'strip' && (quadrant ?? 'right-down').endsWith('-up')
  const containerClass =
    variant === 'strip'
      ? `ctrl-strip__popover ctrl-strip__popover--${quadrant ?? 'right-down'} palette-picker palette-picker--strip${isUp ? ' palette-picker--up' : ''}`
      : 'palette-picker palette-picker--button'

  /* When the popover opens upward, the section stack is reversed via
   * `palette-picker--up` so the active-group control sits nearest the
   * trigger (= bottom of the popover). The browser's default scrollTop=0
   * would show the far edge (the browse list) instead. Scroll to the bottom
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
      {/* Current-style quick actions — favorite + add-to-list for the style
       * shown in the trigger (built-in palette or custom pattern), so it can
       * be saved without opening a list and scrolling to find its row.
       * Custom patterns also get an Edit shortcut into the style editor. */}
      <div className="palette-picker__current">
        <button
          type="button"
          className={`palette-picker__star${groupsApi.isFavorite(current) ? ' is-favorited' : ''}`}
          aria-label={
            groupsApi.isFavorite(current)
              ? `Unfavorite ${currentName}`
              : `Favorite ${currentName}`
          }
          aria-pressed={groupsApi.isFavorite(current)}
          onClick={() => groupsApi.toggleFavorite(current)}
        >
          {groupsApi.isFavorite(current) ? '★' : '☆'}
        </button>
        <span className="palette-picker__current-name" title={currentName}>
          {currentName}
        </span>
        <button
          type="button"
          className="palette-picker__current-add"
          aria-label={`Add ${currentName} to a list`}
          aria-expanded={currentMenuOpen}
          onClick={() => setCurrentMenuOpen(o => !o)}
        >
          + Add to list
        </button>
        {currentIsCustom && (
          <button
            type="button"
            className="palette-picker__current-add"
            aria-label={`Edit ${currentName}`}
            onClick={() => navigate('/editor', { edit: current })}
          >
            ✎ Edit
          </button>
        )}
        {currentMenuOpen && (
          <div className="palette-picker__group-menu" role="menu">
            {groupNames.map(name => {
              const inGroup = (groups[name] ?? []).includes(current)
              return (
                <button
                  key={name}
                  type="button"
                  className={`palette-picker__group-menu-item${inGroup ? ' is-in-group' : ''}`}
                  onClick={() => groupsApi.toggleMembership(name, current)}
                >
                  {inGroup ? '✓' : '+'} {name}
                </button>
              )
            })}
            <button
              type="button"
              className="palette-picker__group-menu-item palette-picker__group-menu-item--new"
              onClick={() => {
                onNewGroupForPalette(current)
                setCurrentMenuOpen(false)
              }}
            >
              + New group…
            </button>
          </div>
        )}
      </div>

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

      {/* Custom patterns — user-saved clones. Collapsible like Browse so the
       * popover stays compact, and each row can be favorited or added to a
       * list the same way built-in palettes can, alongside select/edit/delete. */}
      <div className="palette-picker__custom">
        <div className="palette-picker__custom-head">
          <button
            type="button"
            className="palette-picker__browse-toggle"
            aria-expanded={customOpen}
            onClick={() => setCustomOpen(!customOpen)}
          >
            {customOpen ? '▾' : '▸'} Custom patterns ({Object.values(customPatterns).length})
          </button>
          <button
            type="button"
            className="palette-picker__inline-action"
            onClick={() => navigate('/editor')}
          >
            + New
          </button>
        </div>
        {customOpen &&
          (Object.values(customPatterns).length === 0 ? (
            <p className="palette-picker__custom-empty">
              Clone a palette in the style editor to save your own.
            </p>
          ) : (
            <ul className="palette-picker__list" role="menu">
              {Object.values(customPatterns).map(rec => {
                const selected = rec.id === (current as string)
                const favorited = groupsApi.isFavorite(rec.id)
                const isGroupOpen = groupCustomId === rec.id
                return (
                  <li key={rec.id} className="palette-picker__row">
                    <button
                      type="button"
                      className={`palette-picker__star${favorited ? ' is-favorited' : ''}`}
                      aria-label={favorited ? `Unfavorite ${rec.name}` : `Favorite ${rec.name}`}
                      aria-pressed={favorited}
                      onClick={(e: ReactMouseEvent) => {
                        e.stopPropagation()
                        groupsApi.toggleFavorite(rec.id)
                      }}
                    >
                      {favorited ? '★' : '☆'}
                    </button>
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={selected}
                      className={`palette-picker__option${selected ? ' is-selected' : ''}`}
                      onClick={() => field.onChange(rec.id)}
                    >
                      <span className="palette-picker__option-name">{rec.name}</span>
                      <span className="palette-picker__option-engine">
                        {palettes[rec.base]?.engine ?? rec.base}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="palette-picker__option-menu"
                      aria-label={`Add ${rec.name} to a list`}
                      aria-expanded={isGroupOpen}
                      onClick={(e: ReactMouseEvent) => {
                        e.stopPropagation()
                        setGroupCustomId(isGroupOpen ? null : rec.id)
                      }}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="palette-picker__option-menu"
                      aria-label={`Edit ${rec.name}`}
                      onClick={() => navigate('/editor', { edit: rec.id })}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className="palette-picker__option-menu"
                      aria-label={`Delete ${rec.name}`}
                      onClick={() => {
                        if (!window.confirm(`Delete "${rec.name}"?`)) return
                        const next = { ...customPatterns }
                        delete next[rec.id]
                        setCustomPatterns(next)
                        /* Drop the deleted pattern from every list so no
                         * favorite or group keeps a dangling reference. */
                        groupsApi.removeFromAllGroups(rec.id)
                        if (rec.id === (current as string)) field.onChange(rec.base)
                      }}
                    >
                      ✕
                    </button>
                    {isGroupOpen && (
                      <div className="palette-picker__group-menu" role="menu">
                        {groupNames.map(name => {
                          const inGroup = (groups[name] ?? []).includes(rec.id)
                          return (
                            <button
                              key={name}
                              type="button"
                              className={`palette-picker__group-menu-item${inGroup ? ' is-in-group' : ''}`}
                              onClick={() => groupsApi.toggleMembership(name, rec.id)}
                            >
                              {inGroup ? '✓' : '+'} {name}
                            </button>
                          )
                        })}
                        <button
                          type="button"
                          className="palette-picker__group-menu-item palette-picker__group-menu-item--new"
                          onClick={() => {
                            onNewGroupForPalette(rec.id)
                            setGroupCustomId(null)
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
          ))}
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
            {query.trim() && visiblePalettes.length > 0 && (
              <button
                type="button"
                className="palette-picker__inline-action"
                onClick={onCreateGroupFromResults}
              >
                Create group from results
              </button>
            )}
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
              /* FUTURE: virtualize when the catalog grows past a few hundred.
               * Today (59 palettes, ~30 per group) the list renders all rows
               * and a CSS cap on `.palette-picker__list` keeps the viewport
               * footprint reasonable — see PalettePicker.css. If row count
               * climbs (or per-row swatch previews land), swap the `<ul>`
               * body for a virtualizer (e.g. `@tanstack/react-virtual`) and
               * keep the existing scroll container as the scroll element.
               * Watch out for: the per-row group menu's absolute positioning
               * against its row, focus-into-view for any keyboard cycling,
               * and the `palette-picker--up` scroll-to-bottom effect. */
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
                    /* Keep the panel open after a pick so several palettes can
                     * be previewed in a row — mirrors the prev/next arrows,
                     * which already switch without closing. Escape or a click
                     * outside still dismisses. */
                    field.onChange(id)
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

    </div>
  )
}
