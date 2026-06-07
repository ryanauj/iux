// ABOUTME: ABOUTME: MOTION_SCALES — an exported value.

// ABOUTME: MOTION_SCALES — an exported value.
export const MOTION_SCALES = [
  { value: 1, label: '1× (palette default)' },
  { value: 2, label: '2× (slower)' },
  { value: 3, label: '3× (slowest)' },
  { value: 5, label: '5× (debug)' },
] as const

// ABOUTME: MotionScale — a type alias.
export type MotionScale = (typeof MOTION_SCALES)[number]['value']

// ABOUTME: DEFAULT_MOTION_SCALE — an exported value.
export const DEFAULT_MOTION_SCALE: MotionScale = 2

// ABOUTME: resolveMotionScale — a helper function.
export function resolveMotionScale(raw: string | number | null | undefined): MotionScale {
  const n = typeof raw === 'string' ? Number(raw) : raw
  return MOTION_SCALES.some(s => s.value === n) ? (n as MotionScale) : DEFAULT_MOTION_SCALE
}

// ABOUTME: MOTION_FIELD_OPTIONS — an exported value.
export const MOTION_FIELD_OPTIONS = MOTION_SCALES.map(s => ({
  value: String(s.value),
  label: s.label,
}))
