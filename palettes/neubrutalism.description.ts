import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'neubrutalism',
  tagline:
    'Web Neubrutalism — zero elevation, zero radius, clashing vibrant intent fills, near-black borders doing all the depth work, and snap-to-grid linear motion.',
  summary:
    'Neubrutalism strips the engine to its loudest possible signals: every `radius.*` collapses to `0`, every ' +
    '`elevation.*` slot is `{ boxShadow: "none" }`, and motion crashes to 40–90ms linear ramps. Depth is carried ' +
    'by `borderWidth.heavy` (`4px`) over the near-black `color.border.strong` (`#0a0a0a`), with vibrant clashing ' +
    'intent fills (hot pink `#ff3ec9` primary, neon green `#3aff85` success, yellow `#ffd84d` warning) all ' +
    'pinned to a single near-black content color. Display type is Archivo Black at weight 900, uppercased.',
  origin:
    'The post-2020 web-design revival of architectural Brutalism — flat raw shapes, exposed structure, anti-polish ' +
    'aesthetics that emerged on Dribbble and design Twitter as a reaction against the post-Material consensus. ' +
    'Drew from Memphis, anti-design, and dev-blog Tailwind experiments; this palette is the elevation-stripped ' +
    'register documented in the README (the engine description also permits a hard-offset shadow variant).',
  signatures: [
    {
      label: 'Zero elevation, zero radius across all slots',
      detail:
        'Every `radius.*` from `sm` through `lg` resolves to `0`; every `elevation.*` slot from `low` through `overlay` is `{ boxShadow: "none" }`. Depth cannot come from shadow or curve — it has to come from the border. This is the load-bearing Neubrutalism cue.',
    },
    {
      label: 'Heavy 4px borders over near-black (`#0a0a0a`)',
      detail:
        '`borderWidth.heavy` is `4px`; `border.subtle`, `border.default`, and `border.strong` all collapse to the same `#0a0a0a` near-black. Cards, buttons, and inputs read as stamped outlines rather than floating panels.',
    },
    {
      label: 'Clashing vibrant intent fills with a single near-black content color',
      detail:
        'Hot pink `#ff3ec9` primary, neon green `#3aff85` success, yellow `#ffd84d` warning, red `#ff4d4d` danger, cyan `#5cd6ff` info — all six intent backgrounds carry the same `#0a0a0a` content. The chromatic clash is the point; legibility comes from the near-black ink, not from intent restraint.',
    },
    {
      label: 'Archivo Black display, Space Grotesk UI',
      detail:
        '`typography.family.display` is `"Archivo Black", "Helvetica Neue", Arial Black, sans-serif` and `family.ui` is `"Space Grotesk"`. `display`/`title` weights are 900, uppercased, with negative tracking — the loudest possible chrome.',
    },
    {
      label: 'Snap-to-grid linear motion (40–90ms)',
      detail:
        '`motion.duration.fast/base/slow` is `40ms / 60ms / 90ms`, and every easing entry (`standard`, `in`, `out`, `inOut`, `spring`) is `linear`. There is no curve, no overshoot — interactions feel like binary state flips.',
    },
    {
      label: '4px hot-pink focus ring with zero offset',
      detail:
        '`effect.focusRing` is `{ width: 4px, offset: 0, color: #ff3ec9, style: solid }` — the ring kisses the element edge, matches the primary intent fill, and is twice the thickness of flat-classic\'s 2px ring.',
    },
  ],
  antiSignatures: [
    'Any non-zero `elevation.*` shadow (no soft drop shadows, no inset rims)',
    'Any non-zero `radius.*` value (rounded corners defeat the stamped-shape look)',
    'A single conservative accent like flat-classic\'s indigo (the point is clashing color)',
    'Spring or eased motion curves (Neubrutalism is linear and snap)',
    'System-stack typography (Archivo Black + Space Grotesk are loadbearing)',
  ],
  tokenEvidence: [
    {
      path: 'elevation.low.boxShadow',
      note: '`none` — and every other elevation slot is also `none`. The elevation-stripped variant is what makes this the canonical web-Neubrutalism register.',
    },
    {
      path: 'radius.lg',
      note: '`0` — every radius slot collapses, including `lg`. Stamped shapes, not rounded panels.',
    },
    {
      path: 'borderWidth.heavy',
      note: '`4px` — the heavy border carries the depth work that elevation refuses to do.',
    },
    {
      path: 'color.border.strong',
      note: '`#0a0a0a` near-black — and `border.subtle`/`default` are the same color. Borders are uniform and loud.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Hot pink `#ff3ec9` — paired with `content: #0a0a0a` (not white). The vibrant fill + near-black ink is the chromatic signature.',
    },
    {
      path: 'typography.family.display',
      note: '`"Archivo Black"` stack — condensed, weight-900-by-construction display font.',
    },
    {
      path: 'motion.easing.standard',
      note: '`linear` — and every other easing entry is also `linear`. No curve at all.',
    },
    {
      path: 'effect.focusRing.width',
      note: '`4px` — twice flat-classic\'s ring, with zero offset so it hugs the element edge.',
    },
  ],
  lookalikes: [
    {
      against: 'flat-classic',
      differentiator:
        'Flat-classic is the conservative unornamented baseline — soft drop shadows, single indigo accent, system font, 2px focus ring. Neubrutalism strips elevation entirely, swaps in 4px black borders, uses six clashing intent fills, and ships Archivo Black on display.',
    },
    {
      against: 'material',
      differentiator:
        'Material spends its budget on a five-step paired-shadow elevation ladder. Neubrutalism refuses elevation entirely — every `elevation.*` slot is `none`. The shared move is "ship a font on display," but Material ships Roboto (paper-and-ink) and Neubrutalism ships Archivo Black (loud-and-stamped).',
    },
    {
      against: 'memphis-80s',
      differentiator:
        'Memphis-80s and Neubrutalism share the clashing-color, anti-restraint instinct, but Memphis decorates with shapes, patterns, and squiggles. Neubrutalism is structural — heavy borders, stamped rectangles, zero ornament — closer to architectural raw concrete than to 80s pattern.',
    },
    {
      against: 'bauhaus',
      differentiator:
        'Bauhaus is the historic primary-color geometric ancestor — restrained, modernist, formal. Neubrutalism inherits the primary palette instinct but pushes it into clashing neons and adds the heavy-border anti-polish that Bauhaus would have rejected as undisciplined.',
    },
  ],
  thrivesWith: [
    'Buttons and badges — the heavy-border + flat-fill recipe was built for them',
    'Landing-page hero blocks — Archivo Black at 3rem reads as intended chrome',
    'Cards with clashing intent fills — the chromatic clash is the design',
    'Single-screen marketing pages where loud is correct',
  ],
  degradesWith: [
    'Long-form reading — 500-weight body type on saturated fills tires the eye',
    'Dense forms — 4px borders eat real estate and the linear motion makes inputs feel unresponsive',
    'Calendars and data tables — the per-cell heavy border becomes visual noise',
    'Anything that needs to feel "premium" or trustworthy — Neubrutalism reads as anti-corporate by construction',
  ],
  recallAliases: ['neubrutalism', 'new brutalism', 'web brutalism', 'brutalism', 'brutalist web'],
}
