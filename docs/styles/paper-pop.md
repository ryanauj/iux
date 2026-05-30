# Paper Pop

> Minimal light register on the Flat engine — pure white surfaces, near-monochrome neutrals, and a single electric-cobalt accent (`#2563eb`) doing all the talking.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Paper Pop is the one-accent-restraint configuration of the Flat engine. `surface.base` and `surface.raised` are both pure `#ffffff`; `sunken` drops to a near-imperceptible `#f5f6f8`; every neutral stays grayscale so the single electric cobalt (`#2563eb`, reused at `intent.primary.bg` / `content.link` / `border.focus`) reads as a deliberate pop rather than one voice among many. Secondary intents stay present but desaturated (green-700, amber-700, red-700, cyan-700) so they communicate state without competing with the cobalt. Inter at every role with soft elevation shadows (`rgba(17, 17, 19, 0.06 → 0.14)`) keeps the chrome quiet.

## Origin

The post-2020 product-landing register popularised by Stripe, Linear, and Vercel marketing sites — pure-white paper-stock surfaces, near-monochrome neutrals, and a single saturated accent treated as the brand voice. The lineage runs through Swiss minimalism but commits to one bright hue rather than to pure black-on-white.

## Signatures

- **Single electric-cobalt accent (`#2563eb`) for primary, link, and focus** — `intent.primary.bg`, `content.link`, and `border.focus` all share `#2563eb` — the one bright hue in the palette. Every other neutral stays grayscale (`#111113 / #3f4147 / #73767e / #9da2ab`), so the cobalt reads as deliberate rather than as one accent among many. The single-accent restraint is the load-bearing move.
- **Pure-white `surface.base` and `surface.raised` (no off-white, no warmth)** — `surface.base`, `surface.raised`, and `surface.overlay` are all `#ffffff`; `surface.sunken` drops to `#f5f6f8` — a barely-visible neutral grey, not warm cream. The field is cold paper stock; Studio Confetti and Soft Pastel both warm the ground, Paper Pop does not.
- **Desaturated secondary intents (deep green/amber/red/cyan, not bright)** — `intent.success.bg` is `#15803d`; `warning` is `#b45309`; `danger` is `#b91c1c`; `info` is `#0e7490`. Every secondary sits at the 700-level (deep, not bright) so it communicates state without competing with the cobalt primary. Studio Confetti runs the same set at full saturation; Paper Pop ratchets them down.
- **Soft elevation at low alpha (`rgba(17, 17, 19, 0.06 → 0.14)`)** — `elevation.low` is `0 1px 2px rgba(17, 17, 19, 0.06)`, scaling to `0 20px 36px rgba(17, 17, 19, 0.14)` at `overlay`. The shadow alpha is roughly half of Studio Confetti's — Paper Pop's restraint extends to depth, not just colour. Cards lift quietly.
- **Restrained radius (`sm 5px / md 8px / lg 12px`)** — `radius.*` keeps a measured corner curve — small enough to read as crisp paper-stock, not so generous that the palette reads as pastel. Studio Confetti goes `8/14/22`; Soft Pastel goes `6/12/20`; Paper Pop stops short of both.

## Anti-signatures

- A second saturated accent competing with the cobalt — Paper Pop runs one bright hue, not a confetti set
- Warm or off-white `surface.base` — that's Studio Confetti or Soft Pastel territory
- Heavy elevation shadows — Paper Pop's depth is deliberately quiet
- A serif `display` family — Inter at every role is the load-bearing typography move
- Generous round-the-clock radius (≥ 16px) — sharp paper-stock reads, not pastel

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.intent.primary.bg` | `#2563eb` | `#2563eb` — the single electric cobalt. Reused at `content.link` and `border.focus`; load-bearing single-accent. |
| `color.surface.base` | `#ffffff` | `#ffffff` — pure white, not warm cream. Cold paper-stock field. |
| `color.surface.sunken` | `#f5f6f8` | `#f5f6f8` — a near-imperceptible neutral grey, not warm. |
| `color.intent.success.bg` | `#15803d` | `#15803d` — deep green-700, not bright. Desaturated so it doesn't compete with the cobalt. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(17, 17, 19, 0.06)` | `0 1px 2px rgba(17, 17, 19, 0.06)` — low-alpha shadow; Studio Confetti runs the same recipe at higher alpha. |
| `radius.md` | `8px` | `8px` — restrained corner curve; Studio Confetti goes `14px`, Soft Pastel goes `12px`. |
| `typography.family.display` | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Inter — same as `family.ui`. No serif anywhere; the one-typeface restraint matches the one-accent restraint. |
| `effect.focusRing.color` | `#2563eb` | `#2563eb` — the cobalt reused at focus. |

## Often confused with

### vs [Studio Confetti](./studio-confetti.md)

Studio Confetti and Paper Pop share the Flat-engine playful-light-register vocabulary, but Confetti runs the full intent set at full saturation (rose `#e11d48`, grass `#16a34a`, amber `#d97706`, sky `#2563eb`) as a confetti accent palette, on a warm `#fdfcf9` ground. Paper Pop commits to one cobalt accent and routes secondaries through desaturated 700-level variants on pure-white. One-accent vs many-accent is the load-bearing distinction.

### vs [Flat / Classic](./flat-classic.md)

Flat / Classic is the unornamented baseline — system fonts, neutral cards, gentle shadows. Paper Pop is the "branded baseline" — the same engine plus an opinionated single-accent restraint and Inter (not system stack) as the typography commitment. Both ship cobalt as the primary; Paper Pop tightens the secondary intents to desaturated 700s so the cobalt keeps the spotlight.

### vs [Linear Workspace](./linear-workspace.md)

Linear Workspace is the dense-app register for the same lineage — tighter density, dedicated indigo accent, monochrome chrome. Paper Pop is the marketing-page register: pure-white surfaces, larger radii, gentler elevations, the cobalt accent reading as a hero pop rather than as in-product chrome.

### vs [Vercel Geist](./vercel-geist.md)

Vercel Geist is the near-monochrome black-and-white register with Geist Sans typography. Paper Pop shares the pure-white field and Inter-only typography rule but commits to a saturated cobalt accent rather than to the pure-mono restraint.

## Where it thrives

- Product landing pages and marketing sites — one cobalt on pure white reads as a deliberate brand voice
- Buttons and CTAs — the cobalt primary lands as the obvious action on every screen
- Long-form Inter body paired with Inter display headers — single-family typography matches the single-accent restraint

## Where it degrades

- Forms and dashboards that need many co-equal intent colours — the cobalt dominates the secondaries by design
- Dark-mode needs — Paper Pop is light-only by construction
- Brands whose voice is warmth or playfulness — the cold pure-white ground reads as utility

## Recall aliases

`paper pop`, `paper-pop`, `pop`, `cobalt pop`, `one-accent`, `one accent`, `minimal cobalt`

---

_Generated from `palettes/paper-pop.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
