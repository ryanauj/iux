import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aurora-spectrum',
  tagline:
    'The cool-side "new tech gradient" register on the `aurora` engine — an azure → cyan → emerald → violet mesh drifting over a blue-black host, the dashboard / dev-tool flavour of the modern-app gradient.',
  summary:
    'Aurora (Spectrum) is the cool sibling of Aurora (Nebula): the same atmospheric engine and the same `surfaceBy: \'luminance\'` surface model, ' +
    'tilted toward the telemetry / observability flavour of the modern gradient (Vercel OG art, Grafana hero sections). `surface.base` is a deep blue-black ' +
    '`#06080f`; `effect.atmosphereGradient` is a four-radial mesh of azure, cyan, emerald, and violet centers that the engine drifts across a 200% canvas on ' +
    'a 48-second loop. Raised cards are translucent `rgba(255,255,255,0.05)` luminance lifts, the primary is a sky-blue `#1d5fd8`, success is an emerald ' +
    'pulled from the gradient, and the focus/accent is cyan `#38bdf8`.',
  origin:
    'Original to the iux design system — a cool register alongside `aurora` (astrophotographic) and `aurora-nebula` (warm marketing). Spectrum borrows from ' +
    'developer-tool and analytics chrome: the blue → cyan → teal gradients that dashboards, telemetry dashes, and infra landing pages have leaned on since the ' +
    'early 2020s. It is the "data dashboard" answer to the new-tech-gradient brief.',
  signatures: [
    {
      label: 'Cool four-radial drifting `effect.atmosphereGradient`',
      detail:
        'The engine paints `radial-gradient(at 24% 26%, rgba(37,99,235,0.44), transparent 56%), radial-gradient(at 80% 34%, rgba(34,211,238,0.38), transparent 58%), radial-gradient(at 58% 84%, rgba(16,185,129,0.34), transparent 58%), radial-gradient(at 12% 88%, rgba(139,92,246,0.30), transparent 54%)` and drifts it over a 48s `alternate` loop. The azure → cyan → emerald → violet run is the cool dev-tool register.',
    },
    {
      label: '`effect.surfaceBy: \'luminance\'` — surfaces by light density, not borders',
      detail:
        'Shared with `aurora` and `aurora-nebula`: raised cards are translucent luminance lifts over the same drifting mesh. The engine block paints a soft outer white halo via `--luminance-center` plus a `backdrop-filter` blur so edges dissolve into the gradient.',
    },
    {
      label: 'Blue-black floor with a sky-blue primary and emerald success',
      detail:
        '`surface.base` is `#06080f` (a deeper, cooler floor than Nebula\'s violet-black). `intent.primary.bg` is sky-blue `#1d5fd8` and `intent.success.bg` is emerald `#0d8466` — both picked out of the cool gradient register so the UI accents match the atmosphere.',
    },
    {
      label: 'Paired outer-cyan-glow + inner-white-lift elevation (no hard offsets)',
      detail:
        '`elevation.low` is `0 0 24px 2px rgba(56,189,248,0.12), inset 0 0 20px rgba(255,255,255,0.03)`, scaling to an 80px cyan glow at `overlay`. The cyan glow (vs Nebula\'s violet) is the cool-register tell.',
    },
  ],
  antiSignatures: [
    'Any opaque `surface.raised` fill (defeats the luminance surface model)',
    'A warm violet/fuchsia center run (that is `aurora-nebula` — Spectrum is azure/cyan/emerald)',
    'Hard offset shadows on `elevation.*` (the metaphor is brighter atmosphere)',
    '`atmosphereGradient: \'none\'` (Spectrum\'s look is the drifting mesh)',
  ],
  tokenEvidence: [
    {
      path: 'effect.atmosphereGradient',
      note: 'Four-radial azure / cyan / emerald / violet mesh — the cool "new tech gradient" the engine drifts at the root.',
    },
    {
      path: 'color.surface.base',
      note: 'Blue-black `#06080f` — a deeper, cooler floor than Nebula\'s violet-black.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Sky-blue `#1d5fd8` — the cool-register primary, matched to the gradient\'s azure center.',
    },
    {
      path: 'color.intent.success.bg',
      note: 'Emerald `#0d8466` — picked out of the gradient\'s emerald center.',
    },
    {
      path: 'effect.luminanceCenter',
      note: '`rgba(255,255,255,0.08)` — the translucent halo the engine glows around raised surfaces.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: 'Paired cyan outer glow + white inner lift + ink drop — the cyan glow is the cool-register tell.',
    },
  ],
  lookalikes: [
    {
      against: 'aurora-nebula',
      differentiator:
        'Its warm sibling on the same engine. Nebula runs violet / fuchsia / cyan with a violet primary and fuchsia danger — the marketing-hero register. Spectrum runs azure / cyan / emerald / violet with a sky-blue primary and emerald success — the dashboard / dev-tool register.',
    },
    {
      against: 'aurora',
      differentiator:
        'Same engine and surface model. The original `aurora` runs deep purple / atmospheric green / teal with a purple primary; Spectrum runs a brighter, more saturated azure / cyan / emerald with a sky-blue primary — cooler, more dev-tool than astrophotographic.',
    },
    {
      against: 'liquid-glass-dark',
      differentiator:
        'Liquid Glass Dark is a `glassmorphism`-engine dark register with `surfaceBy: \'border\'`: translucent panels demarcated by sky-cyan refraction hairlines over a static near-black host. Spectrum is on the `aurora` engine with `surfaceBy: \'luminance\'`, a drifting mesh at the root, and recessive white borders. Same dark glassy feel, completely different surface model.',
    },
  ],
  thrivesWith: [
    'Dashboards, charts, and telemetry views — the cool drifting mesh reads as living infra chrome behind translucent panels',
    'Card, Modal, Drawer, Toast — translucent fill + backdrop blur + luminance halo at every tier',
    'Tabs, Segmented, Pagination — `aria-selected="true"` triggers the engine\'s luminance + accent-inset selection cue',
  ],
  degradesWith: [
    'Dense Tables and VirtualList — luminance lifts don\'t separate rows the way hard borders do',
    'Browsers without `backdrop-filter` — the edge-dissolution into the mesh is lost',
  ],
  recallAliases: ['aurora spectrum', 'spectrum', 'new tech gradient', 'tech gradient', 'dashboard gradient'],
}
