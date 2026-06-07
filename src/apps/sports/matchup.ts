// ABOUTME: Matchup analysis model — turning non-scoring box-score stats into points.

/**
 * Matchup analysis model — turning non-scoring box-score stats into points.
 *
 * Points already show up directly in `pointsFor`. The interesting question
 * for a matchup is how much the *non-scoring* stats — rebounds, assists,
 * steals, blocks, turnovers — are worth in points, and how that tilts an
 * expected head-to-head.
 *
 * WHERE THE RATES COME FROM
 * -------------------------
 * Each stat's points-per-event rate is *derived from the team data*, not
 * guessed. It is the product of two parts:
 *
 *   rate = LEAGUE_PPP × possessionWeight
 *
 *   - LEAGUE_PPP is the league's points per possession, computed straight from
 *     the teams: each team's `pointsFor / possessionsPerGame`, averaged. With
 *     the seeded data this is ≈ 1.17.
 *   - possessionWeight is how much of a possession one event is worth, from
 *     basketball first principles (documented per stat in `STAT_DEFS`). A
 *     turnover forfeits ~0.9 of a possession; a steal recovers ~0.9; a block
 *     ends ~0.55 (the rest are rebounded back); a rebound secures ~0.30; an
 *     assist stands in for ~0.25 of a possession's worth of shot quality.
 *
 * Why derive it this way instead of regressing points on the box score? With
 * only ten teams a naïve regression is wildly unstable — on this data it even
 * prices steals *negatively*, because the scrappy teams that gamble for steals
 * also score less. The possession model keeps every sign correct and every
 * number explainable, while still anchoring the one free scalar (PPP) to the
 * actual team metrics. The rates are also configurable in the UI, so callers
 * can override any of them; everything downstream re-derives.
 *
 * Two framings are exposed, because "how many points does rebounding add" has
 * two honest answers:
 *
 *   1. RELATIVE — points added or removed *versus a league-average team*.
 *      `(team − leagueAverage) × rate`. Used by every comparative view.
 *   2. ABSOLUTE — the raw points a stat generates, `stat × rate`, with
 *      turnovers reframed as "ball security" so bigger is always better.
 *
 * None of these are official NBA metrics; they are a teachable estimate.
 */
import type { Team } from './types'
import { TEAMS } from './data'

// ABOUTME: The five non-scoring box-score stats the matchup model prices: rebounds, assists, steals, blocks, and turnovers.
export type StatKey = 'reb' | 'ast' | 'stl' | 'blk' | 'tov'

// ABOUTME: Metadata for one modelled stat: its key, display labels, the Team field it reads, its possession weight, and the human-readable rationale shown in the pricing panel.
export interface StatDef {
  key: StatKey
  /** Short axis/column label, e.g. "REB". */
  short: string
  /** Full label, e.g. "Rebounds". */
  label: string
  /** Field on `Team` that carries the per-game average for this stat. */
  field: keyof Pick<
    Team,
    | 'reboundsPerGame'
    | 'assistsPerGame'
    | 'stealsPerGame'
    | 'blocksPerGame'
    | 'turnoversPerGame'
  >
  /** Possessions one event is worth (negative for stats that cost you). */
  possessionWeight: number
  /** Plain-language reason for the weight, shown in the pricing panel. */
  rationale: string
}

// ABOUTME: Ordered array of the five StatDef descriptors; drives both the pricing panel UI and every loop that computes contributions across the modelled stats.
export const STAT_DEFS: StatDef[] = [
  {
    key: 'reb', short: 'REB', label: 'Rebounds', field: 'reboundsPerGame',
    possessionWeight: 0.30,
    rationale: 'Securing the ball ends or extends a possession, but many boards are uncontested — worth about 0.30 of a possession.',
  },
  {
    key: 'ast', short: 'AST', label: 'Assists', field: 'assistsPerGame',
    possessionWeight: 0.25,
    rationale: 'Assists stand in for the shot quality good ball movement creates — roughly a quarter-possession of added value.',
  },
  {
    key: 'stl', short: 'STL', label: 'Steals', field: 'stealsPerGame',
    possessionWeight: 0.90,
    rationale: 'A steal is a live-ball takeaway, usually in transition; it recovers about 0.90 of a possession.',
  },
  {
    key: 'blk', short: 'BLK', label: 'Blocks', field: 'blocksPerGame',
    possessionWeight: 0.55,
    rationale: 'A block ends a possession, but ~45% are rebounded by the offense for another try — net ~0.55.',
  },
  {
    key: 'tov', short: 'TOV', label: 'Turnovers', field: 'turnoversPerGame',
    possessionWeight: -0.90,
    rationale: 'A turnover forfeits a possession worth roughly a point, less the few that would have missed anyway — about −0.90.',
  },
]

