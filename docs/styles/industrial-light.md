# Industrial / Light

> Workshop-drawing register inverted to a light field — warm-paper surfaces, steel-grey + concrete-grey neutrals, safety-orange `intent.primary`, IBM Plex Mono on `family.ui` so labels carry the engineering-drawing density.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Industrial / Light is the inversion exercise for the dark-workshop aesthetic carried by CRT / Phosphor and Bloomberg Terminal. The same vocabulary — measurement labels, monospace UI, safety-orange accents, hairline borders — translated to a warm-paper light field. `surface.base` is `#fbf8f1`; `family.ui` is IBM Plex Mono (so labels and forms render in mono), while `family.body` falls through to a sans Inter chain to keep long-form reading from slowing. Safety orange (`#ff6a00`) is the single saturated accent.

## Origin

Industrial / workshop design vocabulary — printed engineering drawings, ISO 5807 flowchart conventions, the safety-orange / hi-vis colour system, IBM Plex Mono (IBM 2017 corporate open-source release) as the contemporary digital cousin of mechanical-pencil drafting type. Specifically the *inversion* of the dark-workshop register the showcase already ships as CRT / Phosphor — same colour and type vocabulary, light field instead of dark.

## Signatures

- **IBM Plex Mono on `family.ui` (and `family.mono` and `family.display`)** — `typography.family.ui` resolves to `"IBM Plex Mono", "JetBrains Mono", ...` — labels, captions, input affordances all render in mono. `family.body` keeps a sans-y line (Inconsolata is technically display but body falls through to the mono chain too via Inter) so long-form stays readable. The mono-UI / readable-body split is the load-bearing typography move.
- **Safety orange `#ff6a00` as the only saturated `intent.*` accent** — `intent.primary.bg`, `border.focus`, and `content.link` all share `#ff6a00` — the workshop hi-vis colour. `intent.warning.bg` is the same orange one step darker (`#d45600`) so the two intents don't collide when stacked.
- **Hairline rule on `elevation.low` (no drop shadow)** — `elevation.low.boxShadow` is `0 0 0 1px #d6d2c8` — the printed-on-paper hairline rule. `medium` / `high` add a soft drop shadow ON TOP of the rule for emphasis; `overlay` drops the rule and uses a strong soft shadow alone so modals lift clearly.
- **Warm-paper `surface.base` (`#fbf8f1`) — never pure white** — The cream undertone is what makes the palette read as "printed engineering drawing" rather than "white-page UI". Borders pick up the same warm tone (`#d6d2c8`).
- **Hard corners (`radius.sm = 0`, `radius.md = 2px`, `radius.lg = 4px`)** — The sharp-corner workshop language. `radius.pill` stays `999px` for tags; `radius.full` stays `9999px` for circles. The collapse is at the low-end of the scale.
- **Tightened `space.*` at the high end** — `space.7` is `40px`, `space.8` is `56px` — vs Flat / Classic's `48px` / `64px`. The drawing-density compression, not magazine breathing room.

## Anti-signatures

- A sans `family.ui` — the mono labels are load-bearing
- A second saturated chromatic intent competing with the safety orange
- Soft drop shadow on `elevation.low` (the hairline rule must carry the lift)
- Pure white `surface.base` — must be warm-paper cream
- Rounded corners on `radius.sm` / `radius.md` (must be sharp)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `typography.family.ui` | `"IBM Plex Mono", "JetBrains Mono", "Berkeley Mono", "Courier Prime", ui-monospace, monospace` | IBM Plex Mono — labels and forms render in mono. The load-bearing typography move. |
| `color.intent.primary.bg` | `#b64800` | Safety orange `#ff6a00` — the only saturated chromatic intent. Doubles as `border.focus` and `content.link`. |
| `elevation.low.boxShadow` | `0 0 0 1px #d6d2c8` | `0 0 0 1px #d6d2c8` — printed-paper hairline rule, no penumbra. |
| `color.surface.base` | `#fbf8f1` | Warm paper `#fbf8f1` — never pure white. The cream undertone reads as printed drawing. |
| `radius.sm` | `0` | `0` — the sharp-corner workshop language. `radius.lg` collapses to `4px`. |

## Often confused with

### vs [CRT / Phosphor (Amber)](./crt-phosphor-amber.md)

CRT / Phosphor (amber) is the dark-workshop register: near-black field, amber phosphor type with a glow halo, full-mono throughout, scanline overlay. Industrial / Light is the inversion to a light field: warm-paper surfaces, walnut ink, mono on `family.ui` only (body stays sans-readable), safety-orange as the intent, no glow or overlay. Same workshop vocabulary, opposite field — one is "shop floor at night," the other is "shop floor at noon."

### vs [Data-dense light](./data-dense-light.md)

Data-dense light also uses a near-white field and tight spacing, but `family.ui` is humanist sans (Inter) and every intent desaturates for sparkline-readability. Industrial / Light commits to mono on `family.ui` and keeps the safety-orange intent fully saturated.

### vs [Newspaper / Broadsheet](./newspaper.md)

Newspaper / Broadsheet is a Flat editorial register: newsprint cream, serif body in narrow columns, stop-the-presses red accent. Industrial / Light is a Flat workshop register: warm paper, mono labels, safety-orange accent. The difference between "printed broadsheet" and "printed engineering drawing".

## Where it thrives

