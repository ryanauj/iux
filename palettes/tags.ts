/**
 * Authored palette tags. Each entry is a list of short, lowercase strings
 * that describe the palette's *flavour* — mood, era, register, family — in
 * a way that's queryable from the picker. These layer on top of the
 * auto-derived tags (engine, a11y, id-prefix family, recallAliases) in
 * `src/lib/paletteTags.ts`; together they form the index the floating
 * palette picker searches and groups by.
 *
 * Tag vocabulary is sourced from `FINALIZED-PALETTES.md`'s documented
 * Groups A–W so authoring a new tag means pointing at a line in that
 * file. Treat absence as "no curated tags" — the auto-derived set still
 * applies.
 */
import type { PaletteId } from './index'

export const paletteTags: Partial<Record<PaletteId, string[]>> = {
  /* Group A — named aesthetic families */
  'flat-classic': ['baseline', 'minimal', 'utility'],
  material: ['paper', 'elevation', 'ripple', 'utility'],
  neubrutalism: ['bold', 'high-contrast', 'unornamented'],
  glassmorphism: ['glass', 'translucent', 'depth'],
  neumorphism: ['soft', 'monotone', 'cautionary'],
  claymorphism: ['playful', 'pastel', '3d'],
  skeuomorphism: ['textured', 'tactile', 'realism'],

  /* Group B — palette configurations */
  'tron-dark-neon': ['glass', 'neon', 'dark', 'cinematic'],
  editorial: ['editorial', 'paper', 'magazine', 'long-form'],
  aaa: ['accessibility', 'high-contrast', 'utility'],

  /* Group C — glass registers */
  'liquid-glass-light': ['glass', 'apple', 'light', 'modern'],
  'liquid-glass-dark': ['glass', 'apple', 'dark', 'modern'],
  'aero-glass': ['glass', 'windows', '2000s', 'gloss'],
  'frutiger-aero': ['glass', 'y2k', 'optimism', 'aqua'],
  'cyberpunk-neon-noir': ['glass', 'neon', 'dark', 'cyberpunk', 'noir'],

  /* Group D — flat registers */
  vaporwave: ['retro', 'neon', '80s', 'dusk'],
  'memphis-80s': ['80s', 'playful', 'memphis', 'confetti'],
  'swiss-international': ['swiss', 'typographic', 'minimal'],
  bauhaus: ['bauhaus', 'primary-colors', 'geometric'],
  'mall-goth': ['dark', 'gothic', 'crepuscular'],

  /* Group E — editorial registers */
  newspaper: ['editorial', 'paper', 'newsprint', 'dense'],
  academic: ['editorial', 'academic', 'serif', 'paper'],

  /* Group F — CRT phosphor */
  'crt-phosphor-green': ['crt', 'retro', 'terminal', 'monochrome'],
  'crt-phosphor-amber': ['crt', 'retro', 'terminal', 'monochrome'],

  /* Group G — pixel art */
  'pixel-art-nes': ['retro-gaming', '8bit', 'nostalgic', 'console'],
  'pixel-art-gameboy': ['retro-gaming', 'monochrome', 'nostalgic', 'console'],
  'pixel-art-cottagecore': ['cottagecore', 'pastoral', 'warm', 'indie'],
  'pixel-art-pico8': ['fantasy-console', 'indie', 'fixed-palette'],
  'pixel-art-snes': ['retro-gaming', '16bit', 'jrpg', 'console'],
  'pixel-art-hyperlight': ['indie', 'synth-noir', 'modern'],

  /* Group H — sketch / hand-drawn */
  'sketch-marker': ['hand-drawn', 'sketch', 'paper', 'notebook'],

  /* Group I — restraint */
  wikipedia: ['editorial', 'institutional', 'reference', 'minimal'],
  'brutalist-elegant': ['high-contrast', 'editorial', 'restrained'],

  /* Group J — data density / mid-century */
  'financial-terminal': ['data-density', 'dark', 'terminal', 'mono'],
  'mid-century-modern': ['mid-century', 'paper', 'warm', 'restrained'],
  'data-dense-light': ['data-density', 'paper', 'tufte', 'analytical'],

  /* Group K — cardstock */
  'cardstock-layered': ['paper', 'layered', 'craft'],

  /* Group L — cel-shaded */
  'cel-shaded-shonen': ['anime', 'shonen', 'bold', 'paper'],
  'cel-shaded-shojo': ['anime', 'shojo', 'pastel', 'paper'],

  /* Group M — atmospheric */
  aurora: ['atmospheric', 'luminance', 'dark', 'ambient'],

  /* Group N — terminal */
  'terminal-tui': ['terminal', 'mono', 'character-grid', 'tui'],

  /* Group P — royal */
  'modern-royal': ['regalia', 'dark', 'luxury'],
  'scandinavian-royal-modern': ['regalia', 'scandinavian', 'minimal', 'light'],
  'marble-royal-flat': ['regalia', 'marble', 'gallery'],

  /* Group Q — day transit */
  'tokyo-day': ['transit', 'signage', 'day', 'japan'],
  'bullet-train-day': ['transit', 'signage', 'day', 'japan'],
  'metro-light': ['transit', 'signage', 'day', 'subway'],

  /* Group R — workshop / street */
  'industrial-light': ['workshop', 'industrial', 'mono', 'utility'],
  'graffiti-marble': ['street', 'fluorescent', 'gallery', 'confrontational'],

  /* Group S — print production */
  risograph: ['print-process', 'duotone', 'paper', 'indie-press'],
  letterpress: ['print-process', 'paper', 'classic', 'debossed'],
  blueprint: ['print-process', 'technical', 'cyanotype', 'mono'],

  /* Group T — designer / movement */
  'dieter-rams': ['less-but-better', 'industrial-design', 'minimal'],
  'art-deco': ['vintage', 'luxury', 'geometric', 'jazz-age'],
  'stained-glass': ['medieval', 'jewel-tones', 'ornamental'],

  /* Group U — climate / regional */
  'desert-modernism': ['climate', 'desert', 'mid-century', 'warm'],
  solarpunk: ['climate', 'eco', 'optimism', 'green'],
  'heritage-maritime': ['climate', 'maritime', 'classic'],

  /* Group W — sketch second register */
  'zen-sumie': ['hand-drawn', 'brush', 'east-asian', 'restrained'],

  /* Group X — modern-light register set */
  'nordic-frost': ['modern', 'light', 'scandinavian', 'cool', 'minimal'],
  'sage-studio': ['modern', 'light', 'wellness', 'botanical', 'warm'],
  'linear-workspace': ['modern', 'light', 'saas', 'productivity', 'minimal'],
  'vercel-geist': ['modern', 'light', 'dev-tool', 'minimal', 'utility'],
  'soft-pastel': ['modern', 'light', 'pastel', 'playful', 'app'],
  'lavender-dawn': ['modern', 'light', 'calm', 'app', 'warm'],
  'stone-modern': ['modern', 'light', 'minimal', 'retail', 'warm'],
  'coastal-modern': ['modern', 'light', 'coastal', 'cool'],
  'citrus-spark': ['modern', 'light', 'energetic', 'brand', 'bright'],
  'mocha-latte': ['modern', 'light', 'cafe', 'warm', 'serif'],

  /* Group Y — light neobrutalist register set */
  'neo-citrus': ['neobrutalist', 'light', 'bold', 'bright', 'lime'],
  'neo-bubblegum': ['neobrutalist', 'light', 'bold', 'bright', 'pink'],
  'neo-grape': ['neobrutalist', 'light', 'bold', 'bright', 'violet'],
  'neo-tangerine': ['neobrutalist', 'light', 'bold', 'bright', 'orange'],

  /* Group Z — light anime / cel-shaded register set */
  'cel-shaded-kawaii': ['anime', 'light', 'pastel', 'kawaii', 'bright'],
  'cel-shaded-mecha': ['anime', 'light', 'mecha', 'cool', 'technical'],
  'cel-shaded-sakura': ['anime', 'light', 'pastel', 'spring', 'bright'],
  'cel-shaded-citrus': ['anime', 'light', 'energetic', 'bright', 'shonen'],

  /* Group Z2 — minimal light with bright pops */
  'paper-pop': ['modern', 'light', 'minimal', 'monochrome', 'accent'],
  'studio-confetti': ['modern', 'light', 'playful', 'bright', 'app'],

  /* Group Z3 — daylight inversions of dark palettes ("Daybreak" set) */
  'tron-light-grid': ['glass', 'neon', 'light', 'grid', 'daybreak'],
  'terminal-tui-paper': ['terminal', 'mono', 'character-grid', 'tui', 'light', 'paper'],
  'crt-phosphor-greenbar': ['crt', 'retro', 'terminal', 'monochrome', 'light', 'paper'],
  whiteprint: ['print', 'technical', 'mono', 'light', 'grid', 'drafting'],
  'art-deco-ivory': ['deco', 'gatsby', 'vintage', 'light', 'gold', 'geometric'],

  /* Group Z4 — out-of-the-box light register set */
  'e-ink-carta': ['light', 'e-ink', 'reader', 'monochrome', 'serif', 'paper'],
  'salt-flats': ['light', 'mineral', 'minimal', 'desert', 'spacious', 'earthy'],
  'whitewash-aegean': ['light', 'coastal', 'mediterranean', 'cycladic', 'serif', 'blue'],
  'apothecary-herbarium': ['light', 'vintage', 'botanical', 'serif', 'cream', 'medicinal'],
  'origami-fold': ['light', 'paper', 'folded', 'craft', 'bright', 'geometric'],
  'celadon-glaze': ['light', 'ceramic', 'glaze', 'jade', 'puffy', '3d'],
  'sea-glass': ['light', 'glass', 'frosted', 'coastal', 'aqua', 'translucent'],
  'iridescent-opal': ['light', 'glass', 'holographic', 'pearlescent', 'translucent', 'multicolor'],
  'silver-daguerreotype': ['light', 'antique', 'silver', 'photographic', 'serif', 'monotone'],
  'sugar-paper-chalk': ['light', 'hand-drawn', 'chalk', 'pastel', 'classroom', 'craft'],

  /* Group Z5 — cel-glass (cel-shaded × glassmorphism mix) */
  'cel-glass-frost': ['glass', 'anime', 'translucent', 'frosted', 'cool', 'light', 'cel-shaded'],
  'cel-glass-noir': ['glass', 'anime', 'translucent', 'frosted', 'neon', 'dark', 'cel-shaded'],
  'cel-glass-sunset': ['glass', 'anime', 'translucent', 'frosted', 'warm', 'light', 'cel-shaded'],

  /* Group Z6 — cel-glass light-ground registers (white/beige + colored line) */
  'cel-glass-mist': ['glass', 'anime', 'frosted', 'light', 'white', 'cool', 'teal', 'cel-shaded'],
  'cel-glass-bone': ['glass', 'anime', 'frosted', 'light', 'beige', 'warm', 'clay', 'cel-shaded'],
  'cel-glass-orchid': ['glass', 'anime', 'frosted', 'light', 'white', 'violet', 'cel-shaded'],

  /* Group Z7 — editor / IDE syntax themes (cel+glass+crt) */
  'cel-shaded-dracula-crt': ['editor-theme', 'cel-shaded', 'glass', 'crt', 'light', 'neon'],
  'cel-shaded-gruvbox-crt': ['editor-theme', 'cel-shaded', 'glass', 'crt', 'light', 'warm'],
  'cel-shaded-nord-crt': ['editor-theme', 'cel-shaded', 'glass', 'crt', 'light', 'frost'],
  'cel-shaded-solarized-crt': ['editor-theme', 'cel-shaded', 'glass', 'crt', 'light', 'low-glare'],
  'cel-shaded-monokai-crt': ['editor-theme', 'cel-shaded', 'glass', 'crt', 'light', 'neon'],

  /* Group Z8 — period & movement registers (cel+glass) */
  'cel-shaded-academia-glass': ['cel-shaded', 'glass', 'scholarly', 'serif', 'light', 'ink-outline'],
  'cel-shaded-ukiyo-glass': ['cel-shaded', 'glass', 'woodblock', 'japanese', 'indigo', 'ink-outline'],
  'cel-shaded-constructivist-glass': ['cel-shaded', 'glass', 'agitprop', 'poster', 'red', 'ink-outline'],
  'cel-shaded-nouveau-glass': ['cel-shaded', 'glass', 'organic', 'ornate', 'serif', 'ink-outline'],
  'cel-shaded-botanical-glass': ['cel-shaded', 'glass', 'botanical', 'serif', 'naturalist', 'ink-outline'],

  /* Group Z9 — light sports video-game registers (flat scoreboard HUDs) */
  'court-hardwood': ['game-ui', 'sports', 'basketball', 'light', 'arena', 'orange', 'violet'],
  'pitch-grass': ['game-ui', 'sports', 'soccer', 'football', 'light', 'green', 'cyan'],
  'gridiron-broadcast': ['game-ui', 'sports', 'american-football', 'light', 'broadcast', 'navy', 'red'],
  'baseline-ace': ['game-ui', 'sports', 'tennis', 'light', 'court', 'blue', 'lime'],
  'ballpark-day': ['game-ui', 'sports', 'baseball', 'light', 'day-game', 'crimson', 'navy'],

  /* Group Z10 — light futuristic-fantasy / FPS HUD registers (glass) */
  'mirror-runner': ['game-ui', 'fps', 'sci-fi', 'light', 'minimal', 'red', 'blue'],
  'aegis-halo': ['game-ui', 'fps', 'sci-fi', 'military', 'light', 'cyan', 'gold', 'hud'],
  'tactical-recon': ['game-ui', 'fps', 'tactical', 'scanner', 'light', 'green', 'magenta', 'hud'],
  'nova-vanguard': ['game-ui', 'fps', 'hero-shooter', 'light', 'bright', 'orange', 'blue'],
  'arcane-vanguard': ['game-ui', 'fps', 'futuristic-fantasy', 'sci-fantasy', 'light', 'violet', 'gold', 'magic'],

  /* Group Z11 — "new tech gradient" family (modern-app mesh gradients + glass / cel variations) */
  'aurora-nebula': ['tech-gradient', 'gradient', 'mesh', 'modern', 'dark', 'violet', 'magenta', 'cyan', 'atmospheric'],
  'aurora-spectrum': ['tech-gradient', 'gradient', 'mesh', 'modern', 'dark', 'azure', 'cyan', 'emerald', 'atmospheric', 'dashboard'],
  'cel-glass-flux': ['tech-gradient', 'glass', 'translucent', 'frosted', 'modern', 'dark', 'indigo', 'cyan', 'cel-shaded'],
  'cel-shaded-circuit': ['tech-gradient', 'cel-shaded', 'cyberpunk', 'hud', 'modern', 'dark', 'indigo', 'cyan', 'neon', 'ink-outline'],
}
