import type { EvidenceGrade } from '../types';

import hubbleImg from '../assets/telescopes/hubble.jpg';
import chandraImg from '../assets/telescopes/chandra.jpg';
import spitzerImg from '../assets/telescopes/spitzer.jpg';
import keplerImg from '../assets/telescopes/kepler.jpg';
import jwstImg from '../assets/telescopes/jwst.jpg';
import areciboImg from '../assets/telescopes/arecibo.jpg';
import almaImg from '../assets/telescopes/alma.jpg';
import greenbankImg from '../assets/telescopes/greenbank.jpg';

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
  image: string;
  specs: string[];
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
    image: hubbleImg,
    summary: 'The telescope that changed everything. Hubble revealed the universe is expanding faster than predicted and showed us galaxies forming just after the Big Bang.',
    accentColor: '#3b82f6',
    specs: ['Mirror: 2.4m primary', 'Orbit: 547 km altitude', 'Cost: $16 billion total', 'Serviced 5 times by Space Shuttle'],
    discoveries: [
      { year: '1993', title: 'First Servicing Mission', description: 'Astronauts installed corrective optics (COSTAR) to fix Hubble\'s flawed mirror — turning it from embarrassment to revolutionary instrument.' },
      { year: '1994', title: 'Comet Shoemaker-Levy 9', description: 'Captured a comet impacting Jupiter — 21 fragments struck over 6 days, proving cosmic collisions are ongoing and potentially devastating.' },
      { year: '1995', title: 'Pillars of Creation', description: 'Iconic image of Eagle Nebula star-forming region, 6,500 light-years away. Became the most famous astronomical image ever taken.' },
      { year: '1996', title: 'Hubble Deep Field', description: 'Pointed at a seemingly empty patch of sky for 10 days — revealed ~3,000 galaxies, each containing billions of stars. Changed our understanding of cosmic scale.' },
      { year: '1998', title: 'Accelerating Expansion', description: 'Proved the universe is expanding at an accelerating rate — leading to discovery of dark energy (68% of the universe). Nobel Prize 2011.' },
      { year: '2001', title: 'Atmospheric Detection', description: 'First detection of an atmosphere on an extrasolar planet (HD 209458b) — found sodium, opening the field of exoplanet atmospheric science.' },
      { year: '2004', title: 'Hubble Ultra Deep Field', description: 'Pointed at a blank patch of sky for 11 days — revealed 10,000+ galaxies going back 13 billion years. The deepest visible-light image ever.' },
      { year: '2012', title: 'Pluto\'s Moons', description: 'Discovered Pluto\'s 4th and 5th moons (Kerberos and Styx), helping plan the New Horizons flyby.' },
      { year: '2016', title: 'GN-z11', description: 'Found the most distant galaxy ever observed — 13.4 billion light-years away, seen just 400 million years after the Big Bang.' },
      { year: '2023', title: 'Still Operating at 33', description: 'Despite aging hardware, Hubble continues producing groundbreaking science. Has made 1.5 million+ observations.' },
    ],
    anomalyConnections: 'Hubble has captured numerous unexplained transient phenomena and fast-moving objects that defy conventional classification in its field of view.',
  },
  {
    id: 'chandra',
    name: 'Chandra X-ray Observatory',
    type: 'space',
    launchYear: '1999',
    status: 'active',
    grade: 'DOCUMENTED',
    icon: '☢️',
    image: chandraImg,
    summary: 'NASA\'s premier X-ray telescope, revealing the violent universe invisible to optical telescopes — black holes, supernovae, and galaxy clusters at unprecedented resolution.',
    accentColor: '#8b5cf6',
    specs: ['Mirror: 1.2m, iridium-coated', 'Orbit: highly elliptical, up to 139,000 km', 'Resolution: 0.5 arcsec (sharpest X-ray ever)', 'Named after Subrahmanyan Chandrasekhar'],
    discoveries: [
      { year: '1999', title: 'Cassiopeia A First Light', description: 'First light image revealed unprecedented detail in a supernova remnant — discovered the neutron star at its center for the first time.' },
      { year: '2000', title: 'X-ray Background Resolved', description: 'Resolved the cosmic X-ray background into individual sources — mostly supermassive black holes actively feeding in distant galaxies.' },
      { year: '2001', title: 'Sound of a Black Hole', description: 'Detected pressure waves from a black hole in Perseus cluster — a B-flat 57 octaves below middle C. The deepest note ever detected in the universe.' },
      { year: '2002', title: 'Dark Energy Confirmation', description: 'Independent confirmation of dark energy through X-ray observations of galaxy clusters, supporting the accelerating expansion finding.' },
      { year: '2006', title: 'Bullet Cluster — Dark Matter Proof', description: 'Observed the Bullet Cluster collision — provided the most direct evidence for dark matter, showing it separated from normal matter during the crash.', significance: 'Considered the "smoking gun" for dark matter existence' },
      { year: '2010', title: 'Youngest Known Black Hole', description: 'Discovered a 30-year-old black hole in galaxy NGC 7793 — youngest ever found, allowing study of black hole formation in near-real-time.' },
      { year: '2014', title: 'Milky Way Flares', description: 'Detected mysterious X-ray flares from Sagittarius A* (our galaxy\'s supermassive black hole), occurring daily without clear explanation.' },
      { year: '2020', title: 'Planet Outside Our Galaxy?', description: 'Detected possible evidence of a planet in the Whirlpool Galaxy (M51) — potentially first extragalactic planet discovery.' },
    ],
    anomalyConnections: 'Chandra\'s X-ray vision has detected anomalous energy signatures and transient phenomena near galactic centers that remain unexplained by standard astrophysics.',
  },
  {
    id: 'spitzer',
    name: 'Spitzer Space Telescope',
    type: 'space',
    launchYear: '2003',
    status: 'retired',
    grade: 'DOCUMENTED',
    icon: '🌡️',
    image: spitzerImg,
    summary: 'Infrared vision that could see through cosmic dust to reveal hidden stars, exoplanet atmospheres, and the oldest galaxies. Retired January 2020 after 16 years.',
    accentColor: '#f59e0b',
    specs: ['Mirror: 0.85m beryllium', 'Wavelength: 3–180 μm infrared', 'Orbit: Earth-trailing heliocentric', 'Cooled to -268°C with liquid helium'],
    discoveries: [
      { year: '2004', title: 'Youngest Stars Found', description: 'Discovered the youngest known stars still embedded in their natal dust clouds — invisible to optical telescopes.' },
      { year: '2005', title: 'First Exoplanet Light', description: 'First direct detection of light from an exoplanet (HD 209458b) — a watershed moment for studying alien worlds directly.' },
      { year: '2007', title: 'TRAPPIST-1 System', description: 'Helped discover 7 Earth-sized planets around a single star — 3 in habitable zone. Most promising system for finding life.', significance: 'Most Earth-like planetary system ever discovered' },
      { year: '2009', title: 'Saturn\'s Giant Ring', description: 'Discovered an enormous, previously invisible ring around Saturn — so large it could fit a billion Earths inside. Tilted 27° from main rings.' },
      { year: '2012', title: 'Ancient Galaxy Light', description: 'Detected some of the most distant and oldest galaxies ever observed, pushing our view back to within 500 million years of the Big Bang.' },
      { year: '2014', title: 'Asteroid Census', description: 'Mapped over 700,000 asteroids using NEOWISE survey, cataloguing potential Earth threats and building the most comprehensive asteroid database.' },
      { year: '2020', title: 'Final Observations', description: 'Retired on January 30, 2020. In 16 years, Spitzer fundamentally changed our understanding of infrared astronomy and exoplanets.' },
    ],
    anomalyConnections: 'Spitzer\'s infrared capabilities detected thermal anomalies in several asteroids and cometary bodies that didn\'t match predicted models.',
  },
  {
    id: 'kepler',
    name: 'Kepler Space Telescope',
    type: 'space',
    launchYear: '2009',
    status: 'retired',
    grade: 'DOCUMENTED',
    icon: '🪐',
    image: keplerImg,
    summary: 'The planet hunter. Kepler discovered over 2,600 confirmed exoplanets and proved that planets outnumber stars in our galaxy. Retired 2018.',
    accentColor: '#10b981',
    specs: ['Mirror: 1.4m primary', 'Field of view: 115 sq degrees', 'Monitored 150,000+ stars simultaneously', 'Transit method: detecting brightness dips'],
    discoveries: [
      { year: '2010', title: 'First Rocky Planet', description: 'Kepler-10b — first confirmed rocky exoplanet discovered by the mission. Surface temperature hot enough to melt iron.' },
      { year: '2011', title: 'Kepler-22b', description: 'First confirmed planet in a habitable zone of a sun-like star. 2.4x Earth\'s radius — a "super-Earth" that could harbor liquid water.' },
      { year: '2013', title: 'Billions of Earth-like Planets', description: 'Statistical analysis of Kepler data suggested ~11 billion potentially habitable Earth-sized planets exist in the Milky Way alone.' },
      { year: '2014', title: 'Kepler-186f', description: 'First Earth-sized planet found orbiting in the habitable zone of another star. Called "Earth\'s cousin" — 500 light-years away.' },
      { year: '2015', title: 'Tabby\'s Star (KIC 8462852)', description: 'Detected bizarre dimming patterns — up to 22% brightness drops, far more than any planet could cause. Some theorized a megastructure (Dyson Sphere).', significance: 'UAP community widely discussed alien megastructure hypothesis — still not fully explained' },
      { year: '2016', title: '1,284 New Planets', description: 'Largest single announcement of new exoplanets — doubled the known count. Among them, 550 could be rocky like Earth.' },
      { year: '2017', title: 'K2 Extended Mission', description: 'After reaction wheel failure, Kepler was reborn as K2 — using solar pressure to stabilize. Discovered hundreds more planets in its second life.' },
      { year: '2018', title: 'Retirement After 9 Years', description: 'Ran out of fuel on October 30, 2018. Total legacy: 2,662 confirmed exoplanets, forever changing how we view our place in the cosmos.' },
    ],
    anomalyConnections: 'Tabby\'s Star remains one of the most compelling anomalies in modern astronomy. The "alien megastructure" hypothesis has not been fully debunked — dust explanations don\'t account for all observed dimming patterns.',
  },
  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    type: 'space',
    launchYear: '2021',
    status: 'active',
    grade: 'DOCUMENTED',
    icon: '🌟',
    image: jwstImg,
    summary: 'The most powerful telescope ever built. $10 billion, 30 years in development. Already rewriting our understanding of the early universe, exoplanet atmospheres, and cosmic chemistry.',
    accentColor: '#f43f5e',
    specs: ['Mirror: 6.5m (18 gold hexagons)', 'Location: L2 point, 1.5M km from Earth', 'Wavelength: 0.6–28.5 μm infrared', 'Sunshield: tennis court-sized, 5 layers'],
    discoveries: [
      { year: '2022 Jan', title: 'Perfect Deployment', description: 'Successfully deployed all 18 mirror segments and tennis-court sunshield after a million-mile journey. Zero margin for error — every step worked.' },
      { year: '2022 Jul', title: 'First Deep Field', description: 'Deepest and sharpest infrared image of the distant universe ever taken — thousands of galaxies in a grain-of-sand patch of sky. Galaxy cluster SMACS 0723.' },
      { year: '2022 Jul', title: 'WASP-96b Atmosphere', description: 'Detected water vapor, clouds, and haze in an exoplanet\'s atmosphere — 1,150 light-years away. Most detailed exoplanet atmosphere spectrum ever.' },
      { year: '2022 Sep', title: 'Pillars of Creation Redux', description: 'Captured Pillars of Creation in infrared with unprecedented detail, revealing hidden newborn stars that Hubble couldn\'t see. Instant iconic image.' },
      { year: '2022 Oct', title: 'Jupiter Like Never Before', description: 'Revealed Jupiter\'s auroras, faint rings, and two tiny moons in stunning infrared detail — showing the gas giant in a completely new light.' },
      { year: '2023', title: 'Early Universe Crisis', description: 'Discovered galaxies that formed impossibly early — just 300-400 million years after the Big Bang. These "impossible galaxies" challenge the standard cosmological model.', significance: 'May require fundamental revision of how we understand galaxy formation' },
      { year: '2023', title: 'Carbon Dioxide on Exoplanet', description: 'First detection of CO2 in an exoplanet atmosphere (WASP-39b) — a key biosignature precursor that could indicate biological processes.' },
      { year: '2023', title: 'Dimethyl Sulfide on K2-18b', description: 'Detected possible dimethyl sulfide on K2-18b — on Earth, this chemical is only produced by living organisms (marine phytoplankton).', significance: 'Potential first biosignature — hint of biological chemistry beyond Earth' },
      { year: '2024', title: 'Galaxy Formation Paradox', description: 'Continued finding "impossible" early galaxies — massive, well-formed galaxies existing when the universe was just 2% of its current age. Unknown physics may be at play.' },
      { year: '2024', title: 'Exoplanet Direct Imaging', description: 'Directly imaged exoplanets with extraordinary clarity, including young gas giants still forming. Opening a new era of comparative planetology.' },
      { year: '2025', title: 'Atmospheric Chemistry Catalog', description: 'Building the first comprehensive catalog of exoplanet atmospheric compositions — identifying which worlds have the chemical signatures associated with life.' },
    ],
    anomalyConnections: 'JWST\'s discovery of impossibly early galaxies and potential biosignatures on K2-18b are reshaping what we consider possible. The "impossible galaxies" crisis may point to unknown physics or earlier cosmic processes than currently understood.',
  },
  {
    id: 'arecibo',
    name: 'Arecibo Observatory',
    type: 'ground',
    launchYear: '1963',
    status: 'destroyed',
    grade: 'DOCUMENTED',
    icon: '📡',
    image: areciboImg,
    summary: 'The legendary 1,000-foot radio telescope in Puerto Rico. Used for SETI, planetary radar, and the famous Arecibo Message. Collapsed December 2020 after 57 years.',
    accentColor: '#06b6d4',
    specs: ['Dish diameter: 305m (1,000 ft)', 'Location: Arecibo, Puerto Rico', 'Frequency: 50 MHz – 10 GHz', 'Featured in Contact and GoldenEye'],
    discoveries: [
      { year: '1967', title: 'Mercury\'s True Rotation', description: 'Discovered Mercury\'s rotation period was 59 days, not 88 as previously believed — correcting a fundamental error in planetary science.' },
      { year: '1974', title: 'Arecibo Message', description: 'Beamed a coded binary message toward star cluster M13, 25,000 light-years away. Contained info about human DNA, solar system, and a stick figure of a human.' },
      { year: '1974', title: 'Nobel Prize: Binary Pulsar', description: 'Hulse-Taylor binary pulsar discovery — its orbital decay matched Einstein\'s prediction of gravitational wave energy loss exactly. Nobel Prize in Physics 1993.' },
      { year: '1990', title: 'First Pulsar Planet', description: 'Alex Wolszczan used Arecibo to discover the first confirmed planets outside our solar system — orbiting a pulsar (dead star). Announced 1992.' },
      { year: '1992', title: 'Ice on Mercury', description: 'Radar observations revealed ice deposits in permanently shadowed craters at Mercury\'s poles — water existing on the closest planet to the Sun.' },
      { year: '2008', title: 'Prebiotic Molecules', description: 'Detected complex prebiotic molecules in deep space — organic compounds that are precursors to amino acids, the building blocks of life.' },
      { year: '2016', title: 'FRB Repeat', description: 'First telescope to confirm a repeating Fast Radio Burst (FRB 121102) — proving some FRBs aren\'t one-time events and suggesting a persistent source.' },
      { year: '2020 Dec', title: 'Catastrophic Collapse', description: 'The iconic 900-ton instrument platform collapsed onto the dish after cable failures. 57 years of service ended. NSF decided not to rebuild.' },
    ],
    anomalyConnections: 'Arecibo was central to SETI search efforts and detected multiple anomalous signals. The 1977 "Wow! Signal" was detected by Ohio State but Arecibo conducted extensive follow-up searches. Several unexplained transient radio phenomena remain in its archives.',
  },
  {
    id: 'alma',
    name: 'ALMA',
    type: 'ground',
    launchYear: '2011',
    status: 'active',
    grade: 'DOCUMENTED',
    icon: '🏔️',
    image: almaImg,
    summary: 'Atacama Large Millimeter Array — 66 radio antennas in Chile\'s desert at 16,500 feet. Sees the cold, dark universe that optical telescopes miss entirely.',
    accentColor: '#a855f7',
    specs: ['Antennas: 66 (54×12m + 12×7m)', 'Altitude: 5,058m (16,597 ft)', 'Location: Atacama Desert, Chile', 'Baseline: up to 16 km spread'],
    discoveries: [
      { year: '2014', title: 'HL Tauri: Planets Forming', description: 'Captured stunning image of gaps in a young star\'s disk — showing planets forming in real time. Most detailed protoplanetary disk image ever taken.' },
      { year: '2016', title: 'Oxygen in Ancient Galaxy', description: 'Detected oxygen in a galaxy 13.1 billion light-years away — the most distant oxygen detection, revealing early universe chemistry.' },
      { year: '2019', title: 'First Black Hole Image', description: 'Part of the Event Horizon Telescope array that captured the first-ever image of a black hole (M87*) — 55 million light-years away, 6.5 billion solar masses.' },
      { year: '2020', title: 'Phosphine on Venus Debate', description: 'Contributed to the controversial detection of phosphine gas in Venus\'s atmosphere — a potential biosignature that sparked intense scientific debate.' },
      { year: '2022', title: 'Sagittarius A* Image', description: 'Helped capture image of Sgr A* — our own galaxy\'s supermassive black hole, 4 million solar masses, 26,000 light-years away.' },
      { year: '2023', title: 'Water in Planet-Forming Disk', description: 'Detected water vapor in a disk where rocky planets are forming around star HL Tauri — hinting at how Earth got its water billions of years ago.' },
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
    image: greenbankImg,
    summary: 'The world\'s largest fully steerable radio telescope, located in a legally enforced "radio quiet zone" in West Virginia. Key facility for Breakthrough Listen SETI.',
    accentColor: '#14b8a6',
    specs: ['Dish: 100m (328 ft) diameter', 'Location: Green Bank, West Virginia', 'National Radio Quiet Zone: 13,000 sq mi', 'Weight: 7,700 metric tons'],
    discoveries: [
      { year: '2004', title: 'Millisecond Pulsars', description: 'Found exotic pulsars spinning hundreds of times per second — some used as ultra-precise cosmic clocks for gravitational wave detection.' },
      { year: '2010', title: 'Most Massive Neutron Star', description: 'Discovered PSR J1614-2230 — a neutron star nearly twice the Sun\'s mass crammed into a 20km sphere. Ruled out several exotic physics models.' },
      { year: '2016', title: 'Breakthrough Listen', description: 'Began the most comprehensive SETI search ever attempted — scanning 1 million nearby stars, 100 nearest galaxies. $100 million, 10-year program.' },
      { year: '2019', title: 'Mysterious Radio Bursts', description: 'Detected and characterized multiple Fast Radio Bursts, contributing to the growing catalog of these enigmatic millisecond-duration cosmic signals.' },
      { year: '2020', title: 'Magnetar FRB', description: 'Detected a Fast Radio Burst from within our own galaxy — from magnetar SGR 1935+2154. First time an FRB was linked to a known source.' },
      { year: '2023', title: 'Gravitational Wave Background', description: 'Part of NANOGrav consortium that detected the gravitational wave background — a "hum" of gravitational waves permeating the entire universe.' },
    ],
    anomalyConnections: 'Green Bank is ground zero for modern SETI. The National Radio Quiet Zone around it is legally enforced — no Wi-Fi, limited cell service. Breakthrough Listen has flagged several "signals of interest" that remain under investigation.',
  },
];
