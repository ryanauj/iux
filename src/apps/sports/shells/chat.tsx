// ABOUTME: ChatShell — conversational shell that replaces the Home page with a keyword-driven chat interface; responses render inline entity cards (team, player, game, leaderboard, standings, side-by-side comparison) with click-through routing, and the scrollback log persists for the session across remounts.

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from '../../Link'
import {
  GAMES,
  PLAYERS,
  TEAMS,
  TODAY,
  getPlayerById,
  getPlayersForTeam,
  getStandings,
  getStatLeaders,
  getTeamById,
  type StatKey,
} from '../data'
import { formatDate, formatStat, winPct } from '../format'
import { sportsRoutes } from '../routes'
import type { Conference, Game, Player, Team } from '../types'
import type { NavItem, ShellProps } from '../layouts'

type Card =
  | { kind: 'team'; teamId: string }
  | { kind: 'player'; playerId: string }
  | { kind: 'game'; gameId: string }
  | { kind: 'leaderboard'; stat: StatKey; playerIds: string[] }
  | { kind: 'standings'; conference: Conference }
  | { kind: 'comparison'; playerIds: string[] }

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
  cards?: Card[]
  followups?: string[]
}

const SUGGESTIONS = [
  "tonight's games",
  'live games',
  'scoring leaders',
  'rebound leaders',
  'East standings',
  'compare Jokic & Embiid',
]

const STAT_LABELS: Record<StatKey, string> = {
  ppg: 'points per game',
  rpg: 'rebounds per game',
  apg: 'assists per game',
  spg: 'steals per game',
  bpg: 'blocks per game',
}

// Scrollback survives layout switches & remounts — the chat is the
// session's running thread, not a per-mount state. The greeting seeds
// the log on first import.
let SEQ = 1
const LOG: Message[] = [
  {
    id: SEQ++,
    role: 'bot',
    text: 'Welcome to the Hoops Hub. Ask about teams, players, games, or pick a suggestion below.',
    followups: SUGGESTIONS,
  },
]

function classifyStat(text: string): StatKey | null {
  if (/scor|points|\bppg\b/.test(text)) return 'ppg'
  if (/rebound|\brpg\b/.test(text)) return 'rpg'
  if (/assist|playmak|passer|\bapg\b/.test(text)) return 'apg'
  if (/steal|\bspg\b/.test(text)) return 'spg'
  if (/block|\bbpg\b/.test(text)) return 'bpg'
  return null
}

function findTeam(text: string): Team | undefined {
  return TEAMS.find(
    t =>
      text.includes(t.name.toLowerCase()) ||
      text.includes(t.city.toLowerCase()) ||
      new RegExp(`\\b${t.abbreviation.toLowerCase()}\\b`).test(text),
  )
}

function findPlayers(text: string, max: number): Player[] {
  const out: Player[] = []
  for (const p of PLAYERS) {
    const full = `${p.firstName} ${p.lastName}`.toLowerCase()
    if (text.includes(full) || text.includes(p.lastName.toLowerCase())) {
      if (!out.some(x => x.id === p.id)) out.push(p)
    }
    if (out.length >= max) break
  }
  return out
}