// ABOUTME: League points per possession, computed from the teams: the average of each team's `pointsFor / possessionsPerGame`.
/**
 * League points per possession, computed from the teams: the average of each
 * team's `pointsFor / possessionsPerGame`. This is the single empirical anchor
 * every rate is scaled by.
 */
export const LEAGUE_PPP: number =
  TEAMS.reduce((acc, t) => acc + t.pointsFor / t.possessionsPerGame, 0) / TEAMS.length

const round2 = (n: number) => Math.round(n * 100) / 100

// ABOUTME: Data-derived default rate for each stat: `LEAGUE_PPP × possessionWeight`.
/** Data-derived default rate for each stat: `LEAGUE_PPP × possessionWeight`. */
export const DEFAULT_RATES: Record<StatKey, number> = STAT_DEFS.reduce((out, def) => {
  out[def.key] = round2(LEAGUE_PPP * def.possessionWeight)
  return out
}, {} as Record<StatKey, number>)

// ABOUTME: League-average per-game value for every modelled stat.
/** League-average per-game value for every modelled stat. */
export const LEAGUE_AVERAGES: Record<StatKey, number> = (() => {
  const out = {} as Record<StatKey, number>
  for (const def of STAT_DEFS) {
    const sum = TEAMS.reduce((acc, t) => acc + (t[def.field] as number), 0)
    out[def.key] = sum / TEAMS.length
  }
  return out
})()

// ABOUTME: League-average points scored per game — the baseline a projection builds on.
/** League-average points scored per game — the baseline a projection builds on. */
export const LEAGUE_BASELINE_POINTS: number =
  TEAMS.reduce((acc, t) => acc + t.pointsFor, 0) / TEAMS.length

// ABOUTME: One team's contribution from a single stat: the raw value, league average, delta, the rate used, and both relative-points and absolute-points framings — the full per-cell data the matchup views render.
export interface StatContribution {
  def: StatDef
  /** Points-per-event rate actually used for this contribution. */
  rate: number
  /** The team's per-game value for this stat. */
  value: number
  /** League average for this stat. */
  leagueAverage: number
  /** Deviation from league average (value − leagueAverage). */
  delta: number
  /** RELATIVE framing: `delta × rate`. Positive always helps this team. */
  relativePoints: number
  /** ABSOLUTE framing: raw points generated; turnovers reframed as ball security. */
  absolutePoints: number
}

// ABOUTME: One team's full matchup analysis: its StatContribution array, the net hidden-points sum versus a league-average opponent, and the resulting projected score.
export interface TeamMatchup {
  team: Team
  contributions: StatContribution[]
  /** Sum of `relativePoints` — net hidden points vs a league-average team. */
  netRelativePoints: number
  /**
   * Projected points from the non-scoring profile: the league baseline plus
   * this team's net hidden points. A league-average team projects to exactly
   * the baseline; the deviations push it up or down.
   */
  projectedPoints: number
}

/** Turnover baseline for the ABSOLUTE framing: the league's highest-turnover team. */
const TOV_BASELINE = Math.max(...TEAMS.map(t => t.turnoversPerGame))

function buildContribution(team: Team, def: StatDef, rate: number): StatContribution {
  const value = team[def.field] as number
  const leagueAverage = LEAGUE_AVERAGES[def.key]
  const delta = value - leagueAverage
  const relativePoints = delta * rate
  const absolutePoints =
    def.key === 'tov'
      ? (TOV_BASELINE - value) * Math.abs(rate)
      : value * rate
  return { def, rate, value, leagueAverage, delta, relativePoints, absolutePoints }
}

