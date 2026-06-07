// ABOUTME: DeckShell — card-swipe shell that replaces the Home page with three full-bleed stacks (teams alphabetically, players by PPG, games by date); arrow keys, touch swipes, and on-screen controls flip cards and switch stacks, with position persisted in `?deck=<stack>.<index>`.

import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { Link } from '../../Link'
import { replaceParams, useHashLocation } from '../../router'
import {
  GAMES,
  PLAYERS,
  TEAMS,
  getPlayerById,
  getTeamById,
} from '../data'
import { formatDate, formatStat, winPct } from '../format'
import { sportsRoutes } from '../routes'
import type { Game, Player, Team } from '../types'
import type { ShellProps, NavItem } from '../layouts'

type Stack = 'teams' | 'players' | 'games'

const STACKS: { id: Stack; label: string; pluralized: string }[] = [
  { id: 'teams', label: 'Teams', pluralized: 'teams' },
  { id: 'players', label: 'Players', pluralized: 'players' },
  { id: 'games', label: 'Games', pluralized: 'games' },
]

// `?deck=<stack>.<index>` is sticky. A single combined key (instead of
// `stack=...&index=...`) keeps the global sticky-params list minimal —
// `index` and `stack` are generic names that would collide with other
// shells if added at the top level.
function parseDeck(raw: string | null): { stack: Stack; index: number } {
  if (!raw) return { stack: 'teams', index: 0 }
  const [stackRaw, indexRaw] = raw.split('.')
  const stack: Stack = STACKS.some(s => s.id === stackRaw)
    ? (stackRaw as Stack)
    : 'teams'
  const parsed = Number(indexRaw)
  const index = Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0
  return { stack, index }
}

function serializeDeck(stack: Stack, index: number): string | undefined {
  // Omit the param when it would match the canonical first card —
  // keeps the URL clean before the user has interacted with the deck.
  if (stack === 'teams' && index === 0) return undefined
  return `${stack}.${index}`
}

// Stack data, sorted in a way that makes "next card" feel intentional
// (alphabetical teams, top scorers first, most recent games first).
const TEAMS_SORTED = TEAMS.slice().sort((a, b) => a.city.localeCompare(b.city))
const PLAYERS_SORTED = PLAYERS.slice().sort((a, b) => b.stats.ppg - a.stats.ppg)
const GAMES_SORTED = GAMES.slice().sort((a, b) => b.date.localeCompare(a.date))

function stackLength(stack: Stack): number {
  if (stack === 'teams') return TEAMS_SORTED.length
  if (stack === 'players') return PLAYERS_SORTED.length
  return GAMES_SORTED.length
}

function clampIndex(stack: Stack, index: number): number {
  const len = stackLength(stack)
  if (len === 0) return 0
  if (index < 0) return 0
  if (index >= len) return len - 1
  return index
}

