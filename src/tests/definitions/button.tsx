// ABOUTME: button — part of the tests area.

import { useState } from 'react'
import { Button } from '../../components/Button/Button'
import type { IntegrationTest } from '../types'

function ClickCounterComposition() {
  const [count, setCount] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button data-testid="btn" onClick={() => setCount(c => c + 1)}>
        Click me
      </Button>
      <span data-testid="count">{count}</span>
    </div>
  )
}

function DisabledComposition() {
  const [count, setCount] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button data-testid="btn" disabled onClick={() => setCount(c => c + 1)}>
        Disabled
      </Button>
      <span data-testid="count">{count}</span>
    </div>
  )
}

function LoadingComposition() {
  const [count, setCount] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button data-testid="btn" loading onClick={() => setCount(c => c + 1)}>
        Submit
      </Button>
      <span data-testid="count">{count}</span>
    </div>
  )
}

function IntentComposition() {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button data-testid="btn-primary" intent="primary">Primary</Button>
      <Button data-testid="btn-danger" intent="danger">Danger</Button>
      <Button data-testid="btn-neutral" intent="neutral">Neutral</Button>
    </div>
  )
}

// ABOUTME: buttonTests — an exported value.
export const buttonTests: IntegrationTest[] = [
  {
    id: 'button-rung-1-click',
    name: 'Button — click fires handler (rung 1)',
    description: 'Solid label-only button: clicking increments a counter.',
    components: ['button'],
    tags: ['button', 'rung-1'],
    render: () => <ClickCounterComposition />,
    steps: [
      { kind: 'assertText', selector: '[data-testid="count"]', text: '0', label: 'Counter starts at 0' },
      { kind: 'click', selector: '[data-testid="btn"]', label: 'Click button' },
      { kind: 'assertText', selector: '[data-testid="count"]', text: '1', label: 'Counter is 1' },
      { kind: 'click', selector: '[data-testid="btn"]', label: 'Click again' },
      { kind: 'assertText', selector: '[data-testid="count"]', text: '2', label: 'Counter is 2' },
    ],
  },
  {
    id: 'button-rung-1-disabled',
    name: 'Button — disabled state blocks click (rung 1)',
    description: 'Disabled button does not fire its onClick handler.',
    components: ['button'],
    tags: ['button', 'rung-1', 'disabled'],
    render: () => <DisabledComposition />,
    steps: [
      { kind: 'assertVisible', selector: '[data-testid="btn"][disabled]', label: 'Button has disabled attribute' },
      { kind: 'click', selector: '[data-testid="btn"]', label: 'Attempt click' },
      { kind: 'assertText', selector: '[data-testid="count"]', text: '0', label: 'Counter still 0' },
    ],
  },
  {
    id: 'button-rung-2-loading',
    name: 'Button — loading shows spinner and blocks click (rung 2)',
    description: 'Loading button replaces icon with spinner, sets aria-busy, and rejects clicks.',
    components: ['button'],
    tags: ['button', 'rung-2', 'loading'],
    render: () => <LoadingComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-button__spinner', label: 'Spinner is visible' },
      { kind: 'assertVisible', selector: '[data-testid="btn"][aria-busy="true"]', label: 'aria-busy is set' },
      { kind: 'click', selector: '[data-testid="btn"]', label: 'Attempt click while loading' },
      { kind: 'assertText', selector: '[data-testid="count"]', text: '0', label: 'Counter still 0' },
    ],
  },
  {
    id: 'button-rung-2-intents',
    name: 'Button — intent variants render distinct data-intent (rung 2)',
    description: 'Primary, danger, and neutral intents each surface as data-intent on the button.',
    components: ['button'],
    tags: ['button', 'rung-2', 'intent'],
    render: () => <IntentComposition />,
    steps: [
      { kind: 'assertVisible', selector: '[data-testid="btn-primary"][data-intent="primary"]', label: 'Primary intent attr' },
      { kind: 'assertVisible', selector: '[data-testid="btn-danger"][data-intent="danger"]', label: 'Danger intent attr' },
      { kind: 'assertVisible', selector: '[data-testid="btn-neutral"][data-intent="neutral"]', label: 'Neutral intent attr' },
    ],
  },
]
