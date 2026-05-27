# Pixel Art (SNES)

> The 16-bit JRPG dialog-box register — deep-blue window field, a load-bearing white inner-bevel outline on every intent, bright HP/MP/EXP intent palette, and a gold cursor focus that reads as Chrono Trigger or FFVI at a glance.

**Engine:** `pixel-art` · **A11y:** `experimental`

## Summary

Pixel Art (SNES) is the canonical Super Nintendo dialog-box register on the same `pixel-art` engine as NES. `surface.base` is dialog-blue `#1c3878`, `surface.raised` is the brighter blue `#2848a0`, `content.primary` is `#f8f8f8` (the SNES white-bevel idiom), and every `intent.*.border` is `#f8f8f8` so every button and toast wears the white inner outline that every JRPG menu of the era painted. The intent palette is wider than NES — gold `#f8c040` warning, HP green `#28a838`, damage red `#d83040`, MP cyan `#3898d8` — sized for the 15-bit BGR colour space, not the NES 54-colour master.

## Origin

The Super Nintendo Entertainment System (SNES) shipped in 1990. Its PPU could mix from a 15-bit BGR palette (32,768 colours) with mode-7 layering, enabling richer game UIs than the NES could afford. Anchored on the UI vocabulary of *Chrono Trigger* (1995), *Final Fantasy VI* (1994), and *Secret of Mana* (1993) — the JRPG menu-frame era.

## Signatures

- **Deep dialog-blue `surface.base` (`#1c3878`) with white content (`#f8f8f8`)** — `color.surface.base` is `#1c3878` (the JRPG dialog blue), `color.content.primary` is `#f8f8f8`. The pair measures ~13.4:1 — AAA at body size. Reads as a recessed dialog window cut into the screen, not a NES sprite field.
- **White inner-bevel outline on every intent — `border: #f8f8f8`** — Every `intent.*.border` is `#f8f8f8` — primary, neutral, success, warning, danger, info. The white inner outline on every button and toast is the SNES dialog-frame signature; it is what makes the register identifiable across all components, not just modals.
- **Gold accent `#f8c040` — focus ring, EXP, menu cursor** — `effect.focusRing.color` is gold `#f8c040` at `4px` (~9.5:1 against `#1c3878`, the most visible focus indicator of the new pixel-art set). `border.focus` is the same gold, and `content.link` is the closely-related `#f8d040`. The SNES menu cursor and HP/MP bars used this exact warm gold.
- **Bright HP/MP/EXP intent palette — green `#28a838`, red `#d83040`, cyan `#3898d8`, gold `#f8c040`** — `intent.success.bg` is HP green `#28a838`, `intent.danger.bg` is damage red `#d83040`, `intent.info.bg` is MP cyan `#3898d8`, `intent.warning.bg` is gold `#f8c040`. Every intent clears 4.5:1 against `#f8f8f8` content. Wider gamut than NES — the SNES PPU could mix what the NES could not.
- **`elevation.overlay` paints a white outer ring before the drop — the SNES dialog frame** — `elevation.overlay.boxShadow` is `0 0 0 2px #f8f8f8, 4px 4px 0 #0c1c48` — a white outer ring on top of a deep-blue drop. Modal and Drawer get the most SNES-specific look; the white outline reads as a JRPG dialog cut into the screen. Hyperlight uses the same slot for a magenta ring; NES does not paint a ring at all.
- **Press Start 2P everywhere, `radius.*` is `0`, `effect.pixelGrid` at `8px`** — Same engine wiring as NES — bitmap font through every role, every radius collapses to zero, engine grid step at `8px`. The visual difference is entirely in `color.*` and `elevation.*`; the geometry is identical to its sister registers.

## Anti-signatures

