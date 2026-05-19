import { type ReactNode } from 'react'
import { VirtualList, type VirtualListVariant, type SectionSpec } from './VirtualList'

export const VARIANTS: VirtualListVariant[] = ['fixed', 'variable', 'sections', 'grid']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '40rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const FIXED_ITEMS = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  label: `Row ${i + 1}`,
  meta: `item ${i + 1} of 5,000`,
}))

const VARIABLE_ITEMS = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  label: `Item ${i + 1}`,
  body: 'Lorem ipsum '.repeat((i % 7) + 1),
}))

const SECTION_ITEMS = Array.from({ length: 600 }, (_, i) => ({ id: i, label: `Entry ${i + 1}` }))
const SECTIONS: SectionSpec[] = [
  { id: 'first', title: 'A · 0-99', itemRange: [0, 99] },
  { id: 'second', title: 'B · 100-299', itemRange: [100, 299] },
  { id: 'third', title: 'C · 300-499', itemRange: [300, 499] },
  { id: 'tail', title: 'D · 500-599', itemRange: [500, 599] },
]

const GRID_ITEMS = Array.from({ length: 1200 }, (_, i) => ({ id: i, label: `Tile ${i + 1}` }))

export function VirtualListStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'fixed' && (
              <Cell label="5,000 rows, fixed height">
                <VirtualList
                  variant="fixed"
                  items={FIXED_ITEMS}
                  rowHeight={36}
                  height={320}
                  renderItem={(it) => (
                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                      <strong>{it.label}</strong>
                      <span style={{ color: 'var(--color-content-secondary)' }}>{it.meta}</span>
                    </div>
                  )}
                />
              </Cell>
            )}
            {variant === 'variable' && (
              <Cell label="1,000 rows, variable height">
                <VirtualList
                  variant="variable"
                  items={VARIABLE_ITEMS}
                  estimatedRowHeight={48}
                  height={320}
                  renderItem={(it) => (
                    <div>
                      <strong>{it.label}</strong>
                      <p style={{ margin: 'var(--space-1) 0 0', color: 'var(--color-content-secondary)' }}>{it.body}</p>
                    </div>
                  )}
                />
              </Cell>
            )}
            {variant === 'sections' && (
              <Cell label="sticky headers + jump-to-section">
                <VirtualList
                  variant="sections"
                  items={SECTION_ITEMS}
                  rowHeight={32}
                  height={320}
                  sections={SECTIONS}
                  renderItem={(it) => <div>{it.label}</div>}
                />
              </Cell>
            )}
            {variant === 'grid' && (
              <Cell label="two-axis grid (3 cols × 400 rows)">
                <VirtualList
                  variant="grid"
                  items={GRID_ITEMS}
                  cols={3}
                  cellHeight={88}
                  height={320}
                  renderItem={(it) => (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      background: 'var(--color-surface-sunken)',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      {it.label}
                    </div>
                  )}
                />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
