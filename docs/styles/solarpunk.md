# Solarpunk

> Eco-utopian register — sun-bleached cream field, leaf-green `intent.primary`, solar-amber `intent.warning`, sky-cyan `intent.info`, Quicksand humanist-rounded display, widened `radius.*`.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Solarpunk is the eco-utopian register on the Flat engine. Sun-bleached cream (`#f6f1de`) fills `surface.base`; leaf green (`#2f7a32`) carries `intent.primary` (and `intent.success` reuses it — "go ahead" and "growing thing" are the same affordance); solar amber (`#a07210`) carries warning; sky cyan (`#1f7a9c`) carries info. Quicksand humanist-rounded display contrasts the saturated organic palette. `radius.*` widens to `sm: 6px / md: 10px / lg: 16px` so the organic-shapes cue rides the corners too.

## Origin

The "solarpunk" speculative-fiction / design movement, c.2014–present — a deliberate counter-aesthetic to cyberpunk's dystopian dark register, drawing on eco-optimist science fiction (Kim Stanley Robinson, Becky Chambers) and on cottagecore visual vocabularies. The colour vocabulary is pulled from the natural world: chlorophyll greens, late-afternoon solar amber, clear-sky cyan, pomegranate-red as the only "alert" colour.

## Signatures

- **Leaf-green `intent.primary` reused as `intent.success`** — `intent.primary.bg` and `intent.success.bg` are both `#2f7a32` — the palette treats "go ahead" and "growing thing" as the same affordance, the same way Tokyo / Day treats "go" and "primary" as the same JR-East green. The duplication is intentional and load-bearing.
- **Widened `radius.*` for organic shapes** — `radius.sm: '6px'`, `md: '10px'`, `lg: '16px'` — wider than Flat / Classic by ~50%. Rounded corners are part of the "organic shapes, not engineering grids" cue. The widened radii are the second load-bearing move after the leaf-green primary.
- **Quicksand humanist-rounded display + Inter body** — `typography.family.display` is Quicksand (Comfortaa fallback) — chunky rounded counters cue organic rather than industrial. `family.body` is Inter for long-form reading. The two-family rule pairs rounded display + clean sans body.
- **Solar-amber `warning` darkened past `#c48a14` for contrast** — `intent.warning.bg` is `#a07210` — pulled two shades down from the un-printable `#c48a14` so cream inverse content clears 3:1. The original brighter amber was the brief; the contrast gate caught it. Documented as the canonical example of "brief vs gate" in the showcase.

## Anti-signatures

- Saturated-bright "candy" greens or yellows — solarpunk pulls from natural pigments, not screen primaries
- Tight zero-radius cards — the organic-shapes cue lives in the corners
- A geometric mono `display` family — that's industrial vocabulary, not organic
- A separate `intent.success` distinct from `intent.primary` — they're intentionally the same

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.intent.primary.bg` | `#2f7a32` | Leaf green `#2f7a32` — mid-canopy hardwood green. |
| `color.intent.success.bg` | `#2f7a32` | Leaf green `#2f7a32` — intentionally reused from `intent.primary`. |
| `color.intent.warning.bg` | `#a07210` | Solar amber `#a07210` — pulled darker to clear the 3:1 contrast floor. |
| `radius.lg` | `16px` | `'16px'` — widened corners for the organic-shapes cue. |
| `typography.family.display` | `"Quicksand", "Comfortaa", "Nunito", "Avenir Next", "Inter", system-ui, sans-serif` | Quicksand — humanist-rounded display with chunky counters. |

## Often confused with

### vs [Desert Modernism](./desert-modernism.md)

Both are warm-paper Flat palettes with multiple climate-correct intents. Desert Modernism pulls terracotta + pool turquoise + palm green (Palm Springs register). Solarpunk pulls leaf green + solar amber + sky cyan (forest / canopy register). Different climate zone, different intent vocabulary; both reuse `intent.primary` as `success` in Solarpunk's case.

### vs [Cyberpunk Neon-Noir](./cyberpunk-neon-noir.md)

Solarpunk is the deliberate counter-aesthetic. Cyberpunk: near-black rainy-window field, magenta + cyan dual-accent borders, glow elevation, Glassmorphism engine (dystopian register). Solarpunk: sun-bleached cream field, leaf-green primary, soft drop shadows, Flat engine (eco-utopian register). The pair is meant to be read together — opposite tonal poles of speculative-fiction visual culture.

