# Tron / Dark-Neon

> Single-cyan tuning of the Glassmorphism engine — near-black `#04060c` field, cyan-cast translucent surfaces, inset 1px cyan stroke + outer cyan glow on every elevation slot, and a glow-style focus ring rendered as a `box-shadow` halo.

**Engine:** `glassmorphism` · **A11y:** `experimental`

## Summary

Tron / Dark-Neon is the single-accent dark register of the glassmorphism engine. Everything resolves to one cyan: `surface.raised` is `rgba(8, 145, 178, 0.10)` glass, every `border.*` tier is cyan rgba, `elevation.*` stacks an inset 1px cyan stroke (`rgba(34,211,238,0.18 → 0.55)`) with an outer cyan glow at increasing radii, and `effect.focusRing.color = #22d3ee` with `style = glow` so focus renders as a halo rather than an outline. Typography is Orbitron / Eurostile geometric sans uppercased at display sizes with an uppercase mono on `code` so readouts read as HUD output. Motion is tight (`fast 80ms / base 160ms / slow 280ms`) to feel arcade-cabinet responsive.

## Origin

Disney's *Tron* (1982) and *Tron: Legacy* (2010) defined the canonical cyan-on-black "inside the computer" aesthetic — glowing edges, geometric uppercase HUD lettering, single-accent neon on near-black. The look has been the default sci-fi UI shorthand ever since, surfacing in *Mass Effect*, *Destiny*, countless title sequences, and stock film HUDs. This palette is the period-correct revival on the glass engine.

## Signatures

- **Single cyan accent on every border, content, elevation, and focus slot** — `border.subtle` / `default` / `strong` / `focus` are all cyan rgba (`rgba(34, 211, 238, 0.16 → 0.55)` plus focus `#22d3ee`); `content.primary` is `#67e8f9`, `content.link` is `#22d3ee`. Cyberpunk Neon-Noir uses the same glass engine but pairs magenta and cyan; Tron commits to a single neon.
- **Inset 1px cyan stroke + outer cyan glow on every `elevation.*` slot** — `elevation.low` is `inset 0 0 0 1px rgba(34,211,238,0.24), 0 0 8px rgba(34,211,238,0.16)`, scaling to `inset 0 0 0 1px rgba(34,211,238,0.55), 0 0 48px rgba(34,211,238,0.40), 0 24px 60px rgba(4,6,12,0.60)` at `overlay`. The HUD-chrome elevation recipe — inset rim line plus outer bloom — that the CRT phosphor engine borrowed wholesale.
- **Cyan-cast translucent surfaces (`rgba(8, 145, 178, 0.10 → 0.16)`) on a near-black `#04060c` field** — `surface.raised` is `rgba(8, 145, 178, 0.10)`, `sunken` is `rgba(8, 145, 178, 0.05)`, `overlay` is `rgba(8, 145, 178, 0.16)`. Not neutral-white glass and not opaque — every surface continues the cyan tint, so the panel rim and glow read as the same material.
- **Glow-style focus ring (`width: 2px, offset: 2px, color: #22d3ee, style: glow`)** — `effect.focusRing.style = 'glow'` — focus renders as a `box-shadow` halo, not a CSS outline. A solid 2px outline would feel un-Tron. Glassmorphism (the neutral register) ships solid; Tron flips to glow.
- **Orbitron / Eurostile geometric uppercase HUD typography, with uppercased mono `code`** — `typography.family.ui` and `display` resolve to `"Orbitron", "Eurostile", "Helvetica Neue", Helvetica, Arial, sans-serif`. `display`/`title` are weight 700, uppercase, `0.04em` tracking; `code` is `"Share Tech Mono"` with `textTransform: uppercase`. Body readouts read as HUD output, not prose.
- **Tight motion (`fast 80ms / base 160ms / slow 280ms`)** — Faster than the engine default — arcade-cabinet responsive. Vaporwave on the flat engine ships `fast 180ms / base 320ms / slow 480ms` for dream-pop tempo; Tron tightens every duration for the snappy HUD feel.

## Anti-signatures

- A second accent color sharing the elevation glow — that's Cyberpunk Neon-Noir, which pairs magenta + cyan
- Opaque or neutral-white `raised` surfaces — would defeat the cyan-glass register
- Solid-stroke focus ring — `effect.focusRing.style` is `glow`, rendered as a `box-shadow` halo
- A scanline overlay (`effect.overlay.image: none` here) — that demotes this to CRT/Phosphor
- A proportional humanist sans like Inter or system-ui — Orbitron/Eurostile is the load-bearing HUD face

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#04060c` | `#04060c` — near-black with a faint cool bias, the HUD ground. |
| `color.surface.raised` | `rgba(8, 145, 178, 0.10)` | `rgba(8, 145, 178, 0.10)` — cyan-cast translucent panel. Cyberpunk Neon-Noir is magenta-cast `rgba(244,114,182,0.06)` on the same engine. |
| `color.border.focus` | `#22d3ee` | `#22d3ee` — saturated cyan; the focus halo color rendered via `effect.focusRing.style = glow`. |
| `elevation.medium.boxShadow` | `inset 0 0 0 1px rgba(34, 211, 238, 0.32), 0 0 16px rgba(34, 211, 238, 0.24)` | `inset 0 0 0 1px rgba(34,211,238,0.32), 0 0 16px rgba(34,211,238,0.24)` — single-color inset stroke + outer glow. The HUD-chrome recipe; CRT/Phosphor borrows this shape but adds a scanline overlay. |
| `effect.focusRing.style` | `glow` | `glow` — focus renders as a `box-shadow` halo, not an outline. |
| `effect.focusRing.color` | `#22d3ee` | `#22d3ee` — the focus cyan that doubles as `content.link` and `border.focus`. |
| `typography.family.display` | `"Orbitron", "Eurostile", "Helvetica Neue", Helvetica, Arial, sans-serif` | Orbitron / Eurostile geometric stack — the HUD face. Display roles at weight 700, uppercase, `0.04em` tracking. |
| `motion.duration.base` | `160ms` | `160ms` — the tight HUD tempo. Vaporwave (flat engine, slower register) ships `320ms` here. |

