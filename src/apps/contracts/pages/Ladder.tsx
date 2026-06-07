// ABOUTME: Chapter 2 — "The cap ladder": names every payroll threshold and explains why the bunching of lines near the top (tax → first apron → second apron) makes the climb feel steeper the higher a team goes.

import { Card } from '../../../components/Card/Card'
import { PageHeader, KeyIdea, Pager, Disclaimer } from '../components/Bits'
import { CapLadder } from '../components/CapLadder'
import { contractsRoutes } from '../routes'
import { THRESHOLDS, SEASON } from '../data/cap'
import { money } from '../format'

// ABOUTME: Chapter 2 page pairing CapLadder (full scale, no highlight) with a prose section showing the dollar gaps between rungs, plus an ordered list of all five thresholds from THRESHOLDS (cap.ts) with their one-line blurbs as an index for the chapters ahead.
/**
 * Chapter 2 of Cap School. Shows the CapLadder beside computed gap figures
 * (e.g. cap-to-tax vs tax-to-first-apron vs first-to-second-apron) to make
 * the visual spacing meaningful, then renders an <ol> of every threshold from
 * THRESHOLDS so readers have a named-rung reference before the later chapters
 * each take one rung in depth.
 */
export function Ladder() {
  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 2 · The thresholds"
        title="The cap ladder"
        lede={
          <>
            Chapter 1 gave the shape: one climb, getting steeper toward the top.
            This chapter puts names on the rungs. What matters most is the{' '}
            <strong>gaps between them</strong>: how far apart these lines sit is
            what quietly decides how every team behaves.
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
        <h2 className="cap-page__h2">A map for the rest of the guide</h2>
        <p className="cap-page__p">
          Here's every rung, bottom to top, with the one thing that changes when
          a payroll crosses it. Don't try to memorize them — each gets its own
          chapter. Treat this as the index to return to.
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
          just a price. The top works differently: at the second apron most of
          the usual ways to add outside salary are simply switched off. (A team
          can still climb past it re-signing its own; what it loses is the tools
          to bring anyone new in.) Same ladder, but as a team climbs the question
          shifts from "can we afford it?" to "are we even allowed?" The chapters
          ahead walk up it one rung at a time.
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
