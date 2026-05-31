import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'silver-daguerreotype',
  tagline:
    'The polished-silver-plate register on the Neumorphism engine — one continuous warm-silver field shaped only by light, sepia accents, and a Garamond serif.',
  summary:
    'A daguerreotype is a photograph on a mirror-buffed silver sheet: no paper, no ink, only one metallic surface ' +
    'raised and recessed by light. That is the Neumorphism contract exactly — a single tonal field where paired ' +
    'inner / outer shadows do all the depth work — so Silver Daguerreotype swaps the engine\'s cool blue-grey for ' +
    'a warm silver-sepia `#dcd7cf`, sets borders equal to the surface (invisible), and lets the chromatic intents ' +
    'live only in the foreground text: sepia, plate-green, antique-gold, oxide-red, steel-blue — the hand-tinting ' +
    'a daguerreotypist brushed onto cheeks and jewellery. Set in a Cormorant/Garamond serif. Ships `experimental` ' +
    'like base Neumorphism: the tone-on-tone surface knowingly cannot clear AA body text.',
  origin:
    'The daguerreotype (1839) — the first commercial photographic process, a direct positive on a silvered copper ' +
    'plate that has to be tilted to the light to be read, often hand-tinted in faint colour. The register is the ' +
    'warm, photographic answer to the cool plastic of base Neumorphism: same single-surface soft-UI depth, but a ' +
    'silver-gelatin tone and an antique serif.',
  signatures: [
    {
      label: 'One continuous warm-silver surface',
      detail:
        'Every `surface.*` slot is the same `#dcd7cf` silver-sepia and `border.*` matches it — the plate is one buffed sheet. Depth comes entirely from `elevation.*`, never from a colour change.',
    },
    {
      label: 'Depth read only by light (paired soft-UI shadows)',
      detail:
        '`elevation.*` is the canonical Neumorphism stack — a warm `rgba(150,138,116,…)` lower-right shade and a `rgba(255,252,244,…)` upper-left highlight — so surfaces emboss out of or press into the plate, exactly like tilting a daguerreotype to the light.',
    },
    {
      label: 'Hand-tinting confined to foreground text',
      detail:
        'Intents keep the silver `bg` and carry colour only in `content`: sepia, plate-green, antique-gold, oxide-red, steel-blue. It mirrors how a daguerreotypist brushed faint colour onto the image, never the plate.',
    },
    {
      label: 'Antique Garamond serif',
      detail:
        '`typography.family.ui` is a Cormorant/EB-Garamond serif with `0.08em` tracked uppercase labels — period lettering, not a modern soft-UI sans.',
    },
  ],
  antiSignatures: [
    'A cool blue-grey field — the daguerreotype tone is warm silver-sepia',
    'Visible borders or colour-shifted surfaces — the plate is one continuous sheet',
    'Saturated intent fills — colour lives only in foreground text, as hand-tinting',
    'A rounded soft-UI sans — the register is set in an antique serif',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm silver-sepia `#dcd7cf` — the buffed plate, repeated across every surface.' },
    { path: 'color.border.default', note: 'Equal to the surface — the plate has no drawn edges.' },
    { path: 'elevation.low.boxShadow', note: 'Warm-tinted paired highlight/shade — depth read by tilting to light.' },
    { path: 'color.intent.primary.content', note: 'Sepia `#7a5b3a` text on a silver fill — hand-tinting in the foreground.' },
  ],
  lookalikes: [
    {
      against: 'neumorphism',
      differentiator:
        'Same engine and single-surface soft-UI mechanism. Base Neumorphism is the cool blue-grey `#e0e5ec` cautionary plastic. Silver Daguerreotype rethemes it as a photographic silver plate: a warm silver-sepia tone, warm-tinted shadows, sepia/antique-gold hand-tinting, and a Garamond serif instead of a rounded sans.',
    },
    {
      against: 'letterpress',
      differentiator:
        'Both are antique, restrained, and serif-led. Letterpress is ink debossed into paper — a flat printed register. Silver Daguerreotype is the photographic counterpart: no paper at all, just one silver surface shaped by light, with the soft-UI emboss doing what the deboss does on the press.',
    },
  ],
  recallAliases: ['daguerreotype', 'silver daguerreotype', 'silver plate', 'silver gelatin', 'tintype', 'antique photo'],
}