// ABOUTME: Builds a TeamMatchup for one team given a rate map — computes each stat's contribution, sums the net relative points, and projects a score above the league baseline.
export function analyzeTeam(team: Team, rates: Record<StatKey, number>): TeamMatchup {
  const contributions = STAT_DEFS.map(def => buildContribution(team, def, rates[def.key]))
  const netRelativePoints = contributions.reduce((acc, c) => acc + c.relativePoints, 0)
  const projectedPoints = LEAGUE_BASELINE_POINTS + netRelativePoints
  return { team, contributions, netRelativePoints, projectedPoints }
}

// ABOUTME: Head-to-head advantage for one stat: team A's and B's relative points plus the signed edge (A minus B), used to populate the per-row winner indicators in the matchup comparison table.
export interface StatEdge {
  def: StatDef
  /** Team A's relative points for this stat. */
  aPoints: number
  /** Team B's relative points for this stat. */
  bPoints: number
  /** aPoints − bPoints. Positive favours A, negative favours B. */
  edge: number
}

// ABOUTME: Complete two-team matchup result returned by analyzeMatchup: both TeamMatchup objects, per-stat StatEdge array, total net edge, baseline, the rate map used, and normalisation maxima for bar-chart scaling.
export interface MatchupAnalysis {
  a: TeamMatchup
  b: TeamMatchup
  edges: StatEdge[]
  /** Sum of per-stat edges — projected non-scoring margin, A's perspective. */
  netEdge: number
  /** League-average points both projections build on. */
  baseline: number
  /** The rate map this analysis was built with. */
  rates: Record<StatKey, number>
  /** Largest absolute single-stat point contribution across both teams. */
  maxAbsPoints: number
  /** Largest absolute single-stat deviation (in stat units) across both teams. */
  maxAbsDelta: number
}

// ABOUTME: Build the full two-team analysis used by every view on the matchup screen.
/** Build the full two-team analysis used by every view on the matchup screen. */
export function analyzeMatchup(
  teamA: Team,
  teamB: Team,
  rates: Record<StatKey, number> = DEFAULT_RATES,
): MatchupAnalysis {
  const a = analyzeTeam(teamA, rates)
  const b = analyzeTeam(teamB, rates)
  const edges: StatEdge[] = STAT_DEFS.map((def, i) => {
    const aPoints = a.contributions[i].relativePoints
    const bPoints = b.contributions[i].relativePoints
    return { def, aPoints, bPoints, edge: aPoints - bPoints }
  })
  const netEdge = edges.reduce((acc, e) => acc + e.edge, 0)
  const allContribs = [...a.contributions, ...b.contributions]
  const maxAbsPoints = Math.max(0.1, ...allContribs.map(c => Math.abs(c.relativePoints)))
  const maxAbsDelta = Math.max(0.1, ...allContribs.map(c => Math.abs(c.delta)))
  return { a, b, edges, netEdge, baseline: LEAGUE_BASELINE_POINTS, rates, maxAbsPoints, maxAbsDelta }
}

// ABOUTME: "+2.3" / "-1.4" / "0.0" — signed, one decimal, for point values.
/** "+2.3" / "-1.4" / "0.0" — signed, one decimal, for point values. */
export function formatPoints(n: number): string {
  const fixed = Math.abs(n) < 0.05 ? '0.0' : n.toFixed(1)
  return n > 0.05 ? `+${fixed}` : fixed
}

// ABOUTME: Unsigned one-decimal, for raw stat values.
/** Unsigned one-decimal, for raw stat values. */
export function formatValue(n: number): string {
  return n.toFixed(1)
}

// ABOUTME: Formats a number as a fixed two-decimal rate string, e.g. 0.35 or -1.06.
/** Two-decimal rate, e.g. 0.35 or -1.06. */
export function formatRate(n: number): string {
  return n.toFixed(2)
}
