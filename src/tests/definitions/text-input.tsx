import { useState } from 'react'
import { TextInput } from '../../components/TextInput/TextInput'
import type { IntegrationTest } from '../types'

function BareComposition() {
  const [value, setValue] = useState('')
  return (
    <div>
      <TextInput data-testid="input" value={value} onChange={v => setValue(v)} placeholder="Type" />
      <span data-testid="echo">{value}</span>
    </div>
  )
}

function LabeledHintComposition() {
  const [value, setValue] = useState('')
  return (
    <div>
      <TextInput
        data-testid="input"
        label="Email"
        hint="we won't share it"
        required
        value={value}
        onChange={v => setValue(v)}
      />
    </div>
  )
}

function ValidationComposition() {
  const [value, setValue] = useState('')
  const validate = (v: string) => {
    if (!v) return null
    if (v.length < 3) return { status: 'danger' as const, message: 'too short' }
    return { status: 'success' as const, message: 'looks good' }
  }
  return (
    <TextInput
      variant="validate"
      data-testid="input"
      label="Name"
      value={value}
      onChange={v => setValue(v)}
      validate={validate}
    />
  )
}

function CommandSuggestionComposition() {
  const [value, setValue] = useState('')
  return (
    <div>
      <TextInput
        variant="command"
        data-testid="input"
        value={value}
        onChange={v => setValue(v)}
        suggestion="search github"
      />
      <span data-testid="echo">{value}</span>
    </div>
  )
}

export const textInputTests: IntegrationTest[] = [
  {
    id: 'text-input-rung-1-bare',
    name: 'TextInput — bare input echoes value (rung 1)',
    description: 'Typing into a bare bordered input updates the bound state.',
    components: ['textinput'],
    tags: ['textinput', 'rung-1'],
    render: () => <BareComposition />,
    steps: [
      { kind: 'type', selector: '[data-testid="input"] .iux-text-input__input', text: 'hello', label: 'Type' },
      { kind: 'assertText', selector: '[data-testid="echo"]', text: 'hello', label: 'Value echoed' },
    ],
  },
  {
    id: 'text-input-rung-2-labeled',
    name: 'TextInput — labeled with hint and required marker (rung 2)',
    description: 'Hint text renders below the input; required marker appears on the label.',
    components: ['textinput'],
    tags: ['textinput', 'rung-2'],
    render: () => <LabeledHintComposition />,
    steps: [
      { kind: 'assertText', selector: '.iux-text-input__label', text: 'Email', label: 'Label visible' },
      { kind: 'assertVisible', selector: '.iux-text-input__required', label: 'Required marker' },
      { kind: 'assertText', selector: '.iux-text-input__hint', text: "we won't share it", label: 'Hint visible' },
    ],
  },
  {
    id: 'text-input-rung-3-validate',
    name: 'TextInput — live validation surfaces error then success (rung 3)',
    description: 'Validate variant shows a danger message for short values and a success message once long enough.',
    components: ['textinput'],
    tags: ['textinput', 'rung-3', 'validation'],
    render: () => <ValidationComposition />,
    steps: [
      { kind: 'type', selector: '[data-testid="input"] .iux-text-input__input', text: 'ab', label: 'Type short value' },
      { kind: 'waitFor', selector: '.iux-text-input__validation[data-status="danger"]', label: 'Wait for danger validation' },
      { kind: 'assertText', selector: '.iux-text-input__validation', text: 'too short', label: 'Shows danger message' },
      { kind: 'type', selector: '[data-testid="input"] .iux-text-input__input', text: 'abcd', label: 'Type long value' },
      { kind: 'waitFor', selector: '.iux-text-input__validation[data-status="success"]', label: 'Wait for success' },
      { kind: 'assertText', selector: '.iux-text-input__validation', text: 'looks good', label: 'Shows success message' },
    ],
  },
  {
    id: 'text-input-rung-4-suggestion',
    name: 'TextInput — command variant renders ghost suggestion (rung 4)',
    description: 'Typing a prefix of the suggestion shows the remaining ghost text.',
    components: ['textinput'],
    tags: ['textinput', 'rung-4', 'autocomplete'],
    render: () => <CommandSuggestionComposition />,
    steps: [
      { kind: 'type', selector: '[data-testid="input"] .iux-text-input__input', text: 'sear', label: 'Type prefix' },
      { kind: 'waitFor', selector: '.iux-text-input__ghost-rest', label: 'Ghost rest renders' },
      { kind: 'assertText', selector: '.iux-text-input__ghost-rest', text: 'ch github', label: 'Ghost matches remainder' },
    ],
  },
]
