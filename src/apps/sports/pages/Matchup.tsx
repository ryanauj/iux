import { type ReactNode } from 'react'
import { Tabs } from '../../../components/Tabs/Tabs'
import { Select } from '../../../components/Select/Select'
import { Table, type TableColumn } from '../../../components/Table/Table'
import { Waterfall, type WaterfallStep } from '../../../components/Waterfall/Waterfall'
import { Radar } from '../../../components/Radar/Radar'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { sportsRoutes } from '../routes'
import { navigate } from '../../router'
import { TEAMS, getTeamBySlug } from '../data'
import {
  analyzeMatchup,
  LEAGUE_BASELINE_POINTS,
  STAT_DEFS,
  formatPoints,
  formatValue,
  type MatchupAnalysis,
  type StatContribution,
  type StatDef,
  type TeamMatchup,
} from '../matchup'
import type { Team } from '../types'

interface MatchupProps {
  aSlug?: string
  bSlug?: string
}

const DEFAULT_A = 'celtics'
const DEFAULT_B = 'nuggets'

const TEAM_OPTIONS = TEAMS.map(t => ({ value: t.slug, label: `${t.city} ${t.name}` }))

/** Strongest coefficient, for scaling the conversion-rate intensity bars. */
const MAX_COEFF = Math.max(...STAT_DEFS.map(d => Math.abs(d.coefficient)))

