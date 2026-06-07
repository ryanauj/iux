// ABOUTME: Accessible single-value select in four variants: a native <select> element ('native'), a custom keyboard-navigable dropdown ('dropdown'), a type-to-filter combobox ('combobox'), and a debounced async search combobox with optional creatable item ('async').

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { getPortalTarget } from '../../theme/portalTarget'
import './Select.css'

// ABOUTME: The four functional modes: 'native' renders a plain <select>, 'dropdown' renders a button-triggered custom listbox, 'combobox' adds a type-to-filter text input, 'async' debounces input through loadOptions and optionally adds a "+ Create" row.
export type SelectVariant = 'native' | 'dropdown' | 'combobox' | 'async'

// ABOUTME: One selectable option: a string 'value', a display 'label', an optional 'group' for <optgroup>-style headings, a 'disabled' flag, and a 'description' shown as secondary text in dropdown/combobox/async mode.
export interface SelectOption {
  value: string
  label: string
  /** Optional group heading; options in the same group are kept together. */
  group?: string
  disabled?: boolean
  description?: string
}

// ABOUTME: Configures Select: 'variant' is the functional axis; 'options' supplies static choices; 'loadOptions' is the async fetcher (async mode only); 'creatable'/'onCreate' enable the "+ Create" row; 'error'/'hint' show inline validation text; 'stateLock' pins a visual pseudo-state for stories.
export interface SelectProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: SelectVariant
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options?: SelectOption[]
  /** Async-only — debounced server search. */
  loadOptions?: (query: string) => Promise<SelectOption[]>
  /** Debounce window for `loadOptions`. */
  debounceMs?: number
  /** Async-only — allow a "+ Create '...'" tail option. */
  creatable?: boolean
  onCreate?: (label: string) => void
  placeholder?: string
  label?: string
  hint?: string
  /** Inline error message. */
  error?: string
  required?: boolean
  disabled?: boolean
  /** Custom "no results" copy. */
  noOptionsMessage?: string
  /** Custom "loading…" copy for async. */
  loadingMessage?: string
  id?: string
  name?: string
  className?: string
  /** Story-only: lock the visual to a pseudo-state. */
  stateLock?: 'hover' | 'focus' | 'open'
  /** Story-only: pre-fill the combobox query. */
  defaultQuery?: string
}

// ABOUTME: Imperative ref handle exposed via forwardRef: 'focus' moves focus to the trigger element, 'open' opens the listbox, 'close' closes it — useful for programmatic control from parent components.
export interface SelectHandle {
  focus: () => void
  open: () => void
  close: () => void
}

interface GroupedOptions {
  group: string | null
  options: SelectOption[]
}

function groupOptions(options: SelectOption[]): GroupedOptions[] {
  const order: (string | null)[] = []
  const bucket = new Map<string | null, SelectOption[]>()
  for (const opt of options) {
    const key = opt.group ?? null
    if (!bucket.has(key)) {
      order.push(key)
      bucket.set(key, [])
    }
    bucket.get(key)!.push(opt)
  }
  return order.map(group => ({ group, options: bucket.get(group)! }))
}

function findIndexByValue(options: SelectOption[], value: string | undefined): number {
  if (value === undefined) return -1
  return options.findIndex(o => o.value === value)
}

// ABOUTME: Four-variant select component exposing an imperative focus/open/close handle; portals the listbox to the palette root to avoid containing-block issues from ancestor transforms or backdrop-filter, and uses visualViewport for correct above-keyboard positioning on mobile.
/**
 * The listbox is portaled via `getPortalTarget()` so `position: fixed`
 * coordinates are viewport-relative even under ancestor `transform` or
 * `backdrop-filter` (e.g., a DraggableControls panel). The drop direction is
 * chosen by available space (combobox/async always open downward). The async
 * variant debounces `loadOptions` by `debounceMs` milliseconds and can insert
 * a "+ Create '...'" tail row when `creatable` is true.
 */
