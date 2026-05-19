import { useState, type ReactNode } from 'react'
import { Tabs, type TabItem, type TabsVariant } from './Tabs'

export const VARIANTS: TabsVariant[] = ['basic', 'rich', 'overflow', 'editable']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const BASIC: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'changelog', label: 'Changelog', disabled: true },
]

const RICH: TabItem[] = [
  { id: 'inbox', label: 'Inbox', icon: <BoxGlyph />, badge: 12 },
  { id: 'sent', label: 'Sent', icon: <SendGlyph /> },
  { id: 'drafts', label: 'Drafts', icon: <PencilGlyph />, badge: 3 },
  { id: 'archive', label: 'Archive', icon: <ArchiveGlyph /> },
]

const OVERFLOW: TabItem[] = Array.from({ length: 14 }, (_, i) => ({
  id: `tab-${i}`,
  label: `Section ${i + 1}`,
}))

function EditableStateful() {
  const [tabs, setTabs] = useState<TabItem[]>([
    { id: 'a', label: 'Document A' },
    { id: 'b', label: 'Document B' },
    { id: 'c', label: 'README.md' },
  ])
  const [value, setValue] = useState('a')
  return (
    <Tabs
      variant="editable"
      tabs={tabs}
      value={value}
      onValueChange={setValue}
      onClose={id => setTabs(prev => prev.filter(t => t.id !== id))}
      onReorder={setTabs}
      onAdd={() => {
        const id = `t-${Date.now()}`
        setTabs(prev => [...prev, { id, label: 'New tab' }])
        setValue(id)
      }}
      renderPanel={id => <p>Editor for <strong>{id}</strong></p>}
    />
  )
}

function BoxGlyph() {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M2 7h12" /></svg>
}
function SendGlyph() {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 3L2 8l4 1 1 4z" /></svg>
}
function PencilGlyph() {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 3l2 2-7 7H4v-2z" /></svg>
}
function ArchiveGlyph() {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="12" height="9" rx="1" /><path d="M2 7h12" /><path d="M7 10h2" /></svg>
}

export function TabsStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'basic' && (
              <Cell label="strip + arrow keys">
                <Tabs variant="basic" tabs={BASIC} renderPanel={id => <p>Panel: {id}</p>} ariaLabel="Sections" />
              </Cell>
            )}
            {variant === 'rich' && (
              <Cell label="icon + badge">
                <Tabs variant="rich" tabs={RICH} renderPanel={id => <p>Folder: {id}</p>} ariaLabel="Folders" />
              </Cell>
            )}
            {variant === 'overflow' && (
              <Cell label="constrained width, 'more' menu">
                <div style={{ maxWidth: '24rem' }}>
                  <Tabs variant="overflow" tabs={OVERFLOW} renderPanel={id => <p>Section: {id}</p>} ariaLabel="Sections" />
                </div>
              </Cell>
            )}
            {variant === 'editable' && (
              <Cell label="close × / drag to reorder / + new">
                <EditableStateful />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
