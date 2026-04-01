import type { EvidenceGrade } from '../types';

export interface TelescopeDiscovery {
  year: string;
  title: string;
  description: string;
  significance?: string;
}

export interface Telescope {
  id: string;
  name: string;
  type: 'space' | 'ground';
  launchYear: string;
  status: 'active' | 'retired' | 'destroyed';
  grade: EvidenceGrade;
  summary: string;
  icon: string;
  accentColor: string;
  discoveries: TelescopeDiscovery[];
  anomalyConnections?: string;
}

export const telescopes: Telescope[] = [
  {
    id: 'hubble',
    name: 'Hubble Space Telescope',
    type: 'space',
    launchYear: '1990',
    status: 'active',
    grade: 'DOCUMENTED',
    icon: '🔭',
    summary: 'The telescope that changed everything. Hubble revealed the universe is expanding faster than predicted and showed us galaxies forming just after the Big Bang.',
    accentColor: '#3b82f6',
    discoveries: [
      { year: '1994', title: 'Comet Shoemaker-Levy 9', description: 'Captured a comet impacting Jupiter — proving cosmic collisions are ongoing.' },
      { year: '1995', title: 'Pillars of Creation', description: 'Iconic image of Eagle Nebula star-forming region, 6,500 light-years away.' },
      { year: '1998', title: 'Accelerating Expansion', description: 'Proved the universe is expanding at an accelerating rate — leading to discovery of dark energy.' },
      { year: '2004', title: 'Hubble Ultra Deep Field', description: 'Pointed at a blank patch of sky for 11 days — revealed 10,000+ galaxies going back 13 billion years.' },
      { year: '2016', title: 'GN-z11', description: 'Found the most distant galaxy ever observed — 13.4 billion light-years away.' },
    ],
  },
  {
    id: 'chandra',
    name: 'Chandra X-ray Observatory',
    type: 'space',
    launchYear: '1999',
    status: 'active',
    grade: 'DOCUMENTED',
    icon: '☢️',
    summary: 'NASA\'s premier X-ray telescope, revealing the violent universe invisible to optical telescopes — black holes, supernovae, and galaxy clusters.',
    accentColor: '#8b5cf6',
    discoveries: [
      { year: '1999', title: 'Cassiopeia A Detail', description: 'First light image revealed unprecedented detail in a supernova remnant.' },
      { year: '2001', title: 'Sound of a Black Hole', description: 'Detected pressure waves from a black hole in Perseus cluster — a B-flat 57 octaves below middle C.' },
      { year: '2006', title: 'Dark Matter Proof', description: 'Bullet Cluster observation provided direct evidence for dark matter.' },
      { year: '2014', title: 'Youngest Black Hole', description: 'Discovered a 30-year-old black hole — youngest ever found.' },
    ],
  },
  {
    id: 'spitzer',
    name: 'Spitzer Space Telescope',
    type: 'space',
    launchYear: '2003',
    status: 'retired',
    grade: 'DOCUMENTED',
    icon: '🌡️',
    summary: 'Infrared vision that could see through cosmic dust to reveal hidden stars, exoplanet atmospheres, and the oldest galaxies.',
    accentColor: '#f59e0b',
    discoveries: [
      { year: '2005', title: 'Exoplanet Light', description: 'First direct detection of light from an exoplanet (HD 209458b).' },
      { year: '2007', title: 'TRAPPIST-1 System', description: 'Helped discover 7 Earth-sized planets around a single star — 3 in habitable zone.' },
      { year: '2009', title: 'Saturn\'s Giant Ring', description: 'Discovered an enormous, previously invisible ring around Saturn.' },
      { year: '2014', title: 'Asteroid Mapping', description: 'Mapped over 700,000 asteroids, cataloguing potential Earth threats.' },
    ],
  },
  {
    id: 'kepler',
    name: 'Kepler Space Telescope',
    type: 'space',
    launchYear: '2009',
    status: 'retired',
    grade: 'DOCUMENTED',
    icon: '🪐',
    summary: 'The planet hunter. Kepler discovered over 2,600 confirmed exoplanets and proved that planets outnumber stars in our galaxy.',
    accentColor: '#10b981',
    discoveries: [
      { year: '2011', title: 'Kepler-22b', description: 'First confirmed planet in a habitable zone of a sun-like star.' },
      { year: '2013', title: 'Billions of Earth-like Planets', description: 'Data suggested ~11 billion potentially habitable Earth-sized planets in the Milky Way.' },
      { year: '2015', title: 'Tabby\'s Star (KIC 8462852)', description: 'Detected bizarre dimming patterns — some theorized a megastructure (Dyson Sphere).' , significance: 'UAP community widely discussed alien megastructure hypothesis' },
      { year: '2016', title: '1,284 New Planets', description: 'Largest single announcement of new exoplanets — doubled the known count.' },
    ],
    anomalyConnections: 'Tabby\'s Star remains one of the most compelling anomalies in modern astronomy, with the "alien megastructure" hypothesis not fully debunked.',
  },
  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    type: 'space',
    launchYear: '2021',
    status: 'active',
    grade: 'DOCUMENTED',
    icon: '🌟',
    summary: 'The most powerful telescope ever built. $10 billion, 30 years in development. Already rewriting our understanding of the early universe, exoplanet atmospheres, and cosmic chemistry.',
    accentColor: '#f43f5e',
    discoveries: [
      { year: '2022 Jul', title: 'First Deep Field', description: 'Deepest and sharpest infrared image of the distant universe ever taken — thousands of galaxies in a grain-of-sand patch of sky.' },
      { year: '2022 Jul', title: 'WASP-96b Atmosphere', description: 'Detected water vapor, clouds, and haze in an exoplanet\'s atmosphere — 1,150 light-years away.' },
      { year: '2022 Sep', title: 'Pillars of Creation (Redux)', description: 'Captured Pillars of Creation in infrared with unprecedented detail, revealing hidden newborn stars.' },
      { year: '2023', title: 'Early Universe Crisis', description: 'Discovered galaxies that formed impossibly early — just 300-400 million years after the Big Bang. Challenges standard models.' },
      { year: '2023', title: 'Carbon Dioxide on Exoplanet', description: 'First detection of CO2 in an exoplanet atmosphere (WASP-39b) — key biosignature precursor.' },
      { year: '2023', title: 'Dimethyl Sulfide Signal', description: 'Detected possible dimethyl sulfide on K2-18b — on Earth, only produced by living organisms.' , significance: 'Potential biosignature — first hint of biological chemistry beyond Earth' },
      { year: '2024', title: 'Galaxy Formation Paradox', description: 'Continued finding "impossible" early galaxies, suggesting either our models are wrong or unknown physics is at play.' },
      { year: '2024', title: 'Exoplanet Direct Imaging', description: 'Directly imaged exoplanets with extraordinary clarity, opening a new era of comparative planetology.' },
    ],
    anomalyConnections: 'JWST\'s discovery of impossibly early galaxies and potential biosignatures on K2-18b are reshaping what we consider possible in the universe.',
  },
  {
    id: 'arecibo',
    name: 'Arecibo Observatory',
    type: 'ground',
    launchYear: '1963',
    status: 'destroyed',
    grade: 'DOCUMENTED',
    icon: '📡',
    summary: 'The legendary 1,000-foot radio telescope in Puerto Rico. Used for SETI, planetary radar, and the famous Arecibo Message. Collapsed in 2020.',
    accentColor: '#06b6d4',
    discoveries: [
      { year: '1967', title: 'Mercury Rotation', description: 'Discovered Mercury\'s rotation period was 59 days, not 88.' },
      { year: '1974', title: 'Arecibo Message', description: 'Beamed a coded message toward star cluster M13, 25,000 light-years away.' },
      { year: '1974', title: 'Nobel Prize Pulsars', description: 'Hulse-Taylor binary pulsar discovery — proved gravitational waves exist.' },
      { year: '1992', title: 'First Exoplanets', description: 'First confirmed planets outside our solar system — orbiting a pulsar.' },
      { year: '2016', title: 'FRB Repeat', description: 'First telescope to confirm a repeating Fast Radio Burst (FRB 121102).' },
      { year: '2020 Dec', title: 'Collapse', description: 'The iconic dish collapsed after cable failures. End of an era.' },
    ],
    anomalyConnections: 'Arecibo was central to SETI search efforts and detected anomalous signals that remain unexplained.',
  },
  {
    id: 'alma',
    name: 'ALMA',
    type: 'ground',
    launchYear: '2011',
    status: 'active',
    grade: 'DOCUMENTED',
    icon: '🏔️',
    summary: 'Atacama Large Millimeter Array — 66 radio antennas in Chile\'s desert at 16,500 feet. Sees the cold, dark universe that optical telescopes miss.',
    accentColor: '#a855f7',
    discoveries: [
      { year: '2014', title: 'HL Tauri Protoplanetary Disk', description: 'Captured stunning image of gaps in a young star\'s disk — showing planets forming in real time.' },
      { year: '2019', title: 'First Black Hole Image (assist)', description: 'Part of the Event Horizon Telescope array that captured the first image of a black hole (M87*).' },
      { year: '2022', title: 'Sgr A* Black Hole', description: 'Helped capture image of Sagittarius A* — our own galaxy\'s supermassive black hole.' },
      { year: '2023', title: 'Water in Planet-Forming Disk', description: 'Detected water vapor in a disk where rocky planets are forming — hinting at how Earth got its water.' },
    ],
  },
  {
    id: 'greenbank',
    name: 'Green Bank Telescope',
    type: 'ground',
    launchYear: '2000',
    status: 'active',
    grade: 'DOCUMENTED',
    icon: '📻',
    summary: 'The world\'s largest fully steerable radio telescope, located in a "radio quiet zone" in West Virginia. Key facility for Breakthrough Listen SETI search.',
    accentColor: '#14b8a6',
    discoveries: [
      { year: '2004', title: 'Millisecond Pulsar Discovery', description: 'Found exotic pulsars spinning hundreds of times per second.' },
      { year: '2016', title: 'Breakthrough Listen', description: 'Began the most comprehensive SETI search ever attempted — scanning 1 million nearby stars.' },
      { year: '2020', title: 'Magnetar FRB', description: 'Detected a Fast Radio Burst from within our own galaxy — from a magnetar.' },
      { year: '2023', title: 'Nanogravity Waves', description: 'Part of NANOGrav consortium that detected the gravitational wave background.' },
    ],
    anomalyConnections: 'Green Bank is ground zero for modern SETI. The "radio quiet zone" around it is legally enforced.',
  },
];
