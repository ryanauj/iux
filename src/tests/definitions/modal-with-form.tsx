import { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { TextInput } from '../../components/TextInput/TextInput'
import { Toaster, useToastQueue } from '../../components/Toast/Toast'
import type { IntegrationTest } from '../types'

function ModalWithFormComposition() {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState('')
  const { toasts, push, dismiss } = useToastQueue()

  const submit = () => {
    push({ title: `Saved: ${note}`, intent: 'success', durationMs: 0 })
    setOpen(false)
    setNote('')
  }

  return (
    <div style={{ position: 'relative', minHeight: 320 }}>
      <Button data-testid="open-btn" intent="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Modal
        variant="centered"
        open={open}
        onOpenChange={setOpen}
        title="New note"
        description="Enter a quick note. Submit to confirm."
        inlineRender
        primaryAction={{ label: 'Save', onClick: submit }}
        secondaryAction={{ label: 'Cancel' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <TextInput
            label="Note"
            value={note}
            onChange={v => setNote(v)}
            data-testid="modal-input"
          />
        </div>
      </Modal>
      <Toaster toasts={toasts} onDismiss={dismiss} inlineRender position="top-right" />
    </div>
  )
}

export const modalWithForm: IntegrationTest = {
  id: 'modal-with-form',
  name: 'Modal-with-form submission closes dialog and toasts',
  description:
    'Opening a modal that contains a text input, submitting via the modal action, then verifying the modal closes and a toast appears with the value.',
  components: ['button', 'modal', 'text-input', 'toast'],
  tags: ['overlay', 'forms', 'feedback'],
  render: () => <ModalWithFormComposition />,
  steps: [
    { kind: 'click', selector: '[data-testid="open-btn"]', label: 'Open dialog' },
    { kind: 'waitFor', selector: '.iux-modal', label: 'Wait for modal' },
    { kind: 'assertVisible', selector: '.iux-modal', label: 'Modal is visible' },
    {
      kind: 'type',
      selector: '[data-testid="modal-input"] .iux-text-input__input',
      text: 'Buy milk',
      label: 'Type note in modal',
    },
    {
      kind: 'click',
      selector: '.iux-modal__btn--primary',
      label: 'Click Save',
    },
    { kind: 'waitFor', selector: '.iux-toast__title', label: 'Wait for toast' },
    { kind: 'assertGone', selector: '.iux-modal', label: 'Modal has closed' },
    {
      kind: 'assertText',
      selector: '.iux-toast__title',
      text: 'Saved: Buy milk',
      label: 'Toast confirms save',
    },
  ],
}