export const Select = forwardRef<SelectHandle, SelectProps>(function Select(
  {
    variant = 'dropdown',
    value,
    defaultValue,
    onChange,
    options = [],
    loadOptions,
    debounceMs = 200,
    creatable = false,
    onCreate,
    placeholder,
    label,
    hint,
    error,
    required,
    disabled,
    noOptionsMessage = 'No results',
    loadingMessage = 'Loading…',
    id,
    name,
    className,
    stateLock,
    defaultQuery = '',
  },
  ref,
) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const listboxId = `${inputId}-listbox`

  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<string | undefined>(defaultValue)
  const currentValue = isControlled ? value : innerValue

  const [open, setOpen] = useState<boolean>(stateLock === 'open')
  const [query, setQuery] = useState<string>(defaultQuery)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  // Async state.
  const [asyncOptions, setAsyncOptions] = useState<SelectOption[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const controlRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)

  /*
   * Listbox position is computed from the trigger's viewport rect and
   * applied via inline styles. The listbox itself is portaled to the
   * chrome `.palette-root` (via getPortalTarget) so that `position: fixed`
   * is interpreted relative to the viewport — any ancestor with `transform`,
   * `filter`, or `backdrop-filter` (e.g. the DraggableControls panel, which
   * uses backdrop-blur) would otherwise establish a containing block and
   * make fixed coordinates relative to that ancestor instead of the viewport,
   * leaving the menu offset by hundreds of pixels and overlapping the
   * trigger. We portal to the palette root rather than document.body so the
   * menu still inherits the active palette's CSS-var scope — portaling to
   * document.body would render the listbox with `var(--color-surface-overlay)`
   * and friends resolving to their bare fallbacks (transparent / unset), so
   * the menu would look unstyled and the content behind would bleed through.
   * The portal also dodges any `overflow: hidden | auto | scroll` clip in
   * the ancestor chain. Recomputed on scroll / resize / orientation /
   * visualViewport change while open.
   */
  const [menuPos, setMenuPos] = useState<CSSProperties | null>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      const t = triggerRef.current
      if (t && typeof (t as HTMLElement).focus === 'function') (t as HTMLElement).focus()
    },
    open: () => setOpen(true),
    close: () => setOpen(false),
  }))

  // The list of options the listbox should display.
  const filteredOptions = useMemo<SelectOption[]>(() => {
    if (variant === 'async') return asyncOptions
    if (variant === 'combobox') {
      const q = query.trim().toLowerCase()
      if (!q) return options
      return options.filter(o => o.label.toLowerCase().includes(q))
    }
    return options
  }, [variant, options, query, asyncOptions])

  const grouped = useMemo<GroupedOptions[]>(() => groupOptions(filteredOptions), [filteredOptions])

  // Selected label for the trigger display.
  const selectedOption = useMemo<SelectOption | undefined>(() => {
    if (currentValue === undefined) return undefined
    return options.find(o => o.value === currentValue)
      ?? asyncOptions.find(o => o.value === currentValue)
  }, [options, asyncOptions, currentValue])

  const displayLabel = selectedOption?.label ?? ''

  // Async debounced search.
  useEffect(() => {
    if (variant !== 'async' || !loadOptions || !open) return
    let cancelled = false
    setIsLoading(true)
    const handle = window.setTimeout(async () => {
      try {
        const result = await loadOptions(query)
        if (!cancelled) {
          setAsyncOptions(result)
          setIsLoading(false)
        }
      } catch {
        if (!cancelled) {
          setAsyncOptions([])
          setIsLoading(false)
        }
      }
    }, debounceMs)
    return () => {
      cancelled = true
      window.clearTimeout(handle)
    }
  }, [variant, loadOptions, query, open, debounceMs])

  // Reset active index when the visible list changes.
  useEffect(() => {
    if (!open) return
    if (filteredOptions.length === 0) {
      setActiveIndex(-1)
      return
    }
    setActiveIndex(prev => {
      if (prev >= 0 && prev < filteredOptions.length) return prev
      const fromValue = findIndexByValue(filteredOptions, currentValue)
      return fromValue >= 0 ? fromValue : 0
    })
  }, [open, filteredOptions, currentValue])

  // Click-outside closes the menu (and the locked-open story stays open).
  // The listbox is portaled to document.body, so it lives outside rootRef;
  // include listboxRef in the contains check so clicks on the listbox
  // (e.g. on its scrollbar or padding) don't fall through as "outside".
  useEffect(() => {
    if (!open || stateLock === 'open') return
    function handle(e: MouseEvent) {
      const target = e.target as Node
      const root = rootRef.current
      const list = listboxRef.current
      if (root && root.contains(target)) return
      if (list && list.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open, stateLock])

  /*
   * Compute the listbox's fixed-position coordinates from the control's
   * viewport rect. Picks drop direction based on which side has more
   * room, and caps max-height to the available space so long lists stay
   * scrollable within the viewport rather than running off-screen.
   *
   * Uses `visualViewport` (when available) for the available-space math so
   * the on-screen keyboard on mobile is treated as missing screen — without
   * this, `window.innerHeight` reports the full layout viewport even when
   * the keyboard is up, and the listbox opens into space that's actually
   * covered by the keyboard (or, with a typeable trigger, overlaps the
   * input itself once iOS scrolls the focused input above the keyboard).
   *
   * Combobox/async always open DOWN: the trigger IS the active search input
   * and the user is typing into it, so flipping the listbox above the trigger
   * — which would cover the input the user is looking at — is never the right
   * call. The listbox's internal `overflow-y: auto` handles cramped cases.
   */
  const computeMenuPos = useCallback(() => {
    const control = controlRef.current
    if (!control) return
    const rect = control.getBoundingClientRect()
    const gap = 4
    const margin = 8

    const vv = typeof window !== 'undefined' ? window.visualViewport : null
    const viewTop = vv ? vv.offsetTop : 0
    const viewBottom = vv ? vv.offsetTop + vv.height : window.innerHeight

    const spaceBelow = viewBottom - rect.bottom - margin
    const spaceAbove = rect.top - viewTop - margin

    const isTypeable = variant === 'combobox' || variant === 'async'
    // Typeable variants never flip up — the listbox would cover the search
    // input the user is actively typing into.
    const preferDown = isTypeable
      ? true
      : spaceBelow >= 200 || spaceBelow >= spaceAbove

    // Clamp to the actually-available space so the listbox stays inside the
    // visible viewport (above any soft keyboard). The 120px floor keeps the
    // listbox usable when space is tight — its inner scroll handles overflow.
    const available = preferDown ? spaceBelow : spaceAbove
    const maxHeight = Math.max(120, Math.min(available, 400))

    setMenuPos(
      preferDown
        ? {
            position: 'fixed',
            left: rect.left,
            top: rect.bottom + gap,
            width: rect.width,
            maxHeight,
          }
        : {
            position: 'fixed',
            left: rect.left,
            bottom: window.innerHeight - rect.top + gap,
            width: rect.width,
            maxHeight,
          },
    )
  }, [variant])

  const menuVisible = open || stateLock === 'open'

  useLayoutEffect(() => {
    if (!menuVisible) {
      setMenuPos(null)
      return
    }
    computeMenuPos()
  }, [menuVisible, computeMenuPos])

  // Recompute when the filtered list changes (combobox/async): the listbox
  // height shrinks/grows, and if iOS is in the middle of scrolling the
  // focused input above the keyboard, the rect may not have settled yet.
  useLayoutEffect(() => {
    if (!menuVisible) return
    computeMenuPos()
  }, [menuVisible, filteredOptions, computeMenuPos])

  useEffect(() => {
    if (!menuVisible) return
    const onChange = () => computeMenuPos()
    window.addEventListener('resize', onChange)
    window.addEventListener('orientationchange', onChange)
    window.addEventListener('scroll', onChange, true)
    const vv = window.visualViewport
    if (vv) {
      vv.addEventListener('resize', onChange)
      vv.addEventListener('scroll', onChange)
    }
    return () => {
      window.removeEventListener('resize', onChange)
      window.removeEventListener('orientationchange', onChange)
      window.removeEventListener('scroll', onChange, true)
      if (vv) {
        vv.removeEventListener('resize', onChange)
        vv.removeEventListener('scroll', onChange)
      }
    }
  }, [menuVisible, computeMenuPos])

  const commitValue = useCallback(
    (next: string) => {
      if (!isControlled) setInnerValue(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  const closeAndReturnFocus = useCallback(() => {
    if (stateLock === 'open') return
    setOpen(false)
    requestAnimationFrame(() => {
      const t = triggerRef.current
      if (t && typeof (t as HTMLElement).focus === 'function') (t as HTMLElement).focus()
    })
  }, [stateLock])

  const handleSelectOption = useCallback(
    (opt: SelectOption) => {
      if (opt.disabled) return
      commitValue(opt.value)
      // For combobox/async, sync the displayed query so the chosen label persists.
      if (variant === 'combobox' || variant === 'async') {
        setQuery(opt.label)
      }
      closeAndReturnFocus()
    },
    [commitValue, variant, closeAndReturnFocus],
  )

  const handleCreate = useCallback(
    (rawLabel: string) => {
      const trimmed = rawLabel.trim()
      if (!trimmed) return
      onCreate?.(trimmed)
      const synthetic: SelectOption = { value: trimmed, label: trimmed }
      if (variant === 'async') setAsyncOptions(prev => [synthetic, ...prev])
      commitValue(synthetic.value)
      setQuery(synthetic.label)
      closeAndReturnFocus()
    },
    [variant, onCreate, commitValue, closeAndReturnFocus],
  )

  const showCreateRow =
    variant === 'async' &&
    creatable &&
    query.trim().length > 0 &&
    !filteredOptions.some(o => o.label.toLowerCase() === query.trim().toLowerCase())

  const totalRows = filteredOptions.length + (showCreateRow ? 1 : 0)
  const createRowIndex = showCreateRow ? filteredOptions.length : -1

  const moveActive = useCallback(
    (delta: number) => {
      setActiveIndex(prev => {
        if (totalRows === 0) return -1
        const start = prev < 0 ? (delta > 0 ? -1 : 0) : prev
        let next = start + delta
        if (next < 0) next = totalRows - 1
        if (next >= totalRows) next = 0
        // Skip disabled options.
        const tries = totalRows
        for (let i = 0; i < tries; i++) {
          const opt = filteredOptions[next]
          if (next === createRowIndex) return next
          if (opt && !opt.disabled) return next
          next = (next + (delta > 0 ? 1 : -1) + totalRows) % totalRows
        }
        return -1
      })
    },
    [filteredOptions, totalRows, createRowIndex],
  )

  const handleTriggerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (disabled) return
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          if (!open) setOpen(true)
          else moveActive(1)
          break
        case 'ArrowUp':
          event.preventDefault()
          if (!open) setOpen(true)
          else moveActive(-1)
          break
        case 'Home':
          if (open) {
            event.preventDefault()
            setActiveIndex(0)
          }
          break
        case 'End':
          if (open) {
            event.preventDefault()
            setActiveIndex(totalRows - 1)
          }
          break
        case 'Enter':
          if (open) {
            event.preventDefault()
            if (activeIndex === createRowIndex && createRowIndex >= 0) {
              handleCreate(query)
            } else if (activeIndex >= 0 && filteredOptions[activeIndex]) {
              handleSelectOption(filteredOptions[activeIndex])
            }
          } else {
            event.preventDefault()
            setOpen(true)
          }
          break
        case ' ':
          // Space opens dropdown; in combobox/async it's a regular character.
          if (variant === 'dropdown' && !open) {
            event.preventDefault()
            setOpen(true)
          }
          break
        case 'Escape':
          if (open) {
            event.preventDefault()
            closeAndReturnFocus()
          }
          break
        case 'Tab':
          if (open) setOpen(false)
          break
      }
    },
    [disabled, open, moveActive, totalRows, activeIndex, createRowIndex, filteredOptions, handleCreate, handleSelectOption, query, variant, closeAndReturnFocus],
  )

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
      if (!open) setOpen(true)
      // For combobox, clearing the input also clears the current value.
      if (event.target.value === '' && currentValue !== undefined) {
        commitValue('')
      }
    },
    [open, currentValue, commitValue],
  )

  const handleInputFocus = useCallback(() => {
    setOpen(true)
  }, [])

  // Trigger ref wiring so the imperative handle can focus whichever element
  // currently drives the variant.
  const handleTriggerRef = (node: HTMLInputElement | HTMLButtonElement | null) => {
    triggerRef.current = node
  }

  // Visual state.
  const status: 'danger' | undefined = error ? 'danger' : undefined

  const classes = [
    'iux-select',
    `iux-select--${variant}`,
    status && `iux-select--status-${status}`,
    disabled && 'iux-select--disabled',
    open && 'is-open',
    stateLock === 'focus' && 'is-focus',
    stateLock === 'hover' && 'is-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const describedBy = [
    hint ? `${inputId}-hint` : undefined,
    error ? `${inputId}-error` : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div ref={rootRef} className={classes} data-variant={variant} data-status={status ?? 'none'}>
      {label && (
        <label htmlFor={inputId} className="iux-select__label">
          {label}
          {required && <span className="iux-select__required" aria-hidden="true"> *</span>}
        </label>
      )}

      {variant === 'native' ? (
        <NativeSelect
          inputId={inputId}
          name={name}
          value={currentValue}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          required={required}
          ariaDescribedBy={describedBy}
          status={status}
          onChange={commitValue}
        />
      ) : (
        <div ref={controlRef} className="iux-select__control">
          {variant === 'dropdown' ? (
            <button
              ref={handleTriggerRef}
              id={inputId}
              type="button"
              className="iux-select__trigger"
              disabled={disabled}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-required={required || undefined}
              aria-invalid={status === 'danger' || undefined}
              aria-describedby={describedBy}
              aria-activedescendant={open && activeIndex >= 0 ? `${inputId}-opt-${activeIndex}` : undefined}
              onClick={() => !disabled && setOpen(o => !o)}
              onKeyDown={handleTriggerKeyDown}
            >
              <span className="iux-select__value" data-empty={displayLabel ? undefined : 'true'}>
                {displayLabel || placeholder || ' '}
              </span>
              <Caret />
            </button>
          ) : (
            <input
              ref={handleTriggerRef}
              id={inputId}
              type="text"
              role="combobox"
              className="iux-select__trigger iux-select__input"
              disabled={disabled}
              required={required}
              placeholder={placeholder}
              value={query || (open ? '' : displayLabel)}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-invalid={status === 'danger' || undefined}
              aria-describedby={describedBy}
              aria-activedescendant={open && activeIndex >= 0 ? `${inputId}-opt-${activeIndex}` : undefined}
              onChange={handleQueryChange}
              onFocus={handleInputFocus}
              onKeyDown={handleTriggerKeyDown}
              autoComplete="off"
            />
          )}

          {(open || stateLock === 'open') && typeof document !== 'undefined' && createPortal(
            <ul
              ref={listboxRef}
              id={listboxId}
              className="iux-select__listbox"
              role="listbox"
              aria-label={label}
              tabIndex={-1}
              style={menuPos ?? undefined}
            >
              {variant === 'async' && isLoading && (
                <li className="iux-select__status" role="status" aria-live="polite">
                  {loadingMessage}
                </li>
              )}

              {!isLoading && filteredOptions.length === 0 && !showCreateRow && (
                <li className="iux-select__status">{noOptionsMessage}</li>
              )}

              {grouped.map(g => (
                <GroupRender
                  key={g.group ?? '__ungrouped'}
                  group={g}
                  inputId={inputId}
                  activeIndex={activeIndex}
                  selectedValue={currentValue}
                  onSelect={handleSelectOption}
                  onHover={setActiveIndex}
                  filteredOptions={filteredOptions}
                />
              ))}

              {showCreateRow && (
                <li
                  id={`${inputId}-opt-${createRowIndex}`}
                  className={[
                    'iux-select__option',
                    'iux-select__option--create',
                    activeIndex === createRowIndex && 'is-active',
                  ].filter(Boolean).join(' ')}
                  role="option"
                  aria-selected={false}
                  onMouseDown={e => { e.preventDefault(); handleCreate(query) }}
                  onMouseEnter={() => setActiveIndex(createRowIndex)}
                >
                  <span className="iux-select__option-label">+ Create "{query.trim()}"</span>
                </li>
              )}
            </ul>,
            getPortalTarget(),
          )}
        </div>
      )}

      {hint && !error && (
        <span id={`${inputId}-hint`} className="iux-select__hint">{hint}</span>
      )}
      {error && (
        <span id={`${inputId}-error`} className="iux-select__error" role="alert">{error}</span>
      )}
    </div>
  )
})

