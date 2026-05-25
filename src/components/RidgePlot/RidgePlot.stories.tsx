import { useMemo, type ReactNode } from 'react'
import { RidgePlot, type RidgePlotVariant, type RidgeSeries } from './RidgePlot'

export const VARIANTS: RidgePlotVariant[] = ['lines', 'filled', 'normalized']

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
function gauss(r: () => number): number {
  const u1 = Math.max(1e-9, r())
  const u2 = r()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}
function sample(n: number, mean: number, sd: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => mean + gauss(r) * sd)
}
function shifted(n: number, mean: number, sd: number, seed: number, skew = 0): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => {
    const z = gauss(r)
    return mean + sd * z + skew * (z * z - 1)
  })
}

export function RidgePlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  const months: RidgeSeries[] = useMemo(() => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    const intents: RidgeSeries['intent'][] = ['info', 'info', 'primary', 'primary', 'success', 'success', 'warning']
    return labels.map((label, i) => ({
      id: label,
      label,
      values: shifted(220, 60 + i * 3, 6 + i * 0.4, 11 + i, i * 0.4),
      intent: intents[i],
    }))
  }, [])

  const compare: RidgeSeries[] = useMemo(() => [
    { id: 'mvp',  label: 'MVP',   values: sample(180, 110, 28, 31), intent: 'neutral' },
    { id: 'beta', label: 'Beta',  values: sample(180, 96, 24, 32), intent: 'info' },
    { id: 'rc',   label: 'RC',    values: sample(180, 88, 20, 33), intent: 'primary' },
    { id: 'ga',   label: 'GA',    values: sample(180, 78, 16, 34), intent: 'success' },
  ], [])

  const mixed: RidgeSeries[] = useMemo(() => [
    { id: 'small',  label: 'small',  values: sample(40, 100, 10, 41) },
    { id: 'medium', label: 'medium', values: sample(220, 120, 18, 42) },
    { id: 'large',  label: 'large',  values: sample(800, 130, 22, 43) },
  ], [])

  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'lines' && (
              <Cell label="release-month temps, line ridges">
                <RidgePlot variant="lines" series={months} width={620} height={360} formatX={v => `${v.toFixed(0)}°`} />
              </Cell>
            )}
            {variant === 'filled' && (
              <Cell label="latency by release (filled joyplot)">
                <RidgePlot variant="filled" series={compare} width={620} height={300} formatX={v => `${v.toFixed(0)}ms`} />
              </Cell>
            )}
            {variant === 'normalized' && (
              <Cell label="varied sample sizes, normalized peak">
                <RidgePlot variant="normalized" series={mixed} width={620} height={260} formatX={v => `${v.toFixed(0)}ms`} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
