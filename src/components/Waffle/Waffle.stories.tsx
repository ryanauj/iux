import type { ReactNode } from 'react'
import { Waffle, type WaffleVariant, type WaffleCategory } from './Waffle'

export const VARIANTS: WaffleVariant[] = ['dots', 'blocks', 'icons']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '22rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const TRAFFIC: WaffleCategory[] = [
  { key: 'organic', label: 'Organic', value: 58 },
  { key: 'paid', label: 'Paid', value: 22 },
  { key: 'social', label: 'Social', value: 12 },
  { key: 'referral', label: 'Referral', value: 8 },
]

const OUTCOMES: WaffleCategory[] = [
  { key: 'won', label: 'Won', value: 34, intent: 'success' },
  { key: 'lost', label: 'Lost', value: 41, intent: 'danger' },
  { key: 'open', label: 'Open', value: 25, intent: 'warning' },
]

const PEOPLE: WaffleCategory[] = [
  { key: 'present', label: 'Present', value: 73, intent: 'primary' },
  { key: 'remote', label: 'Remote', value: 18, intent: 'info' },
  { key: 'away', label: 'Away', value: 9, intent: 'neutral' },
]

export function WaffleStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'dots' && (
              <>
                <Cell label="traffic mix (100 dots)">
                  <Waffle variant="dots" data={TRAFFIC} caption="of 100 visits, 7d" />
                </Cell>
                <Cell label="outcome mix">
                  <Waffle variant="dots" data={OUTCOMES} caption="of 100 opportunities" />
                </Cell>
              </>
            )}
            {variant === 'blocks' && (
              <>
                <Cell label="block grid, deal outcomes">
                  <Waffle variant="blocks" data={OUTCOMES} caption="quarter to date" />
                </Cell>
                <Cell label="block grid, attendance">
                  <Waffle variant="blocks" data={PEOPLE} caption="of 100 employees" />
                </Cell>
              </>
            )}
            {variant === 'icons' && (
              <>
                <Cell label="iconographic, people">
                  <Waffle variant="icons" data={PEOPLE} caption="of 100 employees" />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
