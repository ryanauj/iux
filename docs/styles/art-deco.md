# Art Deco / Gatsby

> 1920s poster register — deep teal-black field, champagne-gold accent, Poiret One / Limelight display serif at uppercase tracking.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Art Deco / Gatsby is the 1920s ornament-and-symmetry register on the Flat engine. Deep teal-black (`#0e2027`) fills `surface.base`; champagne gold (`#c8a96a`) carries `intent.primary` and `border.focus`; cream (`#e8dcc0`) carries content. Poiret One / Limelight at `uppercase` with `0.04em` tracking does the display work — Deco type ran widely-spaced caps almost exclusively. A three-family typography rule (serif display + serif body + sans UI) is the load-bearing move.

## Origin

The 1925 Exposition Internationale des Arts Décoratifs in Paris (which gave the movement its name), through the 1930s — A.M. Cassandre travel posters, Erté fashion plates, Chrysler Building lobby murals. The display typeface vocabulary (Poiret One, Limelight, geometric Deco serifs) is post-war revivalist but matches the period's actual show-card lettering. Champagne + teal-black is the period's most-replicated colour pairing on theatre lobbies, jazz-club posters, and 1925 Vogue covers.

## Signatures

- **Deep teal-black field with champagne-gold accent** — `surface.base` `#0e2027` (deep teal-black, not pure black — the colour of a lacquered 1920s theatre lobby); `intent.primary.bg` `#c8a96a` (champagne, not antique gold). The pairing is unmistakably Deco — neither Mall-goth's near-black + blood-red nor Modern Royal's aubergine + warm-gold lands in the same register.
- **Geometric Deco serif on `display` at uppercase tracking** — `typography.family.display` is Poiret One / Limelight (or Bodoni 72 fallback). The display, title, and heading roles all run `uppercase` with `0.04em` tracking — Deco type ran widely-spaced caps as a near-universal rule.
- **Three-family typography (serif display + serif body + sans UI)** — `family.display` is Poiret One; `family.body` is Cormorant; `family.ui` is Inter. The split routes display through the Deco serif (period costume), body through Cormorant (long-form reading), and UI controls through Inter (small-size legibility). Three families is rare on the Flat engine — most palettes pick two.
- **3 px champagne focus ring** — `effect.focusRing` is `{ width: 3px, offset: 2px, color: #c8a96a, style: solid }`. The extra pixel of width compensates for reduced contrast on the dark teal-black field — same compensation Modern Royal makes against aubergine.

## Anti-signatures

