// ABOUTME: Shell — a React component (apps).

import { useEffect, useState, type ReactNode } from 'react'
import { Link } from '../Link'
import { type SportsRoute } from './routes'
import { PaletteShell } from './shells/palette'
import { CourtShell } from './shells/court'
import { TabsShell } from './shells/tabs'
import { FeedShell } from './shells/feed'
import { TriptychShell } from './shells/triptych'
import { BentoShell } from './shells/bento'
import { MagazineShell } from './shells/magazine'
import { DeckShell } from './shells/deck'
import { GraphShell } from './shells/graph'
import { ChatShell } from './shells/chat'

// ABOUTME: LAYOUT_IDS — an exported value.
/**
 * Layout = the **shell** that wraps the app: brand, navigation, and where
 * page content lands. Most layouts only restyle the chrome (topbar,
 * sidebar, stadium, dock, drawer) and pass the route's page through
 * untouched as `children`. A few are bigger paradigm shifts that also
 * reshape how content composes:
 *   - `palette` adds a global command-bar above the standard pages;
 *   - `court` replaces the Home page with an interactive court SVG;
 *   - `tabs` keeps multiple pages open in a tab strip;
 *   - `feed` collapses Home into one chronological stream and rails it
 *     alongside detail pages;
 *   - `triptych` shows a three-column list / summary / deep-panel layout
 *     where the standard route page renders in the right column;
 *   - `bento` replaces Home with a configurable grid of widget tiles that
 *     expand into modals over the standard pages;
 *   - `magazine` replaces Home with an editorial cover (game-of-the-night
 *     hero, pull-quote stat, leaderboard, "Inside the East" feature) and
 *     widens the type scale on other routes;
 *   - `deck` replaces Home with a full-bleed card swipe over teams /
 *     players / games stacks, driven by arrow keys and touch swipes;
 *   - `graph` replaces Home with a force-directed network of teams,
 *     players, and games — hover to highlight connections, click to
 *     navigate, filter chips to show / hide node kinds;
 *   - `chat` replaces Home with a conversational interface — type or
 *     pick suggested chips, responses render as inline entity cards
 *     with click-through routing, scrollback persists for the session.
 * See FINALIZED-APPS.md → "Shell vs content" for the full breakdown.
 */
export const LAYOUT_IDS = [
  'topbar',
  'sidebar',
  'stadium',
  'dock',
  'drawer',
  'palette',
  'court',
  'tabs',
  'feed',
  'triptych',
  'bento',
  'magazine',
  'deck',
  'graph',
  'chat',
] as const
// ABOUTME: LayoutId — a type alias.
export type LayoutId = (typeof LAYOUT_IDS)[number]

// ABOUTME: DEFAULT_LAYOUT — an exported value.
export const DEFAULT_LAYOUT: LayoutId = 'topbar'

// ABOUTME: LAYOUT_OPTIONS — an exported value.
export const LAYOUT_OPTIONS = [
  { value: 'topbar', label: 'Classic — top bar' },
  { value: 'sidebar', label: 'Sidebar — left rail' },
  { value: 'stadium', label: 'Stadium — hero banner' },
  { value: 'dock', label: 'Dock — floating bottom' },
  { value: 'drawer', label: 'Drawer — hamburger' },
  { value: 'palette', label: 'Palette — command bar' },
  { value: 'court', label: 'Court — spatial map' },
  { value: 'tabs', label: 'Tabs — workspace' },
  { value: 'feed', label: 'Feed — timeline stream' },
  { value: 'triptych', label: 'Triptych — list / summary / detail' },
  { value: 'bento', label: 'Bento — configurable dashboard' },
  { value: 'magazine', label: 'Magazine — editorial cover' },
  { value: 'deck', label: 'Deck — card swipe' },
  { value: 'graph', label: 'Graph — force-directed network' },
  { value: 'chat', label: 'Chat — conversational' },
]

// ABOUTME: resolveLayoutId — a helper function.
export function resolveLayoutId(raw: string | null | undefined): LayoutId {
  if (raw && (LAYOUT_IDS as readonly string[]).includes(raw)) return raw as LayoutId
  return DEFAULT_LAYOUT
}

// ABOUTME: NavItem — an interface.
export interface NavItem {
  to: string
  label: string
  isActive: (route: SportsRoute) => boolean
}

// ABOUTME: Props for Shell.
export interface ShellProps {
  layoutId: LayoutId
  brand: ReactNode
  nav: NavItem[]
  route: SportsRoute
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

// ABOUTME: Shell — a React component.
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
    case 'palette':
      return <PaletteShell {...props} />
    case 'court':
      return <CourtShell {...props} />
    case 'tabs':
      return <TabsShell {...props} />
    case 'feed':
      return <FeedShell {...props} />
    case 'triptych':
      return <TriptychShell {...props} />
    case 'bento':
      return <BentoShell {...props} />
    case 'magazine':
      return <MagazineShell {...props} />
    case 'deck':
      return <DeckShell {...props} />
    case 'graph':
      return <GraphShell {...props} />
    case 'chat':
      return <ChatShell {...props} />
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
      </aside>
      <main className="sports-app__main">{props.children}</main>
    </div>
  )
}
