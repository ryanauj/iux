import { useEffect, useState, type ReactNode } from 'react'
import { Link } from '../Link'
import { contractsRoutes, type ContractsRoute } from './routes'

/**
 * Shell = the chrome around every Cap School page: brand, the chapter nav,
 * and where the page lands. Two layouts are offered through the floating
 * controls — a left `sidebar` rail (default, good for a multi-chapter
 * explainer) and a compact `topbar`. Both share the same nav model so the
 * page content is untouched between them.
 */
export const LAYOUT_IDS = ['sidebar', 'topbar'] as const
export type LayoutId = (typeof LAYOUT_IDS)[number]
export const DEFAULT_LAYOUT: LayoutId = 'sidebar'

export const LAYOUT_OPTIONS = [
  { value: 'sidebar', label: 'Sidebar — chapter rail' },
  { value: 'topbar', label: 'Top bar — compact' },
]

export function resolveLayoutId(raw: string | null | undefined): LayoutId {
  if (raw && (LAYOUT_IDS as readonly string[]).includes(raw)) return raw as LayoutId
  return DEFAULT_LAYOUT
}

export interface NavItem {
  to: string
  label: string
  /** Chapter number shown as an ordinal in the rail. */
  step: number
  isActive: (route: ContractsRoute) => boolean
}

export const NAV: NavItem[] = [
  { to: contractsRoutes.overview(), label: 'Overview', step: 1, isActive: r => r.kind === 'overview' },
  { to: contractsRoutes.ladder(), label: 'The cap ladder', step: 2, isActive: r => r.kind === 'ladder' },
  { to: contractsRoutes.anatomy(), label: 'Contract anatomy', step: 3, isActive: r => r.kind === 'anatomy' },
  { to: contractsRoutes.maxDeals(), label: 'Max & rookie deals', step: 4, isActive: r => r.kind === 'maxDeals' },
  { to: contractsRoutes.exceptions(), label: 'Exceptions & tools', step: 5, isActive: r => r.kind === 'exceptions' },
  { to: contractsRoutes.tax(), label: 'The luxury tax', step: 6, isActive: r => r.kind === 'tax' },
  { to: contractsRoutes.aprons(), label: 'The aprons', step: 7, isActive: r => r.kind === 'aprons' },
  { to: contractsRoutes.team(), label: 'A team cap sheet', step: 8, isActive: r => r.kind === 'team' },
]

interface ShellProps {
  layoutId: LayoutId
  route: ContractsRoute
  children: ReactNode
}

function Brand() {
  return (
    <Link to={contractsRoutes.overview()} className="cap-app__brand">
      <span className="cap-app__brand-mark" aria-hidden="true">CAP</span>
      <span className="cap-app__brand-text">
        <span className="cap-app__brand-name">Cap School</span>
        <span className="cap-app__brand-tag">How NBA contracts work</span>
      </span>
    </Link>
  )
}

const Exit = () => (
  <Link to="/apps" className="cap-app__exit">← All apps</Link>
)

function RailLinks({ route, variant }: { route: ContractsRoute; variant: 'rail' | 'bar' }) {
  const cls = variant === 'rail' ? 'cap-rail__link' : 'cap-bar__link'
  return (
    <>
      {NAV.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={active ? `${cls} is-active` : cls}
            aria-current={active ? 'page' : undefined}
          >
            {variant === 'rail' && (
              <span className="cap-rail__step" aria-hidden="true">{item.step}</span>
            )}
            <span>{item.label}</span>
          </Link>
        )
      })}
    </>
  )
}

export function Shell({ layoutId, route, children }: ShellProps) {
  if (layoutId === 'topbar') return <TopbarShell route={route}>{children}</TopbarShell>
  return <SidebarShell route={route}>{children}</SidebarShell>
}

function SidebarShell({ route, children }: { route: ContractsRoute; children: ReactNode }) {
  return (
    <div className="cap-app cap-app--sidebar">
      <aside className="cap-rail">
        <div className="cap-rail__top">
          <Brand />
          <nav className="cap-rail__nav" aria-label="Chapters">
            <RailLinks route={route} variant="rail" />
          </nav>
        </div>
        <div className="cap-rail__bottom">
          <Exit />
        </div>
      </aside>
      <main className="cap-app__main">
        <div className="cap-app__page">{children}</div>
      </main>
    </div>
  )
}

function TopbarShell({ route, children }: { route: ContractsRoute; children: ReactNode }) {
  // Compact layout collapses the chapter list behind a toggle on narrow
  // viewports; on wide ones the bar wraps naturally.
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [route])
  return (
    <div className="cap-app cap-app--topbar">
      <header className="cap-bar">
        <Brand />
        <button
          type="button"
          className="cap-bar__toggle"
          aria-expanded={open}
          aria-label={open ? 'Hide chapters' : 'Show chapters'}
          onClick={() => setOpen(o => !o)}
        >
          ☰
        </button>
        <nav className={`cap-bar__nav${open ? ' is-open' : ''}`} aria-label="Chapters">
          <RailLinks route={route} variant="bar" />
        </nav>
        <span className="cap-bar__spacer" />
        <Exit />
      </header>
      <main className="cap-app__main">
        <div className="cap-app__page">{children}</div>
      </main>
    </div>
  )
}
