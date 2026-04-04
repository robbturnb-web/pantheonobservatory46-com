import type { Source } from '../components/SourceList';
import type { VideoData } from '../components/VideoEmbed';

export interface Pyramid {
  id: string;
  name: string;
  location: string;
  coordinates: string;
  age: string;
  color: string;
  accentColor: string;
  facts: string[];
  alignments: string[];
  theories: string;
  position: [number, number, number];
  scale: number;
  sources: Source[];
  videos: VideoData[];
}

export const pyramids: Pyramid[] = [
  {
    id: 'giza',
    name: 'Great Pyramid of Giza',
    location: 'Giza, Egypt',
    coordinates: '29.9792° N, 31.1342° E',
    age: '~2560 BCE',
    color: '#d4a574',
    accentColor: '#fbbf24',
    facts: [
      '2.3 million limestone blocks, each weighing 2.5 tons average',
      'Originally 146.6m tall — tallest structure for 3,800 years',
      'Aligned to true north within 3/60th of a degree',
      'Internal temperature is constant at 20°C (68°F)',
      'The descending passage points to the pole star Alpha Draconis',
    ],
    alignments: [
      'Three pyramids mirror the three stars of Orion\'s Belt',
      'Air shafts point to Orion, Sirius, and Alpha Draconis',
      'Sits at the exact center of Earth\'s land mass',
      'Aligned to the cardinal directions with extreme precision',
    ],
    theories: 'Robert Bauval\'s Orion Correlation Theory proposes the Giza complex is a terrestrial map of the Orion constellation. The precision of construction — within fractions of a degree — suggests knowledge beyond what mainstream archaeology attributes to Bronze Age Egyptians.',
    position: [0, 0, 0],
    scale: 1.8,
    sources: [
      { label: 'National Geographic — Giza', url: 'https://www.nationalgeographic.com/history/article/giza-pyramids' },
      { label: 'Robert Bauval — Orion Correlation', url: 'https://en.wikipedia.org/wiki/Orion_correlation_theory' },
      { label: 'Smithsonian — Great Pyramid', url: 'https://www.smithsonianmag.com/history/giza-pyramids-180981052/' },
      { label: '2017 Muon Scan — Big Void Discovery', url: 'https://www.nature.com/articles/nature24647' },
    ],
    videos: [
      { platform: 'youtube', id: 'sy_bJQaD3Uc', title: 'Inside the Great Pyramid — National Geographic' },
    ],
  },
  {
    id: 'teotihuacan',
    name: 'Pyramid of the Sun',
    location: 'Teotihuacan, Mexico',
    coordinates: '19.6925° N, 98.8438° W',
    age: '~200 CE',
    color: '#a8855e',
    accentColor: '#ef4444',
    facts: [
      'Third-largest pyramid on Earth — 65m tall, 225m base',
      'Contains a mysterious mica layer from Brazil, 3,000+ km away',
      'Built over a natural cave system and underground tunnel',
      'Teotihuacan means "place where the gods were born"',
      'City had 125,000+ residents — larger than ancient Rome',
    ],
    alignments: [
      'Avenue of the Dead aligns 15.5° east of north — pointing to the Pleiades',
      'The Pyramid of the Sun tracks the sunset on equinoxes',
      'Layout mirrors the solar system\'s inner planets',
      'Underground tunnels contain liquid mercury deposits',
    ],
    theories: 'The mica chambers are thermally and electrically significant — mica is used in modern capacitors and insulation. The liquid mercury found underground may have been used as a reflective pool representing the underworld.',
    position: [8, 0, -6],
    scale: 1.4,
    sources: [
      { label: 'INAH Mexico — Teotihuacan', url: 'https://www.inah.gob.mx/zonas/23-zona-arqueologica-de-teotihuacan' },
      { label: 'Liquid Mercury Discovery (2015)', url: 'https://www.theguardian.com/world/2015/apr/24/liquid-mercury-found-at-teotihuacan-pyramid' },
      { label: 'Mica Chambers Research', url: 'https://en.wikipedia.org/wiki/Teotihuacan' },
    ],
    videos: [
      { platform: 'youtube', id: 'tZ8Jyq5Xzas', title: 'Teotihuacan — Lost City of the Gods' },
    ],
  },
  {
    id: 'bosnian',
    name: 'Bosnian Pyramid of the Sun',
    location: 'Visoko, Bosnia',
    coordinates: '43.9769° N, 18.1768° E',
    age: '~12,000+ BCE (disputed)',
    color: '#6b8e6b',
    accentColor: '#10b981',
    facts: [
      'Visočica hill has four triangular faces oriented to cardinal points',
      'Claimed to be 220m tall — would be the largest pyramid on Earth',
      'Ultrasound frequency of 28 kHz measured at apex',
      'Underground tunnel network (Ravne tunnels) extends 2.5+ km',
      'Mainstream archaeology disputes it as a natural formation',
    ],
    alignments: [
      'Oriented to true north like Giza',
      'Electromagnetic energy beam detected above the apex',
      'Tunnel network contains negative ion concentrations 40x normal',
      'Geometry matches sacred proportions found in other ancient sites',
    ],
    theories: 'Dr. Semir Osmanagić claims this is the oldest and largest pyramid on Earth, built by an advanced Ice Age civilization. Energy beam measurements at 28 kHz from the apex are documented but unexplained.',
    position: [-8, 0, -4],
    scale: 1.5,
    sources: [
      { label: 'Dr. Osmanagić Foundation', url: 'https://www.bosnianpyramid.org/' },
      { label: 'European Archaeology Critique', url: 'https://en.wikipedia.org/wiki/Bosnian_pyramid_claims' },
    ],
    videos: [],
  },
  {
    id: 'nubian',
    name: 'Nubian Pyramids of Meroë',
    location: 'Meroë, Sudan',
    coordinates: '16.9386° N, 33.7489° E',
    age: '~300 BCE – 350 CE',
    color: '#c4956a',
    accentColor: '#f59e0b',
    facts: [
      'Over 200 pyramids — more than all of Egypt',
      'Steeper angles (70°) compared to Egyptian pyramids (51°)',
      'Built by the Kingdom of Kush — rivals to Egypt',
      'Many contain burial chambers with gold and artifacts',
      'Largely unknown to the Western world until recently',
    ],
    alignments: [
      'Aligned to the winter solstice sunrise',
      'Follow a northeast-southwest axis matching stellar positions',
      'Spacing patterns suggest astronomical calendar function',
      'Shadow casting creates precise time-marking at solstices',
    ],
    theories: 'The Kushite civilization maintained pyramid-building traditions for 1,000 years after Egypt stopped. Their astronomical alignments suggest an unbroken lineage of sacred geometry knowledge.',
    position: [6, 0, 8],
    scale: 1.0,
    sources: [
      { label: 'UNESCO — Meroë', url: 'https://whc.unesco.org/en/list/1336/' },
      { label: 'National Geographic — Nubian Pyramids', url: 'https://www.nationalgeographic.com/history/article/sudan-nubian-pyramids' },
    ],
    videos: [],
  },
  {
    id: 'kukulcan',
    name: 'El Castillo (Kukulcán)',
    location: 'Chichén Itzá, Mexico',
    coordinates: '20.6829° N, 88.5686° W',
    age: '~1000 CE',
    color: '#8b8b7a',
    accentColor: '#8b5cf6',
    facts: [
      '365 steps total — one for each day of the year',
      'Equinox shadow creates a serpent descending the staircase',
      'Clap at the base and hear a chirp echoing like the quetzal bird',
      'Contains an older, smaller pyramid inside it',
      'Cenote below may have been a portal to the underworld (Xibalba)',
    ],
    alignments: [
      'Precisely calibrated for equinox light-and-shadow serpent effect',
      'Four staircases face the four cardinal directions',
      'Acoustic properties produce bird-call echoes — intentional design',
      'Venus alignment tracked by the Maya with 99.99% accuracy',
    ],
    theories: 'The acoustic properties of Kukulcán suggest the Maya engineered sound itself into stone. The equinox serpent requires such precise geometry that computer modeling shows the margin of error is less than 0.01°.',
    position: [-6, 0, 7],
    scale: 1.2,
    sources: [
      { label: 'INAH — Chichén Itzá', url: 'https://www.inah.gob.mx/zonas/12-zona-arqueologica-de-chichen-itza' },
      { label: 'Acoustics Study — Lubman', url: 'https://acoustics.org/pressroom/httpdocs/131st/2paa2.html' },
      { label: 'UNESCO — Chichén Itzá', url: 'https://whc.unesco.org/en/list/483/' },
    ],
    videos: [
      { platform: 'youtube', id: 'b-HY1Kvjd1A', title: 'Equinox Serpent at Kukulcán — Chichén Itzá' },
    ],
  },
  {
    id: 'ziggurat',
    name: 'Ziggurat of Ur',
    location: 'Nasiriyah, Iraq',
    coordinates: '30.9627° N, 46.1031° E',
    age: '~2100 BCE',
    color: '#b89f8a',
    accentColor: '#3b82f6',
    facts: [
      'Dedicated to Nanna, the Sumerian moon god',
      'Original structure was 30m tall with three terraces',
      'Built by King Ur-Nammu of the Third Dynasty of Ur',
      'Partially restored by Saddam Hussein in the 1980s',
      'Located near Abraham\'s biblical birthplace',
    ],
    alignments: [
      'Corners point to the four cardinal directions',
      'Upper temple aligned for lunar observations',
      'Step design may represent the stairway between Earth and heaven',
      'Part of a sacred precinct with courts and ritual spaces',
    ],
    theories: 'The Sumerians described the Anunnaki — beings who came from the sky and created humanity. Zecharia Sitchin proposed ziggurats were landing platforms.',
    position: [0, 0, -9],
    scale: 1.1,
    sources: [
      { label: 'British Museum — Ur', url: 'https://www.britishmuseum.org/collection/term/x32624' },
      { label: 'Wikipedia — Ziggurat of Ur', url: 'https://en.wikipedia.org/wiki/Ziggurat_of_Ur' },
    ],
    videos: [],
  },
];
