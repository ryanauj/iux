import { Card } from '../../../components/Card/Card'
import { PageHeader, KeyIdea, Pager, Disclaimer } from '../components/Bits'
import { CapLadder } from '../components/CapLadder'
import { contractsRoutes } from '../routes'
import { THRESHOLDS, SEASON } from '../data/cap'
import { money } from '../format'

export function Ladder() {
  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 2 · The thresholds"
        title="The cap ladder"
        lede={
          <>
            You already have the shape from Chapter 1: one climb, getting more
            punishing toward the top. Now we'll put names on the rungs — but the
            useful part isn't the names. It's the <strong>gaps between
            them</strong>. How far apart these lines sit is what quietly decides
            how every team behaves.
          </>
        }
      />

      <section className="cap-page__section cap-split">
        <Card variant="static" className="cap-split__aside cap-ladder-card">
          <CapLadder />
        </Card>
        <div className="cap-split__main">
          <h2 className="cap-page__h2">The gaps are the story</h2>
          <p className="cap-page__p">
            Look at how unevenly the rungs are spaced. From the cap to the tax
            line is a wide{' '}
            <strong>{money(SEASON.taxLine - SEASON.salaryCap)}</strong> — that's
            breathing room, the zone where a team can build a real roster before
            any meter starts running.
          </p>
          <p className="cap-page__p">
            Then the rungs bunch up. The tax line to the first apron is only{' '}
            <strong>{money(SEASON.firstApron - SEASON.taxLine)}</strong>, and the
            first apron to the second just{' '}
            <strong>{money(SEASON.secondApron - SEASON.firstApron)}</strong>.
            Two or three good contracts can carry a team across both. So a club
            that decides to pay the tax often finds itself a single signing away
            from the apron rules slamming shut — which is exactly why the top of
            this ladder feels so much steeper than the bottom.
          </p>
        </div>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Your map for the rest of the guide</h2>
        <p className="cap-page__p">
          Here's every rung, bottom to top, with the one thing that changes when
          a payroll crosses it. Don't try to memorize them — each gets its own
          chapter. Treat this as the index you'll keep coming back to.
        </p>
        <ol className="cap-rungs-list">
          {THRESHOLDS.map(t => (
            <li key={t.id} className={`cap-rungs-list__item cap-rungs-list__item--${t.intent}`}>
              <div className="cap-rungs-list__head">
                <span className="cap-rungs-list__label">{t.label}</span>
                <span className="cap-rungs-list__amount">{money(t.amount)}</span>
              </div>
              <p className="cap-rungs-list__blurb">{t.blurb}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="warning" title="One ladder, two very different halves">
          The bottom half is soft: teams cross the cap routinely, and the tax is
          just a price. The top behaves like a real wall — at the second apron a
          team genuinely cannot add salary in most of the usual ways. Same
          ladder, but the consequences flip from "expensive" to "impossible" as
          you climb. The chapters ahead walk up it one rung at a time.
        </KeyIdea>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'Overview', to: contractsRoutes.overview() }}
        next={{ label: 'Contract anatomy', to: contractsRoutes.anatomy() }}
      />
    </article>
  )
}
