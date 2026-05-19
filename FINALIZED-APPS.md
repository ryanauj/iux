# FINALIZED-APPS

Seven small apps. The component library and the palette library are the
ingredients; these apps are the recipes. Each one composes Tier 1 and
Tier 2 components from `FINALIZED-COMPONENTS.md`, demonstrates a couple
of flow strategies (how state moves and persists), and showcases
**exactly one** Tier 3 differentiator so the showcase has a reason for
that component to exist.

Each app:

- **Purpose** — one line, what it solves for the user.
- **Components composed** — the Tier 1 / Tier 2 inventory it ships with,
  drawn straight from `FINALIZED-COMPONENTS.md` (rung numbers in
  parens where a specific rung is required).
- **Flow strategies** — how the app moves data: where state lives, what
  is optimistic, what touches `Store`, what reflects to the URL.
- **Tier 3 differentiator** — the *one* showpiece Tier 3 component this
  app makes a teaching argument for.
- **Persistence** — the `Store` keys this app reads and writes. Every
  app goes through the contract; no direct `localStorage`.
- **Palette fit** — which palettes flatter the app, which clash, and
  *why*. This is teaching content, not decoration: each pairing names
  the specific token slot the engine either nails or undermines.

The seven Tier 3 differentiators are assigned 1:1. Three Tier 3
components (Bezier editor, Presence layer, Diff/merge view) do not get
a dedicated showcase app in this round; they ride along in the
component gallery and may anchor future apps.

---

## 1. Task board — kanban

**Purpose.** Drag cards across columns to move work through stages.
The canonical "moving thing through space changes its meaning" UI.

**Components composed.**
- `Card` (4) — Draggable card with handle, drop zones, ghost preview.
- `Button` (1, 2) — column add / per-card actions.
- `TextInput` (2) — inline add-a-card field at the bottom of each column.
- `Tooltip` (1) — keyboard-shortcut hints for drag with `space`/arrows.
- `Toast` (4) — long-running async ("Moving 12 cards…") with progress.
- `Modal` (1) — card detail (title, description, due).
- `EmptyState` (2) — "No cards in *Done* yet" with a CTA to drag one in.
- `Sidebar` (2) — board list, collapsible groups for archived boards.

**Flow strategies.**
- *Optimistic moves.* A drop commits immediately to local state; the
  store write fans out under it. If anything ever fails, the undo
  toast restores the prior column.
- *Single document per board.* The whole board (columns + ordered card
  ids + card payloads) is one value under one key. No multi-key
  atomicity worry — the contract gives last-write-wins per key and
  that's enough for a single-author board.
- *URL routing.* The active board's id is in the path; opening a card
  pushes a search param so a shared URL re-opens that card on load
  (matches `Modal` rung 4).

**Tier 3 differentiator.** **Optimistic action with undo** (rung 3 —
action queue). Drag, archive, re-order, and column-rename are all
queued, each independently undoable from the toast tray. The teaching
argument: the drag affordance and the undo affordance together replace
the confirmation modal — and this app exists to make that argument
visible.

**Persistence.**
- `boards:list` — `string[]` of board ids.
- `boards:<id>` — the whole board document.

**Palette fit.**
- **Best — Material.** `elevation.medium` and `elevation.high` are
  exactly what a kanban card needs: a resting plane, a lift on drag, a
  drop preview. The "paper-and-ink" metaphor *is* a kanban.
- **Best — Flat / Classic.** High contrast across `color.surface.base`
  vs `surface.raised` makes the column / card boundary unambiguous,
  which is what drag-and-drop needs above everything else.
- **Best — Neubrutalism.** `borderWidth.heavy` on each card means there
  is *never* a question about which card you're picking up. The hard
  offset shadow on `elevation.low` reads as "this thing has weight."
- **Worst — Neumorphism.** This is the canonical failure case. The
  engine sets `color.surface.base` ≈ `color.surface.raised` and relies
  on paired inner+outer shadows to distinguish them. Drag a card and
  the shadow detaches with it, so the column it left looks the same
  as the column it landed in. Drag affordance dies without contrast.