### vs [Mid-century modern](./mid-century-modern.md)

Mid-century-modern is the cream-paper Eames-textile register: walnut + teal + mustard accents with an atomic-dot field overlay. Solarpunk is the cream-paper eco-utopian register: leaf-green + solar-amber + sky-cyan, no overlay. Both lean rounded; Solarpunk pushes corners further (`lg: 16px` vs Mid-century's `8px`) and the organic vocabulary is contemporary, not retrofuturist.

## Where it thrives

- Sustainability dashboards, urban-agriculture / community-garden interfaces
- Editorial sites covering climate, ecology, regenerative-design topics
- Long-form Inter body on `surface.raised` paired with rounded Quicksand headings

## Where it degrades

- Enterprise / corporate finance contexts where the eco vocabulary reads as off-brand
- Dense data tables (widened radii eat horizontal space on tight rows)

## Recall aliases

`solarpunk`, `eco`, `utopian`, `green`, `sustainable`

## Long-form notes

<details>
<summary>From <code>palettes/solarpunk.README.md</code></summary>

# Solarpunk

Eco-utopian register on the Flat engine. Soft sun-bleached cream field,
leaf-green primary, solar-amber warning, sky-cyan info — a saturated
organic palette pulled from chlorophyll, daylight, and clean water
rather than from a brand guideline.

`surface.base` is soft sun-bleached cream (`#f6f1de`); `surface.raised`
is `#fdfaee` (a fresh page in afternoon shade); `surface.sunken` drops
to `#e8e0c2` for input wells. The cream is warmer than Editorial /
Newspaper but cooler than Desert Modernism — a sunlit-but-not-baked
register.

The four organic intents:

- `intent.primary` is leaf green (`#2f7a32`) — the saturated mid-canopy
  green of a hardwood in May
- `intent.warning` is deep solar amber (`#a07210`) — pulled two shades
  down from the un-printable `#c48a14` so cream inverse content clears
  the 3:1 floor on the saturated fill. The original brighter amber was
  the brief; the gate caught it.
- `intent.info` is sky cyan (`#1f7a9c`) — a saturated mid-cyan that
  reads as "clear sky," distinct from pool turquoise (Desert Modernism)
  and Riso blue (Risograph)
- `intent.danger` is pomegranate (`#9c1f2e`) — the only red on the
  palette, so it reads as urgent without competing with the warmth
  register

`intent.success` reuses `intent.primary`'s leaf green — the palette
treats "go ahead" and "growing thing" as the same affordance, the same
way Tokyo / Day treats "go" and "primary" as the same JR-East green.

`typography.family.display` is Quicksand (Comfortaa fallback) — a
humanist-rounded sans with chunky rounded counters that cue "organic,
not industrial." `family.body` is Inter for long-form reading. The two-
family rule pairs rounded display + clean sans body.

`radius.*` widens compared to Flat / Classic — `sm: '6px'`, `md: '10px'`,
`lg: '16px'`. Rounded corners are part of the organic-shapes-not-
engineering-grids cue. The widened radii are the second load-bearing
move (after the leaf-green primary).

`elevation.*` uses a green-tinted shadow (`rgba(40, 70, 30, 0.10)`) so
cards lift as canopy leaves on dappled-light cream paper, not as
neutral panels against grey. The shadow recipe matches Flat / Classic;
only the tint shifts.

`motion.easing.spring` is a softer overshoot (`cubic-bezier(0.34, 1.5,
0.64, 1)`) — the organic register reads as "settling like a leaf"
rather than "snapping to grid." Durations also stretch one tier
(`base: '240ms'`, `slow: '400ms'`).

**A11y:** `pass`. `content.primary` (`#1d2818`) on `surface.base`
(`#f6f1de`) ≈ 13:1 (AAA). `intent.primary` leaf green on cream inverse
≈ 6.8:1 (AAA at large sizes, AA at body). `intent.warning` solar amber
on cream inverse ≈ 4.4:1 (AA body). `intent.info` sky cyan on cream
inverse ≈ 5.5:1 (AAA at large sizes, AA at body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
elevation tint, motion easing, and a humanist-rounded typography stack.

</details>

---

_Generated from `palettes/solarpunk.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
