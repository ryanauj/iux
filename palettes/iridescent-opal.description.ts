import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'iridescent-opal',
  tagline:
    'The pearlescent-holographic register on the Glassmorphism engine — a cool pearl-white field that shifts lilac/rose/mint/sky, translucent nacre surfaces, and spectral fire-opal intents.',
  summary:
    'Iridescent Opal is the whole nacre sheen at once. `surface.base` is a cool pearl-white `#eef0f6` with a faint ' +
    'lilac cast; raised surfaces are translucent white over a soft backdrop blur, and `content.primary` is a deep ' +
    'iris ink `#2a2740`. Where Sea Glass commits to one frosted aqua, Opal spreads its intents across the full ' +
    'spectral shimmer of a fire opal: lilac primary, sky info, mint success, peach warning, rose danger — each a ' +
    'pearlescent pastel. The elevation glow is tinted iris-violet rather than neutral, so surfaces bloom like ' +
    'light caught in nacre. Ships `experimental` like the glass family.',
  origin:
    'Opal, nacre, and the holographic / "oil-slick" finish that runs through Y2K-revival and vaporwave-adjacent ' +
    'design — the pearlescent sticker, the iridescent foil, the soap-bubble sheen. The register is the multi-hue ' +
    'cousin of the single-tint glass palettes: instead of one colour of glass, it is the rainbow shimmer of a ' +
    'pearl turned in the light.',
  signatures: [
    {
      label: 'A pearl field that shifts across multiple hues',
      detail:
        '`surface.base` `#eef0f6` carries a lilac cast and the intents fan across lilac / sky / mint / peach / rose — the defining move is that no single hue dominates; it is the whole nacre spectrum.',
    },
    {
      label: 'Spectral fire-opal intents',
      detail:
        'primary lilac, info sky, success mint, warning peach, danger rose — five pearlescent pastels read together as the play-of-colour in an opal, not as a conventional six-intent set.',
    },
    {
      label: 'Iris-violet elevation bloom',
      detail:
        '`elevation.*` shadows are tinted `rgba(124,92,214,…)` (iris-violet) instead of neutral black, so raised surfaces glow like light caught in nacre rather than casting a grey shadow.',
    },
    {
      label: 'Translucent nacre surfaces',
      detail:
        'Raised surfaces are `rgba(255,255,255,0.56)` over a soft blur — the milky, light-scattering translucency of mother-of-pearl.',
    },
  ],
  antiSignatures: [
    'A single dominant hue — Opal is defined by the multi-hue shift across the whole palette',
    'Neutral-black shadows — the elevation bloom is iris-violet tinted',
    'Opaque flat surfaces — the nacre translucency is structural',
    'A warm cream or sepia field — the pearl is cool with a lilac cast',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Cool pearl-white `#eef0f6` with a lilac cast — the nacre field.' },
    { path: 'color.intent.primary.bg', note: 'Pearlescent lilac — one facet of the opal spectrum.' },
    { path: 'color.intent.danger.bg', note: 'Pearlescent rose — the warm end of the same shimmer.' },
    { path: 'elevation.medium.boxShadow', note: 'Iris-violet `rgba(124,92,214,…)` glow — light caught in nacre.' },
  ],
  lookalikes: [
    {
      against: 'sea-glass',
      differentiator:
        'Both are frosted translucent Glassmorphism lights. Sea Glass commits to a single surf-worn aqua and a kelp-green ink — one colour of frosted glass. Iridescent Opal is multi-hue: a pearl field that shifts lilac/rose/mint/sky, spectral opal intents, and an iris-violet elevation bloom.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Liquid Glass is crisp, clear, neutral Apple-style glass with a single sky-blue accent. Iridescent Opal is the holographic opposite: milky nacre translucency, a violet-bloom elevation, and a full spectral pastel intent set rather than one cool accent.',
    },
  ],
  recallAliases: ['opal', 'iridescent', 'iridescent opal', 'holographic', 'pearlescent', 'nacre', 'mother of pearl'],
}
