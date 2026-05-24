import type { ReactNode } from 'react'
import { Sankey, type SankeyVariant, type SankeyNode, type SankeyLink } from './Sankey'

export const VARIANTS: SankeyVariant[] = ['simple', 'labeled', 'highlighted']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '34rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const FUNNEL_NODES: SankeyNode[] = [
  { key: 'organic', label: 'Organic', stage: 0, intent: 'success' },
  { key: 'paid', label: 'Paid', stage: 0, intent: 'warning' },
  { key: 'social', label: 'Social', stage: 0, intent: 'info' },
  { key: 'landing', label: 'Landing', stage: 1, intent: 'primary' },
  { key: 'signup', label: 'Signed up', stage: 2, intent: 'success' },
  { key: 'bounced', label: 'Bounced', stage: 2, intent: 'danger' },
  { key: 'paid-plan', label: 'Paid plan', stage: 3, intent: 'success' },
  { key: 'free-plan', label: 'Free plan', stage: 3, intent: 'info' },
  { key: 'churned', label: 'Churned', stage: 3, intent: 'danger' },
]

const FUNNEL_LINKS: SankeyLink[] = [
  { from: 'organic', to: 'landing', value: 4200 },
  { from: 'paid', to: 'landing', value: 1800 },
  { from: 'social', to: 'landing', value: 1100 },
  { from: 'landing', to: 'signup', value: 2900 },
  { from: 'landing', to: 'bounced', value: 4200 },
  { from: 'signup', to: 'paid-plan', value: 800 },
  { from: 'signup', to: 'free-plan', value: 1700 },
  { from: 'signup', to: 'churned', value: 400 },
]

const HIGHLIGHTED_LINKS: SankeyLink[] = FUNNEL_LINKS.map(l =>
  (l.from === 'paid' && l.to === 'landing') ||
  (l.from === 'landing' && l.to === 'signup') ||
  (l.from === 'signup' && l.to === 'paid-plan')
    ? { ...l, highlight: true }
    : l,
)

const ENERGY_NODES: SankeyNode[] = [
  { key: 'solar', label: 'Solar', stage: 0, intent: 'warning' },
  { key: 'wind', label: 'Wind', stage: 0, intent: 'info' },
  { key: 'grid', label: 'Grid', stage: 0, intent: 'neutral' },
  { key: 'house', label: 'House', stage: 1, intent: 'primary' },
  { key: 'ev', label: 'EV charger', stage: 2, intent: 'info' },
  { key: 'appliances', label: 'Appliances', stage: 2, intent: 'success' },
  { key: 'export', label: 'Export', stage: 2, intent: 'warning' },
]
const ENERGY_LINKS: SankeyLink[] = [
  { from: 'solar', to: 'house', value: 38 },
  { from: 'wind', to: 'house', value: 14 },
  { from: 'grid', to: 'house', value: 22 },
  { from: 'house', to: 'ev', value: 28 },
  { from: 'house', to: 'appliances', value: 34 },
  { from: 'house', to: 'export', value: 12 },
]

export function SankeyStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <Cell label="acquisition funnel, 4 stages">
                <Sankey variant="simple" nodes={FUNNEL_NODES} links={FUNNEL_LINKS} width={620} height={340} />
              </Cell>
            )}
            {variant === 'labeled' && (
              <Cell label="energy flow with totals">
                <Sankey variant="labeled" nodes={ENERGY_NODES} links={ENERGY_LINKS} width={620} height={320} formatValue={v => `${v}kWh`} />
              </Cell>
            )}
            {variant === 'highlighted' && (
              <Cell label="paid → signup → paid plan path">
                <Sankey variant="highlighted" nodes={FUNNEL_NODES} links={HIGHLIGHTED_LINKS} width={620} height={340} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
