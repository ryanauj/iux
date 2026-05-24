import type { ReactNode } from 'react'
import { Sunburst, type SunburstVariant, type SunburstNode } from './Sunburst'

export const VARIANTS: SunburstVariant[] = ['flat', 'nested', 'labeled']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const BUDGET: SunburstNode = {
  id: 'budget', label: 'Q4 budget',
  children: [
    { id: 'eng', label: 'Engineering', children: [
      { id: 'eng-h', label: 'Headcount', value: 42 },
      { id: 'eng-i', label: 'Infra', value: 18 },
      { id: 'eng-t', label: 'Tooling', value: 6 },
    ] },
    { id: 'sales', label: 'Sales', children: [
      { id: 's-h', label: 'Headcount', value: 22 },
      { id: 's-t', label: 'Travel', value: 8 },
      { id: 's-e', label: 'Events', value: 6 },
    ] },
    { id: 'mkt', label: 'Marketing', children: [
      { id: 'm-p', label: 'Paid', value: 14 },
      { id: 'm-c', label: 'Content', value: 8 },
      { id: 'm-b', label: 'Brand', value: 4 },
    ] },
    { id: 'ga', label: 'G&A', children: [
      { id: 'ga-l', label: 'Legal', value: 5 },
      { id: 'ga-f', label: 'Finance', value: 5 },
    ] },
  ],
}

const TIME: SunburstNode = {
  id: 'wk', label: 'My week',
  children: [
    { id: 'work', label: 'Work', children: [
      { id: 'mtg', label: 'Meetings', value: 12 },
      { id: 'deep', label: 'Deep work', value: 16 },
      { id: 'rev', label: 'Review', value: 6 },
    ] },
    { id: 'rest', label: 'Rest', children: [
      { id: 'sleep', label: 'Sleep', value: 56 },
      { id: 'food', label: 'Meals', value: 10 },
    ] },
    { id: 'play', label: 'Other', children: [
      { id: 'rd', label: 'Reading', value: 6 },
      { id: 'ex', label: 'Exercise', value: 4 },
      { id: 'fr', label: 'Friends', value: 6 },
    ] },
  ],
}

export function SunburstStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'flat' && (
              <Cell label="top-level only — reads as a donut">
                <Sunburst variant="flat" root={BUDGET} width={320} height={320} />
              </Cell>
            )}
            {variant === 'nested' && (
              <Cell label="full hierarchy, descendants tint lighter">
                <Sunburst variant="nested" root={BUDGET} width={360} height={360} />
              </Cell>
            )}
            {variant === 'labeled' && (
              <Cell label="time budget, with arc labels">
                <Sunburst variant="labeled" root={TIME} width={400} height={400} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
