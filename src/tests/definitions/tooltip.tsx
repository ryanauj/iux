// Tooltip ladder rungs: plain, shortcut (kbd chip), rich (title + thumb +
// pinnable), coach (step indicator + next/skip). The tooltip is portaled to
// .palette-root — scopedQuery walks into it. All tests force `open={true}`
// and `delayMs={0}` to bypass the hover/focus delay timer that the runner
// can't deterministically drive.
import { useState } from 'react'
import { Tooltip } from '../../components/Tooltip/Tooltip'
import type { IntegrationTest } from '../types'

function PlainComposition() {
  return (
    <div style={{ padding: 80 }}>
      <Tooltip variant="plain" content="Hi there" open delayMs={0}>
        <button data-testid="trigger">trigger</button>
      </Tooltip>
    </div>
  )
}

function ShortcutComposition() {
  return (
    <div style={{ padding: 80 }}>
      <Tooltip variant="shortcut" content="Save" shortcut="⌘S" open delayMs={0}>
        <button data-testid="trigger">save</button>
      </Tooltip>
    </div>
  )
}

function RichComposition() {
  return (
    <div style={{ padding: 80 }}>
      <Tooltip
        variant="rich"
        title="Pull request"
        content={<span>Detailed body content</span>}
        thumbnail={<svg width="24" height="24" data-testid="thumb" />}
        pinnable
        open
        delayMs={0}
      >
        <button data-testid="trigger">card</button>
      </Tooltip>
    </div>
  )
}

function CoachComposition() {
  const [next, setNext] = useState(0)
  const [skipped, setSkipped] = useState(false)
  return (
    <div style={{ padding: 80 }}>
      <Tooltip
        variant="coach"
        content="This is step one of the tour"
        step={{ current: 1, total: 3, onNext: () => setNext(n => n + 1), onSkip: () => setSkipped(true) }}
        open
        delayMs={0}
      >
        <button data-testid="trigger">target</button>
      </Tooltip>
      <span data-testid="next">{next}</span>
      <span data-testid="skipped">{skipped ? 'yes' : 'no'}</span>
    </div>
  )
}

export const tooltipTests: IntegrationTest[] = [
  {
    id: 'tooltip-rung-1-plain',
    name: 'Tooltip — plain renders content with arrow (rung 1)',
    description: 'Plain variant renders the tooltip surface, content, and arrow when open.',
    components: ['tooltip'],
    tags: ['tooltip', 'rung-1', 'overlay'],
    render: () => <PlainComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tooltip--plain', label: 'Plain variant class' },
      { kind: 'assertText', selector: '.iux-tooltip__content', text: 'Hi there', label: 'Content renders' },
      { kind: 'assertVisible', selector: '.iux-tooltip__arrow', label: 'Arrow renders' },
    ],
  },
  {
    id: 'tooltip-rung-2-shortcut',
    name: 'Tooltip — shortcut surfaces kbd chip (rung 2)',
    description: 'Shortcut variant renders a trailing keyboard shortcut chip alongside the content.',
    components: ['tooltip'],
    tags: ['tooltip', 'rung-2', 'overlay'],
    render: () => <ShortcutComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tooltip--shortcut', label: 'Shortcut variant class' },
      { kind: 'assertText', selector: '.iux-tooltip__content', text: 'Save', label: 'Content renders' },
      { kind: 'assertText', selector: '.iux-tooltip__kbd', text: '⌘S', label: 'Shortcut chip renders' },
    ],
  },
  {
    id: 'tooltip-rung-3-rich',
    name: 'Tooltip — rich renders title, body, thumbnail (rung 3)',
    description: 'Rich variant lays out a bold heading, body content, and optional thumbnail.',
    components: ['tooltip'],
    tags: ['tooltip', 'rung-3', 'overlay'],
    render: () => <RichComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tooltip--rich', label: 'Rich variant class' },
      { kind: 'assertText', selector: '.iux-tooltip__title', text: 'Pull request', label: 'Title renders' },
      { kind: 'assertText', selector: '.iux-tooltip__content', text: 'Detailed body content', label: 'Body renders' },
      { kind: 'assertVisible', selector: '.iux-tooltip__thumb [data-testid="thumb"]', label: 'Thumbnail renders' },
    ],
  },
  {
    id: 'tooltip-rung-4-coach',
    name: 'Tooltip — coach exposes step meta and next/skip (rung 4)',
    description: 'Coach variant labels the step (1 of 3) and exposes Next + Skip buttons wired to callbacks.',
    components: ['tooltip'],
    tags: ['tooltip', 'rung-4', 'overlay'],
    render: () => <CoachComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tooltip--coach', label: 'Coach variant class' },
      { kind: 'assertText', selector: '.iux-tooltip__step-meta', text: 'Step 1 of 3', label: 'Step meta renders' },
      { kind: 'assertText', selector: '.iux-tooltip__step-actions .iux-tooltip__btn--primary', text: 'Next', label: 'Next button label' },
      { kind: 'click', selector: '.iux-tooltip__step-actions .iux-tooltip__btn--primary', label: 'Click Next' },
      { kind: 'assertText', selector: '[data-testid="next"]', text: '1', label: 'onNext fired' },
      { kind: 'click', selector: '.iux-tooltip__step-actions .iux-tooltip__btn--ghost', label: 'Click Skip' },
      { kind: 'assertText', selector: '[data-testid="skipped"]', text: 'yes', label: 'onSkip fired' },
    ],
  },
]
