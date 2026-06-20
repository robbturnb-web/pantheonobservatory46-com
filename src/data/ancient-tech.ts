export interface AncientTech {
  id: string;
  name: string;
  civilization: string;
  era: string;
  type: string;
  summary: string;
  whyItMatters: string;
  trust: 'VERIFIED_FACT' | 'HISTORICAL_RECORD' | 'SPECULATIVE' | 'MYTH_LORE';
  source: string;
  sourceUrl?: string;
}

export const ancientTechnologies: AncientTech[] = [
  { id: 'antikythera', name: 'Antikythera Mechanism', civilization: 'Hellenistic Greece', era: '~150–100 BCE', type: 'Analog Computer',
    summary: 'A 2,000-year-old geared device that predicted eclipses, lunar phases, and planetary positions — the world\'s first known analog computer.',
    whyItMatters: 'Its precision implies a much older engineering tradition we have not yet found.',
    trust: 'VERIFIED_FACT', source: 'National Archaeological Museum, Athens', sourceUrl: 'https://www.namuseum.gr' },
  { id: 'roman-concrete', name: 'Roman Concrete (Opus Caementicium)', civilization: 'Roman Empire', era: '300 BCE – 476 CE', type: 'Material Science',
    summary: 'Seawater-resistant concrete that grows stronger over centuries through pozzolanic and lime-clast self-healing reactions.',
    whyItMatters: 'Modern Portland cement still cannot match its 2,000-year durability.',
    trust: 'VERIFIED_FACT', source: 'MIT Materials Research · 2023', sourceUrl: 'https://news.mit.edu/2023/roman-concrete-durability-lime-casts-0106' },
  { id: 'damascus-steel', name: 'Damascus Steel', civilization: 'Near East / India', era: '~300 BCE – 1750 CE', type: 'Metallurgy',
    summary: 'Wootz crucible steel forged into blades with carbon-nanotube structures and surface patterns we still cannot fully reproduce.',
    whyItMatters: 'Nanostructured steel produced before microscopy existed.',
    trust: 'HISTORICAL_RECORD', source: 'Nature — Carbon Nanotubes in Damascus Sabres', sourceUrl: 'https://www.nature.com/articles/444286a' },
  { id: 'baghdad-battery', name: 'Baghdad Battery', civilization: 'Parthian / Sassanid Persia', era: '~250 BCE – 250 CE', type: 'Electrochemistry',
    summary: 'Clay jar with copper cylinder and iron rod that, filled with acid, produces ~1 volt of current.',
    whyItMatters: 'Function still debated — electroplating, ritual object, or experiment?',
    trust: 'SPECULATIVE', source: 'National Museum of Iraq' },
  { id: 'nazca-lines', name: 'Nazca Lines', civilization: 'Nazca Culture, Peru', era: '500 BCE – 500 CE', type: 'Geoglyphs / Cartography',
    summary: 'Hundreds of massive figures and lines etched into the Peruvian desert, only fully visible from the air.',
    whyItMatters: 'Geometric precision and aerial-only legibility remain unexplained.',
    trust: 'VERIFIED_FACT', source: 'UNESCO World Heritage', sourceUrl: 'https://whc.unesco.org/en/list/700/' },
  { id: 'polynesian-nav', name: 'Polynesian Wayfinding', civilization: 'Polynesian Voyagers', era: '~1500 BCE – present', type: 'Open-Ocean Navigation',
    summary: 'Stick charts, star compasses, swell-reading, and bird flight used to navigate 10,000 km of open Pacific without instruments.',
    whyItMatters: 'Pre-modern humans colonized 1/3 of Earth\'s surface using observation alone.',
    trust: 'VERIFIED_FACT', source: 'Polynesian Voyaging Society', sourceUrl: 'https://www.hokulea.com' },
  { id: 'pyramid-engineering', name: 'Pyramid Engineering — Giza', civilization: 'Old Kingdom Egypt', era: '~2580–2560 BCE', type: 'Megalithic Construction',
    summary: '2.3 million stone blocks averaging 2.5 tons each, aligned to true north within 3/60° of a degree.',
    whyItMatters: 'Construction logistics still produce credible debate among engineers and archaeologists.',
    trust: 'HISTORICAL_RECORD', source: 'National Geographic — Giza', sourceUrl: 'https://www.nationalgeographic.com/history/article/giza-pyramids' },
  { id: 'megalithic-stonework', name: 'Megalithic Polygonal Masonry', civilization: 'Inca / Pre-Inca / Global', era: 'Unknown – 1500 CE', type: 'Stone Joinery',
    summary: 'Mortarless polygonal blocks at Sacsayhuamán, Puma Punku, and Cusco fit so tightly a razor blade cannot pass between them.',
    whyItMatters: 'The methods used to shape and lift these stones are still disputed.',
    trust: 'SPECULATIVE', source: 'UNESCO — Cusco', sourceUrl: 'https://whc.unesco.org/en/list/273/' },
];
