// ABOUTME: MaxDeals — a React component (apps).

import { Card } from '../../../components/Card/Card'
import { Lollipop } from '../../../components/Lollipop/Lollipop'
import { PageHeader, KeyIdea, Pager, Disclaimer } from '../components/Bits'
import { contractsRoutes } from '../routes'
import { MAX_TIERS, SUPERMAX_NOTE, SEASON } from '../data/cap'
import { money, pct } from '../format'

// ABOUTME: MaxDeals — a React component.
export function MaxDeals() {
  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 4 · The ceiling"
        title="Max & rookie deals"
        lede={
          <>
            In 1997 the Timberwolves gave Kevin Garnett a six-year, $126M
            extension — the richest contract in league history at the time, for a
            21-year-old. Owners looked at that number, saw a single player take
            up a team's whole cap, and in the next labor deal capped what any one
            player could earn. That limit is not a single number.
          </>
        }
      />

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Experience buys a bigger slice</h2>
        <p className="cap-page__p">
          Same season, same cap. A player with four years in the league can start
          at no more than <strong>{money(MAX_TIERS[0].firstYear)}</strong>. A
          ten-year veteran can start at{' '}
          <strong>{money(MAX_TIERS[2].firstYear)}</strong> — over{' '}
          <strong>{money(MAX_TIERS[2].firstYear - MAX_TIERS[0].firstYear)}</strong>{' '}
          more for the very same roster spot. Nobody negotiates that gap; it's
          fixed by service time. Each max is really just a share of the cap
          ({money(SEASON.salaryCap)} this season), and the share climbs in three
          steps:
        </p>
        <div className="cap-tiers">
          {MAX_TIERS.map(tier => (
            <Card key={tier.id} variant="static" accent="primary" title={tier.label} subtitle={tier.service}>
              <div className="cap-tier">
                <span className="cap-tier__pct">{pct(tier.capShare)}</span>
                <span className="cap-tier__of">of the cap</span>
                <span className="cap-tier__amt">{money(tier.firstYear)}</span>
                <span className="cap-tier__amtlabel">first-year max</span>
                <p className="cap-tier__note">{tier.note}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="cap-page__section cap-split">
        <Card variant="static" title="First-year max by tier" className="cap-split__aside">
          <Lollipop
            variant="ranked"
            height={220}
            valueLabel="First-year max"
            data={MAX_TIERS.map(t => ({
              key: t.id,
              // Keep the axis label short so it fits the chart's left gutter
              // on narrow screens; the service band is on each tier card above.
              label: t.label,
              value: t.firstYear,
              intent: 'primary',
            }))}
            formatValue={money}
          />
        </Card>
        <div className="cap-split__main">
          <h2 className="cap-page__h2">Jumping a tier early</h2>
          <p className="cap-page__p">{SUPERMAX_NOTE}</p>
          <KeyIdea tone="warning" title="The catch">
            The supermax is a retention tool, not a free-agency prize. Because it
            can be signed only with a player's own team, a player who forces a
            trade often leaves tens of millions on the table — which is exactly
            the leverage the league hands to the incumbent team.
          </KeyIdea>
        </div>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Rookie-scale contracts</h2>
        <p className="cap-page__p">
          First-round picks don't negotiate their starting salary — they sign a
          fixed <strong>rookie scale</strong> deal set by draft position. It
          runs two years guaranteed with two team-option years, and the higher
          the pick, the bigger the slot.
        </p>
        <p className="cap-page__p">
          That fixed price is the draft's real gift to a cap sheet. A top pick
          who develops into a star can produce like a{' '}
          <strong>{money(MAX_TIERS[2].firstYear)}</strong> player while counting
          a fraction of that against the cap. The gap between what he's worth and
          what he costs is room the team gets to spend on everyone else — which
          is why a young star on a rookie deal is the cheapest way to put real
          talent on the floor. The catch is the clock: those four years are
          exactly when a team has to build around him, because the bill comes due
          the moment he's eligible for a raise.
        </p>
        <KeyIdea tone="info" title="Then the extension">
          A team can lock a rookie-scale player up early: after his third season
          it can offer an extension that takes over once the cheap deal expires.
          Coming off a rookie contract he has only a few years of service, so
          he'd normally open at the <strong>25% tier</strong> — but the "Rose
          Rule" lets a player who hits the awards criteria (All-NBA, MVP,
          Defensive Player of the Year) open at the <strong>30% tier</strong>{' '}
          instead, the same awards-for-a-tier jump the supermax pulls at the top
          end. Either way the bargain is over: the surplus that quietly funded
          the rest of the roster becomes a max-sized line on the cap sheet.
        </KeyIdea>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'Contract anatomy', to: contractsRoutes.anatomy() }}
        next={{ label: 'Exceptions & tools', to: contractsRoutes.exceptions() }}
      />
    </article>
  )
}
