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
