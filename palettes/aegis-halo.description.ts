import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aegis-halo',
  tagline:
    'The military-sci-fi shield register on the glassmorphism engine, in daylight — pale blue field, translucent cyan-glass panels, deep-cyan ink borders, and a shield-amber warning.',
  summary:
    'Aegis Halo is a powered-armour visor HUD rendered as a bright daytime blueprint. `surface.base` is a pale ' +
    'blue `#f4f9fc`, `surface.raised` is translucent cyan glass, and borders are deep-cyan "ink". `intent.primary` ' +
    'is HUD cyan `#0ea5e9` with a glow focus ring, and `intent.warning` is shield-amber `#f59e0b` — the ' +
    'recharging-shield flash. Orbitron type and a cyan elevation glow finish the sci-fi-shooter read.',
  origin:
    'The heads-up displays of military sci-fi shooters (Halo, Destiny) — energy shields, waypoint markers, and ' +
    'cyan reticles. This register keeps that visor vocabulary but lights it for day: a clean cyan blueprint ' +
    'instead of a glowing dark visor.',
  signatures: [
    {
      label: 'Pale blue field with translucent cyan glass',
      detail:
        '`surface.base` is `#f4f9fc` and `surface.raised` is `rgba(56,189,248,0.12)` — cyan-tinted frosted panels over a daylight blue ground.',
    },
    {
      label: 'Deep-cyan ink borders and HUD-cyan primary',
      detail:
        '`border.strong` is a high-alpha cyan and `intent.primary.bg` is `#0ea5e9` — the reticle/waypoint cyan of a visor HUD.',
    },
    {
      label: 'Shield-amber warning',
      detail:
        '`intent.warning.bg` is `#f59e0b` — the recharging-shield amber flash, the one warm signal in an otherwise cyan HUD.',
    },
    {
      label: 'Orbitron HUD type with a cyan glow',
      detail:
        'Display roles are uppercase Orbitron and `elevation.*` carries a cyan glow plus a glow focus ring — the techy, slightly futuristic lettering and light bloom of a visor.',
    },
  ],
  antiSignatures: [
    'A dark visor background — this register is a daylight blueprint, not a night HUD',
    'A warm or neutral primary — the action colour is reticle cyan',
    'Solid opaque cards with no blur — the panels must read as cyan glass',
  ],
  tokenEvidence: [
    { path: 'color.surface.raised', note: 'Translucent cyan glass `rgba(56,189,248,0.12)`.' },
    { path: 'color.intent.primary.bg', note: 'HUD cyan `#0ea5e9` — the reticle/primary colour.' },
    { path: 'color.intent.warning.bg', note: 'Shield-amber `#f59e0b` — the recharging-shield flash.' },
    { path: 'effect.focusRing.style', note: '`glow` — the visor focus halo.' },
  ],
  lookalikes: [
    {
      against: 'tron-light-grid',
      differentiator:
        'Both are light cyan glassmorphism HUDs. Tron / Light-Grid is a pure single-cyan lightcycle blueprint; Aegis Halo adds the military-shield vocabulary — a shield-amber warning and a deeper, more saturated cyan ink — so it reads as a powered-armour visor rather than a grid.',
    },
    {
      against: 'cel-glass-frost',
      differentiator:
        'Both are cool, frosted, light glass palettes. Cel-Glass Frost is an anime cel-shaded × glass register with ink outlines; Aegis Halo is a sci-fi-shooter HUD — cyan reticle primary, shield-amber warning, Orbitron type, and a glow focus ring.',
    },
  ],
  recallAliases: ['aegis halo', 'halo', 'destiny', 'sci-fi hud', 'visor', 'shield', 'aegis'],
}
