import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aegis-halo',
  tagline:
    'The military-sci-fi shield register on the glassmorphism engine, in daylight — off-white field, neutral white-glass panels with cyan borders, a reticle-cyan primary, and a shield-gold accent on links, strong borders, and the recharge-flash warning.',
  summary:
    'Aegis Halo is a visor HUD built on a cyan-and-gold pairing. `surface.base` is a neutral off-white `#f7f9fb`, ' +
    '`surface.raised` is neutral white glass over a cyan elevation glow and cyan borders, and `intent.primary` is reticle-cyan ' +
    '`#0ea5e9` with a glow focus ring. The counter-accent is shield-gold `#f59e0b`, carried by `content.link`, ' +
    '`border.strong`, and the recharge-flash `intent.warning` — the warm signal that keeps the HUD from reading ' +
    'as a single cyan wash. Orbitron type finishes the sci-fi-shooter look.',
  origin:
    'The heads-up displays of military sci-fi shooters (Halo, Destiny) — energy shields, waypoint markers, and ' +
    'cyan reticles, with a warm amber shield-recharge flash. This register lights that visor vocabulary for day ' +
    'as a clean cyan-and-gold blueprint.',
  signatures: [
    {
      label: 'Neutral white-glass panels with cyan borders and glow',
      detail:
        '`surface.raised` is neutral white glass while `border.default`/`elevation.*` carry the cyan — frosted panels read by their cyan edges and glow, not a tinted fill, over an off-white ground.',
    },
    {
      label: 'Reticle-cyan primary against a shield-gold accent',
      detail:
        '`intent.primary.bg` is cyan `#0ea5e9` while `content.link`, `border.strong`, and `intent.warning` carry shield-gold `#f59e0b` — a cyan/gold pairing, not one hue.',
    },
    {
      label: 'Shield-gold recharge warning',
      detail:
        '`intent.warning.bg` is a high-alpha gold `#f59e0b` — the recharging-shield flash, the one warm signal in an otherwise cyan HUD.',
    },
    {
      label: 'Orbitron HUD type with a glow focus',
      detail:
        'Display roles are uppercase Orbitron and `effect.focusRing.style` is `glow` — the techy, slightly futuristic lettering and light bloom of a visor.',
    },
  ],
  antiSignatures: [
    'A dark visor background — this register is a daylight blueprint, not a night HUD',
    'A single all-cyan scheme with no warm accent — the gold pairing is load-bearing',
    'Solid opaque cards with no blur — the panels must read as cyan glass',
  ],
  tokenEvidence: [
    { path: 'color.surface.raised', note: 'Neutral white glass — colour lives in the cyan borders and glow, not the fill.' },
    { path: 'color.intent.primary.bg', note: 'Reticle-cyan `#0ea5e9` — the primary colour.' },
    { path: 'color.intent.warning.bg', note: 'Shield-gold `#f59e0b` — the recharge-flash accent.' },
    { path: 'color.border.strong', note: 'Gold strong border — the accent on emphasis edges.' },
  ],
  lookalikes: [
    {
      against: 'tron-light-grid',
      differentiator:
        'Both are light cyan glassmorphism HUDs. Tron / Light-Grid is a pure single-cyan lightcycle blueprint; Aegis Halo adds a warm shield-gold accent (links, strong border, warning) so it reads as a powered-armour visor rather than a grid.',
    },
    {
      against: 'nova-vanguard',
      differentiator:
        'Both are light sci-fi shooter glass HUDs with a warm/cool pairing. Nova Vanguard is an optimistic hero shooter on orange-and-blue with soft radii; Aegis Halo is a military visor on cyan-and-gold with Orbitron type and a cyan glow.',
    },
  ],
  recallAliases: ['aegis halo', 'halo', 'destiny', 'sci-fi hud', 'visor', 'shield', 'aegis'],
}
