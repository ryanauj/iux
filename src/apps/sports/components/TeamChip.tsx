import { Link } from '../../Link'
import { sportsRoutes } from '../routes'
import type { Team } from '../types'

interface TeamChipProps {
  team: Team
  size?: 'sm' | 'lg'
  /** Render as a span instead of a link. Use when the chip already lives inside another anchor. */
  linked?: boolean
}

/**
 * Linkable team identifier with a color dot. Used in tables, score cards,
 * roster lists, and anywhere a team needs to be referenced inline.
 */
export function TeamChip({ team, size = 'sm', linked = true }: TeamChipProps) {
  const className = `team-chip ${size === 'lg' ? 'team-chip--lg' : ''}`
  const content = (
    <>
      <span
        className="team-chip__mark"
        style={{ backgroundColor: team.primaryColor }}
        aria-hidden="true"
      >
        {team.abbreviation}
      </span>
      <span>{team.name}</span>
    </>
  )
  if (!linked) return <span className={className}>{content}</span>
  return (
    <Link to={sportsRoutes.teamDetail(team.slug)} className={className}>
      {content}
    </Link>
  )
}
