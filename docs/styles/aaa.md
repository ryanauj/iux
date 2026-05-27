# High-Contrast AAA

> WCAG AAA enforced at the palette level — pure black on pure white, every `motion.duration.*` set to `'0ms'`, and a 3px `double` link-blue focus ring as the load-bearing signature.

**Engine:** `flat` · **A11y:** `pass`

## Summary

High-Contrast AAA is the accessibility-first register of the flat engine. `surface.*` is uniformly `#ffffff` (no tonal layering — every depth slot is the same white), `content.primary` is `#000000`, and `body` is bumped to `1.125rem / weight 500` so default text is legible without zoom. Every `motion.duration.*` slot is `'0ms'` and every easing is `linear` — decorative motion is removed at the palette level. The defining signature is a 3px `double` focus ring in CSS link-blue (`#0000ee`); elevation collapses to `'none'` everywhere except `overlay`, which gets a hard `0 0 0 2px #000000` stroke instead of a soft drop shadow.

## Origin

WCAG 2.x AAA (the 7:1 contrast tier for body text) and the older accessibility-first interface tradition that preceded it — government, banking, and assistive-technology UIs where contrast and clarity are functional requirements rather than stylistic choices. The CSS-default `#0000ee` link colour and the `double` focus ring register as deliberate quotation of the browser's un-overridden defaults.

## Signatures

- **3px `double` focus ring in CSS link-blue — THE signature** — `effect.focusRing` is `{ width: '3px', offset: '2px', color: '#0000ee', style: 'double' }`. Every other palette in the system uses `style: 'solid'`; AAA is the only one that uses `'double'`. The doubled ring is structurally redundant and that's the point — the focus state has to read for users who can't rely on hue alone.
- **Every `motion.duration.*` is `'0ms'`** — `motion.duration.instant`, `fast`, `base`, and `slow` are all `'0ms'`; every easing is `linear`. The palette removes decorative motion at the design-token level so vestibular-sensitive users never encounter a transition they didn't opt into.
- **Pure black on pure white with no tonal surface layering** — `surface.base`, `surface.raised`, `surface.sunken`, `surface.overlay` are all `#ffffff`. `content.primary` is `#000000` — 21:1 contrast, the ceiling. No grey card-on-page, no muted second tone — depth is organised by borders and whitespace, never by tonal layering.
- **`body` size and weight bumped for legibility** — `typography.role.body.size` is `1.125rem` (Flat / Classic's body is `1rem`) and `weight` is `500` (Flat / Classic is `400`). The minimum readable defaults are raised at the palette so individual components don't have to opt in.
- **Hard 2px black `overlay` stroke instead of a drop shadow** — `elevation.overlay.boxShadow` is `0 0 0 2px #000000` — a stroke, not a blur. Modals and popovers separate from the page with a hard black ring rather than a soft shadow that would lose its edge for low-vision users.

## Anti-signatures

- Any non-`linear` easing or non-`0ms` duration on `motion.duration.*`
- A `solid` focus ring — the `double` ring is the load-bearing accessibility cue
- Muted or low-contrast text in a content position (`content.muted` is `#333` on white at 12.6:1, still AAA — anything lighter breaks the palette)
- Tonally-layered surfaces (a grey `surface.sunken` against a white `base`) — every surface slot must stay `#ffffff`
- A soft drop shadow on any elevation slot

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.focusRing.style` | `double` | `'double'` — the only palette in the system that uses double; every other palette is `'solid'` or `'glow'`. |
| `effect.focusRing.color` | `#0000ee` | `#0000ee` — the CSS default link-blue. Deliberate quotation of the un-overridden browser focus colour. |
| `motion.duration.fast` | `0ms` | `'0ms'` — every duration slot is zero. Decorative motion is removed at the palette level. |
| `typography.role.body.size` | `1.125rem` | `1.125rem` — bumped above Flat / Classic's `1rem` so default body is legible without zoom. |
| `typography.role.body.weight` | `500` | `500` — heavier than Flat / Classic's `400` for stroke-weight legibility at small sizes. |
| `elevation.overlay.boxShadow` | `0 0 0 2px #000000` | `0 0 0 2px #000000` — a hard stroke, not a soft drop shadow. |
| `color.surface.raised` | `#ffffff` | `#ffffff` — identical to `surface.base`. No tonal layering between surface slots. |

## Often confused with

### vs [Flat / Classic](./flat-classic.md)

Flat / Classic is the unornamented baseline: solid `#1d4ed8` blue accent, `body` at `1rem / 400`, `motion.duration.fast: '140ms'`, a `solid` 2px focus ring, and soft drop shadows on elevation. AAA replaces all five: CSS link-blue `#0000ee`, body at `1.125rem / 500`, every duration `'0ms'`, a `double` 3px focus ring, and a hard 2px stroke on `overlay` instead of a drop shadow.

### vs [Swiss / International Style](./swiss-international.md)

Swiss / International also uses pure black on pure white with a single accent, but its accent is signal red (`#e30613`) and its focus ring is `solid` red 2px. AAA uses CSS link-blue with a `double` 3px ring and zeroes every motion duration — the contrast-tier compliance is the brief, not typographic modernism.

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia hits AA on body (5.4:1 link blue, 17:1 body) but doesn't pin every motion duration to zero, doesn't bump body to `1.125rem / 500`, and uses a `solid` 2px focus ring. AAA enforces the AAA contrast tier and removes decorative motion at the token level.

## Where it thrives

- Government, banking, and assistive-technology UIs where the contrast tier is a contractual requirement
- Form-heavy interfaces where focus-state legibility is functional
- Reading interfaces for users with low vision — the `1.125rem / 500` default does the work without per-component overrides

## Where it degrades

- Brand-marketing pages — the palette refuses a second hue, soft shadows, decorative motion
- Data dashboards with many categorical intents — every non-`danger` intent collapses toward neutral and reads similar
- Animated onboarding flows — every motion duration is `0ms`, so transitions snap

## Recall aliases

`aaa`, `high contrast`, `wcag aaa`, `high-contrast`, `accessibility`, `high contrast aaa`

## Long-form notes

<details>
<summary>From <code>palettes/aaa.README.md</code></summary>

# High-Contrast AAA

Pure black on pure white. `body` is bumped to `1.125rem / 500` and `space.*` is
tightened one notch from Flat / Classic to keep keyboard density tolerable
without sacrificing the larger type. Decorative motion is removed at the
palette level: every `motion.duration.*` slot is `'0ms'` — no transitions, no
ease curves that mean anything. The defining feature is a 3px `double` focus
ring in CSS `link blue` (`#0000ee`); elevation collapses to `'none'` everywhere
except `overlay`, which gets a hard 2px black "shadow" stroke instead of a soft
drop shadow.

**A11y:** `pass` (WCAG AAA on all body and intent text). `content.primary` on
`surface.base` = 21:1. The lowest-contrast intent — `warning` `#7a4a00` with
white `inverse` content — sits at ≈ 7.9:1, above the 7:1 AAA threshold for
body text. `content.muted` (`#333333` on white ≈ 12.6:1) stays AAA even as
decorative placeholder text.

</details>

---

_Generated from `palettes/aaa.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
