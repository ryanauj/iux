import { useState, type ReactNode } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { ButtonStories } from '../components/Button/Button.stories'
import { TextInputStories } from '../components/TextInput/TextInput.stories'
import { CardStories } from '../components/Card/Card.stories'
import { SelectStories } from '../components/Select/Select.stories'

type Component = 'button' | 'textinput' | 'card' | 'select'

const COMPONENTS: { id: Component; label: string; render: () => ReactNode }[] = [
  { id: 'button', label: 'Button', render: () => <ButtonStories /> },
  { id: 'textinput', label: 'Text input', render: () => <TextInputStories /> },
  { id: 'card', label: 'Card', render: () => <CardStories /> },
  { id: 'select', label: 'Select', render: () => <SelectStories /> },
]

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

export function Stories() {
  const [component, setComponent] = useState<Component>('button')

  return (
    <PaletteRoot palette={palettes['flat-classic']} as="section">
      <main className="stories">
        <header className="stories__intro">
          <h1>iux — component stories</h1>
          <p>
            Three components implemented against the semantic token contract.
            Every cell below renders the same component code with the same
            props; only the palette tokens change.
          </p>
          <nav className="stories__palette-switch" aria-label="Component">
            {COMPONENTS.map(c => (
              <button
                key={c.id}
                type="button"
                aria-pressed={component === c.id}
                onClick={() => setComponent(c.id)}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </header>

        {PALETTE_IDS.map(id => {
          const palette = palettes[id]
          const active = COMPONENTS.find(c => c.id === component)
          return (
            <PaletteRoot key={id} palette={palette} as="section" className="stories__palette">
              <h2 className="stories__palette-title">
                {palette.name} <small>({palette.engine})</small>
              </h2>
              {active?.render()}
            </PaletteRoot>
          )
        })}
      </main>
    </PaletteRoot>
  )
}
