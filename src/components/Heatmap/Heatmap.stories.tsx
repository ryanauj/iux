import type { ReactNode } from 'react'
import { Heatmap, type HeatmapVariant, type HeatmapCell } from './Heatmap'

export const VARIANTS: HeatmapVariant[] = ['continuous', 'diverging', 'sparse']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

// Hour-of-day × day-of-week activity (typical "punchcard" data).
const HOURS = ['8', '10', '12', '14', '16', '18', '20']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function makeActivity(seed: number): HeatmapCell[] {
  let s = seed >>> 0
  const rand = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  const out: HeatmapCell[] = []
  for (const d of DAYS) for (const h of HOURS) {
    const weekend = d === 'Sat' || d === 'Sun'
    const peak = Number(h) >= 10 && Number(h) <= 16
    let v = rand() * 30
    if (peak && !weekend) v += 40 + rand() * 30
    if (weekend) v *= 0.3
    out.push({ row: d, col: h, value: Math.round(v) })
  }
  return out
}

const ACTIVITY = makeActivity(7)

// Correlation matrix in [-1, 1].
const CORR: HeatmapCell[] = [
  { row: 'sales', col: 'sales', value: 1 },
  { row: 'sales', col: 'ads', value: 0.78 },
  { row: 'sales', col: 'churn', value: -0.42 },
  { row: 'sales', col: 'visits', value: 0.61 },
  { row: 'ads', col: 'sales', value: 0.78 },
  { row: 'ads', col: 'ads', value: 1 },
  { row: 'ads', col: 'churn', value: -0.08 },
  { row: 'ads', col: 'visits', value: 0.54 },
  { row: 'churn', col: 'sales', value: -0.42 },
  { row: 'churn', col: 'ads', value: -0.08 },
  { row: 'churn', col: 'churn', value: 1 },
  { row: 'churn', col: 'visits', value: -0.31 },
  { row: 'visits', col: 'sales', value: 0.61 },
  { row: 'visits', col: 'ads', value: 0.54 },
  { row: 'visits', col: 'churn', value: -0.31 },
  { row: 'visits', col: 'visits', value: 1 },
]

export function HeatmapStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'continuous' && (
              <>
                <Cell label="hour × day activity">
                  <Heatmap variant="continuous" cells={ACTIVITY} rows={DAYS} cols={HOURS} />
                </Cell>
              </>
            )}
            {variant === 'diverging' && (
              <>
                <Cell label="correlation matrix (−1..1)">
                  <Heatmap variant="diverging" cells={CORR} cellSize={48} center={0} formatValue={v => v.toFixed(2)} />
                </Cell>
              </>
            )}
            {variant === 'sparse' && (
              <>
                <Cell label="hide the noise, show the peaks">
                  <Heatmap variant="sparse" cells={ACTIVITY} rows={DAYS} cols={HOURS} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
