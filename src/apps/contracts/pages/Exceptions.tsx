// ABOUTME: Chapter 5 — "Exceptions & tools": presents the eight salary-cap exceptions with a sortable Table and three featured cards for Bird rights, the full mid-level, and veteran minimums — the tools that explain most offseason signings.

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
    header: 'Max salary',
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
    job: 'Keep a homegrown free agent',
    blurb: (
      <>
        After three seasons with a team, a player becomes that team's to
        re-sign for anything up to the max — even while the team is deep over
        the cap. This is the tool that made the wall soft back in Chapter 1, and
        the reason a team can keep the star it drafted instead of watching him
        leave for nothing.
      </>
    ),
  },
  {
    exc: byId('mle-nt'),
    job: 'Sign one good outsider',
    blurb: (
      <>
        Bird rights only help with players already on a team's roster. The
        mid-level is a team's one real swing at someone else's free agent —
        about {money(byId('mle-nt').amount ?? 0)} a year, roughly the going rate
        for a solid rotation player. Reaching for the full version pins the
        team's ceiling at the first apron for the season (Chapter 7).
      </>
    ),
  },
  {
    exc: byId('min'),
    job: 'Fill the last seats',
    blurb: (
      <>
        No matter how far over the cap a team is, it can sign minimum deals.
        It's how the back half of every bench gets built. The league even
        reimburses part of a veteran's minimum, so an experienced player costs
        the team barely more than a younger one in the same seat.
      </>
    ),
  },
]

// ABOUTME: Chapter 5 page rendering the EXCEPTIONS data from cap.ts: three featured-tool cards (Bird, full MLE, minimum) explain the core patterns, then a sortable Table lists all eight exceptions with max salary, max years, and the apron that kills each one.
/**
 * Chapter 5 of Cap School. Surfaces EXCEPTIONS from cap.ts in two layers: a
 * trio of explanation cards for the three tools (Bird rights, non-taxpayer MLE,
 * veteran minimum) that cover the majority of real signings, plus a sortable
 * Table for the full eight-exception reference. A KeyIdea callout also covers
 * sign-and-trade and its first-apron hard-cap consequence.
 */
export function Exceptions() {
  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 5 · Spending over the cap"
        title="Exceptions & tools"
        lede={
          <>
            Chapter 1 showed the cap is soft: nearly every team spends past it.
            But soft doesn't mean open. A team over the cap can't just add salary
            freely — each dollar over the line has to come through a specific,
            pre-authorized <em>exception</em>, a named and legal way to add a
            player. One has already appeared: the{' '}
            <strong>Bird rights</strong> that let a team re-sign its own stars.
            This chapter lays out the full toolbox — including how a capped-out
            team adds someone from <em>outside</em>.
          </>
        }
      />

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Three tools do most of the work</h2>
        <p className="cap-page__p">
          There are eight exceptions in all, but the great majority of signings
          can be read with just three. Each answers a different need a team
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
          weaker re-signing rights for a player who's been with a team a shorter
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
          Here's the complete set for reference — sort by salary or length to
          compare. Read the <strong>max salary</strong> column as the most a team
          can pay through that door, not a fee: an exception adds salary, it
          doesn't cost the team anything to use (the tax bill comes later, in
          Chapter 6). The table doesn't need memorizing, but do glance at the
          right-hand column: the aprons (Chapter 7) switch several of these tools
          off entirely, and which ones a team has left is the whole story of its
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
