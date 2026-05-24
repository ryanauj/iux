# FINALIZED-VISUALIZATIONS

Visualizations sit alongside components and apps as a third first-class
dimension of this repo. They consume the same token contract — every
chart renders in every palette using only contract vars — and they
follow the same three-tier convention. What makes them different is
that components have a single functional axis (their variant ladder),
while visualizations have **three** orthogonal axes the doc has to
hold in tension:

- **Data shape** — what the data *is*, independent of meaning
  (scalar, time series, categorical, distribution, two-variable,
  part-of-whole, hierarchical, network, flow, calendar/cyclic,
  geospatial).
- **Visual encoding** — how it's drawn (big-number + sparkline,
  line/area, bar/column, stacked/grouped bar, histogram/box/violin,
  scatter/hexbin, heatmap/calendar, treemap/sunburst, node-link,
  sankey/chord, pie/donut).
- **Question** — what it answers (compare, trend, distribute,
  compose, correlate, rank, flow, status-vs-target).

The teaching content of this doc lives at the *intersections*. The
same time-series can be drawn as a line (good for trend), as bars
(good for period comparison), as a calendar heatmap (good for cyclic
patterns), or as a sparkline (good for context next to a number). The
compatibility matrix names each pairing's pros, cons, and **cliff** —
the cardinality past which it stops scaling.

This is not a chart library. Visualizations here are hand-rolled SVG
built against the contract, the same way `BezierEditor` and
`SpatialCanvas` are. No external chart dependencies. Palette identity
drives 100% of the visual character — a Bloomberg-terminal line chart
and an Editorial line chart share zero hardcoded values.

---

## How a viz earns its place

Each entry lists:

- **Purpose** — one line, what it solves.
- **Data shape** — the typed input the component accepts.
- **Question(s)** — what it answers well.
- **Variant ladder** — 3-4 functional rungs (read-only baseline →
  interactive → composed → showcase). Visual variation across
  palettes is the orthogonal dimension. Every rung must render in
  every palette using only contract tokens.
- **Pros & cons** — what it works for, what it mis-fits, and the
  cliff where it stops scaling.
- **Palette fit** — best palettes and worst palettes, with the
  specific token slots the engine either nails or undermines.

---

## The compatibility matrix

Rows are data shapes; columns are visual encodings. Cell marks:
`✓` natural · `~` works with caveats · `✗` misleading / wrong.

|                    | big-num + sparkline | line / area | bar / column | stacked / grouped bar | histogram | scatter | heatmap / calendar | treemap | node-link | sankey | pie / donut |
|--------------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| scalar             | ✓ | ✗ | ~ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| time series (1)    | ✓ | ✓ | ✓ | ✗ | ✗ | ~ | ~ | ✗ | ✗ | ✗ | ✗ |
| time series (N)    | ~ | ✓ | ~ | ✓ | ✗ | ~ | ~ | ✗ | ✗ | ✗ | ✗ |
| categorical (rank) | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ~ | ~ | ✗ | ✗ | ~ |
| distribution (1D)  | ✗ | ✗ | ~ | ✗ | ✓ | ~ | ~ | ✗ | ✗ | ✗ | ✗ |
| two-variable       | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| part-of-whole      | ✗ | ✗ | ~ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ |
| hierarchical       | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ~ | ✓ | ✓ | ✗ | ✗ |
| network            | ✗ | ✗ | ✗ | ✗ | ✗ | ~ | ~ | ✗ | ✓ | ~ | ✗ |
| flow               | ✗ | ~ | ~ | ~ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| calendar / cyclic  | ~ | ~ | ~ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| multi-variable     | ✗ | ✗ | ~ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| two-categorical    | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| signed/cumulative  | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

Additional encodings that earned their own column in the iteration below
— lollipop (rank with less ink than bar), waffle (part-of-whole as a
fixed grid), gauge (status-vs-target), heatmap-matrix (two-categorical),
radar (multi-variable per entity), funnel and waterfall (signed flows),
hexbin (correlate at high cardinality), violin (distribution shape),
node-link (network) — extend the matrix along the same axes. Each one
ships with the canonical row it answers best and the rows it
**should not** be used for.

The matrix is opinionated. A scalar drawn as a single bar (`~`)
sometimes works — a horizontal progress-vs-target bar is a legitimate
choice — but it almost always carries less context than a big number
with a sparkline, so it's caveated. A time-series rendered as
stacked bars (`✗` for 1 series) is misleading because there's nothing
to stack.

---

## Question taxonomy

Each question has encodings that answer it well, and encodings that
look like they answer it but don't.

- **trend** — line/area (best), big-number + sparkline (best for
  context), calendar heatmap (best for cyclic). Bar works for binned
  periods. Pie/donut and treemap **do not** answer trend.
- **compare** — bar/column (best for ≤12 categories), grouped bar,
  small multiples of lines. Pie hides comparison; the human eye
  cannot compare angles accurately.
- **distribute** — histogram (best), box/violin, strip plot. Bar
  charts of pre-binned counts read as histograms.