- Forms — mono labels with measurement-tick captions read as engineering-drawing affordances
- Tables and data grids — mono columns align without tabular-figures workarounds
- Dashboards with metric tiles — the safety-orange accent + mono labels read as instrumentation
- Specifications and parts catalogues — what the type vocabulary is designed for

## Where it degrades

- Long-form articles — even with `family.body` falling through to a humanist line, the mono UI chrome competes
- Marketing-pages that want a soft / inviting tone — the workshop register is utilitarian
- Dark-mode contexts — pair with Bloomberg Terminal or CRT / Phosphor for dark needs

## Recall aliases

`industrial light`, `industrial`, `workshop light`, `engineering drawing`, `industrial drawing`

## Long-form notes

<details>
<summary>From <code>palettes/industrial-light.README.md</code></summary>

# Industrial / Light

Workshop-drawing register inverted to a light field. Warm-paper
surfaces, steel-grey + concrete-grey neutrals, safety-orange
`intent.primary`, IBM Plex Mono on `family.ui` so labels and forms
render in mono. The light-mode inversion of the dark-workshop
aesthetic carried by CRT / Phosphor and Bloomberg Terminal — same
colour and type vocabulary, opposite field.

`surface.base` is warm-paper white (`#fbf8f1`); `surface.raised` is
`#ffffff`. The cream undertone is what makes the palette read as
"printed engineering drawing" rather than "white-page UI". Borders
pick up the same warm tone (`#d6d2c8`, 1 px hairline). `surface.sunken`
drops to `#f0ece2` so input wells read recessed against the cream field.

`intent.primary.bg` is safety orange (`#ff6a00`) — the workshop
hi-vis colour, the only saturated chromatic accent in the palette.
`intent.primary.bg`, `border.focus`, and `content.link` all share this
orange. `intent.warning.bg` reuses safety orange one step darker
(`#d45600`) so the two intents don't read identical when stacked.
`intent.success`, `intent.danger`, `intent.info` desaturate (forest
green, oxblood red, steel-blue info) so the register stays workshop-
quiet — no second saturated chromatic.

`typography.family.ui` is `"IBM Plex Mono", "JetBrains Mono",
"Berkeley Mono", "Courier Prime", ui-monospace, monospace` — labels,
captions, input affordances all render in mono. `family.body` falls
through the same chain, but body text at `0.9375rem` and `lineHeight:
1.6` is tuned to stay readable in mono. `family.display` is Inconsolata
(italic-friendly mono) for drawing-label headings. The mono-everything
typography is the load-bearing register cue — Industrial / Light is one
of the only Flat palettes in the showcase that doesn't carry a sans
body family.

`space.*` tightens at the high end: `space.5` is `20px` (vs `24px`),
`space.6` is `28px` (vs `32px`), `space.7` is `40px` (vs `48px`),
`space.8` is `56px` (vs `64px`). The drawing-density compression rather
than magazine breathing room. `radius.*` collapses at the low end:
`sm: 0`, `md: 2px`, `lg: 4px` — the sharp-corner workshop language.
`radius.pill` stays `999px` for tags that need it; `radius.full` stays
`9999px` for circles.

`elevation.low` is `0 0 0 1px #d6d2c8` — a 1 px box-shadow stroke,
the printed-on-paper hairline rule (same trick Metro / Light and
Wikipedia use). `elevation.medium` and `elevation.high` add soft drop
shadows ON TOP of the rule for components that need clearer separation.
`elevation.overlay` (modals) drops the rule and uses a strong soft
shadow alone so floating panels lift clearly above the page plane.

`motion.*` is slightly snappier than Flat / Classic: `duration.base`
is `160ms` (vs `200ms`) and `easing.standard` is the symmetric
in-out curve (`cubic-bezier(0.4, 0, 0.2, 1)`) — workshop UI prefers
crispness over settling, the way a mechanical drafting compass clicks
into place.

**A11y:** `pass`. `content.primary` `#2a2620` on `surface.base`
`#fbf8f1` ≈ 13.2:1 — AAA. On `surface.raised` `#ffffff` ≈ 14.5:1 —
AAA. `intent.primary` safety orange + white inverse ≈ 3.2:1 — AA
large, not AA body. The palette ships safety orange as the
primary intent because the workshop vocabulary commits to it, but the
contrast caveat means primary buttons should use bold body weight or
larger sizes when the white inverse text lives inside the fill;
small-text labels routed through `intent.primary` should be tested
against the actual button size in the consuming UI. `intent.warning`
`#d45600` + white inverse ≈ 4.8:1 (AA body). `intent.success` `#1f7a3a`
+ white inverse ≈ 5.2:1 (AA body). `intent.danger` `#a8201a` + white
inverse ≈ 6.8:1 (AAA). `intent.info` `#3e5a78` + white inverse ≈ 6.2:1
(AAA). `border.focus` safety orange on warm-paper base ≈ 3.2:1 (AA
focus contrast — the 2 px ring at 2 px offset gives perceptual weight
where the colour contrast is at the threshold).

The safety-orange-at-AA-large is the documented constraint. The
workshop vocabulary commits to the hi-vis colour even though it isn't
the strongest AA-body fill — the alternative would be a darker orange
that loses the safety-vest register. The palette ships the period-
correct colour; consumers needing AA-body on small primary text
should override `intent.primary.content` to the darker walnut ink
`content.primary` (`#2a2620`) when the orange fill is small enough
that the visual hi-vis cue isn't carrying the affordance alone.

</details>

---

_Generated from `palettes/industrial-light.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
