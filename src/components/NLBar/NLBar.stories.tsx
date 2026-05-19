import type { ReactNode } from 'react'
import { NLBar, type NLBarVariant, type ParsedIntent } from './NLBar'

const VARIANTS: NLBarVariant[] = ['parsed', 'editable', 'execute', 'disambig']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

// Very small NL parser: looks for "task|event titled X due Y assigned to Z".
function parsePlain(text: string): ParsedIntent | null {
  const s = text.trim()
  if (!s) return null
  const isEvent = /\bevent\b/i.test(s)
  const titled = s.match(/titled\s+"?([^"]+?)"?(?=\s+due|\s+by|\s+assigned|$)/i)?.[1]
  const due = s.match(/(?:due|by)\s+([\w]+)/i)?.[1]
  const assignee = s.match(/(?:assigned\s+to|for)\s+@?([\w]+)/i)?.[1]
  const action = isEvent ? 'Create event' : 'Create task'
  return {
    action,
    chips: [
      { key: 'title', label: 'title', value: titled ?? 'Untitled', editable: true },
      { key: 'due', label: 'due', value: due ?? 'today', editable: true },
      { key: 'who', label: 'assignee', value: assignee ?? 'me', editable: true },
    ],
  }
}

function parseDisambig(text: string): ParsedIntent | null {
  if (!text.trim()) return null
  const base = parsePlain(text)
  if (!base) return null
  // If both "task" and "event" could fit, expose alternatives.
  const lower = text.toLowerCase()
  const hasMeet = /meet|sync|standup|call/.test(lower)
  if (hasMeet) {
    return {
      ...base,
      alternatives: [
        {
          label: '"Task"',
          action: 'Create task',
          chips: base.chips,
        },
        {
          label: '"Event"',
          action: 'Create event',
          chips: base.chips.map(c => c.key === 'due' ? { ...c, label: 'when', options: ['today', 'tomorrow', 'fri'] } : c),
        },
      ],
    }
  }
  return base
}

export function NLBarStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'parsed' && (
              <Cell label="preview only">
                <NLBar variant="parsed" parse={parsePlain} label="Add task" placeholder='e.g., "task titled refactor due fri"' />
              </Cell>
            )}
            {variant === 'editable' && (
              <Cell label="click chips to edit">
                <NLBar variant="editable" parse={parsePlain} label="Add task" placeholder="try editing the chips after a parse" />
              </Cell>
            )}
            {variant === 'execute' && (
              <Cell label="commit + clear">
                <NLBar
                  variant="execute"
                  parse={parsePlain}
                  label="Quick add"
                  onExecute={() => {}}
                />
              </Cell>
            )}
            {variant === 'disambig' && (
              <Cell label="task or event? (try with 'sync')">
                <NLBar variant="disambig" parse={parseDisambig} label="Quick add" placeholder='e.g., "sync titled review due fri assigned to @blair"' />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
