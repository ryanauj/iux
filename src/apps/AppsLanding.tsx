// ABOUTME: Landing page for the /apps route — shows a card grid of all mini-apps with live palette, nav-layout, and motion controls.

import { useRef } from 'react'
import { PaletteRoot } from '../theme/PaletteRoot'
import { Card } from '../components/Card/Card'
import { Link } from './Link'
import {
  DraggableControls,
  OpenControlsHint,
  useControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
import {
  MOTION_FIELD_OPTIONS,
  resolveMotionScale,
} from '../theme/motionScales'
import { buildPaletteField, isStyleId, useSelectedStyle } from '../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../lib/customPatterns'
import { replaceParams, type HashLocation } from './router'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../components/AppShell/navLinks'
import {
  buildNavLayoutField,
  navControlsFor,
  useNavLayout,
} from '../components/AppShell/navLayouts'
import './apps.css'

// ABOUTME: Shape of one entry in the APPS registry: id, display name, tagline, href, and icon text abbreviation.
interface AppEntry {
  id: string
  name: string
  tagline: string
  href: string
  iconText: string
}

// ABOUTME: Registry of the four mini-apps (Hoops Hub, Cap School, Promptbook, Recipe Flow) rendered as tiles on the landing grid.
const APPS: AppEntry[] = [
  {
    id: 'sports',
    name: 'Hoops Hub',
    tagline: 'NBA teams, players, games, and standings — with an in-app palette picker.',
    href: '/apps/sports',
    iconText: 'NBA',
  },
  {
    id: 'contracts',
    name: 'Cap School',
    tagline: 'How NBA contracts work — the cap, the tax, the aprons, and max deals, told in data viz.',
    href: '/apps/contracts',
    iconText: 'CAP',
  },
  {
    id: 'prompts',
    name: 'Promptbook',
    tagline: 'Save, fill, and copy prompts — plus a reference deck of prompting strategies.',
    href: '/apps/prompts',
    iconText: '›_',
  },
  {
    id: 'flowstyles',
    name: 'Recipe Flow',
    tagline: 'One recipe graph styled six ways — a gallery of React Flow node & edge treatments.',
    href: '/apps/flowstyles',
    iconText: '◍',
  },
]

// ABOUTME: Props for AppsLanding; passes the current HashLocation so the component can read palette/motion params and seed the persisted style store.
interface AppsLandingProps {
  location: HashLocation
}

// ABOUTME: Renders the apps directory: a grid of app-tile cards for Hoops Hub, Cap School, and Promptbook, with a floating DraggableControls panel for palette, nav layout, and motion.
/**
 * Renders the apps directory: a grid of app-tile cards that each link to a
 * mini-app, plus a floating DraggableControls panel for palette, nav layout,
 * and motion. Seeds the persisted style store from a `?palette=` param on
 * first mount so pasted permalinks win over the stored preference.
 */
export function AppsLanding({ location }: AppsLandingProps) {
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [navLayout, setNavLayout] = useNavLayout()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

  // URL wins on a fresh visit (pasted permalink); the site-wide
  // persisted style is the fallback so navigating in from Stories /
  // Viz / Quiz / Engine guides keeps the same look without depending
  // on the hash carrying `?palette=`.
  const paletteParam = location.params.get('palette')
  const styleId: StyleId =
    paletteParam && isStyleId(paletteParam) ? paletteParam : selectedStyle
  const palette = resolveStyle(styleId)
  const motionScale = resolveMotionScale(location.params.get('motion'))

  // Seed the persisted store from the URL on first mount so a pasted
  // permalink wins over the user's previous selection.
  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (paletteParam && styleId !== selectedStyle) {
      setSelectedStyle(styleId)
    }
  }

  const handlePaletteChange = (next: string) => {
    if (isStyleId(next)) setSelectedStyle(next)
    replaceParams({ palette: next })
  }
  const handleMotionChange = (next: string) => {
    replaceParams({ motion: next === '2' ? undefined : next })
  }

  const fields: Field[] = [
    buildPaletteField(styleId, handlePaletteChange),
    buildNavLayoutField(navLayout, setNavLayout),
    {
      key: 'motion',
      label: 'Motion',
      short: 'M',
      value: String(motionScale),
      options: MOTION_FIELD_OPTIONS.map(o => ({ ...o })),
      onChange: handleMotionChange,
    },
  ]

  const brand = (
    <h1 className="apps-landing__brand-title">
      iux — apps
      <OpenControlsHint />
    </h1>
  )

  return (
    <PaletteRoot palette={palette} as="section" motionScale={motionScale}>
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="apps"
      >
        <div className="apps-landing">
          <header className="apps-landing__header">
            <h2 className="apps-landing__title">Apps</h2>
            <p className="apps-landing__subtitle">
              Small standalone apps built on the same component library and
              palette contract as the showcase. Each one ships with its own
              in-app palette picker.
            </p>
          </header>
          <div className="apps-landing__grid">
            {APPS.map(app => (
              <Card key={app.id} variant="static">
                <Link to={app.href} className="app-tile">
                  <span className="app-tile__icon" aria-hidden="true">{app.iconText}</span>
                  <span className="app-tile__name">{app.name}</span>
                  <span className="app-tile__tagline">{app.tagline}</span>
                  <span className="app-tile__cta">Open app →</span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </AppShell>
      <DraggableControls
        style={controlsStyle}
        onStyleChange={setControlsStyle}
        fields={fields}
        nav={navControlsFor(navLayout, 'apps')}
      />
    </PaletteRoot>
  )
}
