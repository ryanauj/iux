# FINALIZED-APPS

A living catalog of small apps the showcase ships. Each app is a
**standalone sub-project** under `src/apps/`: its own routes, its own
in-app palette picker, and its own page-to-page navigation. The
component library (`src/components/`) and the palette library
(`palettes/`) are the ingredients; these apps are the recipes.

Each app:

- **Purpose** — one line, what it solves for the user.
- **Routes** — every screen the app exposes and the URL that reaches it.
- **Components composed** — the inventory it builds on, drawn from
  `src/components/`.
- **Data** — what's seeded, and where it lives in the repo.
- **In-app palette picker** — every app has its own picker wired to a
  scoped `PaletteRoot`; any of the named palettes can be applied to
  the app independently of the showcase chrome.

Routing is hash-based (`/iux/#/apps/<id>/...`) so the apps live
alongside the component showcase at `/iux/` without requiring a
GitHub Pages SPA shim. Apps consume the same token contract as
components; switching palette inside an app is identical to switching
palette in the component showcase.

---

## 1. Sports — NBA hub

**Purpose.** Browse a slice of the NBA: teams, players, games, and
standings. The canonical "lots of structured records, lots of
cross-links" UI — the kind of app where navigation correctness is the
feature, not the chrome.

**Routes.**
- `#/apps/sports` — Home: today's matchups, stat leaders, standings
  teaser.
- `#/apps/sports/teams` — All 10 teams, filterable by conference.
- `#/apps/sports/teams/:slug` — One team: roster, schedule, season
  stats, with cross-links into every player and game referenced.
- `#/apps/sports/players` — All players, sortable; quick stat leaders
  by category.
- `#/apps/sports/players/:slug` — One player: profile card,
  per-game stats, current team.
- `#/apps/sports/games` — Schedule grouped by date (final / live /
  scheduled).
- `#/apps/sports/games/:id` — One game: score header, box score,
  quarter breakdown, top performers (linked to the player page).
- `#/apps/sports/standings` — East and West conference standings.

**Components composed.**
- `Card` — team cards, game cards, player profile, stat-leader tiles.
- `Table` (sortable) — rosters, standings, box scores, leader tables.
- `Tabs` — team detail (Roster / Schedule / Stats), player detail.
- `Segmented` — conference filter on teams + standings, position
  filter on players, status filter on games.
- `Select` — in-app palette picker.
- `Button` — primary nav, secondary actions.
- `EmptyState` — no-match copy for filtered views.

**Data.**
- `src/apps/sports/data/teams.ts` — 10 teams (5 East, 5 West), seeded
  with colors, arena, head coach, record, conference rank.
- `src/apps/sports/data/players.ts` — 30 players (3 per team) with
  realistic per-game stat lines.
- `src/apps/sports/data/games.ts` — 15 games dated around the current
  window: completed games with box scores, one live game, several
  upcoming.

All data is hand-seeded and static. No network calls; the app runs
fully offline.

**In-app palette picker.** A `Select` in the app header drives a
local `PaletteRoot` boundary scoped to the app. The choice persists
in the URL (`?palette=tron-dark-neon`) so a shared link reproduces
the exact look.

### Shell vs content

The sports app pulls apart two responsibilities that most React apps
fuse:

- **Content** is what a route produces — the pages in
  `src/apps/sports/pages/` (`Home`, `Teams`, `TeamDetail`, `Players`,
  `PlayerDetail`, `Games`, `GameDetail`, `Standings`). A page reads
  the URL, looks up data, and renders a result. It has no opinion
  about where on the screen it appears, how the user got there, or
  what navigation surrounds it.
- **Shell** is the chrome the content lives inside — brand, exit,
  navigation surface, optional global widgets (search, tabs, court
  map). The shell decides *how* the user moves between pages and
  *where* the page renders, but does not produce page content itself.

The split lives in `layouts.tsx`. Every shell implements
`ShellProps` — `{ layoutId, brand, nav, route, exit, children }` —
and the page is passed through as `children`. Most shells are pure
chrome and forward `children` untouched; a few are bigger paradigm
shifts that also reshape composition (see "court" and "tabs" below).

Switching shells never re-fetches data, re-shapes the route table,
or rewrites a page. It only swaps the surrounding chrome. The shell
the user has chosen lives in the URL as `?layout=<id>` and is a
sticky param (preserved across every `Link`), so a shared link
reproduces the exact shell + palette + motion.

### Shell variants

Fifteen shells ship today. The first five are pure chrome around the
standard page set; the last ten reshape how content composes.