export function Matchup({ aSlug, bSlug }: MatchupProps) {
  const teamA = getTeamBySlug(aSlug ?? '') ?? getTeamBySlug(DEFAULT_A) ?? TEAMS[0]
  let teamB = getTeamBySlug(bSlug ?? '') ?? getTeamBySlug(DEFAULT_B) ?? TEAMS[1]
  if (teamB.id === teamA.id) {
    teamB = TEAMS.find(t => t.id !== teamA.id) ?? teamB
  }

  const analysis = analyzeMatchup(teamA, teamB)

  const goTo = (a: string, b: string) => navigate(sportsRoutes.matchup(a, b))

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
        Every stat is converted to points by a fixed rate, measured against the
        league average, then summed into a projected total. Each view shows both
        halves of that story — why a stat is worth what it is, and how the five
        stack up.
      </p>

      <div className="matchup__pickers">
        <div className="matchup__picker matchup__picker--a">
          <span className="matchup__picker-dot" style={{ backgroundColor: teamA.primaryColor }} aria-hidden="true" />
          <Select variant="native" label="Team A" value={teamA.slug} options={TEAM_OPTIONS} onChange={s => goTo(s, teamB.slug)} />
        </div>
        <span className="matchup__vs" aria-hidden="true">vs</span>
        <div className="matchup__picker matchup__picker--b">
          <span className="matchup__picker-dot" style={{ backgroundColor: teamB.primaryColor }} aria-hidden="true" />
          <Select variant="native" label="Team B" value={teamB.slug} options={TEAM_OPTIONS} onChange={s => goTo(teamA.slug, s)} />
        </div>
      </div>

      <Summary analysis={analysis} teamA={teamA} teamB={teamB} />

      <Tabs
        variant="basic"
        ariaLabel="Matchup views"
        tabs={[
          { id: 'bridge', label: 'Projection bridge' },
          { id: 'battle', label: 'Category battle' },
          { id: 'conversion', label: 'Conversion map' },
          { id: 'radar', label: 'Two-way radar' },
          { id: 'ledger', label: 'Points ledger' },
        ]}
        renderPanel={id => {
          switch (id) {
            case 'bridge': return <BridgeView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'battle': return <BattleView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'conversion': return <ConversionView analysis={analysis} teamA={teamA} teamB={teamB} />
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

/* ----------------------------------------------------------------
   Shared building blocks: the derivation cue and the aggregation cue
   reused across every view.
   ---------------------------------------------------------------- */

/**
 * The "why": a stat's points-per-event rate, with an intensity bar whose
 * length is proportional to the rate. A steal's bar runs near full; a
 * rebound's is short — that ratio IS the reason a steal is worth more.
 */
function ConversionChip({ def, showLabel = true }: { def: StatDef; showLabel?: boolean }) {
  const signed = `${def.coefficient > 0 ? '+' : '−'}${Math.abs(def.coefficient).toFixed(2)}`
  const pct = (Math.abs(def.coefficient) / MAX_COEFF) * 100
  return (
    <span className="conv-chip" title={`Each ${def.label.toLowerCase()} ≈ ${signed} pts`}>
      {showLabel && <span className="conv-chip__stat">{def.short}</span>}
      <span className="conv-chip__rate">{signed}</span>
      <span className="conv-chip__track">
        <span className={`conv-chip__fill ${def.coefficient >= 0 ? 'is-pos' : 'is-neg'}`} style={{ width: `${pct}%` }} />
      </span>
    </span>
  )
}

/** A single stat's full derivation as one line: value vs avg → ×rate → points. */
function DerivationLine({ c }: { c: StatContribution }) {
  return (
    <span className="deriv-line" title={`${formatValue(c.value)} ${c.def.short} − ${formatValue(c.leagueAverage)} league avg = ${signedDelta(c.delta)} × ${c.def.coefficient} = ${formatPoints(c.relativePoints)}`}>
      <span className="deriv-line__val">{formatValue(c.value)}</span>
      <span className="deriv-line__op">−</span>
      <span className="deriv-line__avg">{formatValue(c.leagueAverage)}</span>
      <span className="deriv-line__eq">=</span>
      <span className={`deriv-line__delta ${c.delta >= 0 ? 'is-pos' : 'is-neg'}`}>{signedDelta(c.delta)}</span>
      <span className="deriv-line__op">×</span>
      <span className="deriv-line__rate">{c.def.coefficient}</span>
      <span className="deriv-line__eq">=</span>
      <span className={`deriv-line__pts ${c.relativePoints >= 0 ? 'is-pos' : 'is-neg'}`}>{formatPoints(c.relativePoints)}</span>
    </span>
  )
}

/**
 * The "how it adds up": every stat's signed points as a chip, then the sum and
 * the resulting projected total. The aggregation made literal.
 */
function SumStrip({ tm, baseline }: { tm: TeamMatchup; baseline: number }) {
  return (
    <div className="sum-strip">
      <span className="sum-strip__team" style={{ color: tm.team.primaryColor }}>{tm.team.abbreviation}</span>
      {tm.contributions.map((c, i) => (
        <span key={c.def.key} className="sum-strip__group">
          {i > 0 && <span className="sum-strip__plus">+</span>}
          <span className={`sum-strip__chip ${c.relativePoints >= 0 ? 'is-pos' : 'is-neg'}`}>
            <span className="sum-strip__chip-stat">{c.def.short}</span>
            <span className="sum-strip__chip-pts">{formatPoints(c.relativePoints)}</span>
          </span>
        </span>
      ))}
      <span className="sum-strip__eq">=</span>
      <span className="sum-strip__net">{formatPoints(tm.netRelativePoints)}</span>
      <span className="sum-strip__arrow">→</span>
      <span className="sum-strip__proj" title={`${formatValue(baseline)} league baseline ${formatPoints(tm.netRelativePoints)} = ${formatValue(tm.projectedPoints)}`}>
        {formatValue(tm.projectedPoints)} <span className="sum-strip__proj-label">proj</span>
      </span>
    </div>
  )
}

/** Headline: projected totals for each team and the resulting margin. */
function Summary({ analysis, teamA, teamB }: ViewProps) {
  const { a, b, netEdge, baseline } = analysis
  const favored = netEdge >= 0 ? teamA : teamB
  const magnitude = Math.abs(netEdge)
  return (
    <section className="matchup__summary" aria-label="Projected totals">
      <ProjTeam tm={a} baseline={baseline} align="start" />
      <div className="matchup__summary-center">
        <span className="matchup__summary-edge-label">Projected margin</span>
        <span className="matchup__summary-edge">
          {magnitude < 0.05 ? 'Even' : `${favored.abbreviation} +${magnitude.toFixed(1)}`}
        </span>
        <span className="matchup__summary-caption">from REB · AST · STL · BLK · TOV vs league average</span>
      </div>
      <ProjTeam tm={b} baseline={baseline} align="end" />
    </section>
  )
}

function ProjTeam({ tm, baseline, align }: { tm: TeamMatchup; baseline: number; align: 'start' | 'end' }) {
  return (
    <div className={`matchup__summary-team matchup__summary-team--${align}`}>
      <span className="matchup__summary-name" style={{ color: tm.team.primaryColor }}>{tm.team.abbreviation}</span>
      <span className="matchup__summary-metric">{formatValue(tm.projectedPoints)}</span>
      <span className="matchup__summary-calc">
        {formatValue(baseline)} base <strong className={tm.netRelativePoints >= 0 ? 'is-pos' : 'is-neg'}>{formatPoints(tm.netRelativePoints)}</strong>
      </span>
    </div>
  )
}

/* ----------------------------------------------------------------
   VIEW 1 — Projection bridge.
   Two waterfalls, one per team, stacking each stat's points from zero to the
   net. A derivation row under every team makes the raw-stat → points chain
   explicit; the header carries baseline + net = projected total.
   ---------------------------------------------------------------- */
function BridgeView({ analysis }: ViewProps) {
  return (
    <ViewFrame
      title="How each stat builds the projected total"
      caption="Each bar adds a stat's points to a running total (the league baseline sits underneath). The list shows where every bar comes from: raw average minus the league average, times the rate."
    >
      <div className="matchup__bridge">
        <TeamBridge tm={analysis.a} baseline={analysis.baseline} />
        <TeamBridge tm={analysis.b} baseline={analysis.baseline} />
      </div>
    </ViewFrame>
  )
}

function TeamBridge({ tm, baseline }: { tm: TeamMatchup; baseline: number }) {
  const steps: WaterfallStep[] = [
    ...tm.contributions.map(c => ({ key: c.def.key, label: c.def.short, value: c.relativePoints })),
    { key: 'net', label: 'Net', value: 0, subtotal: true },
  ]
  return (
    <div className="matchup__bridge-team">
      <div className="matchup__bridge-head">
        <span className="matchup__bridge-abbr" style={{ color: tm.team.primaryColor }}>{tm.team.abbreviation}</span>
        <span className="matchup__bridge-proj">{formatValue(tm.projectedPoints)}</span>
        <span className="matchup__bridge-calc">{formatValue(baseline)} baseline {formatPoints(tm.netRelativePoints)} non-scoring</span>
      </div>
      <div className="matchup__chart-scroll">
        <Waterfall variant="subtotals" steps={steps} width={460} height={250} formatValue={formatPoints} />
      </div>
      <ul className="matchup__bridge-deriv">
        {tm.contributions.map(c => (
          <li key={c.def.key}>
            <ConversionChip def={c.def} />
            <DerivationLine c={c} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ----------------------------------------------------------------
   VIEW 2 — Category battle.
   Mirrored bars per stat; the centre column carries the conversion rate and
   the raw deviation, so each row reads "value → ×rate → bar". A totals row
   aggregates each side into its projected total.
   ---------------------------------------------------------------- */
function BattleView({ analysis, teamA, teamB }: ViewProps) {
  const { maxAbsPoints } = analysis
  const maxNet = Math.max(0.1, Math.abs(analysis.a.netRelativePoints), Math.abs(analysis.b.netRelativePoints))
  return (
    <ViewFrame
      title="Each team's profile, mirrored"
      caption="Bar length is points versus a league-average team. The centre shows the conversion rate and how far above or below average each side is — the bar is that deviation times the rate. Solid helps, faded costs."
    >
      <div className="matchup__battle">
        <div className="matchup__battle-head">
          <span style={{ color: teamA.primaryColor }}>{teamA.abbreviation}</span>
          <span>rate</span>
          <span style={{ color: teamB.primaryColor }}>{teamB.abbreviation}</span>
        </div>
        {analysis.edges.map((e, i) => {
          const ca = analysis.a.contributions[i]
          const cb = analysis.b.contributions[i]
          return (
            <div key={e.def.key} className="matchup__battle-row">
              <div className="matchup__battle-side matchup__battle-side--a">
                <span className="matchup__battle-val">{formatValue(ca.value)} <em className={ca.delta >= 0 ? 'is-pos' : 'is-neg'}>{signedDelta(ca.delta)}</em></span>
                <span className="matchup__battle-pts">{formatPoints(e.aPoints)}</span>
                <span
                  className={`matchup__battle-bar ${e.aPoints >= 0 ? 'is-help' : 'is-hurt'}${e.edge > 0 ? ' is-winner' : ''}`}
                  style={{ width: `${(Math.abs(e.aPoints) / maxAbsPoints) * 100}%`, backgroundColor: teamA.primaryColor }}
                />
              </div>
              <div className="matchup__battle-center">
                <ConversionChip def={e.def} />
              </div>
              <div className="matchup__battle-side matchup__battle-side--b">
                <span
                  className={`matchup__battle-bar ${e.bPoints >= 0 ? 'is-help' : 'is-hurt'}${e.edge < 0 ? ' is-winner' : ''}`}
                  style={{ width: `${(Math.abs(e.bPoints) / maxAbsPoints) * 100}%`, backgroundColor: teamB.primaryColor }}
                />
                <span className="matchup__battle-pts">{formatPoints(e.bPoints)}</span>
                <span className="matchup__battle-val"><em className={cb.delta >= 0 ? 'is-pos' : 'is-neg'}>{signedDelta(cb.delta)}</em> {formatValue(cb.value)}</span>
              </div>
            </div>
          )
        })}
        <div className="matchup__battle-row matchup__battle-row--total">
          <div className="matchup__battle-side matchup__battle-side--a">
            <span className="matchup__battle-val matchup__battle-proj">{formatValue(analysis.a.projectedPoints)}</span>
            <span className="matchup__battle-pts">{formatPoints(analysis.a.netRelativePoints)}</span>
            <span className="matchup__battle-bar is-total" style={{ width: `${(Math.abs(analysis.a.netRelativePoints) / maxNet) * 100}%`, backgroundColor: teamA.primaryColor }} />
          </div>
          <div className="matchup__battle-center"><span className="matchup__battle-total-label">total</span></div>
          <div className="matchup__battle-side matchup__battle-side--b">
            <span className="matchup__battle-bar is-total" style={{ width: `${(Math.abs(analysis.b.netRelativePoints) / maxNet) * 100}%`, backgroundColor: teamB.primaryColor }} />
            <span className="matchup__battle-pts">{formatPoints(analysis.b.netRelativePoints)}</span>
            <span className="matchup__battle-val matchup__battle-proj">{formatValue(analysis.b.projectedPoints)}</span>
          </div>
        </div>
      </div>
    </ViewFrame>
  )
}

/* ----------------------------------------------------------------
   VIEW 3 — Conversion map.
   A scatter where every stat is a ray through the origin whose SLOPE is its
   points-per-event rate. Each team is a dot at (deviation, points), so the dot
   sits on the ray — the steeper the ray, the more a unit of that stat is worth.
   Sum strips below turn the five points into each team's projected total.
   ---------------------------------------------------------------- */
function ConversionView({ analysis, teamA, teamB }: ViewProps) {
  const width = 580
  const height = 360
  const pad = { top: 20, right: 96, bottom: 46, left: 56 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom

  const xMax = analysis.maxAbsDelta * 1.08
  const yMax = analysis.maxAbsPoints * 1.12
  const xs = (d: number) => pad.left + ((d + xMax) / (2 * xMax)) * plotW
  const ys = (p: number) => pad.top + (1 - (p + yMax) / (2 * yMax)) * plotH
  const clampY = (p: number) => Math.max(-yMax, Math.min(yMax, p))
  const originY = ys(0)
  const originX = xs(0)

  return (
    <ViewFrame
      title="Why a stat is worth what it is"
      caption="Each line is a stat; its slope is the conversion rate, so steeper means a unit is worth more. A team's dot sits where its deviation from league average (horizontal) meets the points that earns (vertical). Turnovers slope down — above-average turnovers cost points."
    >
      <div className="matchup__chart-scroll">
        <svg className="matchup__conv-svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Stat-to-points conversion scatter">
          <clipPath id="conv-clip"><rect x={pad.left} y={pad.top} width={plotW} height={plotH} /></clipPath>
          {/* axes */}
          <line className="matchup__conv-axis" x1={pad.left} y1={originY} x2={pad.left + plotW} y2={originY} />
          <line className="matchup__conv-axis" x1={originX} y1={pad.top} x2={originX} y2={pad.top + plotH} />
          <text className="matchup__conv-axis-title" x={pad.left + plotW} y={originY - 6} textAnchor="end">deviation vs league avg →</text>
          <text className="matchup__conv-axis-title" x={originX + 6} y={pad.top + 4} textAnchor="start">points ↑</text>
          <text className="matchup__conv-avg" x={originX} y={pad.top + plotH + 14} textAnchor="middle">league avg</text>
          {/* rays — slope = rate */}
          <g clipPath="url(#conv-clip)">
            {STAT_DEFS.map(def => {
              const y1 = def.coefficient * -xMax
              const y2 = def.coefficient * xMax
              return (
                <line
                  key={def.key}
                  className={`matchup__conv-ray ${def.coefficient >= 0 ? 'is-pos' : 'is-neg'}`}
                  x1={xs(-xMax)} y1={ys(clampY(y1))}
                  x2={xs(xMax)} y2={ys(clampY(y2))}
                />
              )
            })}
          </g>
          {/* ray labels near the positive end */}
          {STAT_DEFS.map(def => {
            const f = 0.82
            const yEnd = clampY(def.coefficient * xMax * f)
            return (
              <text key={def.key} className="matchup__conv-ray-label" x={xs(xMax * f) + 6} y={ys(yEnd)} dominantBaseline="central">
                {def.short} {def.coefficient > 0 ? '+' : '−'}{Math.abs(def.coefficient).toFixed(2)}
              </text>
            )
          })}
          {/* team dots */}
          {STAT_DEFS.map((def, i) => {
            const ca = analysis.a.contributions[i]
            const cb = analysis.b.contributions[i]
            return (
              <g key={def.key}>
                <circle className="matchup__conv-dot" cx={xs(cb.delta)} cy={ys(clampY(cb.relativePoints))} r={5} style={{ fill: teamB.primaryColor }}>
                  <title>{`${teamB.abbreviation} ${def.short}: ${formatValue(cb.value)} (${signedDelta(cb.delta)} vs avg) × ${def.coefficient} = ${formatPoints(cb.relativePoints)}`}</title>
                </circle>
                <circle className="matchup__conv-dot" cx={xs(ca.delta)} cy={ys(clampY(ca.relativePoints))} r={5} style={{ fill: teamA.primaryColor }}>
                  <title>{`${teamA.abbreviation} ${def.short}: ${formatValue(ca.value)} (${signedDelta(ca.delta)} vs avg) × ${def.coefficient} = ${formatPoints(ca.relativePoints)}`}</title>
                </circle>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="matchup__conv-legend">
        <span className="matchup__conv-legend-item"><span className="matchup__conv-swatch" style={{ backgroundColor: teamA.primaryColor }} />{teamA.abbreviation}</span>
        <span className="matchup__conv-legend-item"><span className="matchup__conv-swatch" style={{ backgroundColor: teamB.primaryColor }} />{teamB.abbreviation}</span>
      </div>
      <div className="matchup__conv-sums">
        <SumStrip tm={analysis.a} baseline={analysis.baseline} />
        <SumStrip tm={analysis.b} baseline={analysis.baseline} />
      </div>
    </ViewFrame>
  )
}

/* ----------------------------------------------------------------
   VIEW 4 — Two-way radar.
   The absolute-points shape (raw stat × rate, turnovers as ball security) for
   both teams, paired with a key that spells out value × rate = points per axis
   and totals each team's generated points.
   ---------------------------------------------------------------- */
function RadarView({ analysis, teamA, teamB }: ViewProps) {
  const axes = STAT_DEFS.map(d => (d.key === 'tov' ? 'SEC' : d.short))
  const totalA = analysis.a.contributions.reduce((s, c) => s + c.absolutePoints, 0)
  const totalB = analysis.b.contributions.reduce((s, c) => s + c.absolutePoints, 0)
  return (
    <ViewFrame
      title="Scoring identity, all-positive"
      caption="A point's distance from the centre is that stat's raw value times its rate (turnovers reframed as ball security, SEC). A fuller shape means more points generated off non-scoring play; the key on the right shows each multiplication."
    >
      <div className="matchup__radar-wrap">
        <div className="matchup__radar">
          <Radar
            variant="multiple"
            axes={axes}
            series={[
              { id: 'a', label: teamA.abbreviation, values: analysis.a.contributions.map(c => c.absolutePoints), intent: 'primary' },
              { id: 'b', label: teamB.abbreviation, values: analysis.b.contributions.map(c => c.absolutePoints), intent: 'warning' },
            ]}
            size={300}
            formatValue={n => n.toFixed(1)}
          />
        </div>
        <table className="matchup__radar-key">
          <thead>
            <tr>
              <th>Stat</th>
              <th>Rate</th>
              <th style={{ color: teamA.primaryColor }}>{teamA.abbreviation}</th>
              <th style={{ color: teamB.primaryColor }}>{teamB.abbreviation}</th>
            </tr>
          </thead>
          <tbody>
            {STAT_DEFS.map((def, i) => {
              const ca = analysis.a.contributions[i]
              const cb = analysis.b.contributions[i]
              const label = def.key === 'tov' ? 'SEC' : def.short
              return (
                <tr key={def.key}>
                  <th scope="row">{label}</th>
                  <td><ConversionChip def={def} showLabel={false} /></td>
                  <td className="matchup__radar-key-cell">{formatValue(ca.value)} → <strong>{ca.absolutePoints.toFixed(1)}</strong></td>
                  <td className="matchup__radar-key-cell">{formatValue(cb.value)} → <strong>{cb.absolutePoints.toFixed(1)}</strong></td>
                </tr>
              )
            })}
            <tr className="matchup__radar-key-total">
              <th scope="row">Total</th>
              <td>generated</td>
              <td><strong>{totalA.toFixed(1)}</strong></td>
              <td><strong>{totalB.toFixed(1)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </ViewFrame>
  )
}

/* ----------------------------------------------------------------
   VIEW 5 — Points ledger.
   The full accounting: raw average, league baseline, deviation, rate, and the
   resulting points laid out as the literal formula, with a totals block that
   sums to each team's projected score.
   ---------------------------------------------------------------- */
interface LedgerRow {
  key: string
  def: StatDef
  a: StatContribution
  b: StatContribution
  edge: number
}

function LedgerView({ analysis, teamA, teamB }: ViewProps) {
  const rows: LedgerRow[] = analysis.edges.map((e, i) => ({
    key: e.def.key,
    def: e.def,
    a: analysis.a.contributions[i],
    b: analysis.b.contributions[i],
    edge: e.edge,
  }))

  const columns: TableColumn<LedgerRow>[] = [
    { key: 'stat', header: 'Stat', accessor: r => r.def.label, sortBy: (a, b) => a.def.label.localeCompare(b.def.label) },
    { key: 'rate', header: 'Rate', accessor: r => <ConversionChip def={r.def} showLabel={false} />, align: 'center' },
    { key: 'lg', header: 'Lg avg', accessor: r => formatValue(r.a.leagueAverage), align: 'end' },
    { key: 'aVal', header: `${teamA.abbreviation} /gm`, accessor: r => formatValue(r.a.value), sortBy: (a, b) => a.a.value - b.a.value, align: 'end' },
    { key: 'aDelta', header: 'Δ', accessor: r => <span className={r.a.delta >= 0 ? 'is-pos' : 'is-neg'}>{signedDelta(r.a.delta)}</span>, sortBy: (a, b) => a.a.delta - b.a.delta, align: 'end' },
    { key: 'aPts', header: `${teamA.abbreviation} pts`, accessor: r => <strong>{formatPoints(r.a.relativePoints)}</strong>, sortBy: (a, b) => a.a.relativePoints - b.a.relativePoints, align: 'end' },
    { key: 'bVal', header: `${teamB.abbreviation} /gm`, accessor: r => formatValue(r.b.value), sortBy: (a, b) => a.b.value - b.b.value, align: 'end' },
    { key: 'bDelta', header: 'Δ', accessor: r => <span className={r.b.delta >= 0 ? 'is-pos' : 'is-neg'}>{signedDelta(r.b.delta)}</span>, sortBy: (a, b) => a.b.delta - b.b.delta, align: 'end' },
    { key: 'bPts', header: `${teamB.abbreviation} pts`, accessor: r => <strong>{formatPoints(r.b.relativePoints)}</strong>, sortBy: (a, b) => a.b.relativePoints - b.b.relativePoints, align: 'end' },
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
      caption="Read each row as a formula: a team's per-game average, minus the league average (Δ), times the rate, equals its points. The block below sums every row into each team's projected total. Sort any column."
    >
      <Table
        variant="sortable"
        data={rows}
        columns={columns}
        getRowId={r => r.key}
        caption={`${teamA.name} vs ${teamB.name} non-scoring points ledger`}
      />
      <div className="matchup__ledger-totals">
        <LedgerTotal tm={analysis.a} baseline={analysis.baseline} />
        <div className="matchup__ledger-margin">
          <span className="matchup__ledger-margin-label">Projected margin</span>
          <strong style={{ color: analysis.netEdge >= 0 ? teamA.primaryColor : teamB.primaryColor }}>
            {analysis.netEdge >= 0 ? teamA.abbreviation : teamB.abbreviation} +{Math.abs(analysis.netEdge).toFixed(1)}
          </strong>
        </div>
        <LedgerTotal tm={analysis.b} baseline={analysis.baseline} align="end" />
      </div>
    </ViewFrame>
  )
}

function LedgerTotal({ tm, baseline, align = 'start' }: { tm: TeamMatchup; baseline: number; align?: 'start' | 'end' }) {
  return (
    <div className={`matchup__ledger-total matchup__ledger-total--${align}`}>
      <span className="matchup__ledger-total-abbr" style={{ color: tm.team.primaryColor }}>{tm.team.abbreviation}</span>
      <span className="matchup__ledger-total-proj">{formatValue(tm.projectedPoints)}</span>
      <span className="matchup__ledger-total-calc">
        {formatValue(baseline)} base <strong className={tm.netRelativePoints >= 0 ? 'is-pos' : 'is-neg'}>{formatPoints(tm.netRelativePoints)}</strong> non-scoring
      </span>
    </div>
  )
}

function ViewFrame({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return (
    <div className="matchup__view">
      <h2 className="matchup__view-title">{title}</h2>
      <p className="matchup__view-caption">{caption}</p>
      {children}
    </div>
  )
}

/** Transparency: the rates that drive every number on the screen. */
function ModelNote() {
  return (
    <details className="matchup__model">
      <summary className="matchup__model-summary">How it's modelled</summary>
      <div className="matchup__model-body">
        <p>
          Each non-scoring event carries a fixed point value, grounded in the
          league's roughly 1.1 points-per-possession economy. A stat's
          contribution is its deviation from the league average times that rate,
          so it reads as “points added or removed versus an average team.”
          Summing the five and adding the league-average baseline of{' '}
          {formatValue(LEAGUE_BASELINE_POINTS)} points gives the projected
          total. These are a teachable estimate, not official metrics.
        </p>
        <ul className="matchup__model-coeffs">
          {STAT_DEFS.map(d => (
            <li key={d.key}>
              <ConversionChip def={d} />
              <span className="matchup__model-coeff-label">per {d.label.toLowerCase().replace(/s$/, '')}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}

/** "+2.3" / "-1.4" — signed one-decimal for stat deviations. */
function signedDelta(n: number): string {
  const fixed = Math.abs(n) < 0.05 ? '0.0' : Math.abs(n).toFixed(1)
  return `${n >= 0.05 ? '+' : n <= -0.05 ? '−' : ''}${fixed}`
}
