// ABOUTME: Badge — a React component (apps).

import type { ReactNode } from 'react'

// ABOUTME: BadgeTone — a type alias.
export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  /** Render as a hollow outline rather than a filled chip. */
  outline?: boolean
  className?: string
}

// ABOUTME: Badge — a React component.
/** A small inline pill, toned via the contract intents. */
export function Badge({ children, tone = 'neutral', outline = false, className }: BadgeProps) {
  const classes = [
    'pb-badge',
    `pb-badge--${tone}`,
    outline && 'pb-badge--outline',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return <span className={classes}>{children}</span>
}
