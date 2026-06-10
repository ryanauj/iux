import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aurora-bloom',
  tagline:
    'The LIGHT warm register of the aurora-engine family — a soft pink → peach → lavender → amber pastel mesh on a warm near-white ground, the daylight counterpart of Nebula.',
  summary:
    'Aurora (Bloom) is the warm light register of the aurora engine. Same model — a four-radial `effect.atmosphereGradient` painted at ' +
    'the root and drifted over a 48s loop, translucent cards frosted by `backdrop-filter` — on a warm near-white ground `#fef6f4` with ' +
    'a pink / peach / lavender / amber mesh held at pastel alpha. It reads as the soft, optimistic spring-blossom flavour of the ' +
    'mesh-gradient-on-white look. Type is a warm dark plum ink, cards keep a faint real border, elevation is a soft warm drop shadow, ' +
    'and the primary / focus accent is a magenta-pink. The engine\'s selection tint darkens here because it is a `color-mix` of the ' +
    'dark `content.primary`.',
  origin:
    'Original to the iux design system — the warm LIGHT register of the aurora-engine family, and the daylight counterpart of Nebula. ' +
    'It borrows from the warm pastel mesh gradients of lifestyle / wellness / consumer app marketing.',
  signatures: [
    {
      label: 'Warm pastel mesh on a warm near-white ground',
      detail:
        'The drifting four-radial gradient in pink `rgba(244,114,182,…)`, peach `rgba(251,146,60,…)`, lavender `rgba(167,139,250,…)`, and amber `rgba(251,191,36,…)` at pastel alpha over `#fef6f4`.',
    },
    {
      label: 'Frosted near-white cards with a faint warm border',
      detail:
        '`surface.raised` is `rgba(255,255,255,0.62)`, frosted by the engine\'s `backdrop-filter`. A quiet warm `border.default` (`rgba(58,31,46,0.16)`) gives cards definition on the blossom ground.',
    },
    {
      label: 'Plum ink, magenta-pink primary, soft warm shadows',
      detail:
        '`content.primary` is a warm dark plum `#3a1f2e`, `intent.primary.bg` and `border.focus` are magenta-pink (`#db2777`), and `elevation.*` is a soft warm drop shadow — no luminance glow on the light ground.',
    },
    {
      label: 'Token-driven selection that darkens on light',
      detail:
        'The engine selection fill is `color-mix(in srgb, var(--color-content-primary) 12%, transparent)`; with a dark plum `content.primary` the selected surface darkens, so selection reads on the warm white.',
    },
  ],
  antiSignatures: [
    'A near-black ground (that is the dark registers — Bloom is light)',
    'A cool blue/cyan run (that is Daybreak — Bloom is warm pink / peach / lavender)',
    'White-glow elevation (Bloom uses soft warm drop shadows on the light ground)',
    '`atmosphereGradient: \'none\'` (the drifting pastel mesh is the identity)',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm near-white `#fef6f4` — the blossom ground the pastel mesh drifts over.' },
    { path: 'effect.atmosphereGradient', note: 'Pink / peach / lavender / amber at pastel alpha so the gradient stays soft on warm white.' },
    { path: 'color.intent.primary.bg', note: 'Magenta-pink `#db2777` — the warm light-register primary.' },
    { path: 'color.content.primary', note: 'Warm dark plum `#3a1f2e` — also drives the engine selection tint, which darkens here.' },
    { path: 'elevation.medium.boxShadow', note: 'Soft warm drop shadow, not a luminance glow — the light-ground elevation model.' },
  ],
  lookalikes: [
    {
      against: 'aurora-daybreak',
      differentiator:
        'Its cool light sibling. Daybreak runs azure / cyan / emerald / violet with a blue primary on cool white; Bloom runs pink / peach / lavender / amber with a magenta primary on warm white.',
    },
    {
      against: 'aurora-nebula',
      differentiator:
        'Bloom is Nebula inverted to daylight: the same warm violet/pink family, but on a warm near-white ground with pastel-alpha centers, plum ink, frosted-white cards, and soft warm drop shadows instead of a violet-black floor with luminance glows.',
    },
    {
      against: 'lavender-dawn',
      differentiator:
        'Lavender Dawn is a calm light app palette on a flat engine with bordered opaque surfaces. Bloom is on the `aurora` engine — a drifting pastel mesh at the root, frosted translucent cards reading as luminance lifts over a living gradient.',
    },
  ],
  thrivesWith: [
    'Lifestyle / wellness / consumer app marketing — the warm pastel mesh hero behind frosted white cards',
    'Card, Modal, Drawer, Toast — frosted near-white panels over a soft warm gradient at every tier',
  ],
  degradesWith: [
    'Dense Tables — frosted translucent rows separate less crisply than opaque zebra striping',
    'Browsers without `backdrop-filter` — the frosted cards fall back to a flatter translucent white',
  ],
  recallAliases: ['aurora bloom', 'bloom', 'light warm gradient', 'blossom gradient', 'new tech gradient'],
}
