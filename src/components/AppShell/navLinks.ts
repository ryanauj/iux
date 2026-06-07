// ABOUTME: Defines the AppShellNavLink shape, AppShellNavId union, and the APP_SHELL_NAV array — the canonical cross-page nav shared by every showcase page (Components, Viz, Apps, Identify, Doctrine, How it works, Tests, Engines, Palettes, Styles, Settings).

/**
 * Cross-page nav for every showcase chrome. One entry per landing
 * route — Engines was added so the rendering-engine guides are reachable
 * from any showcase top bar (not just via the per-palette "How does …
 * work?" link inside Stories).
 *
 * Hrefs use the hash router (`#/...`) for everything except `/engines`,
 * which lives behind react-router-dom. Both forms work as plain `<a>`
 * targets — AppShell renders them as anchors so the same array drives
 * Components, Viz, Quiz, Tests, Apps landing, and the Engines pages.
 */
// ABOUTME: A single cross-page nav entry consumed by AppShell — holds a stable id, anchor href (hash or path), long label for spacious layouts, and a 1-2 char short glyph for icon-only layouts (rail, fab).
export interface AppShellNavLink {
  /** Stable id, used to mark the current page active. */
  id: AppShellNavId
  /** Anchor target. Hash for the showcase, plain path for Engines. */
  href: string
  /** Long label shown in top/sidebar/drawer/footer layouts. */
  label: string
  /** One- or two-char glyph used by icon-only layouts (rail-left, fab). */
  short: string
}

// ABOUTME: Union of stable nav-entry ids used to mark the current page active in AppShell across all ten layout variants.
export type AppShellNavId =
  | 'components'
  | 'visualizations'
  | 'apps'
  | 'quiz'
  | 'doctrine'
  | 'howitworks'
  | 'tests'
  | 'engines'
  | 'palettes'
  | 'editor'
  | 'settings'

// ABOUTME: The canonical nav-link array shared by every showcase page — one entry per section (Components, Visualizations, Apps, Identify, Doctrine, How it works, Tests, Engines, Palettes, Styles, Settings).
export const APP_SHELL_NAV: AppShellNavLink[] = [
  { id: 'components',     href: '#/',         label: 'Components',     short: 'Co' },
  { id: 'visualizations', href: '#/viz',      label: 'Visualizations', short: 'Vi' },
  { id: 'apps',           href: '#/apps',     label: 'Apps',           short: 'Ap' },
  { id: 'quiz',           href: '#/quiz',     label: 'Identify',       short: 'Id' },
  { id: 'doctrine',       href: '#/doctrine', label: 'Doctrine',       short: 'Do' },
  { id: 'howitworks',     href: '#/how-it-works', label: 'How it works', short: 'Hw' },
  { id: 'tests',          href: '#/tests',    label: 'Tests',          short: 'Te' },
  { id: 'engines',        href: '/engines',   label: 'Engines',        short: 'En' },
  { id: 'palettes',       href: '/palettes',  label: 'Palettes',       short: 'Pa' },
  { id: 'editor',         href: '#/editor',   label: 'Styles',         short: 'St' },
  { id: 'settings',       href: '#/settings', label: 'Settings',       short: 'Se' },
]
