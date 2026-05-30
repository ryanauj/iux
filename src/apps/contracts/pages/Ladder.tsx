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
            There isn't one line — there are five. Each rung a team's payroll
            crosses either <strong>unlocks</strong> a spending tool or{' '}
            <strong>takes one away</strong>. Climbing higher buys more talent
            but costs money and flexibility. Here's every rung, bottom to top.
          </>
        }
      />

      <section className="cap-page__section cap-split">
        <Card variant="static" className="cap-split__aside cap-ladder-card">
          <CapLadder />
        </Card>
        <div className="cap-split__main">
          <h2 className="cap-page__h2">Reading the rungs</h2>
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
        </div>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="warning" title="Soft cap, hard ceilings">
          The salary cap itself is soft — teams cross it routinely. But the
          second apron behaves like a true hard cap: a team there genuinely
          cannot add salary in most ways. The middle rungs (tax, first apron)
          are the in-between zone where spending is allowed but increasingly
          painful.
        </KeyIdea>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">The distances matter</h2>
        <p className="cap-page__p">
          The rungs aren't evenly spaced, and the spacing is the story. The
          jump from the cap to the tax line is{' '}
          <strong>{money(SEASON.taxLine - SEASON.salaryCap)}</strong> of room
          to operate before the meter starts running. But the tax line to the
          first apron is only{' '}
          <strong>{money(SEASON.firstApron - SEASON.taxLine)}</strong>, and the
          first to the second apron just{' '}
          <strong>{money(SEASON.secondApron - SEASON.firstApron)}</strong> — so
          a team that pays the tax is often only a couple of contracts away
          from the apron restrictions kicking in.
        </p>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'Overview', to: contractsRoutes.overview() }}
        next={{ label: 'Contract anatomy', to: contractsRoutes.anatomy() }}
      />
    </article>
  )
}