- **Worst — Glassmorphism.** Translucent cards over a translucent
  column over a saturated page bleed into one another; "which column
  is the card over" becomes a guessing game.
- **Worst — Claymorphism.** `radius.lg` rounded into a gumdrop reads
  as a button, not a draggable card; the inflated shadow on every
  surface flattens the elevation difference a kanban depends on.

---

## 2. Note outliner

**Purpose.** Nested bullet notes, keyboard-first. Tab to indent,
shift-tab to outdent, enter to split a node, `/` to invoke commands.

**Components composed.**
- `TextInput` (4) — inline ghost-text autocomplete (mention `@person`,
  link `[[note]]`, accept on Tab).
- `Button` (2) — block-level action buttons in the gutter (toggle done,
  collapse subtree).
- `Tooltip` (2) — shortcut chips on every gutter action.
- `Checkbox` (3) — node-level checkmarks with indeterminate parent
  when some children are done.
- `EmptyState` (4) — generative empty state: starter outline with three
  example bullets the user can edit in place.
- `Toast` (2) — "Outdented 12 bullets — Undo".
- `Modal` (3) — slash-command details (e.g., "convert subtree to table").

**Flow strategies.**
- *Single document, structured value.* The whole outline is one
  `Store` value: a tree of `{ id, text, children, done }`. Edits patch
  the tree and `set` the whole value; granularity is fine because the
  outline rarely exceeds tens of kilobytes.
- *Debounced writes.* Keystrokes mutate in-memory state immediately;
  the `set` is debounced ~300ms so a fast typist doesn't thrash the
  backend. The undo log is keystroke-grained even though the store
  isn't.
- *Subscribe for cross-tab edits.* `subscribe('outlines:<id>')` so
  opening the same note in two tabs reflects edits both ways without
  custom plumbing.

**Tier 3 differentiator.** **Command palette** (rung 3 — multi-step
actions). `/` opens an inline palette. "Move to top," "indent all
children," "convert to checklist," "export," "search across all
notes" — each is a single keystroke and each can ask follow-up
questions in place. Teaching argument: a thoughtful command palette
*is* the menu bar for keyboard-first apps.

**Persistence.**
- `outlines:list` — ordered ids.
- `outlines:<id>` — the tree.

**Palette fit.**
- **Best — Editorial.** Serif `typography.role.heading` + warm paper
  `color.surface.base` makes a long outline read like a notebook page,
  not a settings screen. Outlining is reading-shaped work.
- **Best — High-Contrast AAA.** A keyboard-first outliner lives or
  dies by the focus ring. AAA's 3px solid ring on every input is
  perfect; nothing else matches its keyboard legibility.
- **Best — Flat / Classic.** Indentation is the only thing on screen
  that needs to *be* something; flat fills don't compete with it.
- **Worst — Tron / Dark-Neon.** `typography.role.code` is uppercase
  and the body face is HUD-y. Prose in a HUD is illegible at length —
  outlines are mostly prose.
- **Worst — Skeuomorphism.** Textured `color.surface.raised` (felt,
  leather) becomes a screaming background under a long indented list;
  the texture wins, the tree loses.
- **Worst — Neubrutalism.** `typography.role.display` is heavy
  condensed and `borderWidth.heavy` everywhere ruins the gentle
  indentation cue an outliner needs.

---

## 3. Habit / streak tracker

**Purpose.** Track daily yes/no habits. A heat-map shows the year; a
streak counter rewards consecutive days.

**Components composed.**
- `Toggle` (1, 2) — today's binary "did it / didn't" with the
  explicit "saving…" microstate.
- `Card` (1) — one card per habit, with the streak number and the
  heat-map strip.
