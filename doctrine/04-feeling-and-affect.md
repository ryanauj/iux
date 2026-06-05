# Feeling & affect

How visual style and colour encode feeling, and the rules that keep that
feeling from overriding meaning.

A palette is the first message an interface sends, and it lands before the
user reads a word: calm or urgent, friendly or serious, premium or
utilitarian, nostalgic or new. This doc names the affective dimensions a
palette moves along, ties each to the token-level moves that produce it,
and classifies existing palettes so the mapping is concrete rather than
vibes.

It sits above the catalog the way the other doctrine docs do, and below
one hard constraint from [`02-app-composition.md`](./02-app-composition.md):
**intent first, palette last.** Feeling serves an already-named intent; it
is never the starting point.

## Hard rules

1. **Affect rides on top of the intent contract; it never repaints it.**
   A palette can make `intent.danger` feel softer or louder, but it cannot
   move it off red-as-danger because red "feels aggressive." Semantic
   intent is fixed by the token contract; affect tunes how loudly each
   intent speaks, not what it means. Failure mode: a "calm wellness"
   palette that recolours errors sage-green because red breaks the mood —
   now the user can't find the error.
2. **A feeling that fails contrast is not that feeling.** "Calm,"
   "premium," and "playful" all assume the user can read the screen. An
   affect move that drops body text below AA has not produced calm; it has
   produced an unreadable screen. Every affect claim below is bounded by
   the palette's a11y tag (see
   [`FINALIZED-PALETTES.md`](../FINALIZED-PALETTES.md)); the `experimental`
   palettes buy their mood with a documented contrast cost, and that cost
   is part of the classification, not a footnote to it.
3. **Colour meaning is cultural and contextual, not universal.** "Blue =
   trust," "red = danger," "green = go" are defaults of a particular
   (largely Western, largely software) register, not laws of perception.
   Red signals luck and celebration in much of East Asia; white is funerary
   in some cultures and bridal in others. A palette already encodes a
   cultural register — Zen / Sumi-e's seal-vermilion and Tokyo / Day's
   JIS-signage red do not mean the same thing — so choosing a palette is
   choosing an audience. Treat the mappings below as a register's
   conventions, not as psychology.
4. **The channels must agree.** Colour, motion, density, shape, and type
   each carry affect independently. When they disagree — urgent red on a
   slow ease-out at magazine density — the user reads a contradiction, not
   nuance. Pick the feeling, then make every channel say it.
5. **The feeling must not undermine the load-bearing component.** This is
   [`02-app-composition.md`](./02-app-composition.md) rule 4 in affective
   terms. A data table's load-bearing job is scannability; a palette whose
   mood depends on heavy texture, glow, or low tonal contrast undermines
   that job no matter how good it feels in isolation.

## The channels that carry feeling

Feeling is not "the colour." It is the agreement across every token family
at once. Each family is also an affect lever:

| Channel | Token home | Quiet / soft end | Loud / hard end |
|---|---|---|---|
| Saturation | `color.intent.*`, `color.surface.*` | desaturated, tinted neutrals | pure, signage-grade hues |
| Hue temperature | `color.surface.*`, `color.intent.*` | cool blues / greens | hot reds / oranges / magenta |
| Contrast | `color.surface.*` vs `color.content.*` | low, tonal | maximal black-on-white |
| Radius | `radius.*` | rounded reads friendly / soft | zero reads hard / serious |
| Border weight | `borderWidth.*`, `color.border.*` | hairline or none | thick ink line |
| Elevation | `elevation.*` | flat or soft penumbra | hard offset / glow |
| Motion | `motion.duration.*`, `motion.easing.*`, `motion.decay` | long ease-out, decay | instant snap, bounce |
| Density | `space.*` | generous (calm, premium) | tight (urgent, dense) |
| Type | `typography.family.*`, `typography.role.*` | humanist rounded, serif | grotesque, condensed, mono |

