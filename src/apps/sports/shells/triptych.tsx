import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from '../../Link'
import { replaceParams, useHashLocation } from '../../router'
import {
  GAMES,
  PLAYERS,
  TEAMS,
  getGameById,
  getGamesForTeam,
  getPlayerById,
  getPlayerBySlug,
  getPlayersForTeam,
  getTeamById,
  getTeamBySlug,
} from '../data'
import { formatDate, formatStat, winPct } from '../format'
import { sportsRoutes, type SportsRoute } from '../routes'
import type { Game, Player, Team } from '../types'
import type { ShellProps, NavItem } from '../layouts'

type Section = 'teams' | 'players' | 'games'
const SECTIONS: { id: Section; label: string }[] = [
  { id: 'teams', label: 'Teams' },
  { id: 'players', label: 'Players' },
  { id: 'games', label: 'Games' },
]

function sectionFromRoute(route: SportsRoute): Section {
  if (route.kind === 'players' || route.kind === 'playerDetail') return 'players'
  if (route.kind === 'games' || route.kind === 'gameDetail') return 'games'
  return 'teams'
}

function entityIdFromRoute(route: SportsRoute): string | null {
  if (route.kind === 'teamDetail') return getTeamBySlug(route.slug)?.id ?? null
  if (route.kind === 'playerDetail') return getPlayerBySlug(route.slug)?.id ?? null
  if (route.kind === 'gameDetail') return route.id
  return null
}

interface ListItem {
  id: string
  label: string
  meta: string
  swatch?: string
}

function listForSection(section: Section): ListItem[] {
  if (section === 'teams') {
    return TEAMS.slice()
      .sort((a, b) => a.city.localeCompare(b.city))
      .map(t => ({
        id: t.id,
        label: `${t.city} ${t.name}`,
        meta: `${t.wins}-${t.losses} · ${t.conference}`,
        swatch: t.primaryColor,
      }))
  }
  if (section === 'players') {
    return PLAYERS.slice()
      .sort((a, b) => b.stats.ppg - a.stats.ppg)
      .map(p => {
        const team = getTeamById(p.teamId)
        return {
          id: p.id,
          label: `${p.firstName} ${p.lastName}`,
          meta: `${p.position} · ${team?.abbreviation ?? '—'} · ${formatStat(p.stats.ppg)} PPG`,
          swatch: team?.primaryColor,
        }
      })
  }
  return GAMES.slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(g => {
      const home = getTeamById(g.homeTeamId)
      const away = getTeamById(g.awayTeamId)
      return {
        id: g.id,
        label: `${away?.abbreviation ?? '???'} @ ${home?.abbreviation ?? '???'}`,
        meta: `${formatDate(g.date)} · ${g.status}`,
        swatch: home?.primaryColor,
      }
    })
}

function isInSection(id: string, section: Section): boolean {
  if (section === 'teams') return TEAMS.some(t => t.id === id)
  if (section === 'players') return PLAYERS.some(p => p.id === id)
  return GAMES.some(g => g.id === id)
}

