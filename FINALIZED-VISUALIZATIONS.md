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

This iteration ships two Tier 1 visualizations: **Sparkline** and
**LineChart**. The other Tier 1 entries (Bar, Histogram) and every
Tier 2/3 entry are declared in this doc and implemented in
follow-ups.

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

### Bar *(declared, not yet implemented)*
Purpose: rank or compare across categories. Tier 1, next iteration.

### Histogram *(declared, not yet implemented)*
Purpose: show the distribution of a single 1-D numeric variable.
Tier 1, next iteration.

---

## Tier 2 — evolved visualizations *(declared, not yet implemented)*

### CalendarHeatmap
Year-grid of daily values; the canonical cyclic-pattern encoding.

### SmallMultiples (primitive)
A reusable wrapper that takes any single-series viz and renders one
panel per dimension of a multi-key dataset.

### StackedArea
Time-series + composition: how the parts of a whole evolve.

### BoxPlot / Violin
Distribution with quartile and density structure.

---

## Tier 3 — showcase differentiators *(declared, not yet implemented)*

### EncodingSwitcher
One widget; same data; toggles bar / line / heatmap live. The
canonical mix-and-match showpiece — only earns its place once at
least three encodings exist.

### LinkedViews
Brush-and-select in one viz updates every other viz on the page.
App-level composition; lives in a future dashboard app.

### AnnotationLayer
"What changed" overlay: a model identifies inflection points and
labels them. Sits on top of any base encoding.

### Hand-drawn axis
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
