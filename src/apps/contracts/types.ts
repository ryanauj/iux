// ABOUTME: Domain types for the Cap School app.

/**
 * Domain types for the Cap School app. Everything here describes the
 * *rules* of NBA contracts (thresholds, exceptions, tax brackets) rather
 * than live league data, so the shapes are tuned for explanation: each
 * record carries the human-readable copy the pages render alongside the
 * raw number.
 */

/** A single dollar threshold in the cap system for one league year. */
// ABOUTME: A single dollar threshold in the cap system for one league year.
export interface CapSeason {
  /** Display label for the league year, e.g. "2025–26". */
  label: string
  /** Salary cap — the soft baseline most exceptions are measured against. */
  salaryCap: number
  /** Minimum team salary (90% of the cap) a team must reach. */
  minimumTeamSalary: number
  /** Luxury-tax line — spending past it triggers the tax. */
  taxLine: number
  /** First apron — disables several tools; certain moves hard-cap a team here. */
  firstApron: number
  /** Second apron — the harshest limits; strips the tools to add outside talent. */
  secondApron: number
}

// ABOUTME: The four (well, five) horizontal lines a team's payroll is measured against.
/** The four (well, five) horizontal lines a team's payroll is measured against. */
export interface CapThreshold {
  id: string
  label: string
  amount: number
  /** One-line gloss/gain unlocked or restricted at this line. */
  blurb: string
  /** Drives the accent colour: where on the "danger ramp" this line sits. */
  intent: 'success' | 'neutral' | 'warning' | 'danger'
}

// ABOUTME: A maximum-salary tier keyed off years of service.
/** A maximum-salary tier keyed off years of service. */
export interface MaxTier {
  id: string
  label: string
  /** Years of service that unlock the tier, e.g. "0–6 years". */
  service: string
  /** Share of the cap this tier is worth (0–1). */
  capShare: number
  /** First-year max salary in dollars for the active season. */
  firstYear: number
  note: string
}

// ABOUTME: A salary-cap exception — a tool teams use to sign players over the cap.
/** A salary-cap exception — a tool teams use to sign players over the cap. */
export interface Exception {
  id: string
  name: string
  shortName: string
  /** Dollar value for the active season, when the exception is a fixed amount. */
  amount?: number
  /** Max contract length the exception can offer, in years. */
  maxYears: number
  summary: string
  /** Whether the first/second apron switches this tool off. */
  apronLimited: 'none' | 'first' | 'second'
}

// ABOUTME: One incremental luxury-tax bracket.
/** One incremental luxury-tax bracket. */
export interface TaxBracket {
  /** Lower edge of the bracket, measured in dollars over the tax line. */
  from: number
  /** Upper edge, or null for the open-ended top bracket. */
  to: number | null
  /** Standard (non-repeater) marginal rate, dollars of tax per dollar over. */
  standardRate: number
  /** Repeater marginal rate (taxpayer in 3 of the prior 4 seasons). */
  repeaterRate: number
}

// ABOUTME: A contract year inside a single deal, for the anatomy walkthrough.
/** A contract year inside a single deal, for the anatomy walkthrough. */
export interface ContractYear {
  label: string
  salary: number
  /** How firm the money is. */
  guarantee: 'full' | 'partial' | 'team-option' | 'player-option' | 'non'
}

// ABOUTME: One roster line on the worked team cap sheet.
/** One roster line on the worked team cap sheet. */
export interface RosterSpot {
  id: string
  player: string
  role: string
  salary: number
  /** Which tool put this salary on the books. */
  via: string
}

// ABOUTME: A single asset moving in a trade — a contract (with salary) or a pick.
/** A single asset moving in a trade — a contract (with salary) or a pick. */
export interface TradePiece {
  label: string
  /** Salary in dollars; omitted for draft picks and other non-salary assets. */
  salary?: number
}

// ABOUTME: One team's side of the worked multi-team trade.
/** One team's side of the worked multi-team trade. */
export interface TradeParty {
  id: string
  team: string
  /** Short cap-situation descriptor, e.g. "Over the first apron". */
  situation: string
  /** Drives the card accent: where this team sits on the danger ramp. */
  intent: 'success' | 'warning' | 'danger'
  out: TradePiece[]
  in: TradePiece[]
  /** Plain-English reason this team is part of the deal. */
  why: string
  /** Why this team's side of the salary math is legal. */
  rule: string
}