function TeamCard({ team }: { team: Team }) {
  const roster = PLAYERS_SORTED.filter(p => p.teamId === team.id).slice(0, 3)
  const recent = GAMES_SORTED.filter(
    g => g.status === 'final' && (g.homeTeamId === team.id || g.awayTeamId === team.id),
  ).slice(0, 1)[0]
  return (
    <article
      className="sports-deck__card sports-deck__card--team"
      style={{ borderColor: team.primaryColor }}
    >
      <header className="sports-deck__card-head">
        <span
          className="sports-deck__crest"
          style={{ backgroundColor: team.primaryColor }}
          aria-hidden="true"
        >
          {team.abbreviation}
        </span>
        <div className="sports-deck__card-titles">
          <span className="sports-deck__kicker">{team.conference} · {team.division}</span>
          <h2 className="sports-deck__title">{team.city} {team.name}</h2>
          <span className="sports-deck__subtitle">{team.arena} · {team.headCoach}</span>
        </div>
      </header>
      <div className="sports-deck__stats">
        <Stat label="Record" value={`${team.wins}-${team.losses}`} />
        <Stat label="Win%" value={winPct(team.wins, team.losses)} />
        <Stat label="PF" value={formatStat(team.pointsFor)} />
        <Stat label="PA" value={formatStat(team.pointsAgainst)} />
        <Stat label="L10" value={team.last10} />
        <Stat label="Streak" value={team.streak} />
      </div>
      <section className="sports-deck__card-section">
        <h3 className="sports-deck__section-title">Top scorers</h3>
        <ul className="sports-deck__rows">
          {roster.length === 0 && <li className="sports-deck__row-empty">No roster on file.</li>}
          {roster.map(p => (
            <li key={p.id} className="sports-deck__row">
              <Link to={sportsRoutes.playerDetail(p.slug)} className="sports-deck__row-link">
                <span className="sports-deck__row-name">{p.firstName} {p.lastName}</span>
                <span className="sports-deck__row-meta">{p.position} · {formatStat(p.stats.ppg)} PPG</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {recent && (
        <section className="sports-deck__card-section">
          <h3 className="sports-deck__section-title">Most recent final</h3>
          <RecentGameRow game={recent} />
        </section>
      )}
      <footer className="sports-deck__card-foot">
        <Link to={sportsRoutes.teamDetail(team.slug)} className="sports-deck__open">
          Open full team page →
        </Link>
      </footer>
    </article>
  )
}

function PlayerCard({ player }: { player: Player }) {
  const team = getTeamById(player.teamId)
  const initials = `${player.firstName[0] ?? ''}${player.lastName[0] ?? ''}`
  const accent = team?.primaryColor ?? 'var(--color-content-secondary)'
  return (
    <article
      className="sports-deck__card sports-deck__card--player"
      style={{ borderColor: accent }}
    >
      <header className="sports-deck__card-head">
        <span
          className="sports-deck__crest"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        >
          {initials}
        </span>
        <div className="sports-deck__card-titles">
          <span className="sports-deck__kicker">#{player.jersey} · {player.position}</span>
          <h2 className="sports-deck__title">{player.firstName} {player.lastName}</h2>
          <span className="sports-deck__subtitle">
            {team ? (
              <Link to={sportsRoutes.teamDetail(team.slug)} className="sports-deck__subtitle-link">
                {team.city} {team.name}
              </Link>
            ) : (
              'Free agent'
            )}
          </span>
        </div>
      </header>
      <div className="sports-deck__stats">
        <Stat label="PPG" value={formatStat(player.stats.ppg)} />
        <Stat label="RPG" value={formatStat(player.stats.rpg)} />
        <Stat label="APG" value={formatStat(player.stats.apg)} />
        <Stat label="SPG" value={formatStat(player.stats.spg)} />
        <Stat label="BPG" value={formatStat(player.stats.bpg)} />
        <Stat label="MPG" value={formatStat(player.stats.minutesPerGame)} />
      </div>
      <footer className="sports-deck__card-foot">
        <Link to={sportsRoutes.playerDetail(player.slug)} className="sports-deck__open">
          Open full player page →
        </Link>
      </footer>
    </article>
  )
}

function GameCard({ game }: { game: Game }) {
  const home = getTeamById(game.homeTeamId)
  const away = getTeamById(game.awayTeamId)
  if (!home || !away) return null
  const statusText = game.status === 'live'
    ? `LIVE · Q${game.quarter ?? '?'} ${game.timeRemaining ?? ''}`
    : game.status === 'final'
      ? `FINAL · ${formatDate(game.date)}`
      : `TIP-OFF · ${formatDate(game.date)}`
  return (
    <article className="sports-deck__card sports-deck__card--game">
      <header className="sports-deck__card-head sports-deck__card-head--game">
        <span className="sports-deck__kicker">{statusText}</span>
      </header>
      <div className="sports-deck__matchup">
        {[away, home].map(t => {
          const score = t === away ? game.awayScore : game.homeScore
          return (
            <Link
              key={t.id}
              to={sportsRoutes.teamDetail(t.slug)}
              className="sports-deck__matchup-row"
              style={{ borderColor: t.primaryColor }}
            >
              <span
                className="sports-deck__mark"
                style={{ backgroundColor: t.primaryColor }}
                aria-hidden="true"
              >
                {t.abbreviation}
              </span>
              <span className="sports-deck__matchup-name">
                <span className="sports-deck__matchup-city">{t.city}</span>
                <span className="sports-deck__matchup-team">{t.name}</span>
              </span>
              {typeof score === 'number' && (
                <span className="sports-deck__matchup-score">{score}</span>
              )}
            </Link>
          )
        })}
      </div>
      {game.topPerformers && game.topPerformers.length > 0 && (
        <section className="sports-deck__card-section">
          <h3 className="sports-deck__section-title">Top performers</h3>
          <ul className="sports-deck__rows">
            {game.topPerformers.map(tp => {
              const p = getPlayerById(tp.playerId)
              if (!p) return null
              return (
                <li key={tp.playerId} className="sports-deck__row">
                  <Link to={sportsRoutes.playerDetail(p.slug)} className="sports-deck__row-link">
                    <span className="sports-deck__row-name">{p.firstName} {p.lastName}</span>
                    <span className="sports-deck__row-meta">{tp.line}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
      <footer className="sports-deck__card-foot">
        <Link to={sportsRoutes.gameDetail(game.id)} className="sports-deck__open">
          Open full game page →
        </Link>
      </footer>
    </article>
  )
}

function RecentGameRow({ game }: { game: Game }) {
  const home = getTeamById(game.homeTeamId)
  const away = getTeamById(game.awayTeamId)
  if (!home || !away) return null
  return (
    <Link to={sportsRoutes.gameDetail(game.id)} className="sports-deck__row-link">
      <span className="sports-deck__row-name">
        {away.abbreviation} {game.awayScore} <span aria-hidden="true">@</span> {home.abbreviation} {game.homeScore}
      </span>
      <span className="sports-deck__row-meta">{formatDate(game.date)}</span>
    </Link>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="sports-deck__stat">
      <span className="sports-deck__stat-label">{label}</span>
      <span className="sports-deck__stat-value">{value}</span>
    </div>
  )
}

function CardFor({ stack, index }: { stack: Stack; index: number }) {
  if (stack === 'teams') {
    const team = TEAMS_SORTED[index]
    return team ? <TeamCard team={team} /> : null
  }
  if (stack === 'players') {
    const player = PLAYERS_SORTED[index]
    return player ? <PlayerCard player={player} /> : null
  }
  const game = GAMES_SORTED[index]
  return game ? <GameCard game={game} /> : null
}

function DeckNav({ nav, route }: { nav: NavItem[]; route: ShellProps['route'] }) {
  return (
    <nav className="sports-app__deck-nav" aria-label="Primary">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__deck-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

interface DeckProps {
  stack: Stack
  index: number
  onStackChange: (next: Stack) => void
  onIndexChange: (next: number) => void
}

function DeckSurface({ stack, index, onStackChange, onIndexChange }: DeckProps): ReactNode {
  const len = stackLength(stack)
  const safeIndex = clampIndex(stack, index)

  const next = useCallback(() => {
    if (len === 0) return
    onIndexChange((safeIndex + 1) % len)
  }, [len, safeIndex, onIndexChange])

  const prev = useCallback(() => {
    if (len === 0) return
    onIndexChange((safeIndex - 1 + len) % len)
  }, [len, safeIndex, onIndexChange])

  const stackOrder = STACKS.map(s => s.id)
  const cycleStack = useCallback((dir: 1 | -1) => {
    const at = stackOrder.indexOf(stack)
    const nextIdx = (at + dir + stackOrder.length) % stackOrder.length
    onStackChange(stackOrder[nextIdx])
  }, [stack, stackOrder, onStackChange])

  // Capture arrow keys at the document level so the deck stays drivable
  // even when focus has wandered off the card. We intentionally let
  // text inputs keep their own arrow behavior.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
        if (target.isContentEditable) return
      }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      else if (e.key === 'ArrowDown') { e.preventDefault(); cycleStack(1) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cycleStack(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, cycleStack])

  // Touch swipe — horizontal advances the card, vertical switches stacks.
  // 40px threshold + dominant-axis check keeps incidental scrolls from
  // counting as a swipe.
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current
    if (!start) return
    touchStart.current = null
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    const ax = Math.abs(dx)
    const ay = Math.abs(dy)
    if (ax < 40 && ay < 40) return
    if (ax > ay) {
      if (dx < 0) next()
      else prev()
    } else {
      if (dy < 0) cycleStack(1)
      else cycleStack(-1)
    }
  }

  return (
    <div className="sports-deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="sports-deck__stacks" role="tablist" aria-label="Deck stack">
        {STACKS.map(s => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === stack}
            className={`sports-deck__stack${s.id === stack ? ' is-active' : ''}`}
            onClick={() => onStackChange(s.id)}
          >
            {s.label}
            <span className="sports-deck__stack-count">{stackLength(s.id)}</span>
          </button>
        ))}
      </div>
      <div className="sports-deck__stage" aria-live="polite">
        {len === 0 ? (
          <div className="sports-deck__empty">No {STACKS.find(s => s.id === stack)?.pluralized} on file.</div>
        ) : (
          <CardFor key={`${stack}-${safeIndex}`} stack={stack} index={safeIndex} />
        )}
      </div>
      <div className="sports-deck__controls">
        <button
          type="button"
          className="sports-deck__arrow sports-deck__arrow--prev"
          onClick={prev}
          disabled={len === 0}
          aria-label="Previous card"
        >
          ←
        </button>
        <span className="sports-deck__counter" aria-live="polite">
          {len === 0 ? '0 of 0' : `${safeIndex + 1} of ${len}`}
        </span>
        <button
          type="button"
          className="sports-deck__arrow sports-deck__arrow--next"
          onClick={next}
          disabled={len === 0}
          aria-label="Next card"
        >
          →
        </button>
      </div>
      <p className="sports-deck__hint">
        Arrow keys to flip · up / down to change stacks · swipe on touch
      </p>
    </div>
  )
}

function DeckBreadcrumb({ stack, index }: { stack: Stack; index: number }) {
  const len = stackLength(stack)
  const safe = clampIndex(stack, index)
  return (
    <div className="sports-deck__crumb" role="navigation" aria-label="Deck breadcrumb">
      <Link to={sportsRoutes.home()} className="sports-deck__crumb-back">
        ← Back to deck
      </Link>
      <span className="sports-deck__crumb-meta">
        {STACKS.find(s => s.id === stack)?.label} · {len === 0 ? '0 of 0' : `${safe + 1} of ${len}`}
      </span>
    </div>
  )
}

// ABOUTME: Shell that mounts DeckSurface (swipeable cards across teams / players / games stacks) on the Home route and a breadcrumb + detail page on other routes; stack and card index are kept in the `?deck=` URL param.
/**
 * On the Home route renders DeckSurface with full keyboard (←/→/↑/↓) and
 * touch-swipe navigation. On non-Home routes renders a DeckBreadcrumb with a
 * "Back to deck" link above props.children so the user can return to the exact
 * card they left. Switching stacks always resets to card 0.
 */
export function DeckShell(props: ShellProps): ReactNode {
  const location = useHashLocation()
  const { stack, index } = useMemo(
    () => parseDeck(location.params.get('deck')),
    [location.params],
  )

  const writeDeck = useCallback((nextStack: Stack, nextIndex: number) => {
    replaceParams({ deck: serializeDeck(nextStack, clampIndex(nextStack, nextIndex)) })
  }, [])

  const onStackChange = useCallback((next: Stack) => {
    // Switching stacks resets to the first card so the new stack starts
    // somewhere meaningful (alphabetical / top scorer / most recent).
    writeDeck(next, 0)
  }, [writeDeck])

  const onIndexChange = useCallback((next: number) => {
    writeDeck(stack, next)
  }, [stack, writeDeck])

  const isHome = props.route.kind === 'home'

  return (
    <div className={`sports-app sports-app--deck${isHome ? ' is-stage' : ' is-detail'}`}>
      <header className="sports-app__header sports-app__header--deck">
        {props.brand}
        <DeckNav nav={props.nav} route={props.route} />
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      {isHome ? (
        <main className="sports-app__main sports-app__main--deck">
          <DeckSurface
            stack={stack}
            index={index}
            onStackChange={onStackChange}
            onIndexChange={onIndexChange}
          />
        </main>
      ) : (
        <main className="sports-app__main sports-app__main--deck-detail">
          <DeckBreadcrumb stack={stack} index={index} />
          {props.children}
        </main>
      )}
    </div>
  )
}
