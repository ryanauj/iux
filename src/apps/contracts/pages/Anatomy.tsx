// ABOUTME: Chapter 3 — "The anatomy of a contract": walks a single 4-year Bird-rights deal through its raises, guarantees, and player option, using a Bar chart for salary-by-year and a Donut for guaranteed vs optional value.

import { Card } from '../../../components/Card/Card'
import { Bar } from '../../../components/Bar/Bar'
import { Donut } from '../../../components/Donut/Donut'
import { PageHeader, KeyIdea, Pager, Disclaimer, StatTile } from '../components/Bits'
import { contractsRoutes } from '../routes'
import {
  SAMPLE_CONTRACT,
  SAMPLE_CONTRACT_BASE,
  SAMPLE_CONTRACT_RAISE,
} from '../data/cap'
import { money, pct } from '../format'
import type { ContractYear } from '../types'

const GUARANTEE_LABEL: Record<ContractYear['guarantee'], string> = {
  full: 'Fully guaranteed',
  partial: 'Partially guaranteed',
  'team-option': 'Team option',
  'player-option': 'Player option',
  non: 'Non-guaranteed',
}

const GUARANTEE_INTENT: Record<ContractYear['guarantee'], 'success' | 'warning' | 'info' | 'danger'> = {
  full: 'success',
  partial: 'warning',
  'team-option': 'info',
  'player-option': 'info',
  non: 'danger',
}

// ABOUTME: Chapter 3 page explaining raises, guarantees, team/player options, and trade kickers via SAMPLE_CONTRACT data from cap.ts; renders a Bar (salary by year) and Donut (guaranteed vs option year) with PageHeader and Pager from Bits.
/**
 * Chapter 3 of Cap School. Displays a worked four-year Bird-rights extension
 * (SAMPLE_CONTRACT from cap.ts) and explains the three dimensions of a real
 * deal: the 8% vs 5% raise rule, guarantee status (full / player-option), and
 * ancillary wrinkles like trade kickers and incentives. Visualised with a Bar
 * chart for year-by-year salary and a Donut breaking guaranteed vs optional value.
 */
export function Anatomy() {
  const total = SAMPLE_CONTRACT.reduce((s, y) => s + y.salary, 0)
  const guaranteed = SAMPLE_CONTRACT
    .filter(y => y.guarantee === 'full' || y.guarantee === 'partial')
    .reduce((s, y) => s + y.salary, 0)
  const optional = total - guaranteed

  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 3 · A single deal"
        title="The anatomy of a contract"
        lede={
          <>
            A team's payroll is just a stack of individual deals, so zoom all the
            way in to one. Here's a real-shaped contract: <strong>$30M</strong>{' '}
            to start, four years, about <strong>$134M</strong> on the headline.
            That headline number is almost never what the team actually pays,
            and this page works through why.
          </>
        }
      />

      <section className="cap-page__section">
        <div className="cap-statrow">
          <StatTile label="Starting salary" value={money(SAMPLE_CONTRACT_BASE)} sub="Year 1 base" />
          <StatTile label="Annual raise" value={pct(SAMPLE_CONTRACT_RAISE)} sub="Bird max (8%)" />
          <StatTile label="Length" value={`${SAMPLE_CONTRACT.length} yrs`} sub="Up to 5 with Bird" />
          <StatTile label="Total value" value={money(total)} sub="Across all years" />
        </div>
      </section>

      <section className="cap-page__section cap-split">
        <Card variant="static" title="Salary by year" subtitle="8% of Year 1 added each season" className="cap-split__aside">
          <Bar
            variant="simple"
            height={240}
            data={SAMPLE_CONTRACT.map(y => ({
              key: y.label,
              label: y.label,
              value: y.salary,
              intent: y.guarantee === 'player-option' ? 'info' : 'primary',
            }))}
            formatValue={money}
          />
        </Card>
        <div className="cap-split__main">
          <h2 className="cap-page__h2">Raises: 8% vs 5%</h2>
          <p className="cap-page__p">
            Raises are a flat percentage of the <em>first-year</em> salary, not
            compounding off the prior year. A team re-signing its own player
            with <strong>Bird rights</strong> can give 8% raises; everyone else
            is capped at 5%. On a {money(SAMPLE_CONTRACT_BASE)} starting
            salary, 8% means each year climbs by{' '}
            <strong>{money(SAMPLE_CONTRACT_BASE * SAMPLE_CONTRACT_RAISE)}</strong>.
          </p>
          <KeyIdea tone="success" title="Why teams hoard Bird rights">
            Bigger raises <em>and</em> a fifth year mean a team can almost
            always offer its own free agent more total money than any rival
            can. That's by design — the league wants stars to be able to stay.
          </KeyIdea>
        </div>
      </section>

      <section className="cap-page__section cap-split">
        <div className="cap-split__main">
          <h2 className="cap-page__h2">Guarantees & options: why the headline lies</h2>
          <p className="cap-page__p">
            The years add up to that $134M headline, but not every year is real
            money yet. Each one carries a guarantee status that decides whether
            the team is actually on the hook for it:
          </p>
          <ul className="cap-anatomy-years">
            {SAMPLE_CONTRACT.map(y => (
              <li key={y.label} className={`cap-anatomy-years__row cap-anatomy-years__row--${GUARANTEE_INTENT[y.guarantee]}`}>
                <span className="cap-anatomy-years__yr">{y.label}</span>
                <span className="cap-anatomy-years__amt">{money(y.salary)}</span>
                <span className="cap-anatomy-years__tag">{GUARANTEE_LABEL[y.guarantee]}</span>
              </li>
            ))}
          </ul>
          <p className="cap-page__p cap-page__p--muted">
            A <strong>player option</strong> lets the player choose to stay or
            become a free agent; a <strong>team option</strong> gives the team
            that choice. <strong>Non-guaranteed</strong> money can be waived
            with little or no cost — common on minimum and end-of-bench deals.
          </p>
        </div>
        <Card variant="static" title="Guaranteed vs optional" className="cap-split__aside">
          <Donut
            variant="labeled"
            size={220}
            showTotal
            caption="of total contract value"
            data={[
              { key: 'g', label: 'Guaranteed', value: guaranteed, intent: 'success' },
              { key: 'o', label: 'Option year', value: optional, intent: 'info' },
            ]}
            formatValue={money}
          />
        </Card>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="info" title="Two more wrinkles">
          A <strong>trade kicker</strong> can pay a player a bonus (up to 15%
          of the remaining salary) if they're traded. <strong>Incentives</strong>{' '}
          are split into "likely" and "unlikely" buckets that count against the
          cap differently. Both are common on star deals and both are smoothed
          over in the numbers above.
        </KeyIdea>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'The cap ladder', to: contractsRoutes.ladder() }}
        next={{ label: 'Max & rookie deals', to: contractsRoutes.maxDeals() }}
      />
    </article>
  )
}
