// ABOUTME: Loading — a React component (components).

import type { ReactNode } from 'react'
import './Loading.css'

// ABOUTME: LoadingVariant — a type alias.
export type LoadingVariant = 'spinner' | 'shimmer' | 'skeleton' | 'optimistic'

// ABOUTME: Built-in skeleton shapes that variants 'skeleton' draws.
/** Built-in skeleton shapes that variants 'skeleton' draws. */
export type SkeletonShape = 'card' | 'table-row' | 'list-row' | 'avatar-text' | 'paragraph'

// ABOUTME: Props for Loading.
export interface LoadingProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: LoadingVariant
  /** spinner / shimmer: text label, also used as aria-label. */
  label?: string
  /** shimmer: number of bars to draw. */
  bars?: number
  /** skeleton: shape preset. */
  shape?: SkeletonShape
  /** skeleton: how many rows to repeat. */
  rows?: number
  /** optimistic: render the placeholder content (the just-submitted record). */
  children?: ReactNode
  /** optimistic: 'syncing' | 'synced' | 'failed'. */
  status?: 'syncing' | 'synced' | 'failed'
  className?: string
}

// ABOUTME: Loading — a React component.
export function Loading({
  variant = 'spinner',
  label = 'Loading',
  bars = 3,
  shape = 'paragraph',
  rows = 3,
  children,
  status = 'syncing',
  className,
}: LoadingProps) {
  const classes = ['iux-loading', `iux-loading--${variant}`, className].filter(Boolean).join(' ')

  if (variant === 'spinner') {
    return (
      <div className={classes} role="status" aria-label={label}>
        <span className="iux-loading__spinner" aria-hidden="true" />
        <span className="iux-loading__label">{label}</span>
      </div>
    )
  }

  if (variant === 'shimmer') {
    return (
      <div className={classes} role="status" aria-label={label}>
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className="iux-loading__bar"
            aria-hidden="true"
            style={{ width: `${100 - i * 12}%` }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className={classes} role="status" aria-label={label}>
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonShapeNode key={i} shape={shape} />
        ))}
      </div>
    )
  }

  // optimistic
  return (
    <div className={`${classes} iux-loading--status-${status}`} role="status" aria-live="polite" aria-label={`${label}: ${status}`}>
      <div className="iux-loading__optimistic-body">{children}</div>
      <span className="iux-loading__optimistic-tag">
        {status === 'syncing' && <><span className="iux-loading__dot" aria-hidden="true" /> Syncing…</>}
        {status === 'synced' && <>✓ Saved</>}
        {status === 'failed' && <>⚠ Failed</>}
      </span>
    </div>
  )
}

function SkeletonShapeNode({ shape }: { shape: SkeletonShape }) {
  if (shape === 'card') {
    return (
      <div className="iux-loading__skel-card" aria-hidden="true">
        <span className="iux-loading__bar" style={{ width: '60%', height: 'var(--space-4)' }} />
        <span className="iux-loading__bar" style={{ width: '90%' }} />
        <span className="iux-loading__bar" style={{ width: '85%' }} />
        <span className="iux-loading__bar" style={{ width: '40%' }} />
      </div>
    )
  }
  if (shape === 'table-row') {
    return (
      <div className="iux-loading__skel-row" aria-hidden="true">
        <span className="iux-loading__bar" style={{ width: '15%' }} />
        <span className="iux-loading__bar" style={{ width: '25%' }} />
        <span className="iux-loading__bar" style={{ width: '30%' }} />
        <span className="iux-loading__bar" style={{ width: '20%' }} />
      </div>
    )
  }
  if (shape === 'avatar-text') {
    return (
      <div className="iux-loading__skel-avatar-text" aria-hidden="true">
        <span className="iux-loading__bar iux-loading__bar--circle" />
        <div className="iux-loading__skel-stack">
          <span className="iux-loading__bar" style={{ width: '40%' }} />
          <span className="iux-loading__bar" style={{ width: '70%' }} />
        </div>
      </div>
    )
  }
  if (shape === 'list-row') {
    return <span className="iux-loading__bar" style={{ width: '100%' }} aria-hidden="true" />
  }
  // paragraph
  return (
    <div className="iux-loading__skel-paragraph" aria-hidden="true">
      <span className="iux-loading__bar" style={{ width: '95%' }} />
      <span className="iux-loading__bar" style={{ width: '88%' }} />
      <span className="iux-loading__bar" style={{ width: '72%' }} />
    </div>
  )
}
