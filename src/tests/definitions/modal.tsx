// ABOUTME: Integration tests for the Modal component covering three ladder rungs: centered primary action closes the modal and fires the callback (rung 1), sectioned variant has a scroll body and sticky footer (rung 2), and wizard variant walks three steps and fires onComplete after the final Next (rung 3); rung 4 (routed) is skipped as URL-state assertion is impractical in the sandbox.

// Modal ladder rungs: centered, sectioned, wizard, routed. Rung 4 (routed)
// pushes to window.history and is skipped here — the runner has no easy way
// to assert against URL state across compositions.
import { useState } from 'react'
import { Modal, type WizardStep } from '../../components/Modal/Modal'
import type { IntegrationTest } from '../types'

function CenteredComposition() {
  const [open, setOpen] = useState(true)
  const [confirmed, setConfirmed] = useState('')
  return (
    <div style={{ position: 'relative', minHeight: 240 }}>
      <Modal
        variant="centered"
        open={open}
        onOpenChange={setOpen}
        title="Confirm"
        description="Are you sure?"
        inlineRender
        primaryAction={{ label: 'OK', onClick: () => setConfirmed('ok') }}
        secondaryAction={{ label: 'Cancel', onClick: () => setConfirmed('cancel') }}
      >
        <p>Confirmation body.</p>
      </Modal>
      <span data-testid="state">{confirmed}</span>
    </div>
  )
}

function SectionedComposition() {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ position: 'relative', minHeight: 240 }}>
      <Modal
        variant="sectioned"
        open={open}
        onOpenChange={setOpen}
        title="Sectioned"
        inlineRender
        primaryAction={{ label: 'Save' }}
        secondaryAction={{ label: 'Cancel' }}
      >
        <p>Long body content.</p>
      </Modal>
    </div>
  )
}

function WizardComposition() {
  const [open, setOpen] = useState(true)
  const [done, setDone] = useState(false)
  const steps: WizardStep[] = [
    { id: 's1', title: 'Step one', content: <p>One</p> },
    { id: 's2', title: 'Step two', content: <p>Two</p> },
    { id: 's3', title: 'Step three', content: <p>Three</p> },
  ]
  return (
    <div style={{ position: 'relative', minHeight: 320 }}>
      <Modal
        variant="wizard"
        open={open}
        onOpenChange={setOpen}
        title="Wizard"
        inlineRender
        steps={steps}
        onComplete={() => setDone(true)}
      />
      <span data-testid="done">{done ? 'done' : 'pending'}</span>
    </div>
  )
}

// ABOUTME: Array of three IntegrationTest definitions for Modal: centered (dismiss + callback), sectioned (scroll body + sticky footer), and wizard (three-step walk + onComplete).
export const modalTests: IntegrationTest[] = [
  {
    id: 'modal-rung-1-centered',
    name: 'Modal — centered primary action closes and fires (rung 1)',
    description: 'Centered modal renders title/description and dismisses when the primary action runs.',
    components: ['modal'],
    tags: ['modal', 'rung-1', 'overlay'],
    render: () => <CenteredComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-modal--centered', label: 'Centered modal visible' },
      { kind: 'assertText', selector: '.iux-modal__title', text: 'Confirm', label: 'Title renders' },
      { kind: 'assertText', selector: '.iux-modal__description', text: 'Are you sure?', label: 'Description renders' },
      { kind: 'click', selector: '.iux-modal__btn--primary', label: 'Click OK' },
      { kind: 'assertGone', selector: '.iux-modal', label: 'Modal closed' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'ok', label: 'Primary action fired' },
    ],
  },
  {
    id: 'modal-rung-2-sectioned',
    name: 'Modal — sectioned has sticky footer (rung 2)',
    description: 'Sectioned variant gives the body a scroll modifier and the footer a sticky modifier.',
    components: ['modal'],
    tags: ['modal', 'rung-2', 'overlay'],
    render: () => <SectionedComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-modal--sectioned', label: 'Sectioned variant class' },
      { kind: 'assertVisible', selector: '.iux-modal__body--scroll', label: 'Body has scroll modifier' },
      { kind: 'assertVisible', selector: '.iux-modal__footer--sticky', label: 'Footer is sticky' },
    ],
  },
  {
    id: 'modal-rung-3-wizard',
    name: 'Modal — wizard walks steps and completes (rung 3)',
    description: 'Wizard variant shows step progress, advances on Next, and fires onComplete on Done.',
    components: ['modal'],
    tags: ['modal', 'rung-3', 'wizard', 'overlay'],
    render: () => <WizardComposition />,
    steps: [
      { kind: 'assertText', selector: '.iux-modal__step-title', text: 'Step one', label: 'Step one visible' },
      { kind: 'assertCount', selector: '.iux-modal__progress-step', count: 3, label: 'Three progress markers' },
      { kind: 'click', selector: '.iux-modal__btn--primary', label: 'Next → step 2' },
      { kind: 'assertText', selector: '.iux-modal__step-title', text: 'Step two', label: 'Step two visible' },
      { kind: 'click', selector: '.iux-modal__btn--primary', label: 'Next → step 3' },
      { kind: 'assertText', selector: '.iux-modal__step-title', text: 'Step three', label: 'Step three visible' },
      { kind: 'click', selector: '.iux-modal__btn--primary', label: 'Done' },
      { kind: 'assertGone', selector: '.iux-modal', label: 'Wizard closed' },
      { kind: 'assertText', selector: '[data-testid="done"]', text: 'done', label: 'onComplete fired' },
    ],
  },
]
