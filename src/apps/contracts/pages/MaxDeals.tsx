import { Card } from '../../../components/Card/Card'
import { Lollipop } from '../../../components/Lollipop/Lollipop'
import { PageHeader, KeyIdea, Pager, Disclaimer } from '../components/Bits'
import { contractsRoutes } from '../routes'
import { MAX_TIERS, SUPERMAX_NOTE, SEASON } from '../data/cap'
import { money, pct } from '../format'

export function MaxDeals() {
  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 4 · The ceiling"
        title="Max & rookie deals"
        lede={
          <>
            Imagine no ceiling on individual pay. One superstar could swallow his
            team's entire cap by himself, leaving nothing to build around him —
            or the richest owner could just outbid everyone for every star in
            sight. Neither makes for a watchable league, so there's a limit on
            what any one player can earn. The twist: that limit isn't a single
            number.
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
            The supermax is a retention tool, not a free-agency prize. Because
            you can only sign it with your own team, a player who forces a
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
          the pick, the bigger the slot. That cost certainty is why young stars
          on rookie deals are the most valuable assets in the league: elite
          production at a controlled price.
        </p>
        <KeyIdea tone="info" title="Then the extension">
          After year three, a team can offer a rookie-scale extension. A player
          who hits the awards criteria can qualify for the 25%→30% "Rose Rule"
          bump — the first place the max tiers and individual achievement meet.
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
