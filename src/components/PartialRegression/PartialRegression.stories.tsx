import type { ReactNode } from 'react'
import { PartialRegression, type PartialRegressionVariant, type PartialFacet, type PartialResidualPoint } from './PartialRegression'

export const VARIANTS: PartialRegressionVariant[] = ['single', 'grid', 'annotated']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '36rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

function facet(n: number, seed: number, slope: number, spread: number, noise: number): PartialResidualPoint[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => {
    const xRes = (r() - 0.5) * 2 * spread
    const yRes = slope * xRes + (r() - 0.5) * 2 * noise
    return { xRes, yRes }
  })
}

const FACETS: PartialFacet[] = [
  { id: 'rooms',  label: 'rooms',          beta:  4.2, intent: 'primary', points: facet(80, 11, 4.2, 2.5, 8) },
  { id: 'lotsz',  label: 'lot size',       beta:  0.6, intent: 'info',    points: facet(80, 19, 0.6, 6,   3) },
  { id: 'age',    label: 'age',            beta: -0.3, intent: 'warning', points: facet(80, 23, -0.3, 25, 4) },
  { id: 'dist',   label: 'dist downtown',  beta: -1.8, intent: 'danger',  points: facet(80, 29, -1.8, 4,  5) },
  { id: 'crime',  label: 'crime',          beta: -0.18,intent: 'neutral', points: facet(80, 31, -0.18, 8, 1.5) },
  { id: 'school', label: 'school rating',  beta:  2.0, intent: 'success', points: facet(80, 37, 2.0, 2,   3) },
]

export function PartialRegressionStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'single' && (
              <Cell label="one predictor — slope = β">
                <PartialRegression variant="single" facets={FACETS.slice(0, 1)} facetWidth={420} facetHeight={260} />
              </Cell>
            )}
            {variant === 'grid' && (
              <Cell label="every predictor in a small-multiples grid">
                <PartialRegression variant="grid" facets={FACETS} facetWidth={240} facetHeight={180} />
              </Cell>
            )}
            {variant === 'annotated' && (
              <Cell label="annotated — slope-equals-β labeled">
                <PartialRegression variant="annotated" facets={FACETS.slice(0, 4)} facetWidth={260} facetHeight={190} columns={2} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
