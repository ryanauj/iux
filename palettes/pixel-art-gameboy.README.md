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
