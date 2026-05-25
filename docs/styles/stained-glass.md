# Cathedral / Stained Glass

> Gothic-window register — lead-black field, five jewel-tone intents (amethyst / cobalt / emerald / amber / ruby), heavy lead `border.*` as load-bearing geometry.

**Engine:** `flat` · **A11y:** `experimental`

## Summary

Cathedral / Stained Glass is the medieval-rose-window register on the Flat engine. Lead-black (`#0d0a14`) fills `surface.base`; five saturated jewel-tone intents (amethyst `#6a2ea0`, cobalt `#1f4ec8`, emerald `#1f7a4a`, amber `#c4801a`, ruby `#a8221a`) carry primary / info / success / warning / danger. Heavy lead borders (`#2a2436` at 2 px, `#3e364e` at 3 px) make `border.*` the load-bearing geometry — the lead came is the structure, the colour is the light coming through. Cinzel display caps at `0.05em` tracking carry the cathedral-inscription register.

## Origin

The high-Gothic stained-glass window tradition, c.1140–1250 — the great rose windows of Chartres, Notre-Dame, and Sainte-Chapelle. The colour vocabulary maps directly to historical jewel-glass families: cobalt is the most common 12th-century blue, ruby is the high-iron red, emerald is the spring leading, amber is the rare gold-lead panel, amethyst is the rose-window centre. Cinzel display is a digital revival of the carved-stone Roman cap inscription register that paired with Gothic glass on church facades.

## Signatures

- **Five saturated jewel-tone intents on a lead-black field** — `intent.primary` amethyst `#6a2ea0`, `info` cobalt `#1f4ec8`, `success` emerald `#1f7a4a`, `warning` amber `#c4801a`, `danger` ruby `#a8221a`. Every intent stays at jewel-glass saturation. The five-colour set evokes a Chartres rose window directly.
- **Heavy lead `border.*` as load-bearing geometry** — `border.default` `#2a2436` at `borderWidth.thin: 2px`; `border.strong` `#3e364e` at `borderWidth.thick: 3px`. The lead came is structural, not decorative — every Card and Modal gets a real leaded outline rather than a hairline rule. The first palette in the set where `border.*` carries visual load comparable to `intent.*`.
- **Cinzel display caps at uppercase tracking** — `typography.family.display` is Cinzel (carved-stone Roman caps revival); display / title / heading run `uppercase` with `0.05em` / `0.04em` / `0.03em` tracking. UnifrakturMaguntia would crush at digital reading sizes; Cinzel carries the cathedral-inscription register without the legibility cost.
- **Zero-radius cards (leaded-glass joinery)** — `radius.sm` and `radius.md` are `'0'`; `lg` is `'2px'`. Leaded-glass joinery is straight cuts, never curves. `pill` stays at `'999px'` for tags that need it.

## Anti-signatures

- Pure-black `surface.base` (lead-black with a violet tint is the period-specific field)
- Hairline borders or no borders on raised surfaces (the lead came is load-bearing)
- A single dominant accent colour — the five-jewel set is the register
- Sentence-case headings — Cinzel caps tracking is the inscription cue

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#0d0a14` | Lead-black `#0d0a14` — violet-tinted near-black, the colour of oxidised lead came. |
| `color.intent.primary.bg` | `#6a2ea0` | Amethyst `#6a2ea0` — the rose-window centre piece colour. |
| `color.intent.info.bg` | `#1f4ec8` | Cobalt `#1f4ec8` — the most common high-Gothic blue. |
| `borderWidth.thick` | `3px` | `'3px'` — heavy lead at cardinal joins, vs the 1-2 px most palettes use. |
| `typography.family.display` | `"Cinzel", "Cormorant Garamond", "Trajan Pro", "Georgia", serif` | Cinzel — carved-stone Roman caps revival. |

## Often confused with

### vs [Mall-goth](./mall-goth.md)

Both palettes use dark fields with saturated accents, but Mall-goth pins to a single blood-red accent + deep-violet info on near-black (crepuscular register). Cathedral / Stained Glass spreads five jewel-tone intents across the palette and makes `border.*` load-bearing via heavy lead came (cathedral register). One palette is goth-club; the other is high-Gothic.

### vs [Art Deco / Gatsby](./art-deco.md)

Both dark-field Flat palettes with luxe accents and uppercase-tracked display. Art Deco picks one warm-metallic accent (champagne) and uses Poiret One / Limelight display (1920s register). Cathedral spreads five jewel-tone intents and uses Cinzel display (medieval register). Different historical period, different intent count, different display vocabulary.

