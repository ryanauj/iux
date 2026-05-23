import type { Palette } from '../tokens/semantic.contract'

/**
 * Sketch / Hand-drawn (Marker) — notebook-paper field, ink-blue body,
 * red-marker accent, every edge visibly drawn rather than crisp.
 *
 * Anchored on the new `sketch` engine. The engine exercises two
 * contract slots no previous palette put to work:
 *
 *   - `effect.strokeVariance`     — how wobbly the edges feel (`'1.4px'`).
 *   - `typography.family.hand`    — the bundled hand-drawn font stack.
 *
 * The wobble is delivered by an SVG turbulence + displacement filter
 * applied at the palette root (defined in `index.html` as
 * `#iux-sketch-wobble`). The filter is referenced from the engine block
 * in `src/styles.css` and recasts every border, glyph outline, focus
 * ring, and shadow stroke as a hand-drawn approximation. Radius tokens
 * stay advisory: a stated `radius.sm` of `'4px'` reads more rounded than
 * a stated `radius.none`, but neither corner is geometrically circular
 * once the displacement pass runs.
 *
 * The "marker bleed" — a quarter-pixel softening on stroked edges — is
 * the trailing `feGaussianBlur` in the same filter, plus a subtle
 * inset-shadow on `intent.*.bg` so fills appear to leak slightly past
 * the stated border.
 */
