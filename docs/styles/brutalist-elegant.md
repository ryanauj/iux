# Brutalist-elegant

> Neubrutalism engine in an ivory/ink/oxblood register — Bodoni serif display at 4rem on warm ivory, hard-offset block shadows from 4px to 10px, every radius `0`, a single oxblood accent.

**Engine:** `neubrutalism` · **A11y:** `pass`

## Summary

Brutalist-elegant is the Neubrutalism engine with its structural vocabulary held exactly as hard as the base palette: `radius.*` is `0` on every slot, `borderWidth.heavy` is `4px`, motion is linear and snappy at 40/60/90ms, and `elevation.low` through `overlay` carry the hard-offset `Npx Npx 0 #0a0a0a` block (4px → 10px). Only the chromatic temperature and the display face change. `surface.base` is warm ivory `#f3eee2`, `content.primary` is ink-black `#0a0a0a`, every clashing vibrant intent collapses to one of four muted tones (oxblood, forest, ochre, navy) with ivory `inverse` content, and `typography.family.display` swaps Archivo Black for Bodoni Moda / Didot at weight 700 — a high-contrast modern-era serif that runs at 4rem with 1.0 line-height for the fashion-masthead feel.

## Origin

Neubrutalism is the post-2020 web revival of architectural brutalism — flat fills, hard offset block shadows, heavy black borders, zero radius. This palette takes that engine and applies a high-end editorial chromatic and typographic dressing: warm ivory paper, a single oxblood accent, Bodoni/Didot serif display. The result is the Vetements/Acne/Apartamento editorial register on the brutalism engine.

## Signatures

- **Hard-offset block `elevation.*` (4px → 10px) on heavy black borders** — `elevation.low` is `4px 4px 0 #0a0a0a`, scaling to `10px 10px 0 #0a0a0a` at `overlay`. The offset is hard, the colour is solid ink-black, the shadow has zero blur and zero spread. Paired with `borderWidth.heavy: 4px`, depth comes from offset block + heavy stroke, not from blurred penumbra.
- **Bodoni/Didot serif display at 4rem / weight 700 / `-0.02em` tracking** — `typography.family.display` is `"Bodoni Moda", "Didot", "Bodoni 72", "Playfair Display", Georgia, "Times New Roman", serif`. `role.display` runs at 4rem / lineHeight 1.0 / tracking -0.02em / weight 700 — the fashion-masthead feel. Sentence-case on the long headings, not uppercase.
- **Warm ivory `surface.base` (`#f3eee2`) with ink-black `content.primary`** — `surface.base` is `#f3eee2`, `raised` brightens to `#fbf7ec`. Body text is `#0a0a0a` — pure ink-black — sitting at ≈ 18:1. The base palette's sun-yellow gives way to ivory; the type stays as hard as the engine.
- **Single oxblood accent (`#7a1014`) doing four jobs** — `content.link`, `intent.primary.bg`, `intent.danger` family, `border.focus`, and `effect.focusRing.color` all share oxblood/wine `#7a1014`. No second accent exists in the palette — the elegance comes from restraint to one warm hue against ink/ivory.
- **Every `radius.*` slot is `0` — including `pill` and `full`** — `radius.none`/`sm`/`md`/`lg`/`pill`/`full` are all `0`. The structural honesty of the Neubrutalism engine is preserved verbatim — softening the radius would drift the palette into "tasteful sans on cream" flat-engine territory.
- **Wide-tracked uppercase `subheading`/`label` on Inter** — `role.subheading` runs at 0.18em tracking and `role.label` at 0.16em — both `textTransform: uppercase` on `family.ui` (Inter / Neue Haas Grotesk). The restrained typographic device a fashion editorial uses to mark section breaks without resorting to display weight.

## Anti-signatures

- Any non-zero radius — softening to even a 4px `sm` would drift into flat-engine territory
- Soft gaussian drop shadows or blurred elevation — this palette commits to hard-offset block shadows
- A clashing vibrant intent palette (sun-yellow / pink / cyan) — the elegance is the muted collapse to four tones
- A second accent competing with oxblood — the contract is one warm accent only
- Sans-serif `display` family or a hairline `borderWidth.heavy` — both would defeat the engine

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f3eee2` | Warm ivory `#f3eee2` — replaces the base Neubrutalism sun-yellow with editorial paper. |
| `color.intent.primary.bg` | `#7a1014` | Oxblood `#7a1014` — the single accent. Also `content.link`, `border.focus`, `effect.focusRing.color`. |
| `elevation.low.boxShadow` | `4px 4px 0 #0a0a0a` | `4px 4px 0 #0a0a0a` — hard-offset block, zero blur, zero spread. Scales to `10px 10px 0 #0a0a0a` at `overlay`. |
| `borderWidth.heavy` | `4px` | `4px` — the heavy black border paired with the offset block. Softening this to 1px collapses the palette. |
| `radius.pill` | `0` | `0` — every radius slot stays at zero; even pills are squared. |
| `typography.family.display` | `"Bodoni Moda", "Didot", "Bodoni 72", "Playfair Display", Georgia, "Times New Roman", serif` | "Bodoni Moda", "Didot", "Bodoni 72", "Playfair Display", Georgia, serif — the high-contrast modern-era serif at weight 700. |
| `typography.role.display.size` | `4rem` | 4rem at lineHeight 1.0 and -0.02em tracking — the fashion-masthead feel. |
| `motion.duration.base` | `60ms` | 60ms linear — snap-to-grid; structural honesty extends to motion. |

