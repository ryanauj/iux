import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'court-hardwood',
  tagline:
    'The basketball-arcade scoreboard register on the Flat engine — warm maple-hardwood field, near-black court lines, leather-orange primary, and bold uppercase athletic display type.',
  summary:
    'Court Hardwood dresses the Flat engine as a daytime basketball arena. `surface.base` is a warm maple ' +
    '`#f7ecd9`, `border.strong` is the painted court-line near-black `#1a1a1a`, and `intent.primary` is a ' +
    'basketball-leather orange `#e2591b` with white text. The state colours read like a scoreboard — baseline ' +
    'green for go, shot-clock amber for warning, foul red for danger, jersey blue for info — and the display ' +
    'roles are heavy uppercase Archivo so a score reads from across the gym.',
  origin:
    'Arcade and sim basketball UI — NBA Jam, NBA Street, and the lower-third score bug of modern broadcast ' +
    'basketball. The whole register is built from the gym: hardwood floor, painted lines, orange ball, and a ' +
    'bright LED scoreboard vocabulary of state colours.',
  signatures: [
    {
      label: 'Warm maple-hardwood field, not white',
      detail:
        '`surface.base` is `#f7ecd9` — a sanded-maple court tone. The page is the floor, so it carries a warm wood cast rather than a neutral app grey or pure white.',
    },
    {
      label: 'Basketball-leather orange as the primary action',
      detail:
        '`intent.primary.bg` is `#e2591b`, the colour of a basketball, carried on every primary button and link. It is the single warmest, most saturated thing on the floor.',
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
    'A pure-white or cool-grey page background — that breaks the hardwood-floor metaphor',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
    'Thin, low-contrast, lowercase display type — the scoreboard wants heavy uppercase weight',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm maple `#f7ecd9` — the hardwood floor as the page.' },
    { path: 'color.intent.primary.bg', note: 'Basketball-leather orange `#e2591b` — the primary action.' },
    { path: 'color.border.strong', note: 'Court-line near-black `#1a1a1a` — emphasis borders as painted lines.' },
    { path: 'typography.role.display.textTransform', note: 'Uppercase — scoreboard / jersey lettering.' },
  ],
  lookalikes: [
    {
      against: 'citrus-spark',
      differentiator:
        'Both are bright, warm, energetic flat light palettes. Citrus Spark is a generic energetic brand register on a near-white field; Court Hardwood is specifically a basketball arena — warm maple ground, court-line black, and a basketball-orange primary rather than a citrus yellow-green.',
    },
    {
      against: 'pitch-grass',
      differentiator:
        'Both are sports-game flat registers. Pitch Grass is the green football pitch with a card-yellow/red state language; Court Hardwood is the warm wooden basketball court with an orange ball primary.',
    },
  ],
  recallAliases: ['court hardwood', 'basketball', 'nba', 'hardwood', 'arena', 'hoops', 'court'],
}
