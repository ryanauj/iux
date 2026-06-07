// ABOUTME: neubrutalism — part of the guides area.

import { useState } from 'react'
import { palette as neubrutalism } from '../../../palettes/neubrutalism'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Toggle } from '../../components/Toggle/Toggle'
import { Slider } from '../../components/Slider/Slider'
import type { EngineGuideMeta } from './types'

type ElevationRung = 'flat' | 'low' | 'medium' | 'high' | 'overlay'
const RUNGS: ElevationRung[] = ['flat', 'low', 'medium', 'high', 'overlay']
type BorderRung = 'hairline' | 'thin' | 'thick' | 'heavy'
const BORDERS: BorderRung[] = ['hairline', 'thin', 'thick', 'heavy']

function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__row">
      <Card title="SETTINGS" subtitle="A 4px stroke is the whole UI." variant="static">
        <p>
          Zero radius, zero shadow, near-black 4px border, magenta accent.
          Type is condensed black and uppercased. Every visual signal you
          might expect from elevation or curvature lives in the stroke.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">SAVE</Button>
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
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__swatch-grid">
        {swatches.map(s => (
          <div
            key={s.label}
            className="iux-engine-demo__swatch"
            style={{ background: `var(${s.cssVar})`, borderColor: 'var(--color-border-strong)', borderWidth: 'var(--border-width-thick)' }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Three of the four surfaces are the same white. <code>base</code>{' '}
        is the only one with a tint — a cream that functions as page
        chrome. Surface tonality isn't the engine's job; the stroke is.
      </p>
    </div>
  )
}

function BordersDemo() {
  const [rung, setRung] = useState<BorderRung>('heavy')
  return (
    <div className="iux-engine-demo__col">
      <Toggle
        variant="segmented"
        label="Border width"
        value={rung}
        onValueChange={v => setRung(v as BorderRung)}
        options={BORDERS.map(b => ({ value: b, label: b }))}
      />
      <div
        className="iux-engine-demo__bordered"
        style={{
          borderColor: 'var(--color-border-strong)',
          borderWidth: `var(--border-width-${rung})`,
          borderRadius: 0,
        }}
      >
        <p>
          Borders are the entire structural language. <code>hairline</code>{' '}
          (1px) is for inline dividers; <code>thin</code> (2px) for inputs;{' '}
          <code>thick</code> (3px) for raised; <code>heavy</code> (4px) is
          the canonical brutalist edge that wraps cards and buttons.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        All three <em>colour</em> rungs (<code>border.subtle</code>,{' '}
        <code>default</code>, <code>strong</code>) are the same near-black
        — Neubrutalism doesn't dim the line; it just makes it thinner or
        thicker.
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
          borderWidth: 'var(--border-width-heavy)',
          borderColor: 'var(--color-border-strong)',
          borderStyle: 'solid',
          borderRadius: 0,
        }}
      >
        <strong>elevation.{rung}</strong>
        <p>
          The slider moves; the shadow doesn't. Every rung in this palette
          is <code>{'{ boxShadow: \'none\' }'}</code> — depth lives in the
          4px stroke, not in any shadow.
        </p>
      </div>
      <p className="iux-engine-demo__caption">
        The canonical Neubrutalism engine description allows a hard-offset
        block shadow (a near-black square offset down-right by 4&nbsp;px) for{' '}
        <code>elevation.low</code>. This palette is the{' '}
        <em>elevation-free variant</em> — it pins all five rungs to{' '}
        <code>none</code> and lets the border carry every job.
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
        palette={neubrutalism}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">HOVER ME</Button>
          <Button intent="success">HOVER ME</Button>
          <Button intent="warning">HOVER ME</Button>
        </div>
        <p className="iux-engine-demo__caption">
          Motion durations are <strong>40–90&nbsp;ms</strong> with{' '}
          <code>linear</code> easing on every curve — no slow-in, no
          slow-out. The transition is so short it reads as a snap. Toggle
          motion off; you can barely tell the difference, because there's
          almost nothing to remove. Neubrutalism doesn't use motion to
          soften state — it just lets state happen.
        </p>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">PRIMARY</Button>
        <Button intent="neutral">NEUTRAL</Button>
        <Button intent="success">SUCCESS</Button>
        <Button intent="warning">WARNING</Button>
        <Button intent="danger">DANGER</Button>
        <Button intent="info">INFO</Button>
      </div>
      <p className="iux-engine-demo__caption">
        Six clashing fills, all carrying near-black <code>content</code>{' '}
        (not white). Every chip wraps in the same 4px black border, so
        intent reads as a <em>swatch</em> inside a frame rather than a
        coloured shape. Focus is a 4px solid magenta ring with{' '}
        <strong>no offset</strong> — the ring sits flush against the border,
        another deliberate brutalist refusal of polish.
      </p>
    </div>
  )
}

