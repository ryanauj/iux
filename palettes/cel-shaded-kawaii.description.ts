import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-kawaii',
  tagline:
    'Candy-pastel register on the cel-shaded engine — mint-white field, sweet pink/mint/sky/lemon pastels, the same 3px ink outline and hard-offset block shadows as the rest of the family, softer radius for the plush-toy read.',
  summary:
    'Cel-shaded (Kawaii) is the sweet-pastel register of the `cel-shaded` engine. The engine recipe is identical to ' +
    'the shonen / shojo siblings — every surface carries a 3px ink outline (`effect.outline.color = #0a0a0a`), ' +
    '`elevation.*` paints two-tone block shadows (`effect.shadowStyle = hard`), and borders collapse to ink. The ' +
    'distinguishing move is the candy palette: bubblegum pink `#ff8ac4` primary, mint `#5ce6a8` success, sky ' +
    '`#7cc6ff` info, lemon `#ffe066` warning, on a mint-white `#f6fffb` field. Radius is bumped to `sm/md/lg = 8/14/20` ' +
    'for the rounded plush-toy read, and display routes to Baloo 2 / Quicksand sentence-case.',
  origin:
    'The kawaii branch of anime/manga design — Sanrio, Crayon Shin-chan merchandise, sticker-book aesthetics, and ' +
    'the broader Harajuku candy-pastel palette. Same ink-line + two-tone-shading grammar as cel-shaded shonen, but ' +
    'tuned toward a soft confectionery register where every intent is a pastel and every corner is gentler. This ' +
    'palette is the engine-level revival of that grammar.',
  signatures: [
    {
      label: 'Sweet pastel set across every intent: pink/mint/sky/lemon, all with ink content',
      detail:
        '`intent.primary.bg = #ff8ac4` bubblegum pink, `intent.success.bg = #5ce6a8` mint, `intent.info.bg = #7cc6ff` sky, ' +
        '`intent.warning.bg = #ffe066` lemon. Every fill carries `#0a0a0a` content. The combination of pastel saturation and ' +
        'ink-on-pastel text is the kawaii sticker-book read; replacing any intent with a deeper color breaks it.',
    },
    {
      label: 'Mint-white `surface.base` (`#f6fffb`) with a cool-mint scrim',
      detail:
        'The cel field is mint-white `#f6fffb` (cooler than shonen cream, fresher than shojo blush); `surface.sunken` ' +
        "is `#e6fbf1`; the modal scrim is `rgba(15, 60, 47, 0.5)` — a deep-mint tint rather than the warm-brown of " +
        "the citrus sibling or the plum of shojo. The field is what makes the candy palette read as cool-sweet rather than warm-sweet.",
    },
    {
      label: 'Same 3px ink outline and hard-offset shadows as the rest of the cel-shaded family',
      detail:
        '`effect.outline.color = #0a0a0a`, `effect.outline.width = 3px`, `effect.shadowStyle = hard`. `elevation.low` is ' +
        '`3px 3px 0 #0a0a0a` scaling to `8px 8px 0 #0a0a0a, 0 24px 48px rgba(15, 60, 47, 0.28)` at `overlay`. The pastel ' +
        'palette never softens the outline — sweet plus ink is the kawaii register, the way cream plus ink is shonen.',
    },
    {
      label: 'Softer radius scale than shonen/shojo (`sm: 8px`, `md: 14px`, `lg: 20px`)',
      detail:
        'Shonen runs `4/8/12`, shojo bumps to `6/10/16`, kawaii bumps further to `8/14/20`. Corners get gentler as the ' +
        'register sweetens; the cel outline is still on, the shadow is still hard. The radius nudge is the only engine-' +
        'non-load-bearing difference from the siblings.',
    },
    {
      label: 'Pink focus ring (`#ff8ac4`) matching the primary instead of contrasting it',
      detail:
        '`effect.focusRing` is `{ width: 3px, offset: 2px, color: #ff8ac4, style: solid }` — the focus ring uses the ' +
        'primary pink itself. The kawaii palette has enough chroma variance across intents that focus reads cleanly ' +
        'over any of them without needing a contrasting color step.',
    },
  ],
  antiSignatures: [
    'Soft gaussian drop shadows — every cel-shaded palette uses `shadowStyle: hard`',
    'A transparent or zero-width outline (defeats the cel-frame affordance)',
    'Saturated tournament-orange `#f97316` or sky-blue `#3b82f6` primary (that is the shonen sister)',
    'Condensed grotesque display like Archivo Black uppercased — kawaii is round humanist sentence-case',
    'Deep jewel-tone intents like garnet, royal blue, or forest green — the kawaii register stays pastel across the board',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#0a0a0a` ink — identical to every cel-shaded sibling.',
    },
    {
      path: 'effect.outline.width',
      note: '`3px` — the shared cel outline weight.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — documents the two-tone block-shadow engine recipe.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#ff8ac4` bubblegum pink — softer and cooler than the shojo `#ec4899` magenta primary.',
    },
    {
      path: 'color.intent.success.bg',
      note: '`#5ce6a8` mint — the pastel-green leg of the candy set.',
    },
    {
      path: 'color.surface.base',
      note: '`#f6fffb` mint-white — distinguishes kawaii from shojo blush `#fff5f9` and shonen cream `#fef6e4`.',
    },
    {
      path: 'radius.lg',
      note: '`20px` — softer than the shojo `16px` and shonen `12px`; the gentlest cel-shaded radius in the family.',
    },
    {
      path: 'typography.family.display',
      note: 'Baloo 2 / Quicksand / Poppins / Comfortaa stack — round humanist sentence-case.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-shojo',
      differentiator:
        'Shojo is the romance-pastel register — pink + lavender + cream `#fff5f9` on the dream-sequence story. Kawaii (this palette) widens the pastel set to pink + mint + sky + lemon on a cooler mint-white `#f6fffb` field, and the radius is gentler (`8/14/20` vs. `6/10/16`). Shojo commits to one warm pastel pair; kawaii is the full sticker-book set.',
    },
    {
      against: 'cel-shaded-sakura',
      differentiator:
        'Sakura is the spring register — blossom pink against matcha green on a warm petal-white field. Kawaii (this palette) is cooler and broader: pink against mint, sky, AND lemon, on a mint-white field. Sakura is two seasonal colors; kawaii is the candy aisle.',
    },
    {
      against: 'soft-pastel',
      differentiator:
        'Soft Pastel is a flat-engine pastel palette — soft drop shadows, no ink outline, gentle borders. Kawaii (this palette) is the cel-shaded engine — every control wrapped in a 3px ink halo and an offset block shadow. Same color temperature, opposite engine grammar.',
    },
    {
      against: 'pixel-art-cottagecore',
      differentiator:
        'Pixel-art Cottagecore uses `effect.pixelGrid` and a bitmap-typography register on a soft cottage palette. Kawaii (this palette) uses CSS-native outlines and shadows at sub-pixel precision and runs proportional Baloo 2 / Inter. Same softness, different render grammar.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Toasts, Tooltips — the canonical cel-shaded surfaces in their sweetest form',
    'Buttons, Toggles, Checkboxes — pastel fill + ink outline reads as a sticker-book button',
    'Onboarding / EmptyState — Baloo 2 at display size plus mint-white field reads as a friendly welcome card',
    'Avatar / Tag / Badge — the pastel set works as a per-user / per-category color story',
  ],
  degradesWith: [
    'Tables with dense rows — same per-row outline-density problem as the rest of the family',
    'DiffView / code editors — pastel fills plus character-level highlights collide',
    'Financial dashboards / data-dense screens — the candy register reads as not-serious by construction',
  ],
  recallAliases: ['cel-shaded kawaii', 'cel shaded kawaii', 'kawaii', 'pastel anime', 'sticker', 'sanrio', 'cel-shaded', 'cel shaded', 'anime'],
}
