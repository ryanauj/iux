import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'sketch-marker',
  tagline:
    'The notebook-margin register — ink-blue body on cream paper, red-marker focus, every edge wobbled by a root-level SVG turbulence filter and every glyph rendered in Patrick Hand / Caveat marker faces.',
  summary:
    'Hand-drawn (Marker) is the canonical palette of the `sketch` engine. The load-bearing visual is the ' +
    'root-level SVG turbulence + displacement filter (`#iux-sketch-wobble`) that recasts every border, glyph ' +
    'outline, focus ring, and shadow stroke as a hand-drawn approximation — its amplitude is documented as ' +
    "`effect.strokeVariance = '1.4px'`. Type runs through `typography.family.hand` (`Patrick Hand` body, Caveat " +
    'for `display` / `title`); `surface.base` is cream `#fbf6e9` and `content.primary` is `#1a2548` ballpoint-ink ' +
    'blue. Elevation is ink-blue-tinted hard-then-soft shadow stacks so cards read as "page lifted off notebook ' +
    'paper" rather than glass.',
  origin:
    "Felt-tip marker on cream notebook paper — the lo-fi sketching register of designer Moleskines, Sharpie " +
    'whiteboards, and rough.js-era browser experiments. The aesthetic predates digital UI by decades and resurfaced ' +
    'as a deliberate counterpoint to crisp flat-design surfaces. This palette is the engine-level revival, ' +
    'delivered via a single SVG filter rather than per-component rough.js canvases.',
  signatures: [
    {
      label: 'Sub-pixel wobble on every stroke (`effect.strokeVariance = 1.4px`)',
      detail:
        'The palette root carries an SVG turbulence + displacement filter (`#iux-sketch-wobble`) tuned to ≈1.4px ' +
        "displacement amplitude. Borders, glyph outlines, focus rings, and shadow edges all inherit the same jitter " +
        "field — buttons sitting next to inputs sitting next to cards share a CONSISTENT hand. Every non-sketch " +
        "palette returns `'0'`, which collapses the engine rule to a no-op.",
    },
    {
      label: 'Marker typography at every role (`typography.family.hand`)',
      detail:
        'Patrick Hand fine-tip carries `body` / `heading` / `subheading` / `label` / `caption` / `code` at weight 400; ' +
        'Caveat brush-marker carries `display` / `title` at weight 700. Body size is bumped to 1.15rem to compensate ' +
        'for Patrick Hand\'s ~0.55em x-height. Every non-sketch palette aliases `family.hand` to its `ui` stack.',
    },
    {
      label: 'Ink-blue body on cream notebook field (`#1a2548` on `#fbf6e9`)',
      detail:
        '`content.primary` is `#1a2548` — what a ballpoint actually looks like on cream paper, not digital `#2563eb`. ' +
        '`surface.base` is `#fbf6e9` notebook cream. `content.muted` lifts to pencil-grey `#8a8676`. Five-marker intent ' +
        'palette: navy, red, green, mustard, teal.',
    },
    {
      label: 'Red-marker focus loop (`focusRing.color = #b3261e`, 3px width, 3px offset)',
      detail:
        '`effect.focusRing` is `{ width: 3px, offset: 3px, color: #b3261e, style: solid }`. The displacement filter ' +
        "turns the crisp red ring into a hand-drawn loop around the focused element — reads as a deliberate " +
        '"circled" affordance against the cream field. Width and offset both 50% above the AAA 2/2 floor to ' +
        'compensate for jitter eating sub-pixel edge contrast.',
    },
    {
      label: 'Ink-blue-tinted elevation rather than neutral cast shadow',
      detail:
        '`elevation.low = 1px 2px 0 rgba(26, 37, 72, 0.35)`, scaling through `medium`/`high`/`overlay` with the same ' +
        'navy-ink tint. Reads as "shadow as a slightly darker patch of ink leaking around the edge" rather than ' +
        'as light-cast shadow.',
    },
    {
      label: 'Intent borders one luminance step darker than their fills',
      detail:
        "Every `intent.*.border` is darker than the `intent.*.bg`. After the displacement pass this reads as 'marker " +
        "outline traced first, ink filled second' — i.e. how a real sketch is built up in layers. The visual cue is " +
        "the same trick a cel-animated frame uses, but rendered through wobble rather than through a hard ink halo.",
    },
  ],
  antiSignatures: [
    'Crisp vector-aliased edges — defeats the wobble that the engine exists to deliver',
    'A geometric sans like Inter, Segoe UI, or system-ui on body — the marker font is load-bearing',
    'Hard offset block shadows in pure ink — that\'s Cel-shaded / Memphis, not Sketch',
    'Engine overlays on top of paper texture (scanlines, glass frost, neon glow)',
    'Pure-black (`#000`) shadow color — Sketch tints toward ink-blue navy',
  ],
  tokenEvidence: [
    {
      path: 'effect.strokeVariance',
      note: '`1.4px` — the wobble amplitude the root-level SVG filter applies to every stroke. Every non-sketch palette returns `0`.',
    },
    {
      path: 'typography.family.hand',
      note: '`"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive` — the marker stack that body / label / caption / code all route through.',
    },
    {
      path: 'typography.family.display',
      note: '`"Caveat", "Bradley Hand", "Marker Felt", cursive` — the brush-marker face for `display` / `title`.',
    },
    {
      path: 'color.surface.base',
      note: '`#fbf6e9` notebook cream — the paper field.',
    },
    {
      path: 'color.content.primary',
      note: '`#1a2548` ballpoint ink — what a real pen looks like on cream paper.',
    },
    {
      path: 'effect.focusRing.color',
      note: '`#b3261e` red marker — the displacement filter turns the ring into a hand-drawn loop.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`1px 2px 0 rgba(26, 37, 72, 0.35)` — ink-blue-tinted, not neutral black. Reads as ink leaking around the edge.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-shonen',
      differentiator:
        'Both register as "hand-drawn cartoon," but Cel-shaded uses a HARD 3px ink outline plus `shadowStyle: hard` ' +
        'two-tone offset shadows — clean cels with crisp edges. Sketch (this palette) uses an SVG turbulence filter to ' +
        '`wobble` every edge and ships marker fonts at every role. Cel-shaded edges are pixel-perfect; sketch edges are ' +
        'never pixel-perfect because the filter displaces them every frame.',
    },
    {
      against: 'risograph',
      differentiator:
        'Risograph also lives in lo-fi paper register but its load-bearing tokens are misregistration offsets, paper-grain ' +
        'texture, and limited-ink overlays — a print process simulation. Sketch-marker simulates the act of drawing: ' +
        'wobbled strokes, marker fonts, and a red-pen focus loop. Different stage of the same notebook.',
    },
    {
      against: 'blueprint',
      differentiator:
        'Blueprint is the technical-drafting register — cyan grid on dark navy field, thin precise hairlines, drafting ' +
        'rules. Sketch-marker is the unstructured-notebook register — cream field, marker glyphs, intentionally imprecise ' +
        'wobbled lines. Blueprint is a finished drawing; Sketch is the doodle next to it.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers, Toasts — strong-wobble filter on raised surfaces sells the "drawn frame on paper" effect',
    'Buttons, Toggles, Checkboxes, Stepper — focusable controls with the red-marker focus loop',
    'Sidebar / Tabs / Segmented / Pagination — hairline dividers become hand-drawn separators for free',
    'EmptyState / Tooltip — Caveat at display size reads as a friendly hand-lettered headline',
  ],
  degradesWith: [
    'Tables with dense rows — adjacent row borders pick up the same turbulence field and briefly read as merged',
    'DiffView with character-level highlight — single-character diffs jitter loose under the displacement pass',
    'VirtualList / long-scroll — root-level `filter:` costs a repaint every scroll position',
    'BezierEditor / SpatialCanvas / continuous Slider — sub-pixel control points fight the engine wobble',
  ],
  recallAliases: ['sketch', 'sketch marker', 'hand-drawn', 'hand drawn', 'marker', 'patrick hand', 'caveat', 'notebook', 'doodle'],
}