- **compose** — stacked bar (best for 2-5 parts), treemap (best for
  many parts), pie/donut (best for ≤4 parts). Sankey for
  source-to-destination composition.
- **correlate** — scatter (best), hexbin (best at high cardinality).
  Two lines on the same axes hint at correlation without proving it.
- **rank** — bar/column (always, sorted descending). Lollipop chart
  when bars are too heavy. Never use pie for rank.
- **flow** — sankey/chord (best), node-link with weighted edges.
- **status-vs-target** — big-number + delta (best), targeted
  sparkline, dial. Color carries semantic intent here; let the
  `--color-intent-*` tokens speak.

---

## Tier ladder

Mirrors components: classic baseline / evolved / showcase.

- **Tier 1 — baseline** (read-only, static, the chart the data
  deserves at minimum). Renders in every palette. Sparkline,
  LineChart, Bar, Histogram.
- **Tier 2 — evolved** (interaction earns its keep). Hover crosshair
  + readouts, small multiples, stacked area, calendar heatmap, axis
  formatting, brush-to-select.
- **Tier 3 — showcase differentiators**. Encoding switcher (same
  data, one widget toggles bar/line/heatmap live), linked / brushed
  views (selection in one viz brushes others), "what changed"
  annotation layer, hand-drawn axis under the Sketch palette.

This iteration ships thirty-two visualizations spanning all three tiers:

- **Tier 1.** `Sparkline`, `LineChart`, `Bar`, `Histogram`, `Donut`,
  `Area`, `Lollipop`, `Waffle`, `Gauge`.
- **Tier 2.** `Scatter`, `CalendarHeatmap`, `StackedArea`, `BoxPlot`,
  `Treemap`, `Heatmap`, `Radar`, `Funnel`, `Waterfall`, `Hexbin`,
  `Violin`, `AdjacencyMatrix`, `ArcDiagram`, `Tree`, `Dendrogram`,
  `Sunburst`, `CirclePack`.
- **Tier 3.** `Sankey`, `NodeLink`, `ChordDiagram`, `CircularNetwork`,
  `HiveDiagram`, `EdgeBundle`.

Remaining declared entries (`SmallMultiples` primitive, `EncodingSwitcher`,
`LinkedViews`, `AnnotationLayer`, hand-drawn-axis) are implemented in
follow-ups — they are composition-of-vizzes work rather than new
encodings.

---

## Mix-and-match rules

Same data, different viz is the doctrine. The rules:

- **Same data, different encoding.** A `TimeSeries` consumed by a
  `Sparkline` is the same series consumed by a `LineChart` (`hover`
  rung) or a future calendar heatmap. The component picks the
  encoding; the data shape is invariant. This is what the Tier 3
  encoding-switcher widget makes visible.
- **Small multiples as the default escape.** When a single chart is
  about to render more than ~6 series, switch to small multiples
  (one panel per series, shared y-scale) before reaching for
  cleverer encodings. `LineChart` rung 3 does this automatically.
- **Layering** — a target line over a sparkline, an annotation flag
  over a line chart, a comparison value next to a big number. These
  are layers on a base encoding, not new encodings.
- **Linked views** — selection in one viz brushes another. This is
  app-level composition (a future dashboard app composes Sparkline
  + LineChart and links them via `onBrush`), not a chart-level
  feature. Tier 3.
- **When to break the ladder.** A sparkline never needs a hover
  readout — it's a glyph, not a chart. Don't promote it to rung 2
  by adding chrome it doesn't deserve. Some encodings simply stop
  at a lower rung.

---

## Tier 1 — baseline visualizations

### Sparkline
**Purpose.** Show a scalar in the context of its recent history.

**Data shape.** `{ values: number[], label?: string, unit?: string, target?: number }`.

**Question(s).** trend (glyph form), status-vs-target (targeted
form), compare-to-self (delta form).

**Variant ladder.**
1. `glyph` — bare polyline in a fixed box. No axes, no number. Used
   inline next to a table cell or a KPI tile.
2. `labeled` — adds the big number (current value) and label. Reads
   as a KPI tile.
3. `delta` — adds the delta vs the previous datapoint, tinted via
   `--color-intent-success-bg` / `--color-intent-danger-bg`, with
   min/max dots on the line.
4. `targeted` — adds a dashed target line and an above/below-target
   status pill.

**Pros & cons.**
- works for: 6–60 datapoints in a small space; embeds inside any
  `Card`, `Bento` cell, or table cell.
- mis-fits when: data needs precise readouts (use `LineChart`
  `hover`) or has more than ~120 datapoints (the polyline aliases).
- cliff: past ~200 datapoints in a glyph-sized box, adjacent
  pixels collide and the trend goes flat.

**Palette fit.**
- **Best — Bloomberg-terminal, Data-dense, High-Contrast AAA.** The
  big number consumes `--type-display-*` and the delta consumes
  `--type-code-*`; palettes that ship tabular monospace numerals
  here win twice.
- **Best — CRT-phosphor-green.** The single-color glow on
  `--color-intent-primary-bg` reads as an oscilloscope trace.
