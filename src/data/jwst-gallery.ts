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

// All images sourced from NASA/ESA/CSA via Wikimedia Commons (CC / public domain).
// Verified hot-linkable through upload.wikimedia.org thumbnails.
export const JWST_GALLERY: JwstGalleryImage[] = [
  {
    id: 'carina',
    title: 'Cosmic Cliffs',
    target: 'Carina Nebula · NGC 3324',
    distance: '7,600 ly',
    instrument: 'NIRCam + MIRI',
    why: 'Reveals hundreds of previously-hidden newborn stars sculpting the gas wall.',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/NASA%E2%80%99s_Webb_Reveals_Cosmic_Cliffs%2C_Glittering_Landscape_of_Star_Birth_-_Flickr_-_James_Webb_Space_Telescope.png/1920px-NASA%E2%80%99s_Webb_Reveals_Cosmic_Cliffs%2C_Glittering_Landscape_of_Star_Birth_-_Flickr_-_James_Webb_Space_Telescope.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'pillars',
    title: 'Pillars of Creation',
    target: 'Eagle Nebula · M16',
    distance: '6,500 ly',
    instrument: 'NIRCam',
    why: "Pierces dust Hubble couldn't — exposes protostars forming inside the pillar tips.",
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Pillars_of_Creation_%28NIRCam_Image%29.png/1920px-Pillars_of_Creation_%28NIRCam_Image%29.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'smacs',
    title: "Webb's First Deep Field",
    target: 'SMACS 0723',
    distance: '4.6 Bly (foreground)',
    instrument: 'NIRCam',
    why: 'Gravitational lensing reveals galaxies 13+ billion years old in a thumbnail of sky.',
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Webb%27s_First_Deep_Field.jpg/1920px-Webb%27s_First_Deep_Field.jpg",
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'phantom',
    title: 'Phantom Galaxy',
    target: 'M74',
    distance: '32 Mly',
    instrument: 'MIRI',
    why: 'Mid-infrared maps the cold dust skeleton of a perfect grand-design spiral.',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/M74_Galaxy_JWST_MIRI.jpg/1920px-M74_Galaxy_JWST_MIRI.jpg',
    credit: 'ESA/Webb, NASA, CSA, J. Lee',
  },
  {
    id: 'quintet',
    title: "Stephan's Quintet",
    target: 'HCG 92',
    distance: '290 Mly',
    instrument: 'NIRCam + MIRI',
    why: 'Five-galaxy collision — shockwaves and a black-hole outflow in unprecedented detail.',
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Stephan%27s_Quintet_as_seen_by_JWST%27s_NIRCAM.png/1920px-Stephan%27s_Quintet_as_seen_by_JWST%27s_NIRCAM.png",
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'tarantula',
    title: 'Tarantula Nebula',
    target: '30 Doradus',
    distance: '161,000 ly (LMC)',
    instrument: 'NIRCam',
    why: 'Largest, brightest star-forming region in the local group — a stellar nursery in HD.',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Tarantula_Nebula_by_JWST.jpg/1920px-Tarantula_Nebula_by_JWST.jpg',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'cartwheel',
    title: 'Cartwheel Galaxy',
    target: 'ESO 350-40',
    distance: '500 Mly',
    instrument: 'NIRCam + MIRI',
    why: 'Aftermath of a galactic collision — Webb sees through dust to track new star formation.',
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Cartwheel_Galaxy_%28MIRI%29.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'ring',
    title: 'Southern Ring Nebula',
    target: 'NGC 3132',
    distance: '2,500 ly',
    instrument: 'NIRCam + MIRI',
    why: 'Reveals a second, dust-shrouded star at the heart of the nebula for the first time.',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Southern_Ring_Nebula_%28NIRCam_and_MIRI_Images_Side_by_Side%29.png/1920px-Southern_Ring_Nebula_%28NIRCam_and_MIRI_Images_Side_by_Side%29.png',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    id: 'jupiter',
    title: 'Jupiter Auroras',
    target: 'Jupiter',
    distance: '484 Mmi',
    instrument: 'NIRCam',
    why: 'Captured polar auroras, faint rings, and atmospheric haze in a single exposure.',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Jupiter_Showcases_Auroras%2C_Hazes_%28NIRCam_Closeup%29_-_52303461859.png',
    credit: 'NASA, ESA, CSA, Jupiter ERS Team',
  },
  {
    id: 'wr140',
    title: 'WR 140 Dust Rings',
    target: 'Wolf-Rayet binary',
    distance: '5,600 ly',
    instrument: 'MIRI',
    why: 'Concentric dust shells produced every 8 years by colliding stellar winds.',
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/WR140.png',
    credit: 'NASA, ESA, CSA, STScI, JPL-Caltech',
  },
];
