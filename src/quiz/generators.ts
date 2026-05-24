import { palettes, type PaletteId } from '../../palettes'
import { descriptions } from '../../palettes/descriptions'
import type { StyleDescription } from '../../tokens/style-description.contract'
import type {
  Question,
  IdentifyQuestion,
  WhatMakesItQuestion,
  LookalikeQuestion,
  FreeRecallQuestion,
} from './types'

type DescribedEntry = [PaletteId, StyleDescription]

function describedEntries(): DescribedEntry[] {
  return Object.entries(descriptions) as DescribedEntry[]
}

// Mulberry32 — small deterministic PRNG so shareable seeds work.
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

function uniqueBy<T, K>(arr: readonly T[], key: (t: T) => K): T[] {
  const seen = new Set<K>()
  const out: T[] = []
  for (const item of arr) {
    const k = key(item)
    if (!seen.has(k)) {
      seen.add(k)
      out.push(item)
    }
  }
  return out
}

// ---------------------------------------------------------------- identify

function generateIdentify(
  target: PaletteId,
  rng: () => number,
): IdentifyQuestion | null {
  const targetEngine = palettes[target].engine
  const allIds = Object.keys(palettes) as PaletteId[]
  const sameEngine = allIds.filter(id => id !== target && palettes[id].engine === targetEngine)
  const otherEngine = allIds.filter(id => id !== target && palettes[id].engine !== targetEngine)

  // Prefer same-engine distractors (harder, more meaningful), pad with others.
  const distractorPool = shuffle(sameEngine, rng)
    .concat(shuffle(otherEngine, rng))
    .slice(0, 3)
  if (distractorPool.length < 3) return null

  const options = shuffle([target, ...distractorPool], rng)
  return {
    kind: 'identify',
    target,
    options,
    correctIndex: options.indexOf(target),
    prompt: 'Which style is this?',
  }
}

// ----------------------------------------------------------- what-makes-it

function generateWhatMakesIt(
  target: PaletteId,
  rng: () => number,
): WhatMakesItQuestion | null {
  const desc = descriptions[target]
  if (!desc || desc.signatures.length === 0) return null

  const correctSig = pick(desc.signatures, rng)

  // Distractors: signatures from other described palettes + this palette's anti-signatures.
  const otherSignatures: string[] = []
  for (const [id, d] of describedEntries()) {
    if (id === target) continue
    for (const sig of d.signatures) otherSignatures.push(sig.label)
  }
  const pool = uniqueBy(
    [...desc.antiSignatures, ...shuffle(otherSignatures, rng)],
    s => s,
  ).filter(s => s !== correctSig.label)
  const distractors = shuffle(pool, rng).slice(0, 3)
  if (distractors.length < 3) return null

  const options = shuffle([correctSig.label, ...distractors], rng)
  return {
    kind: 'what-makes-it',
    target,
    options,
    correctIndex: options.indexOf(correctSig.label),
    prompt: `Which of these is a signature of ${palettes[target].name}?`,
    explanation: correctSig.detail,
  }
}

// ------------------------------------------------------------------ lookalike

function generateLookalike(
  target: PaletteId,
  rng: () => number,
): LookalikeQuestion | null {
  const desc = descriptions[target]
  if (!desc) return null

  // Only lookalikes whose `against` is also populated produce a usable question.
  const populatedLookalikes = desc.lookalikes.filter(l => descriptions[l.against])
  if (populatedLookalikes.length === 0) return null

  const choice = pick(populatedLookalikes, rng)
  const leftIsTarget = rng() < 0.5
  return {
    kind: 'lookalike',
    target,
    against: choice.against,
    layout: leftIsTarget
      ? { left: target, right: choice.against }
      : { left: choice.against, right: target },
    differentiator: choice.differentiator,
    correctSide: leftIsTarget ? 'left' : 'right',
    prompt: `Which side is ${palettes[target].name}?`,
  }
}

// ---------------------------------------------------------------- free-recall

function generateFreeRecall(
  target: PaletteId,
  desc: StyleDescription,
): FreeRecallQuestion {
  return {
    kind: 'free-recall',
    target,
    aliases: desc.recallAliases,
    tagline: desc.tagline,
    prompt: 'Name this style.',
  }
}

// ---------------------------------------------------------------- deck

/**
 * Build a deck of questions covering every described palette across every
 * question kind. Deterministic given the same `seed`. Skips kinds that
 * can't be generated for a given palette (e.g. lookalike when no peer is
 * populated) without throwing.
 */
export function buildDeck(seed: number): Question[] {
  const rng = mulberry32(seed)
  const populated = describedEntries()
  const questions: Question[] = []

  for (const [id, desc] of populated) {
    const q1 = generateIdentify(id, rng)
    if (q1) questions.push(q1)
    const q2 = generateWhatMakesIt(id, rng)
    if (q2) questions.push(q2)
    const q3 = generateLookalike(id, rng)
    if (q3) questions.push(q3)
    questions.push(generateFreeRecall(id, desc))
  }

  return shuffle(questions, rng)
}

/** True if `input` matches any alias under case-insensitive substring rules. */
export function matchesRecall(input: string, aliases: readonly string[]): boolean {
  const needle = input.trim().toLowerCase()
  if (!needle) return false
  return aliases.some(a => needle.includes(a.toLowerCase()))
}
