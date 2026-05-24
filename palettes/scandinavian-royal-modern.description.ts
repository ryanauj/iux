import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'scandinavian-royal-modern',
  tagline:
    'Nordic restraint applied to royal colour — chalk-white field, deep regal navy as the only chromatic intent, gold demoted to a 1 px hairline rule on raised surfaces.',
  summary:
    'Scandinavian Royal Modern is the pale-field sibling in the royal register set. Chalk-white ' +
    '`surface.base`, bleached-oak `surface.raised`, deep regal navy (`#1a2c4e`) as the only ' +
    'saturated `intent.*` accent. Gold (`#9c7a2b`) appears solely as `border.subtle` at low alpha ' +
    'on raised surfaces — a 1 px hairline that picks up the regal vocabulary without committing ' +
    'the palette to a second saturated colour. `space.*` scales 1.25× from Flat / Classic at the ' +
    'high end so the additional breathing room reads as Nordic; `elevation.*` collapses to a ' +
    'hairline-rule on `low` (no drop shadow) and very low-alpha soft shadows above.',
  origin:
    'Nordic editorial design (Stockholm-school posters, contemporary Scandinavian product design ' +
    'catalogues, Apartamento / Kinfolk magazine) applied to royal colour. The Cormorant display ' +
    'serif in regular weight rather than bold is the load-bearing Nordic move — Nordic editorial ' +
    'design rarely bolds its serif headings; it sizes them.',
  signatures: [
    {
      label: 'Chalk-white `surface.base` + bleached-oak `surface.raised`',
      detail:
        '`surface.base` is `#f6f3ee` (chalk-white with a warm undertone); `surface.raised` lifts to `#fbf9f4` (bleached oak). The brighter raised colour reads as a piece of light wood against a pale plaster wall.',
    },
    {
      label: 'Deep regal navy (`#1a2c4e`) as the ONLY saturated chromatic intent',
      detail:
        '`intent.primary.bg` and `intent.info.bg` both share `#1a2c4e`; `border.focus` and `content.link` reuse the same navy. Success / warning / danger are present but desaturate one or two steps from Flat / Classic.',
    },
    {
      label: 'Gold demoted to a hairline border at low alpha',
      detail:
        '`border.subtle` is `rgba(156, 122, 43, 0.20)` — the regal gold present only as a 1 px stroke at 20% alpha. The same gold appears in `border.strong` at full saturation for emphasis borders.',
    },
    {
      label: 'Cormorant display at weight 400 (regular, not bold)',
      detail:
        '`typography.role.display.weight` and `role.title.weight` are `400`. Nordic editorial design rarely bolds its serif headings — it sizes them. The lighter weight + larger size is what distinguishes this palette from Modern Royal\'s `500`.',
    },
    {
      label: '1.25× wider `space.*` at the high end',
      detail:
        '`space.4` is `20px` (vs Flat / Classic\'s `16px`), `space.5` is `30px` (vs `24px`), `space.8` is `80px` (vs `64px`). The wider scale is the load-bearing Nordic breathing-room cue.',
    },
    {
      label: '`elevation.low` is a 1 px hairline rule — no drop shadow',
      detail:
        '`elevation.low.boxShadow` is `0 0 0 1px rgba(156, 122, 43, 0.20)` — a gold hairline ring, not a soft shadow. Cards lift via the rule rather than via a penumbra; the same trick Wikipedia uses to keep the page reading as a printed document.',
    },
  ],
  antiSignatures: [
    'A second saturated accent competing with the navy',
    'Bold serif display weights — Nordic editorial uses regular',
    'Soft drop shadows on low-elevation cards (use the hairline rule)',
    'Tight `space.*` — the breathing room is load-bearing here',
    'Dark surfaces (this palette is light-only; pair with Modern Royal for dark needs)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Chalk-white `#f6f3ee` — warmer than Flat / Classic\'s `#ffffff`.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Deep regal navy `#1a2c4e` — the only saturated chromatic intent.',
    },
    {
      path: 'color.border.subtle',
      note: '`rgba(156, 122, 43, 0.20)` — gold demoted to a hairline at 20% alpha.',
    },
    {
      path: 'typography.role.display.weight',
      note: '`400` — the Nordic editorial convention of regular-weight serif headings.',
    },
    {
      path: 'space.8',
      note: '`80px` — 1.25× Flat / Classic\'s `64px`. Generous whitespace is load-bearing.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`0 0 0 1px rgba(156, 122, 43, 0.20)` — gold hairline rule, no drop shadow.',
    },
  ],
  lookalikes: [
    {
      against: 'wikipedia',
      differentiator:
        'Wikipedia is also a pale, hairline-bordered, restrained Flat palette but uses MediaWiki link blue (`#3366cc`) as the institutional accent and Linux Libertine as the serif display. Scandinavian Royal Modern uses deep regal navy `#1a2c4e` (darker, less saturated) and Cormorant Garamond at weight 400 — the difference is "institutional reference" vs "Nordic editorial".',
    },
    {
      against: 'modern-royal',
      differentiator:
        'Modern Royal is the same register set\'s dark-field sibling: deep aubergine field, antique gold promoted to the primary accent. Scandinavian Royal Modern is the pale-field sibling: chalk-white field, navy as the only chromatic intent, gold demoted to a hairline.',
    },
    {
      against: 'editorial',
      differentiator:
        'Editorial is a warm-paper magazine register with serif throughout and a restrained terracotta accent. Scandinavian Royal Modern is colder (chalk vs paper), uses navy as the only accent, and keeps the body in Inter rather than a serif — the difference between "magazine" and "catalogue".',
    },
  ],
  thrivesWith: [
    'Long-form articles — Cormorant title + Inter body + 1.65 line-height reads quietly for hours',
    'Cards with hairline borders — the gold rule + no shadow is the register\'s defining lift',
    'Forms — the wider `space.*` scale gives input groups room to breathe',
  ],
  degradesWith: [
    'Information-dense data tables — the wider `space.*` works against row density',
    'Dark-mode contexts — this palette is light-only; pair with Modern Royal for dark needs',
  ],
  recallAliases: ['scandinavian royal modern', 'scandinavian royal', 'nordic royal', 'nordic modern', 'scandinavian'],
}
