# Pixel Art (Cottagecore)

> The warm-pastoral register on the pixel-art engine — parchment field, wood-frame shadows, harvest-gold focus, and earthy intents that read like a notice-board pinned in a kitchen rather than a console menu.

**Engine:** `pixel-art` · **A11y:** `experimental`

## Summary

Pixel Art (Cottagecore) is the warm-earth, art-direction register on the same `pixel-art` engine as NES, Game Boy, and SNES — square corners, bitmap glyphs, hard offsets, `steps(1, end)` everywhere. What sets it apart is colour temperature: `surface.base` is parchment `#fef0d4`, `content.primary` is warm dark brown `#3b2615` (never pure black), and intents fill from a pastoral set — forest green `#3d6b2c` for primary, harvest gold `#dca830` for warning, berry red `#c84830` for danger, water blue `#4878b8` for info. Hard offsets are warm wood-brown (`2px 2px 0 #7a4a1b` at `low`) so panels read as carved frames, not block sprites.

## Origin

Not a hardware-locked palette — an art-direction register. The cozy-indie pixel idiom that emerged across the late-2010s and 2020s (farm sims, life sims, illustrated storybooks, the broader "cottagecore" social media aesthetic) — sharing a single warm-earth palette without belonging to any one title. No console gates the colours; the aesthetic does.

## Signatures

- **Parchment `surface.base` (`#fef0d4`) with warm-brown ink (`#3b2615`)** — The host is a warm cream — `color.surface.base` is `#fef0d4` and `color.content.primary` is `#3b2615` (warm dark brown, deliberately not pure black). The pair measures ~11.4:1, the highest contrast in the non-hardware-locked pixel-art registers. The "cottagecore" temperature is set entirely by these two anchors.
- **Pastoral intent palette — forest, harvest gold, berry, water** — `intent.primary.bg` is forest `#3d6b2c`, `intent.warning.bg` is harvest gold `#dca830`, `intent.danger.bg` is berry red `#c84830`, `intent.info.bg` is water blue `#4878b8`. Earthy, not saturated. Compare NES (sky `#0000fc` / brick `#d82800`) — same intent slots, swapped for naturalistic hues.
- **Wood-brown hard offsets, not black** — `elevation.low.boxShadow` is `2px 2px 0 #7a4a1b` — the warm wood frame, not the NES `#000000` block. At `high`, the second offset steps to mid-brown `#a87838` (`4px 4px 0 #7a4a1b, 8px 8px 0 #a87838`). The brown-on-parchment cast reads as a carved sign, which is exactly how cottagecore pixel UIs paint their bevels.
- **Harvest-gold focus ring (`#dca830`) at 4px** — `effect.focusRing` is `{ width: "4px", color: "#dca830", style: "solid" }`. The lowest-contrast focus indicator in the pixel-art set (~4.2:1 against parchment) but legibly wide. Compare NES yellow `#fcfc00` — same role, warmer hue.
- **Press Start 2P routed through every typography role** — `typography.family.{ui,display,mono,pixel,hand}` all resolve to `"Press Start 2P", "VT323", ui-monospace`. The bitmap register is shared with the rest of the pixel-art family — the cottagecore differentiator is colour, not glyph.
- **`effect.pixelGrid` at `8px`, every `radius.*` is `0`** — The engine reads `pixelGrid` at the palette root and snaps rendering. Even `radius.pill` and `radius.full` collapse to `0`, so circular components render as squares. The warm temperature does not soften the geometry.

## Anti-signatures

- Pure black text or shadows — the register forbids `#000000`; everything dark is warm brown
- Saturated console primaries like sky-blue `#0000fc` or brick `#d82800` (that is the NES register)
- Rounded corners, soft shadows, or anti-aliased curves
- System UI / sans-serif body — every role is Press Start 2P bitmap
- Cool-temperature surfaces (mint, ice, slate) — the host is parchment-warm by definition

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.pixelGrid` | `8px` | `8px` — the engine snap step. The load-bearing slot the engine reads to disable smoothing and anchor `space.*`. |
| `color.surface.base` | `#fef0d4` | `#fef0d4` — parchment. The warmth bias starts here. |
| `color.content.primary` | `#3b2615` | `#3b2615` — warm dark brown, deliberately not pure black. The "no pure black anywhere" rule is the register. |
| `color.intent.primary.bg` | `#3d6b2c` | `#3d6b2c` — forest green, not a console primary. Pastoral intent palette in slot one. |
| `elevation.low.boxShadow` | `2px 2px 0 #7a4a1b` | `2px 2px 0 #7a4a1b` — wood-brown hard offset, not the NES black block. |
| `effect.focusRing.color` | `#dca830` | `#dca830` — harvest gold, 4px wide. Warmest focus colour in the pixel-art set. |
| `typography.family.pixel` | `"Press Start 2P", "VT323", ui-monospace, monospace` | Press Start 2P stack — routed through every `role.*`, same as the NES sister palette. |
| `radius.lg` | `0` | `0` — every radius collapses to zero, including `pill` and `full`. |

