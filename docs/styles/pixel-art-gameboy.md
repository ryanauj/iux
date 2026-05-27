# Pixel Art (Game Boy)

> The 4-shade green-LCD register of the 1989 DMG-01 — every surface, intent, and shadow quantises to one of four greens, and intents collapse onto luminance steps because the original hardware had no colour at all.

**Engine:** `pixel-art` · **A11y:** `experimental`

## Summary

Pixel Art (Game Boy) is the canonical Nintendo DMG-01 register on the same `pixel-art` engine as NES. Every colour in the palette quantises to one of four greens: shade 0 `#9bbc0f` (LCD-on field), shade 1 `#8bac0f` (mid-light), shade 2 `#306230` (mid-dark), shade 3 `#0f380f` (outlines / text / shadows). Intents collapse onto those four shades — `success`, `warning`, `danger`, `info` differ only in luminance step, which is the "fails by design" demo the README flags. `surface.base` is shade 0, hard offsets are shade 3, and the focus ring is also shade 3 — the screen never lit more than four levels.

## Origin

The Nintendo Game Boy (DMG-01) shipped in 1989. Its reflective dot-matrix LCD displayed four shades on a yellow-green field — there was no colour channel. This palette is the period-correct revival on the `pixel-art` engine, paired with NES to prove the engine generalises across hardware registers.

## Signatures

- **Four-shade green quantisation — `#9bbc0f / #8bac0f / #306230 / #0f380f`** — Every colour in the palette is one of these four shades. `surface.base` is shade 0, `surface.sunken` is shade 1, `content.secondary` is shade 2, `content.primary` is shade 3. Compare NES (54 NTSC colours, six distinct intent hues) — Game Boy commits to four greens and nothing else.
- **Intents are non-distinguishable by colour** — `intent.success.bg` is `#306230`, `intent.warning.bg` is `#8bac0f`, `intent.danger.bg` is `#0f380f`, `intent.info.bg` is `#8bac0f` — different luminance steps but the same green family. A success Toast and a danger Toast on this palette differ only in border weight, which is the DMG idiom (the hardware had no colour intents) and a deliberate teaching case.
- **Hard offsets in shade 3 (`2px 2px 0 #0f380f`), single-tier cast** — `elevation.low` is `2px 2px 0 #0f380f`. Unlike NES (which stacks multi-coloured offsets at `high`), Game Boy honours the DMG's single off-pixel cast — no second-tier shadow until `high`, where it adds `8px 8px 0 #306230` (shade 2).
- **Compressed inline `space.*` for the 160×144 DMG screen** — `space.2` and `space.5` are compressed: `4px` and `16px` rather than NES's `8px` and `32px`. The tighter ladder lets dense components (Kanban tickets, Stepper rails) still fit a phone viewport with the bitmap font.
- **Press Start 2P at compressed sizes — body at `0.5rem`** — `typography.role.body.size` is `0.5rem` (8 CSS px), where NES uses `0.75rem`. Same Press Start 2P stack through every role, but sized for the smaller DMG real estate.
- **`effect.pixelGrid` at `8px`, every `radius.*` is `0`** — Engine grid step at `8px`, every radius slot collapses to `0`. Circular components render as squares. The DMG itself had a 1:1 dot grid; this is the closest contract approximation.

## Anti-signatures

- Any colour outside the four-green ROM (no red, no blue, no warm tones — the DMG screen literally could not display them)
- Distinct intent hues — `danger` cannot be red, only a darker green
- Rounded corners, soft shadows, or anti-aliased curves
- System UI / sans-serif body — every role is Press Start 2P bitmap
- Multi-coloured shadow stacks below `high` (the DMG cast one shadow, not three)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.pixelGrid` | `8px` | `8px` — the engine snap step. Shared with the rest of the pixel-art family. |
| `color.surface.base` | `#9bbc0f` | `#9bbc0f` — shade 0 of the DMG LCD, the off-pixel field colour. |
| `color.content.primary` | `#0f380f` | `#0f380f` — shade 3, the darkest DMG green. Used for outlines and text everywhere. |
| `color.intent.danger.bg` | `#0f380f` | `#0f380f` — shade 3 again. Danger is not red here; it is the darkest green. The "no colour intents" constraint surfaces in this slot. |
| `elevation.low.boxShadow` | `2px 2px 0 #0f380f` | `2px 2px 0 #0f380f` — single off-pixel cast in shade 3. The DMG's one-shadow recipe. |
| `effect.focusRing.color` | `#0f380f` | `#0f380f` — focus is also shade 3, because there is no fifth colour. Width `4px` for legibility. |
| `typography.family.pixel` | `"Press Start 2P", "VT323", ui-monospace, monospace` | Press Start 2P stack — routed through every `role.*`, same as NES. |
| `radius.full` | `0` | `0` — including `pill` and `full`. Toggles, Avatars, and Loading spinners render as squares. |

