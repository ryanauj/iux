# Dieter Rams / Braun

> "Less but better" on the Flat engine — cool warm-grey field, single Braun-orange `intent.primary`, single-family Helvetica throughout, generous whitespace.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Dieter Rams / Braun is the Ulm Hochschule + Braun industrial-design register on the Flat engine. Cool warm-grey (`#e9e8e5`) fills `surface.base`; off-white (`#f7f6f3`) carries `surface.raised`; a single saturated Braun-orange (`#e25822`) holds `intent.primary` and `border.focus`. Helvetica fills `family.ui` / `body` / `display` — there is no display↔body family contrast, only weight and size. `space.*` widens at the high end (`6: 36px`, `7: 52px`, `8: 72px`) so the generous-whitespace Ulm composition is built into the scale.

## Origin

The Ulm Hochschule für Gestaltung (1953–1968) and the Braun industrial-design group under Dieter Rams (1955–1995). The visual vocabulary maps to specific Braun products: ET66 calculator orange `=` key, SK4 record-player rim, T1000 radio knurled controls. Rams's "Ten Principles for Good Design" (formalised 1980s) include "as little design as possible" — the palette enforces that by collapsing the typography family count to one and the chromatic intent count to one.

## Signatures

- **Single saturated Braun-orange `intent.primary`** — `intent.primary.bg` is `#e25822` — the exact orange on a Braun ET66 calculator `=` key. `border.focus` reuses the same orange. Every other intent stays desaturated; `intent.warning` shifts to a more amber tone (`#cc6f1a`) so it doesn't read identical when stacked, but the warmth register is consistent.
- **Single-family Helvetica on every typography slot** — `family.ui`, `family.body`, and `family.display` are all Helvetica. There is no serif display, no mono UI, no humanist body — one face, weight and size carry the entire hierarchy. The single-family rule is the load-bearing typography move.
- **Generous whitespace in `space.*`** — `space.6: '36px'`, `space.7: '52px'`, `space.8: '72px'` — wider than Flat / Classic by ~12% at the high end. Ulm layouts rely on whitespace as the primary organising tool rather than chromatic accents or borders.
- **Hairline-rule `elevation.low`** — `elevation.low` is `0 0 0 1px #cfccc4` — a 1 px outline instead of a drop shadow. `medium` and `high` add very-low-alpha drops. Cards barely lift; the field organises itself by the type and the grid.

## Anti-signatures

- A second saturated chromatic intent competing with the Braun-orange
- A serif `display` family — the single-Helvetica rule is structural
- Heavy drop shadows on `elevation.low` — the hairline rule is the lift signal
- Tight `space.*` scale — Ulm composition cannot survive without the breathing room

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.intent.primary.bg` | `#e25822` | Braun orange `#e25822` — the exact ET66 `=` key colour. |
| `typography.family.ui` | `"Helvetica Neue", "Helvetica", "Inter", "Söhne", system-ui, sans-serif` | Helvetica — the only typography family routed for any role. |
| `typography.family.display` | `"Helvetica Neue", "Helvetica", "Inter", "Söhne", system-ui, sans-serif` | Helvetica — identical to `family.ui`, no display contrast. |
| `space.7` | `52px` | `'52px'` — generous whitespace at the high end vs Flat / Classic's `'48px'`. |
| `elevation.low.boxShadow` | `0 0 0 1px #cfccc4` | `0 0 0 1px #cfccc4` — hairline rule instead of drop shadow. |

## Often confused with

### vs [Swiss / International Style](./swiss-international.md)

The structural rules are identical (single accent, zero radius, Helvetica throughout, generous whitespace). The register difference is exactly the warmth shift: Swiss uses signal red as the single accent and pure white / pure black neutrals (Zurich-cold); Dieter Rams uses Braun orange and warm-grey / off-white neutrals (Frankfurt-warm). The two palettes are siblings on the same engine, declaring the same principles at different colour temperatures.

### vs [Bauhaus](./bauhaus.md)

Bauhaus uses the primary triad (red + yellow + blue) on cream with geometric sans display — primary shapes only. Dieter Rams uses Braun orange as the single accent on warm-grey with Helvetica throughout — single colour, single typography. Bauhaus declares chromatic vocabulary as a teaching set; Dieter Rams declares chromatic restraint as a teaching set.