- **Worst — Neumorphism.** Polyline and surface tone collapse into
  one another because `surface.raised ≈ surface.base`. The line
  vanishes.
- **Worst — Claymorphism.** Pastel everything, no contrast between
  line and surface; the dashed target line on `targeted` is
  invisible.

### LineChart
**Purpose.** Show how one or more continuous values move over time.

**Data shape.**
```
Series[] = {
  id: string
  label: string
  points: { t: number; y: number }[]
  intent?: 'primary'|'success'|'warning'|'danger'|'info'|'neutral'
}[]
```
Plus optional `annotations: { t: number; label: string }[]`.

**Question(s).** trend (primary), compare (when multi-series), and
status-at-an-event (when annotated).

**Variant ladder.**
1. `static` — polylines, two x-ticks, one y-tick, single legend
   swatch. Read-only, suitable for screenshots and printouts.
2. `hover` — vertical crosshair on pointer move, per-series readout
   chip, formatted 3-tick axes, reduced-motion-aware stroke
   draw-in.
3. `multiples` — small-multiples grid when `series.length > 1`:
   shared y-scale, one series per panel. Brushable x-range that
   calls `onBrush(range)` when provided.
4. `annotated` — vertical annotation lines + flags at named `t`s;
   optional "what changed" highlight band between two annotations.

**Pros & cons.**
- works for: 1-6 continuous series over evenly-sampled time.
- mis-fits when: data is irregular (use scatter) or has more than
  ~8 series (use `multiples`).
- cliff: cardinality of x — past ~500 points per series the
  polyline wants decimation; past ~3000 it needs canvas, not SVG.

**Palette fit.**
- **Best — Bloomberg-terminal, Data-dense.** Single-accent line on
  a high-contrast field; `--color-intent-primary-bg` reads as a
  phosphor trace, mono axis labels via `--type-code-family`.
- **Best — Editorial.** Serif annotation flags on warm paper read
  like a Financial Times chart. The `annotated` variant is at home
  here.
- **Best — Neubrutalism.** `--border-width-thick` on the line and
  `--border-width-heavy` on the chart frame; series intent colors
  clash on purpose.
- **Worst — Neumorphism.** Surface and line nearly the same tone,
  `--color-border-subtle` too close to `--color-surface-base`,
  axis ticks dissolve.
- **Worst — Claymorphism.** Pastel everything, hover crosshair
  invisible; the chart wants more contrast than the engine allows.
- **Cautionary — CRT-phosphor.** Glow on the line is gorgeous but
  spills onto adjacent ticks; this chart wants ≤2 series in this
  palette.

### Bar
**Purpose.** Rank or compare across categories.

**Data shape.** `{ key, label, value, intent? }[]` plus optional `target`.

**Variant ladder.**
1. `simple` — bars in the input order, vertical or horizontal.
2. `sorted` — descending sort + per-bar value labels.
3. `targeted` — sorted + dashed target line; bars tint
   success/danger by whether they clear the target.

**Pros & cons.** Works for 3–12 categories. Past ~20 categories,
labels collide on the vertical layout — switch `orientation` to
horizontal. Stop being a bar chart past ~40; use a treemap.

**Palette fit.** **Best — Neubrutalism, Flat, Bloomberg.** Strong
fills + heavy borders make ranking instant. **Worst —
Claymorphism, Neumorphism.** Pastel fills wash bars into the
surface; the target line vanishes.

### Histogram
**Purpose.** Distribution of a single 1-D numeric variable.

**Data shape.** `values: number[]` + `bins`.

**Variant ladder.**
1. `counts` — raw bin counts; mean / median lines overlaid.
2. `density` — counts normalized by total, comparable across
   sample sizes.
3. `cumulative` — empirical CDF; bars rise monotonically to 100%.

**Pros & cons.** Works for ≥50 samples and 8–32 bins. Below that,
the histogram becomes a bar chart with noise.

**Palette fit.** **Best — Academic, Wikipedia, Data-dense.** The
single-channel bars need a quiet engine. **Worst — Vaporwave.**
Bin fills are tinted heavily; mean/median markers compete with the
gradient backdrop.

### Donut
**Purpose.** Part-of-whole for ≤4 (works to 6) categorical parts.

**Variant ladder.**
1. `solid` — pie; no center.
2. `donut` — center reserved for a total.
3. `labeled` — in-slice percent label + legend with values.

**Pros & cons.** Pie collapses past ~5 parts. For more, switch to
`Treemap` or a sorted `Bar`. The Donut center is the slot that
earns this encoding its keep over a bar chart.

**Palette fit.** **Best — Memphis-80s, Flat, Material.** Loud
intent fills clarify slices. **Worst — Editorial.** The wedges
clash with the serif body type; legend dominates the chart.

### Area
**Purpose.** Trend with the under-curve area carrying emphasis.

**Variant ladder.**
1. `filled` — zero-baseline tinted fill + stroke.
2. `baselined` — fill drops to the data minimum, useful when
   zero is far from the data.
3. `gradient` — top-to-bottom alpha gradient; aesthetic, lighter
   ink than `filled`.

