import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'whitewash-aegean',
  tagline:
    'The Cycladic-island register on the Flat engine — limewashed plaster white, deep Aegean navy ink, domed-church blue, and sun-baked terracotta.',
  summary:
    'Whitewash Aegean is a Greek-island village rendered as a palette. `surface.base` is a warm limewash `#f4f1ea` ' +
    '(chalky plaster, never pure white), `content.primary` is deep Aegean navy `#1d2b3a`, and the two load-bearing ' +
    'colours are the ones every Cyclades village actually paints: the domed-church blue `#1565a0` (primary / link / ' +
    'info) and the sun-baked terracotta `#b34733` (danger). Olive green and dry-gold round out the herb-garden ' +
    'edges. The display face is a high-contrast Didone/Garamond serif — the lettering of a whitewashed taverna ' +
    'sign — over a humanist sans body.',
  origin:
    'Cycladic architecture — Santorini, Mykonos, Paros — where lime-washed walls and cobalt domes are a building ' +
    'code as much as an aesthetic. The register is the Mediterranean answer to the cool, grey "coastal modern" ' +
    'lane: warmer plaster, a deeper Greek-flag blue, and an earthy terracotta instead of a soft sea-grey.',
  signatures: [
    {
      label: 'Limewash plaster field, not pure white',
      detail:
        '`surface.base` is `#f4f1ea` — a warm chalk-white that reads as lime-washed stucco. Pure `#fff` would turn the village into a clean SaaS app.',
    },
    {
      label: 'Domed-church blue carries primary, link, and focus',
      detail:
        'A single deep `#1565a0` does primary, info, `content.link`, and `border.focus`. It is the cobalt of a Cycladic chapel dome — the one saturated cool the whole palette leans on.',
    },
    {
      label: 'Sun-baked terracotta as the warm counterweight',
      detail:
        '`intent.danger` is terracotta `#b34733` — the rooftop / clay-pot warmth that keeps the blue from reading as corporate. The blue/terracotta pairing is the load-bearing colour story.',
    },
    {
      label: 'High-contrast taverna-sign serif display',
      detail:
        '`typography.family.display` is a Cormorant/GFS-Didot Didone over a Mukta humanist sans body, with `0.06em` uppercase tracked labels — the hand-painted lettering of an island sign.',
    },
  ],
  antiSignatures: [
    'A cool grey-blue field — Aegean plaster is warm limewash, not sea-grey',
    'A teal or aqua accent instead of the deep cobalt church-dome blue',
    'No warm counterweight — without the terracotta the palette reads as generic corporate blue',
    'A geometric grotesque display face — the register wants a high-contrast serif',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm limewash `#f4f1ea` — lime-washed plaster, not pure white.' },
    { path: 'color.intent.primary.bg', note: 'Cobalt church-dome blue `#1565a0` — the load-bearing cool.' },
    { path: 'color.intent.danger.bg', note: 'Sun-baked terracotta `#b34733` — the warm counterweight.' },
    { path: 'typography.family.display', note: 'Cormorant/Didot serif — taverna-sign lettering.' },
    { path: 'typography.role.label.tracking', note: '`0.06em` uppercase — hand-painted sign tracking.' },
  ],
  lookalikes: [
    {
      against: 'coastal-modern',
      differentiator:
        'Both are seaside light palettes. Coastal Modern is the cool, grey, North-Atlantic register — sea-grey field, soft blue, a clean modern sans. Whitewash Aegean is the warm Mediterranean: limewash-cream plaster, a deep cobalt church-dome blue, terracotta, and a high-contrast serif.',
    },
    {
      against: 'heritage-maritime',
      differentiator:
        'Heritage Maritime is the classic nautical register (navy, rope, brass) with a traditional, slightly formal feel. Whitewash Aegean is specifically Cycladic-village: chalky lime plaster, cobalt domes, and sun-baked clay, warmer and more sun-bleached than the maritime navy.',
    },
  ],
  recallAliases: ['whitewash', 'aegean', 'cycladic', 'santorini', 'greek island', 'mediterranean'],
}
