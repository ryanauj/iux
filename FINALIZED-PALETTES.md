# FINALIZED-PALETTES

Twenty named aesthetics. Each is a concrete value-set bound to the
single semantic token contract in `tokens/semantic.contract.ts`. A
**palette** defines values; an **engine** defines the rendering style
(which token slots matter, what shape the shadow stack takes, whether
`backdropBlur` is non-zero, etc.). Two palettes can share an engine and
still look nothing alike — that is the point.

Legend:

- **A11y**: `pass` = passes WCAG AA for body text & focusable controls at
  default sizes; `experimental` = ships with documented contrast or
  motion caveats and is opt-in for production.
- **Engine**: the rendering family the palette plugs into. Palettes
  8–10, 11–15, and 16–20 reuse engines from 1–7 to prove the contract
  holds.

---

## Group A — named aesthetic families

| # | Palette         | Engine         | A11y         | One-line philosophy                                                                            |
|---|-----------------|----------------|--------------|------------------------------------------------------------------------------------------------|
| 1 | Flat / Classic  | Flat           | pass         | Solid fills, one accent, system font, high contrast — the control surface every other rung is judged against. |
| 2 | Material        | Material       | pass         | Paper-and-ink metaphor: stacked surfaces, soft elevation shadows, bold accent, ripple on press. |
| 3 | Neubrutalism    | Neubrutalism   | pass         | Thick black borders, hard offset shadows, vibrant clashing fills, heavy type, zero radius — confidently ugly. |
| 4 | Glassmorphism   | Glassmorphism  | experimental | Translucent panels over a saturated background, backdrop blur, hairline borders, layered depth. |
| 5 | Neumorphism     | Neumorphism    | experimental | Single tonal surface with paired inner + outer shadow — the cautionary palette; contrast fails on purpose so we can document it. |
| 6 | Claymorphism    | Claymorphism   | experimental | Inflated 3D "gumdrops" — vibrant pastels, large radius, doubled inner and outer shadow for softness. |
| 7 | Skeuomorphism   | Skeuomorphism  | experimental | Mimics real materials — felt, leather, brushed metal — with texture maps and tactile shadow depth. |

## Group B — palette configurations (same engines, different tokens)

| #  | Palette          | Engine        | A11y         | One-line philosophy                                                                            |
|----|------------------|---------------|--------------|------------------------------------------------------------------------------------------------|
| 8  | Tron / Dark-Neon | Glassmorphism | experimental | Near-black field, one neon accent, glow-as-focus-ring — glass engine, all the translucency dialed to a single color. |
| 9  | Editorial        | Flat          | pass         | Warm paper background, serif display, ink-black body, restrained accent — flat engine reading like a magazine. |
| 10 | High-Contrast AAA| Flat          | pass         | Pure black on pure white (or inverse), 3px focus rings, no decorative color — constraint as aesthetic, WCAG AAA throughout. |

## Group C — glass registers (same engine, period/brand tuning)

Five additional palettes prove the Glassmorphism engine carries
distinct visual registers without engine changes — all five differ
only in `surface.*` alpha, `border.*` tint, `elevation.*` shadow
recipe, `radius.*`, and `effect.backdropBlur.*` magnitude.

| #  | Palette                 | Engine        | A11y         | One-line philosophy                                                                            |
|----|-------------------------|---------------|--------------|------------------------------------------------------------------------------------------------|
| 11 | Liquid Glass (Light)    | Glassmorphism | experimental | Apple WWDC25 register — softer blur, refraction-tinted hairlines, lighter shadows on a cool light base. |
| 12 | Liquid Glass (Dark)     | Glassmorphism | experimental | Same Apple register inverted to near-black; raised alphas drop to 6–14% so panels still read as glass, not grey. |
| 13 | Aero Glass              | Glassmorphism | experimental | Windows Vista/7 — saturated blue base, paired top-highlight + bottom-rim insets for the wet gloss, Segoe UI. |
| 14 | Frutiger Aero           | Glassmorphism | experimental | Y2K aqua-mint base, cloud-white raised, bouncier spring easing, teal shadow — late-2000s optimism. |
| 15 | Cyberpunk Neon-Noir     | Glassmorphism | experimental | Near-black rainy-window field, magenta + cyan dual-accent borders and glow elevations, glow focus ring. |

## Group D — flat registers (same engine, period/style tuning)

Five additional palettes prove the Flat engine carries distinct
period and style registers without engine changes — palettes differ
only in `color.*`, `radius.*`, `borderWidth.*`, `elevation.*` shadow
recipe, `space.*` scaling, and `typography.*` family/role choices.
Palettes 16 and 17 stress decoration and color saturation; palettes
18 and 19 collapse the color/curve space deliberately; palette 20
collapses the lightness/intent space deliberately.

| #  | Palette                      | Engine | A11y         | One-line philosophy                                                                            |
|----|------------------------------|--------|--------------|------------------------------------------------------------------------------------------------|
| 16 | Vaporwave                    | Flat   | experimental | Magenta/cyan dusk register on a deep night-purple base, glow-paired elevation, serif display + uppercase mono labels. |
| 17 | 80s Memphis                  | Flat   | experimental | Cream base, primary-color intents, ink-black borders on every slot, hard-offset elevation — Memphis Group confetti vocabulary. |
| 18 | Swiss / International Style  | Flat   | pass         | White / black / signal red only; zero radius outside `full`; intents collapse to two colors — typographic hierarchy carries the rest. |
| 19 | Bauhaus                      | Flat   | pass         | Red / yellow / blue primaries on cream, radius forced to `0` or `9999px`, geometric sans, linear easings — primary shapes only. |
| 20 | Mall-goth                    | Flat   | experimental | Near-black field, blood-red accent, deep-violet `info`, condensed serif display, tightened `space.*` — crepuscular intent across the board. |

---

## Notes on a11y tags

- **Neumorphism** is included intentionally as the cautionary palette. Its
  defining feature — a single near-monochrome surface lit only by paired
  shadows — guarantees text and icon contrast below 3:1 against most
  backgrounds. We ship it so the showcase can demonstrate the failure
  mode concretely; the `experimental` tag is mandatory.
- **Glassmorphism** and **Tron / Dark-Neon** depend on what sits behind
  the translucent surface. Both palettes set `surface.scrim` aggressively
  to mitigate, but cannot guarantee AA without controlling the page.
- **Claymorphism** and **Skeuomorphism** can pass AA on a per-token basis
  but their textured / pastel surfaces routinely defeat icon contrast and
  cursor visibility; flagged experimental.

## Engine inventory

Seven engines, twenty palettes:

1. Flat
2. Material
3. Neubrutalism
4. Glassmorphism
5. Neumorphism
6. Claymorphism
7. Skeuomorphism

Engine `Flat` is reused by palettes 1, 9, 10, and 16–20. Engine
`Glassmorphism` is reused by palettes 4, 8, and 11–15. The token
contract is the only seam between engine and palette — see
`tokens/00-token-contract.md`.
