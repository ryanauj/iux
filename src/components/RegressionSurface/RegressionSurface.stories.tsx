import type { ReactNode } from 'react'
import { RegressionSurface, type RegressionSurfaceVariant, type SurfacePoint } from './RegressionSurface'

export const VARIANTS: RegressionSurfaceVariant[] = ['contour', 'heat', 'overlay']

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

const linearPredict = (x1: number, x2: number) => 12 + 2.4 * x1 + 1.8 * x2
const interactionPredict = (x1: number, x2: number) => 5 + 1.5 * x1 + 0.8 * x2 + 0.4 * x1 * x2 - 0.05 * x1 * x1

const SAMPLES: SurfacePoint[] = (() => {
  const r = rng(31)
  return Array.from({ length: 80 }, () => {
    const x1 = r() * 10
    const x2 = r() * 10
    const y = interactionPredict(x1, x2) + (r() - 0.5) * 8
    return { x1, x2, y }
  })
})()

export function RegressionSurfaceStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'contour' && (
              <Cell label="planar fit — parallel contours = no interaction">
                <RegressionSurface variant="contour" predict={linearPredict} x1Domain={[0, 10]} x2Domain={[0, 10]} width={420} height={360} x1Label="advertising" x2Label="price" intent="primary" />
              </Cell>
            )}
            {variant === 'heat' && (
              <Cell label="bent surface — interaction term curves the contours">
                <RegressionSurface variant="heat" predict={interactionPredict} x1Domain={[0, 10]} x2Domain={[0, 10]} width={420} height={360} x1Label="x₁" x2Label="x₂" intent="info" />
              </Cell>
            )}
            {variant === 'overlay' && (
              <Cell label="surface + observed sample — see support and gaps">
                <RegressionSurface variant="overlay" predict={interactionPredict} x1Domain={[0, 10]} x2Domain={[0, 10]} points={SAMPLES} width={440} height={380} x1Label="x₁" x2Label="x₂" intent="success" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
