import type { ReactNode } from 'react'
import { StackedArea, type StackedAreaVariant, type StackedAreaSeries } from './StackedArea'

export const VARIANTS: StackedAreaVariant[] = ['stacked', 'normalized', 'streamgraph']

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

function walk(n: number, seed: number, base: number, vol: number, floor = 0): number[] {
  const r = rng(seed)
  const out: number[] = []
  let v = base
  for (let i = 0; i < n; i++) { v += (r() - 0.5) * vol; out.push(Math.max(floor, Math.round(v))) }
  return out
}

const N = 36
const START = Date.UTC(2026, 0, 1)
const TIMES = Array.from({ length: N }, (_, i) => START + i * 7 * 24 * 60 * 60 * 1000)

const REVENUE_MIX: StackedAreaSeries[] = [
  { id: 'sub', label: 'Subscriptions', values: walk(N, 11, 320, 24), intent: 'primary' },
  { id: 'usage', label: 'Usage', values: walk(N, 23, 180, 18), intent: 'info' },
  { id: 'pro', label: 'Pro services', values: walk(N, 37, 90, 10), intent: 'success' },
  { id: 'other', label: 'Other', values: walk(N, 59, 40, 6), intent: 'neutral' },
]

const TRAFFIC: StackedAreaSeries[] = [
  { id: 'organic', label: 'Organic', values: walk(N, 7, 4200, 200), intent: 'success' },
  { id: 'paid', label: 'Paid', values: walk(N, 13, 1800, 120), intent: 'warning' },
  { id: 'social', label: 'Social', values: walk(N, 29, 1100, 90), intent: 'info' },
  { id: 'direct', label: 'Direct', values: walk(N, 51, 900, 60), intent: 'primary' },
]

export function StackedAreaStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'stacked' && (
              <Cell label="revenue mix, weekly">
                <StackedArea variant="stacked" series={REVENUE_MIX} times={TIMES} width={560} height={260} formatY={v => `$${(v / 1000).toFixed(1)}k`} />
              </Cell>
            )}
            {variant === 'normalized' && (
              <Cell label="share of traffic, 0–100%">
                <StackedArea variant="normalized" series={TRAFFIC} times={TIMES} width={560} height={260} />
              </Cell>
            )}
            {variant === 'streamgraph' && (
              <Cell label="streamgraph, centered baseline">
                <StackedArea variant="streamgraph" series={REVENUE_MIX} times={TIMES} width={560} height={260} formatY={v => v.toFixed(0)} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