export const palette: Palette = {
  id: 'sketch-marker',
  name: 'Hand-drawn (Marker)',
  engine: 'sketch',
  a11y: 'experimental',
  tokens: {
    color: {
      // Notebook-paper cream field; raised surfaces slightly brighter so
      // cards read as a fresh page laid over the desk. Scrim is an ink
      // wash, not pure black, so the marker-bleed filter doesn't crush
      // contrast when a modal opens.
      surface: {
        base: '#fbf6e9',
        raised: '#ffffff',
        sunken: '#f0e9d2',
        overlay: '#ffffff',
        scrim: 'rgba(28, 32, 54, 0.55)',
      },
      // Ink-blue primary, mid-blue secondary — what a ballpoint actually
      // looks like on cream paper, not the saturated #2563eb of digital
      // type. `muted` lifts toward pencil-grey for de-emphasized text.
      content: {
        primary: '#1a2548',
        secondary: '#3f4d7a',
        muted: '#8a8676',
        inverse: '#fbf6e9',
        link: '#b3261e',
      },
      // Borders are all ink-blue at varying intensities. The wobble
      // filter does the visual work — these colours just give it
      // something to displace.
      border: {
        subtle: '#c9c2a9',
        default: '#1a2548',
        strong: '#0a1230',
        focus: '#b3261e',
      },
      // Five-marker palette: navy, red, green, mustard, teal. Each fills
      // a different intent. Borders are slightly darker than the fill
      // (the eye reads that as "the marker outline traced first, the
      // ink filled second" — i.e. how a real sketch is drawn).
      intent: {
        primary: {
          bg: '#1a2548',
          content: '#fbf6e9',
          border: '#0a1230',
          bgHover: '#27355f',
          bgActive: '#0a1230',
        },
        neutral: {
          bg: '#e8dfc4',
          content: '#1a2548',
          border: '#1a2548',
          bgHover: '#d8cfb4',
          bgActive: '#bcb18d',
        },
        success: {
          bg: '#2f6f3e',
          content: '#fbf6e9',
          border: '#1f5028',
          bgHover: '#3a8049',
          bgActive: '#1f5028',
        },
        warning: {
          bg: '#cf8a1f',
          content: '#1a2548',
          border: '#9c6612',
          bgHover: '#e29c2e',
          bgActive: '#9c6612',
        },
        danger: {
          bg: '#b3261e',
          content: '#fbf6e9',
          border: '#7a1813',
          bgHover: '#c63730',
          bgActive: '#7a1813',
        },
        info: {
          bg: '#1f6d7a',
          content: '#fbf6e9',
          border: '#125058',
          bgHover: '#28818f',
          bgActive: '#125058',
        },
      },
    },
    // Slightly wider scale than Flat — sketched layouts breathe better
    // because the wobble eats a couple of pixels of perceived margin at
    // every edge.
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '14px',
      '4': '20px',
      '5': '28px',
      '6': '40px',
      '7': '56px',
      '8': '72px',
    },
    // Radii are kept on a real scale — the engine note in the contract
    // doc is "advisory" because the displacement filter recasts every
    // corner regardless. A non-zero `sm` still reads more rounded than
    // `none` after the filter runs; the filter just blurs the distinction.
    radius: {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '16px',
      pill: '999px',
      full: '9999px',
    },
    // Border widths skew thick — a fine-line border at 1px loses most of
    // its presence under the displacement pass; 2-3px reads as a marker
    // stroke. `heavy` is reserved for highlight callouts.
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    // Elevation: soft drop-shadows tinted toward ink-blue rather than
    // black, so the cast shadow reads as "the page is lifted off
    // notebook paper" rather than "this is on glass."
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '1px 2px 0 rgba(26, 37, 72, 0.35)' },
      medium: { boxShadow: '2px 3px 0 rgba(26, 37, 72, 0.40), 0 4px 8px rgba(26, 37, 72, 0.10)' },
      high: { boxShadow: '3px 4px 0 rgba(26, 37, 72, 0.45), 0 10px 18px rgba(26, 37, 72, 0.14)' },
      overlay: { boxShadow: '3px 5px 0 rgba(26, 37, 72, 0.50), 0 18px 28px rgba(26, 37, 72, 0.20)' },
    },
    typography: {
      family: {
        // `ui` / `body` / `mono` all route to the hand stack so every role
        // renders as marker glyphs. The cursive/handwritten serif fallback
        // chain keeps the engine feel even if the WOFF fails to load.
        ui: '"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive',
        display: '"Caveat", "Bradley Hand", "Marker Felt", cursive',
        mono: '"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive',
        pixel: '"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive',
        hand: '"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive',
      },
      // Patrick Hand is a small face — its x-height runs ~0.55em. We
      // bump every body / label / caption size a quarter step above the
      // Flat baseline so reading-line height matches a system font.
      // `display` and `title` route to Caveat (the brush-marker face) for
      // contrast.
      role: {
        display:    { family: 'display', size: '3rem',     weight: 700, lineHeight: '1.05', tracking: '0' },
        title:      { family: 'display', size: '2.25rem',  weight: 700, lineHeight: '1.1',  tracking: '0' },
        heading:    { family: 'hand',    size: '1.5rem',   weight: 400, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'hand',    size: '1.25rem',  weight: 400, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'hand',    size: '1.15rem',  weight: 400, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'hand',    size: '1rem',     weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        caption:    { family: 'hand',    size: '0.95rem',  weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'hand',    size: '1rem',     weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    // Marker strokes don't snap, they sweep. Durations are slightly
    // slower than Flat to read as "ink settling" rather than "GPU flip."
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '240ms',
        slow: '380ms',
      },
      // Spring is light — a real felt-tip has a small bounce-back as the
      // hand lifts. The other easings stay standard so the engine
      // doesn't fight the motion contract elsewhere.
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      // Focus ring is the red marker — it reads as a deliberate
      // "circled" affordance against the cream field. `solid` because
      // the displacement filter is the engine concern, not the focus
      // recipe; the wobble pass turns the otherwise crisp ring into a
      // hand-drawn loop for free.
      focusRing: { width: '3px', offset: '3px', color: '#b3261e', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      // The engine root reads this as documentation: components don't
      // consume `--stroke-variance` directly (the SVG filter does), but
      // the slot records the intended wobble amplitude so future
      // hand-drawn-aware components (a chart axis, an annotation layer)
      // can scale their own SVG paths to match.
      strokeVariance: '1.4px',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
