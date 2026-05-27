import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aurora',
  tagline:
    'Deep midnight base with a slowly drifting multi-radial atmosphere — surfaces demarcated by light density (`surfaceBy: \'luminance\'`), not by borders, with a 48-second drift loop that never reaches the same composition twice.',
  summary:
    'Aurora is the only palette in the codebase on the `aurora` engine and the only one that sets ' +
    '`effect.surfaceBy = \'luminance\'`. The signature surface model is light density: `surface.base` is near-black ' +
    '`#0a0e1a`, `raised` is `rgba(255,255,255, 0.05)`, and the engine paints a four-radial atmospheric gradient ' +
    '(deep purple, atmospheric green, teal, secondary purple wash) at the palette root that slowly drifts across ' +
    'a 200% canvas on a 48-second `alternate` loop. Cards read as brighter regions of the same atmosphere — ' +
    'every `elevation.*` slot is a paired outer-purple-glow + inner-white-lift stack (no hard offset shadows), ' +
    'borders sit at recessive `0.05 / 0.10 / 0.18` alphas, and the focus border holds full-chroma purple `#a78bfa` ' +
    'so keyboard focus stays visible regardless of the luminance mode.',
  origin:
    'Original to the iux design system. Aurora was introduced as the first atmospheric engine — a deliberate ' +
    'contrast to every prior palette\'s "surfaces are demarcated by a stroke" assumption. The aesthetic borrows ' +
    'from astrophotography of the aurora borealis and from ambient screensavers (Apple Aerial, Windows DreamScene) ' +
    'rather than from any product chrome lineage. The drifting gradient and the `surfaceBy: \'luminance\'` contract ' +
    'addition were designed together — neither makes sense without the other.',
  signatures: [
    {
      label: 'Four-radial drifting `effect.atmosphereGradient`',
      detail:
        'The engine paints `radial-gradient(at 22% 28%, rgba(91,63,216,0.42), transparent 55%), radial-gradient(at 78% 38%, rgba(14,128,96,0.38), transparent 60%), radial-gradient(at 50% 80%, rgba(32,112,144,0.40), transparent 58%), radial-gradient(at 12% 88%, rgba(167,139,250,0.30), transparent 52%)` at the palette root on a 200% canvas, and slowly drifts `background-position` over a 48s `alternate` `ease-in-out` loop. The composition is *designed* never to repeat within a viewing session.',
    },
    {
      label: '`effect.surfaceBy: \'luminance\'` — surfaces by light density, not by borders',
      detail:
        'Aurora is the only palette in the codebase that sets `surfaceBy: \'luminance\'`; every other palette declares `\'border\'`. The slot is the most load-bearing contract distinction in the engine: a raised card here is *not* a different opaque fill, it\'s a translucent luminance lift over the same atmosphere. The engine block paints a soft outer white halo via `--luminance-center` plus a `backdrop-filter` blur so the edge dissolves into the gradient instead of cutting it.',
    },
    {
      label: '`effect.luminanceCenter` = `rgba(255,255,255, 0.08)`',
      detail:
        'A translucent near-white tint that the engine paints as the soft outer glow around raised surfaces and intensifies on hover (to `0.10`) and focus (to `0.14`). The slot is `\'transparent\'` on every other palette in the codebase — Aurora is the only one to put it to work. The var inherits down the tree, so nested raised surfaces pick up the same luminance unless they override locally.',
    },
    {
      label: 'Paired outer-purple-glow + inner-white-lift elevation (no hard offset shadows)',
      detail:
        '`elevation.low` is `0 0 24px 2px rgba(167,139,250,0.10), inset 0 0 20px rgba(255,255,255,0.03)`, scaling to `0 0 80px 10px rgba(167,139,250,0.22), inset 0 0 32px rgba(255,255,255,0.06), 0 16px 48px rgba(5,8,16,0.55)` at `overlay`. The cardstock metaphor is explicitly "a brighter patch of atmosphere," not "paper above paper" — there are no hard offset shadows at any tier.',
    },
    {
      label: 'Heavy backdrop blur (`blur(28px)` at lg) on a near-black host',
      detail:
        '`effect.backdropBlur.sm/md/lg` is `blur(8px) / blur(16px) / blur(28px)` — heavier than classic Glassmorphism. The blur is mandatory: raised surfaces need to soften the gradient underneath so they read as luminance centers rather than as sharp window cuts onto the unblurred atmosphere.',
    },
    {
      label: 'Cool-tinted near-white type (`#e8f0f4`) and atmospheric-teal link',
      detail:
        '`content.primary` is `#e8f0f4` (luminance ≈ 0.85, picks up the teal register), stepping down to `#a8b8c8` and `#6a7a8a` for secondary / muted within the same cool family. `content.link` is `#8be9d6` — atmospheric teal, picked out of the gradient itself, so calls-to-action match the palette rather than fight it.',
    },
  ],
  antiSignatures: [
    'Any opaque `surface.raised` fill (defeats the luminance surface model — cards would punch holes in the atmosphere)',
    'Hard offset shadows on `elevation.*` (the metaphor is brighter atmosphere, not paper-above-paper)',
    'Full-chroma 1px outlines on non-focus borders (the recessive `0.05–0.18` white tints are the contract)',
    '`atmosphereGradient: \'none\'` (every other palette sets this — Aurora is the only one that paints the gradient at the engine root)',
    'A saturated chromatic `surface.base` like Glassmorphism\'s indigo or Aero\'s Vista-blue (Aurora\'s floor is near-neutral midnight so the gradient supplies all chroma)',
  ],
  tokenEvidence: [
    {
      path: 'effect.surfaceBy',
      note: '`\'luminance\'` — the only palette in the codebase that sets this. Records that surfaces are demarcated by light density, not by strokes.',
    },
    {
      path: 'effect.atmosphereGradient',
      note: 'Four-radial stack of purple / green / teal / secondary-purple luminance centers — the engine paints and slowly drifts this at the palette root over a 48s loop.',
    },
    {
      path: 'effect.luminanceCenter',
      note: '`rgba(255,255,255, 0.08)` — the translucent near-white glow the engine paints around raised surfaces. `\'transparent\'` on every other palette.',
    },
    {
      path: 'color.surface.base',
      note: 'Near-black midnight `#0a0e1a` — the floor the atmospheric gradient paints over and the colour that shows through gradient gaps.',
    },
    {
      path: 'color.surface.raised',
      note: 'Very low-alpha white `rgba(255,255,255,0.05)` — a translucent luminance lift, not an opaque fill. Reads as a brighter fog patch in the same atmosphere.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: 'Paired purple outer glow + white inner lift + ink-black drop — `0 0 80px 10px rgba(167,139,250,0.22), inset 0 0 32px rgba(255,255,255,0.06), 0 16px 48px rgba(5,8,16,0.55)`. No hard offsets at any tier.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(28px)` — mandatory to soften the gradient under raised surfaces so they read as luminance centers, not as sharp cuts.',
    },
    {
      path: 'color.border.focus',
      note: 'Full-chroma purple `#a78bfa` — focus stays at full saturation regardless of the recessive `0.05–0.18` non-focus border alphas.',
    },
  ],
  lookalikes: [
    {
      against: 'liquid-glass-dark',
      differentiator:
        'Liquid Glass Dark also rides on a near-black host (`#0f1218`) with translucent panels, but it\'s a `glassmorphism`-engine palette with `surfaceBy: \'border\'`: surfaces are demarcated by sky-cyan refraction-tinted hairlines and the host is *static* near-neutral black. Aurora is on the `aurora` engine with `surfaceBy: \'luminance\'`, a four-radial drifting chromatic gradient at the root, paired-glow elevation with no hard offsets, and recessive white borders. Same darkness floor, completely different surface model.',
    },
    {
      against: 'tron-dark-neon',
      differentiator:
        'Tron Dark Neon is a flat-engine dark register where the chrome comes from full-chroma neon outlines on opaque surfaces. Aurora has no neon outlines at all — chroma lives in the atmospheric gradient itself, not in component strokes, and surfaces are translucent luminance lifts rather than bordered opaque panels.',
    },
    {
      against: 'vaporwave',
      differentiator:
        'Vaporwave is a synthwave gradient register — magenta / cyan, often with CRT scanlines and chromatic aberration overlays. Aurora is atmospheric astrophotography — purple / green / teal centers on midnight, no scanlines, slow 48s drift rather than a static loud composition, and the `surfaceBy: \'luminance\'` model where Vaporwave keeps standard bordered surfaces.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Classic Glassmorphism commits to a saturated indigo *static* host with hairline-white borders, top-only inset highlight elevation, and `surfaceBy: \'border\'`. Aurora replaces the static host with a drifting four-radial atmosphere, replaces the strokes with recessive white tints, and replaces the inset+outer shadow recipe with a paired purple-glow + white-lift stack — `surfaceBy: \'luminance\'` end to end.',
    },
  ],
  thrivesWith: [
    'Card, Modal, Drawer, Toast — translucent fill + heavy backdrop blur + luminance halo produces the "fog patch in the atmosphere" effect at every elevation tier',
    'Tabs, Segmented, Pagination — `aria-selected="true"` triggers the engine\'s luminance + purple-inset selection cue and lights up unambiguously',
    'Task board (kanban cards) — card-level luminance halo plus the engine\'s selection treatment reads cleanly through drag-and-drop',
    'Tooltip, Popover, Spotlight — small luminance lifts in the atmosphere; the heavy blur reads perfectly at small sizes',
    'Note outliner current-line indicator — the inset purple-accent rule doesn\'t shift layout, so keyboard navigation reads cleanly',
  ],
  degradesWith: [
    'Dense Tables and VirtualList — luminance lifts don\'t separate rows the way zebra stripes or hard borders do; the README flags this as the engine\'s intentional contrast point. Each row IS a piece of the atmosphere and resting rows blend',
    'DiffView with character-level highlight — the inset purple selection rule overlaps with the chunk\'s own coloured highlight; block diffs survive, character diffs do not',
    'CommandPalette / NLBar input affordance — the cursor in a field loses visual weight against the atmospheric background; only the recessive `border.default` at `rgba(255,255,255,0.10)` rescues it',
    'Browsers without `backdrop-filter` — surfaces still read as translucent luminance lifts, but the edge-dissolution into the gradient is lost',
  ],
  recallAliases: ['aurora', 'aurora borealis', 'atmosphere', 'atmospheric', 'northern lights'],
}
