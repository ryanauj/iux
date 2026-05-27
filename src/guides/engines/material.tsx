import { useState } from 'react'
import { palette as material } from '../../../palettes/material'
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
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__material-stack">
        <div className="iux-engine-demo__material-sheet" style={{ boxShadow: 'var(--elevation-low)' }}>
          <strong>elevation.low — sheet 1</strong>
          <p>The first sheet of paper sits on the page.</p>
        </div>
        <div className="iux-engine-demo__material-sheet" style={{ boxShadow: 'var(--elevation-medium)', marginLeft: 'var(--space-5)' }}>
          <strong>elevation.medium — sheet 2</strong>
          <p>A second sheet lifts above the first. Same colour, more shadow.</p>
        </div>
        <div className="iux-engine-demo__material-sheet" style={{ boxShadow: 'var(--elevation-high)', marginLeft: 'var(--space-7)' }}>
          <strong>elevation.high — sheet 3</strong>
          <p>The active card floats highest. Z-order is shadow, not colour.</p>
        </div>
      </div>
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
    <div className="iux-engine-demo__col">
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
      <p className="iux-engine-demo__caption">
        All four swatches are <em>opaque</em>. <code>base</code> is a hair
        grey so the white <code>raised</code> sheets read as lifted off the
        page. No alpha, no blur — the engine is paper-and-ink.
      </p>
    </div>
  )
}

function BordersDemo() {
  return (
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__bordered" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <p><code>border.subtle</code> — <code>rgba(0,0,0,0.08)</code>, used for divider lines inside a sheet.</p>
      </div>
      <div className="iux-engine-demo__bordered" style={{ borderColor: 'var(--color-border-default)' }}>
        <p><code>border.default</code> — <code>rgba(0,0,0,0.16)</code>, used for outlined inputs.</p>
      </div>
      <div className="iux-engine-demo__bordered" style={{ borderColor: 'var(--color-border-strong)' }}>
        <p><code>border.strong</code> — <code>rgba(0,0,0,0.32)</code>, used for emphasised outlines.</p>
      </div>
      <p className="iux-engine-demo__caption">
        Borders are alpha over ink — they get heavier when the surface
        underneath is lighter, lighter when it's darker. Material rarely
        leans on them: the shadow ladder already separates levels.
      </p>
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
        style={{ boxShadow: `var(--elevation-${rung})` }}
      >
        <strong>elevation.{rung}</strong>
        <p>
          Material's shadow recipe pairs a soft <em>ambient</em> shadow
          (broad, low-alpha) with a tighter <em>key</em> shadow (offset
          downward). Both grow together as the sheet lifts.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        At <code>flat</code> the sheet sits on the page; at <code>overlay</code>{' '}
        you're at modal/menu height. The intermediate rungs aren't decorative —
        they map to the spec's z-levels (resting card, raised card, dialog).
      </p>
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
        palette={material}
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
          Hover the buttons. Material uses the standard easing curve
          (<code>cubic-bezier(0.4, 0, 0.2, 1)</code>) at a wider 250&nbsp;ms{' '}
          <code>base</code> — that's where the ripple-style press
          affordance gets its weight. Flat is faster (200&nbsp;ms) and
          flatter; Material wants the transition to read as a deliberate
          press.
        </p>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">Primary</Button>
        <Button intent="neutral">Neutral</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Danger</Button>
        <Button intent="info">Info</Button>
      </div>
      <p className="iux-engine-demo__caption">
        Saturated fills, white <code>content.inverse</code>, indigo focus
        ring on every intent. <code>neutral</code> is the only exception:
        a Material-grey chip with dark ink, because the spec treats neutral
        actions as "outlined" rather than filled.
      </p>
    </div>
  )
}

function CardComposition() {
  return (
    <Card title="Settings" subtitle="A Material card is a sheet of paper." variant="static">
      <p>
        One opaque white surface, a paired ambient + key shadow at{' '}
        <code>elevation.low</code>, and indigo for the only saturated
        accent. Roboto across the UI; <code>label</code> is uppercased
        with extra tracking, the way Material captions used to be.
      </p>
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">Save</Button>
        <Button intent="neutral">Cancel</Button>
      </div>
    </Card>
  )
}

