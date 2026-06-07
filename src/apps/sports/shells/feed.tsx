// ABOUTME: FeedShell — a React component (apps).

import { useMemo, useState } from 'react'
import { Link } from '../../Link'
import {
  GAMES,
  TEAMS,
  TODAY,
  getPlayerById,
  getStatLeaders,
  getTeamById,
} from '../data'
import { formatDate, formatStat } from '../format'
import { sportsRoutes } from '../routes'
import type { Game, Player, Team } from '../types'
import type { ShellProps, NavItem } from '../layouts'

type EntryKind = 'live' | 'final' | 'upcoming' | 'leader'
type StatusFilter = 'all' | 'live' | 'final' | 'upcoming'
type ConferenceFilter = 'all' | 'East' | 'West'

interface GameEntry {
  key: string
  kind: 'live' | 'final' | 'upcoming'
  sortTs: number
  game: Game
  home: Team
  away: Team
}

interface LeaderEntry {
  key: string
  kind: 'leader'
  sortTs: number
  player: Player
  team: Team | undefined
  statLabel: string
  statValue: string
}

type FeedEntry = GameEntry | LeaderEntry

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'final', label: 'Finals' },
  { id: 'upcoming', label: 'Upcoming' },
]

const CONFERENCE_FILTERS: { id: ConferenceFilter; label: string }[] = [
  { id: 'all', label: 'Both confs' },
  { id: 'East', label: 'East' },
  { id: 'West', label: 'West' },
]

function dateOrdinal(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).getTime()
}

function buildEntries(): FeedEntry[] {
  const out: FeedEntry[] = []
  const todayTs = dateOrdinal(TODAY)

  for (const g of GAMES) {
    const home = getTeamById(g.homeTeamId)
    const away = getTeamById(g.awayTeamId)
    if (!home || !away) continue
    const gts = dateOrdinal(g.date)
    let kind: GameEntry['kind']
    let priority: number
    if (g.status === 'live') {
      kind = 'live'
      priority = 4 // pin live to the top
    } else if (g.status === 'final' && gts >= todayTs) {
      kind = 'final'
      priority = 3
    } else if (g.status === 'scheduled' && gts === todayTs) {
      kind = 'upcoming'
      priority = 2
    } else if (g.status === 'scheduled' && gts > todayTs) {
      kind = 'upcoming'
      priority = 1
    } else {
      kind = 'final' // historical final
      priority = 0
    }
    out.push({
      key: `g-${g.id}`,
      kind,
      sortTs: priority * 1e12 + gts,
      game: g,
      home,
      away,
    })
  }

  // Notable performances: the top scorer, top rebounder, top assister
  // each become a leader card threaded into the feed between same-day
  // game clusters.
  const leaders: { stat: keyof Player['stats']; label: string }[] = [
    { stat: 'ppg', label: 'PPG leader' },
    { stat: 'rpg', label: 'RPG leader' },
    { stat: 'apg', label: 'APG leader' },
  ]
  for (const { stat, label } of leaders) {
    const [top] = getStatLeaders(stat as 'ppg' | 'rpg' | 'apg', 1)
    if (!top) continue
    const team = getTeamById(top.teamId)
    out.push({
      key: `l-${stat}-${top.id}`,
      kind: 'leader',
      // Slot leader cards just below today's live games but above
      // future scheduled ones.
      sortTs: 3.5e12 + (stat === 'ppg' ? 3 : stat === 'rpg' ? 2 : 1),
      player: top,
      team,
      statLabel: label,
      statValue: formatStat(top.stats[stat]),
    })
  }

  return out.sort((a, b) => b.sortTs - a.sortTs)
}

interface FilterState {
  status: StatusFilter
  conference: ConferenceFilter
  teamId: string | 'all'
}

