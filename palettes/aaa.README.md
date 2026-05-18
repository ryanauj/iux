# High-Contrast AAA

Pure black on pure white. `body` is bumped to `1.125rem / 500` and `space.*` is
tightened one notch from Flat / Classic to keep keyboard density tolerable
without sacrificing the larger type. Decorative motion is removed at the
palette level: every `motion.duration.*` slot is `'0ms'` — no transitions, no
ease curves that mean anything. The defining feature is a 3px `double` focus
ring in CSS `link blue` (`#0000ee`); elevation collapses to `'none'` everywhere
except `overlay`, which gets a hard 2px black "shadow" stroke instead of a soft
drop shadow.

**A11y:** `pass` (WCAG AAA on all body and intent text). `content.primary` on
`surface.base` = 21:1. The lowest-contrast intent — `warning` `#7a4a00` with
white `inverse` content — sits at ≈ 7.9:1, above the 7:1 AAA threshold for
body text. `content.muted` (`#333333` on white ≈ 12.6:1) stays AAA even as
decorative placeholder text.