function answer(query: string): Message {
  const text = query.trim().toLowerCase()
  if (!text) {
    return { id: SEQ++, role: 'bot', text: 'Type a question or pick a suggestion below.', followups: SUGGESTIONS }
  }

  if (/tonight|today'?s?\s+games?|games?\s+(today|tonight)/.test(text)) {
    const todays = GAMES.filter(g => g.date === TODAY)
    return {
      id: SEQ++,
      role: 'bot',
      text: todays.length === 0
        ? `Nothing on ${formatDate(TODAY)}.`
        : `${todays.length} game${todays.length === 1 ? '' : 's'} on ${formatDate(TODAY)}.`,
      cards: todays.map(g => ({ kind: 'game' as const, gameId: g.id })),
      followups: ['live games', 'scoring leaders', 'East standings'],
    }
  }

  if (/\blive\b/.test(text)) {
    const live = GAMES.filter(g => g.status === 'live')
    return {
      id: SEQ++,
      role: 'bot',
      text: live.length === 0 ? 'No games are live right now.' : `${live.length} live now.`,
      cards: live.map(g => ({ kind: 'game' as const, gameId: g.id })),
      followups: ["tonight's games", 'scoring leaders'],
    }
  }

  if (/standings?/.test(text)) {
    const east = /east/.test(text)
    const west = /west/.test(text)
    if (east && !west) {
      return {
        id: SEQ++,
        role: 'bot',
        text: 'Eastern Conference standings.',
        cards: [{ kind: 'standings', conference: 'East' }],
        followups: ['West standings', 'scoring leaders'],
      }
    }
    if (west && !east) {
      return {
        id: SEQ++,
        role: 'bot',
        text: 'Western Conference standings.',
        cards: [{ kind: 'standings', conference: 'West' }],
        followups: ['East standings', 'scoring leaders'],
      }
    }
    return {
      id: SEQ++,
      role: 'bot',
      text: 'Both conferences, best record first.',
      cards: [
        { kind: 'standings', conference: 'East' },
        { kind: 'standings', conference: 'West' },
      ],
      followups: ["tonight's games", 'scoring leaders'],
    }
  }

  const stat = classifyStat(text)
  if (stat && /(leader|leaders|top|best)/.test(text)) {
    const top = getStatLeaders(stat, 5)
    return {
      id: SEQ++,
      role: 'bot',
      text: `Top 5 in ${STAT_LABELS[stat]}.`,
      cards: [{ kind: 'leaderboard', stat, playerIds: top.map(p => p.id) }],
      followups: stat === 'ppg'
        ? ['rebound leaders', 'assist leaders', "tonight's games"]
        : ['scoring leaders', 'assist leaders', "tonight's games"],
    }
  }

  if (/compare|\bvs\b|versus/.test(text)) {
    const players = findPlayers(text, 4)
    if (players.length >= 2) {
      return {
        id: SEQ++,
        role: 'bot',
        text: `Side-by-side: ${players.map(p => `${p.firstName} ${p.lastName}`).join(' vs ')}.`,
        cards: [{ kind: 'comparison', playerIds: players.map(p => p.id) }],
        followups: ['scoring leaders', "tonight's games", 'East standings'],
      }
    }
  }

  const team = findTeam(text)
  if (team) {
    if (/roster|players|lineup/.test(text)) {
      const roster = getPlayersForTeam(team.id)
      return {
        id: SEQ++,
        role: 'bot',
        text: `${team.city} ${team.name} roster — ${roster.length} player${roster.length === 1 ? '' : 's'}.`,
        cards: roster.map(p => ({ kind: 'player' as const, playerId: p.id })),
        followups: ['scoring leaders', `${team.conference} standings`, "tonight's games"],
      }
    }
    return {
      id: SEQ++,
      role: 'bot',
      text: `The ${team.city} ${team.name}.`,
      cards: [{ kind: 'team', teamId: team.id }],
      followups: [`${team.name} roster`, `${team.conference} standings`, "tonight's games"],
    }
  }

  const players = findPlayers(text, 1)
  if (players.length > 0) {
    const p = players[0]
    return {
      id: SEQ++,
      role: 'bot',
      text: `${p.firstName} ${p.lastName} — ${p.position}, #${p.jersey}.`,
      cards: [{ kind: 'player', playerId: p.id }],
      followups: ['scoring leaders', "tonight's games", 'East standings'],
    }
  }

  return {
    id: SEQ++,
    role: 'bot',
    text: `Nothing matched "${query}". Try a suggestion.`,
    followups: SUGGESTIONS,
  }
}

function TeamCardView({ team }: { team: Team }) {
  return (
    <Link to={sportsRoutes.teamDetail(team.slug)} className="sports-chat__entity" style={{ borderColor: team.primaryColor }}>
      <span className="sports-chat__entity-mark" style={{ backgroundColor: team.primaryColor }} aria-hidden="true">
        {team.abbreviation}
      </span>
      <span className="sports-chat__entity-body">
        <span className="sports-chat__entity-title">{team.city} {team.name}</span>
        <span className="sports-chat__entity-meta">
          {team.conference} · {team.wins}-{team.losses} · {team.streak} · {team.arena}
        </span>
      </span>
    </Link>
  )
}

function PlayerCardView({ player }: { player: Player }) {
  const team = getTeamById(player.teamId)
  const accent = team?.primaryColor ?? 'var(--color-content-secondary)'
  const initials = `${player.firstName[0] ?? ''}${player.lastName[0] ?? ''}`
  return (
    <Link to={sportsRoutes.playerDetail(player.slug)} className="sports-chat__entity" style={{ borderColor: accent }}>
      <span className="sports-chat__entity-mark" style={{ backgroundColor: accent }} aria-hidden="true">
        {initials}
      </span>
      <span className="sports-chat__entity-body">
        <span className="sports-chat__entity-title">{player.firstName} {player.lastName}</span>
        <span className="sports-chat__entity-meta">
          {player.position} · #{player.jersey} · {team?.abbreviation ?? '—'} · {formatStat(player.stats.ppg)} PPG
        </span>
      </span>
    </Link>
  )
}