### vs [Tron / Dark-Neon](./tron-dark-neon.md)

Tron / Dark-Neon is the Glassmorphism engine: translucent panels with one neon accent and glow-as-focus-ring on near-black. Cathedral / Stained Glass is the Flat engine: opaque surfaces with five jewel-tone intents and heavy opaque lead borders on lead-black. Engine difference is the load-bearing one — no glass, no glow on Cathedral.

## Where it thrives

- Hero panels and high-ceremony landing pages (the jewel + lead register reads as ornate)
- Cards and dashboards where category colour can occupy the five jewel intents distinctly
- Tag and badge compositions in the saturated jewel fills

## Where it degrades

- Long-form prose (caps-tracked display + lead-black field both reduce reading speed)
- Form-heavy interfaces (heavy lead borders on every Input read as cluttered at scale)

## Recall aliases

`stained glass`, `cathedral`, `gothic`, `jewel tones`, `rose window`

## Long-form notes

<details>
<summary>From <code>palettes/stained-glass.README.md</code></summary>

# Cathedral / Stained Glass

Gothic-window register on the Flat engine. Lead-black field, saturated
jewel-tone intents (cobalt, ruby, emerald, amber, amethyst), heavy
lead borders on every raised surface. The first palette in the set
whose `border.*` carries as much visual load as `intent.*` — the lead
came is the geometry, the colour is the light coming through.

`surface.base` is lead-black (`#0d0a14`) — the colour of oxidised lead
came viewed against a dim narthex. `surface.raised` lifts one notch to
`#16131e`; `surface.sunken` darkens to `#0a0810`. The lightness ladder
between surfaces is tight (just enough to read as "panes within panes")
because the actual lift comes from the visible lead borders.

`border.default` is `#2a2436` (visible lead at 2 px); `border.strong` is
`#3e364e` (heavy lead at cardinal joins). `borderWidth.thick` is `'3px'`
so the lead reads as structural, not decorative — every Card and Modal
gets a real leaded outline rather than a hairline rule.

Every intent is a saturated medieval-glass jewel tone with high-contrast
inverse content:

- `intent.primary` is amethyst (`#6a2ea0`) — the rose-window centre piece
- `intent.info` is cobalt (`#1f4ec8`) — the most common jewel in a Chartres
  west-window
- `intent.success` is emerald (`#1f7a4a`) — the herald-of-spring leading
- `intent.warning` is amber (`#c4801a`) — the rare gold-leaded panel
- `intent.danger` is ruby (`#a8221a`) — the passion / martyrdom red

The five-colour set evokes a Chartres rose window; the desaturated
`neutral` keeps the lead in the foreground when no intent is active.
`content.link` is the amber jewel, demoted from primary so links read
as "highlighted in the window" rather than "a competing royal accent."

`typography.family.display` is Cinzel (carved-stone caps as the
gothic-feel surrogate — UnifrakturMaguntia would crush at digital
reading sizes). `family.body` is Cormorant; `family.ui` is Inter.
Display runs at `uppercase` with `0.05em` tracking — the cathedral-
inscription register.

`radius.*` collapses to `'0' / '0' / '2px'` — leaded-glass joinery is
straight cuts, never curves. `pill` stays at `'999px'` for tags that
need it.

`elevation.*` is mostly hairline-rule based: `low` is `0 0 0 1px #2a2436`
(the visible lead, painted via shadow), `medium` and `high` add soft
ink-tinted drops. The shadow tint matches the field so cards layer as
panes within a single composition.

**A11y:** `experimental`. The cobalt + ruby intents pass 3:1 against
white inverse content at standard sizes but sit close to the floor;
`intent.primary` (amethyst) is the most fragile at ≈ 6.8:1 with white
inverse (passes), but darker contexts on `surface.base` reduce
perceived contrast. The palette is the teaching example for "jewel tones
look great in isolation and contrast-fail quietly under realistic
on-page composition." Long-form body should sit on `raised` (≈ 12.5:1)
where contrast holds clearly above the AA floor.

## Engine cost

Zero new tokens. Pure Flat-engine configuration. The lead-came visual
is delivered by `border.*` + `borderWidth.*` at heavier weights than
most palettes use — both slots are already in the contract.

</details>

---

_Generated from `palettes/stained-glass.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
