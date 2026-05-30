# Neo Grape

> Light neobrutalist register tuned deep-violet + lime — barely-purple paper field, zero radius, ink outlines, hard-offset block shadows, and the one neo-* primary deep enough to carry white content.

**Engine:** `neubrutalism` · **A11y:** `pass`

## Summary

Neo Grape is the deep-violet tuning of the light neubrutalism engine. Structure matches the rest of the neo-* set — `radius.*` collapses to `0`, `elevation.*` paints the hard-offset ink-black `2/4/6/8 px` ladder, `border.*` is `#0a0a0a` across the board, motion is `linear` at `60/90/120ms`, and display is Archivo Black weight 900 uppercased over Space Grotesk UI. The distinguishing move is the deep-violet primary `#7c3aed` — the only neo-* primary dark enough to require white inverse content (`intent.primary.content = #ffffff`) — paired with a lime `#a3e635` counter-pop carried by the focus ring, on a barely-violet `#faf7ff` paper field.

## Origin

The post-2020 light neobrutalism wave — Gumroad, Linktree, bento.me, bento-grid SaaS landing pages — tuned to the violet / electric-purple brand register that runs through Stripe-adjacent dev tools, indie game pages, and the post-Squarespace creator-economy aesthetic. Neo Grape is the deep-jewel tuning of the family: one rich purple primary, one lime counter-pop, ink everywhere else.

## Signatures

- **Deep-violet primary `#7c3aed` with WHITE inverse content (the one neo-* palette that inverts)** — `intent.primary.bg = #7c3aed` / `content: #ffffff` — every other neo-* sibling keeps ink-black content on a lighter fill (bubblegum-pink, electric-lime, tangerine-orange). Grape is dark enough that ink content fails the contrast floor, so the engine routes `content` to white. This is the load-bearing differentiator inside the family.
- **Lime `#a3e635` focus ring as the complementary counter-pop** — `effect.focusRing.color = #a3e635` and `intent.success.bg = #a3e635` — lime carries focus AND success. The violet/lime complementary pair is the brand cue: a wine-purple primary lifted by a fresh-leaf accent that escalates cleanly over both the violet fill and the paper field.
- **Barely-violet `surface.base` (`#faf7ff`) with a deeper violet sunken (`#f1ebff`)** — `surface.base` is `#faf7ff` — a 2% lavender paper tint, distinguishing this palette from Neo Bubblegum (pink-tinted), Neo Citrus (yellow-tinted), and Neo Tangerine (orange-tinted). The cool undertone is what locks the grape register before any intent fills land.
- **Hard-offset ink block shadows on the `2/4/6/8 px` ladder, zero radius** — `elevation.low/medium/high/overlay` are `2px 2px 0 #0a0a0a` / `4px 4px 0 #0a0a0a` / `6px 6px 0 #0a0a0a` / `8px 8px 0 #0a0a0a`. Every `radius.*` slot from `sm` through `full` is `0`. Identical engine chassis to every neo-* sibling — stamped rectangles, offset shadows, depth from offset rather than blur or curve.
- **Archivo Black display weight 900 uppercased over Space Grotesk UI; linear motion at 60–120ms** — `typography.family.display` is `"Archivo Black"` at weight 900 with `textTransform: uppercase` on display/title/label. `family.ui` is `"Space Grotesk"`. `motion.duration.fast/base/slow` is `60/90/120ms` with `linear` easing across every slot. Shared chrome with the rest of the neo-* set and with canonical `neubrutalism`.

## Anti-signatures

- A bright fill with ink content on `intent.primary` — Neo Grape is the inverted one inside the family
- Any non-zero `radius.*` value — defeats the stamped-shape look
- Soft gaussian or blurred shadows — neobrutalism is hard-offset ink only
- A near-white `surface.base` with zero violet tint — the lavender undertone is the grape undercoat
- Eased or spring motion curves — the engine commits to `linear` across every easing slot

## Token evidence