**Pros & cons.** Single series only — for multi-series
composition over time, reach for `StackedArea`. Past ~500 points,
decimate.

**Palette fit.** **Best — Aurora, Liquid-glass, Frutiger-aero.**
The gradient variant reads as motion. **Worst — Newspaper, AAA.**
The high-contrast engine fights the soft fill.

---

## Tier 2 — evolved visualizations

### Scatter
**Purpose.** Correlate two continuous variables.

**Variant ladder.**
1. `dots` — single-series cloud.
2. `grouped` — per-series intent fill; legend in the header.
3. `regression` — least-squares fit overlay + equation and R².

**Pros & cons.** Past ~800 points the cloud overplots; jitter or
swap to a hexbin. Two-dimensional outliers are this encoding's
job — it's why `Histogram` can't replace it.

**Palette fit.** **Best — Bloomberg, Academic.** Quiet
backgrounds let the dots breathe. **Worst — Claymorphism.** Dots
get lost in the pastel field.

### CalendarHeatmap
Year-grid of daily values; the canonical cyclic-pattern encoding.

**Variant ladder.**
1. `month` — single calendar block, named weekdays.
2. `year` — 53-week strip; canonical "GitHub contributions" form.
3. `streak` — year strip + best-streak readout for binary
   habits.

**Pros & cons.** Five tint levels via opacity over
`--color-intent-primary-bg` — every palette gets a usable ramp
without contract changes. Cliff: past ~3 years the strip stops
fitting at default cell size.

**Palette fit.** **Best — Bloomberg, Flat, Wikipedia.** Calm
engines surface the tint ramp. **Worst — Neumorphism, Sketch.**
Soft surfaces erase the lower tint levels.

### StackedArea
Time-series + composition: how the parts of a whole evolve.

**Variant ladder.**
1. `stacked` — raw values summed to a total.
2. `normalized` — 0–100% share over time.
3. `streamgraph` — symmetric baseline; emphasizes shape over
   precise comparison.

**Pros & cons.** 2–5 series is the sweet spot. Past 6, individual
bands become hard to track — switch to small multiples.

**Palette fit.** **Best — Memphis, Aurora, Material.** Distinct
intent fills make the bands separable. **Worst — Editorial.**
Limited categorical hue budget; the bands blur.

### BoxPlot
Distribution with quartile structure.

**Variant ladder.**
1. `simple` — box (Q1–Q3) + whiskers to data extent + median line.
2. `outliers` — Tukey 1.5×IQR fences; outliers as discrete dots.
3. `jitter` — every sample shown as a jittered dot over the box.

**Pros & cons.** Compares ≤8 groups well. Past that, the
horizontal axis runs out of room — use small multiples of
histograms. Below n≈30 per group, the quartile estimates wobble.

**Palette fit.** **Best — Academic, Bloomberg.** The median line
needs a strong content color. **Worst — Claymorphism.** Whisker
lines disappear into the box fill.

### Treemap
Hierarchical or many-part composition.

**Variant ladder.**
1. `flat` — single level; squarified rects sized by value.
2. `grouped` — one nested level; branch rects fade to header
   intent under their children.
3. `labeled` — grouped + per-leaf value labels.

**Pros & cons.** Best when one dimension dominates and ranking
the small entries doesn't matter. For accurate cross-cell
comparison, sorted `Bar` wins.

**Palette fit.** **Best — Bauhaus, Memphis, Material.** Saturated
fills + flat strokes. **Worst — Glassmorphism.** Translucency
between adjacent rects breaks the part-of-whole illusion.

---

## Tier 3 — showcase differentiators

### Sankey
Source-to-destination flow across ordered stages.

**Variant ladder.**
1. `simple` — ribbons only; node intent inherited from stage.
2. `labeled` — node labels and totals.
3. `highlighted` — one or more `link.highlight: true` ribbons
   carry the accent; the rest fade — used for "walk this path"
   storytelling.

**Pros & cons.** 2–4 stages, ≤8 nodes per stage. Past that, ribbon
overplotting becomes unrecoverable; reach for a node-link
diagram instead. Flow conservation is implicit — outgoing and
incoming totals at every node must match in the data, or the
ribbons silently mislead.

**Palette fit.** **Best — Aurora, Vaporwave.** Transparent
ribbons against gradient surfaces are exactly the look. **Worst —
Newspaper, AAA.** High contrast amplifies ribbon overlap.

### NodeLink
Relationships drawn as a graph: nodes positioned by a deterministic
relax-from-groups pass (no animation, no randomness — stable across
renders), edges drawn between them.

**Data shape.**
```
GraphNode = { id, label, group?, intent?, weight?, x?, y? }
GraphEdge = { from, to, value? }
```

**Variant ladder.**
1. `simple` — uniform edges, one fill per group via the intent ramp.
2. `weighted` — edge thickness encodes `value`; node radius encodes
   `weight`. Reads as a service-call topology.
3. `directed` — `weighted` plus arrowheads on every edge.