## Often confused with

### vs [Neubrutalism](./neubrutalism.md)

Base Neubrutalism ships clashing vibrant fills on sun-yellow paper with Archivo Black display and `elevation = none` (offset-block is opt-in). Brutalist-elegant keeps the engine's structural vocabulary verbatim (radius 0, 4px heavy border, hard offset block at 4–10px) but swaps the chromatic temperature to ivory/ink/oxblood and the display face to Bodoni/Didot serif.

### vs [Editorial](./editorial.md)

Editorial is a flat-engine typographic register — serif body, gentle elevation, conventional radius. Brutalist-elegant uses a serif display only and keeps the Neubrutalism block-shadow + heavy-border structure underneath: editorial dressing on a brutalist skeleton.

### vs [Letterpress](./letterpress.md)

Letterpress is the inked-impression register — paper texture, deboss effect, serif throughout. Brutalist-elegant has no paper texture and no impression effect; its "weight" comes from the hard offset block and the heavy 4px border, not from simulated impression.

## Where it thrives

- Editorial article headers — Bodoni at 4rem with the heavy border + offset block reads as a fashion masthead
- Marketing hero compositions — the single oxblood accent on ivory carries decisive brand presence
- Cards, Modals, Drawers — the offset-block elevation scales cleanly across the stack

## Where it degrades

- Dense data tables — every row inheriting the offset block creates visual noise; the engine wants low-density panels
- Components depending on tonal hover lifts or soft shadows — this engine has neither

## Recall aliases

`brutalist-elegant`, `brutalist elegant`, `elegant brutalism`, `editorial brutalism`, `bodoni brutalism`

## Long-form notes

<details>
<summary>From <code>palettes/brutalist-elegant.README.md</code></summary>

# Brutalist-elegant

Configuration of the Neubrutalism engine in an ivory / black / oxblood
register, with high-end editorial type on `display`. The structural
vocabulary does not soften: `radius.*` is `'0'` on every slot,
`borderWidth.heavy` is `4px`, motion stays linear and snappy
(`fast 40ms`, `base 60ms`, `slow 90ms`), and `elevation.*` carries the
hard-offset `Npx Npx 0 #0a0a0a` block from `low` (4px) up through
`overlay` (10px). The base Neubrutalism palette ships with
`elevation = none` and notes the offset variant as opt-in; this palette
is exactly that opt-in — depth comes from the offset block *and* the
heavy black border, paired.

Only the chromatic temperature changes. `surface.base` swaps the base
palette's sun-yellow (`#fef9e7`) for warm ivory (`#f3eee2`); `raised`
brightens to `#fbf7ec`; `content.primary` stays ink-black `#0a0a0a`; and
every intent's clashing vibrant background collapses to one of four
muted tones (oxblood, forest, ochre, navy) carrying ivory `inverse`
content. The single accent is `#7a1014` — oxblood / wine — used for
`content.link`, `intent.primary`, `intent.danger`, and the focus ring.
No second accent exists in the palette.

`typography.family.display` swaps Archivo Black for Bodoni Moda / Didot
— a high-contrast modern-era serif — and `role.display` runs at `700`
weight at `4rem / lineHeight 1.0 / tracking -0.02em` for the fashion-
masthead feel. Sentence-case, not uppercase, on the long headings.
`role.subheading` and `role.label` carry wide-tracked uppercase
(`0.18em` / `0.16em`) on `family.ui` (Inter / Neue Haas Grotesk) — the
restrained typographic device a fashion editorial uses to mark section
breaks without resorting to display weight. `body` stays sans at `1rem
/ 1.6` for readable column copy.

A deliberate non-move: `borderWidth.heavy` is not dropped to a hairline.
If we softened it to `1px` and removed the offset block, this would
become a generic "tasteful sans on cream" flat-engine palette — i.e.
we'd have drifted out of Neubrutalism. The whole point of this
configuration is that the engine doesn't bend: structure stays as hard
as the base palette and the **palette** does all the elegance work,
through color and type only.

**A11y:** `pass`. Body text `#0a0a0a` on `surface.base` `#f3eee2` ≈
18:1 — AAA. All six intent backgrounds pair an ivory `#f3eee2`
`content` color with a dark `bg`: `intent.primary` `#7a1014` + ivory
≈ 10.4:1; `intent.success` `#22432a` + ivory ≈ 10.7:1; `intent.warning`
`#7a5a14` + ivory ≈ 6.1:1 (AA body, AAA large); `intent.danger`
`#5a0a0e` + ivory ≈ 13.2:1; `intent.info` `#1c2a4b` + ivory ≈ 12.4:1.
`content.muted` `#5a554b` on base ≈ 7.0:1, AAA at decorative meta.

</details>

---

_Generated from `palettes/brutalist-elegant.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
