import { useEffect, useRef, useState, type ReactNode } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { ButtonStories, VARIANTS as ButtonVariants } from '../components/Button/Button.stories'
import { TextInputStories, VARIANTS as TextInputVariants } from '../components/TextInput/TextInput.stories'
import { CardStories, VARIANTS as CardVariants } from '../components/Card/Card.stories'
import { SelectStories, VARIANTS as SelectVariants } from '../components/Select/Select.stories'
import { ToggleStories, VARIANTS as ToggleVariants } from '../components/Toggle/Toggle.stories'
import { CheckboxStories, VARIANTS as CheckboxVariants } from '../components/Checkbox/Checkbox.stories'
import { SliderStories, VARIANTS as SliderVariants } from '../components/Slider/Slider.stories'
import { ModalStories, VARIANTS as ModalVariants } from '../components/Modal/Modal.stories'
import { TableStories, VARIANTS as TableVariants } from '../components/Table/Table.stories'
import { TabsStories, VARIANTS as TabsVariants } from '../components/Tabs/Tabs.stories'
import { ToastStories, VARIANTS as ToastVariants } from '../components/Toast/Toast.stories'
import { TooltipStories, VARIANTS as TooltipVariants } from '../components/Tooltip/Tooltip.stories'
import { PaginationStories, VARIANTS as PaginationVariants } from '../components/Pagination/Pagination.stories'
import { DatePickerStories, VARIANTS as DatePickerVariants } from '../components/DatePicker/DatePicker.stories'
import { SidebarStories, VARIANTS as SidebarVariants } from '../components/Sidebar/Sidebar.stories'
import { EmptyStateStories, VARIANTS as EmptyStateVariants } from '../components/EmptyState/EmptyState.stories'
import { LoadingStories, VARIANTS as LoadingVariants } from '../components/Loading/Loading.stories'
import { TokenFieldStories, VARIANTS as TokenFieldVariants } from '../components/TokenField/TokenField.stories'
import { DrawerStories, VARIANTS as DrawerVariants } from '../components/Drawer/Drawer.stories'
import { SegmentedStories, VARIANTS as SegmentedVariants } from '../components/Segmented/Segmented.stories'
import { InlineEditStories, VARIANTS as InlineEditVariants } from '../components/InlineEdit/InlineEdit.stories'
import { StackedToastsStories, VARIANTS as StackedToastsVariants } from '../components/StackedToasts/StackedToasts.stories'
import { BentoStories, VARIANTS as BentoVariants } from '../components/Bento/Bento.stories'
import { VirtualListStories, VARIANTS as VirtualListVariants } from '../components/VirtualList/VirtualList.stories'
import { StepperStories, VARIANTS as StepperVariants } from '../components/Stepper/Stepper.stories'
import { CommandPaletteStories, VARIANTS as CommandPaletteVariants } from '../components/CommandPalette/CommandPalette.stories'
import { OptimisticUndoStories, VARIANTS as OptimisticUndoVariants } from '../components/OptimisticUndo/OptimisticUndo.stories'
import { SpotlightStories, VARIANTS as SpotlightVariants } from '../components/Spotlight/Spotlight.stories'
import { DiffViewStories, VARIANTS as DiffViewVariants } from '../components/DiffView/DiffView.stories'
import { NLBarStories, VARIANTS as NLBarVariants } from '../components/NLBar/NLBar.stories'
import { PropertyInspectorStories, VARIANTS as PropertyInspectorVariants } from '../components/PropertyInspector/PropertyInspector.stories'
import { PresenceStories, VARIANTS as PresenceVariants } from '../components/Presence/Presence.stories'
import { TimelineStories, VARIANTS as TimelineVariants } from '../components/Timeline/Timeline.stories'
import { BezierEditorStories, VARIANTS as BezierEditorVariants } from '../components/BezierEditor/BezierEditor.stories'
import { SpatialCanvasStories, VARIANTS as SpatialCanvasVariants } from '../components/SpatialCanvas/SpatialCanvas.stories'

