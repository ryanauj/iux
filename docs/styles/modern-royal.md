# Modern Royal

> Regalia colour stripped of ornament — deep aubergine field, antique-gold accent, Cormorant display serif over a geometric sans body.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Modern Royal is the "regal colour without filigree" register on the Flat engine. Deep aubergine fills `surface.base`; antique gold (`#b8893a`) carries `intent.primary` and the focus ring; a Cormorant Garamond display sits above an Inter body so the serif-vs-sans contrast does the regal work without committing the body copy to a slower-to-read serif. No gradients, no two-tone fills — opaque surfaces, soft drop shadows scaled up in alpha so cards still lift against the dark field.

## Origin

A modernist take on regal colour vocabularies — deep purples (Tyrian / aubergine) and antique gold appear in heraldic and ecclesiastical design back to antiquity, but the register here is post-Flat-design (2013+): the colour vocabulary kept, the period ornament dropped. Closest reference is the way contemporary luxury digital products (jewellery houses, opera streaming services) carry regal colour without engraved borders.

## Signatures

- **Deep aubergine `surface.base` (`#1f0d2a`) with antique-gold accent** — `surface.base` is the regal field; `surface.raised` lifts one notch to `#2a1538`; `overlay` reuses `raised`. `intent.primary.bg` is antique gold `#b8893a` — the single saturated chromatic accent. No second-saturated competitor.
- **Cormorant display serif over an Inter body sans** — `typography.family.display` is Cormorant Garamond at weight 500; `family.ui` and `family.body` are Inter. The two-family split (serif display + sans body) is the load-bearing typography move — committing the body to a serif would push the palette into Editorial / Wikipedia territory.
- **3 px solid gold focus ring (heavier than Flat / Classic's 2 px)** — `effect.focusRing` is `{ width: 3px, offset: 2px, color: #b8893a, style: solid }`. The extra pixel of width compensates for reduced contrast on the dark field — the same compensation Mall-goth makes against its near-black base.
- **Soft drop shadows at raised alpha (`rgba(0,0,0,0.40)`)** — `elevation.low` is `0 1px 2px rgba(0,0,0,0.40)`. Same Flat / Classic recipe, alpha raised ~7× to stay visible on the dark aubergine field. No inset highlight, no two-tone, no hard offset.
- **Opaque surfaces, no engine overlay** — `effect.overlay.image` is `none`; `effect.glow.radius` is `0`. The regal feel is delivered entirely by colour + type — no engine flourish, no atmosphere, no grain.

## Anti-signatures

- Engraved borders, filigree, or gilded frames anywhere
- Body copy in a serif — that's Editorial / Wikipedia territory
- A second saturated chromatic accent competing with the gold
- Translucent / glass surfaces (no `backdrop-blur` here)
- Hard-offset block shadows (that's Neubrutalism / Memphis-80s)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#1f0d2a` | Deep aubergine `#1f0d2a` — the regal field. Compare to Mall-goth's near-black `#0d0c10` field. |
| `color.intent.primary.bg` | `#b8893a` | Antique gold `#b8893a` — the single saturated accent. Doubles as `border.focus`. |
| `effect.focusRing.width` | `3px` | `3px` — heavier than Flat / Classic's `2px` to compensate for the dark field's reduced contrast. |
| `typography.family.display` | `"Cormorant Garamond", "Cormorant", "Sorts Mill Goudy", "Garamond", "Georgia", serif` | Cormorant Garamond — the serif that does the regal work without committing the body to a serif. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(0, 0, 0, 0.40)` | `0 1px 2px rgba(0,0,0,0.40)` — Flat / Classic's recipe with alpha raised so cards lift on the dark field. |

## Often confused with

### vs [Mall-goth](./mall-goth.md)

Mall-goth is also a dark-field Flat palette but the accent is blood-red `#8a1014` and the display is a condensed serif (Cinzel-feel). Modern Royal's accent is warm-gold `#b8893a` and the display is generous-counter Cormorant — the difference between "crepuscular goth" and "modernist regal".

### vs [Editorial](./editorial.md)

Editorial is a warm-paper-and-ink magazine register: pale background, serif throughout, restrained terracotta accent. Modern Royal is a dark-field register with serif-display-only and gold accent — same Flat engine, opposite tonal range.

### vs [Scandinavian Royal Modern](./scandinavian-royal-modern.md)

Scandinavian Royal Modern is the same register set's pale-field sibling: chalk-white field, regal navy as the only chromatic intent, gold demoted to a hairline rule. Modern Royal is the dark-field sibling that promotes gold to the primary accent.

## Where it thrives

- Hero panels and marketing headers — the dark field + gold accent reads premium without ornament
- Long-form Cormorant titles paired with Inter body — the typographic contrast is what carries the register
- Buttons and badges — the saturated gold + dark inverse content stays legible at small sizes

## Where it degrades

- Dense data tables — the dark field reduces legibility of secondary / muted text against the same colour family
- Photographic content — the aubergine field clashes with most colour photography; works only with desaturated or duotone images

## Recall aliases

`modern royal`, `royal`, `aubergine royal`, `gold royal`, `regal modern`

## Long-form notes

<details>
<summary>From <code>palettes/modern-royal.README.md</code></summary>

# Modern Royal

Regal colour stripped of ornament. Deep aubergine field, antique-gold
accent, a Cormorant Garamond display serif over an Inter body sans. The
"regal palette applied without filigree" register the same way Mall-goth
is the "crepuscular palette applied without ornament" — two dark-field
Flat configurations that prove the engine carries period colour without
period decoration.

`surface.base` is deep aubergine (`#1f0d2a`); `surface.raised` lifts one
notch to `#2a1538`; `surface.overlay` matches `raised` so modals layer
as the same material. No gradients, no two-tone fills, no inset
highlights — opaque purple surfaces against a darker purple base, the
Flat engine's recipe applied to a non-grey colour family. `surface.scrim`
is `rgba(8, 4, 12, 0.62)` — a near-black ink at high alpha that veils
the saturated field cleanly when a modal opens.

`intent.primary.bg` is antique gold (`#b8893a`) with deep-aubergine
`content` (`#1f0d2a`) sitting on it — gold + dark-purple sits at ≈ 9:1,
AAA at every size. `border.focus` and the focus ring reuse the same
gold at a heavier 3 px width (vs Flat / Classic's 2 px) — the heavier
ring compensates for reduced contrast on the dark field, the same
compensation Mall-goth makes against its near-black base. `content.link`
is a warmer gold (`#d6a85a`) so links read distinct from the primary
button fill.

`typography.family.display` is Cormorant Garamond at weight `500`;
`family.ui` and `family.body` are Inter / Söhne. The two-family split is
the load-bearing typography move — committing the body to the serif
would push the palette into Editorial / Wikipedia territory. Display
size is `3rem` at weight 500 with `tracking: -0.01em`, so headlines
carry the regal Cormorant counters without lapsing into typographic
costume.

`elevation.*` keeps the Flat / Classic gaussian recipe but raises shadow
alpha to `rgba(0, 0, 0, 0.40)` at `low` (vs `0.06` on Flat / Classic) so
cards still lift visibly against the deep aubergine field. The shape of
the shadow is identical to Flat / Classic — only the alpha changes — so
the elevation system remains conservative.

`motion.*` matches Flat / Classic verbatim. The register is delivered
by colour and type, not by motion signature; Modern Royal earns its
elegance through restraint rather than easing.

**A11y:** `pass`. `content.primary` (`#f5ecda`, a warm-cream) on
`surface.base` (`#1f0d2a`) ≈ 13.5:1 — AAA at every size.
`content.secondary` `#cdb78a` on base ≈ 8.5:1 (AAA).
`intent.primary.bg` `#b8893a` with deep-aubergine content `#1f0d2a` ≈
9:1 (AAA). `intent.success` `#3f6b4a` + cream inverse ≈ 5.5:1 (AA
body). `intent.danger` `#8a2233` + cream inverse ≈ 7.2:1 (AAA).
`border.focus` gold on aubergine `surface.base` ≈ 5.2:1 (AA focus
contrast — and the 3 px stroke gives the ring perceptual weight even
where the contrast is at the threshold). The dark field has the
expected drawback for `content.muted` (`#8c7556`) on `surface.base` —
≈ 3.2:1 — which is OK as decorative meta text but should not carry
load-bearing meaning.

</details>

---

_Generated from `palettes/modern-royal.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
