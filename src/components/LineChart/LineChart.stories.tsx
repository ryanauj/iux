import { useState, type ReactNode } from 'react'
import { LineChart, type LineChartVariant, type LineSeries, type LineAnnotation } from './LineChart'

export const VARIANTS: LineChartVariant[] = ['static', 'hover', 'multiples', 'annotated']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
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

function hourlySeries(label: string, n: number, seed: number, base: number, vol: number): LineSeries {
  const start = Date.UTC(2026, 4, 24, 0, 0, 0) // May 24, 2026
  const values = seededWalk(n, seed, base, vol)
  return {
    id: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    points: values.map((y, i) => ({ t: start + i * 60 * 60 * 1000, y })),
  }
}

function weeklySeries(label: string, n: number, seed: number, base: number, vol: number, intent?: LineSeries['intent']): LineSeries {
  const start = Date.UTC(2026, 1, 2, 0, 0, 0) // early Feb 2026
  const values = seededWalk(n, seed, base, vol)
  return {
    id: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    points: values.map((y, i) => ({ t: start + i * 7 * 24 * 60 * 60 * 1000, y })),
    intent,
  }
}

function dailySeries(label: string, n: number, seed: number, base: number, vol: number, intent?: LineSeries['intent']): LineSeries {
  const start = Date.UTC(2026, 0, 1, 0, 0, 0)
  const values = seededWalk(n, seed, base, vol)
  return {
    id: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    points: values.map((y, i) => ({ t: start + i * 24 * 60 * 60 * 1000, y })),
    intent,
  }
}

const CPU_LAST_24H: LineSeries[] = [hourlySeries('cpu %', 24, 41, 38, 4)]

const REVENUE_BY_REGION: LineSeries[] = [
  weeklySeries('Americas', 12, 11, 1200, 60),
  weeklySeries('EMEA', 12, 23, 900, 40),
  weeklySeries('APAC', 12, 37, 650, 30),
  weeklySeries('LATAM', 12, 59, 320, 15),
]

const DEPLOYS_2026: LineSeries[] = [dailySeries('errors / min', 120, 71, 8, 1.6)]
const DEPLOY_ANNOTATIONS: LineAnnotation[] = [
  { t: Date.UTC(2026, 0, 22), label: 'v4.2', intent: 'info' },
  { t: Date.UTC(2026, 1, 14), label: 'incident', intent: 'danger' },
  { t: Date.UTC(2026, 2, 18), label: 'v4.3 hotfix', intent: 'success' },
]
const CHANGE_BAND: LineAnnotation[] = [
  { t: Date.UTC(2026, 1, 14), label: 'incident', intent: 'danger' },
  { t: Date.UTC(2026, 2, 1), label: 'recovered', intent: 'success' },
]

function MultiplesStateful() {
  const [range, setRange] = useState<[number, number] | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <LineChart
        variant="multiples"
        series={REVENUE_BY_REGION}
        width={560}
        height={220}
        onBrush={setRange}
      />
      <span className="iux-sparkline__label" style={{ fontFamily: 'var(--type-caption-family)', fontSize: 'var(--type-caption-size)', color: 'var(--color-content-secondary)' }}>
        {range
          ? `brush: ${new Date(range[0]).toLocaleDateString()} — ${new Date(range[1]).toLocaleDateString()}`
          : 'drag in any panel to brush an x-range'}
      </span>
    </div>
  )
}

export function LineChartStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>

          <div className="stories__cells">
            {variant === 'static' && (
              <>
                <Cell label="single series, 24 hourly points">
                  <LineChart variant="static" series={CPU_LAST_24H} width={480} height={200} formatT={t => new Date(t).toLocaleTimeString([], { hour: '2-digit' })} formatY={v => `${v.toFixed(0)}%`} />
                </Cell>
                <Cell label="multi-series, 12 weekly points">
                  <LineChart variant="static" series={REVENUE_BY_REGION} width={480} height={200} formatY={v => `$${(v / 1000).toFixed(1)}k`} />
                </Cell>
              </>
            )}

            {variant === 'hover' && (
              <>
                <Cell label="hover crosshair, single series">
                  <LineChart variant="hover" series={CPU_LAST_24H} width={520} height={220} formatT={t => new Date(t).toLocaleTimeString([], { hour: '2-digit' })} formatY={v => `${v.toFixed(0)}%`} />
                </Cell>
                <Cell label="hover crosshair, multi-series readout">
                  <LineChart variant="hover" series={REVENUE_BY_REGION} width={520} height={240} formatY={v => `$${(v / 1000).toFixed(1)}k`} />
                </Cell>
              </>
            )}

            {variant === 'multiples' && (
              <Cell label="small multiples, shared y-scale, brushable">
                <MultiplesStateful />
              </Cell>
            )}

            {variant === 'annotated' && (
              <>
                <Cell label="release annotations">
                  <LineChart variant="annotated" series={DEPLOYS_2026} annotations={DEPLOY_ANNOTATIONS} width={560} height={240} formatY={v => v.toFixed(0)} />
                </Cell>
                <Cell label='"what changed" band between two annotations'>
                  <LineChart variant="annotated" series={DEPLOYS_2026} annotations={CHANGE_BAND} width={560} height={240} formatY={v => v.toFixed(0)} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
