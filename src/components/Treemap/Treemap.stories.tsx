import type { ReactNode } from 'react'
import { Treemap, type TreemapVariant, type TreemapNode } from './Treemap'

export const VARIANTS: TreemapVariant[] = ['flat', 'grouped', 'labeled']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const PORTFOLIO: TreemapNode[] = [
  { key: 'us-eq', label: 'US equities', value: 0, intent: 'primary', children: [
    { key: 'tech', label: 'Tech', value: 3800 },
    { key: 'fin', label: 'Financials', value: 1900 },
    { key: 'health', label: 'Health', value: 1400 },
    { key: 'energy', label: 'Energy', value: 800 },
  ] },
  { key: 'intl', label: 'International', value: 0, intent: 'info', children: [
    { key: 'emea', label: 'EMEA', value: 1700 },
    { key: 'apac', label: 'APAC', value: 1200 },
    { key: 'latam', label: 'LATAM', value: 460 },
  ] },
  { key: 'bonds', label: 'Bonds', value: 0, intent: 'success', children: [
    { key: 'tres', label: 'Treasuries', value: 1500 },
    { key: 'corp', label: 'Corporate', value: 980 },
    { key: 'muni', label: 'Munis', value: 540 },
  ] },
  { key: 'alt', label: 'Alternatives', value: 0, intent: 'warning', children: [
    { key: 'reit', label: 'REITs', value: 640 },
    { key: 'commod', label: 'Commodities', value: 380 },
  ] },
  { key: 'cash', label: 'Cash', value: 420, intent: 'neutral' },
]

const STORAGE: TreemapNode[] = [
  { key: 'media', label: 'Media', value: 0, intent: 'primary', children: [
    { key: 'photos', label: 'Photos', value: 320 },
    { key: 'video', label: 'Video', value: 980 },
    { key: 'audio', label: 'Audio', value: 140 },
  ] },
  { key: 'docs', label: 'Documents', value: 0, intent: 'info', children: [
    { key: 'pdf', label: 'PDF', value: 60 },
    { key: 'sheets', label: 'Sheets', value: 38 },
    { key: 'slides', label: 'Slides', value: 24 },
  ] },
  { key: 'sys', label: 'System', value: 220, intent: 'neutral' },
  { key: 'free', label: 'Free', value: 410, intent: 'success' },
]

const FLAT: TreemapNode[] = [
  { key: 'r1', label: 'API', value: 4200 },
  { key: 'r2', label: 'Web', value: 2400 },
  { key: 'r3', label: 'Mobile', value: 1800 },
  { key: 'r4', label: 'Worker', value: 900 },
  { key: 'r5', label: 'Batch', value: 600 },
  { key: 'r6', label: 'Cron', value: 420 },
  { key: 'r7', label: 'Admin', value: 280 },
  { key: 'r8', label: 'Misc', value: 180 },
]

export function TreemapStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'flat' && (
              <Cell label="service request counts, flat">
                <Treemap variant="flat" data={FLAT} width={560} height={320} />
              </Cell>
            )}
            {variant === 'grouped' && (
              <Cell label="portfolio holdings by class">
                <Treemap variant="grouped" data={PORTFOLIO} width={560} height={340} formatValue={v => `$${(v / 1000).toFixed(1)}k`} />
              </Cell>
            )}
            {variant === 'labeled' && (
              <Cell label="storage with per-leaf values (GB)">
                <Treemap variant="labeled" data={STORAGE} width={560} height={340} formatValue={v => `${v}gb`} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
