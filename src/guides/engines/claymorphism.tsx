// ABOUTME: Engine guide definition for the Claymorphism rendering engine — the inflated-gumdrop engine that stacks three shadow layers per elevation slot (inset bottom shade, inset top highlight, outer drop shadow) over a pastel violet host, uses large radii to turn every control into a cushion, and drives a spring-overshoot motion curve for a bouncy physical release.

import { useState } from 'react'
import { palette as claymorphism } from '../../../palettes/claymorphism'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Toggle } from '../../components/Toggle/Toggle'
import { Slider } from '../../components/Slider/Slider'
import type { EngineGuideMeta } from './types'

// ABOUTME: Union type for the five elevation slots used in the Claymorphism elevation demo.
type ElevationRung = 'flat' | 'low' | 'medium' | 'high' | 'overlay'
// ABOUTME: Ordered list of elevation rungs for the slider demo, mapping index to rung label.
const RUNGS: ElevationRung[] = ['flat', 'low', 'medium', 'high', 'overlay']
// ABOUTME: Union type for the four radius rungs exposed in the elevation demo's radius toggle.
type RadiusRung = 'sm' | 'md' | 'lg' | 'pill'
// ABOUTME: Ordered list of radius rungs used to populate the segmented toggle in the elevation demo.
const RADII: RadiusRung[] = ['sm', 'md', 'lg', 'pill']

// ABOUTME: PhilosophyDemo — static demo card on the pastel-violet Clay host with primary/neutral buttons and text describing the triple-layer shadow recipe and large radius that together create the "inflated cushion" metaphor.
function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__clay-host">
      <Card title="Settings" subtitle="Inflated, puffy, deliberate." variant="static">
        <p>
          Saturated pastel surfaces, deep ink, and a triple-layer
          elevation recipe: an inset bottom shade reads as the
          underside of a cushion; an inset top highlight catches the
          virtual light; an outer drop shadow grounds the puff
          against its pastel host.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Save</Button>
          <Button intent="neutral">Cancel</Button>
        </div>
      </Card>
    </div>
  )
}

// ABOUTME: SurfacesDemo — grid of the four Claymorphism surface swatches rendered with large radius and elevation.low's triple-shadow, captioned to explain how the inflated-cushion illusion requires a tinted host and opaque surfaces.
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
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--elevation-low)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        <code>base</code> is a pastel violet wash;{' '}
        <code>raised</code> and <code>overlay</code> are bright white;{' '}
        <code>sunken</code> deepens the violet for inset wells. The
        large default radius (<code>radius.lg</code> is the largest
        in the showcase) means every surface is a pillow, not a
        sheet — and the inset-highlight-plus-outer-shadow recipe
        only reads as "cushion" against a tinted host.
      </p>
    </div>
  )
}

// ABOUTME: BordersDemo — static three-panel demo of Claymorphism's border rungs (subtle/default/strong) as violet alphas on rounded white pillows, captioned to explain that all three are violet-family tints keeping each white surface tied to the host hue.
function BordersDemo() {
  return (
    <div className="iux-engine-demo__col">
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-subtle)',
          background: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--elevation-low)',
        }}
      >
        <p>
          <code>border.subtle</code> — a violet alpha so low the
          edge is almost subliminal. Used between adjacent puffs in
          the same cluster.
        </p>
      </div>
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-default)',
          background: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--elevation-low)',
        }}
      >
        <p>
          <code>border.default</code> — the standard puff outline,
          violet at moderate alpha so it tints the white surface
          into the engine's family hue.
        </p>
      </div>
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-strong)',
          background: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--elevation-medium)',
        }}
      >
        <p>
          <code>border.strong</code> — the rim used where the puff
          needs to read first, before its shadow has registered.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        All three border rungs are <em>violet alphas</em>, not
        greys — they read as belonging to the same family as the
        surface tint. The job isn't hierarchy (the triple-shadow
        recipe handles that); it's tying every surface back to the
        engine's signature hue.
      </p>
    </div>
  )
}

