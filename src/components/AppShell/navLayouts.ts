// ABOUTME: Defines the eleven AppShell nav-location variants (topbar, sidebars, docks, rail, drawer, fab, footer, tabbar, in-controls) and the persisted useNavLayout hook that shares the active choice across every showcase page, plus the navControlsFor helper that hands the nav to the floating controls when the in-controls layout is active.

import { usePersistedPref } from '../../lib/usePersistedPref'
import { APP_SHELL_NAV, type AppShellNavId, type AppShellNavLink } from './navLinks'

// ABOUTME: Ordered tuple of all eleven nav-location ids that AppShell accepts as its `layoutId` prop.
/**
 * App-shell nav locations. Eleven variations that place the cross-page nav
 * (Components / Visualizations / Apps / Quiz / Tests / Engines) in
 * different parts of the viewport. Inspired by the sports-app layout
 * picker, but applied to every showcase page so the chrome can adapt
 * when the top bar gets cramped.
 *
 * Ten anchor the nav to a fixed page slot; `in-controls` is the odd one
 * out — it removes the page nav entirely and routes the links into the
 * floating DraggableControls panel as a collapsible Navigation section
 * (see `navControlsFor`), so the chrome shrinks to just a brand header.
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
  'in-controls',
] as const

// ABOUTME: Union of all eleven nav-location id strings, derived from NAV_LAYOUT_IDS for exhaustive type safety.
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
  { value: 'in-controls',  label: 'In controls — inside the preferences panel' },
]

// ABOUTME: The single nav-location id whose chrome routes the cross-page nav into the floating controls panel instead of a fixed page slot.
export const IN_CONTROLS_NAV_LAYOUT: NavLayoutId = 'in-controls'

// ABOUTME: What the floating controls need to render the cross-page nav as its own collapsible section: the shared link list, the active page id, and an inControls flag set only when the active layout is 'in-controls'.
/**
 * Bundle handed from a page to `DraggableControls` so the controls can
 * show the cross-page nav inside their own collapsible Navigation
 * section. `inControls` gates the rendering: it is true only for the
 * `in-controls` layout, so for every other layout the controls leave the
 * nav to AppShell and render nothing extra. Built by `navControlsFor`.
 */
export interface NavControls {
  /** The cross-page links to list — normally `APP_SHELL_NAV`. */
  links: AppShellNavLink[]
  /** Which link to mark current, mirroring the page's AppShell `activeId`. */
  activeId?: AppShellNavId
  /** True when the active layout routes nav into the controls. */
  inControls: boolean
}

// ABOUTME: Builds the NavControls descriptor a page hands to DraggableControls, pairing the shared APP_SHELL_NAV with the page's active id and the inControls flag derived from whether the chosen layout is 'in-controls'.
/**
 * Convenience builder a page calls as `navControlsFor(navLayout, 'tests')`
 * to feed `DraggableControls`. Keeps the `in-controls` comparison in one
 * place so pages never hard-code the layout id, and reuses the shared
 * `APP_SHELL_NAV` so the nav stays identical to the fixed-slot layouts.
 */
export function navControlsFor(
  layoutId: NavLayoutId,
  activeId?: AppShellNavId,
): NavControls {
  return {
    links: APP_SHELL_NAV,
    activeId,
    inControls: layoutId === IN_CONTROLS_NAV_LAYOUT,
  }
}

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
