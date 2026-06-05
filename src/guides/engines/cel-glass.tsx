import { useState } from 'react'
import { palette as celGlassFrost } from '../../../palettes/cel-glass-frost'
import { palette as celGlassNoir } from '../../../palettes/cel-glass-noir'
import { palette as celGlassSunset } from '../../../palettes/cel-glass-sunset'
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
      <Card title="Chapter 01" subtitle="Frosted glass, cut with an ink line." variant="static">
        <p>
          A translucent cel: <code>surface.raised</code> carries alpha and the
          engine frosts it with <code>backdrop-filter</code>, while a hard ink
          line wraps every edge. The engine reads{' '}
          <code>effect.outline.{'{color,width}'}</code> to paint a literal{' '}
          <code>outline:</code> halo on controls and{' '}
          <code>effect.backdropBlur.md</code> to frost raised surfaces —
          glassmorphism depth plus cel-shaded boundary in one register.
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
              backdropFilter: 'var(--effect-backdrop-blur-md)',
              WebkitBackdropFilter: 'var(--effect-backdrop-blur-md)',
              borderColor: 'var(--color-border-default)',
              borderWidth: 'var(--border-width-thick)',
              borderStyle: 'solid',
              boxShadow: 'var(--elevation-low)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Every surface is translucent — <code>raised</code> and{' '}
        <code>overlay</code> are white at alpha, <code>sunken</code> drops
        lower — so the saturated host shows through the frost. What stops them
        reading as soft blobs is the ink line:{' '}
        <code>color.border.*</code> resolves to the cel outline, so each frosted
        pane has a crisp graphic boundary. That's the trade glass usually
        can't make and cel-shaded can't frost.
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
          background: 'var(--color-surface-raised)',
          backdropFilter: 'var(--effect-backdrop-blur-md)',
          WebkitBackdropFilter: 'var(--effect-backdrop-blur-md)',
          borderColor: `var(--color-border-${strength})`,
          borderWidth: 'var(--border-width-thick)',
        }}
      >
        <p>
          <code>border.{strength}</code> — <code>default</code> and{' '}
          <code>strong</code> resolve to the same cel ink so the outline stays
          uniform; <code>subtle</code> softens to a lower-alpha ink for table
          rows that would read busy at full weight.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        The cel line is delivered through two paths, exactly like the
        cel-shaded engine. Card / Modal / Drawer / Toast read{' '}
        <code>--color-border-default</code> + <code>--border-width-thick</code>{' '}
        and draw it as a <code>border:</code>; interactive controls (Button,
        Toggle, TextInput, Tabs…) get a literal <code>outline:</code> halo from{' '}
        <code>--outline-color</code> / <code>--outline-width</code>, painted
        outside the box so it never fights the frosted fill.
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
          backdropFilter: 'var(--effect-backdrop-blur-md)',
          WebkitBackdropFilter: 'var(--effect-backdrop-blur-md)',
          borderColor: 'var(--color-border-default)',
          borderWidth: 'var(--border-width-thick)',
          borderStyle: 'solid',
        }}
      >
        <strong>elevation.{rung}</strong>
        <p>
          Each rung stacks two things: an inset white top-highlight (the glass
          refraction catch) over a hard-offset block in ink with no blur (the
          cel shading). <code>overlay</code> adds a diffuse ambient drop on top
          because modal-class panes float highest.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        <code>effect.shadowStyle = 'hard'</code> records the cel half — the
        offset block has no blur, so it reads as "the cel below," not as a soft
        glass shadow. The inset highlight is the glass half. The two compose
        into a frosted pane with a graphic drop, which neither parent engine
        produces alone.
      </p>
    </div>
  )
}

