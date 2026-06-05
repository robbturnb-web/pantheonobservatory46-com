export interface JwstGalleryImage {
  id: string;
  title: string;
  target: string;
  distance: string;
  instrument: 'NIRCam' | 'MIRI' | 'NIRSpec' | 'NIRISS' | 'NIRCam + MIRI';
  why: string;
  src: string;
  credit: string;
}

// All images from NASA / STScI / ESA public release archive (CC).
export const JWST_GALLERY: JwstGalleryImage[] = [
  {
    id: 'carina',
    title: 'Cosmic Cliffs',
    target: 'Carina Nebula · NGC 3324',
    distance: '7,600 ly',
    instrument: 'NIRCam + MIRI',
    why: 'Reveals hundreds of previously-hidden newborn stars sculpting the gas wall.',
    src: 'https://stsci-opo.org/STScI-01G77PKB8NKR7S8Z6HBXMYATGJ.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'pillars',
    title: 'Pillars of Creation',
    target: 'Eagle Nebula · M16',
    distance: '6,500 ly',
    instrument: 'NIRCam',
    why: 'Pierces dust Hubble couldn\'t — exposes protostars forming inside the pillar tips.',
    src: 'https://stsci-opo.org/STScI-01GFNRPFVK15Y0FK2RZJBQXEYY.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'smacs',
    title: 'First Deep Field',
    target: 'SMACS 0723',
    distance: '4.6 Bly (foreground)',
    instrument: 'NIRCam',
    why: 'Gravitational lensing reveals galaxies 13+ billion years old in a thumbnail of sky.',
    src: 'https://stsci-opo.org/STScI-01G7DCWB7137MYJ05CSH1Q5Z1Z.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'phantom',
    title: 'Phantom Galaxy',
    target: 'M74',
    distance: '32 Mly',
    instrument: 'MIRI',
    why: 'Mid-infrared maps the cold dust skeleton of a perfect grand-design spiral.',
    src: 'https://stsci-opo.org/STScI-01GA76RHKZQ8E5JBJSYHKFAVMM.png',
    credit: 'ESA/Webb, NASA, CSA, J. Lee',
  },
  {
    id: 'quintet',
    title: "Stephan's Quintet",
    target: 'HCG 92',
    distance: '290 Mly',
    instrument: 'NIRCam + MIRI',
    why: 'Five-galaxy collision — shows shockwaves and a black-hole outflow in unprecedented detail.',
    src: 'https://stsci-opo.org/STScI-01G8H1NK4W8C9NQYCT5HK3XYGE.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'tarantula',
    title: 'Tarantula Nebula',
    target: '30 Doradus',
    distance: '161,000 ly (LMC)',
    instrument: 'NIRCam',
    why: 'Largest, brightest star-forming region in the local group — a stellar nursery in HD.',
    src: 'https://stsci-opo.org/STScI-01GA6KKWG229B16K4Q38CH3BXS.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'cartwheel',
    title: 'Cartwheel Galaxy',
    target: 'ESO 350-40',
    distance: '500 Mly',
    instrument: 'NIRCam + MIRI',
    why: 'Aftermath of a galactic collision — Webb sees through dust to track new star formation.',
    src: 'https://stsci-opo.org/STScI-01G9G4J19D2VWY3HZ3GBR8RBBJ.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'ring',
    title: 'Southern Ring Nebula',
    target: 'NGC 3132',
    distance: '2,500 ly',
    instrument: 'NIRCam + MIRI',
    why: 'Reveals a second, dust-shrouded star at the heart of the nebula for the first time.',
    src: 'https://stsci-opo.org/STScI-01G7ETPF7DVBJAC42JR5N6EQRH.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'neptune',
    title: 'Neptune & Its Rings',
    target: 'Neptune',
    distance: '2.7 Bmi',
    instrument: 'NIRCam',
    why: 'Sharpest view of Neptune\'s rings since Voyager 2 in 1989.',
    src: 'https://stsci-opo.org/STScI-01GA76Q01D09HFEV174SVMQDMV.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'jupiter',
    title: 'Jupiter Auroras',
    target: 'Jupiter',
    distance: '484 Mmi',
    instrument: 'NIRCam',
    why: 'Captured polar auroras, faint rings, and two moons in a single exposure.',
    src: 'https://stsci-opo.org/STScI-01GA76Q4FDCNJUH5G7Z2DPK4QA.png',
    credit: 'NASA, ESA, CSA, Jupiter ERS Team',
  },
  {
    id: 'ngc7469',
    title: 'NGC 7469',
    target: 'Active galaxy',
    distance: '220 Mly',
    instrument: 'MIRI',
    why: 'Maps the ring of star formation around a supermassive black hole.',
    src: 'https://stsci-opo.org/STScI-01GMA7Z2P3KP4Z6QV8H3GW1XBE.png',
    credit: 'NASA, ESA, CSA, L. Armus, A. S. Evans',
  },
  {
    id: 'wr140',
    title: 'WR 140 Dust Rings',
    target: 'Wolf-Rayet binary',
    distance: '5,600 ly',
    instrument: 'MIRI',
    why: 'Concentric dust shells produced every 8 years by colliding stellar winds.',
    src: 'https://stsci-opo.org/STScI-01GHN6S8R4ZS6X1KMP72N5VFRA.png',
    credit: 'NASA, ESA, CSA, STScI, JPL-Caltech',
  },
];
