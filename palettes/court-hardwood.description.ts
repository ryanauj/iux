import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'court-hardwood',
  tagline:
    'The basketball-arcade register on the Flat engine — light warm off-white field, basketball-orange primary, and an arcade-neon violet accent on links, focus, and info.',
  summary:
    'Court Hardwood is a two-colour basketball arena on a light warm off-white field (`surface.base` `#f7f4ee`, ' +
    'raised to near-white, sunken a touch deeper), so the page stays neutral and the colour lives in the chrome. ' +
    '`intent.primary` ' +
    'is basketball-leather orange `#e2591b`; the counter-accent is an arcade-neon violet `#7c3aed` carried by ' +
    '`content.link`, `border.focus`, and `intent.info` — the purple-and-orange clash of NBA Jam attract screens. ' +
    'Baseline green, scoreboard amber, and foul red fill out the scoreboard, and the display roles are heavy ' +
    'uppercase Archivo Black.',
  origin:
    'Arcade and sim basketball UI — NBA Jam, NBA Street, and the lower-third score bug of broadcast basketball. ' +
    'The register pairs the warm wooden court and orange ball with the electric neon accents of an arcade cabinet.',
  signatures: [
    {
      label: 'Light warm off-white field, colour in the chrome',
      detail:
        '`surface.base` is a barely-warm off-white `#f7f4ee` that lifts to near-white raised cards — the page stays neutral so the orange primary and violet accent carry the basketball identity, not a tinted background.',
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
    'A heavily saturated or dark page background — the field stays a light, near-neutral off-white',
    'Cool grey-blue surfaces — what little warmth there is keeps the field on the maple side of neutral',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Light warm off-white `#f7f4ee` — a neutral page, not a wood-toned field.' },
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
