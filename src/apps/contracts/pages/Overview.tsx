import { Card } from '../../../components/Card/Card'
import { Bar } from '../../../components/Bar/Bar'
import { Link } from '../../Link'
import { PageHeader, KeyIdea, StatTile, Pager, Disclaimer } from '../components/Bits'
import { CapLadder } from '../components/CapLadder'
import { contractsRoutes } from '../routes'
import { NAV } from '../shell'
import { SEASON, PRIOR_CAP, THRESHOLDS } from '../data/cap'
import { money, moneySigned, pct } from '../format'

const CHAPTERS = NAV.slice(1) // everything after Overview

export function Overview() {
  const capGrowth = (SEASON.salaryCap - PRIOR_CAP) / PRIOR_CAP

  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 1 · The big picture"
        title="How NBA contracts actually work"
        lede={
          <>
            The NBA runs a <strong>soft cap</strong>: there's a spending limit,
            but a thicket of exceptions lets teams blow past it — for a price
            that climbs the higher they go. This guide starts at that big
            picture and works down into the details, one chapter at a time.
          </>
        }
      />

      <section className="cap-page__section">
        <div className="cap-statrow">
          <StatTile
            label={`Salary cap · ${SEASON.label}`}
            value={money(SEASON.salaryCap)}
            sub={`${moneySigned(SEASON.salaryCap - PRIOR_CAP)} vs last year (${pct(capGrowth)})`}
          />
          <StatTile label="Luxury-tax line" value={money(SEASON.taxLine)} sub="Spend past it, pay the tax" />
          <StatTile label="First apron" value={money(SEASON.firstApron)} sub="Tools start switching off" />
          <StatTile label="Second apron" value={money(SEASON.secondApron)} sub="The real hard cap" />
        </div>
      </section>

      <section className="cap-page__section cap-split">
        <div className="cap-split__main">
          <h2 className="cap-page__h2">Why it's a "soft" cap</h2>
          <p className="cap-page__p">
            A hard cap is a wall: spend a dollar over and you can't. The NBA
            chose something softer. The cap is a baseline, but teams keep their
            own free agents and fill out rosters using <em>exceptions</em> —
            so almost every team operates above the cap line. The brakes come
            instead from a series of higher thresholds, each one more punishing
            than the last.
          </p>
          <KeyIdea tone="info" title="The one idea to hold onto">
            You don't get told "no". You get charged more — in dollars (the
            luxury tax) and in lost flexibility (the aprons). The system is a
            ramp of consequences, not a single wall.
          </KeyIdea>
          <p className="cap-page__p">
            The chart shows how far apart those lines sit this season. The gap
            from the cap to the second apron is more than{' '}
            <strong>{money(SEASON.secondApron - SEASON.salaryCap)}</strong> —
            an enormous amount of room, but every step up it costs more.
          </p>
        </div>
        <Card variant="static" title="This season's thresholds" className="cap-split__aside">
          <Bar
            variant="sorted"
            orientation="horizontal"
            height={220}
            data={THRESHOLDS.map(t => ({
              key: t.id,
              label: t.label,
              value: t.amount,
              intent:
                t.intent === 'success' ? 'success'
                : t.intent === 'warning' ? 'warning'
                : t.intent === 'danger' ? 'danger'
                : 'neutral',
            }))}
            formatValue={money}
          />
        </Card>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">The ladder, at a glance</h2>
        <p className="cap-page__p">
          Every team payroll lives somewhere on this ladder. We'll climb it
          rung by rung in the next chapter — but here's the shape of the whole
          thing first.
        </p>
        <CapLadder />
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">What's ahead</h2>
        <div className="cap-chapters">
          {CHAPTERS.map(ch => (
            <Card key={ch.to} variant="static">
              <Link to={ch.to} className="cap-chapter">
                <span className="cap-chapter__num" aria-hidden="true">{ch.step}</span>
                <span className="cap-chapter__label">{ch.label}</span>
                <span className="cap-chapter__cta">Read →</span>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Disclaimer />
      <Pager next={{ label: 'The cap ladder', to: contractsRoutes.ladder() }} />
    </article>
  )
}
