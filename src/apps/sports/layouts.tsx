import { useEffect, useState, type ReactNode } from 'react'
import { Link } from '../Link'
import { type SportsRoute } from './routes'

export const LAYOUT_IDS = ['topbar', 'sidebar', 'stadium', 'dock', 'drawer'] as const
export type LayoutId = (typeof LAYOUT_IDS)[number]

export const DEFAULT_LAYOUT: LayoutId = 'topbar'

export const LAYOUT_OPTIONS = [
  { value: 'topbar', label: 'Classic — top bar' },
  { value: 'sidebar', label: 'Sidebar — left rail' },
  { value: 'stadium', label: 'Stadium — hero banner' },
  { value: 'dock', label: 'Dock — floating bottom' },
  { value: 'drawer', label: 'Drawer — hamburger' },
]

const LAYOUT_STORAGE_KEY = 'hoops-hub.layout'

export function readStoredLayout(): LayoutId {
  if (typeof window === 'undefined') return DEFAULT_LAYOUT
  try {
    const v = window.localStorage.getItem(LAYOUT_STORAGE_KEY)
    if (v && (LAYOUT_IDS as readonly string[]).includes(v)) return v as LayoutId
  } catch {
    /* ignore — Safari private mode, etc. */
  }
  return DEFAULT_LAYOUT
}

export function writeStoredLayout(id: LayoutId): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LAYOUT_STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
}

export interface NavItem {
  to: string
  label: string
  isActive: (route: SportsRoute) => boolean
}

export interface ShellProps {
  layoutId: LayoutId
  brand: ReactNode
  nav: NavItem[]
  route: SportsRoute
  pickers: ReactNode
  exit: ReactNode
  children: ReactNode
}

function NavLinks({
  nav,
  route,
  className,
}: {
  nav: NavItem[]
  route: SportsRoute
  className: string
}) {
  return (
    <>
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={active ? `${className} is-active` : className}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </>
  )
}

export function Shell(props: ShellProps) {
  switch (props.layoutId) {
    case 'topbar':
      return <TopbarShell {...props} />
    case 'sidebar':
      return <SidebarShell {...props} />
    case 'stadium':
      return <StadiumShell {...props} />
    case 'dock':
      return <DockShell {...props} />
    case 'drawer':
      return <DrawerShell {...props} />
  }
}

function TopbarShell(props: ShellProps) {
  return (
    <div className="sports-app sports-app--topbar">
      <header className="sports-app__header">
        {props.brand}
        <nav className="sports-app__nav" aria-label="Primary">
          <NavLinks nav={props.nav} route={props.route} className="sports-app__nav-link" />
        </nav>
        <span className="sports-app__spacer" />
        {props.pickers}
        {props.exit}
      </header>
      <main className="sports-app__main">{props.children}</main>
    </div>
  )
}

function SidebarShell(props: ShellProps) {
  return (
    <div className="sports-app sports-app--sidebar">
      <aside className="sports-app__sidebar">
        <div className="sports-app__sidebar-top">
          {props.brand}
          <nav className="sports-app__sidenav" aria-label="Primary">
            <NavLinks
              nav={props.nav}
              route={props.route}
              className="sports-app__sidenav-link"
            />
          </nav>
        </div>
        <div className="sports-app__sidebar-bottom">
          {props.pickers}
          {props.exit}
        </div>
      </aside>
      <main className="sports-app__main">{props.children}</main>
    </div>
  )
}

function StadiumShell(props: ShellProps) {
  return (
    <div className="sports-app sports-app--stadium">
      <header className="sports-app__stadium-banner">
        <div className="sports-app__stadium-top">
          {props.brand}
          <span className="sports-app__spacer" />
          {props.pickers}
          {props.exit}
        </div>
        <nav className="sports-app__stadium-nav" aria-label="Primary">
          <NavLinks
            nav={props.nav}
            route={props.route}
            className="sports-app__stadium-link"
          />
        </nav>
      </header>
      <main className="sports-app__main">{props.children}</main>
    </div>
  )
}

function DockShell(props: ShellProps) {
  return (
    <div className="sports-app sports-app--dock">
      <header className="sports-app__header sports-app__header--minimal">
        {props.brand}
        <span className="sports-app__spacer" />
        {props.pickers}
        {props.exit}
      </header>
      <main className="sports-app__main">{props.children}</main>
      <nav className="sports-app__dock" aria-label="Primary">
        <NavLinks nav={props.nav} route={props.route} className="sports-app__dock-link" />
      </nav>
    </div>
  )
}

function DrawerShell(props: ShellProps) {
  const [open, setOpen] = useState(false)

  // Close the drawer whenever the user navigates to a new route.
  useEffect(() => {
    setOpen(false)
  }, [props.route])

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <div className={`sports-app sports-app--drawer${open ? ' is-drawer-open' : ''}`}>
      <header className="sports-app__header sports-app__header--minimal">
        <button
          type="button"
          className="sports-app__menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        {props.brand}
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      {open && (
        <div
          className="sports-app__scrim"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sports-app__drawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        <nav className="sports-app__drawer-nav" aria-label="Primary">
          <NavLinks
            nav={props.nav}
            route={props.route}
            className="sports-app__drawer-link"
          />
        </nav>
        <div className="sports-app__drawer-bottom">{props.pickers}</div>
      </aside>
      <main className="sports-app__main">{props.children}</main>
    </div>
  )
}
