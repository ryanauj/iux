// ABOUTME: Checkbox — an exported value (components).

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import './Checkbox.css'

// ABOUTME: CheckboxVariant — a type alias.
export type CheckboxVariant = 'single' | 'detailed' | 'tree' | 'group'

// ABOUTME: CheckboxState — a type alias.
export type CheckboxState = boolean | 'indeterminate'

// ABOUTME: CheckboxOption — an interface.
export interface CheckboxOption {
  value: string
  label: ReactNode
  description?: string
  disabled?: boolean
}

// ABOUTME: CheckboxTreeNode — an interface.
export interface CheckboxTreeNode {
  id: string
  label: ReactNode
  disabled?: boolean
  children?: CheckboxTreeNode[]
}

// ABOUTME: Props for Checkbox.
export interface CheckboxProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: CheckboxVariant

  /** single + detailed: checked state. Supports 'indeterminate'. */
  checked?: CheckboxState
  defaultChecked?: boolean
  onCheckedChange?: (next: boolean) => void

  /** tree: the tree to render. */
  tree?: CheckboxTreeNode[]
  /** tree: ids of currently-checked leaves (or branches with all leaves checked). */
  treeValue?: string[]
  onTreeChange?: (nextLeafIds: string[]) => void

  /** group: option list. */
  options?: CheckboxOption[]
  values?: string[]
  defaultValues?: string[]
  onValuesChange?: (next: string[]) => void

  label?: ReactNode
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
  id?: string
  name?: string
  className?: string
  /** Story-only: lock the visual to a pseudo-state. */
  stateLock?: 'hover' | 'focus' | 'checked' | 'indeterminate'
}

// ---------- Tree helpers ----------

function collectLeafIds(nodes: CheckboxTreeNode[], acc: string[] = []): string[] {
  for (const n of nodes) {
    if (n.children && n.children.length > 0) collectLeafIds(n.children, acc)
    else acc.push(n.id)
  }
  return acc
}

function nodeState(node: CheckboxTreeNode, leafSet: Set<string>): CheckboxState {
  if (!node.children || node.children.length === 0) {
    return leafSet.has(node.id)
  }
  const leaves = collectLeafIds([node])
  let on = 0
  for (const id of leaves) if (leafSet.has(id)) on++
  if (on === 0) return false
  if (on === leaves.length) return true
  return 'indeterminate'
}

function toggleNode(node: CheckboxTreeNode, leafSet: Set<string>): Set<string> {
  const leaves = collectLeafIds([node])
  const state = nodeState(node, leafSet)
  const next = new Set(leafSet)
  if (state === true) {
    for (const id of leaves) next.delete(id)
  } else {
    for (const id of leaves) next.add(id)
  }
  return next
}

