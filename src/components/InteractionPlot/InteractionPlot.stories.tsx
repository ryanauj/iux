import type { ReactNode } from 'react'
import { InteractionPlot, type InteractionPlotVariant, type InteractionLine } from './InteractionPlot'

export const VARIANTS: InteractionPlotVariant[] = ['lines', 'bands', 'spaghetti']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function makeLine(id: string, label: string, slope: number, intercept: number, intent: InteractionLine['intent'], withCI = false): InteractionLine {
  const pts = Array.from({ length: 20 }, (_, i) => {
    const x = i * 2
    const y = intercept + slope * x
    return withCI ? { x, y, lower: y - 3, upper: y + 3 } : { x, y }
  })
  return { id, label, intent, points: pts }
}

const PARALLEL: InteractionLine[] = [
  makeLine('low',  'low ad budget',  1.4, 5,  'info'),
  makeLine('med',  'median',         1.4, 15, 'primary'),
  makeLine('high', 'high ad budget', 1.4, 28, 'success'),
]

const CROSSING: InteractionLine[] = [
  makeLine('lowMod', 'low moderator',  0.4, 25, 'info',    true),
  makeLine('midMod', 'mid moderator',  1.4, 12, 'primary', true),
  makeLine('hiMod',  'high moderator', 2.6, -2, 'warning', true),
]

const SPAGHETTI: InteractionLine[] = Array.from({ length: 8 }, (_, i) =>
  makeLine(`l${i}`, `m=${i}`, 0.6 + i * 0.2, 5 + i * 1.5, (['info', 'primary', 'success', 'warning'] as const)[i % 4]),
)

export function InteractionPlotStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'lines' && (
              <Cell label="parallel lines — no interaction">
                <InteractionPlot variant="lines" lines={PARALLEL} width={560} height={320} xLabel="price" yLabel="sales" moderatorLabel="ad budget" />
              </Cell>
            )}
            {variant === 'bands' && (
              <Cell label="fanned slopes with CI — interaction is real">
                <InteractionPlot variant="bands" lines={CROSSING} width={560} height={320} xLabel="x₁" yLabel="ŷ" moderatorLabel="moderator" />
              </Cell>
            )}
            {variant === 'spaghetti' && (
              <Cell label="many moderator levels — thin lines">
                <InteractionPlot variant="spaghetti" lines={SPAGHETTI} width={560} height={320} xLabel="x₁" yLabel="ŷ" moderatorLabel="moderator" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
