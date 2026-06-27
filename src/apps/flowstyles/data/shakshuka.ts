// ABOUTME: The sample dataset for Recipe Flow — a weeknight shakshuka recipe whose ingredients and steps form the graph every styling treatment renders.

import type { Recipe } from '../types'

/**
 * Weeknight shakshuka. Chosen because it has a satisfying graph shape: a
 * handful of pantry staples reused across several steps (oil and spices touch
 * many steps), a couple of headline ingredients with a single dramatic use
 * (the eggs), and a clean prep → cook → finish progression that lays out as a
 * readable left-to-right timeline.
 */
// ABOUTME: The weeknight-shakshuka Recipe instance — 10 ingredients and 7 ordered steps with their ingredient usages — used as the default graph across all treatments.
export const SHAKSHUKA: Recipe = {
  id: 'shakshuka',
  title: 'Weeknight Shakshuka',
  blurb: 'Eggs poached in a spiced tomato and pepper stew — one pan, about half an hour.',
  servings: 4,
  totalMinutes: 35,
  ingredients: [
    { id: 'oil', name: 'Olive oil', amount: '2 tbsp', pantry: true },
    { id: 'onion', name: 'Yellow onion', amount: '1 large', note: 'finely diced' },
    { id: 'pepper', name: 'Red bell pepper', amount: '1', note: 'sliced' },
    { id: 'garlic', name: 'Garlic', amount: '3 cloves', note: 'minced' },
    { id: 'cumin', name: 'Ground cumin', amount: '1 tsp', pantry: true },
    { id: 'paprika', name: 'Smoked paprika', amount: '1 tsp', pantry: true },
    { id: 'tomatoes', name: 'Crushed tomatoes', amount: '1 can (400g)' },
    { id: 'eggs', name: 'Eggs', amount: '5–6 large' },
    { id: 'feta', name: 'Feta', amount: '½ cup', note: 'crumbled' },
    { id: 'cilantro', name: 'Cilantro', amount: 'small handful', note: 'torn' },
  ],
  steps: [
    {
      id: 's1',
      order: 1,
      title: 'Heat the oil',
      detail: 'Warm the olive oil in a wide oven-safe skillet over medium heat.',
      minutes: 2,
      uses: ['oil'],
      phase: 'prep',
    },
    {
      id: 's2',
      order: 2,
      title: 'Soften the aromatics',
      detail: 'Add the onion and bell pepper; cook until soft and just starting to colour.',
      minutes: 8,
      uses: ['onion', 'pepper'],
      phase: 'prep',
    },
    {
      id: 's3',
      order: 3,
      title: 'Bloom the spices',
      detail: 'Stir in the garlic, cumin, and smoked paprika and cook until fragrant.',
      minutes: 1,
      uses: ['garlic', 'cumin', 'paprika'],
      phase: 'cook',
    },
    {
      id: 's4',
      order: 4,
      title: 'Build the sauce',
      detail: 'Pour in the crushed tomatoes, season, and simmer until thickened.',
      minutes: 10,
      uses: ['tomatoes'],
      phase: 'cook',
    },
    {
      id: 's5',
      order: 5,
      title: 'Add the eggs',
      detail: 'Make wells in the sauce and crack an egg into each one.',
      minutes: 2,
      uses: ['eggs'],
      phase: 'cook',
    },
    {
      id: 's6',
      order: 6,
      title: 'Poach until set',
      detail: 'Cover and cook gently until the whites are set but the yolks stay runny.',
      minutes: 8,
      uses: ['eggs'],
      phase: 'cook',
    },
    {
      id: 's7',
      order: 7,
      title: 'Finish and serve',
      detail: 'Scatter over the feta and cilantro and serve straight from the pan.',
      minutes: 2,
      uses: ['feta', 'cilantro'],
      phase: 'finish',
    },
  ],
}
