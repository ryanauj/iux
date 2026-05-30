# Stone Modern

> Warm-minimalist modern-retail register on the Flat engine — warm-stone field, charcoal-brown primary, single rust accent, single-family Söhne grotesque with uppercase-tracked labels.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Stone Modern is the Aesop / Muji / "premium minimalist brand site" register on the modern-light Flat-engine grid. `surface.base` is warm stone (`#f0ece6`); `surface.raised` is bone (`#faf8f3`). `intent.primary.bg` is charcoal-brown (`#2c2620`) — the same near-black used for body text, promoted to the button slab. The palette has only one chromatic accent: rust (`#c2541f`) on `warning`, which also carries `border.focus` and `content.link`. `family.ui` and `family.display` both route to Söhne; labels use `0.08em` uppercase tracking for the small-caps "section" feel modern retail uses on category headers.

## Origin

The 2010s–2020s modern-retail minimalist lane — Aesop, Muji, COS, Everlane, Acne Studios. The aesthetic distils Dieter Rams's "less but better" through a 21st-century retail filter: replace Braun orange with rust, replace Helvetica with Söhne, replace product-photography with editorial type, keep the single-saturated-accent and generous-whitespace rules intact.

## Signatures

- **Warm-stone field + bone raised (`#f0ece6` / `#faf8f3`)** — `surface.base` is slightly cooler at the high end than Heritage Maritime's bone (`#f4ecd9`), slightly warmer than Dieter Rams's warm-grey (`#e9e8e5`). The warm-stone register is what grounds the rust accent as "premium minimalist" rather than as "industrial-safety."
- **Charcoal-brown `intent.primary` (`#2c2620`) — text colour promoted to button** — `intent.primary.bg` is `#2c2620` — the same near-black used for body text, promoted to the button slab. The palette has only one chromatic accent: rust on `warning`. The single-saturated-note discipline in a sea of neutrals is the load-bearing colour move.
- **Single rust accent (`#c2541f`) on warning, focus, and link** — `intent.warning.bg`, `border.focus`, and `content.link` all share `#c2541f` — kiln-fired clay, the one saturated colour the palette permits. `intent.danger` (`#a8261e`) sits in the same warm hue family so the two warm intents read as intentional.
- **Single-family Söhne grotesque on every typography slot** — `typography.family.ui` and `family.display` both resolve to `"Söhne", "Inter", "Helvetica Neue", system-ui, sans-serif`. Söhne (or Inter as fallback) carries display, body, and labels — there is no display↔body family contrast, only weight, size, and tracking.
- **Uppercase-tracked labels (`0.08em` + uppercase)** — `typography.role.label` sets `tracking: '0.08em'` and `textTransform: 'uppercase'` — the small-caps "section" feel modern retail uses on category headers. The tracked-uppercase label is the typography signature.
- **Hairline-ring `elevation.low` (`0 0 0 1px #c5bdaf`)** — Cards barely lift — `elevation.low` is a 1 px outline; `medium` adds a low-alpha drop tinted toward charcoal-brown. The hairline-ring rule is shared with Dieter Rams and Vercel Geist — flat-on-flat surfaces, bounded by stroke.
- **Near-square `radius.*` (`sm = 2px / md = 4px / lg = 8px`)** — Modern retail favours near-square corners. The contrast with Sage Studio's `sm = 4px / md = 10px / lg = 16px` is one of the load-bearing distinctions inside the modern-light register set.

## Anti-signatures

- A second saturated chromatic intent competing with the rust accent
- Serif `display` family — the single-Söhne rule is structural
- Soft drop-shadow `elevation.low` — the hairline ring is the lift signal
- Tight `space.*` scale — the modern-retail register depends on the widened `6: 36px / 7: 52px / 8: 72px`
- Widened `radius.*` (`sm = 6-8px`) — Stone Modern commits to near-square corners

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f0ece6` | Warm stone `#f0ece6` — between Dieter Rams's warm-grey and Heritage Maritime's bone. |
| `color.intent.primary.bg` | `#2c2620` | Charcoal-brown `#2c2620` — body-text near-black promoted to the button slab. |
| `color.intent.warning.bg` | `#c2541f` | Rust `#c2541f` — the single saturated accent the palette permits. |
| `color.border.focus` | `#c2541f` | Rust `#c2541f` — focus ring reuses the single accent. |
| `typography.family.ui` | `"Söhne", "Inter", "Helvetica Neue", system-ui, sans-serif` | Söhne-first stack — single-family grotesque throughout. |
| `typography.family.display` | `"Söhne", "Inter", "Helvetica Neue", system-ui, sans-serif` | Identical Söhne stack — no display↔body family contrast. |
| `elevation.low.boxShadow` | `0 0 0 1px #c5bdaf` | `0 0 0 1px #c5bdaf` — hairline-ring instead of drop shadow. |
| `space.7` | `52px` | `'52px'` — generous whitespace at the high end, shared with Dieter Rams. |

## Often confused with

### vs [Dieter Rams / Braun](./dieter-rams.md)

