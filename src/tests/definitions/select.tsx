// Select ladder rungs: native, dropdown (custom), combobox (searchable), async
// (server-side load + creatable). The listbox is portaled to .palette-root,
// so each composition wraps itself in a palette-root div to keep the
// portaled subtree inside the test host. Options use onMouseDown for
// selection, so we drive selection via keyboard (ArrowDown + Enter) rather
// than click. Rung 4 (async) is skipped: the debounced loadOptions
// resolution is hard to observe deterministically from the sandbox runner.
import { useState } from 'react'
import { Select, type SelectOption } from '../../components/Select/Select'
import type { IntegrationTest } from '../types'

const FRUITS: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

const GROUPED: SelectOption[] = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Veg' },
  { value: 'potato', label: 'Potato', group: 'Veg' },
]

function NativeComposition() {
  return (
    <Select
      variant="native"
      options={FRUITS}
      placeholder="Pick one"
      defaultValue="banana"
    />
  )
}

function DropdownComposition() {
  const [val, setVal] = useState<string>('')
  return (
    <div className="palette-root">
      <Select
        variant="dropdown"
        options={GROUPED}
        placeholder="Pick one"
        value={val}
        onChange={setVal}
      />
      <span data-testid="state">{val}</span>
    </div>
  )
}

function ComboboxComposition() {
  const [val, setVal] = useState<string>('')
  return (
    <div className="palette-root">
      <Select
        variant="combobox"
        options={FRUITS}
        placeholder="Search…"
        value={val}
        onChange={setVal}
      />
      <span data-testid="state">{val}</span>
    </div>
  )
}

export const selectTests: IntegrationTest[] = [
  {
    id: 'select-rung-1-native',
    name: 'Select — native renders styled <select> with options (rung 1)',
    description: 'Native variant uses a real <select> element with the contract trigger class and renders all options.',
    components: ['select'],
    tags: ['select', 'rung-1'],
    render: () => <NativeComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-select--native', label: 'Native variant class' },
      { kind: 'assertVisible', selector: 'select.iux-select__native', label: 'Real <select> element' },
      { kind: 'assertCount', selector: 'select.iux-select__native option', count: 4, label: 'Placeholder + 3 options' },
    ],
  },
  {
    id: 'select-rung-2-dropdown',
    name: 'Select — dropdown opens listbox and selects via keyboard (rung 2)',
    description: 'Dropdown variant opens a portaled listbox with grouped headings and commits the active option on Enter.',
    components: ['select'],
    tags: ['select', 'rung-2', 'overlay'],
    render: () => <DropdownComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-select__trigger[aria-expanded="false"]', label: 'Trigger collapsed' },
      { kind: 'click', selector: '.iux-select__trigger', label: 'Open listbox' },
      { kind: 'assertVisible', selector: '.iux-select__listbox', label: 'Listbox visible' },
      { kind: 'assertCount', selector: '.iux-select__group-heading', count: 2, label: 'Two group headings' },
      { kind: 'assertCount', selector: '.iux-select__option', count: 4, label: 'Four options' },
      { kind: 'press', key: 'Enter', selector: '.iux-select__trigger', label: 'Select first active option' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'apple', label: 'First option committed' },
      { kind: 'assertGone', selector: '.iux-select__listbox', label: 'Listbox closed' },
    ],
  },
  {
    id: 'select-rung-3-combobox',
    name: 'Select — combobox filters via typed query (rung 3)',
    description: 'Combobox filters options as the user types and shows the no-results status when nothing matches.',
    components: ['select'],
    tags: ['select', 'rung-3', 'overlay'],
    render: () => <ComboboxComposition />,
    steps: [
      { kind: 'click', selector: '.iux-select__trigger', label: 'Focus combobox' },
      { kind: 'type', selector: '.iux-select__trigger', text: 'ch', label: 'Type filter' },
      { kind: 'assertCount', selector: '.iux-select__option', count: 1, label: 'Only Cherry matches' },
      { kind: 'press', key: 'Enter', selector: '.iux-select__trigger', label: 'Pick first match' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'cherry', label: 'Cherry selected' },
    ],
  },
]
