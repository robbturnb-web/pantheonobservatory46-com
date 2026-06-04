/**
 * Hand-curated James Webb Space Telescope discoveries.
 * Imagery: NASA/ESA/CSA/STScI — public domain when credited.
 */

export type JwstInstrument = 'NIRCam' | 'MIRI' | 'NIRSpec' | 'NIRISS';
export type JwstCategory =
  | 'Deep Field'
  | 'Galaxy'
  | 'Nebula'
  | 'Exoplanet'
  | 'Solar System'
  | 'Star';

export interface JwstFinding {
  id: string;
  title: string;
  subtitle: string;
  category: JwstCategory;
  instrument: JwstInstrument;
  /** Cosmic era position 0–1 (0 = Big Bang, 1 = present) for the timeline */
  cosmicPosition: number;
  /** Plain-language era label */
  era: string;
  /** Target coordinates */
  target: {
    name: string;
    ra: string;
    dec: string;
    distance: string;
    redshift?: string;
  };
  summary: string;
  why: string;
  image: string;
  credit: string;
  date: string;
  sources: { label: string; url: string }[];
}

export const JWST_FINDINGS: JwstFinding[] = [
  {
    id: 'jades-gs-z14-0',
    title: 'JADES-GS-z14-0',
    subtitle: 'Most distant galaxy ever confirmed',
    category: 'Galaxy',
    instrument: 'NIRSpec',
    cosmicPosition: 0.022,
    era: '290 Myr after Big Bang',
    target: {
      name: 'JADES-GS-z14-0',
      ra: '03h 32m 39s',
      dec: '−27° 50′ 40″',
      distance: '13.5 billion ly',
      redshift: 'z = 14.32',
    },
    summary:
      'Webb confirmed a galaxy that already existed when the universe was only 290 million years old — far brighter and more massive than current models said was possible.',
    why: 'It breaks the early-universe playbook. Massive, luminous galaxies forming this fast hint at unknown physics or dramatically different formation pathways in the first 2% of cosmic time.',
    image:
      'https://stsci-opo.org/STScI-01HZJ7C4CFNHJBJCWJ4Z2YH40H.png',
    credit: 'NASA/ESA/CSA/STScI · JADES Collaboration',
    date: '2024-05-30',
    sources: [
      {
        label: 'NASA — JADES discovery',
        url: 'https://science.nasa.gov/missions/webb/nasas-james-webb-space-telescope-finds-most-distant-known-galaxy/',
      },
    ],
  },
  {
    id: 'pillars-of-creation',
    title: 'Pillars of Creation — Reborn',
    subtitle: 'NIRCam revisits the Eagle Nebula',
    category: 'Nebula',
    instrument: 'NIRCam',
    cosmicPosition: 0.999,
    era: 'Present · 6,500 ly away',
    target: {
      name: 'Messier 16 / Eagle Nebula',
      ra: '18h 18m 48s',
      dec: '−13° 49′ 00″',
      distance: '6,500 ly',
    },
    summary:
      "Webb's near-infrared eye pierces the dust of Hubble's 1995 icon, revealing crimson protostars and silvery hydrogen filaments inside the pillars themselves.",
    why: 'Direct view of star formation happening *inside* the columns — the same nursery process that birthed our Sun, captured mid-act.',
    image:
      'https://stsci-opo.org/STScI-01GFNNW3DM8VW2RY6BAFXFRGZW.png',
    credit: 'NASA/ESA/CSA/STScI',
    date: '2022-10-19',
    sources: [
      {
        label: 'NASA — Pillars of Creation',
        url: 'https://webbtelescope.org/contents/news-releases/2022/news-2022-051',
      },
    ],
  },
  {
    id: 'wasp-39b',
    title: 'CO₂ Detected on WASP-39b',
    subtitle: 'First unambiguous exoplanet carbon dioxide',
    category: 'Exoplanet',
    instrument: 'NIRSpec',
    cosmicPosition: 1,
    era: 'Present · 700 ly away',
    target: {
      name: 'WASP-39b',
      ra: '14h 29m 18s',
      dec: '−03° 26′ 40″',
      distance: '700 ly',
    },
    summary:
      'Transmission spectroscopy of a hot Saturn revealed a clear CO₂ signature — the first unambiguous detection of carbon dioxide in any planet outside the solar system.',
    why: 'Proof of concept that JWST can read the atmospheric chemistry of distant worlds. The same method will hunt for biosignatures on smaller, cooler planets.',
    image:
      'https://stsci-opo.org/STScI-01GAMQ2H9HSCM4CMM52JNGV34X.png',
    credit: 'NASA/ESA/CSA/STScI · J. Olmsted',
    date: '2022-08-25',
    sources: [
      {
        label: 'NASA — CO₂ on WASP-39b',
        url: 'https://science.nasa.gov/missions/webb/nasas-webb-detects-carbon-dioxide-in-exoplanet-atmosphere/',
      },
    ],
  },
  {
    id: 'smacs-0723',
    title: 'First Deep Field — SMACS 0723',
    subtitle: 'Deepest infrared image ever taken',
    category: 'Deep Field',
    instrument: 'NIRCam',
    cosmicPosition: 0.07,
    era: 'Up to 13.1 Gyr ago',
    target: {
      name: 'SMACS J0723.3−7327',
      ra: '07h 23m 19s',
      dec: '−73° 27′ 16″',
      distance: '4.6 Gly (cluster)',
    },
    summary:
      "Webb's first public image — a galaxy cluster acting as a gravitational lens that magnifies galaxies behind it from when the universe was just 600 million years old.",
    why: 'A patch of sky smaller than a grain of sand held at arm\'s length, filled with thousands of galaxies. The opening shot of the Webb era.',
    image:
      'https://stsci-opo.org/STScI-01G7DCWB7137MYJ05CSH1Q5Z1Z.png',
    credit: 'NASA/ESA/CSA/STScI',
    date: '2022-07-11',
    sources: [
      {
        label: 'NASA — First Deep Field',
        url: 'https://webbtelescope.org/contents/news-releases/2022/news-2022-035',
      },
    ],
  },
  {
    id: 'cosmic-cliffs',
    title: 'Cosmic Cliffs — Carina Nebula',
    subtitle: "NGC 3324's stellar nursery edge",
    category: 'Nebula',
    instrument: 'NIRCam',
    cosmicPosition: 0.999,
    era: 'Present · 7,600 ly away',
    target: {
      name: 'NGC 3324 / Carina Nebula',
      ra: '10h 36m 58s',
      dec: '−58° 37′ 56″',
      distance: '7,600 ly',
    },
    summary:
      'A 7-light-year-tall wall of gas and dust at the edge of a young star cluster, sculpted by ultraviolet winds from massive newborn stars hidden above the frame.',
    why: 'Hundreds of previously hidden protostars are visible in the dust — Webb is finding stars that classical telescopes have no way to see.',
    image:
      'https://stsci-opo.org/STScI-01G7DA5ADA2WDSK1JJPQ0PTG4A.png',
    credit: 'NASA/ESA/CSA/STScI',
    date: '2022-07-12',
    sources: [
      {
        label: 'NASA — Cosmic Cliffs',
        url: 'https://webbtelescope.org/contents/news-releases/2022/news-2022-031',
      },
    ],
  },
  {
    id: 'stephans-quintet',
    title: "Stephan's Quintet",
    subtitle: 'Five galaxies dancing in collision',
    category: 'Galaxy',
    instrument: 'NIRCam',
    cosmicPosition: 0.999,
    era: 'Present · ~290 Mly',
    target: {
      name: "Stephan's Quintet (HCG 92)",
      ra: '22h 35m 58s',
      dec: '+33° 57′ 36″',
      distance: '290 Mly',
    },
    summary:
      "Webb's largest mosaic to date — 150 million pixels — showing tidal tails, shock waves, and bursts of star formation in a compact galaxy group.",
    why: 'A live laboratory for how galaxies merge — the same process that built the Milky Way and will collide it with Andromeda in 4 billion years.',
    image:
      'https://stsci-opo.org/STScI-01G7ETPF7DVBJAC42JR5N6EQRH.png',
    credit: 'NASA/ESA/CSA/STScI',
    date: '2022-07-12',
    sources: [
      {
        label: "NASA — Stephan's Quintet",
        url: 'https://webbtelescope.org/contents/news-releases/2022/news-2022-034',
      },
    ],
  },
  {
    id: 'earendel',
    title: 'Earendel · Most Distant Star',
    subtitle: 'A single star magnified 4,000×',
    category: 'Star',
    instrument: 'NIRCam',
    cosmicPosition: 0.07,
    era: '900 Myr after Big Bang',
    target: {
      name: 'WHL0137-LS',
      ra: '01h 37m 25s',
      dec: '−08° 27′ 14″',
      distance: '~28 Gly (lookback)',
      redshift: 'z = 6.2',
    },
    summary:
      'Webb confirmed Hubble\'s discovery of "Earendel" — a single massive B-type star visible only because a galaxy cluster\'s gravity acts as a natural magnifier.',
    why: 'Resolving an individual star this far back is unprecedented. Earendel may belong to the first generation of stars made of nearly pure hydrogen and helium.',
    image:
      'https://stsci-opo.org/STScI-01GZA0KE1HPSPEX1FQBJE6KAJX.png',
    credit: 'NASA/ESA/CSA · D. Coe (STScI)',
    date: '2023-08-09',
    sources: [
      {
        label: 'NASA — Earendel',
        url: 'https://science.nasa.gov/missions/webb/nasas-webb-reveals-new-features-in-heart-of-milky-way/',
      },
    ],
  },
  {
    id: 'k2-18b',
    title: 'K2-18b · Possible Biosignature',
    subtitle: 'Dimethyl sulfide hint on a Hycean world',
    category: 'Exoplanet',
    instrument: 'NIRSpec',
    cosmicPosition: 1,
    era: 'Present · 124 ly away',
    target: {
      name: 'K2-18b',
      ra: '11h 30m 14s',
      dec: '+07° 35′ 18″',
      distance: '124 ly',
    },
    summary:
      'Webb detected methane and CO₂ in the atmosphere of a 2.6-Earth-radius planet in its star\'s habitable zone — plus a tentative signal of dimethyl sulfide, on Earth only made by life.',
    why: 'The most provocative atmospheric reading in exoplanet history. Whether it survives follow-up or fades, it changes what observatories will hunt next.',
    image:
      'https://stsci-opo.org/STScI-01HA5BJEKZA9PDV0WQXP1WD33Q.png',
    credit: 'NASA/ESA/CSA · J. Olmsted (STScI)',
    date: '2023-09-11',
    sources: [
      {
        label: 'NASA — K2-18b biosignature candidate',
        url: 'https://science.nasa.gov/missions/webb/webb-discovers-methane-carbon-dioxide-in-atmosphere-of-k2-18b/',
      },
    ],
  },
  {
    id: 'phantom-galaxy',
    title: 'M74 · Phantom Galaxy',
    subtitle: 'Spiral arms in mid-infrared',
    category: 'Galaxy',
    instrument: 'MIRI',
    cosmicPosition: 0.999,
    era: 'Present · 32 Mly',
    target: {
      name: 'Messier 74 (NGC 628)',
      ra: '01h 36m 42s',
      dec: '+15° 47′ 00″',
      distance: '32 Mly',
    },
    summary:
      'MIRI traces gas, dust, and star-forming regions through the lacy spiral arms of M74, revealing the cold scaffolding of a galaxy invisible to optical telescopes.',
    why: 'A textbook face-on spiral, now imaged in light Hubble could not see. MIRI shows where the next generation of stars is being assembled.',
    image:
      'https://stsci-opo.org/STScI-01GA76RMRGY8BSBQH7ZCBPVZE7.png',
    credit: 'NASA/ESA/CSA · J. Lee · PHANGS-JWST',
    date: '2022-08-29',
    sources: [
      {
        label: 'ESA — Phantom Galaxy',
        url: 'https://esawebb.org/images/weic2218a/',
      },
    ],
  },
  {
    id: 'cartwheel',
    title: 'Cartwheel Galaxy',
    subtitle: 'A galaxy mid-collision, frozen in light',
    category: 'Galaxy',
    instrument: 'NIRCam',
    cosmicPosition: 0.999,
    era: 'Present · 500 Mly',
    target: {
      name: 'ESO 350-40 / Cartwheel',
      ra: '00h 37m 41s',
      dec: '−33° 42′ 59″',
      distance: '500 Mly',
    },
    summary:
      'Webb resolved the dust-shrouded ring of the Cartwheel — created when a smaller galaxy plunged through its center — exposing chaotic stellar nurseries inside.',
    why: 'Galaxy collisions usually take hundreds of millions of years to image. The Cartwheel is a still-frame of one happening — and Webb sees inside the dust.',
    image:
      'https://stsci-opo.org/STScI-01G9G4J23CDPVNGCYDJRZTTKYE.png',
    credit: 'NASA/ESA/CSA/STScI',
    date: '2022-08-02',
    sources: [
      {
        label: 'NASA — Cartwheel Galaxy',
        url: 'https://webbtelescope.org/contents/news-releases/2022/news-2022-039',
      },
    ],
  },
  {
    id: 'jupiter-aurora',
    title: 'Jupiter in Infrared',
    subtitle: 'Auroras, rings, and two tiny moons',
    category: 'Solar System',
    instrument: 'NIRCam',
    cosmicPosition: 1,
    era: 'Present · 588 M km',
    target: {
      name: 'Jupiter',
      ra: 'Variable',
      dec: 'Variable',
      distance: '588 million km',
    },
    summary:
      'Webb captured Jupiter with infrared filters mapped to red/yellow/blue — revealing crackling polar auroras, faint rings, and the moons Amalthea and Adrastea.',
    why: 'Proves Webb can study bright nearby targets without saturating. Same tools that read distant atmospheres now monitor weather on our own gas giants.',
    image:
      'https://stsci-opo.org/STScI-01GA76Q01D09HFEV174SVMQDMV.png',
    credit: 'NASA/ESA/CSA · Jupiter ERS Team',
    date: '2022-08-22',
    sources: [
      {
        label: 'NASA — Jupiter Aurora',
        url: 'https://webbtelescope.org/contents/news-releases/2022/news-2022-038',
      },
    ],
  },
  {
    id: 'neptune-rings',
    title: 'Neptune\'s Rings — Restored',
    subtitle: 'Clearest view since Voyager 2 in 1989',
    category: 'Solar System',
    instrument: 'NIRCam',
    cosmicPosition: 1,
    era: 'Present · 4.3 B km',
    target: {
      name: 'Neptune',
      ra: 'Variable',
      dec: 'Variable',
      distance: '4.3 billion km',
    },
    summary:
      "Webb captured Neptune's faint ring system in infrared light — the clearest view since Voyager 2 flew past — along with seven of the ice giant's moons.",
    why: "The dust rings have never been imaged this cleanly from Earth's vicinity. Triton's nitrogen ice glows bright enough to outshine its parent planet.",
    image:
      'https://stsci-opo.org/STScI-01GA76P9BCQ56QYS0EDQNBCDEX.png',
    credit: 'NASA/ESA/CSA · J. DePasquale (STScI)',
    date: '2022-09-21',
    sources: [
      {
        label: 'NASA — Neptune Rings',
        url: 'https://webbtelescope.org/contents/news-releases/2022/news-2022-043',
      },
    ],
  },
  {
    id: 'tarantula',
    title: 'Tarantula Nebula',
    subtitle: 'Stellar nursery in the Large Magellanic Cloud',
    category: 'Nebula',
    instrument: 'NIRCam',
    cosmicPosition: 0.999,
    era: 'Present · 161,000 ly',
    target: {
      name: '30 Doradus',
      ra: '05h 38m 38s',
      dec: '−69° 05′ 39″',
      distance: '161,000 ly',
    },
    summary:
      'A 340-light-year-wide nebula sculpted by the most massive stars ever observed. Webb resolves the cavity carved by radiation pressure and reveals embedded protostars.',
    why: "30 Doradus is the closest analog to the star-forming explosions of the early universe. A nearby window into how galaxies built themselves.",
    image:
      'https://stsci-opo.org/STScI-01GA76RW6Q4Q4Q4FFSVK4MQDXV.png',
    credit: 'NASA/ESA/CSA/STScI',
    date: '2022-09-06',
    sources: [
      {
        label: 'NASA — Tarantula Nebula',
        url: 'https://webbtelescope.org/contents/news-releases/2022/news-2022-041',
      },
    ],
  },
  {
    id: 'ring-nebula',
    title: 'Ring Nebula (M57)',
    subtitle: 'A dying star\'s last exhale',
    category: 'Nebula',
    instrument: 'MIRI',
    cosmicPosition: 0.999,
    era: 'Present · 2,600 ly',
    target: {
      name: 'Messier 57',
      ra: '18h 53m 35s',
      dec: '+33° 01′ 45″',
      distance: '2,600 ly',
    },
    summary:
      'Webb resolved the inner ring, knots of gas, and concentric outer halo of M57 — a planetary nebula sculpted by a star at the end of its life.',
    why: 'A preview of the Sun\'s eventual fate. The intricate structures hint at a binary companion shaping the outflow over thousands of years.',
    image:
      'https://stsci-opo.org/STScI-01H7M3JN0Y50YDC9V7AAJTSPRK.png',
    credit: 'NASA/ESA/CSA · R. Wesson (Cardiff)',
    date: '2023-08-21',
    sources: [
      {
        label: 'ESA — Ring Nebula',
        url: 'https://esawebb.org/images/weic2320a/',
      },
    ],
  },
  {
    id: 'trappist-1b',
    title: 'TRAPPIST-1b · Atmosphere Hunt',
    subtitle: 'First rocky exoplanet thermal map',
    category: 'Exoplanet',
    instrument: 'MIRI',
    cosmicPosition: 1,
    era: 'Present · 40 ly away',
    target: {
      name: 'TRAPPIST-1b',
      ra: '23h 06m 30s',
      dec: '−05° 02′ 36″',
      distance: '40 ly',
    },
    summary:
      'Webb measured the dayside thermal emission of TRAPPIST-1b — finding it likely has little to no atmosphere, with a surface ~230°C.',
    why: 'A first-of-its-kind rocky-planet measurement. Sets the baseline for testing whether the cooler, outer TRAPPIST-1 worlds can hold onto air at all.',
    image:
      'https://stsci-opo.org/STScI-01GVF2NGJBHN31MJWB4FYKBC25.png',
    credit: 'NASA/ESA/CSA · J. Olmsted (STScI)',
    date: '2023-03-27',
    sources: [
      {
        label: 'NASA — TRAPPIST-1b',
        url: 'https://science.nasa.gov/missions/webb/nasas-webb-measures-temperature-of-rocky-exoplanet/',
      },
    ],
  },
];

export const JWST_INSTRUMENTS: {
  id: JwstInstrument;
  name: string;
  blurb: string;
  band: string;
}[] = [
  { id: 'NIRCam', name: 'NIRCam', band: '0.6 – 5 μm', blurb: 'Near-Infrared Camera · primary imager' },
  { id: 'NIRSpec', name: 'NIRSpec', band: '0.6 – 5 μm', blurb: 'Multi-object spectrograph · atmospheres & redshifts' },
  { id: 'MIRI', name: 'MIRI', band: '5 – 28 μm', blurb: 'Mid-Infrared · cold dust, distant galaxies' },
  { id: 'NIRISS', name: 'NIRISS', band: '0.6 – 5 μm', blurb: 'Slitless spectroscopy · transit science' },
];
