import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'mocha-latte',
  tagline:
    'Warm coffee-shop / third-wave café register on the Flat engine — oat-cream field, mocha-brown primary, cinnamon warning, single cool slate-blue info, Recoleta serif display.',
  summary:
    'Mocha Latte is the modern-café web-presence register on the modern-light Flat-engine grid — warm espresso ' +
    'accents on hand-pressed paper. `surface.base` is oat-cream (`#f5eddd`) with a 4-5% yellow-warm undertone; ' +
    '`intent.primary.bg` is mocha brown (`#6f4b2d`), the espresso-with-cream colour, clearing ≈ 7.5:1 against ' +
    'cream inverse. `intent.warning` is cinnamon (`#c97d2a`); `intent.success` is matcha green (`#5a7c3a`); ' +
    '`intent.info` is cool slate-blue (`#3a5c7c`) — the *only* cool colour on the palette, sitting against ' +
    'everything else for state contrast. `family.display` is Recoleta (Fraunces fallback), a warm transitional ' +
    'serif; `family.body` and `family.ui` route to Inter.',
  origin:
    'The 2010s–2020s third-wave coffee shop and café-brand lane — Blue Bottle, Stumptown, neighbourhood roasters ' +
    'who commission a wordmark and a Squarespace site. The visual vocabulary maps to a printed menu on heavy ' +
    'oat-cream stock with espresso-stained edges, hand-letterpress small caps on category headers, and a single ' +
    'cool note for "open / closed" hours signage.',
  signatures: [
    {
      label: 'Oat-cream field (`#f5eddd`) — espresso-stained paper',
      detail:
        '`surface.base` carries a 4-5% yellow-warm undertone — deeper than Sage Studio\'s bone (`#f3efe6`). The warmer field is what differentiates Mocha Latte: both palettes use warm cream-paper grounds, but Mocha Latte commits to a deeper warmth that the entire chromatic set sits inside.',
    },
    {
      label: 'Mocha-brown `intent.primary` (`#6f4b2d`)',
      detail:
        '`intent.primary.bg` is `#6f4b2d` — the espresso-with-cream colour. With cream inverse content it clears ≈ 7.5:1 (AAA), deeper than Stone Modern\'s charcoal-brown primary but less aggressive than Mall-goth\'s near-black.',
    },
    {
      label: 'Single cool slate-blue `intent.info` against an all-warm palette',
      detail:
        '`intent.info.bg` is `#3a5c7c` — the **only cool colour on the palette**. The warm/cool pairing for `info` is the load-bearing colour discipline: every other intent (primary mocha, warning cinnamon, success matcha, danger signal-red) sits in the warm hue family, so `info` reads as the one "different" state.',
    },
    {
      label: 'Recoleta transitional serif on `display`',
      detail:
        '`typography.family.display` is `"Recoleta", "Fraunces", "DM Serif Text", "Georgia", serif` — a warm modern transitional serif. The Recoleta + Inter pairing is what differentiates this from Stone Modern\'s single-family Söhne grotesque: Mocha Latte commits to a serif display; Stone Modern commits to a single-family grotesque.',
    },
    {
      label: 'Uppercase-tracked labels (`0.08em` + uppercase, weight 600)',
      detail:
        '`typography.role.label` sets `tracking: \'0.08em\'`, `textTransform: \'uppercase\'`, `weight: 600` — the small-caps "menu category" feel modern cafés use on section headers.',
    },
    {
      label: 'Espresso-tinted soft drop shadows on `elevation.*`',
      detail:
        '`elevation.low` is `0 1px 2px rgba(46, 34, 24, 0.08)` — shadow alpha tints toward espresso so cards lift as a saucer above the table-paper field. Scales through `medium` / `high` / `overlay` with the same warm cast.',
    },
  ],
  antiSignatures: [
    'A second saturated cool intent competing with the slate-blue `info`',
    'Single-family geometric grotesque (Inter throughout) — the Recoleta serif display is structural',
    'Pure-white or cool grey-white field — the oat-cream undertone grounds the entire chromatic set',
    'Neutral or cool-tinted shadow alpha — the espresso cast is what reads as "saucer on table paper"',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Oat-cream `#f5eddd` — 4-5% yellow-warm tint, deeper than Sage Studio\'s bone.' },
    { path: 'color.intent.primary.bg', note: 'Mocha brown `#6f4b2d` — espresso-with-cream, ≈ 7.5:1 against cream inverse.' },
    { path: 'color.intent.warning.bg', note: 'Cinnamon `#c97d2a` — second warm note, same hue family as primary.' },
    { path: 'color.intent.success.bg', note: 'Matcha `#5a7c3a` — intentionally shared with Sage Studio as a cross-palette anchor.' },
    { path: 'color.intent.info.bg', note: 'Slate-blue `#3a5c7c` — the *only* cool colour on the palette.' },
    { path: 'typography.family.display', note: 'Recoleta / Fraunces — warm transitional serif on display.' },
    { path: 'typography.family.ui', note: 'Inter — geometric sans for body and labels.' },
    { path: 'elevation.low.boxShadow', note: '`0 1px 2px rgba(46, 34, 24, 0.08)` — espresso-tinted shadow alpha.' },
  ],
  lookalikes: [
    {
      against: 'sage-studio',
      differentiator:
        'Same modern-light Flat-engine recipe with a warm-paper field, a transitional-serif display, and Inter on body. Sage Studio commits to bone (`#f3efe6`, 2-3% yellow) with deep-sage primary and Fraunces display. Mocha Latte commits to oat-cream (`#f5eddd`, 4-5% yellow-warm) with mocha-brown primary and Recoleta display. The two palettes intentionally share the matcha-green `intent.success` (`#5a7c3a`) as a cross-palette anchor in the warm-paper register family.',
    },
    {
      against: 'stone-modern',
      differentiator:
        'Both palettes commit to warm-brown registers and tracked-uppercase labels. Stone Modern is the modern-retail register: warm-stone field, charcoal-brown primary, single-family Söhne grotesque, near-square `radius` (`sm = 2px`), hairline-ring elevation. Mocha Latte is the café register: warmer oat-cream field, mocha-brown primary, Recoleta serif display + Inter body, widened `radius` (`sm = 4px / md = 10px`), soft drop shadow elevation.',
    },
    {
      against: 'editorial',
      differentiator:
        'Both palettes use a transitional serif on display and Inter on body over a warm-paper field. Editorial is the magazine register: deeper editorial typography hierarchy, body sized for long-form reading, no chromatic accent vocabulary beyond a single ink. Mocha Latte is the café branding register: rounded `radius` scale, full intent vocabulary (mocha + cinnamon + matcha + slate), espresso-tinted elevation.',
    },
  ],
  thrivesWith: [
    'Café and restaurant brand sites — the Recoleta + oat-cream pairing reads as menu print',
    'Long-form Inter running text on `surface.raised` — the warm field stays comfortable',
    'Marketing pages with tracked-uppercase section headers',
  ],
  degradesWith: [
    'Dense data dashboards (the warm-only chromatic set fights chart category colour, except for the single slate `info`)',
    'Cool-modern productivity registers — the espresso warmth reads as too "branded"',
  ],
  recallAliases: ['mocha', 'mocha latte', 'café', 'cafe', 'coffee shop', 'third wave', 'espresso'],
}
