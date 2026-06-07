// ABOUTME: generators — part of the quiz area.

import { palettes, type PaletteId } from '../../palettes'
import type { IdentifyQuestion, StimulusKind } from './types'

const ALL_IDS = Object.keys(palettes) as PaletteId[]
const STIMULUS_KINDS: StimulusKind[] = ['components', 'visualizations', 'app']

// Mulberry32 — small deterministic PRNG, kept so seeds are reproducible.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]
}

function shuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// ABOUTME: makeRng — a helper function.
export function makeRng(seed: number): () => number {
  return mulberry32(seed)
}

// ABOUTME: nextQuestion — a helper function.
/**
 * Generate one identify question. Distractors prefer the same engine as the
 * target so the question forces you to discriminate within an engine family
 * (e.g. which pixel-art palette is this) rather than just naming the engine.
 * `previousTarget` is avoided so the same palette doesn't repeat back-to-back.
 */
export function nextQuestion(
  rng: () => number,
  previousTarget: PaletteId | null = null,
): IdentifyQuestion {
  const targetPool = previousTarget
    ? ALL_IDS.filter(id => id !== previousTarget)
    : ALL_IDS
  const target = pick(targetPool, rng)
  const targetEngine = palettes[target].engine

  const sameEngine = ALL_IDS.filter(
    id => id !== target && palettes[id].engine === targetEngine,
  )
  const otherEngine = ALL_IDS.filter(
    id => id !== target && palettes[id].engine !== targetEngine,
  )
  const distractors = shuffle(sameEngine, rng)
    .concat(shuffle(otherEngine, rng))
    .slice(0, 3)

  const options = shuffle([target, ...distractors], rng)
  return {
    target,
    stimulus: pick(STIMULUS_KINDS, rng),
    options,
    correctIndex: options.indexOf(target),
  }
}
