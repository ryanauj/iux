# Mall-goth

> Late-90s Hot-Topic register on the flat engine — one-shade-off-pure-black field with a magenta-purple cast, blood-red `#a01f2c` accent everywhere, condensed Cinzel serif display, and gig-poster letter-spacing on labels.

**Engine:** `flat` · **A11y:** `experimental`

## Summary

Mall-goth is the flat-engine palette tuned for the Hot-Topic / Cinzel-serif aesthetic. `surface.base` is `#0a0608` — one shade off pure black; `raised` (`#13090f`) lifts with a magenta-purple cast so panels read as "crushed velvet over black" rather than grey. Blood red `#a01f2c` carries `link`, `border.strong`, `border.focus`, and `intent.primary`. `info` collapses to deep violet `#3a1c4a` because the aesthetic doesn't admit a bright accent — every intent stays crepuscular. Tracking on `subheading` / `label` / `caption` is pushed wide (`0.10`–`0.14em`) to mimic gig-poster credits.

## Origin

Late-1990s / early-2000s mall-goth — Hot Topic, Spencer's Gifts, the Vampire: The Masquerade aisle, and the velvet-drape Cinzel-on-poster headline grammar of metal album covers and gig flyers. Sits between gothic subculture and suburban mall consumerism. This palette is the period-correct revival on the flat engine — no glow, no scanline, no glass: just dark velvet and red ink.

## Signatures

- **Near-black field with magenta-purple cast on `raised` (`#13090f` over `#0a0608`)** — The depth between `surface.base` and `surface.raised` is in saturation, not luminance. Both colors are effectively black; `raised` carries a slight magenta-purple bias so panels read as crushed velvet over flat black. `sunken` (`#050204`) is darker still. `overlay` lifts further to `#1a0d14`.
- **Blood-red accent (`#a01f2c` / `#c41e2f`) at link, focus, primary, and `border.strong`** — `content.link = #c41e2f`, `border.strong = #a01f2c`, `border.focus = #c41e2f`, `intent.primary.bg = #a01f2c`. One accent does all the work — there is no secondary accent. `border.subtle` and `border.default` are the same red at 20% / 50% alpha.
- **No bright accents — `info` collapses to deep violet `#3a1c4a`** — Every other flat-engine palette uses cyan or blue for `info`. Mall-goth refuses — `info` lands on deep violet, `success` on forest green `#3a5a32` (not lime), `warning` on oxblood-brown amber `#7a5500`. The whole intent palette stays crepuscular.
- **Condensed serif display (Cinzel / UnifrakturCook / Bodoni Moda)** — `typography.family.display` is `"Cinzel", "UnifrakturCook", "Bodoni Moda", "Trajan Pro", "Times New Roman", serif`. Cinzel is the load-bearing Roman-capitals carved-stone face; UnifrakturCook is the blackletter fallback. `display` weight 700 at 3.75rem with `lineHeight: 0.95` packs the cap-height tight.
- **Wide-tracked uppercase labels (gig-poster credits)** — `subheading` ships `tracking: 0.12em + textTransform: uppercase`; `label` ships `tracking: 0.14em + uppercase`; `caption` ships `tracking: 0.10em + uppercase`. The wide tracking on small uppercase mimics how gig-poster credits and album-liner notes are typeset — credits as widely-spaced caps, not body case.
- **Tightened `space.*` scale crowds panels** — `space.1 = 2px`, `space.4 = 14px`, `space.8 = 56px` — every step ~25% tighter than Flat / Classic. Panels pack closer the way the aesthetic crowds the page with overlapping flyers and patch-jackets.

## Anti-signatures

- A bright cyan / sky-blue `info` — defeats the crepuscular palette rule
- A geometric sans like Inter or Space Grotesk on display — Cinzel serif is load-bearing
- Light-mode surfaces — Mall-goth is dark-only, with magenta-cast near-blacks
- Hard offset block shadows or scanline overlays — Mall-goth is on the flat engine, not Cel-shaded / CRT
- Tight body tracking on labels — Mall-goth pushes wide caps tracking on every small role

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#0a0608` | `#0a0608` — one shade off pure black, the mall-goth field. |
| `color.surface.raised` | `#13090f` | `#13090f` — the magenta-purple cast on `raised` reads as crushed velvet. |
| `color.intent.primary.bg` | `#a01f2c` | `#a01f2c` blood red — the single accent the palette commits to. |
| `color.intent.info.bg` | `#3a1c4a` | `#3a1c4a` deep violet — the refusal of a bright accent on `info`. |
| `color.border.focus` | `#c41e2f` | `#c41e2f` blood-red focus ring, matches `content.link`. |
| `typography.family.display` | `"Cinzel", "UnifrakturCook", "Bodoni Moda", "Trajan Pro", "Times New Roman", serif` | Cinzel / UnifrakturCook / Bodoni Moda serif stack — condensed Roman-capitals carved-stone face. |
| `typography.role.label.tracking` | `0.14em` | `0.14em` with `textTransform: uppercase` — gig-poster credits tracking on every label. |
| `space.1` | `2px` | `2px` — the tightened space scale (Flat / Classic uses `4px` at the same step). |

