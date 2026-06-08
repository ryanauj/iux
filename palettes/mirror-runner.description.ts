import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'mirror-runner',
  tagline:
    'The clean-city first-person register on the glassmorphism engine — near-white field, translucent neutral-glass panels, and one hot runner-red that carries every primary action, link, and glowing focus ring.',
  summary:
    'Mirror Runner is a sunlit parkour-FPS HUD. `surface.base` is a near-white `#f7f9fb`, surfaces are ' +
    'translucent neutral glass with backdrop blur, and the entire chromatic budget is one hot runner-red — ' +
    '`#e8392f` for `border.focus` and `intent.primary`, `#dc2626` for `content.link`. The focus ring is a ' +
    'glow (`effect.focusRing.style: glow`), so the one interactive thing lights up red out of a blinding-white ' +
    'world, exactly like runner-vision picking a path.',
  origin:
    'The parkour first-person look (Mirror’s Edge) — a bright white city where the only saturated colour is the ' +
    'red highlight marking the next thing you can interact with. The palette treats that one-accent-on-white ' +
    'discipline as the whole design.',
  signatures: [
    {
      label: 'Near-white field with one red accent',
      detail:
        '`surface.base` is `#f7f9fb` and almost everything is neutral — the only saturated hue is a hot runner-red carried by primary, link, and focus.',
    },
    {
      label: 'Translucent glass panels with backdrop blur',
      detail:
        '`surface.raised` is `rgba(255,255,255,0.55)` and `effect.backdropBlur.md` is `blur(10px)` — frosted panels float over the white city rather than sitting as solid cards.',
    },
    {
      label: 'Glowing red focus ring',
      detail:
        '`effect.focusRing.style` is `glow` with colour `#e8392f` — the runner-vision halo that picks the one interactive element out of the white.',
    },
    {
      label: 'Clean uppercase Exo 2 type',
      detail:
        'Display and label roles are uppercase Exo 2 — a clean, slightly technical grotesque, not a heavy scoreboard or an ornate fantasy serif.',
    },
  ],
  antiSignatures: [
    'A dark or cinematic background — this register is a bright daylight city',
    'A second saturated accent colour competing with the red — the budget is one red',
    'Solid opaque cards with no blur — the panels must read as glass',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Near-white city field `#f7f9fb`.' },
    { path: 'color.border.focus', note: 'Hot runner-red `#e8392f` — the one accent.' },
    { path: 'effect.focusRing.style', note: '`glow` — the runner-vision focus halo.' },
    { path: 'effect.backdropBlur.md', note: '`blur(10px)` — frosted glass panels.' },
  ],
  lookalikes: [
    {
      against: 'tron-light-grid',
      differentiator:
        'Both are light glassmorphism HUDs with a glow focus ring. Tron / Light-Grid is built on a single cool cyan; Mirror Runner is built on neutral white glass plus one hot red — a warm parkour accent rather than a cyan blueprint.',
    },
    {
      against: 'tactical-recon',
      differentiator:
        'Both are light FPS glass registers with a red accent. Tactical Recon is a warm off-white competitive HUD with a red primary plus a spike-teal success; Mirror Runner is colder and stricter — near-white with red as the only saturated colour.',
    },
  ],
  recallAliases: ['mirror runner', 'mirrors edge', "mirror's edge", 'parkour', 'runner', 'fps'],
}