// ABOUTME: neubrutalismGuide — an exported value.
export const neubrutalismGuide: EngineGuideMeta = {
  engine: 'neubrutalism',
  name: 'Neubrutalism',
  summary:
    "The stroke does everything. Zero radius, zero shadow, near-black 4px borders, clashing primary fills with black ink, and motion that snaps to grid in under a tenth of a second with linear easing. Where flat uses three border tokens to softly indicate hierarchy, Neubrutalism uses one heavy stroke and asks the colour to do the rest. The whole engine is a refusal of polish.",
  plainSummary:
    "Neubrutalism is loud and deliberately unpolished. Cards have sharp corners (no rounding), no shadows at all, and are wrapped in a thick black outline. Buttons are bright clashing colours — magenta, lime, neon yellow — with black text. State changes snap instantly. It looks like a poster, not an app, and that's the point.",
  plainTeaser:
    "Loud and unpolished — sharp corners, thick black outlines, clashing bright colours.",
  demoPalette: neubrutalism,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'No shadow, no curve, no gradient.',
      plainTitle: 'The big idea',
      plainBody: (
        <>
          <p>
            Neubrutalism asks the opposite question to flat. Flat says
            "how little decoration can we use?" Neubrutalism says
            "what if we strip out <em>every</em> softening trick at
            once?" No rounded corners, no shadows, no smooth animations
            — just hard rectangles and a thick black line around
            everything.
          </p>
          <p>
            It isn't trying to be ugly. It's trying to look <em>made</em>,
            like a hand-lettered poster instead of a polished app. The
            confidence comes from showing the bones of the thing
            instead of dressing them up.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Neubrutalism is what you get when you delete every visual
            softener at once: <strong>radius is <code>0</code></strong>,
            <strong> every <code>elevation.*</code> rung is{' '}
            <code>none</code></strong>, motion snaps in under 100&nbsp;ms,
            and the only "depth" cue is a near-black 4px border. The
            engine isn't about being ugly — it's about being honest about
            what a rectangle is.
          </p>
          <p>
            Where flat asks "can a hairline border and one accent carry
            this?", Neubrutalism asks the inverse: "can we delete every
            optional thing and still have a UI?" The answer turns out to
            be yes, and the resulting work has a particular kind of
            confidence.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Cream page, white sheets, no alpha.',
      plainTitle: 'Surfaces (the panels)',
      plainBody: (
        <>
          <p>
            The page is a warm cream colour — that's where the
            personality lives. Everything on top of it — cards, menus,
            dialogs — is plain white. They're all the same white, and
            none of them are see-through. The engine doesn't bother
            tinting them to show which is "higher" — that job belongs
            to the borders.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Only <code>surface.base</code> carries a tint — a warm cream
            that gives the page its identity.{' '}
            <code>raised</code>, <code>sunken</code>, and <code>overlay</code>{' '}
            are all the same plain white. The engine deliberately doesn't
            differentiate them with tone; everything that varies in hierarchy
            gets a different border instead.
          </p>
          <p>
            No <code>backdrop-blur</code>, no overlay texture, no gradient
            on the page — Neubrutalism is implacably opaque.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'One colour, four thicknesses.',
      plainTitle: 'Borders do everything',
      plainBody: (
        <>
          <p>
            The black outline is the whole personality. Where other
            styles use shadows or rounded edges to give hierarchy,
            Neubrutalism uses thickness. A thin line is a divider; a
            thicker line is an input; the thickest one wraps cards and
            buttons.
          </p>
          <p>
            And the colour never softens. Other styles fade their
            lines to grey when something is less important — this one
            refuses. All the lines are the same near-black; only the
            thickness changes.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            This is the engine. Borders carry <em>every</em> hierarchical
            cue that other engines would carry with shadow, curvature, or
            tone. <code>borderWidth.heavy</code> (4px) wraps cards and
            buttons; <code>thick</code> (3px) for raised secondary elements;
            <code>thin</code> (2px) for inputs and inline frames;{' '}
            <code>hairline</code> (1px) only for dividers.
          </p>
          <p>
            And the three <em>colour</em> rungs —{' '}
            <code>border.subtle</code>, <code>default</code>,{' '}
            <code>strong</code> — are all the <strong>same near-black</strong>.
            The engine refuses to dim its line. Hierarchy is thickness; never
            opacity.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Every rung is none.',
      plainTitle: 'No shadows at all',
      plainBody: (
        <>
          <p>
            Nothing in Neubrutalism casts a shadow. Drag the slider —
            the card doesn't move. The engine refuses to fake depth.
            That thick black border around the card is doing the same
            job a shadow would in flat or Material: telling you where
            the card ends.
          </p>
          <p>
            A close cousin of this look adds a single "sticker peel"
            shadow — a hard black square offset down and to the right,
            with no blur. This palette skips even that. Just borders
            and colour, nothing else.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            This is the engine's most quietly radical choice. Every rung —{' '}
            <code>flat</code>, <code>low</code>, <code>medium</code>,{' '}
            <code>high</code>, <code>overlay</code> — is{' '}
            <code>{'{ boxShadow: \'none\' }'}</code>. Drag the slider; the
            card doesn't move. The token slot exists so components can read
            it without exploding, but no value paints anything.
          </p>
          <p>
            The canonical Neubrutalism engine description in the token
            contract <em>permits</em> a hard-offset block shadow at{' '}
            <code>elevation.low</code> — an offset, zero-blur, near-black
            square that reads as a sticker peeled off the page. That's the
            engine's recognised second-take. This palette is the stricter
            elevation-free variant on purpose; the border is already doing
            the job a hard-offset shadow would.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Snap-to-grid, linear, no easing.',
      plainTitle: 'Snap, not glide',
      plainBody: (
        <>
          <p>
            State changes happen in under a tenth of a second, all in
            one constant speed — no slow-in, no slow-out, no spring.
            Hover a button and the colour change is so quick it reads
            as a snap rather than a fade.
          </p>
          <p>
            Toggle motion off in the demo and you can barely tell the
            difference, because there was almost nothing to remove.
            Flat softens its transitions; Neubrutalism abolishes them.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            Durations are <code>40&nbsp;ms</code>, <code>60&nbsp;ms</code>,{' '}
            <code>90&nbsp;ms</code> for <code>fast / base / slow</code> —
            every curve is <code>linear</code>. There's no slow-in or
            slow-out, no spring, no overshoot. State changes happen in a
            single, almost imperceptible frame.
          </p>
          <p>
            Decay is <code>0&nbsp;ms</code> like flat, but the philosophy
            is different: flat softens transitions, Neubrutalism abolishes
            them. Toggling motion off in the demo barely changes anything —
            because there was barely any motion to remove.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Vibrant fills, black ink, magenta focus.',
      plainTitle: 'Button colours that clash on purpose',
      plainBody: (
        <>
          <p>
            Six button colours, all loud: magenta, lime, neon yellow,
            hot red, sky blue, and plain white. Every one of them has
            black text on top, not white. The high-saturation
            background does the affirmative work; white text would
            soften it.
          </p>
          <p>
            Keyboard focus is a fat magenta ring drawn flush against
            the button's black border — no gap between them. You
            cannot miss it, which is part of the point. The engine
            refuses polite, restrained focus rings like every other
            decoration.
          </p>
        </>
      ),
      body: (
        <>
          <p>
            The six intents are deliberately <em>clashing</em>: magenta
            primary, lime success, neon yellow warning, hot red danger, sky
            info, plain white neutral. All six carry <strong>near-black
            content</strong> instead of the usual white inverse — the
            high-saturation backgrounds are doing the affirmative work, and
            white ink would soften them.
          </p>
          <p>
            Focus is a <code>4px solid magenta</code> ring at{' '}
            <strong>0 offset</strong>. The ring sits flush against the
            button's own border with no gap — another deliberate refusal of
            polish, and a strong accessibility signal you cannot miss.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