// ABOUTME: Checkbox — an exported value.
// ---------- Component ----------

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(function Checkbox(
  {
    variant = 'single',
    checked,
    defaultChecked,
    onCheckedChange,
    tree,
    treeValue,
    onTreeChange,
    options,
    values,
    defaultValues,
    onValuesChange,
    label,
    description,
    error,
    required,
    disabled,
    id,
    name,
    className,
    stateLock,
  },
  ref,
) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const rootRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement)

  // ---------- single / detailed ----------
  const isCheckedControlled = checked !== undefined
  const [innerChecked, setInnerChecked] = useState<boolean>(defaultChecked ?? false)
  const currentChecked: CheckboxState = isCheckedControlled
    ? checked!
    : (stateLock === 'indeterminate' ? 'indeterminate' : innerChecked)

  const handleSingleToggle = useCallback(() => {
    if (disabled) return
    const next = currentChecked === true ? false : true
    if (!isCheckedControlled) setInnerChecked(next)
    onCheckedChange?.(next)
  }, [disabled, currentChecked, isCheckedControlled, onCheckedChange])

  // ---------- group (multi-select with Shift+click range) ----------
  const isValuesControlled = values !== undefined
  const [innerValues, setInnerValues] = useState<string[]>(defaultValues ?? [])
  const currentValues = isValuesControlled ? values! : innerValues
  const lastClickIndexRef = useRef<number>(-1)

  const commitValues = useCallback(
    (next: string[]) => {
      if (!isValuesControlled) setInnerValues(next)
      onValuesChange?.(next)
    },
    [isValuesControlled, onValuesChange],
  )

  const handleGroupClick = useCallback(
    (event: MouseEvent<HTMLLabelElement>, index: number, value: string) => {
      if (disabled) return
      const opt = options?.[index]
      if (!opt || opt.disabled) return
      event.preventDefault()
      const cur = new Set(currentValues)
      if (event.shiftKey && lastClickIndexRef.current >= 0 && options) {
        const start = Math.min(lastClickIndexRef.current, index)
        const end = Math.max(lastClickIndexRef.current, index)
        const anchorChecked = currentValues.includes(options[lastClickIndexRef.current].value)
        for (let i = start; i <= end; i++) {
          const o = options[i]
          if (o.disabled) continue
          if (anchorChecked) cur.add(o.value)
          else cur.delete(o.value)
        }
      } else {
        if (cur.has(value)) cur.delete(value)
        else cur.add(value)
      }
      lastClickIndexRef.current = index
      commitValues(Array.from(cur))
    },
    [disabled, options, currentValues, commitValues],
  )

  // ---------- tree ----------
  const isTreeControlled = treeValue !== undefined
  const [innerTreeLeaves, setInnerTreeLeaves] = useState<string[]>([])
  const treeLeaves = isTreeControlled ? treeValue! : innerTreeLeaves
  const leafSet = useMemo(() => new Set(treeLeaves), [treeLeaves])

  const commitTree = useCallback(
    (nextSet: Set<string>) => {
      const arr = Array.from(nextSet)
      if (!isTreeControlled) setInnerTreeLeaves(arr)
      onTreeChange?.(arr)
    },
    [isTreeControlled, onTreeChange],
  )

  // ---------- render ----------

  const baseClasses = [
    'iux-checkbox',
    `iux-checkbox--${variant}`,
    error && 'iux-checkbox--has-error',
    disabled && 'iux-checkbox--disabled',
    stateLock && `is-${stateLock}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (variant === 'tree' && tree) {
    return (
      <div ref={rootRef} className={baseClasses} data-variant="tree">
        {label && <span className="iux-checkbox__group-label">{label}</span>}
        <ul role="tree" className="iux-checkbox__tree">
          {tree.map(node => (
            <TreeRow
              key={node.id}
              node={node}
              level={1}
              leafSet={leafSet}
              disabled={disabled}
              onToggle={node => commitTree(toggleNode(node, leafSet))}
            />
          ))}
        </ul>
        {error && <span className="iux-checkbox__error" role="alert">{error}</span>}
      </div>
    )
  }

  if (variant === 'group' && options) {
    return (
      <div ref={rootRef} className={baseClasses} data-variant="group">
        {label && <span id={`${inputId}-grouplabel`} className="iux-checkbox__group-label">{label}</span>}
        <div role="group" aria-labelledby={label ? `${inputId}-grouplabel` : undefined} className="iux-checkbox__group">
          {options.map((opt, i) => {
            const isChecked = currentValues.includes(opt.value)
            return (
              <CheckboxRow
                key={opt.value}
                id={`${inputId}-opt-${i}`}
                label={opt.label}
                description={opt.description}
                state={isChecked}
                disabled={disabled || opt.disabled}
                onChange={() => {/* handled by label click */}}
                onLabelClick={ev => handleGroupClick(ev, i, opt.value)}
                stateLock={stateLock}
              />
            )
          })}
          <div className="iux-checkbox__group-hint">Shift+click for range</div>
        </div>
        {error && <span className="iux-checkbox__error" role="alert">{error}</span>}
      </div>
    )
  }

  // single / detailed — both render one row; detailed adds description + error.
  return (
    <div ref={rootRef} className={baseClasses} data-variant={variant}>
      <CheckboxRow
        id={inputId}
        name={name}
        label={label}
        description={variant === 'detailed' ? description : undefined}
        state={currentChecked}
        disabled={disabled}
        required={required}
        invalid={Boolean(error)}
        onChange={handleSingleToggle}
        stateLock={stateLock}
      />
      {variant === 'detailed' && error && (
        <span id={`${inputId}-error`} className="iux-checkbox__error" role="alert">{error}</span>
      )}
    </div>
  )
})

// ---------- internal row ----------

interface CheckboxRowProps {
  id: string
  name?: string
  label?: ReactNode
  description?: string
  state: CheckboxState
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  onChange: () => void
  onLabelClick?: (ev: MouseEvent<HTMLLabelElement>) => void
  stateLock?: CheckboxProps['stateLock']
}

function CheckboxRow({
  id, name, label, description, state, disabled, required, invalid, onChange, onLabelClick, stateLock,
}: CheckboxRowProps) {
  // The hidden native input keeps form semantics + native screen-reader story
  // intact. The visible square is the styled affordance.
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (el) el.indeterminate = state === 'indeterminate'
  }, [state])

  const checked = state === true

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onChange()
    }
  }

  return (
    <label
      className={[
        'iux-checkbox__row',
        stateLock === 'hover' && 'is-hover',
        stateLock === 'focus' && 'is-focus',
      ].filter(Boolean).join(' ')}
      htmlFor={id}
      onClick={onLabelClick}
    >
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="checkbox"
        className="iux-checkbox__input"
        checked={checked}
        disabled={disabled}
        required={required}
        aria-checked={state === 'indeterminate' ? 'mixed' : checked}
        aria-invalid={invalid || undefined}
        onChange={onChange}
        onKeyDown={handleKey}
      />
      <span className="iux-checkbox__box" aria-hidden="true" data-state={state === 'indeterminate' ? 'mixed' : checked ? 'on' : 'off'}>
        {state === 'indeterminate' ? <Dash /> : <CheckMark />}
      </span>
      {(label || description) && (
        <span className="iux-checkbox__text">
          {label && (
            <span className="iux-checkbox__label">
              {label}
              {required && <span className="iux-checkbox__required" aria-hidden="true"> *</span>}
            </span>
          )}
          {description && <span className="iux-checkbox__description">{description}</span>}
        </span>
      )}
    </label>
  )
}

interface TreeRowProps {
  node: CheckboxTreeNode
  level: number
  leafSet: Set<string>
  disabled?: boolean
  onToggle: (node: CheckboxTreeNode) => void
}

function TreeRow({ node, level, leafSet, disabled, onToggle }: TreeRowProps) {
  const state = nodeState(node, leafSet)
  const hasChildren = node.children && node.children.length > 0
  return (
    <li role="treeitem" aria-level={level} aria-checked={state === 'indeterminate' ? 'mixed' : state} className="iux-checkbox__tree-row">
      <CheckboxRow
        id={`tree-${node.id}`}
        label={node.label}
        state={state}
        disabled={disabled || node.disabled}
        onChange={() => onToggle(node)}
      />
      {hasChildren && (
        <ul role="group" className="iux-checkbox__tree-children">
          {node.children!.map(child => (
            <TreeRow
              key={child.id}
              node={child}
              level={level + 1}
              leafSet={leafSet}
              disabled={disabled || node.disabled}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function CheckMark() {
  return (
    <svg className="iux-checkbox__check" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M3 8.5l3.2 3L13 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  )
}

function Dash() {
  return (
    <svg className="iux-checkbox__check" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M4 8h8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}
