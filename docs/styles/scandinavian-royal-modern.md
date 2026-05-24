# Scandinavian Royal Modern

> Nordic restraint applied to royal colour — chalk-white field, deep regal navy as the only chromatic intent, gold demoted to a 1 px hairline rule on raised surfaces.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Scandinavian Royal Modern is the pale-field sibling in the royal register set. Chalk-white `surface.base`, bleached-oak `surface.raised`, deep regal navy (`#1a2c4e`) as the only saturated `intent.*` accent. Gold (`#9c7a2b`) appears solely as `border.subtle` at low alpha on raised surfaces — a 1 px hairline that picks up the regal vocabulary without committing the palette to a second saturated colour. `space.*` scales 1.25× from Flat / Classic at the high end so the additional breathing room reads as Nordic; `elevation.*` collapses to a hairline-rule on `low` (no drop shadow) and very low-alpha soft shadows above.

## Origin

Nordic editorial design (Stockholm-school posters, contemporary Scandinavian product design catalogues, Apartamento / Kinfolk magazine) applied to royal colour. The Cormorant display serif in regular weight rather than bold is the load-bearing Nordic move — Nordic editorial design rarely bolds its serif headings; it sizes them.

## Signatures

- **Chalk-white `surface.base` + bleached-oak `surface.raised`** — `surface.base` is `#f6f3ee` (chalk-white with a warm undertone); `surface.raised` lifts to `#fbf9f4` (bleached oak). The brighter raised colour reads as a piece of light wood against a pale plaster wall.
- **Deep regal navy (`#1a2c4e`) as the ONLY saturated chromatic intent** — `intent.primary.bg` and `intent.info.bg` both share `#1a2c4e`; `border.focus` and `content.link` reuse the same navy. Success / warning / danger are present but desaturate one or two steps from Flat / Classic.
- **Gold demoted to a hairline border at low alpha** — `border.subtle` is `rgba(156, 122, 43, 0.20)` — the regal gold present only as a 1 px stroke at 20% alpha. The same gold appears in `border.strong` at full saturation for emphasis borders.
- **Cormorant display at weight 400 (regular, not bold)** — `typography.role.display.weight` and `role.title.weight` are `400`. Nordic editorial design rarely bolds its serif headings — it sizes them. The lighter weight + larger size is what distinguishes this palette from Modern Royal's `500`.
- **1.25× wider `space.*` at the high end** — `space.4` is `20px` (vs Flat / Classic's `16px`), `space.5` is `30px` (vs `24px`), `space.8` is `80px` (vs `64px`). The wider scale is the load-bearing Nordic breathing-room cue.
- **`elevation.low` is a 1 px hairline rule — no drop shadow** — `elevation.low.boxShadow` is `0 0 0 1px rgba(156, 122, 43, 0.20)` — a gold hairline ring, not a soft shadow. Cards lift via the rule rather than via a penumbra; the same trick Wikipedia uses to keep the page reading as a printed document.

## Anti-signatures

- A second saturated accent competing with the navy
- Bold serif display weights — Nordic editorial uses regular
- Soft drop shadows on low-elevation cards (use the hairline rule)
- Tight `space.*` — the breathing room is load-bearing here
- Dark surfaces (this palette is light-only; pair with Modern Royal for dark needs)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f6f3ee` | Chalk-white `#f6f3ee` — warmer than Flat / Classic's `#ffffff`. |
| `color.intent.primary.bg` | `#1a2c4e` | Deep regal navy `#1a2c4e` — the only saturated chromatic intent. |
| `color.border.subtle` | `rgba(156, 122, 43, 0.20)` | `rgba(156, 122, 43, 0.20)` — gold demoted to a hairline at 20% alpha. |
| `typography.role.display.weight` | `400` | `400` — the Nordic editorial convention of regular-weight serif headings. |
| `space.8` | `80px` | `80px` — 1.25× Flat / Classic's `64px`. Generous whitespace is load-bearing. |
| `elevation.low.boxShadow` | `0 0 0 1px rgba(156, 122, 43, 0.20)` | `0 0 0 1px rgba(156, 122, 43, 0.20)` — gold hairline rule, no drop shadow. |

## Often confused with

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia is also a pale, hairline-bordered, restrained Flat palette but uses MediaWiki link blue (`#3366cc`) as the institutional accent and Linux Libertine as the serif display. Scandinavian Royal Modern uses deep regal navy `#1a2c4e` (darker, less saturated) and Cormorant Garamond at weight 400 — the difference is "institutional reference" vs "Nordic editorial".

### vs [Modern Royal](./modern-royal.md)

Modern Royal is the same register set's dark-field sibling: deep aubergine field, antique gold promoted to the primary accent. Scandinavian Royal Modern is the pale-field sibling: chalk-white field, navy as the only chromatic intent, gold demoted to a hairline.

### vs [Editorial](./editorial.md)

Editorial is a warm-paper magazine register with serif throughout and a restrained terracotta accent. Scandinavian Royal Modern is colder (chalk vs paper), uses navy as the only accent, and keeps the body in Inter rather than a serif — the difference between "magazine" and "catalogue".

## Where it thrives

- Long-form articles — Cormorant title + Inter body + 1.65 line-height reads quietly for hours
- Cards with hairline borders — the gold rule + no shadow is the register's defining lift
- Forms — the wider `space.*` scale gives input groups room to breathe

## Where it degrades

- Information-dense data tables — the wider `space.*` works against row density
- Dark-mode contexts — this palette is light-only; pair with Modern Royal for dark needs

## Recall aliases

`scandinavian royal modern`, `scandinavian royal`, `nordic royal`, `nordic modern`, `scandinavian`

## Long-form notes

<details>
<summary>From <code>palettes/scandinavian-royal-modern.README.md</code></summary>

# Scandinavian Royal Modern

Nordic restraint applied to royal colour. Chalk-white field,
bleached-oak raised surfaces, a deep regal navy as the only saturated
chromatic intent, gold demoted to a 1 px hairline rule on raised
surfaces. The pale-field sibling to Modern Royal in the same register
set: both palettes share the gold / regal vocabulary, but Modern Royal
promotes gold to `intent.primary` on a dark field, and Scandinavian
Royal Modern demotes gold to `border.subtle` on a pale field while
promoting navy to the chromatic role.

`surface.base` is chalk-white (`#f6f3ee`) with a warm undertone;
`surface.raised` lifts to bleached-oak (`#fbf9f4`). The brighter raised
colour reads as a piece of light wood against a pale plaster wall —
the standard Scandinavian-interior reference. `surface.sunken` drops
to `#ece8e0` so input wells read recessed without a shadow.

`intent.primary.bg` is deep regal navy (`#1a2c4e`) — the only
saturated chromatic intent. `intent.info.bg` shares the same navy
(the palette doesn't need a second blue), and `content.link` and
`border.focus` reuse the same value. `intent.success`, `intent.warning`,
`intent.danger` remain solid but desaturate one or two steps from
Flat / Classic so they read as functional, not decorative.

Gold (`#9c7a2b`) is **not** an `intent.*` here. It appears only as
`border.subtle` at low alpha (`rgba(156, 122, 43, 0.20)`) on raised
surfaces — a 1 px hairline that picks up the regal vocabulary without
committing the palette to a second saturated colour. The same gold
appears in `border.strong` at full saturation for emphasis borders
when a component needs heavier separation.

`typography.family.display` is Cormorant Garamond at weight `400`
(regular, not bold) — Nordic editorial design rarely bolds its serif
headings; it sizes them. The lighter weight at larger sizes is what
distinguishes this palette from Modern Royal's `500`. `family.ui` and
`family.body` are Inter / Söhne for clean body type.

`space.*` scales 1.25× from Flat / Classic at the high end: `space.4`
is `20px` (vs `16px`), `space.5` is `30px` (vs `24px`), `space.7` is
`60px` (vs `48px`), `space.8` is `80px` (vs `64px`). The wider scale
is the load-bearing Nordic breathing-room cue — committed at the
token level so every component picks it up without per-component work.

`elevation.low` is `0 0 0 1px rgba(156, 122, 43, 0.20)` — a 1 px
gold-tinted hairline ring, not a soft drop shadow. Cards lift via the
rule rather than via a penumbra; the same trick Wikipedia uses to
keep the page reading as a printed document. `medium` and `high`
add very-low-alpha soft shadows (`rgba(26, 44, 78, 0.04 → 0.06)`) on
top of the rule for emphasis.

**A11y:** `pass`. `content.primary` (`#1a1c24`) on `surface.base`
(`#f6f3ee`) ≈ 16:1 — AAA at every size. `intent.primary.bg` `#1a2c4e`
with cream inverse `#fbf9f4` ≈ 13.5:1 (AAA). `intent.success` `#2f5b3a`
+ cream inverse ≈ 7.2:1 (AAA). `intent.danger` `#7d2230` + cream
inverse ≈ 8.5:1 (AAA). `intent.warning` `#9c7a2b` + cream inverse ≈
4.6:1 (AA body, AA large). `border.focus` navy on chalk-white ≈
13.5:1, well past the 3:1 focus-contrast threshold even at the 2 px
stroke width. `content.muted` `#7d8090` on base ≈ 4.7:1 — AA at
default body size, OK as decorative meta text.

</details>

---

_Generated from `palettes/scandinavian-royal-modern.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