interface NativeSelectProps {
  inputId: string
  name?: string
  value?: string
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  required?: boolean
  ariaDescribedBy?: string
  status?: 'danger'
  onChange: (value: string) => void
}

function NativeSelect({
  inputId, name, value, placeholder, options, disabled, required, ariaDescribedBy, status, onChange,
}: NativeSelectProps) {
  const grouped = useMemo(() => groupOptions(options), [options])
  return (
    <div className="iux-select__control">
      <select
        id={inputId}
        name={name}
        className="iux-select__trigger iux-select__native"
        disabled={disabled}
        required={required}
        value={value ?? ''}
        aria-invalid={status === 'danger' || undefined}
        aria-describedby={ariaDescribedBy}
        onChange={e => onChange(e.target.value)}
      >
        {placeholder !== undefined && (
          <option value="" disabled={required}>{placeholder}</option>
        )}
        {grouped.map(g =>
          g.group ? (
            <optgroup key={g.group} label={g.group}>
              {g.options.map(o => (
                <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
              ))}
            </optgroup>
          ) : (
            g.options.map(o => (
              <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
            ))
          ),
        )}
      </select>
      <Caret />
    </div>
  )
}

interface GroupRenderProps {
  group: GroupedOptions
  inputId: string
  activeIndex: number
  selectedValue?: string
  onSelect: (opt: SelectOption) => void
  onHover: (index: number) => void
  filteredOptions: SelectOption[]
}

