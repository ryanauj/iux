// ABOUTME: Engine guide definition for the Neumorphism rendering engine — the soft-UI engine that uses a paired top-left-highlight / bottom-right-shade shadow recipe to make surfaces read as extruded from the page itself, refusing borders and tonal hierarchy in favour of the shadow pair, with the flat rung inverted inset to convey pressed state.

import { useState } from 'react'
import { palette as neumorphism } from '../../../palettes/neumorphism'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Toggle } from '../../components/Toggle/Toggle'
import { Slider } from '../../components/Slider/Slider'
import type { EngineGuideMeta } from './types'

type ElevationRung = 'flat' | 'low' | 'medium' | 'high' | 'overlay'
const RUNGS: ElevationRung[] = ['flat', 'low', 'medium', 'high', 'overlay']
type PressState = 'rest' | 'pressed'

function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__row">
      <Card title="Settings" subtitle="Extruded from the page itself." variant="static">
        <p>
          One tonal field. The surface, the page behind it, and the
          borders are all the same near-grey. Depth is the paired
          shadow recipe: a bright top-left highlight and a darker
          bottom-right shade, both painted on the surface.
        </p>
        <div
          style={{
            boxShadow: 'var(--elevation-low)',
            background: 'var(--color-surface-raised)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
          }}
        >
          <div className="iux-engine-demo__cluster">
            <Button intent="primary">Save</Button>
            <Button intent="neutral">Cancel</Button>
          </div>
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
              borderColor: 'var(--color-border-subtle)',
              boxShadow: 'var(--elevation-low)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        All four surfaces are the <em>same colour</em>. There is no
        tonal hierarchy — <code>base</code>, <code>raised</code>,{' '}
        <code>sunken</code>, and <code>overlay</code> are all one
        near-grey. Without the elevation shadow you cannot tell the
        swatches apart from the host; the engine simply refuses to
        differentiate surfaces with colour.
      </p>
    </div>
  )
}

function BordersDemo() {
  return (
    <div className="iux-engine-demo__col">
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-subtle)',
          background: 'var(--color-surface-raised)',
          boxShadow: 'var(--elevation-low)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <code>border.subtle</code> = <code>border.default</code> =
          the surface itself. The stroke is here, but you can't see
          it — it has no contrast against the background.
        </p>
      </div>
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-strong)',
          background: 'var(--color-surface-raised)',
          boxShadow: 'var(--elevation-low)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <code>border.strong</code> is the one exception — a barely
          darker grey for cases where the engine concedes a visible
          edge is needed. Used almost nowhere.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        Neumorphism refuses borders by construction. The shadow pair
        is doing the job a border would do in flat; adding a stroke
        on top would break the illusion of an object pressed up out
        of the page. That's also why form fields lose their
        boundaries — and why the palette ships as{' '}
        <code>a11y: experimental</code>.
      </p>
    </div>
  )
}

function ElevationDemo() {
  const [idx, setIdx] = useState(2)
  const rung = RUNGS[idx]
  const isFlat = rung === 'flat'
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
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <strong>elevation.{rung}</strong>
        <p>
          {isFlat ? (
            <>
              <code>flat</code> flips the shadow inward — the same
              recipe, but <code>inset</code>. The card reads as
              <em> pressed in</em>, like a switch in its depressed
              state. That's how active and recessed states get their
              identity without a colour change.
            </>
          ) : (
            <>
              Above <code>flat</code> the pair lives outside the
              shape: a soft white highlight to the top-left, a
              softer indigo-grey shade to the bottom-right. Both
              grow together as the rung climbs.
            </>
          )}
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        The recipe is the engine. A drop shadow alone reads as paper
        on a page; a single inset reads as a hole. Only the paired
        light + dark, sharing a hue with the surface, reads as
        something <em>extruded from</em> the page itself.
      </p>
    </div>
  )
}

