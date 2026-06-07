// ABOUTME: The motion-speed scale: the multiplier options, their labels, the default, and helpers to parse and present them.

// ABOUTME: The selectable motion multipliers and their human labels (1× palette default … 5× debug).
export const MOTION_SCALES = [
  { value: 1, label: '1× (palette default)' },
  { value: 2, label: '2× (slower)' },
  { value: 3, label: '3× (slowest)' },
  { value: 5, label: '5× (debug)' },
] as const

// ABOUTME: A valid motion multiplier — the `value` of one of MOTION_SCALES.
export type MotionScale = (typeof MOTION_SCALES)[number]['value']

// ABOUTME: The motion multiplier used when none is chosen (2× — slightly slowed so transitions read clearly).
export const DEFAULT_MOTION_SCALE: MotionScale = 2

// ABOUTME: Coerces an unknown string/number (e.g. a URL param) to a valid MotionScale, falling back to the default.
export function resolveMotionScale(raw: string | number | null | undefined): MotionScale {
  const n = typeof raw === 'string' ? Number(raw) : raw
  return MOTION_SCALES.some(s => s.value === n) ? (n as MotionScale) : DEFAULT_MOTION_SCALE
}

// ABOUTME: MOTION_SCALES reshaped as {value,label} string options for a DraggableControls field (used by the How-it-works Motion control).
export const MOTION_FIELD_OPTIONS = MOTION_SCALES.map(s => ({
  value: String(s.value),
  label: s.label,
}))
