import { Tabs } from '../../../components/Tabs/Tabs'
import { Select } from '../../../components/Select/Select'
import { Table, type TableColumn } from '../../../components/Table/Table'
import { Waterfall, type WaterfallStep } from '../../../components/Waterfall/Waterfall'
import { Lollipop, type LollipopDatum } from '../../../components/Lollipop/Lollipop'
import { Radar } from '../../../components/Radar/Radar'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { sportsRoutes } from '../routes'
import { navigate } from '../../router'
import { TEAMS, getTeamBySlug } from '../data'
import {
  analyzeMatchup,
  COEFFICIENTS,
  LEAGUE_AVERAGES,
  STAT_DEFS,
  formatPoints,
  formatValue,
  type MatchupAnalysis,
} from '../matchup'
import type { Team } from '../types'

interface MatchupProps {
  aSlug?: string
  bSlug?: string
}

const DEFAULT_A = 'celtics'
const DEFAULT_B = 'nuggets'

const TEAM_OPTIONS = TEAMS.map(t => ({ value: t.slug, label: `${t.city} ${t.name}` }))

export function Matchup({ aSlug, bSlug }: MatchupProps) {
  // Resolve to real teams, falling back to a default pairing. If both slugs
  // collapse to the same team, nudge B to a different one so the comparison
  // always has two sides.
  const teamA = getTeamBySlug(aSlug ?? '') ?? getTeamBySlug(DEFAULT_A) ?? TEAMS[0]
  let teamB = getTeamBySlug(bSlug ?? '') ?? getTeamBySlug(DEFAULT_B) ?? TEAMS[1]
  if (teamB.id === teamA.id) {
    teamB = TEAMS.find(t => t.id !== teamA.id) ?? teamB
  }

  const analysis = analyzeMatchup(teamA, teamB)

  const goTo = (a: string, b: string) => navigate(sportsRoutes.matchup(a, b))
  const onPickA = (slug: string) => goTo(slug, teamB.slug)
  const onPickB = (slug: string) => goTo(teamA.slug, slug)

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', to: sportsRoutes.home() },
          { label: 'Matchup' },
        ]}
      />

      <h1 className="sports-page__title">Matchup lab</h1>
      <p className="sports-page__subtitle">
        How much are rebounds, assists, steals, blocks, and turnovers worth in
        points? Pick two teams and see the non-scoring edge five ways.
      </p>

      <div className="matchup__pickers">
        <div className="matchup__picker matchup__picker--a">
          <span className="matchup__picker-dot" style={{ backgroundColor: teamA.primaryColor }} aria-hidden="true" />
          <Select
            variant="native"
            label="Team A"
            value={teamA.slug}
            options={TEAM_OPTIONS}
            onChange={onPickA}
          />
        </div>
        <span className="matchup__vs" aria-hidden="true">vs</span>
        <div className="matchup__picker matchup__picker--b">
          <span className="matchup__picker-dot" style={{ backgroundColor: teamB.primaryColor }} aria-hidden="true" />
          <Select
            variant="native"
            label="Team B"
            value={teamB.slug}
            options={TEAM_OPTIONS}
            onChange={onPickB}
          />
        </div>
      </div>

      <Summary analysis={analysis} teamA={teamA} teamB={teamB} />

      <Tabs
        variant="basic"
        ariaLabel="Matchup views"
        tabs={[
          { id: 'bridge', label: 'Points bridge' },
          { id: 'battle', label: 'Category battle' },
          { id: 'dumbbell', label: 'Head-to-head' },
          { id: 'radar', label: 'Two-way radar' },
          { id: 'ledger', label: 'Points ledger' },
        ]}
        renderPanel={id => {
          switch (id) {
            case 'bridge': return <BridgeView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'battle': return <BattleView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'dumbbell': return <DumbbellView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'radar': return <RadarView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'ledger': return <LedgerView analysis={analysis} teamA={teamA} teamB={teamB} />
            default: return null
          }
        }}
      />

      <ModelNote />
    </>
  )
}

interface ViewProps {
  analysis: MatchupAnalysis
  teamA: Team
  teamB: Team
}

/** Headline: net non-scoring edge and who it favours. */
function Summary({ analysis, teamA, teamB }: ViewProps) {
  const { netEdge, a, b } = analysis
  const favored = netEdge >= 0 ? teamA : teamB
  const magnitude = Math.abs(netEdge)
  return (
    <section className="matchup__summary" aria-label="Matchup summary">
      <div className="matchup__summary-team">
        <span className="matchup__summary-name" style={{ color: teamA.primaryColor }}>{teamA.abbreviation}</span>
        <span className="matchup__summary-metric">{formatPoints(a.netRelativePoints)}</span>
        <span className="matchup__summary-caption">hidden pts vs avg</span>
      </div>
      <div className="matchup__summary-center">
        <span className="matchup__summary-edge-label">Non-scoring edge</span>
        <span className="matchup__summary-edge">
          {magnitude < 0.05 ? 'Even' : `${favored.abbreviation} +${magnitude.toFixed(1)}`}
        </span>
        <span className="matchup__summary-caption">projected margin from REB · AST · STL · BLK · TOV</span>
      </div>
      <div className="matchup__summary-team matchup__summary-team--right">
        <span className="matchup__summary-name" style={{ color: teamB.primaryColor }}>{teamB.abbreviation}</span>
        <span className="matchup__summary-metric">{formatPoints(b.netRelativePoints)}</span>
        <span className="matchup__summary-caption">hidden pts vs avg</span>
      </div>
    </section>
  )
}

