# Neumorphism

> The cautionary palette — one near-monochrome surface (`#e0e5ec`) where every elevation slot is a paired top-left highlight + bottom-right shade and borders are invisible by construction.

**Engine:** `neumorphism` · **A11y:** `experimental`

## Summary

Neumorphism collapses the entire surface stack to a single tonal value: `surface.base`, `raised`, `sunken`, and `overlay` all resolve to `#e0e5ec`, and `border.subtle`/`default` resolve to the same colour (invisible by design). Depth is carried entirely by `elevation.*`, each slot packing the canonical Soft UI shadow pair — a bright `rgba(255,255,255,0.85)` top-left highlight and a darker `rgba(163,177,198,0.60)` bottom-right shade. `elevation.flat` is itself an *inset* pair, which is how depressed/active states read as recessed without a colour change. The README documents that this palette CANNOT meet WCAG AA for body text or icon glyphs against the tonal field — that is the point; it ships `experimental` to demonstrate the failure mode.

## Origin

Coined by Michał Malewicz in early 2020 as "Soft UI" and quickly renamed Neumorphism — a Dribbble-driven aesthetic where every control reads as carved out of (or pressed into) one continuous foam surface. The look went viral because the diagonal highlight/shade pair was easy to copy and looked rendered; it stalled as a shipping system because it refuses to use borders and can't carry accessible contrast.

## Signatures

- **Single tonal surface (`#e0e5ec`) across `base`, `raised`, `sunken`, `overlay`** — Every `color.surface.*` slot resolves to `#e0e5ec` — no surface step changes colour. Material has four distinct surface values; Neumorphism has one. Depth has to be carried elsewhere because the colours refuse to demarcate layers.
- **Paired top-left highlight + bottom-right shade at every elevation slot** — `elevation.low` is `4px 4px 8px rgba(163,177,198,0.60), -4px -4px 8px rgba(255,255,255,0.85)` — the canonical Soft UI shadow pair. The bottom-right shade and top-left highlight together carve a raised silhouette out of the tonal field. The pair scales smoothly through `medium` (`8/8`), `high` (`12/12`), and `overlay` (`20/20`).
- **Inset elevation at the `flat` slot for recessed/pressed states** — `elevation.flat` is `inset 4px 4px 8px rgba(163,177,198,0.60), inset -4px -4px 8px rgba(255,255,255,0.85)` — the *same* pair, inset. This is how Neumorphism does an active/depressed state: the highlight and shade swap roles without any colour change, and the control reads as pressed into the foam.
- **Invisible borders by construction** — `border.subtle`, `border.default` all resolve to `#e0e5ec` — the surface colour. Form fields, dividers, and table rows have no visible boundary; the engine refuses to use borders as a depth signal. Only `border.strong` (`#cdd3da`) and `border.focus` deviate.
- **Nunito throughout with documented AA failure on muted content** — `typography.family.ui`/`display` resolve to `"Nunito", system-ui, ...` — a rounded humanist sans that complements the foam silhouettes. `content.muted` is `#8c97a8` on `#e0e5ec` — ≈ 2.4:1, **fails AA outright**. The README documents this as the cautionary point of the palette.

## Anti-signatures

- Distinct surface colours per slot (base ≠ raised ≠ sunken)
- Visible borders or dividers (Neumorphism refuses borders as a depth signal)
- Saturated intent fills with white inverse content (Neumorphism intents reuse the tonal surface with coloured content instead)
- Single-direction outer drop shadows (Neumorphism requires the diagonal pair)
- Pastel surface field (that is Claymorphism — Neumorphism is neutral grey-blue)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#e0e5ec` | `#e0e5ec` — and `surface.raised`/`sunken`/`overlay` are the same value. The single-tone surface stack is the load-bearing Neumorphism cue. |
| `elevation.low.boxShadow` | `4px 4px 8px rgba(163, 177, 198, 0.60), -4px -4px 8px rgba(255, 255, 255, 0.85)` | Paired diagonal — `4px 4px 8px rgba(163,177,198,0.60), -4px -4px 8px rgba(255,255,255,0.85)`. Top-left highlight + bottom-right shade, the canonical Soft UI recipe. |
| `elevation.flat.boxShadow` | `inset 4px 4px 8px rgba(163, 177, 198, 0.60), inset -4px -4px 8px rgba(255, 255, 255, 0.85)` | The same pair, inset — `inset 4px 4px 8px ... inset -4px -4px 8px ...`. This is how depressed/active states read without a colour change. |
| `color.border.subtle` | `#e0e5ec` | `#e0e5ec` — identical to the surface. Borders are invisible by construction. |
| `color.intent.primary.bg` | `#e0e5ec` | `#e0e5ec` — the tonal surface. All six intents reuse the surface as their background; only `content` colour distinguishes them. |
| `color.content.muted` | `#8c97a8` | `#8c97a8` on `#e0e5ec` ≈ 2.4:1 — **fails WCAG AA**. The cautionary signature of the palette. |
| `typography.family.ui` | `"Nunito", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Nunito stack — rounded humanist sans that complements the foam silhouettes. |

## Often confused with

### vs [Claymorphism](./claymorphism.md)

Claymorphism uses distinct pastel surfaces (violet `#f5f0ff` base, white raised), pastel candy intents, vertical inset highlight + inset shade + outer drop, and 16-32px radii. Neumorphism collapses to one tonal `#e0e5ec` surface across every slot, uses a diagonal top-left/bottom-right pair, and refuses borders. Claymorphism is colourful and inflated; Neumorphism is monochrome and carved.

