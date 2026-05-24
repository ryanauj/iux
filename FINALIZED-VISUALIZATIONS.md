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

This iteration ships twelve visualizations spanning all three tiers:

- **Tier 1.** `Sparkline`, `LineChart`, `Bar`, `Histogram`, `Donut`, `Area`.
- **Tier 2.** `Scatter`, `CalendarHeatmap`, `StackedArea`, `BoxPlot`, `Treemap`.
- **Tier 3.** `Sankey`.

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
