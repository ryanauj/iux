import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useStore } from '../../app/StoreContext'
import './PropertyInspector.css'

export type PropertyInspectorVariant = 'flat' | 'grouped' | 'multi' | 'constrained'

export type PropertyFieldType = 'text' | 'number' | 'select' | 'toggle' | 'color'

export interface PropertyField {
  key: string
  label: ReactNode
  group?: string
  type: PropertyFieldType
  options?: string[]
  unit?: string
  /** Default value to display when selection has no value for this key. */
  defaultValue?: unknown
}

export interface ComputedConstraint {
  disabled?: boolean
  /** Override the displayed value (e.g., derived value when a sibling is auto). */
  valueOverride?: unknown
}

export interface PropertyInspectorProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: PropertyInspectorVariant
  fields: PropertyField[]
  /** Selection: 0 = empty state, 1 = single object, 2+ = multi-edit with mixed values. */
  selection: Array<Record<string, unknown>>
  onChange?: (key: string, value: unknown) => void
  /** grouped: persist collapsed groups under this prefix. */
  groupKey?: string
  /** constrained: compute per-field disabled + valueOverride from current values. */
  computeConstraints?: (values: Record<string, unknown>) => Record<string, ComputedConstraint>
  className?: string
}

const MIXED = Symbol('mixed')

function sharedValue(selection: Array<Record<string, unknown>>, key: string, fallback: unknown): unknown | typeof MIXED {
  if (selection.length === 0) return fallback
  const first = selection[0]?.[key] ?? fallback
  for (let i = 1; i < selection.length; i++) {
    const v = selection[i]?.[key] ?? fallback
    if (v !== first) return MIXED
  }
  return first
}

export function PropertyInspector({
  variant = 'flat',
  fields,
  selection,
  onChange,
  groupKey = 'default',
  computeConstraints,
  className,
}: PropertyInspectorProps) {
  const groups = useMemo(() => {
    if (variant !== 'grouped') return [{ name: null as string | null, items: fields }]
    const order: string[] = []
    const buckets = new Map<string, PropertyField[]>()
    for (const f of fields) {
      const g = f.group ?? 'Other'
      if (!buckets.has(g)) { order.push(g); buckets.set(g, []) }
      buckets.get(g)!.push(f)
    }
    return order.map(g => ({ name: g, items: buckets.get(g)! }))
  }, [variant, fields])

  const store = useStore()
  const storageKey = `inspector:${groupKey}:collapsed`
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set<string>())

  useEffect(() => {
    let cancelled = false
    void store.get<string[]>(storageKey).then(v => {
      if (cancelled || !Array.isArray(v)) return
      setCollapsed(new Set(v))
    })
    return () => { cancelled = true }
  }, [store, storageKey])

  const toggleGroup = (g: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(g)) next.delete(g); else next.add(g)
      void store.set<string[]>(storageKey, Array.from(next))
      return next
    })
  }

  const constraints: Record<string, ComputedConstraint> = useMemo(() => {
    if (variant !== 'constrained' || !computeConstraints || selection.length === 0) return {}
    // Compute constraints from the first object's effective values.
    const values: Record<string, unknown> = {}
    for (const f of fields) {
      const v = sharedValue(selection, f.key, f.defaultValue)
      values[f.key] = v === MIXED ? f.defaultValue : v
    }
    return computeConstraints(values)
  }, [variant, computeConstraints, selection, fields])

  if (selection.length === 0) {
    return (
      <aside className={['iux-inspector', `iux-inspector--${variant}`, className].filter(Boolean).join(' ')}>
        <p className="iux-inspector__empty">Nothing selected.</p>
      </aside>
    )
  }

  return (
    <aside className={['iux-inspector', `iux-inspector--${variant}`, className].filter(Boolean).join(' ')}>
      <header className="iux-inspector__header">
        <h3 className="iux-inspector__title">Properties</h3>
        {variant === 'multi' && selection.length > 1 && (
          <span className="iux-inspector__meta">{selection.length} selected</span>
        )}
      </header>

      {groups.map(g => {
        const isCollapsed = g.name ? collapsed.has(g.name) : false
        return (
          <section key={g.name ?? '__'} className="iux-inspector__section">
            {g.name && variant === 'grouped' && (
              <button
                type="button"
                className="iux-inspector__section-toggle"
                aria-expanded={!isCollapsed}
                onClick={() => toggleGroup(g.name!)}
              >
                <span>{g.name}</span>
                <span className="iux-inspector__caret" aria-hidden="true" data-expanded={!isCollapsed}>▾</span>
              </button>
            )}
            {(!g.name || !isCollapsed) && (
              <div className="iux-inspector__rows">
                {g.items.map(f => {
                  const raw = sharedValue(selection, f.key, f.defaultValue)
                  const mixed = raw === MIXED
                  const c = constraints[f.key] ?? {}
                  const displayValue = c.valueOverride !== undefined ? c.valueOverride : (mixed ? '' : raw)
                  return (
                    <FieldRow
                      key={f.key}
                      field={f}
                      mixed={mixed}
                      disabled={c.disabled}
                      value={displayValue}
                      onChange={onChange ?? (() => {})}
                    />
                  )
                })}
              </div>
            )}
          </section>
        )
      })}
    </aside>
  )
}

interface FieldRowProps {
  field: PropertyField
  mixed: boolean
  disabled?: boolean
  value: unknown
  onChange: (key: string, value: unknown) => void
}

function FieldRow({ field, mixed, disabled, value, onChange }: FieldRowProps) {
  const baseProps = {
    id: `inspector-${field.key}`,
    disabled,
    'aria-label': typeof field.label === 'string' ? field.label : undefined,
  }
  let control: ReactNode
  if (field.type === 'select' && field.options) {
    control = (
      <select
        {...baseProps}
        className="iux-inspector__control"
        value={(value as string) ?? ''}
        onChange={e => onChange(field.key, e.target.value)}
      >
        {mixed && <option value="" disabled>Mixed</option>}
        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  } else if (field.type === 'toggle') {
    control = (
      <input
        {...baseProps}
        type="checkbox"
        className="iux-inspector__control"
        checked={Boolean(value)}
        onChange={e => onChange(field.key, e.target.checked)}
      />
    )
  } else if (field.type === 'number') {
    control = (
      <div className="iux-inspector__numeric">
        <input
          {...baseProps}
          type="number"
          className="iux-inspector__control"
          placeholder={mixed ? '—' : undefined}
          value={mixed ? '' : (value as number | string)}
          onChange={e => onChange(field.key, e.target.value === '' ? undefined : Number(e.target.value))}
        />
        {field.unit && <span className="iux-inspector__unit">{field.unit}</span>}
      </div>
    )
  } else if (field.type === 'color') {
    const colorVal = typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value) ? value : undefined
    control = (
      <input
        {...baseProps}
        type="color"
        className="iux-inspector__color"
        value={colorVal}
        onChange={e => onChange(field.key, e.target.value)}
      />
    )
  } else {
    control = (
      <input
        {...baseProps}
        type="text"
        className="iux-inspector__control"
        placeholder={mixed ? 'Mixed' : undefined}
        value={mixed ? '' : ((value as string) ?? '')}
        onChange={e => onChange(field.key, e.target.value)}
      />
    )
  }

  return (
    <label className={['iux-inspector__row', mixed && 'is-mixed', disabled && 'is-disabled'].filter(Boolean).join(' ')} htmlFor={`inspector-${field.key}`}>
      <span className="iux-inspector__row-label">{field.label}</span>
      {control}
    </label>
  )
}
