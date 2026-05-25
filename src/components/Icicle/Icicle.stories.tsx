import type { ReactNode } from 'react'
import { Icicle, type IcicleVariant, type IcicleNode } from './Icicle'

export const VARIANTS: IcicleVariant[] = ['down', 'right', 'flame']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '36rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const BUDGET: IcicleNode = {
  id: 'all', label: 'Total', children: [
    { id: 'eng', label: 'Engineering', intent: 'primary', children: [
      { id: 'eng-fe', label: 'Frontend', children: [
        { id: 'eng-fe-web', label: 'Web', value: 8 },
        { id: 'eng-fe-mob', label: 'Mobile', value: 5 },
      ]},
      { id: 'eng-be', label: 'Backend', children: [
        { id: 'eng-be-svc', label: 'Services', value: 9 },
        { id: 'eng-be-data', label: 'Data', value: 6 },
      ]},
      { id: 'eng-infra', label: 'Infra', value: 7 },
    ]},
    { id: 'gtm', label: 'Go-to-market', intent: 'info', children: [
      { id: 'gtm-mkt', label: 'Marketing', value: 11 },
      { id: 'gtm-sales', label: 'Sales', value: 9 },
      { id: 'gtm-cs', label: 'Customer success', value: 4 },
    ]},
    { id: 'ga', label: 'G&A', intent: 'neutral', children: [
      { id: 'ga-fin', label: 'Finance', value: 3 },
      { id: 'ga-ppl', label: 'People', value: 4 },
      { id: 'ga-legal', label: 'Legal', value: 2 },
    ]},
  ],
}

const PROFILE: IcicleNode = {
  id: 'root', label: 'main', children: [
    { id: 'render', label: 'render', intent: 'primary', children: [
      { id: 'layout', label: 'layout', value: 28 },
      { id: 'paint', label: 'paint', value: 22, children: [
        { id: 'rasterize', label: 'rasterize', value: 14 },
        { id: 'composite', label: 'composite', value: 8 },
      ]},
      { id: 'reconcile', label: 'reconcile', value: 12 },
    ]},
    { id: 'data', label: 'data', intent: 'info', children: [
      { id: 'parse', label: 'parse', value: 14 },
      { id: 'fetch', label: 'fetch', value: 9 },
    ]},
    { id: 'gc', label: 'gc', intent: 'warning', value: 6 },
    { id: 'idle', label: 'idle', intent: 'neutral', value: 4 },
  ],
}

export function IcicleStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'down' && (
              <Cell label="org budget, root → leaves down">
                <Icicle variant="down" root={BUDGET} width={620} height={260} />
              </Cell>
            )}
            {variant === 'right' && (
              <Cell label="dir tree, root → leaves right">
                <Icicle variant="right" root={BUDGET} width={620} height={280} />
              </Cell>
            )}
            {variant === 'flame' && (
              <Cell label="CPU profile (root at bottom)">
                <Icicle variant="flame" root={PROFILE} width={620} height={260} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
