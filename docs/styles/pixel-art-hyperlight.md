# Pixel Art (Hyper Light)

> The modern synth-noir register — deep indigo dusk fields, hot magenta primary, electric teal highlights, and a magenta-cast hard offset stack that approximates the "blade silhouette" without anti-aliased glow.

**Engine:** `pixel-art` · **A11y:** `experimental`

## Summary

Pixel Art (Hyper Light) is the modern post-CRT register on the `pixel-art` engine — every pair runs cool-on-dark with a single hot accent. `surface.base` is indigo `#1a0e2e` (dusk), `surface.raised` is lighter dusk `#2d1b48`, `content.primary` is pale cream `#f4e7d6` (never pure white), and the signature magenta `#ff3993` carries `intent.primary`, `border.strong`, `border.focus`, and the `high` / `overlay` elevation cast. Teal `#52e0c5` carries success/info; blood-red `#ff2d4a` is reserved for danger; amber `#f4c843` is warning. Same bitmap engine as NES — only the colour register is modern.

## Origin

Anchored on Heart Machine's *Hyper Light Drifter* (2016, Alx Preston / music by Disasterpeace) and the wider neon-pastel pixel wave — Sayonara Wild Hearts, Sundered, late-game Eastward. Not a hardware-locked palette; an art-direction register that the 2010s indie pixel scene settled into after CRT and LCD constraints fell away.

## Signatures

- **Indigo-dusk host with cream content — `#1a0e2e` / `#f4e7d6`** — `color.surface.base` is `#1a0e2e` (dusk indigo), `color.content.primary` is `#f4e7d6` (pale cream, deliberately not pure white). The pair measures ~13.1:1 — AAA at body size. Cool-on-dark with a warm-cream content is the post-2010s indie register.
- **Signature drifter magenta `#ff3993` — primary, border, focus, overlay frame** — `intent.primary.bg` is magenta `#ff3993`; `border.strong` and `border.focus` are the same hue; `effect.focusRing.color` is `#ff3993` at `4px`. The magenta runs through five distinct token slots — the hot accent doing the affordance work the engine's missing glow would otherwise provide.
- **Magenta-cast `elevation.high` — `4px 4px 0 #100820, 8px 8px 0 #ff3993`** — `elevation.high.boxShadow` stacks a deep-indigo drop with a magenta block offset further out. The engine forbids anti-aliased glow, so the contract approximates the HLD "blade silhouette" with a second hard offset in the signature pink. Compare NES `high` (multi-tone grey stack) or Game Boy `high` (mid-green) — Hyperlight uses the accent.
- **Magenta-outline `elevation.overlay` — `0 0 0 2px #ff3993, 4px 4px 0 #100820`** — `overlay` flips: it leads with a magenta outline ring before the indigo drop. Modal and Drawer get the most HLD-specific look — a neon-on-dusk window cut into the field. SNES uses a white outline at the same slot; Hyperlight uses magenta.
- **Teal `#52e0c5` carries `intent.success`, `content.link`, and `info`** — `intent.success.bg` is teal `#52e0c5`, `content.link` is `#52e0c5`, `intent.info.bg` is the closely-related `#33d9c4`. Teal is the second register colour after magenta — the "shard pickup" cue from the source game.
- **Press Start 2P everywhere, `radius.*` is `0`, `effect.pixelGrid` at `8px`** — Same engine wiring as NES — bitmap font through every role, every radius collapses to zero, engine grid step at `8px`. The "modern" feel comes entirely from colour temperature, never from softer geometry.

## Anti-signatures

