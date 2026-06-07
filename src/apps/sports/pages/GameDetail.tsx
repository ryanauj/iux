// ABOUTME: Full game detail page showing the scoreboard header, quarter-by-quarter score table, and top-performer stat lines for a single game looked up by id.

import { Table, type TableColumn } from '../../../components/Table/Table'
import { Link } from '../../Link'
import {
  getGameById,
  getTeamById,
  getPlayerById,
} from '../data'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { formatLongDate } from '../format'
import { sportsRoutes } from '../routes'
import { NotFound } from './NotFound'
import type { GamePerformer } from '../types'

interface GameDetailProps {
  id: string
}

// ABOUTME: Renders the full box for a game: a two-sided header with team crests and final scores, a quarter-by-quarter breakdown table (when present), and a sortable top-performers table linking to player detail pages; falls back to NotFound when the id is missing.
/**
 * Looks up the game via `getGameById`, then resolves both teams with
 * `getTeamById`. Renders three sections: a stylised scoreboard header with
 * status badge (Live/Final/Upcoming), an optional quarter-score table, and a
 * top-performers table whose player names link to `PlayerDetail`.
 */
export function GameDetail({ id }: GameDetailProps) {
  const game = getGameById(id)
  if (!game) return <NotFound message={`No game with id "${id}".`} />

  const home = getTeamById(game.homeTeamId)
  const away = getTeamById(game.awayTeamId)
  if (!home || !away) return <NotFound message="Game references a missing team." />

  const performers = game.topPerformers ?? []

  const performerColumns: TableColumn<GamePerformer>[] = [
    {
      key: 'player',
      header: 'Player',
      accessor: row => {
        const player = getPlayerById(row.playerId)
        if (!player) return row.playerId
        const team = getTeamById(player.teamId)
        return (
          <span>
            <Link to={sportsRoutes.playerDetail(player.slug)}>
              {player.firstName} {player.lastName}
            </Link>
            {team && (
              <span style={{ color: 'var(--color-content-secondary)', marginLeft: '0.5rem' }}>
                {team.abbreviation} · {player.position}
              </span>
            )}
          </span>
        )
      },
    },
    { key: 'line', header: 'Line', accessor: row => row.line },
  ]

  const statusBadge =
    game.status === 'live' ? (
      <span className="game-detail__status-badge game-detail__status-badge--live">
        LIVE · Q{game.quarter ?? 1} {game.timeRemaining ?? ''}
      </span>
    ) : game.status === 'final' ? (
      <span className="game-detail__status-badge game-detail__status-badge--final">
        FINAL
      </span>
    ) : (
      <span className="game-detail__status-badge game-detail__status-badge--final">
        UPCOMING
      </span>
    )

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', to: sportsRoutes.home() },
          { label: 'Schedule', to: sportsRoutes.games() },
          { label: `${away.abbreviation} @ ${home.abbreviation}` },
        ]}
      />

      <header className="game-detail__header">
        <div className="game-detail__side">
          <div className="game-detail__crest" style={{ backgroundColor: away.primaryColor }}>
            {away.abbreviation}
          </div>
          <Link to={sportsRoutes.teamDetail(away.slug)} className="game-detail__team">
            {away.city} {away.name}
          </Link>
          {typeof game.awayScore === 'number' && (
            <div className="game-detail__big-score">{game.awayScore}</div>
          )}
        </div>
        <div className="game-detail__middle">
          {statusBadge}
          <span>{formatLongDate(game.date)}</span>
          <span>{home.arena}</span>
        </div>
        <div className="game-detail__side">
          <div className="game-detail__crest" style={{ backgroundColor: home.primaryColor }}>
            {home.abbreviation}
          </div>
          <Link to={sportsRoutes.teamDetail(home.slug)} className="game-detail__team">
            {home.city} {home.name}
          </Link>
          {typeof game.homeScore === 'number' && (
            <div className="game-detail__big-score">{game.homeScore}</div>
          )}
        </div>
      </header>

      {game.quarterScores && (
        <section className="sports-page__section">
          <h2 className="sports-page__section-title">Quarter-by-quarter</h2>
          <div className="game-detail__qbq">
          <table className="iux-table__table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Team</th>
                {game.quarterScores.map((_, i) => (
                  <th key={i} style={{ textAlign: 'right' }}>Q{i + 1}</th>
                ))}
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{away.abbreviation}</td>
                {game.quarterScores.map((q, i) => (
                  <td key={i} style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{q.away}</td>
                ))}
                <td style={{ textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{game.awayScore}</td>
              </tr>
              <tr>
                <td>{home.abbreviation}</td>
                {game.quarterScores.map((q, i) => (
                  <td key={i} style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{q.home}</td>
                ))}
                <td style={{ textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{game.homeScore}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </section>
      )}

      {performers.length > 0 && (
        <section className="sports-page__section">
          <h2 className="sports-page__section-title">Top performers</h2>
          <Table
            variant="static"
            data={performers}
            columns={performerColumns}
            getRowId={p => p.playerId}
          />
        </section>
      )}

      {game.status === 'scheduled' && (
        <div className="sports-page__empty">
          Tip-off scheduled. Box score and stat lines will appear after the game.
        </div>
      )}
    </>
  )
}