type Component = 'button' | 'textinput' | 'card' | 'select' | 'toggle' | 'checkbox' | 'slider' | 'modal' | 'table' | 'tabs' | 'toast' | 'tooltip' | 'pagination' | 'datepicker' | 'sidebar' | 'empty' | 'loading' | 'tokenfield' | 'drawer' | 'segmented' | 'inlineedit' | 'stackedtoasts' | 'bento' | 'virtuallist' | 'stepper' | 'cmdk' | 'undo' | 'spotlight' | 'diff' | 'nlbar' | 'inspector' | 'presence' | 'timeline' | 'bezier' | 'canvas'

type StoryEntry = {
  id: Component
  label: string
  variants: readonly string[]
  render: (variant?: string) => ReactNode
}

const COMPONENTS: StoryEntry[] = [
  { id: 'button', label: 'Button', variants: ButtonVariants, render: v => <ButtonStories variant={v} /> },
  { id: 'textinput', label: 'Text input', variants: TextInputVariants, render: v => <TextInputStories variant={v} /> },
  { id: 'card', label: 'Card', variants: CardVariants, render: v => <CardStories variant={v} /> },
  { id: 'select', label: 'Select', variants: SelectVariants, render: v => <SelectStories variant={v} /> },
  { id: 'toggle', label: 'Toggle', variants: ToggleVariants, render: v => <ToggleStories variant={v} /> },
  { id: 'checkbox', label: 'Checkbox', variants: CheckboxVariants, render: v => <CheckboxStories variant={v} /> },
  { id: 'slider', label: 'Slider', variants: SliderVariants, render: v => <SliderStories variant={v} /> },
  { id: 'modal', label: 'Modal', variants: ModalVariants, render: v => <ModalStories variant={v} /> },
  { id: 'table', label: 'Table', variants: TableVariants, render: v => <TableStories variant={v} /> },
  { id: 'tabs', label: 'Tabs', variants: TabsVariants, render: v => <TabsStories variant={v} /> },
  { id: 'toast', label: 'Toast', variants: ToastVariants, render: v => <ToastStories variant={v} /> },
  { id: 'tooltip', label: 'Tooltip', variants: TooltipVariants, render: v => <TooltipStories variant={v} /> },
  { id: 'pagination', label: 'Pagination', variants: PaginationVariants, render: v => <PaginationStories variant={v} /> },
  { id: 'datepicker', label: 'Date picker', variants: DatePickerVariants, render: v => <DatePickerStories variant={v} /> },
  { id: 'sidebar', label: 'Sidebar', variants: SidebarVariants, render: v => <SidebarStories variant={v} /> },
  { id: 'empty', label: 'Empty state', variants: EmptyStateVariants, render: v => <EmptyStateStories variant={v} /> },
  { id: 'loading', label: 'Loading', variants: LoadingVariants, render: v => <LoadingStories variant={v} /> },
  { id: 'tokenfield', label: 'Token field', variants: TokenFieldVariants, render: v => <TokenFieldStories variant={v} /> },
  { id: 'drawer', label: 'Drawer', variants: DrawerVariants, render: v => <DrawerStories variant={v} /> },
  { id: 'segmented', label: 'Segmented', variants: SegmentedVariants, render: v => <SegmentedStories variant={v} /> },
  { id: 'inlineedit', label: 'Inline edit', variants: InlineEditVariants, render: v => <InlineEditStories variant={v} /> },
  { id: 'stackedtoasts', label: 'Stacked toasts', variants: StackedToastsVariants, render: v => <StackedToastsStories variant={v} /> },
  { id: 'bento', label: 'Bento grid', variants: BentoVariants, render: v => <BentoStories variant={v} /> },
  { id: 'virtuallist', label: 'Virtual list', variants: VirtualListVariants, render: v => <VirtualListStories variant={v} /> },
  { id: 'stepper', label: 'Stepper', variants: StepperVariants, render: v => <StepperStories variant={v} /> },
  { id: 'cmdk', label: 'Command palette', variants: CommandPaletteVariants, render: v => <CommandPaletteStories variant={v} /> },
  { id: 'undo', label: 'Optimistic undo', variants: OptimisticUndoVariants, render: v => <OptimisticUndoStories variant={v} /> },
  { id: 'spotlight', label: 'Spotlight', variants: SpotlightVariants, render: v => <SpotlightStories variant={v} /> },
  { id: 'diff', label: 'Diff / merge', variants: DiffViewVariants, render: v => <DiffViewStories variant={v} /> },
  { id: 'nlbar', label: 'NL input bar', variants: NLBarVariants, render: v => <NLBarStories variant={v} /> },
  { id: 'inspector', label: 'Property inspector', variants: PropertyInspectorVariants, render: v => <PropertyInspectorStories variant={v} /> },
  { id: 'presence', label: 'Presence layer', variants: PresenceVariants, render: v => <PresenceStories variant={v} /> },
  { id: 'timeline', label: 'Timeline', variants: TimelineVariants, render: v => <TimelineStories variant={v} /> },
  { id: 'bezier', label: 'Bezier editor', variants: BezierEditorVariants, render: v => <BezierEditorStories variant={v} /> },
  { id: 'canvas', label: 'Spatial canvas', variants: SpatialCanvasVariants, render: v => <SpatialCanvasStories variant={v} /> },
]

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