// ABOUTME: ElevationDemo — slider-plus-radius-toggle demo walking the five Claymorphism elevation rungs, showing the three-layer shadow recipe (inset bottom shade, inset top highlight, outer drop) and allowing the radius to be scrubbed to show how the cushion identity depends on radius.lg.
function ElevationDemo() {
  const [idx, setIdx] = useState(2)
  const [radius, setRadius] = useState<RadiusRung>('lg')
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
      <Toggle
        variant="segmented"
        label="Radius"
        value={radius}
        onValueChange={v => setRadius(v as RadiusRung)}
        options={RADII.map(r => ({ value: r, label: r }))}
      />
      <div className="iux-engine-demo__clay-host">
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${rung})`,
            background: 'var(--color-surface-raised)',
            borderRadius: `var(--radius-${radius})`,
          }}
        >
          <strong>elevation.{rung}</strong>
          <p>
            Three shadows, stacked. An <em>inset bottom shade</em>{' '}
            (violet) reads as the underside of the puff. An{' '}
            <em>inset top highlight</em> (white) catches the light.
            An <em>outer drop shadow</em> grounds the cushion against
            the host. Drop the radius to <code>sm</code> and the
            same recipe still works — but the engine's identity is
            visibly tied to <code>radius.lg</code>.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        Three layers in one slot is the engine's defining recipe.
        Remove any one and the puff deflates: without the inset
        bottom it floats flatly; without the inset top it reads as
        dull plastic; without the outer drop it lifts off the host
        without a base. Skeuomorphism uses a similar three-layer
        idea but in warm browns; Claymorphism's pastel hue makes the
        recipe feel inflated rather than tactile.
      </p>
    </div>
  )
}

// ABOUTME: MotionDemo — switch-controlled motion demo on a nested Claymorphism PaletteRoot, showing the wider 180/280/460 ms band and the spring-overshoot easing that gives press releases a physical bounce.
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
        palette={claymorphism}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__clay-host">
          <div className="iux-engine-demo__cluster">
            <Button intent="primary">Hover me</Button>
            <Button intent="success">Hover me</Button>
            <Button intent="warning">Hover me</Button>
            <Button intent="danger">Hover me</Button>
          </div>
        </div>
        <p className="iux-engine-demo__caption">
          Durations are wider than flat (180&nbsp;ms <code>fast</code>,
          280&nbsp;ms <code>base</code>, 460&nbsp;ms <code>slow</code>),
          and <code>motion.easing.spring</code> climbs above 1.0
          for a small overshoot — the press release reads as
          slightly bouncy, the way real clay would. Toggle motion
          off and the bounce vanishes; the buttons still work, but
          the engine loses the physicality it asks for.
        </p>
      </PaletteRoot>
    </div>
  )
}

// ABOUTME: IntentDemo — six pastel candy intent buttons on the Clay host, captioned to explain the deep-ink content on saturated fills and the wider 3px focus ring needed against the engine's inflated silhouettes.
function IntentDemo() {
  return (
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__clay-host">
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Primary</Button>
          <Button intent="neutral">Neutral</Button>
          <Button intent="success">Success</Button>
          <Button intent="warning">Warning</Button>
          <Button intent="danger">Danger</Button>
          <Button intent="info">Info</Button>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        Six pastel candy fills — lavender, mint, butter, blush, sky
        — each paired with a <strong>deep, almost-black{' '}
        <code>content</code></strong> so the bright backgrounds stay
        legible. Per-token contrast clears AA at body sizes; the{' '}
        <code>experimental</code> a11y mark is for the cursor and
        icon visibility that pastels-on-pastels degrade. Focus is{' '}
        <strong>3px</strong> at a 4px offset — wider than flat's
        ring on purpose, because the engine's inflated silhouettes
        make a 2px outline harder to find.
      </p>
    </div>
  )
}

// ABOUTME: claymorphismGuide — the EngineGuideMeta for the Claymorphism engine: five steps (philosophy, surfaces, borders, elevation, motion, intent) demonstrated against the claymorphism palette, covering the three-layer shadow recipe, large-radius cushion surfaces, violet-alpha borders, spring-overshoot motion, and pastel candy intent fills with deep ink.
export const claymorphismGuide: EngineGuideMeta = {
  engine: 'claymorphism',
  name: 'Claymorphism',
  summary:
    "Inflated 3D gumdrops. Pastel violet host, white pillow surfaces, and an elevation recipe that stacks three shadow layers per slot — an inset bottom shade for the underside, an inset top highlight for the light catch, and an outer drop shadow for the cast. Large default radii turn every control into a cushion; pastel candy intents carry deep almost-black ink so the saturated fills stay legible. Motion leans on a spring that overshoots 1.0 so press releases read as physical. The engine is experimental for a reason — pastels on pastels degrade cursor and icon visibility.",
  demoPalette: claymorphism,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Every surface is an inflated cushion.',
      body: (
        <>
          <p>
            Claymorphism is the engine of <em>inflated</em> UI: every
            control reads as a small pastel cushion, lifted off a
            tinted host. The defining trick is its elevation recipe —
            three shadow layers stacked into a single slot — and the
            large default radius that turns even a compact button
            into a pillow.
          </p>
          <p>
            Where flat asks "can a border carry this?", Claymorphism
            asks "can a three-layer shadow stack? Without painting a
            single gradient, can we render something that looks
            inflated?" The answer turns out to be yes, and the
            result has a particular cheerful, almost toy-like
            quality.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Pastel violet host, white pillows.',
      body: (
        <>
          <p>
            <code>surface.base</code> is a pastel violet wash —
            unlike flat or Material, the engine owns the page
            background. <code>raised</code> and <code>overlay</code>{' '}
            are bright white pillows; <code>sunken</code> deepens
            the violet for inset wells. All four are opaque (no
            alpha, no blur) — Claymorphism's depth lives entirely
            in shadow.
          </p>
          <p>
            The host tint is load-bearing. The inset-highlight-plus-
            outer-shadow recipe only reads as "cushion" against a
            coloured host — paint a white pillow on a white page
            and the outer drop shadow has nothing to cast onto, and
            the whole illusion deflates.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Violet alphas — the family hue.',
      body: (
        <>
          <p>
            All three border rungs are <em>violet alphas</em> — the
            same hue family as the host. <code>border.subtle</code>{' '}
            is barely visible; <code>border.default</code> tints the
            pillow into the engine's signature violet;{' '}
            <code>border.strong</code> is the rim used when a control
            needs to read before its shadow has registered.
          </p>
          <p>
            Border colour isn't the engine's hierarchy mechanism —
            the triple-shadow recipe is. The borders' job is to keep
            every white surface tied back to the host's hue, so the
            interface reads as a single material rather than white
            paper on a coloured page.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Three layers in one slot.',
      body: (
        <>
          <p>
            This is the engine. Every rung above <code>flat</code>{' '}
            stacks <strong>three</strong> shadows in a single{' '}
            <code>box-shadow</code> value: an <em>inset bottom
            shade</em> (violet, low alpha), an <em>inset top
            highlight</em> (white, low alpha), and an <em>outer
            drop shadow</em> (violet, soft). All three grow together
            as the rung climbs.
          </p>
          <p>
            The radius toggle is part of the demo because the engine
            depends on it. <code>radius.lg</code> (32&nbsp;px) is the
            largest in the showcase — drop it to <code>sm</code> and
            the recipe still paints, but the cushion looks pinched.
            Big radii are not decorative here; they're how the puff
            reads as inflated rather than chamfered.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Spring with overshoot, physical release.',
      body: (
        <>
          <p>
            Durations are wider than flat: <code>fast</code>{' '}
            180&nbsp;ms, <code>base</code> 280&nbsp;ms,{' '}
            <code>slow</code> 460&nbsp;ms. The extra time matters
            because the engine wants its release transitions to
            feel like physical clay snapping back. The standard
            curve is already a soft spring{' '}
            (<code>cubic-bezier(0.34, 1.56, 0.64, 1)</code>);{' '}
            <code>motion.easing.spring</code> goes further (1.7
            overshoot) for the most affirmative transitions.
          </p>
          <p>
            Decay is <code>0&nbsp;ms</code> — the overshoot lives
            inside the curve, not in a ring or wobble after the
            press lands. Flip motion off in the demo and the engine
            still works, but it loses the bounce that gives the
            inflated metaphor its credibility.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Pastel candy fills, deep ink, 3px focus.',
      body: (
        <>
          <p>
            Six pastel candy intents — lavender <code>primary</code>,
            mint <code>success</code>, butter <code>warning</code>,
            blush <code>danger</code>, sky <code>info</code>, and a
            washed lavender <code>neutral</code>. Every one carries
            a <strong>deep, almost-black <code>content</code></strong>{' '}
            so the bright fill stays legible. Per-token contrast
            clears AA at body sizes — but pastels on pastels degrade
            cursor and icon visibility, which is what earns the
            engine its <code>experimental</code> a11y mark.
          </p>
          <p>
            Focus is a 3px solid violet ring at a 4px offset. Wider
            than flat's 2px ring on purpose: the engine's inflated
            silhouettes give the eye less stable edge to register a
            thin outline against, so the focus ring has to fight
            harder to be seen. The 3px width is mandatory, not
            decorative.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