function GameCardView({ game }: { game: Game }) {
  const home = getTeamById(game.homeTeamId)
  const away = getTeamById(game.awayTeamId)
  if (!home || !away) return null
  const status = game.status === 'live'
    ? `LIVE · Q${game.quarter ?? '?'} ${game.timeRemaining ?? ''}`.trim()
    : game.status === 'final'
      ? `Final · ${formatDate(game.date)}`
      : `Tip · ${formatDate(game.date)}`
  return (
    <Link to={sportsRoutes.gameDetail(game.id)} className="sports-chat__entity sports-chat__entity--game">
      <span className="sports-chat__game-status">{status}</span>
      <span className="sports-chat__game-row">
        <span className="sports-chat__game-mark" style={{ backgroundColor: away.primaryColor }}>{away.abbreviation}</span>
        <span className="sports-chat__game-name">{away.city} {away.name}</span>
        {typeof game.awayScore === 'number' && <span className="sports-chat__game-score">{game.awayScore}</span>}
      </span>
      <span className="sports-chat__game-row">
        <span className="sports-chat__game-mark" style={{ backgroundColor: home.primaryColor }}>{home.abbreviation}</span>
        <span className="sports-chat__game-name">{home.city} {home.name}</span>
        {typeof game.homeScore === 'number' && <span className="sports-chat__game-score">{game.homeScore}</span>}
      </span>
    </Link>
  )
}

function LeaderboardView({ stat, playerIds }: { stat: StatKey; playerIds: string[] }) {
  return (
    <div className="sports-chat__leaderboard" role="list">
      {playerIds.map((id, i) => {
        const p = getPlayerById(id)
        if (!p) return null
        return (
          <Link key={id} to={sportsRoutes.playerDetail(p.slug)} className="sports-chat__lb-row" role="listitem">
            <span className="sports-chat__lb-rank">#{i + 1}</span>
            <span className="sports-chat__lb-name">{p.firstName} {p.lastName}</span>
            <span className="sports-chat__lb-value">{formatStat(p.stats[stat])}</span>
          </Link>
        )
      })}
    </div>
  )
}