export const materialGuide: EngineGuideMeta = {
  engine: 'material',
  name: 'Material',
  summary:
    "Paper-and-ink, codified. Opaque stacked surfaces, indigo as the single accent, a real elevation ladder where each rung holds a paired ambient + key shadow, and motion tuned to Google's standard easing curve at a wider duration band so press affordances feel intentional. Material is what you get when you take flat and give shadow a real job.",
  plainSummary:
    "Material treats the screen as a stack of paper sheets. Everything is solid, like flat — but shadows do real work: the deeper a card is in the stack, the bigger the shadow under it. Indigo is the single feature colour, and button presses feel slightly slower and more deliberate than flat's, the way pressing a real button does.",
  plainTeaser:
    "Like flat, but shadows do real work — cards look like paper sheets stacked on a desk.",
  demoPalette: material,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Paper-and-ink, given physics.',
      plainTitle: 'The big idea',
      plainBody: (
        <>
          <p>
            Material is built on one image: every panel on the screen
            is a sheet of paper. To make one sheet feel "above"
            another, you don't change its colour — you give it a
            bigger shadow, the way a real sheet of paper casts a
            bigger shadow when you lift it off the desk.
          </p>
          <p>
            The three sheets in the demo are the same colour. The
            <em> only</em> reason your eye reads one as on top is the
            shadow underneath it. That's Material in one sentence.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Material is built on a single metaphor: every surface is a
            sheet of paper, and the only way one sheet exists above another
            is to <strong>cast a shadow</strong>. There is no transparency,
            no glow, no border-only hierarchy — just sheets, lifted by
            elevation.
          </p>
          <p>
            That's why Material's <code>elevation.*</code> is its load-bearing
            choice. Five rungs map directly to z-levels in the spec
            (resting card, raised card, FAB, dialog, drawer). The demo here
            is three opaque sheets of identical colour; only the shadows
            tell you which one is on top.
          </p>
          <CardComposition />
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Opaque sheets at near-identical tones.',
      plainTitle: 'Surfaces (the paper sheets)',
      plainBody: (
        <>
          <p>
            The page is a barely-grey colour. Cards on the page are
            plain white. They're <em>almost</em> the same colour —
            just enough difference that the white cards read as "lifted"
            against the slightly-grey background. Menus and dialogs go
            back to plain white too, because they're still made of
            paper.
          </p>
          <p>
            None of the panels are see-through. Material spends its
            visual budget on shadows and on the press animation, not on
            decorative tints or frosted effects.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Material's four surfaces are <em>all opaque</em>. <code>base</code>{' '}
            is barely grey — just dark enough that white <code>raised</code>{' '}
            sheets read as lifted off the page.{' '}
            <code>sunken</code> is a touch greyer for inputs and inset
            containers; <code>overlay</code> snaps back to white because
            menus and dialogs are still made of paper.
          </p>
          <p>
            There is no <code>backdrop-blur</code>, no overlay texture, no
            scrim image — Material reserves the visual budget for shadow
            and motion, not for surface effects.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Alpha over ink, used sparingly.',
      plainTitle: 'Lines, used sparingly',
      plainBody: (
        <>
          <p>
            Material almost never draws lines. The shadows already
            tell you which sheet is which, so why repeat yourself? The
            handful of lines that do appear are very pale grey —
            barely visible, the way a hairline pencil mark looks on
            paper.
          </p>
          <p>
            You'll mostly see them inside a sheet (dividing rows in a
            list) or outlining a text input. Three steps of darkness:
            barely-there, normal, and a slightly stronger one for when
            an outline really has to read first.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Borders are <code>rgba(0,0,0, …)</code> at low alpha
            — <code>0.08</code>, <code>0.16</code>, <code>0.32</code>. They
            sit on opaque paper, so they read as <em>ink lines</em> rather
            than coloured strokes. Material almost never uses them for
            hierarchy: the shadow ladder already does that work.
          </p>
          <p>
            Where they earn their slot is on outlined components — text
            fields, outlined buttons, dividers inside a sheet. Three rungs
            of subtlety, all the same hue.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'The signature paired-shadow recipe.',
      plainTitle: 'Lifting paper off the desk',
      plainBody: (
        <>
          <p>
            This is the heart of Material. Every shadow is actually
            <em> two</em> shadows layered together: a wide, soft halo
            that feels like ambient room-light, plus a tighter, darker
            shadow just under the bottom edge that feels like a
            spotlight from above. The pair is what makes a panel read
            as "real paper" rather than just "a rectangle with a
            shadow."
          </p>
          <p>
            Drag the slider in the demo to feel the ladder. Low is a
            resting card. Medium is "picked up off the desk." High is
            a floating action. Overlay is "dialog hovering over the
            page." The shadow gets bigger every step; the card itself
            doesn't change.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            This is where Material lives. Every rung except <code>flat</code>{' '}
            stacks <strong>two</strong> shadows: a wider, softer ambient
            shadow and a tighter, offset-downward key shadow. That pairing
            is the engine — a single drop shadow (flat) doesn't read as
            "paper lifted under a directional light" the way the pair does.
          </p>
          <p>
            Drag the slider to walk the rungs. <code>elevation.low</code>{' '}
            is a resting card; <code>medium</code> is raised; <code>high</code>{' '}
            is a FAB or active card; <code>overlay</code> is dialog height.
            The blur and offset grow together — never one without the other.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: "Standard easing, wider band.",
      plainTitle: 'Motion (a touch more deliberate)',
      plainBody: (
        <>
          <p>
            Material's animations are slightly longer than flat's — a
            quarter-second instead of a fifth — and they ease out at
            the end the way a finger presses a real button: fast to
            start, gentle to stop. That extra moment is what makes
            tapping a button feel mechanical instead of clicky.
          </p>
          <p>
            Hover the buttons in the demo. Toggle motion off and the
            same hover snaps instantly. The animation isn't doing the
            work of telling you the state changed — your eyes already
            saw the colour change. The motion just makes it feel
            intentional.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Material's easing is the spec's <em>standard curve</em>:{' '}
            <code>cubic-bezier(0.4, 0, 0.2, 1)</code> — slow in, fast out.
            The duration band is wider than flat: <code>fast</code> is
            150&nbsp;ms, <code>base</code> is 250&nbsp;ms, <code>slow</code>{' '}
            is 400&nbsp;ms. The extra time is for the press affordance to
            feel mechanical, not snappy.
          </p>
          <p>
            Decay (<code>motion.decay</code>) is still <code>0&nbsp;ms</code>{' '}
            — Material doesn't ring or wobble after a press. Spring easing
            is reserved for affirmative transitions (FAB → sheet, etc.), not
            for state changes.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Saturated fills, indigo focus, AA across the board.',
      plainTitle: 'Button colours and keyboard focus',
      plainBody: (
        <>
          <p>
            Six button meanings, each a strong block of colour with
            white text. Primary is Material's classic indigo; the
            others are clean, saturated takes on success-green,
            warning-amber, danger-red, info-blue. The one exception is
            the neutral button: it stays grey with dark text, because
            Material treats "cancel"-type actions as quieter outlines.
          </p>
          <p>
            Keyboard focus is one rule: a clear indigo ring around the
            focused element, no matter which button it is. Material's
            personality lives in the shadows; focus is just the safety
            signal that says "you're here."
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Six saturated intent fills with white <code>content.inverse</code>.
            <code>primary</code> is the canonical Material indigo; the
            others stick close to the spec's tonal swatches. Every fill
            clears WCAG AA against white text.
          </p>
          <p>
            Focus is one rule:{' '}
            <code>2px solid var(--color-border-focus)</code> at a 2px offset,
            painted in indigo regardless of the button's intent. Same shape
            as flat's focus ring — Material's hierarchy lives in shadow, not
            in the focus signal.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
