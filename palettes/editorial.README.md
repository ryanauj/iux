# Editorial

Flat engine reading like a magazine. Warm paper background
(`#f7f1e3`), ink-black body (`#1e170d`), restrained terracotta accent
(`#a13b1a`) used as the only saturated color in the palette. Display
family is `"Playfair Display"` / Times / Georgia serif at large sizes;
UI/body stays sans for column density.

`space.*` widens one notch from Flat / Classic (`1 → 6px`, `4 → 22px`,
`8 → 88px`) to give the serif type the breathing room it expects.
Elevation collapses to `none` for every slot except `high` and
`overlay`, which carry a soft warm-tinted drop shadow — magazine layouts
don't lift card-on-page; the bigger headlines and asymmetric whitespace
do that work.

**A11y:** `pass`. Body text (`#1e170d` on `#f7f1e3`) measures ≈ 16:1
— AAA at default. The terracotta `primary` background `#a13b1a` with
warm `inverse` `#fdf8ec` content sits at ≈ 6.3:1 (AA at body text, AAA
at large text). `success` `#3f5b2a` + inverse ≈ 8.2:1; `info` `#1f4b6e`
+ inverse ≈ 8.9:1. `content.muted` `#7a6a4f` on `base` ≈ 4.6:1, OK as
decorative meta text.
