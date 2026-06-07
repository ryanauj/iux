// ABOUTME: MagazineShell — a React component (apps).

import { useCallback, useMemo, type ReactNode } from 'react'
import { Link } from '../../Link'
import {
  GAMES,
  TODAY,
  getStandings,
  getStatLeaders,
  getTeamById,
} from '../data'
import { formatDate, formatStat } from '../format'
import { sportsRoutes } from '../routes'
import type { Game, Player, Team } from '../types'
import type { ShellProps, NavItem } from '../layouts'

interface Section {
  id: string
  label: string
}

const SECTIONS: Section[] = [
  { id: 'cover', label: 'Cover' },
  { id: 'pullquote', label: 'Pull quote' },
  { id: 'leaders', label: 'Leaderboard' },
  { id: 'feature', label: 'Inside the East' },
]

/** Pick the marquee matchup: prefer the live game, else today's biggest
 *  scheduled game (matchup involving the best combined record), else the
 *  most recent final. */
function gameOfTheNight(): Game | undefined {
  const live = GAMES.find(g => g.status === 'live')
  if (live) return live
  const today = GAMES.filter(g => g.date === TODAY && g.status === 'scheduled')
  if (today.length > 0) {
    return today.slice().sort((a, b) => {
      const aw = (getTeamById(a.homeTeamId)?.wins ?? 0)
        + (getTeamById(a.awayTeamId)?.wins ?? 0)
      const bw = (getTeamById(b.homeTeamId)?.wins ?? 0)
        + (getTeamById(b.awayTeamId)?.wins ?? 0)
      return bw - aw
    })[0]
  }
  const finals = GAMES.filter(g => g.status === 'final')
  return finals[finals.length - 1]
}

function statusKicker(g: Game): string {
  if (g.status === 'live') {
    const q = g.quarter ? `Q${g.quarter}` : 'Live'
    const t = g.timeRemaining ? ` · ${g.timeRemaining}` : ''
    return `LIVE NOW · ${q}${t}`
  }
  if (g.status === 'scheduled') return `TONIGHT'S TIP-OFF · ${formatDate(g.date)}`
  return `LATEST FINAL · ${formatDate(g.date)}`
}

function gameLede(g: Game, home: Team, away: Team): string {
  if (g.status === 'live') {
    return `${away.city} visits ${home.city} with the league's eyes on the floor — every possession scaled up to a headline.`
  }
  if (g.status === 'scheduled') {
    return `${away.city} take the trip to ${home.arena} tonight. Two contenders, one rotation each that'll decide the seeding picture.`
  }
  const margin = Math.abs((g.homeScore ?? 0) - (g.awayScore ?? 0))
  const winner =
    (g.homeScore ?? 0) > (g.awayScore ?? 0) ? home.name : away.name
  return `${winner} took it by ${margin} — the kind of evening that rewrites a paragraph in the season preview.`
}

