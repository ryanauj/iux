import type { ReactNode } from 'react'
import { Card, type CardAccent, type CardVariant } from './Card'
import { Button } from '../Button/Button'

const VARIANTS: CardVariant[] = ['static', 'expandable', 'bento', 'spatial']

const STATES = [
  { key: 'default', label: 'default', props: {} },
  { key: 'hover', label: 'hover', props: { stateLock: 'hover' as const, onClick: () => {} } },
  { key: 'active', label: 'active', props: { stateLock: 'active' as const, onClick: () => {} } },
  { key: 'focus', label: 'focus', props: { stateLock: 'focus' as const, onClick: () => {} } },
  { key: 'interactive', label: 'interactive', props: { onClick: () => {} } },
]

const ACCENTS: CardAccent[] = ['primary', 'neutral', 'success', 'warning', 'danger', 'info']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell">
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function renderStaticCardFor(variant: CardVariant, extraProps: Record<string, unknown> = {}) {
  if (variant === 'expandable') {
    return (
      <Card
        variant="expandable"
        title="Release notes"
        subtitle="v1.4.0 — 18 May"
        expandedContent={
          <p>
            New components, faster CI, better keyboard handling across the board.
            Tab to walk every focusable element on this card.
          </p>
        }
        footer={<Button intent="primary">Open release</Button>}
        {...extraProps}
      >
        Short summary. Click "Show more" to read the rest.
      </Card>
    )
  }
  if (variant === 'bento') {
    return (
      <Card
        variant="bento"
        title="Bento cell"
        subtitle="dashboard tile"
        accent="primary"
        footer={<small>3 hours ago</small>}
        {...extraProps}
      >
        A reflowable grid tile. Tries on six accents; under Neubrutalism the
        accent stripe is the loudest thing on screen.
      </Card>
    )
  }
  if (variant === 'spatial') {
    return (
      <Card
        variant="spatial"
        title="Spatial card"
        subtitle="hover to tilt"
        footer={<Button intent="info">Inspect</Button>}
        {...extraProps}
      >
        Move the mouse across this card to feel the parallax. Under
        prefers-reduced-motion the tilt drops; the card remains.
      </Card>
    )
  }
  return (
    <Card
      variant="static"
      title="Static card"
      subtitle="title, body, footer"
      footer={<Button intent="neutral">Dismiss</Button>}
      {...extraProps}
    >
      The trusted baseline — title, body copy, optional footer slot.
    </Card>
  )
}

export function CardStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>

          <div className="stories__cells">
            {STATES.map(s => (
              <Cell key={s.key} label={s.label}>
                {renderStaticCardFor(variant, s.props)}
              </Cell>
            ))}
          </div>

          {variant === 'bento' && (
            <div className="stories__cells">
              {ACCENTS.map(a => (
                <Cell key={a} label={`accent: ${a}`}>
                  <Card
                    variant="bento"
                    accent={a}
                    title={a}
                    subtitle="bento accent"
                  >
                    Stripe drawn from <code>color.intent.{a}.bg</code>.
                  </Card>
                </Cell>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
