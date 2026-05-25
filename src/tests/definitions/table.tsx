// Table ladder rungs: static (rows + headers), sortable (sortable headers +
// row selection), resizable (sticky header + column visibility menu),
// editable (inline edit). Resize handle drag and inline-edit double-click
// are pointer- and dblclick-driven respectively, which the runner can't
// drive — those interactions are asserted structurally (variant class,
// resize handle presence) rather than exercised end-to-end.
import { useState } from 'react'
import { Table, type TableColumn } from '../../components/Table/Table'
import type { IntegrationTest } from '../types'

interface Row { id: string; name: string; score: number }

const ROWS: Row[] = [
  { id: 'r1', name: 'Alice', score: 30 },
  { id: 'r2', name: 'Bob', score: 10 },
  { id: 'r3', name: 'Cara', score: 20 },
]

const STATIC_COLS: TableColumn<Row>[] = [
  { key: 'name', header: 'Name', accessor: r => r.name },
  { key: 'score', header: 'Score', accessor: r => r.score },
]

const SORTABLE_COLS: TableColumn<Row>[] = [
  { key: 'name', header: 'Name', accessor: r => r.name, sortBy: (a, b) => a.name.localeCompare(b.name) },
  { key: 'score', header: 'Score', accessor: r => r.score, sortBy: (a, b) => a.score - b.score },
]

function StaticComposition() {
  return (
    <Table
      variant="static"
      data={ROWS}
      columns={STATIC_COLS}
      getRowId={r => r.id}
    />
  )
}

function SortableComposition() {
  const [sel, setSel] = useState<string[]>([])
  return (
    <div>
      <Table
        variant="sortable"
        data={ROWS}
        columns={SORTABLE_COLS}
        getRowId={r => r.id}
        selectable
        selectedIds={sel}
        onSelectedIdsChange={setSel}
      />
      <span data-testid="state">{sel.join(',')}</span>
    </div>
  )
}

function ResizableComposition() {
  return (
    <Table
      variant="resizable"
      data={ROWS}
      columns={SORTABLE_COLS}
      getRowId={r => r.id}
    />
  )
}

function EditableComposition() {
  return (
    <Table
      variant="editable"
      data={ROWS}
      columns={SORTABLE_COLS}
      getRowId={r => r.id}
    />
  )
}

export const tableTests: IntegrationTest[] = [
  {
    id: 'table-rung-1-static',
    name: 'Table — static renders headers and rows (rung 1)',
    description: 'Static variant draws the table head, body, and row count with no sort/select affordances.',
    components: ['table'],
    tags: ['table', 'rung-1'],
    render: () => <StaticComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-table--static', label: 'Static variant class' },
      { kind: 'assertCount', selector: '.iux-table__th', count: 2, label: 'Two header cells' },
      { kind: 'assertCount', selector: '.iux-table__tr', count: 3, label: 'Three rows' },
      { kind: 'assertText', selector: '.iux-table__tr:nth-child(1) .iux-table__cell-value', text: 'Alice', label: 'First row Alice' },
    ],
  },
  {
    id: 'table-rung-2-sortable',
    name: 'Table — sortable cycles sort dir and selects rows (rung 2)',
    description: 'Sortable variant flips data order on header click and selects rows via the row checkbox.',
    components: ['table'],
    tags: ['table', 'rung-2'],
    render: () => <SortableComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-table--sortable', label: 'Sortable variant class' },
      { kind: 'assertText', selector: '.iux-table__tr:nth-child(1) .iux-table__td:nth-child(2) .iux-table__cell-value', text: 'Alice', label: 'Initial order: Alice first' },
      { kind: 'click', selector: '.iux-table__th:nth-child(3) .iux-table__th-button', label: 'Sort by Score asc' },
      { kind: 'assertText', selector: '.iux-table__tr:nth-child(1) .iux-table__td:nth-child(2) .iux-table__cell-value', text: 'Bob', label: 'Score asc puts Bob (10) first' },
      { kind: 'assertVisible', selector: '.iux-table__th--sorted-asc', label: 'Sorted-asc indicator' },
      { kind: 'click', selector: '.iux-table__tr:nth-child(1) input[type="checkbox"]', label: 'Select first row' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'r2', label: 'Bob selected (id=r2)' },
      { kind: 'assertVisible', selector: '.iux-table__tr.is-selected', label: 'Row has selected class' },
    ],
  },
  {
    id: 'table-rung-3-resizable',
    name: 'Table — resizable has sticky header, resize handles, visibility menu (rung 3)',
    description: 'Resizable variant adds sticky modifier, per-column resize handles, and a column visibility menu.',
    components: ['table'],
    tags: ['table', 'rung-3'],
    render: () => <ResizableComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-table--resizable.iux-table--sticky', label: 'Resizable + sticky class' },
      { kind: 'assertCount', selector: '.iux-table__resize-handle', count: 2, label: 'One resize handle per column' },
      { kind: 'assertVisible', selector: '.iux-table__visibility-trigger', label: 'Visibility menu trigger' },
      { kind: 'click', selector: '.iux-table__visibility-trigger', label: 'Open visibility menu' },
      { kind: 'assertVisible', selector: '.iux-table__visibility-menu', label: 'Visibility menu opened' },
      { kind: 'click', selector: '.iux-table__visibility-row:nth-child(2) input', label: 'Hide Score column' },
      { kind: 'assertCount', selector: '.iux-table__th', count: 1, label: 'Only Name header remains' },
    ],
  },
  {
    id: 'table-rung-4-editable',
    name: 'Table — editable variant renders with sticky header (rung 4)',
    description: 'Editable variant tags the table for inline edit + sticky header; the dblclick-to-edit gesture is not asserted (runner has no dblclick step).',
    components: ['table'],
    tags: ['table', 'rung-4'],
    render: () => <EditableComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-table--editable.iux-table--sticky', label: 'Editable + sticky class' },
      { kind: 'assertCount', selector: '.iux-table__tr', count: 3, label: 'Three rows render' },
    ],
  },
]
