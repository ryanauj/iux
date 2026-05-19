import { useState, type ReactNode } from 'react'
import { Sidebar, type SidebarGroup, type SidebarItem, type SidebarVariant } from './Sidebar'

export const VARIANTS: SidebarVariant[] = ['links', 'groups', 'rail', 'search']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '20rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      height: '20rem',
      borderWidth: 'var(--border-width-thin)',
      borderStyle: 'solid',
      borderColor: 'var(--color-border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
    }}>
      {children}
      <div style={{ flex: 1, padding: 'var(--space-4)', background: 'var(--color-surface-base)' }}>
        <p style={{ margin: 0, color: 'var(--color-content-secondary)' }}>
          App content area.
        </p>
      </div>
    </div>
  )
}

const PLAIN: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: <I name="home" /> },
  { id: 'inbox', label: 'Inbox', icon: <I name="inbox" />, badge: 4 },
  { id: 'people', label: 'People', icon: <I name="people" /> },
  { id: 'settings', label: 'Settings', icon: <I name="cog" /> },
]

const GROUPED: SidebarGroup[] = [
  {
    id: 'work',
    label: 'Workspace',
    items: [
      { id: 'home', label: 'Home', icon: <I name="home" /> },
      { id: 'inbox', label: 'Inbox', icon: <I name="inbox" />, badge: 4 },
      { id: 'drafts', label: 'Drafts', icon: <I name="doc" />, badge: 2 },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    collapsible: true,
    items: [
      { id: 'people', label: 'People', icon: <I name="people" /> },
      { id: 'access', label: 'Access control', icon: <I name="key" /> },
    ],
  },
  {
    id: 'system',
    label: 'System',
    collapsible: true,
    defaultCollapsed: true,
    items: [
      { id: 'audit', label: 'Audit log', icon: <I name="clock" /> },
      { id: 'billing', label: 'Billing', icon: <I name="card" /> },
    ],
  },
]

const RAIL_GROUPS: SidebarGroup[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      { id: 'home', label: 'Home', icon: <I name="home" />, pinned: true },
      { id: 'inbox', label: 'Inbox', icon: <I name="inbox" />, badge: 4, pinned: true },
      { id: 'people', label: 'People', icon: <I name="people" /> },
      { id: 'doc', label: 'Documents', icon: <I name="doc" /> },
      { id: 'cog', label: 'Settings', icon: <I name="cog" /> },
    ],
  },
]

function RailStateful() {
  const [active, setActive] = useState('home')
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Frame>
      <Sidebar
        variant="rail"
        groups={RAIL_GROUPS}
        activeId={active}
        onActiveChange={setActive}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        defaultWidth={220}
      />
    </Frame>
  )
}

function SearchStateful() {
  const [active, setActive] = useState('home')
  return (
    <Frame>
      <Sidebar
        variant="search"
        items={[
          { id: 'home', label: 'Home', icon: <I name="home" />, keywords: ['dashboard'] },
          { id: 'inbox', label: 'Inbox', icon: <I name="inbox" /> },
          { id: 'people', label: 'People', icon: <I name="people" />, keywords: ['users', 'members'] },
          { id: 'access', label: 'Access control', icon: <I name="key" />, keywords: ['permissions', 'roles'] },
          { id: 'audit', label: 'Audit log', icon: <I name="clock" /> },
          { id: 'billing', label: 'Billing', icon: <I name="card" /> },
          { id: 'cog', label: 'Settings', icon: <I name="cog" /> },
        ]}
        activeId={active}
        onActiveChange={setActive}
      />
    </Frame>
  )
}

function I({ name }: { name: 'home' | 'inbox' | 'people' | 'cog' | 'doc' | 'key' | 'clock' | 'card' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const w = 16, h = 16
  switch (name) {
    case 'home': return <svg viewBox="0 0 16 16" width={w} height={h}><path d="M2 7l6-4 6 4v6a1 1 0 0 1-1 1h-3v-4H6v4H3a1 1 0 0 1-1-1z" {...common} /></svg>
    case 'inbox': return <svg viewBox="0 0 16 16" width={w} height={h}><path d="M2 3h12v10H2z M2 9h4l1 1h2l1-1h4" {...common} /></svg>
    case 'people': return <svg viewBox="0 0 16 16" width={w} height={h}><circle cx="6" cy="6" r="2.5" {...common} /><path d="M2 13c.5-2.5 2-3.5 4-3.5s3.5 1 4 3.5" {...common} /><circle cx="11" cy="7" r="1.8" {...common} /><path d="M9.5 13c.5-1.6 1.5-2.4 3-2.4S15 11.4 15 13" {...common} /></svg>
    case 'cog': return <svg viewBox="0 0 16 16" width={w} height={h}><circle cx="8" cy="8" r="2.5" {...common} /><path d="M8 2v2M8 12v2M2 8h2M12 8h2M4 4l1.5 1.5M10.5 10.5L12 12M4 12l1.5-1.5M10.5 5.5L12 4" {...common} /></svg>
    case 'doc': return <svg viewBox="0 0 16 16" width={w} height={h}><path d="M3 2h7l3 3v9H3z M10 2v3h3" {...common} /></svg>
    case 'key': return <svg viewBox="0 0 16 16" width={w} height={h}><circle cx="5" cy="11" r="2.5" {...common} /><path d="M7 9l6-6 2 2-2 2-2-2 2-2" {...common} /></svg>
    case 'clock': return <svg viewBox="0 0 16 16" width={w} height={h}><circle cx="8" cy="8" r="6" {...common} /><path d="M8 5v3l2 2" {...common} /></svg>
    case 'card': return <svg viewBox="0 0 16 16" width={w} height={h}><rect x="2" y="4" width="12" height="8" rx="1" {...common} /><path d="M2 7h12" {...common} /></svg>
  }
}

export function SidebarStories({ variant: variantFilter }: { variant?: string } = {}) {
  const [linksActive, setLinksActive] = useState('home')
  const [groupsActive, setGroupsActive] = useState('inbox')
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'links' && (
              <Cell label="static + active marker">
                <Frame>
                  <Sidebar variant="links" items={PLAIN} activeId={linksActive} onActiveChange={setLinksActive} />
                </Frame>
              </Cell>
            )}
            {variant === 'groups' && (
              <Cell label="collapsible groups + badges">
                <Frame>
                  <Sidebar variant="groups" groups={GROUPED} activeId={groupsActive} onActiveChange={setGroupsActive} />
                </Frame>
              </Cell>
            )}
            {variant === 'rail' && (
              <Cell label="collapse to rail + resize">
                <RailStateful />
              </Cell>
            )}
            {variant === 'search' && (
              <Cell label="filter live">
                <SearchStateful />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
