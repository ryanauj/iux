// ABOUTME: Engine guide definition for the Skeuomorphism rendering engine — the physical-material engine that evokes paper, leather, and brushed metal using warm parchment surfaces and a three-layer bevel per elevation slot (inset top highlight, inset bottom shade, outer drop shadow), with the flat rung retaining the inset pair so recessed inputs get a bevel without lifting off the surface.

import { useState } from 'react'
import { palette as skeuomorphism } from '../../../palettes/skeuomorphism'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Toggle } from '../../components/Toggle/Toggle'
import { Slider } from '../../components/Slider/Slider'
import type { EngineGuideMeta } from './types'

// ABOUTME: Union of the five named elevation rungs used to drive the interactive elevation slider in ElevationDemo.
type ElevationRung = 'flat' | 'low' | 'medium' | 'high' | 'overlay'
// ABOUTME: Ordered array of ElevationRung values used to map a Slider index to a rung name.
const RUNGS: ElevationRung[] = ['flat', 'low', 'medium', 'high', 'overlay']
// ABOUTME: Union of the four bevel rung names available for the segmented bevel picker in MotionDemo (flat through high, excluding overlay which has no bevel step).
type BevelRung = 'flat' | 'low' | 'medium' | 'high'
// ABOUTME: Ordered array of BevelRung values so the segmented Toggle in MotionDemo can cycle through the four bevelled elevation slots.
const BEVELS: BevelRung[] = ['flat', 'low', 'medium', 'high']

// ABOUTME: Renders the philosophy step demo: a warm-parchment Card with bevelled elevation, illustrating that the engine evokes physical material through stacked shadow strings alone, without a CSS gradient.
function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__row">
      <Card title="Settings" subtitle="Material mimicry, no real gradient." variant="static">
        <p>
          Warm parchment field, ink-on-paper content, and a bevel
          recipe per elevation slot — inset top highlight, inset
          bottom shade, soft outer drop. The whole engine evokes
          brushed metal, leather, and pressed paper without
          painting a single CSS gradient.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Save</Button>
          <Button intent="neutral">Cancel</Button>
        </div>
      </Card>
    </div>
  )
}

// ABOUTME: Renders the surfaces step demo: a four-swatch grid showing the warm parchment tone ladder from desk-base through overlay-sheet, each with a low-elevation bevel.
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
            style={{
              background: `var(${s.cssVar})`,
              borderColor: 'var(--color-border-default)',
              boxShadow: 'var(--elevation-low)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        All four surfaces are warm parchment tones, opaque, with no
        backdrop blur. <code>base</code> is the desk; <code>raised</code>{' '}
        is lighter parchment (paper lifted off the desk);{' '}
        <code>sunken</code> is darker leather (recessed wells);{' '}
        <code>overlay</code> is the lightest tone of all (a dialog or
        popover sheet). Hierarchy is half tone, half bevel.
      </p>
    </div>
  )
}

// ABOUTME: Renders the borders step demo: three stacked panels showing warm-black ink-alpha borders at subtle, default, and strong opacities, each already carrying a low-elevation bevel.
function BordersDemo() {
  return (
    <div className="iux-engine-demo__col">
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-subtle)',
          background: 'var(--color-surface-raised)',
          boxShadow: 'var(--elevation-low)',
        }}
      >
        <p>
          <code>border.subtle</code> — a warm-black alpha used for
          dividers between cells in the same panel.
        </p>
      </div>
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-default)',
          background: 'var(--color-surface-raised)',
          boxShadow: 'var(--elevation-low)',
        }}
      >
        <p>
          <code>border.default</code> — the standard ink line around
          inputs and outlined buttons.
        </p>
      </div>
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-strong)',
          background: 'var(--color-surface-raised)',
          boxShadow: 'var(--elevation-medium)',
        }}
      >
        <p>
          <code>border.strong</code> — the dark edge that wraps
          accent panels and tactile controls.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        Borders are all <em>warm-black alphas</em> — they read as
        ink lines on paper, regardless of the surface tone behind
        them. The engine leans on them more than Material does
        because the bevel recipe gives every shape a strong
        physical edge already; the border just confirms it.
      </p>
    </div>
  )
}

