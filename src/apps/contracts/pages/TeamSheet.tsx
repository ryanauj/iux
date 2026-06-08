// ABOUTME: Chapter 9 — "A team cap sheet": assembles all prior concepts on one illustrative 12-player roster (SAMPLE_ROSTER), placing the total payroll on the CapLadder and showing the resulting luxury-tax bill, with a sortable Table and Bar chart of individual cap hits.

import { Card } from '../../../components/Card/Card'
import { Table, type TableColumn } from '../../../components/Table/Table'
import { Bar } from '../../../components/Bar/Bar'
import { PageHeader, KeyIdea, Pager, Disclaimer, StatTile } from '../components/Bits'
import { CapLadder } from '../components/CapLadder'
import { contractsRoutes } from '../routes'
import {
  SAMPLE_ROSTER,
  SAMPLE_TEAM_NAME,
  rosterTotal,
  computeTax,
  SEASON,
} from '../data/cap'
import { money, moneyFull } from '../format'
import type { RosterSpot } from '../types'

// ABOUTME: Column definitions for the sortable cap-sheet Table: player name + role, signing tool ("via"), and cap hit amount.
const columns: TableColumn<RosterSpot>[] = [
  {
    key: 'player',
    header: 'Player',
    accessor: r => (
      <div className="cap-roster-name">
        <span className="cap-roster-name__player">{r.player}</span>
        <span className="cap-roster-name__role">{r.role}</span>
      </div>
    ),
    valueOf: r => r.player,
  },
  {
    key: 'via',
    header: 'Signed via',
    accessor: r => <span className="cap-via-tag">{r.via}</span>,
    sortBy: (a, b) => a.via.localeCompare(b.via),
    valueOf: r => r.via,
  },
  {
    key: 'salary',
    header: 'Cap hit',
    align: 'end',
    accessor: r => <strong>{money(r.salary)}</strong>,
    sortBy: (a, b) => a.salary - b.salary,
    valueOf: r => r.salary,
  },
]

// ABOUTME: Chapter 9 page that calls rosterTotal and computeTax (cap.ts) to derive payroll, cap overage, and tax bill, then renders a CapLadder with a payroll marker, a horizontal Bar of cap hits, and a sortable Table tagged by the signing tool used for each slot.
/**
 * Chapter 9 of Cap School — the synthesis chapter. Loads SAMPLE_ROSTER from
 * cap.ts, computes the total payroll and standard-rate tax bill, and shows
 * where the fictional Harbor City Foghorns land on the cap ladder. The "signed
 * via" column names every exception or mechanism from earlier chapters so
 * readers can trace the whole system in one place.
 */
