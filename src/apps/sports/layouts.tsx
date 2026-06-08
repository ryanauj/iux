// ABOUTME: Shell layout system for the sports app — defines the LayoutId union, LAYOUT_IDS/LAYOUT_OPTIONS arrays, ShellProps interface, and the Shell switcher that delegates to the correct shell component for each layout variant.

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

// ABOUTME: Layout = the **shell** that wraps the app: brand, navigation, and where page content lands.
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
// ABOUTME: Union of every valid layout identifier — the string the `?layout=` param holds.
export type LayoutId = (typeof LAYOUT_IDS)[number]

// ABOUTME: The layout used when no `?layout=` param is present or the value is unrecognised.
export const DEFAULT_LAYOUT: LayoutId = 'topbar'

// ABOUTME: Human-readable {value, label} pairs for every layout; drives the layout-picker dropdown in the shell selector UI.
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

// ABOUTME: Coerces an arbitrary string (from the URL param or localStorage) to a valid LayoutId, falling back to DEFAULT_LAYOUT if unrecognised or absent.
export function resolveLayoutId(raw: string | null | undefined): LayoutId {
  if (raw && (LAYOUT_IDS as readonly string[]).includes(raw)) return raw as LayoutId
  return DEFAULT_LAYOUT
}

// ABOUTME: A single entry in the primary navigation bar: the target path, display label, and a predicate that says whether it is currently active for a given route.
export interface NavItem {
  to: string
  label: string
  isActive: (route: SportsRoute) => boolean
}

// ABOUTME: Props passed from the sports app root into every shell: the active layout, brand node, navigation items, matched route, exit button, and child page content.
export interface ShellProps {
  layoutId: LayoutId
  brand: ReactNode
  nav: NavItem[]
  route: SportsRoute
  exit: ReactNode
  children: ReactNode
}

// ABOUTME: Renders a flat list of navigation Links, applying `is-active` and `aria-current` to the item whose `isActive` predicate matches the current route; className is set by the parent shell so each layout can style its own nav links.
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

// ABOUTME: Top-level shell switcher — dispatches to the correct shell component (TopbarShell, SidebarShell, PaletteShell, etc.) based on props.layoutId; also contains the five built-in layout shells (topbar, sidebar, stadium, dock, drawer) that have no specialised Home page.
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

// ABOUTME: Classic horizontal top-bar layout: brand + nav links on the left, exit on the right, full-width main below.
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

// ABOUTME: Left-rail sidebar layout: brand and nav stack vertically in a fixed-width aside, exit pinned at the bottom, main content fills the remaining width.
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

// ABOUTME: Full-width stadium-banner layout: a tall hero header with brand, exit, and a wide horizontal nav row across the bottom edge of the banner, above the content area.
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

// ABOUTME: Floating-dock layout: a minimal header with brand and exit, main content occupies all vertical space, and the primary nav lives in a bottom dock bar — mirrors a mobile tab bar.
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

// ABOUTME: Hamburger-drawer layout: a minimal topbar with a ☰/✕ toggle button; pressing it slides in an off-canvas nav panel with a scrim; the drawer auto-closes on route change and locks body scroll while open.
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