## Often confused with

### vs [Pixel Art (NES)](./pixel-art-nes.md)

NES is the hardware-locked NTSC 2C02 register — saturated console primaries (`#0000fc` / `#d82800` / `#fcfc00`), black hard offsets, yellow focus ring. Cottagecore (this palette) is an art-direction register, not hardware: warm parchment field, earthy pastoral intents, wood-brown offsets, gold focus. Same engine, opposite temperature.

### vs [Pixel Art (Game Boy)](./pixel-art-gameboy.md)

Game Boy is the 4-shade green-monochrome DMG register; intents collapse onto luminance steps. Cottagecore has the full earthy intent set with distinct hues per slot and a multi-tone shadow stack.

### vs [Hand-drawn (Marker)](./sketch-marker.md)

Sketch-marker is the warm-paper register on the *non*-pixel engine — `effect.pixelGrid` is `0`, glyphs are hand-drawn, edges have stroke variance. Cottagecore commits to the bitmap engine: `pixelGrid` at `8px`, every role on Press Start 2P, zero `strokeVariance`.

## Where it thrives

- Kanban / card grids — the wood-brown offset on parchment reads as cards pinned to a corkboard
- Toast, Modal, Drawer — the carved-frame elevation feels like a notice-board callout
- Stepper, Tabs, Pagination — the warm temperature softens the bitmap density

## Where it degrades

- Spatial canvas / Bezier editor — same engine-level off-grid jitter as the other pixel-art registers
- Long muted-text passages — `content.muted` `#7a5638` on parchment falls into the borderline-AA band
- Calendar grids that depend on subtle intent tint — the earthy intents are visually closer than NES primaries

## Recall aliases

`cottagecore`, `pixel art cottagecore`, `pixel-art-cottagecore`, `pastoral pixel`, `farm sim`, `cozy pixel`

## Long-form notes

<details>
<summary>From <code>palettes/pixel-art-cottagecore.README.md</code></summary>

# Pixel Art (Cottagecore)

The warm-pastoral register. Parchment fields, wood-frame borders,
harvest-gold accents, crop greens and berry reds. The broad cozy-indie
pixel idiom that emerged across the late-2010s and 2020s — farm sims,
life sims, illustrated storybooks, the "cottagecore" social media
aesthetic — sharing one warm-earth palette without belonging to any
single title. Bitmap glyphs throughout via **Press Start 2P** — same
engine as the NES / Game Boy / SNES registers.

Unlike NES and Game Boy this is **not a hardware-locked palette** —
it's an art-direction register. No console gates the colours; what
gates them is the aesthetic: warmth bias throughout, no pure black
anywhere, earthy intents in place of saturated console primaries.

| Role            | Hex        | Source                                      |
|-----------------|------------|---------------------------------------------|
| parchment field | `#fef0d4`  | menu background, paper journal              |
| warm wood       | `#7a4a1b`  | menu frame, sign borders, dialog boxes      |
| ink             | `#3b2615`  | body text — warm dark brown, never pure black |
| crop green      | `#7cb43c`  | mature crops, success                       |
| forest          | `#3d6b2c`  | primary intent — pine, deep grass           |
| harvest gold    | `#dca830`  | wheat, lanterns, warning                    |
| berry red       | `#c84830`  | salmonberries, health, danger               |
| water blue      | `#4878b8`  | rivers, fishing, info / link                |

## A11y

`experimental` — same engine caveats as the rest of the pixel-art
family. Contrast is the **best** of the non-hardware-locked registers:
`#3b2615` content on `#fef0d4` base measures ≈ 11.4:1, comfortably AA
at body size (12 CSS px) and AAA at the larger roles. The
`experimental` tag is held by the engine, not the colour pairs.

Two things to watch:

- The warm parchment base biases focus rings toward gold (`#dca830`,
  ~4.2:1 against `#fef0d4`). The ring clears AA for non-text UI
  outlines but is the lowest-contrast focus indicator in the
  pixel-art set; pair it with the 4px-wide ring the engine already
  forces and it stays scannable.
- Inverse text on the primary (`#fef0d4` on `#3d6b2c`) measures
  ≈ 7.8:1 — fine for buttons, fine for toasts.

## What thrives vs degrades

Identical to the NES variant in shape — kanban, buttons, modals,
toggles all thrive; SpatialCanvas, BezierEditor, fractional sliders
degrade. What changes with the cottagecore register is **temperature**:
the parchment base reads as cozy rather than retro, so the same
components feel journal-like instead of console-like. A Kanban board
styled with this palette reads as a notice-board pinned in a kitchen,
not a NES game menu.

See [`pixel-art-nes.README.md`](./pixel-art-nes.README.md) for the
engine-level details, pixel-font choice, and the broader thrives /
degrades list. Nothing in that document is NES-specific except the
colour references.

</details>

---

_Generated from `palettes/pixel-art-cottagecore.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
