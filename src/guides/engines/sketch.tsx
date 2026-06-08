// ABOUTME: Engine guide definition for the Sketch rendering engine — the hand-drawn engine that applies a single SVG feTurbulence + feDisplacementMap filter at the palette root so every border, glyph outline, focus ring, and shadow stroke is recast as a wobbling hand-drawn line, with raised surfaces swapping to a heavier wobble variant and borders skewed thicker than flat because 1 px hairlines disappear under the displacement pass.

import { useState } from 'react'
import { palette as sketchMarker } from '../../../palettes/sketch-marker'
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

// ABOUTME: Renders the philosophy step demo: a Card on the cream paper field where every border and shadow is already displaced by the root SVG turbulence filter, illustrating that a single filter pass wobbles all components uniformly.
function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__row">
      <Card title="Notebook" subtitle="Every line a hand drew." variant="static">
        <p>
          Cream paper field, ink-blue body, red-marker focus. Every border,
          every glyph outline, every shadow stroke passes through one SVG
          turbulence + displacement filter at the palette root — the wobble
          is uniform across cards, inputs, and buttons because a single
          filter drives all of them.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Save</Button>
          <Button intent="neutral">Cancel</Button>
        </div>
      </Card>
    </div>
  )
}

// ABOUTME: Renders the surfaces step demo: a four-swatch grid of warm paper tones where the displacement filter visibly loosens every corner even on a perfectly square swatch.
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
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Four warm paper tones — cream base, brighter raised, deeper sunken
        sub-panel, brightest overlay. The swatch rectangles look square here,
        but every edge is being displaced by the wobble filter; zoom in and
        you can see the corners loosen. The cue isn't a tonal swap, it's
        which scrap of paper is on top.
      </p>
    </div>
  )
}

// ABOUTME: Renders the borders step demo: a segmented control picks between three ink-intensity rungs on a bordered div displaced by the wobble filter, showing that width steps up to survive the displacement pass.
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
          borderWidth: 'var(--border-width-thin)',
        }}
      >
        <p>
          <code>border.{strength}</code> — a marker line at one of three
          ink intensities. The displacement filter takes a clean CSS rule
          and recasts it as a hand-drawn stroke; the rung only decides
          how dark the ink reads.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        Border widths skew thick on this engine — a 1px hairline mostly
        disappears under the displacement pass, so <code>thin</code> and{' '}
        <code>thick</code> step up to 2 and 3 pixels. The wobble is the
        load-bearing edge; the colour just chooses how present that wobble
        is.
      </p>
    </div>
  )
}

// ABOUTME: Renders the elevation step demo: a Slider scrubs five rungs showing ink-blue hard-offset shadows with a secondary soft blur at higher levels, and the heavier wobble variant applied to the card class.
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
          Shadows are tinted toward ink-blue rather than neutral black —
          the cast under a raised card reads as a darker patch of ink
          leaking around the edge rather than a soft drop. Higher rungs
          stack a hard offset with a softer secondary blur for depth.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        Card, Modal, Drawer, and Toast get a heavier wobble variant
        scoped just to those classes — the engine swaps in{' '}
        <code>#iux-sketch-wobble-strong</code> over the root filter, so
        the eye lingers on a more obviously drawn frame. Radius tokens
        stay <em>advisory</em>: <code>radius.lg</code> reads more rounded
        than <code>radius.none</code>, but neither corner is geometrically
        circular once the displacement pass runs.
      </p>
    </div>
  )
}

// ABOUTME: Renders the motion step demo: a motion toggle shows that toggling motion only affects colour transition durations, not the static SVG wobble — the drawn-line look stays regardless of motion state.
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
        palette={sketchMarker}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Hover me</Button>
          <Button intent="neutral">Hover me</Button>
          <Button intent="danger">Hover me</Button>
        </div>
        <p className="iux-engine-demo__caption">
          Hover the buttons. The wobble itself doesn't animate — the
          turbulence field is static, so what moves is the standard
          colour transition across the engine's 240&nbsp;ms{' '}
          <code>base</code> duration, slightly longer than flat to read
          as "ink settling" rather than a GPU swap. Switch motion off and
          the colour snaps; the drawn-line look stays exactly as it was,
          because it isn't motion in the first place.
        </p>
      </PaletteRoot>
    </div>
  )
}

// ABOUTME: Renders the intent step demo: all six intent buttons with marker fills where each border sits one luminance step darker than its fill, making each chip read as outline-drawn-first after the displacement pass.
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
        A five-marker set: navy primary, sage success, mustard warning,
        red danger, teal info — plus a cream neutral that reads as
        un-coloured paper. Every <code>intent.*.border</code> sits one
        luminance step darker than its fill, so after the displacement
        pass each chip reads as "outline drawn first, ink filled second."
        Focus is the red marker at a 3px width and 3px offset — wider
        than flat because the wobble pass loosens the ring and the engine
        wants it to stay obvious.
      </p>
    </div>
  )
}

