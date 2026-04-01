import type { EvidenceGrade } from '../types';

export interface Whistleblower {
  id: string;
  name: string;
  role: string;
  status: 'alive' | 'deceased' | 'murdered';
  grade: EvidenceGrade;
  photo: string;
  summary: string;
  keyClaims: string[];
  timeline: { year: string; event: string }[];
  sources: string[];
  accentColor: string;
}

export const whistleblowers: Whistleblower[] = [
  {
    id: 'bob-lazar',
    name: 'Bob Lazar',
    role: 'Physicist — Area 51 / S-4',
    status: 'alive',
    grade: 'CREDIBLE',
    photo: '🧪',
    summary: 'Claims to have worked on reverse-engineering extraterrestrial technology at a site called S-4 near Area 51. Introduced the public to Element 115 (Moscovium) years before its official synthesis.',
    keyClaims: [
      'Worked at S-4, a facility near Area 51, on alien spacecraft',
      'Described Element 115 as a fuel source — later synthesized in 2003',
      'Claimed 9 alien craft were stored at S-4',
      'Described gravity propulsion systems using gravity wave amplification',
      'Said briefing documents described alien involvement in human evolution',
    ],
    timeline: [
      { year: '1988', event: 'Hired at S-4 facility near Groom Lake' },
      { year: '1989', event: 'Goes public on KLAS-TV with George Knapp' },
      { year: '2003', event: 'Element 115 (Moscovium) synthesized, partially validating claims' },
      { year: '2018', event: 'Featured in Jeremy Corbell documentary' },
    ],
    sources: ['KLAS-TV Interview (1989)', 'Bob Lazar: Area 51 & Flying Saucers (2018)'],
    accentColor: '#3b82f6',
  },
  {
    id: 'david-grusch',
    name: 'David Grusch',
    role: 'Intelligence Officer — NGA/NRO',
    status: 'alive',
    grade: 'DOCUMENTED',
    photo: '🎖️',
    summary: 'Former intelligence officer who filed a whistleblower complaint alleging the US government possesses intact non-human craft and biological specimens. Testified before Congress in July 2023.',
    keyClaims: [
      'US government has intact non-human vehicles',
      'Biologics (non-human bodies) have been recovered',
      'A secret crash retrieval program has existed for decades',
      'People have been harmed to protect the secret',
      'Multiple allies also have craft retrieval programs',
    ],
    timeline: [
      { year: '2019-2021', event: 'Served as NRO representative to UAP Task Force' },
      { year: '2022', event: 'Filed whistleblower complaint with Intelligence Community IG' },
      { year: '2023 Jun', event: 'Story breaks via The Debrief' },
      { year: '2023 Jul', event: 'Testifies under oath before House Oversight Committee' },
    ],
    sources: ['Congressional Testimony (July 26, 2023)', 'The Debrief (June 2023)', 'NewsNation Interview'],
    accentColor: '#10b981',
  },
  {
    id: 'lue-elizondo',
    name: 'Lue Elizondo',
    role: 'Director — AATIP (Pentagon)',
    status: 'alive',
    grade: 'DOCUMENTED',
    photo: '🕵️',
    summary: 'Former director of the Advanced Aerospace Threat Identification Program (AATIP). Resigned from the Pentagon in 2017 citing excessive secrecy and lack of attention to UAP threats.',
    keyClaims: [
      'Directed AATIP from 2007-2017 investigating UAPs',
      'UAPs demonstrate technology far beyond known human capability',
      'Five observables: anti-gravity lift, sudden acceleration, hypersonic velocities, low observability, trans-medium travel',
      'Multiple sensor confirmations of UAP encounters',
      'Pentagon attempted to suppress UAP information',
    ],
    timeline: [
      { year: '2007', event: 'AATIP program launched under DIA' },
      { year: '2017 Oct', event: 'Resigns from Pentagon, joins To The Stars Academy' },
      { year: '2017 Dec', event: 'NYT publishes landmark UAP story with AATIP videos' },
      { year: '2021', event: 'Confirmed by Pentagon as former AATIP director' },
    ],
    sources: ['New York Times (Dec 2017)', 'Pentagon Confirmation (2021)', '60 Minutes Interview'],
    accentColor: '#8b5cf6',
  },
  {
    id: 'steven-greer',
    name: 'Steven Greer',
    role: 'ER Doctor — Disclosure Project Founder',
    status: 'alive',
    grade: 'SPECULATIVE',
    photo: '🌌',
    summary: 'Founded the Disclosure Project and organized the 2001 National Press Club event with 20+ military/intelligence witnesses. Promotes CE-5 contact protocols. Controversial for mixing credible testimony with unverified claims.',
    keyClaims: [
      'Organized 2001 National Press Club event with 400+ witnesses',
      'Claims CE-5 protocols enable voluntary ET contact',
      'Alleges a shadow government controls UFO secrecy',
      'Says zero-point energy technology is being suppressed',
      'Asserts all ET contact is benevolent',
    ],
    timeline: [
      { year: '1993', event: 'Founds CSETI (Center for the Study of Extraterrestrial Intelligence)' },
      { year: '2001', event: 'Disclosure Project National Press Club event' },
      { year: '2013', event: 'Releases "Sirius" documentary' },
      { year: '2017', event: 'Releases "Unacknowledged" documentary' },
    ],
    sources: ['Disclosure Project (2001)', 'Sirius Documentary (2013)', 'Unacknowledged (2017)'],
    accentColor: '#f59e0b',
  },
  {
    id: 'phil-schneider',
    name: 'Phil Schneider',
    role: 'Geologist / Engineer — Underground Bases',
    status: 'murdered',
    grade: 'UNVERIFIED',
    photo: '⛏️',
    summary: 'Claimed to be a government geologist who helped build Deep Underground Military Bases (DUMBs). Alleged a 1979 firefight with alien beings at Dulce Base. Found dead under suspicious circumstances in 1996.',
    keyClaims: [
      'Helped build 13 Deep Underground Military Bases',
      'Claimed a 1979 firefight with Grey aliens at Dulce, NM',
      'Lost fingers and was hit by an alien weapon during Dulce incident',
      'Said 131 DUMBs exist worldwide connected by mag-lev tunnels',
      'Warned about New World Order using alien technology',
    ],
    timeline: [
      { year: '1979', event: 'Alleged Dulce Base firefight with aliens' },
      { year: '1995', event: 'Begins giving public lectures about DUMBs' },
      { year: '1996 Jan', event: 'Found dead — ruled suicide, family disputes cause' },
    ],
    sources: ['Phil Schneider Lecture Series (1995)', 'Cynthia Drayer Interviews'],
    accentColor: '#ef4444',
  },
  {
    id: 'gary-mckinnon',
    name: 'Gary McKinnon',
    role: 'Hacker — NASA / US Military',
    status: 'alive',
    grade: 'CREDIBLE',
    photo: '💻',
    summary: 'British hacker who broke into 97 US military and NASA computers in 2001-2002. Claims he found evidence of a secret space program called "Solar Warden" and a list of "non-terrestrial officers."',
    keyClaims: [
      'Found a spreadsheet listing "non-terrestrial officers"',
      'Discovered references to fleet-to-fleet transfers (Solar Warden)',
      'Found unprocessed high-res images at NASA Johnson Space Center',
      'Saw a cigar-shaped craft in a NASA image before connection was cut',
      'US sought extradition for "biggest military hack of all time"',
    ],
    timeline: [
      { year: '2001-2002', event: 'Hacks into 97 US military and NASA computers' },
      { year: '2002', event: 'Arrested by UK National Hi-Tech Crime Unit' },
      { year: '2006-2012', event: 'Fights extradition to the US' },
      { year: '2012', event: 'UK blocks extradition on human rights grounds' },
    ],
    sources: ['BBC Interview (2006)', 'Wired Magazine', 'Guardian Coverage'],
    accentColor: '#06b6d4',
  },
  {
    id: 'mark-mccandlish',
    name: 'Mark McCandlish',
    role: 'Aerospace Illustrator — ARV Witness',
    status: 'deceased',
    grade: 'CREDIBLE',
    photo: '✈️',
    summary: 'Aerospace illustrator who presented detailed testimony about the Alien Reproduction Vehicle (ARV) — a craft allegedly reverse-engineered from recovered technology. Found dead in 2021, ruled suicide.',
    keyClaims: [
      'Detailed the Alien Reproduction Vehicle (Fluxliner)',
      'ARV uses Biefeld-Brown effect for propulsion',
      'Craft was displayed at a 1988 Norton AFB air show (invitation only)',
      'Three ARVs of different sizes were shown',
      'Technology could revolutionize energy and transportation',
    ],
    timeline: [
      { year: '1988', event: 'Norton AFB showing of ARVs (reported secondhand)' },
      { year: '2001', event: 'Testifies at Disclosure Project press conference' },
      { year: '2021 Apr', event: 'Found dead — ruled suicide by shotgun' },
    ],
    sources: ['Disclosure Project Testimony (2001)', 'Zero Point Documentary'],
    accentColor: '#a855f7',
  },
  {
    id: 'bob-fish',
    name: 'Bob Fish',
    role: 'Intelligence Insider — DIA / Navy',
    status: 'alive',
    grade: 'CREDIBLE',
    photo: '🐟',
    summary: 'Former US intelligence operative who confirmed to John Podesta via email that the US tracked UAPs using a dedicated space-based surveillance system during the Cold War.',
    keyClaims: [
      'Confirmed US tracked UAPs with dedicated systems',
      'Space-based sensors detected UAP activity',
      'Emailed John Podesta directly with classified insights',
      'UAP tracking was routine but compartmentalized',
      'Multiple agencies were aware but maintained secrecy',
    ],
    timeline: [
      { year: '2014-2015', event: 'Emails with John Podesta revealed via WikiLeaks' },
      { year: '2016', event: 'Podesta emails released publicly' },
    ],
    sources: ['WikiLeaks Podesta Emails', 'The Black Vault Analysis'],
    accentColor: '#14b8a6',
  },
];