## Often confused with

### vs [Cyberpunk Neon-Noir](./cyberpunk-neon-noir.md)

Same glassmorphism engine and same dark register, but Cyberpunk Neon-Noir runs paired magenta + cyan accents: magenta on subtle/default/focus, cyan on strong; every elevation slot stacks a magenta outer halo with a smaller cyan halo behind it. Tron commits to a single cyan everywhere — surfaces, borders, elevation halos, focus, content. Single-neon vs paired-neon is the load-bearing distinction.

### vs [CRT / Phosphor (Green)](./crt-phosphor-green.md)

CRT/Phosphor (Green) runs the dedicated `crt-phosphor` engine: a scanline `effect.overlay.image` at the palette root, a phosphor `effect.glow` halo on text, and `motion.decay = 80ms` for the phosphor-decay tail. Tron has no scanlines (`effect.overlay.image: none`), no phosphor glow (`effect.glow.radius: 0`), and `motion.decay = 0ms`. The shared inset+outer-glow elevation trick is the only family resemblance.

### vs [Glassmorphism](./glassmorphism.md)

Glassmorphism is the neutral light register of the same engine — neutral-white translucent surfaces, indigo accents, system-ui typography, solid-stroke focus. Tron is the dark single-cyan tuning: cyan-cast glass, Orbitron HUD type, glow-style focus, tight motion.

### vs [Aurora](./aurora.md)

Aurora paints a soft luminance gradient onto a dark field via `effect.atmosphereGradient` / `luminanceCenter` and demarcates surfaces by light density (`surfaceBy: light`). Tron demarcates by `border` (CSS strokes), has no atmosphere gradient, and commits to a single cyan accent rather than Aurora's polychrome bands.

## Where it thrives

- Dashboards and HUD-style layouts — single cyan plus geometric uppercase reads as instrumentation
- Buttons, toggles, sliders — the cyan focus halo + inset-stroke elevation make `:focus-visible` unambiguous
- Modals — `elevation.overlay` (`0 0 48px rgba(34,211,238,0.40)`) plus the cyan scrim reads as a floating HUD panel
- Charts and data viz — single accent over near-black keeps signal-to-noise high

## Where it degrades

- Long prose — `Orbitron` is a display face; body running text at `body 0.9375rem` gets fatiguing past a paragraph
- Translucent `raised` mounted over unknown hosts — per-token AA is a guideline; the panel inherits whatever shows through
- Forms relying on intent color alone — primary, info, and link all sit in the cyan family; pair with iconography

## Recall aliases

`tron`, `tron dark-neon`, `tron dark neon`, `dark neon`, `cyan neon`, `hud cyan`

## Long-form notes

<details>
<summary>From <code>palettes/tron-dark-neon.README.md</code></summary>

# Tron / Dark-Neon

Glassmorphism engine, single-color tuning. Near-black `surface.base`
(`#04060c`), translucent cyan raised/sunken/overlay surfaces (`rgba(8,
145, 178, …)`), and a saturated cyan focus ring rendered as a
*glow* (`effect.focusRing.style = 'glow'`) rather than a solid stroke.

`elevation.*` stacks an inset 1px cyan inner stroke with an outer cyan
glow at increasing radii — the "HUD chrome" look. Typography reaches for
`Orbitron` / `Eurostile` style geometric sans on UI text and an uppercase
mono on `code` (`textTransform: 'uppercase'`) so readouts read as HUD
output rather than prose. Motion is tight (80-280ms) to feel
arcade-cabinet responsive.

**A11y:** `experimental`. Because Tron reuses the Glassmorphism engine
the same caveat applies: translucent `raised` surfaces inherit whatever
sits behind them, so per-token contrast is a guideline, not a guarantee.
On the documented near-black `base` the contract values clear AA
(`#67e8f9` content ≈ 9.7:1), but as soon as the panel is mounted over an
unknown host its contrast becomes whatever shows through. The
aggressive `scrim` (`rgba(4, 6, 12, 0.78)`) is mandatory for overlays.
`effect.focusRing.style = 'glow'` requires the engine to render the ring
as a `box-shadow` halo (not an outline) — components that want it to
work everywhere should fall back to outline plus an additional glow.

</details>

---

_Generated from `palettes/tron-dark-neon.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