// ABOUTME: Renders the elevation step demo: a Slider scrubs through five rungs to show the three-layer bevel (inset top highlight, inset bottom shade, outer drop) thickening with each step.
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
          background: 'var(--color-surface-raised)',
          borderWidth: 'var(--border-width-thin)',
          borderStyle: 'solid',
          borderColor: 'var(--color-border-default)',
        }}
      >
        <strong>elevation.{rung}</strong>
        <p>
          Three layers per slot. An <em>inset top highlight</em>{' '}
          (warm cream at low alpha) reads as light catching the
          chamfered top edge. An <em>inset bottom shade</em>{' '}
          (warm-black at low alpha) reads as the chamfered underside.
          An <em>outer drop shadow</em> grounds the object against
          the desk. Together they paint a bevel without a single
          gradient.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        <code>elevation.flat</code> still packs the inset
        highlight + shade pair (with no outer drop) — that's how a
        recessed input or pressed button gets its bevel without
        lifting off the surface. The contract doesn't expose
        gradients, so the engine carries every depth cue through
        the stacked-shadow strings each slot allows.
      </p>
    </div>
  )
}

// ABOUTME: Renders the motion step demo: a motion toggle and bevel-rung picker let the user watch the highlight and shade thicken in lockstep through the engine's tight 200 ms base curve.
function MotionDemo() {
  const [motionOn, setMotionOn] = useState(true)
  const [bevel, setBevel] = useState<BevelRung>('low')
  return (
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__cluster">
        <Toggle
          variant="switch"
          label="Motion"
          checked={motionOn}
          onCheckedChange={setMotionOn}
          onLabel="On"
          offLabel="Off"
        />
        <Toggle
          variant="segmented"
          label="Bevel"
          value={bevel}
          onValueChange={v => setBevel(v as BevelRung)}
          options={BEVELS.map(b => ({ value: b, label: b }))}
        />
      </div>
      <PaletteRoot
        palette={skeuomorphism}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${bevel})`,
            background: 'var(--color-surface-raised)',
            borderWidth: 'var(--border-width-thin)',
            borderStyle: 'solid',
            borderColor: 'var(--color-border-default)',
          }}
        >
          <strong>bevel: {bevel}</strong>
          <p>
            Toggle between bevel rungs to watch the highlight and
            shade thicken in lockstep. With motion on, the
            transition runs through the engine's standard curve at
            a tight 200&nbsp;ms <code>base</code>.
          </p>
        </div>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Hover me</Button>
          <Button intent="neutral">Hover me</Button>
          <Button intent="warning">Hover me</Button>
        </div>
        <p className="iux-engine-demo__caption">
          Durations are tight (120&nbsp;ms <code>fast</code>,
          200&nbsp;ms <code>base</code>, 320&nbsp;ms <code>slow</code>)
          and the standard curve is sharper than Material's. The
          engine wants press and release to feel like physical
          contact — snappy, definite, no bounce. Decay is{' '}
          <code>0&nbsp;ms</code>; the spring curve exists in the
          slot but is reserved for affirmative transitions only.
        </p>
      </PaletteRoot>
    </div>
  )
}

// ABOUTME: Renders the intent step demo: all six intent buttons showing brushed-tone fills with cream ink for five intents and the parchment-tile neutral, plus the umber focus ring.
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
        Five of the six intents fill with saturated brushed-tone
        colour — deep green primary and success, mustard warning,
        ox-blood danger, slate-blue info — and carry the engine's
        warm <code>content.inverse</code> (a cream ink rather than
        pure white). Every fill clears WCAG AA against that cream.
        Only <code>neutral</code> stays parchment: a darker
        parchment tile with ink content, the way a leather-wrapped
        secondary button would look. Focus is a 2px solid umber
        ring at a 2px offset — the same warm-black family as the
        page's text.
      </p>
    </div>
  )
}

// ABOUTME: skeuomorphismGuide — the EngineGuideMeta for the Skeuomorphism engine: five steps (philosophy, surfaces, borders, elevation, motion, intent) demonstrated against the skeuomorphism palette, covering warm parchment tone hierarchy, the three-layer bevel recipe delivered through stacked shadow strings, warm-black ink borders, tight snap-physical motion, and brushed-tone intent fills with cream ink.
export const skeuomorphismGuide: EngineGuideMeta = {
  engine: 'skeuomorphism',
  name: 'Skeuomorphism',
  summary:
    "Material mimicry done with shadows alone. Warm parchment surfaces, ink-on-paper content, and an elevation recipe that stacks three shadow layers per slot — inset top highlight, inset bottom shade, and a soft outer drop — so every control reads as a bevelled physical object. The contract doesn't expose gradients, so the engine carries every depth cue through the stacked shadow strings the elevation slot does allow. Even the flat rung holds an inset highlight-and-shade pair, which is how recessed inputs and pressed buttons get their bevel without lifting off the surface.",
  demoPalette: skeuomorphism,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Real-world materials, painted in shadow.',
      body: (
        <>
          <p>
            Skeuomorphism's metaphor is <em>physical material</em> —
            paper, leather, brushed metal, pressed buttons. The
            engine sets warm parchment surface tones and ink-on-paper
            content, then leans on a three-layer bevel recipe at
            every elevation slot to paint the chamfered edges that
            sell the metaphor.
          </p>
          <p>
            The contract doesn't expose gradients, so the engine
            does its work entirely through the stacked-shadow
            strings each elevation slot permits. The result is a
            tactile interface that doesn't need a single
            <code> background-image</code> to read as real material.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Warm parchment, tonally ranked.',
      body: (
        <>
          <p>
            All four surfaces are warm parchment tones, opaque, with
            no backdrop blur and no overlay texture.{' '}
            <code>base</code> is the desk; <code>raised</code> is a
            lighter sheet of paper lifted off it; <code>sunken</code>{' '}
            is the darker leather of a recessed well;{' '}
            <code>overlay</code> is the lightest of the four — the
            top sheet on the stack.
          </p>
          <p>
            Unlike Material (which leans almost entirely on shadow)
            or Neumorphism (which refuses tone entirely), the engine
            uses <em>both</em> tonal hierarchy and the bevel
            recipe. The surface ladder tells you which sheet is the
            top one; the bevel tells you it's a real object.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Warm-black ink alphas.',
      body: (
        <>
          <p>
            Borders are <em>warm-black alphas</em> at three rungs —
            <code> 0.16</code>, <code>0.32</code>, <code>0.50</code>{' '}
            opacity. They read as ink lines on parchment, regardless
            of which surface tone they sit on. The engine uses them
            more than Material does, because every shape already has
            a strong bevelled silhouette and the ink line just
            confirms the edge.
          </p>
          <p>
            Focus is a 2px solid umber ring at a 2px offset — the
            same warm-black family as body ink. The engine doesn't
            colour-shift its focus signal; it just thickens the line
            the bevel was already drawing.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Three-layer bevel per slot.',
      body: (
        <>
          <p>
            This is the engine. Every elevation slot packs three
            layered shadows: an <em>inset top highlight</em>{' '}
            (warm cream at low alpha) for the chamfered top edge,
            an <em>inset bottom shade</em> (warm-black at low alpha)
            for the chamfered underside, and an <em>outer drop
            shadow</em> grounding the object against the desk.
          </p>
          <p>
            <code>elevation.flat</code> is the engine's quiet trick:
            it still packs the inset highlight + shade pair (without
            the outer drop). That's how a recessed input or a
            pressed button gets a bevel without lifting — the same
            chamfered edge, pinned flush to the surface beneath.
            Drag the slider; the bevel thickens as the rung climbs.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Tight band, sharp curve, no bounce.',
      body: (
        <>
          <p>
            Durations are tight, matching flat almost exactly:{' '}
            <code>fast</code> 120&nbsp;ms, <code>base</code>{' '}
            200&nbsp;ms, <code>slow</code> 320&nbsp;ms. The standard
            curve is sharper than Material's{' '}
            (<code>cubic-bezier(0.3, 0.7, 0.4, 1)</code>) — the
            engine wants every transition to feel like physical
            contact, snappy and definite, with no overshoot or
            bounce.
          </p>
          <p>
            Decay is <code>0&nbsp;ms</code>; the spring curve lives
            in the easing slot but is reserved for affirmative
            transitions, not state changes. Toggle the bevel rung
            in the demo to watch the highlight and shade thicken
            in lockstep — that visible lockstep is the engine's
            physicality cue, and tight motion is what keeps it from
            reading as gimmicky.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Brushed-tone fills, cream ink, umber focus.',
      body: (
        <>
          <p>
            Five intents fill with saturated brushed-tone colour —
            deep green <code>primary</code> and <code>success</code>,
            mustard <code>warning</code>, ox-blood <code>danger</code>,
            slate-blue <code>info</code> — and carry the engine's
            warm <code>content.inverse</code> (cream, not pure
            white). Every fill clears WCAG AA against that cream.
          </p>
          <p>
            <code>neutral</code> stays parchment: a darker parchment
            tile with ink content, the way a leather-wrapped
            secondary button would look. Focus is a 2px solid umber
            ring at a 2px offset — the same warm-black family as
            body ink, so the ring reads as an emphasised stroke of
            the engine's own pen rather than an alien accessibility
            signal.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
