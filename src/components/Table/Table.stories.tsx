import { useState, type ReactNode } from 'react'
import { Table, type TableColumn, type TableVariant } from './Table'

type Person = {
  id: string
  name: string
  role: string
  email: string
  salary: number
}

function makePeople(n: number): Person[] {
  const roles = ['Engineer', 'Designer', 'PM', 'Researcher', 'Operations']
  const first = ['Avery', 'Blair', 'Cameron', 'Drew', 'Emerson', 'Finley', 'Gray', 'Harper', 'Indigo', 'Jules']
  const last = ['Nakai', 'Okafor', 'Park', 'Quinn', 'Rojas', 'Singh', 'Tran', 'Ueno', 'Vega', 'Wu']
  return Array.from({ length: n }, (_, i) => ({
    id: String(i + 1),
    name: `${first[i % first.length]} ${last[(i * 7) % last.length]}`,
    role: roles[i % roles.length],
    email: `user${i + 1}@iux.dev`,
    salary: 60000 + ((i * 1234) % 80000),
  }))
}

const SMALL = makePeople(8)
const LARGE = makePeople(2000)

function CellInput({ initial, onCommit, onCancel }: { initial: string; onCommit: (v: string) => void; onCancel: () => void }) {
  const [v, setV] = useState(initial)
  return (
    <input
      autoFocus
      value={v}
      onChange={e => setV(e.target.value)}
      onBlur={() => onCommit(v)}
      onKeyDown={e => {
        if (e.key === 'Enter') onCommit(v)
        if (e.key === 'Escape') onCancel()
      }}
      style={{
        font: 'inherit',
        width: '100%',
        padding: 'var(--space-1) var(--space-2)',
        background: 'var(--color-surface-sunken)',
        border: 'var(--border-width-thin) solid var(--color-border-focus)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-content-primary)',
      }}
    />
  )
}

const COLS_BASIC: TableColumn<Person>[] = [
  { key: 'name', header: 'Name', accessor: r => r.name },
  { key: 'role', header: 'Role', accessor: r => r.role },
  { key: 'email', header: 'Email', accessor: r => r.email },
  { key: 'salary', header: 'Salary', align: 'end', accessor: r => `$${r.salary.toLocaleString()}` },
]

const COLS_SORT: TableColumn<Person>[] = [
  { key: 'name', header: 'Name', accessor: r => r.name, sortBy: (a, b) => a.name.localeCompare(b.name) },
  { key: 'role', header: 'Role', accessor: r => r.role, sortBy: (a, b) => a.role.localeCompare(b.role) },
  { key: 'email', header: 'Email', accessor: r => r.email },
  { key: 'salary', header: 'Salary', align: 'end', accessor: r => `$${r.salary.toLocaleString()}`, sortBy: (a, b) => a.salary - b.salary },
]

const COLS_RESIZE: TableColumn<Person>[] = [
  { key: 'name', header: 'Name', accessor: r => r.name, sortBy: (a, b) => a.name.localeCompare(b.name), width: 180 },
  { key: 'role', header: 'Role', accessor: r => r.role, sortBy: (a, b) => a.role.localeCompare(b.role), width: 120 },
  { key: 'email', header: 'Email', accessor: r => r.email, width: 220 },
  { key: 'salary', header: 'Salary', align: 'end', accessor: r => `$${r.salary.toLocaleString()}`, sortBy: (a, b) => a.salary - b.salary, width: 120 },
  { key: 'tenure', header: 'Tenure', accessor: () => '2y', width: 90, hiddenByDefault: true },
]

const COLS_EDIT: TableColumn<Person>[] = [
  {
    key: 'name', header: 'Name', accessor: r => r.name, sortBy: (a, b) => a.name.localeCompare(b.name),
    valueOf: r => r.name,
    editor: (row, commit, cancel) => (
      <CellInput initial={row.name} onCommit={v => commit(v)} onCancel={cancel} />
    ),
    width: 200,
  },
  { key: 'role', header: 'Role', accessor: r => r.role, width: 140 },
  { key: 'email', header: 'Email', accessor: r => r.email, width: 240 },
  { key: 'salary', header: 'Salary', align: 'end', accessor: r => `$${r.salary.toLocaleString()}`, width: 140 },
]

export const VARIANTS: TableVariant[] = ['static', 'sortable', 'resizable', 'editable']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function SortableStateful() {
  const [sel, setSel] = useState<string[]>([])
  return (
    <Table
      variant="sortable"
      data={SMALL}
      columns={COLS_SORT}
      getRowId={r => r.id}
      defaultSort={{ key: 'salary', dir: 'desc' }}
      selectable
      selectedIds={sel}
      onSelectedIdsChange={setSel}
    />
  )
}

function EditableStateful() {
  const [rows, setRows] = useState<Person[]>(LARGE)
  return (
    <Table
      variant="editable"
      data={rows}
      columns={COLS_EDIT}
      getRowId={r => r.id}
      height={320}
      rowHeight={36}
      onCellSave={async ({ rowId, columnKey, value }) => {
        await new Promise(r => setTimeout(r, 400))
        setRows(prev => prev.map(p => p.id === rowId ? { ...p, [columnKey]: value as string } : p))
        return value
      }}
      caption={`Virtualized + editable — ${rows.length} rows, ~10 in DOM`}
    />
  )
}

export function TableStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'static' && (
              <Cell label="zebra rows">
                <Table variant="static" data={SMALL} columns={COLS_BASIC} getRowId={r => r.id} />
              </Cell>
            )}
            {variant === 'sortable' && (
              <Cell label="sort + select"><SortableStateful /></Cell>
            )}
            {variant === 'resizable' && (
              <Cell label="resize + sticky header + visibility menu">
                <Table variant="resizable" data={SMALL} columns={COLS_RESIZE} getRowId={r => r.id} />
              </Cell>
            )}
            {variant === 'editable' && (
              <Cell label="virtualized + double-click name to edit"><EditableStateful /></Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
