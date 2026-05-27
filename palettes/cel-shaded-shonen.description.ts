import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-shonen',
  tagline:
    'Saturated shonen-anime triad on the cel-shaded engine — cream paper field, orange/blue/black triad, a 3px ink outline on every edge, and hard-offset two-tone block shadows for shading.',
  summary:
    'Cel-shaded (Shonen) is the canonical register of the `cel-shaded` engine. Every surface reads as a flat-fill ' +
    'cel bounded by a 3px ink outline (`effect.outline.color = #0a0a0a`, `effect.outline.width = 3px`), and ' +
    '`elevation.*` paints two-tone block shadows — single darker offset shapes with no blur (`effect.shadowStyle = hard`). ' +
    "The palette is the protagonist's triad: `#f97316` orange primary, `#3b82f6` sky-blue info, `#fef6e4` cream " +
    'cel-field. Display uses Archivo Black uppercased; body is Inter 500 — the 400-weight gap between titles and ' +
    'dialog is the cel-frame hierarchy.',
  origin:
    'Cel-animated shonen anime — the boys-adventure register codified by Toei, Sunrise, and Pierrot from the ' +
    '1980s onward (Dragon Ball, Naruto, One Piece). The aesthetic resolves character against background with a ' +
    'hard ink line and shades with a single offset darker shape. This palette is the engine-level revival of ' +
    'that grammar, ported to a token contract.',
  signatures: [
    {
      label: 'Hard 3px ink outline on every raised surface and control',
      detail:
        '`effect.outline.color = #0a0a0a` and `effect.outline.width = 3px` — the engine block paints a literal `outline:` halo around interactive controls (Button, Toggle, Checkbox, TextInput) plus the same ink at every `color.border.*` slot. The outline is on at rest, not just on hover; it is the load-bearing cel affordance.',
    },
    {
      label: 'Hard-offset two-tone block shadow on `elevation.*` (`effect.shadowStyle = hard`)',
      detail:
        '`elevation.low` is `3px 3px 0 #0a0a0a` — one ink-black offset shape, zero blur, zero spread. Scales to `8px 8px 0 #0a0a0a, 0 24px 48px rgba(10,10,10,0.35)` at `overlay`. The two-tone shadow is the cel-animation shading convention rendered in CSS.',
    },
    {
      label: 'Saturated shonen triad: orange primary `#f97316`, blue info `#3b82f6`, cream `#fef6e4`',
      detail:
        "Tailwind orange-500 carries `primary` (the protagonist's chakra accent); sky-blue carries `info` and the focus ring; cream `#fef6e4` is the cel field. Every `intent.*.border` is ink so intent fill changes never change the outline.",
    },
    {
      label: 'Archivo Black display uppercased over Inter body (weight 900 vs 500)',
      detail:
        '`typography.family.display` is `"Archivo Black", "Bebas Neue", "Helvetica Neue", Arial Black, sans-serif` at weight 900 with `textTransform: uppercase` on `display` / `title` / `heading` / `label`. Body is Inter at 500. The 400-weight gap is the chapter-title-vs-dialog hierarchy.',
    },
    {
      label: 'Shonen-blue focus ring (`#1d4ed8`) escalates by color, not thickness',
      detail:
        '`effect.focusRing` is `{ width: 3px, offset: 2px, color: #1d4ed8, style: solid }`. The default outline is already 3px ink; focus swaps to blue rather than thickening — so even users with reduced color sensitivity see the boundary change.',
    },
  ],
  antiSignatures: [
    'Soft gaussian drop shadows (`effect.shadowStyle = soft` is what every non-cel palette uses)',
    'A transparent or zero-width outline on raised surfaces — defeats the cel affordance',
    'Pastel pinks / lavenders in `primary` / `info` (that would be the Shojo sister, not Shonen)',
    'Round humanist display like Poppins or Quicksand — Shonen wants the condensed grotesque weight',
    'Mixed-hue shadow colors — the shadow stays pure ink so it reads as "the cel below," not as ambient lighting',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#0a0a0a` — the ink line painted on every interactive control. Every non-cel-shaded palette returns `transparent`.',
    },
    {
      path: 'effect.outline.width',
      note: '`3px` — the cel outline weight. Every non-cel-shaded palette returns `0`.',
    },
    {
      path: 'effect.shadowStyle',
      note: "`hard` — documents that `elevation.*` paints two-tone block shadows. Every non-cel-shaded palette returns `soft`.",
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`3px 3px 0 #0a0a0a` — single offset ink shape, no blur, no spread. The CSS equivalent of cel-frame shading.',
    },
    {
      path: 'color.intent.primary.bg',
      note: "`#f97316` — Tailwind orange-500, the shonen protagonist's accent.",
    },
    {
      path: 'typography.family.display',
      note: 'Archivo Black stack — the shonen-logo weight at 900.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-shojo',
      differentiator:
        'Shojo is the sister palette on the identical engine — same 3px ink outline, same hard-offset shadows, same `shadowStyle: hard`. The difference is purely the color story: Shojo swaps the orange/blue triad for pink (`#ec4899`) and lavender (`#7c3aed`) on a blush field, and the display family softens to round humanist Poppins. Shonen (this palette) commits to saturated primaries and condensed-grotesque Archivo Black.',
    },
    {
      against: 'memphis-80s',
      differentiator:
        'Memphis-80s uses the flat engine and paints hard `1c1c1c` offset shadows too, but every intent is a different saturated primary and decoration comes from squiggle/confetti motifs in the engine. Cel-shaded-shonen renders ink outlines via the dedicated `effect.outline.*` tokens and stays inside the cel-animation grammar — no Memphis confetti.',
    },
    {
      against: 'pixel-art-nes',
      differentiator:
        'Pixel-art-NES uses `effect.pixelGrid` and an 8-bit color clamp; corners are pixel-stepped, type is bitmap. Cel-shaded-shonen uses CSS-native outlines and shadows at full sub-pixel precision and runs proportional Archivo Black / Inter rather than a bitmap face.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers, Toasts — the engine\'s canonical surfaces; outline + offset shadow reads as physical cardstock',
    'Buttons, Toggles, Checkboxes — the outline reads as a precise click target; press shrinks the shadow',
    'Tabs / Segmented / Pagination / Stepper — series-of-options controls read as a clean cel-strip',
    'Bento layouts — each cell becomes a distinct cel with its own ink boundary',
  ],
  degradesWith: [
    'Tables with dense rows — every row\'s ink boundary is too much line at row density',
    'DiffView with character-level highlight — outlines overlap with chunk highlights and read busy',
    'BezierEditor / SpatialCanvas — sub-pixel positioning fights the hard ink edge',
  ],
  recallAliases: ['cel-shaded shonen', 'cel shaded shonen', 'shonen', 'cel-shaded', 'cel shaded', 'anime', 'shounen', 'manga'],
}
