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
import { SparklineStories, VARIANTS as SparklineVariants } from '../components/Sparkline/Sparkline.stories'
import { LineChartStories, VARIANTS as LineChartVariants } from '../components/LineChart/LineChart.stories'
import { BarStories, VARIANTS as BarVariants } from '../components/Bar/Bar.stories'
import { HistogramStories, VARIANTS as HistogramVariants } from '../components/Histogram/Histogram.stories'
import { DonutStories, VARIANTS as DonutVariants } from '../components/Donut/Donut.stories'
import { AreaStories, VARIANTS as AreaVariants } from '../components/Area/Area.stories'
import { ScatterStories, VARIANTS as ScatterVariants } from '../components/Scatter/Scatter.stories'
import { CalendarHeatmapStories, VARIANTS as CalendarHeatmapVariants } from '../components/CalendarHeatmap/CalendarHeatmap.stories'
import { StackedAreaStories, VARIANTS as StackedAreaVariants } from '../components/StackedArea/StackedArea.stories'
import { BoxPlotStories, VARIANTS as BoxPlotVariants } from '../components/BoxPlot/BoxPlot.stories'
import { TreemapStories, VARIANTS as TreemapVariants } from '../components/Treemap/Treemap.stories'
import { SankeyStories, VARIANTS as SankeyVariants } from '../components/Sankey/Sankey.stories'
import { LollipopStories, VARIANTS as LollipopVariants } from '../components/Lollipop/Lollipop.stories'
import { WaffleStories, VARIANTS as WaffleVariants } from '../components/Waffle/Waffle.stories'
import { GaugeStories, VARIANTS as GaugeVariants } from '../components/Gauge/Gauge.stories'
import { HeatmapStories, VARIANTS as HeatmapVariants } from '../components/Heatmap/Heatmap.stories'
import { RadarStories, VARIANTS as RadarVariants } from '../components/Radar/Radar.stories'
import { FunnelStories, VARIANTS as FunnelVariants } from '../components/Funnel/Funnel.stories'
import { WaterfallStories, VARIANTS as WaterfallVariants } from '../components/Waterfall/Waterfall.stories'
import { HexbinStories, VARIANTS as HexbinVariants } from '../components/Hexbin/Hexbin.stories'
import { ViolinStories, VARIANTS as ViolinVariants } from '../components/Violin/Violin.stories'
import { NodeLinkStories, VARIANTS as NodeLinkVariants } from '../components/NodeLink/NodeLink.stories'

export type Component =
  | 'button' | 'textinput' | 'card' | 'select' | 'toggle' | 'checkbox' | 'slider'
  | 'modal' | 'table' | 'tabs' | 'toast' | 'tooltip' | 'pagination' | 'datepicker'
  | 'sidebar' | 'empty' | 'loading' | 'tokenfield' | 'drawer' | 'segmented'
  | 'inlineedit' | 'stackedtoasts' | 'bento' | 'virtuallist' | 'stepper'
  | 'cmdk' | 'undo' | 'spotlight' | 'diff' | 'nlbar' | 'inspector' | 'presence'
  | 'timeline' | 'bezier' | 'canvas'
  | 'sparkline' | 'linechart' | 'bar' | 'histogram' | 'donut' | 'area'
  | 'scatter' | 'calendarheatmap' | 'stackedarea' | 'boxplot' | 'treemap' | 'sankey'
  | 'lollipop' | 'waffle' | 'gauge' | 'heatmap' | 'radar' | 'funnel'
  | 'waterfall' | 'hexbin' | 'violin' | 'nodelink'

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

/**
 * Parallel registry to COMPONENTS. Visualizations sit alongside components
 * as a separate dimension — see FINALIZED-VISUALIZATIONS.md. Both registries
 * share the StoryEntry shape so the showcase view modes iterate them
 * uniformly; the per-palette layouts render them as distinct groups.
 */
export const VISUALIZATIONS: StoryEntry[] = [
  { id: 'sparkline', label: 'Sparkline', tier: 1, variants: SparklineVariants, render: v => <SparklineStories variant={v} /> },
  { id: 'linechart', label: 'Line chart', tier: 1, variants: LineChartVariants, render: v => <LineChartStories variant={v} /> },
  { id: 'bar', label: 'Bar chart', tier: 1, variants: BarVariants, render: v => <BarStories variant={v} /> },
  { id: 'histogram', label: 'Histogram', tier: 1, variants: HistogramVariants, render: v => <HistogramStories variant={v} /> },
  { id: 'donut', label: 'Donut', tier: 1, variants: DonutVariants, render: v => <DonutStories variant={v} /> },
  { id: 'area', label: 'Area', tier: 1, variants: AreaVariants, render: v => <AreaStories variant={v} /> },
  { id: 'scatter', label: 'Scatter', tier: 2, variants: ScatterVariants, render: v => <ScatterStories variant={v} /> },
  { id: 'calendarheatmap', label: 'Calendar heatmap', tier: 2, variants: CalendarHeatmapVariants, render: v => <CalendarHeatmapStories variant={v} /> },
  { id: 'stackedarea', label: 'Stacked area', tier: 2, variants: StackedAreaVariants, render: v => <StackedAreaStories variant={v} /> },
  { id: 'boxplot', label: 'Box plot', tier: 2, variants: BoxPlotVariants, render: v => <BoxPlotStories variant={v} /> },
  { id: 'treemap', label: 'Treemap', tier: 2, variants: TreemapVariants, render: v => <TreemapStories variant={v} /> },
  { id: 'sankey', label: 'Sankey', tier: 3, variants: SankeyVariants, render: v => <SankeyStories variant={v} /> },
  { id: 'lollipop', label: 'Lollipop', tier: 1, variants: LollipopVariants, render: v => <LollipopStories variant={v} /> },
  { id: 'waffle', label: 'Waffle', tier: 1, variants: WaffleVariants, render: v => <WaffleStories variant={v} /> },
  { id: 'gauge', label: 'Gauge', tier: 1, variants: GaugeVariants, render: v => <GaugeStories variant={v} /> },
  { id: 'heatmap', label: 'Heatmap', tier: 2, variants: HeatmapVariants, render: v => <HeatmapStories variant={v} /> },
  { id: 'radar', label: 'Radar', tier: 2, variants: RadarVariants, render: v => <RadarStories variant={v} /> },
  { id: 'funnel', label: 'Funnel', tier: 2, variants: FunnelVariants, render: v => <FunnelStories variant={v} /> },
  { id: 'waterfall', label: 'Waterfall', tier: 2, variants: WaterfallVariants, render: v => <WaterfallStories variant={v} /> },
  { id: 'hexbin', label: 'Hexbin', tier: 2, variants: HexbinVariants, render: v => <HexbinStories variant={v} /> },
  { id: 'violin', label: 'Violin', tier: 2, variants: ViolinVariants, render: v => <ViolinStories variant={v} /> },
  { id: 'nodelink', label: 'Node link', tier: 3, variants: NodeLinkVariants, render: v => <NodeLinkStories variant={v} /> },
]

/** Convenience: every entry across both registries. Use for global lookups. */
export const ALL_ENTRIES: StoryEntry[] = [...COMPONENTS, ...VISUALIZATIONS]
