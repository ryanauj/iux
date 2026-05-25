import type { ReactNode } from 'react'
import { CoefficientPlot, type CoefficientPlotVariant, type Coefficient } from './CoefficientPlot'

export const VARIANTS: CoefficientPlotVariant[] = ['point', 'interval', 'sorted']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const HOUSING: Coefficient[] = [
  { key: 'rooms',  label: 'rooms',           estimate:  4.21, lower:  3.10, upper:  5.32 },
  { key: 'lotsz',  label: 'lot size',        estimate:  0.62, lower:  0.18, upper:  1.06 },
  { key: 'age',    label: 'age (yrs)',       estimate: -0.31, lower: -0.55, upper: -0.07 },
  { key: 'dist',   label: 'dist. downtown',  estimate: -1.83, lower: -2.41, upper: -1.25 },
  { key: 'crime',  label: 'crime index',     estimate: -0.18, lower: -0.42, upper:  0.06 },
  { key: 'school', label: 'school rating',   estimate:  2.05, lower:  1.41, upper:  2.69 },
]

const POINT_ONLY: Coefficient[] = HOUSING.map(c => ({ key: c.key, label: c.label, estimate: c.estimate }))

export function CoefficientPlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'point' && (
              <Cell label="point estimates only (no CI)">
                <CoefficientPlot variant="point" coefficients={POINT_ONLY} width={520} xLabel="standardized β" />
              </Cell>
            )}
            {variant === 'interval' && (
              <Cell label="95% CI — success/danger when CI excludes 0">
                <CoefficientPlot variant="interval" coefficients={HOUSING} width={560} xLabel="effect on price ($k)" />
              </Cell>
            )}
            {variant === 'sorted' && (
              <Cell label="sorted by |β| — what matters most">
                <CoefficientPlot variant="sorted" coefficients={HOUSING} width={560} xLabel="effect on price ($k)" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
