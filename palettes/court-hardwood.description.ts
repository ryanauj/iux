import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'court-hardwood',
  tagline:
    'The basketball-arcade register on the Flat engine — sanded-maple field, basketball-orange primary, and an arcade-neon violet accent on links, focus, and info.',
  summary:
    'Court Hardwood is a two-colour basketball arena. `surface.base` is a sanded-maple `#f7efe0` that steps up to ' +
    'a brighter raised tone and down to a deeper sunken wood, so panels lift off a real gradient. `intent.primary` ' +
    'is basketball-leather orange `#e2591b`; the counter-accent is an arcade-neon violet `#7c3aed` carried by ' +
    '`content.link`, `border.focus`, and `intent.info` — the purple-and-orange clash of NBA Jam attract screens. ' +
    'Baseline green, scoreboard amber, and foul red fill out the scoreboard, and the display roles are heavy ' +
    'uppercase Archivo Black.',
  origin:
    'Arcade and sim basketball UI — NBA Jam, NBA Street, and the lower-third score bug of broadcast basketball. ' +
    'The register pairs the warm wooden court and orange ball with the electric neon accents of an arcade cabinet.',
  signatures: [
    {
      label: 'Sanded-maple field with a real wood gradient',
      detail:
        '`surface.base`, `raised`, and `sunken` step through maple tones (`#f7efe0` → `#fffbf3` → `#ece0cb`), so the floor reads as wood with depth rather than one flat tint.',
    },
    {
      label: 'Orange primary against an arcade-violet accent',
      detail:
        '`intent.primary.bg` is basketball orange `#e2591b` while `content.link`, `border.focus`, and `intent.info` carry neon violet `#7c3aed` — a deliberate complementary clash, not a single-hue wash.',
    },
    {
      label: 'Near-black painted court lines',
      detail:
        '`border.strong` is `#1a1a1a` — the painted boundary line of a court, used for emphasis borders against the warm field.',
    },
    {
      label: 'Heavy uppercase athletic display type',
      detail:
        'Display and title roles are Archivo Black at weight 800, uppercased — the bold scoreboard / jersey-number lettering of arcade hoops.',
    },
  ],
  antiSignatures: [
    'A single-hue field where surface, primary, and accent are all the same colour',
    'A pure-white or cool-grey page background — that breaks the hardwood-floor metaphor',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Sanded-maple `#f7efe0` — the hardwood floor as the page.' },
    { path: 'color.intent.primary.bg', note: 'Basketball-leather orange `#e2591b` — the primary action.' },
    { path: 'color.intent.info.bg', note: 'Arcade-neon violet `#7c3aed` — the counter-accent.' },
    { path: 'color.border.focus', note: 'Violet focus ring — the accent picking out the active control.' },
  ],
  lookalikes: [
    {
      against: 'citrus-spark',
      differentiator:
        'Both are bright, warm, energetic flat light palettes. Citrus Spark is a generic energetic brand register on a near-white field; Court Hardwood is a basketball arena — a maple-wood gradient ground, an orange-ball primary, and a deliberate neon-violet counter-accent.',
    },
    {
      against: 'pitch-grass',
      differentiator:
        'Both are sports-game flat registers with a primary-plus-accent structure. Pitch Grass is a green football pitch with a broadcast-cyan accent and the referee’s card language; Court Hardwood is a warm wooden basketball court with an orange primary and a violet accent.',
    },
  ],
  recallAliases: ['court hardwood', 'basketball', 'nba', 'nba jam', 'hardwood', 'arena', 'hoops', 'court'],
}
