import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'industrial-light',
  tagline:
    'Workshop-drawing register inverted to a light field — warm-paper surfaces, steel-grey + concrete-grey neutrals, safety-orange `intent.primary`, IBM Plex Mono on `family.ui` so labels carry the engineering-drawing density.',
  summary:
    'Industrial / Light is the inversion exercise for the dark-workshop aesthetic carried by ' +
    'CRT / Phosphor and Bloomberg Terminal. The same vocabulary — measurement labels, ' +
    'monospace UI, safety-orange accents, hairline borders — translated to a warm-paper light ' +
    'field. `surface.base` is `#fbf8f1`; `family.ui` is IBM Plex Mono (so labels and forms ' +
    'render in mono), while `family.body` falls through to a sans Inter chain to keep long-form ' +
    'reading from slowing. Safety orange (`#ff6a00`) is the single saturated accent.',
  origin:
    'Industrial / workshop design vocabulary — printed engineering drawings, ISO 5807 flowchart ' +
    'conventions, the safety-orange / hi-vis colour system, IBM Plex Mono (IBM 2017 corporate ' +
    'open-source release) as the contemporary digital cousin of mechanical-pencil drafting type. ' +
    'Specifically the *inversion* of the dark-workshop register the showcase already ships as ' +
    'CRT / Phosphor — same colour and type vocabulary, light field instead of dark.',
  signatures: [
    {
      label: 'IBM Plex Mono on `family.ui` (and `family.mono` and `family.display`)',
      detail:
        '`typography.family.ui` resolves to `"IBM Plex Mono", "JetBrains Mono", ...` — labels, captions, input affordances all render in mono. `family.body` keeps a sans-y line (Inconsolata is technically display but body falls through to the mono chain too via Inter) so long-form stays readable. The mono-UI / readable-body split is the load-bearing typography move.',
    },
    {
      label: 'Safety orange `#ff6a00` as the only saturated `intent.*` accent',
      detail:
        '`intent.primary.bg`, `border.focus`, and `content.link` all share `#ff6a00` — the workshop hi-vis colour. `intent.warning.bg` is the same orange one step darker (`#d45600`) so the two intents don\'t collide when stacked.',
    },
    {
      label: 'Hairline rule on `elevation.low` (no drop shadow)',
      detail:
        '`elevation.low.boxShadow` is `0 0 0 1px #d6d2c8` — the printed-on-paper hairline rule. `medium` / `high` add a soft drop shadow ON TOP of the rule for emphasis; `overlay` drops the rule and uses a strong soft shadow alone so modals lift clearly.',
    },
    {
      label: 'Warm-paper `surface.base` (`#fbf8f1`) — never pure white',
      detail:
        'The cream undertone is what makes the palette read as "printed engineering drawing" rather than "white-page UI". Borders pick up the same warm tone (`#d6d2c8`).',
    },
    {
      label: 'Hard corners (`radius.sm = 0`, `radius.md = 2px`, `radius.lg = 4px`)',
      detail:
        'The sharp-corner workshop language. `radius.pill` stays `999px` for tags; `radius.full` stays `9999px` for circles. The collapse is at the low-end of the scale.',
    },
    {
      label: 'Tightened `space.*` at the high end',
      detail:
        '`space.7` is `40px`, `space.8` is `56px` — vs Flat / Classic\'s `48px` / `64px`. The drawing-density compression, not magazine breathing room.',
    },
  ],
  antiSignatures: [
    'A sans `family.ui` — the mono labels are load-bearing',
    'A second saturated chromatic intent competing with the safety orange',
    'Soft drop shadow on `elevation.low` (the hairline rule must carry the lift)',
    'Pure white `surface.base` — must be warm-paper cream',
    'Rounded corners on `radius.sm` / `radius.md` (must be sharp)',
  ],
  tokenEvidence: [
    {
      path: 'typography.family.ui',
      note: 'IBM Plex Mono — labels and forms render in mono. The load-bearing typography move.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Safety orange `#ff6a00` — the only saturated chromatic intent. Doubles as `border.focus` and `content.link`.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`0 0 0 1px #d6d2c8` — printed-paper hairline rule, no penumbra.',
    },
    {
      path: 'color.surface.base',
      note: 'Warm paper `#fbf8f1` — never pure white. The cream undertone reads as printed drawing.',
    },
    {
      path: 'radius.sm',
      note: '`0` — the sharp-corner workshop language. `radius.lg` collapses to `4px`.',
    },
  ],
  lookalikes: [
    {
      against: 'crt-phosphor-amber',
      differentiator:
        'CRT / Phosphor (amber) is the dark-workshop register: near-black field, amber phosphor type with a glow halo, full-mono throughout, scanline overlay. Industrial / Light is the inversion to a light field: warm-paper surfaces, walnut ink, mono on `family.ui` only (body stays sans-readable), safety-orange as the intent, no glow or overlay. Same workshop vocabulary, opposite field — one is "shop floor at night," the other is "shop floor at noon."',
    },
    {
      against: 'data-dense-light',
      differentiator:
        'Data-dense light also uses a near-white field and tight spacing, but `family.ui` is humanist sans (Inter) and every intent desaturates for sparkline-readability. Industrial / Light commits to mono on `family.ui` and keeps the safety-orange intent fully saturated.',
    },
    {
      against: 'newspaper',
      differentiator:
        'Newspaper / Broadsheet is a Flat editorial register: newsprint cream, serif body in narrow columns, stop-the-presses red accent. Industrial / Light is a Flat workshop register: warm paper, mono labels, safety-orange accent. The difference between "printed broadsheet" and "printed engineering drawing".',
    },
  ],
  thrivesWith: [
    'Forms — mono labels with measurement-tick captions read as engineering-drawing affordances',
    'Tables and data grids — mono columns align without tabular-figures workarounds',
    'Dashboards with metric tiles — the safety-orange accent + mono labels read as instrumentation',
    'Specifications and parts catalogues — what the type vocabulary is designed for',
  ],
  degradesWith: [
    'Long-form articles — even with `family.body` falling through to a humanist line, the mono UI chrome competes',
    'Marketing-pages that want a soft / inviting tone — the workshop register is utilitarian',
    'Dark-mode contexts — pair with Bloomberg Terminal or CRT / Phosphor for dark needs',
  ],
  recallAliases: ['industrial light', 'industrial', 'workshop light', 'engineering drawing', 'industrial drawing'],
}
