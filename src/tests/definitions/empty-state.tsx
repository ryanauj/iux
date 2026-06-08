// ABOUTME: Integration tests for the EmptyState component covering four ladder rungs: minimal (centered title/description), illustrated (icon + primary/secondary CTA fires callback), checklist (progress count and per-step action buttons), and generative (editable seed inputs submit values via onGenerate).

// EmptyState ladder rungs: minimal, illustrated (icon + CTA), checklist
// (onboarding steps), generative (editable seed fields → onGenerate).
import { useState } from 'react'
import { EmptyState, type ChecklistStep } from '../../components/EmptyState/EmptyState'
import type { IntegrationTest } from '../types'

// ABOUTME: Sandbox composition for the minimal empty-state test: an EmptyState with title and description only.
function MinimalComposition() {
  return (
    <EmptyState
      title="Nothing here yet"
      description="Create your first record to get started."
    />
  )
}

// ABOUTME: Sandbox composition for the illustrated empty-state test: an EmptyState with illustration SVG, primary and secondary action buttons, and a click counter.
function IllustratedComposition() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <EmptyState
        variant="illustrated"
        title="No notes"
        description="Start jotting things down."
        illustration={<svg width="32" height="32" data-testid="art" />}
        primaryAction={{ label: 'New note', onClick: () => setCount(c => c + 1) }}
        secondaryAction={{ label: 'Learn more', onClick: () => {} }}
      />
      <span data-testid="state">{count}</span>
    </div>
  )
}

// ABOUTME: Sandbox composition for the checklist empty-state test: an EmptyState with three steps (one pre-done), action buttons, and an actions-fired echo span.
function ChecklistComposition() {
  const [actions, setActions] = useState<string[]>([])
  const steps: ChecklistStep[] = [
    { id: 'profile', label: 'Set up your profile', done: true },
    { id: 'invite', label: 'Invite a teammate', actionLabel: 'Invite', onAction: () => setActions(a => [...a, 'invite']) },
    { id: 'integrate', label: 'Connect a data source', actionLabel: 'Connect', onAction: () => setActions(a => [...a, 'connect']) },
  ]
  return (
    <div>
      <EmptyState
        variant="checklist"
        title="Get started"
        steps={steps}
      />
      <span data-testid="state">{actions.join(',')}</span>
    </div>
  )
}

// ABOUTME: Sandbox composition for the generative empty-state test: an EmptyState with two seed fields and onGenerate capturing submitted values to a span.
function GenerativeComposition() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null)
  return (
    <div>
      <EmptyState
        variant="generative"
        title="Your first task"
        fields={[
          { key: 'title', label: 'Title', defaultValue: 'Untitled task' },
          { key: 'owner', label: 'Owner', defaultValue: 'me' },
        ]}
        onGenerate={(v) => setSubmitted(v)}
        generateLabel="Create"
      />
      <span data-testid="state">{submitted ? `${submitted.title}|${submitted.owner}` : ''}</span>
    </div>
  )
}

// ABOUTME: Array of four IntegrationTest definitions for EmptyState: minimal layout, illustrated CTA, checklist step actions, and generative seed field submission.
export const emptyStateTests: IntegrationTest[] = [
  {
    id: 'empty-rung-1-minimal',
    name: 'EmptyState — minimal renders title and description (rung 1)',
    description: 'Minimal variant lays out a centred title and description.',
    components: ['empty'],
    tags: ['empty', 'rung-1'],
    render: () => <MinimalComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-empty--minimal', label: 'Minimal variant class' },
      { kind: 'assertText', selector: '.iux-empty__title', text: 'Nothing here yet', label: 'Title renders' },
      { kind: 'assertText', selector: '.iux-empty__description', text: 'Create your first record', label: 'Description renders' },
    ],
  },
  {
    id: 'empty-rung-2-illustrated',
    name: 'EmptyState — illustrated CTA fires (rung 2)',
    description: 'Illustrated variant renders an illustration block plus primary + secondary actions.',
    components: ['empty'],
    tags: ['empty', 'rung-2'],
    render: () => <IllustratedComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-empty--illustrated', label: 'Illustrated variant class' },
      { kind: 'assertVisible', selector: '.iux-empty__illustration [data-testid="art"]', label: 'Illustration renders' },
      { kind: 'assertCount', selector: '.iux-empty__actions .iux-empty__btn', count: 2, label: 'Two action buttons' },
      { kind: 'click', selector: '.iux-empty__btn--primary', label: 'Click primary' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '1', label: 'Primary action fired' },
    ],
  },
  {
    id: 'empty-rung-3-checklist',
    name: 'EmptyState — checklist tracks done count and step actions (rung 3)',
    description: 'Checklist variant shows step progress and triggers per-step onAction callbacks.',
    components: ['empty'],
    tags: ['empty', 'rung-3'],
    render: () => <ChecklistComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-empty--checklist', label: 'Checklist variant class' },
      { kind: 'assertText', selector: '.iux-empty__progress', text: '1 of 3 complete', label: 'Progress count' },
      { kind: 'assertVisible', selector: '.iux-empty__step.is-done', label: 'Done step has is-done class' },
      { kind: 'assertCount', selector: '.iux-empty__step', count: 3, label: 'Three steps' },
      { kind: 'click', selector: '.iux-empty__steps li:nth-child(2) .iux-empty__btn', label: 'Click step 2 action' },
      { kind: 'click', selector: '.iux-empty__steps li:nth-child(3) .iux-empty__btn', label: 'Click step 3 action' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'invite,connect', label: 'Both actions ran' },
    ],
  },
  {
    id: 'empty-rung-4-generative',
    name: 'EmptyState — generative seed fields submit values (rung 4)',
    description: 'Generative variant exposes editable seed inputs and submits their values through onGenerate.',
    components: ['empty'],
    tags: ['empty', 'rung-4'],
    render: () => <GenerativeComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-empty--generative', label: 'Generative variant class' },
      { kind: 'assertCount', selector: '.iux-empty__field-input', count: 2, label: 'Two seed inputs' },
      { kind: 'type', selector: '.iux-empty__field:nth-child(1) .iux-empty__field-input', text: 'Ship it', label: 'Edit title' },
      { kind: 'click', selector: '.iux-empty__btn--primary', label: 'Click Create' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'Ship it|me', label: 'Submitted values' },
    ],
  },
]
