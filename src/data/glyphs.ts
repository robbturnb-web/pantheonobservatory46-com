// Curated ancient glyphs — culture, era, literal meaning, ET interpretation
export interface Glyph {
  id: string;
  name: string;
  culture: string;
  era: string;
  glyph: string;       // Unicode rendering (used as visual stand-in for the symbol)
  meaning: string;
  etInterpretation: string;
  tags: string[];
}

export const GLYPHS: Glyph[] = [
  {
    id: 'sumerian-an',
    name: 'AN — Sky / Heaven',
    culture: 'Sumerian',
    era: '~3200 BCE',
    glyph: '𒀭',
    meaning: 'Determinative for "deity" — placed before names of the Anunnaki.',
    etInterpretation: 'Sky-being marker. The eight-pointed star indicates "those who came from above".',
    tags: ['sumerian', 'anunnaki', 'sky'],
  },
  {
    id: 'egyptian-ankh',
    name: 'Ankh — Key of Life',
    culture: 'Egyptian',
    era: '~3000 BCE',
    glyph: '☥',
    meaning: 'Eternal life. Held by gods to bestow vitality.',
    etInterpretation: 'Stylized antenna or DNA loop — energy-transfer device depicted in temple reliefs.',
    tags: ['egyptian', 'energy', 'life'],
  },
  {
    id: 'egyptian-eye-horus',
    name: 'Eye of Horus',
    culture: 'Egyptian',
    era: '~2500 BCE',
    glyph: '𓂀',
    meaning: 'Protection, royal power, healing. Mathematical fractions encoded.',
    etInterpretation: 'Pineal gland cross-section — third-eye activation symbol.',
    tags: ['egyptian', 'pineal', 'consciousness'],
  },
  {
    id: 'mayan-hunab-ku',
    name: 'Hunab Ku',
    culture: 'Mayan',
    era: '~600 CE',
    glyph: '◐',
    meaning: 'The single god, center of the galaxy.',
    etInterpretation: 'Galactic center marker — Mayans tracked precession to 26,000 years.',
    tags: ['mayan', 'galactic'],
  },
  {
    id: 'vinca-symbol',
    name: 'Vinča Sign',
    culture: 'Vinča (Balkans)',
    era: '~5500 BCE',
    glyph: '⨯',
    meaning: 'Pre-cuneiform proto-writing. ~700 distinct glyphs catalogued.',
    etInterpretation: 'Oldest known writing system. Origin disputed — may predate Sumerian by millennia.',
    tags: ['vinca', 'proto-writing'],
  },
  {
    id: 'indus-unicorn',
    name: 'Indus Unicorn Seal',
    culture: 'Indus Valley',
    era: '~2600 BCE',
    glyph: '✶',
    meaning: 'Undeciphered. Found on thousands of trade seals.',
    etInterpretation: 'Possibly a clan glyph or astronomical reference — Indus script remains unread.',
    tags: ['indus', 'undeciphered'],
  },
  {
    id: 'crop-circle-julia',
    name: 'Julia Set Crop Formation',
    culture: 'Modern phenomenon',
    era: '1996 CE — Stonehenge',
    glyph: '🌀',
    meaning: 'Mathematical fractal appearing overnight in wheat.',
    etInterpretation: 'Counter-rotating Julia spiral — too geometrically precise for human hoax. Plant nodes show microwave-style stem bending.',
    tags: ['crop-circle', 'modern', 'fractal'],
  },
  {
    id: 'norse-vegvisir',
    name: 'Vegvísir — Path Finder',
    culture: 'Norse / Icelandic',
    era: '~1600 CE',
    glyph: '✴',
    meaning: 'Compass to find one\'s way through storms.',
    etInterpretation: 'Eight-armed star map — possibly stellar navigation chart.',
    tags: ['norse', 'navigation'],
  },
  {
    id: 'flower-of-life',
    name: 'Flower of Life',
    culture: 'Cross-cultural',
    era: '~600 BCE — Osirion temple, Egypt',
    glyph: '✿',
    meaning: 'Sacred geometry — overlapping circles forming hexagonal lattice.',
    etInterpretation: 'Encodes Platonic solids, blueprint of biological cell division. Found burned into Osirion granite walls without tooling.',
    tags: ['sacred-geometry', 'cross-cultural'],
  },
  {
    id: 'aboriginal-wandjina',
    name: 'Wandjina',
    culture: 'Aboriginal Australian',
    era: '~4000 BCE',
    glyph: '◉',
    meaning: 'Sky beings who created the land. No mouth. Halo around head.',
    etInterpretation: 'Helmeted figures with large dark eyes — common across Kimberley rock art.',
    tags: ['aboriginal', 'sky-beings'],
  },
  {
    id: 'dogon-sirius',
    name: 'Dogon Sirius Diagram',
    culture: 'Dogon (Mali)',
    era: 'pre-1500 CE',
    glyph: '◎',
    meaning: 'Sirius A and invisible Sirius B with elliptical orbit.',
    etInterpretation: 'Knowledge of Sirius B (only confirmed by telescope in 1862) attributed to "Nommo" amphibious teachers.',
    tags: ['dogon', 'sirius', 'nommo'],
  },
  {
    id: 'olmec-were-jaguar',
    name: 'Were-Jaguar',
    culture: 'Olmec',
    era: '~1200 BCE',
    glyph: '⟁',
    meaning: 'Half-human, half-jaguar deity. Cleft head, downturned mouth.',
    etInterpretation: 'Possible hybrid-being motif — predates Mesoamerican cultures.',
    tags: ['olmec', 'hybrid'],
  },
];
