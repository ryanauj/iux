export type Conference = 'East' | 'West'

export type Division =
  | 'Atlantic'
  | 'Central'
  | 'Southeast'
  | 'Northwest'
  | 'Pacific'
  | 'Southwest'

export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C'

export type GameStatus = 'final' | 'scheduled' | 'live'

export interface Team {
  id: string
  slug: string
  city: string
  name: string
  abbreviation: string
  conference: Conference
  division: Division
  primaryColor: string
  secondaryColor: string
  founded: number
  arena: string
  headCoach: string
  wins: number
  losses: number
  /** Average points scored per game. */
  pointsFor: number
  /** Average points allowed per game. */
  pointsAgainst: number
  /** Team rebounds per game (offensive + defensive). */
  reboundsPerGame: number
  /** Team assists per game. */
  assistsPerGame: number
  /** Team steals per game. */
  stealsPerGame: number
  /** Team blocks per game. */
  blocksPerGame: number
  /** Team turnovers per game. */
  turnoversPerGame: number
  /** Record over the most recent 10 games, e.g. "7-3". */
  last10: string
  /** Win or loss streak, e.g. "W3" or "L2". */
  streak: string
}

export interface PlayerStats {
  gamesPlayed: number
  minutesPerGame: number
  ppg: number
  rpg: number
  apg: number
  spg: number
  bpg: number
  /** Field goal percentage, 0–1. */
  fgPct: number
  /** Three-point percentage, 0–1. */
  fg3Pct: number
  /** Free throw percentage, 0–1. */
  ftPct: number
}

export interface Player {
  id: string
  slug: string
  firstName: string
  lastName: string
  jersey: number
  position: Position
  /** Height in inches; render via `formatHeight(player.heightInches)`. */
  heightInches: number
  weightLbs: number
  age: number
  experience: number
  teamId: string
  stats: PlayerStats
}

export interface GamePerformer {
  playerId: string
  /** Compact stat line like "32 PTS, 8 REB, 6 AST". */
  line: string
}

export interface QuarterScore {
  home: number
  away: number
}

export interface Game {
  id: string
  /** ISO date string with no time component, e.g. "2026-05-21". */
  date: string
  homeTeamId: string
  awayTeamId: string
  status: GameStatus
  /** Defined when status is `final` or `live`. */
  homeScore?: number
  /** Defined when status is `final` or `live`. */
  awayScore?: number
  /** Defined when status is `live`. */
  quarter?: number
  /** Defined when status is `live`, e.g. "5:23". */
  timeRemaining?: string
  /** Defined when status is `final`; 4 entries, one per quarter. */
  quarterScores?: QuarterScore[]
  /** Defined when status is `final`. */
  topPerformers?: GamePerformer[]
}
