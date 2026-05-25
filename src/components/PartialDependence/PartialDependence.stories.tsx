import type { ReactNode } from 'react'
import { PartialDependence, type PartialDependenceVariant, type PartialPoint } from './PartialDependence'

export const VARIANTS: PartialDependenceVariant[] = ['line', 'band', 'rug']

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

function curve(n: number, xLo: number, xHi: number, fn: (x: number) => number, seSlope: number): PartialPoint[] {
  return Array.from({ length: n }, (_, i) => {
    const x = xLo + (i / (n - 1)) * (xHi - xLo)
    const y = fn(x)
    const center = (xLo + xHi) / 2
    const se = seSlope * (1 + Math.abs(x - center) / (xHi - xLo))
    return { x, y, lower: y - 1.96 * se, upper: y + 1.96 * se }
  })
}

const ROOMS = curve(40, 2, 9, x => 14 + 4.2 * x - 0.05 * (x - 5) ** 2, 0.8)
const AGE   = curve(40, 0, 80, x => 320 - 0.35 * x - 0.004 * (x - 30) ** 2, 1.4)
const RUG_X = (() => { const r = rng(13); return Array.from({ length: 60 }, () => 2 + r() * 7) })()

export function PartialDependenceStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'line' && (
              <Cell label="effect of rooms on price (line only)">
                <PartialDependence variant="line" curve={ROOMS} width={520} height={280} xLabel="rooms" yLabel="price ($k)" />
              </Cell>
            )}
            {variant === 'band' && (
              <Cell label="effect of age — with 95% CI band">
                <PartialDependence variant="band" curve={AGE} width={520} height={280} xLabel="age (yrs)" yLabel="price ($k)" intent="info" />
              </Cell>
            )}
            {variant === 'rug' && (
              <Cell label="band + rug — see where data supports the curve">
                <PartialDependence variant="rug" curve={ROOMS} rug={RUG_X} width={520} height={300} xLabel="rooms" yLabel="price ($k)" intent="success" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
