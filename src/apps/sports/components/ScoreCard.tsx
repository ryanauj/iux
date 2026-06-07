// ABOUTME: Compact game card used across the Home dashboard, Games schedule, and PlayerDetail recent-games grid; renders three layouts (scheduled/live/final) with winner highlighting and links to GameDetail.

import { Card } from '../../../components/Card/Card'
import { Link } from '../../Link'
import { sportsRoutes } from '../routes'
import { getTeamById } from '../data'
import { formatDate } from '../format'
import type { Game } from '../types'
import { TeamChip } from './TeamChip'

interface ScoreCardProps {
  game: Game
  highlightStatus?: boolean
}

// ABOUTME: Resolves both teams via `getTeamById`, then renders a Card with date/status meta and one of three score layouts: an "at" matchup chip pair for scheduled games, or mirrored team-score rows (winner highlighted) for live and final games.
/**
 * Wraps everything in a `Link` to `sportsRoutes.gameDetail(game.id)`.
 * The status badge shows "Final", a live quarter/time string, or "Upcoming".
 * Winner bolding is applied only when `game.status === 'final'` and both scores are present.
 */
export function ScoreCard({ game }: ScoreCardProps) {
  const home = getTeamById(game.homeTeamId)
  const away = getTeamById(game.awayTeamId)
  if (!home || !away) return null

  const statusLabel =
    game.status === 'final' ? 'Final' :
    game.status === 'live' ? `Live · Q${game.quarter ?? 1} ${game.timeRemaining ?? ''}` :
    'Upcoming'

  const homeIsWinner =
    game.status === 'final' &&
    typeof game.homeScore === 'number' &&
    typeof game.awayScore === 'number' &&
    game.homeScore > game.awayScore
  const awayIsWinner =
    game.status === 'final' &&
    typeof game.homeScore === 'number' &&
    typeof game.awayScore === 'number' &&
    game.awayScore > game.homeScore

  return (
    <Card variant="static">
      <Link
        to={sportsRoutes.gameDetail(game.id)}
        className="score-card"
        aria-label={`${away.city} ${away.name} at ${home.city} ${home.name}`}
      >
        <div className="score-card__meta">
          <span>{formatDate(game.date)}</span>
          <span className={`score-card__status score-card__status--${game.status}`}>
            {statusLabel}
          </span>
        </div>

        {game.status === 'scheduled' ? (
          <div className="score-card__upcoming">
            <TeamChip team={away} linked={false} />
            <span className="score-card__vs">at</span>
            <TeamChip team={home} linked={false} />
          </div>
        ) : (
          <>
            <div
              className={`score-card__row ${
                awayIsWinner ? 'score-card__row--winner' :
                homeIsWinner ? 'score-card__row--loser' : ''
              }`}
            >
              <div className="score-card__team"><TeamChip team={away} linked={false} /></div>
              <span className="score-card__score">{game.awayScore}</span>
            </div>
            <div
              className={`score-card__row ${
                homeIsWinner ? 'score-card__row--winner' :
                awayIsWinner ? 'score-card__row--loser' : ''
              }`}
            >
              <div className="score-card__team"><TeamChip team={home} linked={false} /></div>
              <span className="score-card__score">{game.homeScore}</span>
            </div>
          </>
        )}
      </Link>
    </Card>
  )
}
