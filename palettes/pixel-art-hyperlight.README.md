# Pixel Art (Hyper Light)

The modern synth-noir register. Deep indigo fields, hot magenta
accents, electric teal highlights, pale cream content. Inspired by
Heart Machine's *Hyper Light Drifter* (2016, Alx Preston / music by
Disasterpeace) and the wider neon-pastel pixel wave (Sayonara Wild
Hearts, Sundered, late-game *Eastward*).

Same `pixel-art` engine as NES / Game Boy / SNES — square corners,
bitmap font (Press Start 2P), hard offsets, `steps(1, end)` easings.
What makes this register **modern** is the colour temperature: every
pair runs cool-on-dark with a single hot accent, which is the
post-CRT, post-LCD palette indie pixel art settled into in the 2010s.
No console ever shipped this palette; it's an art-direction register,
not a hardware register.

Palette anchors:

| Hex        | Role                                             |
|------------|--------------------------------------------------|
| `#1a0e2e`  | Indigo field — dusk / interior                   |
| `#2d1b48`  | Raised panel — interior, lighter dusk            |
| `#100820`  | Drop shadow / deepest tone                       |
| `#ff3993`  | Signature drifter magenta — primary, focus, glow |
| `#52e0c5`  | Teal — success, info, shard pickup               |
| `#f4e7d6`  | Pale cream — primary content, never pure white   |
| `#ff2d4a`  | Blood red — danger only                          |
| `#f4c843`  | Warning amber — waning sun                       |

## The magenta drop is the register

The most identifiable HLD UI gesture is the **magenta cast on the
high elevation**. The engine forbids anti-aliased glow (no
`box-shadow` blur, no halo), so we approximate the drifter "blade
silhouette" with a stacked hard offset: a deep-indigo drop
underneath, then a magenta block offset further out. Components that
elevate to `high` (Tooltip, Popover, Menu) get the cast; everything
under `medium` stays clean indigo.

`overlay` elevation flips: it leads with a magenta outline
(`0 0 0 2px #ff3993`) before the indigo drop. Modal and Drawer get
the most HLD-specific look — the magenta frame reads as a
neon-on-dusk window cut into the field.

## A11y

`experimental` — same engine caveats. Cream content on indigo
(`#f4e7d6` on `#1a0e2e`) measures ≈ 13.1:1, comfortably AAA at body
size. Magenta border / focus on indigo (`#ff3993` on `#1a0e2e`)
measures ≈ 5.6:1 — clears AA for non-text UI.

The risk surface is **the magenta primary fill**: `#f4e7d6` content
on `#ff3993` bg measures ≈ 3.3:1, **just below** AA for body text and
exactly at AA for large text (18 CSS px / 14 CSS px bold). At label
size (8 CSS px Press Start 2P) the pair is still readable but
defeats AA on paper. If the primary intent will carry small body
copy in your app, consider an explicit `text-stroke` override (the
engine respects it) or prefer `info` / `success` for the same role.

## What thrives vs degrades

Components that **thrive**:
- **Modal, Drawer, Popover** — the magenta-outline overlay recipe
  reads as a window cut into dusk. Most HLD-specific look in the set.
- **Toast** with `success` (teal) or `danger` (blood-red) intents on
  the indigo base — high-contrast, atmospheric.
- **Tooltip, Menu** on `high` elevation — the magenta cast does the
  affordance work the engine's missing glow would otherwise do.

Degrades:
- **Small body text on the primary magenta fill** — see A11y above.
- **DataTable with alternating row fills** — `surface.raised` and
  `surface.sunken` are both close-luminance indigos; rows blend if
  borders aren't strong. Use `borderWidth.thin` row separators.
- Same engine-level degradations as the other pixel-art registers
  (SpatialCanvas, BezierEditor, fractional sliders).

See [`pixel-art-nes.README.md`](./pixel-art-nes.README.md) for the
engine-level details, pixel-font choice, and the broader thrives /
degrades list.
