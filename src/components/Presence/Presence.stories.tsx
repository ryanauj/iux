import { useEffect, useState, type ReactNode } from 'react'
import { Presence, type PresenceUser, type PresenceVariant } from './Presence'

const VARIANTS: PresenceVariant[] = ['avatars', 'cursors', 'selections', 'chat']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const BASE: Omit<PresenceUser, 'cursor' | 'selection' | 'chat'>[] = [
  { id: 'avery', name: 'Avery N', color: 'oklch(70% 0.16 30)' },
  { id: 'blair', name: 'Blair O', color: 'oklch(70% 0.16 160)' },
  { id: 'cam', name: 'Cameron P', color: 'oklch(70% 0.16 250)' },
  { id: 'drew', name: 'Drew Q', color: 'oklch(70% 0.16 300)' },
  { id: 'em', name: 'Emerson R', color: 'oklch(70% 0.16 60)' },
]

function useDriftingCursors(): PresenceUser[] {
  const [users, setUsers] = useState<PresenceUser[]>(
    BASE.map((u, i) => ({ ...u, cursor: { x: 0.1 + i * 0.15, y: 0.2 + (i % 2) * 0.4 } })),
  )
  useEffect(() => {
    const id = window.setInterval(() => {
      setUsers(prev => prev.map(u => ({
        ...u,
        cursor: u.cursor && {
          x: Math.max(0.02, Math.min(0.98, u.cursor.x + (Math.random() - 0.5) * 0.06)),
          y: Math.max(0.04, Math.min(0.96, u.cursor.y + (Math.random() - 0.5) * 0.06)),
        },
      })))
    }, 300)
    return () => window.clearInterval(id)
  }, [])
  return users
}

function CursorsDemo() {
  const users = useDriftingCursors()
  return (
    <Surface>
      <Presence variant="cursors" users={users} />
    </Surface>
  )
}

function SelectionsDemo() {
  const cursors = useDriftingCursors()
  const users = cursors.slice(0, 3).map((u, i) => ({
    ...u,
    selection: { x: 0.1 + i * 0.25, y: 0.15 + i * 0.1, w: 0.18, h: 0.18 },
  }))
  return (
    <Surface>
      <Presence variant="selections" users={users} />
    </Surface>
  )
}

function ChatDemo() {
  const cursors = useDriftingCursors()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setTick(t => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [])
  const users = cursors.slice(0, 3).map((u, i) => ({
    ...u,
    chat: i === (tick % 3) ? { text: 'hey!', expiresAt: Date.now() + 4000 } : undefined,
  }))
  return (
    <Surface>
      <Presence variant="chat" users={users} selfId="me" />
    </Surface>
  )
}

function Surface({ children }: { children: ReactNode }) {
  return (
    <div style={{
      position: 'relative',
      height: '14rem',
      background: 'var(--color-surface-sunken)',
      borderWidth: 'var(--border-width-thin)',
      borderStyle: 'solid',
      borderColor: 'var(--color-border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  )
}

export function PresenceStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'avatars' && (
              <Cell label="avatar pile (cap 4 + overflow)">
                <Presence variant="avatars" users={BASE.map(u => ({ ...u }))} avatarCap={4} />
              </Cell>
            )}
            {variant === 'cursors' && <Cell label="drifting cursors"><CursorsDemo /></Cell>}
            {variant === 'selections' && <Cell label="cursors + selection rects"><SelectionsDemo /></Cell>}
            {variant === 'chat' && <Cell label="press / to drop a message; bubbles rotate every 1s"><ChatDemo /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
