import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'ballpark-day',
  tagline:
    'The baseball-sim register on the Flat engine — warm chalk-and-cream field, infield-dirt borders, outfield-green primary, and a single stitch-red for danger and links.',
  summary:
    'Ballpark Day dresses the Flat engine as a classic day-game scoreboard. `surface.base` is a warm chalk-cream ' +
    '`#f3f1e6`, `border.default` is infield-dirt tan `#cdbf9c`, and `content.primary` is cap navy `#1c2a3a`. ' +
    '`intent.primary` is outfield green `#2f7d3f`, and the lone saturated red — stitch-red `#c0392b` — carries ' +
    '`intent.danger`, `content.link`, and `border.focus`, the way a baseball’s seams are the one red on a white ' +
    'hide. Anton varsity display type finishes the vintage-scoreboard read.',
  origin:
    'Baseball video games and the ballpark — MLB The Show, classic arcade baseball, and the hand-set scoreboard ' +
    'of a day game. Built from the field: cream chalk, infield dirt, outfield grass, cap navy, and a single ' +
    'stitch red.',
  signatures: [
    {
      label: 'Warm chalk-cream field with infield-dirt borders',
      detail:
        '`surface.base` is `#f3f1e6` and `border.default` is `#cdbf9c` — a warm, sunlit day-game ground, not a cool broadcast white.',
    },
    {
      label: 'Outfield-green primary, cap-navy ink',
      detail:
        '`intent.primary.bg` is outfield green `#2f7d3f` and `content.primary` is cap navy `#1c2a3a` — the grass and the ballcap.',
    },
    {
      label: 'A single stitch-red accent',
      detail:
        '`#c0392b` carries `intent.danger`, `content.link`, and `border.focus` — the one saturated red, like the seams on a baseball.',
    },
    {
      label: 'Varsity Anton display type',
      detail:
        'Display and title roles are Anton, uppercased — the tall, heavy block lettering of a vintage scoreboard and team wordmark.',
    },
  ],
  antiSignatures: [
    'A cool broadcast-white or grey page background — the day game reads warm cream',
    'Multiple saturated reds — the stitch-red is meant to be the only one',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm chalk-cream `#f3f1e6` — the day-game ground.' },
    { path: 'color.border.default', note: 'Infield-dirt tan `#cdbf9c` — borders as the diamond.' },
    { path: 'color.intent.danger.bg', note: 'Stitch-red `#c0392b` — the one saturated red, reused for links and focus.' },
    { path: 'typography.role.display.textTransform', note: 'Uppercase Anton — vintage scoreboard lettering.' },
  ],
  lookalikes: [
    {
      against: 'gridiron-broadcast',
      differentiator:
        'Both are American-sport flat registers with navy ink. Gridiron Broadcast is a cool stadium-white TV graphic with a navy primary and end-zone-red; Ballpark Day is a warm chalk-and-cream day game with an outfield-green primary and a single stitch-red.',
    },
    {
      against: 'mid-century-modern',
      differentiator:
        'Both sit on warm paper. Mid-Century Modern is a restrained editorial register; Ballpark Day is a sports scoreboard — infield-dirt borders, an outfield-green primary, a stitch-red accent, and heavy varsity Anton display type.',
    },
  ],
  recallAliases: ['ballpark day', 'baseball', 'mlb', 'the show', 'ballpark', 'day game'],
}