function applyFilters(entries: FeedEntry[], f: FilterState): FeedEntry[] {
  return entries.filter(e => {
    if (e.kind === 'leader') {
      // Leader cards only show when no narrowing filter is active —
      // they're a "browse the league" affordance, not a per-team feed.
      if (f.status !== 'all') return false
      if (f.conference !== 'all') {
        if (!e.team || e.team.conference !== f.conference) return false
      }
      if (f.teamId !== 'all') return e.team?.id === f.teamId
      return true
    }
    if (f.status !== 'all' && e.kind !== f.status) return false
    if (f.conference !== 'all') {
      if (e.home.conference !== f.conference && e.away.conference !== f.conference) {
        return false
      }
    }
    if (f.teamId !== 'all') {
      if (e.home.id !== f.teamId && e.away.id !== f.teamId) return false
    }
    return true
  })
}

function statusBadgeLabel(kind: EntryKind, game?: Game): string {
  if (kind === 'live') {
    const q = game?.quarter ? `Q${game.quarter}` : 'Live'
    const t = game?.timeRemaining ? ` ${game.timeRemaining}` : ''
    return `Live · ${q}${t}`
  }
  if (kind === 'final') return 'Final'
  if (kind === 'upcoming') return 'Upcoming'
  return 'Notable'
}

function GameRow({ entry }: { entry: GameEntry }) {
  const { game, home, away, kind } = entry
  const isFinal = kind === 'final'
  const homeWon = isFinal && (game.homeScore ?? 0) > (game.awayScore ?? 0)
  const awayWon = isFinal && (game.awayScore ?? 0) > (game.homeScore ?? 0)
  return (
    <Link
      to={sportsRoutes.gameDetail(game.id)}
      className={`sports-feed__entry sports-feed__entry--${kind}`}
    >
      <div className="sports-feed__entry-meta">
        <span className={`sports-feed__badge sports-feed__badge--${kind}`}>
          {statusBadgeLabel(kind, game)}
        </span>
        <span className="sports-feed__date">{formatDate(game.date)}</span>
      </div>
      <div className="sports-feed__matchup">
        <div className={`sports-feed__team${awayWon ? ' is-winner' : homeWon ? ' is-loser' : ''}`}>
          <span
            className="sports-feed__team-mark"
            style={{ backgroundColor: away.primaryColor }}
            aria-hidden="true"
          >
            {away.abbreviation}
          </span>
          <span className="sports-feed__team-name">{away.name}</span>
          {kind !== 'upcoming' && (
            <span className="sports-feed__score">{game.awayScore}</span>
          )}
        </div>
        <div className={`sports-feed__team${homeWon ? ' is-winner' : awayWon ? ' is-loser' : ''}`}>
          <span
            className="sports-feed__team-mark"
            style={{ backgroundColor: home.primaryColor }}
            aria-hidden="true"
          >
            {home.abbreviation}
          </span>
          <span className="sports-feed__team-name">{home.name}</span>
          {kind !== 'upcoming' && (
            <span className="sports-feed__score">{game.homeScore}</span>
          )}
        </div>
      </div>
      {kind === 'final' && game.topPerformers && game.topPerformers.length > 0 && (
        <p className="sports-feed__footnote">
          Top: {game.topPerformers
            .slice(0, 2)
            .map(tp => {
              const p = getPlayerById(tp.playerId)
              return p ? `${p.lastName} (${tp.line})` : tp.line
            })
            .join(' · ')}
        </p>
      )}
    </Link>
  )
}

function LeaderRow({ entry }: { entry: LeaderEntry }) {
  const { player, team, statLabel, statValue } = entry
  return (
    <Link
      to={sportsRoutes.playerDetail(player.slug)}
      className="sports-feed__entry sports-feed__entry--leader"
    >
      <div className="sports-feed__entry-meta">
        <span className="sports-feed__badge sports-feed__badge--leader">{statLabel}</span>
        <span className="sports-feed__date">Season</span>
      </div>
      <div className="sports-feed__leader">
        <span
          className="sports-feed__leader-avatar"
          style={{ backgroundColor: team?.primaryColor ?? 'var(--color-content-secondary)' }}
          aria-hidden="true"
        >
          {player.firstName[0]}
          {player.lastName[0]}
        </span>
        <span className="sports-feed__leader-body">
          <span className="sports-feed__leader-name">
            {player.firstName} {player.lastName}
          </span>
          <span className="sports-feed__leader-meta">
            {player.position} · {team?.name ?? '—'}
          </span>
        </span>
        <span className="sports-feed__leader-stat">{statValue}</span>
      </div>
    </Link>
  )
}

