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
            A trade looks like the simplest move in sports: you send me a player,
            I send you one back. In the NBA it's the most complicated move there
            is — and one rule is the reason why. Almost every team is{' '}
            <em>over</em> the cap, so the salaries going each way have to roughly
            match. That single constraint turns every trade into a math puzzle,
            and the hardest puzzles need a third team to solve.
          </>
        }
      />

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Why you can't just swap</h2>
        <p className="cap-page__p">
          Say a contender wants a star earning{' '}
          <strong>{money(TRADE_STAR_SALARY)}</strong>. In a sane world it just
          takes him. But the contender is already over the cap, and there's no
          exception big enough to simply absorb a {money(TRADE_STAR_SALARY)}{' '}
          salary out of thin air. So the cap imposes the rule that governs every
          trade: to bring {money(TRADE_STAR_SALARY)} <em>in</em>, you have to
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
          Here's the first complication. Our contender doesn't have a single
          {' '}{money(TRADE_STAR_SALARY)} player to send back. So it combines two
          — a {money(22_000_000)} wing and a {money(13_500_000)} backup big — to
          reach <strong>{money(matchOut)}</strong> of outgoing salary. Stacking
          contracts together to match one bigger one is called{' '}
          <strong>aggregation</strong>, and it's the everyday tool that makes
          most trades possible.
        </p>
        <KeyIdea tone="danger" title="This is where the aprons bite">
          Remember the aprons from Chapter 7? They land right here. Because our
          team is over the <strong>first apron</strong>, it can't take back a
          dollar more than it sends — which is why it ships out{' '}
          {money(matchOut)} to bring in {money(TRADE_STAR_SALARY)}. And if it
          were over the <strong>second apron</strong>, it couldn't aggregate at
          all: those two salaries could not be combined, and this trade would be
          dead before it started. The aprons don't just cost money here — they
          decide whether a trade is even legal.
        </KeyIdea>
      </section>

      <section className="cap-page__section">
        <h2 className="cap-page__h2">When two teams aren't enough</h2>
        <p className="cap-page__p">
          The contender's math now works. But trades have two sides, and the
          other side has its own wishes. Our rebuilding team is glad to send the
          star away for a useful wing and a draft pick — but it has zero interest
          in taking on the aging backup big the contender needs to dump. Two
          teams simply can't make every piece fit.
        </p>
        <p className="cap-page__p">
          So you bring in a third. A team sitting <strong>under the cap</strong>{' '}
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
          Next time a four-team trade scrolls across your feed, count the teams
          and you'll know what you're looking at: each extra club is there to
          satisfy the matching rule, dodge an apron limit, or route a player to
          where he's actually wanted. It's never as complicated as it looks —
          it's the same equation, balanced across more sets of books.
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
