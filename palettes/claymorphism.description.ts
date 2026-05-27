import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'claymorphism',
  tagline:
    'Inflated 3D gumdrops — pastel violet surfaces, oversized 24-32px radii, and a triple-layer elevation recipe (inset bottom shade + inset top highlight + outer drop) that puffs every control.',
  summary:
    'Claymorphism is the puffy-pillow register of the morphism family. Every `radius.*` from `sm` through `lg` ' +
    'is unusually large (16/24/32px) so even compact controls round into gumdrop shapes, and `elevation.*` ' +
    'packs three layers per slot: an inset bottom shade in violet ink, an inset top white highlight, and a ' +
    'soft outer drop shadow. `surface.base` is pastel violet `#f5f0ff`; the six intents are pastel candy ' +
    "colors (`#a78bfa`, `#86efac`, `#fcd34d`, `#fda4af`, `#7dd3fc`) paired with deep near-black contents " +
    'so the bright fills stay legible. Quicksand carries every typography slot, motion uses an overshooting ' +
    'spring (`cubic-bezier(0.34, 1.7, 0.64, 1)`).',
  origin:
    'A 2021 design-meme aesthetic — Michał Malewicz coined the name as a sibling to Glassmorphism and ' +
    'Neumorphism, riffing on the "claymation" / Pixar-inflated 3D shapes that 3D-render trends were ' +
    'making cheap to produce in Figma. It spread through Dribbble shots and never quite became a shipping ' +
    "design system — its identity lives in the triple-shadow + oversized-radius silhouette.",
  signatures: [
    {
      label: 'Triple-layer elevation: inset bottom shade + inset top highlight + outer drop',
      detail:
        "`elevation.low` is `inset 0 -4px 0 rgba(76,29,149,0.15), inset 0 4px 0 rgba(255,255,255,0.50), 0 8px 16px rgba(76,29,149,0.18)` — three stacked shadows where the inset pair carries the inflation and the outer drop lifts the puff off the base. The recipe scales: `overlay` runs `inset 0 -10px 0 / inset 0 10px 0 / 0 32px 60px`. No other style in the showcase stacks three layers per elevation slot.",
    },
    {
      label: 'Oversized radii (16 / 24 / 32px across sm / md / lg)',
      detail:
        '`radius.sm` is `16px`, `radius.md` is `24px`, `radius.lg` is `32px`. Material tops out at 8px; Flat/Classic at 8px. Claymorphism rounds even sub-button-sized controls into pillow silhouettes — the inflation only reads if the radius supports it.',
    },
    {
      label: 'Pastel violet surface field with violet-ink content',
      detail:
        "`surface.base` is `#f5f0ff` (pastel violet), `surface.sunken` is `#ece4ff`, and `content.primary`/`secondary`/`muted` are violet inks (`#2e1065` / `#4c1d95` / `#7c3aed`) rather than neutral greys. The whole field reads as candy-tinted, not neutral.",
    },
    {
      label: 'Pastel candy intent fills paired with deep near-black contents',
      detail:
        "`intent.success.bg` is `#86efac` (mint) with `content: #052e16` (near-black green); `warning.bg` is `#fcd34d` with `#422006`; `danger.bg` is `#fda4af` with `#4c0519`. The bright pastel fill + deep ink combination is how Claymorphism keeps AA contrast on its gumdrop intents.",
    },
    {
      label: 'Quicksand throughout with overshooting spring motion',
      detail:
        "`typography.family.ui`/`display` both resolve to `\"Quicksand\", system-ui, ...` — a rounded-terminal humanist sans that mirrors the puffy silhouettes. `motion.easing.standard` is `cubic-bezier(0.34, 1.56, 0.64, 1)` and `spring` is `cubic-bezier(0.34, 1.7, 0.64, 1)`; the small overshoot on release reads as physical bounce.",
    },
    {
      label: '3px violet focus ring offset by 4px',
      detail:
        "`effect.focusRing` is `{ width: 3px, offset: 4px, color: #7c3aed, style: solid }` — thicker than flat-classic's 2px and pulled further from the silhouette so it survives the puffy elevation around inflated controls.",
    },
  ],
  antiSignatures: [
    'Tight radii (Material-style 4-8px) — defeats the gumdrop silhouette',
    'Single-shadow elevation — Claymorphism requires the triple-layer stack to read as inflated',
    'Neutral grey surface field — the pastel violet tint is load-bearing',
    'Saturated white-content intents (that is Material) — Claymorphism uses pastel-with-deep-ink',
    'A near-monochrome surface where `raised` equals `base` (that is Neumorphism)',
  ],
  tokenEvidence: [
    {
      path: 'elevation.low.boxShadow',
      note: 'Triple-layer recipe — `inset 0 -4px 0 rgba(76,29,149,0.15), inset 0 4px 0 rgba(255,255,255,0.50), 0 8px 16px rgba(76,29,149,0.18)`. The three-shadow stack is the load-bearing Claymorphism cue.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: 'Apex of the stack — `inset 0 -10px 0 / inset 0 10px 0 / 0 32px 60px rgba(76,29,149,0.36)`. Modals read as fully inflated puffs floating off the violet base.',
    },
    {
      path: 'radius.lg',
      note: '`32px` — oversized by design. Material tops at 8px; Claymorphism needs this radius for the inflation silhouette.',
    },
    {
      path: 'color.surface.base',
      note: 'Pastel violet `#f5f0ff` — not neutral. The whole field is candy-tinted.',
    },
    {
      path: 'color.intent.success.bg',
      note: 'Mint pastel `#86efac` — paired with deep green content `#052e16` rather than white. The pastel-with-deep-ink intent pattern is the chromatic signature.',
    },
    {
      path: 'typography.family.ui',
      note: 'Quicksand stack — a rounded-terminal humanist sans that mirrors the puffy silhouettes.',
    },
    {
      path: 'motion.easing.spring',
      note: '`cubic-bezier(0.34, 1.7, 0.64, 1)` — overshoot on release reads as physical bounce on the puffy controls.',
    },
  ],
  lookalikes: [
    {
      against: 'neumorphism',
      differentiator:
        "Neumorphism uses a single tonal surface (`#e0e5ec` for `base`/`raised`/`sunken`/`overlay`) and paired inset/outer shadow in a top-left/bottom-right diagonal. Claymorphism uses distinct surfaces (pastel violet base, white raised), pastel candy intents, vertical inset highlight + inset shade, and oversized radii. Claymorphism is colourful and rounded; Neumorphism is monochrome and tonal.",
    },
    {
      against: 'skeuomorphism',
      differentiator:
        "Both stack inset highlight + inset shade + outer drop, but Skeuomorphism uses warm-paper colours (`#e8dfcf` parchment), serif display (Optima), and tighter radii (6-16px) to mimic real materials. Claymorphism uses pastel violet, Quicksand, and 16-32px radii to read as cartoon-inflated rather than real-material.",
    },
    {
      against: 'glassmorphism',
      differentiator:
        "Glassmorphism uses translucent panels with backdrop blur and a top-only inset highlight on a neutral host. Claymorphism is fully opaque pastel surfaces with a triple-stack inset+outer recipe — no transparency, no blur.",
    },
    {
      against: 'material',
      differentiator:
        "Material uses paired ambient+key outer drop shadows on opaque white at 4-8px radii. Claymorphism stacks three shadows per slot (two inset + one outer), uses 16-32px radii, and tints the whole field pastel violet.",
    },
  ],
  thrivesWith: [
    'Buttons and badges — the triple-stack recipe was tuned for pill-shaped controls',
    'Toggle switches and chips — oversized radii read as natural pillow silhouettes',
    'Marketing pages and landing heroes where the cartoon-inflated quality is on-brand',
    'Onboarding flows — the overshoot spring on motion feels playful on press affordances',
  ],
  degradesWith: [
    'Dense data tables — the triple-shadow on every row eats real estate and reads as noisy',
    'Long-form prose — Quicksand at body weight 500 on pastel-tinted surface gets fatiguing',
    'Calendars and date pickers — per-cell inflation makes selection states blur into hover states',
    'Cursor and icon glyphs — README flags reduced icon visibility on bright pastel under bright pastel',
  ],
  recallAliases: ['claymorphism', 'clay', 'clay morphism', 'claymation', 'puffy 3d'],
}