**Pros & cons.** Sweet spot is 6–20 nodes and ≤40 edges. Past ~30
nodes the relaxer can't avoid edge crossings without a real
force-directed simulator. Pre-position with `x`/`y` (both in [0, 1])
when domain knowledge beats relaxation.

**Palette fit.** **Best — Bauhaus, Memphis, Material.** Saturated
group fills make clusters obvious. **Worst — Glassmorphism.** The
translucent surfaces collapse edge / node contrast.

---

## Additional visualizations (this iteration)

These extend the three-tier framework rather than the matrix axes;
each one is a different *encoding* of an existing data shape that
the original matrix called out as a near-miss.

### Lollipop *(Tier 1)*
**Purpose.** Rank or compare across categories with less ink than a
bar chart. The dot is the value; the stick is just a guide back to
zero.

**Variant ladder.**
1. `sticks` — bare dot-and-stick in input order.
2. `ranked` — descending sort + per-row value label.
3. `paired` — two dots per row (current vs previous); the previous
   value is rendered as a ring so the eye reads the current one
   first.

**Pros & cons.** Works for 4–20 categories. Past ~20 the dots cluster
and the sticks dominate; switch to a sorted `Bar` or a `Treemap`.

**Palette fit.** **Best — Editorial, Wikipedia, Mid-century.** Quiet
engines that reward the smaller ink-load. **Worst — Neumorphism.**
The dot and the surface blur together at low contrast.

### Waffle *(Tier 1)*
**Purpose.** Part-of-whole at a fixed grid — every cell is "one of
N" so percentages read as discrete counts, not areas.

**Variant ladder.**
1. `dots` — round cells; reads as a pictograph.
2. `blocks` — soft-cornered squares; reads tabular, packs denser.
3. `icons` — ring-and-dot pictographs; reads as people, units,
   tickets.

**Pros & cons.** Cells assigned by largest-remainder so the matrix
sums exactly to N×N for any input distribution. Best for ≤6 parts.
Past that, adjacent intent fills become hard to distinguish at a
glance — pick a `Donut` or a sorted `Bar`.

**Palette fit.** **Best — Memphis, Flat, Material.** Saturated
intent fills against the raised surface. **Worst — Glassmorphism.**
Translucency between adjacent cells erases the count.

### Gauge *(Tier 1)*
**Purpose.** Status against a target on a radial dial — the
information density is low on purpose, this is a one-glance KPI tile.

**Variant ladder.**
1. `arc` — single value swept on a 270° arc; optional dashed target
   notch.
2. `zones` — success / warning / danger bands; the value-needle
   inherits the zone color so the *meaning* of "where it landed"
   becomes the message.
3. `full` — closed circle; reads as a progress ring.

**Pros & cons.** Use for one value at a time. Never use as a
comparison tool — humans can't compare angles accurately. Color is
semantic: let the `--color-intent-*` tokens speak.

**Palette fit.** **Best — Skeuomorphism, Material, Cardstock.** The
dial as a literal object; the engine sells it. **Worst — Brutalist,
AAA.** The radial form fights the type-driven engines.

### Heatmap *(Tier 2)*
**Purpose.** Two-categorical matrix coloured by intensity. Distinct
from `CalendarHeatmap`, which is time-on-time; this one is
category-on-category.

**Variant ladder.**
1. `continuous` — single-hue ramp by absolute value; cell labels
   inline at the larger sizes.
2. `diverging` — two-hue ramp around a center (defaults to 0);
   success on positive, danger on negative — canonical correlation
   matrix.
3. `sparse` — only the top tiers ink up; everything else fades.
   Reads as "show me the peaks".

**Pros & cons.** Five tint levels via opacity over the intent
slots. Sweet spot is 5–20 rows × 5–20 cols. Past ~30 in either
direction, cell labels stop fitting — use the `sparse` variant or
reduce to a hexbin.

**Palette fit.** **Best — Wikipedia, Bloomberg, Academic.** Quiet
engines surface the ramp. **Worst — Neumorphism, Sketch.** Soft
surfaces collapse the low tiers.

### Radar *(Tier 2)*
**Purpose.** Compare entities across 3–8 shared dimensions.

**Variant ladder.**
1. `filled` — single polygon, translucent fill.
2. `multiple` — ≤4 overlaid polygons with a legend; alpha drops so
   overlap stays readable.
3. `rings` — concentric reference rings get value labels (the
   "honest" radar — fixes the angle-area bias).

**Pros & cons.** Works for 3–8 axes and 1–4 series. More than 4
series and the polygons overplot; switch to small multiples of
radars or a sorted bar per axis.

**Palette fit.** **Best — Memphis, Aurora, Material.** Strong
categorical hues separate the overlapping polygons. **Worst —
Editorial.** The serif/quiet engines don't have the categorical
contrast budget for overlap.

### Funnel *(Tier 2)*
**Purpose.** Conversion through ordered stages — what fraction of
stage 1 reaches stage N.

**Variant ladder.**
1. `stages` — left-anchored bars, width = share of stage 1.
2. `dropoff` — adds a faded trailing bar that shows what fell out
   between stages, with the step-conversion rate labelled.
3. `mirrored` — the classic centred funnel silhouette.

