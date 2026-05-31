import { useState } from 'react'
import { Card } from '../../../components/Card/Card'
import { Waterfall, type WaterfallStep } from '../../../components/Waterfall/Waterfall'
import { Segmented } from '../../../components/Segmented/Segmented'
import { Table, type TableColumn } from '../../../components/Table/Table'
import { PageHeader, KeyIdea, Pager, Disclaimer, StatTile } from '../components/Bits'
import { contractsRoutes } from '../routes'
import { TAX_BRACKETS, SEASON, computeTax } from '../data/cap'
import { money, moneyFull, rate } from '../format'
import type { TaxBracket } from '../types'

const OVERAGE_PRESETS = [
  { value: '5000000', label: '$5M over' },
  { value: '10000000', label: '$10M over' },
  { value: '20000000', label: '$20M over' },
  { value: '40000000', label: '$40M over' },
]

const bracketColumns: TableColumn<TaxBracket>[] = [
  {
    key: 'band',
    header: 'Amount over the tax line',
    accessor: b =>
      b.to
        ? `${money(b.from)} – ${money(b.to)}`
        : `${money(b.from)} and up`,
  },
  {
    key: 'standard',
    header: 'Standard rate',
    align: 'end',
    accessor: b => <span className="cap-rate-pill cap-rate-pill--standard">{rate(b.standardRate)}</span>,
  },
  {
    key: 'repeater',
    header: 'Repeater rate',
    align: 'end',
    accessor: b => <span className="cap-rate-pill cap-rate-pill--repeater">{rate(b.repeaterRate)}</span>,
  },
]

export function LuxuryTax() {
  const [mode, setMode] = useState<'standard' | 'repeater'>('standard')
  const [overageStr, setOverageStr] = useState('20000000')
  const overage = Number(overageStr)
  const payroll = SEASON.taxLine + overage
  const { total, steps } = computeTax(payroll, mode)

  // Keep the chart's category labels short so they don't collide on narrow
  // screens — the per-bracket rate lives in the bracket table above and in
  // each bar's tooltip. "$0M–$5M over" → "$0–5M".
  const waterfallSteps: WaterfallStep[] = [
    ...steps.map(s => ({
      key: s.label,
      label: s.label
        .replace(' over', '')
        .replace('M–+', 'M+')
        .replace(/M–\$/g, '–'),
      value: s.tax,
    })),
    { key: 'total', label: 'Total', value: 0, subtotal: true },
  ]

  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 6 · The first brake"
        title="The luxury tax"
        lede={
          <>
            Cross the tax line and every dollar above it costs you a second
            dollar — paid to the league, not your players. You'd guess that
            penalty is a flat percentage. It isn't, and the gap between what
            you'd guess and what you actually owe is the point: the rate{' '}
            <strong>climbs in brackets</strong>, so the deeper a team goes, the
            more each extra dollar stings.
          </>
        }
      />

      <section className="cap-page__section">
        <div className="cap-statrow">
          <StatTile label="Tax line" value={money(SEASON.taxLine)} sub={`${SEASON.label} season`} />
          <StatTile label="First dollar over" value={rate(1.5)} sub="Standard rate" />
          <StatTile label="Deepest standard rate" value={`${rate(3.75)}+`} sub="$20M+ over, and rising" />
          <StatTile label="Repeater penalty" value="+$1.00" sub="Per bracket, for chronic payers" />
        </div>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">The bracket table</h2>
        <p className="cap-page__p">
          Tax is <strong>incremental</strong>, like income tax: a team $12M over
          pays the low rate on its first $5M, a higher rate on the next $5M, and
          so on. The <strong>repeater</strong> rates apply to teams that paid
          the tax in three of the previous four seasons.
        </p>
        <Table
          variant="static"
          data={TAX_BRACKETS}
          columns={bracketColumns}
          getRowId={(_b, i) => String(i)}
          caption="Marginal luxury-tax rates, dollars of tax per dollar over the line"
        />
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Worked example</h2>
        <p className="cap-page__p">
          Pick how far over the tax line a team is and watch the bill build
          bracket by bracket. Each black box is the <strong>tax owed on one $5M
          slice</strong> of salary above the line — labelled by the slice it
          covers ("$5–10M over") but sized by the tax that slice generates. The
          boxes stack because the bill accumulates, and the red bar is the{' '}
          <strong>running total</strong>: every slice's tax added together.
          Toggle the repeater rates to see why chronic tax teams pay so much
          more.
        </p>
        <div className="cap-controls">
          <Segmented
            ariaLabel="Amount over the tax line"
            items={OVERAGE_PRESETS}
            value={overageStr}
            onValueChange={setOverageStr}
          />
          <Segmented
            ariaLabel="Tax mode"
            items={[
              { value: 'standard', label: 'Standard' },
              { value: 'repeater', label: 'Repeater' },
            ]}
            value={mode}
            onValueChange={v => setMode(v as 'standard' | 'repeater')}
          />
        </div>

        <div className="cap-split">
          <Card variant="static" title="How the bill builds" subtitle="Black: tax per $5M slice · Red: total bill" className="cap-split__aside">
            <Waterfall
              variant="subtotals"
              height={260}
              steps={waterfallSteps}
              formatValue={money}
            />
          </Card>
          <div className="cap-split__main">
            <div className="cap-bigresult">
              <span className="cap-bigresult__label">
                A team {money(overage)} over the line pays
              </span>
              <span className="cap-bigresult__value">{money(total)}</span>
              <span className="cap-bigresult__sub">
                {moneyFull(total)} in {mode} luxury tax — on top of the{' '}
                {money(overage)} in salary itself.
              </span>
            </div>
            <KeyIdea tone="warning" title="The hidden multiplier">
              At {money(overage)} over, every additional dollar of salary near
              the top costs the team that dollar <em>plus</em> up to{' '}
              {rate(mode === 'repeater' ? 4.75 : 3.75)} in tax. A "{money(5_000_000)}"
              role player can have a real cost several times his salary.
            </KeyIdea>
          </div>
        </div>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'Exceptions & tools', to: contractsRoutes.exceptions() }}
        next={{ label: 'The aprons', to: contractsRoutes.aprons() }}
      />
    </article>
  )
}
