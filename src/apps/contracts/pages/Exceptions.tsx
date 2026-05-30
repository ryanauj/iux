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

const byId = (id: string): Exception => EXCEPTIONS.find(e => e.id === id)!

/** The three tools that explain most of what you'll see in any offseason. */
const CORE = [
  {
    exc: byId('bird'),
    job: 'Keep your own free agent',
    blurb: (
      <>
        After three seasons with you, a player becomes yours to re-sign for
        anything up to the max — even while you're deep over the cap. This is the
        tool that made the wall soft back in Chapter 1: it's the reason your star
        never has to walk for nothing. The single most valuable thing a team can
        own.
      </>
    ),
  },
  {
    exc: byId('mle-nt'),
    job: 'Sign one good outsider',
    blurb: (
      <>
        Bird rights only help with players already on your roster. The mid-level
        is your one real swing at someone else's free agent — about{' '}
        {money(byId('mle-nt').amount ?? 0)} a year, roughly the going rate for a
        solid rotation player. Reaching for the full version pins your ceiling at
        the first apron for the season (Chapter 7).
      </>
    ),
  },
  {
    exc: byId('min'),
    job: 'Fill the last seats',
    blurb: (
      <>
        No matter how far over the cap you are, you can always sign minimum
        deals. It's how the back half of every bench gets built. The league even
        reimburses part of a veteran's minimum, so a team is never penalized for
        signing an older player to round out the roster.
      </>
    ),
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
            Here's the puzzle Chapter 1 left open. Almost every team sits{' '}
            <em>above</em> the cap line — and the cap says a team over it can't
            add salary. So how does anyone ever sign anyone? The answer is a set
            of pre-authorized exceptions, each one a specific, legal way to add a
            player anyway. This is the machinery that makes the cap "soft".
          </>
        }
      />

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Three tools do most of the work</h2>
        <p className="cap-page__p">
          There are eight exceptions in all, but you can read the great majority
          of signings with just three. Each answers a different need a team
          actually has:
        </p>
        <div className="cap-exc-cards">
          {CORE.map(({ exc, job, blurb }) => (
            <Card
              key={exc.id}
              variant="static"
              accent="primary"
              title={job}
              subtitle={`${exc.shortName} · ${exc.amount ? money(exc.amount) : `up to ${exc.maxYears} yrs`}`}
            >
              <p className="cap-exc-cards__summary">{blurb}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="info" title="Everything else is a variation on these">
          The other five tools are just finer-grained versions of the same three
          ideas. <strong>Early Bird</strong> and <strong>Non-Bird</strong> are
          weaker re-signing rights for a player who's been with you a shorter
          time. The <strong>taxpayer mid-level</strong> and{' '}
          <strong>room exception</strong> are smaller outsider-signing tools for
          teams in different cap spots. The <strong>bi-annual</strong> is a small
          every-other-year bonus. Learn the three above and the rest slot in
          around them.
        </KeyIdea>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">The full toolbox</h2>
        <p className="cap-page__p">
          Here's the complete set for reference — sort by amount or length to
          compare. You don't need to memorize it, but do glance at the right-hand
          column: the aprons (Chapter 7) switch several of these tools off
          entirely, and which ones a team has left is the whole story of its
          offseason.
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
        <KeyIdea tone="warning" title="Sign-and-trade: how a star still gets paid to leave">
          One wrinkle worth knowing. When a free agent wants out but his current
          team holds his Bird rights, the two clubs can arrange a{' '}
          <strong>sign-and-trade</strong>: the old team re-signs him (using those
          Bird rights for a bigger deal) and immediately trades him away. It's how
          a player can change teams and still land the larger contract — but it
          hard-caps the team receiving him at the first apron, our next-to-last
          rung.
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
