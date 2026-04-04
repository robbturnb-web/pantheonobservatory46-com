export interface TimelineEntry {
  id: string;
  era: string;
  year: string;
  title: string;
  description: string;
  category: 'ancient' | 'medieval' | 'modern' | 'recent';
  significance: 'high' | 'medium' | 'low';
  sourceLabel?: string;
  sourceUrl?: string;
}

export const timelineEntries: TimelineEntry[] = [
  { id: '1', era: '~300,000 BCE', year: '-300000', title: 'Anatomically Modern Humans', description: 'Homo sapiens emerge in Africa. Archaeological record shows sudden cognitive leap — abstract art, symbolic thinking, complex language.', category: 'ancient', significance: 'high', sourceLabel: 'Smithsonian — Human Origins', sourceUrl: 'https://humanorigins.si.edu/evidence/human-fossils/species/homo-sapiens' },
  { id: '2', era: '~12,000 BCE', year: '-12000', title: 'Göbekli Tepe', description: "The world's oldest known megastructure is built in modern-day Turkey — 6,000 years before Stonehenge. Carved pillars depict animals and symbols. No city, no agriculture found nearby. Who built it, and why?", category: 'ancient', significance: 'high', sourceLabel: 'Smithsonian — Göbekli Tepe', sourceUrl: 'https://www.smithsonianmag.com/history/gobekli-tepe-the-worlds-first-temple-83613665/' },
  { id: '3', era: '~10,500 BCE', year: '-10500', title: 'The Younger Dryas Impact Event', description: 'Evidence of a cosmic impact or series of impacts triggers 1,200 years of rapid cooling, megafauna extinction, and possibly the end of an advanced pre-flood civilization.', category: 'ancient', significance: 'high', sourceLabel: 'PNAS — Younger Dryas Impact', sourceUrl: 'https://www.pnas.org/doi/10.1073/pnas.1507146112' },
  { id: '4', era: '~3100 BCE', year: '-3100', title: 'Sumerian Civilization', description: 'The first known writing system, legal code, astronomy, mathematics, and cosmology emerge simultaneously in Sumer. Cuneiform tablets describe planetary knowledge requiring telescopes to verify.', category: 'ancient', significance: 'high', sourceLabel: 'British Museum — Sumer', sourceUrl: 'https://www.britishmuseum.org/collection/term/x32624' },
  { id: '5', era: '~2560 BCE', year: '-2560', title: 'Great Pyramid of Giza', description: "The most precisely engineered structure in human history is completed. Aligned to true north within 3/60th of a degree.", category: 'ancient', significance: 'high', sourceLabel: 'National Geographic — Giza', sourceUrl: 'https://www.nationalgeographic.com/history/article/giza-pyramids' },
  { id: '6', era: '1440s', year: '1440', title: 'Gutenberg Press & Suppressed Knowledge', description: 'The printing press democratizes information — and immediately triggers systematic book burning, inquisition, and control of the narrative by the Church.', category: 'medieval', significance: 'medium', sourceLabel: 'Wikipedia — Gutenberg', sourceUrl: 'https://en.wikipedia.org/wiki/Gutenberg_Bible' },
  { id: '7', era: '1947', year: '1947', title: 'Roswell and the Birth of Secrecy', description: 'A crash near Roswell triggers the modern UFO era. Within 24 hours, the U.S. military retracts its own press release. The National Security Act of 1947 creates the CIA.', category: 'modern', significance: 'high', sourceLabel: 'Roswell Incident — Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Roswell_incident' },
  { id: '8', era: '1952', year: '1952', title: 'Washington D.C. UFO Flap', description: 'UFOs fly directly over the U.S. Capitol, tracked on multiple radar systems, witnessed by pilots and air traffic controllers.', category: 'modern', significance: 'high', sourceLabel: 'Project Blue Book Archives', sourceUrl: 'https://www.archives.gov/research/military/air-force/ufos' },
  { id: '9', era: '1972–1995', year: '1972', title: 'Project Stargate', description: 'The U.S. government funds a 23-year classified program to weaponize psychic abilities. Remote viewers produce operationally actionable intelligence.', category: 'modern', significance: 'high', sourceLabel: 'CIA — Stargate Declassified', sourceUrl: 'https://www.cia.gov/readingroom/collection/stargate' },
  { id: '10', era: '2017', year: '2017', title: 'Pentagon UAP Disclosure Begins', description: 'The New York Times publishes the first mainstream acknowledgment of a secret Pentagon UAP program (AATIP). Three declassified videos confirm encounters that defy known physics.', category: 'recent', significance: 'high', sourceLabel: 'NYT — Pentagon UFO Program', sourceUrl: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html' },
  { id: '11', era: '2023', year: '2023', title: 'Congressional UAP Hearings', description: 'David Grusch testifies under oath that the U.S. government possesses non-human intelligence craft and biologics.', category: 'recent', significance: 'high', sourceLabel: 'C-SPAN — Full Hearing', sourceUrl: 'https://www.c-span.org/video/?529499-1/hearing-unidentified-anomalous-phenomena' },
];
