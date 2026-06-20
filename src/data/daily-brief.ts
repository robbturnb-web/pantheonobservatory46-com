/**
 * Daily Brief — editorial rotation for the homepage Pantheon Daily Brief.
 * Mythology Spotlight and Mystery Watch cycle deterministically by UTC day.
 */

export interface BriefSpotlight {
  title: string;
  summary: string;
  source: string;
  link?: string;
}

export const mythologySpotlights: BriefSpotlight[] = [
  { title: 'Thoth — Scribe of the Gods', summary: 'Egyptian god of writing, measurement, and the moon. Said to have authored the Emerald Tablets that shaped Hermetic philosophy.', source: 'British Museum · Egyptian Pantheon', link: 'https://www.britishmuseum.org' },
  { title: 'Odin — All-Father', summary: 'Hung nine nights on Yggdrasil to win the runes. Norse archetype of wisdom bought through sacrifice.', source: 'Poetic Edda · Hávamál' },
  { title: 'Quetzalcoatl — Feathered Serpent', summary: 'Mesoamerican deity of wind, learning, and resurrection. Said to return from the east.', source: 'Florentine Codex' },
  { title: 'Inanna — Queen of Heaven', summary: 'Sumerian goddess who descended into the underworld and returned reborn — humanity\'s oldest recorded mythic cycle.', source: 'Descent of Inanna · 1900 BCE' },
  { title: 'Shiva — The Destroyer', summary: 'Hindu deity of dissolution and renewal. Dances the cosmos into and out of being.', source: 'Shiva Purana' },
  { title: 'Anu — Sky Father of Sumer', summary: 'Father of the Anunnaki. The first recorded "sky god" in human history.', source: 'Sumerian King List' },
  { title: 'Athena — Born of Mind', summary: 'Sprang fully armored from the forehead of Zeus. Patron of wisdom, war, and weaving — the strategic intellect.', source: 'Hesiod · Theogony' },
];

export const mysteryWatch: BriefSpotlight[] = [
  { title: 'Schumer-Rounds UAP Disclosure Act', summary: 'Updated legislation pushing eminent-domain reclamation of any non-human craft held by private defense contractors.', source: 'Congress.gov', link: 'https://www.congress.gov' },
  { title: 'The Vanishing — 11 Scientists', summary: 'Congress demands briefings on 11 dead or missing personnel tied to U.S. nuclear and aerospace programs.', source: 'House Oversight Committee' },
  { title: 'AARO Historical Record Review', summary: 'The All-domain Anomaly Resolution Office continues its review of 80 years of U.S. UAP files.', source: 'DoD AARO', link: 'https://www.aaro.mil' },
  { title: 'Antarctica Pyramid Anomalies', summary: 'Satellite imagery continues to surface pyramid-shaped formations in the Ellsworth range — geology debates rage.', source: 'Smithsonian Magazine' },
  { title: 'Egyptian Sphinx Subsurface Voids', summary: 'Ground-penetrating radar surveys keep revealing chambers and tunnels beneath the Giza plateau.', source: 'ScanPyramids Project' },
  { title: 'Brazil — Ilha das Cobras Pulse', summary: 'Decades of consistent UAP reports continue around Brazilian coastal military zones.', source: 'Brazilian Air Force FAB' },
  { title: 'Vatican Apostolic Archive', summary: '53 miles of shelving · officially open for research but restricted; rumored ancient and gnostic texts remain off-catalog.', source: 'Vatican Library' },
];

export function getTodaysSpotlight<T>(arr: T[]): T {
  const dayIdx = Math.floor(Date.now() / 86_400_000) % arr.length;
  return arr[dayIdx];
}
