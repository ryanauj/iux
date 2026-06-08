import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'tactical-recon',
  tagline:
    'The competitive-tactical-shooter register on the glassmorphism engine — warm off-white field, a hot agent-red primary and focus, and a spike-teal success that reads as the planted/defused state.',
  summary:
    'Tactical Recon is a bright agent-select HUD for a round-based tactical FPS. `surface.base` is a warm ' +
    'off-white `#f6f5f3`, panels are translucent glass with backdrop blur, and `intent.primary` is a hot ' +
    'agent-red `#ff4655` carried by the glow focus ring too. `intent.success` is a spike-teal `#0d9488` — the ' +
    '"objective secured" colour. Tight radii and condensed uppercase Oswald keep it crisp and competitive.',
  origin:
    'Round-economy and agent HUDs of tactical shooters (Valorant, Rainbow Six) — high-contrast accent colours ' +
    'over a near-neutral ground, built for instant readability mid-round. The palette keeps that crisp, ' +
    'high-stakes accent language in a light register.',
  signatures: [
    {
      label: 'Warm off-white field, translucent glass panels',
      detail:
        '`surface.base` is `#f6f5f3` and `surface.raised` is `rgba(255,255,255,0.60)` with backdrop blur — a near-neutral tactical ground with frosted panels.',
    },
    {
      label: 'Hot agent-red primary and glow focus',
      detail:
        '`intent.primary.bg` and `border.focus` are agent-red `#ff4655` with a glow focus ring — the high-stakes accent of a competitive HUD.',
    },
    {
      label: 'Spike-teal success',
      detail:
        '`intent.success.bg` is `#0d9488` — the "objective secured / defused" teal that pairs against the red in tactical UI.',
    },
    {
      label: 'Tight radii, condensed uppercase Oswald',
      detail:
        '`radius.lg` is only 6px and the type is condensed uppercase Oswald with wide label tracking — a dense, crisp, mid-round readout.',
    },
  ],
  antiSignatures: [
    'A dark cinematic background — this is a bright agent-select register',
    'Soft, wide, rounded cards — the tactical HUD is tight and square',
    'A cyan or orange primary — the competitive accent here is agent-red',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm off-white tactical ground `#f6f5f3`.' },
    { path: 'color.intent.primary.bg', note: 'Agent-red primary — the high-stakes accent.' },
    { path: 'color.intent.success.bg', note: 'Spike-teal `#0d9488` — the objective-secured colour.' },
    { path: 'radius.lg', note: '6px — tight, crisp tactical panels.' },
  ],
  lookalikes: [
    {
      against: 'mirror-runner',
      differentiator:
        'Both are light FPS glass registers with a red accent. Mirror Runner is colder and stricter — near-white with red as the only saturated colour; Tactical Recon is warmer and busier — an off-white competitive HUD with a red primary plus a spike-teal success and condensed type.',
    },
    {
      against: 'nova-vanguard',
      differentiator:
        'Both are light shooter glass HUDs. Nova Vanguard is an optimistic hero-shooter with a warm orange primary and friendly soft radii; Tactical Recon is a competitive tactical register — agent-red primary, spike-teal success, and tight square panels.',
    },
  ],
  recallAliases: ['tactical recon', 'valorant', 'rainbow six', 'tactical shooter', 'recon', 'agent select'],
}
