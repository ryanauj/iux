import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'metro-light',
  tagline:
    'Transit-map information-graphic on the Flat engine — near-white field, hairline "track-rule" borders carrying every raised surface, MTA / NYC-subway line-colour palette as the `intent.*` vocabulary, Helvetica throughout.',
  summary:
    'Metro / Light translates the NYC MTA Standards Manual (Unimark / Vignelli, 1970) and ' +
    'related transit-map information-graphics into Flat tokens. `surface.base` is `#fcfcfc`; ' +
    'raised surfaces lift via a 1 px hairline track-rule (`#e6e6e6`) rather than a drop shadow. ' +
    'Intents take their colours from the NYC subway line palette: `#ee352e` red (1/2/3 line) ' +
    'as `intent.primary`, `#00933c` green (4/5/6) as `success`, `#ff6319` orange (B/D/F/M) as ' +
    '`warning`, `#0039a6` blue (A/C/E) as `info`. Helvetica carries every type role.',
  origin:
    'The NYC MTA Graphics Standards Manual (Unimark International, 1970, designed by Massimo ' +
    'Vignelli and Bob Noorda) plus the London Underground roundel system (Frank Pick / Edward ' +
    'Johnston, 1916–) and Tokyo Metro\'s line-colour palette (1970s). Metro / Light is the ' +
    'generic transit-map register: hairline-bordered map regions, single-family Helvetica, ' +
    'category colour as the load-bearing semantic vocabulary.',
  signatures: [
    {
      label: 'Hairline "track-rule" border carrying every raised surface',
      detail:
        '`elevation.low` is `0 0 0 1px #e6e6e6` — a 1 px box-shadow stroke, no soft penumbra. Cards / panels / inputs all lift via the rule alone. `elevation.overlay` (modals) is the only slot that adds a soft drop shadow on top of the rule, so floating panels lift above the map plane.',
    },
    {
      label: 'NYC-subway line-colour palette in `intent.*`',
      detail:
        '`intent.primary.bg` is `#ee352e` (1/2/3 line red); `intent.info.bg` is `#0039a6` (A/C/E line blue); `intent.success.bg` is `#00933c` (4/5/6 line green); `intent.warning.bg` is `#ff6319` (B/D/F/M line orange). The vocabulary is the load-bearing semantic move — Metro / Light is a transit-map colour system applied as UI intents.',
    },
    {
      label: 'Helvetica on every typography role',
      detail:
        '`typography.family.ui` and `family.display` both resolve to `"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif`. No serif, no condensed, no second face — Helvetica does every job at different sizes and weights. The two-family split most palettes use collapses to one family here.',
    },
    {
      label: 'Bold-weight display (`700`) and bold-weight subheading / label',
      detail:
        '`role.display.weight` is `700`; `role.subheading.weight` is `700`; `role.label.weight` is `700`. Transit-map type is sized AND weighted — Vignelli\'s manual specifies bold sans throughout, never regular-weight headings.',
    },
    {
      label: 'Near-white `surface.base` (`#fcfcfc`) — not pure white',
      detail:
        'A half-step off pure white so the hairline rules read against the field. Pure white would make the 1 px stroke visually disappear at small zoom levels.',
    },
  ],
  antiSignatures: [
    'Soft drop shadows on `elevation.low` — the track-rule must carry the lift',
    'A serif display family — the register is single-family Helvetica',
    'A single saturated "brand" intent colour — the line-colour palette is multi-hue by design',
    'Regular-weight display headings — the register is bold throughout',
  ],
  tokenEvidence: [
    {
      path: 'elevation.low.boxShadow',
      note: '`0 0 0 1px #e6e6e6` — the track-rule. No soft penumbra. The single most-load-bearing token in the palette.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'NYC subway 1/2/3 line red `#ee352e` — public-domain MTA standard.',
    },
    {
      path: 'color.intent.info.bg',
      note: 'NYC subway A/C/E line blue `#0039a6`.',
    },
    {
      path: 'typography.family.ui',
      note: 'Helvetica stack — the canonical transit-map type, Vignelli\'s 1970 manual specification.',
    },
    {
      path: 'typography.role.display.weight',
      note: '`700` — bold, not regular. Transit signage is sized AND weighted.',
    },
  ],
  lookalikes: [
    {
      against: 'wikipedia',
      differentiator:
        'Wikipedia also uses hairline borders on raised surfaces and a pale near-white field, but commits to serif display (Linux Libertine) + sans body and a single MediaWiki link blue `#3366cc` as `intent.primary`. Metro / Light uses Helvetica everywhere, the NYC-subway multi-colour line palette as `intent.*`, and bolder weight throughout.',
    },
    {
      against: 'tokyo-day',
      differentiator:
        'Tokyo / Day uses a four-colour signage palette and Barlow Condensed display; Metro / Light uses a multi-colour line palette and Helvetica throughout. Tokyo / Day still lifts cards with a soft drop shadow; Metro / Light uses a hairline rule alone.',
    },
    {
      against: 'swiss-international',
      differentiator:
        'Swiss / International uses signal red as the ONLY chromatic accent and zero radius across the board. Metro / Light uses the multi-colour line palette and keeps `radius.lg` at `10px` — the difference between "Swiss poster" and "transit map".',
    },
  ],
  thrivesWith: [
    'Map and wayfinding UI — the palette IS a transit-map colour system',
    'Category-tagged lists (status badges in NYC-line colours) — the multi-hue intents map directly',
    'Pill-shaped station tags using `radius.full` — what the type and colour vocabulary are designed for',
    'Cards and panels — the track-rule lift reads as clean information-graphic surfaces',
  ],
  degradesWith: [
    'Marketing pages that want a single "brand colour" — the multi-hue palette resists single-accent designs',
    'Dark-mode contexts — this palette is light-only',
    'Heavy use of soft shadows (`elevation.high` / `elevation.medium` still have soft shadows for emphasis, but the register is hairline-first)',
  ],
  recallAliases: ['metro light', 'metro', 'transit map', 'subway map', 'mta', 'nyc subway', 'vignelli'],
}
