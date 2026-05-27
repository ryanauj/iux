import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'crt-phosphor-amber',
  tagline:
    'The DEC VT220 / Wyse amber-screen variant of the `crt-phosphor` engine — same scanline overlay, same phosphor bloom, same `motion.decay = 80ms`, only the single phosphor color swaps green for `#ffb347` amber on a near-black `#0a0500` field.',
  summary:
    'CRT / Phosphor (Amber) is the sister register of the `crt-phosphor` engine — every engine signal (scanline ' +
    '`effect.overlay.image`, phosphor `effect.glow`, `motion.decay`) is identical to the green variant; only the ' +
    'phosphor token changes. `content.primary` is `#ffb347`, `surface.base` is `#0a0500`, and every intent, border, ' +
    'and elevation rgba is the same amber varying only in alpha. Typography is VT323 mono at every role; ' +
    'radii on `sm`/`md` are `0`. The engine has no per-palette branching: swap `color.*` and `effect.glow.color`, ' +
    'and you get the amber tube without touching engine code.',
  origin:
    'P3 amber-phosphor terminals shipped alongside P1 green as the "easier on the eyes" alternative — DEC VT220 ' +
    '(1983), Wyse 50/60, and amber-CRT options on IBM 3270 and 5151 displays. The amber tube was marketed as ' +
    'reducing operator eye-strain during long sessions and became the institutional second-choice phosphor of the ' +
    '1980s. This palette is the period-correct revival on the same engine that hosts the green variant.',
  signatures: [
    {
      label: 'Single amber phosphor (`#ffb347`) replaces green across every slot',
      detail:
        '`content.primary`, `border.focus`, every `intent.*.border`, every `intent.*.bg`, the elevation inset stroke and outer glow, the scanline overlay\'s phosphor band, and `effect.glow.color` all resolve to `#ffb347` / `rgba(255, 179, 71, …)`. The green palette is `#7dff8a` / `rgba(125, 255, 138, …)` — a one-token swap is the entire distinction.',
    },
    {
      label: 'Two-layer amber scanline `effect.overlay.image` at the palette root',
      detail:
        'The same gradient stack as the green variant — a 1px dark line every 2px (`rgba(0,0,0,0.35)`) plus a 4px softer band (`rgba(255,179,71,0.04)` every 3-4px), `blend: screen` — but the phosphor band is amber-tinted rather than green-tinted. Every non-CRT palette returns `image: none`, making this the engine\'s load-bearing signal.',
    },
    {
      label: 'Phosphor-decay motion regime (`motion.decay: 80ms`)',
      detail:
        'Identical to the green variant: the engine reads `decay` as a `transition-delay`, so hovers and focus moves fade past their main duration instead of snapping. Every non-CRT palette ships `decay: 0ms`. Collapsed to `0ms` under `prefers-reduced-motion`.',
    },
    {
      label: 'Amber `effect.glow` recipe (`radius: 6px`, color `rgba(255,179,71,0.65)`)',
      detail:
        'Same shape as green (`radius: 6px`, `intensity: 0.7`) — only the color rgba changes. The engine paints this as a `text-shadow` on body text and a `box-shadow` halo on `:focus-visible`. Non-CRT palettes set `radius: 0` / `color: transparent`, multiplying the same rule by zero.',
    },
    {
      label: 'Inset 1px amber stroke + outer amber glow on `elevation.*`',
      detail:
        '`elevation.low` is `inset 0 0 0 1px rgba(255,179,71,0.28), 0 0 6px rgba(255,179,71,0.20)`, scaling to `inset 0 0 0 1px rgba(255,179,71,0.62), 0 0 40px rgba(255,179,71,0.42), 0 24px 60px rgba(10,5,0,0.70)` at `overlay`. Token-identical to green except for the rgba — that\'s the engine generalization test.',
    },
    {
      label: 'VT323 mono everywhere, uppercased labels with 0.10em tracking',
      detail:
        '`typography.family.*` all resolve to `"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace`, identical to the green variant. No display serif — display/title/heading exist as sizes only. `label` and `caption` are uppercase with `0.08-0.10em` tracking.',
    },
  ],
  antiSignatures: [
    'A green phosphor — `#7dff8a` content or green elevation glow lands you on the green sister, not the amber palette',
    'Distinct colors per intent — danger/warning/success/info collapse to one amber varying by alpha',
    'No scanline overlay (`effect.overlay.image: none`) demotes this to plain dark-amber neon',
    'Proportional sans on body — VT323 mono is load-bearing across every role',
    'Solid-stroke focus ring — `effect.focusRing.style` is `glow`, rendered as a `box-shadow` halo',
  ],
  tokenEvidence: [
    {
      path: 'effect.overlay.image',
      note: 'The two-layer scanline gradient stack with the amber-tinted `rgba(255,179,71,0.04)` phosphor band. The engine signal; every non-CRT palette returns `none`.',
    },
    {
      path: 'effect.glow.color',
      note: '`rgba(255, 179, 71, 0.65)` — the P3-amber phosphor bloom. The single-token differentiator from the green sister\'s `rgba(125, 255, 138, 0.65)`.',
    },
    {
      path: 'effect.glow.radius',
      note: '`6px` — identical to green; the bloom radius the engine multiplies into text-shadows and focus halos.',
    },
    {
      path: 'motion.decay',
      note: '`80ms` — the phosphor-decay tail on state transitions, identical across both CRT phosphor variants.',
    },
    {
      path: 'effect.focusRing.style',
      note: '`glow` — focus renders as a `box-shadow` halo (not an outline). Not a valid CSS `outline-style`; the engine handles it specially.',
    },
    {
      path: 'color.content.primary',
      note: '`#ffb347` — the canonical P3 amber phosphor color, reused at `border.focus` and inside every intent slot.',
    },
    {
      path: 'color.surface.base',
      note: '`#0a0500` — near-black with a faint warm bias to match the amber phosphor; green ships `#020604` (cooler).',
    },
    {
      path: 'typography.family.mono',
      note: 'VT323 stack — also aliased into `ui`, `display`, `pixel`, `hand`. Identical to the green variant.',
    },
  ],
  lookalikes: [
    {
      against: 'crt-phosphor-green',
      differentiator:
        'Token-identical except for the phosphor color and a faintly warmer `surface.base` (`#0a0500` vs `#020604`). Engine signals — scanline overlay, `effect.glow`, `motion.decay`, elevation recipe — are byte-for-byte the same. If swapping `color.*` and `effect.glow.color` flips one into the other, the engine has zero per-palette branching (that\'s the test FINALIZED-PALETTES.md Group B is designed to prove).',
    },
    {
      against: 'terminal-tui',
      differentiator:
        'Terminal/TUI is a flat-engine imitation: mono typography and dimmed ANSI accents but no scanlines, no `effect.glow`, no `motion.decay`. CRT/Phosphor (Amber) is the actual tube — engine-level overlay + bloom + decay are load-bearing.',
    },
    {
      against: 'financial-terminal',
      differentiator:
        'Financial Terminal mixes amber, green, and white on black for dense Bloomberg-style numeric readouts — multicolor, no scanline, no glow. CRT/Phosphor (Amber) is monochromatic amber everywhere and paints the engine scanline gradient.',
    },
    {
      against: 'tron-dark-neon',
      differentiator:
        'Tron is the Glassmorphism engine tuned to a single cyan accent — same inset+outer-glow elevation trick, but no scanline overlay, no `motion.decay`, and color intents resolve to distinct hues. CRT/Phosphor (Amber) collapses every intent to one amber phosphor and paints the engine-level scanline gradient.',
    },
  ],
  thrivesWith: [
    'Buttons and toggles where the `:focus-visible` amber halo carries the whole interaction signal',
    'Readouts and code blocks — VT323 + uppercased tracking matches the terminal-readout convention',
    'Modals — `elevation.overlay` stacks the strongest inset+bloom and reads as a floating amber tube',
  ],
  degradesWith: [
    'Forms relying on color-coded intents — danger and primary differ only by border alpha; pair with iconography',
    'Dense small-caption muted text — amber content at 44% alpha plus the scanline overlay can drop into the 4-5:1 range, usable but not AAA',
    'Photo content — the scanline overlay and screen-blended bloom destroy photographic fidelity',
  ],
  recallAliases: ['crt amber', 'crt phosphor amber', 'phosphor amber', 'amber screen', 'amber phosphor', 'vt220', 'p3 phosphor', 'wyse amber'],
}
