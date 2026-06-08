import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'mirror-runner',
  tagline:
    'The clean-city first-person register on the glassmorphism engine — near-white field, translucent neutral-glass panels, a hot runner-red primary and glow focus, and a cool sign-blue secondary.',
  summary:
    'Mirror Runner is a sunlit parkour-FPS HUD. `surface.base` is a near-white `#f6f8fb`, surfaces are ' +
    'translucent neutral glass with backdrop blur, and the action colour is a hot runner-red `#e8392f` on ' +
    '`border.focus` and `intent.primary` with a glow focus ring. A cool sign-blue `#2563eb` carries ' +
    '`content.link` and `intent.info` — the red-and-blue wayfinding of a bright city, so the palette reads as ' +
    'two clear accents on white rather than one red wash.',
  origin:
    'The parkour first-person look (Mirror’s Edge) — a bright white city where the hot red highlight marks the ' +
    'next interactable and cooler blues/yellows mark signage. The palette keeps that disciplined accents-on-white ' +
    'language.',
  signatures: [
    {
      label: 'Near-white field with red and blue accents',
      detail:
        '`surface.base` is `#f6f8fb` and almost everything is neutral — the saturated hues are a hot runner-red (primary, focus) and a cool sign-blue (links, info).',
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
    'A warm secondary accent — the secondary here is a cool sign-blue',
    'Solid opaque cards with no blur — the panels must read as glass',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Near-white city field `#f6f8fb`.' },
    { path: 'color.border.focus', note: 'Hot runner-red `#e8392f` — the primary accent.' },
    { path: 'color.content.link', note: 'Cool sign-blue `#2563eb` — the secondary accent.' },
    { path: 'effect.focusRing.style', note: '`glow` — the runner-vision focus halo.' },
  ],
  lookalikes: [
    {
      against: 'tron-light-grid',
      differentiator:
        'Both are light glassmorphism HUDs with a glow focus ring. Tron / Light-Grid is built on a single cool cyan; Mirror Runner is built on neutral white glass with a hot red primary and a cool blue secondary — a warm parkour accent rather than a cyan blueprint.',
    },
    {
      against: 'tactical-recon',
      differentiator:
        'Both are light FPS glass registers. Tactical Recon is a warm off-white scanner HUD with an acid-green primary and magenta accent; Mirror Runner is a cool near-white city with a red primary and blue secondary.',
    },
  ],
  recallAliases: ['mirror runner', 'mirrors edge', "mirror's edge", 'parkour', 'runner', 'fps'],
}
