# CRT / Phosphor (Green)

> The canonical green-screen tube — a single P1 phosphor (`#7dff8a`) on a near-black field, scanline overlay at the palette root, and the `motion.decay = 80ms` regime that makes state transitions linger past their main duration.

**Engine:** `crt-phosphor` · **A11y:** `experimental`

## Summary

CRT / Phosphor (Green) is the reference register of the `crt-phosphor` engine. Every surface, content slot, border and intent is one phosphor color (`#7dff8a`) varying only in alpha; the engine paints a two-layer scanline gradient as `background-image` on `.palette-root` (`effect.overlay.image`), a phosphor-bloom halo on text via `effect.glow` (`radius: 6px`, `color: rgba(125,255,138,0.65)`), and a phosphor-decay tail on state transitions via `motion.decay = 80ms`. Typography is VT323 mono at every role with uppercased label/caption tracking; radii on `sm`/`md` are `0` because CRT pixels do not round corners.

## Origin

P1 phosphor green-screen terminals — VT100 (1978), VT220 (1983), ADM-3A, Wyse — the institutional computing aesthetic of the late 1970s and 1980s before color CRTs displaced monochrome on the desktop. This palette is the canonical revival of that tube, anchored on a new engine built specifically to model scanlines, phosphor bloom, and decay as first-class tokens.

## Signatures

- **Two-layer scanline `effect.overlay.image` at the palette root** — A `repeating-linear-gradient` stack: a 1px dark line every 2px (`rgba(0,0,0,0.35)`) plus a 4px softer phosphor-tinted band (`rgba(125,255,138,0.04)` every 3-4px) so the field does not moiré. Applied with `blend: screen`. Every non-CRT palette returns `image: none`, making this the load-bearing engine signal.
- **Single phosphor color (`#7dff8a`) on every intent and content slot** — `content.primary`, `border.focus`, every `intent.*.border` and every `intent.*.bg` resolve to the same `#7dff8a` varying only in alpha (`0.06` neutral → `0.85` danger border). Monochrome — `intent=danger` and `intent=primary` differ only by border alpha, which the README flags as an accessibility caveat.
- **Phosphor-bloom `effect.glow` recipe (`radius: 6px`, color `rgba(125,255,138,0.65)`)** — The engine renders glow as a `text-shadow` on body text and a `box-shadow` halo on `:focus-visible`. Every non-CRT palette sets `radius: 0` / `color: transparent` so the same engine rule multiplies by zero. `intensity: 0.7` scales the bloom on hover.
- **Phosphor-decay motion regime (`motion.decay: 80ms`)** — A trailing duration the engine reads as `transition-delay` so hovers and focus moves fade out instead of snapping. Every other palette ships `decay: 0ms`. Under `prefers-reduced-motion` the engine collapses this to zero.
- **Inset 1px phosphor stroke + outer phosphor glow on `elevation.*`** — `elevation.low` is `inset 0 0 0 1px rgba(125,255,138,0.28), 0 0 6px rgba(125,255,138,0.20)`, scaling to `inset 0 0 0 1px rgba(125,255,138,0.62), 0 0 40px rgba(125,255,138,0.42), 0 24px 60px rgba(2,6,4,0.70)` at `overlay`. Same inset+outer-glow trick Tron uses with cyan; here both layers are green.
- **VT323 mono everywhere, uppercased labels with 0.10em tracking** — `typography.family.*` all resolve to `"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace`. There is no display serif in CRT — display/title/heading exist only as sizes. `label` and `caption` are `textTransform: uppercase` with `0.08–0.10em` tracking, the terminal-readout convention.

## Anti-signatures

- Color in intents — a red danger, blue info, or green success would defeat the monochrome cue
- Rounded corners on small/medium (CRT pixels do not round; `radius.sm` and `radius.md` are `0`)
- A proportional sans like Inter or Segoe on body — VT323 mono is load-bearing
- No scanline overlay (`effect.overlay.image: none`) — that demotes this to plain dark-neon
- Solid-stroke focus ring — `effect.focusRing.style` is `glow`, rendered as a `box-shadow` halo

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.overlay.image` | `repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0.35) 1px, rgba(0, 0, 0, 0.35) 2px), repeating-linear-gradient(to bottom, rgba(125, 255, 138, 0) 0, rgba(125, 255, 138, 0) 3px, rgba(125, 255, 138, 0.04) 3px, rgba(125, 255, 138, 0.04) 4px)` | The two-layer scanline gradient stack — a 1px dark line every 2px plus a 4px phosphor band. The single most identifying token on the engine; every other palette returns `none`. |
| `effect.glow.color` | `rgba(125, 255, 138, 0.65)` | `rgba(125, 255, 138, 0.65)` — the P1-green phosphor bloom that distinguishes this palette from the amber sister. |
| `effect.glow.radius` | `6px` | `6px` — the bloom radius the engine multiplies into text-shadows and focus halos. |
| `motion.decay` | `80ms` | `80ms` — the phosphor-decay tail on state transitions. Every other palette is `0ms`. |
| `effect.focusRing.style` | `glow` | `glow` — the focus ring renders as a `box-shadow` halo (not a CSS outline). Not a valid `outline-style` keyword; the engine handles it specially. |
| `color.content.primary` | `#7dff8a` | `#7dff8a` — the canonical P1 phosphor color, reused at `border.focus` and inside every intent slot. |
| `typography.family.mono` | `"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace` | VT323 stack — also aliased into `ui`, `display`, `pixel`, `hand`. No serif in CRT. |

