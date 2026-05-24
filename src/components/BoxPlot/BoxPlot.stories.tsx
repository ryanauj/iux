import type { ReactNode } from 'react'
import { BoxPlot, type BoxPlotVariant, type BoxSeries } from './BoxPlot'

export const VARIANTS: BoxPlotVariant[] = ['simple', 'outliers', 'jitter']

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

function normalSample(r: () => number, mean: number, sd: number): number {
  const u = Math.max(1e-9, r())
  const v = r()
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function makeSamples(n: number, seed: number, mean: number, sd: number, outliers = 0): number[] {
  const r = rng(seed)
  const out = Array.from({ length: n }, () => normalSample(r, mean, sd))
  for (let i = 0; i < outliers; i++) {
    out.push(mean + (r() < 0.5 ? -1 : 1) * sd * (4 + r() * 4))
  }
  return out
}

const LATENCY_BY_REGION: BoxSeries[] = [
  { id: 'us', label: 'US-east', values: makeSamples(120, 11, 180, 22, 3), intent: 'primary' },
  { id: 'eu', label: 'EU-west', values: makeSamples(120, 23, 220, 30, 4), intent: 'info' },
  { id: 'ap', label: 'AP-south', values: makeSamples(120, 41, 310, 48, 6), intent: 'warning' },
  { id: 'sa', label: 'SA-east', values: makeSamples(120, 59, 410, 60, 8), intent: 'danger' },
]

const SHORT: BoxSeries[] = [
  { id: 'a', label: 'A', values: makeSamples(40, 7, 50, 8), intent: 'success' },
  { id: 'b', label: 'B', values: makeSamples(40, 19, 60, 12), intent: 'info' },
  { id: 'c', label: 'C', values: makeSamples(40, 31, 55, 6), intent: 'primary' },
]

export function BoxPlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <Cell label="latency by region (ms)">
                <BoxPlot variant="simple" series={LATENCY_BY_REGION} width={500} height={300} formatY={v => `${Math.round(v)}ms`} />
              </Cell>
            )}
            {variant === 'outliers' && (
              <Cell label="Tukey fences, outlier dots">
                <BoxPlot variant="outliers" series={LATENCY_BY_REGION} width={500} height={300} formatY={v => `${Math.round(v)}ms`} />
              </Cell>
            )}
            {variant === 'jitter' && (
              <Cell label="all samples shown (jittered)">
                <BoxPlot variant="jitter" series={SHORT} width={500} height={300} formatY={v => v.toFixed(0)} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
