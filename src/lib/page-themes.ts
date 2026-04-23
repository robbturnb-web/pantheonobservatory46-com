/**
 * Page-specific themes for the Dossier system.
 * Each theme defines a color palette and atmospheric flourishes
 * for a themed "case file" page (Antarctica, Atlantis, AARO, etc.).
 *
 * All effects gated behind `lg:` breakpoint in components — mobile gets clean cards.
 */

export type AtmosphereId =
  | 'frost'        // Antarctica — snow particles + frostbite vignette
  | 'caustic'      // Atlantis — underwater caustic ripples
  | 'redaction'    // AARO — redaction bars + classified stamps
  | 'blueprint'    // Crash Retrieval / Builders — blueprint grid
  | 'subterranean' // Underground Bases — ember + cross-section lines
  | 'typewriter'   // Entity Encounters — interview transcript
  | 'museum'       // Extinct Species — bone white taxonomy plates
  | 'collider'     // CERN — hex grid + oscilloscope HUD
  | 'embassy'      // Galactic Federation — gold seal + indigo
  | 'papyrus'      // Glyphs Codex — papyrus + ink
  | 'dig'          // Stone Faces — dust + sepia
  ;

export interface PageTheme {
  id: string;
  name: string;
  tagline: string;
  classificationLabel: string;       // e.g. "TOP SECRET // ANTARCTIC OPS"
  atmosphere: AtmosphereId;
  /** Background gradient for the page (CSS gradient string). */
  pageBg: string;
  /** Hero overlay gradient. */
  heroOverlay: string;
  /** Primary accent color (HEX). */
  accent: string;
  /** Secondary accent color (HEX). */
  accentAlt: string;
  /** Text color on hero. */
  heroFg: string;
  /** Card surface tint. */
  cardSurface: string;
  /** Border color for cards. */
  cardBorder: string;
  /** Optional display font family. */
  fontFamily?: string;
  /** Stamp color (the [CLASSIFIED] / [DECLASSIFIED] watermark). */
  stampColor: string;
}

