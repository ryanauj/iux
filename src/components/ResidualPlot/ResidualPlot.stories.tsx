import type { ReactNode } from 'react'
import { ResidualPlot, type ResidualPlotVariant, type ResidualPoint } from './ResidualPlot'

export const VARIANTS: ResidualPlotVariant[] = ['scatter', 'smoothed', 'banded']

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

function gen(n: number, seed: number, kind: 'random' | 'curved' | 'fan'): ResidualPoint[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => {
    const fitted = 10 + r() * 90
    let residual: number
    if (kind === 'random')      residual = rnorm(r) * 8
    else if (kind === 'curved') residual = -0.005 * (fitted - 55) ** 2 + rnorm(r) * 4
    else                        residual = rnorm(r) * (1 + (fitted / 50)) * 4
    return { fitted, residual }
  })
}

export function ResidualPlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'scatter' && (
              <Cell label="random scatter — assumptions hold">
                <ResidualPlot variant="scatter" points={gen(180, 11, 'random')} width={520} height={280} intent="primary" />
              </Cell>
            )}
            {variant === 'smoothed' && (
              <Cell label="curved smoother — missing nonlinearity">
                <ResidualPlot variant="smoothed" points={gen(180, 17, 'curved')} width={520} height={280} intent="warning" />
              </Cell>
            )}
            {variant === 'banded' && (
              <Cell label="fan-out vs ±2σ band — heteroscedasticity">
                <ResidualPlot variant="banded" points={gen(220, 23, 'fan')} width={520} height={300} intent="danger" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