function StandingsView({ conference }: { conference: Conference }) {
  const teams = getStandings(conference)
  return (
    <div className="sports-chat__standings">
      <header className="sports-chat__standings-head">{conference} Conference</header>
      <ol className="sports-chat__standings-list">
        {teams.map((t, i) => (
          <li key={t.id} className="sports-chat__standings-row">
            <span className="sports-chat__standings-rank">{i + 1}</span>
            <Link to={sportsRoutes.teamDetail(t.slug)} className="sports-chat__standings-team">
              <span className="sports-chat__standings-mark" style={{ backgroundColor: t.primaryColor }} aria-hidden="true">
                {t.abbreviation}
              </span>
              <span className="sports-chat__standings-name">{t.city} {t.name}</span>
            </Link>
            <span className="sports-chat__standings-record">{t.wins}-{t.losses}</span>
            <span className="sports-chat__standings-pct">{winPct(t.wins, t.losses)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function ComparisonView({ playerIds }: { playerIds: string[] }) {
  const players = playerIds.map(id => getPlayerById(id)).filter((p): p is Player => Boolean(p))
  if (players.length === 0) return null
  const rows: { label: string; key: StatKey }[] = [
    { label: 'PPG', key: 'ppg' },
    { label: 'RPG', key: 'rpg' },
    { label: 'APG', key: 'apg' },
    { label: 'SPG', key: 'spg' },
    { label: 'BPG', key: 'bpg' },
  ]
  return (
    <div className="sports-chat__compare">
      <header className="sports-chat__compare-head">
        {players.map(p => {
          const team = getTeamById(p.teamId)
          return (
            <Link key={p.id} to={sportsRoutes.playerDetail(p.slug)} className="sports-chat__compare-name" style={{ borderColor: team?.primaryColor ?? 'transparent' }}>
              {p.firstName} {p.lastName}
              <span className="sports-chat__compare-team">{team?.abbreviation ?? '—'}</span>
            </Link>
          )
        })}
      </header>
      <table className="sports-chat__compare-table">
        <tbody>
          {rows.map(r => {
            const values = players.map(p => p.stats[r.key])
            const best = Math.max(...values)
            return (
              <tr key={r.key}>
                <th scope="row">{r.label}</th>
                {players.map((p, i) => (
                  <td key={p.id} className={values[i] === best ? 'is-best' : ''}>
                    {formatStat(values[i])}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function CardView({ card }: { card: Card }) {
  if (card.kind === 'team') {
    const t = getTeamById(card.teamId)
    return t ? <TeamCardView team={t} /> : null
  }
  if (card.kind === 'player') {
    const p = getPlayerById(card.playerId)
    return p ? <PlayerCardView player={p} /> : null
  }
  if (card.kind === 'game') {
    const g = GAMES.find(x => x.id === card.gameId)
    return g ? <GameCardView game={g} /> : null
  }
  if (card.kind === 'leaderboard') return <LeaderboardView stat={card.stat} playerIds={card.playerIds} />
  if (card.kind === 'standings') return <StandingsView conference={card.conference} />
  return <ComparisonView playerIds={card.playerIds} />
}

function MessageView({ message, onChip }: { message: Message; onChip: (q: string) => void }) {
  return (
    <li className={`sports-chat__msg sports-chat__msg--${message.role}`}>
      <div className="sports-chat__bubble">
        <p className="sports-chat__text">{message.text}</p>
        {message.cards && message.cards.length > 0 && (
          <div className="sports-chat__cards">
            {message.cards.map((c, i) => <CardView key={i} card={c} />)}
          </div>
        )}
        {message.followups && message.followups.length > 0 && (
          <div className="sports-chat__followups" role="group" aria-label="Suggested follow-ups">
            {message.followups.map(f => (
              <button key={f} type="button" className="sports-chat__chip" onClick={() => onChip(f)}>
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

function ChatSurface(): ReactNode {
  const [, force] = useState(0)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef<HTMLOListElement>(null)
  const ask = useCallback((q: string) => {
    const trimmed = q.trim()
    if (!trimmed) return
    LOG.push({ id: SEQ++, role: 'user', text: trimmed })
    LOG.push(answer(trimmed))
    force(n => n + 1)
  }, [])

  // Scroll to bottom whenever the log changes so the newest reply is in view.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [LOG.length])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(draft)
    setDraft('')
  }

  const reset = () => {
    LOG.length = 1 // keep only the greeting
    force(n => n + 1)
  }

  return (
    <div className="sports-chat">
      <ol ref={scrollRef} className="sports-chat__log" aria-live="polite" aria-label="Chat transcript">
        {LOG.map(m => <MessageView key={m.id} message={m} onChip={ask} />)}
      </ol>
      <form className="sports-chat__composer" onSubmit={onSubmit}>
        <div className="sports-chat__quickchips" role="group" aria-label="Quick prompts">
          {SUGGESTIONS.slice(0, 5).map(s => (
            <button
              key={s}
              type="button"
              className="sports-chat__chip sports-chat__chip--quick"
              onClick={() => ask(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="sports-chat__input-row">
          <input
            type="text"
            className="sports-chat__input"
            placeholder="Ask about teams, players, games…"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            aria-label="Ask the Hoops Hub"
          />
          <button type="submit" className="sports-chat__send" disabled={!draft.trim()}>
            Send
          </button>
          <button type="button" className="sports-chat__reset" onClick={reset} aria-label="Reset conversation">
            ✕
          </button>
        </div>
      </form>
    </div>
  )
}

function ChatNav({ nav, route }: { nav: NavItem[]; route: ShellProps['route'] }) {
  return (
    <nav className="sports-app__chat-nav" aria-label="Primary">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__chat-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

// ABOUTME: Conversational shell that renders the chat surface on the Home route and a back-link + detail page on every other route; the shared module-level LOG survives layout switches so the thread is never lost.
/**
 * On the Home route renders ChatSurface (the scrolling log + composer); on
 * other routes collapses to a detail layout with a "← Back to chat" crumb
 * above props.children. The chat state (LOG, SEQ) is held at module scope,
 * not component state, so remounting the shell after a layout switch does not
 * reset the conversation.
 */
export function ChatShell(props: ShellProps): ReactNode {
  const isHome = props.route.kind === 'home'
  return (
    <div className={`sports-app sports-app--chat${isHome ? ' is-conversation' : ' is-detail'}`}>
      <header className="sports-app__header sports-app__header--chat">
        {props.brand}
        <ChatNav nav={props.nav} route={props.route} />
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      {isHome ? (
        <main className="sports-app__main sports-app__main--chat">
          <ChatSurface />
        </main>
      ) : (
        <main className="sports-app__main sports-app__main--chat-detail">
          <Link to={sportsRoutes.home()} className="sports-chat__crumb">
            ← Back to chat
          </Link>
          {props.children}
        </main>
      )}
    </div>
  )
}