## Often confused with

### vs [Pixel Art (NES)](./pixel-art-nes.md)

NES commits to the full NTSC 2C02 master palette — six distinct intent hues (sky `#0000fc`, brick `#d82800`, coin `#fcfc00`, leaf `#00a800`). Game Boy (this palette) collapses every intent onto four greens; `danger` and `success` differ in luminance, not hue. The contrast is exactly the brief's Group-B "same engine, different hardware" pair.

### vs [Pixel Art (SNES)](./pixel-art-snes.md)

SNES is the 16-bit dialog register — deep blue base, white inner bevel, bright HP/MP/EXP intents with full colour. Game Boy collapses to four greens because the DMG had no colour channel; SNES uses the 15-bit BGR space.

### vs [CRT / Phosphor (Green)](./crt-phosphor-green.md)

CRT/Phosphor renders a single green-on-black terminal with scanlines (`effect.overlay.image` is non-`none`) and phosphor decay on motion. Game Boy has four discrete green shades, no scanlines, no decay — sprites snap and the screen is a flat reflective LCD, not a CRT face.

### vs [Terminal / TUI](./terminal-tui.md)

Terminal-TUI is a monospace text-mode register on a different engine — `effect.pixelGrid` is `0`, glyphs are monospace not bitmap, surfaces are character cells. Game Boy commits to the bitmap pixel-art engine: `pixelGrid` at `8px`, Press Start 2P, hard offset blocks.

## Where it thrives

- Kanban / card grids — the square shade-3 outline on a shade-0 field is the canonical DMG sprite frame
- Buttons, Toggles, Stepper — text-only controls with block fills and luminance-step hover states
- Modal, Drawer — the single hard offset reads as a DMG pop-up window

## Where it degrades

- Toast / Alert variants that depend on intent colour to communicate state — success vs danger are indistinguishable without iconography
- DataTable with intent-colored rows — same legibility collapse
- Spatial canvas, Bezier editor, fractional sliders — engine-level off-grid degradation, same as the other pixel-art registers
- Small-text reading passages at `caption`/`label` (8 CSS px) — bitmap glyph stems get cramped

## Recall aliases

`gameboy`, `game boy`, `dmg`, `pixel art gameboy`, `pixel-art-gameboy`, `nintendo gameboy`

## Long-form notes

<details>
<summary>From <code>palettes/pixel-art-gameboy.README.md</code></summary>

# Pixel Art (Game Boy)

The 4-tone green-LCD register shipped with the original Nintendo Game
Boy (DMG-01, 1989). Same `pixel-art` engine as the NES variant — only
`color.*` differs. That same-engine / different-token relationship is
what `FINALIZED-PALETTES.md` calls a Group B pair: proving the engine
generalises by shipping the next plausible config alongside the
canonical one.

DMG shades:

| Shade  | Hex        | Use                                  |
|--------|------------|--------------------------------------|
| 0      | `#9bbc0f`  | Field — LCD-on, off-pixel            |
| 1      | `#8bac0f`  | Mid-light — sunken / hover           |
| 2      | `#306230`  | Mid-dark — secondary text, hover bg  |
| 3      | `#0f380f`  | Outlines, primary text, shadows      |

The intents collapse onto those four shades — `success`,
`warning`, `danger`, `info` differ only in luminance step. The DMG had
no colour intents; relying on intent colour alone for affordance fails
this palette by design, the same way it fails the CRT pair.

## A11y

`experimental`. Same caveats as the NES variant, plus:

- **Intents are non-distinguishable.** A success Toast and a danger
  Toast on this palette differ only in border weight. Forms that depend
  on colour-coded state for affordance need supplementary iconography
  here. (This is exactly the "no monochrome mode" gap the CRT engine
  surfaced — see project README "Contract gaps revealed by CRT".)
- **Contrast.** `#0f380f` text on `#9bbc0f` field measures ≈ 11.5:1 and
  clears AA comfortably for the larger text roles. At `caption`/`label`
  size (8 CSS px), the bitmap glyph edges produce visibly fewer pixels
  per stem than reading-grade text needs; users with low vision should
  prefer the NES register (higher contrast).

## What thrives vs degrades

Identical to the NES variant in shape — kanban, buttons, toggles, modal
overlays all thrive; SpatialCanvas, BezierEditor, fractional sliders
degrade. The narrower colour space makes the degradation more obvious
on intent-colored components (Toast variants are nearly identical) and
less obvious on geometric ones (a square card with a hard offset on a
green field is the canonical DMG sprite frame).

See [`pixel-art-nes.README.md`](./pixel-art-nes.README.md) for the
engine-level details, pixel-font choice, and "thrives vs degrades"
list. Nothing in that document is NES-specific except the colour
references.

</details>

---

_Generated from `palettes/pixel-art-gameboy.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
