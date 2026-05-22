import type { ReactNode } from 'react'
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

export type Component =
  | 'button' | 'textinput' | 'card' | 'select' | 'toggle' | 'checkbox' | 'slider'
  | 'modal' | 'table' | 'tabs' | 'toast' | 'tooltip' | 'pagination' | 'datepicker'
  | 'sidebar' | 'empty' | 'loading' | 'tokenfield' | 'drawer' | 'segmented'
  | 'inlineedit' | 'stackedtoasts' | 'bento' | 'virtuallist' | 'stepper'
  | 'cmdk' | 'undo' | 'spotlight' | 'diff' | 'nlbar' | 'inspector' | 'presence'
  | 'timeline' | 'bezier' | 'canvas'

export type Tier = 1 | 2 | 3

export type StoryEntry = {
  id: Component
  label: string
  tier: Tier
  variants: readonly string[]
  render: (variant?: string) => ReactNode
}

export const COMPONENTS: StoryEntry[] = [
  { id: 'button', label: 'Button', tier: 1, variants: ButtonVariants, render: v => <ButtonStories variant={v} /> },
  { id: 'textinput', label: 'Text input', tier: 1, variants: TextInputVariants, render: v => <TextInputStories variant={v} /> },
  { id: 'card', label: 'Card', tier: 1, variants: CardVariants, render: v => <CardStories variant={v} /> },
  { id: 'select', label: 'Select', tier: 1, variants: SelectVariants, render: v => <SelectStories variant={v} /> },
  { id: 'toggle', label: 'Toggle', tier: 1, variants: ToggleVariants, render: v => <ToggleStories variant={v} /> },
  { id: 'checkbox', label: 'Checkbox', tier: 1, variants: CheckboxVariants, render: v => <CheckboxStories variant={v} /> },
  { id: 'slider', label: 'Slider', tier: 1, variants: SliderVariants, render: v => <SliderStories variant={v} /> },
  { id: 'modal', label: 'Modal', tier: 1, variants: ModalVariants, render: v => <ModalStories variant={v} /> },
  { id: 'table', label: 'Table', tier: 1, variants: TableVariants, render: v => <TableStories variant={v} /> },
  { id: 'tabs', label: 'Tabs', tier: 1, variants: TabsVariants, render: v => <TabsStories variant={v} /> },
  { id: 'toast', label: 'Toast', tier: 1, variants: ToastVariants, render: v => <ToastStories variant={v} /> },
  { id: 'tooltip', label: 'Tooltip', tier: 1, variants: TooltipVariants, render: v => <TooltipStories variant={v} /> },
  { id: 'pagination', label: 'Pagination', tier: 1, variants: PaginationVariants, render: v => <PaginationStories variant={v} /> },
  { id: 'datepicker', label: 'Date picker', tier: 1, variants: DatePickerVariants, render: v => <DatePickerStories variant={v} /> },
  { id: 'sidebar', label: 'Sidebar', tier: 1, variants: SidebarVariants, render: v => <SidebarStories variant={v} /> },
  { id: 'empty', label: 'Empty state', tier: 1, variants: EmptyStateVariants, render: v => <EmptyStateStories variant={v} /> },
  { id: 'loading', label: 'Loading', tier: 1, variants: LoadingVariants, render: v => <LoadingStories variant={v} /> },
  { id: 'tokenfield', label: 'Token field', tier: 2, variants: TokenFieldVariants, render: v => <TokenFieldStories variant={v} /> },
  { id: 'drawer', label: 'Drawer', tier: 2, variants: DrawerVariants, render: v => <DrawerStories variant={v} /> },
  { id: 'segmented', label: 'Segmented', tier: 2, variants: SegmentedVariants, render: v => <SegmentedStories variant={v} /> },
  { id: 'inlineedit', label: 'Inline edit', tier: 2, variants: InlineEditVariants, render: v => <InlineEditStories variant={v} /> },
  { id: 'stackedtoasts', label: 'Stacked toasts', tier: 2, variants: StackedToastsVariants, render: v => <StackedToastsStories variant={v} /> },
  { id: 'bento', label: 'Bento grid', tier: 2, variants: BentoVariants, render: v => <BentoStories variant={v} /> },
  { id: 'virtuallist', label: 'Virtual list', tier: 2, variants: VirtualListVariants, render: v => <VirtualListStories variant={v} /> },
  { id: 'stepper', label: 'Stepper', tier: 2, variants: StepperVariants, render: v => <StepperStories variant={v} /> },
  { id: 'cmdk', label: 'Command palette', tier: 3, variants: CommandPaletteVariants, render: v => <CommandPaletteStories variant={v} /> },
  { id: 'undo', label: 'Optimistic undo', tier: 3, variants: OptimisticUndoVariants, render: v => <OptimisticUndoStories variant={v} /> },
  { id: 'spotlight', label: 'Spotlight', tier: 3, variants: SpotlightVariants, render: v => <SpotlightStories variant={v} /> },
  { id: 'diff', label: 'Diff / merge', tier: 3, variants: DiffViewVariants, render: v => <DiffViewStories variant={v} /> },
  { id: 'nlbar', label: 'NL input bar', tier: 3, variants: NLBarVariants, render: v => <NLBarStories variant={v} /> },
  { id: 'inspector', label: 'Property inspector', tier: 3, variants: PropertyInspectorVariants, render: v => <PropertyInspectorStories variant={v} /> },
  { id: 'presence', label: 'Presence layer', tier: 3, variants: PresenceVariants, render: v => <PresenceStories variant={v} /> },
  { id: 'timeline', label: 'Timeline', tier: 3, variants: TimelineVariants, render: v => <TimelineStories variant={v} /> },
  { id: 'bezier', label: 'Bezier editor', tier: 3, variants: BezierEditorVariants, render: v => <BezierEditorStories variant={v} /> },
  { id: 'canvas', label: 'Spatial canvas', tier: 3, variants: SpatialCanvasVariants, render: v => <SpatialCanvasStories variant={v} /> },
]
