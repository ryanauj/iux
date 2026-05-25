import type { ReactNode } from 'react'
import { LeveragePlot, type LeveragePlotVariant, type LeveragePoint } from './LeveragePlot'

export const VARIANTS: LeveragePlotVariant[] = ['plain', 'sized', 'flagged']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

function rnorm(r: () => number): number {
  const u = Math.max(1e-9, r()), v = r()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function generate(n: number, seed: number): LeveragePoint[] {
  const r = rng(seed)
  const out: LeveragePoint[] = []
  for (let i = 0; i < n; i++) {
    const leverage = 0.005 + Math.pow(r(), 3) * 0.3
    const residual = rnorm(r) * (leverage > 0.15 ? 1.6 : 1)
    const cook = (residual * residual * leverage) / Math.max(0.01, 1 - leverage)
    out.push({ leverage, residual, cook, label: `obs ${i + 1}` })
  }
  out.push({ leverage: 0.28, residual: 3.4, cook: 0.85, label: 'outlier · row 42' })
  out.push({ leverage: 0.32, residual: -3.1, cook: 0.71, label: 'outlier · row 73' })
  return out
}

const POINTS = generate(120, 11)

export function LeveragePlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'plain' && (
              <Cell label="constant-size dots, only thresholds drawn">
                <LeveragePlot variant="plain" points={POINTS} width={520} height={300} intent="info" />
              </Cell>
            )}
            {variant === 'sized' && (
              <Cell label="bubble size ∝ √Cook's D">
                <LeveragePlot variant="sized" points={POINTS} width={520} height={300} intent="info" />
              </Cell>
            )}
            {variant === 'flagged' && (
              <Cell label="flagged — danger intent for influential rows">
                <LeveragePlot variant="flagged" points={POINTS} width={540} height={320} intent="info" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
