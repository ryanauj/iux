// ABOUTME: PlayerDetail — a React component (apps).

import { Tabs } from '../../../components/Tabs/Tabs'
import { Link } from '../../Link'
import {
  getPlayerBySlug,
  getTeamById,
  getGamesForTeam,
} from '../data'
import { sportsRoutes } from '../routes'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ScoreCard } from '../components/ScoreCard'
import { formatHeight, formatStat, formatPct } from '../format'
import { NotFound } from './NotFound'

interface PlayerDetailProps {
  slug: string
}

// ABOUTME: PlayerDetail — a React component.
export function PlayerDetail({ slug }: PlayerDetailProps) {
  const player = getPlayerBySlug(slug)
  if (!player) return <NotFound message={`No player with slug "${slug}".`} />

  const team = getTeamById(player.teamId)
  const recentGames = team
    ? getGamesForTeam(team.id).filter(g => g.status === 'final').slice(-3).reverse()
    : []

  const initials = `${player.firstName[0] ?? ''}${player.lastName[0] ?? ''}`
  const bgColor = team?.primaryColor ?? 'rgb(102, 102, 102)'

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', to: sportsRoutes.home() },
          { label: 'Players', to: sportsRoutes.players() },
          { label: `${player.firstName} ${player.lastName}` },
        ]}
      />

      <header className="player-detail__header">
        <div className="player-detail__avatar" style={{ backgroundColor: bgColor }}>
          {initials}
        </div>
        <div className="player-detail__name">
          <h1 className="player-detail__title">
            {player.firstName} {player.lastName}
          </h1>
          <div className="player-detail__subline">
            <span>#{player.jersey} · {player.position}</span>
            {team && (
              <>
                <span>·</span>
                <Link to={sportsRoutes.teamDetail(team.slug)}>
                  {team.city} {team.name}
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="team-detail__meta">
          <div className="team-detail__meta-item">
            <span className="team-detail__meta-label">Height</span>
            <span className="team-detail__meta-value">{formatHeight(player.heightInches)}</span>
          </div>
          <div className="team-detail__meta-item">
            <span className="team-detail__meta-label">Weight</span>
            <span className="team-detail__meta-value">{player.weightLbs} lb</span>
          </div>
          <div className="team-detail__meta-item">
            <span className="team-detail__meta-label">Age</span>
            <span className="team-detail__meta-value">{player.age}</span>
          </div>
          <div className="team-detail__meta-item">
            <span className="team-detail__meta-label">Experience</span>
            <span className="team-detail__meta-value">
              {player.experience} {player.experience === 1 ? 'year' : 'years'}
            </span>
          </div>
        </div>
      </header>

      <Tabs
        variant="basic"
        ariaLabel="Player sections"
        tabs={[
          { id: 'stats', label: 'Season stats' },
          { id: 'shooting', label: 'Shooting' },
          { id: 'recent', label: `Recent games (${recentGames.length})` },
        ]}
        renderPanel={id => {
          if (id === 'stats') {
            return (
              <div className="player-detail__stat-grid">
                <Stat label="GP" value={String(player.stats.gamesPlayed)} />
                <Stat label="MPG" value={formatStat(player.stats.minutesPerGame)} />
                <Stat label="PPG" value={formatStat(player.stats.ppg)} />
                <Stat label="RPG" value={formatStat(player.stats.rpg)} />
                <Stat label="APG" value={formatStat(player.stats.apg)} />
                <Stat label="SPG" value={formatStat(player.stats.spg)} />
                <Stat label="BPG" value={formatStat(player.stats.bpg)} />
              </div>
            )
          }
          if (id === 'shooting') {
            return (
              <div className="player-detail__stat-grid">
                <Stat label="FG%" value={formatPct(player.stats.fgPct)} />
                <Stat label="3P%" value={formatPct(player.stats.fg3Pct)} />
                <Stat label="FT%" value={formatPct(player.stats.ftPct)} />
              </div>
            )
          }
          if (recentGames.length === 0) {
            return <div className="sports-page__empty">No recent games on file.</div>
          }
          return (
            <div className="sports-home__grid">
              {recentGames.map(g => <ScoreCard key={g.id} game={g} />)}
            </div>
          )
        }}
      />
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="player-stat">
      <span className="player-stat__label">{label}</span>
      <span className="player-stat__value">{value}</span>
    </div>
  )
}
