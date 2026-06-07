// ABOUTME: FavoriteButton — a React component (apps).

interface FavoriteButtonProps {
  active: boolean
  onToggle: () => void
  /** Name of the prompt, for an accessible label. */
  label: string
  className?: string
}

// ABOUTME: FavoriteButton — a React component.
/** A star toggle that marks a prompt as a favorite. */
export function FavoriteButton({ active, onToggle, label, className }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className={['pb-fav', active && 'pb-fav--on', className].filter(Boolean).join(' ')}
      aria-pressed={active}
      aria-label={active ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
      onClick={onToggle}
    >
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
        <path
          d="M10 1.8l2.36 4.78 5.28.77-3.82 3.72.9 5.26L10 13.94l-4.72 2.48.9-5.26L2.36 7.35l5.28-.77z"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
