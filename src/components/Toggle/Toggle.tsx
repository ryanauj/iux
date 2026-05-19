import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './Toggle.css'

export type ToggleVariant = 'switch' | 'saving' | 'segmented' | 'tristate'

export interface ToggleOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface ToggleProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: ToggleVariant

  /** Binary: switch / saving. */
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void

  /** Multi-value: segmented / tristate. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Segmented options; tristate defaults to on/off/inherit. */
  options?: ToggleOption[]

  /** Saving variant: shows the savings microstate while truthy. */
  saving?: boolean
  /** Override the binary on / off track labels. */
  onLabel?: string
  offLabel?: string

  label?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
  /** Story-only: lock visual to a pseudo-state. */
  stateLock?: 'hover' | 'focus'
}

const TRISTATE_OPTIONS: ToggleOption[] = [
  { value: 'off', label: 'Off' },
  { value: 'inherit', label: 'Inherit' },
  { value: 'on', label: 'On' },
]

export const Toggle = forwardRef<HTMLElement, ToggleProps>(function Toggle(
  {
    variant = 'switch',
    checked,
    defaultChecked,
    onCheckedChange,
    value,
    defaultValue,
    onValueChange,
    options,
    saving,
    onLabel = 'On',
    offLabel = 'Off',
    label,
    disabled,
    id,
    name,
    className,
    stateLock,
  },
  ref,
) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const isBinary = variant === 'switch' || variant === 'saving'

  // Binary state.
  const isCheckedControlled = checked !== undefined
  const [innerChecked, setInnerChecked] = useState<boolean>(defaultChecked ?? false)
  const currentChecked = isCheckedControlled ? checked! : innerChecked

  // Multi-value state.
  const resolvedOptions = variant === 'tristate' ? (options ?? TRISTATE_OPTIONS) : (options ?? [])
  const isValueControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<string>(() =>
    defaultValue ?? resolvedOptions[0]?.value ?? '',
  )
  const currentValue = isValueControlled ? value! : innerValue

  // Sync the inner value when the resolved options shift (segmented setup).
  useEffect(() => {
    if (isValueControlled) return
    if (resolvedOptions.length === 0) return
    if (!resolvedOptions.some(o => o.value === innerValue)) {
      setInnerValue(resolvedOptions[0].value)
    }
  }, [resolvedOptions, isValueControlled, innerValue])

  const innerRef = useRef<HTMLElement | null>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLElement)

  const commitChecked = useCallback(
    (next: boolean) => {
      if (!isCheckedControlled) setInnerChecked(next)
      onCheckedChange?.(next)
    },
    [isCheckedControlled, onCheckedChange],
  )

  const commitValue = useCallback(
    (next: string) => {
      if (!isValueControlled) setInnerValue(next)
      onValueChange?.(next)
    },
    [isValueControlled, onValueChange],
  )

  const handleBinaryClick = useCallback(() => {
    if (disabled || saving) return
    commitChecked(!currentChecked)
  }, [disabled, saving, commitChecked, currentChecked])

  const handleBinaryKey = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || saving) return
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        commitChecked(!currentChecked)
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault()
        commitChecked(true)
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault()
        commitChecked(false)
      }
    },
    [disabled, saving, commitChecked, currentChecked],
  )

  const handleMultiKey = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (disabled || resolvedOptions.length === 0) return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home' && event.key !== 'End') return
      event.preventDefault()
      const idx = Math.max(0, resolvedOptions.findIndex(o => o.value === currentValue))
      let nextIdx = idx
      if (event.key === 'ArrowLeft') nextIdx = (idx - 1 + resolvedOptions.length) % resolvedOptions.length
      else if (event.key === 'ArrowRight') nextIdx = (idx + 1) % resolvedOptions.length
      else if (event.key === 'Home') nextIdx = 0
      else if (event.key === 'End') nextIdx = resolvedOptions.length - 1
      // Skip disabled.
      let attempts = resolvedOptions.length
      while (attempts-- > 0 && resolvedOptions[nextIdx]?.disabled) {
        nextIdx = (nextIdx + (event.key === 'ArrowLeft' || event.key === 'End' ? -1 : 1) + resolvedOptions.length) % resolvedOptions.length
      }
      const next = resolvedOptions[nextIdx]
      if (next && !next.disabled) commitValue(next.value)
    },
    [disabled, resolvedOptions, currentValue, commitValue],
  )

  const classes = [
    'iux-toggle',
    `iux-toggle--${variant}`,
    isBinary && currentChecked && 'is-on',
    isBinary && !currentChecked && 'is-off',
    saving && 'is-saving',
    disabled && 'is-disabled',
    stateLock && `is-${stateLock}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (isBinary) {
    return (
      <div className={classes} data-variant={variant} data-checked={currentChecked ? 'true' : 'false'}>
        {label && (
          <label htmlFor={inputId} className="iux-toggle__label">{label}</label>
        )}
        <button
          ref={el => { innerRef.current = el }}
          id={inputId}
          type="button"
          role="switch"
          aria-checked={currentChecked}
          aria-busy={saving || undefined}
          aria-disabled={disabled || saving || undefined}
          disabled={disabled}
          name={name}
          className="iux-toggle__track"
          onClick={handleBinaryClick}
          onKeyDown={handleBinaryKey}
        >
          <span className="iux-toggle__rail" aria-hidden="true">
            <span className="iux-toggle__rail-label iux-toggle__rail-label--on">{onLabel}</span>
            <span className="iux-toggle__rail-label iux-toggle__rail-label--off">{offLabel}</span>
          </span>
          <span className="iux-toggle__thumb" aria-hidden="true">
            {saving && <span className="iux-toggle__spinner" aria-hidden="true" />}
          </span>
        </button>
        {variant === 'saving' && saving && (
          <span className="iux-toggle__saving" role="status" aria-live="polite">Saving…</span>
        )}
      </div>
    )
  }

  // Multi-value (segmented / tristate).
  return (
    <div className={classes} data-variant={variant}>
      {label && (
        <span id={`${inputId}-label`} className="iux-toggle__label">{label}</span>
      )}
      <div
        ref={el => { innerRef.current = el }}
        role="radiogroup"
        aria-labelledby={label ? `${inputId}-label` : undefined}
        className="iux-toggle__segments"
        onKeyDown={handleMultiKey}
      >
        {resolvedOptions.map(opt => {
          const selected = opt.value === currentValue
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-disabled={opt.disabled || disabled || undefined}
              disabled={opt.disabled || disabled}
              tabIndex={selected ? 0 : -1}
              className={[
                'iux-toggle__segment',
                selected && 'is-selected',
              ].filter(Boolean).join(' ')}
              onClick={() => !opt.disabled && !disabled && commitValue(opt.value)}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
})
