import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'academic',
  tagline:
    'LaTeX journal-article register on the flat engine — Computer Modern serif on every typography role (no sans face anywhere), a `0.8125rem` small-caps label channel for figure markers, and `space.*` widened at the high end for figure-gutter generosity.',
  summary:
    'Academic is the Editorial register tuned for the typeset-PDF journal-article aesthetic. `family.ui` and ' +
    '`family.display` both resolve to `"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, ' +
    'Georgia, "Times New Roman", serif` — there is no sans face in the palette, the way a journal PDF has no sans ' +
    'face. `body` runs at `1.0625rem / lineHeight 1.7` for long-form reading proportions; `subheading` stays on ' +
    '`display` (serif) at weight 600 because LaTeX section headings are the same family as body, just larger and ' +
    'bolder. `space.*` widens at the high end (`6: \'64px\'`, `7: \'88px\'`, `8: \'120px\'`) for figure-gutter ' +
    'breathing room, and the single restrained accent is academic blue `#3a4f87` — `hyperref`\'s default.',
  origin:
    'Donald Knuth\'s Computer Modern family (1977–) and the LaTeX typesetting tradition that grew around it — ' +
    'mathematical journals, doctoral theses, and physics preprints. The "hyperref" LaTeX package\'s default link ' +
    'colour and figure / theorem / proof environments codified the visual conventions this palette quotes.',
  signatures: [
    {
      label: 'Computer Modern serif on every typography role',
      detail:
        '`typography.family.ui`, `family.display`, `family.pixel`, and `family.hand` all resolve to `"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif`. There is no sans, no humanist, no display contrast face — the entire palette is one serif family, the way a typeset PDF is.',
    },
    {
      label: '`subheading` stays on `display` (serif) at weight 600',
      detail:
        '`typography.role.subheading.family` is `\'display\'` — i.e. serif — not `\'ui\'`. LaTeX section headings are the same family as body text, just larger and bolder. Editorial routes `subheading` through `ui` (sans); Academic refuses that split because typeset journals don\'t.',
    },
    {
      label: 'Small-caps surrogate `label` for figure / theorem markers',
      detail:
        '`role.label` is `0.8125rem / 600 / tracking 0.06em / textTransform: \'uppercase\'` — the small-caps surrogate used for "Figure 1", "Table 3", "Theorem 2.1", "Proof" markers. `caption` is the matching footnote slot at `0.8125rem / 400`.',
    },
    {
      label: 'Wide `space.*` at the high end for figure-gutter generosity',
      detail:
        '`space.6: \'64px\'`, `space.7: \'88px\'`, `space.8: \'120px\'` — wider than Editorial\'s `44 / 64 / 88` at every step. The lower end (`1: \'6px\'`, `2: \'12px\'`) stays compact so in-paragraph rhythm doesn\'t drift. The asymmetry mirrors a journal page\'s outer margin and figure gutter.',
    },
    {
      label: 'Single restrained academic-blue accent (`#3a4f87`)',
      detail:
        '`color.content.link`, `intent.primary.bg`, and `border.focus` all share `#3a4f87` — `hyperref`\'s default link colour. Every other intent stays earth-toned (`success` `#2d5530`, `warning` `#7d5208`, `danger` `#762020`, `info` `#2d4670`) so the blue stays the only attention colour.',
    },
  ],
  antiSignatures: [
    'A sans-serif anywhere in `family.ui` or `family.display` (the no-sans rule is structural)',
    'A `subheading` routed through a sans family — LaTeX doesn\'t do that',
    'A non-zero `radius.md` / `radius.lg` (Computer Modern doesn\'t round corners)',
    'Soft drop shadows on `elevation.*` (only the `overlay` hairline rule is permitted, like a boxed theorem environment)',
    'A second saturated accent competing with the academic blue',
  ],
  tokenEvidence: [
    {
      path: 'typography.family.ui',
      note: '`"Latin Modern Roman", "Computer Modern Serif", ...` — serif on the UI family slot, not sans. The structural move.',
    },
    {
      path: 'typography.family.display',
      note: 'Same Computer Modern serif stack as `family.ui`. There is no display contrast face.',
    },
    {
      path: 'typography.role.subheading.family',
      note: '`\'display\'` (serif), not `\'ui\'` — LaTeX section headings are the same family as body.',
    },
    {
      path: 'typography.role.body.lineHeight',
      note: '`1.7` — long-form reading proportions. Wider than Editorial\'s `1.65` and Newspaper\'s `1.4`.',
    },
    {
      path: 'typography.role.label.textTransform',
      note: '`\'uppercase\'` — small-caps surrogate for `Figure 1` / `Theorem` markers.',
    },
    {
      path: 'space.8',
      note: '`120px` — figure-gutter generosity at the high end. Wider than Editorial\'s `88px` or Flat / Classic\'s `64px`.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Academic blue `#3a4f87` — `hyperref`\'s default link colour. Reused at `content.link` and `border.focus`.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: '`0 0 0 1px rgba(20, 18, 12, 0.30)` — a hairline rule, like a boxed theorem environment, not a drop shadow.',
    },
  ],
  lookalikes: [
    {
      against: 'editorial',
      differentiator:
        'Editorial keeps the magazine convention: serif `display`, sans `body`. Academic collapses both onto the same Computer Modern serif stack — there is no sans face anywhere. Editorial uses a terracotta accent on warm-paper cream; Academic uses an academic-blue accent on a slightly-cooler journal-page off-white, with wider `space.*` at the high end for figure gutters.',
    },
    {
      against: 'wikipedia',
      differentiator:
        'Wikipedia splits serif `display` against sans `body` (the MediaWiki Vector convention), uses clinical white surfaces, denser `0.875rem` body, and the `#3366cc` MediaWiki link blue. Academic stays serif on every role, uses warmer journal-page off-white, runs body at `1.0625rem / 1.7`, and uses the cooler `#3a4f87` hyperref blue.',
    },
    {
      against: 'newspaper',
      differentiator:
        'Newspaper is the dense broadsheet sibling — Georgia / Charter serif body at `0.9375rem / 1.4`, tight `space.*`, heavy display weights, a stop-the-presses red accent on cream-grey newsprint. Academic is the airy journal sibling — Computer Modern body at `1.0625rem / 1.7`, wide `space.*` at the high end, restrained blue accent on warm off-white.',
    },
    {
      against: 'letterpress',
      differentiator:
        'Letterpress engages the print engine for paper-texture overlays and ink-bleed effects. Academic stays on the pure flat engine — the journal-page off-white is a colour value, not a texture, and there is no `paperEdge*` or overlay imagery.',
    },
  ],
  thrivesWith: [
    'Long-form articles, theses, and reference reading where serif legibility and generous leading carry the page',
    'Figure / theorem / proof environments — the small-caps `label` and hung-text `caption` are designed for them',
    'Mathematical or scientific content where the Computer Modern face is the typographic convention',
  ],
  degradesWith: [
    'Dense data dashboards — the wide `space.*` and single-blue intent vocabulary waste room and fight category colour',
    'Marketing CTAs — the palette refuses chromatic punch beyond the single hyperref blue',
    'Mobile reading at narrow widths — `1.0625rem / 1.7` body wants column width',
  ],
  recallAliases: ['academic', 'latex', 'journal', 'computer modern', 'paper', 'thesis', 'hyperref'],
}
