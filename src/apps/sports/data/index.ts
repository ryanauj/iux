// ABOUTME: Data access layer for the sports demo: re-exports TEAMS, PLAYERS, GAMES, and TODAY from their source modules, then provides O(1) lookup helpers (by id/slug), filtered list helpers, `getStandings`, `groupGamesByDate`, and `getStatLeaders`.

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

// ABOUTME: O(1) team lookup by id from the module-level Map built over TEAMS.
export function getTeamById(id: string): Team | undefined {
  return teamById.get(id)
}

// ABOUTME: O(1) team lookup by URL slug (e.g. "celtics") from the module-level Map built over TEAMS.
export function getTeamBySlug(slug: string): Team | undefined {
  return teamBySlug.get(slug)
}

// ABOUTME: O(1) player lookup by id from the module-level Map built over PLAYERS.
export function getPlayerById(id: string): Player | undefined {
  return playerById.get(id)
}

// ABOUTME: O(1) player lookup by URL slug (e.g. "jayson-tatum") from the module-level Map built over PLAYERS.
export function getPlayerBySlug(slug: string): Player | undefined {
  return playerBySlug.get(slug)
}

// ABOUTME: O(1) game lookup by id (e.g. "game-001") from the module-level Map built over GAMES.
export function getGameById(id: string): Game | undefined {
  return gameById.get(id)
}

// ABOUTME: Returns every player whose `teamId` matches, used by TeamDetail's Roster tab and PlayerDetail's recent-games query.
export function getPlayersForTeam(teamId: string): Player[] {
  return PLAYERS.filter(p => p.teamId === teamId)
}

// ABOUTME: Returns every game where the team appears as home or away, used by TeamDetail's Schedule tab and PlayerDetail's recent-games ScoreCard grid.
export function getGamesForTeam(teamId: string): Game[] {
  return GAMES.filter(g => g.homeTeamId === teamId || g.awayTeamId === teamId)
}

// ABOUTME: Returns all teams in the given conference; used by the Matchup analysis and standings helpers.
export function getTeamsByConference(conference: Conference): Team[] {
  return TEAMS.filter(t => t.conference === conference)
}

// ABOUTME: Returns all players at the given position; used to support position-level filtering in the Players page.
export function getPlayersByPosition(position: Position): Player[] {
  return PLAYERS.filter(p => p.position === position)
}

// ABOUTME: Returns teams in the given conference sorted by winning percentage (descending); used by Standings page and the Home standings snapshot.
export function getStandings(conference: Conference): Team[] {
  return TEAMS.filter(t => t.conference === conference).slice().sort((a, b) => {
    const aPct = a.wins / Math.max(1, a.wins + a.losses)
    const bPct = b.wins / Math.max(1, b.wins + b.losses)
    return bPct - aPct
  })
}

// ABOUTME: Group games by ISO date in chronological order; useful for the schedule view.
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

// ABOUTME: Union of the five per-game stat keys available for sorting and leader-board queries across the player roster.
export type StatKey = 'ppg' | 'rpg' | 'apg' | 'spg' | 'bpg'

// ABOUTME: Returns the top `count` players sorted descending by the given stat; used by Home's stat-leader tiles.
export function getStatLeaders(stat: StatKey, count: number): Player[] {
  return PLAYERS.slice()
    .sort((a, b) => b.stats[stat] - a.stats[stat])
    .slice(0, count)
}
