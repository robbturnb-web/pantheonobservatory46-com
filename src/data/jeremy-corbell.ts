/**
 * Jeremy Corbell — investigative filmmaker dossier.
 * Curated bio, signature findings, verified videos, and live resource links.
 *
 * Video IDs were validated against YouTube's oEmbed endpoint (all 200 OK)
 * before being committed here. If a video is later pulled, the VideoEmbed
 * component renders a friendly fallback with an "Open on YouTube" link.
 */

export interface CorbellVideo {
  id: string;
  title: string;
  episode?: string;
  date: string;
  blurb: string;
}

export interface CorbellFinding {
  year: string;
  title: string;
  summary: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

export interface CorbellLink {
  label: string;
  url: string;
  description: string;
}

export const CORBELL_BIO = {
  name: 'Jeremy Kenyon Lockyer Corbell',
  title: 'Investigative Filmmaker · UAP Disclosure Journalist',
  tagline:
    'The filmmaker who keeps releasing the footage the Pentagon swore did not exist.',
  long: [
    'Jeremy Corbell is an American investigative filmmaker, photographer, and UAP journalist whose work has repeatedly forced the U.S. Department of Defense to confirm — on the record — that videos he leaked were authentic, unclassified UAP encounters captured by U.S. military personnel.',
    'Together with longtime investigative partner George Knapp, Corbell hosts WEAPONIZED, the podcast that has become the de facto first-source pipeline for active-duty and retired military whistleblowers coming forward about the UAP issue. Their reporting catalyzed congressional hearings, AARO acknowledgments, and the public release of footage including the GIMBAL, GO FAST, USS Omaha pyramid, transmedium spheres, and the Aguadilla object.',
    'He has openly stated that this work has put him in danger — that he and his sources operate under credible threat — and he continues anyway. That is why he gets his own wing of the Pantheon.',
  ],
};

/**
 * Six handpicked WEAPONIZED episodes spanning Corbell's most consequential drops.
 * Order: newest first.
 */
export const CORBELL_VIDEOS: CorbellVideo[] = [
  {
    id: '7OT6uJ0yzVY',
    title: 'They Tried To Frame UFO Whistleblower Dylan Borland For Treason',
    episode: 'WEAPONIZED — 2026',
    date: '2026-05-22',
    blurb:
      'Special-access whistleblower Dylan Borland details an alleged coordinated effort to discredit and criminally entangle UAP whistleblowers stepping forward to Congress.',
  },
  {
    id: 'gQqEkOxMhSQ',
    title: 'Sleeping Dog And The UFO Files — The Biggest UFO File Drop Ever Goes Public',
    episode: 'WEAPONIZED — 2026',
    date: '2026-05-13',
    blurb:
      'Corbell breaks down a leak of internal DoD UAP documents larger than anything previously released, including codenames now being subpoenaed by the House Oversight Committee.',
  },
  {
    id: 'HcQnbRasYxI',
    title: 'A New Chapter In The Bob Lazar Saga — Reimagining S4',
    episode: 'WEAPONIZED — 2026',
    date: '2026-04-14',
    blurb:
      'Forty years after the original Lazar disclosures, Corbell revisits S4 with new corroborating witnesses and freshly declassified DOE personnel records.',
  },
  {
    id: 'Qu8pudJk_-A',
    title: 'He Ran The Pentagon’s Secret UFO Program — Dr. James Lacatski (Part 1)',
    episode: 'WEAPONIZED — Episode 81',
    date: '2025-11-05',
    blurb:
      'The first long-form interview with Dr. James Lacatski, who ran AAWSAP. He confirms on the record that recovered non-human craft were studied under DIA contract.',
  },
  {
    id: 'ZAxI-LDrDqA',
    title: 'Immaculate Constellation — UFO Whistleblower Goes Public (Part 1)',
    episode: 'WEAPONIZED — Episode 74',
    date: '2025-04-29',
    blurb:
      'The public debut of an unacknowledged special access program (USAP) for UAP material. Nearly a million views and direct citation in congressional record.',
  },
  {
    id: '4n_bRtnIP14',
    title: 'Immaculate Constellation — A UFO Whistleblower’s Journey (Part 2)',
    episode: 'WEAPONIZED — Episode 75',
    date: '2025-05-06',
    blurb:
      'Continuation interview revealing the chain of custody on recovered NHI biologics and the DoD personnel allegedly read into the program.',
  },
];

export const CORBELL_FINDINGS: CorbellFinding[] = [
  {
    year: '2017–2024',
    title: 'GIMBAL · GO FAST · TIC TAC release',
    summary:
      'Co-authored the public release campaign that resulted in the Pentagon officially confirming the three Navy UAP videos as authentic, unclassified, and unexplained.',
    sourceLabel: 'DoD official release',
    sourceUrl: 'https://www.defense.gov/News/Releases/Release/Article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/',
  },
  {
    year: '2021',
    title: 'USS Omaha Pyramid UAPs',
    summary:
      'Released night-vision footage from the USS Omaha showing pyramid-shaped craft swarming a Navy destroyer off San Diego. AARO and the Pentagon publicly confirmed the video was authentic, captured by Navy personnel, and remains unexplained.',
    sourceLabel: 'Pentagon confirmation — The Debrief',
    sourceUrl: 'https://thedebrief.org/the-pentagon-confirms-its-investigating-leaked-navy-pyramid-uap-photos-and-video/',
  },
  {
    year: '2021',
    title: 'USS Russell Transmedium Spheres',
    summary:
      'Released footage of green spherical UAPs tracked over the USS Russell that entered the ocean without breaking up — direct transmedium behavior captured on Navy combat video.',
    sourceLabel: 'Mystery Wire (Knapp + Corbell)',
    sourceUrl: 'https://www.mysterywire.com/ufo/pentagon-confirms-leaked-photo-of-silver-blimp-shaped-uap/',
  },
  {
    year: '2022',
    title: 'Aguadilla Transmedium Object',
    summary:
      'Pushed the DHS/CBP Aguadilla thermal footage into wide public view — small craft enters ocean off Puerto Rico, splits in two, and continues underwater.',
    sourceLabel: 'Scientific Coalition for UAP Studies analysis',
    sourceUrl: 'https://www.explorescu.org/post/2013-aguadilla-puerto-rico-ufo-incident-report-released',
  },
  {
    year: '2023',
    title: 'David Grusch corroboration',
    summary:
      'Provided early platform and corroborating sources for whistleblower David Grusch ahead of his sworn congressional testimony that the U.S. government holds recovered non-human craft and biologics.',
    sourceLabel: 'House Oversight hearing transcript',
    sourceUrl: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/',
  },
  {
    year: '2024–2026',
    title: 'Immaculate Constellation disclosure',
    summary:
      'Broke public coverage of the alleged "Immaculate Constellation" unacknowledged special access program — material now referenced in active congressional oversight letters.',
    sourceLabel: 'Crockett / Luna oversight letter (referenced)',
    sourceUrl: 'https://oversight.house.gov/wp-content/uploads/2026/03/UAP-Request-Letter-FINAL.pdf',
  },
];

export const CORBELL_LINKS: CorbellLink[] = [
  {
    label: 'WeaponizedPodcast.com',
    url: 'https://www.weaponizedpodcast.com/',
    description: 'Official home of the Corbell + Knapp investigative podcast.',
  },
  {
    label: 'ExtraordinaryBeliefs.com',
    url: 'https://www.extraordinarybeliefs.com/',
    description: 'Corbell’s film, photography, and investigative archive.',
  },
  {
    label: 'YouTube · @JeremyCorbell',
    url: 'https://www.youtube.com/@JeremyCorbell',
    description: 'Every WEAPONIZED episode, leaked clip, and breaking interview.',
  },
  {
    label: 'X · @JeremyCorbell',
    url: 'https://x.com/JeremyCorbell',
    description: 'Live drops and breaking statements — fastest current-finding feed.',
  },
  {
    label: 'Instagram · @JeremyCorbell',
    url: 'https://www.instagram.com/jeremycorbell/',
    description: 'Behind-the-scenes from active investigations and field work.',
  },
  {
    label: 'MysteryWire (Knapp partnership)',
    url: 'https://www.mysterywire.com/',
    description: 'Long-form investigative articles by George Knapp & Jeremy Corbell.',
  },
];
