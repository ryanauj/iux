# Terminal / TUI

The character grid IS the layout system. Components position themselves
in CELL units (1ch wide, 1lh tall), borders are real box-drawing
characters (`┌─┐│└─┘`), monospace is the only typeface, and the base
is monochrome with semantic-color text only — default warm-white,
red for errors, amber for warnings, green for success, blue for links.

Anchored on a new `terminal-tui` engine that exercises three contract
slots no previous engine touched:

- `effect.gridUnitX` — the horizontal grid unit. Set to `'1ch'` here;
  every other palette returns `'0'`, which means any engine CSS that
  multiplies / divides the var collapses to a no-op. Emits as
  `--grid-unit-x`.
- `effect.gridUnitY` — the vertical grid unit (`'1lh'`). Same shape.
  Emits as `--grid-unit-y`.
- `effect.borderStyle` — `'css' | 'character'`. Set to `'character'`
  here; every other palette returns `'css'`. This is the **most
  load-bearing addition.** Components read it via container style
  queries (`@container palette style(--border-style: character)`) to
  switch from CSS borders to box-drawing-character outlines. Defining
  the slot on every palette forces every engine to declare its
  rendering mode — even Flat / Material / Aurora have to opt out with
  `'css'`. Emits as `--border-style`.

## The teaching note

**Design tokens can redefine the unit of layout itself.** Most palettes
re-tune existing slots: `space.*` widens (Editorial), `radius.*` snaps
to zero (Neubrutalism), `elevation.*` collapses (Flat / Classic).
Terminal-TUI changes which UNIT a component composes against. The same
`space.*` scale, but expressed in `ch` and `lh` rather than `px`. The
same `border:` rule, but rendered through `┌─┐│└─┘` rather than through
a CSS stroke.

This is what the contract was built for. A palette can swap not just
the values that flow through it but the underlying coordinate system,
and components built against the contract — never against pixels —
land on the new grid without per-component code.

That's the lesson. The other engines decorate; this one redefines.

## Why a new contract slot for `borderStyle`

The three TUI-specific slots are the most invasive contract additions
since `effect.surfaceBy = 'luminance'` shipped with Aurora. The
`borderStyle` slot in particular **touches component code** — Card,
Modal, and Table all needed updates to render the character-corner
glyphs. That's the cost of the engine; absorbing it in the same
session that ships the engine is the honest path.

Components opt into character rendering by:

1. **Always rendering four corner glyph spans in the markup.** Card,
   Modal, and Table have a `<span class="iux-X__corner …" aria-hidden>`
   for each of `tl` / `tr` / `bl` / `br`. The spans contain the
   literal `┌` `┐` `└` `┘` characters.
2. **Hiding the corner spans by default.** Component CSS sets
   `.iux-X__corner { display: none }` at rest — they're invisible on
   every non-TUI palette.
3. **Revealing them under TUI via a `@container` style query.** The
   component CSS includes a block that reads:
   ```css
   @container palette style(--border-style: character) {
     .iux-X__corner { display: block }
     .iux-X { border-color: transparent } /* hide the CSS border */
   }
   ```
4. **Letting CSS line strokes carry the edges.** The horizontal `─`
   and vertical `│` glyphs render as 1px lines in any modern
   monospace font — the same as a 1px CSS border. So under TUI the
   four corners are real characters and the four edges are CSS
   borders set to the same color and width. Visually seamless;
   structurally a hybrid that keeps complexity manageable.

This delivery pattern keeps the engine inside the contract seam: the
token `--border-style: character` is the **trigger**, the component
CSS is the **renderer**, and the engine block in `src/styles.css`
provides the **environment** (`container-name: palette` on the
palette root, plus the monospace font pin).

## What thrives vs degrades vs not-supported

Components that **thrive** under Terminal-TUI:

- **Card, Modal, Table** — the components that received character
  rendering this session. Cards read as ASCII boxes laid over the
  console; modals read as a centered framed dialog (think `dialog(1)`
  on Linux); tables read like `htop` or `top` — single-character grid
  separators, every column boundary on a cell. The Expense log app
  (Table-heavy) is the canonical showcase.
- **Note outliner.** Indentation is character-grid-native — every
  level shifts by `1ch` and the bullets (`•` / `▸` / `▾`) land on cell
  boundaries. Inline-edit ghost text aligns to the cell behind the
  caret. This is the second canonical app for TUI.
- **Task board.** Kanban cards rendered as ASCII boxes are exactly
  how `taskwarrior-tui` / `gitui` draw their column panels. The drag
  affordance becomes "the card outline highlights" rather than "the
  card lifts" — which is more honest about what TUI can express.
