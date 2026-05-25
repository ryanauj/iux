# Blueprint

> Cyanotype-print register — deep Prussian-blue field, cyan-white line work, IBM Plex Mono on `family.ui`, annotation yellow as `intent.primary`.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Blueprint is the "architectural cyanotype" register on the Flat engine. Deep Prussian blue (`#0d2c5e`) fills `surface.base`; cyan-white (`#e4ecff`) carries `content.primary` — the colour of an unexposed line on a cyanotype. `intent.primary.bg` is annotation yellow (`#ffd400`) with deep-blue inverse content; `family.ui` is IBM Plex Mono so labels and forms carry the drafter's mono-letterer register. The two-colour vocabulary (blueprint line + annotation pencil) keeps the drawing legible without adding decorative chromatic noise.

## Origin

The architectural / engineering blueprint, c.1842 (John Herschel's cyanotype process) through the mid-20th century, when ammonia-print machines and digital plotters replaced the wet-process print. The colour vocabulary is exactly what a ferric-ammonium cyanotype exposes to: deep Prussian blue field with white lines where the ammonia masked the paper. Annotation yellow is the drafter's coloured pencil for revision callouts.

## Signatures

- **Deep Prussian-blue field with cyan-white line work** — `surface.base` is `#0d2c5e`; `content.primary` is `#e4ecff` (cyan-white, not pure white — matches the actual unexposed-line colour on a cyanotype). The contrast lands at ≈ 11.8:1 (AAA).
- **Annotation yellow as `intent.primary` + focus ring** — `intent.primary.bg` is `#ffd400` with deep-blue inverse content (≈ 13.5:1, AAA). `border.focus` reuses the same yellow at 3 px. The two-colour rule keeps every UI affordance reading as either "blueprint line" or "annotation callout."
- **IBM Plex Mono on `family.ui`** — The drafter's mono-letterer register — every form label, table cell, and small caption renders in mono. `family.body` stays Inter for long-form text where the mono would slow reading. `family.hand` is Architects Daughter for hand-lettered annotations.
- **Zero-radius cards with cyan-tinted high-alpha shadows** — `radius.sm` and `radius.md` are `'0'`; `lg` is `'2px'`. Drafting precision argues against rounded corners. `elevation.*` uses cyan-tinted shadows (`rgba(5, 16, 36, ...)`) at high alpha so cards lift as fresh paper above the blueprint, not as black voids cut into it.

## Anti-signatures

- Pure-white body text (cyan-white is the load-bearing line colour)
- A second saturated chromatic intent competing with the annotation yellow
- Rounded card corners (drafting precision argues against them)
- Sans-serif on `family.ui` (mono is the drafter's letterer register)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#0d2c5e` | Deep Prussian blue `#0d2c5e` — the field colour a ferric-ammonium cyanotype exposes to. |
| `color.content.primary` | `#e4ecff` | Cyan-white `#e4ecff` — the unexposed-line colour, not pure white. |
| `color.intent.primary.bg` | `#ffd400` | Annotation yellow `#ffd400` — the drafter's revision-callout colour. |
| `typography.family.ui` | `"IBM Plex Mono", "JetBrains Mono", "Berkeley Mono", ui-monospace, monospace` | IBM Plex Mono — the drafter's mono-letterer face. |
| `typography.family.hand` | `"Architects Daughter", "Patrick Hand", cursive` | Architects Daughter — the hand-lettered annotation face. |

## Often confused with

### vs [Industrial / Light](./industrial-light.md)

Both palettes promote IBM Plex Mono to `family.ui` (the drafter / engineer's mono-letterer register). Industrial / Light inverts the workshop aesthetic to a warm-paper light field with safety-orange `intent.primary`; Blueprint stays on the dark Prussian-blue field with annotation yellow `intent.primary`. Same typography move, opposite tonal register — the pair proves the mono-on-` ui` register carries both ways.

### vs [Aero Glass](./aero-glass.md)

Aero Glass also uses a saturated-blue base, but it's the Glassmorphism engine: translucent surfaces, paired top/bottom-rim insets for wet gloss, Segoe UI. Blueprint is the Flat engine: opaque deep-blue surfaces, hairline rules, IBM Plex Mono. No glass, no gloss — drafting paper, not wet UI.

### vs [Modern Royal](./modern-royal.md)

Modern Royal is also a dark-field Flat palette but the field is aubergine `#1f0d2a` and the accent is antique gold `#b8893a` (regalia register). Blueprint's field is Prussian blue `#0d2c5e` and the accent is annotation yellow `#ffd400` (technical-drawing register). Both keep `family.body` Inter for legibility; Blueprint promotes mono to `family.ui` where Modern Royal keeps sans.

## Where it thrives

- Engineering / architectural dashboards, CAD viewers, BOM tables
- Code editors and documentation surfaces (mono on `family.ui` aligns)
- Form-heavy interfaces where annotation yellow reads as "needs revision"

## Where it degrades

- Long-form prose (the mono `family.ui` and the deep-blue field slow reading vs editorial paper)
- Photographic content (the saturated blue clashes with most colour photography)

## Recall aliases

`blueprint`, `cyanotype`, `drafting`, `architectural drawing`, `technical drawing`

## Long-form notes

<details>
<summary>From <code>palettes/blueprint.README.md</code></summary>

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

</details>

---

_Generated from `palettes/blueprint.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
