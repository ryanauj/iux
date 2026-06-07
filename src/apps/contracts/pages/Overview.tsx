// ABOUTME: Chapter 1 — "How NBA contracts actually work": the narrative entry point that traces the cap's history from a hard wall to a soft cap, shows this season's real threshold numbers and CapLadder, and links each subsequent chapter.

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

// ABOUTME: Chapter 1 page combining prose on the soft-cap origin story with SEASON / PRIOR_CAP / THRESHOLDS data from cap.ts; renders StatTiles for this year's numbers, a Bar chart of all thresholds, the full CapLadder, and a chapter-card grid from NAV (shell.tsx).
/**
 * Chapter 1 of Cap School — the narrative foundation. Explains why the league
 * moved from a hard cap (1983) to a soft cap by introducing Bird rights, then
 * shows how every rule that follows is a patch on that original fix. Uses Bar
 * to compare threshold amounts, CapLadder for the visual overview, and a grid
 * of NAV-driven chapter cards so readers can jump directly to any section.
 */
export function Overview() {
  const capGrowth = (SEASON.salaryCap - PRIOR_CAP) / PRIOR_CAP

  return (
    <article className="cap-page">
      <PageHeader
        kicker="Chapter 1 · The big picture"
        title="How NBA contracts actually work"
        lede={
          <>
            The simplest cap the league could write would let every team spend
            the same fixed amount on salaries and not a dollar more. That design
            is clean and workable, but it creates a problem the league decided it
            couldn't live with. Almost every rule in this guide is a patch on
            that one idea, each fixing a problem the last version caused. We'll
            build it the way the league did: start with the wall, find where it
            binds, then add one fix at a time.
          </>
        }
      />

      <section className="cap-page__section">
        <h2 className="cap-page__h2">Start with a wall</h2>
        <p className="cap-page__p">
          A hard cap is a wall. Pick a spending limit, let teams spend up to it,
          and stop them cold at the line. This isn't a strawman; it's a real,
          working design. The NFL and NHL run on hard caps today, and the NBA's
          own cap started life this way in 1983. So the question was never
          whether a wall <em>works</em>. It's what kind of league it produces.
        </p>
        <p className="cap-page__p">
          The catch is one the NBA didn't want. Say a team's best player comes
          to the end of his contract while the team is already pressed against
          the wall. It can still keep him, but only by clearing the room first:
          cutting or trading the good players around him to fit his new deal
          under the line. A hard cap doesn't make stars vanish into thin air; it
          forces that trade-off. The
          team that drafts and develops a superstar often has to dismantle the
          rest of its roster just to pay him, and a promising young core gets
          broken up by arithmetic instead of by choice. That's not hypothetical:
          it's the corner the Celtics were backed into in 1983, when they
          couldn't re-sign Larry Bird without blowing past the brand-new cap.
        </p>
        <KeyIdea tone="info" title="The fix: let teams keep their own">
          The league decided it would rather its stars be able to <em>stay</em> —
          Bird in Boston, season after season — because fans bond with the player
          who stays, not with whoever happens to have cap room this summer. So
          that same year it made the wall soft: a team may spend past the limit,
          but mainly to re-sign the players it already has. (The very first such
          carve-out is still called the "Larry Bird exception.") That one change
          is why nearly every team sits <em>above</em> the cap line, not under
          it. The number stops being a wall and becomes a baseline teams climb
          past — a "soft cap" — and it's the reason the rest of this guide has
          anything to explain.
        </KeyIdea>
        <p className="cap-page__p">
          But softening the wall opens a new hole: if teams can spend past the
          line, what stops them spending forever? The whole system that follows
          is the answer, and the answer is never a flat "no". It's a bill. Cross
          the next line up and a team pays a tax. Cross the lines above that and
          it starts losing the very tools it would use to get better. A team
          doesn't get stopped; it gets charged, first in dollars, then in
          flexibility.
        </p>
        <p className="cap-page__p">
          One honest caveat, because it trips everyone up: people call the top
          line — the <strong>second apron</strong> — a "hard cap," but it isn't a
          flat dollar wall. A team can still climb past it by re-signing its own
          players. What changes up there is that the penalty stops being just a
          bill and starts taking away <em>tools</em>: by the second apron nearly
          every way to add outside talent is switched off. So why still call this
          a soft cap? Because for the other twenty-some teams none of that
          applies. The soft cap <em>is</em> the system: a team spends past the
          cap, keeps its own players, and pays a rising bill if payroll climbs.
          The NBA didn't trade the
          soft cap for a hard one; it kept the soft cap for everyone and stacked
          tool-stripping penalties on top for the handful who'd otherwise add
          talent without limit.
        </p>
      </section>

      <section className="cap-page__section">
        <p className="cap-page__p cap-page__p--muted">
          Here are the real numbers we'll work with this season. These don't
          need memorizing; each line gets its own chapter. For now, just notice
          how far apart they sit.
        </p>
        <div className="cap-statrow">
          <StatTile
            label={`Salary cap · ${SEASON.label}`}
            value={money(SEASON.salaryCap)}
            sub={`${moneySigned(SEASON.salaryCap - PRIOR_CAP)} vs last year (${pct(capGrowth)})`}
          />
          <StatTile label="Luxury-tax line" value={money(SEASON.taxLine)} sub="Spend past it, pay the tax" />
          <StatTile label="First apron" value={money(SEASON.firstApron)} sub="Tools start switching off" />
          <StatTile label="Second apron" value={money(SEASON.secondApron)} sub="Most tools switch off" />
        </div>
      </section>

      <section className="cap-page__section cap-split">
        <div className="cap-split__main">
          <h2 className="cap-page__h2">A ladder of costs, not a wall</h2>
          <p className="cap-page__p">
            Because the cap stopped being a wall, every team's payroll now sits
            somewhere on a climb instead of jammed against a single line. The cap
            is near the bottom. Above it are a few more lines, and each one a team
            crosses makes the next dollar more expensive than the last — first in
            tax, then in lost roster-building tools. By the top line — the second
            apron — almost every way to add outside talent is gone. It's the
            closest thing to a wall in the system, though even there a team can
            still climb higher by re-signing its own. That's the difference to
            hold onto: the squeeze is real and it's harshest at the top, but it's
            a tightening grip on a single line near the ceiling, not the cap
            itself. The chart shows how far apart this season's lines actually
            sit.
          </p>
          <p className="cap-page__p">
            The gap from the cap to the top line is more than{' '}
            <strong>{money(SEASON.secondApron - SEASON.salaryCap)}</strong> — an
            enormous amount of room to spend in. The league lets a team use all
            of it, while making every step up cost a little more than the one
            before.
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
        <h2 className="cap-page__h2">The shape we'll climb</h2>
        <p className="cap-page__p">
          This is the picture to hold for the rest of the guide: one climb, a
          handful of rungs, getting steeper toward the top. Every chapter from
          here fills in one rung or one tool. The whole shape is already here;
          the rest is detail.
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
