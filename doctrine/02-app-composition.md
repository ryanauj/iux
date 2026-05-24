# App composition

The pipeline from "we want to build something that does X" to a working showcase app, with the choices that matter at each step.

## Hard rules

1. **Intent first, palette last.** A palette is the surface you paint on; choosing it first is choosing a paintbrush before deciding what to paint. Apps that start palette-first end up bending the intent to fit the surface.
2. **One metaphor per app.** Spatial (kanban, canvas), temporal (timeline, schedule), or documentary (outline, doc, table). Apps that try to be two metaphors at once teach neither.
3. **The load-bearing component is the one whose failure breaks the app.** Pick it before any other primitive. Everything else supports it.
4. **The palette must not undermine the load-bearing component.** Every app in [`FINALIZED-APPS.md`](../FINALIZED-APPS.md) lists its palette-fit rationale; that section is not decoration — it is the failure-mode catalogue.

## The pipeline

```
intent  →  metaphor  →  load-bearing component  →  supporting primitives  →  palette
```

Walk it forward; do not skip. Skipping intent and starting at metaphor is the "we want to build a kanban" failure — kanban is a metaphor that fits *some* intents, not a starting point.

### Step 1 — Name the user intent

One verb, one object. "Move work through stages." "Capture nested thoughts." "Track time across a project." If the intent needs a paragraph, the app is two apps.

Test: state the intent in eight words or fewer. If you can't, you don't understand the intent yet.

### Step 2 — Choose the metaphor

Three families, picked by what the user is *manipulating*:

- **Spatial.** Position changes meaning. Kanban, canvas, board.
- **Temporal.** Time is the axis. Timeline, schedule, history.
- **Documentary.** The artifact is text or structure the user reads top-to-bottom. Outliner, doc, table.

The metaphor decides which Tier 3 differentiator the app argues for. Spatial apps reach for `Spatial canvas` or `Card` rung 4 (draggable); documentary apps reach for `Inline-edit cell` or `Command palette`; temporal apps reach for `Timeline scrubber`.

### Step 3 — The load-bearing component

The single primitive whose failure ends the app. In Kanban, it is the draggable `Card` (rung 4). In the outliner, it is the inline-edit affordance plus the keyboard-driven indent/outdent. Identify it explicitly; *write it down*. The rest of the composition is in service of it.

Test: if you removed every component except this one, is the app's core gesture still possible? If yes, you have the load-bearing component. If no, you haven't found it yet.

### Step 4 — Supporting primitives

Pick the lightest rungs of the supporting primitives that the load-bearing component needs in context. Defaults:

- `Button` (1–2) for column actions, save, dismiss.
- `TextInput` (2) for inline create / rename.
- `EmptyState` (2) for the "nothing here yet" surface.
- `Toast` (4) for async progress; pair with `Optimistic action with undo` (Tier 3) for any destructive action.
- `Modal` (1) only for true interruptions.

Read [`01-component-selection.md`](./01-component-selection.md) before reaching for a heavier primitive than the rung-1 default.

### Step 5 — Palette fit

Open [`FINALIZED-APPS.md`](../FINALIZED-APPS.md) and read the palette-fit section of the closest existing app. The rationales there are concrete: every "Best" and "Worst" names the token slot the engine nails or undermines. Choose a palette whose engine *flatters* the load-bearing component.

Rules of thumb:

- If the load-bearing component depends on contrast between `surface.base` and `surface.raised`, Neumorphism is disqualified.
- If it depends on a drag-lift affordance, Material / Flat / Neubrutalism are the candidates.
- If it depends on edge clarity at small text, Pixel-art and Sketch are disqualified.

## Case studies

- **Kanban** (see [`FINALIZED-APPS.md`](../FINALIZED-APPS.md)). Intent: "move work through stages." Metaphor: spatial. Load-bearing: `Card` (4) drag. Supporting: `Button`, `TextInput`, `Toast` (4), `Sidebar` (2), `EmptyState` (2). Palette: Material / Flat / Neubrutalism. Failure: Neumorphism kills drag affordance — drag the card, the shadow leaves with it, the column it left looks identical to the one it landed in.
- **Note outliner** (see [`FINALIZED-APPS.md`](../FINALIZED-APPS.md)). Intent: "capture nested thoughts." Metaphor: documentary. Load-bearing: keyboard-driven indent + inline-edit cell. Supporting: `Command palette` (Cmd+K), `EmptyState`, `Tooltip`. Palette: Editorial / Flat / AAA — anything that gives clean text edges at small sizes. Failure: Sketch's wobble at character-cell width.

Every one of the seven apps in [`FINALIZED-APPS.md`](../FINALIZED-APPS.md) is a walked instance of this pipeline; read the rest there.

## Anti-pattern: starting from a palette

"We love Glassmorphism — what should we build?" is the wrong question. The palette has no opinion about user intent. Apps that start palette-first are how you get a kanban built in Neumorphism: the surface looked beautiful in isolation; the gesture stopped working.

If a palette excites you, treat it as a *constraint*: which intents does this palette flatter? Walk back to Step 1 with that as a filter.

## What this doc is not

- Not a list of apps to build; that is [`FINALIZED-APPS.md`](../FINALIZED-APPS.md).
- Not a tutorial on writing component code; this is a doctrine doc for composition decisions.
- Not a manifesto on metaphors in UI; it names three families and uses them.
- Not a substitute for reading the palette-fit sections of [`FINALIZED-APPS.md`](../FINALIZED-APPS.md). Those are the concrete training data; this doc is the index over them.
