import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'salt-flats',
  tagline:
    'The Bonneville / Uyuni register on the Flat engine — a blinding mineral-white field, basalt ink, a very wide space scale, and trace-element accents.',
  summary:
    'Salt Flats is mostly emptiness. `surface.base` is a bright mineral white `#f7f6f3` running to a pure-white ' +
    '`raised`, with basalt-dark `#2a2723` ink on top. The signature move is the space scale: it widens sharply at ' +
    'the top (`6 = 48px`, `7 = 72px`, `8 = 104px`) so layouts read as a few marks on a vast salt pan. The colour ' +
    'comes from what a salt crust actually leaves behind — alkali sage, sun-baked ochre, oxidised rust, and a cool ' +
    'brine blue — used sparingly against all that white. Type is a tight, slightly-condensed grotesque with ' +
    'uppercase tracked labels.',
  origin:
    'The great salt pans — Bonneville in Utah, the Salar de Uyuni in Bolivia — and the land-art / horizon ' +
    'photography that fetishises their emptiness. The register answers the brand-minimalism lane (lots of white, ' +
    'one or two earth accents) by pushing the whitespace to a geological scale.',
  signatures: [
    {
      label: 'A space scale that widens to the horizon',
      detail:
        '`space.6/7/8` jump to `48 / 72 / 104px` while the lower steps stay tight. The disproportionate top end is what makes a layout read as a few elements stranded on a vast white pan.',
    },
    {
      label: 'Blinding mineral white, basalt ink',
      detail:
        '`surface.base` `#f7f6f3` lifts to a pure-white `raised`; `content.primary` is basalt `#2a2723`. The field does almost all the work — colour is a guest.',
    },
    {
      label: 'Trace-element accents, used sparingly',
      detail:
        'The intents are the residue of a salt crust: alkali sage success, sun-baked ochre warning, oxidised rust danger, brine-blue primary/info. Earthy and desaturated, never candy.',
    },
    {
      label: 'Condensed grotesque with tracked uppercase labels',
      detail:
        '`typography.role.label` is uppercase with `0.04em` tracking on a Söhne/GT-America-style grotesque; display runs to `3.25rem` with tight `-0.03em`. Gallery-wall captioning on an empty plain.',
    },
  ],
  antiSignatures: [
    'A uniform space scale — Salt Flats lives on the exaggerated jump at `space.6/7/8`',
    'Saturated, candy-bright intents — the accents are mineral and earthy',
    'A warm cream or sepia field — this white is bright and cool-neutral, not aged paper',
    'Dense, gutter-tight layouts — the whole point is the emptiness',
  ],
  tokenEvidence: [
    { path: 'space.8', note: '`104px` — the top of the scale blows out so layouts read as horizon-wide.' },
    { path: 'color.surface.base', note: 'Mineral white `#f7f6f3` — bright and cool, not aged.' },
    { path: 'color.intent.danger.bg', note: 'Oxidised rust `#a84a32` — a trace-element accent, not a fire-engine red.' },
    { path: 'color.intent.warning.bg', note: 'Sun-baked ochre `#ecd9b0` — alkali residue, desaturated.' },
    { path: 'typography.role.label.textTransform', note: 'Uppercase tracked labels — land-art gallery captioning.' },
  ],
  lookalikes: [
    {
      against: 'desert-modernism',
      differentiator:
        'Both are warm-minimal earth-tone registers. Desert Modernism is mid-century architecture — terracotta and turquoise on a sand field, with a designed-interior warmth. Salt Flats is colder and emptier: a near-white pan with mineral residue accents and a space scale stretched to a geological horizon.',
    },
    {
      against: 'stone-modern',
      differentiator:
        'Stone Modern is a warm retail-minimal light with a tight, even rhythm. Salt Flats shares the restraint but trades the boutique warmth for a blinding mineral white and an exaggerated upper space scale that makes the whitespace itself the subject.',
    },
  ],
  recallAliases: ['salt flats', 'salt flat', 'bonneville', 'uyuni', 'salt pan', 'mineral'],
}
