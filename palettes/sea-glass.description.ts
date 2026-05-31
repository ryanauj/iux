import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'sea-glass',
  tagline:
    'The beach-tumbled-glass register on the Glassmorphism engine — frosted surf-worn aqua and seafoam, soft (never clear) backdrop blur, foam-white borders, and deep kelp ink.',
  summary:
    'Sea Glass is a bottle shard sanded matte by the sea. `surface.base` is a hazy tidal-mist `#dfeaea`; raised ' +
    'surfaces are translucent white at ~50% over a softly-frosted backdrop blur, the colour of frosted beach ' +
    'glass. `content.primary` is a deep kelp ink `#173a3a` for legibility, borders are foam-white at low alpha, ' +
    'and the intents are frosted seafoam / aqua / sand tints. The blur stays deliberately soft (`md = blur(14px)`) ' +
    '— the glass is surf-worn and cloudy, never the crisp clear panel of Liquid Glass. Ships `experimental` like ' +
    'the glass family.',
  origin:
    'Sea glass — the frosted, surf-tumbled shards beachcombers collect, their edges rounded and surfaces etched ' +
    'matte by years in the tide. The register is the cloudy, organic answer to the crisp Apple-style Liquid Glass: ' +
    'same translucency, but frosted and aqua rather than clear and neutral.',
  signatures: [
    {
      label: 'Frosted, never-clear translucency',
      detail:
        'Raised surfaces are `rgba(255,255,255,0.52)` over a soft `blur(14px)` backdrop — cloudy beach glass, not a crisp clear pane. The matte frosting is the whole point.',
    },
    {
      label: 'Surf-worn aqua and seafoam',
      detail:
        '`surface.base` `#dfeaea`, a seafoam primary, an aqua info — the whole palette is the green-blue of a tumbled bottle shard. Kelp-ink `#173a3a` content keeps it legible.',
    },
    {
      label: 'Foam-white borders at low alpha',
      detail:
        '`border.subtle/default` are translucent foam-white — the bright sanded rim of a glass shard catching light, rather than a hard stroke.',
    },
    {
      label: 'Rounded, organic radii',
      detail:
        '`radius.lg = 28px` — sea glass has no sharp edges; the tide rounds everything. The generous rounding reinforces the tumbled-shard read.',
    },
  ],
  antiSignatures: [
    'Crisp, clear-glass translucency with a hard bright rim — that is Liquid Glass, not surf-worn sea glass',
    'A neutral grey or violet tint — sea glass is specifically aqua/seafoam',
    'Sharp corners — tumbled glass is rounded',
    'Opaque flat surfaces — the frosted translucency is structural',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Tidal-mist `#dfeaea` — the hazy beach field.' },
    { path: 'color.surface.raised', note: 'Translucent white at ~52% — frosted, not opaque.' },
    { path: 'effect.backdropBlur.md', note: '`blur(14px)` — soft cloudy frosting, not a crisp pane.' },
    { path: 'color.content.primary', note: 'Deep kelp ink `#173a3a` — legibility against the frost.' },
  ],
  lookalikes: [
    {
      against: 'liquid-glass-light',
      differentiator:
        'Both are translucent Glassmorphism lights. Liquid Glass is the crisp Apple register — clear panels, neutral sky-blue tint, bright sharp highlights. Sea Glass is frosted and organic: cloudy aqua/seafoam translucency, foam-white soft rims, and rounded tumbled edges instead of clean clear glass.',
    },
    {
      against: 'frutiger-aero',
      differentiator:
        'Frutiger Aero is glossy Y2K optimism — wet, high-shine aqua with bright saturated gloss. Sea Glass is the matte, beachcombed opposite: the same aqua family, but sanded frosted and muted, with soft blur instead of wet gloss.',
    },
  ],
  recallAliases: ['sea glass', 'seaglass', 'beach glass', 'frosted glass', 'seafoam', 'tumbled glass'],
}
