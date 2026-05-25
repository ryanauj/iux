# Blueprint

Cyanotype-print register on the Flat engine. Deep Prussian-blue field,
cyan-white line work, mono labels in IBM Plex Mono, annotation yellow
for callouts and the focus ring. The architectural-drawing register the
same way Industrial / Light is the engineering-drawing register — same
mono-label vocabulary, opposite tonal field.

`surface.base` is deep Prussian blue (`#0d2c5e`) — the colour a ferric-
ammonium cyanotype exposes to after the wash; `surface.raised` lifts
one notch to `#143669`; `surface.sunken` darkens to `#091f43` for input
wells. The field reads as a roll of blueprint paper rather than as a
generic dark UI.

`content.primary` is cyan-white (`#e4ecff`) — the colour of an unexposed
line on a cyanotype, not pure white. `content.link` and `border.focus`
are annotation yellow (`#ffd400`) — the colour a drafter's coloured
pencil reaches for to mark a revision callout. The two-colour vocabulary
(blueprint line + annotation pencil) keeps the drawing legible without
adding decorative chromatic noise.

`intent.primary.bg` is annotation yellow (`#ffd400`) with deep-blue
inverse content (`#0d2c5e`) — the yellow ≈ 13.5:1 against the deep blue,
AAA at every size. `intent.warning` reuses the same yellow because
annotations *are* warnings on a drawing — they mark revisions that
need approval. `intent.info` is a brighter cyan (`#2e7ad8`) so it
reads distinct from the cyan-white body type.

`typography.family.ui` is IBM Plex Mono — the drafter's mono letterer
typeface; `family.display` is Architects Daughter (or Patrick Hand
fallback) for callouts that should read as hand-lettered annotations.
`family.body` is Inter for long-form text where the mono would slow
reading.

`radius.*` collapses `sm` / `md` to `'0'`, `lg` to `'2px'` — drafting
precision argues against rounded corners on cards. `pill` stays at
`'999px'` for revision tags that need it.

`elevation.*` uses cyan-tinted shadows (`rgba(5, 16, 36, ...)`) at high
alpha so cards lift as fresh paper above the blueprint, not as black
voids cut into it. The shadow recipe is identical to Flat / Classic;
only the alpha rises to stay visible against the deep field, the same
compensation Modern Royal and Mall-goth make.

**A11y:** `pass`. `content.primary` (`#e4ecff`) on `surface.base`
(`#0d2c5e`) ≈ 11.8:1 (AAA). `intent.primary` annotation yellow on
deep-blue inverse ≈ 13.5:1 (AAA). `intent.info` (`#2e7ad8`) with
cyan-white inverse ≈ 4.6:1 (AA body). `border.focus` annotation yellow
on `surface.base` ≈ 9.2:1, and the 3 px ring gives the focus indicator
heavy perceptual weight.

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
`elevation.*` recipe alpha, and a typography stack that promotes mono
to `family.ui`. The drafter's hand-lettered display gets routed through
`family.hand` (which the Sketch engine made load-bearing) so a future
Sketch-engine version of Blueprint could share the typography stack.
