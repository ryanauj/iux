import type { ReactNode } from 'react'
import { ObservedPredicted, type ObservedPredictedVariant, type ObservedPredictedPoint } from './ObservedPredicted'

export const VARIANTS: ObservedPredictedVariant[] = ['identity', 'metric', 'errors']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

function gen(n: number, seed: number, noise: number, bias: number): ObservedPredictedPoint[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => {
    const predicted = 20 + r() * 80
    const observed = predicted + bias * (predicted - 60) / 60 + (r() - 0.5) * 2 * noise
    return { predicted, observed }
  })
}

const TIGHT = gen(120, 7, 4, 0)
const BIASED = gen(120, 13, 6, 8)

export function ObservedPredictedStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'identity' && (
              <Cell label="tight fit hugs the 45° line">
                <ObservedPredicted variant="identity" points={TIGHT} width={360} height={320} intent="primary" />
              </Cell>
            )}
            {variant === 'metric' && (
              <Cell label="with R²/RMSE/MAE — biased at the extremes">
                <ObservedPredicted variant="metric" points={BIASED} width={360} height={320} intent="warning" />
              </Cell>
            )}
            {variant === 'errors' && (
              <Cell label="error segments — residuals drawn literally">
                <ObservedPredicted variant="errors" points={TIGHT} width={380} height={340} intent="info" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