- `Button` (1) — add habit, archive habit.
- `Modal` (1) — habit detail with rename, color, history.
- `Tabs` (1) — `Today` / `Week` / `Year`.
- `EmptyState` (3) — onboarding checklist: "add your first habit,"
  "mark today," "come back tomorrow."
- `DatePicker` (2) — back-date a missed entry.

**Flow strategies.**
- *Two-tier persistence.* `habits:list` holds metadata. `habits:<id>:log`
  holds the binary log as a packed string (one char per day). Reads
  are cheap; one habit-log key per habit means a write does not
  contend with another habit's writes.
- *Local-first by default.* The app encourages turning on the
  "Persist locally" toggle on first run; until then the daily check
  resets at refresh, which is the right teaching beat for the
  `MemoryStore` default.
- *Subscribe for the streak readout.* The streak number subscribes
  to the log key so a daily mark updates every habit card without
  app-wide re-render.

**Tier 3 differentiator.** **Timeline scrubber** (rung 2 — snap
markers, adaptive ticks). Scrub the year strip and the streak readout,
the calendar view, and the heat-map all reflect the moment. Teaching
argument: a timeline is not just for video — any "value over time"
view earns one. The scrubber is one component; this app proves it.

**Persistence.**
- `habits:list` — habit metadata.
- `habits:<id>:log` — packed daily log.

**Palette fit.**
- **Best — Claymorphism.** The streak badge wants to feel like a
  gumdrop reward. `radius.lg` and the doubled `elevation` slot deliver
  it. A heat-map cell as a soft pastel works because it isn't trying
  to be data, it's trying to be a sticker.
- **Best — Material.** `motion.duration.fast` + ripple on Toggle is
  the satisfying "I did it" tap for a habit app.
- **Best — Flat / Classic.** The heat-map is the whole point. Flat's
  single accent on a neutral grid is the textbook GitHub-contributions
  read.
- **Worst — High-Contrast AAA.** AAA refuses decorative color, but a
  habit heat-map *is* decorative color — six shades of the accent
  encode quantity. AAA collapses every shade to its single accent;
  the heat-map becomes a one-bit grid.
- **Worst — Neumorphism.** Heat-map cells need contrast within a
  small color range. Neumorphism deliberately gives you near-zero
  contrast across `color.surface.*`; six shades of green become one
  shade of green.

---

## 4. Expense log

**Purpose.** Type "$12 lunch yesterday," get a structured entry.
Browse by category, by month, by anything. Add up.

**Components composed.**
- `Table` (3, 4) — virtualized + inline-editable rows; resizable,
  sticky header, column visibility menu.
- `InlineEditCell` (3) — autosave with dirty/saving/saved microstates
  on every editable column.
- `TextInput` (2, 3) — affixed currency input with masked formatting.
- `Select` (3) — searchable combobox for category with "+ add new" tail.
- `DatePicker` (3) — range picker with presets ("This month").
- `Pagination` (3) — cursor-based "load more" past 500 rows.
- `Toast` (2) — "Deleted row — Undo".
- `Segmented` (1) — `Income` / `Expense` / `All` filter.

**Flow strategies.**
- *Append-mostly log.* Each entry is its own key (`expenses:<id>`).
  Edits write back to that key; deletes remove it. `list('expenses:')`
  is the index. This is the one app where the multi-key access pattern
  matters and the `list(prefix)` primitive earns its keep.
- *Aggregation in app code.* Sums, category rollups, and monthly
  buckets are computed client-side from the listed entries. The store
  is dumb; the app is smart. (No `where` clause is part of the
  contract for a reason.)
- *Local-first persistence default.* "Where my money goes" is exactly
  the data class users want on their own machine. The app defaults
  to local storage if available; the Settings playground toggle lets
  them turn it off.

**Tier 3 differentiator.** **Natural-language input bar** (rung 4 —
disambiguation). The single bar at the top of the app parses `$12
lunch yesterday`, shows the structured chips, and on ambiguous input
("dinner with Sam — splitting?") offers chip-style alternatives
inline before commit. Teaching argument: structured input through a
prose bar is the right shape for "I want to add this fast and I don't
want to fill a form."

