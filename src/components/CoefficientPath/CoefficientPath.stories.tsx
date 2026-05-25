import type { ReactNode } from 'react'
import { CoefficientPath, type CoefficientPathVariant, type CoefficientPathLine } from './CoefficientPath'

export const VARIANTS: CoefficientPathVariant[] = ['paths', 'highlighted', 'selected']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '36rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function shrinkPath(startBeta: number, lambdas: number[]): { lambda: number; beta: number }[] {
  return lambdas.map(lambda => ({
    lambda,
    beta: startBeta * Math.max(0, 1 - Math.pow(lambda * 4, 1.5) / Math.max(1e-6, Math.abs(startBeta))),
  }))
}

const LAMBDAS = Array.from({ length: 40 }, (_, i) => 0.0005 * Math.pow(1.18, i))

const PATHS: CoefficientPathLine[] = [
  { id: 'rooms',  label: 'rooms',  intent: 'primary', points: shrinkPath( 4.2, LAMBDAS) },
  { id: 'school', label: 'school', intent: 'success', points: shrinkPath( 2.0, LAMBDAS) },
  { id: 'dist',   label: 'dist',   intent: 'danger',  points: shrinkPath(-1.8, LAMBDAS) },
  { id: 'lotsz',  label: 'lot',    intent: 'info',    points: shrinkPath( 0.6, LAMBDAS) },
  { id: 'age',    label: 'age',    intent: 'warning', points: shrinkPath(-0.3, LAMBDAS) },
  { id: 'crime',  label: 'crime',  intent: 'neutral', points: shrinkPath(-0.18, LAMBDAS) },
]

export function CoefficientPathStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'paths' && (
              <Cell label="every β trajectory as λ varies (LASSO)">
                <CoefficientPath variant="paths" paths={PATHS} width={580} height={320} />
              </Cell>
            )}
            {variant === 'highlighted' && (
              <Cell label="dim the small predictors — focus on what survives">
                <CoefficientPath variant="highlighted" paths={PATHS} width={580} height={320} />
              </Cell>
            )}
            {variant === 'selected' && (
              <Cell label="vertical rule at the CV-chosen λ">
                <CoefficientPath variant="selected" paths={PATHS} width={600} height={340} selectedLambda={0.04} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
