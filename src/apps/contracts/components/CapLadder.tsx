// ABOUTME: The cap "ladder" visualization — a vertical scale of NBA salary thresholds (floor → cap → tax → aprons) with optional payroll marker and highlight, built as a flex column so it reflows and inherits palette tokens.

import { THRESHOLDS, SEASON } from '../data/cap'
import { money } from '../format'
import type { CapThreshold } from '../types'

// ABOUTME: Props for CapLadder: optional payroll marker value, id of the threshold to highlight (dims the rest), whether to render explanatory blurbs on each rung, and an extra className.
interface CapLadderProps {
  /** Optional payroll marker drawn as a moving "you are here" line. */
  payroll?: number
  /** Highlight one threshold by id (dim the rest). */
  highlightId?: string
  /**
   * Render each rung's explanatory blurb. Off by default so the ladder is a
   * compact spatial scale that pages can reuse without repeating the same
   * five paragraphs — the blurbs live once in the Ladder chapter's
   * "Reading the rungs" list.
   */
  detailed?: boolean
  className?: string
}

// ABOUTME: Renders all five THRESHOLDS (floor → cap → tax → first apron → second apron) as vertically proportional rungs; accepts an optional payroll marker (used by TeamSheet) and a highlightId to dim all other rungs (used by Aprons).
/**
 * The signature visual shared across Cap School chapters. Each threshold from
 * THRESHOLDS (cap.ts) is a rung whose vertical gap is proportional to its dollar
 * amount, so the bunching near the top reads at a glance. An optional payroll
 * marker (TeamSheet) slides up the scale; highlightId dims the other rungs
 * (Aprons page). Built as a flex column rather than SVG so it reflows and
 * inherits palette tokens without per-engine work.
 */
export function CapLadder({ payroll, highlightId, detailed = false, className }: CapLadderProps) {
  const rungs = [...THRESHOLDS].reverse() // top of the ladder = most money
  const max = SEASON.secondApron
  const min = SEASON.minimumTeamSalary
  const span = max - min

  const fraction = (amount: number) => (amount - min) / span

  return (
    <div className={`cap-ladder${className ? ` ${className}` : ''}`} role="img"
      aria-label="The NBA cap ladder, from the salary floor up to the second apron.">
      <div className="cap-ladder__scale">
        {rungs.map(rung => (
          <Rung
            key={rung.id}
            rung={rung}
            dim={!!highlightId && highlightId !== rung.id}
            detailed={detailed}
          />
        ))}
        {payroll !== undefined && (
          <div
            className="cap-ladder__marker"
            style={{ bottom: `calc(${(fraction(payroll) * 100).toFixed(2)}% )` }}
          >
            <span className="cap-ladder__marker-dot" aria-hidden="true" />
            <span className="cap-ladder__marker-label">
              Team payroll · {money(payroll)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ABOUTME: Renders one threshold rung (coloured line + label + dollar amount + optional blurb) and applies the `is-dim` class when the parent CapLadder is highlighting a different rung.
function Rung({ rung, dim, detailed }: { rung: CapThreshold; dim: boolean; detailed: boolean }) {
  return (
    <div className={`cap-rung cap-rung--${rung.intent}${dim ? ' is-dim' : ''}`}>
      <div className="cap-rung__line" aria-hidden="true" />
      <div className="cap-rung__body">
        <div className="cap-rung__head">
          <span className="cap-rung__label">{rung.label}</span>
          <span className="cap-rung__amount">{money(rung.amount)}</span>
        </div>
        {detailed && <p className="cap-rung__blurb">{rung.blurb}</p>}
      </div>
    </div>
  )
}
