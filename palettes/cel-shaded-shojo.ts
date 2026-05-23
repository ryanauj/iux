import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-shaded (Shojo) — pink / lavender / cream register, the classic
 * shojo anime color palette. Same engine as the shonen variant: flat
 * fills bounded by hard ink outlines, two-tone shading where shading
 * exists. Only the palette differs — `color.*` swaps the shonen orange
 * / blue triad for a pink / lavender / cream / sky-blue set, and the
 * ink line stays the same near-black so the cel-outline affordance
 * carries identically.
 *
 * The brief asked for two palettes to prove the engine generalizes
 * the same way the CRT pair (green ↔ amber) and the Pixel-art set
 * (NES / Game Boy / etc.) do — swap `color.*` and the engine still
 * works.
 */
export const palette: Palette = {
  id: 'cel-shaded-shojo',
  name: 'Cel-shaded (Shojo)',
  engine: 'cel-shaded',
  a11y: 'pass',
  tokens: {
    color: {
      // Cream-pink base, white raised. The shojo register uses warmer
      // mid-tones for the page field — closer to a watercolor wash
      // than the orange triad's poster-paint cream. Sunken is a deeper
      // dusty rose so input wells read as recessed.
      surface: {
        base: '#fff5f9',
        raised: '#ffffff',
        sunken: '#fde2eb',
        overlay: '#ffffff',
        scrim: 'rgba(76, 29, 95, 0.55)',
      },
      // Ink-black body, mid-ink secondary, mid-grey muted. Inverse is
      // cream-pink so colored intent fills can carry white text without
      // breaking the warm field. Link is the shojo-pink accent.
      content: {
        primary: '#0a0a0a',
        secondary: '#2b1a2b',
        muted: '#7a6a78',
        inverse: '#fff5f9',
        link: '#db2777',
      },
      // Every border slot is ink — the cel outline is the same regardless
      // of which border token a component consumes. Focus is lavender so
      // it reads against the pink intent palette without competing.
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#7c3aed',
      },
      // Soft-saturation pastel set: pink-primary (the heroine's blush),
      // cream-neutral (the watercolor field), lavender-info (the
      // dream-sequence aura), red-danger (heart-break drama), green-
      // success (garden / first-kiss flora), butter-warning (warning
      // ribbon / declaration). Every `border` is ink.
      intent: {
        primary: { bg: '#ec4899', content: '#fff5f9', border: '#0a0a0a', bgHover: '#db2777', bgActive: '#be185d' },
        neutral: { bg: '#fde2eb', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#fbcfe0', bgActive: '#f9a8c3' },
        success: { bg: '#4ade80', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#22c55e', bgActive: '#16a34a' },
        warning: { bg: '#fcd34d', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#fbbf24', bgActive: '#f59e0b' },
        danger:  { bg: '#f43f5e', content: '#fff5f9', border: '#0a0a0a', bgHover: '#e11d48', bgActive: '#be123c' },
        info:    { bg: '#a78bfa', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#8b5cf6', bgActive: '#7c3aed' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '24px',
      '6': '32px',
      '7': '48px',
      '8': '64px',
    },
    // Slightly softer radius than shonen — the shojo register favors
    // gentler curves. `pill` / `full` work the same as Flat.
    radius: {
      none: '0',
      sm: '6px',
      md: '10px',
      lg: '16px',
      pill: '999px',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    // Same hard-offset two-tone shading as the shonen variant. Ink-black
    // shadow color so the shading reads consistently across both palettes.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '3px 3px 0 #0a0a0a' },
      medium: { boxShadow: '5px 5px 0 #0a0a0a' },
      high: { boxShadow: '7px 7px 0 #0a0a0a' },
      overlay: { boxShadow: '8px 8px 0 #0a0a0a, 0 24px 48px rgba(76, 29, 95, 0.30)' },
    },
    typography: {
      family: {
        // Shojo register softens the display weight one step — the
        // heavy condensed grotesque of shonen is replaced by a
        // round-humanist heavy display (Poppins / Comfortaa / Quicksand
        // weights). Body stays Inter for legibility.
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Poppins", "Quicksand", "Comfortaa", "Helvetica Neue", Arial, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      // Display roles drop the uppercase transform — shojo logo type
      // is sentence-case rounded. Weight contrast survives: 800 display
      // vs 500 body.
      role: {
        display:    { family: 'display', size: '3rem',    weight: 800, lineHeight: '1.0',  tracking: '-0.015em' },
        title:      { family: 'display', size: '2.25rem', weight: 800, lineHeight: '1.05', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.2',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.3',  tracking: '0.02em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '90ms',
        base: '160ms',
        slow: '260ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      // Focus ring is lavender at 3px width — same width as shonen, so
      // the focus affordance feels identical across the engine.
      focusRing: { width: '3px', offset: '2px', color: '#7c3aed', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#0a0a0a', width: '3px' },
      shadowStyle: 'hard',
    },
  },
}
