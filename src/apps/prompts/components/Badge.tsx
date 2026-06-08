// ABOUTME: A small inline pill, toned via the contract intents.

import type { ReactNode } from 'react'

// ABOUTME: The set of semantic tones a Badge can render (maps to contract intent colours).
export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

// ABOUTME: Props for Badge: the pill content, optional semantic tone (defaults to 'neutral'), an outline/filled variant flag, and an extra className.
interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  /** Render as a hollow outline rather than a filled chip. */
  outline?: boolean
  className?: string
}

// ABOUTME: A small inline pill, toned via the contract intents.
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
