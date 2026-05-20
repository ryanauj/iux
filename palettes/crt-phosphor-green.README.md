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
