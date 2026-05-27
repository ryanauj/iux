# Liquid Glass (Light)

> Apple WWDC25 register on the Glassmorphism engine — softer blur, lighter shadows, refraction-tinted hairlines over a cool neutral-grey host so white panels read as material rather than fog.

**Engine:** `glassmorphism` · **A11y:** `experimental`

## Summary

Liquid Glass (Light) is the restrained, post-2025 Apple take on the glass engine. `effect.backdropBlur.*` is dialled back to `blur(4px) → blur(20px)` (versus classic Glassmorphism's `6 → 24`), `elevation.*` swaps deep saturated outer shadows for `rgba(15,23,42, 0.08 → 0.20)` lifts, and `color.border.default` carries a faint sky-cyan refraction tint (`rgba(186,230,253, 0.60)`) so panel edges read as refractive rather than chalked. `surface.base` is a cool neutral grey `#e6e9f2` — the white-tinted `raised` panels need a non-white host to look like material — and radii bump up to Apple's pillier scale (`sm 10 / md 14 / lg 22`).

## Origin

Apple's WWDC 2025 platform refresh introduced "Liquid Glass" as a system-wide visual language across iOS / iPadOS / macOS. It descends directly from Big Sur's glass (2020) but trades the saturated host and heavy blur of the 2020 wave for a near-neutral host, lighter blur, and a faint cyan refraction along panel edges. This palette is the period-correct light-mode register of that 2025 system.

## Signatures

- **Softer `backdropBlur.*` magnitudes (`blur(4px) → blur(20px)`)** — `effect.backdropBlur.sm/md/lg` is `blur(4px) / blur(10px) / blur(20px)` — markedly lighter than classic Glassmorphism's `6 / 14 / 24` and Frutiger Aero's `6 / 14 / 26`. The blur softens the host without obliterating it, which is the whole point of the 2025 register: surfaces stay legible against context rather than hiding it.
- **Sky-cyan refraction tint on `border.default`** — `color.border.default` is `rgba(186, 230, 253, 0.60)` — a faint sky-cyan rather than the hairline-white that classic Glassmorphism uses. The cyan reads as the edge refracting light, the cue that distinguishes Liquid Glass from "white-on-grey rounded rectangle." `border.strong` deepens to `rgba(125, 211, 252, 0.80)`.
- **Top-only inset highlight with lighter outer shadow** — `elevation.low` is `inset 0 1px 0 rgba(255,255,255,0.50), 0 1px 4px rgba(15,23,42,0.08)`, scaling to a `0.65` inset and `0 16px 32px rgba(15,23,42,0.20)` outer at `overlay`. No paired bottom-inset dark line (that's Aero / Frutiger Aero) — just a soft top highlight and a quiet lift. Outer-shadow alphas top out around 0.20, roughly a third of Aero's weight.
- **Cool neutral-grey `surface.base` (`#e6e9f2`)** — Not a saturated host (that's classic Glassmorphism's indigo or Aero's Vista-blue) — a cool neutral grey so the `rgba(255,255,255, 0.28 → 0.68)` `raised`/`overlay` panels read as *material*, not as fog patches over photography. The host is desaturated enough that the cyan border tint is what supplies the refractive cue.
- **San Francisco font stack and Apple's pillier radii** — `typography.family.ui` and `display` lead with `-apple-system, BlinkMacSystemFont, "SF Pro Text" / "SF Pro Display"` — the shipping Apple platform font. `radius.sm/md/lg` is `10 / 14 / 22 px` — Apple's pillier scale, more rounded than classic Glassmorphism. The combination signals "Apple 2025" rather than "Dribbble 2020."

## Anti-signatures

- A saturated indigo or Vista-blue `surface.base` (defeats the neutral-host cue)
- A paired top-inset highlight + bottom-inset dark line (that's Aero / Frutiger Aero)
- Heavy `backdropBlur` at `lg` of 24px or more (this register softened that)
- Pure white hairline borders without the sky-cyan refraction tint
- Inter, Segoe UI, or any non-Apple system font

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.backdropBlur.lg` | `blur(20px)` | `blur(20px)` — softer than classic Glassmorphism's `blur(24px)` and Frutiger Aero's `blur(26px)`. The dialled-back blur is the engine's signature restraint. |
| `color.border.default` | `rgba(186, 230, 253, 0.60)` | Sky-cyan refraction tint `rgba(186, 230, 253, 0.60)`, not hairline-white. The cue that says "Liquid Glass" vs neutral glass. |
| `color.surface.base` | `#e6e9f2` | Cool neutral grey `#e6e9f2` — non-saturated host so white-tinted panels read as material. |
| `elevation.overlay.boxShadow` | `inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 16px 32px rgba(15, 23, 42, 0.20)` | Top-only `inset 0 1px 0 rgba(255,255,255,0.65)` + soft outer `0 16px 32px rgba(15,23,42,0.20)`. No paired bottom inset; alphas are roughly a third of Aero's. |
| `typography.family.ui` | `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif` | San Francisco-led stack — the shipping Apple platform font. |
| `radius.lg` | `22px` | Apple's pillier `22px` — more rounded than classic Glassmorphism's `lg`. |

## Often confused with

### vs [Glassmorphism](./glassmorphism.md)

Classic Glassmorphism commits to a saturated indigo host (`#3b3a8e`) with heavier blur (`blur(24px)` at `lg`) and pure-white hairline borders. Liquid Glass (Light) is the 2025 Apple register: cool neutral-grey host, softer `blur(20px)`, and sky-cyan refraction-tinted borders. Same engine, restraint everywhere — the alpha math has *less* dramatic colour to bite into, on purpose.

### vs [Liquid Glass (Dark)](./liquid-glass-dark.md)

The dark sibling inverts to a near-black `surface.base` (`#0f1218`) and drops `raised` alpha to `0.06–0.14` because adding more white to a dark host stops reading as glass and starts reading as opaque grey. This palette is the light-mode variant: cool grey base with `raised` at `0.28–0.68` alpha.

### vs [Aero Glass](./aero-glass.md)

Aero Glass is the Vista (2007) register on the same engine: saturated Vista-blue host, paired top-inset highlight + bottom-inset dark line for curved gloss, Segoe UI. Liquid Glass (Light) is the Apple 2025 register: neutral-grey host, top-only inset, San Francisco. The engine is identical; the cultural decade and rim recipe are not.

### vs [Frutiger Aero](./frutiger-aero.md)

Frutiger Aero takes a bright aqua-mint host (`#7ee2ce`) with high-alpha cloud-white panels and teal-shadow elevation — late-2000s optimism. Liquid Glass (Light) keeps the host neutral and the shadows ink-grey; nothing about it is tropical.

## Where it thrives

- Modals, drawers, popovers over near-neutral hosts (the engine is tuned for this)
- Sidebars and inspector panels where soft refraction reads as depth
- Cards and segmented controls where SF's pillier radii sing

## Where it degrades

- Tooltips — `caption` size paired with the lightest surface over arbitrary content can fall below AA; README flags this as "most likely to fail"
- Long muted-text passages — `content.muted` at 48% alpha lands near the 4.5:1 threshold over non-light hosts
- Pages with no host control — without the cool grey base, white panels disappear

## Recall aliases

`liquid glass`, `liquid glass light`, `apple liquid glass`, `wwdc25`, `wwdc 2025`

## Long-form notes

<details>
<summary>From <code>palettes/liquid-glass-light.README.md</code></summary>

# Liquid Glass (Light)

Apple WWDC25 register on the Glassmorphism engine. The differentiator
isn't a palette shift — it's restraint. `effect.backdropBlur.*` is dialed
back (`blur(4px) → blur(20px)` vs classic's `6 → 24`), `elevation.*`
drops the deep saturated outer shadows in favor of `rgba(15,23,42,0.08
→ 0.20)` lifts, and `color.border.default` carries a faint sky-cyan tint
(`rgba(186,230,253,0.60)`) so panel edges read as refractive rather than
chalked. `surface.base` is a cool neutral grey (`#e6e9f2`) — the
white-tinted `raised` panels need a non-white host to look like
material. Radii bump up to Apple's pillier scale (`sm 10 → lg 22`).

**A11y:** `experimental`. Body content over `surface.raised`
(`rgba(255,255,255,0.50)` over `#e6e9f2` → roughly `#f3f4f8`) clears AA
for `content.primary` (`#0f172a` ≈ 17:1), but `content.muted` at 48%
alpha lands near the 4.5:1 threshold and degrades fast over any
non-light host that shows through. The aggressive Glass `scrim` is
loosened to `0.24` because Liquid Glass overlays are meant to *show*
context; that loosening is the new contrast hazard.

**Most likely to fail: `Tooltip`.** It pairs the palette's smallest
text role (`caption`, `0.75rem`) with its lightest surface and
deliberately renders over arbitrary host content. Classic Glass papered
over this with high blur and a near-opaque intent fill; Liquid Glass
softens both, so a `caption` over `overlay` over a busy host can fall
below AA in ways the static token math doesn't predict. Components that
need guaranteed legibility (alerts, errors) should use `intent.*` fills,
not `surface.overlay`.

</details>

---

_Generated from `palettes/liquid-glass-light.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
