import { Card } from '../../../components/Card/Card'
import { PageHeader, KeyIdea, Pager, Disclaimer } from '../components/Bits'
import { CapLadder } from '../components/CapLadder'
import { contractsRoutes } from '../routes'
import { SEASON } from '../data/cap'
import { money } from '../format'

interface Restriction {
  text: string
}

const FIRST_APRON: Restriction[] = [
  { text: 'No sign-and-trade acquisitions (you can\'t bring a player in this way).' },
  { text: 'No using the bi-annual exception.' },
  { text: 'Can only use the smaller taxpayer mid-level, not the full one.' },
  { text: 'Can\'t take back more salary than you send out in a trade.' },
  { text: 'Can\'t sign a player who was waived if his pre-waiver salary was above the non-taxpayer MLE.' },
]

const SECOND_APRON: Restriction[] = [
  { text: 'No mid-level exception at all — not even the taxpayer version.' },
  { text: 'Can\'t aggregate (combine) multiple salaries to match a bigger one in a trade.' },
  { text: 'Can\'t send out cash in trades.' },
  { text: 'Can\'t use a traded-player exception generated in a prior year.' },
  { text: 'Future first-round picks get frozen — and can be moved to the end of the draft if you stay over.' },
]

export function Aprons() {
  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 7 · The real ceilings"
        title="The aprons"
        lede={
          <>
            The luxury tax costs money. The <strong>aprons</strong> cost
            something teams value even more: <strong>flexibility</strong>. These
            are the two highest rungs, and crossing them doesn't just raise the
            bill — it takes roster-building tools off the table entirely.
          </>
        }
      />

      <section className="cap-page__section cap-split">
        <Card variant="static" className="cap-split__aside cap-ladder-card">
          <CapLadder highlightId="apron2" />
        </Card>
        <div className="cap-split__main">
          <h2 className="cap-page__h2">Two lines, escalating limits</h2>
          <p className="cap-page__p">
            The first apron ({money(SEASON.firstApron)}) starts switching tools
            off. The second apron ({money(SEASON.secondApron)}) is the harshest
            tier in the system — it behaves like a genuine hard cap, because the
            ways to add salary are nearly all gone.
          </p>
          <KeyIdea tone="danger" title="Why the second apron is feared">
            It's not the money — the richest owners would happily pay. It's that
            a second-apron team loses the ability to <em>improve</em>: no
            mid-level, no combining contracts in trades, and frozen draft picks.
            Stay there too long and you can't reshape the roster at all.
          </KeyIdea>
        </div>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">What each apron takes away</h2>
        <div className="cap-apron-grid">
          <Card variant="static" accent="warning" title="At the first apron" subtitle={money(SEASON.firstApron)}>
            <ul className="cap-restrictions">
              {FIRST_APRON.map((r, i) => (
                <li key={i} className="cap-restrictions__item">{r.text}</li>
              ))}
            </ul>
          </Card>
          <Card variant="static" accent="danger" title="At the second apron" subtitle={money(SEASON.secondApron)}>
            <p className="cap-apron-grid__note">Everything from the first apron, plus:</p>
            <ul className="cap-restrictions">
              {SECOND_APRON.map((r, i) => (
                <li key={i} className="cap-restrictions__item cap-restrictions__item--danger">{r.text}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="info" title="The hard cap, made on the fly">
          Certain moves — using the full mid-level, taking in a sign-and-trade,
          using the bi-annual — <strong>hard-cap</strong> a team at the first
          apron for that whole season. So a team can pin its own ceiling in July
          by the tools it chooses to use.
        </KeyIdea>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'The luxury tax', to: contractsRoutes.tax() }}
        next={{ label: 'A team cap sheet', to: contractsRoutes.team() }}
      />
    </article>
  )
}
