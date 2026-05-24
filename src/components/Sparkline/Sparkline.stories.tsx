import type { ReactNode } from 'react'
import { Sparkline, type SparklineVariant } from './Sparkline'

export const VARIANTS: SparklineVariant[] = ['glyph', 'labeled', 'delta', 'targeted']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell">
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

/** Deterministic seeded random walk so renders are stable across reloads. */
function seededWalk(n: number, seed: number, base = 100, vol = 6): number[] {
  let s = seed
  const next = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const out: number[] = []
  let v = base
  for (let i = 0; i < n; i++) {
    v += (next() - 0.5) * vol
    out.push(Math.round(v * 100) / 100)
  }
  return out
}

const REVENUE_7D = seededWalk(7, 17, 12400, 380)
const LATENCY_MS = seededWalk(24, 91, 180, 14)
const ACTIVE_USERS = seededWalk(60, 7, 2400, 80)

export function SparklineStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>

          <div className="stories__cells">
            {variant === 'glyph' && (
              <>
                <Cell label="inline glyph (60 pt)">
                  <Sparkline variant="glyph" values={ACTIVE_USERS} width={140} height={36} />
                </Cell>
                <Cell label="short window (7 pt)">
                  <Sparkline variant="glyph" values={REVENUE_7D} width={100} height={28} />
                </Cell>
                <Cell label="dense (24 pt)">
                  <Sparkline variant="glyph" values={LATENCY_MS} width={120} height={32} />
                </Cell>
              </>
            )}

            {variant === 'labeled' && (
              <>
                <Cell label="revenue">
                  <Sparkline
                    variant="labeled"
                    label="Revenue, 7d"
                    unit="$"
                    values={REVENUE_7D}
                    width={200}
                  />
                </Cell>
                <Cell label="latency">
                  <Sparkline
                    variant="labeled"
                    label="p95 latency"
                    unit="ms"
                    values={LATENCY_MS}
                    width={200}
                  />
                </Cell>
                <Cell label="active users">
                  <Sparkline
                    variant="labeled"
                    label="Active users"
                    values={ACTIVE_USERS}
                    width={200}
                  />
                </Cell>
              </>
            )}

            {variant === 'delta' && (
              <>
                <Cell label="trending up">
                  <Sparkline
                    variant="delta"
                    label="Revenue, 7d"
                    unit="$"
                    values={[12100, 12350, 12500, 12420, 12680, 12740, 13010]}
                    width={220}
                  />
                </Cell>
                <Cell label="trending down">
                  <Sparkline
                    variant="delta"
                    label="Error rate"
                    unit="%"
                    values={[1.42, 1.31, 1.28, 1.18, 1.14, 1.06, 0.98]}
                    width={220}
                  />
                </Cell>
                <Cell label="recent spike">
                  <Sparkline
                    variant="delta"
                    label="p95 latency"
                    unit="ms"
                    values={LATENCY_MS}
                    width={220}
                  />
                </Cell>
              </>
            )}

            {variant === 'targeted' && (
              <>
                <Cell label="above target">
                  <Sparkline
                    variant="targeted"
                    label="Weekly signups"
                    target={250}
                    values={[210, 224, 238, 246, 244, 260, 272]}
                    width={240}
                  />
                </Cell>
                <Cell label="below target">
                  <Sparkline
                    variant="targeted"
                    label="SLA, 30d"
                    unit="%"
                    target={99.9}
                    values={[99.94, 99.93, 99.87, 99.82, 99.81, 99.79, 99.83]}
                    width={240}
                  />
                </Cell>
                <Cell label="crossing target">
                  <Sparkline
                    variant="targeted"
                    label="Uptime budget"
                    unit="m"
                    target={120}
                    values={[80, 95, 102, 118, 122, 130, 145]}
                    width={240}
                  />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
