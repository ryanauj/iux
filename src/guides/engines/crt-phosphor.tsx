// ABOUTME: Engine guide definition for the CRT / Phosphor rendering engine — the vacuum-tube engine that paints horizontal scanlines via effect.overlay.image, renders every glyph and edge in a single phosphor colour with a bloom halo, and adds an 80 ms motion.decay tail to state transitions so hovers and focus moves fade out the way a real CRT fades.

import { useState } from 'react'
import { palette as crtPhosphorGreen } from '../../../palettes/crt-phosphor-green'
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
    <div className="iux-engine-demo__crt-host">
      <Card title="READOUT" subtitle="One phosphor color, painted through a tube." variant="static">
        <p>
          Near-black field, single phosphor green for every glyph and edge,
          horizontal scanlines laid down by the engine, and a soft bloom
          on every character. The look is the recipe — there is no
          accent colour, because in monochrome there can't be one.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">OK</Button>
          <Button intent="neutral">CANCEL</Button>
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
    <div className="iux-engine-demo__crt-host">
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
        All four surfaces are essentially the same near-black tube field.
        What separates <code>raised</code> from <code>base</code> isn't
        a tonal lift — it's the inset phosphor stroke baked into{' '}
        <code>elevation.*</code>. The scanline gradient painting across the
        host is <code>effect.overlay.image</code> doing its job.
      </p>
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
      <div className="iux-engine-demo__crt-host">
        <div
          className="iux-engine-demo__bordered"
          style={{
            borderColor: `var(--color-border-${strength})`,
            background: 'transparent',
          }}
        >
          <p>
            Each rung is the phosphor green at a different alpha —{' '}
            <code>0.18</code>, <code>0.34</code>, <code>0.58</code>. There
            is no second colour to fight; only how brightly the stroke
            cuts through the scanlines.
          </p>
        </div>
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
      <div className="iux-engine-demo__crt-host">
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${rung})`,
            background: 'transparent',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <strong>elevation.{rung}</strong>
          <p>
            Two layers per slot above <code>flat</code>: an{' '}
            <em>inset 1px phosphor stroke</em> draws the cabinet edge, and
            an <em>outer phosphor glow</em> blooms around it. Both grow
            together as the rung climbs; <code>overlay</code> adds a heavy
            outer drop so modal sheets seat against the tube.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        <code>elevation.flat</code> keeps only the inset stroke — the
        engine never paints a card without an edge, because in CRT a
        rectangle without a phosphor rim is just a hole in the field.
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
        palette={crtPhosphorGreen}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__crt-host">
          <div className="iux-engine-demo__cluster">
            <Button intent="primary">HOVER ME</Button>
            <Button intent="neutral">HOVER ME</Button>
            <Button intent="success">HOVER ME</Button>
          </div>
          <p className="iux-engine-demo__caption">
            Hover the buttons. With motion on, the background and border
            transition runs the engine's 180&nbsp;ms <code>base</code>{' '}
            duration <em>plus</em> the 80&nbsp;ms{' '}
            <code>motion.decay</code> tail — so when you move off, the hover
            colour lingers and fades like a phosphor trail. Click any
            button and the focus halo pulses on the same decay regime.
            Switch motion off and both the duration and the decay collapse
            to zero — the trail disappears, the pulse stops, the scanlines
            stay (they're decoration, not motion).
          </p>
        </div>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__crt-host">
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">PRIMARY</Button>
        <Button intent="neutral">NEUTRAL</Button>
        <Button intent="success">SUCCESS</Button>
        <Button intent="warning">WARNING</Button>
        <Button intent="danger">DANGER</Button>
        <Button intent="info">INFO</Button>
      </div>
      <p className="iux-engine-demo__caption">
        Six intents, one colour. The fills are{' '}
        <code>rgba(125, 255, 138, …)</code> at different alphas; the
        borders are the same phosphor at different alphas. A{' '}
        <code>danger</code> button and a <code>primary</code> button
        differ only in stroke brightness, which is exactly how a
        monochrome tube would render them. Focus is a 1px phosphor
        outline plus a glow halo built from{' '}
        <code>effect.glow.radius</code>; the halo pulses through the
        <code> motion.decay</code> regime as long as the focus is held.
      </p>
    </div>
  )
}

// ABOUTME: crtPhosphorGuide — the EngineGuideMeta for the CRT / Phosphor engine: six steps (philosophy, surfaces, borders, elevation, motion, intent) demonstrated against the crt-phosphor-green palette, covering the scanline overlay, the inset-phosphor-stroke plus outer-bloom elevation recipe, the decay-tail motion regime, and the single-hue alpha-only intent differentiation.
export const crtPhosphorGuide: EngineGuideMeta = {
  engine: 'crt-phosphor',
  name: 'CRT / Phosphor',
  summary:
    "A green phosphor tube, modelled as an engine. Every surface is a near-black field, every glyph and edge is the same phosphor colour painted with a bloom halo, and the engine paints horizontal scanlines across the whole palette root from `effect.overlay.image`. State transitions linger past their main duration through `motion.decay`, so hovers and focus moves fade out the way a CRT actually fades. Intents collapse to a single colour by construction — affordance has to ride the border alpha, not the hue, and that's the engine's a11y trade-off named up front.",
  demoPalette: crtPhosphorGreen,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'The screen is a vacuum tube.',
      body: (
        <>
          <p>
            CRT is built on three load-bearing effects no other engine
            touches: <code>effect.overlay.image</code> paints horizontal
            scanlines across the palette root,{' '}
            <code>effect.glow.{'{radius,color,intensity}'}</code> blooms a
            phosphor halo around every glyph, and <code>motion.decay</code>{' '}
            adds a trailing duration to state transitions so the screen
            fades the way a real tube does.
          </p>
          <p>
            The whole palette resolves to one phosphor colour on near-black.
            There is no accent, because a monochrome tube can't carry
            one — and that constraint is the engine. The demo wraps every
            step in a host that re-paints the scanlines and the bloom, so
            you can see what the engine puts on the screen for free.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Near-black, with the scanlines on top.',
      body: (
        <>
          <p>
            All four surface tokens —{' '}
            <code>base</code>, <code>raised</code>, <code>sunken</code>,{' '}
            <code>overlay</code> — sit within a few digits of each other in
            the near-black range. The engine deliberately refuses tonal
            hierarchy: separation comes from the inset phosphor stroke baked
            into <code>elevation.*</code>, not from how dark a surface is.
          </p>
          <p>
            The scanline gradient is the second half. It paints at the
            palette root as a <code>background-image</code> on top of{' '}
            <code>--color-surface-base</code>, alternating 1px dark and 1px
            transparent every 2 pixels with a softer 4px secondary band so
            the field doesn't moiré. Every demo on this page has to
            re-paint the gradient inside its own host, because the demo
            frame's background shorthand otherwise clears it.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'One colour, three alphas, no second hue.',
      body: (
        <>
          <p>
            Border rungs — <code>subtle</code>, <code>default</code>,{' '}
            <code>strong</code> — are the phosphor green at{' '}
            <code>0.18</code>, <code>0.34</code>, and <code>0.58</code>{' '}
            alpha. There is no second colour to fight; the rung only
            decides how brightly the stroke cuts through the scanlines
            behind it.
          </p>
          <p>
            Because intents share the same hue, the border rung is doing
            more semantic work here than in flat — a <code>danger</code>{' '}
            chip uses a <code>0.85</code> alpha border, an{' '}
            <code>info</code> chip uses a <code>0.40</code> alpha border,
            and that brightness gap is the whole differentiation.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Inset phosphor stroke + outer bloom, paired.',
      body: (
        <>
          <p>
            Every rung above <code>flat</code> packs two layers: an
            <em> inset 1px phosphor stroke</em> at the panel's edge
            (<code>inset 0 0 0 1px rgba(125, 255, 138, …)</code>) and an
            <em> outer phosphor glow</em> blooming away from it
            (<code>0 0 Npx rgba(125, 255, 138, …)</code>). Both grow with
            elevation; <code>overlay</code> adds a heavy near-black outer
            drop so modal sheets seat against the tube field.
          </p>
          <p>
            <code>elevation.flat</code> still paints the inset stroke —
            the engine never lets a card go edge-free, because in CRT a
            rectangle without a phosphor rim reads as a hole in the screen.
            Drag the slider; the stroke and bloom thicken together at every
            step.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Fast durations, with a decay tail.',
      body: (
        <>
          <p>
            Durations are quick — <code>fast</code> 100&nbsp;ms,{' '}
            <code>base</code> 180&nbsp;ms, <code>slow</code> 300&nbsp;ms —
            because a CRT refreshes at 60&nbsp;Hz and slow eases feel
            wrong on a tube. The defining choice lives in{' '}
            <code>motion.decay</code>:{' '}
            an 80&nbsp;ms trailing duration added to every state transition,
            applied as <code>transition-delay</code> on the way out so hovers
            and focus moves fade instead of snapping.
          </p>
          <p>
            The CRT focus halo also pulses through the same decay regime —
            a slow breath around the focus ring that keeps reading as a
            live phosphor electron beam. Toggle motion off and{' '}
            <code>--motion-decay</code> collapses to zero, the pulse stops,
            the trail disappears, and the scanlines stay. Decoration isn't
            motion — the engine is clear about that.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Six slots, one colour, alpha carries everything.',
      body: (
        <>
          <p>
            Every intent fill and every intent border is the same phosphor
            green. <code>primary</code>, <code>success</code>,{' '}
            <code>warning</code>, <code>danger</code>, <code>info</code>{' '}
            differ <em>only</em> in fill alpha and border alpha — a danger
            chip is brighter-edged than an info chip; that's the whole
            differentiation. This is the engine's honest a11y trade-off:
            forms that lean on intent colour alone for affordance need
            supplementary iconography here.
          </p>
          <p>
            Focus is a 1px phosphor outline at a 2px offset, doubled with
            an outer glow halo built from <code>effect.glow.radius</code>.
            Under CRT the halo pulses through <code>motion.decay</code> as
            long as the focus is held, which is the engine's nod to a
            live cursor blinking on a real terminal.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
