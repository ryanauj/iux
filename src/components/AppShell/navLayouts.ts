// ABOUTME: Defines the ten AppShell nav-location variants (topbar, sidebars, docks, rail, drawer, fab, footer, tabbar) and the persisted useNavLayout hook that shares the active choice across every showcase page.

import { usePersistedPref } from '../../lib/usePersistedPref'

// ABOUTME: Ordered tuple of all ten nav-location ids that AppShell accepts as its `layoutId` prop.
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

// ABOUTME: Union of all ten nav-location id strings, derived from NAV_LAYOUT_IDS for exhaustive type safety.
export type NavLayoutId = (typeof NAV_LAYOUT_IDS)[number]

// ABOUTME: Fallback layout id used when no persisted preference exists; set to 'topbar'.
export const DEFAULT_NAV_LAYOUT: NavLayoutId = 'topbar'

// ABOUTME: Display-ready list of all ten nav layouts with human-readable labels, used to drive layout-picker UI (e.g. a `<select>` in the brand-extra slot).
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

// ABOUTME: Validates a raw string against NAV_LAYOUT_IDS and returns it as a NavLayoutId, or falls back to DEFAULT_NAV_LAYOUT for unknown or nullish values.
export function resolveNavLayoutId(raw: string | null | undefined): NavLayoutId {
  if (raw && (NAV_LAYOUT_IDS as readonly string[]).includes(raw)) {
    return raw as NavLayoutId
  }
  return DEFAULT_NAV_LAYOUT
}

// ABOUTME: localStorage key under which the user's chosen nav layout is persisted across pages.
const NAV_LAYOUT_KEY = 'iux-nav-layout'

// ABOUTME: Type predicate that checks whether a raw string is a member of `NAV_LAYOUT_IDS`, used as the validator argument to `usePersistedPref`.
const isNavLayoutId = (raw: string): raw is NavLayoutId =>
  (NAV_LAYOUT_IDS as readonly string[]).includes(raw)

// ABOUTME: Persistent nav layout preference, shared across every page that mounts an `<AppShell>`.
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
