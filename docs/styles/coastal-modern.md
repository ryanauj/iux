# Coastal Modern

> Contemporary coastal / beach-house register on the Flat engine — pale sea-foam field, deep-teal primary, sunset-rust warning, humanist-rounded display over geometric body sans.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Coastal Modern is the Hamptons / Cape Cod / Tulum-modern register on the modern-light Flat-engine grid. `surface.base` is pale sea-foam (`#edf5f4`) — a 2-3% cyan-green tint that grounds the rest of the palette as "shallow tropical water" rather than as "neutral pale." `intent.primary.bg` is deep teal (`#1e5460`) — the colour of coastal water at dusk — and `intent.info` reuses the same teal because coastal signage commits to one blue-green. `intent.warning` is sunset rust (`#b8631c`), the warm complement to the cool primary. The Nunito-rounded display over Inter body is the typography move that reads as "coastal modern" rather than as urban SaaS.

## Origin

The 2010s–2020s coastal-modern interior and product-design lane — Serena & Lily, Soho House Bahamas, Tulum hotel branding, Cape Cod beach-house renovations photographed for Architectural Digest. The colour vocabulary is shallow tropical water and a sunset; the typography mirrors the rounded modernism of contemporary coastal architecture.

## Signatures

- **Pale sea-foam field (`#edf5f4`)** — `surface.base` carries a 2-3% cyan-green tint — the colour of light through shallow tropical water. Without the tint the palette reads as Flat / Classic; with it the entire chromatic set lands as "coastal" rather than as "generic light."
- **Deep teal `intent.primary` doubling as `intent.info` (`#1e5460`)** — `intent.primary.bg` and `intent.info.bg` are both `#1e5460` — coastal-modern signage commits to one blue-green and refuses a second saturated blue. The "one teal" rule is the load-bearing colour discipline.
- **Sunset-rust warning paired with the cool teal primary** — `intent.warning` is sunset rust (`#b8631c`) and `intent.danger` is coral red (`#c2403a`) — both sit in the same warm hue family, so the two warm intents read as a coherent sunset set rather than as a clash against the cool teal.
- **Humanist-rounded Nunito display over geometric Inter body** — `typography.family.display` is `"Nunito", "Quicksand", "Inter", system-ui, sans-serif` — rounded humanist for headings — while `family.ui` and `family.body` route to Inter for clean prose. The display + body split is the typography move that reads as coastal-modern rather than as Linear / Vercel productivity SaaS.
- **Teal-tinted soft drop shadows on `elevation.*`** — `elevation.low` is `0 1px 2px rgba(20, 53, 64, 0.08)` — shadow alpha tints toward teal so cards lift as polished driftwood above sea-foam, not as neutral panels. Scales through `medium` / `high` / `overlay` with the same teal cast.
- **Generous `radius.*` (`sm = 6px / md = 12px / lg = 18px`)** — Coastal-modern architecture and product design favour softer curves than urban modernism. Stone Modern uses `sm = 2px / md = 4px` for the deliberate contrast.

## Anti-signatures

- A second saturated blue competing with the teal primary
- Single-family geometric grotesque (Inter or Söhne) on `family.display` — the rounded Nunito split is structural
- Tight near-square `radius.*` — the coastal-modern register depends on the widened scale
- Neutral or warm-only shadow alpha — the teal cast is what reads as "polished driftwood"

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#edf5f4` | Pale sea-foam `#edf5f4` — the 2-3% cyan-green tint that grounds the register. |
| `color.intent.primary.bg` | `#1e5460` | Deep teal `#1e5460` — coastal water at dusk, ≈ 8.6:1 against cream inverse. |
| `color.intent.info.bg` | `#1e5460` | Same `#1e5460` — `info` reuses the primary teal; the one-teal rule is structural. |
| `color.intent.warning.bg` | `#b8631c` | Sunset rust `#b8631c` — the warm complement to the cool primary. |
| `typography.family.display` | `"Nunito", "Quicksand", "Inter", system-ui, sans-serif` | Nunito-first stack — humanist rounded for the coastal-modern split. |
| `typography.family.ui` | `"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif` | Inter — geometric sans for body and labels. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(20, 53, 64, 0.08)` | `0 1px 2px rgba(20, 53, 64, 0.08)` — teal-tinted shadow alpha, not neutral. |

## Often confused with

### vs [Nordic Frost](./nordic-frost.md)

Both palettes tint the field cool and commit `intent.primary` to a deep blue-green on the modern-light Flat engine. Nordic Frost's field is glacier ice (`#eef4f7`, 2-3% cyan only) with arctic-navy primary (`#1f3a5c`) and Inter throughout; Coastal Modern's field has the green note (`#edf5f4`) with deep-teal primary (`#1e5460`) and the Nunito + Inter display/body split. Nordic Frost is arctic; Coastal Modern is tropical.

