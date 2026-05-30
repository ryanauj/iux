# Art Deco / Ivory

> Daylight inversion of `art-deco` — the same Gatsby Flat-engine register, flipped onto warm ivory: champagne gold and emerald-teal ink on a cream invitation card instead of metallic foil on a lacquered theatre lobby.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Art Deco / Ivory is the Daybreak twin of `art-deco`. Every load-bearing move carries over — Poiret One / Limelight display serif, uppercase tracking at `0.04em`, three-family typography, champagne gold accent — but the colour story inverts. `surface.base` flips from teal-black `#0e2027` to warm ivory `#f4ecd8`; `content.primary` flips from cream `#e8dcc0` to deep emerald-teal `#10302c`. The champagne `intent.primary.bg` (`#c8a96a`) survives the inversion, but `content.link` and `border.strong` shift to a deeper gold-bronze `#9a7b2e` because the brighter champagne disappears on a cream field. Elevation shadows tint warm umber (`rgba(40, 30, 14, ...)`) rather than the original's teal-black.

## Origin

The same 1925 Exposition Internationale des Arts Décoratifs lineage as `art-deco`, but in the Deco vocabulary that ran on ivory invitation stock and Vogue interior plates rather than on lacquered theatre lobbies. Engraved-invitation gold-on-cream — the inversion the period itself used for stationery and society pages.

## Signatures

- **Warm ivory `surface.base` (`#f4ecd8`) with emerald-teal `content.primary` (`#10302c`)** — The Daybreak inversion of the dark twin's colour story. `surface.base` lifts to warm cream (`#f4ecd8`); `surface.raised` goes brighter cream (`#faf3e2`); `surface.sunken` darkens to `#e9dfc6` for input wells. `content.primary` is the dark twin's `surface.base` register promoted to the foreground — emerald-teal ink on cream rather than cream on teal-black. Same engine, opposite tonal direction.
- **Champagne gold `intent.primary.bg` (`#c8a96a`) with deep-teal inverse content** — Champagne gold survives the inversion verbatim — `#c8a96a` is the same accent as the dark twin. What changes is the reading: gold on cream, foil on ivory invitation card. The inverse content stays deep teal (`#10302c`) so the engraved-invitation contrast holds.
- **Gold-bronze `content.link` and `border.strong` (`#9a7b2e`)** — The link / border accent shifts from the dark twin's bright champagne (`#c8a96a`) to a deeper gold-bronze (`#9a7b2e`). Bright champagne disappears against cream — the darker bronze keeps the link affordance legible on the ivory field. `effect.focusRing.color` follows to the same bronze.
- **Geometric Deco serif on `display` at uppercase tracking (carried from dark twin)** — `typography.family.display` is `"Poiret One", "Limelight", "Bodoni 72", "Didot", "Georgia", serif`. The display, title, and heading roles all run `uppercase` with `0.04em` / `0.03em` / `0.02em` tracking. Three-family typography rule (Poiret display + Inter UI + IBM Plex mono) is shared with the dark twin.
- **Warm umber elevation shadows (`rgba(40, 30, 14, 0.14 → 0.22)`)** — `elevation.low` is `0 1px 2px rgba(40, 30, 14, 0.14)` — shadows tint toward the ivory's warm umber, not the dark twin's teal-black `rgba(8, 16, 22, ...)`. Cards lift as pressed gold-stamping on cream rather than as panels above a lacquered field.

## Anti-signatures

- A teal-black `surface.base` — that's the dark `art-deco` twin
- A pure-white `surface.base` (cream-with-warmth is the Daybreak field — the ivory tone is load-bearing)
- Cool teal-black shadow tinting — would defeat the warm umber paper register
- Sentence-case headings — Deco display vocabulary is caps-only regardless of dark/light
- A sans-serif display family — breaks the shared three-family Deco rule

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f4ecd8` | Warm ivory `#f4ecd8` — the Daybreak inversion of the dark twin's teal-black `#0e2027`. |
| `color.content.primary` | `#10302c` | Deep emerald-teal `#10302c` — the dark twin's field colour promoted to the foreground. |
| `color.intent.primary.bg` | `#c8a96a` | Champagne gold `#c8a96a` — the Deco accent, carried verbatim from the dark twin. |
| `color.content.link` | `#9a7b2e` | Gold-bronze `#9a7b2e` — darker than the dark twin's `#d8b97a` because bright champagne disappears on cream. |
| `color.border.strong` | `#9a7b2e` | Gold-bronze `#9a7b2e` — same bronze as `content.link`, the cream-readable Deco accent. |
| `typography.family.display` | `"Poiret One", "Limelight", "Bodoni 72", "Didot", "Georgia", serif` | `"Poiret One", "Limelight", "Bodoni 72", "Didot", "Georgia", serif` — the geometric Deco serif, identical to dark twin. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(40, 30, 14, 0.14)` | `0 1px 2px rgba(40, 30, 14, 0.14)` — warm-umber shadow tinting rather than the dark twin's teal-black. |

## Often confused with

### vs [Art Deco / Gatsby](./art-deco.md)

The dark twin. Same Flat engine, same Poiret/Limelight display serif, same uppercase tracking, same champagne accent. Inverts only the colour story: teal-black field → ivory cream field; cream content → emerald-teal content; bright champagne link → darker gold-bronze link; teal-black shadow → warm-umber shadow.

### vs [Editorial](./editorial.md)

Editorial is the magazine-spread light register on the Flat engine — high-contrast neutral white with serif body for long-form reading. Art Deco / Ivory commits to the 1920s ornament-and-symmetry vocabulary: warm-ivory (not neutral white) field, geometric Deco serif (not transitional book serif), uppercase-tracked display, champagne accent. Different period, different display vocabulary.

### vs [Cardstock (Layered)](./cardstock-layered.md)

Cardstock layered uses warm paper surfaces and layered shadows to read as physical pressed cardstock. Art Deco / Ivory shares the warm paper field but routes display through the geometric Deco serif at uppercase tracking and uses champagne gold as the load-bearing accent — the period costume is the differentiator.

### vs [Modern Royal](./modern-royal.md)

Modern Royal is a dark-field warm-metallic Flat configuration (aubergine + antique gold + Cormorant). Art Deco / Ivory is the same engine family inverted onto warm cream — the colour story flips, the display vocabulary stays Deco.

## Where it thrives

- Hospitality landing pages and event invitations — gold-on-cream reads as engraved stationery
- Long-form Inter body paired with caps-tracked Poiret display headers
- Buttons and tag badges in the champagne intent fill on the cream ground

## Where it degrades

- Dense data tables (caps-tracked display + warm field reduce density legibility)
- Photographic content (the warm-ivory field clashes with cool photography)

## Recall aliases

`art deco ivory`, `art deco light`, `deco ivory`, `deco daybreak`, `ivory deco`, `gatsby light`, `gatsby ivory`

---

_Generated from `palettes/art-deco-ivory.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
