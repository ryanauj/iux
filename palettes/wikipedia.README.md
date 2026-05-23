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