function MagazineCover({ game }: { game: Game }) {
  const home = getTeamById(game.homeTeamId)
  const away = getTeamById(game.awayTeamId)
  if (!home || !away) return null
  return (
    <section id="cover" className="sports-magazine__cover">
      <div className="sports-magazine__masthead">
        <span className="sports-magazine__masthead-title">Hoops Hub</span>
        <span className="sports-magazine__masthead-issue">
          Issue · {formatDate(TODAY)}
        </span>
      </div>
      <p className="sports-magazine__kicker">{statusKicker(game)}</p>
      <h1 className="sports-magazine__headline">Game of the Night</h1>
      <div className="sports-magazine__matchup">
        <div
          className="sports-magazine__team"
          style={{ borderColor: away.primaryColor }}
        >
          <span
            className="sports-magazine__crest"
            style={{ backgroundColor: away.primaryColor }}
            aria-hidden="true"
          >
            {away.abbreviation}
          </span>
          <div className="sports-magazine__team-meta">
            <span className="sports-magazine__team-city">{away.city}</span>
            <span className="sports-magazine__team-name">{away.name}</span>
            <span className="sports-magazine__team-record">
              {away.wins}-{away.losses} · {away.conference}
            </span>
          </div>
          {(game.status === 'final' || game.status === 'live') && (
            <span className="sports-magazine__score">{game.awayScore}</span>
          )}
        </div>
        <span className="sports-magazine__versus" aria-hidden="true">vs</span>
        <div
          className="sports-magazine__team"
          style={{ borderColor: home.primaryColor }}
        >
          <span
            className="sports-magazine__crest"
            style={{ backgroundColor: home.primaryColor }}
            aria-hidden="true"
          >
            {home.abbreviation}
          </span>
          <div className="sports-magazine__team-meta">
            <span className="sports-magazine__team-city">{home.city}</span>
            <span className="sports-magazine__team-name">{home.name}</span>
            <span className="sports-magazine__team-record">
              {home.wins}-{home.losses} · {home.conference}
            </span>
          </div>
          {(game.status === 'final' || game.status === 'live') && (
            <span className="sports-magazine__score">{game.homeScore}</span>
          )}
        </div>
      </div>
      <p className="sports-magazine__lede">{gameLede(game, home, away)}</p>
      <p className="sports-magazine__byline">
        <Link to={sportsRoutes.gameDetail(game.id)}>Read the box score →</Link>
      </p>
    </section>
  )
}

function PullQuote({ player, team }: { player: Player; team: Team | undefined }) {
  return (
    <section id="pullquote" className="sports-magazine__pullquote">
      <p className="sports-magazine__quote-stat">{formatStat(player.stats.ppg)}</p>
      <p className="sports-magazine__quote-unit">PPG</p>
      <blockquote className="sports-magazine__quote-body">
        <p>
          “Some nights the box score writes itself.”
        </p>
        <cite>
          <Link to={sportsRoutes.playerDetail(player.slug)}>
            {player.firstName} {player.lastName}
          </Link>
          {team && (
            <>
              {' · '}
              <Link to={sportsRoutes.teamDetail(team.slug)}>{team.name}</Link>
            </>
          )}
        </cite>
      </blockquote>
    </section>
  )
}

