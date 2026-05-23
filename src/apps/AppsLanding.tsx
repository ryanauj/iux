import { palettes } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { Card } from '../components/Card/Card'
import { Link } from './Link'
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

export function AppsLanding() {
  // Landing uses the default palette as its chrome, regardless of any earlier
  // app the user was browsing.
  return (
    <PaletteRoot palette={palettes['flat-classic']} as="section">
      <div className="apps-landing">
        <Link to="/" className="apps-landing__back">← Back to component showcase</Link>
        <header className="apps-landing__header">
          <h1 className="apps-landing__title">Apps</h1>
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
    </PaletteRoot>
  )
}
