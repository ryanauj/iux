# FINALIZED-PALETTES

Ten named aesthetics. Each is a concrete value-set bound to the single
semantic token contract in `tokens/semantic.contract.ts`. A **palette**
defines values; an **engine** defines the rendering style (which token
slots matter, what shape the shadow stack takes, whether `backdropBlur`
is non-zero, etc.). Two palettes can share an engine and still look
nothing alike — that is the point.

Legend:

- **A11y**: `pass` = passes WCAG AA for body text & focusable controls at
  default sizes; `experimental` = ships with documented contrast or
  motion caveats and is opt-in for production.
- **Engine**: the rendering family the palette plugs into. Palettes 8-10
  reuse engines from 1-7 to prove the contract holds.

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

Seven engines, ten palettes:

1. Flat
2. Material
3. Neubrutalism
4. Glassmorphism
5. Neumorphism
6. Claymorphism
7. Skeuomorphism

Engine `Flat` is reused by palettes 1, 9, 10. Engine `Glassmorphism` is
reused by palettes 4 and 8. The token contract is the only seam between
engine and palette — see `tokens/00-token-contract.md`.
