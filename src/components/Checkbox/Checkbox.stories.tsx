import { useState, type ReactNode } from 'react'
import { Checkbox, type CheckboxOption, type CheckboxTreeNode, type CheckboxVariant } from './Checkbox'

const VARIANTS: CheckboxVariant[] = ['single', 'detailed', 'tree', 'group']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell">
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function StatefulSingle({ initial = false, label }: { initial?: boolean; label: string }) {
  const [v, setV] = useState(initial)
  return <Checkbox variant="single" label={label} checked={v} onCheckedChange={setV} />
}

const TREE: CheckboxTreeNode[] = [
  {
    id: 'fruit',
    label: 'Fruit',
    children: [
      { id: 'apple', label: 'Apple' },
      { id: 'pear', label: 'Pear' },
      { id: 'fig', label: 'Fig' },
    ],
  },
  {
    id: 'veg',
    label: 'Vegetables',
    children: [
      { id: 'carrot', label: 'Carrot' },
      { id: 'kale', label: 'Kale' },
    ],
  },
]

function StatefulTree() {
  const [v, setV] = useState<string[]>(['apple'])
  return <Checkbox variant="tree" label="Pantry" tree={TREE} treeValue={v} onTreeChange={setV} />
}

const OPTIONS: CheckboxOption[] = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry' },
  { value: 'd', label: 'Durian', description: 'Pungent' },
  { value: 'e', label: 'Elderberry' },
]

function StatefulGroup() {
  const [vals, setVals] = useState<string[]>(['a', 'c'])
  return <Checkbox variant="group" label="Fruit basket" options={OPTIONS} values={vals} onValuesChange={setVals} />
}

export function CheckboxStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'single' && (
              <>
                <Cell label="off"><StatefulSingle label="Subscribe" /></Cell>
                <Cell label="on"><StatefulSingle initial label="Subscribe" /></Cell>
                <Cell label="indeterminate"><Checkbox variant="single" label="Subset" stateLock="indeterminate" /></Cell>
                <Cell label="focus"><Checkbox variant="single" label="Subscribe" stateLock="focus" /></Cell>
                <Cell label="hover"><Checkbox variant="single" label="Subscribe" stateLock="hover" /></Cell>
                <Cell label="disabled off"><Checkbox variant="single" label="Subscribe" disabled /></Cell>
                <Cell label="disabled on"><Checkbox variant="single" label="Subscribe" checked disabled /></Cell>
              </>
            )}
            {variant === 'detailed' && (
              <>
                <Cell label="default">
                  <Checkbox
                    variant="detailed"
                    label="Email me product updates"
                    description="Roughly one message per month. Unsubscribe anytime."
                  />
                </Cell>
                <Cell label="required">
                  <Checkbox
                    variant="detailed"
                    label="Accept terms"
                    description="You must agree to the terms of service."
                    required
                  />
                </Cell>
                <Cell label="error">
                  <Checkbox
                    variant="detailed"
                    label="Accept terms"
                    description="You must agree before continuing."
                    error="Please confirm to proceed."
                    required
                  />
                </Cell>
                <Cell label="disabled">
                  <Checkbox
                    variant="detailed"
                    label="Marketing emails"
                    description="Disabled: workspace policy"
                    disabled
                  />
                </Cell>
              </>
            )}
            {variant === 'tree' && (
              <>
                <Cell label="interactive"><StatefulTree /></Cell>
                <Cell label="all-on">
                  <Checkbox
                    variant="tree"
                    label="Pantry"
                    tree={TREE}
                    treeValue={['apple', 'pear', 'fig', 'carrot', 'kale']}
                  />
                </Cell>
                <Cell label="indeterminate-parent">
                  <Checkbox
                    variant="tree"
                    label="Pantry"
                    tree={TREE}
                    treeValue={['apple', 'carrot']}
                  />
                </Cell>
              </>
            )}
            {variant === 'group' && (
              <>
                <Cell label="interactive"><StatefulGroup /></Cell>
                <Cell label="some-checked">
                  <Checkbox
                    variant="group"
                    label="Fruit basket"
                    options={OPTIONS}
                    values={['a', 'b']}
                  />
                </Cell>
                <Cell label="error">
                  <Checkbox
                    variant="group"
                    label="Fruit basket"
                    options={OPTIONS}
                    values={[]}
                    error="Pick at least one"
                  />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
