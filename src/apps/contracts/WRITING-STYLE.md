# Cap School — prose pass

Rules live in [`PROSE-STYLE.md`](../../../PROSE-STYLE.md). This
file holds only the Cap-School-specific application of them. Scope: ledes,
`<p className="cap-page__p">` bodies, and `KeyIdea` bodies in
`src/apps/contracts/pages/*.tsx` plus `components/Bits.tsx`.

## Cap-School specifics
- **Keep:** all dollar figures, the Garnett extension anecdote (`MaxDeals`),
  and the ladder / rungs / climb metaphor — it maps to the `CapLadder`
  component and is the one load-bearing metaphor. Drop every other metaphor,
  including the "brake" (`Aprons` lede, `LuxuryTax` kicker).
- **Person:** "a team" / "an owner" in explanatory sentences; "you" only on
  interactive-tool copy.

## Worked rewrites

**`Aprons` lede**
Before: "The luxury tax was supposed to be the brake. For most owners it is —
but the richest ones paid it, shrugged at the bill, and kept spending… you
don't just owe more — you lose the tools you'd use to get better."
After: "The luxury tax deters spending with a financial penalty, which does
little to stop the wealthiest owners: they pay it and keep spending. The
aprons deter differently. Above these two thresholds the cost isn't a larger
bill but the loss of roster-building tools — exceptions, trade flexibility,
and access to future draft picks."

**`LuxuryTax` lede**
Before: "Cross the tax line and every dollar above it costs you a second
dollar… You'd guess that penalty is a flat percentage. It isn't… the more each
extra dollar stings."
After: "Above the tax line, every dollar of payroll owes an additional payment
to the league. The rate is not flat: it climbs in brackets, so each dollar of
overage is taxed more heavily than the one before it."

**`LuxuryTax` kicker:** "Chapter 6 · The first brake" → drop the brake; e.g.
"Chapter 6 · The graduated penalty."

**`Aprons` KeyIdea "Why the second apron is feared"** → retitle "What the
second apron removes"; open with the restriction, not "It's not the money."

## Per-page checklist
1. Lede: no expectation-reversal, no em-dash antithesis, no metaphor except
   the ladder.
2. Body: rewrite any expectation-reversal, not just the literal phrases. The
   strings “the point”, “the twist”, “you’d guess”, “what matters most”,
   “shrug”, “sting”, “feared”, “happily”, “brake” are a starting scan — also
   flag any sentence that sets up an expectation in order to overturn it, even
   if it uses none of those words. Apply the rule-1 test from `PROSE-STYLE.md`.
3. Reduce em-dash antithesis to at most one per page.
4. Convert explanatory "you" to "a team" / "an owner"; leave tool copy alone.
5. Preserve all figures, the Garnett anecdote, and ladder language in meaning.
