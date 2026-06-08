import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'gridiron-broadcast',
  tagline:
    'The American-football broadcast register on the Flat engine — cool stadium-white field, chalk yard-line borders, stadium-navy primary, and an end-zone-red accent on links, focus, and danger.',
  summary:
    'Gridiron Broadcast is a navy-and-red network score bug. `surface.base` is a cool stadium-white `#eef2f6` with ' +
    'chalk yard-line borders, `intent.primary` is stadium navy `#1d3a63`, and the counter-accent is end-zone red ' +
    '`#c62828` carried by `content.link`, `border.focus`, and `intent.danger` — the classic two-colour team chrome. ' +
    'A first-down green, a penalty-flag yellow, and a first-down-line blue fill out the graphics kit, all set in ' +
    'condensed uppercase Saira Condensed with tight square radii.',
  origin:
    'Pro-football video games and TV broadcast — the play-call HUD, the score bug, and the yard-line graphics. ' +
    'Built from the stadium: bright turf-white, chalk lines, and the navy-and-red two-colour team chrome.',
  signatures: [
    {
      label: 'Cool stadium-white field with chalk borders',
      detail:
        '`surface.base` is `#eef2f6` and `border.default` is the chalk yard-line `#bccbd9` — a bright, cool broadcast ground rather than a warm paper.',
    },
    {
      label: 'Stadium-navy primary against an end-zone-red accent',
      detail:
        '`intent.primary.bg` is navy `#1d3a63` while `content.link`, `border.focus`, and `intent.danger` carry end-zone red `#c62828` — the navy-and-red team chrome of a football broadcast.',
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
    { path: 'color.intent.primary.bg', note: 'Stadium navy `#1d3a63` — the primary team chrome.' },
    { path: 'color.content.link', note: 'End-zone red `#c62828` — the counter-accent on links and focus.' },
    { path: 'radius.md', note: '4px — square-cornered broadcast panels.' },
  ],
  lookalikes: [
    {
      against: 'nordic-frost',
      differentiator:
        'Both are navy-on-cool-white flat palettes. Nordic Frost is a calm Scandinavian register with soft radii and an Inter grotesque; Gridiron Broadcast is a sports HUD — chalk yard-line borders, an end-zone-red accent, condensed uppercase type, and tighter radii.',
    },
    {
      against: 'ballpark-day',
      differentiator:
        'Both are American-sport flat registers that use navy and red. Gridiron Broadcast is a cool stadium-white broadcast with a navy primary and red accent; Ballpark Day is a warm chalk-and-cream day game with a brick-crimson primary and a cap-navy accent.',
    },
  ],
  recallAliases: ['gridiron', 'american football', 'nfl', 'madden', 'football broadcast', 'gridiron broadcast'],
}
