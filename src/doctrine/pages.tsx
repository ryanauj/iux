import type { ReactNode } from 'react'
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

export type DoctrineId = 'layout' | 'selection' | 'composition' | 'modalities'

export type DoctrinePage = {
  id: DoctrineId
  label: string
  eyebrow: string
  title: string
  source: string
  render: () => ReactNode
}

const GITHUB_BASE = 'https://github.com/ryanauj/iux/blob/main/doctrine'
const REPO_BASE = 'https://github.com/ryanauj/iux/blob/main'

function Source({ file }: { file: string }) {
  return (
    <p className="doctrine__source">
      Full doctrine: <a href={`${GITHUB_BASE}/${file}`} target="_blank" rel="noreferrer">{`doctrine/${file}`}</a>
      {' — '}rules, counterexamples, and the parts not covered by demos here.
    </p>
  )
}

function Cross({ children }: { children: ReactNode }) {
  return <p className="doctrine__cross">{children}</p>
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="doctrine__section">
      <h3 className="doctrine__section-title">{title}</h3>
      {children}
    </section>
  )
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="doctrine__prose">{children}</p>
}

function Callout({ label = 'Failure mode', children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="doctrine__callout">
      <span className="doctrine__callout-label">{label}</span>
      {children}
    </aside>
  )
}

function Demo({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <div className="doctrine__demo">
      {caption && <p className="doctrine__demo-caption">{caption}</p>}
      <div className="doctrine__demo-frame">{children}</div>
    </div>
  )
}

function Split({ children }: { children: ReactNode }) {
  return <div className="doctrine__split">{children}</div>
}

function Rules({ items }: { items: ReactNode[] }) {
  return (
    <ol className="doctrine__rules">
      {items.map((item, i) => (
        <li key={i} className="doctrine__rules-item">{item}</li>
      ))}
    </ol>
  )
}

function LayoutPage() {
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
          it, Pixel-art snaps gaps to the grid step. The components don't change —
          the palette remaps <code>space.*</code> underneath.
        </Prose>
        <Demo caption="Button rungs 1–4 — gap reads from space.*">
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
        <Demo caption="Button · solid — labels share an optical baseline across sizes">
          <ButtonStories variant="solid" />
        </Demo>
      </Section>

      <Section title="Container queries over breakpoints">
        <Prose>
          Components query their container, not the viewport. A Card doesn't
          know if it's in a sidebar or a hero slot — it knows it has{' '}
          <code>width: 320px</code> of room. Breakpoints encode a viewport
          guess that fails the moment the component lives somewhere else in
          the layout. The Card below renders the same primitive at multiple
          container widths to demonstrate the rule.
        </Prose>
        <Demo caption="Card · static — one primitive, container-driven layout">
          <CardStories variant="static" />
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
        Next: <a href={`${GITHUB_BASE}/01-component-selection.md`} target="_blank" rel="noreferrer">component selection</a>{' '}
        — which primitive carries a given intent, and the failure mode of picking wrong.
      </Cross>
    </article>
  )
}

function SelectionPage() {
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
    </article>
  )
}

function CompositionPage() {
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
          <a href={`${GITHUB_BASE}/01-component-selection.md`} target="_blank" rel="noreferrer">01-component-selection.md</a>{' '}
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
    </article>
  )
}

function ModalitiesPage() {
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
    </article>
  )
}

export const DOCTRINE_PAGES: DoctrinePage[] = [
  { id: 'layout', label: 'Layout', eyebrow: 'Doctrine · 00', title: 'Layout', source: '00-layout.md', render: () => <LayoutPage /> },
  { id: 'selection', label: 'Component selection', eyebrow: 'Doctrine · 01', title: 'Component selection', source: '01-component-selection.md', render: () => <SelectionPage /> },
  { id: 'composition', label: 'App composition', eyebrow: 'Doctrine · 02', title: 'App composition', source: '02-app-composition.md', render: () => <CompositionPage /> },
  { id: 'modalities', label: 'Modalities', eyebrow: 'Doctrine · 03', title: 'Modalities', source: '03-modalities.md', render: () => <ModalitiesPage /> },
]

export const isDoctrineId = (v: string): v is DoctrineId =>
  DOCTRINE_PAGES.some(p => p.id === v)