export const pageThemes = {
  antarctica: {
    id: 'antarctica',
    name: 'Antarctica Files',
    tagline: 'Ice-station expedition log · Operation Highjump archive',
    classificationLabel: 'CLASSIFIED // ANTARCTIC OPS',
    atmosphere: 'frost',
    pageBg: 'linear-gradient(180deg, #0a1929 0%, #0d2540 40%, #061625 100%)',
    heroOverlay:
      'radial-gradient(ellipse at top, rgba(186, 230, 253, 0.18) 0%, transparent 60%), linear-gradient(180deg, rgba(8, 25, 50, 0.4) 0%, rgba(6, 22, 37, 0.95) 100%)',
    accent: '#7dd3fc',
    accentAlt: '#e0f2fe',
    heroFg: '#f0f9ff',
    cardSurface: 'rgba(14, 36, 64, 0.7)',
    cardBorder: 'rgba(125, 211, 252, 0.25)',
    fontFamily: "'Space Mono', monospace",
    stampColor: '#bae6fd',
  },
  atlantis: {
    id: 'atlantis',
    name: 'Atlantis',
    tagline: 'Submerged ruins · Lost civilization dossier',
    classificationLabel: 'BATHYMETRIC SURVEY // RESTRICTED',
    atmosphere: 'caustic',
    pageBg: 'linear-gradient(180deg, #021a1f 0%, #033f48 50%, #001a1f 100%)',
    heroOverlay:
      'radial-gradient(ellipse at center, rgba(45, 212, 191, 0.22) 0%, transparent 65%), linear-gradient(180deg, rgba(2, 26, 31, 0.3) 0%, rgba(0, 26, 31, 0.95) 100%)',
    accent: '#5eead4',
    accentAlt: '#fbbf24',
    heroFg: '#ecfeff',
    cardSurface: 'rgba(3, 50, 60, 0.7)',
    cardBorder: 'rgba(94, 234, 212, 0.3)',
    fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
    stampColor: '#5eead4',
  },
  aaro: {
    id: 'aaro',
    name: 'AARO Watch',
    tagline: 'All-domain Anomaly Resolution Office · Pentagon briefing',
    classificationLabel: 'UNCLASSIFIED // FOUO',
    atmosphere: 'redaction',
    pageBg: 'linear-gradient(180deg, #1a1611 0%, #25201a 50%, #14110d 100%)',
    heroOverlay:
      'linear-gradient(180deg, rgba(26, 22, 17, 0.4) 0%, rgba(20, 17, 13, 0.95) 100%)',
    accent: '#fbbf24',
    accentAlt: '#fde68a',
    heroFg: '#fef3c7',
    cardSurface: 'rgba(37, 32, 26, 0.75)',
    cardBorder: 'rgba(251, 191, 36, 0.25)',
    fontFamily: "'Space Mono', monospace",
    stampColor: '#dc2626',
  },
  crash: {
    id: 'crash',
    name: 'Crash Retrieval',
    tagline: 'Black-program recovery vault · Reverse engineering archive',
    classificationLabel: 'TOP SECRET // SAP // NOFORN',
    atmosphere: 'blueprint',
    pageBg: 'linear-gradient(180deg, #0c0a09 0%, #1c1917 50%, #0a0908 100%)',
    heroOverlay:
      'radial-gradient(ellipse at top, rgba(245, 158, 11, 0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(12, 10, 9, 0.3) 0%, rgba(10, 9, 8, 0.95) 100%)',
    accent: '#f59e0b',
    accentAlt: '#fbbf24',
    heroFg: '#fef3c7',
    cardSurface: 'rgba(28, 25, 23, 0.8)',
    cardBorder: 'rgba(245, 158, 11, 0.25)',
    fontFamily: "'Space Mono', monospace",
    stampColor: '#dc2626',
  },
  underground: {
    id: 'underground',
    name: 'Underground Bases',
    tagline: 'Subterranean schematic · DUMB classification',
    classificationLabel: 'COMPARTMENTED // SCI',
    atmosphere: 'subterranean',
    pageBg: 'linear-gradient(180deg, #0a0606 0%, #2a1206 50%, #0a0404 100%)',
    heroOverlay:
      'radial-gradient(ellipse at bottom, rgba(234, 88, 12, 0.18) 0%, transparent 60%), linear-gradient(180deg, rgba(10, 6, 6, 0.4) 0%, rgba(10, 4, 4, 0.95) 100%)',
    accent: '#fb923c',
    accentAlt: '#fdba74',
    heroFg: '#fff7ed',
    cardSurface: 'rgba(42, 18, 6, 0.75)',
    cardBorder: 'rgba(251, 146, 60, 0.25)',
    fontFamily: "'Space Mono', monospace",
    stampColor: '#fb923c',
  },
  encounters: {
    id: 'encounters',
    name: 'Entity Encounters',
    tagline: 'Witness interview transcripts · Field testimony',
    classificationLabel: 'WITNESS LOG // VERIFIED INTERVIEW',
    atmosphere: 'typewriter',
    pageBg: 'linear-gradient(180deg, #1a0e0e 0%, #2d1414 50%, #150a0a 100%)',
    heroOverlay:
      'radial-gradient(ellipse at top, rgba(220, 38, 38, 0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(26, 14, 14, 0.4) 0%, rgba(21, 10, 10, 0.95) 100%)',
    accent: '#ef4444',
    accentAlt: '#fca5a5',
    heroFg: '#fee2e2',
    cardSurface: 'rgba(45, 20, 20, 0.78)',
    cardBorder: 'rgba(239, 68, 68, 0.3)',
    fontFamily: "'Space Mono', monospace",
    stampColor: '#dc2626',
  },
  extinct: {
    id: 'extinct',
    name: 'Extinct Species',
    tagline: 'Natural-history exhibit · Cryptid taxonomy',
    classificationLabel: 'PALEO-ARCHIVE // EXHIBIT 7',
    atmosphere: 'museum',
    pageBg: 'linear-gradient(180deg, #1a1812 0%, #2a261c 50%, #14120c 100%)',
    heroOverlay:
      'radial-gradient(ellipse at top, rgba(214, 184, 142, 0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(26, 24, 18, 0.4) 0%, rgba(20, 18, 12, 0.95) 100%)',
    accent: '#d6b88e',
    accentAlt: '#fde68a',
    heroFg: '#fef3c7',
    cardSurface: 'rgba(42, 38, 28, 0.78)',
    cardBorder: 'rgba(214, 184, 142, 0.3)',
    fontFamily: "'Cormorant Garamond', serif",
    stampColor: '#a16207',
  },
  cern: {
    id: 'cern',
    name: 'CERN Watch',
    tagline: 'Particle collider control room · LHC anomaly log',
    classificationLabel: 'EXPERIMENTAL // OBSERVATION FEED',
    atmosphere: 'collider',
    pageBg: 'linear-gradient(180deg, #050015 0%, #100530 50%, #03000f 100%)',
    heroOverlay:
      'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.18) 0%, transparent 60%), linear-gradient(180deg, rgba(5, 0, 21, 0.3) 0%, rgba(3, 0, 15, 0.95) 100%)',
    accent: '#22d3ee',
    accentAlt: '#e879f9',
    heroFg: '#cffafe',
    cardSurface: 'rgba(16, 5, 48, 0.78)',
    cardBorder: 'rgba(34, 211, 238, 0.28)',
    fontFamily: "'Space Mono', monospace",
    stampColor: '#22d3ee',
  },
  federation: {
    id: 'federation',
    name: 'Galactic Federation',
    tagline: 'Diplomatic treaty hall · Council records',
    classificationLabel: 'EMBASSY ARCHIVE // SEALED',
    atmosphere: 'embassy',
    pageBg: 'linear-gradient(180deg, #0c0420 0%, #1e0a47 50%, #08021a 100%)',
    heroOverlay:
      'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(12, 4, 32, 0.3) 0%, rgba(8, 2, 26, 0.95) 100%)',
    accent: '#fbbf24',
    accentAlt: '#a78bfa',
    heroFg: '#faf5ff',
    cardSurface: 'rgba(30, 10, 71, 0.78)',
    cardBorder: 'rgba(251, 191, 36, 0.3)',
    fontFamily: "'Cormorant Garamond', serif",
    stampColor: '#fbbf24',
  },
  builders: {
    id: 'builders',
    name: "Builder's Arena",
    tagline: 'Architect drafting board · Megalith engineering',
    classificationLabel: 'STRUCTURAL ARCHIVE // DRAFTING ROOM',
    atmosphere: 'blueprint',
    pageBg: 'linear-gradient(180deg, #051831 0%, #082f5e 50%, #03132a 100%)',
    heroOverlay:
      'radial-gradient(ellipse at top, rgba(96, 165, 250, 0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(5, 24, 49, 0.3) 0%, rgba(3, 19, 42, 0.95) 100%)',
    accent: '#60a5fa',
    accentAlt: '#bfdbfe',
    heroFg: '#dbeafe',
    cardSurface: 'rgba(8, 47, 94, 0.78)',
    cardBorder: 'rgba(96, 165, 250, 0.3)',
    fontFamily: "'Space Mono', monospace",
    stampColor: '#60a5fa',
  },
  glyphs: {
    id: 'glyphs',
    name: 'Glyphs Codex',
    tagline: 'Cuneiform & sigil archive · Comparative scripts',
    classificationLabel: 'CODEX FRAGMENT // INK ON PAPYRUS',
    atmosphere: 'papyrus',
    pageBg: 'linear-gradient(180deg, #1a1206 0%, #2d1f0d 50%, #14100a 100%)',
    heroOverlay:
      'radial-gradient(ellipse at top, rgba(217, 169, 99, 0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(26, 18, 6, 0.4) 0%, rgba(20, 16, 10, 0.95) 100%)',
    accent: '#d9a963',
    accentAlt: '#fcd34d',
    heroFg: '#fef3c7',
    cardSurface: 'rgba(45, 31, 13, 0.78)',
    cardBorder: 'rgba(217, 169, 99, 0.3)',
    fontFamily: "'Cormorant Garamond', serif",
    stampColor: '#a16207',
  },
  stoneFaces: {
    id: 'stoneFaces',
    name: 'Stone Faces',
    tagline: 'Field-archaeology dig site · Megalith faces',
    classificationLabel: 'EXCAVATION LOG // SITE SURVEY',
    atmosphere: 'dig',
    pageBg: 'linear-gradient(180deg, #1a1410 0%, #2d2218 50%, #14100c 100%)',
    heroOverlay:
      'radial-gradient(ellipse at top, rgba(180, 140, 90, 0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(26, 20, 16, 0.4) 0%, rgba(20, 16, 12, 0.95) 100%)',
    accent: '#b48c5a',
    accentAlt: '#fef3c7',
    heroFg: '#fef3c7',
    cardSurface: 'rgba(45, 34, 24, 0.78)',
    cardBorder: 'rgba(180, 140, 90, 0.3)',
    fontFamily: "'Cormorant Garamond', serif",
    stampColor: '#a16207',
  },
} as const satisfies Record<string, PageTheme>;

export type PageThemeId = keyof typeof pageThemes;
