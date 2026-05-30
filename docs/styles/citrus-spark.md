# Citrus Spark

> D2C-brand register on the Flat engine — bright off-white field with a 1% yellow tint, citrus-yellow primary inverted to DARK content, warm-tinted soft drop shadows, and modern geometric Space Grotesk display.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Citrus Spark is the bright, energetic modern-brand tuning of the Flat engine. The chassis is conservative flat-engine: soft drop shadows tinted warm (`rgba(80, 60, 0, 0.10)` at `low`), `radius.sm/md/lg = 6/12/20` for soft friendly corners, hairline 1px subtle borders, `motion.easing.spring` with a stronger bounce, and zero ink outline (`effect.outline.color = transparent`). The load-bearing brand move is the primary intent: citrus yellow `#f9c70d` carrying DARK `#1a1d1a` content — the inversion of the standard pattern, justified by a 12:1 dark-on-yellow contrast. Display is Space Grotesk weight 700; body is Inter weight 400.

## Origin

The energetic D2C brand register that emerged in the post-Shopify / post-Allbirds wave — bright but never neon, saturated but never confrontational. Sits between the safe-corporate flat-classic register and the loud neobrutalism register: friendly Space Grotesk chrome, generous radius, soft warm shadows, and one bright citrus primary doing the brand work. The dark-inverse-on-yellow primary is the engine move that makes the palette feel specifically D2C rather than tech-startup.

## Signatures

- **Citrus-yellow primary `#f9c70d` carrying DARK `#1a1d1a` content (inverted inverse)** — `intent.primary.bg = #f9c70d` / `content: #1a1d1a` — yellow cannot carry white text legibly, so the engine inverts the standard pattern. The dark-on-yellow contrast lands around 12:1 (AAA). This is the load-bearing brand move: every other intent in the palette uses white inverse content (success, warning, danger, info), so primary is the only inverted slot, and that single inversion IS the citrus identity.
- **Bright off-white `surface.base` (`#fdfcf6`) with a barely-yellow tint** — `surface.base` is `#fdfcf6` — a 1% yellow paper tint, brighter than most warm palettes. `surface.raised` is pure white `#ffffff`; `surface.sunken` drops to `#f4f1e6` for input wells. The yellow undertone warms the field just enough to read as "fresh squeezed" without compromising contrast on the saturated yellow primary.
- **Warm-tinted soft drop shadows (`rgba(80, 60, 0, 0.10)` ladder)** — `elevation.low` is `0 1px 2px rgba(80, 60, 0, 0.10)` — the shadow color carries the yellow-warm undertone of the brand into the depth cue. `elevation.medium/high/overlay` stack the same warm-tinted alphas. Compare to flat-classic's neutral-ink shadows: same Flat engine, different tinted depth. `effect.shadowStyle = soft`.
- **Generous radius (`sm/md/lg = 6/12/20`) and Space Grotesk display at weight 700** — `radius.sm = 6px`, `md = 12px`, `lg = 20px` — bright friendly brands favor soft corners; sharp + bright reads as warning, not energy. `typography.family.display` is `"Space Grotesk", "Inter", "Söhne", system-ui, sans-serif` at weight 700. Body / UI route to Inter weight 400. The combination reads as 2020s D2C site rather than institutional brand.
- **Citrus-yellow focus ring (`#f9c70d`) matching the primary, with the spring easing bouncier than flat-classic** — `effect.focusRing` is `{ width: 2px, offset: 2px, color: #f9c70d, style: solid }` — the ring carries the brand color the same way the primary button does. `motion.easing.spring` is `cubic-bezier(0.34, 1.5, 0.64, 1)` — a stronger bounce than the conservative flat-classic baseline. The bright register reads correctly with slightly playful motion.

## Anti-signatures

