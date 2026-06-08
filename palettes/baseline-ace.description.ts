import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'baseline-ace',
  tagline:
    'The tennis-sim register on the Flat engine — pale blue-green hard-court field, calm court-teal primary, and one electric tennis-ball lime as the focus, link, and success accent.',
  summary:
    'Baseline Ace dresses the Flat engine as a sunlit tennis court. `surface.base` is a pale hard-court ' +
    'blue-green `#eaf2f0`, `intent.primary` is a calm court-teal `#0f7d6a`, and the signature is a single ' +
    'electric tennis-ball lime `#82a814` carried by `border.focus`, `content.link`, and `intent.success`. ' +
    'Generous radii and Rajdhani type keep it bright and modern — calm court colours with one unmistakable ball.',
  origin:
    'Tennis video games and broadcast — Top Spin, Virtua Tennis, Mario Tennis, and the clean line-call HUD of ' +
    'televised tennis. Built from the court: hard-court blue-green, white sidelines, and the fluorescent yellow ' +
    'of the ball as the one electric accent.',
  signatures: [
    {
      label: 'Pale hard-court blue-green field',
      detail:
        '`surface.base` is `#eaf2f0` — the cool blue-green of a modern hard court, not a neutral app grey or warm paper.',
    },
    {
      label: 'Tennis-ball lime as the single electric accent',
      detail:
        '`border.focus`, `content.link`, and `intent.success` all carry the fluorescent ball-lime `#82a814` — the one saturated colour on an otherwise calm court.',
    },
    {
      label: 'Calm court-teal primary',
      detail:
        '`intent.primary.bg` is `#0f7d6a` — a restrained court-teal that lets the lime ball stay the brightest thing on screen.',
    },
    {
      label: 'Generous radii, bright modern type',
      detail:
        '`radius.lg` is 16px and the type is Rajdhani — a clean, airy, contemporary tennis HUD rather than a dense scoreboard.',
    },
  ],
  antiSignatures: [
    'Lime used everywhere rather than as a single ball-bright accent',
    'A warm-paper or hardwood page background — the court reads cool blue-green',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Pale hard-court blue-green `#eaf2f0`.' },
    { path: 'color.border.focus', note: 'Tennis-ball lime `#82a814` — the one electric accent.' },
    { path: 'color.intent.primary.bg', note: 'Calm court-teal `#0f7d6a` — the primary action.' },
    { path: 'radius.lg', note: '16px — airy, modern court HUD.' },
  ],
  lookalikes: [
    {
      against: 'coastal-modern',
      differentiator:
        'Both are cool blue-green light palettes. Coastal Modern is a calm seaside brand register; Baseline Ace is a tennis HUD whose defining move is a single fluorescent ball-lime accent against the cool court — coastal has no such electric pop.',
    },
    {
      against: 'pitch-grass',
      differentiator:
        'Both are sports-game flat registers in the green family. Pitch Grass is a warm-green football pitch with a card-yellow/red language; Baseline Ace is a cool blue-green tennis court with one lime accent and a restrained teal primary.',
    },
  ],
  recallAliases: ['baseline ace', 'tennis', 'top spin', 'mario tennis', 'court', 'ace'],
}
