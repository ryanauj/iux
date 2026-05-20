# Swiss / International Style

Flat engine collapsed to a three-color field: pure white `surface.*`,
pure black borders and body, signal red (`#e30613`) as the only accent
and the only attention color. Every intent that isn't `primary`/
`danger`/`warning` resolves to black; the palette deliberately
surrenders semantic-color distinction in service of typographic
hierarchy.

`radius.*` is `0` for everything but `full` (which only circles use) —
the modular grid does the visual organizing, not curves. `elevation.*`
is `none` at every slot except `overlay`, which carries a 1px black
hairline rather than a shadow; depth comes from layout position and
whitespace, never from a fake light source. Motion easings are all
`linear` and durations short — the style is anti-rhetorical, so
animations don't over-express. Display family is Helvetica Neue /
Helvetica / Arial — the period-correct grotesque the style is named
for.

**A11y:** `pass`. Body text (`#000000` on `#ffffff`) is the
contrast-ratio ceiling at 21:1 — AAA at any size. `link` red
(`#e30613`) on white sits at ≈ 5.7:1 — AA at body, AAA at large.
`content.muted` `#737373` on white is ≈ 4.6:1, just over the AA
threshold. Red on white reverses (`#e30613` `content.inverse` `#ffffff`)
clear AA cleanly. Focus ring is signal red, 2px solid — meets AA focus
contrast against every surface.

**Most likely to fail: `Toast`.** A toast is exactly the surface where
intent-color distinction *must* read at a glance — success / warning /
danger / info are the contract — and in this palette they collapse to
two states: red (`primary` / `warning` / `danger`) or black (`success`
/ `info` / `neutral`). A "success" toast is visually identical to an
"info" toast; a "warning" is visually identical to a "danger". The
fix is not at the palette level — it's at the component level, by
distinguishing the four collapsed intents through icon + label, not
fill. Components that need to express more than two intents in this
palette must encode it in the typography or the icon, not in the
intent color.
