import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'nova-vanguard',
  tagline:
    'The optimistic hero-shooter register on the glassmorphism engine — cool near-white field, a warm hero-orange primary, a confident team-blue info, and friendly soft radii.',
  summary:
    'Nova Vanguard is a bright, welcoming objective HUD for a squad shooter. `surface.base` is a cool near-white ' +
    '`#f9fbfe`, panels are translucent glass with backdrop blur, and the palette runs on two confident colours: ' +
    'hero-orange `#f97316` for `intent.primary` and the glow focus, and team-blue `#2563eb` for `intent.info`. ' +
    'Generous radii (`radius.lg` 14px) and rounded Chakra Petch type make it airy and friendly rather than ' +
    'dark and cinematic.',
  origin:
    'The high-saturation, optimistic HUDs of hero shooters (Overwatch, Apex Legends) — orange/blue team chrome, ' +
    'objective markers, and ability icons, here rendered light and airy instead of dark and gritty.',
  signatures: [
    {
      label: 'Cool near-white field, translucent glass panels',
      detail:
        '`surface.base` is `#f9fbfe` and `surface.raised` is `rgba(255,255,255,0.58)` with backdrop blur — a bright, airy ground rather than a dark arena.',
    },
    {
      label: 'Warm hero-orange primary',
      detail:
        '`intent.primary.bg` and `border.focus` are hero-orange `#f97316` with a glow focus ring — the warm, energetic action colour of a hero shooter.',
    },
    {
      label: 'Confident team-blue info',
      detail:
        '`intent.info.bg` is team-blue `#2563eb` — the orange/blue pairing that reads as squad chrome.',
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
    { path: 'color.surface.base', note: 'Cool near-white arena light `#f9fbfe`.' },
    { path: 'color.intent.primary.bg', note: 'Hero-orange primary — the energetic action colour.' },
    { path: 'color.intent.info.bg', note: 'Team-blue `#2563eb` — the other half of the squad chrome.' },
    { path: 'radius.lg', note: '14px — friendly, airy hero HUD.' },
  ],
  lookalikes: [
    {
      against: 'tactical-recon',
      differentiator:
        'Both are light shooter glass HUDs. Tactical Recon is a competitive tactical register — agent-red primary, spike-teal success, tight square panels; Nova Vanguard is an optimistic hero shooter — warm orange primary, team-blue info, and soft, airy radii.',
    },
    {
      against: 'aegis-halo',
      differentiator:
        'Both are sci-fi shooter glass HUDs. Aegis Halo is a cool cyan military visor with a shield-amber warning; Nova Vanguard is a warm, friendly hero-shooter HUD built on an orange/blue pairing with rounder, softer panels.',
    },
  ],
  recallAliases: ['nova vanguard', 'overwatch', 'apex', 'apex legends', 'hero shooter', 'vanguard'],
}
