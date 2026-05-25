import { useMemo, type ReactNode } from 'react'
import { EcdfPlot, type EcdfPlotVariant } from './EcdfPlot'

export const VARIANTS: EcdfPlotVariant[] = ['single', 'multiple', 'percentiles']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
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
function logNormal(n: number, mu: number, sigma: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => Math.exp(mu + gauss(r) * sigma))
}
function gamma(n: number, shape: number, scale: number, seed: number): number[] {
  const r = rng(seed)
  const samples: number[] = []
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = 0; j < shape; j++) sum += -Math.log(Math.max(1e-9, r()))
    samples.push(sum * scale)
  }
  return samples
}

export function EcdfPlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  const latency = useMemo(() => logNormal(800, Math.log(120), 0.55, 11), [])
  const a = useMemo(() => gamma(400, 3, 40, 21), [])
  const b = useMemo(() => gamma(400, 4, 32, 22), [])
  const c = useMemo(() => gamma(400, 6, 22, 23), [])

  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'single' && (
              <Cell label="latency (ms) ECDF">
                <EcdfPlot variant="single" series={[{ id: 'lat', label: 'latency', values: latency }]} width={520} height={260} formatX={v => `${v.toFixed(0)}ms`} />
              </Cell>
            )}
            {variant === 'multiple' && (
              <Cell label="three regions overlaid">
                <EcdfPlot variant="multiple" series={[
                  { id: 'us', label: 'US', values: a },
                  { id: 'eu', label: 'EU', values: b },
                  { id: 'apac', label: 'APAC', values: c },
                ]} width={520} height={260} formatX={v => `${v.toFixed(0)}ms`} />
              </Cell>
            )}
            {variant === 'percentiles' && (
              <Cell label="p50/p90/p95/p99 read-out">
                <EcdfPlot variant="percentiles" series={[{ id: 'lat', label: 'latency', values: latency }]} width={520} height={300} formatX={v => `${v.toFixed(0)}ms`} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
