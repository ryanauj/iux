import { useMemo, type ReactNode } from 'react'
import { ConfidenceBand, type ConfidenceBandVariant, type ConfidenceSeries, type ConfidencePoint } from './ConfidenceBand'

export const VARIANTS: ConfidenceBandVariant[] = ['band', 'ribbon', 'compare']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '34rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

function forecast(seed: number, startBase: number, slope: number, growSpread = true): ConfidencePoint[] {
  const r = rng(seed)
  const N = 26
  const pts: ConfidencePoint[] = []
  let y = startBase
  for (let i = 0; i < N; i++) {
    const t = Date.UTC(2026, 0, 1 + i * 3)
    y += slope + (r() - 0.5) * 4
    const spread = growSpread ? 6 + i * 1.4 : 8
    const lo = y - spread * 1.96
    const hi = y + spread * 1.96
    const lo50 = y - spread * 0.674
    const hi50 = y + spread * 0.674
    pts.push({ t, y, lo, hi, lo50, hi50 })
  }
  return pts
}

export function ConfidenceBandStories({ variant: variantFilter }: { variant?: string } = {}) {
  const arr = useMemo(() => forecast(11, 120, 0.6), [])

  const ab: ConfidenceSeries[] = useMemo(() => {
    const r1 = rng(21); const r2 = rng(22)
    const N = 30
    const out: ConfidencePoint[][] = [[], []]
    let a = 80; let b = 80
    for (let i = 0; i < N; i++) {
      const t = Date.UTC(2026, 1, 1 + i)
      a += 0.5 + (r1() - 0.5) * 2.4
      b += 0.9 + (r2() - 0.5) * 2.8
      out[0].push({ t, y: a, lo: a - 4, hi: a + 4 })
      out[1].push({ t, y: b, lo: b - 5, hi: b + 5 })
    }
    return [
      { id: 'ctl', label: 'Control', points: out[0], intent: 'neutral' },
      { id: 'var', label: 'Variant', points: out[1], intent: 'primary' },
    ]
  }, [])

  const splitT = arr[Math.floor(arr.length * 0.4)].t

  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'band' && (
              <Cell label="weekly active forecast, 95% CI">
                <ConfidenceBand variant="band" series={[{ id: 'wau', label: 'WAU', points: arr }]} width={600} height={280} splitT={splitT} />
              </Cell>
            )}
            {variant === 'ribbon' && (
              <Cell label="forecast cone, 50% + 95%">
                <ConfidenceBand variant="ribbon" series={[{ id: 'wau', label: 'WAU', points: arr, intent: 'info' }]} width={600} height={280} splitT={splitT} />
              </Cell>
            )}
            {variant === 'compare' && (
              <Cell label="A/B test bands overlaid">
                <ConfidenceBand variant="compare" series={ab} width={600} height={280} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
