import type { ReactNode } from 'react'
import { Radar, type RadarVariant, type RadarSeries } from './Radar'

export const VARIANTS: RadarVariant[] = ['filled', 'multiple', 'rings']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '20rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const SKILLS_AXES = ['Speed', 'Quality', 'Coverage', 'Cost', 'Reliability', 'DX']

const ALICE: RadarSeries = { id: 'alice', label: 'Alice', values: [82, 90, 65, 58, 88, 72] }
const BENNY: RadarSeries = { id: 'benny', label: 'Benny', values: [60, 72, 90, 80, 70, 92], intent: 'info' }
const CARLA: RadarSeries = { id: 'carla', label: 'Carla', values: [70, 60, 85, 95, 55, 60], intent: 'success' }

const PRODUCT_AXES = ['UX', 'Perf', 'Docs', 'API', 'Tests']
const PRODUCT_BASELINE: RadarSeries = { id: 'baseline', label: 'Baseline', values: [70, 70, 70, 70, 70], intent: 'neutral' }
const PRODUCT_NOW: RadarSeries = { id: 'now', label: 'This release', values: [85, 78, 62, 90, 80] }

export function RadarStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'filled' && (
              <>
                <Cell label="single profile, 6 axes">
                  <Radar variant="filled" axes={SKILLS_AXES} series={[ALICE]} max={100} formatValue={v => `${v}%`} />
                </Cell>
                <Cell label="release vs. baseline">
                  <Radar variant="filled" axes={PRODUCT_AXES} series={[PRODUCT_NOW]} max={100} formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
            {variant === 'multiple' && (
              <>
                <Cell label="three profiles overlaid">
                  <Radar variant="multiple" axes={SKILLS_AXES} series={[ALICE, BENNY, CARLA]} max={100} formatValue={v => `${v}%`} />
                </Cell>
                <Cell label="release vs. baseline">
                  <Radar variant="multiple" axes={PRODUCT_AXES} series={[PRODUCT_BASELINE, PRODUCT_NOW]} max={100} formatValue={v => `${v}%`} />
                </Cell>
              </>
            )}
            {variant === 'rings' && (
              <>
                <Cell label="labeled reference rings">
                  <Radar variant="rings" axes={SKILLS_AXES} series={[ALICE]} max={100} rings={5} formatValue={v => `${v}`} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