function GroupRender({
  group, inputId, activeIndex, selectedValue, onSelect, onHover, filteredOptions,
}: GroupRenderProps) {
  return (
    <>
      {group.group && (
        <li className="iux-select__group-heading" role="presentation">{group.group}</li>
      )}
      {group.options.map(opt => {
        const absoluteIndex = filteredOptions.indexOf(opt)
        const optId = `${inputId}-opt-${absoluteIndex}`
        const selected = opt.value === selectedValue
        const active = absoluteIndex === activeIndex
        return (
          <li
            key={opt.value}
            id={optId}
            className={[
              'iux-select__option',
              opt.disabled && 'is-disabled',
              selected && 'is-selected',
              active && 'is-active',
            ].filter(Boolean).join(' ')}
            role="option"
            aria-selected={selected}
            aria-disabled={opt.disabled || undefined}
            onMouseDown={e => { e.preventDefault(); onSelect(opt) }}
            onMouseEnter={() => onHover(absoluteIndex)}
          >
            <span className="iux-select__option-label">{opt.label}</span>
            {opt.description && (
              <span className="iux-select__option-description">{opt.description}</span>
            )}
            {selected && <Check />}
          </li>
        )
      })}
    </>
  )
}

function Caret() {
  return (
    <svg className="iux-select__caret" viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true">
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Check() {
  return (
    <svg className="iux-select__check" viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true">
      <path d="M3 8.5l3.2 3L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
