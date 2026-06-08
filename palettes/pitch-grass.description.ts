import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'pitch-grass',
  tagline:
    'The football-sim register on the Flat engine — cool stadium-light field with a faint grass tint, grass-green primary, broadcast-cyan accent, and the referee’s yellow-card / red-card alerts.',
  summary:
    'Pitch Grass is a two-colour football broadcast. `surface.base` is a cool stadium-light `#f1f5ee` with only a ' +
    'faint grass cast, so it never collapses into a green wash. `intent.primary` is grass green `#2f9e44`, and the ' +
    'counter-accent is a vivid broadcast-cyan `#0891b2` on `content.link`, `border.focus`, and `intent.info`. The ' +
    'alerts keep the laws of the game: `intent.warning` is caution-yellow `#f5b800` (the yellow card) and ' +
    '`intent.danger` is sending-off red `#e03131` (the red card). Saira athletic type finishes the touchline read.',
  origin:
    'Association-football games and broadcast — management sims, FIFA-style score bugs, and the touchline HUD. The ' +
    'palette pairs the green pitch with the cyan/teal accent colour of modern football broadcast graphics, and ' +
    'borrows the referee’s card-and-whistle state language.',
  signatures: [
    {
      label: 'Cool stadium-light field, only faintly green',
      detail:
        '`surface.base` is `#f1f5ee` — a near-neutral light with a faint grass tint, so the green primary and cyan accent read against it rather than blending in.',
    },
    {
      label: 'Grass-green primary against a broadcast-cyan accent',
      detail:
        '`intent.primary.bg` is grass green `#2f9e44` while `content.link`, `border.focus`, and `intent.info` carry broadcast-cyan `#0891b2` — two distinct hues, not one green.',
    },
    {
      label: 'Yellow-card warning and red-card danger',
      detail:
        '`intent.warning` is caution-yellow `#f5b800` and `intent.danger` is sending-off red `#e03131` — the referee’s cards mapped directly onto the two alert intents.',
    },
    {
      label: 'Condensed athletic Saira type',
      detail:
        'Display and title roles are uppercase Saira at weight 700–800 — the broadcast scoreline and team-name lettering of football coverage.',
    },
  ],
  antiSignatures: [
    'A heavily green-washed field where surface, primary, and accent are all green',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
    'A warning/danger pair that is not yellow-then-red — the card metaphor is load-bearing',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Cool stadium-light `#f1f5ee` — faintly green, near-neutral.' },
    { path: 'color.intent.primary.bg', note: 'Grass green `#2f9e44` — the primary action.' },
    { path: 'color.content.link', note: 'Broadcast-cyan `#0e8aa8` — the counter-accent on links.' },
    { path: 'color.intent.danger.bg', note: 'Sending-off red `#e03131` — the red card.' },
  ],
  lookalikes: [
    {
      against: 'solarpunk',
      differentiator:
        'Both use green. Solarpunk is an eco-optimist register where green is the brand identity across the whole surface; Pitch Grass keeps the field near-neutral and uses green only as the primary, pairs it with a broadcast-cyan accent, and reserves yellow/red for the referee’s cards.',
    },
    {
      against: 'court-hardwood',
      differentiator:
        'Both are sports-game flat registers with a primary-plus-accent structure. Court Hardwood is a warm wooden basketball court with an orange primary and violet accent; Pitch Grass is a cool football pitch with a green primary and cyan accent.',
    },
  ],
  recallAliases: ['pitch grass', 'soccer', 'football', 'fifa', 'pitch', 'football manager'],
}
