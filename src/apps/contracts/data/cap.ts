import type {
  CapSeason,
  CapThreshold,
  ContractYear,
  Exception,
  MaxTier,
  RosterSpot,
  TaxBracket,
  TradeParty,
} from '../types'

/**
 * All figures below are the official 2025–26 NBA cap numbers (salary cap
 * $154.647M and the tax / apron lines that key off it) plus the standard
 * exception amounts and luxury-tax brackets from the 2023 CBA. They are
 * used here purely to *teach the mechanics*; every page that shows a dollar
 * amount also surfaces the "educational, simplified" disclaimer. Rounding
 * and the small projection wrinkles in the real max formula are smoothed
 * over on purpose so the arithmetic stays followable.
 */
export const SEASON: CapSeason = {
  label: '2025–26',
  salaryCap: 154_647_000,
  minimumTeamSalary: 139_182_300,
  taxLine: 187_895_000,
  firstApron: 195_945_000,
  secondApron: 207_824_000,
}

/** Last season's cap, used to show year-over-year growth on the overview. */
export const PRIOR_CAP = 140_588_000

/**
 * The ladder of lines a payroll climbs. Ordered low → high; the pages
 * render them bottom-to-top so "higher payroll = higher up the ladder"
 * reads the way money does.
 */
export const THRESHOLDS: CapThreshold[] = [
  {
    id: 'floor',
    label: 'Salary floor',
    amount: SEASON.minimumTeamSalary,
    blurb: 'Teams must spend at least 90% of the cap or pay the shortfall to their players.',
    intent: 'success',
  },
  {
    id: 'cap',
    label: 'Salary cap',
    amount: SEASON.salaryCap,
    blurb: 'The soft baseline. Most teams operate above it using exceptions.',
    intent: 'neutral',
  },
  {
    id: 'tax',
    label: 'Luxury-tax line',
    amount: SEASON.taxLine,
    blurb: 'Spend past here and every extra dollar is taxed on a rising scale.',
    intent: 'warning',
  },
  {
    id: 'apron1',
    label: 'First apron',
    amount: SEASON.firstApron,
    blurb: 'Disables the bigger mid-level, sign-and-trades in, and aggregating salaries in trades.',
    intent: 'danger',
  },
  {
    id: 'apron2',
    label: 'Second apron',
    amount: SEASON.secondApron,
    blurb: "The hard ceiling. No mid-level at all, frozen future picks, and you can't combine salaries in trades.",
    intent: 'danger',
  },
]

/** Max-salary tiers for the active season (25% / 30% / 35% of the cap). */
export const MAX_TIERS: MaxTier[] = [
  {
    id: 'tier25',
    label: '25% max',
    service: '0–6 years',
    capShare: 0.25,
    firstYear: 38_661_750,
    note: 'Young stars on their first big deal start here.',
  },
  {
    id: 'tier30',
    label: '30% max',
    service: '7–9 years',
    capShare: 0.3,
    firstYear: 46_394_100,
    note: 'Players in their prime who have put in the service time.',
  },
  {
    id: 'tier35',
    label: '35% max',
    service: '10+ years',
    capShare: 0.35,
    firstYear: 54_126_450,
    note: 'Decade-plus veterans — the same 35% the supermax unlocks before year ten.',
  },
]

/**
 * The supermax (Designated Veteran) lets a 35%-eligible player who hits
 * the awards criteria re-sign with their own team for the full 35% even
 * before 10 years — but only with the team that drafted them.
 */
export const SUPERMAX_NOTE =
  'A player with the service time for the 30% tier who makes an All-NBA team, wins MVP, or wins Defensive Player of the Year can open at the 35% supermax tier instead — but only by re-signing with the team that drafted him (or traded for him on his rookie deal).'