/**
 * VIEW 1 — Points bridge. A waterfall that starts at zero and stacks each
 * stat's edge (A − B) into a running total, landing on the net non-scoring
 * margin. Reads as a story: where the edge is won and given back.
 */
function BridgeView({ analysis, teamA, teamB }: ViewProps) {
  const steps: WaterfallStep[] = [
    ...analysis.edges.map(e => ({ key: e.def.key, label: e.def.short, value: e.edge })),
    { key: 'net', label: 'Net', value: 0, subtotal: true },
  ]
  return (
    <ViewFrame
      title="Where the edge accumulates"
      caption={`Each bar is ${teamA.abbreviation}'s point value minus ${teamB.abbreviation}'s for that stat. Up favours ${teamA.abbreviation}, down favours ${teamB.abbreviation}; the final bar is the net edge.`}
    >
      <div className="matchup__chart-scroll">
        <Waterfall variant="subtotals" steps={steps} width={560} height={300} formatValue={formatPoints} />
      </div>
    </ViewFrame>
  )
}

/**
 * VIEW 2 — Category battle. A back-to-back (population-pyramid) bar chart:
 * each team's points-vs-average for a stat mirror out from a shared centre.
 * Bars that help the team are saturated; bars that hurt are muted, so you can
 * read each team's full profile and who wins each row at a glance.
 */
function BattleView({ analysis, teamA, teamB }: ViewProps) {
  const maxAbs = Math.max(
    0.1,
    ...analysis.edges.flatMap(e => [Math.abs(e.aPoints), Math.abs(e.bPoints)]),
  )
  return (
    <ViewFrame
      title="Each team's profile, mirrored"
      caption="Bar length is points added or removed versus a league-average team. Solid bars help; faded bars cost. The longer solid bar wins the category."
    >
      <div className="matchup__battle">
        <div className="matchup__battle-head">
          <span style={{ color: teamA.primaryColor }}>{teamA.abbreviation}</span>
          <span />
          <span style={{ color: teamB.primaryColor }}>{teamB.abbreviation}</span>
        </div>
        {analysis.edges.map(e => (
          <div key={e.def.key} className="matchup__battle-row">
            <div className="matchup__battle-side matchup__battle-side--a">
              <span className="matchup__battle-val">{formatPoints(e.aPoints)}</span>
              <span
                className={`matchup__battle-bar ${e.aPoints >= 0 ? 'is-help' : 'is-hurt'}${e.edge > 0 ? ' is-winner' : ''}`}
                style={{ width: `${(Math.abs(e.aPoints) / maxAbs) * 100}%`, backgroundColor: teamA.primaryColor }}
              />
            </div>
            <span className="matchup__battle-label">{e.def.short}</span>
            <div className="matchup__battle-side matchup__battle-side--b">
              <span
                className={`matchup__battle-bar ${e.bPoints >= 0 ? 'is-help' : 'is-hurt'}${e.edge < 0 ? ' is-winner' : ''}`}
                style={{ width: `${(Math.abs(e.bPoints) / maxAbs) * 100}%`, backgroundColor: teamB.primaryColor }}
              />
              <span className="matchup__battle-val">{formatPoints(e.bPoints)}</span>
            </div>
          </div>
        ))}
      </div>
    </ViewFrame>
  )
}

/**
 * VIEW 3 — Head-to-head dumbbell. Each stat is one row with two dots — one
 * per team — connected by a stick. The gap between the dots IS the edge, so
 * the eye jumps straight to the biggest mismatches.
 */
function DumbbellView({ analysis, teamA, teamB }: ViewProps) {
  const data: LollipopDatum[] = analysis.edges.map(e => ({
    key: e.def.key,
    label: e.def.label,
    value: e.aPoints,
    compare: e.bPoints,
  }))
  return (
    <ViewFrame
      title="The gap is the mismatch"
      caption="Each dot is a team's points-vs-average for that stat. The wider the gap between the two dots, the bigger that category's swing."
    >
      <div className="matchup__chart-scroll">
        <Lollipop
          variant="paired"
          data={data}
          width={560}
          height={260}
          valueLabel={teamA.abbreviation}
          compareLabel={teamB.abbreviation}
          formatValue={formatPoints}
        />
      </div>
    </ViewFrame>
  )
}

/**
 * VIEW 4 — Two-way radar. Switches to the ABSOLUTE framing (raw points
 * generated, with turnovers reframed as ball security) so every axis reads
 * "bigger is better" from zero. Shows the shape/identity of each team rather
 * than the head-to-head delta.
 */