function FeedStream({ filters, onFilters }: {
  filters: FilterState
  onFilters: (next: FilterState) => void
}) {
  const all = useMemo(() => buildEntries(), [])
  const visible = useMemo(() => applyFilters(all, filters), [all, filters])
  const sortedTeams = useMemo(
    () => TEAMS.slice().sort((a, b) => a.city.localeCompare(b.city)),
    [],
  )

  return (
    <div className="sports-feed">
      <div className="sports-feed__filters">
        <div className="sports-feed__chips" role="group" aria-label="Status filter">
          {STATUS_FILTERS.map(opt => (
            <button
              key={opt.id}
              type="button"
              className={`sports-feed__chip${filters.status === opt.id ? ' is-active' : ''}`}
              aria-pressed={filters.status === opt.id}
              onClick={() => onFilters({ ...filters, status: opt.id })}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="sports-feed__chips" role="group" aria-label="Conference filter">
          {CONFERENCE_FILTERS.map(opt => (
            <button
              key={opt.id}
              type="button"
              className={`sports-feed__chip${filters.conference === opt.id ? ' is-active' : ''}`}
              aria-pressed={filters.conference === opt.id}
              onClick={() => onFilters({ ...filters, conference: opt.id })}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <label className="sports-feed__team-select">
          <span className="sports-feed__team-select-label">Team</span>
          <select
            value={filters.teamId}
            onChange={e => onFilters({ ...filters, teamId: e.target.value as FilterState['teamId'] })}
          >
            <option value="all">All teams</option>
            {sortedTeams.map(t => (
              <option key={t.id} value={t.id}>{t.city} {t.name}</option>
            ))}
          </select>
        </label>
      </div>
      <ol className="sports-feed__list">
        {visible.length === 0 && (
          <li className="sports-feed__empty">
            Nothing matches these filters yet. Try widening the status or conference.
          </li>
        )}
        {visible.map(entry => (
          <li key={entry.key} className="sports-feed__item">
            {entry.kind === 'leader'
              ? <LeaderRow entry={entry} />
              : <GameRow entry={entry} />}
          </li>
        ))}
      </ol>
    </div>
  )
}

function FeedNav({ nav, route }: { nav: NavItem[]; route: ShellProps['route'] }) {
  return (
    <nav className="sports-app__feed-nav" aria-label="Primary">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__feed-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

// ABOUTME: FeedShell — a React component.
export function FeedShell(props: ShellProps) {
  const isHome = props.route.kind === 'home'
  // Filter state lives in the shell so collapsing the feed to a rail on
  // detail routes doesn't drop it. It intentionally does NOT persist in
  // the URL — these are quick browse filters, not a saved view.
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    conference: 'all',
    teamId: 'all',
  })

  return (
    <div
      className={`sports-app sports-app--feed${isHome ? ' is-home' : ' is-rail'}`}
    >
      <header className="sports-app__header sports-app__header--feed">
        {props.brand}
        <FeedNav nav={props.nav} route={props.route} />
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      {isHome ? (
        <main className="sports-app__main sports-app__main--feed">
          <h1 className="sports-page__title">Today around the league</h1>
          <p className="sports-page__subtitle">
            One chronological stream — live first, then today's finals,
            today's upcoming, and the season's standout performers.
          </p>
          <FeedStream filters={filters} onFilters={setFilters} />
        </main>
      ) : (
        <div className="sports-app__feed-split">
          <aside className="sports-app__feed-rail" aria-label="Today's feed">
            <FeedStream filters={filters} onFilters={setFilters} />
          </aside>
          <main className="sports-app__main sports-app__main--feed-detail">
            {props.children}
          </main>
        </div>
      )}
    </div>
  )
}
