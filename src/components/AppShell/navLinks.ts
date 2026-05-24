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

export type AppShellNavId =
  | 'components'
  | 'visualizations'
  | 'apps'
  | 'quiz'
  | 'doctrine'
  | 'tests'
  | 'engines'

export const APP_SHELL_NAV: AppShellNavLink[] = [
  { id: 'components',     href: '#/',         label: 'Components',     short: 'Co' },
  { id: 'visualizations', href: '#/viz',      label: 'Visualizations', short: 'Vi' },
  { id: 'apps',           href: '#/apps',     label: 'Apps',           short: 'Ap' },
  { id: 'quiz',           href: '#/quiz',     label: 'Quiz',           short: 'Qu' },
  { id: 'doctrine',       href: '#/doctrine', label: 'Doctrine',       short: 'Do' },
  { id: 'tests',          href: '#/tests',    label: 'Tests',          short: 'Te' },
  { id: 'engines',        href: '/engines',   label: 'Engines',        short: 'En' },
]
