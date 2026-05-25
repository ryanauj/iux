import { useMemo, type ReactNode } from 'react'
import { DensityPlot, type DensityPlotVariant, type DensitySeries } from './DensityPlot'

export const VARIANTS: DensityPlotVariant[] = ['single', 'multiple', 'filled']

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
function sample(n: number, mean: number, sd: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => mean + gauss(r) * sd)
}
function bimodal(n: number, m1: number, m2: number, sd: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => (r() < 0.45 ? m1 : m2) + gauss(r) * sd)
}

export function DensityPlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  const single: DensitySeries[] = useMemo(() => [
    { id: 'rt', label: 'Response time', values: bimodal(500, 110, 240, 35, 11) },
  ], [])

  const multi: DensitySeries[] = useMemo(() => [
    { id: 'web',    label: 'Web',    values: sample(400, 120, 28, 21) },
    { id: 'api',    label: 'API',    values: sample(400, 80, 18, 22) },
    { id: 'mobile', label: 'Mobile', values: sample(400, 160, 36, 23) },
  ], [])

  const ab: DensitySeries[] = useMemo(() => [
    { id: 'ctl', label: 'Control', values: sample(500, 120, 24, 31), intent: 'neutral' },
    { id: 'var', label: 'Variant', values: sample(500, 104, 22, 32), intent: 'primary' },
  ], [])

  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'single' && (
              <Cell label="bimodal response time">
                <DensityPlot variant="single" series={single} width={520} height={260} formatX={v => `${v.toFixed(0)}ms`} />
              </Cell>
            )}
            {variant === 'multiple' && (
              <Cell label="three services overlaid">
                <DensityPlot variant="multiple" series={multi} width={520} height={260} formatX={v => `${v.toFixed(0)}ms`} />
              </Cell>
            )}
            {variant === 'filled' && (
              <Cell label="A/B test: control vs variant">
                <DensityPlot variant="filled" series={ab} width={520} height={260} formatX={v => `${v.toFixed(0)}ms`} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
