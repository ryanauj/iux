import { Card } from '../../../components/Card/Card'
import { Table, type TableColumn } from '../../../components/Table/Table'
import { PageHeader, KeyIdea, Pager, Disclaimer } from '../components/Bits'
import { contractsRoutes } from '../routes'
import { EXCEPTIONS } from '../data/cap'
import { money } from '../format'
import type { Exception } from '../types'

const APRON_LABEL: Record<Exception['apronLimited'], string> = {
  none: 'Always available',
  first: 'Lost at first apron',
  second: 'Lost at second apron',
}

const columns: TableColumn<Exception>[] = [
  {
    key: 'name',
    header: 'Exception',
    accessor: e => (
      <div className="cap-exc-name">
        <span className="cap-exc-name__short">{e.shortName}</span>
        <span className="cap-exc-name__full">{e.name}</span>
      </div>
    ),
    sortBy: (a, b) => a.shortName.localeCompare(b.shortName),
    valueOf: e => e.shortName,
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'end',
    accessor: e => (e.amount ? money(e.amount) : <span className="cap-muted">Varies</span>),
    sortBy: (a, b) => (a.amount ?? 0) - (b.amount ?? 0),
    valueOf: e => e.amount ?? 0,
  },
  {
    key: 'years',
    header: 'Max yrs',
    align: 'end',
    accessor: e => e.maxYears,
    sortBy: (a, b) => a.maxYears - b.maxYears,
    valueOf: e => e.maxYears,
  },
  {
    key: 'apron',
    header: 'Apron limit',
    accessor: e => (
      <span className={`cap-apron-tag cap-apron-tag--${e.apronLimited}`}>
        {APRON_LABEL[e.apronLimited]}
      </span>
    ),
    valueOf: e => e.apronLimited,
  },
]

export function Exceptions() {
  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 5 · Spending over the cap"
        title="Exceptions & tools"
        lede={
          <>
            This is what makes the cap "soft". A team over the cap can't just
            sign anyone — but it can reach for an <strong>exception</strong>,
            a specific, pre-authorised way to add salary anyway. Knowing which
            tool a team has is the key to reading any offseason.
          </>
        }
      />

      <section className="cap-page__section">
        <KeyIdea tone="info" title="The hierarchy">
          The most powerful tool is <strong>Bird rights</strong> — the ability
          to re-sign your own player for the max even while deep over the cap.
          Everything else is a way to add an <em>outside</em> player: the
          mid-level for a meaningful signing, the bi-annual and minimum for
          depth.
        </KeyIdea>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">The toolbox</h2>
        <p className="cap-page__p">
          Sort by amount or length to compare. Note the right-hand column: the
          aprons (Chapter 7) switch several of these tools off entirely.
        </p>
        <Table
          variant="sortable"
          data={EXCEPTIONS}
          columns={columns}
          getRowId={e => e.id}
          defaultSort={{ key: 'amount', dir: 'desc' }}
          caption="Salary-cap exceptions for the 2025–26 season"
        />
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">In plain English</h2>
        <div className="cap-exc-cards">
          {EXCEPTIONS.map(e => (
            <Card key={e.id} variant="static" title={e.name} subtitle={e.amount ? money(e.amount) : `Up to ${e.maxYears} yrs`}>
              <p className="cap-exc-cards__summary">{e.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="warning" title="Sign-and-trade">
          When a free agent's team has Bird rights but the player wants to
          leave, the two teams can arrange a <strong>sign-and-trade</strong>:
          the old team signs him (using its Bird rights for a bigger deal) and
          immediately trades him. It's how a player can change teams and still
          get the larger contract — but it hard-caps the receiving team at the
          first apron.
        </KeyIdea>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'Max & rookie deals', to: contractsRoutes.maxDeals() }}
        next={{ label: 'The luxury tax', to: contractsRoutes.tax() }}
      />
    </article>
  )
}
