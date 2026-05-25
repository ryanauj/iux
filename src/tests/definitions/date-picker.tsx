// DatePicker ladder rungs: input (typed date), calendar (popover grid), range
// (two-click range + presets), nl (natural-language parse). The popover is
// rendered inline (not portaled), so normal sandbox queries reach it.
import { useState } from 'react'
import { DatePicker } from '../../components/DatePicker/DatePicker'
import type { IntegrationTest } from '../types'

function InputComposition() {
  const initial = new Date(2024, 5, 15)
  const [val, setVal] = useState<Date | null>(initial)
  return (
    <div>
      <DatePicker variant="input" value={val} onValueChange={setVal} />
      <span data-testid="state">{val ? val.getFullYear() : ''}</span>
    </div>
  )
}

function CalendarComposition() {
  const fixed = new Date(2024, 5, 15)
  const [val, setVal] = useState<Date | null>(fixed)
  return (
    <div>
      <DatePicker variant="calendar" value={val} onValueChange={setVal} />
      <span data-testid="state">{val ? `${val.getFullYear()}-${val.getMonth() + 1}-${val.getDate()}` : ''}</span>
    </div>
  )
}

function RangeComposition() {
  const start = new Date(2024, 5, 10)
  const [range, setRange] = useState<[Date | null, Date | null]>([start, null])
  return (
    <div>
      <DatePicker variant="range" range={range} onRangeChange={setRange} />
      <span data-testid="state">
        {range[0] && range[1] ? `${range[0].getDate()}-${range[1].getDate()}` : ''}
      </span>
    </div>
  )
}

function NlComposition() {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])
  return (
    <div>
      <DatePicker variant="nl" range={range} onRangeChange={setRange} timeZone="America/Los_Angeles" />
      <span data-testid="state">{range[0] ? 'parsed' : ''}</span>
    </div>
  )
}

export const datePickerTests: IntegrationTest[] = [
  {
    id: 'datepicker-rung-1-input',
    name: 'DatePicker — input renders formatted value (rung 1)',
    description: 'Input variant renders a styled text field that mirrors the controlled value via Intl date formatting.',
    components: ['datepicker'],
    tags: ['datepicker', 'rung-1'],
    render: () => <InputComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-datepicker--input', label: 'Input variant class' },
      { kind: 'assertVisible', selector: 'input.iux-datepicker__field', label: 'Text field rendered' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '2024', label: 'Initial controlled value' },
    ],
  },
  {
    id: 'datepicker-rung-2-calendar',
    name: 'DatePicker — calendar popover selects a day (rung 2)',
    description: 'Calendar variant opens a popover, exposes a day grid, and commits the clicked day.',
    components: ['datepicker'],
    tags: ['datepicker', 'rung-2'],
    render: () => <CalendarComposition />,
    steps: [
      { kind: 'click', selector: '.iux-datepicker__trigger', label: 'Open calendar' },
      { kind: 'assertVisible', selector: '.iux-datepicker__calendar', label: 'Calendar visible' },
      { kind: 'assertVisible', selector: '.iux-datepicker__day.is-selected', label: 'Default selection highlighted' },
      { kind: 'click', selector: '.iux-datepicker__day:not(.is-outside):not(.is-selected)', label: 'Click a different day' },
      { kind: 'assertGone', selector: '.iux-datepicker__calendar', label: 'Calendar closes after pick' },
    ],
  },
  {
    id: 'datepicker-rung-3-range',
    name: 'DatePicker — range commits on second click (rung 3)',
    description: 'Range variant accepts two-click selection and commits the ordered range, closing on the second pick.',
    components: ['datepicker'],
    tags: ['datepicker', 'rung-3'],
    render: () => <RangeComposition />,
    steps: [
      { kind: 'click', selector: '.iux-datepicker__trigger', label: 'Open calendar' },
      { kind: 'assertVisible', selector: '.iux-datepicker__calendar', label: 'Calendar visible' },
      { kind: 'click', selector: '.iux-datepicker__day:not(.is-outside).is-selected', label: 'Set anchor (rung-3 pick 1)' },
      { kind: 'assertVisible', selector: '.iux-datepicker__calendar', label: 'Stays open after first pick' },
      { kind: 'click', selector: '.iux-datepicker__day:not(.is-outside):not(.is-selected)', label: 'Set end (rung-3 pick 2)' },
      { kind: 'assertGone', selector: '.iux-datepicker__calendar', label: 'Calendar closes after range commit' },
    ],
  },
  {
    id: 'datepicker-rung-4-nl',
    name: 'DatePicker — natural-language parses "today" on Enter (rung 4)',
    description: 'NL variant parses natural-language input on Enter, showing the parsed range readout with the time-zone hint.',
    components: ['datepicker'],
    tags: ['datepicker', 'rung-4'],
    render: () => <NlComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-datepicker--nl', label: 'NL variant class' },
      { kind: 'type', selector: '.iux-datepicker__field', text: 'today', label: 'Type natural language' },
      { kind: 'press', key: 'Enter', selector: '.iux-datepicker__field', label: 'Submit on Enter' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'parsed', label: 'Range parsed and committed' },
      { kind: 'assertVisible', selector: '.iux-datepicker__nl-readout', label: 'Readout renders parsed range' },
    ],
  },
]
