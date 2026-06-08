import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'pitch-grass',
  tagline:
    'The football-sim register on the Flat engine — pale mown-grass field, grass-green primary, and the referee’s yellow-card / red-card vocabulary wired straight into warning and danger.',
  summary:
    'Pitch Grass dresses the Flat engine as a fresh daytime football pitch. `surface.base` is a pale mown-grass ' +
    '`#eef6e7`, `intent.primary` is grass green `#2e8b46`, and the state colours follow the laws of the game: ' +
    '`intent.warning` is caution-yellow `#e0b400` (the yellow card) and `intent.danger` is sending-off red ' +
    '`#d23030` (the red card). Saira athletic type and white kit-line borders finish the broadcast-pitch read.',
  origin:
    'Association-football games and broadcast — management sims, FIFA-style score bugs, and the touchline HUD. ' +
    'The palette is built from the pitch and the referee: green grass, white lines, and the card-and-whistle ' +
    'state language every viewer already knows.',
  signatures: [
    {
      label: 'Pale mown-grass field',
      detail:
        '`surface.base` is `#eef6e7` — a light, slightly cool grass-green ground rather than a neutral app white. The whole page reads as the pitch.',
    },
    {
      label: 'Yellow-card warning and red-card danger',
      detail:
        '`intent.warning` is caution-yellow `#e0b400` and `intent.danger` is sending-off red `#d23030` — the referee’s cards mapped directly onto the two alert intents.',
    },
    {
      label: 'Grass-green primary action',
      detail:
        '`intent.primary.bg` is `#2e8b46`, a saturated pitch green carried on primary buttons — the dominant colour of the sport.',
    },
    {
      label: 'Condensed athletic Saira type',
      detail:
        'Display and title roles are uppercase Saira at weight 700–800 — the broadcast scoreline and team-name lettering of football coverage.',
    },
  ],
  antiSignatures: [
    'A neutral grey or warm-paper page background — the field must read as grass',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
    'A warning/danger pair that is not yellow-then-red — the card metaphor is load-bearing',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Pale mown-grass `#eef6e7` — the pitch as the page.' },
    { path: 'color.intent.primary.bg', note: 'Grass green `#2e8b46` — the primary action.' },
    { path: 'color.intent.warning.bg', note: 'Caution-yellow `#e0b400` — the yellow card.' },
    { path: 'color.intent.danger.bg', note: 'Sending-off red `#d23030` — the red card.' },
  ],
  lookalikes: [
    {
      against: 'solarpunk',
      differentiator:
        'Both are green light palettes. Solarpunk is an eco-optimist register where green is the brand identity across the whole surface; Pitch Grass is a sports HUD where green is specifically the pitch and the warning/danger pair are deliberately the referee’s yellow and red cards.',
    },
    {
      against: 'court-hardwood',
      differentiator:
        'Both are sports-game flat registers. Court Hardwood is the warm wooden basketball court with an orange-ball primary; Pitch Grass is the green football pitch with a card-yellow/red state language.',
    },
  ],
  recallAliases: ['pitch grass', 'soccer', 'football', 'fifa', 'pitch', 'football manager'],
}
