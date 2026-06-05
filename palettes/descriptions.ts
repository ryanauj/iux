/**
 * Style-description registry. Mirrors `palettes/index.ts` but as a
 * `Partial<Record<PaletteId, StyleDescription>>` — unpopulated palettes
 * are simply absent. The quiz UI and doc generator treat absence as
 * "skip this one." Populate by adding a `<id>.description.ts` file
 * and an entry below.
 */
import type { StyleDescription } from '../tokens/style-description.contract'
import type { PaletteId } from './index'

import { description as aaa } from './aaa.description'
import { description as academic } from './academic.description'
import { description as apothecaryHerbarium } from './apothecary-herbarium.description'
import { description as celadonGlaze } from './celadon-glaze.description'
import { description as eInkCarta } from './e-ink-carta.description'
import { description as iridescentOpal } from './iridescent-opal.description'
import { description as origamiFold } from './origami-fold.description'
import { description as saltFlats } from './salt-flats.description'
import { description as seaGlass } from './sea-glass.description'
import { description as silverDaguerreotype } from './silver-daguerreotype.description'
import { description as sugarPaperChalk } from './sugar-paper-chalk.description'
import { description as whitewashAegean } from './whitewash-aegean.description'
import { description as aeroGlass } from './aero-glass.description'
import { description as artDeco } from './art-deco.description'
import { description as artDecoIvory } from './art-deco-ivory.description'
import { description as celShadedNouveauGlass } from './cel-shaded-nouveau-glass.description'
import { description as celShadedBotanicalGlass } from './cel-shaded-botanical-glass.description'
import { description as celShadedConstructivistGlass } from './cel-shaded-constructivist-glass.description'
import { description as celShadedAcademiaGlass } from './cel-shaded-academia-glass.description'
import { description as celShadedDraculaCrt } from './cel-shaded-dracula-crt.description'
import { description as celShadedGruvboxCrt } from './cel-shaded-gruvbox-crt.description'
import { description as celShadedMonokaiCrt } from './cel-shaded-monokai-crt.description'
import { description as celShadedNordCrt } from './cel-shaded-nord-crt.description'
import { description as celShadedSolarizedCrt } from './cel-shaded-solarized-crt.description'
import { description as celShadedUkiyoGlass } from './cel-shaded-ukiyo-glass.description'
import { description as aurora } from './aurora.description'
import { description as bauhaus } from './bauhaus.description'
import { description as blueprint } from './blueprint.description'
import { description as brutalistElegant } from './brutalist-elegant.description'
import { description as bulletTrainDay } from './bullet-train-day.description'
import { description as cardstockLayered } from './cardstock-layered.description'
import { description as celShadedCitrus } from './cel-shaded-citrus.description'
import { description as celShadedKawaii } from './cel-shaded-kawaii.description'
import { description as celShadedMecha } from './cel-shaded-mecha.description'
import { description as celShadedSakura } from './cel-shaded-sakura.description'
import { description as celShadedShojo } from './cel-shaded-shojo.description'
import { description as celShadedShonen } from './cel-shaded-shonen.description'
import { description as citrusSpark } from './citrus-spark.description'
import { description as claymorphism } from './claymorphism.description'
import { description as coastalModern } from './coastal-modern.description'
import { description as crtPhosphorAmber } from './crt-phosphor-amber.description'
import { description as crtPhosphorGreen } from './crt-phosphor-green.description'
import { description as crtPhosphorGreenbar } from './crt-phosphor-greenbar.description'
import { description as cyberpunkNeonNoir } from './cyberpunk-neon-noir.description'
import { description as dataDenseLight } from './data-dense-light.description'
import { description as desertModernism } from './desert-modernism.description'
import { description as dieterRams } from './dieter-rams.description'
import { description as editorial } from './editorial.description'
import { description as financialTerminal } from './financial-terminal.description'
import { description as flatClassic } from './flat-classic.description'
import { description as frutigerAero } from './frutiger-aero.description'
import { description as glassmorphism } from './glassmorphism.description'
import { description as graffitiMarble } from './graffiti-marble.description'
import { description as heritageMaritime } from './heritage-maritime.description'
import { description as industrialLight } from './industrial-light.description'
import { description as lavenderDawn } from './lavender-dawn.description'
import { description as letterpress } from './letterpress.description'
import { description as linearWorkspace } from './linear-workspace.description'
import { description as liquidGlassDark } from './liquid-glass-dark.description'
import { description as liquidGlassLight } from './liquid-glass-light.description'
import { description as mallGoth } from './mall-goth.description'
import { description as marbleRoyalFlat } from './marble-royal-flat.description'
import { description as material } from './material.description'
import { description as memphis80s } from './memphis-80s.description'
import { description as metroLight } from './metro-light.description'
import { description as midCenturyModern } from './mid-century-modern.description'
import { description as mochaLatte } from './mocha-latte.description'
import { description as modernRoyal } from './modern-royal.description'
import { description as neoBubblegum } from './neo-bubblegum.description'
import { description as neoCitrus } from './neo-citrus.description'
import { description as neoGrape } from './neo-grape.description'
import { description as neoTangerine } from './neo-tangerine.description'
import { description as neubrutalism } from './neubrutalism.description'
import { description as neumorphism } from './neumorphism.description'
import { description as newspaper } from './newspaper.description'
import { description as nordicFrost } from './nordic-frost.description'
import { description as paperPop } from './paper-pop.description'
import { description as pixelArtCottagecore } from './pixel-art-cottagecore.description'
import { description as pixelArtGameboy } from './pixel-art-gameboy.description'
import { description as pixelArtHyperlight } from './pixel-art-hyperlight.description'
import { description as pixelArtNes } from './pixel-art-nes.description'
import { description as pixelArtPico8 } from './pixel-art-pico8.description'
import { description as pixelArtSnes } from './pixel-art-snes.description'
import { description as risograph } from './risograph.description'
import { description as sageStudio } from './sage-studio.description'
import { description as scandinavianRoyalModern } from './scandinavian-royal-modern.description'
import { description as sketchMarker } from './sketch-marker.description'
import { description as skeuomorphism } from './skeuomorphism.description'
import { description as softPastel } from './soft-pastel.description'
import { description as solarpunk } from './solarpunk.description'
import { description as stainedGlass } from './stained-glass.description'
import { description as stoneModern } from './stone-modern.description'
import { description as studioConfetti } from './studio-confetti.description'
import { description as swissInternational } from './swiss-international.description'
import { description as terminalTui } from './terminal-tui.description'
import { description as terminalTuiPaper } from './terminal-tui-paper.description'
import { description as tokyoDay } from './tokyo-day.description'
import { description as tronDarkNeon } from './tron-dark-neon.description'
import { description as tronLightGrid } from './tron-light-grid.description'
import { description as vaporwave } from './vaporwave.description'
import { description as vercelGeist } from './vercel-geist.description'
import { description as whiteprint } from './whiteprint.description'
import { description as wikipedia } from './wikipedia.description'
import { description as zenSumie } from './zen-sumie.description'
import { description as celGlassFrost } from './cel-glass-frost.description'
import { description as celGlassNoir } from './cel-glass-noir.description'
import { description as celGlassSunset } from './cel-glass-sunset.description'
import { description as celGlassMist } from './cel-glass-mist.description'
import { description as celGlassBone } from './cel-glass-bone.description'
import { description as celGlassOrchid } from './cel-glass-orchid.description'