type PaletteChoice = 'all' | PaletteId
type VariantChoice = 'all' | string

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
  const [variantChoice, setVariantChoice] = useState<VariantChoice>('all')
  const [infoOpen, setInfoOpen] = useState<boolean>(false)

  const active = COMPONENTS.find(c => c.id === component)
  const visiblePaletteIds: PaletteId[] =
    paletteChoice === 'all' ? PALETTE_IDS : [paletteChoice]
  const chromePalette = palettes[chromePaletteId]
  const activeVariant =
    variantChoice !== 'all' && active?.variants.includes(variantChoice)
      ? variantChoice
      : undefined

  const handleComponentChange = (next: Component) => {
    setComponent(next)
    setVariantChoice('all')
  }

  const handlePaletteChange = (next: PaletteChoice) => {
    setPaletteChoice(next)
    if (next !== 'all') setChromePaletteId(next)
  }

  const infoBtnRef = useRef<HTMLButtonElement>(null)
  const infoPopRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!infoOpen) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        infoBtnRef.current?.contains(target) ||
        infoPopRef.current?.contains(target)
      ) return
      setInfoOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInfoOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [infoOpen])

  return (
    <PaletteRoot palette={chromePalette} as="section" motionScale={motionScale}>
      <main className="stories">
        <header className={`stories__header${controlsOpen ? '' : ' stories__header--collapsed'}`}>
          <div className="stories__header-bar">
            <h1 className="stories__title">
              iux — component stories
              <button
                ref={infoBtnRef}
                type="button"
                className="stories__info-btn"
                aria-label="About this page"
                aria-expanded={infoOpen}
                aria-controls="stories-info-popover"
                onClick={() => setInfoOpen(o => !o)}
              >
                i
              </button>
            </h1>
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
          {infoOpen && (
            <div
              ref={infoPopRef}
              id="stories-info-popover"
              role="region"
              aria-label="About this page"
              className="stories__info-popover"
            >
              Components implemented against the semantic token contract. Every
              cell below renders the same component code with the same props;
              only the palette tokens change.
            </div>
          )}
          <div
            id="stories-controls"
            className="stories__header-body"
            hidden={!controlsOpen}
          >
            <div className="stories__controls">
              <label className="stories__control">
                <span className="stories__control-label">Component</span>
                <select
                  className="stories__control-select"
                  value={component}
                  onChange={e => handleComponentChange(e.target.value as Component)}
                >
                  {COMPONENTS.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </label>
              <label className="stories__control">
                <span className="stories__control-label">Variant</span>
                <select
                  className="stories__control-select"
                  value={variantChoice}
                  onChange={e => setVariantChoice(e.target.value as VariantChoice)}
                >
                  <option value="all">All variants</option>
                  {active?.variants.map(v => (
                    <option key={v} value={v}>{v}</option>
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
              {active?.render(activeVariant)}
            </PaletteRoot>
          )
        })}
      </main>
    </PaletteRoot>
  )
}