- Pure-black `surface.base` (teal-black is the period-specific field colour)
- A sans-serif `display` family — that breaks the Deco poster vocabulary
- Sentence-case headings — Deco type ran caps almost exclusively
- A second saturated chromatic intent competing with the champagne (burgundy `danger` is restrained, not competing)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#0e2027` | Deep teal-black `#0e2027` — period-specific lacquered-theatre field colour. |
| `color.intent.primary.bg` | `#c8a96a` | Champagne gold `#c8a96a` — the Deco accent (not antique gold, which is Modern Royal's register). |
| `typography.family.display` | `"Poiret One", "Limelight", "Bodoni 72", "Didot", "Georgia", serif` | Poiret One — the geometric Deco serif. |
| `typography.role.display.textTransform` | `uppercase` | `'uppercase'` — Deco display was caps-only by convention. |
| `effect.focusRing.width` | `3px` | `'3px'` — heavier ring to compensate for the dark field, same as Modern Royal. |

## Often confused with

### vs [Modern Royal](./modern-royal.md)

Both palettes are dark-field Flat configurations with a single warm-metallic accent. Modern Royal: aubergine field, antique-gold accent, Cormorant Garamond display (regalia register). Art Deco: teal-black field, champagne-gold accent, Poiret One / Limelight display at uppercase tracking (1920s poster register). The accent saturation is similar; the display vocabulary is what differentiates the periods.

### vs [Mall-goth](./mall-goth.md)

Both are dark-field Flat palettes. Mall-goth: near-black field, blood-red accent, condensed serif display (crepuscular register). Art Deco: teal-black field, champagne-gold accent, geometric Deco display serif (1920s poster). Different field colour, different accent hue family, different period — opposite tonal warmth.

### vs [Cathedral / Stained Glass](./stained-glass.md)

Both use dark fields with luxe accents, but Cathedral / Stained Glass spreads five jewel-tone intents across the palette and uses heavy lead `border.*` as load-bearing geometry. Art Deco picks one warm-metallic accent (champagne) and uses serif display tracking as the load-bearing move. Stained Glass is medieval; Art Deco is jazz-age.

## Where it thrives

- Hero panels, marketing headers, theatre / hospitality landing pages
- Long-form Cormorant body paired with caps-tracked Poiret display
- Buttons and tag badges in the champagne intent fill

## Where it degrades

- Dense data tables (caps-tracked display + dark field both reduce density legibility)
- Photographic content (the teal-black field clashes with most colour photography)

## Recall aliases

`art deco`, `deco`, `gatsby`, `1920s`, `jazz age`

## Long-form notes

<details>
<summary>From <code>palettes/art-deco.README.md</code></summary>

# Art Deco / Gatsby

1920s ornament-and-symmetry register on the Flat engine. Deep teal-black
field, champagne-gold accent, cream content, a geometric Deco serif
(Poiret One / Limelight) for headings. Closer to Modern Royal than to
Cathedral / Stained Glass, but with teal-black standing in for
aubergine and champagne in place of antique gold — and a different
display serif that argues for the era explicitly.

`surface.base` is deep teal-black (`#0e2027`) — the colour of a 1920s
lacquered theatre lobby. `surface.raised` lifts one notch to `#163039`
(a card-stock cream-foil weight against the teal); `surface.sunken`
darkens to `#0a181d` for input wells. The two-tone teal/black field
is the period's signature backdrop colour.

`intent.primary.bg` is champagne gold (`#c8a96a`) with deep-teal inverse
content (`#0e2027`) — the gold ≈ 10:1 against the teal, AAA at every
size. `border.focus` reuses the same gold at 3 px to compensate for the
dark field, the same heavier-ring move Modern Royal makes against
aubergine and Mall-goth makes against near-black.

`intent.warning` reuses the champagne gold — Deco's two-colour
hierarchy doesn't introduce a third saturated accent for warnings.
`intent.danger` is burgundy (`#8a2233`) — the era's "alert" colour on
poster art. `intent.success` is bottle green (`#3a7a4a`); `intent.info`
is a desaturated teal (`#2e5a72`) so it doesn't compete with the field.

`typography.family.display` is Poiret One (or Limelight / Bodoni 72
fallback) — the geometric Deco serif tied to 1920s poster art. The
display sets at `uppercase` with `0.04em` tracking — Deco type ran
widely-spaced caps almost exclusively. `family.body` is Cormorant for
long-form serif body; `family.ui` is Inter for controls that need to
read at form sizes. The three-family typography rule is the load-bearing
move: serif display + serif body + sans UI, with the display carrying
the period costume.

`radius.*` collapses to `'0' / '0' / '4px'` for `sm` / `md` / `lg` —
Deco geometry argues against rounded corners on cards. `pill` stays
for tag affordances that need it.

`elevation.*` keeps the soft-gaussian recipe but tints toward teal-black
(`rgba(8, 16, 22, 0.45)`) so cards still lift visibly against the dark
field. The shadow shape matches Flat / Classic verbatim; only the alpha
and tint shift.

**A11y:** `pass`. `content.primary` (`#e8dcc0`) on `surface.base`
(`#0e2027`) ≈ 12.5:1 (AAA). `intent.primary` champagne on deep-teal
inverse ≈ 10:1 (AAA). `intent.danger` (`#8a2233`) with cream inverse
≈ 7.5:1 (AAA). `border.focus` champagne on `surface.base` ≈ 7.4:1 with
the 3 px ring carrying clear perceptual weight.

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
elevation alpha, and a Deco-poster typography stack.

</details>

---

_Generated from `palettes/art-deco.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
