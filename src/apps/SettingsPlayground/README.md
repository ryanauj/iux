# Settings playground

The meta app. Browse every palette, see every component in it, flip every
contract token. It hosts the global **palette switcher** and the
**Persist locally** toggle — the one switch in the whole repo that calls
`SwitchableStore.swap`. Every other app inherits a stable `Store`.

**UX patterns demonstrated.** Live re-theming through a `PaletteRoot`
boundary (every component re-renders against new tokens with zero per-app
override); the persistence contract's runtime mode swap with the
`saving` Toggle microstate during migration; deep-linkable state (palette,
selected token slot, and routed Modal all reflect to the URL so a
shared URL re-opens the exact view); a constraint-aware property
inspector (pick `focusRing.style = glow` and the `width` field disables
and shows a derived value).

**Palette fit.**
- **Best — Flat / Classic.** The playground is a calibration tool;
  flat fills and a single accent is the right baseline against which
  the *other* palettes get evaluated.
- **Best — High-Contrast AAA.** Token names and values are dense text;
  AAA's larger body and 3px focus rings make every slot reachable.
- **Best — Material.** The inspector panel is the textbook Material
  surface — `elevation.high`, soft transitions, clear hierarchy.
- **Worst — Neumorphism.** The rare worst case the showcase uses
  productively: launching here in Neumorphism is the *exit route*.
  The "Persist locally" toggle's track and thumb both collapse into
  the surface and the user can't tell if it's on. The fix is to
  switch palettes — which they can only do here. That's the
  teaching beat: `experimental` means *this can break*.
