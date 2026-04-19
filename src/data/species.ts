import type { EvidenceGrade } from '../types';

// Species portrait imports — cosmic horror / esoteric style
import greysImg from '../assets/species/greys.jpg';
import reptiliansImg from '../assets/species/reptilians.jpg';
import draconiansImg from '../assets/species/draconians.jpg';
import pleiadiansImg from '../assets/species/pleiadians.jpg';
import arcturiansImg from '../assets/species/arcturians.jpg';
import siriansImg from '../assets/species/sirians.jpg';
import andromedansImg from '../assets/species/andromedans.jpg';
import lyransImg from '../assets/species/lyrans.jpg';
import mantidsImg from '../assets/species/mantids.jpg';
import anunnakiImg from '../assets/species/anunnaki.jpg';
import tallWhitesImg from '../assets/species/tall-whites.jpg';
import syntheticsImg from '../assets/species/synthetics.jpg';
import interdimensionalsImg from '../assets/species/interdimensionals.jpg';
import mexicoBodiesImg from '../assets/species/mexico-bodies.jpg';
import njDronesImg from '../assets/species/nj-drones.jpg';
import jellyfishImg from '../assets/species/jellyfish.jpg';

/** Maps species id → portrait image URL (imported as ES6 modules so Vite hashes them). */
export const speciesImages: Record<string, string> = {
  greys: greysImg,
  reptilians: reptiliansImg,
  draconians: draconiansImg,
  pleiadians: pleiadiansImg,
  arcturians: arcturiansImg,
  sirians: siriansImg,
  andromedans: andromedansImg,
  lyrans: lyransImg,
  mantids: mantidsImg,
  anunnaki: anunnakiImg,
  'tall-whites': tallWhitesImg,
  synthetics: syntheticsImg,
  interdimensionals: interdimensionalsImg,
  'mexico-bodies': mexicoBodiesImg,
  'nj-drones': njDronesImg,
  jellyfish: jellyfishImg,
};

export type SpeciesClassification =
  | 'biological'
  | 'reptilian'
  | 'insectoid'
  | 'synthetic'
  | 'interdimensional'
  | 'humanoid'
  | 'ancient-engineer';

export type ThreatLevel =
  | 'observer'
  | 'benevolent'
  | 'neutral'
  | 'predator'
  | 'unknown';

export interface Species {
  id: string;
  name: string;
  aliases: string[];
  symbol: string;
  classification: SpeciesClassification;
  origin: string;
  appearance: string;
  motives: string;
  viewOfHumans: string;
  threatLevel: ThreatLevel;
  evidenceGrade: EvidenceGrade;
  summary: string;
  keyTraits: string[];
  /** Optional locked lore — gated by Adept rank in the UI */
  hiddenLore?: string;
  // Cross-links to existing case + whistleblower IDs
  keyCases: string[];
  keyWitnesses: string[];
  sources: { label: string; url: string }[];
  accentColor: string;
}

/**
 * Alien Species Codex
 * Each entry is sourced. Threat level + evidence grade reflect the weight
 * of public testimony, not editorial judgment.
 *
 * Editing: add new species here. `keyCases` references match `uap-cases.ts` IDs;
 * `keyWitnesses` references match `whistleblowers.ts` IDs.
 */
