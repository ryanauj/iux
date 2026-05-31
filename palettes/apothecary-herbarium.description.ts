import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'apothecary-herbarium',
  tagline:
    'The vintage-pharmacy register on the Flat engine — aged-label cream, sepia letterpress ink, botanical tincture green, and amber-glass brown, set in a transitional serif.',
  summary:
    'Apothecary Herbarium is a 19th-century dispensary label. `surface.base` is an aged-stock cream `#f0e9d8`, ' +
    '`content.primary` is a sepia-black `#2c2a1f`, and the chromatic pair is botanical: a deep tincture green ' +
    '`#2f5d3a` (primary) and an amber-glass brown `#7a5a2c` (link), with a dried-blood tincture red for danger and ' +
    'a poison-bottle blue for info. Everything is set in a Spectral/Source-Serif transitional face with very tight ' +
    'radii (`sm = 2px`) and heavily tracked uppercase labels — the register of a printed pharmacopoeia, the ' +
    'wide-spaced caps of an old bottle label.',
  origin:
    'The Victorian apothecary and the pressed-plant herbarium sheet — amber dispensary bottles, Latin botanical ' +
    'names, letterpress labels on rag stock. The register is the herbal / "old-world remedy" answer to the modern ' +
    'cafe-warm lane: same cream warmth, but committed to a serif and a green/amber medicinal palette rather than ' +
    'a coffee one.',
  signatures: [
    {
      label: 'Aged-label cream with sepia letterpress ink',
      detail:
        '`surface.base` `#f0e9d8` and `content.primary` `#2c2a1f` read as ink pressed into rag stock, not text on a screen. The warmth is the aged paper of an old label.',
    },
    {
      label: 'Tincture green + amber-glass brown',
      detail:
        'The load-bearing pair is botanical: deep green `#2f5d3a` primary and amber-bottle brown `#7a5a2c` link. It is the colour of a herb tincture in an amber dispensary bottle.',
    },
    {
      label: 'Transitional serif, tight radii, tracked caps',
      detail:
        '`typography.family.ui` is a Spectral-class serif; `radius.sm` is `2px`; `role.label` is `0.1em` uppercase. The printed-pharmacopoeia register — boxes are square, captions are wide-spaced caps.',
    },
    {
      label: 'Medicinal, muted intent set',
      detail:
        'Danger is a dried-blood tincture red `#9c3526`, info a muted poison-bottle blue, warning an amber-glass gold. No bright, modern UI colours.',
    },
  ],
  antiSignatures: [
    'A sans-serif body — the apothecary register is committed to a serif',
    'Rounded, soft cards — the labels are square (`radius.sm = 2px`)',
    'Bright modern intent colours — the set is medicinal and muted',
    'A pure-white field — the stock is aged cream',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Aged-label cream `#f0e9d8` — rag stock, not screen white.' },
    { path: 'color.intent.primary.bg', note: 'Tincture green `#2f5d3a` — the botanical primary.' },
    { path: 'color.content.link', note: 'Amber-glass brown `#7a5a2c` — the dispensary-bottle accent.' },
    { path: 'radius.sm', note: '`2px` — square-cut label corners.' },
    { path: 'typography.role.label.tracking', note: '`0.1em` uppercase — old-label letterspacing.' },
  ],
  lookalikes: [
    {
      against: 'mocha-latte',
      differentiator:
        'Both are warm, serif-leaning cream light palettes. Mocha Latte is the modern cafe register — coffee browns, a soft contemporary serif, rounded warmth. Apothecary Herbarium is older and more clinical: a botanical green/amber medicinal palette, square label corners, and heavily tracked uppercase caps.',
    },
    {
      against: 'academic',
      differentiator:
        'Academic is printed scholarship — serif on bright paper for long-form reading. Apothecary Herbarium narrows that to a specific artifact: the dispensary label, with aged cream stock, a green/amber tincture palette, and old-bottle tracked caps rather than running body text.',
    },
  ],
  recallAliases: ['apothecary', 'herbarium', 'pharmacy', 'tincture', 'botanical', 'amber bottle'],
}