### vs [Sage Studio](./sage-studio.md)

Same modern-light Flat-engine recipe and the same warm/cool intent pairing — the difference is the colour temperature of the field. Sage Studio commits to bone-paper (warm-yellow tinted, `#f3efe6`) with sage-green primary and a Fraunces serif display; Coastal Modern commits to sea-foam (cyan-tinted, `#edf5f4`) with deep-teal primary and a Nunito-rounded sans display.

### vs [Heritage Maritime](./heritage-maritime.md)

Both palettes use a blue-green primary and lean nautical. Heritage Maritime is the bone-paper traditional register (`surface.base` warm cream, deep-navy primary with a brass accent); Coastal Modern is the sea-foam contemporary register (`surface.base` cyan-tinted, deep-teal primary with a sunset-rust accent). Heritage is sailing-club; Coastal is beach-house.

## Where it thrives

- Hospitality and travel marketing surfaces — the sea-foam field reads as resort calm
- Wellness and spa-brand pages where the humanist-rounded display softens technical copy
- Product cards on `surface.raised` where the teal shadow reads as driftwood lift

## Where it degrades

- Dense data dashboards (the single-teal `primary`/`info` collapse fights chart blue families)
- Urban modernist registers that want sharp corners — the widened `radius` scale reads as too soft

## Recall aliases

`coastal`, `coastal modern`, `sea foam`, `cape cod`, `tulum`, `hamptons`, `beach house`

## Long-form notes

<details>
<summary>From <code>palettes/coastal-modern.README.md</code></summary>

# Coastal Modern

Contemporary coastal / beach-house register on the Flat engine. Pale
sea-foam field, deep-teal primary, sunset-rust warning, modern humanist
rounded sans throughout. Cooler than Sage Studio (which leans warm-bone),
warmer than Nordic Frost (which leans arctic-blue). The Hamptons / Cape
Cod / Tulum-modern aesthetic — sea-foam ground, polished wood trim,
accent warmth from a sunset.

`surface.base` is pale sea-foam (`#edf5f4`) — a 2-3% cyan-green tint
that grounds the rest of the palette as "shallow tropical water" rather
than as "neutral pale." `surface.raised` lifts to barely-tinted near-
white (`#fafdfd`); `surface.sunken` drops to `#d8e8e6` for input wells.

`intent.primary.bg` is deep teal (`#1e5460`) — the colour of deep
coastal water at dusk. `intent.info` reuses the same teal because
coastal-modern signage commits to one blue-green; introducing a second
saturated blue would break the register.

- `intent.warning` is sunset rust (`#b8631c`) — the warm complement to
  the cool primary; the warm/cool pairing is the load-bearing colour
  move
- `intent.danger` is coral red (`#c2403a`) — sits in the same warm hue
  family as warning so the two warm intents read as a coherent sunset
  set rather than as a clash
- `intent.success` is sea green (`#2d7a5a`) — visibly distinct from
  primary teal (more green, less blue)

`typography.family.display` is Nunito (Quicksand / Inter fallback) —
humanist rounded sans for a softer modern feel. `family.body` and
`family.ui` route to Inter for clean prose. The display + body split
(rounded for headings, geometric for body) is the typography move that
reads as "coastal modern" rather than as "modern productivity SaaS."

`radius.*` widens to `sm = 6px / md = 12px / lg = 18px` — coastal
modern architecture and product design favour softer curves than urban
modernism (Stone Modern uses `sm = 2px / md = 4px` for the contrast).

`elevation.*` shadow recipes tint toward teal (`rgba(20, 53, 64, 0.10)`
at `low`) so cards lift as polished driftwood above sea-foam, not as
neutral panels.

**A11y:** `pass`. `content.primary` (`#143540`) on `surface.base`
(`#edf5f4`) ≈ 13.5:1 (AAA). `intent.primary` deep teal with `#fafdfd`
inverse ≈ 8.6:1 (AAA). `intent.warning` sunset rust with cream inverse
≈ 4.4:1 (AA body). `intent.success` sea green with cream inverse
≈ 5.1:1 (AA body). `intent.danger` coral red with cream inverse
≈ 5.6:1 (AA body, AAA large).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, widened
`radius.*`, teal-tinted elevations, and a humanist-rounded + geometric
sans typography pairing.

</details>

---

_Generated from `palettes/coastal-modern.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
