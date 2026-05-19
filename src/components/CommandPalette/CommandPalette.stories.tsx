import { useState, type ReactNode } from 'react'
import { CommandPalette, type Command, type CommandPaletteVariant } from './CommandPalette'

export const VARIANTS: CommandPaletteVariant[] = ['flat', 'grouped', 'wizard', 'agentic']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function Trigger({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        font: 'inherit',
        padding: 'var(--space-2) var(--space-3)',
        borderWidth: 'var(--border-width-thin)',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-default)',
        background: 'var(--color-surface-raised)',
        color: 'var(--color-content-primary)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
      }}
    >{label}</button>
  )
}

const FLAT: Command[] = [
  { id: 'new', label: 'New file', shortcut: '⌘N', run: () => {} },
  { id: 'open', label: 'Open recent…', shortcut: '⌘O', run: () => {} },
  { id: 'save', label: 'Save', shortcut: '⌘S', run: () => {} },
  { id: 'settings', label: 'Open settings', run: () => {} },
  { id: 'theme', label: 'Switch theme', run: () => {} },
]

const GROUPED: Command[] = [
  { id: 'g-home', label: 'Go to Home', group: 'Navigate', run: () => {} },
  { id: 'g-inbox', label: 'Go to Inbox', group: 'Navigate', run: () => {} },
  { id: 'c-task', label: 'Create task', group: 'Create', shortcut: '⌘⇧T', run: () => {} },
  { id: 'c-doc', label: 'Create document', group: 'Create', run: () => {} },
  { id: 's-settings', label: 'Open settings', group: 'Settings', run: () => {} },
  { id: 's-billing', label: 'Manage billing', group: 'Settings', run: () => {} },
]

const WIZARD: Command[] = [
  {
    id: 'invite',
    label: 'Invite a teammate',
    steps: [
      { id: 'email', prompt: 'Email address?', type: 'input' },
      { id: 'role', prompt: 'What role?', type: 'select', options: [
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
        { value: 'admin', label: 'Admin' },
      ]},
      { id: 'confirm', prompt: 'Send the invite now?', type: 'confirm' },
    ],
    run: () => {},
  },
  { id: 'simple', label: 'Run a no-arg command', run: () => {} },
]

const PARSE_NL = (s: string): Command[] => {
  const seq: Command[] = []
  const lower = s.toLowerCase()
  if (lower.includes('share')) seq.push({ id: 'share', label: 'Share workspace with team', run: () => {} })
  if (lower.includes('deploy') || lower.includes('ship')) seq.push({ id: 'deploy', label: 'Deploy to production', run: () => {} })
  if (lower.includes('notify') || lower.includes('tell')) seq.push({ id: 'notify', label: 'Notify Slack', run: () => {} })
  return seq
}

function DemoForVariant({ variant }: { variant: CommandPaletteVariant }) {
  const [open, setOpen] = useState(false)
  const commands =
    variant === 'grouped' ? GROUPED :
    variant === 'wizard'  ? WIZARD :
    variant === 'agentic' ? FLAT :
    FLAT
  const recents = variant === 'grouped' ? ['c-task', 'g-home'] : undefined

  return (
    <>
      <Trigger label="Open (or ⌘K)" onClick={() => setOpen(true)} />
      <CommandPalette
        variant={variant}
        open={open}
        onOpenChange={setOpen}
        commands={commands}
        recents={recents}
        parseNl={variant === 'agentic' ? PARSE_NL : undefined}
      />
    </>
  )
}

export function CommandPaletteStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            <Cell label={variant}>
              <DemoForVariant variant={variant} />
            </Cell>
          </div>
        </section>
      ))}
    </div>
  )
}