- No white inner-bevel outline on intents (that is the load-bearing SNES cue — without it the register collapses to a generic blue pixel theme)
- Saturated NES NTSC primaries like sky-blue `#0000fc` or brick `#d82800` (SNES uses the 15-bit BGR space, the colours are more pastel)
- Rounded corners, soft shadows, or anti-aliased curves
- System UI / sans-serif body — every role is Press Start 2P bitmap
- Cool monochrome palettes (Game Boy's four greens) — SNES has the full intent set with distinct hues

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.pixelGrid` | `8px` | `8px` — the engine snap step. Shared with the rest of the pixel-art family. |
| `color.surface.base` | `#1c3878` | `#1c3878` — the JRPG dialog blue. Sets the recessed-window temperature. |
| `color.content.primary` | `#f8f8f8` | `#f8f8f8` — the SNES white, used for body text and (separately) for every intent border. |
| `color.intent.primary.border` | `#f8f8f8` | `#f8f8f8` — the white inner-bevel outline that every intent wears. Load-bearing for the register. |
| `color.intent.success.bg` | `#28a838` | `#28a838` — HP green. Wider-gamut intent palette than NES. |
| `effect.focusRing.color` | `#f8c040` | `#f8c040` — gold menu-cursor accent at `4px`. The most visible focus indicator in the new pixel-art set. |
| `elevation.overlay.boxShadow` | `0 0 0 2px #f8f8f8, 4px 4px 0 #0c1c48` | `0 0 0 2px #f8f8f8, 4px 4px 0 #0c1c48` — white outer ring + deep-blue drop. The SNES dialog-frame recipe. |
| `typography.family.pixel` | `"Press Start 2P", "VT323", ui-monospace, monospace` | Press Start 2P stack — same bitmap register as the rest of the pixel-art family. |
| `radius.lg` | `0` | `0` — every radius slot is zero, including `pill` and `full`. |

## Often confused with

### vs [Pixel Art (NES)](./pixel-art-nes.md)

NES is the 8-bit hardware register — saturated NTSC 2C02 primaries (sky `#0000fc`, brick `#d82800`, coin `#fcfc00`), black hard offsets, no white inner bevel. SNES (this palette) is the 16-bit successor — deeper dialog-blue host, every intent wears a `#f8f8f8` inner-bevel border, gold cursor focus, and `overlay` stacks a white outline before the drop. The white bevel and dialog-blue base are the cleanest tells.

### vs [Pixel Art (Game Boy)](./pixel-art-gameboy.md)

Game Boy is the 4-shade green-monochrome DMG register; intents collapse onto luminance steps because the hardware had no colour channel. SNES has the full distinct-hue intent palette and a deeper blue host.

### vs [Pixel Art (Hyper Light)](./pixel-art-hyperlight.md)

Hyperlight uses the `overlay` slot for a magenta inner ring (`0 0 0 2px #ff3993`) on indigo dusk. SNES uses the same slot for a white inner ring (`0 0 0 2px #f8f8f8`) on dialog blue. Same recipe shape, different accent — and SNES paints the white bevel on every intent, not only `overlay`.

### vs [Pixel Art (PICO-8)](./pixel-art-pico8.md)

PICO-8 is the fixed 16-colour ROM register; hover/active states hue-jump to a neighbouring slot. SNES uses the 15-bit BGR space with free tinting and the white inner-bevel idiom. PICO-8's dark-blue slot 1 (`#1D2B53`) is closely related to SNES `surface.base` (`#1c3878`) — the dialog-blue host is the common cue, but only SNES paints the white inner outline.

## Where it thrives

- Modal, Drawer — `elevation.overlay` paints the SNES dialog frame; the most register-specific look in the palette
- Buttons, Tabs, Segmented controls — the white inner-bevel border on every intent reads as JRPG menu rows
- Toast with HP green / damage red / EXP gold — atmospheric, high-contrast against the dialog-blue field

## Where it degrades

- Long body paragraphs in `content.muted` (`#7878a0` on `#1c3878` ≈ 3.1:1) — fine for metadata, below AA for body copy
- Spatial canvas, Bezier editor, fractional sliders — engine-level off-grid jitter is more visible here because the white outlines sharpen contrast
- Components that lean on `surface.raised` / `surface.sunken` alone to show depth — the blue family is close-luminance, the white border does the work

## Recall aliases

`snes`, `pixel art snes`, `pixel-art-snes`, `super nintendo`, `16-bit`, `16 bit`, `jrpg`, `chrono trigger`, `final fantasy`

## Long-form notes

<details>
<summary>From <code>palettes/pixel-art-snes.README.md</code></summary>

# Pixel Art (SNES)

The canonical Super Nintendo dialog-box register. Deep-blue window
gradient, white inner-bevel outline, gold accent, bright HP / MP /
EXP intents. Anchored on the UI vocabulary of Chrono Trigger (1995),
Final Fantasy VI (1994), and Secret of Mana (1993) — the era when
15-bit BGR colour and mode-7 layering let game UIs paint richer
palettes than the NES could afford.

Same `pixel-art` engine as the NES / Game Boy registers — square
corners, bitmap font (Press Start 2P), hard offsets, `steps(1, end)`
easings. What changes is entirely in `color.*` and `elevation.*`:
the deeper, more-saturated blue field reads as a recessed dialog
window, and the `overlay` elevation stacks a white outline on top of
the drop shadow, which is the SNES dialog-frame signature.

Palette anchors:

| Hex       | Role                                           |
|-----------|------------------------------------------------|
| `#1c3878` | Dialog blue — every JRPG menu of the era      |
| `#0c1c48` | Deepest blue, inset / drop shadow              |
| `#f8f8f8` | White inner border — the SNES bevel idiom      |
| `#f8c040` | Gold accent — menu cursor, focus ring, EXP    |
| `#28a838` | HP green                                       |
| `#d83040` | Damage red                                     |
| `#3898d8` | MP / magic cyan-blue                           |

## A11y

`experimental` — same engine caveats. White content on `#1c3878`
measures ≈ 13.4:1 (AAA at body size). The bright-intent palette is
the highest-contrast of the four new registers: every intent bg
clears 4.5:1 against `#f8f8f8` content, and the gold focus ring
(`#f8c040`, ≈ 9.5:1 against `#1c3878`) is the most visible focus
indicator in the set.

The risk surface is **muted secondary text** (`#7878a0` on `#1c3878`
≈ 3.1:1) — fine for non-text UI but below AA for body copy. The
contract reserves `content.muted` for de-emphasised metadata, not
body text, so this is acceptable; just don't put paragraphs in muted.

## What thrives vs degrades

Identical to the NES variant in shape, with one engine-aligned twist:
the `overlay` elevation recipe paints a white outer ring (`0 0 0 2px
#f8f8f8`) before the drop shadow, which makes Modal and Drawer read
exactly like a SNES dialog frame. Components that lean on the
`overlay` elevation get the most SNES-specific look. Everything else
(Buttons, Toggle, Stepper, Kanban) reads as a generic 16-bit menu.

Degrades:
- Same as NES/Game Boy — SpatialCanvas, BezierEditor, fractional
  sliders. The deeper blue base makes off-grid jitter more visible,
  not less, because the contrast with the white outlines is sharper.

See [`pixel-art-nes.README.md`](./pixel-art-nes.README.md) for the
engine-level details, pixel-font choice, and the broader thrives /
degrades list.

</details>

---

_Generated from `palettes/pixel-art-snes.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