## Often confused with

### vs [CRT / Phosphor (Amber)](./crt-phosphor-amber.md)

The amber sister runs the identical `crt-phosphor` engine — same scanline gradient stack, same `motion.decay = 80ms`, same elevation recipe — and differs only in the phosphor color. Green is `#7dff8a` on `#020604`; amber is `#ffb347` on `#0a0500`. That single token swap is the entire distinction (FINALIZED-PALETTES.md Group B: same engine, multiple palettes).

### vs [Terminal / TUI](./terminal-tui.md)

Terminal/TUI is a flat-engine palette that imitates a terminal with mono typography and dimmed ANSI accents but does not paint scanlines, does not glow, and has `motion.decay = 0ms`. CRT/Phosphor (Green) is the actual tube simulation — engine-level overlay + bloom + decay are the load-bearing cues.

### vs [Tron / Dark-Neon](./tron-dark-neon.md)

Tron is the Glassmorphism engine tuned to a single cyan accent — same inset-stroke + outer-glow elevation recipe, but no scanline overlay, no `motion.decay`, color intents still resolve to distinct hues (cyan/green/yellow/red/blue). CRT/Phosphor (Green) collapses every intent to one phosphor color and paints the engine-level scanline gradient.

### vs [Financial Terminal](./financial-terminal.md)

Financial Terminal is a dense Bloomberg-style multicolor monochrome-adjacent palette (amber, green, white on black) for dense numeric readouts. CRT/Phosphor (Green) is the monochromatic CRT tube — one phosphor color everywhere plus a scanline overlay.

## Where it thrives

- Buttons and toggles where the `:focus-visible` halo glow is the whole interaction signal
- Readouts and code blocks — VT323 + uppercased tracking matches the terminal-readout convention
- Modals and overlays — `elevation.overlay` stacks the strongest inset+bloom and reads as a floating tube panel

## Where it degrades

- Forms relying on color-coded intent states — danger and primary differ only by border alpha; pair with iconography
- Dense small-caption muted text — scanline overlay drops effective contrast 20–25% on body text; captions can fall near 3:1
- Photo content — the scanline overlay and screen-blended bloom destroy photographic fidelity

## Recall aliases

`crt`, `crt phosphor green`, `crt green`, `phosphor green`, `green screen`, `green phosphor`, `vt100`, `p1 phosphor`

## Long-form notes

<details>
<summary>From <code>palettes/crt-phosphor-green.README.md</code></summary>

# CRT / Phosphor (Green)

The canonical green-screen tube — every surface is a single phosphor
color (`#7dff8a`) on a near-black field, with a scanline overlay laid
down at the palette root, a phosphor-bloom halo on body text, and the
**phosphor-decay** motion regime where state transitions linger past
their main duration instead of snapping.

Anchored on a new `crt-phosphor` engine that exercises three contract
slots no previous engine touched:

- `effect.overlay.{image,size,blend}` — the engine-level scanline
  gradient stack applied as `background-image` on `.palette-root`. Every
  other palette returns `image: 'none'`, making the rule a no-op.
- `effect.glow.{radius,color,intensity}` — the phosphor halo recipe.
  Drives a `text-shadow` on body text and a `box-shadow` halo on
  `:focus-visible`. All other palettes set `radius = '0'` and
  `color = 'transparent'` so the same engine CSS multiplies by zero.
- `motion.decay` — the trailing duration added to state transitions
  (`'80ms'` here, `'0ms'` everywhere else). Components that want to
  participate in the decay regime read `var(--motion-decay)` as a
  `transition-delay`.

Typography is a single mono stack (`"VT323"` with classic terminal-mono
fallbacks) at every typographic role. Display / title / heading still
exist as separate sizes but they all render in the same face — there is
no display serif in CRT. Labels and captions are uppercased with wide
tracking, consistent with terminal-readout conventions.

Radii on small/medium are `0` — CRT pixels don't round corners. `lg`
keeps a 2px nudge to give modal cards a single-pixel softening.

`elevation.*` packs an inset 1px phosphor stroke with an outer phosphor
glow at increasing radii. This is the same trick Tron's glassmorphism
register uses; here the inset and the bloom are both green, which is
exactly the look you want.

## A11y

`experimental`. Two reasons:

1. **Phosphor on near-black is high contrast on the token level**
   (`#7dff8a` content on `#020604` base measures ≈ 17:1), but the
   scanline overlay reduces the effective contrast on body text by
   ~20–25% depending on viewport DPI. Field text still clears AA
   comfortably; small dimmed captions can drop close to 3:1.
2. **Intents collapse to a single color in monochrome.** A
   `intent=danger` button and an `intent=primary` button differ only by
   border alpha. Forms that lean on color-coded states for affordance
   need supplementary iconography under this palette — that's the
   palette doing what it's supposed to do, but it's a UX caveat.

Under `prefers-reduced-motion`, the engine collapses `--motion-decay`
to zero, halts the focus-halo pulse animation, but leaves the
scanline overlay in place (it is decoration, not motion — animating it
would be the violation).

## Contract gaps this engine reveals

See the project root `README.md` "Contract gaps revealed by CRT" section.
The short version: `effect.focusRing.style = 'glow'` is not a valid CSS
`outline-style` keyword, components that read `--motion-decay` directly
do not yet exist, and intent slots have no "monochrome" affordance.

</details>

---

_Generated from `palettes/crt-phosphor-green.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
