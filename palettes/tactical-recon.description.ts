import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'tactical-recon',
  tagline:
    'The competitive-tactical-shooter register on the glassmorphism engine — warm off-white field, an acid scanner-green primary and glow focus, a hot magenta accent, and a spike-teal success.',
  summary:
    'Tactical Recon is a night-vision-scanner HUD lit for day. `surface.base` is a warm off-white `#f4f5f1`, ' +
    'panels are translucent glass with backdrop blur, and `intent.primary` is acid scanner-green `#65a30d` with ' +
    'a glow focus ring. The counter-accent is a hot recon-magenta `#be185d` on `content.link` and `intent.info`, ' +
    'and `intent.success` is a separate spike-teal `#0d9488` so it never collapses into the primary green — a ' +
    'green / magenta / teal spread, set in condensed uppercase Oswald with tight radii.',
  origin:
    'Round-economy and recon overlays of tactical shooters — scanner sweeps, ping markers, and high-contrast ' +
    'objective colours built for instant mid-round readability. The palette keeps that crisp scanner-green-and-' +
    'magenta language in a light register.',
  signatures: [
    {
      label: 'Acid scanner-green primary against a hot magenta accent',
      detail:
        '`intent.primary.bg` is acid-green `#65a30d` (with a green glow focus) while `content.link` and `intent.info` carry recon-magenta `#be185d` — a strong green/magenta pairing.',
    },
    {
      label: 'Spike-teal success, distinct from the green primary',
      detail:
        '`intent.success.bg` is `#0d9488` teal, deliberately a different hue from the primary green so "objective secured" never reads as the same colour as the action.',
    },
    {
      label: 'Warm off-white field, translucent glass panels',
      detail:
        '`surface.base` is `#f4f5f1` and `surface.raised` is `rgba(255,255,255,0.58)` with backdrop blur — a near-neutral tactical ground with frosted panels.',
    },
    {
      label: 'Tight radii, condensed uppercase Oswald',
      detail:
        '`radius.lg` is only 6px and the type is condensed uppercase Oswald with wide label tracking — a dense, crisp, mid-round readout.',
    },
  ],
  antiSignatures: [
    'A single-green scheme where primary, success, and accent all share the green',
    'A dark cinematic background — this is a bright scanner register',
    'Soft, wide, rounded cards — the tactical HUD is tight and square',
  ],
  tokenEvidence: [
    { path: 'color.intent.primary.bg', note: 'Acid scanner-green `#65a30d` — the primary action.' },
    { path: 'color.content.link', note: 'Recon-magenta `#be185d` — the counter-accent.' },
    { path: 'color.intent.success.bg', note: 'Spike-teal `#0d9488` — success, distinct from the green.' },
    { path: 'effect.focusRing.color', note: 'Green glow focus — the scanner sweep colour.' },
  ],
  lookalikes: [
    {
      against: 'mirror-runner',
      differentiator:
        'Both are light FPS glass registers. Mirror Runner is a cool near-white city with a red primary and blue secondary; Tactical Recon is a warm off-white scanner HUD with an acid-green primary, magenta accent, and teal success.',
    },
    {
      against: 'nova-vanguard',
      differentiator:
        'Both are light shooter glass HUDs. Nova Vanguard is an optimistic hero shooter on warm orange-and-blue with soft radii; Tactical Recon is a competitive scanner register on green-and-magenta with tight square panels.',
    },
  ],
  recallAliases: ['tactical recon', 'recon', 'tactical shooter', 'scanner', 'valorant', 'rainbow six', 'agent select'],
}