- Pure white content (`#ffffff`) — the register reserves cream `#f4e7d6` instead
- Black hard offsets — Hyperlight uses deep indigo `#100820` and pairs them with magenta at `high`
- Anti-aliased glow or `box-shadow` blur (the engine forbids it; magenta is approximated via a hard offset)
- Rounded corners or soft shadows
- System UI / sans-serif body — every role is Press Start 2P bitmap
- Saturated console primaries (sky-blue `#0000fc`, brick `#d82800`) — the register runs cool-on-dark with one hot accent

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.pixelGrid` | `8px` | `8px` — the engine snap step. Shared with the rest of the pixel-art family. |
| `color.surface.base` | `#1a0e2e` | `#1a0e2e` — indigo dusk. The cool-on-dark host that defines the register. |
| `color.intent.primary.bg` | `#ff3993` | `#ff3993` — signature drifter magenta. The single hot accent across the register. |
| `color.content.link` | `#52e0c5` | `#52e0c5` — electric teal, the second register colour (shard pickup). |
| `elevation.high.boxShadow` | `4px 4px 0 #100820, 8px 8px 0 #ff3993` | `4px 4px 0 #100820, 8px 8px 0 #ff3993` — magenta-cast at the high tier. The "blade silhouette" recipe. |
| `elevation.overlay.boxShadow` | `0 0 0 2px #ff3993, 4px 4px 0 #100820` | `0 0 0 2px #ff3993, 4px 4px 0 #100820` — magenta outline frame on Modal / Drawer. |
| `effect.focusRing.color` | `#ff3993` | `#ff3993` — magenta focus at `4px`. Same hue as primary and `border.focus`. |
| `typography.family.pixel` | `"Press Start 2P", "VT323", ui-monospace, monospace` | Press Start 2P stack — same bitmap register as the rest of the pixel-art family. |
| `radius.pill` | `0` | `0` — circular components render as squares. The modern temperature does not soften geometry. |

## Often confused with

### vs [Pixel Art (NES)](./pixel-art-nes.md)

NES is the 1985 NTSC-2C02 register — sky `#0000fc`, brick `#d82800`, coin `#fcfc00` saturated console primaries on a flat field, black hard offsets. Hyperlight (this palette) is the modern art-direction register: indigo dusk host, one hot magenta accent, magenta-cast offset at `high`. Different decade, different temperature, same engine.

### vs [Pixel Art (SNES)](./pixel-art-snes.md)

SNES has a deep blue dialog base (`#1c3878`) and a white inner bevel — the JRPG menu-frame idiom. Hyperlight has an even darker indigo (`#1a0e2e`) and a magenta inner outline at `overlay` instead of white. The frame colour is the cleanest tell.

### vs [Pixel Art (PICO-8)](./pixel-art-pico8.md)

PICO-8 is the fixed 16-colour ROM register; hover/active states jump to a neighbouring slot rather than tinting. Hyperlight uses a free art-direction palette (not a fixed ROM) and tints its hover states normally — `#ff5ca8` is just a lighter `#ff3993`.

### vs [CRT / Phosphor (Green)](./crt-phosphor-green.md)

CRT/Phosphor renders green-on-black with scanlines and phosphor decay (`effect.overlay.image` non-`none`, `motion.decay` non-zero). Hyperlight has no scanlines, no decay, and a magenta-not-green accent palette.

## Where it thrives

- Modal, Drawer, Popover — the magenta-outline `overlay` recipe reads as a window cut into dusk
- Toast with `success` (teal) or `danger` (blood-red) intents on the indigo base — atmospheric, high-contrast
- Tooltip, Menu — `elevation.high` magenta cast does the affordance work the engine's missing glow would otherwise do

## Where it degrades

- Small body text on the magenta primary fill — `#f4e7d6` on `#ff3993` is ~3.3:1, just below AA for body
- DataTable with alternating row fills — `surface.raised` and `surface.sunken` are both close-luminance indigos and need strong borders
- Spatial canvas, Bezier editor, fractional sliders — same engine-level off-grid degradation as the other pixel-art registers

## Recall aliases

`hyperlight`, `hyper light`, `hyper light drifter`, `hld`, `pixel art hyperlight`, `pixel-art-hyperlight`, `drifter`, `synth-noir pixel`

## Long-form notes

<details>
<summary>From <code>palettes/pixel-art-hyperlight.README.md</code></summary>

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

</details>

---

_Generated from `palettes/pixel-art-hyperlight.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