**Pros & cons.** 3–7 stages is the sweet spot. Past that, the bars
collapse and read as noise — break into multiple funnels by
segment. Order matters semantically; do not sort.

**Palette fit.** **Best — Material, Flat, Memphis.** Strong stage
intents. **Worst — Newspaper, AAA.** The high-contrast engines
amplify the drop-off band into a competing chart.

### Waterfall *(Tier 2)*
**Purpose.** Running total broken into signed contributions
(gain/loss → checkpoint → gain/loss → final).

**Variant ladder.**
1. `simple` — gains green, losses red, dashed connectors between
   bars.
2. `signed` — same with explicit ± value labels.
3. `subtotals` — marked steps span from zero (read as totals); use
   for P&L bridges and budget reconciliations.

**Pros & cons.** 4–12 steps. Past that the bars get skinny and the
connector network starts to dominate. Positive = success intent,
negative = danger intent, subtotals = primary; never reverse this
convention.

**Palette fit.** **Best — Bloomberg, Editorial, Data-dense.**
Financial-report engines. **Worst — Vaporwave, Memphis.** The
loud engines wash out the signed convention.

### Hexbin *(Tier 2)*
**Purpose.** Correlate two variables at high cardinality where
`Scatter` over-plots.

**Variant ladder.**
1. `density` — single-hue ramp, fixed hex size; reads as a heatmap
   of the scatter cloud.
2. `count` — per-bin count printed inside the hex.
3. `sized` — hex radius proportional to count; reads as a
   "sunflower" of density.

**Pros & cons.** Best from ~300 points up to ~10k. Below that, use
`Scatter` directly; above that the bins themselves over-plot and
you want a true 2D KDE. Same tint ladder as `CalendarHeatmap` so
every palette gets the ramp free.

**Palette fit.** **Best — Bloomberg, Aurora, Data-dense.** Calm
backgrounds let the ramp breathe. **Worst — Claymorphism.** The
pastel field eats the lower tiers.

### Violin *(Tier 2)*
**Purpose.** Distribution shape; the encoding `BoxPlot` *doesn't*
give you. Symmetric KDE per series.

**Variant ladder.**
1. `simple` — mirrored violin alone.
2. `withBox` — Q1/median/Q3 box overlaid for precise readouts; the
   "best of both worlds" pairing.
3. `split` — paired half-violins per category, useful for A/B
   comparisons where space is precious.

**Pros & cons.** Needs n ≥ ~80 per series for the KDE to stop
wobbling. Compares ≤6 groups well; past that, switch to small
multiples of histograms.

**Palette fit.** **Best — Academic, Material, Aurora.** The
shape-first encoding wants quiet engines. **Worst —
Neubrutalism.** The thick black borders dominate the KDE curve.

---

## Graph & network visualizations (this iteration)

Ten encodings that all answer "how are these things connected?" but
disagree about which question matters most: *who clusters together?*,
*who flows to whom?*, *where in the tree does this branch live?* The
network row of the matrix is the same row for all of them; the column
is what distinguishes them.

### AdjacencyMatrix *(Tier 2)*
**Purpose.** Network drawn as a matrix: rows and columns are nodes,
cells are edges. Reads as a sortable table — every cell has a fixed
home, so dense graphs that would be a hairball in node-link form
stay legible.

**Data shape.**
```
AdjacencyNode = { id, label, group? }
AdjacencyEdge = { from, to, value? }
```

**Variant ladder.**
1. `binary` — cell on/off; reads as a dependency map.
2. `weighted` — cell tint scales with `value` on a single hue.
3. `clustered` — rows pre-sorted by `group`, intra-cluster cells
   tinted by group intent, inter-cluster cells neutral, cluster
   bands flag the partition.

**Pros & cons.** Sweet spot is 8–60 nodes — past the edge of a
hairball, well before a treemap is needed. The cliff is asymmetric
graphs at scale: row-and-column labels both wanting full names
demand square space the page may not have.

**Palette fit.** **Best — Data-dense, Bloomberg-terminal, Academic.**
Grid-first engines reward the tabular reading. **Worst —
Neumorphism, Glassmorphism.** Cell-to-cell contrast collapses.

### ChordDiagram *(Tier 3)*
**Purpose.** Circular flow between segments — every segment sits on
the outer ring, every link is a ribbon arcing through the center.
Reads as "how much of A's traffic goes where," not as a path.

**Data shape.**
```
ChordNode = { id, label, intent? }
ChordLink = { from, to, value, highlight? }
```

**Variant ladder.**
1. `simple` — uniform ribbon opacity.
2. `weighted` — ribbon opacity scales with link value.
3. `highlighted` — most ribbons dimmed, accent ribbons opaque.

**Pros & cons.** Best for 4–12 segments. Past ~16 the labels collide
and the ribbons overlap themselves so densely that "compare two
ribbons" becomes impossible — switch to a Sankey or an
AdjacencyMatrix.

**Palette fit.** **Best — Material, Bauhaus, Vaporwave.** Saturated
ribbon fills against a luminous ring. **Worst — Newspaper, Editorial.**
The flat fills want hue separation the engine doesn't supply.

