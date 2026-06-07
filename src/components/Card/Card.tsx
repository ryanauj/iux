// ABOUTME: Card — an exported value (components).

import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import './Card.css'

// ABOUTME: CardVariant — a type alias.
export type CardVariant = 'static' | 'expandable' | 'bento' | 'spatial'
// ABOUTME: CardAccent — a type alias.
export type CardAccent = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'

// ABOUTME: Props for Card.
export interface CardProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: CardVariant
  title?: ReactNode
  subtitle?: ReactNode
  footer?: ReactNode
  /** Bento accent stripe color, chosen from the six contract intents. */
  accent?: CardAccent
  /** Expandable: initial expanded state for uncontrolled use. */
  defaultExpanded?: boolean
  /** Expandable: controlled expanded state. */
  expanded?: boolean
  onExpandedChange?: (next: boolean) => void
  /** Hidden content revealed when expanded. */
  expandedContent?: ReactNode
  /** Make the card itself a focusable click target. */
  onClick?: () => void
  /** Aria label for an interactive card. */
  ariaLabel?: string
  children?: ReactNode
  className?: string
  /** Story-only: lock visual to a pseudo-state. */
  stateLock?: 'hover' | 'active' | 'focus'
}

// ABOUTME: Card — an exported value.
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = 'static',
    title,
    subtitle,
    footer,
    accent,
    defaultExpanded = false,
    expanded,
    onExpandedChange,
    expandedContent,
    onClick,
    ariaLabel,
    children,
    className,
    stateLock,
  },
  ref,
) {
  const headingId = useId()
  const bodyId = useId()
  const isControlledExpanded = expanded !== undefined
  const [innerExpanded, setInnerExpanded] = useState(defaultExpanded)
  const isExpanded = isControlledExpanded ? expanded : innerExpanded

  const toggleExpanded = useCallback(() => {
    const next = !isExpanded
    if (!isControlledExpanded) setInnerExpanded(next)
    onExpandedChange?.(next)
  }, [isControlledExpanded, isExpanded, onExpandedChange])

  const interactive = Boolean(onClick)

  const handleCardKey = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!interactive) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onClick?.()
      }
    },
    [interactive, onClick],
  )

  // Spatial / parallax — set CSS custom properties for tilt magnitudes. CSS
  // owns the actual transform so the reduced-motion override can wipe it.
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const spatialRef = useRef<HTMLDivElement | null>(null)

  const handleSpatialMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (variant !== 'spatial') return
      const el = spatialRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width
      const ny = (event.clientY - rect.top) / rect.height
      const maxDeg = 6
      setTilt({
        x: (0.5 - ny) * maxDeg * 2,
        y: (nx - 0.5) * maxDeg * 2,
      })
    },
    [variant],
  )

  const handleSpatialLeave = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  const classes = [
    'iux-card',
    `iux-card--${variant}`,
    accent && `iux-card--accent-${accent}`,
    interactive && 'iux-card--interactive',
    isExpanded && 'is-expanded',
    stateLock && `is-${stateLock}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inlineStyle: CSSProperties =
    variant === 'spatial'
      ? ({
          ['--iux-card-tilt-x' as string]: `${tilt.x}deg`,
          ['--iux-card-tilt-y' as string]: `${tilt.y}deg`,
        } as CSSProperties)
      : {}

  const setRefs = (node: HTMLDivElement | null) => {
    spatialRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
  }

  return (
    <div
      ref={setRefs}
      className={classes}
      data-variant={variant}
      data-accent={accent ?? 'none'}
      style={inlineStyle}
      onMouseMove={variant === 'spatial' ? handleSpatialMove : undefined}
      onMouseLeave={variant === 'spatial' ? handleSpatialLeave : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={handleCardKey}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? ariaLabel : undefined}
      aria-labelledby={!interactive && title ? headingId : undefined}
    >
      {/*
       * Character-border corners (Terminal-TUI engine). Always rendered;
       * `display: none` by default. The `@container palette style(--border-style:
       * character)` block in Card.css flips them to `display: block` and hides
       * the standard CSS border so the four corner glyphs + the four CSS edge
       * lines compose into a complete box-drawing outline. Aria-hidden because
       * the glyphs are decorative chrome — the card's accessible name comes
       * from its `title` / `ariaLabel`.
       */}
      <span className="iux-card__corner iux-card__corner--tl" aria-hidden="true">┌</span>
      <span className="iux-card__corner iux-card__corner--tr" aria-hidden="true">┐</span>
      <span className="iux-card__corner iux-card__corner--bl" aria-hidden="true">└</span>
      <span className="iux-card__corner iux-card__corner--br" aria-hidden="true">┘</span>

      {accent && variant === 'bento' && (
        <span className="iux-card__accent-stripe" aria-hidden="true" />
      )}

      {(title || subtitle) && (
        <header className="iux-card__header">
          {title && (
            <h3 id={headingId} className="iux-card__title">
              {title}
            </h3>
          )}
          {subtitle && <p className="iux-card__subtitle">{subtitle}</p>}
        </header>
      )}

      <div className="iux-card__body" id={bodyId}>
        {children}
      </div>

      {variant === 'expandable' && expandedContent !== undefined && (
        <>
          <button
            type="button"
            className="iux-card__expander"
            aria-expanded={isExpanded}
            aria-controls={`${bodyId}-extra`}
            onClick={(e) => {
              e.stopPropagation()
              toggleExpanded()
            }}
          >
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
            <Chevron expanded={isExpanded} />
          </button>
          <div
            id={`${bodyId}-extra`}
            className="iux-card__expanded-wrap"
            data-expanded={isExpanded ? 'true' : 'false'}
            aria-hidden={!isExpanded}
          >
            <div className="iux-card__expanded-inner">{expandedContent}</div>
          </div>
        </>
      )}

      {footer && <footer className="iux-card__footer">{footer}</footer>}
    </div>
  )
})

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="iux-card__chevron"
      data-expanded={expanded ? 'true' : 'false'}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}
