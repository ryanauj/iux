import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-glass-flux',
  tagline:
    'The GLASS variation on the new-tech-gradient theme — the electric indigo / cyan / violet palette delivered as frosted translucent cels cut with a bright ink line, on the `cel-glass` engine.',
  summary:
    'Cel-Glass (Flux) takes the modern-app gradient palette and freezes it into glass. It rides the `cel-glass` engine — a deliberate mix of glassmorphism and ' +
    'cel-shading — over a deep indigo-navy host `#0a0d1a`. Raised panels are low-alpha whites (`rgba(255,255,255,0.07)`) that the engine frosts with ' +
    '`backdrop-filter`, and each is cut with a hard cel outline. Because the host is dark, the "ink" inverts to a bright electric-lavender-white edge: ' +
    '`effect.outline.color` (`#dbe4ff`) and `color.border.*` both resolve to it, so every smoked-glass panel reads as a crisp lit cel. Intents are an electric ' +
    'indigo / cyan / violet triad held at high alpha so the fills glow, and `elevation.*` keeps the hybrid — an inset white top-highlight (glass) over a ' +
    'hard-offset light block with no blur (cel, `shadowStyle = \'hard\'`).',
  origin:
    'Original to the iux design system — the glass register of the new-tech-gradient family, and a tech-colored sibling to the `cel-glass-noir` neon register. ' +
    'It answers the brief\'s "with maybe some slight variations on each like glass" by routing the gradient palette through the established cel-glass hybrid ' +
    'rather than the atmospheric engine.',
  signatures: [
    {
      label: 'Frosted translucent cels + a hard cel ink line',
      detail:
        'The `cel-glass` engine block frosts `iux-card` / `iux-modal__panel` / `iux-drawer__panel` / `iux-toast` with `backdrop-filter` AND paints the cel outline on interactive controls. Flux\'s panels are `rgba(255,255,255,0.07)` smoked glass, each bounded by the bright line — glass body, cel edge.',
    },
    {
      label: 'Inverted bright cel line on a dark host',
      detail:
        'On a dark glass panel a near-black ink line would vanish, so the "ink" inverts to a bright electric-lavender-white `#dbe4ff`. `effect.outline.color` carries it and every `color.border.*` slot points at the same value, so the outline is uniform whichever intent fills the cel.',
    },
    {
      label: 'Deep indigo-navy host with an electric tech triad',
      detail:
        '`surface.base` is `#0a0d1a`. Intents are indigo (`rgba(99,102,241,0.92)`), cyan (`rgba(34,211,238,0.92)`), and rose/violet held at high alpha so the fills glow against the dark glass — the same electric palette the aurora registers dissolve into a gradient, here frozen into fills.',
    },
    {
      label: 'Glass + cel hybrid elevation (`shadowStyle: \'hard\'`)',
      detail:
        '`elevation.low` is `inset 0 1px 0 rgba(255,255,255,0.12), 2px 2px 0 rgba(219,228,255,0.14)` — an inset white top-highlight (the glass tell) over a hard-offset light block with no blur (the cel tell). `effect.shadowStyle` is `\'hard\'`, recording the two-tone cel shading.',
    },
  ],
  antiSignatures: [
    'A drifting atmospheric gradient at the root (that is the aurora registers; Flux sets `atmosphereGradient: \'none\'` and `surfaceBy: \'border\'`)',
    'Opaque flat cels (that would be plain `cel-shaded`; Flux\'s panels carry alpha and frost)',
    'Soft blurred drop shadows (`shadowStyle` is `\'hard\'` — the cel offset block has no blur)',
    'A near-black ink outline (on the dark host the line inverts to bright `#dbe4ff`)',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#dbe4ff` — the bright inverted cel line the engine paints on every smoked-glass panel and control.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`\'hard\'` — the two-tone cel-shading signal; `elevation.*` pairs an inset glass highlight with a hard-offset block.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(255,255,255,0.07)` — a translucent smoked-glass cel, frosted by the engine\'s `backdrop-filter`.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Electric indigo `rgba(99,102,241,0.92)` — high-alpha so the fill glows against the dark glass.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(20px)` — a softer radius than the light glass registers, because dark glass reads as glass before it muddies.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-glass-noir',
      differentiator:
        'Both are dark `cel-glass` registers with an inverted bright line. Noir is the neutral-midnight neon register (cyan primary, near-neutral `#0c1018` host, near-white `#e8f6ff` line). Flux tilts the whole thing toward the new-tech-gradient palette: an indigo-navy `#0a0d1a` host, an indigo primary, and an electric-lavender `#dbe4ff` line.',
    },
    {
      against: 'aurora-nebula',
      differentiator:
        'Same electric tech palette, different engine. Nebula dissolves its chroma into a drifting atmospheric mesh on the `aurora` engine with `surfaceBy: \'luminance\'`. Flux freezes the same colors into bordered frosted-glass cels on the `cel-glass` engine with `surfaceBy: \'border\'` and a hard ink line.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the pure-glass parent — translucent panels and backdrop blur, but soft hairline-white borders (no cel line). Flux adds the cel half: a hard 2px electric outline on every panel and `shadowStyle: \'hard\'` two-tone shading.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers, Toasts — frosted panes with a crisp electric boundary read as floating glass cels',
    'Buttons and Segmented controls — the high-alpha neon fills bounded by the bright line read as lit HUD chips',
  ],
  degradesWith: [
    'Dense Tables — a bright ink line on every translucent row reads busy',
    'Browsers without `backdrop-filter` — the smoked-glass frost falls back to a flatter translucent fill',
  ],
  recallAliases: ['cel-glass flux', 'cel glass flux', 'flux', 'glass tech gradient', 'frosted tech'],
}