**Persistence.**
- `expenses:<id>` — one per entry.
- `expenses:categories` — user-defined category list.

**Palette fit.**
- **Best — Flat / Classic.** A long table of numbers wants flat fills
  and a single accent for the running total. Anything else competes
  with the data.
- **Best — High-Contrast AAA.** AAA was built for this — tabular,
  high-contrast, large body type. Reading a column of dollar amounts
  is its native form.
- **Best — Editorial.** Serif numerals look great in a long ledger;
  Editorial widens `space.*` so rows breathe. Reads like a balance
  sheet instead of a spreadsheet.
- **Worst — Tron / Dark-Neon.** `textTransform: 'uppercase'` on
  `typography.role.code` mangles currency formatting; "$1,247.85"
  goes uppercase and the comma/period stop reading.
- **Worst — Claymorphism.** A row of pastel gumdrop cells cannot
  tabulate. Numbers want a sharp baseline; clay rounds it off.
- **Worst — Glassmorphism.** Translucent rows over a translucent
  surface destroy column scanning — the eye needs a flat baseline to
  follow a number down a column.

---

## 5. Diagram / flow canvas

**Purpose.** Place nodes, connect them with edges. Pan, zoom, group,
arrange. The "draw the system on the wall" UI.

**Components composed.**
- `Card` (4) — node bodies with drag handles.
- `Button` (1) — toolbar (add node, add edge, zoom-to-fit).
- `Tooltip` (1, 2) — shortcut chips on every toolbar action.
- `Modal` (1) — node-detail edit.
- `TextInput` (2) — node label inline edit.
- `Segmented` (3) — switch tools (select / connect / pan) with
  animated indicator.
- `Sidebar` (3) — resizable layer / group panel, collapsible to rail.
- `EmptyState` (2) — "Empty canvas — drag a node in."

**Flow strategies.**
- *Whole-canvas document.* `canvases:<id>` holds `{ nodes, edges,
  viewport }`. The canvas is one key. Auto-save is debounced on
  every drag-end (not every drag-tick).
- *Local viewport.* The pan/zoom of the *current viewer* is not
  persisted to the canvas document — it lives under a separate key
  (`canvases:<id>:viewport`) so two devices can have their own view
  of the same diagram.
- *Selection in URL.* The selected node id reflects to the URL so
  link-sharing jumps to the right node.

**Tier 3 differentiator.** **Infinite / spatial canvas** (rung 3 —
place / move / select objects, marquee, group). This is the namesake
component for this app and the most direct map between component and
app in the showcase.

**Persistence.**
- `canvases:list`, `canvases:<id>`, `canvases:<id>:viewport`.

**Palette fit.**
- **Best — Tron / Dark-Neon.** Dark canvas + neon focus ring on the
  selected node is precisely what `effect.focusRing.style: 'glow'`
  was designed for. The selection cue reads at 10% zoom.
- **Best — Flat / Classic.** Edges are lines; nodes are rectangles
  with one accent. Flat is the diagram default for a reason.
- **Best — Skeuomorphism.** Paper-grain `color.surface.base` reads as
  a drafting sheet; the brushed-metal toolbar reads as an actual tool
  bench. The metaphor *is* the value here.
- **Worst — Glassmorphism.** Translucent nodes over a translucent
  canvas over a saturated page is three layers of "where does this
  end" — and you can't draw an arrow between two things if you don't
  know where either one stops.
- **Worst — Neumorphism.** `color.border.*` is deliberately near-invisible
  in this engine. A diagram is *all border*. Nodes melt into the canvas;
  edges have nowhere to attach.
- **Worst — Claymorphism.** Inflated radius means every node looks
  like every other node; the canvas reads as a sea of identical jelly
  beans rather than a system with distinct parts.

---

## 6. Recipe / step runner

