import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-citrus',
  tagline:
    'Citrus-pop register on the cel-shaded engine — lemon-cream field, tangerine/lime/teal triad, the same 3px ink outline and hard-offset block shadows as the rest of the family, dialed for a shonen-summer poster read.',
  summary:
    'Cel-shaded (Citrus Pop) is the high-energy register of the `cel-shaded` engine. Engine machinery is identical ' +
    'to the shonen and shojo siblings — every surface carries a 3px ink outline (`effect.outline.color = #0a0a0a`, ' +
    '`effect.outline.width = 3px`), `elevation.*` paints two-tone block shadows (`effect.shadowStyle = hard`), and ' +
    'borders collapse to ink. What changes is the color story: tangerine `#ff9e3d` primary, lime `#9ae635` success, ' +
    'teal `#34d6c4` info, on a lemon-cream `#fffef2` field. Display routes to round-humanist Baloo 2 at weight 800 ' +
    'rather than the shonen Archivo Black, softening the sports-poster read just enough to keep the citrus pop friendly.',
  origin:
    'The summer / sports-tournament register of cel-animated shonen — the saturated-citrus poster grammar used for ' +
    'beach episodes, festival arcs, and shonen sports anime (Haikyuu, Kuroko no Basket, Free!). Same ink-line + ' +
    'two-tone shading recipe as the canonical shonen palette, swapped to a fruit-stand triad. This palette ports ' +
    'that grammar onto the shared cel-shaded engine.',
  signatures: [
    {
      label: 'Tangerine/lime/teal citrus triad: primary `#ff9e3d`, success `#9ae635`, info `#34d6c4`',
      detail:
        '`intent.primary.bg` is tangerine `#ff9e3d` (warmer and softer than shonen orange `#f97316`), `intent.success` is ' +
        'lime `#9ae635`, `intent.info` is teal `#34d6c4`. Every fill carries ink-black content, so the citrus saturation ' +
        'reads as a fruit-stand palette rather than a neon one.',
    },
    {
      label: 'Lemon-cream `surface.base` (`#fffef2`) with a yellow-tinted scrim',
      detail:
        'The cel field reads almost pure white but with a `#fffef2` lemon undertone; `surface.sunken` is `#fbf6dc` for ' +
        "input wells; the modal scrim is `rgba(40, 32, 10, 0.5)` — a warm-brown tint that locks the citrus story even " +
        "in dimmed states. Compare to shonen's cream `#fef6e4`: same family, brighter and yellower.",
    },
    {
      label: 'Same 3px ink outline and hard-offset shadows as the shonen/shojo siblings',
      detail:
        '`effect.outline.color = #0a0a0a`, `effect.outline.width = 3px`, `effect.shadowStyle = hard`. `elevation.low` is ' +
        '`3px 3px 0 #0a0a0a` scaling to `8px 8px 0 #0a0a0a, 0 24px 48px rgba(40, 32, 10, 0.26)` at `overlay`. The engine ' +
        'recipe carries identically — only the color story changes between siblings.',
    },
    {
      label: 'Round-humanist Baloo 2 display at weight 800 (no uppercase transform)',
      detail:
        '`typography.family.display` is `"Baloo 2", "Poppins", "Quicksand", "Helvetica Neue", Arial, sans-serif` at ' +
        'weight 800. Compared to shonen Archivo Black uppercased, Baloo 2 sentence-case reads as a friendly summer-fete ' +
        'banner rather than a tournament logo. Body stays Inter at weight 500.',
    },
    {
      label: 'Teal focus ring (`#0d9488`) one chroma step from the tangerine primary',
      detail:
        '`effect.focusRing` is `{ width: 3px, offset: 2px, color: #0d9488, style: solid }`. Teal escalates cleanly over ' +
        'orange the way shonen-blue escalates over shonen-orange — the focus indicator is one chroma step away from ' +
        'every intent it has to land on.',
    },
  ],
  antiSignatures: [
    'Soft gaussian drop shadows — `shadowStyle` is `hard` in every cel-shaded palette',
    'Transparent or zero-width outline (defeats the cel-frame affordance)',
    'Pink/lavender intents (that is the shojo sister; this palette is citrus-warm)',
    'Condensed grotesque display like Archivo Black uppercased (that is the shonen sister)',
    'Neon-saturated primaries on a pure-white field — the lemon-cream base is load-bearing',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#0a0a0a` ink — identical to every cel-shaded sibling; the engine\'s load-bearing affordance.',
    },
    {
      path: 'effect.outline.width',
      note: '`3px` — the cel outline weight, shared across the family.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — documents that `elevation.*` paints two-tone block shadows rather than diffuse drops.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#ff9e3d` tangerine — the warmer, softer citrus primary that distinguishes this register from shonen orange.',
    },
    {
      path: 'color.intent.success.bg',
      note: '`#9ae635` lime — the second leg of the citrus triad.',
    },
    {
      path: 'color.intent.info.bg',
      note: '`#34d6c4` teal — the third leg; same teal also carries `effect.focusRing.color` (`#0d9488`, a darker step).',
    },
    {
      path: 'color.surface.base',
      note: '`#fffef2` lemon-cream — warmer and brighter than shonen `#fef6e4`.',
    },
    {
      path: 'typography.family.display',
      note: 'Baloo 2 stack at weight 800 — round humanist, sentence-case; replaces shonen\'s Archivo Black uppercased.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-shonen',
      differentiator:
        'Same engine. Shonen runs saturated orange `#f97316` / sky-blue `#3b82f6` / cream `#fef6e4` with Archivo Black uppercased — a tournament-poster read. Citrus (this palette) runs tangerine `#ff9e3d` / lime `#9ae635` / teal `#34d6c4` / lemon-cream `#fffef2` with Baloo 2 sentence-case — the summer-festival read. Engine tokens (`outline.*`, `shadowStyle: hard`, hard-offset elevations) are identical.',
    },
    {
      against: 'cel-shaded-sakura',
      differentiator:
        'Sakura is the spring register — pink/green complementary pair on a petal-white field. Citrus (this palette) is the summer register — tangerine/lime/teal triad on a lemon-cream field. Both ship Baloo 2-ish round-humanist display; the load-bearing difference is the warm-citrus triad vs. the soft pink/matcha pair.',
    },
    {
      against: 'neo-tangerine',
      differentiator:
        'Both center on a citrus-orange primary, but the engines diverge. Neo Tangerine is neubrutalist — zero radius, no ink outline, hard-offset block shadows alone. Citrus (this palette) is cel-shaded — `radius.sm/md/lg = 6/10/16`, every control wrapped in a 3px ink halo via `effect.outline`, and the cooler teal info instead of cobalt blue.',
    },
    {
      against: 'citrus-spark',
      differentiator:
        'Citrus Spark is the flat-engine D2C-brand register — citrus yellow primary, soft warm-tinted drop shadows, zero outline, generous radius. Citrus (this palette) is the cel-shaded register — tangerine primary, hard-offset block shadows, 3px ink outlines, smaller radius. Both warm-citrus, opposite engine.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Toasts — the canonical cel-shaded surfaces; lemon-cream field plus ink outline reads as fruit-stand signage',
    'Buttons / Toggles / Tabs — the ink outline reads as a precise click target; tangerine primary is the loudest possible call-to-action',
    'EmptyState / Tooltip — Baloo 2 at display size reads as a friendly festival title card',
    'Bento layouts — each cell becomes its own colored cel with an ink boundary',
  ],
  degradesWith: [
    'Tables with dense rows — same per-row outline-density problem as the rest of the family',
    'DiffView with character-level highlight — outlines overlap chunk highlights and read busy',
    'Long-form muted-text passages — `content.muted` `#6b6447` on the warm lemon-cream field reads softer than ink and tires the eye at length',
  ],
  recallAliases: ['cel-shaded citrus', 'cel shaded citrus', 'citrus pop', 'citrus-pop', 'cel-shaded', 'cel shaded', 'anime', 'shonen summer'],
}
