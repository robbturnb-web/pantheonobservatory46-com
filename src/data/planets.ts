export interface Planet {
  id: string;
  name: string;
  distance: number; // orbital distance (scaled for 3D)
  size: number; // radius scale
  color: string;
  orbitSpeed: number;
  facts: string[];
  mythology: string;
  theories: string;
}

export const planets: Planet[] = [
  {
    id: 'sun',
    name: 'Sol (The Sun)',
    distance: 0,
    size: 2.5,
    color: '#fbbf24',
    orbitSpeed: 0,
    facts: [
      'Surface temperature: 5,500°C (9,932°F)',
      'Contains 99.86% of the solar system\'s mass',
      'Light takes 8 minutes 20 seconds to reach Earth',
      'Currently in the middle of its ~10 billion year lifespan',
    ],
    mythology: 'Ra (Egypt), Helios/Apollo (Greece), Surya (Hindu), Sol Invictus (Rome), Amaterasu (Japan). Nearly every civilization built temples aligned to solar events.',
    theories: 'Some researchers propose the sun exhibits anomalous behavior cycles that correlate with mass consciousness events and geomagnetic disturbances affecting human cognition.',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    distance: 5,
    size: 0.3,
    color: '#9ca3af',
    orbitSpeed: 4.15,
    facts: [
      'Closest planet to the Sun — 57.9 million km',
      'A year lasts just 88 Earth days',
      'Temperature swings from -180°C to 430°C',
      'Has no atmosphere and no moons',
    ],
    mythology: 'Named for the Roman messenger god. Hermes (Greek), Thoth (Egyptian), Budha (Hindu). Associated with communication, intellect, and trickery across cultures.',
    theories: 'Mercury\'s anomalous orbital precession was unexplained by Newtonian physics — Einstein\'s general relativity finally solved it in 1915.',
  },
  {
    id: 'venus',
    name: 'Venus',
    distance: 7,
    size: 0.5,
    color: '#fcd34d',
    orbitSpeed: 1.62,
    facts: [
      'Hottest planet: 465°C surface due to runaway greenhouse effect',
      'Rotates backwards (retrograde) — sun rises in the west',
      'A day on Venus is longer than its year',
      'In 2020, phosphine gas was detected — possible biosignature',
    ],
    mythology: 'Aphrodite (Greek), Ishtar (Babylonian), Quetzalcoatl as Morning Star (Aztec), Shukra (Hindu). The brightest object in the sky after Sun and Moon.',
    theories: 'The phosphine detection on Venus sparked debate about aerial microbial life in cloud layers. Soviet Venera missions captured surface images showing anomalous geometric formations.',
  },
  {
    id: 'earth',
    name: 'Earth',
    distance: 9.5,
    size: 0.55,
    color: '#3b82f6',
    orbitSpeed: 1.0,
    facts: [
      'Only known planet with confirmed life',
      '71% covered in water — unique in the solar system',
      'Magnetic field protects from solar radiation',
      'Moon stabilizes axial tilt, enabling seasons',
    ],
    mythology: 'Gaia (Greek), Jörð (Norse), Prithvi (Hindu), Pachamama (Inca). Almost every culture personified Earth as a mother goddess.',
    theories: 'The "Rare Earth" hypothesis suggests our planet\'s conditions are extraordinarily unlikely. Others propose Earth was seeded by extraterrestrial intervention (directed panspermia).',
  },
  {
    id: 'mars',
    name: 'Mars',
    distance: 12,
    size: 0.4,
    color: '#ef4444',
    orbitSpeed: 0.53,
    facts: [
      'Has the largest volcano (Olympus Mons) and canyon (Valles Marineris)',
      'Evidence of ancient liquid water confirmed',
      'Curiosity and Perseverance rovers actively exploring',
      'Methane detected — possibly biological or geological',
    ],
    mythology: 'Ares (Greek), Mangala (Hindu), Nergal (Babylonian). Universally associated with war, conflict, and masculine energy.',
    theories: 'The "Face on Mars" (Cydonia) and pyramid-like structures sparked decades of debate. Richard Hoagland proposed an ancient Martian civilization.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    distance: 17,
    size: 1.5,
    color: '#f97316',
    orbitSpeed: 0.084,
    facts: [
      'Largest planet — could fit 1,300 Earths inside',
      'Great Red Spot is a storm larger than Earth, raging for 350+ years',
      '95 known moons including Europa (subsurface ocean)',
      'Acts as a cosmic shield, deflecting asteroids from inner planets',
    ],
    mythology: 'Zeus (Greek), Thor\'s association (Norse), Brihaspati (Hindu), Marduk (Babylonian). King of the gods across multiple pantheons.',
    theories: 'Europa\'s subsurface ocean is considered one of the most likely places for extraterrestrial life in our solar system. NASA\'s Europa Clipper mission launches to investigate.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    distance: 22,
    size: 1.2,
    color: '#d4a574',
    orbitSpeed: 0.034,
    facts: [
      'Iconic ring system made of ice and rock particles',
      'Density so low it would float in water',
      '146 known moons — Titan has a thick atmosphere and methane lakes',
      'Hexagonal storm at the north pole remains unexplained',
    ],
    mythology: 'Kronos (Greek), Shani (Hindu), associated with time, karma, and harvest. Saturday is named after Saturn.',
    theories: 'Saturn\'s perfect hexagonal storm and the anomalous properties of its rings have led to fringe theories about artificial construction. The "Saturn-Moon Matrix" theory proposes Saturn broadcasts a frequency affecting human consciousness.',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    distance: 27,
    size: 0.8,
    color: '#67e8f9',
    orbitSpeed: 0.012,
    facts: [
      'Rotates on its side — 98° axial tilt',
      'Discovered in 1781 by William Herschel',
      'Has 13 known rings and 28 moons',
      'Coldest planetary atmosphere: -224°C',
    ],
    mythology: 'Named for the Greek god of the sky (Ouranos), father of the Titans. One of the primordial deities in Greek cosmogony.',
    theories: 'Uranus\'s extreme tilt suggests a massive collision with an Earth-sized object early in solar system history. What caused it remains debated.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    distance: 32,
    size: 0.75,
    color: '#3b82f6',
    orbitSpeed: 0.006,
    facts: [
      'Fastest winds in the solar system: 2,100 km/h',
      'Predicted mathematically before it was observed',
      'Triton orbits backwards — likely a captured Kuiper Belt object',
      'Takes 165 years to orbit the Sun',
    ],
    mythology: 'Poseidon (Greek), god of the sea. Its blue color and association with water transcends cultures.',
    theories: 'Neptune\'s mathematical prediction before observation is one of the great triumphs of physics. Its moon Triton may harbor a subsurface ocean.',
  },
  {
    id: 'pluto',
    name: 'Pluto',
    distance: 37,
    size: 0.2,
    color: '#a78bfa',
    orbitSpeed: 0.004,
    facts: [
      'Reclassified as dwarf planet in 2006',
      'New Horizons flyby (2015) revealed a heart-shaped glacier',
      'Has 5 moons — Charon is nearly half Pluto\'s size',
      'May have a subsurface ocean',
    ],
    mythology: 'Hades (Greek), god of the underworld. Its distance and darkness earned it the name of the lord of the dead.',
    theories: 'Some astronomers argue Pluto\'s reclassification was premature. The "Planet Nine" hypothesis suggests an undiscovered planet 10x Earth\'s mass lurking beyond Pluto.',
  },
];
