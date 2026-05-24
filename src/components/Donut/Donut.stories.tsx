import type { ReactNode } from 'react'
import { Donut, type DonutVariant, type DonutSlice } from './Donut'

export const VARIANTS: DonutVariant[] = ['solid', 'donut', 'labeled']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '20rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const BUDGET: DonutSlice[] = [
  { key: 'eng', label: 'Engineering', value: 4200, intent: 'primary' },
  { key: 'go-to-market', label: 'Go-to-market', value: 2400, intent: 'info' },
  { key: 'ops', label: 'Operations', value: 1100, intent: 'success' },
  { key: 'other', label: 'Other', value: 600, intent: 'neutral' },
]

const TRAFFIC: DonutSlice[] = [
  { key: 'organic', label: 'Organic', value: 58 },
  { key: 'paid', label: 'Paid', value: 22 },
  { key: 'social', label: 'Social', value: 12 },
  { key: 'referral', label: 'Referral', value: 8 },
]

const ERRORS: DonutSlice[] = [
  { key: '4xx', label: '4xx', value: 612, intent: 'warning' },
  { key: '5xx', label: '5xx', value: 184, intent: 'danger' },
  { key: 'ok', label: 'Recovered', value: 1840, intent: 'success' },
]

export function DonutStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'solid' && (
              <>
                <Cell label="pie, 4 parts">
                  <Donut variant="solid" data={BUDGET} size={200} />
                </Cell>
                <Cell label="pie, traffic split">
                  <Donut variant="solid" data={TRAFFIC} size={200} />
                </Cell>
              </>
            )}
            {variant === 'donut' && (
              <>
                <Cell label="budget with total">
                  <Donut variant="donut" data={BUDGET} caption="quarterly" formatValue={v => `$${(v / 1000).toFixed(1)}k`} />
                </Cell>
                <Cell label="traffic mix">
                  <Donut variant="donut" data={TRAFFIC} caption="visits, 7d" formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
            {variant === 'labeled' && (
              <>
                <Cell label="in-slice percent labels">
                  <Donut variant="labeled" data={BUDGET} caption="OPEX" formatValue={v => `$${(v / 1000).toFixed(1)}k`} />
                </Cell>
                <Cell label="error mix">
                  <Donut variant="labeled" data={ERRORS} caption="requests" />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