export const species: Species[] = [
  // ──────────────────────────────────────────────────────────────
  // BIOLOGICAL — the most reported phenotype
  // ──────────────────────────────────────────────────────────────
  {
    id: 'greys',
    name: 'Greys',
    aliases: ['Zeta Reticulans', 'Roswell Greys', 'EBE'],
    symbol: '👽',
    classification: 'biological',
    origin: 'Reportedly Zeta Reticuli binary system (39 ly).',
    appearance: '3.5–5 ft. Bulbous head, large black almond eyes, thin limbs, grey skin, no visible reproductive organs.',
    motives: 'Genetic harvesting, hybridization program, long-term observation of human consciousness.',
    viewOfHumans: 'A genetic resource. Detached, clinical — the way humans treat lab primates.',
    threatLevel: 'neutral',
    evidenceGrade: 'CREDIBLE',
    summary:
      'The most-reported non-human phenotype in modern abduction literature. Linked to Roswell, the Hill abduction, and ongoing hybridization claims by researchers like David Jacobs and Budd Hopkins.',
    keyTraits: [
      'Telepathic communication — no spoken language reported',
      'Hive-like behavior; "tall grey" leaders directing "short grey" workers',
      'Operate behind grey/black craft of multiple sizes',
      'Reported by 1000s of independent abductees with consistent details',
    ],
    keyCases: ['roswell', 'nimitz'],
    keyWitnesses: ['bob-lazar', 'phil-schneider'],
    sources: [
      { label: 'Betty & Barney Hill Abduction (1961)', url: 'https://en.wikipedia.org/wiki/Barney_and_Betty_Hill' },
      { label: 'Dr. David Jacobs — Walking Among Us', url: 'https://en.wikipedia.org/wiki/David_M._Jacobs' },
      { label: 'Travis Walton Case (1975)', url: 'https://en.wikipedia.org/wiki/Travis_Walton_incident' },
    ],
    accentColor: '#9ca3af',
  },

  {
    id: 'tall-whites',
    name: 'Tall Whites',
    aliases: ['Nordics-adjacent', 'Charles Hall Beings'],
    symbol: '👤',
    classification: 'biological',
    origin: 'Unspecified system; reportedly housed at Nellis AFB per witness Charles Hall.',
    appearance: '6–7 ft. Pale chalk-white skin, blonde hair, blue eyes, slender frame. Adults childlike in proportion.',
    motives: 'Trade and technology exchange with US military; rest stop on longer journeys.',
    viewOfHumans: 'Cautious and easily startled. Will respond aggressively if threatened.',
    threatLevel: 'neutral',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'Reported by USAF weather observer Charles Hall during 1965–67 service at Nellis Indian Springs Range. Claims of regular interaction with a small group of beings under formal military protocol.',
    keyTraits: [
      'Strict behavioral protocols — do not approach without invitation',
      'Reportedly fast-moving; can leap startling distances',
      'Children are highly curious about humans',
      'Operate cigar-shaped craft seen near Nevada test ranges',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: "Charles Hall — Millennial Hospitality series", url: 'https://en.wikipedia.org/wiki/Charles_Hall_(ufologist)' },
    ],
    accentColor: '#f5f5f4',
  },

  // ──────────────────────────────────────────────────────────────
  // REPTILIAN LINEAGE
  // ──────────────────────────────────────────────────────────────
  {
    id: 'reptilians',
    name: 'Reptilians',
    aliases: ['Saurians', 'Lizard People', 'Reptoids'],
    symbol: '🦎',
    classification: 'reptilian',
    origin: 'Disputed: some accounts say native to Earth (subterranean), others trace to Alpha Draconis.',
    appearance: '6–8 ft. Scaled skin, slit pupils, muscular build, often described in dark uniforms or robes.',
    motives: 'Control of human civilization through bloodline manipulation, finance, and energy harvesting (per researchers like Icke).',
    viewOfHumans: 'Livestock. A managed resource maintained for emotional/loosh energy and labor.',
    threatLevel: 'predator',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'Foot-soldier caste of the broader saurian lineage. Reported in abduction accounts as enforcers and overseers — distinct from the higher-status Draconians.',
    keyTraits: [
      'Frequently reported alongside Greys in abduction scenarios',
      'Associated with underground bases (Dulce, NM most famously)',
      'Linked in folklore to ancient serpent gods (Quetzalcoatl, Naga)',
      'Claimed shapeshifting ability in Icke and Lear traditions',
    ],
    keyCases: [],
    keyWitnesses: ['phil-schneider'],
    sources: [
      { label: "Phil Schneider — Dulce Base testimony", url: 'https://en.wikipedia.org/wiki/Dulce_Base' },
      { label: 'John Rhodes — Reptoid Research', url: 'https://www.reptoids.com/' },
    ],
    accentColor: '#16a34a',
  },

  {
    id: 'draconians',
    name: 'Draconians',
    aliases: ['Dracos', 'Alpha Draconians', 'Winged Serpents'],
    symbol: '🐉',
    classification: 'reptilian',
    origin: 'Alpha Draconis system (Thuban). The ruling caste of the saurian collective.',
    appearance: '7–14 ft. Reptilian, often winged, horned, with copper or red-tinged scales. Far larger and more imposing than common reptilians.',
    motives: 'Imperial control of multiple star systems; Earth viewed as occupied territory predating modern humanity.',
    viewOfHumans: 'A conquered species on a claimed world. Existence tolerated as long as it serves the hierarchy.',
    threatLevel: 'predator',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'The royal/warrior caste of the broader reptilian lineage. Distinct from foot-soldier Reptilians: Draconians are the commanders. Researchers split — Icke treats them as one continuum; contactees like Alex Collier describe them as a separate ruling species the Reptilians answer to.',
    keyTraits: [
      'Hierarchical: white royals, winged warriors, drone soldiers',
      'Claim ownership of Earth predating Annunaki involvement',
      'Reported as the architects of the "control system" (finance, religion, surveillance)',
      'Associated with dragon mythology across every continent',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Alex Collier — Andromedan testimony on Draconians', url: 'https://www.alexcollier.org/' },
      { label: 'Wikipedia: Reptilian conspiracy theory', url: 'https://en.wikipedia.org/wiki/Reptilian_conspiracy_theory' },
    ],
    accentColor: '#b91c1c',
  },

  // ──────────────────────────────────────────────────────────────
  // INSECTOID
  // ──────────────────────────────────────────────────────────────
  {
    id: 'mantids',
    name: 'Mantids',
    aliases: ['Praying Mantis Beings', 'Insectoids'],
    symbol: '🦗',
    classification: 'insectoid',
    origin: 'Unknown — reported as overseers in abduction scenarios involving Greys.',
    appearance: '6–8 ft. Mantis-like — triangular head, large wraparound eyes, long thin limbs, often robed.',
    motives: 'Spiritual guidance, soul-level interaction, oversight of hybridization programs.',
    viewOfHumans: 'Reverent, pedagogical. Treated as students or charges, not specimens.',
    threatLevel: 'benevolent',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'Reported as the highest-authority figures in many abduction accounts. Witnesses describe profound emotional and telepathic exchanges, often interpreted as a wisdom-keeper class.',
    keyTraits: [
      'Almost always experienced as wise elders',
      'Strong telepathic and empathic presence',
      'Frequently observed during DMT and ayahuasca journeys',
      'Linked to ancient Egyptian iconography (some researchers)',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Linda Moulton Howe — Mantis Encounters compilation', url: 'https://www.earthfiles.com/' },
      { label: 'DMT entity reports — Rick Strassman', url: 'https://en.wikipedia.org/wiki/Rick_Strassman' },
    ],
    accentColor: '#84cc16',
  },

  // ──────────────────────────────────────────────────────────────
  // ANCIENT ENGINEERS
  // ──────────────────────────────────────────────────────────────
  {
    id: 'anunnaki',
    name: 'Anunnaki',
    aliases: ['Nephilim', 'Sons of Anu', 'Sky Gods of Sumer'],
    symbol: '𒀭',
    classification: 'ancient-engineer',
    origin: 'Per Sitchin: Nibiru, a 3600-year-orbit body. Per Sumerian text: "those who from heaven to earth came."',
    appearance: '8–14 ft. Humanoid, bearded, often depicted with wings or winged disc, royal regalia.',
    motives: 'Originally gold extraction (per Sitchin); created humanity as labor; left behind religion and kingship.',
    viewOfHumans: 'Created beings. Some factions paternal, others exploitative — a divided lineage.',
    threatLevel: 'unknown',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'The Sumerian sky-gods. Mainstream archaeology treats them as mythology; Sitchin interpretation reads them as flesh-and-blood engineers who genetically authored Homo sapiens sapiens. Foundational to ancient astronaut theory.',
    keyTraits: [
      'Names preserved: Anu, Enki, Enlil, Inanna, Marduk',
      'Credited with the first cities, kingship, writing',
      'Possibly the source-template for later god-pantheons',
      'Some traditions report ongoing involvement; others say they departed',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Zecharia Sitchin — The 12th Planet', url: 'https://www.sitchin.com/' },
      { label: 'Sumerian King List (Oxford, ETCSL)', url: 'https://etcsl.orinst.ox.ac.uk/section2/tr211.htm' },
    ],
    accentColor: '#eab308',
  },

  // ──────────────────────────────────────────────────────────────
  // CONTACTEE / HUMANOID FAMILY
  // ──────────────────────────────────────────────────────────────
  {
    id: 'pleiadians',
    name: 'Pleiadians',
    aliases: ['Plejaren', 'Nordic Pleiadians'],
    symbol: '✨',
    classification: 'humanoid',
    origin: 'Pleiades cluster (M45, ~444 ly). Specifically the Plejaren system per Billy Meier.',
    appearance: '6–7 ft. Human-passing. Pale skin, blonde hair, blue eyes, refined features.',
    motives: 'Spiritual guardianship of human evolution; warnings about ecological and consciousness collapse.',
    viewOfHumans: 'Younger relatives. Genetic cousins on a parallel evolutionary track.',
    threatLevel: 'benevolent',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'The most prominent contactee species. Foundational to the New Age movement via Billy Meier (Switzerland), Barbara Marciniak, and others. Messages center on ecological warning, spiritual ascension, and non-interference protocols.',
    keyTraits: [
      'Operate beam-ships (Strahlschiffe in Meier accounts)',
      'Strict non-interference — "the Law of One"',
      'Emphasize meditation, frequency, and DNA activation',
      'Often confused with Tall Whites and Nordics',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: "Billy Meier Contact Notes (FIGU)", url: 'https://www.figu.org/' },
      { label: 'Barbara Marciniak — Bringers of the Dawn', url: 'https://en.wikipedia.org/wiki/Barbara_Marciniak' },
    ],
    accentColor: '#60a5fa',
  },

  {
    id: 'arcturians',
    name: 'Arcturians',
    aliases: ['Beings of Arcturus'],
    symbol: '🌟',
    classification: 'humanoid',
    origin: 'Arcturus system (Boötes constellation, 36.7 ly). Often described as the most spiritually advanced civilization in our galactic sector.',
    appearance: '3–4 ft. Greenish or bluish skin, large eyes, slender. Reportedly operate primarily as light-bodies.',
    motives: 'Healing, frequency calibration, energetic protection of Earth\'s ascension process.',
    viewOfHumans: 'Spiritual students. Treated with profound compassion and patience.',
    threatLevel: 'benevolent',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'A foundational contactee species in channeled literature. Edgar Cayce called Arcturus "the highest of the Earth\'s development" and a key transit point for souls. Associated with healing technology, geometry, and unconditional love.',
    keyTraits: [
      'Operate the "Arcturian Stargate" (per Cayce)',
      'Channeled extensively by Tom Kenyon, Norma Milanovich',
      'Associated with sacred geometry and sound healing',
      'Reportedly maintain a "lightship" near Earth',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Edgar Cayce — Arcturus readings', url: 'https://www.edgarcayce.org/' },
      { label: 'Norma Milanovich — We, The Arcturians', url: 'https://en.wikipedia.org/wiki/Arcturian' },
    ],
    accentColor: '#22d3ee',
  },

  {
    id: 'sirians',
    name: 'Sirians',
    aliases: ['Beings of Sirius', 'Dogon Nommo'],
    symbol: '🐺',
    classification: 'humanoid',
    origin: 'Sirius binary system (8.6 ly). Sirius A reportedly hosts humanoid civilizations; Sirius B linked to aquatic Nommo beings of Dogon tradition.',
    appearance: 'Two reported lines: tall blue-skinned humanoids (Sirius A) and amphibious Nommo (Sirius B).',
    motives: 'Architectural and esoteric knowledge transfer — credited with influence over Egyptian, Mayan, and Dogon civilizations.',
    viewOfHumans: 'Long-term tutors. Patient, technical, esoterically inclined.',
    threatLevel: 'benevolent',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'The Dogon tribe of Mali described Sirius B and its companion star centuries before modern astronomy confirmed them — citing the amphibious Nommo as their source. A cornerstone of ancient astronaut research (Robert Temple, The Sirius Mystery).',
    keyTraits: [
      'Tied to Egyptian Isis/Sothis cult and pyramid alignment',
      'Dogon astronomy predicted Sirius B before telescopes',
      'Two distinct phenotypes reported (humanoid + amphibian)',
      'Associated with mystery schools and initiation rites',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Robert Temple — The Sirius Mystery', url: 'https://en.wikipedia.org/wiki/The_Sirius_Mystery' },
      { label: 'Dogon people — Sirius cosmology', url: 'https://en.wikipedia.org/wiki/Dogon_people#Astronomical_beliefs' },
    ],
    accentColor: '#3b82f6',
  },

  {
    id: 'andromedans',
    name: 'Andromedans',
    aliases: ['Zenetaens', 'Council of Andromeda'],
    symbol: '🌌',
    classification: 'humanoid',
    origin: 'Andromeda Galaxy (M31, 2.5 million ly) and the Zenetaen system within it.',
    appearance: 'Multiple races. Reported phenotypes include blue-skinned humanoids (Alex Collier\'s contacts Vasais and Morenae).',
    motives: 'Galactic council oversight; whistleblowing on Draconian/Reptilian activity in the Sol system.',
    viewOfHumans: 'Allies-in-waiting. Concerned about Earth\'s capture by negative forces.',
    threatLevel: 'benevolent',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'Primarily known through Alex Collier, who reports decades of contact beginning in childhood. Andromedans are described as senior council members warning about Reptilian/Draconian influence over Earth\'s power structures.',
    keyTraits: [
      'Operate as a galactic council, not a single species',
      'Reportedly opposed to Draconian expansion',
      'Communicate primarily through telepathy',
      'Source of much modern "galactic federation" lore',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Alex Collier — Defending Sacred Ground', url: 'https://www.alexcollier.org/' },
      { label: 'Andromedan contactee compilation', url: 'https://en.wikipedia.org/wiki/Andromeda_Galaxy' },
    ],
    accentColor: '#a78bfa',
  },

  {
    id: 'lyrans',
    name: 'Lyrans',
    aliases: ['Felines of Lyra', 'The Original Humans', 'Vegans (of Vega)'],
    symbol: '🦁',
    classification: 'humanoid',
    origin: 'Lyra constellation — specifically the Vega system. Considered the original homeworld of the human genome in contactee literature.',
    appearance: 'Multiple sub-races: tall Caucasian-featured humanoids, redheaded Lyrans, and feline-featured beings (the "Cat People").',
    motives: 'Diaspora preservation. Lyrans seeded the Pleiades, Sirius, Andromeda, and Earth after their homeworld was destroyed.',
    viewOfHumans: 'Distant ancestors of all humanoid life. Earth seen as a re-seeded colony.',
    threatLevel: 'neutral',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'In channeled cosmology (Lyssa Royal, Robert Shapiro, Barbara Marciniak), Lyra is the origin point of the entire humanoid genome. A war with Reptilian forces is said to have destroyed the Lyran homeworld, scattering survivors across the galaxy — including to Earth.',
    keyTraits: [
      'Considered the "root race" of all humanoid civilizations',
      'Tall, fair, with red or blonde hair in most accounts',
      'Feline sub-race linked to Egyptian sphinx and lion iconography',
      'Their war with Reptilians frames the entire galactic conflict',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Lyssa Royal — The Prism of Lyra', url: 'https://www.lyssaroyal.net/' },
      { label: 'Barbara Marciniak — Pleiadian channeling on Lyra', url: 'https://en.wikipedia.org/wiki/Barbara_Marciniak' },
    ],
    accentColor: '#f97316',
  },

  // ──────────────────────────────────────────────────────────────
  // SYNTHETIC
  // ──────────────────────────────────────────────────────────────
  {
    id: 'synthetics',
    name: 'Synthetics',
    aliases: ['Drones', 'Biological Robots', 'Programmable Life Forms'],
    symbol: '🤖',
    classification: 'synthetic',
    origin: 'Manufactured — likely by Greys or other higher-order species.',
    appearance: 'Variable. Often Grey-like but with simpler facial features, no individuality, and uniform behavior.',
    motives: 'Task execution — sample collection, transport, surveillance.',
    viewOfHumans: 'No view. Programmed to interact, not interpret.',
    threatLevel: 'neutral',
    evidenceGrade: 'SPECULATIVE',
    summary:
      'Multiple researchers (Hopkins, Jacobs, Vallée) describe a class of beings that appear biological but behave as drones. Considered the labor force of the abduction phenomenon.',
    keyTraits: [
      'No autonomous decision-making observed',
      'Often performing repetitive tasks during abductions',
      'May explain the "doll-like" descriptions in some encounters',
      'Possibly the ones piloting smaller probe craft',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Jacques Vallée — Passport to Magonia', url: 'https://en.wikipedia.org/wiki/Jacques_Vall%C3%A9e' },
    ],
    accentColor: '#64748b',
  },

  // ──────────────────────────────────────────────────────────────
  // INTERDIMENSIONAL
  // ──────────────────────────────────────────────────────────────
  {
    id: 'interdimensionals',
    name: 'Interdimensionals',
    aliases: ['Ultraterrestrials', 'Trickster Entities', 'The Phenomenon'],
    symbol: '🌀',
    classification: 'interdimensional',
    origin: 'Adjacent dimensions / parallel reality structures, not deep space.',
    appearance: 'Shape-shifting. Reported as orbs, plasmoids, humanoid silhouettes, mythological creatures.',
    motives: 'Unknown. Possibly observation, possibly manipulation of human belief systems.',
    viewOfHumans: 'Subject of study and influence. Treated as participants in a long psychological experiment.',
    threatLevel: 'unknown',
    evidenceGrade: 'CREDIBLE',
    summary:
      'Jacques Vallée\'s thesis: the UFO phenomenon is not from another star system but from an overlapping reality. Same intelligence behind elves, fae, demons, gods, and modern UAP — adapting form to cultural context.',
    keyTraits: [
      'No consistent physical phenotype',
      'Behavior is theatrical, often absurd',
      'Strong correlation with altered states (DMT, NDE, deep meditation)',
      'May be the unifying frame for ALL contact phenomena',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Jacques Vallée — Passport to Magonia', url: 'https://en.wikipedia.org/wiki/Jacques_Vall%C3%A9e' },
      { label: 'John Keel — The Mothman Prophecies', url: 'https://en.wikipedia.org/wiki/John_Keel' },
    ],
    accentColor: '#c026d3',
  },

  // ──────────────────────────────────────────────────────────────
  // RECENT / DOCUMENTED CASES
  // ──────────────────────────────────────────────────────────────
  {
    id: 'mexico-bodies',
    name: 'Mexico Non-Human Bodies',
    aliases: ['Nazca Mummies', 'Maria & Wawita'],
    symbol: '🛸',
    classification: 'biological',
    origin: 'Recovered from Nazca region, Peru. Presented in Mexican Congress 2023 by Jaime Maussan.',
    appearance: '~2 ft. Three-fingered, three-toed, elongated skull, no teeth, unusual bone density.',
    motives: 'N/A — deceased specimens.',
    viewOfHumans: 'N/A',
    threatLevel: 'unknown',
    evidenceGrade: 'CREDIBLE',
    summary:
      'Mummified specimens presented under oath to Mexico\'s Congress on Sept 12, 2023. Carbon-dated ~1000 years old. UNAM, Stafford University, and Russian Academy of Sciences performed independent analysis. Officially contested but never proven fraudulent.',
    keyTraits: [
      'DNA analysis: 30%+ unknown sequences not matching any known terrestrial species',
      'Skeletal structure not modified post-mortem (per X-ray)',
      'Eggs found inside one specimen',
      'Triggered global media response and follow-up Peruvian government investigations',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Mexican Congress UAP Hearing (Sept 12, 2023)', url: 'https://www.youtube.com/watch?v=HvsOYNPAinM' },
      { label: 'Jaime Maussan presentation archive', url: 'https://en.wikipedia.org/wiki/Nazca_mummies' },
    ],
    accentColor: '#ec4899',
  },

  {
    id: 'nj-drones',
    name: 'New Jersey Drone Phenomenon',
    aliases: ['NJ Drones', 'Unknown Aerial Objects (2024)'],
    symbol: '🛩️',
    classification: 'synthetic',
    origin: 'Unknown. FBI, FAA, DHS jointly stated they could not identify origin or operator.',
    appearance: 'Car-sized, multi-rotor configurations, blinking nav lights, silent or near-silent operation.',
    motives: 'Unknown. Pattern suggested coordinated surveillance of military and nuclear sites.',
    viewOfHumans: 'N/A — no contact established.',
    threatLevel: 'unknown',
    evidenceGrade: 'DOCUMENTED',
    summary:
      'Beginning Nov 2024, mass sightings of large unidentified drones over New Jersey, New York, and 6+ states. FAA-grounded restricted airspace at Picatinny Arsenal. Government statements directly contradicted local police, sheriffs, and Congressional reps.',
    keyTraits: [
      'Operated in coordinated swarms of 12–50+',
      'Disappeared from radar at will',
      'Concentrated near nuclear, military, and presidential sites',
      'No agency publicly claimed responsibility',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'FBI/FAA/DHS Joint Statement (Dec 2024)', url: 'https://www.fbi.gov/news/press-releases' },
      { label: 'Rep. Jeff Van Drew Congressional remarks', url: 'https://vandrew.house.gov/' },
    ],
    accentColor: '#ef4444',
  },

  {
    id: 'jellyfish',
    name: 'Jellyfish UAP / Booga Sphere',
    aliases: ['Iraq Jellyfish', 'Plasma Bioform'],
    symbol: '🪼',
    classification: 'interdimensional',
    origin: 'Unknown. Captured on US military thermal/SWIR sensors over Iraq (declassified 2023).',
    appearance: 'Translucent, jellyfish/orb-like, with trailing filaments. Moves through air, water, and solid structures with no apparent propulsion.',
    motives: 'Unknown. Behavior consistent with passive observation.',
    viewOfHumans: 'No interaction reported.',
    threatLevel: 'observer',
    evidenceGrade: 'DOCUMENTED',
    summary:
      'Footage released by journalist Jeremy Corbell shows a UAP entering and exiting water and a building wall. Confirmed authentic Department of Defense footage. Among the most physics-defying objects on record.',
    keyTraits: [
      'Moves through media boundaries without disturbance',
      'Visible only on multi-spectral sensors',
      'Maintains coherent shape across all observed conditions',
      'Possibly represents a "biological" UAP class',
    ],
    keyCases: [],
    keyWitnesses: [],
    sources: [
      { label: 'Jeremy Corbell — Jellyfish UAP release', url: 'https://www.weaponizedpodcast.com/' },
      { label: 'DoD video provenance reporting (Debrief)', url: 'https://thedebrief.org/' },
    ],
    accentColor: '#06b6d4',
  },
];

export const classificationLabels: Record<SpeciesClassification, string> = {
  biological: 'Biological',
  reptilian: 'Reptilian',
  insectoid: 'Insectoid',
  synthetic: 'Synthetic',
  interdimensional: 'Interdimensional',
  humanoid: 'Humanoid',
  'ancient-engineer': 'Ancient Engineer',
};

export const threatLabels: Record<ThreatLevel, string> = {
  observer: 'Observer',
  benevolent: 'Benevolent',
  neutral: 'Neutral',
  predator: 'Predator',
  unknown: 'Unknown',
};

export const threatColors: Record<ThreatLevel, string> = {
  observer: 'hsl(var(--muted-foreground))',
  benevolent: 'hsl(142 70% 45%)',
  neutral: 'hsl(48 95% 55%)',
  predator: 'hsl(0 75% 55%)',
  unknown: 'hsl(var(--muted-foreground))',
};
