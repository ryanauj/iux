import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'gridiron-broadcast',
  tagline:
    'The American-football broadcast register on the Flat engine — cool stadium-white field, chalk yard-line borders, stadium-navy primary, end-zone-red danger, and tightly-condensed uppercase type.',
  summary:
    'Gridiron Broadcast dresses the Flat engine as a network football score bug. `surface.base` is a cool ' +
    'stadium-white `#eef2f6`, `border.default` is a chalk yard-line `#bccbd9`, and `intent.primary` is stadium ' +
    'navy `#163a63`. Danger is end-zone red `#c62828` and warning is penalty-flag yellow `#e0a400`. The type is ' +
    'condensed uppercase Saira Condensed / Oswald with tight radii — the lower-third HUD of a Sunday broadcast.',
  origin:
    'Pro-football video games and TV broadcast — the play-call HUD, the score bug, and the yard-line graphics. ' +
    'Built from the stadium: bright turf-white, chalk lines, navy-and-red team chrome, and a penalty-flag yellow.',
  signatures: [
    {
      label: 'Cool stadium-white field with chalk borders',
      detail:
        '`surface.base` is `#eef2f6` and `border.default` is the chalk yard-line `#bccbd9` — a bright, cool broadcast ground rather than a warm paper.',
    },
    {
      label: 'Stadium-navy primary, end-zone-red danger',
      detail:
        '`intent.primary.bg` is navy `#163a63` and `intent.danger.bg` is end-zone red `#c62828` — the navy-and-red team chrome of a football broadcast.',
    },
    {
      label: 'Tightly-condensed uppercase display type',
      detail:
        'Display roles are Saira Condensed / Oswald, uppercased — the narrow, tall lettering of a lower-third score bug that has to fit a lot in a small strip.',
    },
    {
      label: 'Tight radii and hard edges',
      detail:
        '`radius.md` is only 4px — broadcast graphics are square-cornered panels, not soft app cards.',
    },
  ],
  antiSignatures: [
    'A warm-paper or hardwood page background — this register is a cool broadcast white',
    'Wide, soft, rounded cards — the score bug is square-cornered and dense',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Cool stadium-white `#eef2f6` — the broadcast ground.' },
    { path: 'color.intent.primary.bg', note: 'Stadium navy `#163a63` — the primary team chrome.' },
    { path: 'color.intent.danger.bg', note: 'End-zone red `#c62828` — danger as the scoring zone colour.' },
    { path: 'radius.md', note: '4px — square-cornered broadcast panels.' },
  ],
  lookalikes: [
    {
      against: 'nordic-frost',
      differentiator:
        'Both are navy-on-cool-white flat palettes. Nordic Frost is a calm Scandinavian register with soft radii and an Inter grotesque; Gridiron Broadcast is a sports HUD — chalk yard-line borders, an end-zone-red danger, condensed uppercase type, and tighter radii.',
    },
    {
      against: 'ballpark-day',
      differentiator:
        'Both are American-sport flat registers with navy ink. Ballpark Day is a warm chalk-and-cream day game with an outfield-green primary and stitch-red; Gridiron Broadcast is a cool stadium-white broadcast with a navy primary and end-zone-red.',
    },
  ],
  recallAliases: ['gridiron', 'american football', 'nfl', 'madden', 'football broadcast', 'gridiron broadcast'],
}
