import { useState } from 'react'
import { palette as aurora } from '../../../palettes/aurora'
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
    <div className="iux-engine-demo__aurora-host">
      <Card title="Atmosphere" subtitle="Surfaces by light density, not by border." variant="static">
        <p>
          A deep midnight floor with a slowly drifting multi-radial
          gradient on top — green, purple, and teal luminance centers
          riding a 48-second loop. Cards are translucent fills with a
          soft outer halo; they read as brighter patches of the same
          atmosphere rather than as bounded rectangles.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Save</Button>
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
    <div className="iux-engine-demo__aurora-host">
      <div className="iux-engine-demo__swatch-grid">
        {swatches.map(s => (
          <div
            key={s.label}
            className="iux-engine-demo__swatch"
            style={{
              background: `var(${s.cssVar})`,
              borderColor: 'var(--color-border-default)',
              backdropFilter: 'var(--effect-backdrop-blur-md)',
              WebkitBackdropFilter: 'var(--effect-backdrop-blur-md)',
              boxShadow: 'var(--elevation-low)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Only <code>base</code> is an opaque colour — the deep midnight
        floor. <code>raised</code>, <code>sunken</code>, and{' '}
        <code>overlay</code> are translucent white tints layered over
        the atmosphere; the backdrop blur softens the gradient so each
        surface reads as a fog patch rather than a window onto a
        flatter colour. The luminance halo from{' '}
        <code>elevation.low</code> dissolves each swatch's edge into
        the atmosphere.
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
      <div className="iux-engine-demo__aurora-host">
        <div
          className="iux-engine-demo__bordered"
          style={{
            borderColor: `var(--color-border-${strength})`,
            background: 'var(--color-surface-raised)',
            backdropFilter: 'var(--effect-backdrop-blur-md)',
            WebkitBackdropFilter: 'var(--effect-backdrop-blur-md)',
          }}
        >
          <p>
            <code>border.{strength}</code> — a faint white tint at very
            low alpha. Aurora's borders aren't actually transparent:
            they're recessive structural cues for components that need
            one (table row dividers, segmented separators), but they
            never compete with the luminance halo for visual weight.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        The engine signals this in a contract slot —{' '}
        <code>effect.surfaceBy = 'luminance'</code>. Every other palette
        in the showcase declares <code>'border'</code>; Aurora is the
        only one that flips it. The slot is engine-only documentation
        today: components don't branch on it, but it records the
        engine's intended surface model so a future Separator could
        switch from a hairline rule to a luminance gradient based on
        which mode it's running under.
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
      <div className="iux-engine-demo__aurora-host">
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${rung})`,
            background: 'var(--color-surface-raised)',
            backdropFilter: 'var(--effect-backdrop-blur-md)',
            WebkitBackdropFilter: 'var(--effect-backdrop-blur-md)',
            borderColor: 'var(--color-border-default)',
            borderWidth: 'var(--border-width-hairline)',
            borderStyle: 'solid',
          }}
        >
          <strong>elevation.{rung}</strong>
          <p>
            Two layers per slot. A <em>soft outer luminance halo</em> —
            purple-tinted near-white at growing alpha — paints the
            atmosphere closing in around the card. An <em>inner luminance
            lift</em> brightens the panel itself.{' '}
            <code>overlay</code> adds a third heavier midnight drop so
            modal panels seat against the atmosphere with a hint of
            ambient weight.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        The recipe is "a brighter patch of atmosphere," not "a piece of
        paper above another piece of paper." There are no hard offsets
        anywhere — every shadow is a soft glow. The engine block reads{' '}
        <code>--luminance-center</code> on raised surface classes and
        layers a second outer halo on top, so cards under the engine
        scope get both an elevation halo and an atmosphere-closing-in
        halo for free.
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
        palette={aurora}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__aurora-host">
          <div className="iux-engine-demo__cluster">
            <Button intent="primary">Hover me</Button>
            <Button intent="neutral">Hover me</Button>
            <Button intent="info">Hover me</Button>
          </div>
          <p className="iux-engine-demo__caption">
            Hover the buttons. Component motion sits in a wide band —
            <code> fast</code> 180&nbsp;ms, <code>base</code> 260&nbsp;ms,{' '}
            <code>slow</code> 420&nbsp;ms — so transitions settle into
            the atmosphere rather than snap. The gradient drift on the
            palette root runs on a 48-second loop entirely outside the
            component <code>motion.duration</code> band; it's engine
            decoration, the same way CRT scanlines are. Under{' '}
            <code>prefers-reduced-motion</code> the drift freezes at an
            intentionally-composed position (around 30% by 40%) — a
            designed static fallback, not "the moment the animation
            stopped." Toggling motion off in this demo collapses
            component transitions but leaves the engine drift to the
            reduced-motion media query.
          </p>
        </div>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__aurora-host">
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">Primary</Button>
        <Button intent="neutral">Neutral</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Danger</Button>
        <Button intent="info">Info</Button>
      </div>
      <p className="iux-engine-demo__caption">
        Intent fills pick colours out of the atmospheric register —
        deep purple primary (matches the purple luminance center),
        translucent neutral, deep green success (matches the green
        center), warm amber warning, deep magenta danger, deep teal
        info (matches the teal center). Borders are translucent tints
        of the matching hue so the chip reads as a glow boundary rather
        than a hard stroke. Focus is the atmospheric purple at 2px;
        the engine block also paints a brighter radial gradient under
        hovered and focused controls so the atmosphere reads as
        "closing in" around the interaction.
      </p>
    </div>
  )
}

export const auroraGuide: EngineGuideMeta = {
  engine: 'aurora',
  name: 'Aurora',
  summary:
    "Surfaces by light density, not by border. The engine paints `effect.atmosphereGradient` at the palette root as a slowly drifting multi-radial wash; raised surfaces are translucent tints that the engine pairs with a `--luminance-center` halo and backdrop blur so each card reads as a brighter patch of the same atmosphere. `effect.surfaceBy = 'luminance'` records the surface model — every other palette declares `'border'`. Under `prefers-reduced-motion` the drift freezes at an intentionally-composed static position; the halo, blur, hover brightening, and selection state stay.",
  demoPalette: aurora,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'The whole UI is one drifting atmospheric mass.',
      body: (
        <>
          <p>
            Aurora is the first engine where a hard stroke is the
            <em> wrong</em> primitive. Raised surfaces aren't a different
            opaque colour from the floor — they're translucent
            luminance lifts on top of an animated gradient. A solid fill
            would punch a hole in the atmosphere; the translucent fill
            keeps the gradient visible <em>through</em> every card.
          </p>
          <p>
            The engine exercises three new contract slots:{' '}
            <code>effect.atmosphereGradient</code> (the multi-radial
            stack the engine drifts at the palette root over a
            48-second loop), <code>effect.luminanceCenter</code> (the
            translucent near-white the engine paints as a soft halo on
            raised surfaces), and <code>effect.surfaceBy</code>{' '}
            (<code>'luminance'</code> on Aurora,{' '}
            <code>'border'</code> on every other palette).
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Translucent luminance lifts over the atmosphere.',
      body: (
        <>
          <p>
            Only <code>surface.base</code> is opaque — the deep
            midnight floor the gradient paints over.{' '}
            <code>surface.raised</code> is a 5%-alpha white tint;{' '}
            <code>surface.sunken</code> is a 20%-alpha black for
            recessed wells; <code>surface.overlay</code> is an
            8%-alpha white for dialog panels. Without the gradient
            underneath, the translucent fills would dissolve into
            their host.
          </p>
          <p>
            <code>backdrop-filter</code> is the load-bearing piece for
            raised surfaces — the engine block applies a heavy blur on
            Card, Modal, Drawer, Toast, Tooltip, and Popover so the
            gradient softens under each panel and the surface reads
            as a fog patch rather than a window onto sharper colour.
            Browsers without <code>backdrop-filter</code> get a flatter
            card that still reads as a luminance lift via the fill alone.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Recessive whites, surfaceBy = luminance.',
      body: (
        <>
          <p>
            Borders aren't actually transparent — they're set to very
            low-alpha whites (around 5%, 10%, 18%) so any component
            reading <code>--color-border-*</code> still gets a faint
            structural cue when it needs one. The cue is recessive
            enough that the luminance halo does the actual surface
            demarcation work. Focus stays at full chroma: a 2px purple
            accent so keyboard focus is always visible regardless of
            the surface-by mode.
          </p>
          <p>
            The engine documents the choice in{' '}
            <code>effect.surfaceBy</code>, which is{' '}
            <code>'luminance'</code> on Aurora and <code>'border'</code>{' '}
            on every other palette in the showcase. The slot is
            engine-only documentation today — no component branches on
            it — but it records the engine's intended surface model
            for a future Separator or annotation layer that wants to
            switch from a hairline rule to a luminance gradient based
            on which mode it's running under.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Outer luminance halo + inner lift, paired.',
      body: (
        <>
          <p>
            Every rung above <code>flat</code> packs two soft layers: a{' '}
            <em>purple-tinted outer halo</em> growing in radius with
            elevation, and an <em>inner near-white lift</em> brightening
            the panel itself. <code>overlay</code> adds a third heavy
            midnight drop so modal panels seat against the atmosphere
            with a hint of ambient weight, but there are no hard offsets
            anywhere — every shadow is a soft glow.
          </p>
          <p>
            The engine block layers a second luminance halo on raised
            surface classes via <code>--luminance-center</code>, so
            cards inside the engine scope get both an elevation halo
            and an atmosphere-closing-in halo. The recipe says "a
            brighter patch of atmosphere," not "a piece of paper above
            another piece of paper" — and the elevation slot is shaped
            around that claim.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Wide component band, slow engine drift.',
      body: (
        <>
          <p>
            Component motion sits in a wide band —{' '}
            <code>fast</code> 180&nbsp;ms, <code>base</code> 260&nbsp;ms,{' '}
            <code>slow</code> 420&nbsp;ms — so transitions settle into
            the atmosphere rather than snap. The standard easings stay
            standard; the spring slot keeps a small bounce-back.{' '}
            <code>motion.decay</code> is zero.
          </p>
          <p>
            The atmospheric drift on the palette root runs entirely
            outside the <code>motion.duration</code> band — a 48-second
            loop with <code>ease-in-out</code> and{' '}
            <code>alternate</code> direction, painted via{' '}
            <code>background-position</code> keyframes. Under{' '}
            <code>prefers-reduced-motion</code> the drift freezes at
            <em> 30% by 40%</em>: a designed static composition, not
            "the moment the animation stopped." The luminance halo,
            backdrop blur, hover brightening, and selection state all
            stay — they're decoration, not motion.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Atmospheric chips, halo-bending focus.',
      body: (
        <>
          <p>
            Intent fills pick colours out of the atmospheric register —
            deep purple primary (matching the purple luminance center),
            translucent neutral, deep green success, warm amber
            warning, deep magenta danger, deep teal info. Every
            <code> intent.*.border</code> is a translucent tint of the
            matching hue, so the chip reads as a glow boundary rather
            than a hard stroke. Body text clears WCAG AAA on the
            worst-case gradient spot at ~7.5 to 1; secondary text holds
            AA — the README marks the palette as{' '}
            <code>a11y: experimental</code> for exactly that reason.
          </p>
          <p>
            Focus is the atmospheric purple at <code>2px</code> width
            and <code>2px</code> offset. The engine block also paints a
            brighter radial gradient under hovered and focused controls
            so the atmosphere reads as "closing in" around the
            interaction; on <code>:focus-visible</code> the alpha steps
            up so keyboard focus reads as a stronger atmospheric
            brightening than hover. The cursor isn't tracked — the
            engine stays JS-free — but hover + focus state is enough
            to sell the cue.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