function MotionDemo() {
  const [motionOn, setMotionOn] = useState(true)
  const [press, setPress] = useState<PressState>('rest')
  const rung: ElevationRung = press === 'rest' ? 'low' : 'flat'
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
          label="Press state"
          value={press}
          onValueChange={v => setPress(v as PressState)}
          options={[
            { value: 'rest',    label: 'at rest' },
            { value: 'pressed', label: 'pressed' },
          ]}
        />
      </div>
      <PaletteRoot
        palette={neumorphism}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${rung})`,
            background: 'var(--color-surface-raised)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <strong>state: {press}</strong>
          <p>
            Toggle between <code>elevation.low</code> (extruded) and{' '}
            <code>elevation.flat</code> (inset). With motion on, four
            shadow values crossfade at once — outer light, outer dark,
            inner light, inner dark — through the engine's wider base
            duration. Turn motion off and the card snaps between the
            two recipes; the depth still works, but the press loses
            its physicality.
          </p>
        </div>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Hover me</Button>
          <Button intent="neutral">Hover me</Button>
          <Button intent="info">Hover me</Button>
        </div>
        <p className="iux-engine-demo__caption">
          Motion durations are wider than flat: 160&nbsp;ms{' '}
          <code>fast</code>, 260&nbsp;ms <code>base</code>, 420&nbsp;ms{' '}
          <code>slow</code>. The extra time is essential because a
          neumorphic press isn't a colour swap — it's two outer
          shadows transitioning to two inset shadows simultaneously,
          and the eye needs the duration to read the inversion as
          one continuous motion.
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
        Every intent fill is the <em>same surface colour</em>. Intent
        lives only in <code>intent.*.content</code> — indigo for{' '}
        <code>primary</code>, green for <code>success</code>, amber
        for <code>warning</code>, red for <code>danger</code>, sky
        for <code>info</code>. The chips read as monochrome tiles
        with coloured ink. Focus is a 2px indigo ring at a 4px offset
        — the only place the engine permits a visible coloured edge
        against the field.
      </p>
    </div>
  )
}

// ABOUTME: neumorphismGuide — the EngineGuideMeta for the Neumorphism engine: six steps (philosophy, surfaces, borders, elevation, motion, intent) demonstrated against the neumorphism palette, covering the one-field-colour approach, the invisible-border choice, the paired-shadow extrusion recipe, and the a11y cost of refusing borders and tonal hierarchy.
export const neumorphismGuide: EngineGuideMeta = {
  engine: 'neumorphism',
  name: 'Neumorphism',
  summary:
    "Soft UI, taken seriously. One tonal field shared between surface and host, no borders, and an elevation recipe that pairs a bright top-left highlight with a darker bottom-right shade so the surface reads as extruded from the page rather than laid on top of it. The same recipe inverts at the flat rung to read as pressed in. The price is a11y: when borders and tonal hierarchy are both refused, body text and icon glyphs sit on top of a busy shadow gradient — which is why this palette ships as experimental.",
  demoPalette: neumorphism,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Depth without contrast — extruded, not laid on.',
      body: (
        <>
          <p>
            Neumorphism is built on a single radical claim: a surface
            does not need a different colour from its host to read as
            raised. It needs the right <strong>pair of shadows</strong>{' '}
            — a bright highlight on the side the light is coming from,
            and a darker shade on the opposite side, both painted on
            the surface itself. The eye reads that recipe as
            three-dimensional extrusion, the way it reads a bas-relief.
          </p>
          <p>
            Where flat says "use one accent and a hairline border,"
            Neumorphism says "refuse the border entirely; let the
            shadow do every structural job." That's the engine —
            and the trade-off it makes with accessibility, which
            this guide names as it goes.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'One colour, four slots.',
      body: (
        <>
          <p>
            All four surface tokens —{' '}
            <code>base</code>, <code>raised</code>, <code>sunken</code>,
            <code> overlay</code> — resolve to the <em>same value</em>{' '}
            (a single near-grey). The palette deliberately refuses
            tonal hierarchy. A raised card has to read as raised by
            its shadow alone; a sunken input has to read as sunken
            by an inset shadow alone.
          </p>
          <p>
            That's also why the page background and the card share a
            hue. The shadow recipe only reads as "extruded from"
            something when there is no colour edge to break the
            illusion. Paint the same elevation on a white card over
            a grey page and the effect collapses.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Refused — same value as the surface.',
      body: (
        <>
          <p>
            <code>border.subtle</code> and <code>border.default</code>{' '}
            are both set to the surface colour. The token slots
            exist (components need them to render without
            exceptions), but the stroke is invisible. Only{' '}
            <code>border.strong</code> shifts a touch darker, for
            the rare case the engine concedes an edge is needed.
          </p>
          <p>
            This is the single choice that earns Neumorphism its
            cautionary reputation: form fields lose their boundaries,
            check states lack an edge to anchor to, and small icons
            float on a busy gradient. The palette README documents
            the failure mode explicitly — Neumorphism is shipped so
            the showcase can demonstrate it, not as a default.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'The signature paired-shadow recipe.',
      body: (
        <>
          <p>
            This is where the engine lives. Every rung above{' '}
            <code>flat</code> packs <strong>two</strong> shadows: a
            soft white highlight offset to the <em>top-left</em>{' '}
            (<code>-Npx -Npx</code> at high alpha) and a soft
            indigo-grey shade offset to the <em>bottom-right</em>{' '}
            (<code>Npx Npx</code> at lower alpha). Both grow
            together as the rung climbs.
          </p>
          <p>
            <code>elevation.flat</code> is the engine's quiet trick:
            it's the same recipe, flipped <strong>inset</strong>. The
            surface reads as pressed into the page instead of lifted
            out of it. That's how active states and recessed wells
            get their identity without a colour change — the
            shadow's direction simply inverts.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Wider band, paired-shadow transitions.',
      body: (
        <>
          <p>
            Durations are wider than flat:{' '}
            <code>fast</code> 160&nbsp;ms, <code>base</code> 260&nbsp;ms,{' '}
            <code>slow</code> 420&nbsp;ms. The extra time is for the
            press state — when an outer paired shadow flips to an
            inset paired shadow, four shadow values are crossfading
            at once. A 200&nbsp;ms transition leaves them visibly
            mid-flip; the engine wants the press to feel like a real
            switch being pushed down.
          </p>
          <p>
            Decay is <code>0&nbsp;ms</code> — no ring, no wobble
            after the press lands. The demo lets you scrub the
            shadow pair down to one side at a time, so you can see
            how dependent the effect is on the pair: drop either
            half and the depth illusion collapses.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Same fill everywhere, intent lives in ink.',
      body: (
        <>
          <p>
            All six intents share the <em>same background</em> —
            the surface colour. Every <code>intent.*.bg</code>{' '}
            resolves to the same near-grey across the board;
            differentiation lives entirely in{' '}
            <code>intent.*.content</code>. Primary indigo ink, success
            green ink, danger red ink, all on the same monochrome
            tile.
          </p>
          <p>
            Focus is a 2px solid indigo ring at a 4px offset — wider
            than flat's offset because the ring has to sit clear of
            the elevation shadow's bright top-left edge. The ring is
            the one place the engine permits a coloured edge against
            the field, because focus is an accessibility signal and
            Neumorphism cannot afford to lose it.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
