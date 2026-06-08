// ABOUTME: Inline team identifier showing the team abbreviation in a colored badge and the team name, used in tables (Players, TeamDetail roster/schedule), score cards, and standings; renders as a Link to TeamDetail unless `linked={false}`.

import { Link } from '../../Link'
import { sportsRoutes } from '../routes'
import type { Team } from '../types'

// ABOUTME: Props for TeamChip — the team to display, an optional size modifier, and whether to render as a navigable link or a plain span.
interface TeamChipProps {
  team: Team
  size?: 'sm' | 'lg'
  /** Render as a span instead of a link. Use when the chip already lives inside another anchor. */
  linked?: boolean
}

// ABOUTME: Renders a `team-chip` span/link: a colored-background abbreviation badge (using `team.primaryColor`) followed by `team.name`; `size="lg"` adds the `--lg` modifier; `linked={false}` renders as a plain span (used when already inside an anchor, e.g. ScoreCard).
/**
 * When `linked` is true (the default), wraps the badge in a `Link` pointing to
 * `sportsRoutes.teamDetail(team.slug)`. When false, renders an inert `<span>`
 * so the chip can sit safely inside another anchor without nesting violations.
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
