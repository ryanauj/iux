import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cyberpunk-neon-noir',
  tagline:
    'Rainy-window register on the Glassmorphism engine — near-black `#08070d` field, magenta-cast translucent panels, dual magenta + cyan accents pushed through `border.*` and `elevation.*` as paired neon halos, and a glow-style focus ring.',
  summary:
    'Cyberpunk Neon-Noir is the dual-accent dark register of the glassmorphism engine. `surface.base` is near-black ' +
    '`#08070d`; `surface.raised` is a low-alpha magenta wash (`rgba(244,114,182,0.06)`) so panels read as faintly tinted ' +
    'glass rather than opaque cards. `border.subtle`/`default`/`focus` resolve to magenta (`#f0abfc` focus) while ' +
    '`border.strong` flips to cyan (`rgba(34,211,238,0.55)`), so panel edges read as two competing neon signs. ' +
    '`elevation.*` doubles the duality as paired magenta + cyan glows; `effect.focusRing.style = \'glow\'` so focus ' +
    'renders as a `box-shadow` halo, not an outline. Typography is geometric uppercase sans (Rajdhani / Eurostile) ' +
    'on display + UI with an uppercase mono on `code`, retuned to the neon-noir spectrum.',
  origin:
    'The neon-noir cyberpunk aesthetic codified by *Blade Runner* (1982), *Akira* (1988), *Ghost in the Shell* (1995), ' +
    'and the magenta/cyan-soaked revival in *Blade Runner 2049* (2017) and *Cyberpunk 2077* (2020). The look has ' +
    'consistent visual rules: a wet near-black ground, a dominant magenta/pink sign, a secondary cyan/teal sign, and ' +
    'geometric uppercase HUD lettering. This palette is the period-correct revival on the glass engine.',
  signatures: [
    {
      label: 'Dual magenta + cyan accents on `border.*` — magenta on subtle/default/focus, cyan on strong',
      detail:
        '`border.subtle` / `default` / `focus` are magenta (`rgba(244,114,182,0.16 → 0.32)` plus focus `#f0abfc`); `border.strong` flips to cyan `rgba(34,211,238,0.55)`. The two competing neon signs are the load-bearing cue — single-accent dark-neon palettes like Tron commit fully to cyan.',
    },
    {
      label: 'Paired magenta + cyan glows on `elevation.*`',
      detail:
        '`elevation.low` is `inset 0 0 0 1px rgba(244,114,182,0.26), 0 0 10px rgba(244,114,182,0.18), 0 0 4px rgba(34,211,238,0.10)` — every slot above `flat` stacks a magenta outer halo with a smaller cyan halo behind it, scaling to `inset … 0.55, 0 0 44px rgba(244,114,182,0.40), 0 0 22px rgba(34,211,238,0.26), 0 24px 60px rgba(0,0,0,0.70)` at `overlay`. Tron does this with one color; here the pair is the signature.',
    },
    {
      label: 'Magenta-cast translucent `surface.raised` (`rgba(244,114,182,0.06)`) on a near-black `#08070d` field',
      detail:
        'Not neutral-white glass and not opaque — a faint magenta wash. Tron uses cyan-cast translucent surfaces (`rgba(8,145,178,0.10)`); this palette pulls the same glass register into magenta. The 6% alpha is intentionally low so the panel almost disappears into the field, leaving the dual-color rim and glow to carry the structure.',
    },
    {
      label: 'Glow-style focus ring (`width: 2px, color: #f0abfc, style: glow`)',
      detail:
        '`effect.focusRing.style = \'glow\'` — the engine renders the ring as a `box-shadow` halo rather than a CSS outline. Same trick Tron uses, swapped to magenta `#f0abfc`. Solid-stroke focus would land you on Flat/Material; outline-style focus would land you on Brutalism.',
    },
    {
      label: 'Rajdhani / Eurostile geometric uppercase sans, with uppercased mono `code`',
      detail:
        '`typography.family.ui` and `display` resolve to `"Rajdhani", "Eurostile", "Bank Gothic", "Helvetica Neue", Helvetica, Arial, sans-serif`; `display`/`title`/`heading` are weight 600 with `0.04-0.06em` tracking and `textTransform: uppercase`. `code` is `"Share Tech Mono"` with `textTransform: uppercase`. The HUD-readout typography Tron uses, retuned for neon-noir.',
    },
    {
      label: 'Saturated dark `overlay` surface `rgba(34,11,40,0.85)` — a magenta-purple haze, not neutral black',
      detail:
        'Modals and popovers sit on `rgba(34,11,40,0.85)`, a purple-magenta scrim rather than neutral darkness, so the overlay continues the neon-noir hue rather than dropping to a black film.',
    },
  ],
  antiSignatures: [
    'A single neon accent across border/elevation — that\'s Tron (cyan-only) or one of the CRT phosphor palettes',
    'An opaque or neutral-white `raised` surface — would defeat the magenta-glass wash',
    'A solid-stroke focus ring — `effect.focusRing.style` is `glow`, rendered as a halo',
    'Soft drop shadows for elevation — Cyberpunk\'s elevation is paired neon glows, not gaussian penumbra',
    'Proportional system sans like Inter or system-ui — Rajdhani/Eurostile is the load-bearing HUD face',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#08070d` — near-black with a faint cool bias, the wet-noir ground.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(244, 114, 182, 0.06)` — magenta-cast translucent panel. Tron is cyan-cast `rgba(8,145,178,0.10)`; that\'s the engine sister test.',
    },
    {
      path: 'color.border.strong',
      note: '`rgba(34, 211, 238, 0.55)` — cyan on the strongest border slot, despite focus and the other border tiers being magenta. The dual-accent signature.',
    },
    {
      path: 'color.border.focus',
      note: '`#f0abfc` — saturated magenta on focus, rendered as a glow halo via `effect.focusRing.style = glow`.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`inset 0 0 0 1px rgba(244,114,182,0.34), 0 0 18px rgba(244,114,182,0.26), 0 0 8px rgba(34,211,238,0.16)` — magenta inset stroke + magenta outer halo + cyan secondary halo. Paired neon, not soft penumbra.',
    },
    {
      path: 'effect.focusRing.style',
      note: '`glow` — focus ring renders as a `box-shadow` halo, not a CSS outline.',
    },
    {
      path: 'typography.family.display',
      note: 'Rajdhani / Eurostile geometric uppercase stack — the HUD face. Display roles are weight 600, uppercase, with wide tracking.',
    },
    {
      path: 'color.surface.overlay',
      note: '`rgba(34, 11, 40, 0.85)` — purple-magenta haze rather than neutral black scrim.',
    },
  ],
  lookalikes: [
    {
      against: 'tron-dark-neon',
      differentiator:
        'Tron is the single-accent sister on the same glassmorphism engine: one cyan everywhere (translucent surfaces, all border tiers, all elevation glows). Cyberpunk Neon-Noir commits to two — magenta on subtle/default/focus, cyan on strong; magenta primary glow paired with cyan secondary glow on every elevation slot. The duality is the load-bearing distinction.',
    },
    {
      against: 'vaporwave',
      differentiator:
        'Vaporwave also uses the magenta + cyan pair, but on the flat engine: opaque deep-purple `#1a0b2e` base, opaque `#2a1452` raised, Playfair display serif, slow motion (`base 320ms`). Cyberpunk Neon-Noir is the glassmorphism cousin: translucent magenta-cast glass, geometric HUD sans, tight motion (`fast 90ms`), and glow-style focus.',
    },
    {
      against: 'mall-goth',
      differentiator:
        'Mall Goth shares the dark + magenta palette but flattens it into a satin/velvet register with desaturated rose accents and no neon glow. Cyberpunk Neon-Noir is wet glass with paired saturated neon halos and HUD typography.',
    },
    {
      against: 'crt-phosphor-green',
      differentiator:
        'CRT/Phosphor (Green) collapses every intent to one phosphor color, paints an engine-level scanline overlay, and runs `motion.decay = 80ms`. Cyberpunk Neon-Noir keeps full-color intents (success green, warning yellow, danger red, info cyan), has no scanlines, and `motion.decay = 0ms`. The shared dark field is incidental.',
    },
  ],
  thrivesWith: [
    'Hero panels and dashboards — paired magenta/cyan elevation reads as neon signage at large sizes',
    'Buttons and toggles — the magenta focus halo + glassy `raised` make `:focus-visible` unambiguous',
    'Modals over chaotic content — `surface.overlay rgba(34,11,40,0.85)` continues the noir haze rather than blacking out',
  ],
  degradesWith: [
    'PropertyInspector — dense `caption`-sized `content.muted` labels on `surface.sunken rgba(244,114,182,0.03)` fall close to the AA boundary, and the magenta wash pulls perceived label hue toward background (README flags as "most likely to fail")',
    'Long muted-text passages — `content.muted` at 46% alpha sits ~4.0-4.5:1 against the magenta-tinted glass',
    'Photographic backgrounds — the translucent magenta surfaces inherit whatever sits behind them',
  ],
  recallAliases: ['cyberpunk', 'neon noir', 'cyberpunk neon-noir', 'cyberpunk neon noir', 'blade runner', 'cyberpunk 2077', 'magenta cyan neon'],
}
