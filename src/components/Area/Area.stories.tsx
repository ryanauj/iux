import type { ReactNode } from 'react'
import { Area, type AreaVariant, type AreaPoint } from './Area'

export const VARIANTS: AreaVariant[] = ['filled', 'baselined', 'gradient']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function seededWalk(n: number, seed: number, base = 100, vol = 6): number[] {
  let s = seed
  const next = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  const out: number[] = []
  let v = base
  for (let i = 0; i < n; i++) {
    v += (next() - 0.5) * vol
    out.push(Math.round(v * 100) / 100)
  }
  return out
}

function dailyPoints(n: number, seed: number, base: number, vol: number): AreaPoint[] {
  const start = Date.UTC(2026, 0, 1, 0, 0, 0)
  return seededWalk(n, seed, base, vol).map((y, i) => ({ t: start + i * 24 * 60 * 60 * 1000, y }))
}

const SIGNUPS = dailyPoints(60, 11, 240, 18)
const TEMP = dailyPoints(60, 23, 12, 1.6)
const SESSIONS = dailyPoints(60, 41, 980, 60)

export function AreaStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'filled' && (
              <>
                <Cell label="signups, 60 days">
                  <Area variant="filled" points={SIGNUPS} intent="primary" label="Signups, 60d" width={500} height={200} />
                </Cell>
                <Cell label="active sessions">
                  <Area variant="filled" points={SESSIONS} intent="info" label="Sessions" width={500} height={200} />
                </Cell>
              </>
            )}
            {variant === 'baselined' && (
              <>
                <Cell label="baseline at data min, narrow band">
                  <Area variant="baselined" points={TEMP} intent="warning" label="Temp °C" width={500} height={200} formatY={v => `${v.toFixed(1)}°`} />
                </Cell>
                <Cell label="baseline, signups zoomed">
                  <Area variant="baselined" points={SIGNUPS} intent="success" label="Signups (focused)" width={500} height={200} />
                </Cell>
              </>
            )}
            {variant === 'gradient' && (
              <>
                <Cell label="gradient fill, fades to baseline">
                  <Area variant="gradient" points={SIGNUPS} intent="primary" label="Signups, 60d" width={500} height={200} />
                </Cell>
                <Cell label="gradient sessions">
                  <Area variant="gradient" points={SESSIONS} intent="info" label="Sessions" width={500} height={200} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