Glassmorphism and Neubrutalism can share an accent hue and read as
opposite emotions because all eight other channels disagree. That is why
the dimensions below are about the *whole* palette, not its accent.

## The affective dimensions

Five spectra. A palette is a point in this space, not a single label, and
the most interesting palettes sit at a surprising coordinate (see the
readings under each axis). `*` marks an `experimental` palette — it
delivers the feeling and a documented contrast cost in the same breath
(rule 2).

### 1. Energy — calm ↔ energetic

Carried mainly by saturation, contrast, density, and motion duration.

- **Calm pole:** Lavender Dawn, Sage Studio, Nordic Frost, Mid-century
  modern, Coastal Modern, Zen / Sumi-e\*, Aurora\* — low saturation,
  generous `space.*`, long or absent motion.
- **Energetic pole:** Tokyo / Day, 80s Memphis\*, Vaporwave\*, Citrus
  Spark, Neubrutalism, Risograph\*, Cyberpunk Neon-Noir\* — signage-grade
  saturation, tight grids, clashing or glowing fills.
- **Reading:** Aurora is the instructive case. Its motion is a 48-second
  drift and its palette is desaturated, so it reads calm — but the
  luminance-surface model makes it *immersive*-calm, not *quiet*-calm.
  Calm is not one feeling; the channel mix decides which calm. Note the
  axis is not just saturation: a single saturated accent on an otherwise
  desaturated, restrained ground (Vercel Geist, the Neo-brutalist set on
  white) reads calm-but-intentional, not energetic — the *strategy*, not
  the peak chroma, sets the energy.

### 2. Warmth — friendly ↔ serious

Carried by hue temperature, radius, and type humanism.

- **Friendly pole:** Mocha Latte, Claymorphism\*, Soft Pastel\*,
  Cel-shaded (Shojo), Solarpunk, Neo Bubblegum — warm fields, rounded
  radius, humanist-rounded type.
- **Serious pole:** Swiss / International, Dieter Rams / Braun, Vercel
  Geist, Financial Terminal\*, High-Contrast AAA, Blueprint — cool
  neutrals, zero radius, grotesque or mono type.
- **Reading:** the friendliest moves are also the riskiest for contrast —
  Claymorphism and Soft Pastel both carry the `experimental` tag because
  pastel-on-pastel defeats AA. Friendliness you can't read is rule 2's
  failure mode. And friendliness isn't only rounded geometry: Editorial's
  warm paper + serif reads inviting without a single rounded corner, so a
  warm field can carry warmth that the type shape alone would miss.

### 3. Weight — light ↔ authoritative

Carried by border weight, type weight, elevation, and field depth.

- **Light pole:** Glassmorphism\*, Frutiger Aero\*, Aurora\*, Scandinavian
  Royal Modern, Soft Pastel\* — translucency, hairlines, air.
- **Authoritative pole:** Neubrutalism, Brutalist-elegant, Cathedral /
  Stained Glass\*, Cel-shaded (Shonen), Letterpress, Heritage Maritime —
  thick borders or ink outlines, heavy display type, deep fields,
  hard-offset elevation.
- **Reading:** Brutalist-elegant proves weight and warmth are independent.
  It is maximally heavy (4px borders, hard-offset blocks) and still reads
  refined, because the Bodoni / Didot display carries restraint the borders
  don't. Heavy ≠ aggressive — and heavy reads *authoritative* only next to
  formal type or a cool field; next to saturation it reads *loud* instead
  (Neubrutalism).

### 4. Era — nostalgic ↔ contemporary ↔ futuristic

The clearest affect axis, and the one a palette cannot hide: a palette
signals its decade before anything else registers.

- **Nostalgic:** CRT / Phosphor\*, Pixel Art\* (all six), Skeuomorphism\*,
  Aero Glass\*, Frutiger Aero\*, Vaporwave\*, Letterpress, Risograph\*,
  Art Deco / Gatsby — each quotes a specific era's hardware, print process,
  or poster vocabulary.
