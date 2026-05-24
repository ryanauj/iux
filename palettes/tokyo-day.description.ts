import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'tokyo-day',
  tagline:
    'JIS-signage register on the Flat engine — white field, JR-East green / blue + JIS signal red / yellow as the semantic triad, Barlow Condensed display, 4 px grid.',
  summary:
    'Tokyo / Day is the daytime city-infrastructure palette. White field, cool-tinted hairline ' +
    'borders, intents drawn directly from the JIS signage colour system (`#c8102e` signal red, ' +
    '`#ffd400` signal yellow) and the JR-East line palette (`#00b04f` green, `#0084c8` blue). ' +
    '`intent.primary.bg` and `intent.success.bg` both share JR-East green — Tokyo\'s transit ' +
    'signage conflates "go" and "primary". `typography.family.display` is Barlow Condensed, ' +
    'the condensed gothic register Japanese signage favours; body and ui are Inter with ' +
    'Noto Sans JP as the CJK fallback even though the showcase only renders Latin.',
  origin:
    'JIS Z 9101 (Japanese Industrial Standard for safety colours, 1979) and the JR-East line-' +
    'colour palette (formalised across the 1987 privatisation). Tokyo / Day pulls its semantic ' +
    'triad directly from these public-domain standards: the saturated, signage-grade hues are ' +
    'the daytime city colour vocabulary translated into Flat tokens.',
  signatures: [
    {
      label: 'JR-East green `#00b04f` carrying BOTH `intent.primary` and `intent.success`',
      detail:
        '`intent.primary.bg` and `intent.success.bg` share the exact JR-East signage green. The conflation is the load-bearing semantic move — Tokyo signage uses the same green for "go" and "primary" and the palette commits to it.',
    },
    {
      label: 'JIS signal red `#c8102e` carrying `intent.danger`',
      detail:
        '`intent.danger.bg` is the canonical JIS Z 9101 signal red. Not a brand red, not a CSS-friendly red — the specific public-domain emergency colour.',
    },
    {
      label: 'Barlow Condensed display + Noto Sans JP body fallback',
      detail:
        '`typography.family.display` is `"Barlow Condensed", "Oswald", "Roboto Condensed", ...` — the condensed gothic signage register. `family.ui` is `"Inter", "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", ...` — Latin first, CJK fallback ready for production.',
    },
    {
      label: '4 px integer grid throughout',
      detail:
        '`space.*` lands on every integer multiple of 4 from `0` through `64px`. Tighter than Flat / Classic\'s broader scale at the high end — the signage-density feel.',
    },
    {
      label: 'Tightened `radius.*` at the low end (`sm: 2px`, `md: 4px`)',
      detail:
        'Hard-rounded rectangles rather than pill-soft buttons. `radius.lg` keeps `10px` for cards.',
    },
  ],
  antiSignatures: [
    'A blue or violet `intent.primary` — Tokyo / Day commits to green',
    'A pastel or muted intent palette — the signage colours must read saturated',
    'A serif display family (the register is condensed gothic, not serif)',
    'Magazine-style breathing room (`space.*` is tight here)',
  ],
  tokenEvidence: [
    {
      path: 'color.intent.primary.bg',
      note: 'JR-East green `#00b04f` — shared with `intent.success.bg`. The "primary = go" conflation is the register\'s signature.',
    },
    {
      path: 'color.intent.danger.bg',
      note: 'JIS signal red `#c8102e` — the public-domain Japanese signage standard, not a generic CSS red.',
    },
    {
      path: 'color.intent.warning.bg',
      note: 'JIS signal yellow `#ffd400` with near-black `content` (yellow + white falls below AA).',
    },
    {
      path: 'typography.family.display',
      note: 'Barlow Condensed — the condensed gothic signage register.',
    },
    {
      path: 'typography.family.ui',
      note: 'Inter + Noto Sans JP fallback chain — CJK-ready even in a Latin-only showcase.',
    },
  ],
  lookalikes: [
    {
      against: 'flat-classic',
      differentiator:
        'Flat / Classic uses a single saturated blue `#1d4ed8` as `intent.primary` and a system font stack. Tokyo / Day uses a five-colour signage palette (red / yellow / green / blue) with white as the only `surface.base` and condensed gothic display — it commits to signage colour where Flat / Classic stays neutral.',
    },
    {
      against: 'swiss-international',
      differentiator:
        'Swiss / International uses signal red as the only chromatic accent on white + black and zero radius. Tokyo / Day uses four signage colours (not just red), keeps `radius.lg` at `10px` for cards, and uses condensed gothic instead of Akzidenz / Helvetica.',
    },
    {
      against: 'bullet-train-day',
      differentiator:
        'Bullet Train / Day is the same day-transit family but commits to the Shinkansen livery: pale-sky-blue field, deep-navy primary, signal-yellow focus, asymmetric `radius.lg` for forward motion. Tokyo / Day is the broader city-signage register: white field, four-colour signage triad, no directional radius.',
    },
  ],
  thrivesWith: [
    'Buttons and badges — the saturated signage intents stay legible at small sizes',
    'Navigation tabs and pills — the JR-line-colour vocabulary suits transit-style category UI',
    'Dense lists / tables — the 4 px grid + tight `space.*` reads as information-graphic density',
    'Map and wayfinding UI — the palette IS a signage system',
  ],
  degradesWith: [
    'Long-form articles — body text at `0.9375rem` and 4 px grid feels cramped vs Editorial / Wikipedia',
    'Marketing pages that want a single "brand colour" — Tokyo / Day commits to four signage colours, not one',
  ],
  recallAliases: ['tokyo day', 'tokyo', 'jr east', 'jis signage', 'tokyo signage', 'shibuya day'],
}
