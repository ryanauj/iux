import { THRESHOLDS, SEASON } from '../data/cap'
import { money } from '../format'
import type { CapThreshold } from '../types'

interface CapLadderProps {
  /** Optional payroll marker drawn as a moving "you are here" line. */
  payroll?: number
  /** Highlight one threshold by id (dim the rest). */
  highlightId?: string
  className?: string
}

/**
 * The signature visual: the cap "ladder". Each threshold is a rung whose
 * vertical position is proportional to its dollar amount, so the spacing
 * between the tax line and the aprons reads at a glance. An optional
 * payroll marker slides up the scale to show where a team sits.
 *
 * Built as a flex column of rungs (top = most money) rather than an SVG so
 * it reflows cleanly and inherits palette tokens with no per-engine work.
 */
export function CapLadder({ payroll, highlightId, className }: CapLadderProps) {
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
          <Rung key={rung.id} rung={rung} dim={!!highlightId && highlightId !== rung.id} />
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

function Rung({ rung, dim }: { rung: CapThreshold; dim: boolean }) {
  return (
    <div className={`cap-rung cap-rung--${rung.intent}${dim ? ' is-dim' : ''}`}>
      <div className="cap-rung__line" aria-hidden="true" />
      <div className="cap-rung__body">
        <div className="cap-rung__head">
          <span className="cap-rung__label">{rung.label}</span>
          <span className="cap-rung__amount">{money(rung.amount)}</span>
        </div>
        <p className="cap-rung__blurb">{rung.blurb}</p>
      </div>
    </div>
  )
}
