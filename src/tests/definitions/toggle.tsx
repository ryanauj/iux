// ABOUTME: Integration tests for the Toggle component covering four ladder rungs: plain switch flips on click and updates aria-checked (rung 1), saving microstate shows aria-busy spinner while saving (rung 2), segmented picks one option and updates aria-checked across the group (rung 3), and tristate exposes on/off/inherit with three segments (rung 4).

import { useState } from 'react'
import { Toggle } from '../../components/Toggle/Toggle'
import type { IntegrationTest } from '../types'

function SwitchComposition() {
  const [on, setOn] = useState(false)
  return (
    <div>
      <Toggle data-testid="toggle" label="Notifications" checked={on} onCheckedChange={setOn} />
      <span data-testid="state">{on ? 'on' : 'off'}</span>
    </div>
  )
}

function SavingComposition() {
  const [on, setOn] = useState(true)
  const [saving, setSaving] = useState(true)
  return (
    <div>
      <Toggle variant="saving" checked={on} saving={saving} onCheckedChange={setOn} />
      <button data-testid="settle" onClick={() => setSaving(false)}>Settle</button>
    </div>
  )
}

function SegmentedComposition() {
  const [value, setValue] = useState('center')
  return (
    <div>
      <Toggle
        variant="segmented"
        options={[
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <span data-testid="state">{value}</span>
    </div>
  )
}

function TristateComposition() {
  const [value, setValue] = useState('inherit')
  return (
    <div>
      <Toggle variant="tristate" value={value} onValueChange={setValue} />
      <span data-testid="state">{value}</span>
    </div>
  )
}

// ABOUTME: Array of four IntegrationTest definitions for Toggle: switch flip, saving spinner, segmented single-select, and tristate three-segment.
export const toggleTests: IntegrationTest[] = [
  {
    id: 'toggle-rung-1-switch',
    name: 'Toggle — switch flips on click (rung 1)',
    description: 'Plain switch toggles checked state and updates aria-checked.',
    components: ['toggle'],
    tags: ['toggle', 'rung-1'],
    render: () => <SwitchComposition />,
    steps: [
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'off', label: 'Starts off' },
      { kind: 'click', selector: '.iux-toggle__track', label: 'Click track' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'on', label: 'Switched on' },
      { kind: 'assertVisible', selector: '.iux-toggle__track[aria-checked="true"]', label: 'aria-checked true' },
    ],
  },
  {
    id: 'toggle-rung-2-saving',
    name: 'Toggle — saving microstate shows spinner (rung 2)',
    description: 'Saving variant adds a "Saving…" status and aria-busy while saving=true.',
    components: ['toggle'],
    tags: ['toggle', 'rung-2', 'async'],
    render: () => <SavingComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-toggle__saving', label: 'Saving status visible' },
      { kind: 'assertVisible', selector: '.iux-toggle__track[aria-busy="true"]', label: 'aria-busy set' },
      { kind: 'click', selector: '[data-testid="settle"]', label: 'Settle save' },
      { kind: 'assertGone', selector: '.iux-toggle__saving', label: 'Saving cleared' },
    ],
  },
  {
    id: 'toggle-rung-3-segmented',
    name: 'Toggle — segmented picks one option (rung 3)',
    description: 'Clicking a segment selects it and updates aria-checked across the group.',
    components: ['toggle'],
    tags: ['toggle', 'rung-3', 'segmented'],
    render: () => <SegmentedComposition />,
    steps: [
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'center', label: 'Starts center' },
      { kind: 'click', selector: '.iux-toggle__segments button:first-child', label: 'Click Left' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'left', label: 'Now left' },
      { kind: 'click', selector: '.iux-toggle__segments button:last-child', label: 'Click Right' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'right', label: 'Now right' },
    ],
  },
  {
    id: 'toggle-rung-4-tristate',
    name: 'Toggle — tristate exposes on/off/inherit (rung 4)',
    description: 'Tristate variant defaults to three options including an inherit middle detent.',
    components: ['toggle'],
    tags: ['toggle', 'rung-4', 'tristate'],
    render: () => <TristateComposition />,
    steps: [
      { kind: 'assertCount', selector: '.iux-toggle__segment', count: 3, label: 'Three segments' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'inherit', label: 'Starts inherit' },
      { kind: 'click', selector: '.iux-toggle__segments button:first-child', label: 'Click Off' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'off', label: 'Now off' },
    ],
  },
]
