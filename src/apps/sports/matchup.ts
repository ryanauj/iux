/**
 * Matchup analysis model — turning non-scoring box-score stats into points.
 *
 * Points already show up directly in `pointsFor`. The interesting question
 * for a matchup is how much the *non-scoring* stats — rebounds, assists,
 * steals, blocks, turnovers — are worth in points, and how that tilts an
 * expected head-to-head.
 *
 * The model is deliberately simple and transparent: every box-score event is
 * assigned a marginal point value (`COEFFICIENTS`), grounded in the league's
 * roughly-1.1 points-per-possession economy. A steal flips a possession (you
 * gain one, the opponent loses one) so it is worth about a full possession; a
 * rebound is worth a fraction of a possession because many are uncontested; a
 * turnover is a possession handed away, so it carries a negative weight.
 *
 * Two framings are exposed, because "how many points does rebounding add"
 * has two honest answers:
 *
 *   1. RELATIVE — points added or removed *versus a league-average team*.
 *      Each stat's value is `(team − leagueAverage) × coefficient`. This is
 *      what the Bridge, Battle, Dumbbell, and Ledger views use, because the
 *      question is comparative: who gains the edge, and by how much.
 *
 *   2. ABSOLUTE — the raw points a stat generates, `stat × coefficient`,
 *      with turnovers reframed as "ball security" (points NOT lost). This is
 *      what the Radar view uses, because a radar reads best when every axis
 *      points the same way (bigger is better) and starts from zero.
 *
 * None of these are official NBA metrics; they are a teachable estimate. The
 * coefficients live in one place so the whole screen re-derives if you tune
 * them.
 */
import type { Team } from './types'
import { TEAMS } from './data'

export type StatKey = 'reb' | 'ast' | 'stl' | 'blk' | 'tov'

export interface StatDef {
  key: StatKey
  /** Short axis/column label, e.g. "REB". */
  short: string
  /** Full label, e.g. "Rebounds". */
  label: string
  /** Marginal points per event. Negative for stats that cost points. */
  coefficient: number
  /** Field on `Team` that carries the per-game average for this stat. */
  field: keyof Pick<
    Team,
    | 'reboundsPerGame'
    | 'assistsPerGame'
    | 'stealsPerGame'
    | 'blocksPerGame'
    | 'turnoversPerGame'
  >
}

/**
 * Marginal point value of each non-scoring event, in points. Tuned to the
 * league's ~1.1 points-per-possession economy:
 *   - steal: gains your possession AND denies one — near a full possession.
 *   - block: ends a possession, but ~half are recovered by the offense.
 *   - rebound: a fraction of a possession; many are uncontested.
 *   - assist: credits the passing that produces efficient shots.
 *   - turnover: a possession handed away — a full negative.
 */
export const COEFFICIENTS: Record<StatKey, number> = {
  reb: 0.35,
  ast: 0.30,
  stl: 1.05,
  blk: 0.65,
  tov: -1.05,
}

export const STAT_DEFS: StatDef[] = [
  { key: 'reb', short: 'REB', label: 'Rebounds', coefficient: COEFFICIENTS.reb, field: 'reboundsPerGame' },
  { key: 'ast', short: 'AST', label: 'Assists', coefficient: COEFFICIENTS.ast, field: 'assistsPerGame' },
  { key: 'stl', short: 'STL', label: 'Steals', coefficient: COEFFICIENTS.stl, field: 'stealsPerGame' },
  { key: 'blk', short: 'BLK', label: 'Blocks', coefficient: COEFFICIENTS.blk, field: 'blocksPerGame' },
  { key: 'tov', short: 'TOV', label: 'Turnovers', coefficient: COEFFICIENTS.tov, field: 'turnoversPerGame' },
]

/** League-average per-game value for every modelled stat. */
export const LEAGUE_AVERAGES: Record<StatKey, number> = (() => {
  const out = {} as Record<StatKey, number>
  for (const def of STAT_DEFS) {
    const sum = TEAMS.reduce((acc, t) => acc + (t[def.field] as number), 0)
    out[def.key] = sum / TEAMS.length
  }
  return out
})()

export interface StatContribution {
  def: StatDef
  /** The team's per-game value for this stat. */
  value: number
  /** League average for this stat. */
  leagueAverage: number
  /** Deviation from league average (value − leagueAverage). */
  delta: number
  /**
   * RELATIVE framing: points added/removed versus a league-average team.
   * `delta × coefficient`. Positive always means "helps this team".
   */
  relativePoints: number
  /**
   * ABSOLUTE framing: raw points the stat generates. For turnovers this is
   * reframed as "ball security" — points NOT lost relative to a high-turnover
   * baseline — so that, like every other axis, bigger is better.
   */
  absolutePoints: number
}

export interface TeamMatchup {
  team: Team
  contributions: StatContribution[]
  /** Sum of `relativePoints` — net hidden points vs a league-average team. */
  netRelativePoints: number
}

/**
 * A turnover baseline used for the ABSOLUTE framing: the league's highest
 * turnover team. Ball-security points = (baseline − turnovers) × |coeff|, so
 * the cleanest ball-handlers score highest and nobody goes negative.
 */
const TOV_BASELINE = Math.max(...TEAMS.map(t => t.turnoversPerGame))

function buildContribution(team: Team, def: StatDef): StatContribution {
  const value = team[def.field] as number
  const leagueAverage = LEAGUE_AVERAGES[def.key]
  const delta = value - leagueAverage
  const relativePoints = delta * def.coefficient
  const absolutePoints =
    def.key === 'tov'
      ? (TOV_BASELINE - value) * Math.abs(def.coefficient)
      : value * def.coefficient
  return { def, value, leagueAverage, delta, relativePoints, absolutePoints }
}

export function analyzeTeam(team: Team): TeamMatchup {
  const contributions = STAT_DEFS.map(def => buildContribution(team, def))
  const netRelativePoints = contributions.reduce((acc, c) => acc + c.relativePoints, 0)
  return { team, contributions, netRelativePoints }
}

export interface StatEdge {
  def: StatDef
  /** Team A's relative points for this stat. */
  aPoints: number
  /** Team B's relative points for this stat. */
  bPoints: number
  /** aPoints − bPoints. Positive favours A, negative favours B. */
  edge: number
}

export interface MatchupAnalysis {
  a: TeamMatchup
  b: TeamMatchup
  edges: StatEdge[]
  /** Sum of per-stat edges — projected non-scoring margin, A's perspective. */
  netEdge: number
}

/** Build the full two-team analysis used by every view on the matchup screen. */
export function analyzeMatchup(teamA: Team, teamB: Team): MatchupAnalysis {
  const a = analyzeTeam(teamA)
  const b = analyzeTeam(teamB)
  const edges: StatEdge[] = STAT_DEFS.map((def, i) => {
    const aPoints = a.contributions[i].relativePoints
    const bPoints = b.contributions[i].relativePoints
    return { def, aPoints, bPoints, edge: aPoints - bPoints }
  })
  const netEdge = edges.reduce((acc, e) => acc + e.edge, 0)
  return { a, b, edges, netEdge }
}

/** "+2.3" / "-1.4" / "0.0" — signed, one decimal, for point values. */
export function formatPoints(n: number): string {
  const fixed = Math.abs(n) < 0.05 ? '0.0' : n.toFixed(1)
  return n > 0.05 ? `+${fixed}` : fixed
}

/** Unsigned one-decimal, for raw stat values. */
export function formatValue(n: number): string {
  return n.toFixed(1)
}
