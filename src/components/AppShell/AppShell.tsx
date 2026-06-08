// ABOUTME: Renders the page chrome (brand + cross-page nav + main content) in one of ten configurable nav locations.

import { useEffect, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { AppShellNavId, AppShellNavLink } from './navLinks'
import type { NavLayoutId } from './navLayouts'
import './AppShell.css'

// ABOUTME: Props for AppShell — supplies the layout id, brand content, nav links, active nav id, and optional brand-extra slot for controls like a layout picker.
export interface AppShellProps {
  layoutId: NavLayoutId
  /** Page title bar contents (title text, info button, eyebrow etc.). */
  brand: ReactNode
  /** Cross-page nav links. AppShell renders them in the slot for the chosen layout. */
  nav: AppShellNavLink[]
  /** Which nav link should be marked current. */
  activeId?: AppShellNavId
  /** Page body. Sits in the shell's main slot. */
  children: ReactNode
  /** Optional extra control rendered next to the brand (e.g. a layout picker). */
  brandExtra?: ReactNode
}

// ABOUTME: Switches on `layoutId` to delegate to one of ten private shell components (TopbarShell, SidebarShell, DockShell, RailShell, DrawerShell, FabShell, FooterShell, TabbarShell), each placing nav, brand, and main slots differently.
/**
 * Renders the page chrome (brand + cross-page nav + main content) in
 * one of ten configurable nav locations. The brand bar is always
 * present; the nav moves between top, side, bottom, drawer, dock, fab,
 * and rail slots depending on `layoutId`.
 */
export function AppShell(props: AppShellProps) {
  switch (props.layoutId) {
    case 'topbar':       return <TopbarShell {...props} />
    case 'sidebar-left': return <SidebarShell {...props} side="left" />
    case 'sidebar-right':return <SidebarShell {...props} side="right" />
    case 'dock-bottom':  return <DockShell {...props} side="bottom" />
    case 'dock-top':     return <DockShell {...props} side="top" />
    case 'rail-left':    return <RailShell {...props} />
    case 'drawer':       return <DrawerShell {...props} />
    case 'fab':          return <FabShell {...props} />
    case 'footer':       return <FooterShell {...props} />
    case 'tabbar':       return <TabbarShell {...props} />
  }
}

/* ------------------------------------------------------------------ */
/* Anchor renderer                                                     */
/* ------------------------------------------------------------------ */

// ABOUTME: Renders one nav link as a react-router `<Link>` that works in both the main router and the hash router; rewrites `#`-prefixed hrefs and dispatches a synthetic `hashchange` after pushState so the hash router re-reads the URL.
/**
 * Renders one nav entry as an anchor that works across BOTH routing
 * contexts — react-router (`/engines`) and the hash router (`#/viz`).
 *
 * Hash hrefs are rewritten to `/<hash>` so react-router treats them as
 * root-path navigations with a hash, which means they correctly bounce
 * the browser out of `/engines` back to `/` when needed. After the
 * pushState navigation we dispatch a synthetic `hashchange` so the
 * `useHashLocation` hook in Stories re-reads the URL — pushState
 * doesn't fire `hashchange` on its own, even when the hash changes.
 */
function NavAnchor({
  link,
  active,
  className,
  short,
  children,
}: {
  link: AppShellNavLink
  active: boolean
  className: string
  short?: boolean
  children?: ReactNode
}) {
  const finalClass = active ? `${className} is-active` : className
  const ariaCurrent = active ? 'page' : undefined
  const label = short ? link.short : link.label
  const body = children ?? label

  const to = link.href.startsWith('#') ? `/${link.href}` : link.href

  const handleClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, new window, save link as) and
    // non-primary buttons fall through to the browser's default.
    if (e.defaultPrevented) return
    if (e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    // react-router Link handles the pushState navigation; we just need
    // to bridge it to the hash router after the fact.
    queueMicrotask(() => {
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
  }

  return (
    <Link
      to={to}
      className={finalClass}
      aria-current={ariaCurrent}
      title={short ? link.label : undefined}
      onClick={handleClick}
    >
      {body}
    </Link>
  )
}

// ABOUTME: Renders all nav links in order, delegating each to `NavAnchor`; used by every shell variant to avoid repeating the mapping loop.
function NavList({
  nav,
  activeId,
  className,
  short = false,
}: {
  nav: AppShellNavLink[]
  activeId?: AppShellNavId
  className: string
  short?: boolean
}) {
  return (
    <>
      {nav.map(link => (
        <NavAnchor
          key={link.id}
          link={link}
          active={link.id === activeId}
          className={className}
          short={short}
        />
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Shells                                                              */
/* ------------------------------------------------------------------ */

// ABOUTME: Shell variant that places the brand on the left and the nav inline to its right in a single top `<header>` bar.
function TopbarShell({ brand, brandExtra, nav, activeId, children }: AppShellProps) {
  return (
    <div className="iux-appshell iux-appshell--topbar">
      <header className="iux-appshell__top">
        <div className="iux-appshell__brand">{brand}</div>
        <nav className="iux-appshell__nav iux-appshell__nav--top" aria-label="Site sections">
          <NavList nav={nav} activeId={activeId} className="iux-appshell__nav-link" />
        </nav>
        {brandExtra && <div className="iux-appshell__brand-extra">{brandExtra}</div>}
      </header>
      <main className="iux-appshell__main">{children}</main>
    </div>
  )
}

// ABOUTME: Shell variant that places the brand and full nav links in a persistent left or right `<aside>` sidebar alongside the main content.
function SidebarShell({
  brand,
  brandExtra,
  nav,
  activeId,
  children,
  side,
}: AppShellProps & { side: 'left' | 'right' }) {
  return (
    <div className={`iux-appshell iux-appshell--sidebar iux-appshell--sidebar-${side}`}>
      <aside className="iux-appshell__sidebar" aria-label="Site sections">
        <div className="iux-appshell__sidebar-brand">{brand}</div>
        <nav className="iux-appshell__nav iux-appshell__nav--side">
          <NavList nav={nav} activeId={activeId} className="iux-appshell__nav-link iux-appshell__nav-link--side" />
        </nav>
        {brandExtra && <div className="iux-appshell__sidebar-extra">{brandExtra}</div>}
      </aside>
      <main className="iux-appshell__main">{children}</main>
    </div>
  )
}

// ABOUTME: Shell variant that positions the nav as a floating pill anchored to the top or bottom of the viewport, with a minimal brand header above the main content.
function DockShell({
  brand,
  brandExtra,
  nav,
  activeId,
  children,
  side,
}: AppShellProps & { side: 'top' | 'bottom' }) {
  return (
    <div className={`iux-appshell iux-appshell--dock iux-appshell--dock-${side}`}>
      <header className="iux-appshell__top iux-appshell__top--minimal">
        <div className="iux-appshell__brand">{brand}</div>
        {brandExtra && <div className="iux-appshell__brand-extra">{brandExtra}</div>}
      </header>
      <main className="iux-appshell__main iux-appshell__main--dock">{children}</main>
      <nav className={`iux-appshell__dock iux-appshell__dock--${side}`} aria-label="Site sections">
        <NavList nav={nav} activeId={activeId} className="iux-appshell__dock-link" />
      </nav>
    </div>
  )
}

// ABOUTME: Shell variant that renders a narrow left icon rail of abbreviated nav links beside a content area that still has its own minimal brand header.
function RailShell({ brand, brandExtra, nav, activeId, children }: AppShellProps) {
  return (
    <div className="iux-appshell iux-appshell--rail">
      <aside className="iux-appshell__rail" aria-label="Site sections">
        <nav className="iux-appshell__rail-nav">
          <NavList
            nav={nav}
            activeId={activeId}
            className="iux-appshell__rail-link"
            short
          />
        </nav>
      </aside>
      <div className="iux-appshell__rail-body">
        <header className="iux-appshell__top iux-appshell__top--minimal">
          <div className="iux-appshell__brand">{brand}</div>
          {brandExtra && <div className="iux-appshell__brand-extra">{brandExtra}</div>}
        </header>
        <main className="iux-appshell__main">{children}</main>
      </div>
    </div>
  )
}

// ABOUTME: Shell variant that hides the nav behind a hamburger button; toggling it slides in a left drawer panel with a scrim overlay, dismissible via Escape or clicking outside.
function DrawerShell({ brand, brandExtra, nav, activeId, children }: AppShellProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <div className={`iux-appshell iux-appshell--drawer${open ? ' is-open' : ''}`}>
      <header className="iux-appshell__top iux-appshell__top--minimal">
        <button
          type="button"
          className="iux-appshell__menu-btn"
          aria-label={open ? 'Close site sections' : 'Open site sections'}
          aria-expanded={open}
          aria-controls="iux-appshell-drawer-panel"
          onClick={() => setOpen(o => !o)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        <div className="iux-appshell__brand">{brand}</div>
        {brandExtra && <div className="iux-appshell__brand-extra">{brandExtra}</div>}
      </header>
      {open && (
        <div
          className="iux-appshell__scrim"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        id="iux-appshell-drawer-panel"
        className={`iux-appshell__drawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        <nav className="iux-appshell__drawer-nav" aria-label="Site sections">
          <NavList
            nav={nav}
            activeId={activeId}
            className="iux-appshell__drawer-link"
          />
        </nav>
      </aside>
      <main className="iux-appshell__main">{children}</main>
    </div>
  )
}

// ABOUTME: Shell variant that exposes the nav through a floating action button (⋯) in the lower corner; clicking it opens a compact link menu, dismissed by Escape or clicking away.
function FabShell({ brand, brandExtra, nav, activeId, children }: AppShellProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (target?.closest('.iux-appshell__fab-root')) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDocClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDocClick)
    }
  }, [open])

  return (
    <div className="iux-appshell iux-appshell--fab">
      <header className="iux-appshell__top iux-appshell__top--minimal">
        <div className="iux-appshell__brand">{brand}</div>
        {brandExtra && <div className="iux-appshell__brand-extra">{brandExtra}</div>}
      </header>
      <main className="iux-appshell__main iux-appshell__main--fab">{children}</main>
      <div className={`iux-appshell__fab-root${open ? ' is-open' : ''}`}>
        {open && (
          <nav className="iux-appshell__fab-menu" aria-label="Site sections">
            <NavList nav={nav} activeId={activeId} className="iux-appshell__fab-link" />
          </nav>
        )}
        <button
          type="button"
          className="iux-appshell__fab-btn"
          aria-label={open ? 'Close site sections' : 'Open site sections'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span aria-hidden="true">{open ? '✕' : '⋯'}</span>
        </button>
      </div>
    </div>
  )
}

// ABOUTME: Shell variant that anchors the nav links in a `<footer>` bar below the main content, giving the page a traditional bottom-navigation feel.
function FooterShell({ brand, brandExtra, nav, activeId, children }: AppShellProps) {
  return (
    <div className="iux-appshell iux-appshell--footer">
      <header className="iux-appshell__top iux-appshell__top--minimal">
        <div className="iux-appshell__brand">{brand}</div>
        {brandExtra && <div className="iux-appshell__brand-extra">{brandExtra}</div>}
      </header>
      <main className="iux-appshell__main iux-appshell__main--footer">{children}</main>
      <footer className="iux-appshell__footer" aria-label="Site sections">
        <nav className="iux-appshell__footer-nav">
          <NavList nav={nav} activeId={activeId} className="iux-appshell__footer-link" />
        </nav>
      </footer>
    </div>
  )
}

// ABOUTME: Shell variant that renders the nav as a bottom tab bar where each link occupies an equal-width column, mimicking a mobile app tab layout.
function TabbarShell({ brand, brandExtra, nav, activeId, children }: AppShellProps) {
  return (
    <div className="iux-appshell iux-appshell--tabbar">
      <header className="iux-appshell__top iux-appshell__top--minimal">
        <div className="iux-appshell__brand">{brand}</div>
        {brandExtra && <div className="iux-appshell__brand-extra">{brandExtra}</div>}
      </header>
      <main className="iux-appshell__main iux-appshell__main--tabbar">{children}</main>
      <nav className="iux-appshell__tabbar" aria-label="Site sections">
        <NavList
          nav={nav}
          activeId={activeId}
          className="iux-appshell__tabbar-link"
        />
      </nav>
    </div>
  )
}
