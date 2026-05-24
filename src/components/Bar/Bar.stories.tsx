import type { ReactNode } from 'react'
import { Bar, type BarVariant, type BarDatum } from './Bar'

export const VARIANTS: BarVariant[] = ['simple', 'sorted', 'targeted']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const REGIONS: BarDatum[] = [
  { key: 'amer', label: 'Americas', value: 12400 },
  { key: 'emea', label: 'EMEA', value: 9100 },
  { key: 'apac', label: 'APAC', value: 6700 },
  { key: 'latam', label: 'LATAM', value: 3200 },
  { key: 'mea', label: 'MEA', value: 1840 },
]

const TEAMS: BarDatum[] = [
  { key: 'platform', label: 'Platform', value: 42 },
  { key: 'growth', label: 'Growth', value: 31 },
  { key: 'design', label: 'Design', value: 18 },
  { key: 'data', label: 'Data', value: 26 },
  { key: 'infra', label: 'Infra', value: 12 },
  { key: 'sec', label: 'Security', value: 8 },
]

const QUOTA: BarDatum[] = [
  { key: 'alex', label: 'Alex', value: 142 },
  { key: 'bren', label: 'Bren', value: 118 },
  { key: 'cira', label: 'Cira', value: 98 },
  { key: 'dani', label: 'Dani', value: 87 },
  { key: 'evan', label: 'Evan', value: 72 },
  { key: 'fern', label: 'Fern', value: 64 },
]

export function BarStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <>
                <Cell label="vertical, 5 categories">
                  <Bar variant="simple" data={REGIONS} width={420} height={220} formatValue={v => `$${(v / 1000).toFixed(1)}k`} />
                </Cell>
                <Cell label="horizontal, 6 categories">
                  <Bar variant="simple" data={TEAMS} width={420} height={220} orientation="horizontal" />
                </Cell>
              </>
            )}
            {variant === 'sorted' && (
              <>
                <Cell label="descending with value labels">
                  <Bar variant="sorted" data={TEAMS} width={460} height={240} />
                </Cell>
                <Cell label="horizontal rank">
                  <Bar variant="sorted" data={QUOTA} width={460} height={240} orientation="horizontal" formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
            {variant === 'targeted' && (
              <>
                <Cell label="quota: 100%, color by status">
                  <Bar variant="targeted" data={QUOTA} width={460} height={240} target={100} formatValue={v => `${v}%`} />
                </Cell>
                <Cell label="horizontal, target 8k">
                  <Bar variant="targeted" data={REGIONS} width={460} height={240} target={8000} orientation="horizontal" formatValue={v => `$${(v / 1000).toFixed(1)}k`} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
