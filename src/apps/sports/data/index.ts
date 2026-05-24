import type { Game, Player, Team, Conference, Position } from '../types'
import { TEAMS } from './teams'
import { PLAYERS } from './players'
import { GAMES, TODAY } from './games'

export { TEAMS, PLAYERS, GAMES, TODAY }

const teamById = new Map(TEAMS.map(t => [t.id, t]))
const teamBySlug = new Map(TEAMS.map(t => [t.slug, t]))
const playerById = new Map(PLAYERS.map(p => [p.id, p]))
const playerBySlug = new Map(PLAYERS.map(p => [p.slug, p]))
const gameById = new Map(GAMES.map(g => [g.id, g]))

export function getTeamById(id: string): Team | undefined {
  return teamById.get(id)
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teamBySlug.get(slug)
}

export function getPlayerById(id: string): Player | undefined {
  return playerById.get(id)
}

export function getPlayerBySlug(slug: string): Player | undefined {
  return playerBySlug.get(slug)
}

export function getGameById(id: string): Game | undefined {
  return gameById.get(id)
}

export function getPlayersForTeam(teamId: string): Player[] {
  return PLAYERS.filter(p => p.teamId === teamId)
}

export function getGamesForTeam(teamId: string): Game[] {
  return GAMES.filter(g => g.homeTeamId === teamId || g.awayTeamId === teamId)
}

export function getTeamsByConference(conference: Conference): Team[] {
  return TEAMS.filter(t => t.conference === conference)
}

export function getPlayersByPosition(position: Position): Player[] {
  return PLAYERS.filter(p => p.position === position)
}

export function getStandings(conference: Conference): Team[] {
  return TEAMS.filter(t => t.conference === conference).slice().sort((a, b) => {
    const aPct = a.wins / Math.max(1, a.wins + a.losses)
    const bPct = b.wins / Math.max(1, b.wins + b.losses)
    return bPct - aPct
  })
}

/**
 * Group games by ISO date in chronological order; useful for the
 * schedule view.
 */
export function groupGamesByDate(games: Game[]): { date: string; games: Game[] }[] {
  const buckets = new Map<string, Game[]>()
  for (const g of games) {
    const arr = buckets.get(g.date) ?? []
    arr.push(g)
    buckets.set(g.date, arr)
  }
  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, games]) => ({ date, games }))
}

export type StatKey = 'ppg' | 'rpg' | 'apg' | 'spg' | 'bpg'

export function getStatLeaders(stat: StatKey, count: number): Player[] {
  return PLAYERS.slice()
    .sort((a, b) => b.stats[stat] - a.stats[stat])
    .slice(0, count)
}