- **Contemporary:** Flat / Classic, Material, Linear Workspace, Vercel
  Geist, Stone Modern — the present-tense lingua franca; "no era" reads as
  *now*.
- **Futuristic:** Tron / Dark-Neon\*, Tron / Light-Grid\*, Cyberpunk
  Neon-Noir\*, Aurora\* — glow, atmosphere, HUD type. Darkness isn't
  required: Tron / Light-Grid keeps the glow and HUD typography on a light
  blueprint field and still reads futuristic, so the era signal is the
  glow + type, not the near-black.
- **Reading:** era overrides the other axes on first read. A desaturated,
  generously-spaced CRT palette is calm and quiet by every other channel
  and still reads *nostalgic first*. Era mismatch overrides tuning every
  other dimension.

### 5. Register — casual ↔ institutional

Carried by the formality of type and the presence or absence of decoration.

- **Casual:** Hand-drawn (Marker)\*, Studio Confetti, Neo Bubblegum,
  Cel-shaded (Kawaii), Paper Pop — hand or display type, confetti,
  high-play colour.
- **Institutional:** Academic, Wikipedia / Institutional, Letterpress,
  Modern Royal, Heritage Maritime, Dieter Rams / Braun — serif or
  reference-grade authority, restraint, "this is the record."
- **Reading:** institutional has technical sub-registers the two poles
  don't separate — Blueprint, Whiteprint, Financial Terminal\*, and
  Terminal / TUI\* all read "the measurement is the design" through
  mono-letterer faces and grid structure, not serif authority. Register
  names the audience; it does not name the discipline.

### Premium vs utilitarian is a diagonal, not a sixth axis

Luxury is not its own dimension; it is a *corner* of the space above — high
restraint, generous density, and reserved-authoritative weight, in a warm
or deep register:

- **Premium:** Modern Royal, Marble Royal Flat\*, Art Deco / Gatsby, Liquid
  Glass\*, Aurora\*. The corner has dialects: Modern Royal / Marble Royal /
  Art Deco are the dark-field-plus-metal variant; Aurora is the
  light-and-ethereal variant; Liquid Glass is the Apple-minimalist variant
  that reaches premium through reduction rather than formality.
- **Utilitarian:** Flat / Classic, Data-dense light, Financial Terminal\*,
  Terminal / TUI\*, High-Contrast AAA — low decoration, tight-to-default
  density, cool seriousness.

They sit at opposite corners of one space, which is why a palette is rarely
convincingly both. A palette maximising premium *and* density usually lands
as neither.

### The axes are a vocabulary, not an orthogonal basis

The five dimensions correlate, and the doc is more honest for saying so:

- **Warmth and Register move together.** Friendly is usually casual,
  serious usually institutional; they split only at the margin
  (Brutalist-elegant is serious but not restrained). Use Warmth for how
  approachable the surface feels; use Register for the audience it
  addresses.
- **Weight is not independent.** Heavy structure reads authoritative next
  to formal type, refined next to a warm field (Letterpress), and loud next
  to saturation (Neubrutalism). The weight is the same; the neighbours
  decide the feeling.
- **One material move can land on several poles at once.** Aurora is light,
  calm, *and* futuristic because the luminance-surface model
  (`effect.surfaceBy = 'luminance'`) does all three; Soft Pastel is light,
  warm, and calm because the pastels do. When a palette's look comes from
  one move, decomposing it into axes describes but doesn't explain.

Use the axes to ask "is this energetic-and-institutional?" (Vercel Geist)
or "calm-but-authoritative?" (Financial Terminal\*). They are a diagnostic
vocabulary, not a coordinate system.

## What each hue does — as field vs as intent

