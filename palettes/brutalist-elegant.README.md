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
