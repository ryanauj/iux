import type { ReactNode } from 'react'
import { Histogram, type HistogramVariant } from './Histogram'

export const VARIANTS: HistogramVariant[] = ['counts', 'density', 'cumulative']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

/** Mulberry32 PRNG keeps stories deterministic across reloads. */
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6D2B79F5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function normalSample(rand: () => number, mean: number, sd: number): number {
  const u = Math.max(1e-9, rand())
  const v = rand()
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function makeSamples(n: number, seed: number, mean: number, sd: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => normalSample(r, mean, sd))
}

function makeBimodal(n: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => {
    const peak = r() < 0.55 ? 180 : 320
    return normalSample(r, peak, 30)
  })
}

const LATENCY = makeSamples(800, 17, 220, 45)
const SESSION_MIN = makeBimodal(600, 23)
const SCORES = makeSamples(400, 41, 72, 11)

export function HistogramStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'counts' && (
              <>
                <Cell label="p95 latency (ms), 800 samples">
                  <Histogram variant="counts" values={LATENCY} bins={20} width={460} height={220} formatValue={v => `${Math.round(v)}ms`} />
                </Cell>
                <Cell label="bimodal session minutes">
                  <Histogram variant="counts" values={SESSION_MIN} bins={24} width={460} height={220} formatValue={v => `${Math.round(v)}m`} />
                </Cell>
              </>
            )}
            {variant === 'density' && (
              <>
                <Cell label="density, exam scores">
                  <Histogram variant="density" values={SCORES} bins={18} width={460} height={220} domain={[0, 100]} formatValue={v => v.toFixed(0)} />
                </Cell>
                <Cell label="latency density">
                  <Histogram variant="density" values={LATENCY} bins={20} width={460} height={220} formatValue={v => `${Math.round(v)}ms`} />
                </Cell>
              </>
            )}
            {variant === 'cumulative' && (
              <>
                <Cell label="cumulative latency (CDF)">
                  <Histogram variant="cumulative" values={LATENCY} bins={24} width={460} height={220} formatValue={v => `${Math.round(v)}ms`} />
                </Cell>
                <Cell label="cumulative scores">
                  <Histogram variant="cumulative" values={SCORES} bins={20} width={460} height={220} domain={[0, 100]} formatValue={v => v.toFixed(0)} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
