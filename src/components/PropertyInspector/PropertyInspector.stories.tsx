import { useState, type ReactNode } from 'react'
import { PropertyInspector, type PropertyField, type PropertyInspectorVariant } from './PropertyInspector'

export const VARIANTS: PropertyInspectorVariant[] = ['flat', 'grouped', 'multi', 'constrained']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const FIELDS_FLAT: PropertyField[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'visible', label: 'Visible', type: 'toggle' },
  { key: 'opacity', label: 'Opacity', type: 'number', unit: '%' },
]

const FIELDS_GROUPED: PropertyField[] = [
  { key: 'x', label: 'X', group: 'Layout', type: 'number', unit: 'px' },
  { key: 'y', label: 'Y', group: 'Layout', type: 'number', unit: 'px' },
  { key: 'width', label: 'Width', group: 'Layout', type: 'number', unit: 'px' },
  { key: 'height', label: 'Height', group: 'Layout', type: 'number', unit: 'px' },
  { key: 'family', label: 'Font', group: 'Type', type: 'select', options: ['Inter', 'Roboto', 'Georgia'] },
  { key: 'weight', label: 'Weight', group: 'Type', type: 'select', options: ['400', '500', '700'] },
  { key: 'color', label: 'Color', group: 'Color', type: 'color' },
]

const FIELDS_CONSTRAINED: PropertyField[] = [
  { key: 'autoWidth', label: 'Auto width', group: 'Layout', type: 'toggle' },
  { key: 'width', label: 'Width', group: 'Layout', type: 'number', unit: 'px' },
  { key: 'height', label: 'Height', group: 'Layout', type: 'number', unit: 'px' },
]

function FlatStateful() {
  const [obj, setObj] = useState<Record<string, unknown>>({ name: 'Block 1', visible: true, opacity: 80 })
  return <PropertyInspector variant="flat" fields={FIELDS_FLAT} selection={[obj]} onChange={(k, v) => setObj(p => ({ ...p, [k]: v }))} />
}

function GroupedStateful() {
  // Color value lives in component state; the native color input defaults
  // when no value is supplied initially — that keeps this stories file free of
  // raw hex (forbidden by the token-lint gate).
  const [obj, setObj] = useState<Record<string, unknown>>({ x: 12, y: 40, width: 320, height: 180, family: 'Inter', weight: '500' })
  return <PropertyInspector variant="grouped" fields={FIELDS_GROUPED} selection={[obj]} groupKey="story" onChange={(k, v) => setObj(p => ({ ...p, [k]: v }))} />
}

function MultiStateful() {
  const [objs, setObjs] = useState<Array<Record<string, unknown>>>([
    { name: 'Block A', visible: true, opacity: 80 },
    { name: 'Block B', visible: true, opacity: 60 },
    { name: 'Block C', visible: false, opacity: 80 },
  ])
  return (
    <PropertyInspector
      variant="multi"
      fields={FIELDS_FLAT}
      selection={objs}
      onChange={(k, v) => setObjs(prev => prev.map(o => ({ ...o, [k]: v })))}
    />
  )
}

function ConstrainedStateful() {
  const [obj, setObj] = useState<Record<string, unknown>>({ autoWidth: true, width: 320, height: 180 })
  return (
    <PropertyInspector
      variant="constrained"
      fields={FIELDS_CONSTRAINED}
      selection={[obj]}
      onChange={(k, v) => setObj(p => ({ ...p, [k]: v }))}
      computeConstraints={values => values.autoWidth
        ? { width: { disabled: true, valueOverride: 'auto' } }
        : ({} as Record<string, { disabled?: boolean; valueOverride?: unknown }>)}
    />
  )
}

export function PropertyInspectorStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'flat' && <Cell label="single object"><FlatStateful /></Cell>}
            {variant === 'grouped' && <Cell label="Layout / Type / Color"><GroupedStateful /></Cell>}
            {variant === 'multi' && <Cell label="multi-select: 'Mixed' on differing fields"><MultiStateful /></Cell>}
            {variant === 'constrained' && <Cell label="auto width disables width"><ConstrainedStateful /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
