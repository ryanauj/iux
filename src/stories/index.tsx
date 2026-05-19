import { useState, type ReactNode } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { ButtonStories } from '../components/Button/Button.stories'
import { TextInputStories } from '../components/TextInput/TextInput.stories'
import { CardStories } from '../components/Card/Card.stories'
import { SelectStories } from '../components/Select/Select.stories'
import { ToggleStories } from '../components/Toggle/Toggle.stories'
import { CheckboxStories } from '../components/Checkbox/Checkbox.stories'
import { SliderStories } from '../components/Slider/Slider.stories'
import { ModalStories } from '../components/Modal/Modal.stories'
import { TableStories } from '../components/Table/Table.stories'
import { TabsStories } from '../components/Tabs/Tabs.stories'
import { ToastStories } from '../components/Toast/Toast.stories'
import { TooltipStories } from '../components/Tooltip/Tooltip.stories'
import { PaginationStories } from '../components/Pagination/Pagination.stories'
import { DatePickerStories } from '../components/DatePicker/DatePicker.stories'

type Component = 'button' | 'textinput' | 'card' | 'select' | 'toggle' | 'checkbox' | 'slider' | 'modal' | 'table' | 'tabs' | 'toast' | 'tooltip' | 'pagination' | 'datepicker'

const COMPONENTS: { id: Component; label: string; render: () => ReactNode }[] = [
  { id: 'button', label: 'Button', render: () => <ButtonStories /> },
  { id: 'textinput', label: 'Text input', render: () => <TextInputStories /> },
  { id: 'card', label: 'Card', render: () => <CardStories /> },
  { id: 'select', label: 'Select', render: () => <SelectStories /> },
  { id: 'toggle', label: 'Toggle', render: () => <ToggleStories /> },
  { id: 'checkbox', label: 'Checkbox', render: () => <CheckboxStories /> },
  { id: 'slider', label: 'Slider', render: () => <SliderStories /> },
  { id: 'modal', label: 'Modal', render: () => <ModalStories /> },
  { id: 'table', label: 'Table', render: () => <TableStories /> },
  { id: 'tabs', label: 'Tabs', render: () => <TabsStories /> },
  { id: 'toast', label: 'Toast', render: () => <ToastStories /> },
  { id: 'tooltip', label: 'Tooltip', render: () => <TooltipStories /> },
  { id: 'pagination', label: 'Pagination', render: () => <PaginationStories /> },
  { id: 'datepicker', label: 'Date picker', render: () => <DatePickerStories /> },
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
