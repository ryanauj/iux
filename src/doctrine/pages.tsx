// ABOUTME: Doctrine page content and registry: defines the four article pages (Layout, Component selection, App composition, Modalities), each rendered in plain-English and technical voice, with live component demos pulled from component story files, and exports the DOCTRINE_PAGES array that DoctrinePage iterates.

import type { ReactNode } from 'react'
import type { DocMode } from '../lib/useDocMode'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { Button } from '../components/Button/Button'
import { ModalStories } from '../components/Modal/Modal.stories'
import { DrawerStories } from '../components/Drawer/Drawer.stories'
import { ToastStories } from '../components/Toast/Toast.stories'
import { StackedToastsStories } from '../components/StackedToasts/StackedToasts.stories'
import { BentoStories } from '../components/Bento/Bento.stories'
import { CardStories } from '../components/Card/Card.stories'
import { TabsStories } from '../components/Tabs/Tabs.stories'
import { SegmentedStories } from '../components/Segmented/Segmented.stories'
import { CommandPaletteStories } from '../components/CommandPalette/CommandPalette.stories'
import { NLBarStories } from '../components/NLBar/NLBar.stories'
import { OptimisticUndoStories } from '../components/OptimisticUndo/OptimisticUndo.stories'
import { ButtonStories } from '../components/Button/Button.stories'
import { TooltipStories } from '../components/Tooltip/Tooltip.stories'
import { SpotlightStories } from '../components/Spotlight/Spotlight.stories'
import { StepperStories } from '../components/Stepper/Stepper.stories'
import { SelectStories } from '../components/Select/Select.stories'
import { SidebarStories } from '../components/Sidebar/Sidebar.stories'
import { EmptyStateStories } from '../components/EmptyState/EmptyState.stories'
import { InlineEditStories } from '../components/InlineEdit/InlineEdit.stories'

// ABOUTME: Union of the four doctrine page identifiers used as URL params and DOCTRINE_PAGES keys.
export type DoctrineId = 'layout' | 'selection' | 'composition' | 'modalities'

// ABOUTME: Callback type passed into each doctrine article so prev/next links and cross-references can navigate between pages without a full route change.
export type DoctrineNav = (id: DoctrineId) => void

// ABOUTME: Shape of one doctrine article entry: its id, display label, eyebrow text, title, source markdown filename, and a render factory that receives a nav callback and the current doc mode.
export type DoctrinePage = {
  id: DoctrineId
  label: string
  eyebrow: string
  title: string
  source: string
  render: (nav: DoctrineNav, mode: DocMode) => ReactNode
}

// ABOUTME: Base URL for linking to doctrine source files on GitHub; used by the Source component to link each article to its markdown file.
const GITHUB_BASE = 'https://github.com/ryanauj/iux/blob/main/doctrine'
// ABOUTME: Base URL for linking to arbitrary repo files on GitHub; used by article pages to link to FINALIZED-APPS.md, FINALIZED-COMPONENTS.md, and similar root docs.
const REPO_BASE = 'https://github.com/ryanauj/iux/blob/main'

// ABOUTME: Inline cross-reference link between doctrine pages — updates URL and calls nav on click without a full route change, but allows Cmd-click to open in a new tab.
function DocLink({
  to,
  nav,
  children,
}: {
  to: DoctrineId
  nav: DoctrineNav
  children: ReactNode
}) {
  return (
    <a
      href={`?doc=${to}#/doctrine`}
      onClick={e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        nav(to)
      }}
    >
      {children}
    </a>
  )
}

// ABOUTME: Previous/Next navigation footer rendered at the bottom of each doctrine article; shows DocLink arrows to the adjacent pages in the sequence.
function PrevNext({ nav, prev, next }: { nav: DoctrineNav; prev?: DoctrineId; next?: DoctrineId }) {
  const prevPage = prev ? DOCTRINE_PAGES.find(p => p.id === prev) : null
  const nextPage = next ? DOCTRINE_PAGES.find(p => p.id === next) : null
  return (
    <nav className="doctrine__prevnext" aria-label="Doctrine pages">
      {prevPage ? (
        <DocLink to={prevPage.id} nav={nav}>
          <span className="doctrine__prevnext-dir">← Previous</span>
          <span className="doctrine__prevnext-label">{prevPage.label}</span>
        </DocLink>
      ) : <span />}
      {nextPage ? (
        <DocLink to={nextPage.id} nav={nav}>
          <span className="doctrine__prevnext-dir">Next →</span>
          <span className="doctrine__prevnext-label">{nextPage.label}</span>
        </DocLink>
      ) : <span />}
    </nav>
  )
}

// ABOUTME: Renders a "Full doctrine:" line linking to the article's source markdown file on GitHub so readers can jump to the complete rules not covered by the inline demos.
function Source({ file }: { file: string }) {
  return (
    <p className="doctrine__source">
      Full doctrine: <a href={`${GITHUB_BASE}/${file}`} target="_blank" rel="noreferrer">{`doctrine/${file}`}</a>
      {' — '}rules, counterexamples, and the parts not covered by demos here.
    </p>
  )
}

// ABOUTME: Inline cross-reference paragraph that bridges to a related doctrine page or external document; styled as a callout-link line between sections.
function Cross({ children }: { children: ReactNode }) {
  return <p className="doctrine__cross">{children}</p>
}

// ABOUTME: Named section container within a doctrine article, rendering an H3 title and its child content inside a `doctrine__section` block.
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="doctrine__section">
      <h3 className="doctrine__section-title">{title}</h3>
      {children}
    </section>
  )
}

// ABOUTME: Body-copy paragraph inside a doctrine section, styled as `doctrine__prose`.
function Prose({ children }: { children: ReactNode }) {
  return <p className="doctrine__prose">{children}</p>
}

// ABOUTME: Aside block for failure modes and anti-patterns, rendered with a bold label (default "Failure mode") and visually set apart from the prose.
function Callout({ label = 'Failure mode', children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="doctrine__callout">
      <span className="doctrine__callout-label">{label}</span>
      {children}
    </aside>
  )
}

// ABOUTME: Framed live-component demo block with an optional caption; wraps the component story in `doctrine__demo-frame` so each doctrine example is visually contained.
function Demo({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <div className="doctrine__demo">
      {caption && <p className="doctrine__demo-caption">{caption}</p>}
      <div className="doctrine__demo-frame">{children}</div>
    </div>
  )
}

// ABOUTME: Two-column side-by-side container used to display a pair of Demo blocks (e.g. Modal vs Drawer) so readers can compare the two options at a glance.
function Split({ children }: { children: ReactNode }) {
  return <div className="doctrine__split">{children}</div>
}

// ABOUTME: Numbered ordered-list of doctrine rules, each item rendered as a `doctrine__rules-item` so the list reads as an authoritative sequence.
function Rules({ items }: { items: ReactNode[] }) {
  return (
    <ol className="doctrine__rules">
      {items.map((item, i) => (
        <li key={i} className="doctrine__rules-item">{item}</li>
      ))}
    </ol>
  )
}