### vs [Skeuomorphism](./skeuomorphism.md)

Skeuomorphism uses warm paper-and-leather colours (`#e8dfcf` parchment), serif display (Optima), and an inset-top + inset-bottom + outer-drop stack to mimic real materials. Neumorphism is cool grey-blue, sans-only, and uses a diagonal highlight/shade pair to suggest a single continuous foam material rather than distinct real-world materials.

### vs [Glassmorphism](./glassmorphism.md)

Glassmorphism uses translucent panels with backdrop blur on a saturated host. Neumorphism is fully opaque on a single neutral tonal field — no transparency, no blur, no contrast against a colourful background.

### vs [Flat / Classic](./flat-classic.md)

Flat-classic uses opaque white over neutral grey with a single soft outer drop and visible hairline borders. Neumorphism uses one tonal value across every surface and elevation slot, the diagonal Soft UI shadow pair, and invisible borders.

## Where it thrives

- Volume sliders, dials, and toggle switches — controls carved from the surface read as the engine intends
- Music-player and smart-home concept UI — the home of most viral Neumorphism shots
- Single-screen showpieces where the foam silhouette is the whole point

## Where it degrades

- Body text and prose — `content.primary` is borderline AA and the shadow gradient adds perceptual noise
- Icon glyphs and placeholders — `content.muted` fails AA outright (2.4:1)
- Form fields — invisible borders mean inputs lose their boundaries
- Data tables and lists — no row dividers can survive a borderless surface
- Anything shipping to production — the README mandates `experimental` and forbids promotion to default

## Recall aliases

`neumorphism`, `soft ui`, `soft-ui`, `neuomorphism`, `new skeuomorphism`

## Long-form notes

<details>
<summary>From <code>palettes/neumorphism.README.md</code></summary>

# Neumorphism — the cautionary palette

A single near-monochrome surface (`#e0e5ec`) doing duty as `base`,
`raised`, `sunken`, and `overlay`. Depth is carried entirely by
`elevation.*`, each slot packing the canonical Soft UI shadow pair —
a bright top-left highlight (`rgba(255,255,255,0.85)`) and a darker
bottom-right shade (`rgba(163,177,198,0.60)`) — into one
`box-shadow` value. `elevation.flat` is itself an *inset* pair, which is
how depressed/active states read as recessed without a real color change.

`color.border.*` is deliberately set to the surface value: borders are
invisible by design, because the engine refuses to use them.

## Contrast failure (mandatory call-out)

**This palette CANNOT meet WCAG AA for body text or icon glyphs against
the tonal field.**

- `content.primary` `#445063` on `surface.raised` `#e0e5ec` measures
  ≈ 5.6:1 — just over AA for body text, but the perceived contrast is
  worse than the number suggests because the eye is also being asked to
  parse the surrounding shadow gradient as depth at the same time.
- `content.secondary` `#5d6b81` on the surface ≈ 4.2:1 — borderline AA;
  pairs poorly with the shadow noise.
- `content.muted` `#8c97a8` on the surface ≈ 2.4:1 — **fails AA outright**.
  Placeholders, disabled controls, and most icon glyphs land here.
- `border.subtle` `=` `border.default` `=` the surface color — invisible
  by construction. Form fields lose their boundaries; check states have
  no edge to anchor to.

This palette is shipped so the showcase can demonstrate the failure
mode concretely. The `experimental` tag is mandatory; downstream consumers
must not promote it to a production default.

**A11y:** `experimental` (documented failure mode — see above).

</details>

---

_Generated from `palettes/neumorphism.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
