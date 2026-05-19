import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'solid' | 'neumorphic' | 'spring' | 'ai'
export type ButtonIntent = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Functional axis. The same prop, never a forked component. */
  variant?: ButtonVariant
  /** Maps to the six contract intents. */
  intent?: ButtonIntent
  /** Replaces the leading slot with a spinner; disables the control. */
  loading?: boolean
  /** Optional icon node rendered before the label. */
  leadingIcon?: ReactNode
  /** Story-only: lock visual to a pseudo-state without real focus/hover. */
  stateLock?: 'hover' | 'active' | 'focus'
  type?: 'button' | 'submit' | 'reset'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    intent = 'primary',
    loading = false,
    leadingIcon,
    stateLock,
    className,
    children,
    disabled,
    type = 'button',
    ...rest
  },
  ref,
) {
  const classes = [
    'iux-button',
    `iux-button--${variant}`,
    `iux-button--intent-${intent}`,
    loading && 'iux-button--loading',
    stateLock && `is-${stateLock}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      data-variant={variant}
      data-intent={intent}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {variant === 'ai' && <span className="iux-button__shimmer" aria-hidden="true" />}
      <span className="iux-button__inner">
        {loading ? (
          <span className="iux-button__spinner" aria-hidden="true" />
        ) : (
          leadingIcon && <span className="iux-button__icon" aria-hidden="true">{leadingIcon}</span>
        )}
        <span className="iux-button__label">{children}</span>
      </span>
    </button>
  )
})
