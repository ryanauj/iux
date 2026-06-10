import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aurora-nebula',
  tagline:
    'The warm-side "new tech gradient" register on the `aurora` engine — a violet → magenta → cyan → indigo mesh drifting over a violet-black host, surfaces demarcated by light density rather than borders.',
  summary:
    'Aurora (Nebula) is the modern-app hero-gradient look (Linear / Stripe / Raycast marketing chrome) expressed through the `aurora` engine. ' +
    '`surface.base` is a near-neutral violet-black `#0b0813`; the chroma comes entirely from `effect.atmosphereGradient`, a four-radial mesh of ' +
    'violet, fuchsia, cyan, and indigo centers that the engine paints at the palette root and slowly drifts across a 200% canvas on a 48-second loop. ' +
    'Like `aurora` it sets `effect.surfaceBy: \'luminance\'` — raised cards are translucent `rgba(255,255,255,0.05)` luminance lifts (brighter patches of ' +
    'the same nebula) rather than opaque bordered panels — but it tilts the register warm: violet primary, fuchsia danger, and a cyan link picked out of ' +
    'the gradient itself.',
  origin:
    'Original to the iux design system — a warm sibling to the original `aurora`. Where `aurora` borrows from astrophotography and ambient screensavers, ' +
    'Nebula borrows from the current wave of product-marketing gradients: the saturated mesh-gradient hero sections that Linear, Stripe, Vercel, and Raycast ' +
    'normalized after ~2021. It is the answer to "make it look like how a lot of apps look now" expressed through the atmospheric engine.',
  signatures: [
    {
      label: 'Warm four-radial drifting `effect.atmosphereGradient`',
      detail:
        'The engine paints `radial-gradient(at 20% 25%, rgba(124,58,237,0.45), transparent 55%), radial-gradient(at 80% 30%, rgba(217,70,239,0.40), transparent 58%), radial-gradient(at 62% 82%, rgba(34,211,238,0.36), transparent 58%), radial-gradient(at 12% 90%, rgba(99,102,241,0.34), transparent 54%)` at the root and drifts `background-position` over a 48s `alternate` loop. The violet → fuchsia → cyan → indigo run is the warm "new tech" register.',
    },
    {
      label: '`effect.surfaceBy: \'luminance\'` — surfaces by light density, not borders',
      detail:
        'Shared with `aurora`: a raised card is not a different opaque fill, it is a translucent luminance lift over the same drifting mesh. The engine block paints a soft outer white halo via `--luminance-center` plus a `backdrop-filter` blur so the edge dissolves into the gradient instead of cutting it.',
    },
    {
      label: 'Violet-black near-neutral floor with all chroma in the gradient',
      detail:
        '`surface.base` is `#0b0813` — a faint violet bias on near-black. It supplies no chroma of its own; every saturated color the eye reads comes from the drifting atmosphere, which is what keeps the surface from competing with the mesh.',
    },
    {
      label: 'Paired outer-violet-glow + inner-white-lift elevation (no hard offsets)',
      detail:
        '`elevation.low` is `0 0 24px 2px rgba(139,92,246,0.12), inset 0 0 20px rgba(255,255,255,0.03)`, scaling to an 80px violet glow at `overlay`. No hard offset shadows at any tier — the metaphor is "a brighter patch of the nebula," not paper on paper.',
    },
    {
      label: 'Cyan link and fuchsia danger picked out of the mesh',
      detail:
        '`content.link` is `#67e8f9` (cyan) and `intent.danger.bg` is a fuchsia-lean `#be2667` — both pulled from the gradient register so calls-to-action and alerts read as part of the atmosphere rather than fighting it. Focus holds full-chroma violet `#c4b5fd`.',
    },
  ],
  antiSignatures: [
    'Any opaque `surface.raised` fill (defeats the luminance surface model)',
    'Hard offset shadows on `elevation.*` (the metaphor is brighter atmosphere, not paper-above-paper)',
    '`atmosphereGradient: \'none\'` (Nebula\'s entire look is the drifting mesh)',
    'A green/teal astrophotographic center run (that is the original `aurora` — Nebula is warm violet/fuchsia/cyan)',
  ],
  tokenEvidence: [
    {
      path: 'effect.atmosphereGradient',
      note: 'Four-radial violet / fuchsia / cyan / indigo mesh — the warm "new tech gradient" the engine paints and drifts at the root.',
    },
    {
      path: 'effect.surfaceBy',
      note: '`\'luminance\'` — surfaces demarcated by light density, shared with the rest of the aurora engine.',
    },
    {
      path: 'color.surface.base',
      note: 'Violet-black `#0b0813` — a near-neutral floor so the drifting mesh supplies all the chroma.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Violet `#6d28d9` — the warm-register primary, matched to the gradient\'s violet center.',
    },
    {
      path: 'color.content.link',
      note: 'Cyan `#67e8f9` — picked straight out of the gradient.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: 'Paired violet outer glow + white inner lift + ink drop, no hard offsets at any tier.',
    },
  ],
  lookalikes: [
    {
      against: 'aurora',
      differentiator:
        'Same engine, same `surfaceBy: \'luminance\'` model, same 48s drift. The difference is the gradient register: `aurora` runs cool astrophotographic centers (deep purple / atmospheric green / teal) and a teal link; Nebula runs a warm product-marketing run (violet / fuchsia / cyan / indigo) with a violet primary and fuchsia danger. Nebula is "the modern app gradient," aurora is "the northern lights."',
    },
    {
      against: 'aurora-spectrum',
      differentiator:
        'Its cool sibling on the same engine. Spectrum runs azure / cyan / emerald / violet with a sky-blue primary and emerald success — the dashboard / dev-tool flavour. Nebula leans warm (violet / fuchsia) — the marketing-hero flavour.',
    },
    {
      against: 'cel-glass-flux',
      differentiator:
        'Flux carries the same electric tech palette but on the `cel-glass` engine: frosted translucent panels cut with a hard ink line and `surfaceBy: \'border\'`, no drifting atmosphere. Nebula dissolves its chroma into a moving gradient; Flux freezes it into bordered glass cards.',
    },
    {
      against: 'vaporwave',
      differentiator:
        'Vaporwave is a loud static synthwave composition (magenta / cyan, often with scanlines and chromatic aberration). Nebula is a slow 48s drift on a near-neutral floor with luminance surfaces, no scanlines — restraint and motion where Vaporwave is loud and fixed.',
    },
  ],
  thrivesWith: [
    'Landing-page hero sections and dashboards — the drifting mesh reads as living brand chrome behind translucent cards',
    'Card, Modal, Drawer, Toast — translucent fill + backdrop blur + luminance halo produces the "fog patch in the nebula" effect at every tier',
    'Tabs, Segmented, Pagination — `aria-selected="true"` triggers the engine\'s luminance + violet-inset selection cue',
  ],
  degradesWith: [
    'Dense Tables and VirtualList — luminance lifts don\'t separate rows the way hard borders do; resting rows blend into the atmosphere',
    'Browsers without `backdrop-filter` — surfaces still read as translucent lifts, but the edge-dissolution into the mesh is lost',
  ],
  recallAliases: ['aurora nebula', 'nebula', 'new tech gradient', 'tech gradient', 'mesh gradient'],
}
