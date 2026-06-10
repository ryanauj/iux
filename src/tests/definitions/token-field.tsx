// TokenField ladder rungs: split (comma/Enter → chip), typeahead (filtered
// suggestions + keyboard nav), grouped (group headings + maxCount +
// validate), structured (chips open a popover editor on click).
// Suggestion items use onMouseDown for selection, so the typeahead test
// drives selection via ArrowDown + Enter rather than .click().
import { useState } from 'react'
import { TokenField, type Token, type TokenOption } from '../../components/TokenField/TokenField'
import type { IntegrationTest } from '../types'

function SplitComposition() {
  const [tokens, setTokens] = useState<Token[]>([])
  return (
    <div>
      <TokenField variant="split" value={tokens} onChange={setTokens} placeholder="Add tags" />
      <span data-testid="state">{tokens.map(t => t.label).join('|')}</span>
    </div>
  )
}

function TypeaheadComposition() {
  const opts: TokenOption[] = [
    { value: 'react', label: 'React' },
    { value: 'redux', label: 'Redux' },
    { value: 'remix', label: 'Remix' },
  ]
  const [tokens, setTokens] = useState<Token[]>([])
  return (
    <div>
      <TokenField variant="typeahead" options={opts} value={tokens} onChange={setTokens} placeholder="pick…" />
      <span data-testid="state">{tokens.map(t => t.value).join('|')}</span>
    </div>
  )
}

function GroupedComposition() {
  const opts: TokenOption[] = [
    { value: 'fe-a', label: 'React', group: 'Frontend' },
    { value: 'fe-b', label: 'Vue', group: 'Frontend' },
    { value: 'be-a', label: 'Node', group: 'Backend' },
  ]
  const [tokens, setTokens] = useState<Token[]>([
    { value: 'fe-a', label: 'React' },
  ])
  return (
    <div>
      <TokenField
        variant="grouped"
        options={opts}
        value={tokens}
        onChange={setTokens}
        maxCount={3}
        validate={label => label.length >= 3 ? true : 'Too short'}
        label="Tags"
      />
      <span data-testid="state">{tokens.map(t => `${t.label}${t.invalid ? '!' : ''}`).join('|')}</span>
    </div>
  )
}

function StructuredComposition() {
  const [tokens, setTokens] = useState<Token[]>([
    { value: 'k1', label: 'Production', meta: { region: 'us-east-1' } },
  ])
  return (
    <div>
      <TokenField variant="structured" value={tokens} onChange={setTokens} />
      <span data-testid="state">{tokens[0]?.label}</span>
    </div>
  )
}

export const tokenFieldTests: IntegrationTest[] = [
  {
    id: 'tokenfield-rung-1-split',
    name: 'TokenField — split converts text to chips on Enter/comma (rung 1)',
    description: 'Split variant converts typed input into chips on Enter or comma, and removes the last chip on Backspace.',
    components: ['tokenfield'],
    tags: ['tokenfield', 'rung-1'],
    render: () => <SplitComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tokens--split', label: 'Split variant class' },
      { kind: 'type', selector: '.iux-tokens__input', text: 'alpha', label: 'Type tag' },
      { kind: 'press', key: 'Enter', selector: '.iux-tokens__input', label: 'Commit on Enter' },
      { kind: 'assertCount', selector: '.iux-tokens__chip', count: 1, label: 'One chip' },
      { kind: 'type', selector: '.iux-tokens__input', text: 'beta', label: 'Type second tag' },
      { kind: 'press', key: ',', selector: '.iux-tokens__input', label: 'Commit on comma' },
      { kind: 'assertCount', selector: '.iux-tokens__chip', count: 2, label: 'Two chips' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'alpha|beta', label: 'Tokens in order' },
      { kind: 'click', selector: '.iux-tokens__chip:nth-child(1) .iux-tokens__chip-remove', label: 'Remove first chip' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'beta', label: 'Only beta remains' },
    ],
  },
  {
    id: 'tokenfield-rung-2-typeahead',
    name: 'TokenField — typeahead filters suggestions and commits via keyboard (rung 2)',
    description: 'Typeahead variant opens a suggestion popover on focus, filters by query, and commits the active option on Enter.',
    components: ['tokenfield'],
    tags: ['tokenfield', 'rung-2'],
    render: () => <TypeaheadComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tokens--typeahead', label: 'Typeahead variant class' },
      { kind: 'type', selector: '.iux-tokens__input', text: 're', label: 'Filter suggestions' },
      { kind: 'assertVisible', selector: '.iux-tokens__popover', label: 'Popover visible' },
      { kind: 'assertCount', selector: '.iux-tokens__option', count: 3, label: 'Three matches' },
      { kind: 'press', key: 'ArrowDown', selector: '.iux-tokens__input', label: 'Activate first option' },
      { kind: 'press', key: 'Enter', selector: '.iux-tokens__input', label: 'Commit active option' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'react', label: 'React token added' },
      { kind: 'assertCount', selector: '.iux-tokens__chip', count: 1, label: 'One chip' },
    ],
  },
  {
    id: 'tokenfield-rung-3-grouped',
    name: 'TokenField — grouped enforces maxCount and flags invalid tokens (rung 3)',
    description: 'Grouped variant headlines option groups, surfaces a token count, marks short/invalid chips, and caps adds at maxCount.',
    components: ['tokenfield'],
    tags: ['tokenfield', 'rung-3'],
    render: () => <GroupedComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tokens--grouped', label: 'Grouped variant class' },
      { kind: 'assertText', selector: '.iux-tokens__count', text: '1/3', label: 'Initial count' },
      { kind: 'type', selector: '.iux-tokens__input', text: 'no', label: 'Invalid short text' },
      { kind: 'press', key: 'Enter', selector: '.iux-tokens__input', label: 'Commit invalid' },
      { kind: 'assertVisible', selector: '.iux-tokens__chip--invalid', label: 'Invalid chip flagged' },
      { kind: 'type', selector: '.iux-tokens__input', text: 'okay', label: 'Valid text' },
      { kind: 'press', key: 'Enter', selector: '.iux-tokens__input', label: 'Commit valid' },
      { kind: 'assertText', selector: '.iux-tokens__count', text: '3/3', label: 'At max count' },
      { kind: 'assertCount', selector: '.iux-tokens__group-heading', count: 2, label: 'Two group headings in popover' },
    ],
  },
  {
    id: 'tokenfield-rung-4-structured',
    name: 'TokenField — structured opens popover editor on chip click (rung 4)',
    description: 'Structured variant marks chips as interactive and opens an inline editor dialog when a chip is clicked.',
    components: ['tokenfield'],
    tags: ['tokenfield', 'rung-4'],
    render: () => <StructuredComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-tokens--structured', label: 'Structured variant class' },
      { kind: 'assertVisible', selector: '.iux-tokens__chip--interactive', label: 'Chip is interactive' },
      { kind: 'click', selector: '.iux-tokens__chip--interactive', label: 'Click chip to edit' },
      { kind: 'assertVisible', selector: '.iux-tokens__editor', label: 'Editor dialog opens' },
      { kind: 'assertCount', selector: '.iux-tokens__editor-field', count: 2, label: 'Label + meta fields render' },
    ],
  },
]
