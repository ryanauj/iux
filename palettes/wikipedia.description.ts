import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'wikipedia',
  tagline:
    'MediaWiki Vector skin in two-token form — Linux Libertine serif `display` on Liberation Sans `body`, clinical white surfaces, the canonical `#3366cc` link blue, and elevation collapsed to a single hairline rule on `overlay`.',
  summary:
    'Wikipedia / Institutional is the Editorial register tuned for "this is a reference, not a product." ' +
    '`surface.base` is `#ffffff`, `surface.sunken` is `#f8f9fa` (the MediaWiki infobox / sidebar grey), and the ' +
    'palette\'s single saturated colour is `#3366cc` — the canonical Wikipedia link blue — carrying both ' +
    '`color.content.link` and `intent.primary`. `typography.family.display` is `"Linux Libertine", "Linux ' +
    'Libertine O", "Libertinus Serif", Georgia, ...` (the family Wikipedia uses for its wordmark and historically ' +
    'routed article headings through); `family.ui` is `"Liberation Sans", "Helvetica Neue", Arial, ...` for body / ' +
    'label / caption. The two-family split — serif for `display`/`title`/`heading`/`subheading`, sans for body and ' +
    'chrome — is the Vector skin convention verbatim. Display weights stay at `400` (institutional articles size ' +
    'their headings rather than bolding them), and `elevation.*` is `none` everywhere except `overlay`, which ' +
    'carries a `0 0 0 1px #a2a9b1` hairline rule.',
  origin:
    'The MediaWiki "Vector" skin (Wikipedia\'s default since 2010) and the institutional-reference visual ' +
    'tradition it codifies: Britannica, government wikis, library catalogues, university course pages. Linux ' +
    'Libertine (the family used for the Wikipedia wordmark) and the canonical `#3366cc` link blue carry the ' +
    'palette\'s identity.',
  signatures: [
    {
      label: 'Canonical Wikipedia link-blue `#3366cc`',
      detail:
        '`color.content.link`, `intent.primary.bg`, `intent.info.bg`, and `border.focus` all share `#3366cc` — the exact link colour MediaWiki ships at. Its measured ~5.4:1 contrast against white is the AA-body / AAA-large threshold and the reason this colour is the institutional default.',
    },
    {
      label: 'Serif `display` + sans `body` split (the Vector convention)',
      detail:
        '`typography.family.display` is `"Linux Libertine", "Linux Libertine O", "Libertinus Serif", Georgia, "Times New Roman", Times, serif`. `family.ui` is `"Liberation Sans", "Helvetica Neue", Arial, Helvetica, sans-serif`. `role.display` / `title` / `heading` / `subheading` all route through `display` (serif); `body` / `label` / `caption` route through `ui` (sans).',
    },
    {
      label: 'Display weights stay at `400` — articles size, not bold',
      detail:
        '`role.display.weight`, `title.weight`, `heading.weight`, and `subheading.weight` are all `400`. Institutional articles don\'t bold their headings; they size them. Compare Editorial (`700`), Newspaper (`900`), Academic (`700`) — Wikipedia is the only one of the print-feel palettes that holds display weight at body weight.',
    },
    {
      label: 'Clinical white `surface.base` with infobox-grey `sunken`',
      detail:
        '`surface.base`, `raised`, and `overlay` are `#ffffff`. `surface.sunken` is `#f8f9fa` — the exact MediaWiki infobox / sidebar grey. The narrow tonal palette distinguishes Wikipedia from Editorial\'s warm paper-cream and Newspaper\'s newsprint cream-grey.',
    },
    {
      label: 'Hairline-rule `overlay`, zero shadow elsewhere',
      detail:
        '`elevation.flat` / `low` / `medium` / `high` are all `boxShadow: \'none\'`. `overlay` carries `0 0 0 1px #a2a9b1` — a thin grey stroke, the way a MediaWiki dialog frames itself. No soft drop shadows anywhere; cards do not lift off the page.',
    },
    {
      label: 'Dense `body` (`0.875rem / lineHeight 1.6`)',
      detail:
        '`role.body.size` is `0.875rem` — Wikipedia\'s actual reading default. Denser than Editorial\'s `1.0625rem / 1.65` magazine setting or Academic\'s `1.0625rem / 1.7` journal setting. The brief is reference-density, not long-form atmosphere.',
    },
  ],
  antiSignatures: [
    'A heavy (`>= 600`) display weight — institutional articles don\'t bold their headings',
    'A warm or off-white `surface.base` — the clinical `#ffffff` is structural',
    'A second saturated accent competing with the `#3366cc` link blue',
    'A soft drop shadow on any elevation slot — only the `overlay` hairline rule is permitted',
    'A serif `body` family — the serif `display` / sans `body` split is the Vector convention',
  ],
  tokenEvidence: [
    {
      path: 'color.content.link',
      note: 'Canonical MediaWiki link blue `#3366cc` — also routes through `intent.primary.bg`, `intent.info.bg`, `border.focus`.',
    },
    {
      path: 'color.surface.sunken',
      note: '`#f8f9fa` — the exact MediaWiki infobox / sidebar grey.',
    },
    {
      path: 'typography.family.display',
      note: '`"Linux Libertine", "Linux Libertine O", "Libertinus Serif", Georgia, ...` — the family used for the Wikipedia wordmark.',
    },
    {
      path: 'typography.family.ui',
      note: '`"Liberation Sans", "Helvetica Neue", Arial, ...` — body sans, the Vector-skin convention.',
    },
    {
      path: 'typography.role.display.weight',
      note: '`400` — institutional articles size headings rather than bolding them.',
    },
    {
      path: 'typography.role.body.size',
      note: '`0.875rem` — Wikipedia\'s actual reading default, denser than Editorial / Academic.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: '`0 0 0 1px #a2a9b1` — the printed-frame stroke. Every other elevation slot is `none`.',
    },
  ],
  lookalikes: [
    {
      against: 'editorial',
      differentiator:
        'Editorial is the magazine-spread sibling — warm paper-cream `#f7f1e3` with a terracotta accent, generous magazine `space.*`, body at `1.0625rem / 1.65`. Wikipedia is the institutional-reference sibling — clinical white surfaces, link-blue accent, denser body at `0.875rem / 1.6`. Editorial wants to be read for minutes; Wikipedia wants facts located in seconds.',
    },
    {
      against: 'academic',
      differentiator:
        'Academic collapses `family.ui` and `family.display` onto the same Computer Modern serif stack — no sans face anywhere — and uses the cooler `#3a4f87` hyperref blue. Wikipedia keeps the Vector serif-display / sans-body split and uses the canonical MediaWiki `#3366cc`. Academic targets typeset PDFs; Wikipedia targets MediaWiki.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat / Classic uses system-stack sans on every role, soft drop shadows on `elevation.*`, an indigo `#1d4ed8` primary, and a `2px` radius scale. Wikipedia adds a serif `display` family, collapses elevation to a single hairline `overlay` stroke, swaps the indigo for the `#3366cc` link blue, and tightens body to `0.875rem` — same flat engine, institutional discipline rather than unornamented baseline.',
    },
    {
      against: 'newspaper',
      differentiator:
        'Newspaper uses serif on `family.ui` too (body and chrome wear serif), `900`-weight Bodoni / Playfair display, and a stop-the-presses red on cream-grey newsprint. Wikipedia keeps sans body, `400`-weight Linux Libertine display, and the institutional link blue on clinical white — reference voice, not broadsheet shout.',
    },
  ],
  thrivesWith: [
    'Long reference articles with tables of contents, infoboxes, and citation footnotes',
    'Documentation and knowledge-base interfaces where the brief is "be useful, not branded"',
    'Wiki-style edit interfaces where the printed-frame `overlay` rule matches dialog conventions',
  ],
  degradesWith: [
    'Marketing surfaces wanting visual punch — the palette refuses bold display weights, soft shadows, and a second accent',
    'Product onboarding flows — the institutional voice reads as joyless when the brief is delight',
    'Touch-first mobile interfaces — body at `0.875rem` wants pointer-density column widths, not a phone screen',
  ],
  recallAliases: ['wikipedia', 'institutional', 'mediawiki', 'vector skin', 'encyclopedia', 'reference', 'wiki'],
}
