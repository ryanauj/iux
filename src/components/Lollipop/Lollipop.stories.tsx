import type { ReactNode } from 'react'
import { Lollipop, type LollipopVariant, type LollipopDatum } from './Lollipop'

export const VARIANTS: LollipopVariant[] = ['sticks', 'ranked', 'paired']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const TEAMS: LollipopDatum[] = [
  { key: 'platform', label: 'Platform', value: 42 },
  { key: 'growth', label: 'Growth', value: 31 },
  { key: 'design', label: 'Design', value: 18 },
  { key: 'data', label: 'Data', value: 26 },
  { key: 'infra', label: 'Infra', value: 12 },
]

const SCORES: LollipopDatum[] = [
  { key: 'auth', label: 'Auth', value: 96, intent: 'success' },
  { key: 'api', label: 'API', value: 88, intent: 'success' },
  { key: 'web', label: 'Web', value: 74, intent: 'warning' },
  { key: 'mobile', label: 'Mobile', value: 61, intent: 'warning' },
  { key: 'edge', label: 'Edge', value: 42, intent: 'danger' },
]

const QUOTA_PAIRED: LollipopDatum[] = [
  { key: 'alex', label: 'Alex', value: 142, compare: 118 },
  { key: 'bren', label: 'Bren', value: 118, compare: 124 },
  { key: 'cira', label: 'Cira', value: 98, compare: 76 },
  { key: 'dani', label: 'Dani', value: 87, compare: 92 },
  { key: 'evan', label: 'Evan', value: 72, compare: 60 },
]

export function LollipopStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'sticks' && (
              <>
                <Cell label="raw order, 5 categories">
                  <Lollipop variant="sticks" data={TEAMS} width={460} height={220} />
                </Cell>
                <Cell label="intent-coded health scores">
                  <Lollipop variant="sticks" data={SCORES} width={460} height={220} formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
            {variant === 'ranked' && (
              <>
                <Cell label="descending with value labels">
                  <Lollipop variant="ranked" data={TEAMS} width={460} height={220} />
                </Cell>
                <Cell label="ranked health scores">
                  <Lollipop variant="ranked" data={SCORES} width={460} height={220} formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
            {variant === 'paired' && (
              <>
                <Cell label="this quarter vs last">
                  <Lollipop variant="paired" data={QUOTA_PAIRED} width={460} height={240} valueLabel="this Q" compareLabel="last Q" formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