| `layout=` | Shape | What it changes |
| --------- | ----- | --------------- |
| `topbar` (default) | Top nav, body below | Chrome only |
| `sidebar` | Left rail, body to the right | Chrome only |
| `stadium` | Hero banner with nav tiles, body below | Chrome only |
| `dock` | Floating bottom dock, body fills | Chrome only |
| `drawer` | Hamburger → off-canvas nav, body fills | Chrome only |
| `palette` | Minimal chrome + global ⌘K / `/` command bar across teams, players, games. Pages still render below. | Replaces the menu with a query surface; pages unchanged |
| `court` | Top nav + interactive SVG basketball court on Home. Tapping court regions routes to filtered/related views. | Replaces the Home page with a spatial map; other routes render standard pages |
| `tabs` | Workspace-style tab strip across the top. Each visited route becomes a tab; tabs persist via `?tabs=`. | Multiple pages stay open at once; closing the active tab navigates to a neighbor |
| `feed` | Single chronological vertical stream of entity cards (live → today's finals → today's upcoming → season leaders) with Status / Conference / Team filter chips. On non-home routes the feed collapses into a left rail and the page renders to the right. | Replaces the Home page's five-section split with one timeline; other routes get the feed as a sidebar alongside the standard page |
| `triptych` | Three persistent columns: a section-switched list (teams / players / games) on the left, a summary card for the selected entity in the middle, and the standard route page on the right. Clicking the list swaps only the summary; clicking the summary's links navigates and fills the right column. List section is sticky via `?tri=`; the selection inside the list is shell state that re-seeds from the route on deep links. | Replaces every page with a list / summary / detail browser, but the right column still hosts the standard page so direct links work |
| `bento` | Configurable widget dashboard on Home: live scoreboard, PPG leaders, mini standings, schedule strip, top-team spotlight. A Customize toggle reveals per-tile hide / move-left / move-right controls; hidden widgets show in a tray for re-adding. Clicking a tile expands its section's standard page in a modal; each tile also has a `Link` to the same page. Widget order + visibility is sticky via `?bento=<id,id,…>` (omitted when the default order is intact). Other routes render standard pages below the same minimal nav. | Replaces the Home page with a user-arranged tile grid; modal expansion keeps the standard pages one click away; other routes are chrome-only |
| `magazine` | Editorial cover on Home: masthead + "Game of the Night" hero (live game if any, else tonight's biggest matchup, else most recent final), a pull-quote stat from the PPG leader, a three-column "By the Numbers" leaderboard (scoring / rebounding / playmaking), and an "Inside the East" feature spread (two-column prose with drop-cap + standings sidebar). A sticky in-page section nav scrolls between cover / pull-quote / leaderboard / feature via `scrollIntoView`, deliberately avoiding the route hash. Other routes render the standard page below the same nav with a slightly wider type scale. | Replaces the Home page with a magazine cover spread; other routes forward content with a wider type scale, no new sticky URL state |
| `deck` | Full-bleed card swipe on Home: one team / player / game card at a time inside a three-stack deck. Horizontal arrow keys / touch swipe advance within the active stack (alphabetical teams → top scorers → most recent games); vertical keys / swipes cycle stacks. A stack tab strip up top, a counter + prev / next arrows below, and a footer hint round out the surface. Each card has links into the standard detail pages. Position is sticky via `?deck=<stack>.<index>` (omitted when on the first team card). On detail routes the deck collapses into a small "Back to deck" breadcrumb with the stack name + counter, and the standard page renders below. | Replaces the Home page with a one-card-at-a-time browser; other routes forward content with a deck breadcrumb on top |
| `graph` | Force-directed network on Home: every team, player, and game is a node; edges connect players + games to the teams they belong to. Layout is a plain iterative spring relaxation (no D3) seeded with radial positions and cached at module level so it doesn't re-run on remount. Hovering or focusing a node highlights it and its neighbors, dimming the rest of the graph; a floating tooltip names the focused node and offers an "Open →" link. Clicking a node navigates straight into that team / player / game's detail page. Three legend chips (Teams / Players / Games) toggle node-kind visibility; the active filter is sticky via `?graph=<kinds>` (omitted when all three are on). Other routes render the standard page below the same minimal nav. | Replaces the Home page with an interactive network browser; other routes forward content untouched |
| `chat` | Conversational interface on Home: a scrolling message log on top, a sticky composer with quick-prompt chips + free-text input on the bottom. Submitting a query (typed or chipped) appends a user bubble, then a bot bubble whose body mixes plain text with inline entity cards — teams, players, games, top-N leaderboards, conference standings tables, multi-player side-by-side comparisons. Every card and row is a `Link` into the matching standard detail page. The parser recognises today's / live games, scoring / rebound / assist / steal / block leaders, "compare X & Y", team / roster lookups, and bare team or player names. Each bot reply also surfaces a row of suggested follow-up chips. Scrollback lives in module-level state so it survives layout switch-aways and detail navigations within the session; a ✕ button resets back to the greeting. On non-home routes the shell collapses to a "← Back to chat" breadcrumb above the standard page; no new sticky URL state. | Replaces the Home page with a conversational entity browser; other routes forward content with a chat breadcrumb on top |

Adding a new shell:

1. Build a component matching `ShellProps` in `src/apps/sports/shells/`.
2. Add its id to `LAYOUT_IDS` and an entry to `LAYOUT_OPTIONS` in
   `src/apps/sports/layouts.tsx`.
3. Dispatch it in `Shell()` and add scoped CSS to `sports-app.css`
   under a `.sports-app--<id>` namespace.

If the shell introduces new sticky URL state (the `tabs`, `triptych`,
`bento`, `deck`, and `graph` shells do, via `?tabs=`, `?tri=`, `?bento=`,
`?deck=`, and `?graph=`), add the key to `STICKY_PARAMS` in
`src/apps/router.ts` so it survives `Link` navigation.

---

## 2. Promptbook — prompt & strategy library

**Purpose.** Save, fill, and copy prompts, and browse the prompting
strategies behind them. The canonical "small CRUD library + a reference
deck" UI — where the value is in capture, retrieval, and a copy that
actually lands on the clipboard.

**Routes.**
- `#/apps/prompts` — Library: search, category filter, tag cloud,
  favorites toggle, and sort over the saved-prompt grid.
- `#/apps/prompts/p/:id` — One prompt: full text in a copyable block, an
  interactive `{{variable}}` filler with a live preview, notes, and
  cross-links to the strategies it demonstrates.
- `#/apps/prompts/new` — Compose a new prompt. Accepts `?from=<strategyId>`
  to seed the body from a strategy template.
- `#/apps/prompts/p/:id/edit` — Edit an existing prompt (same form).
- `#/apps/prompts/strategies` — All prompting strategies, filterable by
  category.
- `#/apps/prompts/strategies/:id` — One strategy: how it works, when to
  use it, a copy-paste template, a worked example, related strategies, and
  the saved prompts that use it. "Start a prompt from this" jumps to the
  new-prompt form pre-seeded.

**Components composed.**
- `Card` — prompt cards, strategy cards.
- `TextInput` — search, title, variable-filler inputs.
- `Select` — category picker, sort.
- `Segmented` — category / strategy-category filters.
- `TokenField` — tags and target-models entry.
- `Modal` — delete confirmation.
- `Toast` (via a scoped `Toaster` + `useToastQueue`) — copy / save /
  delete confirmations.
- `EmptyState` — no-match (illustrated) and not-found (minimal) views.
- `Button` — primary actions, in-app `Badge` / `CopyButton` /
  `FavoriteButton` / `CodeBlock` / `VariableFiller` are small local
  compositions in `src/apps/prompts/components/`.

**Data.**
- `src/apps/prompts/data/strategies.ts` — 12 hand-authored strategies
  (zero-shot, few-shot, chain-of-thought, self-consistency, ReAct, role,
  structured output, decomposition, self-critique, grounding/RAG,
  step-back, delimiters). Static reference content.
- `src/apps/prompts/data/prompts.ts` — 12 seed prompts spanning the six
  categories, each linked to the strategies it demonstrates.

**State / persistence.** The prompt collection is an in-session store
(`src/apps/prompts/store.tsx`) seeded from `data/prompts.ts`. Add / edit /
delete / favorite all work while the app is open and are
reload-safe by design (they reset on refresh), per the "No `localStorage`,
no network" rule below. The provider is the single seam to swap for the
forthcoming persistence-contract `Store` without touching any page.

**In-app palette picker.** Like the sports app, a `DraggableControls`
panel drives a scoped `PaletteRoot` (palette + motion), persisted in the
URL as `?palette=` / `?motion=`. Promptbook ships a single `topbar` shell
rather than the sports app's shell zoo — the focus here is the content
model, not chrome variants.

---

## Cross-cutting notes

- **Adding an app.** Add a directory under `src/apps/<id>/`, export
  a single React component, and register it in
  `src/apps/AppsRouter.tsx`. Every app is responsible for its own
  sub-routes; the top-level router only matches the `<id>` segment.
- **Palette discipline.** Every app must wrap its content in its own
  `PaletteRoot` and expose a picker. Apps must not read raw token
  values; they consume the same CSS custom properties components do
  (`--color-*`, `--space-*`, `--radius-*`, etc.).
- **No `localStorage`, no network.** Apps in this catalog are
  reload-safe by default; nothing the user does inside an app
  persists across reloads. The persistence story is reserved for the
  forthcoming `storage/store.contract.ts` work and will be opt-in.
- **Future apps.** Added to this document as they are designed and
  built. The original seven-app spec that previously lived here
  (kanban, outliner, habits, expenses, canvas, recipe, settings) is
  retired in favour of building one app at a time, end-to-end, on
  demand.
