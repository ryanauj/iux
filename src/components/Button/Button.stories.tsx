import type { ReactNode } from 'react'
import { Button, type ButtonIntent, type ButtonVariant } from './Button'

export const VARIANTS: ButtonVariant[] = ['solid', 'neumorphic', 'spring', 'ai']
const INTENTS: ButtonIntent[] = ['primary', 'neutral', 'success', 'warning', 'danger', 'info']
const STATES = [
  { key: 'default', label: 'default', props: {} },
  { key: 'hover', label: 'hover', props: { stateLock: 'hover' as const } },
  { key: 'active', label: 'active', props: { stateLock: 'active' as const } },
  { key: 'focus', label: 'focus', props: { stateLock: 'focus' as const } },
  { key: 'disabled', label: 'disabled', props: { disabled: true } },
  { key: 'loading', label: 'loading', props: { loading: true } },
]

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell">
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

export function ButtonStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>

          <div className="stories__cells">
            {STATES.map(s => (
              <Cell key={s.key} label={s.label}>
                <Button variant={variant} intent="primary" {...s.props}>
                  Primary
                </Button>
              </Cell>
            ))}
          </div>

          <div className="stories__cells">
            {INTENTS.map(i => (
              <Cell key={i} label={`intent: ${i}`}>
                <Button variant={variant} intent={i}>
                  {i}
                </Button>
              </Cell>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
