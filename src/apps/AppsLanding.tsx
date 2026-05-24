import { useRef } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { Card } from '../components/Card/Card'
import { Link } from './Link'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
import {
  MOTION_FIELD_OPTIONS,
  resolveMotionScale,
} from '../theme/motionScales'
import { useSelectedStyle } from '../lib/persistedStyle'
import { replaceParams, type HashLocation } from './router'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../components/AppShell/navLinks'
import {
  NAV_LAYOUT_OPTIONS,
  useNavLayout,
  type NavLayoutId,
} from '../components/AppShell/navLayouts'
import './apps.css'

interface AppEntry {
  id: string
  name: string
  tagline: string
  href: string
  iconText: string
}

const APPS: AppEntry[] = [
  {
    id: 'sports',
    name: 'Hoops Hub',
    tagline: 'NBA teams, players, games, and standings — with an in-app palette picker.',
    href: '/apps/sports',
    iconText: 'NBA',
  },
]

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

interface AppsLandingProps {
  location: HashLocation
}

export function AppsLanding({ location }: AppsLandingProps) {
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [navLayout, setNavLayout] = useNavLayout()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

  // URL wins on a fresh visit (pasted permalink); the site-wide
  // persisted style is the fallback so navigating in from Stories /
  // Viz / Quiz / Engine guides keeps the same look without depending
  // on the hash carrying `?palette=`.
  const paletteParam = location.params.get('palette')
  const paletteId: PaletteId =
    paletteParam && (PALETTE_IDS as string[]).includes(paletteParam)
      ? (paletteParam as PaletteId)
      : selectedStyle
  const palette = palettes[paletteId]
  const motionScale = resolveMotionScale(location.params.get('motion'))

  // Seed the persisted store from the URL on first mount so a pasted
  // permalink wins over the user's previous selection.
  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (paletteParam && paletteId !== selectedStyle) {
      setSelectedStyle(paletteId)
    }
  }

  const handlePaletteChange = (next: string) => {
    if ((PALETTE_IDS as string[]).includes(next)) {
      setSelectedStyle(next as PaletteId)
    }
    replaceParams({ palette: next })
  }
  const handleMotionChange = (next: string) => {
    replaceParams({ motion: next === '2' ? undefined : next })
  }

  const fields: Field[] = [
    {
      key: 'palette',
      label: 'Palette',
      short: 'P',
      value: paletteId,
      options: PALETTE_IDS.map(id => ({
        value: id,
        label: `${palettes[id].name} (${palettes[id].engine})`,
      })),
      onChange: handlePaletteChange,
    },
    {
      key: 'navLayout',
      label: 'Nav',
      short: 'N',
      value: navLayout,
      options: NAV_LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
      onChange: v => setNavLayout(v as NavLayoutId),
    },
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
    <h1 className="apps-landing__brand-title">iux — apps</h1>
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
      />
    </PaletteRoot>
  )
}
