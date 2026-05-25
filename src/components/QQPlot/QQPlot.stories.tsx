import { useMemo, type ReactNode } from 'react'
import { QQPlot, type QQPlotVariant } from './QQPlot'

export const VARIANTS: QQPlotVariant[] = ['normal', 'sampleVsSample', 'banded']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '26rem' }}>
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
function normal(n: number, mean: number, sd: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => mean + gauss(r) * sd)
}
function exponential(n: number, lambda: number, seed: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => -Math.log(Math.max(1e-9, r())) / lambda)
}

export function QQPlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  const normalSample = useMemo(() => normal(300, 0, 1, 11), [])
  const skewedSample = useMemo(() => exponential(300, 1, 21), [])
  const ctl = useMemo(() => normal(250, 100, 18, 31), [])
  const variant = useMemo(() => normal(250, 92, 22, 32), [])

  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(v => (
        <section key={v} className="stories__row">
          <h3 className="stories__row-title">variant: {v}</h3>
          <div className="stories__cells">
            {v === 'normal' && (
              <>
                <Cell label="normal sample vs normal">
                  <QQPlot variant="normal" sample={normalSample} width={360} height={320} />
                </Cell>
                <Cell label="exponential sample (right-tailed)">
                  <QQPlot variant="normal" sample={skewedSample} intent="warning" width={360} height={320} />
                </Cell>
              </>
            )}
            {v === 'sampleVsSample' && (
              <Cell label="control vs variant quantiles">
                <QQPlot variant="sampleVsSample" sample={variant} reference={ctl} intent="success" width={420} height={320} />
              </Cell>
            )}
            {v === 'banded' && (
              <Cell label="normal Q-Q with 95% band">
                <QQPlot variant="banded" sample={normalSample} width={420} height={320} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