- A neobrutalist hard-offset ink shadow (`Xpx Ypx 0 #0a0a0a`) — Citrus Spark uses soft warm-tinted blurred drops
- A 3px ink outline via `effect.outline` (that's the cel-shaded family; this palette's outline is transparent)
- Zero radius across the scale — Citrus Spark commits to generous `6/12/20` for the friendly D2C read
- White content on the primary fill — yellow can't carry white legibly; primary inverts to dark
- Heavy `4px` ink borders on every control — Citrus Spark uses hairline 1px subtle borders on a flat field

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.intent.primary.bg` | `#f9c70d` | `#f9c70d` citrus yellow — the load-bearing brand color and the source of the entire palette's identity. |
| `color.intent.primary.content` | `#1a1d1a` | `#1a1d1a` near-black — the inverted-content move that distinguishes Citrus Spark from every other Flat-engine palette (yellow can't carry white at AA). |
| `color.surface.base` | `#fdfcf6` | `#fdfcf6` bright off-white with 1% yellow tint — the "fresh squeezed" undercoat. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(80, 60, 0, 0.10)` | `0 1px 2px rgba(80, 60, 0, 0.10)` — warm-tinted soft drop, not neutral-ink. The yellow undertone carries into the depth cue. |
| `effect.shadowStyle` | `soft` | `soft` — confirms the Flat engine. Every neobrutalist / cel-shaded sibling returns `hard`. |
| `effect.outline.color` | `transparent` | `transparent` — Flat-engine baseline; no ink halo on controls. Cel-shaded palettes return `#0a0a0a` here. |
| `radius.lg` | `20px` | `20px` — generous, friendly. Neubrutalism returns `0` here; Flat-classic typically returns `8px`. |
| `typography.family.display` | `"Space Grotesk", "Inter", "Söhne", system-ui, sans-serif` | Space Grotesk stack at weight 700 — modern geometric sans with playful character; the D2C-brand display register. |
| `motion.easing.spring` | `cubic-bezier(0.34, 1.5, 0.64, 1)` | `cubic-bezier(0.34, 1.5, 0.64, 1)` — a stronger bounce than flat-classic; the bright register reads correctly with slightly playful motion. |

## Often confused with

### vs [Flat / Classic](./flat-classic.md)

Flat Classic is the conservative unornamented baseline of the Flat engine — neutral-ink soft drop shadows, indigo primary with white inverse, system-stack typography, standard 8px radius. Citrus Spark (this palette) is the energetic D2C tuning — warm-tinted soft shadows, citrus-yellow primary with DARK inverse (the inversion is engine-load-bearing), Space Grotesk display, generous 6/12/20 radius, bouncier spring easing.

### vs [Neo Citrus](./neo-citrus.md)

Same citrus instinct, opposite engine. Neo Citrus is neubrutalism — electric-lime primary, hard-offset ink block shadows on the `2/4/6/8 px` ladder, zero radius, ink borders, Archivo Black uppercased. Citrus Spark (this palette) is Flat — softer citrus-yellow primary, warm-tinted blurred drop shadows, generous radius, hairline borders, Space Grotesk sentence-case.

### vs [Cel-shaded (Citrus Pop)](./cel-shaded-citrus.md)

Cel-shaded Citrus is the anime engine — tangerine primary, 3px ink halo on every control via `effect.outline`, two-tone hard-offset block shadows, smaller radius. Citrus Spark (this palette) is the Flat engine — yellow primary, transparent outline, soft warm-tinted blurred shadows, generous radius. Same warm-citrus brand instinct, opposite ornament level.

### vs [Solarpunk](./solarpunk.md)

Solarpunk shares the warm bright instinct but commits to a botanical / hand-drawn register with leaf-green primary. Citrus Spark (this palette) is hard-edged-flat geometric — Space Grotesk chrome, citrus-yellow primary, geometric soft shapes. Same warm temperature, different ornament register.

## Where it thrives

- Marketing pages / landing hero blocks — citrus-yellow primary with dark content reads as intended brand chrome
- Pricing tiers and CTA buttons — the yellow primary against everything else is the unambiguous call-to-action
- D2C product pages, onboarding flows — Space Grotesk display + generous radius + warm shadows is the post-2020 brand register
- Status badges and tag systems — the four-intent palette (warning amber, success lime, danger signal-red, info blue) reads as a clean state set

## Where it degrades

- Financial dashboards / enterprise admin — the bright yellow primary reads as not-serious by construction
- Long-form muted-text passages on saturated backgrounds — the warm field is bright but `content.muted` `#7d8074` tires the eye at length
- Dense data tables — soft warm shadows + hairline borders give weak row separation at row density

## Recall aliases

`citrus spark`, `citrus-spark`, `citrus yellow`, `d2c yellow`, `fresh squeezed`, `yellow brand`

## Long-form notes

<details>
<summary>From <code>palettes/citrus-spark.README.md</code></summary>

# Citrus Spark

Bright, energetic modern brand register on the Flat engine. Bright off-
white field with a barely-yellow tint, citrus-yellow primary with **dark**
inverse content (the only intent that doesn't carry white on its
button), lime success, signal-red danger, modern geometric sans
throughout. The "energetic D2C brand site" register — bright but never
neon, saturated but never confrontational.

`surface.base` is bright off-white with a barely-yellow tint
(`#fdfcf6`); the 1% yellow undertone warms the field just enough to
read as "fresh squeezed." `surface.raised` is pure white (`#ffffff`);
`surface.sunken` drops to `#f4f1e6` for input wells.

`intent.primary.bg` is citrus yellow (`#f9c70d`) — the load-bearing
colour move and the source of the entire palette's identity. Yellow
buttons can't carry white text legibly, so `intent.primary.content` is
near-black (`#1a1d1a`) — **the inversion of the standard pattern**,
justified by the 12:1 dark-on-yellow contrast. This is the first
palette in the showcase whose primary intent uses dark inverse content
(Mall-goth uses dark text on dark surfaces but white on its primary).

- `intent.warning` is sun-warmed amber (`#c2671e`) — distinct from
  primary yellow so warning toasts don't read as branded chrome
- `intent.success` is lime green (`#4d8c3b`)
- `intent.danger` is signal red (`#d6391c`)
- `intent.info` is mid-blue (`#1f6db8`) — the one cool note on a warm
  palette, sitting against everything else for state contrast
- `content.link` is the same `#1f6db8` info-blue (yellow primary can't
  pull double duty as a link colour)

`border.focus` is the primary citrus yellow (`#f9c70d`) — the focus
ring carries the brand colour, the same way the primary button does.

`typography.family.display` is Space Grotesk (Inter / Söhne fallback)
at heavy weight — modern geometric sans with playful character that
fits the bright register. `family.body` and `family.ui` route to Inter
for clean prose. Display labels gain `tracking: 0.02em` for the slightly-
stretched label feel D2C brands favour.

`radius.*` widens to `sm = 6px / md = 12px / lg = 20px` — bright
friendly brands favour soft corners; sharp + bright reads as warning,
not energy.

`elevation.*` shadow recipes tint warm (`rgba(80, 60, 0, 0.10)` at
`low`) — the yellow-warm undertone of the brand carries into the
depth cue.

`motion.easing.spring` uses a stronger bounce (`cubic-bezier(0.34, 1.5,
0.64, 1)`) than Flat / Classic — the bright register reads correctly
with slightly playful motion.

**A11y:** `pass`. `content.primary` (`#1a1d1a`) on `surface.base`
(`#fdfcf6`) ≈ 16:1 (AAA). `intent.primary` citrus yellow with **dark
inverse** (`#1a1d1a`) ≈ 12.2:1 (AAA). `intent.warning` sun amber with
white inverse ≈ 4.5:1 (AA body). `intent.success` lime green with white
inverse ≈ 4.0:1 (AA UI). `intent.danger` signal red with white inverse
≈ 5.4:1 (AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, widened
`radius.*`, warm-tinted elevations, geometric-display + grotesque-body
typography, and (load-bearing) the **dark inverse content** on
`intent.primary` — the contract supports inverse-content per intent
exactly so palettes like this can route around yellow's contrast
limits without an engine change.

</details>

---

_Generated from `palettes/citrus-spark.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