The single most important colour rule for affect: **the same hue does
opposite work as a field colour and as a semantic intent.** Red as
`intent.danger` is a warning; red as `surface.base` is energy or appetite.
The token contract keeps the two uses on different slots, which is exactly
why affect lives mostly in `color.surface.*` and in accent *saturation* —
not in the semantic intents, which rule 1 freezes.

Bounded by rule 3 (these are the conventions of the register, not laws):

- **Red.** `intent.danger` in this register; as a field or accent, energy,
  urgency, appetite, or — in Tokyo / Day and Swiss — signage authority.
  Same hue, four jobs, disambiguated by which slot carries it.
- **Blue.** The default "neutral-credible" software accent (Flat's
  `#1d4ed8`, Vercel's `#0070f3`, Wikipedia's `#3366cc`) — a convention of
  the register, not proof that blue is trustworthy. As a *field* it reads
  cold (Blueprint, Aero Glass).
- **Green.** `intent.success`; as a field, growth, calm, and eco (Solarpunk,
  Sage Studio) — and, in CRT / Phosphor, pure nostalgia.
- **Yellow / amber.** `intent.warning`; as an accent, optimism and energy —
  and the contract's documented contrast trap: yellow can't carry white
  text, so Citrus Spark and Soft Pastel route primary around it with dark
  inverse content. The cheerful hue is the one most likely to fail AA.
- **Purple / violet.** Premium and creative when deep (Modern Royal's
  aubergine), calm when pale (Lavender Dawn) — value, not hue, shifts the
  reading.
- **Near-black field.** Gravity, premium, focus, or nostalgia depending
  *entirely* on the other channels. High-Contrast AAA, Tron, CRT / Phosphor,
  and Mall-goth all sit on near-black and feel like four different emotions
  — the cleanest proof that a field colour means nothing on its own.
- **Neutral temperature.** The quietest, highest-leverage affect move in
  the whole contract. Warm-white vs cool-white on `surface.base` sets
  friendly vs clinical before any accent lands — Mocha Latte's oat-cream
  against Nordic Frost's glacier-cyan, same lightness, opposite welcome.

## Reverse lookup — feeling → palette

Given a target feeling, the palettes that deliver it and the channel doing
the load-bearing work. Use this as a *starting hypothesis for an
already-named intent* — rule 1 still binds, so this is a shortlist of
palettes that fit a given intent's mood, never a licence to pick palette
first.

| Want the user to feel… | Reach for | Carried by |
|---|---|---|
| Calm, unhurried | Lavender Dawn, Sage Studio, Nordic Frost, Aurora\* | low saturation + generous `space.*` + long / absent motion |
| Energised, alert | Tokyo / Day, Citrus Spark, 80s Memphis\* | signage saturation + tight grid + clashing fills |
| Safe, credible, on-the-record | Wikipedia, Academic, Dieter Rams, Heritage Maritime | restraint + serif / grotesque authority + hairline structure |
| Premium, considered | Modern Royal, Marble Royal Flat\*, Art Deco / Gatsby, Liquid Glass\* | deep / warm field + metal accent + generous density |
| Friendly, playful | Claymorphism\*, Soft Pastel\*, Neo Bubblegum, Cel-shaded (Kawaii) | rounded radius + warm pastels + humanist type |
| Focused, no-nonsense | Flat / Classic, Vercel Geist, Data-dense light, High-Contrast AAA | cool neutral + tight-to-default density + zero decoration |
| Nostalgic | CRT / Phosphor\*, Pixel Art\*, Skeuomorphism\*, Frutiger Aero\* | era-specific engine signal (scanline / grid / texture / gloss) |
| Bold, confident | Neubrutalism, Cel-shaded (Shonen), Risograph\* | thick borders / ink outline + hard offset + clashing fills |
| Immersive, atmospheric | Aurora\*, Cyberpunk Neon-Noir\*, Tron\* | luminance / glow surface model + deep field |

If the intent can't carry the contrast cost an `*` palette ships with, pick
the unstarred neighbour in the same row.

