// ABOUTME: prompts — part of the apps area.

import type { Prompt } from '../types'

// ABOUTME: The starter prompt library.
/**
 * The starter prompt library. These seed the in-session store; the user
 * can favorite, edit, add to, or delete from this set while the app is
 * open. Nothing here persists across a reload — the app is reload-safe by
 * design, in line with the apps catalog convention.
 */
export const SEED_PROMPTS: Prompt[] = [
  {
    id: 'pr-explain-code',
    title: 'Explain this code to a newcomer',
    body: `You are a patient senior engineer. Explain the code below to someone who knows programming but is new to this codebase.

Cover: what it does, why it might be written this way, and any subtle gotchas. Keep it under 200 words.

\`\`\`
{{code}}
\`\`\``,
    category: 'coding',
    models: ['Claude', 'GPT-4'],
    tags: ['explain', 'onboarding', 'review'],
    strategyIds: ['role', 'delimiters'],
    notes: 'Swap the role to "security reviewer" to bias toward vulnerabilities.',
    favorite: true,
    createdAt: '2026-05-02T10:00:00.000Z',
    updatedAt: '2026-05-20T14:30:00.000Z',
  },
  {
    id: 'pr-bug-triage',
    title: 'Triage a bug report into JSON',
    body: `Classify the bug report below.

Respond with ONLY valid JSON, no prose:
{
  "severity": "low | medium | high | critical",
  "area": "string",
  "likely_cause": "string",
  "repro_confidence": "low | medium | high"
}

Bug report:
<report>
{{report}}
</report>`,
    category: 'coding',
    models: ['Claude', 'GPT-4', 'Gemini'],
    tags: ['triage', 'json', 'support'],
    strategyIds: ['structured-output', 'delimiters'],
    favorite: false,
    createdAt: '2026-05-04T09:15:00.000Z',
    updatedAt: '2026-05-04T09:15:00.000Z',
  },
  {
    id: 'pr-cot-word-problem',
    title: 'Solve a word problem, step by step',
    body: `Solve the problem below. Think through it step by step, showing each calculation, then give the final answer on its own line prefixed with "Answer:".

{{problem}}`,
    category: 'analysis',
    models: ['Claude', 'GPT-4'],
    tags: ['math', 'reasoning', 'step-by-step'],
    strategyIds: ['cot'],
    notes: 'For unstable answers, run several times and majority-vote (self-consistency).',
    favorite: true,
    createdAt: '2026-05-05T11:00:00.000Z',
    updatedAt: '2026-05-18T08:00:00.000Z',
  },
  {
    id: 'pr-blog-outline',
    title: 'Outline a blog post from a thesis',
    body: `You are an editor at a respected engineering blog, writing for working developers.

Turn the thesis below into a tight outline: a working title, a one-sentence hook, and 4–6 section headings, each with a one-line summary of what it argues.

Thesis: {{thesis}}`,
    category: 'writing',
    models: ['Claude'],
    tags: ['outline', 'editorial', 'long-form'],
    strategyIds: ['role'],
    favorite: false,
    createdAt: '2026-05-06T16:20:00.000Z',
    updatedAt: '2026-05-06T16:20:00.000Z',
  },
  {
    id: 'pr-extract-entities',
    title: 'Extract structured facts from prose',
    body: `Extract entities from the text. Follow the examples exactly.

Input: Acme raised $4M in seed funding led by North Star.
Output: {"company": "Acme", "amount_usd": 4000000, "lead_investor": "North Star"}

Input: Globex closed a $250k angel round.
Output: {"company": "Globex", "amount_usd": 250000, "lead_investor": null}

Input: {{text}}
Output:`,
    category: 'analysis',
    models: ['Claude', 'GPT-4'],
    tags: ['extraction', 'few-shot', 'json'],
    strategyIds: ['few-shot', 'structured-output'],
    favorite: false,
    createdAt: '2026-05-08T13:45:00.000Z',
    updatedAt: '2026-05-08T13:45:00.000Z',
  },
  {
    id: 'pr-research-grounded',
    title: 'Answer strictly from provided sources',
    body: `Answer the question using ONLY the sources below. Cite the source number in brackets after each claim. If the sources do not contain the answer, reply exactly "Not stated in the sources."

Sources:
[1] {{source_1}}
[2] {{source_2}}
[3] {{source_3}}

Question: {{question}}`,
    category: 'research',
    models: ['Claude', 'GPT-4', 'Gemini'],
    tags: ['grounding', 'citations', 'anti-hallucination'],
    strategyIds: ['context-rag', 'delimiters'],
    notes: 'The exact "Not stated" string makes downstream filtering trivial.',
    favorite: true,
    createdAt: '2026-05-09T10:30:00.000Z',
    updatedAt: '2026-05-22T09:00:00.000Z',
  },
  {
    id: 'pr-rubber-duck',
    title: 'Rubber-duck a design decision',
    body: `You are a skeptical but constructive principal engineer. I'll describe a design decision; interrogate it.

Ask me the 3 sharpest questions that would expose a flaw, then state the single biggest risk you see and one alternative worth considering.

Decision: {{decision}}`,
    category: 'roleplay',
    models: ['Claude'],
    tags: ['design', 'critique', 'architecture'],
    strategyIds: ['role', 'self-critique'],
    favorite: false,
    createdAt: '2026-05-10T15:10:00.000Z',
    updatedAt: '2026-05-10T15:10:00.000Z',
  },
  {
    id: 'pr-meta-improve',
    title: 'Improve a prompt (meta)',
    body: `You are a prompt engineer. Rewrite the prompt below to be clearer and more reliable.

Return:
1. The rewritten prompt.
2. A bullet list of every change you made and why.
3. One failure mode the original had that the rewrite fixes.

Original prompt:
<prompt>
{{prompt}}
</prompt>`,
    category: 'meta',
    models: ['Claude', 'GPT-4'],
    tags: ['meta', 'prompt-engineering', 'rewrite'],
    strategyIds: ['role', 'self-critique', 'delimiters'],
    favorite: true,
    createdAt: '2026-05-12T12:00:00.000Z',
    updatedAt: '2026-05-25T17:45:00.000Z',
  },
  {
    id: 'pr-agent-react',
    title: 'Research agent loop (ReAct)',
    body: `You can use these tools: search[query], fetch[url], calculator[expr].

Use this loop until you can answer the question:
Thought: reason about what to do next
Action: tool[input]
Observation: (the tool result will be inserted here)
... repeat as needed ...
Answer: a concise final answer with sources

Question: {{question}}`,
    category: 'coding',
    models: ['Claude', 'GPT-4'],
    tags: ['agents', 'tools', 'react'],
    strategyIds: ['react', 'decomposition'],
    favorite: false,
    createdAt: '2026-05-14T08:30:00.000Z',
    updatedAt: '2026-05-14T08:30:00.000Z',
  },
  {
    id: 'pr-tagline',
    title: 'Draft, critique, and refine a tagline',
    body: `Task: Write a product tagline for {{product}}.

1. Write three first-draft taglines.
2. Critique them against: concrete, no clichés, under 12 words.
3. Pick the strongest and rewrite it to fix every problem you found.`,
    category: 'writing',
    models: ['Claude'],
    tags: ['copywriting', 'marketing', 'refinement'],
    strategyIds: ['self-critique'],
    favorite: false,
    createdAt: '2026-05-15T14:00:00.000Z',
    updatedAt: '2026-05-15T14:00:00.000Z',
  },
  {
    id: 'pr-step-back-physics',
    title: 'Step back to the principle first',
    body: `Question: {{question}}

First, name the single general principle this question depends on, and state it in one sentence.
Then apply that principle to answer the specific question.`,
    category: 'analysis',
    models: ['Claude', 'GPT-4'],
    tags: ['principles', 'reasoning', 'step-back'],
    strategyIds: ['step-back', 'cot'],
    favorite: false,
    createdAt: '2026-05-16T10:00:00.000Z',
    updatedAt: '2026-05-16T10:00:00.000Z',
  },
  {
    id: 'pr-interview-coach',
    title: 'Mock interviewer for system design',
    body: `You are an experienced interviewer running a 45-minute system-design interview. The candidate level is {{level}}.

Pose one design problem, then respond to each of my answers the way a real interviewer would: probe trade-offs, raise scale, and never give away the answer. Begin with the problem statement only.`,
    category: 'roleplay',
    models: ['Claude', 'GPT-4'],
    tags: ['interview', 'system-design', 'practice'],
    strategyIds: ['role'],
    favorite: false,
    createdAt: '2026-05-17T18:00:00.000Z',
    updatedAt: '2026-05-17T18:00:00.000Z',
  },
]