// The "switch the palette and watch spacing change" rule is invisible if the
// reader happens to toggle between two of the ~80 palettes that share the
// default 12px ramp. This strip renders the same button row under the four
// palettes whose space scale actually diverges, side by side, so the gap
// difference is visible without hunting through the palette list.
// ABOUTME: The four palettes whose space.3 token actually differs from the common default, paired with their display name, the literal space.3 value, and a note; used by SpacingCompare to render a side-by-side spacing demonstration.
const SPACING_LADDER: { id: PaletteId; name: string; space3: string; note: string }[] = [
  { id: 'aaa', name: 'AAA', space3: '10px', note: 'tightens the ramp' },
  { id: 'material', name: 'Material', space3: '12px', note: 'the shared default' },
  { id: 'editorial', name: 'Editorial', space3: '16px', note: 'widens for type' },
  { id: 'academic', name: 'Academic', space3: '20px', note: 'widest ramp' },
]

// ABOUTME: Side-by-side demo of the four palettes from SPACING_LADDER, each rendered in its own PaletteRoot with the same button row so the gap and padding differences are visible without switching palettes in the controls.
function SpacingCompare() {
  return (
    <div className="doctrine__spacing">
      {SPACING_LADDER.map(({ id, name, space3, note }) => (
        <PaletteRoot key={id} palette={palettes[id]} className="doctrine__spacing-col">
          <div className="doctrine__spacing-head">
            <span className="doctrine__spacing-name">{name}</span>
            <code className="doctrine__spacing-val">space.3 = {space3}</code>
            <span className="doctrine__spacing-note">{note}</span>
          </div>
          <div className="doctrine__spacing-row">
            <Button variant="solid" intent="primary">One</Button>
            <Button variant="solid" intent="neutral">Two</Button>
            <Button variant="solid" intent="info">Three</Button>
          </div>
        </PaletteRoot>
      ))}
    </div>
  )
}

// `Button` has no size prop, so a row of buttons can't show cross-size
// alignment — this demo does it directly. Mixed-size marks rendered two ways:
// aligned to the box (top edges flush, so their centers stagger and the row
// reads "almost aligned but off") versus aligned to the optical center (reads
// even). Sizes are drawn from the space scale so the contrast survives a
// palette swap.
// ABOUTME: Size sequence for the AlignmentCompare demo — mixed s/m/l marks in a row whose non-uniform sizes make box-alignment vs optical-center alignment visibly different.
const ALIGN_MARKS = ['s', 'l', 'm', 'l', 's'] as const

// ABOUTME: Two-row visual demo showing the same ALIGN_MARKS row aligned to the bounding box (top edges flush, centers stagger) versus aligned to the optical center (reads even); illustrates the optical-over-metric alignment rule.
function AlignmentCompare() {
  const row = (mod: string) => (
    <div className={`doctrine__align-row doctrine__align-row--${mod}`}>
      {ALIGN_MARKS.map((sz, i) => (
        <span key={i} className={`doctrine__align-mark doctrine__align-mark--${sz}`} />
      ))}
    </div>
  )
  return (
    <div className="doctrine__align">
      <div className="doctrine__align-case">
        <span className="doctrine__align-label">
          Aligned to the box — top edges flush, centers stagger
        </span>
        {row('box')}
      </div>
      <div className="doctrine__align-case">
        <span className="doctrine__align-label">
          Aligned to the optical center — reads even
        </span>
        {row('optical')}
      </div>
    </div>
  )
}

// One component, three container widths, on one page. Each frame is a size
// container (`container-type: inline-size`); the panel inside reads a real
// `@container (min-width)` query and switches from a stacked layout to a row
// as its OWN width — not the viewport — crosses the threshold. This is the
// technique the section preaches; nothing in the component library actually
// uses a size container query, so the demo carries the rule on its own.
// ABOUTME: The three fixed widths used by ContainerCompare to show the same panel component responding to its container width via `@container (min-width)` rather than viewport breakpoints.
const CONTAINER_WIDTHS = ['240px', '360px', '520px'] as const

