import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'coastal-modern',
  tagline:
    'Contemporary coastal / beach-house register on the Flat engine — pale sea-foam field, deep-teal primary, sunset-rust warning, humanist-rounded display over geometric body sans.',
  summary:
    'Coastal Modern is the Hamptons / Cape Cod / Tulum-modern register on the modern-light Flat-engine grid. ' +
    '`surface.base` is pale sea-foam (`#edf5f4`) — a 2-3% cyan-green tint that grounds the rest of the palette ' +
    'as "shallow tropical water" rather than as "neutral pale." `intent.primary.bg` is deep teal (`#1e5460`) — ' +
    'the colour of coastal water at dusk — and `intent.info` reuses the same teal because coastal signage ' +
    'commits to one blue-green. `intent.warning` is sunset rust (`#b8631c`), the warm complement to the cool ' +
    'primary. The Nunito-rounded display over Inter body is the typography move that reads as "coastal modern" ' +
    'rather than as urban SaaS.',
  origin:
    'The 2010s–2020s coastal-modern interior and product-design lane — Serena & Lily, Soho House Bahamas, ' +
    'Tulum hotel branding, Cape Cod beach-house renovations photographed for Architectural Digest. The colour ' +
    'vocabulary is shallow tropical water and a sunset; the typography mirrors the rounded modernism of ' +
    'contemporary coastal architecture.',
  signatures: [
    {
      label: 'Pale sea-foam field (`#edf5f4`)',
      detail:
        '`surface.base` carries a 2-3% cyan-green tint — the colour of light through shallow tropical water. Without the tint the palette reads as Flat / Classic; with it the entire chromatic set lands as "coastal" rather than as "generic light."',
    },
    {
      label: 'Deep teal `intent.primary` doubling as `intent.info` (`#1e5460`)',
      detail:
        '`intent.primary.bg` and `intent.info.bg` are both `#1e5460` — coastal-modern signage commits to one blue-green and refuses a second saturated blue. The "one teal" rule is the load-bearing colour discipline.',
    },
    {
      label: 'Sunset-rust warning paired with the cool teal primary',
      detail:
        '`intent.warning` is sunset rust (`#b8631c`) and `intent.danger` is coral red (`#c2403a`) — both sit in the same warm hue family, so the two warm intents read as a coherent sunset set rather than as a clash against the cool teal.',
    },
    {
      label: 'Humanist-rounded Nunito display over geometric Inter body',
      detail:
        '`typography.family.display` is `"Nunito", "Quicksand", "Inter", system-ui, sans-serif` — rounded humanist for headings — while `family.ui` and `family.body` route to Inter for clean prose. The display + body split is the typography move that reads as coastal-modern rather than as Linear / Vercel productivity SaaS.',
    },
    {
      label: 'Teal-tinted soft drop shadows on `elevation.*`',
      detail:
        '`elevation.low` is `0 1px 2px rgba(20, 53, 64, 0.08)` — shadow alpha tints toward teal so cards lift as polished driftwood above sea-foam, not as neutral panels. Scales through `medium` / `high` / `overlay` with the same teal cast.',
    },
    {
      label: 'Generous `radius.*` (`sm = 6px / md = 12px / lg = 18px`)',
      detail:
        'Coastal-modern architecture and product design favour softer curves than urban modernism. Stone Modern uses `sm = 2px / md = 4px` for the deliberate contrast.',
    },
  ],
  antiSignatures: [
    'A second saturated blue competing with the teal primary',
    'Single-family geometric grotesque (Inter or Söhne) on `family.display` — the rounded Nunito split is structural',
    'Tight near-square `radius.*` — the coastal-modern register depends on the widened scale',
    'Neutral or warm-only shadow alpha — the teal cast is what reads as "polished driftwood"',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Pale sea-foam `#edf5f4` — the 2-3% cyan-green tint that grounds the register.' },
    { path: 'color.intent.primary.bg', note: 'Deep teal `#1e5460` — coastal water at dusk, ≈ 8.6:1 against cream inverse.' },
    { path: 'color.intent.info.bg', note: 'Same `#1e5460` — `info` reuses the primary teal; the one-teal rule is structural.' },
    { path: 'color.intent.warning.bg', note: 'Sunset rust `#b8631c` — the warm complement to the cool primary.' },
    { path: 'typography.family.display', note: 'Nunito-first stack — humanist rounded for the coastal-modern split.' },
    { path: 'typography.family.ui', note: 'Inter — geometric sans for body and labels.' },
    { path: 'elevation.low.boxShadow', note: '`0 1px 2px rgba(20, 53, 64, 0.08)` — teal-tinted shadow alpha, not neutral.' },
  ],
  lookalikes: [
    {
      against: 'nordic-frost',
      differentiator:
        'Both palettes tint the field cool and commit `intent.primary` to a deep blue-green on the modern-light Flat engine. Nordic Frost\'s field is glacier ice (`#eef4f7`, 2-3% cyan only) with arctic-navy primary (`#1f3a5c`) and Inter throughout; Coastal Modern\'s field has the green note (`#edf5f4`) with deep-teal primary (`#1e5460`) and the Nunito + Inter display/body split. Nordic Frost is arctic; Coastal Modern is tropical.',
    },
    {
      against: 'sage-studio',
      differentiator:
        'Same modern-light Flat-engine recipe and the same warm/cool intent pairing — the difference is the colour temperature of the field. Sage Studio commits to bone-paper (warm-yellow tinted, `#f3efe6`) with sage-green primary and a Fraunces serif display; Coastal Modern commits to sea-foam (cyan-tinted, `#edf5f4`) with deep-teal primary and a Nunito-rounded sans display.',
    },
    {
      against: 'heritage-maritime',
      differentiator:
        'Both palettes use a blue-green primary and lean nautical. Heritage Maritime is the bone-paper traditional register (`surface.base` warm cream, deep-navy primary with a brass accent); Coastal Modern is the sea-foam contemporary register (`surface.base` cyan-tinted, deep-teal primary with a sunset-rust accent). Heritage is sailing-club; Coastal is beach-house.',
    },
  ],
  thrivesWith: [
    'Hospitality and travel marketing surfaces — the sea-foam field reads as resort calm',
    'Wellness and spa-brand pages where the humanist-rounded display softens technical copy',
    'Product cards on `surface.raised` where the teal shadow reads as driftwood lift',
  ],
  degradesWith: [
    'Dense data dashboards (the single-teal `primary`/`info` collapse fights chart blue families)',
    'Urban modernist registers that want sharp corners — the widened `radius` scale reads as too soft',
  ],
  recallAliases: ['coastal', 'coastal modern', 'sea foam', 'cape cod', 'tulum', 'hamptons', 'beach house'],
}
