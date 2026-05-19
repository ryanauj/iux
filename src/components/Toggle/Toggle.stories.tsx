import { useState, type ReactNode } from 'react'
import { Toggle, type ToggleVariant } from './Toggle'

const VARIANTS: ToggleVariant[] = ['switch', 'saving', 'segmented', 'tristate']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell">
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function StatefulSwitch({ initial = false, label }: { initial?: boolean; label: string }) {
  const [on, setOn] = useState(initial)
  return <Toggle variant="switch" label={label} checked={on} onCheckedChange={setOn} />
}

function StatefulSaving({ initial = true }: { initial?: boolean }) {
  const [on, setOn] = useState(initial)
  const [saving, setSaving] = useState(false)
  return (
    <Toggle
      variant="saving"
      label="Notifications"
      checked={on}
      saving={saving}
      onCheckedChange={next => {
        setSaving(true)
        setTimeout(() => {
          setOn(next)
          setSaving(false)
        }, 600)
      }}
    />
  )
}

const SEG_OPTIONS = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
]

function StatefulSegmented() {
  const [v, setV] = useState('grid')
  return <Toggle variant="segmented" label="View" options={SEG_OPTIONS} value={v} onValueChange={setV} />
}

function StatefulTristate() {
  const [v, setV] = useState('inherit')
  return <Toggle variant="tristate" label="Dark mode" value={v} onValueChange={setV} />
}

export function ToggleStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'switch' && (
              <>
                <Cell label="off"><StatefulSwitch initial={false} label="Wifi" /></Cell>
                <Cell label="on"><StatefulSwitch initial label="Wifi" /></Cell>
                <Cell label="focus"><Toggle variant="switch" label="Wifi" checked stateLock="focus" /></Cell>
                <Cell label="hover"><Toggle variant="switch" label="Wifi" stateLock="hover" /></Cell>
                <Cell label="disabled off"><Toggle variant="switch" label="Wifi" disabled /></Cell>
                <Cell label="disabled on"><Toggle variant="switch" label="Wifi" checked disabled /></Cell>
              </>
            )}
            {variant === 'saving' && (
              <>
                <Cell label="idle on"><Toggle variant="saving" label="Notifications" checked /></Cell>
                <Cell label="idle off"><Toggle variant="saving" label="Notifications" /></Cell>
                <Cell label="saving"><Toggle variant="saving" label="Notifications" saving /></Cell>
                <Cell label="interactive"><StatefulSaving /></Cell>
              </>
            )}
            {variant === 'segmented' && (
              <>
                <Cell label="default"><StatefulSegmented /></Cell>
                <Cell label="focus"><Toggle variant="segmented" label="View" options={SEG_OPTIONS} value="grid" stateLock="focus" /></Cell>
                <Cell label="hover"><Toggle variant="segmented" label="View" options={SEG_OPTIONS} value="grid" stateLock="hover" /></Cell>
                <Cell label="disabled"><Toggle variant="segmented" label="View" options={SEG_OPTIONS} value="grid" disabled /></Cell>
              </>
            )}
            {variant === 'tristate' && (
              <>
                <Cell label="default (inherit)"><StatefulTristate /></Cell>
                <Cell label="off"><Toggle variant="tristate" label="Dark mode" value="off" /></Cell>
                <Cell label="on"><Toggle variant="tristate" label="Dark mode" value="on" /></Cell>
                <Cell label="focus"><Toggle variant="tristate" label="Dark mode" value="inherit" stateLock="focus" /></Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
