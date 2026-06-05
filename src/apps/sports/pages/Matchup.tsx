import { useState, type ReactNode } from 'react'
import { Tabs } from '../../../components/Tabs/Tabs'
import { Select } from '../../../components/Select/Select'
import { Table, type TableColumn } from '../../../components/Table/Table'
import { Waterfall, type WaterfallStep } from '../../../components/Waterfall/Waterfall'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { sportsRoutes } from '../routes'
import { navigate } from '../../router'
import { TEAMS, getTeamBySlug } from '../data'
import {
  analyzeMatchup,
  DEFAULT_RATES,
  LEAGUE_BASELINE_POINTS,
  LEAGUE_PPP,
  STAT_DEFS,
  formatPoints,
  formatRate,
  formatValue,
  type MatchupAnalysis,
  type StatContribution,
  type StatDef,
  type StatKey,
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

/** Strongest rate in a map, for scaling the conversion-rate intensity bars. */
function maxAbsRate(rates: Record<StatKey, number>): number {
  return Math.max(0.01, ...STAT_DEFS.map(d => Math.abs(rates[d.key])))
}

export function Matchup({ aSlug, bSlug }: MatchupProps) {
  const teamA = getTeamBySlug(aSlug ?? '') ?? getTeamBySlug(DEFAULT_A) ?? TEAMS[0]
  let teamB = getTeamBySlug(bSlug ?? '') ?? getTeamBySlug(DEFAULT_B) ?? TEAMS[1]
  if (teamB.id === teamA.id) {
    teamB = TEAMS.find(t => t.id !== teamA.id) ?? teamB
  }

  // Points-per-stat rates are configurable; they start at the data-derived
  // defaults (league PPP × each stat's possession weight).
  const [rates, setRates] = useState<Record<StatKey, number>>(DEFAULT_RATES)
  const analysis = analyzeMatchup(teamA, teamB, rates)

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

      <PricingPanel rates={rates} onChange={setRates} />

      <Tabs
        variant="basic"
        ariaLabel="Matchup views"
        tabs={[
          { id: 'bridge', label: 'Projection bridge' },
          { id: 'battle', label: 'Category battle' },
          { id: 'conversion', label: 'Conversion map' },
          { id: 'buildup', label: 'Build-up' },
          { id: 'ledger', label: 'Points ledger' },
        ]}
        renderPanel={id => {
          switch (id) {
            case 'bridge': return <BridgeView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'battle': return <BattleView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'conversion': return <ConversionView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'buildup': return <BuildUpView analysis={analysis} teamA={teamA} teamB={teamB} />
            case 'ledger': return <LedgerView analysis={analysis} teamA={teamA} teamB={teamB} />
            default: return null
          }
        }}
      />
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
function ConversionChip({ def, rate, maxRate, showLabel = true }: { def: StatDef; rate: number; maxRate: number; showLabel?: boolean }) {
  const signed = `${rate > 0 ? '+' : '−'}${Math.abs(rate).toFixed(2)}`
  const pct = (Math.abs(rate) / maxRate) * 100
  return (
    <span className="conv-chip" title={`Each ${def.label.toLowerCase()} ≈ ${signed} pts`}>
      {showLabel && <span className="conv-chip__stat">{def.short}</span>}
      <span className="conv-chip__rate">{signed}</span>
      <span className="conv-chip__track">
        <span className={`conv-chip__fill ${rate >= 0 ? 'is-pos' : 'is-neg'}`} style={{ width: `${pct}%` }} />
      </span>
    </span>
  )
}

/** A single stat's full derivation as one line, units included: value − avg (stat/gm) = Δ × rate = points. */
function DerivationLine({ c }: { c: StatContribution }) {
  const unit = c.def.short.toLowerCase()
  return (
    <span className="deriv-line" title={`${formatValue(c.value)} − ${formatValue(c.leagueAverage)} league avg = ${signedDelta(c.delta)} ${unit}/gm, × ${formatRate(c.rate)} pts per ${unit} = ${formatPoints(c.relativePoints)} pts`}>
      <span className="deriv-line__val">{formatValue(c.value)}</span>
      <span className="deriv-line__op">−</span>
      <span className="deriv-line__avg">{formatValue(c.leagueAverage)}</span>
      <span className="deriv-line__unit">{unit}/gm</span>
      <span className="deriv-line__eq">=</span>
      <span className={`deriv-line__delta ${c.delta >= 0 ? 'is-pos' : 'is-neg'}`}>{signedDelta(c.delta)}</span>
      <span className="deriv-line__op">×</span>
      <span className="deriv-line__rate">{formatRate(c.rate)}</span>
      <span className="deriv-line__unit">pts/{unit}</span>
      <span className="deriv-line__eq">=</span>
      <span className={`deriv-line__pts ${c.relativePoints >= 0 ? 'is-pos' : 'is-neg'}`}>{formatPoints(c.relativePoints)}</span>
      <span className="deriv-line__unit">pts</span>
    </span>
  )
}

/**
 * A units legend for the derivation equation, the table-view analogue of the
 * conversion map's axis labels: it names what each number in the formula is.
 */
function FormulaKey() {
  return (
    <div className="formula-key">
      <span className="formula-key__part">
        <span className="formula-key__lead">team avg − league avg</span>
        <span className="formula-key__unit">per game (REB, AST, …)</span>
      </span>
      <span className="formula-key__op" aria-hidden="true">×</span>
      <span className="formula-key__part">
        <span className="formula-key__lead">rate</span>
        <span className="formula-key__unit">points per stat</span>
      </span>
      <span className="formula-key__op" aria-hidden="true">=</span>
      <span className="formula-key__part">
        <span className="formula-key__lead">points</span>
        <span className="formula-key__unit">vs an average team</span>
      </span>
    </div>
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
      caption="Each bar adds a stat's points to a running total (the league baseline sits underneath). The list under each chart shows where every bar comes from — read left to right, with units."
    >
      <FormulaKey />
      <div className="matchup__bridge">
        <TeamBridge tm={analysis.a} baseline={analysis.baseline} />
        <TeamBridge tm={analysis.b} baseline={analysis.baseline} />
      </div>
    </ViewFrame>
  )
}

function TeamBridge({ tm, baseline }: { tm: TeamMatchup; baseline: number }) {
  const maxRate = Math.max(0.01, ...tm.contributions.map(c => Math.abs(c.rate)))
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
            <ConversionChip def={c.def} rate={c.rate} maxRate={maxRate} />
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
  const maxRate = maxAbsRate(analysis.rates)
  const maxNet = Math.max(0.1, Math.abs(analysis.a.netRelativePoints), Math.abs(analysis.b.netRelativePoints))
  return (
    <ViewFrame
      title="Each team's profile, mirrored"
      caption="Each side shows a team's per-game average (with its deviation from the league average) and the points that earns. The centre is the conversion rate; the bar length is that deviation times the rate. Solid helps, faded costs."
    >
      <FormulaKey />
      <div className="matchup__battle">
        <div className="matchup__battle-head">
          <span style={{ color: teamA.primaryColor }}>{teamA.abbreviation} — avg (Δ) · pts</span>
          <span>rate</span>
          <span style={{ color: teamB.primaryColor }}>{teamB.abbreviation} — avg (Δ) · pts</span>
        </div>
        {analysis.edges.map((e, i) => {
          const ca = analysis.a.contributions[i]
          const cb = analysis.b.contributions[i]
          const unit = e.def.short.toLowerCase()
          return (
            <div key={e.def.key} className="matchup__battle-row">
              <div className="matchup__battle-side matchup__battle-side--a">
                <span className="matchup__battle-val">{formatValue(ca.value)} <em className={ca.delta >= 0 ? 'is-pos' : 'is-neg'}>({signedDelta(ca.delta)})</em> <span className="matchup__u">{unit}</span></span>
                <span className="matchup__battle-pts">{formatPoints(e.aPoints)} <span className="matchup__u">pts</span></span>
                <span
                  className={`matchup__battle-bar ${e.aPoints >= 0 ? 'is-help' : 'is-hurt'}${e.edge > 0 ? ' is-winner' : ''}`}
                  style={{ width: `${(Math.abs(e.aPoints) / maxAbsPoints) * 100}%`, backgroundColor: teamA.primaryColor }}
                  title={`${teamA.abbreviation} ${e.def.label}: ${formatValue(ca.value)} − ${formatValue(ca.leagueAverage)} = ${signedDelta(ca.delta)} ${unit} × ${formatRate(ca.rate)} = ${formatPoints(e.aPoints)} pts`}
                />
              </div>
              <div className="matchup__battle-center">
                <ConversionChip def={e.def} rate={ca.rate} maxRate={maxRate} />
              </div>
              <div className="matchup__battle-side matchup__battle-side--b">
                <span
                  className={`matchup__battle-bar ${e.bPoints >= 0 ? 'is-help' : 'is-hurt'}${e.edge < 0 ? ' is-winner' : ''}`}
                  style={{ width: `${(Math.abs(e.bPoints) / maxAbsPoints) * 100}%`, backgroundColor: teamB.primaryColor }}
                  title={`${teamB.abbreviation} ${e.def.label}: ${formatValue(cb.value)} − ${formatValue(cb.leagueAverage)} = ${signedDelta(cb.delta)} ${unit} × ${formatRate(cb.rate)} = ${formatPoints(e.bPoints)} pts`}
                />
                <span className="matchup__battle-pts">{formatPoints(e.bPoints)} <span className="matchup__u">pts</span></span>
                <span className="matchup__battle-val"><span className="matchup__u">{unit}</span> <em className={cb.delta >= 0 ? 'is-pos' : 'is-neg'}>({signedDelta(cb.delta)})</em> {formatValue(cb.value)}</span>
              </div>
            </div>
          )
        })}
        <div className="matchup__battle-row matchup__battle-row--total">
          <div className="matchup__battle-side matchup__battle-side--a">
            <span className="matchup__battle-val matchup__battle-proj">{formatValue(analysis.a.projectedPoints)} <span className="matchup__u">proj</span></span>
            <span className="matchup__battle-pts">{formatPoints(analysis.a.netRelativePoints)} <span className="matchup__u">pts</span></span>
            <span className="matchup__battle-bar is-total" style={{ width: `${(Math.abs(analysis.a.netRelativePoints) / maxNet) * 100}%`, backgroundColor: teamA.primaryColor }} />
          </div>
          <div className="matchup__battle-center"><span className="matchup__battle-total-label">net → proj</span></div>
          <div className="matchup__battle-side matchup__battle-side--b">
            <span className="matchup__battle-bar is-total" style={{ width: `${(Math.abs(analysis.b.netRelativePoints) / maxNet) * 100}%`, backgroundColor: teamB.primaryColor }} />
            <span className="matchup__battle-pts">{formatPoints(analysis.b.netRelativePoints)} <span className="matchup__u">pts</span></span>
            <span className="matchup__battle-val matchup__battle-proj">{formatValue(analysis.b.projectedPoints)} <span className="matchup__u">proj</span></span>
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
              const rate = analysis.rates[def.key]
              const y1 = rate * -xMax
              const y2 = rate * xMax
              return (
                <line
                  key={def.key}
                  className={`matchup__conv-ray ${rate >= 0 ? 'is-pos' : 'is-neg'}`}
                  x1={xs(-xMax)} y1={ys(clampY(y1))}
                  x2={xs(xMax)} y2={ys(clampY(y2))}
                />
              )
            })}
          </g>
          {/* ray labels near the positive end */}
          {STAT_DEFS.map(def => {
            const rate = analysis.rates[def.key]
            const f = 0.82
            const yEnd = clampY(rate * xMax * f)
            return (
              <text key={def.key} className="matchup__conv-ray-label" x={xs(xMax * f) + 6} y={ys(yEnd)} dominantBaseline="central">
                {def.short} {rate > 0 ? '+' : '−'}{Math.abs(rate).toFixed(2)}
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
                  <title>{`${teamB.abbreviation} ${def.short}: ${formatValue(cb.value)} (${signedDelta(cb.delta)} vs avg) × ${formatRate(cb.rate)} = ${formatPoints(cb.relativePoints)}`}</title>
                </circle>
                <circle className="matchup__conv-dot" cx={xs(ca.delta)} cy={ys(clampY(ca.relativePoints))} r={5} style={{ fill: teamA.primaryColor }}>
                  <title>{`${teamA.abbreviation} ${def.short}: ${formatValue(ca.value)} (${signedDelta(ca.delta)} vs avg) × ${formatRate(ca.rate)} = ${formatPoints(ca.relativePoints)}`}</title>
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
   VIEW 4 — Build-up (shared axis).
   Both teams stand on ONE points axis. Each starts at the league-average
   baseline, and every stat nudges its projection right (helps) or left
   (costs) until it lands on its projected total. Because the two tracks share
   the axis, the horizontal gap between the end caps IS the projected margin.
   ---------------------------------------------------------------- */
function BuildUpView({ analysis, teamA, teamB }: ViewProps) {
  const width = 600
  const rowH = 64
  const pad = { top: 28, right: 24, bottom: 34, left: 16 }
  const height = pad.top + pad.bottom + rowH * 2
  const plotL = pad.left + 44 // room for the team label
  const plotR = width - pad.right
  const plotW = plotR - plotL

  // Shared x-domain spans the baseline and both projected totals, zoomed in so
  // the small per-stat steps are legible (not anchored at zero).
  const ends = [analysis.baseline, analysis.a.projectedPoints, analysis.b.projectedPoints]
  const lo = Math.min(...ends) - 1.4
  const hi = Math.max(...ends) + 1.4
  const xs = (v: number) => plotL + ((v - lo) / (hi - lo)) * plotW
  const baseX = xs(analysis.baseline)

  const ticks = [lo, analysis.baseline, hi].map(v => Math.round(v * 2) / 2)

  const tracks: { tm: TeamMatchup; color: string }[] = [
    { tm: analysis.a, color: teamA.primaryColor },
    { tm: analysis.b, color: teamB.primaryColor },
  ]

  return (
    <ViewFrame
      title="Build-up on a shared points axis"
      caption="Both teams start at the league-average baseline (the dashed line). Each block is one stat moving the projection right if it helps or left if it costs; the end cap is the projected total. The two tracks share the axis, so the gap between the caps is the projected margin."
    >
      <div className="matchup__chart-scroll">
        <svg className="matchup__build-svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Build-up to projected totals on a shared points axis">
          {/* x-axis ticks (points) */}
          {ticks.map((t, i) => (
            <g key={`t-${i}`}>
              <line className="matchup__build-grid" x1={xs(t)} y1={pad.top - 8} x2={xs(t)} y2={height - pad.bottom} />
              <text className="matchup__build-tick" x={xs(t)} y={height - pad.bottom + 14} textAnchor="middle">{t.toFixed(1)}</text>
            </g>
          ))}
          <text className="matchup__build-axis-title" x={plotR} y={pad.top - 14} textAnchor="end">projected points →</text>
          {/* baseline marker */}
          <line className="matchup__build-baseline" x1={baseX} y1={pad.top - 8} x2={baseX} y2={height - pad.bottom} />
          <text className="matchup__build-baseline-label" x={baseX} y={pad.top - 14} textAnchor="middle">{formatValue(analysis.baseline)} baseline</text>

          {tracks.map((track, ti) => {
            const cy = pad.top + ti * rowH + rowH / 2
            const barH = 20
            let running = analysis.baseline
            return (
              <g key={track.tm.team.id}>
                <text className="matchup__build-team" x={pad.left} y={cy} dominantBaseline="central" style={{ fill: track.color }}>{track.tm.team.abbreviation}</text>
                {track.tm.contributions.map(c => {
                  const x0 = xs(running)
                  running += c.relativePoints
                  const x1 = xs(running)
                  const left = Math.min(x0, x1)
                  const w = Math.max(1.5, Math.abs(x1 - x0))
                  const wide = w > 24
                  return (
                    <g key={c.def.key}>
                      <rect
                        className={`matchup__build-seg ${c.relativePoints >= 0 ? 'is-pos' : 'is-neg'}`}
                        x={left} y={cy - barH / 2} width={w} height={barH} rx={2}
                      >
                        <title>{`${track.tm.team.abbreviation} ${c.def.label}: ${signedDelta(c.delta)} ${c.def.short.toLowerCase()} × ${formatRate(c.rate)} = ${formatPoints(c.relativePoints)} pts`}</title>
                      </rect>
                      {wide && <text className={`matchup__build-seg-label ${c.relativePoints >= 0 ? 'is-pos' : 'is-neg'}`} x={(left + left + w) / 2} y={cy} dominantBaseline="central" textAnchor="middle">{c.def.short}</text>}
                      {wide && <text className="matchup__build-seg-pts" x={(left + left + w) / 2} y={cy - barH / 2 - 4} textAnchor="middle">{formatPoints(c.relativePoints)}</text>}
                    </g>
                  )
                })}
                {/* end cap = projected total */}
                <line className="matchup__build-cap" x1={xs(track.tm.projectedPoints)} y1={cy - barH / 2 - 3} x2={xs(track.tm.projectedPoints)} y2={cy + barH / 2 + 3} style={{ stroke: track.color }} />
                <text className="matchup__build-proj" x={xs(track.tm.projectedPoints) + (track.tm.projectedPoints >= analysis.baseline ? 6 : -6)} y={cy} dominantBaseline="central" textAnchor={track.tm.projectedPoints >= analysis.baseline ? 'start' : 'end'} style={{ fill: track.color }}>
                  {formatValue(track.tm.projectedPoints)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="matchup__build-legend">
        <span className="matchup__conv-legend-item"><span className="matchup__build-swatch is-pos" /> helps (adds points)</span>
        <span className="matchup__conv-legend-item"><span className="matchup__build-swatch is-neg" /> costs (removes points)</span>
        <span className="matchup__build-margin">
          gap = projected margin <strong style={{ color: analysis.netEdge >= 0 ? teamA.primaryColor : teamB.primaryColor }}>{analysis.netEdge >= 0 ? teamA.abbreviation : teamB.abbreviation} +{Math.abs(analysis.netEdge).toFixed(1)}</strong>
        </span>
      </div>
      <div className="matchup__conv-sums">
        <SumStrip tm={analysis.a} baseline={analysis.baseline} />
        <SumStrip tm={analysis.b} baseline={analysis.baseline} />
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
    {
      key: 'stat',
      header: 'Stat · rate',
      accessor: r => (
        <span className="matchup__ledger-stat">
          <span className="matchup__ledger-stat-name">{r.def.label}</span>
          <span className="matchup__ledger-stat-rate">{formatRate(r.a.rate)} pts / {r.def.short.toLowerCase()}</span>
        </span>
      ),
      sortBy: (a, b) => a.def.label.localeCompare(b.def.label),
    },
    {
      key: 'a',
      header: <span style={{ color: teamA.primaryColor }}>{teamA.abbreviation}: avg − lg = Δ × rate = pts</span>,
      accessor: r => <DerivationLine c={r.a} />,
      sortBy: (a, b) => a.a.relativePoints - b.a.relativePoints,
    },
    {
      key: 'b',
      header: <span style={{ color: teamB.primaryColor }}>{teamB.abbreviation}: avg − lg = Δ × rate = pts</span>,
      accessor: r => <DerivationLine c={r.b} />,
      sortBy: (a, b) => a.b.relativePoints - b.b.relativePoints,
    },
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
      caption="Every number, in full. Each team's cell is the formula spelled out with units: per-game average minus the league average gives the deviation (Δ), times the rate (points per stat) gives the points. The block below sums each team's five into its projected total."
    >
      <div className="matchup__chart-scroll">
        <Table
          variant="sortable"
          data={rows}
          columns={columns}
          getRowId={r => r.key}
          caption={`${teamA.name} vs ${teamB.name} non-scoring points ledger`}
        />
      </div>
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

/**
 * Where the rates come from, and a way to change them. Each rate is the
 * league's points-per-possession (computed from the teams) times the stat's
 * possession weight. Sliders override any rate; reset restores the data-fit.
 */
function PricingPanel({ rates, onChange }: { rates: Record<StatKey, number>; onChange: (r: Record<StatKey, number>) => void }) {
  const maxRate = maxAbsRate(rates)
  const dirty = STAT_DEFS.some(d => Math.abs(rates[d.key] - DEFAULT_RATES[d.key]) > 0.001)
  const set = (key: StatKey, value: number) => onChange({ ...rates, [key]: value })

  return (
    <details className="matchup__pricing" open>
      <summary className="matchup__pricing-summary">
        How each stat is priced — points per stat
        <span className="matchup__pricing-hint">{dirty ? 'custom rates' : 'data-derived · drag to adjust'}</span>
      </summary>
      <div className="matchup__pricing-body">
        <p className="matchup__pricing-intro">
          A rate is the league's <strong>points per possession</strong> —{' '}
          {LEAGUE_PPP.toFixed(2)}, computed from every team's {''}
          <code>pointsFor / possessions</code> — times how much of a possession
          the stat is worth. So nothing here is a magic number: change a slider
          to price a stat your own way, and every view, projection, and the{' '}
          {formatValue(LEAGUE_BASELINE_POINTS)} baseline re-derive instantly.
        </p>
        <div className="matchup__pricing-grid">
          {STAT_DEFS.map(d => {
            const rate = rates[d.key]
            const min = d.possessionWeight >= 0 ? 0 : -2
            const max = d.possessionWeight >= 0 ? 2 : 0
            return (
              <div key={d.key} className="pricing-row">
                <div className="pricing-row__head">
                  <span className="pricing-row__name">{d.label}</span>
                  <ConversionChip def={d} rate={rate} maxRate={maxRate} showLabel={false} />
                  <span className="pricing-row__value">{formatRate(rate)} <em>pts / {d.short.toLowerCase()}</em></span>
                </div>
                <input
                  className="pricing-row__slider"
                  type="range"
                  min={min}
                  max={max}
                  step={0.01}
                  value={rate}
                  aria-label={`Points per ${d.label.toLowerCase().replace(/s$/, '')}`}
                  onChange={e => set(d.key, Number(e.target.value))}
                />
                <p className="pricing-row__why">
                  <strong>{LEAGUE_PPP.toFixed(2)} × {d.possessionWeight.toFixed(2)} = {formatRate(DEFAULT_RATES[d.key])}</strong>{' '}
                  {d.rationale}
                </p>
              </div>
            )
          })}
        </div>
        <div className="matchup__pricing-foot">
          <button type="button" className="matchup__pricing-reset" onClick={() => onChange(DEFAULT_RATES)} disabled={!dirty}>
            Reset to data-derived rates
          </button>
          <span className="matchup__pricing-note">A teachable estimate, not an official NBA metric.</span>
        </div>
      </div>
    </details>
  )
}

/** "+2.3" / "-1.4" — signed one-decimal for stat deviations. */
function signedDelta(n: number): string {
  const fixed = Math.abs(n) < 0.05 ? '0.0' : Math.abs(n).toFixed(1)
  return `${n >= 0.05 ? '+' : n <= -0.05 ? '−' : ''}${fixed}`
}
