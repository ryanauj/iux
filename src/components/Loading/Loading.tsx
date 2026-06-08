// ABOUTME: Unified loading-state component covering four patterns: CSS spinner, animated shimmer bars, shape-based skeleton placeholders, and an optimistic-UI wrapper that shows just-submitted content with a sync/saved/failed status tag.

import type { ReactNode } from 'react'
import './Loading.css'

// ABOUTME: Selects the loading pattern: 'spinner' shows an animated ring with a label, 'shimmer' draws staggered gradient bars, 'skeleton' renders a named shape preset repeated N times, 'optimistic' wraps children with a sync-status tag.
export type LoadingVariant = 'spinner' | 'shimmer' | 'skeleton' | 'optimistic'

// ABOUTME: Built-in skeleton shapes that variants 'skeleton' draws.
/** Built-in skeleton shapes that variants 'skeleton' draws. */
export type SkeletonShape = 'card' | 'table-row' | 'list-row' | 'avatar-text' | 'paragraph'

// ABOUTME: Configures Loading — the `variant` selects the pattern; `bars`/`shape`/`rows` tune the shimmer and skeleton shapes; `children` and `status` drive the optimistic variant; `label` doubles as the aria-label for all variants.
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

// ABOUTME: Branches on `variant` to render a spinner div, a set of animated shimmer bars, repeated SkeletonShapeNode presets, or an optimistic wrapper around children with a 'syncing / synced / failed' badge.
/**
 * The 'skeleton' variant delegates each row to the internal `SkeletonShapeNode`
 * helper which renders one of five structural presets (card, table-row,
 * list-row, avatar-text, paragraph) as aria-hidden placeholders.
 * The 'optimistic' variant renders its `children` immediately alongside a
 * `role="status"` tag whose text reflects the `status` prop, providing
 * perceived-instant feedback while a network request is in flight.
 */
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

// ABOUTME: Renders one aria-hidden skeleton placeholder in the shape named by `shape`: a card block, a horizontal table row, an avatar+text pair, a full-width list bar, or a three-line paragraph block.
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
