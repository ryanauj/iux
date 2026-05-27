import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-shojo',
  tagline:
    'Shojo-anime register on the cel-shaded engine — blush-cream field, pink/lavender/cream pastel intents, the same 3px ink outline and hard-offset two-tone shading as the shonen sister, plus round-humanist Poppins display.',
  summary:
    'Cel-shaded (Shojo) is the pastel-register sister of Cel-shaded (Shonen). The engine is identical — every ' +
    "surface carries a 3px ink outline (`effect.outline.color = #0a0a0a`), `elevation.*` paints hard-offset block " +
    'shadows (`effect.shadowStyle = hard`), and `color.border.*` is ink across the board. What changes is the ' +
    "palette: `surface.base` is a warm `#fff5f9` blush wash, `intent.primary.bg` is `#ec4899` shojo-pink, `info` " +
    'is lavender `#a78bfa`, and display routes to Poppins / Quicksand / Comfortaa (round humanist) with the ' +
    'uppercase transform dropped — shojo logo type is sentence-case rounded.',
  origin:
    'Cel-animated shojo anime — the girls-romance register codified by Studio Pierrot, Madhouse, and Toei from ' +
    'the 1990s onward (Sailor Moon, Cardcaptor Sakura, Fruits Basket). The aesthetic uses the same ink-outline + ' +
    'two-tone-shading grammar as shonen but warms the field, swaps the primary triad for pinks/lavenders/sky, ' +
    'and softens the display lettering. This palette mirrors that swap on top of the shared engine.',
  signatures: [
    {
      label: 'Pink/lavender/cream pastel palette in place of the shonen orange/blue triad',
      detail:
        "`intent.primary.bg = #ec4899` (the heroine's blush), `intent.info.bg = #a78bfa` (the dream-sequence aura), " +
        '`content.link = #db2777` shojo-pink. The cel field is `#fff5f9` blush rather than `#fef6e4` cream. Same ' +
        'engine, different color story.',
    },
    {
      label: 'Same 3px ink outline as the shonen sister (`effect.outline.color = #0a0a0a`)',
      detail:
        'The cel-shaded engine\'s load-bearing affordance carries identically: `effect.outline.width = 3px`, ink at every ' +
        '`color.border.*` slot. The pastel palette never softens the outline — the warm field plus ink line is the ' +
        'shojo register, the way cream plus ink is the shonen register.',
    },
    {
      label: 'Hard-offset block shadows on `elevation.*` (`effect.shadowStyle = hard`)',
      detail:
        '`elevation.low = 3px 3px 0 #0a0a0a`, scaling to `8px 8px 0 #0a0a0a, 0 24px 48px rgba(76,29,95,0.30)` at `overlay`. ' +
        'The secondary diffuse drop at `overlay` is plum-tinted to match the shojo scrim rather than the shonen ink wash.',
    },
    {
      label: 'Round-humanist Poppins display, sentence-case (no uppercase transform)',
      detail:
        '`typography.family.display` is `"Poppins", "Quicksand", "Comfortaa", "Helvetica Neue", Arial, sans-serif` at weight ' +
        '800. Compared to shonen: the condensed grotesque heavy face is replaced by round humanist heavy display, AND ' +
        'the `textTransform: uppercase` is dropped from display roles. Shojo logo type is sentence-case rounded.',
    },
    {
      label: 'Lavender focus ring (`#7c3aed`) against the pink intent palette',
      detail:
        '`effect.focusRing` is `{ width: 3px, offset: 2px, color: #7c3aed, style: solid }`. Lavender reads cleanly against ' +
        'pink/cream fills the way shonen-blue reads against orange — the focus indicator is one chroma step away from ' +
        'every intent it has to escalate over.',
    },
    {
      label: 'Slightly softer radius scale than shonen (`sm: 6px`, `md: 10px`, `lg: 16px`)',
      detail:
        'Shonen sets `sm/md/lg` at `4/8/12`; shojo bumps to `6/10/16`. Cels can have gentler curves and the shojo ' +
        'register favors them — but the outline is still on, the shadow is still hard. The radius nudge is the only ' +
        'engine-non-load-bearing difference.',
    },
  ],
  antiSignatures: [
    'Saturated orange `#f97316` primary or sky-blue `#3b82f6` info (that is the Shonen sister)',
    'Soft gaussian shadows — `effect.shadowStyle` is still `hard` in shojo',
    'Uppercased display roles — shojo drops the transform',
    'Condensed grotesque display fonts like Archivo Black or Bebas Neue — shojo uses round humanist Poppins',
    'A transparent or zero-width outline — same cel affordance as shonen',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#0a0a0a` — identical to shonen; the cel-shaded engine\'s load-bearing ink line.',
    },
    {
      path: 'effect.outline.width',
      note: '`3px` — identical to shonen.',
    },
    {
      path: 'effect.shadowStyle',
      note: "`hard` — `elevation.*` paints two-tone block shadows.",
    },
    {
      path: 'color.intent.primary.bg',
      note: "`#ec4899` shojo-pink — replaces shonen's `#f97316` orange.",
    },
    {
      path: 'color.intent.info.bg',
      note: '`#a78bfa` lavender — the dream-sequence aura, replaces shonen sky-blue.',
    },
    {
      path: 'color.surface.base',
      note: '`#fff5f9` blush wash — replaces shonen cream `#fef6e4`.',
    },
    {
      path: 'typography.family.display',
      note: 'Poppins / Quicksand / Comfortaa stack — round humanist, weight 800, sentence-case.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-shonen',
      differentiator:
        'Same engine, different register. Shonen runs orange `#f97316` / blue `#3b82f6` / cream `#fef6e4` with Archivo Black uppercased; Shojo (this palette) runs pink `#ec4899` / lavender `#a78bfa` / blush `#fff5f9` with Poppins sentence-case. Engine tokens (`effect.outline.*`, `effect.shadowStyle = hard`, hard-offset elevations) are identical — the brief is to prove the engine generalizes the same way the CRT pair (green ↔ amber) does.',
    },
    {
      against: 'memphis-80s',
      differentiator:
        'Memphis-80s also uses hard-offset block shadows and ink-black borders, but every intent is a different SATURATED primary (hot pink, cyan, yellow, tomato, neon green) and decoration is squiggle/confetti motifs from the engine. Cel-shaded-shojo stays pastel and uses `effect.outline.*` to paint a literal cel halo on every control.',
    },
    {
      against: 'risograph',
      differentiator:
        'Risograph shares the pastel + cream feel, but it paints misregistration offsets, paper-grain texture, and limited-ink overlays via its own engine signals. Cel-shaded-shojo paints a single crisp ink outline and a single hard offset shadow per surface — no grain, no misregistration, no overprint.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers, Toasts — same canonical surfaces as the shonen sister',
    'Buttons, Toggles, Checkboxes — outline reads as a precise click target',
    'Tabs / Segmented / Pagination — series-of-options controls read as a cel-strip',
    'EmptyState / Tooltip — Poppins at display size reads as a friendly shojo title card',
  ],
  degradesWith: [
    'Tables with dense rows — same row-density problem as the shonen sister',
    'DiffView with character-level highlight — outlines overlap with chunk highlights',
    'BezierEditor / SpatialCanvas — sub-pixel positioning fights the hard ink edge',
  ],
  recallAliases: ['cel-shaded shojo', 'cel shaded shojo', 'shojo', 'shoujo', 'cel-shaded', 'cel shaded', 'anime', 'manga'],
}