Stone Modern is the modern-retail sibling of Dieter Rams on the same minimalist register: identical single-family typography commitment, hairline-ring elevation, generous whitespace, single saturated accent. Dieter Rams uses cool warm-grey + Braun orange + Helvetica; Stone Modern uses warm stone + rust + Söhne and routes `intent.primary` to the charcoal-brown text colour itself rather than to the saturated accent. The two palettes are the industrial-design vs modernist-retail poles of the same doctrine.

### vs [Sage Studio](./sage-studio.md)

Both palettes commit to warm-paper grounds and Inter-family body type, but the chromatic and typographic registers split. Sage Studio uses Fraunces serif on display with a sage + terracotta colour story and widened `radius` (`sm = 4px / md = 10px / lg = 16px`). Stone Modern uses single-family Söhne grotesque with a charcoal + rust colour story and near-square `radius` (`sm = 2px / md = 4px / lg = 8px`).

### vs [Mocha Latte](./mocha-latte.md)

Both palettes commit to warm-brown registers. Mocha Latte is the café register: oat-cream field (`#f5eddd`, 4-5% yellow), mocha-brown primary, Recoleta serif display, widened radii. Stone Modern is the retail register: warm-stone field (`#f0ece6`, cooler), charcoal-brown primary, single-family Söhne grotesque, near-square radii.

## Where it thrives

- Modern-retail product pages — the rust accent on warm stone reads as premium minimalist
- Editorial brand sites with tracked-uppercase section headers
- Long-form Söhne running text on `surface.raised`

## Where it degrades

- Dense data dashboards (the single-accent vocabulary fights chart category colour)
- Calm-app registers that want soft corners — the near-square `radius` scale reads as too sharp

## Recall aliases

`stone`, `stone modern`, `warm stone`, `aesop`, `muji`, `modern retail`, `premium minimalist`

## Long-form notes

<details>
<summary>From <code>palettes/stone-modern.README.md</code></summary>

# Stone Modern

Warm-minimalist modern register on the Flat engine. Warm-stone field,
near-black charcoal-brown primary, single saturated rust accent for
warning, tight modern grotesque sans throughout. The Aesop / Muji /
modern-retail aesthetic — the "premium minimalist brand site" register
distilled to the colour vocabulary the field actually uses.

The warm-neutral sibling of Dieter Rams: Rams uses cool warm-grey with
Braun orange; Stone Modern uses warm sandstone with rust and routes its
primary to the charcoal-brown text colour itself rather than to a
saturated accent. The two palettes sit beside each other as the
modernist-retail vs. industrial-design poles of the same minimalist
register.

`surface.base` is warm stone (`#f0ece6`) — slightly cooler at the high
end of the lightness scale than Heritage Maritime's bone (`#f4ecd9`),
slightly warmer than Dieter Rams's warm-grey (`#e9e8e5`). `surface.raised`
lifts to bone (`#faf8f3`); `surface.sunken` drops to `#e0dad0` for
input wells.

`intent.primary.bg` is charcoal-brown (`#2c2620`) — the same near-black
used for body text, promoted to the button slab. The palette has only
one chromatic accent: rust on `warning`. This is the load-bearing
colour move and the source of the "premium minimalist" feel — a single
saturated note in a sea of neutrals.

- `intent.warning` is rust orange (`#c2541f`) — kiln-fired clay, the
  one saturated accent
- `intent.danger` is terracotta-red (`#a8261e`) — sits in the same warm
  hue family as warning so the two intents read as "intentional" rather
  than as a clash
- `intent.success` is forest (`#4d7942`)
- `intent.info` is slate (`#2d4d6a`)

`typography.family.display` is Söhne (Inter fallback) at heavy weight
— modern minimalist retail favours strong grotesque caps for display
and `family.body` is the same Söhne for prose. The display label uses
uppercase tracking (`0.08em`) for the small-caps "section" feel modern
retail sites use on category headers.

`space.*` widens at the high end (`6: '36px'`, `7: '52px'`, `8: '72px'`)
— the modern-retail register depends on generous whitespace.

`radius.*` collapses to `sm = 2px / md = 4px / lg = 8px` — Stone Modern
favours near-square corners. The contrast with Sage Studio's
(`sm = 4px / md = 10px / lg = 16px`) is one of the load-bearing
distinctions between the two palettes in the same register set.

`elevation.low` is a 1 px hairline; `medium` and `high` add very low
alpha drop shadows tinted toward the charcoal-brown
(`rgba(44, 38, 32, 0.06 → 0.16)`).

`border.focus` is rust (`#c2541f`) — the single saturated accent doubles
as the focus indicator.

**A11y:** `pass`. `content.primary` (`#2c2620`) on `surface.base`
(`#f0ece6`) ≈ 14:1 (AAA). `intent.primary` charcoal-brown with bone
inverse ≈ 14:1 (AAA). `intent.warning` rust with bone inverse ≈ 4.7:1
(AA body). `intent.danger` terracotta-red with bone inverse ≈ 7.0:1
(AAA). `intent.success` forest with bone inverse ≈ 5.6:1 (AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
`space.*` widening, hairline-ring elevations, and a single-family Söhne
typography stack with uppercase-tracked labels.

</details>

---

_Generated from `palettes/stone-modern.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
