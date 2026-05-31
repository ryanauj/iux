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
            The luxury tax was supposed to be the brake. For most owners it is —
            but the richest ones paid it, shrugged at the bill, and kept
            spending. A penalty measured in dollars doesn't deter an owner who
            has enough of them. The <strong>aprons</strong> are the league's
            answer: a brake no amount of money can release. Cross these two
            highest rungs and you don't just owe more — you lose the{' '}
            <strong>tools</strong> you'd use to get better.
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
            tier in the system — by the time a team is up here, nearly every way
            to add outside salary is gone. It's often called a "hard cap," but
            that's shorthand: a team can still climb past it by re-signing its
            own players. What it can't do is bring in anyone new. So it's less a
            ceiling on what you spend than a wall against getting better — and it
            doesn't cancel the soft cap from Chapter 1, which is still the system
            everyone below lives in.
          </p>
          <KeyIdea tone="danger" title="Why the second apron is feared">
            It's not the money — the richest owners would happily pay. It's that
            a second-apron team loses most of its ways to <em>improve</em>: no
            mid-level, no combining contracts in trades, and frozen draft picks.
            It can still re-sign its own players and swap matched salaries, but
            the tools for adding outside talent are nearly all gone.
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
        <KeyIdea tone="info" title="The one true hard cap is lower down">
          Here's the twist. Neither apron is a dollar line a team can't cross —
          payroll can climb past both. The system's only genuine{' '}
          <strong>hard cap</strong> — a line you literally cannot exceed — is
          one a team brings on itself: certain moves (using the full mid-level,
          taking in a sign-and-trade, using the bi-annual) hard-cap it at the{' '}
          <strong>first</strong> apron for that whole season. So the closest
          thing to an uncrossable ceiling sits at the first apron, not the
          second — and only for teams that trip it.
        </KeyIdea>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'The luxury tax', to: contractsRoutes.tax() }}
        next={{ label: 'Trades & multi-team deals', to: contractsRoutes.trades() }}
      />
    </article>
  )
}
