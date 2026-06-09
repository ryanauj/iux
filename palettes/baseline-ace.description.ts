import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'baseline-ace',
  tagline:
    'The tennis-sim register on the Flat engine — cool hard-court field, a vivid hard-court-blue primary, and a fluorescent tennis-ball lime accent on focus, links, and success.',
  summary:
    'Baseline Ace is a complementary blue-and-lime tennis court. `surface.base` is a neutral off-white `#f7f9fa`, ' +
    '`intent.primary` is a vivid hard-court blue `#1f7ec0`, and the counter-accent is a fluorescent tennis-ball ' +
    'lime `#82c91e` carried by `border.focus`, `intent.success`, and (a deeper shade) `content.link`. The blue ' +
    'court and the electric ball give it a real two-colour palette rather than a single teal wash; line-call ' +
    'amber, fault red, and sky info round it out, set in airy Rajdhani type.',
  origin:
    'Tennis video games and broadcast — Top Spin, Virtua Tennis, Mario Tennis, and the clean line-call HUD of ' +
    'televised tennis. Built from the complementary pair that defines the sport on screen: the blue hard court ' +
    'and the fluorescent yellow ball.',
  signatures: [
    {
      label: 'Hard-court-blue primary against a ball-lime accent',
      detail:
        '`intent.primary.bg` is hard-court blue `#1f7ec0` while `border.focus` and `intent.success` carry fluorescent ball-lime `#82c91e` — a complementary blue/lime pairing, not one hue.',
    },
    {
      label: 'Neutral off-white field',
      detail:
        '`surface.base` is `#f7f9fa` lifting to pure-white cards — a clean neutral page, so the blue primary and lime accent both read against it rather than a tinted court.',
    },
    {
      label: 'Lime as the single electric accent',
      detail:
        'The ball-lime appears only on focus, success, and links — the one fluorescent colour on an otherwise cool court, like the ball itself.',
    },
    {
      label: 'Generous radii, bright modern type',
      detail:
        '`radius.lg` is 16px and the type is Rajdhani — a clean, airy, contemporary tennis HUD rather than a dense scoreboard.',
    },
  ],
  antiSignatures: [
    'A single teal or green wash where surface, primary, and accent share one hue',
    'A saturated or warm-paper page background — the field stays a neutral off-white',
    'Translucent glass panels or backdrop blur — this is a solid Flat engine, not a HUD',
  ],
  tokenEvidence: [
    { path: 'color.intent.primary.bg', note: 'Hard-court blue `#1f7ec0` — the primary action.' },
    { path: 'color.border.focus', note: 'Tennis-ball lime `#82c91e` — the complementary accent.' },
    { path: 'color.intent.success.bg', note: 'Ball-lime success — the electric accent reused for state.' },
    { path: 'radius.lg', note: '16px — airy, modern court HUD.' },
  ],
  lookalikes: [
    {
      against: 'coastal-modern',
      differentiator:
        'Both use cool blue on a light field. Coastal Modern is a calm single-family seaside brand register; Baseline Ace is a tennis HUD whose defining move is a complementary fluorescent ball-lime accent against the blue court — coastal has no such electric pop.',
    },
    {
      against: 'gridiron-broadcast',
      differentiator:
        'Both are cool-field sports flat registers in the blue family. Gridiron Broadcast is a deep stadium-navy with a red accent and condensed type; Baseline Ace is a brighter hard-court blue with a fluorescent lime accent and airy rounded type.',
    },
  ],
  recallAliases: ['baseline ace', 'tennis', 'top spin', 'mario tennis', 'court', 'ace'],
}
