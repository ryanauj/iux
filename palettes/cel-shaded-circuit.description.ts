import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-circuit',
  tagline:
    'The CEL-SHADED variation on the new-tech-gradient theme — the electric indigo / cyan / violet palette rendered as flat opaque poster cels with a bright ink line and hard two-tone shadows, on the `cel-shaded` engine.',
  summary:
    'Cel-shaded (Circuit) takes the modern-app gradient palette and renders it as a comic-book / cyberpunk-HUD read. It rides the `cel-shaded` engine over a deep ' +
    'circuit-board host `#0c0f1d`: every surface is an OPAQUE flat fill bounded by a hard ink line, and shading is a single hard-offset darker shape with no blur ' +
    '(`shadowStyle: \'hard\'`). Because the host is dark, the "ink" inverts to a bright electric-white edge — `effect.outline.color` (`#e2e8ff`) and `color.border.*` ' +
    'both resolve to it, so the outline is uniform on every neon cel. Intents are a saturated indigo / cyan / emerald / amber / rose triad as opaque blocks. Where ' +
    'the aurora registers dissolve the chroma into a drifting gradient and Cel-Glass (Flux) freezes it into frosted glass, Circuit freezes it into flat ink-bounded cels.',
  origin:
    'Original to the iux design system — the cel-shaded register of the new-tech-gradient family, and a dark, electric sibling to the warm light cel registers ' +
    '(`cel-shaded-shonen`, `cel-shaded-citrus`). It answers the brief\'s "or cel shaded on a couple" by routing the gradient palette through the cel-shaded engine\'s ' +
    'hard-ink, flat-fill, two-tone-shadow regime.',
  signatures: [
    {
      label: 'Opaque flat cels bounded by a hard ink line',
      detail:
        'The `cel-shaded` engine block paints a literal `outline:` halo on raised surfaces and interactive controls. Circuit\'s surfaces are opaque flat fills (no alpha, no blur) — a deep `#161a2e` raised cel over the `#0c0f1d` floor — each cut with the bright line. This is the cel-animation tell: a flat region separated from the background by an always-present outline.',
    },
    {
      label: 'Inverted bright electric line on a dark host',
      detail:
        'On the near-black host a near-black ink line would vanish, so the "ink" inverts to a bright electric-white `#e2e8ff`. `effect.outline.color` carries it at `3px` and every `color.border.*` slot points at the same value, so the line is uniform whichever neon intent fills the cel.',
    },
    {
      label: 'Hard-offset two-tone shadows (`shadowStyle: \'hard\'`)',
      detail:
        '`elevation.low` is `3px 3px 0 #05060f` scaling to `8px 8px 0 #05060f` at `overlay` — a single darker shape offset down-right with no blur, no spread. The block is darker than the floor so it reads as "the cel below," bounded by the bright outline above it.',
    },
    {
      label: 'Saturated neon triad as opaque fills + condensed HUD type',
      detail:
        'Intents are indigo `#6366f1`, cyan `#22d3ee`, emerald `#34d399`, amber `#fbbf24`, and rose `#fb7185` — opaque saturated blocks, not translucent. Display roles use a condensed techy stack (Chakra Petch / Rajdhani) uppercased, reinforcing the circuit-board HUD read.',
    },
  ],
  antiSignatures: [
    'Translucent or frosted surfaces (that is Cel-Glass (Flux); Circuit\'s cels are fully opaque with `backdropBlur` all `none`)',
    'A drifting atmospheric gradient (that is the aurora registers; Circuit sets `atmosphereGradient: \'none\'`)',
    'Soft blurred drop shadows (`shadowStyle` is `\'hard\'` — the offset block has no blur)',
    'A near-black ink outline (on the dark host the line inverts to bright `#e2e8ff`)',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#e2e8ff` — the bright inverted cel line the engine paints on every cel and control.',
    },
    {
      path: 'effect.outline.width',
      note: '`3px` — the hard line width, matched by `borderWidth.thick` so cards reading the thick border get the same outline.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`\'hard\'` — two-tone cel shading; `elevation.*` paints hard-offset darker blocks with no blur.',
    },
    {
      path: 'color.surface.raised',
      note: 'Opaque `#161a2e` — a flat lit cel stepped above the circuit-board floor, no alpha or blur.',
    },
    {
      path: 'color.intent.info.bg',
      note: 'Cyan `#22d3ee` — an opaque saturated neon block, the electric tech register frozen into a flat fill.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-glass-flux',
      differentiator:
        'The two variations of the same tech palette. Flux is the GLASS register: translucent frosted cels with `backdrop-filter` on the `cel-glass` engine. Circuit is the pure CEL register: fully opaque flat fills with `backdropBlur` all `none` on the `cel-shaded` engine. Both share the bright inverted line; only Flux is see-through.',
    },
    {
      against: 'cel-shaded-shonen',
      differentiator:
        'Same engine, opposite ground. Shonen is a warm cream-paper light register (`#fef6e4` base, near-black `#0a0a0a` ink line, orange/blue triad). Circuit is a dark circuit-board register (`#0c0f1d` base, inverted bright `#e2e8ff` line, electric indigo/cyan triad) — cyberpunk HUD where Shonen is daytime shonen anime.',
    },
    {
      against: 'aurora-spectrum',
      differentiator:
        'Same cool electric palette, different engine. Spectrum dissolves its chroma into a drifting atmospheric mesh on the `aurora` engine with translucent luminance surfaces. Circuit freezes the same colors into opaque flat cels with a hard ink line and hard offset shadows.',
    },
  ],
  thrivesWith: [
    'Buttons, Badges, Segmented controls — opaque neon cels bounded by the bright line read as crisp HUD chips',
    'Cards and Modals — the hard outline + hard-offset block gives a clean comic-panel depth',
    'Stat / scoreboard layouts — flat saturated blocks with uppercase condensed labels read as a game HUD',
  ],
  degradesWith: [
    'Long-form body text on saturated fills — the comic-poster register favours short labels over paragraphs',
    'Dense Tables — a 3px bright line on every cell reads heavy at small row heights',
  ],
  recallAliases: ['cel-shaded circuit', 'cel shaded circuit', 'circuit', 'cyberpunk cel', 'tech cel shaded'],
}
