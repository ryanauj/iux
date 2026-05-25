import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'heritage-maritime',
  tagline:
    'Nautical / chandlery register — bone-white field, deep-navy `intent.primary`, polished-brass `intent.warning`, signal-red `intent.danger` + focus ring, Roboto Slab brass-plaque display.',
  summary:
    'Heritage Maritime is the chandlery / yacht-trim register on the Flat engine. Bone white (`#f4ecd9`) fills ' +
    '`surface.base`; deep navy (`#0d2e4a`) carries `intent.primary` (Royal Navy hull paint, the one near-black on ' +
    'the palette); polished brass (`#a07634`) carries `warning`; signal red (`#a8261e`) carries `danger` and the ' +
    'focus ring. Roboto Slab on display reads as a ship-builder name plate; Inter on body keeps long-form text ' +
    'legible. The register sailing-yachts and harbour-front insurance offices have used unchanged since the 1890s.',
  origin:
    'The Anglo-American yacht / chandlery / harbour-insurance visual tradition, c.1890–present — Lloyd\'s of London ' +
    'certificates, painted-wood yacht cabin trim, polished-brass binnacle fittings, halyard-pennant signal flags. ' +
    'The colour vocabulary maps directly: Royal Navy navy hull paint, polished-brass fittings, painted-canvas deck ' +
    'cream, signal-red halt pennants. Slab serif display (Roboto Slab, Adelle, Rockwell) is the brass-plaque ' +
    'lettering used on ship-builder name plates and certificate borders.',
  signatures: [
    {
      label: 'Deep-navy `intent.primary` + bone-white field',
      detail:
        '`surface.base` `#f4ecd9` (chart paper / painted-wood cabin trim cream); `intent.primary.bg` `#0d2e4a` (Royal Navy hull paint). The two-tone navy + bone is the load-bearing colour move; the palette\'s identity sits in that pairing the way Mid-century-modern\'s identity sits in cream + walnut.',
    },
    {
      label: 'Polished-brass `warning` + signal-red `danger`',
      detail:
        '`intent.warning.bg` `#a07634` (binnacle-fitting brass in low sun); `intent.danger.bg` `#a8261e` (halyard-pennant red). The second-tier intents are pulled from period-correct hardware and signalling, not from a generic Material warning yellow / Material danger red.',
    },
    {
      label: 'Signal-red `border.focus`',
      detail:
        '`border.focus` is `#a8261e` — the focus ring reads as a halyard pennant catching attention, a deliberate departure from the navy + brass two-tone primary scheme. This is the only palette in the set whose focus colour is not also the primary intent.',
    },
    {
      label: 'Roboto Slab brass-plaque display',
      detail:
        '`typography.family.display` is Roboto Slab (Adelle / Rockwell fallback) — the brass-plaque slab serif used on ship-builder name plates and insurance certificates. Display sets at `weight: 700` with `0.005em` tracking — slab serifs at display sizes read strongest at moderate tracking.',
    },
  ],
  antiSignatures: [
    'A non-navy `intent.primary` — the Royal Navy hull paint is structural',
    'Saturated digital intents (Material-style brand reds / yellows break the chandlery register)',
    'A `border.focus` that reuses the primary navy — signal red on focus is the differentiator',
    'A geometric sans `display` family — the slab serif is the brass-plaque cue',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Bone white `#f4ecd9` — chart-paper / cabin-trim colour.' },
    { path: 'color.intent.primary.bg', note: 'Royal Navy navy `#0d2e4a` — period-correct hull paint.' },
    { path: 'color.intent.warning.bg', note: 'Polished brass `#a07634` — binnacle-fitting colour in low sun.' },
    { path: 'color.intent.danger.bg', note: 'Signal red `#a8261e` — halyard-pennant halt colour.' },
    { path: 'color.border.focus', note: '`#a8261e` — signal red, distinct from the primary navy.' },
    { path: 'typography.family.display', note: 'Roboto Slab — brass-plaque slab serif.' },
  ],
  lookalikes: [
    {
      against: 'desert-modernism',
      differentiator:
        'Both palettes use a cream field with multiple period-correct intents on the Flat engine. Desert Modernism: warmer cream + terracotta + pool turquoise + palm green (Palm Springs register). Heritage Maritime: cooler bone-white + navy + brass + signal red (Atlantic-coast register). Opposite warmth tilt on the surface, opposite intent vocabulary on the page.',
    },
    {
      against: 'newspaper',
      differentiator:
        'Newspaper is the broadsheet-density register: condensed Crimson body, stop-the-presses red accent, narrow-column rhythm. Heritage Maritime is the chandlery register: standard Inter body, brass + navy + signal-red accents, generous spacing. Both use serif display but Heritage uses slab serif (Roboto Slab — brass plaque) where Newspaper uses transitional serif (Crimson — body type at display size).',
    },
    {
      against: 'modern-royal',
      differentiator:
        'Both are conservative registers with traditional-typography display. Modern Royal: dark aubergine field, antique gold accent, Cormorant display (regal). Heritage Maritime: bone-white field, navy primary + brass warning, Roboto Slab display (nautical). Opposite tonal register; the typography vocabularies are both serif but the slab Roboto sits differently from Cormorant\'s garamond-era counters.',
    },
  ],
  thrivesWith: [
    'Maritime insurance, yacht-brokerage, harbour-management interfaces',
    'Heritage-luxury hospitality and travel brands',
    'Long-form Inter body with Roboto Slab display headings on `surface.raised`',
  ],
  degradesWith: [
    'Modern-startup contexts where the heritage vocabulary reads as off-brand',
    'Photographic content unrelated to maritime themes (the navy + brass palette is genre-specific)',
  ],
  recallAliases: ['heritage maritime', 'maritime', 'nautical', 'chandlery', 'yacht', 'navy brass'],
}