## Often confused with

### vs [Cyberpunk Neon-Noir](./cyberpunk-neon-noir.md)

Both run dark fields, but Cyberpunk Neon Noir paints neon-cyan / magenta accents with glow + bloom recipes — decoration is light. Mall-goth strips every bright color out (no cyan, no lime; `info` collapses to violet, `success` to forest green) and commits to a single blood-red accent with serif display. Cyberpunk glows; mall-goth absorbs.

### vs [Tron / Dark-Neon](./tron-dark-neon.md)

Tron is the glassmorphism engine in a dark register with a single cyan glow accent + inset-stroke + outer-glow elevation. Mall-goth is the flat engine on near-black with a single red accent and no glow at all — `effect.glow` and `backdropBlur` are zeroed. The two share "single dark + single accent" framing but the engine signals diverge.

### vs [CRT / Phosphor (Green)](./crt-phosphor-green.md)

CRT/Phosphor (Green) is the engine-level tube simulation — scanline overlay, phosphor bloom, decay regime, and every slot resolving to one phosphor color. Mall-goth has none of that — flat engine, no overlay, no glow, no decay. The "near-black field" feel is shared; everything underneath is different.

## Where it thrives

- Cards, Modals, Drawers — `raised` magenta cast over near-black `base` reads as crushed velvet
- Buttons / Toggles with `intent.primary` — single blood-red accent is what the palette is for
- Heading and display roles — Cinzel serif at 3.75rem is the gig-poster headline

## Where it degrades

- PropertyInspector — `caption` muted on `sunken` drops below AA on dense rows (README flags this as most likely to fail)
- Dense tables — tightened `space.*` crowds rows and muted alpha falls on `raised` panels
- Components that need to distinguish `primary` and `danger` — both intents are dark reds differing only by luminance
- Long muted-text paragraphs — `content.muted` at 44% alpha falls near AA on every non-`base` surface

## Recall aliases

`mall-goth`, `mall goth`, `goth`, `hot topic`, `gothic`, `velvet goth`

## Long-form notes

<details>
<summary>From <code>palettes/mall-goth.README.md</code></summary>

# Mall-goth

Flat engine on a near-black field tuned for deep purple and blood
red. `surface.base` (`#0a0608`) is one shade off pure black; `raised`
(`#13090f`) lifts with a slight magenta-purple cast so panels read as
"crushed velvet over black" rather than grey. The accent is blood red
(`#a01f2c` / `#c41e2f`) used for `link`, `border.strong`,
`border.focus`, and the `primary` intent. `info` collapses to a deep
violet (`#3a1c4a`) rather than the usual cyan-blue because the
aesthetic doesn't admit a bright accent — every intent stays
crepuscular, including `warning` (oxblood-brown amber) and `success`
(forest green, not lime).

Display family is a condensed serif (Cinzel with UnifrakturCook /
Bodoni Moda fallbacks) and tracking on labels/captions is pushed wide
(`0.10–0.14em`) to mimic gig-poster credits. `space.*` is one notch
tighter than Flat / Classic (`1 → 2px`, `4 → 14px`, `8 → 56px`) to
crowd panels the way the aesthetic crowds the page. `elevation.*`
stays subtle (dark drop shadows that sink into the background rather
than lift off it) — the visual depth is in the saturation difference
between `base` and `raised`, not in light simulation.

**A11y:** `experimental`. `content.primary` `#e8d4dc` on `base` ≈ 14:1
— clears AAA. `content.muted` at 44% alpha lands ≈ 5.2:1 on `base` but
drops to ≈ 4.0:1 on `surface.raised` and ≈ 3.6:1 on `intent.neutral.bg`
— below AA on the raised panel. `intent.primary` blood red `#a01f2c`
with content `#f5e3e8` ≈ 6.0:1 — AA. `intent.danger` deep oxblood
`#5a0510` with the same content ≈ 11:1 — AAA, but the difference
between `primary` and `danger` is just luminance, no hue shift, so the
two intents are hard to tell apart even though both individually pass
contrast.

**Most likely to fail: `PropertyInspector`.** The inspector renders
dense rows of `caption`-sized `content.muted` labels against
`surface.sunken`. With the palette's tightened `space.*` scale, row
padding drops to `space.2` (`6px`) — small text + crowded row + 44%-
alpha muted on near-black sunken puts the labels below AA *and*
defeats the eye-tracking pattern that lets a user scan a property
table. The condensed display serif also doesn't read well at
`caption` size when small-caps would help. Components doing dense
property lists in this palette should promote labels from `caption`
to `label` (smaller weight bump, wider tracking already in the
palette) and from `muted` to `secondary`, and prefer `surface.raised`
over `sunken` for the row background.

</details>

---

_Generated from `palettes/mall-goth.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