export const descriptions: Partial<Record<PaletteId, StyleDescription>> = {
  aaa,
  academic,
  'apothecary-herbarium': apothecaryHerbarium,
  'celadon-glaze': celadonGlaze,
  'e-ink-carta': eInkCarta,
  'iridescent-opal': iridescentOpal,
  'origami-fold': origamiFold,
  'salt-flats': saltFlats,
  'sea-glass': seaGlass,
  'silver-daguerreotype': silverDaguerreotype,
  'sugar-paper-chalk': sugarPaperChalk,
  'whitewash-aegean': whitewashAegean,
  'aero-glass': aeroGlass,
  'art-deco': artDeco,
  'art-deco-ivory': artDecoIvory,
  'cel-shaded-nouveau-glass': celShadedNouveauGlass,
  'cel-shaded-botanical-glass': celShadedBotanicalGlass,
  'cel-shaded-constructivist-glass': celShadedConstructivistGlass,
  'cel-shaded-academia-glass': celShadedAcademiaGlass,
  'cel-shaded-dracula-crt': celShadedDraculaCrt,
  'cel-shaded-gruvbox-crt': celShadedGruvboxCrt,
  'cel-shaded-monokai-crt': celShadedMonokaiCrt,
  'cel-shaded-nord-crt': celShadedNordCrt,
  'cel-shaded-solarized-crt': celShadedSolarizedCrt,
  'cel-shaded-ukiyo-glass': celShadedUkiyoGlass,
  aurora,
  bauhaus,
  blueprint,
  'brutalist-elegant': brutalistElegant,
  'bullet-train-day': bulletTrainDay,
  'cardstock-layered': cardstockLayered,
  'cel-shaded-citrus': celShadedCitrus,
  'cel-shaded-kawaii': celShadedKawaii,
  'cel-shaded-mecha': celShadedMecha,
  'cel-shaded-sakura': celShadedSakura,
  'cel-shaded-shojo': celShadedShojo,
  'cel-shaded-shonen': celShadedShonen,
  'cel-glass-frost': celGlassFrost,
  'cel-glass-noir': celGlassNoir,
  'cel-glass-sunset': celGlassSunset,
  'cel-glass-mist': celGlassMist,
  'cel-glass-bone': celGlassBone,
  'cel-glass-orchid': celGlassOrchid,
  'citrus-spark': citrusSpark,
  claymorphism,
  'coastal-modern': coastalModern,
  'crt-phosphor-amber': crtPhosphorAmber,
  'crt-phosphor-green': crtPhosphorGreen,
  'crt-phosphor-greenbar': crtPhosphorGreenbar,
  'cyberpunk-neon-noir': cyberpunkNeonNoir,
  'data-dense-light': dataDenseLight,
  'desert-modernism': desertModernism,
  'dieter-rams': dieterRams,
  editorial,
  'financial-terminal': financialTerminal,
  'flat-classic': flatClassic,
  'frutiger-aero': frutigerAero,
  glassmorphism,
  'graffiti-marble': graffitiMarble,
  'heritage-maritime': heritageMaritime,
  'industrial-light': industrialLight,
  'lavender-dawn': lavenderDawn,
  letterpress,
  'linear-workspace': linearWorkspace,
  'liquid-glass-dark': liquidGlassDark,
  'liquid-glass-light': liquidGlassLight,
  'mall-goth': mallGoth,
  'marble-royal-flat': marbleRoyalFlat,
  material,
  'memphis-80s': memphis80s,
  'metro-light': metroLight,
  'mid-century-modern': midCenturyModern,
  'mocha-latte': mochaLatte,
  'modern-royal': modernRoyal,
  'neo-bubblegum': neoBubblegum,
  'neo-citrus': neoCitrus,
  'neo-grape': neoGrape,
  'neo-tangerine': neoTangerine,
  neubrutalism,
  neumorphism,
  newspaper,
  'nordic-frost': nordicFrost,
  'paper-pop': paperPop,
  'pixel-art-cottagecore': pixelArtCottagecore,
  'pixel-art-gameboy': pixelArtGameboy,
  'pixel-art-hyperlight': pixelArtHyperlight,
  'pixel-art-nes': pixelArtNes,
  'pixel-art-pico8': pixelArtPico8,
  'pixel-art-snes': pixelArtSnes,
  risograph,
  'sage-studio': sageStudio,
  'scandinavian-royal-modern': scandinavianRoyalModern,
  'sketch-marker': sketchMarker,
  skeuomorphism,
  'soft-pastel': softPastel,
  solarpunk,
  'stained-glass': stainedGlass,
  'stone-modern': stoneModern,
  'studio-confetti': studioConfetti,
  'swiss-international': swissInternational,
  'terminal-tui': terminalTui,
  'terminal-tui-paper': terminalTuiPaper,
  'tokyo-day': tokyoDay,
  'tron-dark-neon': tronDarkNeon,
  'tron-light-grid': tronLightGrid,
  vaporwave,
  'vercel-geist': vercelGeist,
  whiteprint,
  wikipedia,
  'zen-sumie': zenSumie,
}

export type DescribedPaletteId = keyof typeof descriptions
