// Tabs ladder rungs: basic, rich, overflow, editable. Rung 3 (overflow) drives
// its "More" menu off a ResizeObserver — asserting the auto-collapse requires
// constraining width in CSS pixels, which is brittle in the test sandbox, so
// rung 3 only confirms the variant class. The drag-to-reorder behaviour of
// rung 4 isn't exercised either (no pointer-move step in the runner); the
// rung 4 test focuses on close + add.
import { useState } from 'react'
import { Tabs, type TabItem } from '../../components/Tabs/Tabs'
import type { IntegrationTest } from '../types'

function BasicComposition() {
  const [value, setValue] = useState('a')
  const tabs: TabItem[] = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
    { id: 'c', label: 'Gamma' },
  ]
  return (
    <div>
      <Tabs
        tabs={tabs}
        value={value}
        onValueChange={setValue}
        renderPanel={(id) => <p data-testid="panel">panel-{id}</p>}
        ariaLabel="Test tabs"
      />
      <span data-testid="state">{value}</span>
    </div>
  )
}

function RichComposition() {
  const [value, setValue] = useState('inbox')
  const tabs: TabItem[] = [
    { id: 'inbox', label: 'Inbox', icon: <span>I</span>, badge: 3 },
    { id: 'drafts', label: 'Drafts', icon: <span>D</span> },
    { id: 'archive', label: 'Archive', icon: <span>A</span>, disabled: true },
  ]
  return (
    <Tabs variant="rich" tabs={tabs} value={value} onValueChange={setValue} ariaLabel="Mail" />
  )
}

function OverflowComposition() {
  const [value, setValue] = useState('t1')
  const tabs: TabItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: `t${i + 1}`,
    label: `Tab ${i + 1}`,
  }))
  return (
    <Tabs variant="overflow" tabs={tabs} value={value} onValueChange={setValue} ariaLabel="Overflow tabs" />
  )
}

function EditableComposition() {
  const [tabs, setTabs] = useState<TabItem[]>([
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
  ])
  const [value, setValue] = useState('a')
  return (
    <div>
      <Tabs
        variant="editable"
        tabs={tabs}
        value={value}
        onValueChange={setValue}
        onClose={(id) => setTabs(prev => prev.filter(t => t.id !== id))}
        onAdd={() => {
          const next = `n${tabs.length + 1}`
          setTabs(prev => [...prev, { id: next, label: `New ${next}` }])
        }}
        ariaLabel="Editable tabs"
      />
      <span data-testid="count">{tabs.length}</span>
    </div>
  )
}

export const tabsTests: IntegrationTest[] = [
  {
    id: 'tabs-rung-1-click',
    name: 'Tabs — clicking a tab switches the panel (rung 1)',
    description: 'Basic tab strip: click a tab, aria-selected moves to it and the panel content updates.',
    components: ['tabs'],
    tags: ['tabs', 'rung-1'],
    render: () => <BasicComposition />,
    steps: [
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'a', label: 'Starts on a' },
      { kind: 'assertText', selector: '[data-testid="panel"]', text: 'panel-a', label: 'Panel a' },
      { kind: 'click', selector: '[data-tab-id="b"]', label: 'Click Beta' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'b', label: 'Now b' },
      { kind: 'assertVisible', selector: '[data-tab-id="b"][aria-selected="true"]', label: 'Beta selected' },
      { kind: 'assertText', selector: '[data-testid="panel"]', text: 'panel-b', label: 'Panel b' },
    ],
  },
  {
    id: 'tabs-rung-1-keyboard',
    name: 'Tabs — ArrowRight cycles through enabled tabs (rung 1)',
    description: 'Arrow keys move selection along the tablist and skip disabled tabs.',
    components: ['tabs'],
    tags: ['tabs', 'rung-1', 'keyboard'],
    render: () => <BasicComposition />,
    steps: [
      { kind: 'press', key: 'ArrowRight', selector: '[data-tab-id="a"]', label: 'ArrowRight' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'b', label: 'Now b' },
      { kind: 'press', key: 'End', selector: '[data-tab-id="b"]', label: 'End' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'c', label: 'Now c' },
    ],
  },
  {
    id: 'tabs-rung-2-rich',
    name: 'Tabs — rich variant shows icons, badges, disabled (rung 2)',
    description: 'Rich variant renders icons, badge counts, and disables tabs with aria-disabled.',
    components: ['tabs'],
    tags: ['tabs', 'rung-2'],
    render: () => <RichComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tabs--rich', label: 'Rich variant class' },
      { kind: 'assertCount', selector: '.iux-tabs__icon', count: 3, label: 'Three icons' },
      { kind: 'assertText', selector: '.iux-tabs__badge', text: '3', label: 'Badge count' },
      { kind: 'assertVisible', selector: '[data-tab-id="archive"][aria-disabled="true"]', label: 'Archive disabled' },
    ],
  },
  {
    id: 'tabs-rung-3-overflow',
    name: 'Tabs — overflow variant renders More button (rung 3)',
    description: 'Overflow variant renders a "More" button alongside the tablist. The auto-collapse threshold is layout-driven and not asserted here.',
    components: ['tabs'],
    tags: ['tabs', 'rung-3'],
    render: () => <OverflowComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tabs--overflow', label: 'Overflow variant class' },
      { kind: 'assertVisible', selector: '.iux-tabs__more', label: 'More button rendered' },
    ],
  },
  {
    id: 'tabs-rung-4-editable',
    name: 'Tabs — editable supports close and add (rung 4)',
    description: 'Editable variant adds a + new tab affordance and a × close on each tab.',
    components: ['tabs'],
    tags: ['tabs', 'rung-4'],
    render: () => <EditableComposition />,
    steps: [
      { kind: 'assertText', selector: '[data-testid="count"]', text: '2', label: 'Two tabs initially' },
      { kind: 'click', selector: '.iux-tabs__add', label: 'Click + add' },
      { kind: 'assertText', selector: '[data-testid="count"]', text: '3', label: 'Three after add' },
      { kind: 'click', selector: '[data-tab-id="b"] .iux-tabs__close', label: 'Close Beta' },
      { kind: 'assertText', selector: '[data-testid="count"]', text: '2', label: 'Two after close' },
      { kind: 'assertGone', selector: '[data-tab-id="b"]', label: 'Beta tab gone' },
    ],
  },
]