// ABOUTME: Demo that renders the same panel at the three CONTAINER_WIDTHS side by side on the page, proving that the layout switches on container width rather than viewport width.
function ContainerCompare() {
  return (
    <div className="doctrine__cq">
      {CONTAINER_WIDTHS.map(w => (
        <div key={w} className="doctrine__cq-frame" style={{ width: w }}>
          <span className="doctrine__cq-width">{w} container</span>
          <div className="doctrine__cq-panel">
            <div className="doctrine__cq-body">
              <span className="doctrine__cq-title">Container card</span>
              <span className="doctrine__cq-sub">reflows on its own width</span>
            </div>
            <Button variant="solid" intent="primary">Action</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ABOUTME: Plain-English version of the Layout doctrine article: five everyday rules (named gaps, one axis, density is the style's job, names over pixels, baseline/edge alignment), SpacingCompare and AlignmentCompare demos, container-query panel, and palette-misfit warning.
function LayoutPagePlain({ nav }: { nav: DoctrineNav }) {
  return (
    <article className="doctrine">
      <header className="doctrine__head">
        <p className="doctrine__eyebrow">Doctrine · 00 · plain English</p>
        <h2 className="doctrine__title">Layout</h2>
        <p className="doctrine__lede">
          How things are arranged on the page — the gaps between things, how
          tightly they're packed, and the choice between a list, a grid, or a
          bento-box layout. Switch the palette in the floating controls and
          watch the same buttons get airier or tighter depending on the style.
        </p>
        <Source file="00-layout.md" />
      </header>

      <Section title="The simple rules">
        <Rules items={[
          <><strong>Gaps come from a fixed set of sizes.</strong> Don't pick
            "12 pixels here" — pick "small gap" and let the style decide what
            that means in pixels.</>,
          <><strong>One arrangement per area.</strong> Either a stack of items,
            or a grid, or a bento box — not all three nested inside each
            other.</>,
          <><strong>How tight things are packed is the style's job.</strong>{' '}
            One component shouldn't try to be "compact" all on its own; the
            palette decides density everywhere.</>,
          <><strong>Names, not pixel counts.</strong> A "small gap" survives
            a palette swap; "12 pixels" doesn't.</>,
          <><strong>Line up text along its baseline, line up boxes along
            their edges.</strong> Mixing the two is what makes a layout feel
            "almost right but somehow off."</>,
        ]} />
      </Section>

      <Section title="Same buttons, different palette — see density change">
        <Prose>
          A row of buttons. Switch palettes in the floating controls and watch
          the spacing around them tighten or loosen. The buttons themselves
          don't change — the palette decided what "a small gap" should be in
          pixels for this look.
        </Prose>
        <Prose>
          One catch: most palettes share the same "small gap," so flipping
          between two of them changes nothing. The strip below pins the four
          palettes whose spacing genuinely differs, side by side — same three
          buttons in each. Watch the whole column tighten or open up: the
          palette sets the gaps <em>and</em> the padding inside the buttons.
          The colors differ too, but spacing is the thing to watch.
        </Prose>
        <Demo caption="Same buttons, four palettes — padding and gaps both come from each palette's space scale">
          <SpacingCompare />
        </Demo>
        <Demo caption="Buttons across states — spacing comes from the palette">
          <ButtonStories />
        </Demo>
      </Section>

      <Section title="Stack vs Grid vs Bento — pick the right shape">
        <Prose>
          Three shapes for arranging things, picked by what the items are.
          <strong> Stack</strong> for a list where everything is roughly the
          same kind of thing (a feed, a form). <strong>Grid</strong> when
          there are lots of similar items meant to scan in rows and columns
          (a photo wall). <strong>Bento</strong> when items are deliberately
          different sizes and you want the layout to teach which one is most
          important.
        </Prose>
        <Demo caption="Bento — items declare their own size; the layout makes room for each">
          <BentoStories variant="static" />
        </Demo>
        <Callout>
          Reaching for a Bento because the items happen to be different sizes
          but you don't actually have a hierarchy. The layout will look
          confused. Use a Grid with one bigger cell instead.
        </Callout>
      </Section>

      <Section title="Things that look almost-aligned but aren't">
        <Prose>
          Words and icons should line up by the part the eye reads — letter
          tops, icon centres — not by the invisible box around them. A row
          of mixed-size icons aligned to their boxes will look indented or
          floating, even when the boxes are technically aligned. Align to
          what you actually see.
        </Prose>
        <Demo caption="Same marks, two ways — aligned to the box (top), aligned to what you see (bottom)">
          <AlignmentCompare />
        </Demo>
      </Section>

      <Section title="Components shouldn't care how wide the window is">
        <Prose>
          A card doesn't know if it's in a sidebar or filling the page — it
          knows it's been given a certain amount of room. It should arrange
          itself based on that, not based on the window. The panel below is
          the same component shown at three widths — all on this one page — so
          you can see it rearrange itself based only on the room it's given,
          not on how wide your browser is.
        </Prose>
        <Demo caption="One component, three amounts of room — it stacks when narrow, spreads into a row when wide">
          <ContainerCompare />
        </Demo>
      </Section>

      <Section title="When the wrong layout punishes the wrong style">
        <Prose>
          Some palettes really don't get along with certain layouts. Try
          switching the chrome palette to Neumorphism and putting things in a
          tight grid — the shadows that make Neumorphism feel like clay run
          into each other and blur into a single lump. Each style has
          arrangements that bring out the best in it and arrangements that
          ruin it.
        </Prose>
      </Section>

      <Cross>
        Next: <DocLink to="selection" nav={nav}>which component to use</DocLink>{' '}
        — picking between things that look like they solve the same problem.
      </Cross>

      <PrevNext nav={nav} next="selection" />
    </article>
  )
}

// ABOUTME: Dispatcher for the Layout doctrine article — renders LayoutPagePlain in plain mode or the technical version with code references and counterexamples in technical mode.
function LayoutPage({ nav, mode }: { nav: DoctrineNav; mode: DocMode }) {
  if (mode === 'plain') return <LayoutPagePlain nav={nav} />
  return (
    <article className="doctrine">
      <header className="doctrine__head">
        <p className="doctrine__eyebrow">Doctrine · 00</p>
        <h2 className="doctrine__title">Layout</h2>
        <p className="doctrine__lede">
          Grid, spacing, density, and the rules that decide which one carries an app.
          Switch the chrome palette to see <code>space.*</code> and engine density
          remap under your feet — the live evidence for the "names beat pixels" rule.
        </p>
        <Source file="00-layout.md" />
      </header>

      <Section title="Hard rules">
        <Rules items={[
          <><strong>Spacing comes from the scale, not from inspection.</strong>{' '}
            Every gap reads from a <code>space.*</code> slot. A pixel
            that "looks right" under Flat lands wrong under Editorial.</>,
          <><strong>One axis owns the layout.</strong> Stack OR grid OR
            bento. Nesting all three teaches two rhythms when the eye
            wants one.</>,
          <><strong>Density is an engine concern, not a component
            override.</strong> The palette decides density by remapping{' '}
            <code>space.*</code>; the component just renders.</>,
          <><strong>Names beat pixels.</strong> <code>space.3</code>{' '}
            survives a palette swap from AAA to Editorial.{' '}
            <code>12px</code> does not.</>,
          <><strong>One alignment rule per axis.</strong> Optical along
            the read direction, metric across it. Mixing them is the
            cause of "almost-aligned" UIs that never feel right.</>,
        ]} />
      </Section>

      <Section title="Density per engine — same buttons, different palette">
        <Prose>
          A row of buttons rendered through the contract. Switch the palette
          in the floating controls: AAA tightens the whole ramp, Editorial widens
          it, Pixel-art snaps gaps to the grid step. The components don't change
          shape — every length they use, padding and gaps alike, resolves through{' '}
          <code>space.*</code>, which the palette remaps underneath.
        </Prose>
        <Prose>
          The catch the floating control hides: most palettes ship the same
          <code> 4/8/12/16/24</code> ramp, so a swap between two of them is a
          no-op on spacing. The strip below pins the palettes whose{' '}
          <code>space.3</code> actually diverges — <code>10 → 12 → 16 → 20px</code>{' '}
          — so the remap is legible without trial-and-error through the list.
          Watch the padding and gaps scale together, not just the gutter.
        </Prose>
        <Demo caption="Same row, four engines — padding + gap both resolve through each palette's space scale (space.3 labeled)">
          <SpacingCompare />
        </Demo>
        <Demo caption="Button variants × states — scaffold gap reads from space.*">
          <ButtonStories />
        </Demo>
      </Section>

      <Section title="Stack vs Grid vs Bento">
        <Prose>
          One axis owns the layout. Bento is the right answer when items have
          <em> intentionally </em> different sizes that teach an importance
          hierarchy. The static Bento below is the canonical case; a Grid would
          flatten the hierarchy, a Stack would orphan the wide tiles.
        </Prose>
        <Demo caption="Bento — items declare cols/rows; the grid arranges around them">
          <BentoStories variant="static" />
        </Demo>
        <Callout>
          Bento as a fallback for "I have weird-sized items" — if the items
          don't teach a hierarchy, the layout teaches confusion. Use a Grid
          with one larger cell instead.
        </Callout>
      </Section>

      <Section title="Alignment — optical along the read, metric across it">
        <Prose>
          Glyph x-heights, icon optical centers, and button label baselines
          align <em>optically</em> along the read direction. Gutters, column
          edges, and padding align <em>metrically</em> across it. The mistake
          is aligning a column of mixed-size icons to the box: 16px icons
          look indented next to 24px icons. Align to the optical center; let
          the box float.
        </Prose>
        <Demo caption="Mixed-size marks — top row aligned to the box (centers stagger); bottom row aligned to the optical center (reads even)">
          <AlignmentCompare />
        </Demo>
      </Section>

      <Section title="Container queries over breakpoints">
        <Prose>
          Components query their container, not the viewport. A Card doesn't
          know if it's in a sidebar or a hero slot — it knows it has{' '}
          <code>width: 320px</code> of room. Breakpoints encode a viewport
          guess that fails the moment the component lives somewhere else in
          the layout. The panel below is one component rendered in three
          fixed-width containers on this same page; each reads a real{' '}
          <code>@container (min-width)</code> query and flips from a stacked
          layout to a row as its <em>own</em> width — not the window — crosses
          the threshold.
        </Prose>
        <Demo caption="One component, three container widths — the layout switches on container width, not viewport">
          <ContainerCompare />
        </Demo>
      </Section>

      <Section title="Counterexamples — engines that punish the wrong layout">
        <Prose>
          The wrong layout under the wrong engine is how the contract leaks.
          Switch chrome to Neumorphism and try a tight Bento: shadows merge,
          every cell becomes one lump. Switch to a pixel palette and look at
          gap widths — every <code>space.*</code> is integer pixels because
          fractional gaps land off-grid.
        </Prose>
        <Rules items={[
          <><strong>Neumorphism + tight grid.</strong> The paired
            inset/outset shadows need air. Dropped into a <code>space.2</code>{' '}
            gap, the shadows merge.</>,
          <><strong>Sketch + dense Bento.</strong> The wobble filter
            adds about a pixel of jitter. Adjacent cell borders enter
            each other's jitter range and read merged.</>,
          <><strong>Pixel-art + fractional spacing.</strong> Pixel
            palettes must rescale the <em>whole</em> ramp, not
            piecewise — otherwise sprite alignment breaks.</>,
          <><strong>Bento as "I have weird-sized items."</strong> If
            the items don't teach a hierarchy, a Grid with one larger
            cell is more honest.</>,
        ]} />
      </Section>

      <Cross>
        Next: <DocLink to="selection" nav={nav}>component selection</DocLink>{' '}
        — which primitive carries a given intent, and the failure mode of picking wrong.
      </Cross>

      <PrevNext nav={nav} next="selection" />
    </article>
  )
}

// ABOUTME: Plain-English version of the Component Selection doctrine article: three simple rules, then side-by-side Demo pairs (Drawer/Modal, Toast/StackedToasts, Tabs/Segmented, Tooltip/Coachmark, Select/CommandPalette) so readers feel the difference without needing vocabulary.
function SelectionPagePlain({ nav }: { nav: DoctrineNav }) {
  return (
    <article className="doctrine">
      <header className="doctrine__head">
        <p className="doctrine__eyebrow">Doctrine · 01 · plain English</p>
        <h2 className="doctrine__title">Picking the right component</h2>
        <p className="doctrine__lede">
          Two parts of the screen often look like they could solve the same
          problem — a Modal vs a Drawer, a Tooltip vs a Coachmark. Each pair
          below shows the two side-by-side so you can feel the difference
          rather than read about it.
        </p>
        <Source file="01-component-selection.md" />
      </header>

      <Section title="The simple rules">
        <Rules items={[
          <><strong>Pick the thing that names what the user is trying to
            do.</strong> Not the thing with the most features.</>,
          <><strong>Every component on the screen is a small ask of the
            user.</strong> Two components saying the same thing cost twice
            as much attention as one said well.</>,
          <><strong>When unsure, use the lighter option.</strong> A modal
            interrupts more than a drawer; a drawer more than a popover; a
            popover more than a tooltip. Use the lightest one that still
            carries the meaning.</>,
        ]} />
      </Section>

      <Section title="Drawer vs Modal — side-trip vs interruption">
        <Prose>
          A modal is an interruption: you have to deal with it before you can
          continue. A drawer is a side-trip: you can wander into it and back
          out without committing to anything. Use a modal for "are you sure
          you want to delete this?"; use a drawer for "let me peek at the
          details."
        </Prose>
        <Split>
          <Demo caption="Modal — for things you have to deal with right now">
            <ModalStories variant="centered" />
          </Demo>
          <Demo caption="Drawer — for things you can leave anytime">
            <DrawerStories variant="side" />
          </Demo>
        </Split>
        <Callout>
          Putting a "confirm delete" inside a drawer. The drawer's whole vibe
          says "you can leave this" — exactly the wrong feeling for a
          destructive action.
        </Callout>
      </Section>

      <Section title="One toast vs many — single message vs stack">
        <Prose>
          A toast is a brief floating message — "Saved." If they only ever
          come one at a time, a plain toast is fine. If the user might
          generate several at once (background uploads, multiple actions),
          you need a stack so they don't trip over each other.
        </Prose>
        <Split>
          <Demo caption="Toast — one message">
            <ToastStories variant="action" />
          </Demo>
          <Demo caption="Stacked toasts — many at once, ordered by importance">
            <StackedToastsStories variant="severity" />
          </Demo>
        </Split>
      </Section>

      <Section title="Tabs vs Segmented — different pages vs different views of the same page">
        <Prose>
          Tabs switch between separate places — like rooms. Segmented
          controls change how the current room looks — sort order, filter,
          view mode. The page underneath stays the same; only the lens
          changes.
        </Prose>
        <Split>
          <Demo caption="Tabs — each tab is its own place">
            <TabsStories variant="basic" />
          </Demo>
          <Demo caption="Segmented — same page, different view">
            <SegmentedStories variant="pill" />
          </Demo>
        </Split>
      </Section>

      <Section title="Tooltip vs Coachmark — quick hint vs one-time lesson">
        <Prose>
          A tooltip is a short label that pops up when you hover over
          something. A coachmark is a teaching overlay that points at things
          and explains what they are. Use a tooltip when the user just needs
          a name; use a coachmark when you actually need to teach them
          something they wouldn't figure out on their own.
        </Prose>
        <Split>
          <Demo caption="Tooltip — a quick label">
            <TooltipStories variant="coach" />
          </Demo>
          <Demo caption="Coachmark — a guided lesson">
            <SpotlightStories variant="sequence" />
          </Demo>
        </Split>
        <Callout>
          Putting required information inside a tooltip — anyone using a
          keyboard or a touchscreen probably won't see it. Put critical
          information in plain text on the page.
        </Callout>
      </Section>

      <Section title="Select vs Command palette — pick a value vs pick an action">
        <Prose>
          A select picks a <em>thing</em> from a list — a country, a date, a
          person. A command palette picks an <em>action</em> — "create new
          file," "rename this." Things go in selects; verbs go in command
          palettes.
        </Prose>
        <Split>
          <Demo caption="Select — pick a value from a list">
            <SelectStories variant="combobox" />
          </Demo>
          <Demo caption="Command palette — pick an action">
            <CommandPaletteStories variant="flat" />
          </Demo>
        </Split>
      </Section>

      <Section title="Not too many controls in one row">
        <Prose>
          Two rules of thumb. Keep the number of interruption-style components
          on screen low — a modal inside a drawer inside a popover is three
          interruptions stacked. And in a single row, three meaningful
          buttons or controls is the limit. After that, the row stops being
          a row and starts being noise — push the rest into a "more" menu.
        </Prose>
      </Section>

      <PrevNext nav={nav} prev="layout" next="composition" />
    </article>
  )
}

// ABOUTME: Dispatcher for the Component Selection article — renders the plain-English side-by-side version or the technical version with FINALIZED-COMPONENTS reference, affordance-load rules, and Stepper/Wizard and Sidebar/Tabs disambiguation.
function SelectionPage({ nav, mode }: { nav: DoctrineNav; mode: DocMode }) {
  if (mode === 'plain') return <SelectionPagePlain nav={nav} />
  return (
    <article className="doctrine">
      <header className="doctrine__head">
        <p className="doctrine__eyebrow">Doctrine · 01</p>
        <h2 className="doctrine__title">Component selection</h2>
        <p className="doctrine__lede">
          When two primitives look like they solve the same problem, the choice is
          rarely "preference." Each disambiguation below runs the live components
          side-by-side so the difference in grammar is visible, not described.
        </p>
        <Source file="01-component-selection.md" />
      </header>

      <Section title="Hard rules">
        <Rules items={[
          <>The catalog is{' '}
            <a href={`${REPO_BASE}/FINALIZED-COMPONENTS.md`} target="_blank" rel="noreferrer">
              FINALIZED-COMPONENTS.md
            </a>. This doc is the index of <em>disambiguations</em>;
            pick the rung that fits, not the highest one.</>,
          <><strong>Pick the component that names the user's intent</strong>{' '}
            — not the one with the most affordances. A Drawer with a
            Stepper inside is not a Modal.</>,
          <><strong>Affordances are not free.</strong> Each primitive
            on screen is a hypothesis the user must read. Two
            primitives saying the same thing cost more than one said
            well.</>,
          <><strong>When in doubt, use the lighter primitive.</strong>{' '}
            Modal &gt; Drawer &gt; Popover &gt; Tooltip — pick the
            lightest one that carries the meaning.</>,
        ]} />
      </Section>

      <Section title="Drawer vs Modal — interruption vs side journey">
        <Prose>
          Modal interrupts: the task must complete before the user continues.
          Drawer is a side journey: dismissable, no commitment. Open both and
          read the difference in commitment by the affordances each carries.
        </Prose>
        <Split>
          <Demo caption="Modal · centered — destructive confirm sits here">
            <ModalStories variant="centered" />
          </Demo>
          <Demo caption="Drawer · side — secondary task, leave anytime">
            <DrawerStories variant="side" />
          </Demo>
        </Split>
        <Callout>
          Confirming a destructive delete in a Drawer — the drawer's whole
          grammar says "you can leave this," which is exactly wrong for "are
          you sure." Use Modal with a danger-intent button.
        </Callout>
      </Section>

      <Section title="Toast vs Stacked toasts — one ephemeral vs many">
        <Prose>
          A single Toast is ephemeral feedback. Stacked toasts handle volume:
          cap visible count, dedupe identical messages, severity-grouped order,
          a tray for the rest. Promote when the user generates concurrent
          messages faster than one toast can clear.
        </Prose>
        <Split>
          <Demo caption="Toast · action — one message, one undo">
            <ToastStories variant="action" />
          </Demo>
          <Demo caption="Stacked toasts · severity — many in flight, ordered by priority">
            <StackedToastsStories variant="severity" />
          </Demo>
        </Split>
      </Section>

      <Section title="Tabs vs Segmented — different views vs same view, different lens">
        <Prose>
          Tabs switch sibling destinations. Segmented controls pick a filter or
          mode for the same view: the page stays, the lens changes. Tabs for
          sort order is a category error.
        </Prose>
        <Split>
          <Demo caption="Tabs · basic — each tab is a destination">
            <TabsStories variant="basic" />
          </Demo>
          <Demo caption="Segmented · pill — re-lens the same view">
            <SegmentedStories variant="pill" />
          </Demo>
        </Split>
      </Section>

      <Section title="Tooltip vs Coachmark — hover hint vs one-time teaching">
        <Prose>
          Tooltips are decorative labels: hover or focus reveals a short
          hint that dies with the trigger. Coachmarks (Spotlight rung 2,
          <em> sequence</em>) are one-time teaching overlays — they dim
          everything else and require explicit dismissal. Use a tooltip
          for "what does this do," a coachmark for "let me teach you
          where things are."
        </Prose>
        <Split>
          <Demo caption="Tooltip · coach — short anchored hint">
            <TooltipStories variant="coach" />
          </Demo>
          <Demo caption="Spotlight · sequence — guided teaching tour">
            <SpotlightStories variant="sequence" />
          </Demo>
        </Split>
        <Callout>
          Putting required instructions in a Tooltip. Hover-only content
          is invisible to keyboard and touch users. Promote to inline
          help text or a Coachmark.
        </Callout>
      </Section>

      <Section title="Stepper vs Wizard — visible sequence vs branching flow">
        <Prose>
          Stepper rungs 1–2 expose a known sequence; the user sees every
          step at once. Stepper rungs 3–4 (branching, resumable) become a{' '}
          <em>Wizard</em>: per-step validation, URL- and storage-resumable,
          long enough to leave and come back to. A five-step onboarding
          inside a multi-step Modal abandons mid-flow; promote it to a
          Wizard.
        </Prose>
        <Split>
          <Demo caption="Stepper · linear — visible progress through a fixed sequence">
            <StepperStories variant="linear" />
          </Demo>
          <Demo caption="Stepper · branching — Wizard rung; per-step validation, branch points">
            <StepperStories variant="branching" />
          </Demo>
        </Split>
      </Section>

      <Section title="Select vs Combobox vs Command palette — pick a value vs pick an action">
        <Prose>
          Select handles a short, known list. Combobox handles long lists
          with fuzzy filter and async loading — still picking a value.
          Command palette picks an <em>action</em>: verbs, not nouns. A
          combobox for "what do you want to do?" is a category error;
          actions belong in the palette.
        </Prose>
        <Split>
          <Demo caption="Select · combobox — long value list with fuzzy filter">
            <SelectStories variant="combobox" />
          </Demo>
          <Demo caption="CommandPalette · flat — pick an action, not a value">
            <CommandPaletteStories variant="flat" />
          </Demo>
        </Split>
      </Section>

      <Section title="Sidebar vs Tabs — destinations vs sibling views">
        <Prose>
          Sidebars are primary navigation for an app shell with many
          destinations; rung 3 (rail) collapses to icon-only; rung 4 adds
          search. Tabs are sibling-view furniture <em>inside</em> one
          destination. A twelve-tab strip across the top of an app shell
          is a Sidebar in denial.
        </Prose>
        <Split>
          <Demo caption="Sidebar · groups — primary nav with grouped destinations">
            <SidebarStories variant="groups" />
          </Demo>
          <Demo caption="Tabs · basic — sibling views inside one destination">
            <TabsStories variant="basic" />
          </Demo>
        </Split>
      </Section>

      <Section title="EmptyState vs Coachmark — fill the void vs teach the room">
        <Prose>
          EmptyState rung 4 (generative example data) does double duty as
          onboarding: the container is empty <em>now</em>, here's a seed
          the user can edit. A coachmark tour for the same empty list
          teaches less in more attention. Reach for the EmptyState first;
          promote to a Coachmark only when the teaching is about the room
          itself, not the contents.
        </Prose>
        <Split>
          <Demo caption="EmptyState · generative — seeded data the user can edit">
            <EmptyStateStories variant="generative" />
          </Demo>
          <Demo caption="Spotlight · sequence — teach the room, not the contents">
            <SpotlightStories variant="sequence" />
          </Demo>
        </Split>
      </Section>

      <Section title="Affordance load — per surface, per row">
        <Prose>
          Two rules of thumb. <strong>Per surface, one heavy primitive
          at a time</strong> — a Modal inside a Drawer inside a Popover
          is three interruptions stacked. <strong>Per row, three
          meaningful affordances max</strong> — a row with a primary
          button, an icon button, a checkbox, a kebab, an inline-edit
          field, <em>and</em> a drag handle reads as noise. Cut to
          three; demote the rest into a kebab menu or a hover strip.
        </Prose>
      </Section>

      <Cross>
        Full matrix lives in{' '}
        <a href={`${GITHUB_BASE}/01-component-selection.md`} target="_blank" rel="noreferrer">01-component-selection.md</a>{' '}
        (Toast vs Alert vs Banner, Tooltip vs Popover vs Coachmark in
        full, EmptyState vs Coachmark vs Tooltip onboarding cases, and
        the counterexamples drawn from each showcase app).
      </Cross>

      <PrevNext nav={nav} prev="layout" next="composition" />
    </article>
  )
}

// ABOUTME: Plain-English version of the App Composition doctrine article: four simple rules, the five-step pipeline (what → core idea → must-work component → everything else → look), and kanban Card / EmptyState demos.
function CompositionPagePlain({ nav }: { nav: DoctrineNav }) {
  return (
    <article className="doctrine">
      <header className="doctrine__head">
        <p className="doctrine__eyebrow">Doctrine · 02 · plain English</p>
        <h2 className="doctrine__title">How to put an app together</h2>
        <p className="doctrine__lede">
          The order in which you make decisions when building something. Walk
          it forwards. Starting from "I love Glassmorphism, what should I
          build?" is the wrong direction.
        </p>
        <Source file="02-app-composition.md" />
      </header>

      <Section title="The simple rules">
        <Rules items={[
          <><strong>Decide what the app does <em>first</em>, decide what it
            looks like <em>last</em>.</strong> A look is a paintbrush. Pick
            what you're painting before you pick the brush.</>,
          <><strong>One core idea per app.</strong> Is it about arranging
            things in space, moving through time, or reading a document?
            Pick one. Apps that try to be two things at once teach neither.</>,
          <><strong>Find the one thing the app can't work without.</strong>{' '}
            In a kanban it's the draggable card. In an outliner it's typing
            into a row. Pick this before any other component.</>,
          <><strong>The look has to make that one thing work, not fight
            it.</strong> Some looks make drag-and-drop feel great; others
            make it impossible to see. Match them carefully.</>,
        ]} />
      </Section>

      <Section title="The order">
        <pre className="doctrine__pipeline">
{`what it does  →  the core idea  →  the must-work component  →  everything else  →  the look`}
        </pre>
        <Prose>
          Walk it left to right. Each step locks in something the next step
          has to respect. Most apps that feel "off" jumped ahead — usually to
          the look.
        </Prose>
      </Section>

      <Section title="Step 1 — What does the app actually do?">
        <Prose>
          One verb, one object, in eight words or fewer. "Move work between
          stages." "Capture nested thoughts." "Track time on a project." If
          you can't say it that short, the app is probably two apps.
        </Prose>
      </Section>

      <Section title="Step 2 — What's the core idea?">
        <Prose>
          Three families to pick from. <strong>Spatial</strong> — moving
          things around in space matters (kanban, canvas, board).{' '}
          <strong>Temporal</strong> — time is the main axis (timeline,
          schedule, history). <strong>Documentary</strong> — the user is
          reading or writing something top-to-bottom (notes, outliner,
          table).
        </Prose>
      </Section>

      <Section title="Step 3 — The must-work component (kanban example)">
        <Prose>
          In a kanban, the draggable card is the must-work component. If
          drag-and-drop doesn't feel right, the whole app falls apart.
          Switch the palette in the floating controls to <em>Neumorphism</em>
          and the card practically disappears against the page. Switch it to{' '}
          <em>Material</em> or <em>Neubrutalism</em> and the lift comes back.
          That's the "look has to make the core thing work" rule in action.
        </Prose>
        <Demo caption="Card — the must-work component in a kanban">
          <CardStories variant="spatial" />
        </Demo>
        <Callout label="Common mistake">
          Starting from a look — "we love Glassmorphism, what should we
          build?" The look has no opinion about what the user is trying to
          do. If you love a look, treat it as a <em>filter</em> on the next
          app you pick.
        </Callout>
      </Section>

      <Section title="Step 4 — Everything else, kept light">
        <Prose>
          Most of the other parts of an app should be the simplest version
          of themselves. Plain button for most actions. A simple "nothing
          here yet" message for empty lists. A brief floating toast for "your
          thing saved." Reach for heavier components only when the lighter
          ones genuinely can't carry the meaning.
        </Prose>
        <Demo caption="A simple 'nothing here yet' message">
          <EmptyStateStories variant="checklist" />
        </Demo>
      </Section>

      <Section title="Step 5 — Picking the look">
        <Prose>
          Now that you know what the app does and what its must-work
          component is, you can pick a look that flatters it. Rules of
          thumb: if the core thing depends on cards looking lifted off the
          page, skip Neumorphism. If it depends on small, sharp text, skip
          Pixel-art and Sketch. If it depends on showing what's underneath,
          glass-based palettes shine.
        </Prose>
      </Section>

      <PrevNext nav={nav} prev="selection" next="modalities" />
    </article>
  )
}

// ABOUTME: Dispatcher for the App Composition article — renders the plain-English pipeline walkthrough or the technical version with FINALIZED-APPS links, kanban and outliner case studies, and palette-fit rationale.
function CompositionPage({ nav, mode }: { nav: DoctrineNav; mode: DocMode }) {
  if (mode === 'plain') return <CompositionPagePlain nav={nav} />
  return (
    <article className="doctrine">
      <header className="doctrine__head">
        <p className="doctrine__eyebrow">Doctrine · 02</p>
        <h2 className="doctrine__title">App composition</h2>
        <p className="doctrine__lede">
          The pipeline from "we want to build something that does X" to a working
          app. Walk it forward; skipping intent and starting at metaphor or palette
          is the failure mode.
        </p>
        <Source file="02-app-composition.md" />
      </header>

      <Section title="Hard rules">
        <Rules items={[
          <><strong>Intent first, palette last.</strong> A palette is
            the surface you paint on; choosing it first is choosing a
            paintbrush before deciding what to paint.</>,
          <><strong>One metaphor per app.</strong> Spatial, temporal,
            or documentary — apps that try to be two at once teach
            neither.</>,
          <><strong>The load-bearing component is the one whose
            failure breaks the app.</strong> Pick it before any other
            primitive. Everything else supports it.</>,
          <><strong>The palette must not undermine the load-bearing
            component.</strong> Every app in{' '}
            <a href={`${REPO_BASE}/FINALIZED-APPS.md`} target="_blank" rel="noreferrer">FINALIZED-APPS.md</a>{' '}
            lists its palette-fit rationale; that section is the
            failure-mode catalogue.</>,
        ]} />
      </Section>

      <Section title="The pipeline">
        <pre className="doctrine__pipeline">
{`intent  →  metaphor  →  load-bearing component  →  supporting primitives  →  palette`}
        </pre>
        <Prose>
          Step 1 names the user intent in eight words or fewer. Step 2 picks one
          metaphor — spatial, temporal, or documentary. Step 3 names the single
          primitive whose failure ends the app. Step 4 fills in supporting
          primitives at the lightest rungs that work. Step 5 picks a palette
          whose engine doesn't undermine the load-bearing component.
        </Prose>
      </Section>

      <Section title="Step 1 — Name the user intent">
        <Prose>
          One verb, one object. "Move work through stages." "Capture
          nested thoughts." "Track time across a project." If the
          intent needs a paragraph, the app is two apps. Test: state
          the intent in eight words or fewer. If you can't, you don't
          understand the intent yet.
        </Prose>
      </Section>

      <Section title="Step 2 — Choose the metaphor">
        <Prose>
          Three families, picked by what the user is{' '}
          <em>manipulating</em>. <strong>Spatial:</strong> position
          changes meaning — kanban, canvas, board.{' '}
          <strong>Temporal:</strong> time is the axis — timeline,
          schedule, history. <strong>Documentary:</strong> the artifact
          is text or structure the user reads top-to-bottom — outliner,
          doc, table. The metaphor decides which Tier-3 differentiator
          the app argues for.
        </Prose>
      </Section>

      <Section title="Step 3 — Load-bearing component — Kanban case study">
        <Prose>
          Kanban's load-bearing component is the draggable card (rung 4). Below,
          Card rung 4 (spatial / draggable). Switch the chrome palette to{' '}
          <em>Neumorphism</em> in the floating controls: the surface contrast
          collapses and the drag affordance dies. Switch back to{' '}
          <em>Material</em> or <em>Neubrutalism</em>: the lift returns. This is
          the palette-fit rule made visible.
        </Prose>
        <Demo caption="Card · spatial — the load-bearing primitive in a kanban">
          <CardStories variant="spatial" />
        </Demo>
        <Callout label="Anti-pattern">
          Starting from a palette. "We love Glassmorphism — what should we
          build?" is the wrong question. The palette has no opinion about user
          intent. If a palette excites you, treat it as a <em>constraint</em>:
          which intents does this palette flatter? Walk back to Step 1 with
          that as a filter.
        </Callout>
      </Section>

      <Section title="Step 3 — Note-outliner case study (documentary)">
        <Prose>
          The outliner's load-bearing component is the keyboard-driven
          indent/outdent paired with the inline-edit cell. Without
          frictionless inline edit, every keystroke costs a mouse trip
          and the app stops being an outliner. Pixel palettes and Sketch
          break this primitive at character-cell width — letters wobble,
          edges blur. The palettes that flatter it: Editorial, Flat, AAA.
        </Prose>
        <Demo caption="InlineEdit · click — the load-bearing primitive in a documentary app">
          <InlineEditStories variant="click" />
        </Demo>
      </Section>

      <Section title="Step 4 — Supporting primitives — pick the lightest rung">
        <Prose>
          Defaults: Button rungs 1–2 for column actions, save, dismiss;
          TextInput rung 2 for inline create / rename; EmptyState rung 2
          for "nothing here yet"; Toast rung 4 for async progress, paired
          with Optimistic-undo (Tier 3) for any destructive action; Modal
          rung 1 only for true interruptions. Read{' '}
          <DocLink to="selection" nav={nav}>component selection</DocLink>{' '}
          before reaching for a heavier primitive than the rung-1 default.
        </Prose>
        <Demo caption="EmptyState · checklist — the lightest 'nothing here yet' default">
          <EmptyStateStories variant="checklist" />
        </Demo>
      </Section>

      <Section title="Step 5 — Palette fit">
        <Prose>
          Open{' '}
          <a href={`${REPO_BASE}/FINALIZED-APPS.md`} target="_blank" rel="noreferrer">FINALIZED-APPS.md</a>{' '}
          and read the palette-fit section of the closest existing app.
          Rules of thumb: if the load-bearing component depends on
          contrast between <code>surface.base</code> and{' '}
          <code>surface.raised</code>, Neumorphism is disqualified; if
          it depends on a drag-lift affordance, Material / Flat /
          Neubrutalism are the candidates; if it depends on edge clarity
          at small text, Pixel-art and Sketch are disqualified.
        </Prose>
      </Section>

      <Cross>
        Case studies for every showcase app live in{' '}
        <a href={`${REPO_BASE}/FINALIZED-APPS.md`} target="_blank" rel="noreferrer">FINALIZED-APPS.md</a>{' '}
        — each is a walked instance of this pipeline.
      </Cross>

      <PrevNext nav={nav} prev="selection" next="modalities" />
    </article>
  )
}

// ABOUTME: Plain-English version of the Modalities doctrine article: five simple rules, then OptimisticUndo/CommandPalette/NLBar demos showing the same action reachable by click, Cmd+K, and natural language.
function ModalitiesPagePlain({ nav }: { nav: DoctrineNav }) {
  return (
    <article className="doctrine">
      <header className="doctrine__head">
        <p className="doctrine__eyebrow">Doctrine · 03 · plain English</p>
        <h2 className="doctrine__title">Three ways to do the same thing</h2>
        <p className="doctrine__lede">
          The same action — say, "delete this card" — should be reachable
          three ways: by clicking on the card, by typing the action's name
          into a command bar (Cmd+K), and by typing it as a sentence into a
          natural-language bar. The three components below are the same
          underneath; in a real app they all read and write the same data.
        </p>
        <Source file="03-modalities.md" />
      </header>

      <Section title="The simple rules">
        <Rules items={[
          <><strong>Every action exists in all three places.</strong> No
            orphans — if you can do it by clicking, you can do it by command
            or by typing in plain English, and vice versa.</>,
          <><strong>There's only one source of truth.</strong> Doing
            something via the command bar must update the visual UI
            instantly. The three ways don't have separate state.</>,
          <><strong>Destructive things preview before they happen.</strong>{' '}
            Clicking shows an undo toast. Commanding shows an inline
            confirm. Typing shows what it parsed into editable chips first.</>,
          <><strong>The plain-English version never runs a sequence
            without showing you the sequence first.</strong> "Auto-execute
            without preview" is the rule's negative example.</>,
          <><strong>Not every action needs all three.</strong> Rare or
            spatial-only actions can stay click-only — promote them only
            when there's a reason.</>,
        ]} />
      </Section>

      <Section title="Clicking — delete now, undo if you change your mind">
        <Prose>
          Clicking the delete button removes the thing immediately and shows
          a floating "undo" message with a countdown. The user can keep
          working; the undo stays reachable in a tray for a while. Faster
          than asking "are you sure?" every time.
        </Prose>
        <Demo caption="Optimistic undo — the visible window to take it back">
          <OptimisticUndoStories variant="countdown" />
        </Demo>
      </Section>

      <Section title="Cmd+K — for people who know what they want">
        <Prose>
          The command palette is for people who already know the action's
          name. Press Cmd+K, start typing "delete," pick the action, pick
          the target, confirm. Each new action you expose this way is one
          more line in a fuzzy list — much cheaper than a button on screen.
        </Prose>
        <Demo caption="Command palette with multiple steps inside">
          <CommandPaletteStories variant="wizard" />
        </Demo>
      </Section>

      <Section title="Plain English — for people who don't know the name">
        <Prose>
          The natural-language bar is for people who have a goal but don't
          know what the action is called. They type "delete the top card";
          the bar parses that into editable little chips ("delete" + "top
          card"), shows the parse, and lets them adjust before committing.
          Never running silently is the whole point.
        </Prose>
        <Demo caption="A natural-language bar with editable chips before committing">
          <NLBarStories variant="editable" />
        </Demo>
      </Section>

      <Section title="One truth, three windows onto it">
        <Prose>
          Whether you deleted via click, command, or sentence, the same
          undo toast appears, the same data updates, the same notification
          fires. The three ways are just <em>windows</em> onto one set of
          data, never separate copies.
        </Prose>
        <Callout>
          Letting the command bar and the visual UI drift apart — one action
          can be reached one way but not the other. Pick one truth.
        </Callout>
      </Section>

      <Section title="When does an action need all three?">
        <Prose>
          Add an action to all three when at least two of these are true:
          the user does it a lot, the action makes sense to chain together
          with others, and the action's target can be named without pointing
          at it ("close the modal" — yes; "drag this card here" — no).
        </Prose>
      </Section>

      <Section title="When NOT to add it to all three">
        <Prose>
          A modality isn't free — each one needs to be kept up to date and
          named. Skip the plain-English and command-palette versions when
          the action is rare (nobody benefits from the lookup), or
          destructive without easy reversal and uncommon (the confirmation
          would be more friction than the save), or fundamentally spatial
          ("drag-to-reorder" — there's no useful sentence for it).
        </Prose>
      </Section>

      <PrevNext nav={nav} prev="composition" />
    </article>
  )
}

// ABOUTME: Dispatcher for the Modalities article — renders the plain-English intent-parity explanation or the technical version with intent-parity hard rules, state-sync analysis, single-Store contract, and per-action promotion decision rules.
function ModalitiesPage({ nav, mode }: { nav: DoctrineNav; mode: DocMode }) {
  if (mode === 'plain') return <ModalitiesPagePlain nav={nav} />
  return (
    <article className="doctrine">
      <header className="doctrine__head">
        <p className="doctrine__eyebrow">Doctrine · 03</p>
        <h2 className="doctrine__title">Modalities</h2>
        <p className="doctrine__lede">
          The same intent reached three ways: click, command palette, natural
          language. The rule is <em>intent parity</em> — every action exists on
          all three surfaces, and no surface owns state. The three components
          below are the three projections; in a real app they read and write
          one Store.
        </p>
        <Source file="03-modalities.md" />
      </header>

      <Section title="Hard rules">
        <Rules items={[
          <><strong>Intent parity.</strong> Every action reachable
            through visual click-through is also reachable through
            Command palette and Natural-language input bar — and vice
            versa. No orphans.</>,
          <><strong>Modalities are projections; state has one source
            of truth.</strong> A change committed through NL appears
            immediately in the visual UI and the palette. All three
            read the same Store keys.</>,
          <><strong>Every modality previews before destructive
            commit.</strong> Visual: undo toast. Palette: inline
            confirm. NL: structured-chip preview.</>,
          <><strong>The agentic palette executes a sequence only after
            the user has seen and accepted it.</strong> Auto-execute
            without preview is the failure mode that defines the rule.</>,
          <><strong>Not every action gets a third modality.</strong>{' '}
            Rare and irreversible actions stay visual-first; promotion
            is justified per action.</>,
        ]} />
      </Section>

      <Section title="Visual destructive — optimistic action + undo">
        <Prose>
          The visual modality runs the action immediately and offers reversal
          through a countdown toast. The user can leave the surface; the toast
          tray keeps the undo reachable. Cheaper than a confirmation modal
          and faster than a synchronous server round-trip.
        </Prose>
        <Demo caption="OptimisticUndo · countdown — visible reversal window">
          <OptimisticUndoStories variant="countdown" />
        </Demo>
      </Section>

      <Section title="Keyboard-first — command palette (Cmd+K)">
        <Prose>
          The palette modality is for users who know the action's name. Cost of
          exposing one more action is one more row in a fuzzy list. Rung 3 adds
          multi-step actions — pick action → pick target → confirm — so the
          confirmation step stays inside the palette instead of bouncing to a
          Modal.
        </Prose>
        <Demo caption="CommandPalette · wizard — multi-step inside the palette">
          <CommandPaletteStories variant="wizard" />
        </Demo>
      </Section>

      <Section title="Intent without vocabulary — NL input bar">
        <Prose>
          The NL modality is for users who arrive with a goal but not the action
          name. The structured-chip preview is the rule: every NL commit shows
          the parse as editable chips before running. Auto-execute without
          preview is the failure mode that defines the rule.
        </Prose>
        <Demo caption="NLBar · editable — chip preview before commit">
          <NLBarStories variant="editable" />
        </Demo>
      </Section>

      <Section title="State sync between modalities — one Store, three readers">
        <Prose>
          The agentic palette and the NL bar do not write to a separate
          "agent state" partition; they write through the same commit
          pipeline as the visual UI. Consequence: any modality's commit
          fires the same notifications, the same undo entry, the same
          persistence write. The undo timer started by a drag is the same
          undo timer the user sees after deleting the same card via NL.
        </Prose>
        <Callout>
          Splitting "agent state" from "user state." The moment they
          diverge, the user has two truths. There is one truth — the
          Store. Modalities project, they don't shadow.
        </Callout>
      </Section>

      <Section title="Decision rule — does this action need three modalities?">
        <Prose>
          Promote an action from visual-only to all three modalities
          when at least <strong>two</strong> of these hold: the action
          is <em>frequently repeated</em> by power users; the action is{' '}
          <em>composable</em> with other actions in a sequence; the
          action's target is <em>namable</em> without spatial reference
          ("close the modal" — yes; "drag this card here" — no).
        </Prose>
      </Section>

      <Section title="When NOT to add a modality">
        <Prose>
          A modality is not free. Each action exposed in the palette or
          NL bar must be maintained, named, and kept in sync. Skip the
          third modality when the action is <em>rare</em> (palette
          pollution costs more than the lookup saves), or{' '}
          <em>destructive without easy reversal</em> and not common
          enough to warrant the confirmation overhead, or{' '}
          <em>spatially primary</em> (drag-to-reorder is not "move card
          X above card Y" unless the user can want that without seeing
          the board).
        </Prose>
        <Callout>
          Command palette listing actions the visual UI doesn't surface
          (orphan actions) — modalities are out of parity. Either
          promote the action into the visual UI or remove it from the
          palette.
        </Callout>
      </Section>

      <Cross>
        Full hard-rules, per-action confirmation patterns, and the rest
        of the counterexamples live in{' '}
        <a href={`${GITHUB_BASE}/03-modalities.md`} target="_blank" rel="noreferrer">03-modalities.md</a>.
      </Cross>

      <PrevNext nav={nav} prev="composition" />
    </article>
  )
}

// ABOUTME: Ordered array of the four doctrine articles (Layout → Component selection → App composition → Modalities) consumed by DoctrinePage to render the active page and populate the Doc field options.
export const DOCTRINE_PAGES: DoctrinePage[] = [
  { id: 'layout', label: 'Layout', eyebrow: 'Doctrine · 00', title: 'Layout', source: '00-layout.md', render: (nav, mode) => <LayoutPage nav={nav} mode={mode} /> },
  { id: 'selection', label: 'Component selection', eyebrow: 'Doctrine · 01', title: 'Component selection', source: '01-component-selection.md', render: (nav, mode) => <SelectionPage nav={nav} mode={mode} /> },
  { id: 'composition', label: 'App composition', eyebrow: 'Doctrine · 02', title: 'App composition', source: '02-app-composition.md', render: (nav, mode) => <CompositionPage nav={nav} mode={mode} /> },
  { id: 'modalities', label: 'Modalities', eyebrow: 'Doctrine · 03', title: 'Modalities', source: '03-modalities.md', render: (nav, mode) => <ModalitiesPage nav={nav} mode={mode} /> },
]

// ABOUTME: Type guard that returns true when a string is one of the four valid DoctrineId values; used by DoctrinePage to validate URL params.
export const isDoctrineId = (v: string): v is DoctrineId =>
  DOCTRINE_PAGES.some(p => p.id === v)
