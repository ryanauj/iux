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

      <Cross>
        See also: <a href={`${GITHUB_BASE}/01-component-selection.md`} target="_blank" rel="noreferrer">full disambiguation matrix</a>{' '}
        (Tooltip vs Popover vs Coachmark, Stepper vs Wizard vs Multi-step Modal,
        EmptyState vs Coachmark vs Tooltip, Select vs Combobox vs Command palette,
        Sidebar vs Top nav vs Tabs).
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

      <Section title="Load-bearing component — Kanban case study">
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

      <Cross>
        Case studies for every showcase app live in{' '}
        <a href="https://github.com/ryanauj/iux/blob/main/FINALIZED-APPS.md" target="_blank" rel="noreferrer">FINALIZED-APPS.md</a>{' '}
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

      <Callout>
        Command palette listing actions the visual UI doesn't surface
        (orphan actions) — modalities are out of parity. Either promote the
        action into the visual UI or remove it from the palette.
      </Callout>

      <Cross>
        Full hard-rules, decision rules for when an action earns a third
        modality, and per-modality confirmation patterns live in{' '}
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
