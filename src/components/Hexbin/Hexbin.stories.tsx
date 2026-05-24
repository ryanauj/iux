import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Hexbin, type HexbinVariant, type HexbinPoint } from './Hexbin'

export const VARIANTS: HexbinVariant[] = ['density', 'count', 'sized']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '30rem' }}>
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
  // Box–Muller.
  const u1 = Math.max(1e-9, r())
  const u2 = r()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function correlatedCloud(n: number, seed: number): HexbinPoint[] {
  const r = rng(seed)
  const out: HexbinPoint[] = []
  for (let i = 0; i < n; i++) {
    const x = gauss(r) * 1.8 + 5
    const y = 0.7 * x + gauss(r) * 1.1 + 1.2
    out.push({ x, y })
  }
  return out
}

function twoBlobs(n: number, seed: number): HexbinPoint[] {
  const r = rng(seed)
  const out: HexbinPoint[] = []
  for (let i = 0; i < n; i++) {
    const blob = r() < 0.45 ? 0 : 1
    const cx = blob ? 7 : 2
    const cy = blob ? 6.5 : 2.5
    out.push({ x: cx + gauss(r) * 0.9, y: cy + gauss(r) * 0.9 })
  }
  return out
}

export function HexbinStories({ variant: variantFilter }: { variant?: string } = {}) {
  const dense = useMemo(() => correlatedCloud(1200, 13), [])
  const small = useMemo(() => correlatedCloud(380, 41), [])
  const blobs = useMemo(() => twoBlobs(900, 9), [])

  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'density' && (
              <>
                <Cell label="1,200 correlated points">
                  <Hexbin variant="density" points={dense} width={520} height={300} radius={12} xLabel="visits" yLabel="signups" />
                </Cell>
                <Cell label="two clusters">
                  <Hexbin variant="density" points={blobs} width={520} height={300} radius={12} xLabel="x" yLabel="y" />
                </Cell>
              </>
            )}
            {variant === 'count' && (
              <>
                <Cell label="per-bin counts (chunky bins)">
                  <Hexbin variant="count" points={small} width={520} height={320} radius={18} xLabel="visits" yLabel="signups" />
                </Cell>
              </>
            )}
            {variant === 'sized' && (
              <>
                <Cell label="hex size by count">
                  <Hexbin variant="sized" points={dense} width={520} height={320} radius={14} xLabel="visits" yLabel="signups" />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
