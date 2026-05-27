# Wikipedia / Institutional

> MediaWiki Vector skin in two-token form — Linux Libertine serif `display` on Liberation Sans `body`, clinical white surfaces, the canonical `#3366cc` link blue, and elevation collapsed to a single hairline rule on `overlay`.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Wikipedia / Institutional is the Editorial register tuned for "this is a reference, not a product." `surface.base` is `#ffffff`, `surface.sunken` is `#f8f9fa` (the MediaWiki infobox / sidebar grey), and the palette's single saturated colour is `#3366cc` — the canonical Wikipedia link blue — carrying both `color.content.link` and `intent.primary`. `typography.family.display` is `"Linux Libertine", "Linux Libertine O", "Libertinus Serif", Georgia, ...` (the family Wikipedia uses for its wordmark and historically routed article headings through); `family.ui` is `"Liberation Sans", "Helvetica Neue", Arial, ...` for body / label / caption. The two-family split — serif for `display`/`title`/`heading`/`subheading`, sans for body and chrome — is the Vector skin convention verbatim. Display weights stay at `400` (institutional articles size their headings rather than bolding them), and `elevation.*` is `none` everywhere except `overlay`, which carries a `0 0 0 1px #a2a9b1` hairline rule.

## Origin

The MediaWiki "Vector" skin (Wikipedia's default since 2010) and the institutional-reference visual tradition it codifies: Britannica, government wikis, library catalogues, university course pages. Linux Libertine (the family used for the Wikipedia wordmark) and the canonical `#3366cc` link blue carry the palette's identity.

## Signatures

- **Canonical Wikipedia link-blue `#3366cc`** — `color.content.link`, `intent.primary.bg`, `intent.info.bg`, and `border.focus` all share `#3366cc` — the exact link colour MediaWiki ships at. Its measured ~5.4:1 contrast against white is the AA-body / AAA-large threshold and the reason this colour is the institutional default.
- **Serif `display` + sans `body` split (the Vector convention)** — `typography.family.display` is `"Linux Libertine", "Linux Libertine O", "Libertinus Serif", Georgia, "Times New Roman", Times, serif`. `family.ui` is `"Liberation Sans", "Helvetica Neue", Arial, Helvetica, sans-serif`. `role.display` / `title` / `heading` / `subheading` all route through `display` (serif); `body` / `label` / `caption` route through `ui` (sans).
- **Display weights stay at `400` — articles size, not bold** — `role.display.weight`, `title.weight`, `heading.weight`, and `subheading.weight` are all `400`. Institutional articles don't bold their headings; they size them. Compare Editorial (`700`), Newspaper (`900`), Academic (`700`) — Wikipedia is the only one of the print-feel palettes that holds display weight at body weight.
- **Clinical white `surface.base` with infobox-grey `sunken`** — `surface.base`, `raised`, and `overlay` are `#ffffff`. `surface.sunken` is `#f8f9fa` — the exact MediaWiki infobox / sidebar grey. The narrow tonal palette distinguishes Wikipedia from Editorial's warm paper-cream and Newspaper's newsprint cream-grey.
- **Hairline-rule `overlay`, zero shadow elsewhere** — `elevation.flat` / `low` / `medium` / `high` are all `boxShadow: 'none'`. `overlay` carries `0 0 0 1px #a2a9b1` — a thin grey stroke, the way a MediaWiki dialog frames itself. No soft drop shadows anywhere; cards do not lift off the page.
- **Dense `body` (`0.875rem / lineHeight 1.6`)** — `role.body.size` is `0.875rem` — Wikipedia's actual reading default. Denser than Editorial's `1.0625rem / 1.65` magazine setting or Academic's `1.0625rem / 1.7` journal setting. The brief is reference-density, not long-form atmosphere.

## Anti-signatures

- A heavy (`>= 600`) display weight — institutional articles don't bold their headings
- A warm or off-white `surface.base` — the clinical `#ffffff` is structural
- A second saturated accent competing with the `#3366cc` link blue
- A soft drop shadow on any elevation slot — only the `overlay` hairline rule is permitted
- A serif `body` family — the serif `display` / sans `body` split is the Vector convention

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.content.link` | `#3366cc` | Canonical MediaWiki link blue `#3366cc` — also routes through `intent.primary.bg`, `intent.info.bg`, `border.focus`. |
| `color.surface.sunken` | `#f8f9fa` | `#f8f9fa` — the exact MediaWiki infobox / sidebar grey. |
| `typography.family.display` | `"Linux Libertine", "Linux Libertine O", "Libertinus Serif", Georgia, "Times New Roman", Times, serif` | `"Linux Libertine", "Linux Libertine O", "Libertinus Serif", Georgia, ...` — the family used for the Wikipedia wordmark. |
| `typography.family.ui` | `"Liberation Sans", "Helvetica Neue", Arial, Helvetica, sans-serif` | `"Liberation Sans", "Helvetica Neue", Arial, ...` — body sans, the Vector-skin convention. |
| `typography.role.display.weight` | `400` | `400` — institutional articles size headings rather than bolding them. |
| `typography.role.body.size` | `0.875rem` | `0.875rem` — Wikipedia's actual reading default, denser than Editorial / Academic. |
| `elevation.overlay.boxShadow` | `0 0 0 1px #a2a9b1` | `0 0 0 1px #a2a9b1` — the printed-frame stroke. Every other elevation slot is `none`. |

## Often confused with

### vs [Editorial](./editorial.md)

Editorial is the magazine-spread sibling — warm paper-cream `#f7f1e3` with a terracotta accent, generous magazine `space.*`, body at `1.0625rem / 1.65`. Wikipedia is the institutional-reference sibling — clinical white surfaces, link-blue accent, denser body at `0.875rem / 1.6`. Editorial wants to be read for minutes; Wikipedia wants facts located in seconds.

### vs [Academic](./academic.md)

Academic collapses `family.ui` and `family.display` onto the same Computer Modern serif stack — no sans face anywhere — and uses the cooler `#3a4f87` hyperref blue. Wikipedia keeps the Vector serif-display / sans-body split and uses the canonical MediaWiki `#3366cc`. Academic targets typeset PDFs; Wikipedia targets MediaWiki.

### vs [Flat / Classic](./flat-classic.md)

Flat / Classic uses system-stack sans on every role, soft drop shadows on `elevation.*`, an indigo `#1d4ed8` primary, and a `2px` radius scale. Wikipedia adds a serif `display` family, collapses elevation to a single hairline `overlay` stroke, swaps the indigo for the `#3366cc` link blue, and tightens body to `0.875rem` — same flat engine, institutional discipline rather than unornamented baseline.

### vs [Newspaper / Broadsheet](./newspaper.md)

Newspaper uses serif on `family.ui` too (body and chrome wear serif), `900`-weight Bodoni / Playfair display, and a stop-the-presses red on cream-grey newsprint. Wikipedia keeps sans body, `400`-weight Linux Libertine display, and the institutional link blue on clinical white — reference voice, not broadsheet shout.

## Where it thrives

- Long reference articles with tables of contents, infoboxes, and citation footnotes
- Documentation and knowledge-base interfaces where the brief is "be useful, not branded"
- Wiki-style edit interfaces where the printed-frame `overlay` rule matches dialog conventions

## Where it degrades

- Marketing surfaces wanting visual punch — the palette refuses bold display weights, soft shadows, and a second accent
- Product onboarding flows — the institutional voice reads as joyless when the brief is delight
- Touch-first mobile interfaces — body at `0.875rem` wants pointer-density column widths, not a phone screen

## Recall aliases

`wikipedia`, `institutional`, `mediawiki`, `vector skin`, `encyclopedia`, `reference`, `wiki`

## Long-form notes

<details>
<summary>From <code>palettes/wikipedia.README.md</code></summary>

# Wikipedia / Institutional

Editorial register on the flat engine, tuned for the "this is a reference,
not a product" feel. The MediaWiki Vector skin in two-token form: serif
display, sans body, the canonical `#3366cc` link blue carrying both
`color.content.link` and `intent.primary`. Where Editorial uses warm paper
and a terracotta accent for magazine-mood, Wikipedia drops to clinical
white (`#ffffff`) with `surface.sunken` at `#f8f9fa` — the exact infobox /
sidebar grey from MediaWiki — and replaces the editorial accent with the
institutional Wikipedia link blue.

`typography.family.display` is Linux Libertine (the family Wikipedia used
for its wordmark and historically routed article headings through), with
Libertinus Serif and Georgia as fallbacks. `family.ui` is Liberation Sans
/ Helvetica / Arial — Wikipedia's body sans on Linux distributions and
its closest cross-platform analogue elsewhere. The two-family split — serif
for `display`/`title`/`heading`/`subheading`, sans for `body`/`label`/
`caption` — is the Vector-skin convention verbatim.

`role.body` sits at `0.875rem` with `lineHeight 1.6` (Wikipedia's
default reading rhythm — denser than Editorial's `1.0625rem / 1.65`
magazine setting). `display`, `title`, `heading`, `subheading` run at
`400` weight on serif — institutional articles don't bold their headings,
they size them. `space.*` tightens one notch from Editorial at the low end
(`1 → 4px`, `2 → 8px`, `3 → 12px`) for document-density rather than
magazine breathing room, and `radius.*` collapses to `2px` through `lg`
(the Vector skin's near-zero corner softening on buttons and infoboxes).

`elevation.*` is `'none'` at every slot except `overlay`, which carries a
single `0 0 0 1px #a2a9b1` hairline rule — modals and popovers get a
printed-frame stroke rather than a soft drop shadow, matching MediaWiki's
dialog convention. Zero marketing polish: no glow, no gradient, no
elevation lifting cards off the page; borders draw the document and type
does the rest.

**A11y:** `pass`. `content.primary` (`#202122`) on `surface.base`
(`#ffffff`) ≈ 17:1 — AAA at default body size. `intent.primary` /
`color.content.link` `#3366cc` on white ≈ 5.4:1 (AA body, AAA large) —
the exact threshold MediaWiki ships at and the reason this color is the
institutional default. `intent.success` `#14784f` + inverse `#ffffff`
≈ 5.1:1; `intent.warning` `#7d4a00` + inverse ≈ 7.6:1; `intent.danger`
`#b32424` + inverse ≈ 5.5:1. `content.muted` `#72777d` on base ≈ 4.5:1,
OK as decorative meta text.

</details>

---

_Generated from `palettes/wikipedia.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
