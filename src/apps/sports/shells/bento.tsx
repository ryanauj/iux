// ABOUTME: BentoShell — configurable dashboard shell that replaces the Home page with a reorderable grid of five sports widgets (live scoreboard, stat leaders, standings, schedule, team spotlight), each expandable into a modal; on other routes renders the standard page.

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from '../../Link'
import { replaceParams, useHashLocation } from '../../router'
import { Modal } from '../../../components/Modal/Modal'
import {
  GAMES,
  TODAY,
  getStandings,
  getStatLeaders,
  getTeamById,
} from '../data'
import { formatDate, formatStat, winPct } from '../format'
import { sportsRoutes } from '../routes'
import type { Game, Team } from '../types'
import { GameDetail } from '../pages/GameDetail'
import { Games } from '../pages/Games'
import { Players } from '../pages/Players'
import { Standings } from '../pages/Standings'
import { TeamDetail } from '../pages/TeamDetail'
import type { ShellProps, NavItem } from '../layouts'

// ABOUTME: Union of the five dashboard widget identifiers available in the bento layout.
type WidgetId = 'live' | 'leaders' | 'standings' | 'schedule' | 'spotlight'
// ABOUTME: Canonical widget order used as the default and as the reset target.
const ALL_WIDGETS: WidgetId[] = ['live', 'leaders', 'standings', 'schedule', 'spotlight']

// ABOUTME: Human-readable display names for each widget, shown in tile headers and the hidden-widgets tray.
const WIDGET_LABELS: Record<WidgetId, string> = {
  live: 'Live scoreboard',
  leaders: 'Stat leaders',
  standings: 'Standings',
  schedule: 'Schedule',
  spotlight: 'Team spotlight',
}

// `?bento=` is sticky; format is the visible widget IDs in display order
// (comma-separated). A missing id is hidden. An empty/absent param falls
// back to all widgets in their canonical order.
// ABOUTME: Parses the `?bento=` param (comma-joined WidgetIds) into an ordered visible list, filtering invalid tokens and falling back to ALL_WIDGETS when the result is empty.
function parseBento(raw: string | null): WidgetId[] {
  if (!raw) return ALL_WIDGETS.slice()
  const parsed = raw.split(',').filter((s): s is WidgetId =>
    (ALL_WIDGETS as string[]).includes(s),
  )
  return parsed.length > 0 ? Array.from(new Set(parsed)) : ALL_WIDGETS.slice()
}

// ABOUTME: Serialises a WidgetId array to a comma-joined string for `?bento=`, returning undefined when it matches the default order so clean URLs are preserved.
function serializeBento(ids: WidgetId[]): string | undefined {
  // Omit the param when it would match the default — keeps clean URLs.
  const isDefault =
    ids.length === ALL_WIDGETS.length && ids.every((id, i) => id === ALL_WIDGETS[i])
  return isDefault ? undefined : ids.join(',')
}

// ABOUTME: Returns the first live game in GAMES, or undefined if none are currently in progress.
function liveGame(): Game | undefined {
  return GAMES.find(g => g.status === 'live')
}

// ABOUTME: Returns the team with the best winning percentage across both conferences — used as the Spotlight widget's featured team.
function topTeam(): Team | undefined {
  const east = getStandings('East')[0]
  const west = getStandings('West')[0]
  if (!east) return west
  if (!west) return east
  return Number(winPct(east.wins, east.losses)) >= Number(winPct(west.wins, west.losses))
    ? east
    : west
}

// ABOUTME: Maps a WidgetId to the canonical deep-link route for "Open full page" — live goes to the live game or the schedule, spotlight goes to the top team or teams list.
function widgetRoute(id: WidgetId): string {
  if (id === 'live') {
    const g = liveGame()
    return g ? sportsRoutes.gameDetail(g.id) : sportsRoutes.games()
  }
  if (id === 'leaders') return sportsRoutes.players()
  if (id === 'standings') return sportsRoutes.standings()
  if (id === 'schedule') return sportsRoutes.games()
  const t = topTeam()
  return t ? sportsRoutes.teamDetail(t.slug) : sportsRoutes.teams()
}

// ABOUTME: Compact live-scoreboard widget: shows a pulsing indicator, clock string, and one row per team with abbreviation badge and current score; shows an empty message when no game is live.
function LiveWidget() {
  const g = liveGame()
  if (!g) {
    return <p className="sports-bento__empty">No live games right now — check back at tip-off.</p>
  }
  const home = getTeamById(g.homeTeamId)
  const away = getTeamById(g.awayTeamId)
  if (!home || !away) return null
  return (
    <div className="sports-bento__live">
      <span className="sports-bento__pulse" aria-hidden="true" />
      <span className="sports-bento__live-clock">
        Q{g.quarter ?? '?'} · {g.timeRemaining ?? ''}
      </span>
      {[away, home].map(t => (
        <div key={t.id} className="sports-bento__live-row">
          <span
            className="sports-bento__mark"
            style={{ backgroundColor: t.primaryColor }}
            aria-hidden="true"
          >
            {t.abbreviation}
          </span>
          <span className="sports-bento__live-name">{t.name}</span>
          <span className="sports-bento__live-score">
            {t === away ? g.awayScore : g.homeScore}
          </span>
        </div>
      ))}
    </div>
  )
}