/** Salary-cap exceptions, ordered roughly largest → smallest. */
export const EXCEPTIONS: Exception[] = [
  {
    id: 'bird',
    name: 'Bird rights (Qualifying Veteran)',
    shortName: 'Bird',
    maxYears: 5,
    summary:
      'Earned after 3 seasons without changing teams as a free agent. Lets a team re-sign its own player for up to the max with 8% annual raises — even while over the cap. The tool that lets a team keep the stars it drafts.',
    apronLimited: 'none',
  },
  {
    id: 'early-bird',
    name: 'Early Bird rights',
    shortName: 'Early Bird',
    maxYears: 4,
    summary:
      'After 2 seasons with a team. Re-sign for up to ~175% of the prior salary or 105% of the league average, whichever is greater.',
    apronLimited: 'none',
  },
  {
    id: 'non-bird',
    name: 'Non-Bird rights',
    shortName: 'Non-Bird',
    maxYears: 4,
    summary:
      'The fallback for a player with under 2 years on a team. Re-sign for up to 120% of the prior salary with 5% raises.',
    apronLimited: 'none',
  },
  {
    id: 'mle-nt',
    name: 'Non-taxpayer mid-level',
    shortName: 'Full MLE',
    amount: 14_104_000,
    maxYears: 4,
    summary:
      'The big mid-level. Available to teams below the first apron to sign any free agent. Using it hard-caps the team at the first apron for the season.',
    apronLimited: 'first',
  },
  {
    id: 'mle-tax',
    name: 'Taxpayer mid-level',
    shortName: 'Tax MLE',
    amount: 5_685_000,
    maxYears: 2,
    summary:
      'A smaller mid-level for tax teams between the first and second apron. Shorter and cheaper than the full MLE.',
    apronLimited: 'second',
  },
  {
    id: 'mle-room',
    name: 'Room exception',
    shortName: 'Room MLE',
    amount: 8_781_000,
    maxYears: 3,
    summary:
      'Only for teams that go under the cap and use up their room. A small exception to round out the roster afterward.',
    apronLimited: 'none',
  },
  {
    id: 'bae',
    name: 'Bi-annual exception',
    shortName: 'BAE',
    amount: 5_134_000,
    maxYears: 2,
    summary:
      'A small exception usable every other year by teams under the first apron. Cannot be used in back-to-back seasons.',
    apronLimited: 'first',
  },
  {
    id: 'min',
    name: 'Veteran / rookie minimum',
    shortName: 'Minimum',
    maxYears: 2,
    summary:
      'Every team can sign minimum-salary contracts regardless of cap status. The amount scales with years of service; the league reimburses part of a veteran minimum, so an experienced player costs the team barely more than a younger one.',
    apronLimited: 'none',
  },
]

/**
 * Standard and repeater luxury-tax brackets. Rates are dollars of tax per
 * dollar spent inside the bracket; the top bracket repeats, climbing
 * $0.50 for every additional $5M (standard) and $1.00 (repeater).
 */
export const TAX_BRACKETS: TaxBracket[] = [
  { from: 0, to: 5_000_000, standardRate: 1.5, repeaterRate: 2.5 },
  { from: 5_000_000, to: 10_000_000, standardRate: 1.75, repeaterRate: 2.75 },
  { from: 10_000_000, to: 15_000_000, standardRate: 2.5, repeaterRate: 3.5 },
  { from: 15_000_000, to: 20_000_000, standardRate: 3.25, repeaterRate: 4.25 },
  { from: 20_000_000, to: null, standardRate: 3.75, repeaterRate: 4.75 },
]

/**
 * Worked single contract for the anatomy page: a 4-year veteran extension
 * re-signed with Bird rights (8% raises off a $30M starting salary), with
 * the final year a player option. Shows raises, guarantees, and options
 * in one deal.
 */
export const SAMPLE_CONTRACT: ContractYear[] = [
  { label: 'Year 1', salary: 30_000_000, guarantee: 'full' },
  { label: 'Year 2', salary: 32_400_000, guarantee: 'full' },
  { label: 'Year 3', salary: 34_800_000, guarantee: 'full' },
  { label: 'Year 4', salary: 37_200_000, guarantee: 'player-option' },
]

export const SAMPLE_CONTRACT_RAISE = 0.08
export const SAMPLE_CONTRACT_BASE = 30_000_000

/**
 * Worked team cap sheet — a fictional contender ("Harbor City") built to
 * sit between the first and second apron so the thresholds all come into
 * play. Salaries are illustrative but each is tagged with the tool that
 * put it on the books.
 */
export const SAMPLE_TEAM_NAME = 'Harbor City Foghorns'

export const SAMPLE_ROSTER: RosterSpot[] = [
  { id: 'r1', player: 'Franchise wing', role: '35% max', salary: 52_000_000, via: 'Bird (re-signed)' },
  { id: 'r2', player: 'All-Star guard', role: '30% max', salary: 38_500_000, via: 'Bird (re-signed)' },
  { id: 'r3', player: 'Veteran forward', role: 'Starter', salary: 30_000_000, via: 'Trade' },
  { id: 'r4', player: 'Two-way big', role: 'Starter', salary: 24_000_000, via: 'Bird (re-signed)' },
  { id: 'r5', player: 'Combo wing', role: 'Rotation', salary: 14_104_000, via: 'Non-taxpayer MLE' },
  { id: 'r6', player: '3&D specialist', role: 'Rotation', salary: 12_500_000, via: 'Early Bird' },
  { id: 'r7', player: 'Backup guard', role: 'Rotation', salary: 9_000_000, via: 'Sign-and-trade' },
  { id: 'r8', player: 'Stretch four', role: 'Rotation', salary: 8_000_000, via: 'Bird (re-signed)' },
  { id: 'r9', player: 'Lottery rookie', role: 'Development', salary: 7_000_000, via: 'Rookie scale' },
  { id: 'r10', player: 'Sophomore wing', role: 'Development', salary: 5_500_000, via: 'Rookie scale' },
  { id: 'r11', player: 'Veteran guard', role: 'Bench', salary: 3_300_000, via: 'Minimum' },
  { id: 'r12', player: 'Veteran center', role: 'Bench', salary: 2_100_000, via: 'Minimum' },
]