// ABOUTME: sketchGuide — the EngineGuideMeta for the Sketch engine: six steps (philosophy, surfaces, borders, elevation, motion, intent) demonstrated against the sketch-marker palette, covering the SVG displacement filter, warm paper tone surfaces, thickened marker-line borders, ink-blue cast shadows with a heavier wobble on cards, ink-settling motion, and the five-marker intent set with a red-marker focus loop.
export const sketchGuide: EngineGuideMeta = {
  engine: 'sketch',
  name: 'Sketch',
  summary:
    "A notebook margin, modelled as an engine. One SVG turbulence + displacement filter applied at the palette root recasts every border, glyph outline, focus ring, and shadow stroke as a hand-drawn approximation; raised surfaces (Card, Modal, Drawer, Toast) swap to a heavier wobble variant so the eye lingers on a more obviously drawn frame. `effect.strokeVariance` records the displacement amplitude. Radius tokens are advisory — a stated `radius.lg` reads more rounded than `radius.none`, but the filter loosens every corner regardless.",
  demoPalette: sketchMarker,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Every line looks drawn.',
      body: (
        <>
          <p>
            Sketch is built on a single trick no other engine uses: an SVG
            <code> feTurbulence + feDisplacementMap</code> filter applied
            at the palette root, ending in a quarter-pixel{' '}
            <code>feGaussianBlur</code> for marker bleed. Every existing
            border, radius, and shadow inherits the wobble for free — no
            component opts in. The single filter pass also keeps the
            jitter <em>consistent</em> across adjacent controls; a button
            next to a card next to an input all look like the same hand
            drew them.
          </p>
          <p>
            The palette around the engine is notebook-margin coloured:
            cream paper field, ink-blue body type, red-marker focus and
            link, five-marker intent set. <code>effect.strokeVariance</code>{' '}
            records the displacement amplitude ({' '}<code>1.4px</code>{' '}
            here) so future hand-drawn-aware components could match the
            wobble exactly without re-deriving it.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Warm paper tones, all wobbled.',
      body: (
        <>
          <p>
            Four warm paper tones — <code>base</code> cream,{' '}
            <code>raised</code> brighter cream, <code>sunken</code> a
            deeper sage-cream for inset wells, <code>overlay</code> the
            brightest sheet for dialog panels. The tonal differences are
            small; the engine relies on borders and shadows to separate
            layers, not on a sharp surface lift.
          </p>
          <p>
            Every surface still passes through the root displacement
            filter, so the corners of even a perfectly square swatch
            visibly loosen. That's the point: the same paper field
            renders differently every time a layout reshuffles, the way
            a sketch never reuses the same straight line twice.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Marker lines, three ink weights.',
      body: (
        <>
          <p>
            Borders are <strong>thicker than flat</strong> by design.
            A 1px hairline mostly disappears under the displacement
            pass, so <code>thin</code> is 2 pixels and <code>thick</code>{' '}
            is 3. The three colour rungs —{' '}
            <code>border.subtle</code>, <code>border.default</code>,{' '}
            <code>border.strong</code> — choose the ink intensity rather
            than the line weight.
          </p>
          <p>
            Drag the segmented control to walk the rungs. The displacement
            field is the load-bearing edge; the colour just chooses how
            present that wobble is. Because every border is wobbled by
            the same filter, dense tables can read as visually merged —
            that's the engine's defining trade-off, named in the palette
            README.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Ink-blue casts, heavier wobble on cards.',
      body: (
        <>
          <p>
            Shadows are tinted toward ink-blue rather than neutral black —
            a cast under a raised card reads as a darker patch of ink
            leaking around the edge, not as ambient depth.{' '}
            <code>low</code> is a hard offset, <code>medium</code> and
            above stack a soft secondary blur on top so larger sheets
            get a bit of ambient lift in addition to the ink edge.
          </p>
          <p>
            Card, Modal, Drawer, and Toast swap from the root wobble to a{' '}
            <em>stronger</em> wobble filter scoped just to those classes —
            the eye lingers longest on raised surfaces, so the engine
            sells the drawn-frame effect there hardest. Radius is{' '}
            advisory: <code>radius.lg</code> still reads more rounded
            than <code>radius.none</code>, but the displacement loosens
            every corner regardless.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Static wobble, ink-settling transitions.',
      body: (
        <>
          <p>
            Durations sit slightly above flat —{' '}
            <code>fast</code> 140&nbsp;ms, <code>base</code> 240&nbsp;ms,{' '}
            <code>slow</code> 380&nbsp;ms — so hovers read as ink
            settling rather than a GPU flip. The standard easings stay
            standard; only the spring slot tightens to a small overshoot
            for the felt-tip "lift the pen" feel.
          </p>
          <p>
            Crucially, the wobble itself is <strong>not</strong> motion.
            The SVG turbulence field is static — the same displacement
            map is sampled every frame — so toggling motion off in the
            demo affects only the colour transitions, not the drawn-line
            look. The engine treats wobble as decoration, the same way
            CRT treats scanlines.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Five markers plus a red focus loop.',
      body: (
        <>
          <p>
            A five-marker palette — navy primary, sage success, mustard
            warning, red danger, teal info — plus a cream neutral that
            reads as un-coloured paper. Every{' '}
            <code>intent.*.border</code> sits one luminance step darker
            than its fill, so after the displacement pass each chip
            reads as "outline drawn first, ink filled second" — exactly
            how a real sketch is built up in layers.
          </p>
          <p>
            Focus is the red marker at <code>3px</code> width and{' '}
            <code>3px</code> offset — wider than flat because the
            displacement pass loosens the ring and the engine wants the
            loop to stay obvious. Combined with the cream field, a
            focused control reads as a deliberately circled affordance,
            not as a high-contrast safety signal.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
