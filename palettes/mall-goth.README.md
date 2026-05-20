# Mall-goth

Flat engine on a near-black field tuned for deep purple and blood
red. `surface.base` (`#0a0608`) is one shade off pure black; `raised`
(`#13090f`) lifts with a slight magenta-purple cast so panels read as
"crushed velvet over black" rather than grey. The accent is blood red
(`#a01f2c` / `#c41e2f`) used for `link`, `border.strong`,
`border.focus`, and the `primary` intent. `info` collapses to a deep
violet (`#3a1c4a`) rather than the usual cyan-blue because the
aesthetic doesn't admit a bright accent — every intent stays
crepuscular, including `warning` (oxblood-brown amber) and `success`
(forest green, not lime).

Display family is a condensed serif (Cinzel with UnifrakturCook /
Bodoni Moda fallbacks) and tracking on labels/captions is pushed wide
(`0.10–0.14em`) to mimic gig-poster credits. `space.*` is one notch
tighter than Flat / Classic (`1 → 2px`, `4 → 14px`, `8 → 56px`) to
crowd panels the way the aesthetic crowds the page. `elevation.*`
stays subtle (dark drop shadows that sink into the background rather
than lift off it) — the visual depth is in the saturation difference
between `base` and `raised`, not in light simulation.

**A11y:** `experimental`. `content.primary` `#e8d4dc` on `base` ≈ 14:1
— clears AAA. `content.muted` at 44% alpha lands ≈ 5.2:1 on `base` but
drops to ≈ 4.0:1 on `surface.raised` and ≈ 3.6:1 on `intent.neutral.bg`
— below AA on the raised panel. `intent.primary` blood red `#a01f2c`
with content `#f5e3e8` ≈ 6.0:1 — AA. `intent.danger` deep oxblood
`#5a0510` with the same content ≈ 11:1 — AAA, but the difference
between `primary` and `danger` is just luminance, no hue shift, so the
two intents are hard to tell apart even though both individually pass
contrast.

**Most likely to fail: `PropertyInspector`.** The inspector renders
dense rows of `caption`-sized `content.muted` labels against
`surface.sunken`. With the palette's tightened `space.*` scale, row
padding drops to `space.2` (`6px`) — small text + crowded row + 44%-
alpha muted on near-black sunken puts the labels below AA *and*
defeats the eye-tracking pattern that lets a user scan a property
table. The condensed display serif also doesn't read well at
`caption` size when small-caps would help. Components doing dense
property lists in this palette should promote labels from `caption`
to `label` (smaller weight bump, wider tracking already in the
palette) and from `muted` to `secondary`, and prefer `surface.raised`
over `sunken` for the row background.
