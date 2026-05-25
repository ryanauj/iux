import { useState } from 'react'
import { palette as glassmorphism } from '../../../palettes/glassmorphism'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Toggle } from '../../components/Toggle/Toggle'
import { Slider } from '../../components/Slider/Slider'
import type { EngineGuideMeta } from './types'

type ElevationRung = 'flat' | 'low' | 'medium' | 'high' | 'overlay'
const RUNGS: ElevationRung[] = ['flat', 'low', 'medium', 'high', 'overlay']
type BlurRung = 'none' | 'sm' | 'md' | 'lg'
const BLURS: BlurRung[] = ['none', 'sm', 'md', 'lg']

function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__glass-host">
      <Card title="Glass" subtitle="Translucent surface, frosted border." variant="static">
        <p>
          One low-alpha panel, hairline-white rim, paired inset highlight
          and outer shadow, and a backdrop blur that frosts everything
          behind it. The host saturation is doing half the engine's
          work — without colour to bite into, the alpha disappears.
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
    <div className="iux-engine-demo__glass-host">
      <div className="iux-engine-demo__swatch-grid">
        {swatches.map(s => (
          <div
            key={s.label}
            className="iux-engine-demo__swatch"
            style={{
              background: `var(${s.cssVar})`,
              backdropFilter: 'var(--effect-backdrop-blur-md)',
              WebkitBackdropFilter: 'var(--effect-backdrop-blur-md)',
              borderColor: 'var(--color-border-default)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Only <code>base</code> is opaque — it's the host. The other three
        are <code>rgba(255,255,255,…)</code> at <code>0.08 / 0.16 / 0.22</code>{' '}
        alpha. Without <code>backdrop-filter</code> they'd flatten into
        translucent rectangles; here you can see the host indigo bleeding
        through every surface.
      </p>
    </div>
  )
}

function BordersDemo() {
  return (
    <div className="iux-engine-demo__glass-host">
      <div className="iux-engine-demo__bordered" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-raised)', backdropFilter: 'var(--effect-backdrop-blur-md)' }}>
        <p><code>border.subtle</code> — <code>rgba(255,255,255,0.12)</code>. The lightest possible rim.</p>
      </div>
      <div className="iux-engine-demo__bordered" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-surface-raised)', backdropFilter: 'var(--effect-backdrop-blur-md)' }}>
        <p><code>border.default</code> — <code>rgba(255,255,255,0.24)</code>. The standard frosted edge.</p>
      </div>
      <div className="iux-engine-demo__bordered" style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-surface-raised)', backdropFilter: 'var(--effect-backdrop-blur-md)' }}>
        <p><code>border.strong</code> — <code>rgba(255,255,255,0.40)</code>. Used where the rim needs to read first.</p>
      </div>
      <p className="iux-engine-demo__caption">
        Borders are hairline whites. Their job is to tell the eye where
        the glass <em>ends</em> — without the rim, a low-alpha surface
        dissolves into the host and loses its identity.
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
      <div className="iux-engine-demo__glass-host">
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${rung})`,
            background: 'var(--color-surface-raised)',
            backdropFilter: 'var(--effect-backdrop-blur-md)',
            WebkitBackdropFilter: 'var(--effect-backdrop-blur-md)',
            borderWidth: 'var(--border-width-hairline)',
            borderStyle: 'solid',
            borderColor: 'var(--color-border-default)',
          }}
        >
          <strong>elevation.{rung}</strong>
          <p>
            Two shadows, paired. An <em>inset white highlight</em> on the
            top edge — the wet rim where light catches the top of the
            glass. An <em>outer soft drop shadow</em> below — what the
            glass casts onto the host. Both grow with elevation.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        The recipe is the engine. A drop shadow alone reads as paper; an
        inset highlight alone reads as carved relief; only the pair reads
        as glass.
      </p>
    </div>
  )
}

function MotionDemo() {
  const [motionOn, setMotionOn] = useState(true)
  const [blur, setBlur] = useState<BlurRung>('md')
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
          label="Backdrop blur"
          value={blur}
          onValueChange={v => setBlur(v as BlurRung)}
          options={BLURS.map(b => ({ value: b, label: b }))}
        />
      </div>
      <PaletteRoot
        palette={glassmorphism}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div
          className="iux-engine-demo__glass-host"
          style={{
            // Override per-blur for the demo
            ['--demo-blur' as string]: `var(--effect-backdrop-blur-${blur})`,
          }}
        >
          <div
            className="iux-engine-demo__bordered"
            style={{
              background: 'var(--color-surface-raised)',
              backdropFilter: 'var(--demo-blur)',
              WebkitBackdropFilter: 'var(--demo-blur)',
              borderColor: 'var(--color-border-default)',
            }}
          >
            <p>
              Toggle the blur tokens. <code>none</code> reveals the alpha
              surface flatly; <code>sm</code> (6&nbsp;px) softens the host;{' '}
              <code>md</code> (14&nbsp;px) is the engine's default;{' '}
              <code>lg</code> (24&nbsp;px) is for overlays where the host
              must recede.
            </p>
          </div>
          <div className="iux-engine-demo__cluster">
            <Button intent="primary">Hover me</Button>
            <Button intent="neutral">Hover me</Button>
            <Button intent="info">Hover me</Button>
          </div>
        </div>
        <p className="iux-engine-demo__caption">
          Motion durations are wider than flat (260&nbsp;ms base, 420&nbsp;ms
          slow). The easing leans on spring-style curves so panel-open
          transitions feel like glass sliding into place. Hover the buttons
          to feel the longer base duration; toggle motion off and the slide
          is gone.
        </p>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__glass-host">
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">Primary</Button>
        <Button intent="neutral">Neutral</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Danger</Button>
        <Button intent="info">Info</Button>
      </div>
      <p className="iux-engine-demo__caption">
        Five of the six intents go <strong>near-opaque</strong> (alpha 0.92)
        so they remain legible no matter what shows through the host. Only{' '}
        <code>neutral</code> stays glass (<code>rgba(255,255,255,0.16)</code>)
        — it's the engine's most characteristic chip, and the one that
        breaks first on the wrong host. Focus is a 2px solid pale-blue ring;
        the engine treats focus as part of the glass family, not as a
        contrast-fighting safety signal.
      </p>
    </div>
  )
}

export const glassmorphismGuide: EngineGuideMeta = {
  engine: 'glassmorphism',
  name: 'Glassmorphism',
  summary:
    "Alpha plus blur. Surfaces are low-alpha whites sitting over a saturated host; borders are hairline whites that read as the rim of frosted glass; elevation pairs an inset highlight on the top edge with an outer soft cast shadow. Where flat is opaque-and-honest, Glassmorphism is translucent-and-atmospheric. The engine's a11y is marked experimental for a reason — the contrast you ship is whatever shows through.",
  demoPalette: glassmorphism,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Translucent panels over a host you control.',
      body: (
        <>
          <p>
            Glassmorphism is defined by <em>alpha + blur</em>. Every
            surface above <code>base</code> is a low-alpha white;{' '}
            <code>effect.backdropBlur</code> is non-zero at every step so
            what's behind the panel becomes frosted, not invisible. Without
            <code> backdrop-filter</code>, the engine degrades to translucent
            rectangles and loses its identity.
          </p>
          <p>
            The other defining choice: <code>surface.base</code> is a
            <em> saturated</em> indigo. Palettes don't usually own page
            chrome, but glass over a neutral grey host is invisible — the
            alpha math needs colour to bite into.
            Every demo on this page paints that host inside a small wrapper
            so the effect is visible.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Low-alpha whites against a saturated host.',
      body: (
        <>
          <p>
            <code>surface.base</code> is opaque indigo — it's the host.
            <code> surface.raised</code> is <code>rgba(255,255,255,0.16)</code>,
            <code> sunken</code> is <code>0.08</code>, <code>overlay</code>{' '}
            is <code>0.22</code>. Three flavours of frost; never a solid
            white panel anywhere above the host.
          </p>
          <p>
            <code>scrim</code> is aggressive (<code>rgba(15,23,42,0.40)</code>)
            because <code>overlay</code>'s own 22% alpha cannot guarantee
            contrast against arbitrary content. Modals must always paint the
            scrim — that's part of the engine's contract.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Hairline whites — the rim of the glass.',
      body: (
        <>
          <p>
            All three border rungs are <code>rgba(255,255,255,…)</code> at{' '}
            <code>0.12 / 0.24 / 0.40</code>. The job is not hierarchy (the
            shadow recipe handles that); it's <em>edge definition</em>. A
            translucent surface without a rim dissolves into its host. The
            rim is what tells the eye "panel ends here."
          </p>
          <p>
            Focus is a 2px solid pale-blue — bright enough to read against
            the indigo host without breaking the engine's calm palette.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Inset highlight + outer cast shadow, paired.',
      body: (
        <>
          <p>
            Every rung above <code>flat</code> packs two shadows. An
            <em> inset white highlight</em> on the top edge —{' '}
            <code>inset 0 1px 0 rgba(255,255,255,0.16…0.40)</code> — reads as
            light catching the wet top of the glass. An <em>outer soft drop
            shadow</em> below — <code>0 2px 8px → 0 24px 60px</code>{' '}
            of indigo-tinted black — reads as what the glass casts onto the
            host.
          </p>
          <p>
            Both grow together with elevation. Without the inset highlight,
            the surface looks like paper; without the cast shadow, it looks
            like a window cut into the page. Glass needs both.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Wide band, spring-leaning easing.',
      body: (
        <>
          <p>
            Glassmorphism's durations are wider than flat or Material:{' '}
            <code>fast</code> 160&nbsp;ms, <code>base</code> 260&nbsp;ms,{' '}
            <code>slow</code> 420&nbsp;ms. The extra time is for panel-open
            transitions to feel like glass sliding into place. The standard
            easing is <code>cubic-bezier(0.2, 0, 0, 1)</code> — a sharper
            exit than Material's curve.
          </p>
          <p>
            Backdrop blur is itself a motion target — when a sheet opens,
            the blur ramps from 0 to its rung value in the same duration.
            The demo lets you scrub through blur rungs independently of
            motion, so you can see the engine's two axes (alpha already
            painted, blur scaling) play against each other.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Near-opaque intents, glass neutral, pale focus.',
      body: (
        <>
          <p>
            Intent backgrounds make a deliberate compromise: five of the
            six go <strong>near-opaque at 0.92 alpha</strong> with dark
            ink. The reason is honesty about the engine's a11y: a 16%-alpha
            primary chip cannot guarantee 4.5:1 contrast against arbitrary
            hosts. Going near-opaque restores reliability.
          </p>
          <p>
            <code>neutral</code> is the one chip that stays glass —{' '}
            <code>rgba(255,255,255,0.16)</code> with white text. It's the
            engine's defining shape, the one that breaks first on the wrong
            background, and the one that earns Glassmorphism its{' '}
            <code>a11y: experimental</code> mark.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
