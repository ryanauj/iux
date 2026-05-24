import type { ReactNode } from 'react'
import { CalendarHeatmap, type CalendarHeatmapVariant, type CalendarDatum } from './CalendarHeatmap'

export const VARIANTS: CalendarHeatmapVariant[] = ['month', 'year', 'streak']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

function isoKey(date: Date): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
}

function generateYear(seed: number, end: Date, max: number, streakRatio = 0.7): CalendarDatum[] {
  const r = rng(seed)
  const out: CalendarDatum[] = []
  for (let i = 365; i >= 0; i--) {
    const d = new Date(end.getTime())
    d.setUTCDate(d.getUTCDate() - i)
    const active = r() < streakRatio
    const v = active ? Math.round(r() * max) : 0
    out.push({ date: isoKey(d), value: v })
  }
  return out
}

const REF_END = new Date(Date.UTC(2026, 4, 24))
const COMMITS = generateYear(17, REF_END, 18, 0.62)
const HABITS = generateYear(41, REF_END, 1, 0.78).map(d => ({ ...d, value: d.value > 0 ? 1 : 0 }))
const HEAT_MONTH = generateYear(23, REF_END, 12, 0.74)

export function CalendarHeatmapStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'month' && (
              <Cell label="single month, daily intensity">
                <CalendarHeatmap variant="month" data={HEAT_MONTH} endDate={REF_END} cellSize={26} />
              </Cell>
            )}
            {variant === 'year' && (
              <>
                <Cell label="commits, 12 months">
                  <CalendarHeatmap variant="year" data={COMMITS} endDate={REF_END} formatValue={v => `${v} commits`} />
                </Cell>
                <Cell label="larger cells">
                  <CalendarHeatmap variant="year" data={COMMITS} endDate={REF_END} cellSize={14} />
                </Cell>
              </>
            )}
            {variant === 'streak' && (
              <Cell label="habit streak (binary days)">
                <CalendarHeatmap variant="streak" data={HABITS} endDate={REF_END} formatValue={v => v > 0 ? 'done' : '—'} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
