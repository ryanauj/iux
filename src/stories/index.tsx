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
import { SidebarStories } from '../components/Sidebar/Sidebar.stories'
import { EmptyStateStories } from '../components/EmptyState/EmptyState.stories'
import { LoadingStories } from '../components/Loading/Loading.stories'
import { TokenFieldStories } from '../components/TokenField/TokenField.stories'
import { DrawerStories } from '../components/Drawer/Drawer.stories'
import { SegmentedStories } from '../components/Segmented/Segmented.stories'
import { InlineEditStories } from '../components/InlineEdit/InlineEdit.stories'
import { StackedToastsStories } from '../components/StackedToasts/StackedToasts.stories'
import { BentoStories } from '../components/Bento/Bento.stories'
import { VirtualListStories } from '../components/VirtualList/VirtualList.stories'
import { StepperStories } from '../components/Stepper/Stepper.stories'
import { CommandPaletteStories } from '../components/CommandPalette/CommandPalette.stories'
import { OptimisticUndoStories } from '../components/OptimisticUndo/OptimisticUndo.stories'
import { SpotlightStories } from '../components/Spotlight/Spotlight.stories'
import { DiffViewStories } from '../components/DiffView/DiffView.stories'
import { NLBarStories } from '../components/NLBar/NLBar.stories'
import { PropertyInspectorStories } from '../components/PropertyInspector/PropertyInspector.stories'
import { PresenceStories } from '../components/Presence/Presence.stories'
import { TimelineStories } from '../components/Timeline/Timeline.stories'
import { BezierEditorStories } from '../components/BezierEditor/BezierEditor.stories'
import { SpatialCanvasStories } from '../components/SpatialCanvas/SpatialCanvas.stories'

type Component = 'button' | 'textinput' | 'card' | 'select' | 'toggle' | 'checkbox' | 'slider' | 'modal' | 'table' | 'tabs' | 'toast' | 'tooltip' | 'pagination' | 'datepicker' | 'sidebar' | 'empty' | 'loading' | 'tokenfield' | 'drawer' | 'segmented' | 'inlineedit' | 'stackedtoasts' | 'bento' | 'virtuallist' | 'stepper' | 'cmdk' | 'undo' | 'spotlight' | 'diff' | 'nlbar' | 'inspector' | 'presence' | 'timeline' | 'bezier' | 'canvas'

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
  { id: 'sidebar', label: 'Sidebar', render: () => <SidebarStories /> },
  { id: 'empty', label: 'Empty state', render: () => <EmptyStateStories /> },
  { id: 'loading', label: 'Loading', render: () => <LoadingStories /> },
  { id: 'tokenfield', label: 'Token field', render: () => <TokenFieldStories /> },
  { id: 'drawer', label: 'Drawer', render: () => <DrawerStories /> },
  { id: 'segmented', label: 'Segmented', render: () => <SegmentedStories /> },
  { id: 'inlineedit', label: 'Inline edit', render: () => <InlineEditStories /> },
  { id: 'stackedtoasts', label: 'Stacked toasts', render: () => <StackedToastsStories /> },
  { id: 'bento', label: 'Bento grid', render: () => <BentoStories /> },
  { id: 'virtuallist', label: 'Virtual list', render: () => <VirtualListStories /> },
  { id: 'stepper', label: 'Stepper', render: () => <StepperStories /> },
  { id: 'cmdk', label: 'Command palette', render: () => <CommandPaletteStories /> },
  { id: 'undo', label: 'Optimistic undo', render: () => <OptimisticUndoStories /> },
  { id: 'spotlight', label: 'Spotlight', render: () => <SpotlightStories /> },
  { id: 'diff', label: 'Diff / merge', render: () => <DiffViewStories /> },
  { id: 'nlbar', label: 'NL input bar', render: () => <NLBarStories /> },
  { id: 'inspector', label: 'Property inspector', render: () => <PropertyInspectorStories /> },
  { id: 'presence', label: 'Presence layer', render: () => <PresenceStories /> },
  { id: 'timeline', label: 'Timeline', render: () => <TimelineStories /> },
  { id: 'bezier', label: 'Bezier editor', render: () => <BezierEditorStories /> },
  { id: 'canvas', label: 'Spatial canvas', render: () => <SpatialCanvasStories /> },
]

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

type PaletteChoice = 'all' | PaletteId

const MOTION_SCALES = [
  { value: 1, label: '1× (palette default)' },
  { value: 2, label: '2× (slower)' },
  { value: 3, label: '3× (slowest)' },
  { value: 5, label: '5× (debug)' },
] as const

export function Stories() {
  const [component, setComponent] = useState<Component>('button')
  const [paletteChoice, setPaletteChoice] = useState<PaletteChoice>('all')
  const [chromePaletteId, setChromePaletteId] = useState<PaletteId>('flat-classic')
  const [motionScale, setMotionScale] = useState<number>(2)
  const [controlsOpen, setControlsOpen] = useState<boolean>(true)

  const active = COMPONENTS.find(c => c.id === component)
  const visiblePaletteIds: PaletteId[] =
    paletteChoice === 'all' ? PALETTE_IDS : [paletteChoice]
  const chromePalette = palettes[chromePaletteId]

  const handlePaletteChange = (next: PaletteChoice) => {
    setPaletteChoice(next)
    if (next !== 'all') setChromePaletteId(next)
  }

  return (
    <PaletteRoot palette={chromePalette} as="section" motionScale={motionScale}>
      <main className="stories">
        <header className={`stories__header${controlsOpen ? '' : ' stories__header--collapsed'}`}>
          <div className="stories__header-bar">
            <h1 className="stories__title">iux — component stories</h1>
            <button
              type="button"
              className="stories__toggle"
              aria-expanded={controlsOpen}
              aria-controls="stories-controls"
              onClick={() => setControlsOpen(o => !o)}
            >
              {controlsOpen ? 'Hide controls' : 'Show controls'}
            </button>
          </div>
          <div
            id="stories-controls"
            className="stories__header-body"
            hidden={!controlsOpen}
          >
            <p className="stories__intro-copy">
              Components implemented against the semantic token contract. Every
              cell below renders the same component code with the same props;
              only the palette tokens change.
            </p>
            <div className="stories__controls">
              <label className="stories__control">
                <span className="stories__control-label">Component</span>
                <select
                  className="stories__control-select"
                  value={component}
                  onChange={e => setComponent(e.target.value as Component)}
                >
                  {COMPONENTS.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </label>
              <label className="stories__control">
                <span className="stories__control-label">Palette</span>
                <select
                  className="stories__control-select"
                  value={paletteChoice}
                  onChange={e => handlePaletteChange(e.target.value as PaletteChoice)}
                >
                  <option value="all">All palettes</option>
                  {PALETTE_IDS.map(id => (
                    <option key={id} value={id}>
                      {palettes[id].name} ({palettes[id].engine})
                    </option>
                  ))}
                </select>
              </label>
              <label className="stories__control">
                <span className="stories__control-label">Motion speed</span>
                <select
                  className="stories__control-select"
                  value={motionScale}
                  onChange={e => setMotionScale(Number(e.target.value))}
                >
                  {MOTION_SCALES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </header>

        {visiblePaletteIds.map(id => {
          const palette = palettes[id]
          return (
            <PaletteRoot
              key={id}
              palette={palette}
              as="section"
              className="stories__palette"
              motionScale={motionScale}
            >
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
