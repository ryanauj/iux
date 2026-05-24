import type { ReactNode } from 'react'
import { Waterfall, type WaterfallVariant, type WaterfallStep } from './Waterfall'

export const VARIANTS: WaterfallVariant[] = ['simple', 'signed', 'subtotals']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const Q1_REVENUE: WaterfallStep[] = [
  { key: 'opening', label: 'Open', value: 1200 },
  { key: 'new', label: '+ New', value: 480 },
  { key: 'expansion', label: '+ Expand', value: 220 },
  { key: 'churn', label: '− Churn', value: -180 },
  { key: 'contraction', label: '− Contract', value: -90 },
]

const FY_PNL: WaterfallStep[] = [
  { key: 'revenue', label: 'Revenue', value: 4200 },
  { key: 'cogs', label: 'COGS', value: -1200 },
  { key: 'gross', label: 'Gross profit', value: 0, subtotal: true },
  { key: 'sga', label: 'S&GA', value: -1100 },
  { key: 'rd', label: 'R&D', value: -800 },
  { key: 'net', label: 'Net income', value: 0, subtotal: true },
]

export function WaterfallStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <>
                <Cell label="Q1 ARR change">
                  <Waterfall variant="simple" steps={Q1_REVENUE} width={560} height={300} />
                </Cell>
              </>
            )}
            {variant === 'signed' && (
              <>
                <Cell label="Q1 with signed labels">
                  <Waterfall variant="signed" steps={Q1_REVENUE} width={560} height={300} formatValue={v => (v > 0 ? `+${v}` : `${v}`)} />
                </Cell>
              </>
            )}
            {variant === 'subtotals' && (
              <>
                <Cell label="P&L bridge with subtotals">
                  <Waterfall variant="subtotals" steps={FY_PNL} width={620} height={320} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