### ArcDiagram *(Tier 2)*
**Purpose.** Nodes on a single line, edges as semicircular arcs
above (or as S-curves between two parallel axes on `bipartite`). The
linearisation is the value: it turns "who connects to whom" into a
left-to-right reading.

**Data shape.**
```
ArcNode = { id, label, group?, intent? }
ArcEdge = { from, to, value? }
```

**Variant ladder.**
1. `simple` — uniform arcs, nodes sorted by group.
2. `weighted` — arc stroke encodes value.
3. `bipartite` — two axes, edges cross between groups; reads as a
   matching diagram (people ↔ projects).

**Pros & cons.** Reads at 6–30 nodes. Past that the arcs overlap so
densely that the axis is buried — switch to AdjacencyMatrix or
EdgeBundle.

**Palette fit.** **Best — Editorial, Mid-century, Swiss.** The line
is the dominant element; quiet engines reward it. **Worst —
Brutalist.** Heavy borders dominate the arcs.

### CircularNetwork *(Tier 3)*
**Purpose.** Every node on a single ring, sorted by group so
clusters land adjacent; edges bend toward the center as quadratic
curves. The ring length encodes "distance around the cluster."

**Data shape.**
```
CircularNode = { id, label, group?, weight?, intent? }
CircularEdge = { from, to, value? }
```

**Variant ladder.**
1. `simple` — uniform edges.
2. `weighted` — edge stroke encodes value, node radius encodes
   `weight`.
3. `directed` — weighted plus arrowheads.

**Pros & cons.** Use for 8–24 nodes. Past ~30 the chord field gets
dense enough to require bundling — switch to EdgeBundle.

**Palette fit.** **Best — Memphis, Bauhaus, Material.** Bright group
fills against the ring. **Worst — Glassmorphism.** Translucency
collapses the chord layer.

### Tree *(Tier 2)*
**Purpose.** Strict parent-child hierarchy drawn with right-angle
links — the org-chart / file-tree reading. The intent ladder cycles
by depth so the layers are independently legible.

**Data shape.** Recursive `TreeNode = { id, label, intent?, children? }`.

**Variant ladder.**
1. `vertical` — root at top, depth flows down. Default.
2. `horizontal` — root at left, labels read along the spine
   (file-tree mode).
3. `compact` — smaller padding and node radius for dense trees.

**Pros & cons.** Best up to ~50 nodes. Past that, switch to
Dendrogram (which packs leaves on one axis) or CirclePack (which
trades depth for area).

**Palette fit.** **Best — Wikipedia, Academic, Material.** The
right-angle links read as an explicit hierarchy. **Worst —
CRT-phosphor.** The scanline overlay interferes with the line work.

### Dendrogram *(Tier 2)*
**Purpose.** Hierarchical clustering tree with right-angle bracket
links. Distinct from `Tree` — this is the lab-notebook reading,
where the *height* of each "ㅁ" bracket is meaningful.

**Data shape.** Recursive `DendrogramNode = { id, label, distance?, intent?, children? }`.

**Variant ladder.**
1. `cluster` — horizontal, depth on x, leaves on the right.
2. `radial` — root at center, leaves on the outer ring.
3. `weighted` — bracket x position reflects merge distance, so the
   bracket height *is* the distance between subtrees.

**Pros & cons.** Best for 5–80 leaves. Past that, switch to a
treemap or a CirclePack.

**Palette fit.** **Best — Academic, Wikipedia, Editorial.** Quiet
type-led engines reward the right-angle line work. **Worst —
Neubrutalism, Memphis.** The bracket lines fight the engine pattern.

### Sunburst *(Tier 2)*
**Purpose.** Hierarchy as concentric rings. Each child inherits its
parent's intent and a lighter tint — descendants read as a family
even when the labels won't fit.

**Data shape.** Recursive `SunburstNode = { id, label, value?, intent?, children? }`.

**Variant ladder.**
1. `flat` — innermost ring only, reads as a categorical donut.
2. `nested` — every level drawn, descendants tinted lighter.
3. `labeled` — `nested` plus arc-following labels on slices wide
   enough to read.

**Pros & cons.** Best up to 4 levels and ~40 leaves. Deeper trees
collapse the outer rings to slivers; switch to CirclePack.

**Palette fit.** **Best — Aurora, Memphis, Material.** Saturated
intent fills against the luminous ring. **Worst — Brutalist,
Newspaper.** The radial form fights the type-driven engine.

### CirclePack *(Tier 2)*
**Purpose.** Hierarchy as nested circles, packed with a deterministic
front-chain algorithm. Area encodes value at every level; the tree
shape is implicit in the containment.

**Data shape.** Recursive `CirclePackNode = { id, label, value?, intent?, children? }`.

**Variant ladder.**
1. `flat` — only leaves filled, parent groups read as outlines.
2. `nested` — every level filled, inner levels tint lighter.
3. `labeled` — `nested` plus leaf labels for circles large enough.