export function TeamSheet() {
  const total = rosterTotal()
  const { total: tax, overage } = computeTax(total, 'standard')
  const overCap = total - SEASON.salaryCap
  const aboveFirst = total > SEASON.firstApron
  const aboveSecond = total > SEASON.secondApron

  const zone = aboveSecond
    ? 'above the second apron'
    : aboveFirst
      ? 'between the first and second apron'
      : total > SEASON.taxLine
        ? 'in the luxury tax'
        : 'under the tax line'

  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 9 · Putting it together"
        title="A team cap sheet"
        lede={
          <>
            Now every piece in one place. Here's an illustrative contender — the{' '}
            <strong>{SAMPLE_TEAM_NAME}</strong> — where every contract was built
            with a tool from the earlier chapters: Bird re-signings, a mid-level,
            rookie scales, minimums. The "signed via" column names each one.
            Watch how twelve deals stack against the ladder, and what the whole
            thing costs.
          </>
        }
      />

      <section className="cap-page__section">
        <div className="cap-statrow">
          <StatTile label="Total payroll" value={money(total)} sub={`${SAMPLE_ROSTER.length} players`} />
          <StatTile label="Over the cap" value={money(overCap)} sub={`Cap is ${money(SEASON.salaryCap)}`} />
          <StatTile label="Over the tax line" value={money(overage)} sub="Taxable amount" />
          <StatTile label="Luxury-tax bill" value={money(tax)} sub="Standard rates" />
        </div>
      </section>

      <section className="cap-page__section cap-split">
        <Card variant="static" className="cap-split__aside cap-ladder-card">
          <CapLadder payroll={total} />
        </Card>
        <div className="cap-split__main">
          <h2 className="cap-page__h2">Where they land</h2>
          <p className="cap-page__p">
            At <strong>{money(total)}</strong>, the {SAMPLE_TEAM_NAME} sit{' '}
            <strong>{zone}</strong>. They're paying{' '}
            <strong>{moneyFull(tax)}</strong> in luxury tax — so the true cost
            of this roster to ownership is about{' '}
            <strong>{money(total + tax)}</strong> once the tax is added on top
            of the salaries.
          </p>
          <KeyIdea tone={aboveFirst ? 'danger' : 'warning'} title="The trade-off in one team">
            This roster is good <em>because</em> it's expensive — two max deals
            re-signed with Bird rights, a full mid-level addition, and depth.
            But sitting above the first apron, the {SAMPLE_TEAM_NAME} have
            already lost the sign-and-trade and the bigger mid-level. To get
            better, they mostly have to get younger or cheaper first.
          </KeyIdea>
        </div>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Payroll, contract by contract</h2>
        <p className="cap-page__p">
          Sort by cap hit or by the tool used to add each player. Notice how a
          handful of large deals dominate — the stars eat most of the room, and
          everything else is built with exceptions and minimums around them.
        </p>
        <div className="cap-split">
          <Card variant="static" title="Cap hits, largest first" className="cap-split__aside">
            <Bar
              variant="sorted"
              orientation="horizontal"
              height={320}
              data={SAMPLE_ROSTER.map(r => ({
                key: r.id,
                label: r.player,
                value: r.salary,
                intent: r.salary >= 30_000_000 ? 'primary' : r.salary >= 10_000_000 ? 'info' : 'neutral',
              }))}
              formatValue={money}
            />
          </Card>
          <div className="cap-split__main">
            <Table
              variant="sortable"
              data={SAMPLE_ROSTER}
              columns={columns}
              getRowId={r => r.id}
              defaultSort={{ key: 'salary', dir: 'desc' }}
              caption={`${SAMPLE_TEAM_NAME} — illustrative ${SEASON.label} cap sheet`}
            />
          </div>
        </div>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">How a team gets here</h2>
        <p className="cap-page__p">
          Read the "signed via" column top to bottom and the whole life cycle of
          a contender comes into view. It begins at the draft: the cheap
          rookie-scale deals — the lottery and sophomore wings — are where most
          cores start, and their below-market price is what bankrolls everything
          above them. A team develops those picks, then re-signs the ones who hit
          using <strong>Bird rights</strong> (both max deals here), turning cheap
          talent into expensive talent it gets to keep. As the payroll climbs the
          cap closes the cheap doors: outside help now arrives only through the{' '}
          <strong>mid-level</strong>, <strong>minimums</strong>, and matched
          trades, and draft picks become the currency for any real upgrade.
        </p>
        <p className="cap-page__p">
          That arc is a GM's job in one line: draft cheap, develop, re-sign its
          own, and spend the surplus and the picks before the aprons close the
          window. The {SAMPLE_TEAM_NAME} are near the end of it — a finished
          contender whose next move is the hardest one.
        </p>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="success" title="The whole system, in one place">
          A cap and a floor, a contract's raises and guarantees, the max tiers,
          the exceptions that beat the cap, the tax that costs a team for
          spending, and the aprons that restrict it further. Every offseason
          headline is just some combination of these moving parts.
        </KeyIdea>
      </section>

      <Disclaimer />
      <Pager prev={{ label: 'Trades & multi-team deals', to: contractsRoutes.trades() }} />
    </article>
  )
}
