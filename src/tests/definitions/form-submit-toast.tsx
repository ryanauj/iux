// ABOUTME: Composition integration test for TextInput + Button + Toast: types a name into a text field, clicks Submit, waits for a success toast, and asserts the toast title contains the entered value — exercises three components together.

import { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { TextInput } from '../../components/TextInput/TextInput'
import { Toaster, useToastQueue } from '../../components/Toast/Toast'
import type { IntegrationTest } from '../types'

// ABOUTME: Sandbox composition for the form-submit-toast test: a TextInput, a Submit button, and an inline Toaster that shows a success toast containing the typed name.
function FormSubmitToastComposition() {
  const [name, setName] = useState('')
  const { toasts, push, dismiss } = useToastQueue()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', position: 'relative' }}>
      <TextInput
        label="Name"
        value={name}
        onChange={v => setName(v)}
        data-testid="name-input"
      />
      <Button
        intent="primary"
        data-testid="submit-btn"
        onClick={() => push({ title: `Submitted: ${name}`, intent: 'success', durationMs: 0 })}
      >
        Submit
      </Button>
      <Toaster toasts={toasts} onDismiss={dismiss} inlineRender position="top-right" />
    </div>
  )
}

// ABOUTME: Single IntegrationTest for the form-submit → confirmation toast flow: type into TextInput, click Button, assert Toast title contains the typed value.
export const formSubmitToast: IntegrationTest = {
  id: 'form-submit-toast',
  name: 'Form submit shows confirmation toast',
  description:
    'Typing into a text input and clicking Submit pushes a success toast that includes the entered value.',
  components: ['text-input', 'button', 'toast'],
  tags: ['forms', 'feedback'],
  render: () => <FormSubmitToastComposition />,
  steps: [
    { kind: 'type', selector: '[data-testid="name-input"] .iux-text-input__input', text: 'Ada', label: 'Type name' },
    { kind: 'click', selector: '[data-testid="submit-btn"]', label: 'Click submit' },
    { kind: 'waitFor', selector: '.iux-toast__title', label: 'Wait for toast' },
    {
      kind: 'assertText',
      selector: '.iux-toast__title',
      text: 'Submitted: Ada',
      label: 'Toast shows entered name',
    },
  ],
}
