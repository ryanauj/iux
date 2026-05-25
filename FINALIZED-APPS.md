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

Ten shells ship today. The first five are pure chrome around the
standard page set; the last five reshape how content composes.

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

Adding a new shell:

1. Build a component matching `ShellProps` in `src/apps/sports/shells/`.
2. Add its id to `LAYOUT_IDS` and an entry to `LAYOUT_OPTIONS` in
   `src/apps/sports/layouts.tsx`.
3. Dispatch it in `Shell()` and add scoped CSS to `sports-app.css`
   under a `.sports-app--<id>` namespace.

If the shell introduces new sticky URL state (the `tabs` shell does,
via `?tabs=`), add the key to `STICKY_PARAMS` in
`src/apps/router.ts` so it survives `Link` navigation.

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