function Stats({ items }: { items: [string, string][] }) {
  return (
    <div className="sports-triptych__stats">
      {items.map(([label, value]) => (
        <div key={label} className="sports-triptych__stat">
          <span className="sports-triptych__stat-label">{label}</span>
          <span className="sports-triptych__stat-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

interface SubLink {
  key: string
  to: string
  label: ReactNode
  meta: ReactNode
}

function SubList({ title, links, empty }: { title: string; links: SubLink[]; empty: string }) {
  return (
    <section className="sports-triptych__sub">
      <h3 className="sports-triptych__sub-title">{title}</h3>
      <ul className="sports-triptych__sub-list">
        {links.length === 0 && <li className="sports-triptych__sub-empty">{empty}</li>}
        {links.map(l => (
          <li key={l.key}>
            <Link to={l.to} className="sports-triptych__sub-link">
              <span>{l.label}</span>
              <span className="sports-triptych__sub-meta">{l.meta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SummaryHead({
  kicker,
  name,
  meta,
  crest,
  accent,
}: {
  kicker: ReactNode
  name: ReactNode
  meta: ReactNode
  crest?: { text: string; color: string }
  accent?: string
}) {
  return (
    <header
      className="sports-triptych__summary-head"
      style={accent ? { borderInlineStartColor: accent } : undefined}
    >
      {crest && (
        <span
          className="sports-triptych__crest"
          style={{ backgroundColor: crest.color }}
          aria-hidden="true"
        >
          {crest.text}
        </span>
      )}
      <div>
        <span className="sports-triptych__summary-kicker">{kicker}</span>
        <h2 className="sports-triptych__summary-name">{name}</h2>
        <span className="sports-triptych__summary-meta">{meta}</span>
      </div>
    </header>
  )
}

function gameLink(game: Game): SubLink | null {
  const home = getTeamById(game.homeTeamId)
  const away = getTeamById(game.awayTeamId)
  if (!home || !away) return null
  return {
    key: game.id,
    to: sportsRoutes.gameDetail(game.id),
    label: `${away.abbreviation} @ ${home.abbreviation}`,
    meta: formatDate(game.date),
  }
}

function TeamSummary({ team }: { team: Team }) {
  const roster = getPlayersForTeam(team.id)
    .slice()
    .sort((a, b) => b.stats.ppg - a.stats.ppg)
    .slice(0, 5)
  const recent = getGamesForTeam(team.id)
    .filter(g => g.status !== 'scheduled')
    .slice(-3)
    .reverse()
  return (
    <div className="sports-triptych__summary">
      <SummaryHead
        kicker={team.city}
        name={team.name}
        meta={`${team.conference} · ${team.division} · ${team.headCoach}`}
        crest={{ text: team.abbreviation, color: team.primaryColor }}
        accent={team.primaryColor}
      />
      <Stats
        items={[
          ['Record', `${team.wins}-${team.losses}`],
          ['Win%', winPct(team.wins, team.losses)],
          ['PF', formatStat(team.pointsFor)],
          ['PA', formatStat(team.pointsAgainst)],
          ['Last 10', team.last10],
          ['Streak', team.streak],
        ]}
      />
      <SubList
        title="Top scorers"
        empty="No roster on file."
        links={roster.map(p => ({
          key: p.id,
          to: sportsRoutes.playerDetail(p.slug),
          label: `${p.firstName} ${p.lastName}`,
          meta: `${formatStat(p.stats.ppg)} PPG`,
        }))}
      />
      <SubList
        title="Recent games"
        empty="No completed games yet."
        links={recent.map(gameLink).filter((l): l is SubLink => l !== null)}
      />
      <Link to={sportsRoutes.teamDetail(team.slug)} className="sports-triptych__open">
        Open full team page →
      </Link>
    </div>
  )
}

function PlayerSummary({ player }: { player: Player }) {
  const team = getTeamById(player.teamId)
  const recent = team
    ? getGamesForTeam(team.id).filter(g => g.status === 'final').slice(-3).reverse()
    : []
  const initials = `${player.firstName[0] ?? ''}${player.lastName[0] ?? ''}`
  const accent = team?.primaryColor ?? 'var(--color-content-secondary)'
  const teamMeta: ReactNode = team ? (
    <Link
      to={sportsRoutes.teamDetail(team.slug)}
      className="sports-triptych__summary-meta-link"
    >
      {team.city} {team.name}
    </Link>
  ) : (
    'Free agent'
  )
  return (
    <div className="sports-triptych__summary">
      <SummaryHead
        kicker={`#${player.jersey} · ${player.position}`}
        name={`${player.firstName} ${player.lastName}`}
        meta={teamMeta}
        crest={{ text: initials, color: accent }}
        accent={accent}
      />
      <Stats
        items={[
          ['PPG', formatStat(player.stats.ppg)],
          ['RPG', formatStat(player.stats.rpg)],
          ['APG', formatStat(player.stats.apg)],
          ['SPG', formatStat(player.stats.spg)],
          ['BPG', formatStat(player.stats.bpg)],
          ['MPG', formatStat(player.stats.minutesPerGame)],
        ]}
      />
      {team && (
        <SubList
          title={`${team.name} · recent games`}
          empty="No recent finals."
          links={recent.map(gameLink).filter((l): l is SubLink => l !== null)}
        />
      )}
      <Link to={sportsRoutes.playerDetail(player.slug)} className="sports-triptych__open">
        Open full player page →
      </Link>
    </div>
  )
}

function GameSummary({ game }: { game: Game }) {
  const home = getTeamById(game.homeTeamId)
  const away = getTeamById(game.awayTeamId)
  if (!home || !away) return <div className="sports-triptych__empty">Game not found.</div>

  const statusText = game.status === 'live'
    ? `Live · Q${game.quarter ?? '?'} ${game.timeRemaining ?? ''}`
    : game.status === 'final' ? 'Final' : 'Scheduled'

  const performers: SubLink[] = []
  for (const tp of game.topPerformers ?? []) {
    const p = getPlayerById(tp.playerId)
    if (!p) continue
    performers.push({
      key: tp.playerId,
      to: sportsRoutes.playerDetail(p.slug),
      label: `${p.firstName} ${p.lastName}`,
      meta: tp.line,
    })
  }

  return (
    <div className="sports-triptych__summary">
      <SummaryHead kicker={formatDate(game.date)} name={`${away.abbreviation} @ ${home.abbreviation}`} meta={statusText} />
      <div className="sports-triptych__game-board">
        {[away, home].map(t => (
          <Link
            key={t.id}
            to={sportsRoutes.teamDetail(t.slug)}
            className="sports-triptych__game-row"
          >
            <span
              className="sports-triptych__game-mark"
              style={{ backgroundColor: t.primaryColor }}
              aria-hidden="true"
            >
              {t.abbreviation}
            </span>
            <span className="sports-triptych__game-name">{t.name}</span>
            {t === away && typeof game.awayScore === 'number' && (
              <span className="sports-triptych__game-score">{game.awayScore}</span>
            )}
            {t === home && typeof game.homeScore === 'number' && (
              <span className="sports-triptych__game-score">{game.homeScore}</span>
            )}
          </Link>
        ))}
      </div>
      {performers.length > 0 && (
        <SubList title="Top performers" empty="" links={performers} />
      )}
      <Link to={sportsRoutes.gameDetail(game.id)} className="sports-triptych__open">
        Open full game page →
      </Link>
    </div>
  )
}

function SummaryFor({ id, section }: { id: string | null; section: Section }) {
  if (!id) {
    const noun = section === 'teams' ? 'team' : section === 'players' ? 'player' : 'game'
    return <div className="sports-triptych__empty">Pick a {noun} on the left.</div>
  }
  if (section === 'teams') {
    const team = getTeamById(id)
    return team
      ? <TeamSummary team={team} />
      : <div className="sports-triptych__empty">Team not found.</div>
  }
  if (section === 'players') {
    const player = getPlayerById(id)
    return player
      ? <PlayerSummary player={player} />
      : <div className="sports-triptych__empty">Player not found.</div>
  }
  const game = getGameById(id)
  return game
    ? <GameSummary game={game} />
    : <div className="sports-triptych__empty">Game not found.</div>
}

function TriNav({ nav, route }: { nav: NavItem[]; route: SportsRoute }) {
  return (
    <nav className="sports-app__triptych-nav" aria-label="Primary">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__triptych-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function TriptychShell(props: ShellProps) {
  const location = useHashLocation()
  const triParam = location.params.get('tri')
  const routeSection = sectionFromRoute(props.route)
  const section: Section = triParam && SECTIONS.some(s => s.id === triParam)
    ? (triParam as Section)
    : routeSection
  const routeEntityId = entityIdFromRoute(props.route)

  // Col-1 selection is shell-only state. Route navigation (col2 → col3)
  // resets it to track the new route; clicking col1 overrides without
  // touching the route — that's the triptych's contract: col1 swaps col2,
  // col2 fills col3.
  const [selectedId, setSelectedId] = useState<string | null>(routeEntityId)
  useEffect(() => {
    setSelectedId(routeEntityId)
  }, [routeEntityId])

  // Deep link wins: if the route's entity lives in a different section
  // than the sticky `tri` param, follow the route.
  useEffect(() => {
    if (!routeEntityId) return
    const target = sectionFromRoute(props.route)
    if (target !== section) replaceParams({ tri: target })
  }, [routeEntityId, props.route, section])

  const list = useMemo(() => listForSection(section), [section])
  const effectiveId = selectedId && isInSection(selectedId, section)
    ? selectedId
    : list[0]?.id ?? null

  const handleSection = (id: Section) => {
    if (id === section) return
    replaceParams({ tri: id })
    setSelectedId(null)
  }

  const isHome = props.route.kind === 'home'

  return (
    <div className="sports-app sports-app--triptych">
      <header className="sports-app__header sports-app__header--triptych">
        {props.brand}
        <TriNav nav={props.nav} route={props.route} />
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      <div className="sports-triptych">
        <aside className="sports-triptych__col sports-triptych__col--list" aria-label="Browse">
          <div className="sports-triptych__sections" role="tablist" aria-label="Browse section">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                type="button"
                className={`sports-triptych__section${section === s.id ? ' is-active' : ''}`}
                role="tab"
                aria-selected={section === s.id}
                onClick={() => handleSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <ul className="sports-triptych__items" role="listbox" aria-label={`${section} list`}>
            {list.map(item => {
              const active = item.id === effectiveId
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`sports-triptych__item${active ? ' is-active' : ''}`}
                    role="option"
                    aria-selected={active}
                    onClick={() => setSelectedId(item.id)}
                  >
                    {item.swatch && (
                      <span
                        className="sports-triptych__item-swatch"
                        style={{ backgroundColor: item.swatch }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="sports-triptych__item-label">{item.label}</span>
                    <span className="sports-triptych__item-meta">{item.meta}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>
        <section
          className="sports-triptych__col sports-triptych__col--summary"
          aria-label="Summary"
        >
          <SummaryFor id={effectiveId} section={section} />
        </section>
        <section className="sports-triptych__col sports-triptych__col--deep" aria-label="Detail">
          {isHome ? (
            <div className="sports-triptych__empty">
              Pick from the summary to open it here. Standard pages stay one click away — and
              direct links still work.
            </div>
          ) : (
            props.children
          )}
        </section>
      </div>
    </div>
  )
}
