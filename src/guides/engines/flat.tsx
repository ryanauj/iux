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
  demoPalette: flatClassic,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'What "flat" actually means.',
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