**Purpose.** Walk a user through a recipe (or any step-by-step
procedure) one instruction at a time, hands-free where possible.

**Components composed.**
- `Stepper` (3) — branching steps for optional variations.
- `Checkbox` (2) — per-ingredient tick-off; per-step substep checklist.
- `Button` (2) — `Next` / `Previous`, with `loading` if the next
  step lazy-loads media.
- `Card` (2) — media card per step (image / video with overlayed timer).
- `Modal` (1) — "Confirm: skip this step?"
- `Tabs` (1) — `Ingredients` / `Steps` / `Notes`.
- `Toast` (4) — timer countdown with a progress bar that *is* the
  real cook timer.
- `EmptyState` (1) — "No recipes yet — paste a URL or write one."

**Flow strategies.**
- *Resumable progress.* `recipes:<id>:progress` holds `{ step,
  completedSubsteps, timerStartedAt }`. Closing the app mid-recipe
  and reopening it resumes where you were — and the timer math works
  off `Date.now() - timerStartedAt`, not a wall-clock countdown that
  loses time when the tab sleeps.
- *Read-mostly recipes.* The recipe itself rarely changes; the
  progress is the hot key. Two-key split matches the contract's
  "one document per concern" guidance.
- *URL-reflected step.* The current step id is in the path so a
  shared link drops the recipient at "step 3 of carbonara."

**Tier 3 differentiator.** **Spotlight / coachmark overlay** (rung 3 —
anchor-aware). The current step is *literally* spotlit: everything
else on screen dims, the active step card gets a cutout, and if the
step's anchor element scrolls out of view the spotlight follows.
Teaching argument: a step runner is a guided tour of the recipe; the
coachmark component is the right tool, and we get to use it for
something more interesting than a one-time onboarding tour.

**Persistence.**
- `recipes:list`, `recipes:<id>`, `recipes:<id>:progress`.

**Palette fit.**
- **Best — Editorial.** A recipe is a cookbook page; warm paper,
  serif headings, ink-black body type is the format. Editorial was
  born for it.
- **Best — Material.** Step cards with `elevation.medium` and a
  ripple on `Next` give the satisfying mechanical-flip-of-a-page feel.
- **Best — Claymorphism.** Friendly pastels read as warmth; the
  recipe runner is the rare app where "soft and cute" is appropriate.
- **Worst — Tron / Dark-Neon.** A neon HUD is the wrong vocabulary
  for "stir until thickened." Cold sci-fi in a kitchen is a category
  error.
- **Worst — Neubrutalism.** Clashing fills and `typography.role.display`
  set to heavy condensed make every step shout. Reading a recipe is
  calm work; brutalism refuses to be calm.
- **Worst — Skeuomorphism.** Tempting (a wooden cutting-board
  background!), but in practice the texture defeats the very small
  text the runner uses for ingredient quantities. The teaching beat
  here is "the metaphor is good, the legibility cost is real."

---

## 7. Settings playground

**Purpose.** The meta app. Browse every palette, see every component
in it, flip every contract token, watch the showcase change. Hosts
the global "Persist locally: on/off" toggle (the one switch in the
whole repo that calls `SwitchableStore.swap`).

**Components composed.**
- `Select` (2) — palette picker (10 entries, grouped A / B).
- `Toggle` (2) — "Persist locally: on/off" with the explicit
  saving microstate while the store migration completes.
- `Tabs` (3) — `Surface` / `Color` / `Typography` / `Motion` /
  `Effect` token groups, overflowing into a "more" menu on narrow.
- `Slider` (2, 4) — sliders for sizing tokens (space scale, radius
  scale), and a curve slider where a motion duration's track is the
  easing curve.
- `Segmented` (3) — A11y filter (`pass` / `experimental` / `all`).
- `Tooltip` (3) — rich tooltip on every token slot showing the
  current value and the slot's description.
- `Modal` (4) — route-bound: "show me Material's `elevation.medium`"
  is a shareable URL.
