export const MOTION_SCALES = [
  { value: 1, label: '1× (palette default)' },
  { value: 2, label: '2× (slower)' },
  { value: 3, label: '3× (slowest)' },
  { value: 5, label: '5× (debug)' },
] as const

export type MotionScale = (typeof MOTION_SCALES)[number]['value']

export const DEFAULT_MOTION_SCALE: MotionScale = 2

export function resolveMotionScale(raw: string | number | null | undefined): MotionScale {
  const n = typeof raw === 'string' ? Number(raw) : raw
  return MOTION_SCALES.some(s => s.value === n) ? (n as MotionScale) : DEFAULT_MOTION_SCALE
}

export const MOTION_FIELD_OPTIONS = MOTION_SCALES.map(s => ({
  value: String(s.value),
  label: s.label,
}))