function VariationsDemo() {
  const registers = [
    { palette: celGlassFrost,  label: 'Frost' },
    { palette: celGlassNoir,   label: 'Noir' },
    { palette: celGlassSunset, label: 'Sunset' },
  ]
  return (
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__row">
        {registers.map(r => (
          <PaletteRoot
            key={r.label}
            palette={r.palette}
            as="div"
            className="iux-engine-demo__nested"
          >
            <Card title={r.label} variant="static">
              <div className="iux-engine-demo__cluster">
                <Button intent="primary">Primary</Button>
                <Button intent="neutral">Neutral</Button>
              </div>
            </Card>
          </PaletteRoot>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Three registers on the one engine. <strong>Frost</strong> is the cool,
        light reading — aqua host, ink line. <strong>Noir</strong> inverts onto
        a midnight host and flips the cel line to a bright near-white edge so it
        still shows on smoked glass. <strong>Sunset</strong> is the warm
        anime-poster end — magenta host, orange/violet intents, warm ink. The
        engine rules are identical; only the palette's host, alphas, and
        outline colour change.
      </p>
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
        Intent fills sit at high alpha so they stay legible cels over the
        frosted field, and every <code>intent.*.border</code> resolves to the
        outline colour — so the cel line is uniform across the six chips and
        only the fill changes. Focus swaps the outline to a brighter accent
        rather than thickening it, the same colour-shift cue the cel-shaded
        engine uses. Because the surfaces are translucent, the engine ships{' '}
        <code>a11y: 'experimental'</code> — contrast depends on whatever sits
        behind the glass, exactly the caveat the glassmorphism family carries.
      </p>
    </div>
  )
}

export const celGlassGuide: EngineGuideMeta = {
  engine: 'cel-glass',
  name: 'Cel-Glass',
  summary:
    "A mix of two engines: cel-shaded's hard ink outline laid over glassmorphism's frosted translucent surfaces. The engine paints a literal `outline:` halo on controls from `effect.outline.{color,width}` AND a `backdrop-filter` frost on raised surfaces from `effect.backdropBlur.md`, while the palette's translucent `surface.*` alphas let the host show through. `elevation.*` blends both — an inset glass top-highlight over a hard-offset cel block (`effect.shadowStyle = 'hard'`). Three registers ship: Frost (cool light), Noir (dark, with an inverted bright cel line), and Sunset (warm anime-poster). Translucent fills mean it carries `a11y: 'experimental'`, like the rest of the glass family.",
  plainSummary:
    "Frosted, see-through panels — like glass — but every panel and button is wrapped in a crisp cartoon outline, the way a cel-animation frame is. It comes in three flavours: a cool icy one, a dark neon one, and a warm sunset one.",
  plainTeaser: 'Glassmorphism you can actually see the edges of — frosted panels with a cel-anime ink line.',
  demoPalette: celGlassFrost,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Frosted glass, cut with a hard ink line.',
      body: (
        <>
          <p>
            Cel-Glass is a deliberate hybrid. Glassmorphism gives translucent,
            backdrop-blurred panels that read as depth; cel-shading gives the
            hard graphic outline that glass, being all softness and blur,
            normally can't hold. The engine runs both at once — a frosted fill
            with a crisp ink boundary.
          </p>
          <p>
            It exercises two effect slots together that no single parent engine
            uses both of: <code>effect.outline.{'{color,width}'}</code> drives a
            literal <code>outline:</code> halo on interactive controls (the cel
            half), and <code>effect.backdropBlur.md</code> frosts every raised
            surface (the glass half). The palette's translucent{' '}
            <code>surface.*</code> alphas are what make the blur visible.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Translucent frost, ink-bordered.',
      body: (
        <>
          <p>
            Every surface carries alpha — <code>raised</code> and{' '}
            <code>overlay</code> are white-at-alpha, <code>sunken</code> sits
            lower — over a saturated host that shows through the frost. The
            engine applies <code>backdrop-filter</code> to raised and
            overlay-class panels so they blur whatever's behind them.
          </p>
          <p>
            The cel line is what keeps the frosted panes from dissolving into
            each other. <code>color.border.*</code> resolves to the outline
            ink, so each translucent surface has a hard boundary — the graphic
            crispness of cel-shading bolted onto the depth of glass.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'The cel line, delivered through two paths.',
      body: (
        <>
          <p>
            Identical mechanism to the cel-shaded engine. Cards / Modals /
            Drawers / Toasts read <code>--color-border-default</code> +{' '}
            <code>--border-width-thick</code> and draw the line as a{' '}
            <code>border:</code>; interactive controls get a literal{' '}
            <code>outline:</code> halo from <code>--outline-color</code> /{' '}
            <code>--outline-width</code>.
          </p>
          <p>
            Using <code>outline:</code> (which paints outside the box and
            doesn't push layout) keeps the cel boundary at the exact geometric
            edge without fighting the frosted fill or the inset glass highlight
            baked into <code>--elevation-*</code>.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Glass highlight over a hard cel block.',
      body: (
        <>
          <p>
            Each rung composes the two engines: an inset white top-highlight
            (glass refraction) stacked on a hard-offset block in the outline ink
            with no blur (cel shading). <code>low</code> offsets 2px,{' '}
            <code>high</code> 5px; <code>overlay</code> adds a diffuse ambient
            drop because modal-class panes float highest.
          </p>
          <p>
            <code>effect.shadowStyle = 'hard'</code> records the cel intent: the
            offset block stays unblurred so it reads as "the cel below" rather
            than as a soft glass shadow. The inset highlight carries the glass
            read. Neither parent engine produces this stack alone.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'variations',
      title: 'Variations',
      description: 'Frost, Noir, Sunset — one engine, three hosts.',
      body: (
        <>
          <p>
            Three registers ship on the engine. <strong>Frost</strong> is the
            cool, light reading — an aqua host under frosted white panes with a
            near-black ink line. <strong>Noir</strong> inverts onto a midnight
            host: a near-black line would vanish on smoked glass, so the cel ink
            flips to a bright near-white edge. <strong>Sunset</strong> is the
            warm, anime-poster end — a hot magenta host with an orange/violet
            intent story and a warm ink line.
          </p>
          <p>
            The engine rules are byte-for-byte identical across all three; only
            the palette changes — its host colour, its surface alphas, and the{' '}
            <code>effect.outline.color</code> that the cel halo paints.
          </p>
        </>
      ),
      demo: <VariationsDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'High-alpha cels, colour-shift focus.',
      body: (
        <>
          <p>
            Intent fills sit at high alpha so they stay legible cels over the
            frosted field, and every <code>intent.*.border</code> resolves to
            the outline colour, so the cel line is uniform across the chips and
            only the fill changes. Focus swaps the outline to a brighter accent
            rather than thickening it — the same colour-shift cue cel-shaded
            uses.
          </p>
          <p>
            Because the surfaces are translucent, contrast depends on whatever
            sits behind the panel, so the engine carries{' '}
            <code>a11y: 'experimental'</code> — the same honest caveat the
            glassmorphism family ships with. Pair it over a controlled,
            mid-value backdrop for the most predictable reading.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
