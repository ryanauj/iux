import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './TextInput.css'

export type TextInputVariant = 'bordered' | 'floating' | 'validate' | 'command'

export type ValidationStatus = 'success' | 'warning' | 'danger'

export interface ValidationResult {
  status: ValidationStatus
  message?: string
}

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Functional axis. The same prop, never a forked component. */
  variant?: TextInputVariant
  label?: string
  hint?: string
  /** Inline error message. Forces error styling regardless of validate(). */
  error?: string
  required?: boolean
  /** Live-validate hook called on every change with the next value. */
  validate?: (value: string) => ValidationResult | null
  /** Command-bar ghost-text completion. Tab accepts. */
  suggestion?: string
  /** Fired when the user accepts a suggestion (Tab). */
  onAcceptSuggestion?: (suggestion: string) => void
  /** Static decorative node placed before the input text. */
  leadingIcon?: ReactNode
  /** Static decorative node placed after the input text. */
  trailingIcon?: ReactNode
  /** Standard onChange, kept as `(value, event)` for ergonomics. */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  /** Story-only: lock visual to a pseudo-state without real focus. */
  stateLock?: 'hover' | 'focus' | 'filled'
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    variant = 'bordered',
    label,
    hint,
    error,
    required,
    validate,
    suggestion,
    onAcceptSuggestion,
    leadingIcon,
    trailingIcon,
    onChange,
    onKeyDown,
    stateLock,
    className,
    id,
    value,
    defaultValue,
    placeholder,
    disabled,
    readOnly,
    ...rest
  },
  ref,
) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current!, [])

  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<string>(() =>
    isControlled ? String(value) : defaultValue !== undefined ? String(defaultValue) : '',
  )
  const currentValue = isControlled ? String(value ?? '') : innerValue

  const [validation, setValidation] = useState<ValidationResult | null>(() =>
    validate && currentValue ? validate(currentValue) : null,
  )

  useEffect(() => {
    if (validate) setValidation(validate(currentValue))
  }, [currentValue, validate])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value
      if (!isControlled) setInnerValue(next)
      onChange?.(next, event)
    },
    [isControlled, onChange],
  )

  // Floating-label requires a placeholder so `:placeholder-shown` can drive
  // the "label down" state — we substitute a single space when the caller
  // hasn't supplied one.
  const effectivePlaceholder =
    variant === 'floating'
      ? placeholder ?? ' '
      : placeholder

  const ghostRest =
    variant === 'command' && suggestion && suggestion.startsWith(currentValue)
      ? suggestion.slice(currentValue.length)
      : ''

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      if (variant === 'command' && ghostRest && event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault()
        const accepted = currentValue + ghostRest
        if (!isControlled) setInnerValue(accepted)
        onAcceptSuggestion?.(suggestion!)
        // Move caret to end so subsequent typing appends.
        requestAnimationFrame(() => {
          const el = inputRef.current
          if (el) el.setSelectionRange(accepted.length, accepted.length)
        })
      }
    },
    [variant, ghostRest, currentValue, isControlled, onAcceptSuggestion, suggestion, onKeyDown],
  )

  const status: ValidationStatus | undefined = error
    ? 'danger'
    : validation?.status

  const filled = currentValue.length > 0 || stateLock === 'filled'

  const classes = [
    'iux-text-input',
    `iux-text-input--${variant}`,
    status && `iux-text-input--status-${status}`,
    disabled && 'iux-text-input--disabled',
    readOnly && 'iux-text-input--readonly',
    filled && 'is-filled',
    stateLock === 'focus' && 'is-focus',
    stateLock === 'hover' && 'is-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const describedBy = [
    hint ? `${inputId}-hint` : undefined,
    error ? `${inputId}-error` : undefined,
    validation?.message ? `${inputId}-validation` : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={classes} data-variant={variant} data-status={status ?? 'none'}>
      {label && variant !== 'floating' && (
        <label htmlFor={inputId} className="iux-text-input__label">
          {label}
          {required && <span className="iux-text-input__required" aria-hidden="true"> *</span>}
        </label>
      )}

      <div className="iux-text-input__control">
        {leadingIcon && (
          <span className="iux-text-input__leading" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        {variant === 'command' && ghostRest && (
          <span className="iux-text-input__ghost" aria-hidden="true">
            <span className="iux-text-input__ghost-spacer">{currentValue}</span>
            <span className="iux-text-input__ghost-rest">{ghostRest}</span>
          </span>
        )}

        <input
          ref={inputRef}
          id={inputId}
          className="iux-text-input__input"
          value={isControlled ? currentValue : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          placeholder={effectivePlaceholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={status === 'danger' || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...rest}
        />

        {label && variant === 'floating' && (
          <label htmlFor={inputId} className="iux-text-input__floating-label">
            {label}
            {required && <span className="iux-text-input__required" aria-hidden="true"> *</span>}
          </label>
        )}

        {variant === 'validate' && status && (
          <span
            className="iux-text-input__status-icon"
            aria-hidden="true"
            data-status={status}
          >
            <StatusGlyph status={status} />
          </span>
        )}

        {trailingIcon && (
          <span className="iux-text-input__trailing" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>

      {hint && !error && (
        <span id={`${inputId}-hint`} className="iux-text-input__hint">
          {hint}
        </span>
      )}
      {validation?.message && !error && (
        <span
          id={`${inputId}-validation`}
          className="iux-text-input__validation"
          data-status={validation.status}
        >
          {validation.message}
        </span>
      )}
      {error && (
        <span id={`${inputId}-error`} className="iux-text-input__error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
})

function StatusGlyph({ status }: { status: ValidationStatus }) {
  if (status === 'success') {
    return (
      <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5l3.2 3L13 5" />
      </svg>
    )
  }
  if (status === 'warning') {
    return (
      <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3v6" />
        <circle cx="8" cy="12.25" r="0.5" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  )
}
