# Layout

Grid, spacing, density, and the rules that decide which one carries an app.

## Hard rules

1. **Spacing comes from the scale, not from inspection.** Every gap, padding, and margin reads from a `space.*` slot. Eyeballed pixel values defeat the palette contract — a value that "looks right" under Flat lands wrong under Editorial. See [`tokens/00-token-contract.md`](../tokens/00-token-contract.md) `space.*`.
2. **One axis owns the layout.** Stack OR grid OR bento. Nesting a bento inside a stack inside a grid is the failure mode; the eye reads two levels of rhythm, not three.
3. **Density is an engine concern, not a component override.** A component does not opt into "compact mode." The palette decides density by remapping `space.*`; the component renders whatever the palette resolves.
4. **Names beat pixels.** `space.3` survives a palette swap from AAA to Editorial. `12px` does not.
5. **Alignment runs one rule per axis.** Optical along the read direction, metric across it. Mixing them is the cause of "almost-aligned" UIs that never feel right.

## The space scale

`space.0` through `space.8`. A roughly 4px base step under Flat, widened by Editorial, tightened by AAA. The contract is the *name*; pixels are the palette's business.

Components consume `space.*` for every gap. The scale is linear on purpose — no `space.2.5`. Palettes that want a half-step rescale the whole ramp.

## Stack vs Grid vs Bento

| Layout | Use when | Fails when |
| --- | --- | --- |
| Stack | One read direction; items share a metric (a list, a form, a thread). | Items have wildly different sizes; the stack becomes a column of orphans. |
| Grid | Items share a unit and the count exceeds about six; the eye should scan rows AND columns. | Items don't share a unit — a Bento is more honest. |
| Bento | Items have *intentionally* different sizes and the layout teaches the importance hierarchy (`Bento grid cell` Tier 2 — see [`FINALIZED-COMPONENTS.md`](../FINALIZED-COMPONENTS.md)). | Items all share a unit (a Grid is more honest); item count is small (a Stack is more honest). |

Drag-and-drop apps (kanban — see [`FINALIZED-APPS.md`](../FINALIZED-APPS.md)) prefer Stack-of-Stacks over Grid because the *column* is the unit of meaning, not the cell.

## Alignment

Optical along the read direction: glyph x-heights, icon optical centers, button label baselines. Metric across it: gutter widths, column edges, padding.

The mistake: aligning a column of mixed-size icons to the *box*, which makes 16px icons look indented next to 24px icons. Align to the optical center; let the box float.

## Density per engine

- **Flat / Classic.** Baseline. `space.*` resolves to the 4px ramp.
- **Editorial.** Widens `space.4` and up; gutters lean into the read-the-page metaphor.
- **AAA.** Tightens the whole ramp for keyboard-density. Forms read as cockpit, not magazine.
- **CRT / Phosphor.** Loose vertically (scanlines need breathing room), tight horizontally.
- **Pixel-art.** Every `space.*` is an integer multiple of the pixel grid step (`effect.pixelGrid` — see [`tokens/00-token-contract.md`](../tokens/00-token-contract.md)). Fractional gaps land off-grid and ruin the snap.
- **Cardstock.** Margined; raised surfaces want generous gutters so the layered-paper metaphor reads.

Engine essays for each of these live in [`README.md`](../README.md).

## Container queries over breakpoints

Components query their container, not the viewport. A `Card` doesn't know if it's in a sidebar or a hero slot — it knows it has `width: 320px` of room. Breakpoints encode a viewport guess that fails the moment the component lives anywhere else in the layout.

## Counterexamples

- **Neumorphism + tight grid.** The palette's whole affordance is paired inset/outset shadows, which need air to read. Drop it into a `space.2`-gap grid and the shadows merge — every cell becomes one undifferentiated lump.
- **Sketch + dense Bento.** The wobble filter adds about a pixel of jitter to every edge. At a dense bento packing, adjacent cell borders enter each other's jitter range and read as merged. The metaphor wants air.
- **Pixel-art + fractional spacing.** A `space.3` that resolves to `12px` lands clean on an 8px grid step. A `space.3` rescaled to `10px` by a future palette breaks every sprite alignment. Pixel palettes must rescale the *whole* ramp, not piecewise.
- **Bento as a fallback for "I have weird-sized items."** If the items don't teach a hierarchy, the layout teaches confusion. A Grid with one larger cell is more honest than a Bento that exists because the designer ran out of ideas.

## What this doc is not

- Not a CSS Grid tutorial.
- Not a responsive-design guide — engine + density already encode that.
- Not a primer on `space.*` itself; that lives in [`tokens/00-token-contract.md`](../tokens/00-token-contract.md).
- Not a list of every layout component; component selection lives in [`01-component-selection.md`](./01-component-selection.md).
