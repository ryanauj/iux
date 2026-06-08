import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'ballpark-day',
  tagline:
    'The baseball-sim register on the Flat engine — warm chalk-cream field, infield-dirt borders, a brick-crimson primary, a cap-navy accent, and outfield-green success.',
  summary:
    'Ballpark Day is a classic-team-triad day game. `surface.base` is a warm chalk-cream `#f6f1e6` with ' +
    'infield-dirt borders and a warm brown-black ink. The three team colours do real work: `intent.primary` is ' +
    'brick-crimson `#b3322c`, the accent on `content.link` and `intent.info` is cap-navy `#1c3a6e`, and ' +
    '`intent.success` is outfield green `#3f9e4d`. A scoreboard amber and a dirt-tan neutral round it out, all ' +
    'set in heavy varsity Anton display type.',
  origin:
    'Baseball video games and the ballpark — MLB The Show, classic arcade baseball, and the hand-set scoreboard ' +
    'of a day game. Built from the field and the uniform: cream chalk, infield dirt, outfield grass, and the ' +
    'crimson-and-navy of a classic team.',
  signatures: [
    {
      label: 'Warm chalk-cream field with infield-dirt borders',
      detail:
        '`surface.base` is `#f6f1e6` and `border.default` is infield-dirt tan `#cdbf9c` — a warm, sunlit day-game ground, not a cool broadcast white.',
    },
    {
      label: 'Crimson primary, cap-navy accent, outfield-green success',
      detail:
        '`intent.primary` is brick-crimson `#b3322c`, `content.link`/`intent.info` carry cap-navy `#1c3a6e`, and `intent.success` is outfield green `#3f9e4d` — a real three-colour team triad rather than one tint.',
    },
    {
      label: 'Warm brown-black ink',
      detail:
        '`content.primary` is `#241a14`, a warm brown-black rather than a cool navy ink — the type reads like printed scoreboard cards on cream.',
    },
    {
      label: 'Varsity Anton display type',
      detail:
        'Display and title roles are Anton, uppercased — the tall, heavy block lettering of a vintage scoreboard and team wordmark.',
    },
  ],
  antiSignatures: [
    'A cool broadcast-white or grey page background — the day game reads warm cream',
    'A single-hue scheme where the primary, accent, and success share one colour',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm chalk-cream `#f6f1e6` — the day-game ground.' },
    { path: 'color.intent.primary.bg', note: 'Brick-crimson `#b3322c` — the primary action.' },
    { path: 'color.intent.info.bg', note: 'Cap-navy `#1c3a6e` — the accent half of the team triad.' },
    { path: 'color.intent.success.bg', note: 'Outfield green `#3f9e4d` — the third triad colour.' },
  ],
  lookalikes: [
    {
      against: 'gridiron-broadcast',
      differentiator:
        'Both are American-sport flat registers that use navy and red. Gridiron Broadcast is a cool stadium-white broadcast with a navy primary and red accent; Ballpark Day inverts that — a warm chalk-cream day game with a crimson primary and a cap-navy accent.',
    },
    {
      against: 'mid-century-modern',
      differentiator:
        'Both sit on warm paper. Mid-Century Modern is a restrained editorial register; Ballpark Day is a sports scoreboard — infield-dirt borders, a crimson/navy/green team triad, and heavy varsity Anton display type.',
    },
  ],
  recallAliases: ['ballpark day', 'baseball', 'mlb', 'the show', 'ballpark', 'day game'],
}
