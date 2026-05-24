import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'modern-royal',
  tagline:
    'Regalia colour stripped of ornament — deep aubergine field, antique-gold accent, Cormorant display serif over a geometric sans body.',
  summary:
    'Modern Royal is the "regal colour without filigree" register on the Flat engine. ' +
    'Deep aubergine fills `surface.base`; antique gold (`#b8893a`) carries `intent.primary` ' +
    'and the focus ring; a Cormorant Garamond display sits above an Inter body so the ' +
    'serif-vs-sans contrast does the regal work without committing the body copy to a ' +
    'slower-to-read serif. No gradients, no two-tone fills — opaque surfaces, soft drop ' +
    'shadows scaled up in alpha so cards still lift against the dark field.',
  origin:
    'A modernist take on regal colour vocabularies — deep purples (Tyrian / aubergine) and ' +
    'antique gold appear in heraldic and ecclesiastical design back to antiquity, but the ' +
    'register here is post-Flat-design (2013+): the colour vocabulary kept, the period ' +
    'ornament dropped. Closest reference is the way contemporary luxury digital products ' +
    '(jewellery houses, opera streaming services) carry regal colour without engraved borders.',
  signatures: [
    {
      label: 'Deep aubergine `surface.base` (`#1f0d2a`) with antique-gold accent',
      detail:
        '`surface.base` is the regal field; `surface.raised` lifts one notch to `#2a1538`; `overlay` reuses `raised`. `intent.primary.bg` is antique gold `#b8893a` — the single saturated chromatic accent. No second-saturated competitor.',
    },
    {
      label: 'Cormorant display serif over an Inter body sans',
      detail:
        '`typography.family.display` is Cormorant Garamond at weight 500; `family.ui` and `family.body` are Inter. The two-family split (serif display + sans body) is the load-bearing typography move — committing the body to a serif would push the palette into Editorial / Wikipedia territory.',
    },
    {
      label: '3 px solid gold focus ring (heavier than Flat / Classic\'s 2 px)',
      detail:
        '`effect.focusRing` is `{ width: 3px, offset: 2px, color: #b8893a, style: solid }`. The extra pixel of width compensates for reduced contrast on the dark field — the same compensation Mall-goth makes against its near-black base.',
    },
    {
      label: 'Soft drop shadows at raised alpha (`rgba(0,0,0,0.40)`)',
      detail:
        '`elevation.low` is `0 1px 2px rgba(0,0,0,0.40)`. Same Flat / Classic recipe, alpha raised ~7× to stay visible on the dark aubergine field. No inset highlight, no two-tone, no hard offset.',
    },
    {
      label: 'Opaque surfaces, no engine overlay',
      detail:
        '`effect.overlay.image` is `none`; `effect.glow.radius` is `0`. The regal feel is delivered entirely by colour + type — no engine flourish, no atmosphere, no grain.',
    },
  ],
  antiSignatures: [
    'Engraved borders, filigree, or gilded frames anywhere',
    'Body copy in a serif — that\'s Editorial / Wikipedia territory',
    'A second saturated chromatic accent competing with the gold',
    'Translucent / glass surfaces (no `backdrop-blur` here)',
    'Hard-offset block shadows (that\'s Neubrutalism / Memphis-80s)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Deep aubergine `#1f0d2a` — the regal field. Compare to Mall-goth\'s near-black `#0d0c10` field.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Antique gold `#b8893a` — the single saturated accent. Doubles as `border.focus`.',
    },
    {
      path: 'effect.focusRing.width',
      note: '`3px` — heavier than Flat / Classic\'s `2px` to compensate for the dark field\'s reduced contrast.',
    },
    {
      path: 'typography.family.display',
      note: 'Cormorant Garamond — the serif that does the regal work without committing the body to a serif.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`0 1px 2px rgba(0,0,0,0.40)` — Flat / Classic\'s recipe with alpha raised so cards lift on the dark field.',
    },
  ],
  lookalikes: [
    {
      against: 'mall-goth',
      differentiator:
        'Mall-goth is also a dark-field Flat palette but the accent is blood-red `#8a1014` and the display is a condensed serif (Cinzel-feel). Modern Royal\'s accent is warm-gold `#b8893a` and the display is generous-counter Cormorant — the difference between "crepuscular goth" and "modernist regal".',
    },
    {
      against: 'editorial',
      differentiator:
        'Editorial is a warm-paper-and-ink magazine register: pale background, serif throughout, restrained terracotta accent. Modern Royal is a dark-field register with serif-display-only and gold accent — same Flat engine, opposite tonal range.',
    },
    {
      against: 'scandinavian-royal-modern',
      differentiator:
        'Scandinavian Royal Modern is the same register set\'s pale-field sibling: chalk-white field, regal navy as the only chromatic intent, gold demoted to a hairline rule. Modern Royal is the dark-field sibling that promotes gold to the primary accent.',
    },
  ],
  thrivesWith: [
    'Hero panels and marketing headers — the dark field + gold accent reads premium without ornament',
    'Long-form Cormorant titles paired with Inter body — the typographic contrast is what carries the register',
    'Buttons and badges — the saturated gold + dark inverse content stays legible at small sizes',
  ],
  degradesWith: [
    'Dense data tables — the dark field reduces legibility of secondary / muted text against the same colour family',
    'Photographic content — the aubergine field clashes with most colour photography; works only with desaturated or duotone images',
  ],
  recallAliases: ['modern royal', 'royal', 'aubergine royal', 'gold royal', 'regal modern'],
}
