import { useState } from 'react'
import { Checkbox } from '../../components/Checkbox/Checkbox'
import type { IntegrationTest } from '../types'

function SingleComposition() {
  const [on, setOn] = useState(false)
  return (
    <div>
      <Checkbox data-testid="cb" label="Subscribe" checked={on} onCheckedChange={setOn} />
      <span data-testid="state">{on ? 'on' : 'off'}</span>
    </div>
  )
}

function DetailedComposition() {
  return (
    <Checkbox
      variant="detailed"
      label="Auto-renew"
      description="We will charge your card every month."
      error="Card declined"
    />
  )
}

function TreeComposition() {
  const [values, setValues] = useState<string[]>([])
  return (
    <div>
      <Checkbox
        variant="tree"
        label="Permissions"
        tree={[
          {
            id: 'read',
            label: 'Read',
            children: [
              { id: 'read.posts', label: 'Posts' },
              { id: 'read.profile', label: 'Profile' },
            ],
          },
          { id: 'write', label: 'Write' },
        ]}
        treeValue={values}
        onTreeChange={setValues}
      />
      <span data-testid="state">{values.sort().join(',')}</span>
    </div>
  )
}

function GroupComposition() {
  const [values, setValues] = useState<string[]>([])
  return (
    <div>
      <Checkbox
        variant="group"
        label="Toppings"
        options={[
          { value: 'cheese', label: 'Cheese' },
          { value: 'olives', label: 'Olives' },
          { value: 'mushrooms', label: 'Mushrooms' },
        ]}
        values={values}
        onValuesChange={setValues}
      />
      <span data-testid="state">{values.sort().join(',')}</span>
    </div>
  )
}

export const checkboxTests: IntegrationTest[] = [
  {
    id: 'checkbox-rung-1-single',
    name: 'Checkbox — single toggles on click (rung 1)',
    description: 'Clicking the checkbox label flips the bound state.',
    components: ['checkbox'],
    tags: ['checkbox', 'rung-1'],
    render: () => <SingleComposition />,
    steps: [
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'off', label: 'Starts off' },
      { kind: 'click', selector: '.iux-checkbox__input', label: 'Click checkbox' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'on', label: 'Now on' },
    ],
  },
  {
    id: 'checkbox-rung-2-detailed',
    name: 'Checkbox — detailed shows description and error (rung 2)',
    description: 'Detailed variant renders a description block and an error message.',
    components: ['checkbox'],
    tags: ['checkbox', 'rung-2', 'error'],
    render: () => <DetailedComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-checkbox__description', label: 'Description renders' },
      { kind: 'assertText', selector: '.iux-checkbox__error', text: 'Card declined', label: 'Error renders' },
    ],
  },
  {
    id: 'checkbox-rung-3-tree',
    name: 'Checkbox — tree parent toggles all descendants (rung 3)',
    description: 'Clicking a parent in the tree cascades its checked state to all leaves.',
    components: ['checkbox'],
    tags: ['checkbox', 'rung-3', 'tree'],
    render: () => <TreeComposition />,
    steps: [
      { kind: 'click', selector: '.iux-checkbox__tree > .iux-checkbox__tree-row:first-child > label > .iux-checkbox__input', label: 'Click Read parent' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'read.posts,read.profile', label: 'Both leaves checked' },
    ],
  },
  {
    id: 'checkbox-rung-3-group',
    name: 'Checkbox — group multi-select via click (rung 3)',
    description: 'Group variant allows toggling multiple options independently.',
    components: ['checkbox'],
    tags: ['checkbox', 'rung-3', 'group'],
    render: () => <GroupComposition />,
    steps: [
      { kind: 'click', selector: '.iux-checkbox__group .iux-checkbox__row:nth-child(1) .iux-checkbox__input', label: 'Toggle cheese' },
      { kind: 'click', selector: '.iux-checkbox__group .iux-checkbox__row:nth-child(3) .iux-checkbox__input', label: 'Toggle mushrooms' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'cheese,mushrooms', label: 'Both selected' },
    ],
  },
]
