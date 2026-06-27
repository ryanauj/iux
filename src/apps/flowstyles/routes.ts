// ABOUTME: Route helpers for the Recipe Flow app — the base path and a builder so links never hand-write the hash path; the chosen treatment rides along as a `?t=` query param rather than a path segment.

// ABOUTME: Base path prefix for all Recipe Flow hash routes.
export const FLOWSTYLES_BASE = '/apps/flowstyles'

// ABOUTME: Factory for Recipe Flow URLs — the single gallery page, optionally pinned to a treatment id via the `t` query param.
export const flowstylesRoutes = {
  gallery: () => FLOWSTYLES_BASE,
} as const
