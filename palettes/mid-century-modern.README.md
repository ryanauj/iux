# Mid-century modern

Flat engine tuned for the warm-restrained Eames-era register. Cream
paper, walnut ink, mustard and teal as the dominant accents, persimmon
and avocado in the data-semantic slots. Quiet, not loud — the aesthetic
restraint that period catalogues (Herman Miller 1956, Knoll, the early
Eames Lounge ads) made into a virtue.

`surface.base` is a warm cream (`#f0e6d2`); `raised` lifts to a paler
eggshell, `sunken` drops to a slightly darker cream so input wells read
recessed without a shadow. There is no stark white anywhere in the
palette. `content.primary` is walnut ink (`#2a1d12`) — a warm dark brown
rather than pure black, so the page reads as "printed on cream", not
"printed on a screen". The intent set is the period's exact swatch
language: mustard (`#c98a16`, the Herman Miller catalogue accent) as
`intent.primary` *and* `intent.warning`; teal (`#2d6f7c`, the Eames
Lounge upholstery teal) as `intent.info` and `content.link`; avocado
(`#5a7a3b`) as `intent.success`; persimmon (`#b14a1d`, the warm orange
Saarinen used on the Tulip chair seat pad) as `intent.danger`. None of
these are full-saturation — every one is one or two steps off vivid so
panels never shout.

`radius.*` is moderate-but-warm — `sm: '3px'`, `md: '6px'`,
`lg: '14px'`: no hard corners, no inflated gumdrop curves, the bend a
plywood lounge chair has. `typography.family.ui` and `family.display`
share one humanist sans (`Karla` / `Avenir Next` / `Futura`) — mid-
century print rarely mixed faces; it mixed weights and sizes within one
family. Motion is gentle ease-out with `base = '220ms'`, the way a heavy
plywood drawer settles rather than snaps.

The atomic-age accent the brief asks for lives in `effect.overlay.*`,
the decoration token the engine paints once at the palette root. The
overlay is a sparse three-point dot field — mustard, teal, persimmon at
4–6 % alpha — tiled at 480 × 480 so the period decoration reads as
quiet wallpaper rhythm under the content rather than as foreground
pattern. The brief asked for "sparingly"; the engine paints the pattern
once at the shell and never re-applies it per component, so it stays
spatially light.

**A11y:** `pass`. `content.primary` (`#2a1d12`) on `surface.base`
(`#f0e6d2`) ≈ 13.6:1 — AAA at every size. `intent.success` avocado
+ cream inverse ≈ 5.6:1 (AA body, AAA large), `intent.info` teal +
cream inverse ≈ 6.0:1 (AAA large), `intent.danger` persimmon + cream
inverse ≈ 5.5:1 (AA body). The intent.primary / warning mustard fill
uses the dark walnut ink as content rather than cream — mustard + cream
would be ≈ 2.8:1 and fail; mustard + walnut sits at ≈ 8.6:1 and passes
AAA. The same pattern applies to focus indication: focus is mustard on
cream surfaces (≈ 3.2:1) with a 2 px solid ring — AA focus contrast,
just.

**Most likely to fail: `Toast` (variant 3 — severity-driven info /
success / warning / danger variants).** The four intent fills are all
deliberately desaturated for the Eames-feel restraint — avocado and
teal sit close in luminance on the cream field, and `intent.primary` and
`intent.warning` resolve to the same mustard. A row of four toasts
stacked in the bottom-right corner reads as four bands of warm earth-
tone rather than as four severities; the user can't tell at a glance
whether the toast is success or info, primary or warning. The fix is
not at the palette level — the desaturation is the aesthetic. The fix
is at the **component** level: encode severity in the leading icon and
label, not in fill saturation. Components that need to communicate
urgency through color alone in this palette will under-communicate, and
the mid-century register is exactly the wrong moment to re-saturate the
swatches to compensate.
