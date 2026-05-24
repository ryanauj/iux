import type { ReactNode } from 'react'
import { Gauge, type GaugeVariant } from './Gauge'

export const VARIANTS: GaugeVariant[] = ['arc', 'zones', 'full']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '14rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

export function GaugeStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'arc' && (
              <>
                <Cell label="basic gauge, no target">
                  <Gauge variant="arc" value={68} caption="completion" />
                </Cell>
                <Cell label="value vs target">
                  <Gauge variant="arc" value={82} target={90} caption="SLA" formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
            {variant === 'zones' && (
              <>
                <Cell label="default zones, value lands in success">
                  <Gauge variant="zones" value={71} caption="health" formatValue={v => `${v}%`} />
                </Cell>
                <Cell label="value lands in warning">
                  <Gauge variant="zones" value={52} target={75} caption="quota" formatValue={v => `${v}%`} />
                </Cell>
                <Cell label="value lands in danger">
                  <Gauge variant="zones" value={22} caption="capacity" formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
            {variant === 'full' && (
              <>
                <Cell label="full ring (progress)">
                  <Gauge variant="full" value={78} caption="progress" formatValue={v => `${v}%`} />
                </Cell>
                <Cell label="full ring near target">
                  <Gauge variant="full" value={94} target={100} caption="uptime" formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
