import { useState, type ReactNode } from 'react'
import { Segmented, type SegmentedItem, type SegmentedVariant } from './Segmented'

export const VARIANTS: SegmentedVariant[] = ['pill', 'rich', 'animated', 'overflow']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '20rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const ALIGN: SegmentedItem[] = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

const VIEWS: SegmentedItem[] = [
  { value: 'list', label: 'List', icon: <I name="list" /> },
  { value: 'grid', label: 'Grid', icon: <I name="grid" />, badge: 12 },
  { value: 'map', label: 'Map', icon: <I name="map" /> },
]

const MANY: SegmentedItem[] = Array.from({ length: 9 }, (_, i) => ({ value: `o${i}`, label: `Option ${i + 1}` }))

function StatefulPill() {
  const [v, setV] = useState('center')
  return <Segmented variant="pill" items={ALIGN} value={v} onValueChange={setV} ariaLabel="Text alignment" />
}

function StatefulAnimated() {
  const [v, setV] = useState('grid')
  return <Segmented variant="animated" items={VIEWS} value={v} onValueChange={setV} ariaLabel="View" />
}

function StatefulOverflow() {
  const [v, setV] = useState('o0')
  return (
    <div style={{ maxWidth: '20rem' }}>
      <Segmented variant="overflow" items={MANY} value={v} onValueChange={setV} ariaLabel="Section" />
    </div>
  )
}

function I({ name }: { name: 'list' | 'grid' | 'map' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'list': return <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 4h10M3 8h10M3 12h10" {...common} /></svg>
    case 'grid': return <svg viewBox="0 0 16 16" width="14" height="14"><rect x="2" y="2" width="5" height="5" {...common} /><rect x="9" y="2" width="5" height="5" {...common} /><rect x="2" y="9" width="5" height="5" {...common} /><rect x="9" y="9" width="5" height="5" {...common} /></svg>
    case 'map':  return <svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 4l4-2 4 2 4-2v10l-4 2-4-2-4 2zM6 2v12M10 4v12" {...common} /></svg>
  }
}

export function SegmentedStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'pill' && <Cell label="2-3 option pill"><StatefulPill /></Cell>}
            {variant === 'rich' && (
              <Cell label="icon + badge">
                <Segmented variant="rich" items={VIEWS} defaultValue="grid" ariaLabel="View" />
              </Cell>
            )}
            {variant === 'animated' && (
              <Cell label="sliding indicator"><StatefulAnimated /></Cell>
            )}
            {variant === 'overflow' && (
              <Cell label="more ▾ menu"><StatefulOverflow /></Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
