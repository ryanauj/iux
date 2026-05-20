# Vaporwave

Flat engine, magenta/cyan dusk register. Deep night-purple `surface.base`
(`#1a0b2e`) with magenta-pink raised panels (`#2a1452`) and cyan
(`#22d3ee`) as the second accent on `border.strong` and `content.link`.
The "grid-horizon" cue that the aesthetic relies on isn't a token —
it's the way `elevation.*` stacks paired magenta + cyan halos so panel
edges read as the horizon glow rather than a drop shadow. Typography
mixes a large display serif (Playfair) with an uppercase mono for
labels and captions — the magazine-cover + VHS-credits pairing the
look lives on. Motion is dialed slow (`fast 180ms / base 320ms / slow
480ms`) for the dream-pop tempo.

**A11y:** `experimental`. Body `content.primary` `#ffd6f5` on
`surface.base` `#1a0b2e` sits at ≈ 14:1 — clears AA easily.
`content.muted` at 48% alpha drops to ≈ 4.0:1 on `surface.base` and
worse on `surface.raised` `#2a1452`; below AA at body size. The
saturated `intent.primary` pink `#ec4899` paired with dark inverse
content reaches ≈ 5.1:1 — AA at body but only AAA at large. `link`
cyan `#22d3ee` on `surface.base` is ≈ 11:1, fine; on `surface.raised`
it drops to ≈ 8:1, still fine.

**Most likely to fail: `Table`.** Tables put `caption`-sized
`content.muted` against `surface.sunken` `#0d0719` for inset row stripes
— and the muted-on-sunken pair is the one combination that doesn't
benefit from the extra magenta cast that lifts the rest of the palette.
The 48%-alpha muted body washes into the near-black sunken below the
WCAG threshold, and the magenta glow on the surrounding `elevation`
slots draws the eye away from the row content rather than toward it.
Components doing dense tabular labels in this palette should promote
labels from `muted` to `secondary`, or render row labels on
`surface.raised` rather than `sunken`.
