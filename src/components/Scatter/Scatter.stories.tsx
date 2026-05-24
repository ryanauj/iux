import type { ReactNode } from 'react'
import { Scatter, type ScatterVariant, type ScatterSeries, type ScatterPoint } from './Scatter'

export const VARIANTS: ScatterVariant[] = ['dots', 'grouped', 'regression']

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

function correlatedCloud(n: number, seed: number, slope: number, noise: number, xMin = 0, xMax = 100): ScatterPoint[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => {
    const x = xMin + r() * (xMax - xMin)
    const y = slope * x + (r() - 0.5) * 2 * noise
    return { x, y }
  })
}

const PRICE_DEMAND: ScatterSeries[] = [
  { id: 'all', label: 'all SKUs', intent: 'primary', points: correlatedCloud(140, 17, -0.6, 12, 4, 80) },
]

const SEGMENTS: ScatterSeries[] = [
  { id: 'sm', label: 'small', intent: 'info', points: correlatedCloud(80, 23, 0.5, 5, 0, 40) },
  { id: 'md', label: 'mid', intent: 'success', points: correlatedCloud(80, 41, 0.9, 6, 30, 80) },
  { id: 'lg', label: 'enterprise', intent: 'warning', points: correlatedCloud(40, 59, 1.3, 8, 60, 120) },
]

const REG: ScatterSeries[] = [
  { id: 'fit', label: 'samples', intent: 'primary', points: correlatedCloud(180, 71, 0.85, 9, 5, 95) },
]

export function ScatterStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'dots' && (
              <Cell label="price vs demand (negative slope)">
                <Scatter variant="dots" series={PRICE_DEMAND} width={520} height={280} xLabel="price ($)" yLabel="units / day" />
              </Cell>
            )}
            {variant === 'grouped' && (
              <Cell label="three customer segments">
                <Scatter variant="grouped" series={SEGMENTS} width={520} height={300} xLabel="seats" yLabel="ARR ($k)" />
              </Cell>
            )}
            {variant === 'regression' && (
              <Cell label="least-squares fit + R²">
                <Scatter variant="regression" series={REG} width={520} height={300} xLabel="hours studied" yLabel="exam score" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
