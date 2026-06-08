import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'nova-vanguard',
  tagline:
    'The optimistic hero-shooter register on the glassmorphism engine — cool near-white field, a complementary hero-orange primary and team-blue accent, and friendly soft radii.',
  summary:
    'Nova Vanguard is a bright, welcoming objective HUD built on a complementary orange-and-blue pairing. ' +
    '`surface.base` is a cool near-white `#f7fafe`, panels are translucent glass with backdrop blur and an orange ' +
    'elevation glow, and `intent.primary` is hero-orange `#f97316` with a glow focus ring. The accent is team-blue ' +
    '`#2563eb` on `content.link` and `intent.info`. Generous radii (`radius.lg` 14px) and rounded Chakra Petch ' +
    'type make it airy and friendly rather than dark and cinematic.',
  origin:
    'The high-saturation, optimistic HUDs of hero shooters (Overwatch, Apex Legends) — orange/blue team chrome, ' +
    'objective markers, and ability icons, here rendered light and airy instead of dark and gritty.',
  signatures: [
    {
      label: 'Complementary hero-orange primary and team-blue accent',
      detail:
        '`intent.primary.bg`/`border.focus` are hero-orange `#f97316`, while `content.link` and `intent.info` carry team-blue `#2563eb` — the orange/blue pairing that reads as squad chrome.',
    },
    {
      label: 'Cool near-white field, translucent glass panels',
      detail:
        '`surface.base` is `#f7fafe` and `surface.raised` is `rgba(255,255,255,0.58)` with backdrop blur — a bright, airy ground rather than a dark arena.',
    },
    {
      label: 'Warm orange elevation glow',
      detail:
        '`elevation.*` carries an orange glow (`rgba(249,115,22,…)`) so raised panels feel energetic and lit rather than flatly shadowed.',
    },
    {
      label: 'Friendly soft radii',
      detail:
        '`radius.lg` is 14px and the type is rounded Chakra Petch — an inviting, optimistic HUD, not a tight tactical readout.',
    },
  ],
  antiSignatures: [
    'A dark, gritty, cinematic background — this register is bright and optimistic',
    'A single-accent monochrome scheme — Nova runs on the orange/blue pairing',
    'Tight, square, dense panels — the hero HUD is airy with soft radii',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Cool near-white arena light `#f7fafe`.' },
    { path: 'color.intent.primary.bg', note: 'Hero-orange primary — the energetic action colour.' },
    { path: 'color.intent.info.bg', note: 'Team-blue `#2563eb` — the complementary accent.' },
    { path: 'radius.lg', note: '14px — friendly, airy hero HUD.' },
  ],
  lookalikes: [
    {
      against: 'tactical-recon',
      differentiator:
        'Both are light shooter glass HUDs. Tactical Recon is a competitive scanner register on green-and-magenta with tight square panels; Nova Vanguard is an optimistic hero shooter on warm orange-and-blue with soft, airy radii.',
    },
    {
      against: 'aegis-halo',
      differentiator:
        'Both are sci-fi shooter glass HUDs with a warm/cool pairing. Aegis Halo is a cool cyan military visor with a shield-gold accent and Orbitron type; Nova Vanguard is a warm, friendly hero-shooter HUD on orange-and-blue with rounder panels.',
    },
  ],
  recallAliases: ['nova vanguard', 'overwatch', 'apex', 'apex legends', 'hero shooter', 'vanguard'],
}