### vs [Flat / Classic](./flat-classic.md)

Flat / Classic is the control palette: blue accent on white, system fonts, standard radius scale. Dieter Rams replaces the blue accent with Braun orange, the system font with Helvetica throughout, the standard radius scale with a near-zero scale, and the soft drop-shadow `elevation.low` with a hairline rule. Same engine, doctrinaire restraint.

## Where it thrives

- Industrial-design portfolios, consumer-electronics product pages
- Settings panels and form-heavy interfaces where restraint reads as quality
- Long-form Helvetica running text on `surface.raised`

## Where it degrades

- Dense data dashboards (the single-colour intent vocabulary fights chart category colour)
- Maximalist marketing pages — the palette refuses decoration

## Recall aliases

`dieter rams`, `braun`, `rams`, `ulm`, `less but better`

## Long-form notes

<details>
<summary>From <code>palettes/dieter-rams.README.md</code></summary>

# Dieter Rams / Braun

"Less but better" on the Flat engine. Cool warm-grey field, off-white
raised surfaces, a single saturated Braun-orange as the only chromatic
intent, Helvetica throughout, generous whitespace. The Ulm Hochschule
für Gestaltung / Braun industrial-design register — structurally
adjacent to Swiss / International, but warmer in the neutrals and with
orange standing in for signal red.

`surface.base` is cool warm-grey (`#e9e8e5`) — the colour of a plastic
Braun product housing under daylight. `surface.raised` is `#f7f6f3`
(off-white close to product-photography seamless paper); `surface.sunken`
drops to `#dad8d3` for input wells. The two-step lightness ladder is
deliberate — Ulm layouts rely on subtle field/card lightness shifts
rather than chromatic accents.

`intent.primary.bg` is Braun orange (`#e25822`) — the saturated orange
on a Braun ET66 `=` key and the SK4 record-player rim, the single
chromatic accent every other intent steps around. `border.focus`
reuses the same orange. `intent.warning` shifts to a more amber tone
(`#cc6f1a`) so the two intents don't read identical when stacked, but
the warmth register is consistent. `success`, `danger`, `info` stay
desaturated.

`typography.family.ui`, `body`, and `display` are all Helvetica — the
typeface every Ulm and Braun designer reached for. The single-family
rule is the load-bearing typography move: there is no display ↔ body
contrast, only weight and size. Display is sentence-case at modest
size (no uppercase) — Ulm typography is restrained, never showy.

`space.*` widens at the high end (`6: '36px'`, `7: '52px'`, `8: '72px'`)
— Ulm layouts rely on generous whitespace as the organising tool. The
extra breathing room is the second load-bearing move.

`elevation.*` is near-flat. `low` is a 1 px hairline rule
(`0 0 0 1px #cfccc4`), the same trick Scandinavian Royal Modern and
Industrial / Light use to lift cards without a drop shadow. `medium`
and `high` add very-low-alpha drops so the lift is visible without
being decorative.

`radius.*` collapses to `'0' / '0' / '2px' / '6px' / '999px'` — Braun
product detailing favoured square corners with small radii on
softgoods (the famous SK4 turntable lid corners). The discipline
extends to UI: cards stay square, only buttons and pills round.

**A11y:** `pass`. `content.primary` (`#1d1c1a`) on `surface.base`
(`#e9e8e5`) ≈ 13.8:1 (AAA). `intent.primary` Braun orange on white
inverse content ≈ 4.5:1 (AA at every size). `intent.warning`
(`#cc6f1a`) on white ≈ 4.1:1 (AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `space.*`,
`radius.*`, `elevation.*` recipe, and a single-family Helvetica
typography stack.

## Lookalike-aware

The closest sibling palette is Swiss / International. Differences:
Swiss uses *signal red* as the single accent and pure white / pure
black neutrals; Dieter Rams uses *Braun orange* as the single accent
and warm-grey / off-white neutrals. The structural rules (single accent,
zero radius, Helvetica throughout) are identical — the register
difference is exactly the warmth shift between Zurich-cold and
Frankfurt-warm.

</details>

---

_Generated from `palettes/dieter-rams.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