function RadarView({ analysis, teamA, teamB }: ViewProps) {
  const axes = STAT_DEFS.map(d => (d.key === 'tov' ? 'SEC' : d.short))
  return (
    <ViewFrame
      title="Scoring identity, all-positive"
      caption="Absolute points generated per category — raw stat × value, with turnovers reframed as ball security (SEC). A fuller shape means more points created off non-scoring play."
    >
      <div className="matchup__radar">
        <Radar
          variant="multiple"
          axes={axes}
          series={[
            { id: 'a', label: teamA.abbreviation, values: analysis.a.contributions.map(c => c.absolutePoints), intent: 'primary' },
            { id: 'b', label: teamB.abbreviation, values: analysis.b.contributions.map(c => c.absolutePoints), intent: 'info' },
          ]}
          size={320}
          formatValue={n => n.toFixed(1)}
        />
      </div>
    </ViewFrame>
  )
}

interface LedgerRow {
  key: string
  label: string
  aValue: number
  leagueAvg: number
  aPoints: number
  bValue: number
  bPoints: number
  edge: number
}

/**
 * VIEW 5 — Points ledger. The precise, sortable accounting: raw averages, the
 * league baseline, each team's points-vs-average, and the per-stat edge. The
 * numbers behind every other view.
 */
function LedgerView({ analysis, teamA, teamB }: ViewProps) {
  const rows: LedgerRow[] = analysis.edges.map((e, i) => ({
    key: e.def.key,
    label: e.def.label,
    aValue: analysis.a.contributions[i].value,
    leagueAvg: LEAGUE_AVERAGES[e.def.key],
    aPoints: e.aPoints,
    bValue: analysis.b.contributions[i].value,
    bPoints: e.bPoints,
    edge: e.edge,
  }))

  const columns: TableColumn<LedgerRow>[] = [
    { key: 'stat', header: 'Stat', accessor: r => r.label, sortBy: (a, b) => a.label.localeCompare(b.label) },
    { key: 'aVal', header: `${teamA.abbreviation} /gm`, accessor: r => formatValue(r.aValue), sortBy: (a, b) => a.aValue - b.aValue, align: 'end' },
    { key: 'lg', header: 'Lg avg', accessor: r => formatValue(r.leagueAvg), align: 'end' },
    { key: 'aPts', header: `${teamA.abbreviation} pts`, accessor: r => formatPoints(r.aPoints), sortBy: (a, b) => a.aPoints - b.aPoints, align: 'end' },
    { key: 'bVal', header: `${teamB.abbreviation} /gm`, accessor: r => formatValue(r.bValue), sortBy: (a, b) => a.bValue - b.bValue, align: 'end' },
    { key: 'bPts', header: `${teamB.abbreviation} pts`, accessor: r => formatPoints(r.bPoints), sortBy: (a, b) => a.bPoints - b.bPoints, align: 'end' },
    {
      key: 'edge',
      header: 'Edge',
      accessor: r => (
        <strong style={{ color: r.edge >= 0 ? teamA.primaryColor : teamB.primaryColor }}>
          {r.edge >= 0 ? teamA.abbreviation : teamB.abbreviation} {formatPoints(Math.abs(r.edge))}
        </strong>
      ),
      sortBy: (a, b) => a.edge - b.edge,
      align: 'end',
    },
  ]

  return (
    <ViewFrame
      title="The accounting"
      caption="Per-game averages, the league baseline they are measured against, and the points each stat is worth to each team. Sort any column."
    >
      <Table
        variant="sortable"
        data={rows}
        columns={columns}
        getRowId={r => r.key}
        caption={`${teamA.name} vs ${teamB.name} non-scoring points ledger`}
      />
      <div className="matchup__ledger-total">
        <span>Net non-scoring edge</span>
        <strong style={{ color: analysis.netEdge >= 0 ? teamA.primaryColor : teamB.primaryColor }}>
          {analysis.netEdge >= 0 ? teamA.abbreviation : teamB.abbreviation} {formatPoints(Math.abs(analysis.netEdge))}
        </strong>
      </div>
    </ViewFrame>
  )
}

function ViewFrame({ title, caption, children }: { title: string; caption: string; children: React.ReactNode }) {
  return (
    <div className="matchup__view">
      <h2 className="matchup__view-title">{title}</h2>
      <p className="matchup__view-caption">{caption}</p>
      {children}
    </div>
  )
}

/** Transparency: the coefficients that drive every number on the screen. */
function ModelNote() {
  return (
    <details className="matchup__model">
      <summary className="matchup__model-summary">How it's modelled</summary>
      <div className="matchup__model-body">
        <p>
          Each non-scoring event is assigned a marginal point value, grounded
          in the league's roughly 1.1 points-per-possession economy. A stat's
          contribution is its deviation from the league average times that
          value, so it reads as “points added or removed versus an average
          team.” These are a teachable estimate, not official metrics.
        </p>
        <ul className="matchup__model-coeffs">
          {STAT_DEFS.map(d => (
            <li key={d.key}>
              <span className="matchup__model-stat">{d.short}</span>
              <span className="matchup__model-coeff">{COEFFICIENTS[d.key] > 0 ? '+' : ''}{COEFFICIENTS[d.key].toFixed(2)} pts each</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