**Pros & cons.** Best when leaf values vary widely — the packing
exaggerates the distribution. The cliff is dense, even-valued data,
which packs into a chessboard of similar circles; switch to a
Treemap.

**Palette fit.** **Best — Memphis, Bauhaus, Material.** Saturated
fills celebrate the shape. **Worst — Newspaper.** Mono ink can't
separate adjacent circles without strokes.

### HiveDiagram *(Tier 3)*
**Purpose.** Hive plot — every node sits on one of three radial
axes, with `position` driving distance from the center. Proposed as
an antidote to "hairball" force layouts: every node has a
deterministic place driven by its data attributes.

**Data shape.**
```
HiveNode = { id, label, axis, position, intent? }
HiveEdge = { from, to, value? }
```

**Variant ladder.**
1. `simple` — uniform edges.
2. `weighted` — edge stroke encodes value.
3. `directed` — weighted plus arrowheads.

**Pros & cons.** Reads at 10–80 nodes — well into the range where a
force-directed layout would be a hairball. The cliff is data that
doesn't have three natural axes; don't squeeze a four-axis dataset
into a three-axis hive.

**Palette fit.** **Best — Data-dense, Bloomberg-terminal,
Cyberpunk.** Axis-led engines reward the explicit geometry.
**Worst — Editorial.** Quiet engines underplay the radial scaffold.

### EdgeBundle *(Tier 3)*
**Purpose.** Holten-style hierarchical edge bundling: leaves on a
radial outer ring, edges between leaves routed through their
least-common-ancestor path so the bundle ridges follow the tree
structure. Turns a hairball into a readable flow map.

**Data shape.**
```
EdgeBundleNode (hierarchy) = { id, label, intent?, children? }
EdgeBundleEdge = { from, to, value? }   // between leaves
```

**Variant ladder.**
1. `simple` — raw chord lines; reads as a hairball.
2. `bundled` — pulled toward LCA path (β ≈ 0.82); ridges form.
3. `directional` — bundled, edges inherit the source leaf's intent
   so direction reads as color.

**Pros & cons.** Best for module-dependency graphs and similar
flat-leaves-in-a-tree data. The hierarchy *must* be meaningful —
bundling a flat ring of leaves does nothing, since LCA = root for
every edge.

**Palette fit.** **Best — Material, Tron, Aurora.** Glowing lines
on a dark surface make the ridges sing. **Worst — Newspaper.**
Single-ink engines can't differentiate the bundled flows.

---

### SmallMultiples (primitive) *(declared, not yet implemented)*
A reusable wrapper that takes any single-series viz and renders one
panel per dimension of a multi-key dataset.

### EncodingSwitcher *(declared, not yet implemented)*
One widget; same data; toggles bar / line / heatmap live. The
canonical mix-and-match showpiece — now actually possible since
≥3 encodings ship.

### LinkedViews *(declared, not yet implemented)*
Brush-and-select in one viz updates every other viz on the page.
App-level composition; lives in a future dashboard app.

### AnnotationLayer *(declared, not yet implemented)*
"What changed" overlay: a model identifies inflection points and
labels them. Sits on top of any base encoding.

### Hand-drawn axis *(declared, not yet implemented)*
When the palette is Sketch, the axis stroke is rendered through the
`--stroke-variance` filter so ticks wobble like marker on paper.
Pure palette-driven differentiation.

---

## Palette-fit guidance (across all visualizations)

- **High-density palettes** (Bloomberg-terminal, Data-dense, AAA,
  Flat, Academic) — every viz reads. These are the reference
  palettes against which legibility is judged.
- **Editorial / Wikipedia / Mid-century** — excel at sparse,
  annotated single charts. Multi-series gets noisy in these
  palettes because the contrast budget is spent on type, not on
  hue separation.
- **Pixel-art / CRT-phosphor / Sketch** — engine personality
  dominates. Reserve for showpiece single charts, not dashboards;
  the engine *is* the message.
- **Glassmorphism / Neumorphism / Claymorphism** — translucent /
  low-contrast surfaces actively undermine charts. Document these
  as cautionary palettes per-viz; do not refuse to render — the
  failure is itself teaching content.
- **Cel-shaded** — the ink outline (`--outline-*`) is a feature for
  categorical charts (every bar gets an ink edge), a problem for
  line charts (the line wants to *be* the only ink).

---

## Token contract

Visualizations ship in this iteration **without** modifying the
contract. Series colors cycle through the six existing
`--color-intent-*-bg` slots — the same intents that drive buttons
and badges — which means every palette already supplies them.

When a third visualization needs more than six categorical hues
*without* semantic meaning (a true non-semantic categorical ramp,
as Bloomberg-terminal's amber sequence or Vaporwave's magenta→cyan
gradient suggests), the next iteration adds a focused `data.*`
section to `tokens/semantic.contract.ts`:

```
data: {
  series: { 1..6 }   // ordered hue sequence
  gridline: CssColor // weaker than border.subtle
  axis: CssColor     // explicit alias of content.secondary
  emphasis: CssColor // hover/selection highlight on a mark
}
```

The trigger for that contract change is **a real chart needing it**,
not speculation.