| Path | Value | Note |
|---|---|---|
| `radius.lg` | `0` | `0` — every radius slot collapses; the stamped-rectangle look is engine-load-bearing. |
| `elevation.low.boxShadow` | `2px 2px 0 #0a0a0a` | `2px 2px 0 #0a0a0a` — single offset ink shape, zero blur, zero spread. Identical to every neo-* sibling. |
| `color.intent.primary.bg` | `#7c3aed` | `#7c3aed` deep violet — the dark primary that distinguishes Neo Grape from the lighter neo-* siblings. |
| `color.intent.primary.content` | `#ffffff` | `#ffffff` white — the only inverted-content move in the neo-* family. Every other sibling keeps ink-black content on a bright fill. |
| `color.surface.base` | `#faf7ff` | `#faf7ff` barely-violet paper — distinguishes this palette from the pink / yellow / orange-tinted siblings. |
| `effect.focusRing.color` | `#a3e635` | `#a3e635` lime — the complementary counter-pop. Same value carries `intent.success.bg`. |
| `color.content.link` | `#6d28d9` | `#6d28d9` deeper violet — the link color sits a step darker than the primary fill. |
| `motion.easing.standard` | `linear` | `linear` — every easing slot is `linear`. Snap-to-grid neobrutalism cadence. |

## Often confused with

### vs [Neubrutalism](./neubrutalism.md)

Canonical `neubrutalism` is the elevation-stripped variant — `elevation.*` slots are all `none`, depth comes from 4px ink borders alone, and the palette runs six clashing neon intents on a near-white field. Neo Grape (this palette) is the hard-shadow + jewel-tone variant — `elevation.*` paints the `2/4/6/8 px` offset ladder, the palette commits to one deep-violet primary (with the engine's only white-inverse content) plus a lime counter-pop, and the field is barely-violet paper instead of neutral white.

### vs [Neo Bubblegum](./neo-bubblegum.md)

Same neubrutalism engine; the primary and content-color routing differ. Neo Bubblegum runs bright bubblegum-pink with ink-black content on a paper-pink field; Neo Grape (this palette) runs deep violet with WHITE content on a paper-violet field — the only neo-* sibling that inverts content. Engine tokens (radius `0`, ink borders, `2/4/6/8 px` offset ladder, linear motion, Archivo Black) are identical.

### vs [Mall-goth](./mall-goth.md)

Mall-Goth shares the dark-violet/black register and the inverted-content instinct but commits to a much darker overall palette — near-black surfaces, deep jewel intents, ornate type. Neo Grape (this palette) is the LIGHT neobrutalist register — paper-violet field, white-on-violet only on the primary fill, Archivo Black instead of gothic chrome.

### vs [Cyberpunk Neon-Noir](./cyberpunk-neon-noir.md)

Cyberpunk Neon Noir is the dedicated glow / neon-on-dark engine — deep surfaces, `effect.glow.*` radiance, neon strokes. Neo Grape (this palette) is light neobrutalism — paper field, zero glow, flat violet fills with ink borders and offset block shadows.

## Where it thrives

- Buttons / Badges — the deep-violet primary with white text is the standout neobrutalism CTA
- Landing-page hero blocks — Archivo Black on the violet primary fill reads as creator-economy brand chrome
- Bento layouts — violet primary cells beside lime success cells beside paper-violet neutral cells
- Pricing tiers / sign-up flows — the violet primary is the canonical "premium tier" color in the post-2020 SaaS register

## Where it degrades

- Long-form prose / docs — Archivo Black uppercased on violet fills tires the eye at length
- Dense forms / data tables — ink borders + offset shadows eat real estate and linear motion makes inputs feel unresponsive
- Calendars / DatePickers — the per-cell heavy border becomes visual noise

## Recall aliases

`neo grape`, `neo-grape`, `grape neobrutalism`, `violet neobrutalism`, `purple brutalism`, `bento brutalism`

---

_Generated from `palettes/neo-grape.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
