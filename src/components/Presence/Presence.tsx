import { useEffect, type CSSProperties } from 'react'
import './Presence.css'

export type PresenceVariant = 'avatars' | 'cursors' | 'selections' | 'chat'

export interface PresenceUser {
  id: string
  name: string
  /** Any CSS color string. Avoid passing a raw hex literal in source. */
  color: string
  /** cursors / chat: 0..1 surface-relative position. */
  cursor?: { x: number; y: number }
  /** selections: 0..1 surface-relative bounding box. */
  selection?: { x: number; y: number; w: number; h: number }
  /** chat: transient floating message at cursor. */
  chat?: { text: string; expiresAt: number }
}

export interface PresenceProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: PresenceVariant
  users: PresenceUser[]
  /** chat: 'self' user — the local one. */
  selfId?: string
  /** chat: invoked when the local user posts a message (binding to / key etc.). */
  onSelfChat?: (text: string) => void
  /** chat: position to drop the chat at when posting. */
  selfCursor?: { x: number; y: number }
  /** avatars: how many avatars to show before +N. */
  avatarCap?: number
  className?: string
}

function initials(name: string): string {
  return name.split(/\s+/).map(s => s[0]).slice(0, 2).join('').toUpperCase()
}

export function Presence({
  variant = 'avatars',
  users,
  selfId,
  onSelfChat,
  selfCursor,
  avatarCap = 4,
  className,
}: PresenceProps) {
  // chat: '/' opens a one-character entry box at the local cursor.
  useEffect(() => {
    if (variant !== 'chat') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        const text = window.prompt('Say something (visible to others, 4 seconds):')
        if (text) onSelfChat?.(text)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [variant, onSelfChat])

  // ---------- Avatars ----------
  if (variant === 'avatars') {
    const visible = users.slice(0, avatarCap)
    const overflow = Math.max(0, users.length - avatarCap)
    return (
      <div className={['iux-presence', 'iux-presence--avatars', className].filter(Boolean).join(' ')} aria-label={`${users.length} online`}>
        <ul className="iux-presence__avatars" role="list">
          {visible.map(u => (
            <li
              key={u.id}
              className="iux-presence__avatar"
              style={{ ['--iux-presence-color' as string]: u.color } as CSSProperties}
              title={u.name}
            >
              {initials(u.name)}
            </li>
          ))}
          {overflow > 0 && (
            <li className="iux-presence__avatar iux-presence__avatar--more">+{overflow}</li>
          )}
        </ul>
      </div>
    )
  }

  // ---------- Cursors / Selections / Chat ----------
  // Render absolutely-positioned layer over the surface.
  return (
    <div
      className={['iux-presence', `iux-presence--${variant}`, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {variant === 'selections' && users.map(u => u.selection && (
        <div
          key={`s-${u.id}`}
          className="iux-presence__selection"
          style={{
            top: `${u.selection.y * 100}%`,
            left: `${u.selection.x * 100}%`,
            width: `${u.selection.w * 100}%`,
            height: `${u.selection.h * 100}%`,
            ['--iux-presence-color' as string]: u.color,
          } as CSSProperties}
        />
      ))}
      {users.map(u => u.cursor && (
        <div
          key={`c-${u.id}`}
          className="iux-presence__cursor"
          style={{
            top: `${u.cursor.y * 100}%`,
            left: `${u.cursor.x * 100}%`,
            ['--iux-presence-color' as string]: u.color,
          } as CSSProperties}
        >
          <CursorIcon />
          <span className="iux-presence__name">{u.name}</span>
          {variant === 'chat' && u.chat && Date.now() < u.chat.expiresAt && (
            <span className="iux-presence__chat">{u.chat.text}</span>
          )}
        </div>
      ))}
      {variant === 'chat' && selfId && selfCursor && (
        <div
          className="iux-presence__cursor iux-presence__cursor--self"
          style={{
            top: `${selfCursor.y * 100}%`,
            left: `${selfCursor.x * 100}%`,
          }}
        >
          <CursorIcon />
          <span className="iux-presence__name">you</span>
        </div>
      )}
    </div>
  )
}

function CursorIcon() {
  return (
    <svg className="iux-presence__cursor-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M2 2l4 12 2-5 5-2z" fill="currentColor" stroke="white" strokeWidth="0.75" />
    </svg>
  )
}