function Leaderboard() {
  const ppg = getStatLeaders('ppg', 5)
  const rpg = getStatLeaders('rpg', 5)
  const apg = getStatLeaders('apg', 5)
  const blocks: { label: string; players: Player[]; key: 'ppg' | 'rpg' | 'apg' }[] = [
    { label: 'Scoring', players: ppg, key: 'ppg' },
    { label: 'Rebounding', players: rpg, key: 'rpg' },
    { label: 'Playmaking', players: apg, key: 'apg' },
  ]
  return (
    <section id="leaders" className="sports-magazine__leaders">
      <header className="sports-magazine__section-head">
        <span className="sports-magazine__rule" aria-hidden="true" />
        <h2 className="sports-magazine__section-title">By the Numbers</h2>
      </header>
      <p className="sports-magazine__section-dek">
        The names you'll see in the highlight package. Each table, the league's
        top five so far this season.
      </p>
      <div className="sports-magazine__leader-grid">
        {blocks.map(b => (
          <article key={b.key} className="sports-magazine__leader-block">
            <h3 className="sports-magazine__leader-title">{b.label}</h3>
            <ol className="sports-magazine__leader-list">
              {b.players.map((p, i) => (
                <li key={p.id} className="sports-magazine__leader-row">
                  <span className="sports-magazine__leader-rank">{i + 1}</span>
                  <Link
                    to={sportsRoutes.playerDetail(p.slug)}
                    className="sports-magazine__leader-name"
                  >
                    {p.lastName}
                  </Link>
                  <span className="sports-magazine__leader-stat">
                    {formatStat(p.stats[b.key])}
                  </span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  )
}

function InsideTheEast() {
  const standings = getStandings('East')
  const leader = standings[0]
  const chaser = standings[1]
  return (
    <section id="feature" className="sports-magazine__feature">
      <header className="sports-magazine__section-head">
        <span className="sports-magazine__rule" aria-hidden="true" />
        <h2 className="sports-magazine__section-title">Inside the East</h2>
      </header>
      <div className="sports-magazine__feature-body">
        <div className="sports-magazine__feature-prose">
          <p className="sports-magazine__feature-dropcap">
            {leader ? (
              <>
                <span className="sports-magazine__dropcap">{leader.city[0]}</span>
                {leader.city.slice(1)} keeps the top line in the East at{' '}
                {leader.wins}-{leader.losses}, riding a {leader.streak} run with
                {leader.last10} over the last ten.
              </>
            ) : (
              'The East is wide open.'
            )}
          </p>
          {chaser && leader && (
            <p>
              {chaser.city} sits a half-step back at {chaser.wins}-{chaser.losses}.
              The two clubs share a division identity — interior defense, an
              offense built on the second action — and they're already on a
              collision course for the conference semis.
            </p>
          )}
          <p>
            Below the top two, the pack tightens fast. Three teams are within
            two games of the four-seed, and the seeding tiebreakers will come
            down to head-to-head meetings still on the calendar.
          </p>
          <p className="sports-magazine__feature-cta">
            <Link to={sportsRoutes.standings()}>See the full East table →</Link>
          </p>
        </div>
        <aside className="sports-magazine__feature-side" aria-label="East standings">
          <h3 className="sports-magazine__side-title">East · Top five</h3>
          <ol className="sports-magazine__side-list">
            {standings.slice(0, 5).map((t, i) => (
              <li key={t.id} className="sports-magazine__side-row">
                <span className="sports-magazine__leader-rank">{i + 1}</span>
                <span
                  className="sports-magazine__side-mark"
                  style={{ backgroundColor: t.primaryColor }}
                  aria-hidden="true"
                >
                  {t.abbreviation}
                </span>
                <Link
                  to={sportsRoutes.teamDetail(t.slug)}
                  className="sports-magazine__side-name"
                >
                  {t.name}
                </Link>
                <span className="sports-magazine__side-record">
                  {t.wins}-{t.losses}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}

function MagazineNav({ nav, route }: { nav: NavItem[]; route: ShellProps['route'] }) {
  return (
    <nav className="sports-app__magazine-nav" aria-label="Primary">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__magazine-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SectionNav({ sections }: { sections: Section[] }) {
  // Scroll to an in-page anchor without touching the hash router. Plain
  // `href="#cover"` would clobber the route hash.
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
  return (
    <nav className="sports-magazine__sections" aria-label="In this issue">
      {sections.map(s => (
        <button
          key={s.id}
          type="button"
          className="sports-magazine__section-link"
          onClick={() => scrollTo(s.id)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  )
}

// ABOUTME: MagazineShell — a React component.
export function MagazineShell(props: ShellProps): ReactNode {
  const isHome = props.route.kind === 'home'
  const cover = useMemo(() => gameOfTheNight(), [])
  const ppgTop = useMemo(() => getStatLeaders('ppg', 1)[0], [])
  const ppgTeam = useMemo(
    () => (ppgTop ? getTeamById(ppgTop.teamId) : undefined),
    [ppgTop],
  )

  return (
    <div className={`sports-app sports-app--magazine${isHome ? ' is-cover' : ' is-article'}`}>
      <header className="sports-app__header sports-app__header--magazine">
        {props.brand}
        <MagazineNav nav={props.nav} route={props.route} />
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      {isHome ? (
        <main className="sports-app__main sports-app__main--magazine">
          <SectionNav sections={SECTIONS} />
          {cover && <MagazineCover game={cover} />}
          {ppgTop && <PullQuote player={ppgTop} team={ppgTeam} />}
          <Leaderboard />
          <InsideTheEast />
        </main>
      ) : (
        <main className="sports-app__main sports-app__main--magazine-article">
          {props.children}
        </main>
      )}
    </div>
  )
}