## When feeling and intent conflict

Briefs over-specify: the intent wants one feeling, the brand or context
wants another. Resolve in this order.

1. **Semantic intent and contrast are fixed.** Rules 1 and 2 do not bend.
   `intent.danger` stays red; body text stays AA. Everything else is
   negotiable; these two are not.
2. **Pick one channel to carry the feeling; let the others follow.** If the
   load-bearing component forces tight density (a dashboard that must still
   read calm), let saturation and motion carry calm and accept that density
   reads slightly more alert. Don't compensate by bolting a friendly radius
   onto serious type — that is rule 4's channel argument.
3. **Bend era and weight before warmth and register.** Energy and weight
   retune cheaply; era and audience register are usually load-bearing brand
   decisions. "Premium + calm" against a 90s-nostalgia brand resolves to
   calm premium (Aurora\*) or contemporary premium (Modern Royal) — you
   negotiate on era, not on calm.
4. **Write the trade-off down.** The palette-fit rationale in
   [`FINALIZED-APPS.md`](../FINALIZED-APPS.md) is where it goes; an
   undocumented compromise reads as a mistake to the next person.

## Testing whether the feeling landed

- **Greyscale it.** Strip colour. If the intended era or weight survives,
  the feeling isn't riding on hue alone — and colour-blind users get it
  too. If it collapses, move work onto structure, type, or motion.
- **Desaturate the accent.** If "energetic" dies when the accent drops 30%,
  saturation is doing all the work — brittle. Spread it to density or
  motion.
- **Count the channels.** Walk the nine. If most point the same way the
  palette agrees with itself (rule 4); if they split, the user reads the
  split.
- **Check contrast last and always.** Body text and every intent hue at AA
  on the field, or the feeling is void (rule 2).

## Failure modes

- **Mood over meaning** (rule 1). Repainting a semantic intent because the
  default hue breaks the vibe. The error goes quiet; the user can't find it.
- **Mood over readability** (rule 2). Buying calm or play with contrast the
  body text can't spare. A screenshot-driven palette choice.
- **Channel disagreement** (rule 4). Urgent colour on lazy motion, or
  playful radius under institutional type. The channels argue and the user
  reads the argument.
- **Borrowed feeling, wrong context.** A nostalgic CRT skin on a banking
  dashboard imports "retro fun" into a job that needs "my money is safe."
  Well-executed and wrong, and expensive precisely because it looks
  finished.
- **Universal-emotion fallacy** (rule 3). Shipping "blue = trust" to an
  audience that doesn't share the register, then blaming the users.

## Cross-links

- **Intent first, palette last** — [`02-app-composition.md`](./02-app-composition.md).
  This doc never reorders that pipeline; it only informs the last step.
- **Density as an affect channel** — [`00-layout.md`](./00-layout.md#density-per-engine).
  The space scale is an emotional lever as much as an ergonomic one.
- **A11y bounds every claim** — the a11y tags in
  [`FINALIZED-PALETTES.md`](../FINALIZED-PALETTES.md). No feeling outranks
  legibility.
- **The per-palette affect catalogue** — the "Where it thrives / Where it
  degrades" sections in [`docs/styles/`](../docs/styles/INDEX.md). Those are
  the feeling-fit notes one palette at a time; this doc is the index across
  them.

## What this doc is not

- Not colour psychology. The mappings are conventions of a register
  (rule 3), not laws of perception.
- Not an a11y authority. The palette's a11y tag in
  [`FINALIZED-PALETTES.md`](../FINALIZED-PALETTES.md) bounds every claim;
  this doc never relaxes it.
- Not a palette picker. It informs the last step of
  [`02-app-composition.md`](./02-app-composition.md)'s pipeline; it never
  reorders it.
- Not a list of token values. Those live in
  [`tokens/00-token-contract.md`](../tokens/00-token-contract.md).
