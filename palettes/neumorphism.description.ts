import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'neumorphism',
  tagline:
    'The cautionary palette — one near-monochrome surface (`#e0e5ec`) where every elevation slot is a paired top-left highlight + bottom-right shade and borders are invisible by construction.',
  summary:
    'Neumorphism collapses the entire surface stack to a single tonal value: `surface.base`, `raised`, `sunken`, ' +
    'and `overlay` all resolve to `#e0e5ec`, and `border.subtle`/`default` resolve to the same colour (invisible ' +
    'by design). Depth is carried entirely by `elevation.*`, each slot packing the canonical Soft UI shadow pair — ' +
    'a bright `rgba(255,255,255,0.85)` top-left highlight and a darker `rgba(163,177,198,0.60)` bottom-right shade. ' +
    "`elevation.flat` is itself an *inset* pair, which is how depressed/active states read as recessed without a " +
    'colour change. The README documents that this palette CANNOT meet WCAG AA for body text or icon glyphs ' +
    'against the tonal field — that is the point; it ships `experimental` to demonstrate the failure mode.',
  origin:
    'Coined by Michał Malewicz in early 2020 as "Soft UI" and quickly renamed Neumorphism — a Dribbble-driven ' +
    'aesthetic where every control reads as carved out of (or pressed into) one continuous foam surface. ' +
    'The look went viral because the diagonal highlight/shade pair was easy to copy and looked rendered; it ' +
    "stalled as a shipping system because it refuses to use borders and can't carry accessible contrast.",
  signatures: [
    {
      label: 'Single tonal surface (`#e0e5ec`) across `base`, `raised`, `sunken`, `overlay`',
      detail:
        "Every `color.surface.*` slot resolves to `#e0e5ec` — no surface step changes colour. Material has four distinct surface values; Neumorphism has one. Depth has to be carried elsewhere because the colours refuse to demarcate layers.",
    },
    {
      label: 'Paired top-left highlight + bottom-right shade at every elevation slot',
      detail:
        "`elevation.low` is `4px 4px 8px rgba(163,177,198,0.60), -4px -4px 8px rgba(255,255,255,0.85)` — the canonical Soft UI shadow pair. The bottom-right shade and top-left highlight together carve a raised silhouette out of the tonal field. The pair scales smoothly through `medium` (`8/8`), `high` (`12/12`), and `overlay` (`20/20`).",
    },
    {
      label: 'Inset elevation at the `flat` slot for recessed/pressed states',
      detail:
        "`elevation.flat` is `inset 4px 4px 8px rgba(163,177,198,0.60), inset -4px -4px 8px rgba(255,255,255,0.85)` — the *same* pair, inset. This is how Neumorphism does an active/depressed state: the highlight and shade swap roles without any colour change, and the control reads as pressed into the foam.",
    },
    {
      label: 'Invisible borders by construction',
      detail:
        "`border.subtle`, `border.default` all resolve to `#e0e5ec` — the surface colour. Form fields, dividers, and table rows have no visible boundary; the engine refuses to use borders as a depth signal. Only `border.strong` (`#cdd3da`) and `border.focus` deviate.",
    },
    {
      label: 'Nunito throughout with documented AA failure on muted content',
      detail:
        "`typography.family.ui`/`display` resolve to `\"Nunito\", system-ui, ...` — a rounded humanist sans that complements the foam silhouettes. `content.muted` is `#8c97a8` on `#e0e5ec` — ≈ 2.4:1, **fails AA outright**. The README documents this as the cautionary point of the palette.",
    },
  ],
  antiSignatures: [
    'Distinct surface colours per slot (base ≠ raised ≠ sunken)',
    'Visible borders or dividers (Neumorphism refuses borders as a depth signal)',
    'Saturated intent fills with white inverse content (Neumorphism intents reuse the tonal surface with coloured content instead)',
    'Single-direction outer drop shadows (Neumorphism requires the diagonal pair)',
    'Pastel surface field (that is Claymorphism — Neumorphism is neutral grey-blue)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#e0e5ec` — and `surface.raised`/`sunken`/`overlay` are the same value. The single-tone surface stack is the load-bearing Neumorphism cue.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: 'Paired diagonal — `4px 4px 8px rgba(163,177,198,0.60), -4px -4px 8px rgba(255,255,255,0.85)`. Top-left highlight + bottom-right shade, the canonical Soft UI recipe.',
    },
    {
      path: 'elevation.flat.boxShadow',
      note: 'The same pair, inset — `inset 4px 4px 8px ... inset -4px -4px 8px ...`. This is how depressed/active states read without a colour change.',
    },
    {
      path: 'color.border.subtle',
      note: '`#e0e5ec` — identical to the surface. Borders are invisible by construction.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#e0e5ec` — the tonal surface. All six intents reuse the surface as their background; only `content` colour distinguishes them.',
    },
    {
      path: 'color.content.muted',
      note: '`#8c97a8` on `#e0e5ec` ≈ 2.4:1 — **fails WCAG AA**. The cautionary signature of the palette.',
    },
    {
      path: 'typography.family.ui',
      note: 'Nunito stack — rounded humanist sans that complements the foam silhouettes.',
    },
  ],
  lookalikes: [
    {
      against: 'claymorphism',
      differentiator:
        "Claymorphism uses distinct pastel surfaces (violet `#f5f0ff` base, white raised), pastel candy intents, vertical inset highlight + inset shade + outer drop, and 16-32px radii. Neumorphism collapses to one tonal `#e0e5ec` surface across every slot, uses a diagonal top-left/bottom-right pair, and refuses borders. Claymorphism is colourful and inflated; Neumorphism is monochrome and carved.",
    },
    {
      against: 'skeuomorphism',
      differentiator:
        "Skeuomorphism uses warm paper-and-leather colours (`#e8dfcf` parchment), serif display (Optima), and an inset-top + inset-bottom + outer-drop stack to mimic real materials. Neumorphism is cool grey-blue, sans-only, and uses a diagonal highlight/shade pair to suggest a single continuous foam material rather than distinct real-world materials.",
    },
    {
      against: 'glassmorphism',
      differentiator:
        "Glassmorphism uses translucent panels with backdrop blur on a saturated host. Neumorphism is fully opaque on a single neutral tonal field — no transparency, no blur, no contrast against a colourful background.",
    },
    {
      against: 'flat-classic',
      differentiator:
        "Flat-classic uses opaque white over neutral grey with a single soft outer drop and visible hairline borders. Neumorphism uses one tonal value across every surface and elevation slot, the diagonal Soft UI shadow pair, and invisible borders.",
    },
  ],
  thrivesWith: [
    'Volume sliders, dials, and toggle switches — controls carved from the surface read as the engine intends',
    'Music-player and smart-home concept UI — the home of most viral Neumorphism shots',
    'Single-screen showpieces where the foam silhouette is the whole point',
  ],
  degradesWith: [
    'Body text and prose — `content.primary` is borderline AA and the shadow gradient adds perceptual noise',
    'Icon glyphs and placeholders — `content.muted` fails AA outright (2.4:1)',
    'Form fields — invisible borders mean inputs lose their boundaries',
    'Data tables and lists — no row dividers can survive a borderless surface',
    'Anything shipping to production — the README mandates `experimental` and forbids promotion to default',
  ],
  recallAliases: ['neumorphism', 'soft ui', 'soft-ui', 'neuomorphism', 'new skeuomorphism'],
}
