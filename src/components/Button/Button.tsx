// ABOUTME: Accessible button element with solid, neumorphic, spring-animation, and AI-shimmer visual variants, each driven by six semantic intent colors.

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import './Button.css'

// ABOUTME: Visual style axis — 'solid' is the standard filled style, 'neumorphic' uses soft-shadow depth, 'spring' adds bounce animation, 'ai' overlays an animated shimmer layer.
export type ButtonVariant = 'solid' | 'neumorphic' | 'spring' | 'ai'
// ABOUTME: Semantic color token that maps to the six contract intent palette entries for the button surface and label.
export type ButtonIntent = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'

// ABOUTME: Props for Button — extends native button attributes with variant, intent, loading spinner, leading icon slot, and a story-only stateLock for pseudo-state previews.
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

// ABOUTME: A forwardRef-wrapped `<button>` that composes variant/intent/loading/stateLock CSS classes, renders an animated shimmer span for the 'ai' variant, swaps the leading icon for a spinner while loading, and disables itself when loading.
/**
 * Applies `iux-button--{variant}` and `iux-button--intent-{intent}` classes
 * along with `iux-button--loading` and `is-{stateLock}` when relevant. The
 * 'ai' variant gets an absolutely-positioned `<span class="iux-button__shimmer">`
 * driven entirely by CSS animation. `loading` sets `aria-busy` and `disabled`
 * simultaneously and replaces the leading icon with a CSS spinner.
 */
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