- `Sidebar` (4) — search-first sidebar: top input opens a
  command-palette-style filter across every palette, component, and
  token.
- `EmptyState` (1) — "No palette matches that filter."

**Flow strategies.**
- *The mode toggle is the contract's escape valve.* The toggle reads
  and writes a single key (`store:mode`) and calls
  `SwitchableStore.swap(createStore(nextMode))`. Apps never see the
  swap; subscribers re-fire automatically.
- *Live re-theming.* Selecting a palette writes
  `theme:active` and every component re-renders against the new
  `SemanticTokens` via the existing `PaletteRoot` boundary. The
  playground proves the contract holds across every palette ×
  component pair.
- *Deep-link everything.* The active palette, the highlighted token
  slot, and the selected component all reflect to the URL so a link
  shares the exact view.

**Tier 3 differentiator.** **Property inspector panel** (rung 4 —
constraint-aware). The right-side inspector edits the selected
token slot, and dependent slots react in real time: pick a focus
ring `style: 'glow'` and `width` becomes a derived computed value;
change `surface.base` and the `intent.*` contrast warnings update
inline. Teaching argument: the property inspector is the right
component for "edit a structured value with rules attached," and a
playground for design tokens is exactly that. It also doubles as a
preview of how an app's own settings screen ought to be built.

**Persistence.**
- `store:mode` — `'memory' | 'local' | 'remote'`. The mode toggle
  reads and writes this key directly; it is the one key with
  privileged meaning to the contract itself.
- `theme:active` — the active palette id.
- `settings:layout` — sidebar width, collapsed groups (the same data
  `PropertyInspector` would otherwise reach into `localStorage` for —
  this app is where that ad-hoc usage gets retired).

**Palette fit.**
- **Best — Flat / Classic.** The playground is a calibration tool;
  flat fills and a single accent is the right baseline against which
  the *other* palettes get evaluated. Always launches here on first
  open.
- **Best — High-Contrast AAA.** Token names and values are dense
  text; AAA's larger body and 3px focus rings make every slot
  reachable by keyboard, which is how serious users actually drive a
  token inspector.
- **Best — Material.** The inspector panel is the textbook Material
  surface — `elevation.high`, soft transitions, a clear hierarchy
  between the canvas and the panel.
- **Worst — Neumorphism.** This is the rare worst case the showcase
  *uses* productively: launching the playground in Neumorphism is the
  exit route. The "Persist locally" toggle's track and thumb both
  collapse into the surface; users can't see whether the toggle is
  on. The fix is to switch palettes — which they can only do here.
  The teaching beat is "this is what `experimental` means."
- **Worst — Neubrutalism.** Heavy borders on every micro-control turn
  the inspector into a wall of black rectangles; the field-by-field
  density a token playground needs disappears under the borders.
- **Worst — Tron / Dark-Neon.** Token *names* are prose. Uppercase
  HUD type on `color.surface.raised` makes every label harder to read
  than its value, which inverts the whole point of a labeled
  inspector.

---

## Cross-cutting notes

- **Every app talks to `Store` only.** No app file in this list reaches
  for `window.localStorage` or any other transport. The persistence
  layer is `storage/store.contract.ts`; the rule is enforced by lint
  (see `PERSISTENCE-CONTRACT.md` § Lint enforcement).
- **Every app survives in `MemoryStore`.** State is lost on reload —
  but the app works. This is the property that makes the showcase
  embeddable in sandboxed artifact previews without special-casing.
- **The Settings playground is privileged in exactly one way:** it is
  the only app allowed to call `SwitchableStore.swap`. Every other
  app sees a stable `Store` for the life of the page.
- **Tier 3 coverage.** 7 apps × 1 Tier 3 differentiator each = 7 of
  the 10 Tier 3 components anchored to a real use case. Bezier
  editor, Presence layer, and Diff/merge view ride along in the
  gallery this round; the next round of apps (collaborative
  whiteboard, version-controlled doc, animation editor) will pick
  them up.
