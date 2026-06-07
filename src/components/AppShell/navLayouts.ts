// ABOUTME: navLayouts — part of the components area.

import { usePersistedPref } from '../../lib/usePersistedPref'

// ABOUTME: NAV_LAYOUT_IDS — an exported value.
/**
 * App-shell nav locations. Ten variations that place the cross-page nav
 * (Components / Visualizations / Apps / Quiz / Tests / Engines) in
 * different parts of the viewport. Inspired by the sports-app layout
 * picker, but applied to every showcase page so the chrome can adapt
 * when the top bar gets cramped.
 *
 * Each layout has its own JSX shell in `AppShell.tsx`; the CSS lives in
 * `AppShell.css`.
 */
export const NAV_LAYOUT_IDS = [
  'topbar',
  'sidebar-left',
  'sidebar-right',
  'dock-bottom',
  'dock-top',
  'rail-left',
  'drawer',
  'fab',
  'footer',
  'tabbar',
] as const

// ABOUTME: NavLayoutId — a type alias.
export type NavLayoutId = (typeof NAV_LAYOUT_IDS)[number]

// ABOUTME: DEFAULT_NAV_LAYOUT — an exported value.
export const DEFAULT_NAV_LAYOUT: NavLayoutId = 'topbar'

// ABOUTME: NAV_LAYOUT_OPTIONS — an exported value.
export const NAV_LAYOUT_OPTIONS: { value: NavLayoutId; label: string }[] = [
  { value: 'topbar',       label: 'Top bar — classic horizontal' },
  { value: 'sidebar-left', label: 'Sidebar — left rail' },
  { value: 'sidebar-right',label: 'Sidebar — right rail' },
  { value: 'dock-bottom',  label: 'Dock — floating pill, bottom' },
  { value: 'dock-top',     label: 'Dock — floating pill, top' },
  { value: 'rail-left',    label: 'Rail — narrow icon rail, left' },
  { value: 'drawer',       label: 'Drawer — hamburger' },
  { value: 'fab',          label: 'FAB — floating action menu' },
  { value: 'footer',       label: 'Footer — anchored bottom bar' },
  { value: 'tabbar',       label: 'Tab bar — bottom equal-width' },
]

// ABOUTME: resolveNavLayoutId — a helper function.
export function resolveNavLayoutId(raw: string | null | undefined): NavLayoutId {
  if (raw && (NAV_LAYOUT_IDS as readonly string[]).includes(raw)) {
    return raw as NavLayoutId
  }
  return DEFAULT_NAV_LAYOUT
}

const NAV_LAYOUT_KEY = 'iux-nav-layout'

const isNavLayoutId = (raw: string): raw is NavLayoutId =>
  (NAV_LAYOUT_IDS as readonly string[]).includes(raw)

// ABOUTME: useNavLayout — a React hook.
/**
 * Persistent nav layout preference, shared across every page that
 * mounts an `<AppShell>`. localStorage-backed so a layout chosen on the
 * components page survives a hop to Quiz or Engines.
 */
export function useNavLayout(): [NavLayoutId, (next: NavLayoutId) => void] {
  return usePersistedPref<NavLayoutId>(
    NAV_LAYOUT_KEY,
    DEFAULT_NAV_LAYOUT,
    isNavLayoutId,
  )
}
