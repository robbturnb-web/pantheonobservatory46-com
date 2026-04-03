export interface Moon {
  id: string;
  name: string;
  parentId: string;
  distance: number;
  size: number;
  color: string;
  orbitSpeed: number;
  facts: string[];
  mythology: string;
  theories: string;
}

export interface Planet {
  id: string;
  name: string;
  distance: number;
  size: number;
  color: string;
  orbitSpeed: number;
  facts: string[];
  mythology: string;
  theories: string;
  moons?: Moon[];
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
    moons: [
      {
        id: 'moon',
        name: 'The Moon',
        parentId: 'earth',
        distance: 1.5,
        size: 0.15,
        color: '#d1d5db',
        orbitSpeed: 3,
        facts: [
          'Tidally locked — always shows the same face to Earth',
          'Apollo missions (1969–1972) landed 12 humans on its surface',
          'Stabilizes Earth\'s axial tilt, making seasons possible',
          'Diameter is exactly 1/400th of the Sun, enabling perfect eclipses',
        ],
        mythology: 'Selene/Artemis (Greek), Luna (Roman), Chandra (Hindu), Thoth/Khonsu (Egyptian). Universally tied to cycles, femininity, and the unconscious mind.',
        theories: 'The "Hollow Moon" hypothesis notes the Moon rang like a bell during Apollo 12 seismic tests. Its precise size ratio to the Sun and perfect orbital geometry have led some to suggest artificial placement.',
      },
    ],
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
    moons: [
      {
        id: 'europa',
        name: 'Europa',
        parentId: 'jupiter',
        distance: 2.5,
        size: 0.18,
        color: '#e0e7ff',
        orbitSpeed: 2.5,
        facts: [
          'Subsurface ocean contains 2–3x more water than all of Earth\'s oceans',
          'Ice shell is 15–25 km thick with possible hydrothermal vents below',
          'NASA\'s Europa Clipper mission will perform 49 close flybys',
          'Water plumes erupting from the surface detected by Hubble',
        ],
        mythology: 'Named for the Phoenician princess Europa, whom Zeus abducted in the form of a white bull. A symbol of beauty worth crossing oceans for.',
        theories: 'Europa is considered the #1 candidate for extraterrestrial life in our solar system. Some researchers propose bioluminescent organisms could exist in its dark ocean, detectable by future lander missions.',
      },
    ],
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
    moons: [
      {
        id: 'titan',
        name: 'Titan',
        parentId: 'saturn',
        distance: 2.2,
        size: 0.22,
        color: '#f59e0b',
        orbitSpeed: 1.8,
        facts: [
          'Only moon with a dense atmosphere — thicker than Earth\'s',
          'Methane lakes and rivers on its surface (Huygens probe landed 2005)',
          'Prebiotic chemistry: complex organic molecules detected',
          'Dragonfly rotorcraft mission will explore its surface in the 2030s',
        ],
        mythology: 'Named after the Titans of Greek mythology — the elder gods who ruled before the Olympians. Titan embodies primordial, pre-civilizational power.',
        theories: 'Titan\'s methane cycle mirrors Earth\'s water cycle, leading some astrobiologists to propose methane-based life forms. Its thick haze may hide surface features detectable only by radar.',
      },
    ],
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

export const tourNarration: Record<string, string> = {
  mercury: "Welcome aboard, Starseed. First stop — Mercury. The messenger world. Closest to the Sun, scorched on one side, frozen on the other. Even Einstein needed this planet to prove his greatest theory.",
  venus: "Venus — Earth's twisted twin. Imagine a world where the sun rises in the west, and the surface could melt lead. Yet in 2020, scientists detected phosphine... could something be alive in those clouds?",
  earth: "Home. The pale blue dot. The only confirmed harbor of consciousness in the cosmos — or so they tell us. But why does every ancient culture say visitors came from above?",
  mars: "The Red Planet. Once had oceans, rivers, perhaps life. The Face on Mars, the pyramids of Cydonia — imagination, or memory? Perseverance is digging for answers right now.",
  jupiter: "The King. Jupiter's mass shields us from asteroids like a cosmic guardian. But the real story is Europa — beneath its ice, an ocean twice the volume of Earth's. Life, waiting to be found.",
  saturn: "Saturn. Lord of Rings and Time. That hexagonal storm at its north pole? Still unexplained. Some say Saturn broadcasts a frequency. Listen closely, Starseed.",
  uranus: "Uranus — knocked on its side by an ancient impact. It rolls through space like no other world. 98 degrees of defiance. What hit it? We still don't know.",
  neptune: "Neptune — predicted by mathematics before any human eye saw it. Winds at 2,100 km/h. Its moon Triton orbits backwards, a captured wanderer from the Kuiper Belt.",
  pluto: "Pluto. They said it wasn't a planet anymore. But New Horizons showed us a heart-shaped glacier and mountains of ice. Beyond Pluto, something massive may lurk — Planet Nine. The journey continues...",
};
