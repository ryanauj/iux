import { useState } from 'react'
import { palette as flatClassic } from '../../../palettes/flat-classic'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Toggle } from '../../components/Toggle/Toggle'
import { Slider } from '../../components/Slider/Slider'
import type { EngineGuideMeta } from './types'

type ElevationRung = 'flat' | 'low' | 'medium' | 'high' | 'overlay'
const RUNGS: ElevationRung[] = ['flat', 'low', 'medium', 'high', 'overlay']

function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__row">
      <Card title="Settings" subtitle="A flat card looks like… a card." variant="static">
        <p>
          One opaque surface, hairline border, soft shadow at the lowest rung —
          and the only colour fight is the primary action.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Save changes</Button>
          <Button intent="neutral">Cancel</Button>
        </div>
      </Card>
    </div>
  )
}

function SurfacesDemo() {
  const swatches: { label: string; cssVar: string }[] = [
    { label: 'surface.base',    cssVar: '--color-surface-base' },
    { label: 'surface.raised',  cssVar: '--color-surface-raised' },
    { label: 'surface.sunken',  cssVar: '--color-surface-sunken' },
    { label: 'surface.overlay', cssVar: '--color-surface-overlay' },
  ]
  return (
    <div className="iux-engine-demo__swatch-grid">
      {swatches.map(s => (
        <div
          key={s.label}
          className="iux-engine-demo__swatch"
          style={{ background: `var(${s.cssVar})` }}
        >
          <span className="iux-engine-demo__swatch-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function BordersDemo() {
  const [strength, setStrength] = useState<'subtle' | 'default' | 'strong'>('default')
  return (
    <div className="iux-engine-demo__col">
      <Toggle
        variant="segmented"
        label="Border strength"
        value={strength}
        onValueChange={v => setStrength(v as typeof strength)}
        options={[
          { value: 'subtle',  label: 'subtle' },
          { value: 'default', label: 'default' },
          { value: 'strong',  label: 'strong' },
        ]}
      />
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: `var(--color-border-${strength})`,
        }}
      >
        <p>Each rung is one of three border tokens. Hairline, intent-coloured, always visible — borders carry hierarchy here, not shadows.</p>
      </div>
    </div>
  )
}

function ElevationDemo() {
  const [idx, setIdx] = useState(2)
  const rung = RUNGS[idx]
  return (
    <div className="iux-engine-demo__col">
      <Slider
        variant="ticks"
        label={`Elevation rung: ${rung}`}
        value={idx}
        min={0}
        max={RUNGS.length - 1}
        step={1}
        snap
        onChange={n => setIdx(Math.round(n))}
        formatValue={n => RUNGS[Math.round(n)]}
      />
      <div
        className="iux-engine-demo__elevation-card"
        style={{
          boxShadow: `var(--elevation-${rung})`,
        }}
      >
        <strong>elevation.{rung}</strong>
        <p>
          Drop shadows are soft, blurred, and offset slightly downward. No hard
          two-tone, no inset, no glow — just a hint of depth.
        </p>
      </div>
    </div>
  )
}

function MotionDemo() {
  const [motionOn, setMotionOn] = useState(true)
  return (
    <div className="iux-engine-demo__col">
      <Toggle
        variant="switch"
        label="Motion"
        checked={motionOn}
        onCheckedChange={setMotionOn}
        onLabel="On"
        offLabel="Off"
      />
      <PaletteRoot
        palette={flatClassic}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Hover me</Button>
          <Button intent="neutral">Hover me</Button>
          <Button intent="success">Hover me</Button>
        </div>
        <p className="iux-engine-demo__caption">
          Hover the buttons. With motion on, background and border transition
          across the engine's 200&nbsp;ms <code>base</code> duration. Switch motion
          off and the same hover snaps instantly — flat doesn't rely on motion
          to communicate state, only to soften it.
        </p>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__col">
      <p className="iux-engine-demo__caption">
        Six intent slots. Click any button to see the focus ring — 2px solid,
        offset 2px, painted with <code>border.focus</code>.
      </p>
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">Primary</Button>
        <Button intent="neutral">Neutral</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Danger</Button>
        <Button intent="info">Info</Button>
      </div>
    </div>
  )
}

export const flatGuide: EngineGuideMeta = {
  engine: 'flat',
  name: 'Flat',
  summary:
    "The reference engine. Solid fills, one accent colour, opaque surfaces, hairline borders, soft drop shadows for elevation, and a 2px solid focus ring. Every other engine in this library is best understood as a delta against flat — so it's the right place to start.",
  plainSummary:
    "Flat is the plain, undecorated look most modern websites and apps use. Surfaces are solid colours (no see-through, no texture), there's one bright colour for buttons and links, and a soft, gentle shadow under cards to hint they're lifted off the page. Nothing fancy — it's the baseline every other style here is described against.",
  plainTeaser:
    "Plain solid surfaces, one accent colour, gentle shadows. The everyday look.",
  demoPalette: flatClassic,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'What "flat" actually means.',
      plainTitle: 'The big idea',
      plainBody: (
        <>
          <p>
            Flat asks: how little decoration can a screen get away with?
            No gradients, no glassy see-through panels, no chunky borders.
            Just solid blocks of colour, one bright accent for the
            important button, and a whisper of shadow under things that
            should look slightly raised.
          </p>
          <p>
            The point isn't to be boring — it's to be honest. If a card
            looks confusing in flat, the card is wrong. If it only looks
            good with sparkles on top, the sparkles were hiding the
            problem.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            The flat engine is built around <strong>opaque surfaces</strong>,
            <strong> one accent</strong>, and <strong>high text contrast</strong>.
            There are no decorative gradients, no glass, no inset shadows, no
            wobble. Every visual decision asks: "can a single hairline border
            and a single accent colour carry this?"
          </p>
          <p>
            That sparseness is the point: when a component reads wrong on the
            flat-classic palette, the component is wrong; when it reads wrong on
            an exotic palette, the palette is interesting.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Opaque rectangles with a tonal hierarchy.',
      plainTitle: 'Surfaces (the panels and pages)',
      plainBody: (
        <>
          <p>
            Every panel — pages, cards, menus, popups — is one solid
            colour. Nothing is see-through. The page might be a very
            pale grey and the cards plain white, but you can never
            squint and see what's behind a panel.
          </p>
          <p>
            Other styles in this library do let you see through their
            panels (frosted glass, for example). Flat deliberately
            doesn't. If two layers need to feel different, flat uses a
            thin line or a soft shadow — never transparency.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Flat exercises four surface tokens:
            {' '}<code>surface.base</code>, <code>surface.raised</code>,
            {' '}<code>surface.sunken</code>, and <code>surface.overlay</code>.
            All four are <em>opaque</em>. There is no backdrop-blur
            (<code>effect.backdropBlur.*</code> is <code>none</code>) and no
            overlay texture (<code>effect.overlay.image</code> is{' '}
            <code>none</code>). Engines like Glassmorphism light those slots
            up; flat deliberately doesn't.
          </p>
          <p>
            The swatches below are the four flat-classic surfaces side by side.
            Differences between <code>base</code> and <code>raised</code> are
            often zero — flat relies on borders and shadows to separate
            elevations, not surface colour.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Hairline, visible, role-driven.',
      plainTitle: 'Borders (the thin lines)',
      plainBody: (
        <>
          <p>
            Lines around things are <em>thin</em> and always there. A
            card has one. A text box has one. They aren't decorative —
            they do the quiet work of telling you "this group of stuff
            ends here, that group starts there."
          </p>
          <p>
            Flat has three weights of line: a soft one for inside
            divisions, a default one for most edges, and a slightly
            stronger one when you want a panel to stand out. Try the
            buttons in the demo to see the same panel re-key from
            background-noise to clearly-foreground with nothing but the
            line changing.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Borders are <strong>thin</strong> (1px in flat-classic) and{' '}
            <strong>always visible</strong>. The engine uses three rungs
            — <code>border.subtle</code>, <code>border.default</code>,
            {' '}<code>border.strong</code> — to carry the visual hierarchy
            other engines might carry with shadow stacks or hard offsets.
          </p>
          <p>
            Click each rung to see how a single token swap re-keys the
            entire structure of the panel. No shape changes; the border alone
            decides what reads as "main" vs. "supporting."
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Soft drop shadows, no offset.',
      plainTitle: 'Lifting things off the page',
      plainBody: (
        <>
          <p>
            When something needs to look "on top of" the page —
            a card, a dropdown, a dialog — flat uses a soft, blurry
            shadow underneath it. The further "up" the thing is meant
            to feel, the bigger and slightly darker the shadow.
          </p>
          <p>
            Move the slider in the demo: the card itself doesn't change
            colour or shape, only its shadow grows. That's the whole
            trick — depth is just shadow, never a heavy line or a
            sticker-like offset like you might see in other styles.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Flat has five elevation rungs: <code>flat → low → medium → high → overlay</code>.
            Each is a softly-blurred, slightly-downward drop shadow with no
            hard offset. The further up the rungs you go, the larger the blur
            and the heavier the alpha — never a colour shift, never an inset.
          </p>
          <p>
            Drag the slider to cycle the card through every rung. The
            <code> elevation.flat</code> rung is literally <code>'none'</code>{' '}
            — flat is the only engine that ships an explicit "no shadow"
            elevation, because surface-on-surface stacking is something the
            engine actively supports.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Short, eased, never decorative.',
      plainTitle: 'Motion (how things move)',
      plainBody: (
        <>
          <p>
            Flat moves only enough to soften changes. Hover a button
            and its colour fades quickly into the hover colour — about
            a fifth of a second. There's no bouncing, no springing, no
            wobble. Things don't dance into place; they just arrive
            slightly smoother than a hard cut would feel.
          </p>
          <p>
            Turn motion off in the demo and the buttons still work
            perfectly — the colour change just snaps instead of fading.
            Flat treats movement as polish, not as the thing that
            tells you what happened.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Motion in the flat engine is exclusively functional. Four
            durations — <code>instant</code> (0&nbsp;ms), <code>fast</code> (120&nbsp;ms),
            {' '}<code>base</code> (200&nbsp;ms), <code>slow</code> (320&nbsp;ms) — drive
            state transitions: hover, focus, press, open/close. There is no
            decay tail (<code>motion.decay</code> is <code>0&nbsp;ms</code>; CRT
            engine sets it to ~80&nbsp;ms), and no spring used as decoration.
          </p>
          <p>
            Flip motion off and the buttons keep working — colour still
            changes on hover, focus still appears on click. The engine treats
            motion as <em>softening</em> state changes, not <em>conveying</em>{' '}
            them.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Six intents, one focus ring, AA contrast.',
      plainTitle: 'Button colours and keyboard focus',
      plainBody: (
        <>
          <p>
            Six button "meanings" — the main action, a neutral
            option, success (green), warning (amber), danger (red),
            and info (blue). Each is a solid block of colour with
            white text. No gradients, no glow, no fancy tricks.
          </p>
          <p>
            When you tab through with the keyboard, the focused
            element gets a clear blue ring around it — the same ring
            every time, no matter which button it is. The ring's job
            is purely "where am I right now?" It doesn't try to match
            the button's own colour.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Flat hits the contract's six intent slots —
            {' '}<code>primary</code>, <code>neutral</code>, <code>success</code>,
            {' '}<code>warning</code>, <code>danger</code>, <code>info</code> —
            with solid fills that all clear WCAG AA against{' '}
            <code>content.inverse</code> (white). No gradients, no glow.
          </p>
          <p>
            Focus is one rule for every interactive element:{' '}
            <code>2px solid var(--color-border-focus)</code> at a 2px offset.
            Click each button below to see it; the ring lands on the same
            blue regardless of the button's intent, because focus is an
            accessibility signal, not a brand surface.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