// ABOUTME: Compact PPG leaders widget: ordered list of the top-5 scorers with rank, abbreviated first name, last name, and PPG value.
function LeadersWidget() {
  const leaders = getStatLeaders('ppg', 5)
  return (
    <ol className="sports-bento__leaders">
      {leaders.map((p, i) => (
        <li key={p.id} className="sports-bento__leader">
          <span className="sports-bento__leader-rank">{i + 1}</span>
          <span className="sports-bento__leader-name">{p.firstName[0]}. {p.lastName}</span>
          <span className="sports-bento__leader-stat">{formatStat(p.stats.ppg)}</span>
        </li>
      ))}
    </ol>
  )
}

// ABOUTME: Compact standings widget: two side-by-side columns (East / West) each showing the top-3 teams with rank, abbreviation badge, and W-L record.
function StandingsWidget() {
  return (
    <div className="sports-bento__standings">
      {(['East', 'West'] as const).map(conf => (
        <div key={conf} className="sports-bento__standings-col">
          <h4 className="sports-bento__standings-conf">{conf}</h4>
          {getStandings(conf).slice(0, 3).map((t, i) => (
            <div key={t.id} className="sports-bento__standings-row">
              <span className="sports-bento__leader-rank">{i + 1}</span>
              <span
                className="sports-bento__mark sports-bento__mark--sm"
                style={{ backgroundColor: t.primaryColor }}
                aria-hidden="true"
              >
                {t.abbreviation}
              </span>
              <span className="sports-bento__standings-rec">{t.wins}-{t.losses}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ABOUTME: Compact schedule widget: lists the next four upcoming (scheduled) games with date and away @ home abbreviation matchup.
function ScheduleWidget() {
  const today = TODAY
  const upcoming = GAMES
    .filter(g => g.status === 'scheduled' && g.date >= today)
    .slice(0, 4)
  if (upcoming.length === 0) {
    return <p className="sports-bento__empty">No upcoming games scheduled.</p>
  }
  return (
    <ul className="sports-bento__schedule">
      {upcoming.map(g => {
        const home = getTeamById(g.homeTeamId)
        const away = getTeamById(g.awayTeamId)
        if (!home || !away) return null
        return (
          <li key={g.id} className="sports-bento__sched-row">
            <span className="sports-bento__sched-date">{formatDate(g.date)}</span>
            <span className="sports-bento__sched-match">
              {away.abbreviation} <span aria-hidden="true">@</span> {home.abbreviation}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

// ABOUTME: Compact team spotlight widget: shows the best-record team's crest, city/name, conference, W-L record, last-10, and streak.
function SpotlightWidget() {
  const team = topTeam()
  if (!team) return <p className="sports-bento__empty">No teams on file.</p>
  return (
    <div className="sports-bento__spotlight">
      <span
        className="sports-bento__crest"
        style={{ backgroundColor: team.primaryColor }}
        aria-hidden="true"
      >
        {team.abbreviation}
      </span>
      <div className="sports-bento__spotlight-body">
        <div className="sports-bento__spotlight-name">{team.city} {team.name}</div>
        <div className="sports-bento__spotlight-meta">
          {team.conference} · {team.division}
        </div>
        <div className="sports-bento__spotlight-stats">
          <span>{team.wins}-{team.losses}</span>
          <span>L10 {team.last10}</span>
          <span>{team.streak}</span>
        </div>
      </div>
    </div>
  )
}

// ABOUTME: Switches on WidgetId and returns the appropriate compact widget component for rendering inside a bento tile.
function widgetBody(id: WidgetId): ReactNode {
  if (id === 'live') return <LiveWidget />
  if (id === 'leaders') return <LeadersWidget />
  if (id === 'standings') return <StandingsWidget />
  if (id === 'schedule') return <ScheduleWidget />
  return <SpotlightWidget />
}

// ABOUTME: Switches on WidgetId and returns the full page component to render inside the expanded Modal when a tile is clicked.
function widgetModal(id: WidgetId): ReactNode {
  if (id === 'live') {
    const g = liveGame()
    return g ? <GameDetail id={g.id} /> : <Games />
  }
  if (id === 'leaders') return <Players />
  if (id === 'standings') return <Standings />
  if (id === 'schedule') return <Games />
  const t = topTeam()
  return t ? <TeamDetail slug={t.slug} /> : <Standings />
}

// ABOUTME: Horizontal nav bar for the bento shell, rendering each NavItem as a styled link with active-state highlighting.
function BentoNav({ nav, route }: { nav: NavItem[]; route: ShellProps['route'] }) {
  return (
    <nav className="sports-app__bento-nav" aria-label="Primary">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__bento-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

// ABOUTME: Dashboard shell with a user-customisable widget grid on the Home route and a standard page layout on every other route; widget visibility and order persist in the `?bento=` URL param so the configuration survives navigation.
/**
 * On the Home route, renders five named widgets (live, leaders, standings,
 * schedule, spotlight) in a CSS grid, each clickable to expand into a Modal
 * that hosts the corresponding full page component. Clicking a widget's
 * "Open full page" link navigates normally. A "Customize" toolbar lets the
 * user reorder, hide, and restore widgets; the resulting order is serialised
 * into `?bento=` and reflects immediately without a round-trip. On non-Home
 * routes the grid is replaced by the standard `props.children` page.
 */
export function BentoShell(props: ShellProps) {
  const location = useHashLocation()
  const visible = useMemo(() => parseBento(location.params.get('bento')), [location.params])
  const hidden = ALL_WIDGETS.filter(id => !visible.includes(id))

  const [editing, setEditing] = useState(false)
  const [expanded, setExpanded] = useState<WidgetId | null>(null)

  // Close the modal when the route changes — clicking a Link inside the
  // expanded page navigates away and the modal would otherwise hang.
  useEffect(() => {
    setExpanded(null)
  }, [props.route])

  const writeOrder = (ids: WidgetId[]) => replaceParams({ bento: serializeBento(ids) })

  const move = (id: WidgetId, dir: -1 | 1) => {
    const idx = visible.indexOf(id)
    const next = idx + dir
    if (idx < 0 || next < 0 || next >= visible.length) return
    const out = visible.slice()
    ;[out[idx], out[next]] = [out[next], out[idx]]
    writeOrder(out)
  }
  const hide = (id: WidgetId) => writeOrder(visible.filter(v => v !== id))
  const show = (id: WidgetId) => writeOrder([...visible, id])
  const reset = () => writeOrder(ALL_WIDGETS.slice())

  const isHome = props.route.kind === 'home'

  return (
    <div className="sports-app sports-app--bento">
      <header className="sports-app__header sports-app__header--bento">
        {props.brand}
        <BentoNav nav={props.nav} route={props.route} />
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      {isHome ? (
        <main className="sports-app__main sports-app__main--bento">
          <div className="sports-bento__toolbar">
            <h1 className="sports-page__title">Dashboard</h1>
            <div className="sports-bento__toolbar-actions">
              <button
                type="button"
                className={`sports-bento__edit-btn${editing ? ' is-active' : ''}`}
                aria-pressed={editing}
                onClick={() => setEditing(e => !e)}
              >
                {editing ? 'Done' : 'Customize'}
              </button>
              {editing && (
                <button type="button" className="sports-bento__reset-btn" onClick={reset}>
                  Reset
                </button>
              )}
            </div>
          </div>
          <div className="sports-bento__grid">
            {visible.map((id, i) => (
              <article
                key={id}
                className={`sports-bento__tile sports-bento__tile--${id}${editing ? ' is-editing' : ''}`}
              >
                <header className="sports-bento__tile-head">
                  <h3 className="sports-bento__tile-title">{WIDGET_LABELS[id]}</h3>
                  {!editing && (
                    <button
                      type="button"
                      className="sports-bento__expand"
                      aria-label={`Expand ${WIDGET_LABELS[id]}`}
                      onClick={() => setExpanded(id)}
                    >
                      ⤢
                    </button>
                  )}
                </header>
                {editing ? (
                  <div className="sports-bento__edit-controls">
                    <button
                      type="button"
                      onClick={() => move(id, -1)}
                      disabled={i === 0}
                      aria-label={`Move ${WIDGET_LABELS[id]} earlier`}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => move(id, 1)}
                      disabled={i === visible.length - 1}
                      aria-label={`Move ${WIDGET_LABELS[id]} later`}
                    >
                      →
                    </button>
                    <button
                      type="button"
                      onClick={() => hide(id)}
                      aria-label={`Hide ${WIDGET_LABELS[id]}`}
                    >
                      Hide
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="sports-bento__tile-body-btn"
                    onClick={() => setExpanded(id)}
                    aria-label={`Open ${WIDGET_LABELS[id]} in full view`}
                  >
                    {widgetBody(id)}
                  </button>
                )}
                {!editing && (
                  <footer className="sports-bento__tile-foot">
                    <Link to={widgetRoute(id)} className="sports-bento__tile-link">
                      Open full page →
                    </Link>
                  </footer>
                )}
              </article>
            ))}
          </div>
          {editing && hidden.length > 0 && (
            <aside className="sports-bento__tray" aria-label="Hidden widgets">
              <h4 className="sports-bento__tray-title">Hidden widgets</h4>
              <div className="sports-bento__tray-chips">
                {hidden.map(id => (
                  <button
                    key={id}
                    type="button"
                    className="sports-bento__tray-chip"
                    onClick={() => show(id)}
                  >
                    + {WIDGET_LABELS[id]}
                  </button>
                ))}
              </div>
            </aside>
          )}
        </main>
      ) : (
        <main className="sports-app__main">{props.children}</main>
      )}
      {expanded && (
        <Modal
          open
          onOpenChange={open => { if (!open) setExpanded(null) }}
          title={WIDGET_LABELS[expanded]}
          size="lg"
          className="sports-bento__modal"
        >
          {widgetModal(expanded)}
        </Modal>
      )}
    </div>
  )
}