/** Total of the worked roster — recomputed rather than hard-coded. */
export function rosterTotal(roster: RosterSpot[] = SAMPLE_ROSTER): number {
  return roster.reduce((sum, spot) => sum + spot.salary, 0)
}

/**
 * Worked three-team trade for the Trades chapter. A contender over the first
 * apron lands a $34M star; it has to send out matching salary by bundling two
 * contracts, but the rebuilder only wants one of them — so a third team with
 * cap space absorbs the other for a pick. Numbers are illustrative but the
 * salary math each team has to satisfy is real.
 */
export const TRADE_STAR_SALARY = 34_000_000

export const SAMPLE_TRADE: TradeParty[] = [
  {
    id: 'contender',
    team: 'The Contender',
    situation: 'Over the first apron',
    intent: 'danger',
    out: [
      { label: 'Veteran wing', salary: 22_000_000 },
      { label: 'Backup big', salary: 13_500_000 },
      { label: '2027 first-round pick' },
      { label: '2030 second-round pick' },
    ],
    in: [{ label: 'All-NBA forward', salary: TRADE_STAR_SALARY }],
    why: "Wants the star. But it's over the first apron, so it can't take back a single dollar more than it sends — and it has no one player big enough to match a $34M salary on its own.",
    rule: 'Sends out $35.5M to take in $34.0M. Legal: an apron team must send out at least as much as it brings back.',
  },
  {
    id: 'rebuilder',
    team: 'The Rebuilder',
    situation: 'Tearing it down',
    intent: 'success',
    out: [{ label: 'All-NBA forward', salary: TRADE_STAR_SALARY }],
    in: [
      { label: 'Veteran wing', salary: 22_000_000 },
      { label: '2027 first-round pick' },
    ],
    why: 'Happy to move the star for a useful wing and a first-round pick — but has no interest in the contender’s aging backup big.',
    rule: 'Sends out $34.0M, takes in $22.0M. Always legal: taking back less than you send never breaks the matching rule.',
  },
  {
    id: 'caproom',
    team: 'The Cap-Space Team',
    situation: 'Under the cap, room to spare',
    intent: 'warning',
    out: [],
    in: [
      { label: 'Backup big', salary: 13_500_000 },
      { label: '2030 second-round pick' },
    ],
    why: 'The fixer. It has open cap space and no need to match anything, so it soaks up the backup big the rebuilder refused — and pockets a second-round pick for the favor.',
    rule: 'Absorbs $13.5M straight into cap space. No matching needed when you have the room to fit a salary outright.',
  },
]

/**
 * Computes the standard or repeater luxury-tax bill for a given payroll,
 * walking the incremental brackets. Returns both the total and the
 * per-bracket breakdown so the Waterfall can show the climb.
 */
export interface TaxBreakdownStep {
  label: string
  overageInBracket: number
  rate: number
  tax: number
}

export function computeTax(
  payroll: number,
  mode: 'standard' | 'repeater' = 'standard',
): { total: number; overage: number; steps: TaxBreakdownStep[] } {
  const overage = Math.max(0, payroll - SEASON.taxLine)
  const steps: TaxBreakdownStep[] = []
  let total = 0
  for (const bracket of TAX_BRACKETS) {
    if (overage <= bracket.from) break
    const top = bracket.to ?? overage
    const inBracket = Math.min(overage, top) - bracket.from
    if (inBracket <= 0) continue
    const rate = mode === 'repeater' ? bracket.repeaterRate : bracket.standardRate
    const tax = inBracket * rate
    total += tax
    const toLabel = bracket.to ? `$${(bracket.to / 1_000_000).toFixed(0)}M` : '+'
    steps.push({
      label: `$${(bracket.from / 1_000_000).toFixed(0)}M–${toLabel} over`,
      overageInBracket: inBracket,
      rate,
      tax,
    })
  }
  return { total, overage, steps }
}
