import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Violin, type ViolinVariant, type ViolinSeries } from './Violin'

export const VARIANTS: ViolinVariant[] = ['simple', 'withBox', 'split']

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
function gauss(r: () => number): number {
  const u1 = Math.max(1e-9, r())
  const u2 = r()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}
function sample(n: number, mean: number, sd: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => mean + gauss(r) * sd)
}
function bimodal(n: number, m1: number, m2: number, sd: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => (r() < 0.4 ? m1 : m2) + gauss(r) * sd)
}

export function ViolinStories({ variant: variantFilter }: { variant?: string } = {}) {
  const series: ViolinSeries[] = useMemo(() => [
    { id: 'web', label: 'Web', values: sample(220, 120, 24, 11) },
    { id: 'api', label: 'API', values: sample(220, 80, 18, 22) },
    { id: 'edge', label: 'Edge', values: bimodal(220, 60, 180, 22, 33) },
    { id: 'mobile', label: 'Mobile', values: sample(220, 140, 38, 44) },
  ], [])

  const split: ViolinSeries[] = useMemo(() => [
    { id: 'control-w', label: 'Web · A', values: sample(180, 120, 22, 1), intent: 'neutral' },
    { id: 'variant-w', label: 'Web · B', values: sample(180, 108, 22, 2), intent: 'primary' },
    { id: 'control-a', label: 'API · A', values: sample(180, 80, 18, 3), intent: 'neutral' },
    { id: 'variant-a', label: 'API · B', values: sample(180, 76, 16, 4), intent: 'success' },
  ], [])

  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <>
                <Cell label="4 services, latency ms">
                  <Violin variant="simple" series={series} width={520} height={300} formatY={v => `${v.toFixed(0)}ms`} />
                </Cell>
              </>
            )}
            {variant === 'withBox' && (
              <>
                <Cell label="violins with quartile box">
                  <Violin variant="withBox" series={series} width={520} height={320} formatY={v => `${v.toFixed(0)}ms`} />
                </Cell>
              </>
            )}
            {variant === 'split' && (
              <>
                <Cell label="A/B test: control vs variant">
                  <Violin variant="split" series={split} width={520} height={320} formatY={v => `${v.toFixed(0)}ms`} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
