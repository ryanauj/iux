// ABOUTME: Engine guide definition for the Cel-shaded rendering engine — the anime-cel engine that refuses gradients and wraps every surface and interactive control in a near-black ink outline delivered through both border tokens and a literal CSS outline halo (effect.outline.color/width), uses hard-offset block shadows with no blur (effect.shadowStyle = 'hard'), and shifts the focus ring colour rather than its thickness as an always-present boundary cue.

import { useState } from 'react'
import { palette as celShadedShonen } from '../../../palettes/cel-shaded-shonen'
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
      <Card title="Episode 01" subtitle="Flat fills, hard ink, no gradient." variant="static">
        <p>
          Cream cel field, ink-black outline on every raised surface and
          every interactive control, two-tone block shadow for shading.
          The engine reads <code>effect.outline.{'{color,width}'}</code>{' '}
          to paint a literal <code>outline:</code> halo on controls;{' '}
          <code>effect.shadowStyle = 'hard'</code> documents that{' '}
          <code>elevation.*</code> paints hard-offset block shadows
          rather than soft drops.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Confirm</Button>
          <Button intent="neutral">Back</Button>
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
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__swatch-grid">
        {swatches.map(s => (
          <div
            key={s.label}
            className="iux-engine-demo__swatch"
            style={{
              background: `var(${s.cssVar})`,
              borderColor: 'var(--color-border-default)',
              borderWidth: 'var(--border-width-thick)',
              boxShadow: 'var(--elevation-low)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Saturated flat fills, no tints, no gradients. <code>base</code>{' '}
        is the cream cel field; <code>raised</code> is pure white (the
        lit surface); <code>sunken</code> drops back to a warmer beige
        for recessed cels (text-input wells); <code>overlay</code> is
        white again for dialog sheets. Every swatch wears the ink line
        — <code>border.default</code> resolves to near-black on this
        palette, so the cel boundary is always present.
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
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: `var(--color-border-${strength})`,
          borderWidth: 'var(--border-width-thick)',
        }}
      >
        <p>
          <code>border.{strength}</code> — every slot resolves to the
          same ink. The cel boundary is the same whether a component
          reads <code>subtle</code>, <code>default</code>, or{' '}
          <code>strong</code>, so the affordance stays uniform across
          components that happen to consume different border tokens.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        The cel outline is delivered through two redundant paths.
        Existing token slots: every <code>color.border.*</code> is ink
        and <code>borderWidth.thick</code> is 3 pixels, so Card / Modal
        / Drawer / Toast render the outline via their own{' '}
        <code>border:</code> rule. The engine block also adds a literal{' '}
        <code>outline:</code> halo on interactive controls (Button,
        Toggle, TextInput, Select, Tabs…) using{' '}
        <code>--outline-color</code> and <code>--outline-width</code>,
        so the ink line is guaranteed present regardless of which
        border token a control happens to read.
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
        style={{
          boxShadow: `var(--elevation-${rung})`,
          background: 'var(--color-surface-raised)',
          borderColor: 'var(--color-border-default)',
          borderWidth: 'var(--border-width-thick)',
          borderStyle: 'solid',
        }}
      >
        <strong>elevation.{rung}</strong>
        <p>
          Hard-offset block shadows in pure ink — no blur, no spread.
          <code> low</code> casts 3 pixels down and right;{' '}
          <code>medium</code> goes 5; <code>high</code> goes 7;{' '}
          <code>overlay</code> stacks an 8-pixel block plus a diffuse
          ambient drop, because modal-class panels sit high enough to
          warrant a hint of soft depth.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        <code>effect.shadowStyle = 'hard'</code> documents the engine's
        choice. A "matching tone but darker" cast (darker orange under
        an orange button) would read as a gradient and fight the cel
        look — pure ink keeps every shadow reading as "the cel below."
        The block shadow is also static affordance: under{' '}
        <code>prefers-reduced-motion</code> the hover transition
        collapses to instant, but the shadow itself doesn't change,
        so depth stays visible without animation.
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
        palette={celShadedShonen}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Hover me</Button>
          <Button intent="neutral">Hover me</Button>
          <Button intent="warning">Hover me</Button>
        </div>
        <p className="iux-engine-demo__caption">
          Snap-fast durations — <code>fast</code> 80&nbsp;ms,{' '}
          <code>base</code> 140&nbsp;ms, <code>slow</code> 220&nbsp;ms —
          because cel animation runs on the 8s and 12s and the camera
          doesn't ease in. The spring slot keeps a small overshoot for
          a press-jiggle. With motion off, every state change is
          instant and the ink boundary still tells you which control
          your cursor is on — affordance never depended on the
          animation in the first place.
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
        The shonen triad — saturated orange primary, sky-blue info,
        chakra green success, alert gold warning, battle-red danger,
        cream neutral. Every <code>intent.*.border</code> resolves to
        ink, so the cel outline is uniform across the six chips and
        the only thing that changes between them is the fill. Focus
        is the shonen-blue accent at 3 pixels — the same weight as the
        ink outline, so focus reads as the outline{' '}
        <em>changing colour</em> rather than gaining thickness. That's
        the engine's counter-intuitive a11y claim: the always-present
        outline gives every control an unambiguous boundary, and the
        focus-by-colour-shift cue survives reduced colour sensitivity.
      </p>
    </div>
  )
}

// ABOUTME: celShadedGuide — the EngineGuideMeta for the Cel-shaded engine: six steps (philosophy, surfaces, borders, elevation, motion, intent) demonstrated against the cel-shaded-shonen palette, covering the two-path ink-outline delivery, hard-offset block shadow elevation, snap-fast motion with press-jiggle spring, and the shonen colour triad with a colour-shift focus ring.
export const celShadedGuide: EngineGuideMeta = {
  engine: 'cel-shaded',
  name: 'Cel-shaded',
  summary:
    "Anime cel rules, in tokens. Saturated flat fills, no gradients, every shape wrapped in a near-black ink line. `effect.outline.{color,width}` paints a literal `outline:` halo on interactive controls so the ink line is always present, layered alongside the palette's own ink border tokens; `effect.shadowStyle = 'hard'` documents that `elevation.*` paints hard-offset block shadows rather than soft drops. The counter-intuitive a11y note: the always-present outline gives every control an unambiguous boundary, and focus changes the outline colour rather than the fill.",
  demoPalette: celShadedShonen,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Flat fills bounded by a hard ink line.',
      body: (
        <>
          <p>
            Cel-shaded is the engine that refuses gradients. Every
            surface is a flat fill bounded by a hard ink outline; where
            shading exists, it's a single darker shape with a hard edge.
            No soft drops, no rim lighting, no atmospheric glow.
          </p>
          <p>
            The engine exercises three contract slots no previous engine
            touched: <code>effect.outline.color</code> and{' '}
            <code>effect.outline.width</code> are read by the engine
            block to paint a literal <code>outline:</code> halo on
            interactive controls (Button, Toggle, TextInput, Tabs,
            Pagination…), and <code>effect.shadowStyle = 'hard'</code>{' '}
            documents that <code>elevation.*</code> paints hard-offset
            two-tone block shadows rather than diffuse drops.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Saturated flats, ink-bordered.',
      body: (
        <>
          <p>
            Four surfaces, all opaque, no tints —{' '}
            <code>base</code> cream cel field,{' '}
            <code>raised</code> pure white (the lit surface),{' '}
            <code>sunken</code> warmer beige (recessed cels for input
            wells), <code>overlay</code> white again for dialog sheets.
            The palette doesn't use any tonal layering tricks; hierarchy
            is the outline + the block shadow.
          </p>
          <p>
            Every <code>color.border.*</code> slot resolves to the same
            near-black ink, so the cel boundary appears wherever a
            component reads any border token. That redundancy is
            deliberate: the always-present outline is the engine's
            load-bearing affordance, and ambiguity about which slot a
            component reads can't be allowed to drop the cue.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'The cel outline, delivered through two paths.',
      body: (
        <>
          <p>
            Every <code>color.border.*</code> rung is the same ink and{' '}
            <code>borderWidth.thick</code> is 3 pixels — so any
            component that reads <code>--border-width-thick</code> and{' '}
            <code>--color-border-default</code> (Card, Modal, Drawer,
            Toast) renders the outline naturally via its own{' '}
            <code>border:</code> rule.
          </p>
          <p>
            The engine block adds a second path: a literal{' '}
            <code>outline:</code> halo on a curated list of interactive
            controls, sourced from <code>--outline-color</code> and{' '}
            <code>--outline-width</code>. Why both? Because the
            outline is the affordance — a single-path delivery would
            create gaps the moment a component swapped which border
            token it consumed. <code>outline:</code> paints outside
            the box without affecting layout, so the cel boundary
            stays at the exact geometric edge of every control.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Hard-offset block shadows, in ink.',
      body: (
        <>
          <p>
            Every rung above <code>flat</code> casts a single
            hard-offset rectangle in pure ink — no blur, no spread.{' '}
            <code>low</code> is 3 pixels down and right;{' '}
            <code>medium</code> is 5; <code>high</code> is 7;{' '}
            <code>overlay</code> stacks an 8-pixel block plus a diffuse
            ambient drop because modal-class panels sit high enough to
            warrant a hint of soft depth.
          </p>
          <p>
            Ink-black is the deliberate choice. A darker-tone-of-the-fill
            cast would read as a gradient and fight the cel look; pure
            ink keeps every shadow reading as "the cel below." The
            block also doubles as static affordance under reduced
            motion: the hover transition collapses, but the shadow
            itself doesn't change, so depth stays visible without
            animation.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Snap-fast durations, press-jiggle spring.',
      body: (
        <>
          <p>
            Durations sit at the fast end —{' '}
            <code>fast</code> 80&nbsp;ms, <code>base</code> 140&nbsp;ms,{' '}
            <code>slow</code> 220&nbsp;ms — because cel animation runs
            on twos and the camera doesn't ease in. The standard easings
            stay standard; the spring slot tightens to a small overshoot
            (~1.56) for the press-jiggle that lands button presses with
            a hint of bounce.
          </p>
          <p>
            <code>motion.decay</code> stays at zero. The engine paints
            no decorative motion either — toggle motion off and every
            state change is instant; the ink outline still tells you
            which control your cursor is on. The hover-revealed
            speed-line motif on opt-in surfaces disables under reduced
            motion; the static speed-line decoration stays.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'The shonen triad, with a colour-shift focus.',
      body: (
        <>
          <p>
            The shonen colour triad in concrete intents — saturated
            orange primary, sky-blue info, chakra green success, alert
            gold warning, battle-red danger, cream neutral. Every{' '}
            <code>intent.*.border</code> resolves to ink, so the cel
            outline is uniform across the six chips and the only thing
            that changes between them is the fill.
          </p>
          <p>
            Focus is the shonen-blue accent at <code>3px</code> — the
            same weight as the ink outline, so focus reads as the
            outline <em>changing colour</em> rather than gaining
            thickness. That's the engine's counter-intuitive a11y
            claim: the always-present outline gives every interactive
            control an unambiguous boundary at all times, and the
            focus-by-colour-shift cue survives reduced colour
            sensitivity. The engine ships with the <code>a11y: pass</code>{' '}
            tag for exactly this reason.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
