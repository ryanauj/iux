import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'tron-dark-neon',
  tagline:
    'Single-cyan tuning of the Glassmorphism engine — near-black `#04060c` field, cyan-cast translucent surfaces, inset 1px cyan stroke + outer cyan glow on every elevation slot, and a glow-style focus ring rendered as a `box-shadow` halo.',
  summary:
    'Tron / Dark-Neon is the single-accent dark register of the glassmorphism engine. Everything resolves to one ' +
    'cyan: `surface.raised` is `rgba(8, 145, 178, 0.10)` glass, every `border.*` tier is cyan rgba, ' +
    '`elevation.*` stacks an inset 1px cyan stroke (`rgba(34,211,238,0.18 → 0.55)`) with an outer cyan glow at ' +
    'increasing radii, and `effect.focusRing.color = #22d3ee` with `style = glow` so focus renders as a halo rather ' +
    'than an outline. Typography is Orbitron / Eurostile geometric sans uppercased at display sizes with an uppercase ' +
    'mono on `code` so readouts read as HUD output. Motion is tight (`fast 80ms / base 160ms / slow 280ms`) to feel ' +
    'arcade-cabinet responsive.',
  origin:
    'Disney\'s *Tron* (1982) and *Tron: Legacy* (2010) defined the canonical cyan-on-black "inside the computer" aesthetic ' +
    '— glowing edges, geometric uppercase HUD lettering, single-accent neon on near-black. The look has been the default ' +
    'sci-fi UI shorthand ever since, surfacing in *Mass Effect*, *Destiny*, countless title sequences, and stock film HUDs. ' +
    'This palette is the period-correct revival on the glass engine.',
  signatures: [
    {
      label: 'Single cyan accent on every border, content, elevation, and focus slot',
      detail:
        '`border.subtle` / `default` / `strong` / `focus` are all cyan rgba (`rgba(34, 211, 238, 0.16 → 0.55)` plus focus `#22d3ee`); `content.primary` is `#67e8f9`, `content.link` is `#22d3ee`. Cyberpunk Neon-Noir uses the same glass engine but pairs magenta and cyan; Tron commits to a single neon.',
    },
    {
      label: 'Inset 1px cyan stroke + outer cyan glow on every `elevation.*` slot',
      detail:
        '`elevation.low` is `inset 0 0 0 1px rgba(34,211,238,0.24), 0 0 8px rgba(34,211,238,0.16)`, scaling to `inset 0 0 0 1px rgba(34,211,238,0.55), 0 0 48px rgba(34,211,238,0.40), 0 24px 60px rgba(4,6,12,0.60)` at `overlay`. The HUD-chrome elevation recipe — inset rim line plus outer bloom — that the CRT phosphor engine borrowed wholesale.',
    },
    {
      label: 'Cyan-cast translucent surfaces (`rgba(8, 145, 178, 0.10 → 0.16)`) on a near-black `#04060c` field',
      detail:
        '`surface.raised` is `rgba(8, 145, 178, 0.10)`, `sunken` is `rgba(8, 145, 178, 0.05)`, `overlay` is `rgba(8, 145, 178, 0.16)`. Not neutral-white glass and not opaque — every surface continues the cyan tint, so the panel rim and glow read as the same material.',
    },
    {
      label: 'Glow-style focus ring (`width: 2px, offset: 2px, color: #22d3ee, style: glow`)',
      detail:
        '`effect.focusRing.style = \'glow\'` — focus renders as a `box-shadow` halo, not a CSS outline. A solid 2px outline would feel un-Tron. Glassmorphism (the neutral register) ships solid; Tron flips to glow.',
    },
    {
      label: 'Orbitron / Eurostile geometric uppercase HUD typography, with uppercased mono `code`',
      detail:
        '`typography.family.ui` and `display` resolve to `"Orbitron", "Eurostile", "Helvetica Neue", Helvetica, Arial, sans-serif`. `display`/`title` are weight 700, uppercase, `0.04em` tracking; `code` is `"Share Tech Mono"` with `textTransform: uppercase`. Body readouts read as HUD output, not prose.',
    },
    {
      label: 'Tight motion (`fast 80ms / base 160ms / slow 280ms`)',
      detail:
        'Faster than the engine default — arcade-cabinet responsive. Vaporwave on the flat engine ships `fast 180ms / base 320ms / slow 480ms` for dream-pop tempo; Tron tightens every duration for the snappy HUD feel.',
    },
  ],
  antiSignatures: [
    'A second accent color sharing the elevation glow — that\'s Cyberpunk Neon-Noir, which pairs magenta + cyan',
    'Opaque or neutral-white `raised` surfaces — would defeat the cyan-glass register',
    'Solid-stroke focus ring — `effect.focusRing.style` is `glow`, rendered as a `box-shadow` halo',
    'A scanline overlay (`effect.overlay.image: none` here) — that demotes this to CRT/Phosphor',
    'A proportional humanist sans like Inter or system-ui — Orbitron/Eurostile is the load-bearing HUD face',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#04060c` — near-black with a faint cool bias, the HUD ground.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(8, 145, 178, 0.10)` — cyan-cast translucent panel. Cyberpunk Neon-Noir is magenta-cast `rgba(244,114,182,0.06)` on the same engine.',
    },
    {
      path: 'color.border.focus',
      note: '`#22d3ee` — saturated cyan; the focus halo color rendered via `effect.focusRing.style = glow`.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`inset 0 0 0 1px rgba(34,211,238,0.32), 0 0 16px rgba(34,211,238,0.24)` — single-color inset stroke + outer glow. The HUD-chrome recipe; CRT/Phosphor borrows this shape but adds a scanline overlay.',
    },
    {
      path: 'effect.focusRing.style',
      note: '`glow` — focus renders as a `box-shadow` halo, not an outline.',
    },
    {
      path: 'effect.focusRing.color',
      note: '`#22d3ee` — the focus cyan that doubles as `content.link` and `border.focus`.',
    },
    {
      path: 'typography.family.display',
      note: 'Orbitron / Eurostile geometric stack — the HUD face. Display roles at weight 700, uppercase, `0.04em` tracking.',
    },
    {
      path: 'motion.duration.base',
      note: '`160ms` — the tight HUD tempo. Vaporwave (flat engine, slower register) ships `320ms` here.',
    },
  ],
  lookalikes: [
    {
      against: 'cyberpunk-neon-noir',
      differentiator:
        'Same glassmorphism engine and same dark register, but Cyberpunk Neon-Noir runs paired magenta + cyan accents: magenta on subtle/default/focus, cyan on strong; every elevation slot stacks a magenta outer halo with a smaller cyan halo behind it. Tron commits to a single cyan everywhere — surfaces, borders, elevation halos, focus, content. Single-neon vs paired-neon is the load-bearing distinction.',
    },
    {
      against: 'crt-phosphor-green',
      differentiator:
        'CRT/Phosphor (Green) runs the dedicated `crt-phosphor` engine: a scanline `effect.overlay.image` at the palette root, a phosphor `effect.glow` halo on text, and `motion.decay = 80ms` for the phosphor-decay tail. Tron has no scanlines (`effect.overlay.image: none`), no phosphor glow (`effect.glow.radius: 0`), and `motion.decay = 0ms`. The shared inset+outer-glow elevation trick is the only family resemblance.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the neutral light register of the same engine — neutral-white translucent surfaces, indigo accents, system-ui typography, solid-stroke focus. Tron is the dark single-cyan tuning: cyan-cast glass, Orbitron HUD type, glow-style focus, tight motion.',
    },
    {
      against: 'aurora',
      differentiator:
        'Aurora paints a soft luminance gradient onto a dark field via `effect.atmosphereGradient` / `luminanceCenter` and demarcates surfaces by light density (`surfaceBy: light`). Tron demarcates by `border` (CSS strokes), has no atmosphere gradient, and commits to a single cyan accent rather than Aurora\'s polychrome bands.',
    },
  ],
  thrivesWith: [
    'Dashboards and HUD-style layouts — single cyan plus geometric uppercase reads as instrumentation',
    'Buttons, toggles, sliders — the cyan focus halo + inset-stroke elevation make `:focus-visible` unambiguous',
    'Modals — `elevation.overlay` (`0 0 48px rgba(34,211,238,0.40)`) plus the cyan scrim reads as a floating HUD panel',
    'Charts and data viz — single accent over near-black keeps signal-to-noise high',
  ],
  degradesWith: [
    'Long prose — `Orbitron` is a display face; body running text at `body 0.9375rem` gets fatiguing past a paragraph',
    'Translucent `raised` mounted over unknown hosts — per-token AA is a guideline; the panel inherits whatever shows through',
    'Forms relying on intent color alone — primary, info, and link all sit in the cyan family; pair with iconography',
  ],
  recallAliases: ['tron', 'tron dark-neon', 'tron dark neon', 'dark neon', 'cyan neon', 'hud cyan'],
}