- **Button, Toggle, Checkbox, Tabs, Segmented, Pagination, Stepper,
  Tooltip, EmptyState, Sidebar, Bento, Toast.** Anything that
  consumes the standard `space.*` / `border.*` / `intent.*` slots
  lands cleanly. Buttons read as `[ Save ]` (bracket-wrapped); toggles
  read as `[x]` / `[ ]`; tabs read as bracketed labels with the active
  one underlined.

Components that **degrade gracefully** under Terminal-TUI:

- **Habit / streak tracker.** The calendar heat-map grid IS
  character-grid-shaped, lucky alignment — every day cell lands on a
  `1ch` × `1lh` boundary. The intensity gradient collapses onto the
  single semantic-green color (since TUI's monochrome rule reserves
  decorative color for meaning), so the heat-map reads as "filled
  vs. not" rather than "more vs. less," but the underlying structure
  is intact.
- **Recipe / step runner.** Step content is mostly prose, which reads
  fine in mono — just denser than usual. Step cards lose their
  visual "weight" from elevation (TUI flattens every elevation slot)
  so the active step distinguishes itself via the link-blue accent
  on its border rather than via lift.
- **Settings playground.** Token names and values are dense text;
  mono helps with alignment but TUI's narrow space scale crowds the
  Property inspector panel. Workable, not delightful.

Components that are **excluded** from Terminal-TUI:

- **Diagram / flow canvas.** The Spatial canvas component renders
  nodes and edges with fractional-pixel positions and curved bezier
  edges. TUI is fundamentally a character-grid medium; rendering
  arbitrary curves on a `1ch` × `1lh` grid produces ASCII-art
  approximations that fight every other affordance on the page. The
  engine block paints a graceful "TUI is not supported for this app"
  message scoped to `.iux-spatial-canvas` rather than force-rendering
  a broken canvas. The exclusion is **documented, not silent.**
- **Bezier editor.** Same reason as the Diagram canvas — sub-pixel
  control points and anti-aliased curves are an intrinsically
  pixel-based affordance. Not every engine has to work everywhere;
  the contract gives us a clean way to declare "this engine is not
  applicable here."

## Browser support

The character-border rendering depends on **CSS container style
queries** (`@container <name> style(--var: <value>)`), which are
supported in:

- Chrome / Edge 111+ (March 2023)
- Safari 18.0+ (September 2024)
- Firefox 128+ (July 2024)

On browsers that lack support, the `@container style()` block is
ignored — the component falls back to its standard CSS-border
rendering. The TUI palette still looks mono-on-dark-on-grid, just
without the box-drawing-character corners. This is a deliberate
graceful degradation: the contract token `--border-style: character`
emits regardless, and a future code-path could switch to a
data-palette attribute selector for legacy browsers.

The bundled font fallback chain (`Iosevka Term` → `JetBrains Mono` →
`IBM Plex Mono` → OS mono) means there's always a usable monospace
face present, so the layout still reads as a terminal even without
the preferred typeface installed.

## `prefers-reduced-motion`

Trivial under TUI. The engine paints no decorative motion: no scanline
drift (that's CRT), no glow pulse (CRT), no atmospheric gradient
(Aurora), no card lift (Material), no marker wobble (Sketch). The
only motion under TUI is component-level state transitions
(hover / focus colors), and those are already collapsed to `instant`
by the engine-level reduced-motion handler in `src/styles.css`. Users
with reduced-motion preferences see the same character-grid aesthetic
without any visual difference except the state-transition speed.

## Contrast envelope

- `content.primary` (`#e8e6e3`) on `surface.base` (`#0c0e10`): ~16:1 — AAA at body.
- `content.secondary` (78% alpha of primary): ~12:1 — AAA at body.
- `content.muted` (48% alpha of primary): ~7:1 — AAA at body.
- `content.link` (`#74c0fc`) on base: ~7:1 — AAA at body.
- `intent.danger.content` (`#ff6b6b`) on base: ~5:1 — AA at body.
- `intent.warning.content` (`#ffd23f`) on base: ~12:1 — AAA at body.
- `intent.success.content` (`#51cf66`) on base: ~7:1 — AAA at body.
- `border.subtle` against base: ~3:1 — passes graphical-object
  contrast (the minimum AA bar for non-text UI).

The `experimental` a11y tag covers the two real caveats:

1. **Information through color alone.** TUI uses red / amber / green
   for status. Users with red-green colorblindness will need the
   accompanying icon / character cue (e.g. `[!] saved` vs `[x] error`).
   Components should compose intent with a glyph, not lean on the
   intent color alone — which is the project-wide rule (see the CRT
   teaching note).
2. **Density without rest.** The character-cell scale is tight by
   design; users who depend on extra whitespace for cognitive rest
   will find it cramped. The `motion-scale` knob in the showcase
   widens the apparent space scale slightly; production apps should
   offer an "expanded TUI" variant that bumps `space.*` to whole-cell
   multiples.
