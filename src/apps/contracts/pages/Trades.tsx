import { Card } from '../../../components/Card/Card'
import { PageHeader, KeyIdea, Pager, Disclaimer } from '../components/Bits'
import { contractsRoutes } from '../routes'
import { SAMPLE_TRADE, TRADE_STAR_SALARY } from '../data/cap'
import { money } from '../format'
import type { TradeParty, TradePiece } from '../types'

/** Sum the salaried pieces on one side of a party's ledger. */
function salaryTotal(pieces: TradePiece[]): number {
  return pieces.reduce((sum, p) => sum + (p.salary ?? 0), 0)
}

function PieceList({ pieces }: { pieces: TradePiece[] }) {
  if (pieces.length === 0) {
    return <p className="cap-trade__empty">Nothing — just takes a player in.</p>
  }
  return (
    <ul className="cap-trade__pieces">
      {pieces.map(p => (
        <li key={p.label} className="cap-trade__piece">
          <span className="cap-trade__piece-label">{p.label}</span>
          {p.salary !== undefined && (
            <span className="cap-trade__piece-salary">{money(p.salary)}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function PartyCard({ party }: { party: TradeParty }) {
  return (
    <Card variant="static" accent={party.intent} title={party.team} subtitle={party.situation}>
      <p className="cap-trade__why">{party.why}</p>
      <div className="cap-trade__flows">
        <div className="cap-trade__flow">
          <span className="cap-trade__dir cap-trade__dir--out">Sends out</span>
          <PieceList pieces={party.out} />
        </div>
        <div className="cap-trade__flow">
          <span className="cap-trade__dir cap-trade__dir--in">Takes in</span>
          <PieceList pieces={party.in} />
        </div>
      </div>
      <p className={`cap-trade__rule cap-trade__rule--${party.intent}`}>{party.rule}</p>
    </Card>
  )
}

export function Trades() {
  const contender = SAMPLE_TRADE[0]
  const matchOut = salaryTotal(contender.out)

  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 8 · The trade machine"
        title="Trades & multi-team deals"
        lede={
          <>
            Almost every NBA team is <em>over</em> the cap, so the salaries
            going each way in a trade have to roughly match. That matching
            requirement drives the rest: teams add minimum-salary filler to
            balance the numbers, and deals that won't balance two-way pull in a
            third team.
          </>
        }
      />

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Why a team can't just swap</h2>
        <p className="cap-page__p">
          Say a contender wants a star earning{' '}
          <strong>{money(TRADE_STAR_SALARY)}</strong>. In a sane world it just
          takes him. But the contender is already over the cap, and there's no
          exception big enough to simply absorb a {money(TRADE_STAR_SALARY)}{' '}
          salary out of thin air. So the cap imposes the rule that governs every
          trade: to bring {money(TRADE_STAR_SALARY)} <em>in</em>, a team has to
          send roughly {money(TRADE_STAR_SALARY)} <em>out</em>.
        </p>
        <KeyIdea tone="info" title="The matching rule">
          Money in has to (roughly) equal money out. Everything that feels
          baroque about NBA trades — the random role players, the "salary
          filler", the third and fourth teams — is teams contorting themselves to
          satisfy this one equation while still getting the player they actually
          want.
        </KeyIdea>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Bundling salaries to hit the number</h2>
        <p className="cap-page__p">
          The first complication: our contender doesn't have a single
          {' '}{money(TRADE_STAR_SALARY)} player to send back. So it combines two
          — a {money(22_000_000)} wing and a {money(13_500_000)} backup big — to
          reach <strong>{money(matchOut)}</strong> of outgoing salary. Stacking
          contracts together to match one bigger one is called{' '}
          <strong>aggregation</strong>, and it's the everyday tool that makes
          most trades possible.
        </p>
        <KeyIdea tone="danger" title="Where the aprons land">
          Remember the aprons from Chapter 7? They apply right here. Because our
          team is over the <strong>first apron</strong>, it can't take back a
          dollar more than it sends — which is why it ships out{' '}
          {money(matchOut)} to bring in {money(TRADE_STAR_SALARY)}. And if it
          were over the <strong>second apron</strong>, it couldn't aggregate at
          all: those two salaries could not be combined, and this trade would be
          dead before it started. The aprons here don't only cost money; they
          decide whether a trade is even legal.
        </KeyIdea>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">When two teams aren't enough</h2>
        <p className="cap-page__p">
          The contender's math now works. But trades have two sides, and the
          other side has its own wishes. Our rebuilding team is glad to send the
          star away for a useful wing and a draft pick — but it has zero interest
          in taking on the aging backup big the contender needs to dump. On their
          own, the two teams can't make every piece fit.
        </p>
        <p className="cap-page__p">
          So a third team comes in. A team sitting <strong>under the cap</strong>{' '}
          has something the other two don't: empty room it can drop a salary into
          without matching anything. It absorbs the unwanted contract, and gets
          paid a draft pick for the favor. That's the whole reason multi-team
          trades exist — not glamour, just a team whose cap space unlocks a
          puzzle the core two couldn't finish.
        </p>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">The worked deal, team by team</h2>
        <p className="cap-page__p">
          Here's the finished three-team trade. Read each card as one team's
          ledger: what it sends, what it takes in, and why its slice of the
          salary math is legal. The same star changes hands, but it took three
          sets of books to get there.
        </p>
        <div className="cap-trade-grid">
          {SAMPLE_TRADE.map(party => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
        <p className="cap-page__p cap-page__p--muted">
          Follow the backup big: the contender couldn't keep him, the rebuilder
          wouldn't take him, so the cap-space team swallows him for a pick. That
          one rerouted contract is the entire reason a second team became a
          third.
        </p>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Where the draft picks come in</h2>
        <p className="cap-page__p">
          Notice the deal had to balance twice. The salaries matched so the trade
          would be <em>legal</em> — but matched salaries don't make it{' '}
          <em>fair</em>. The rebuilder is giving up a star and taking back a
          lesser wing; the cap-space team is doing a favor by eating a contract it
          never wanted. <strong>Draft picks</strong> settle that second ledger:
          the contender sends a future first to the rebuilder to cover the talent
          gap, and a second-rounder to the cap team to pay for the cap favor.
          Salary matching decides whether a trade <em>can</em> happen; picks and
          players decide whether anyone <em>agrees</em> to it.
        </p>
        <p className="cap-page__p">
          That split is why picks are a GM's most flexible currency. They carry
          no salary, so they never threaten the matching rule, and a pick years
          out is cheap to promise today. A rebuilding team collects them by
          selling its present; a contender spends them to win now.
        </p>
        <KeyIdea tone="warning" title="The Stepien rule: why picks come with strings">
          A team can't trade away its first-round pick in two consecutive future
          years — it always has to keep one in hand. That rule (named for an owner
          who once dealt his away with abandon) is why picks so often move{' '}
          <em>protected</em> — "top-4 protected", say — or as a{' '}
          <strong>swap</strong> of draft positions rather than the pick itself.
          It's also what sharpens the second apron's frozen picks: a team that
          can't move its firsts loses its richest trade chip at exactly the moment
          it most needs to retool.
        </KeyIdea>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="success" title="The leftover-money trick">
          One more piece, and it ties back to Chapter 5. When a team sends out
          more salary than it takes in — like a club trading a star purely for
          picks — it doesn't lose that room. It banks the gap as a{' '}
          <strong>traded-player exception</strong>: a credit it can use to absorb
          a matching salary later, no outgoing player required. It's one of the
          exceptions from the toolbox chapter, except this one is minted by a
          trade instead of by the cap.
        </KeyIdea>
      </section>

      <section className="cap-page__section">
        <KeyIdea tone="info" title="How to read any blockbuster">
          Next time a four-team trade scrolls past, count the teams and the
          shape is clear: each extra club is there to satisfy the matching rule,
          dodge an apron limit, or route a player to where he's actually wanted.
          Usually it's less tangled than it looks — the same equation, just
          balanced across more sets of books.
        </KeyIdea>
      </section>

      <Disclaimer />
      <Pager
        prev={{ label: 'The aprons', to: contractsRoutes.aprons() }}
        next={{ label: 'A team cap sheet', to: contractsRoutes.team() }}
      />
    </article>
  )
}
