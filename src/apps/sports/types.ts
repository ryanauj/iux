// ABOUTME: Domain types for the sports matchup app — conferences, divisions, and the records the views render.

// ABOUTME: A league conference: East or West.
export type Conference = 'East' | 'West'

// ABOUTME: One of the six NBA-style divisions teams belong to, used for standings grouping and display metadata.
export type Division =
  | 'Atlantic'
  | 'Central'
  | 'Southeast'
  | 'Northwest'
  | 'Pacific'
  | 'Southwest'

// ABOUTME: The five standard basketball positions a player can be assigned, displayed on roster and player-detail views.
export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C'

// ABOUTME: Lifecycle state of a game — drives score visibility, status badges, and "live" filtering across shells and the feed.
export type GameStatus = 'final' | 'scheduled' | 'live'

// ABOUTME: A franchise record holding identity (name, colors, arena), standings (wins, losses, streak, last10), and the per-game box-score averages (points, rebounds, assists, steals, blocks, turnovers, possessions) the matchup model prices.
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
  /**
   * Estimated possessions per game (pace). Combined with `pointsFor` this
   * yields the team's points-per-possession, the empirical anchor the matchup
   * lab uses to price every stat.
   */
  possessionsPerGame: number
  /** Record over the most recent 10 games, e.g. "7-3". */
  last10: string
  /** Win or loss streak, e.g. "W3" or "L2". */
  streak: string
}

// ABOUTME: Season averages for one player: the counting stats (ppg, rpg, apg, spg, bpg, minutesPerGame) and shooting percentages (fgPct, fg3Pct, ftPct) shown on player-detail and leaderboard views.
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

// ABOUTME: A player record with identity (name, jersey, position, age, experience), roster link (teamId), physical measurements, and their season PlayerStats used by leaderboard and comparison views.
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

// ABOUTME: A player's standout performance in one game — their id and a compact stat line like "32 PTS, 8 REB, 6 AST" — embedded in Game.topPerformers and rendered in box-score and feed views.
export interface GamePerformer {
  playerId: string
  /** Compact stat line like "32 PTS, 8 REB, 6 AST". */
  line: string
}

// ABOUTME: Home and away points for one quarter, stored in Game.quarterScores (4 entries for completed games) and rendered in the box-score quarter-by-quarter breakdown.
export interface QuarterScore {
  home: number
  away: number
}

// ABOUTME: A single game record: teams, date, status, optional live clock (quarter, timeRemaining), optional scores, optional quarter-by-quarter breakdown, and optional top-performer lines — the central entity all schedule, scoreboard, and feed views read.
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
