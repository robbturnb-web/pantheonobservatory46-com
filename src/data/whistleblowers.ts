import type { EvidenceGrade } from '../types';
import type { Source } from '../components/SourceList';
import type { VideoData } from '../components/VideoEmbed';

import davidGruschImg from '@/assets/whistleblowers/david-grusch.jpg';
import lueElizondoImg from '@/assets/whistleblowers/lue-elizondo.png';
import stevenGreerImg from '@/assets/whistleblowers/steven-greer.jpg';
import philSchneiderImg from '@/assets/whistleblowers/phil-schneider.png';
import garyMckinnonImg from '@/assets/whistleblowers/gary-mckinnon.jpg';
import bobLazarImg from '@/assets/whistleblowers/bob-lazar.jpg';
import markMccandlishImg from '@/assets/whistleblowers/mark-mccandlish.jpg';
import bobFishImg from '@/assets/whistleblowers/bob-fish.jpg';

export interface Whistleblower {
  id: string;
  name: string;
  role: string;
  status: 'alive' | 'deceased' | 'murdered';
  grade: EvidenceGrade;
  photo: string;
  /** Real public-domain / Wikipedia portrait. Absent when no verified photo is available. */
  image?: string;
  summary: string;
  keyClaims: string[];
  timeline: { year: string; event: string }[];
  sources: Source[];
  videos: VideoData[];
  accentColor: string;
}

export const whistleblowers: Whistleblower[] = [
  {
    id: 'bob-lazar',
    image: bobLazarImg,
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
    sources: [
      { label: 'KLAS-TV Interview (1989)', url: 'https://www.youtube.com/watch?v=4UgBWzdjlBQ' },
      { label: 'Joe Rogan Experience #1315', url: 'https://www.youtube.com/watch?v=BEWz4SXfyCQ' },
      { label: 'Bob Lazar: Area 51 & Flying Saucers (2018)', url: 'https://www.imdb.com/title/tt9107368/' },
      { label: 'Element 115 — Wikipedia', url: 'https://en.wikipedia.org/wiki/Moscovium' },
    ],
    videos: [
      { platform: 'youtube', id: 'BEWz4SXfyCQ', title: 'Joe Rogan Experience #1315 — Bob Lazar' },
    ],
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
    sources: [
      { label: 'Congressional Testimony (C-SPAN)', url: 'https://www.c-span.org/video/?529499-1/hearing-unidentified-anomalous-phenomena' },
      { label: 'The Debrief — Original Publication', url: 'https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-non-human-craft/' },
      { label: 'NewsNation Interview', url: 'https://www.youtube.com/watch?v=ZSj7QsHRxHQ' },
      { label: 'IC IG Credibility Determination', url: 'https://www.congress.gov/bill/118th-congress/senate-bill/2226' },
    ],
    videos: [
      { platform: 'youtube', id: 'ZSj7QsHRxHQ', title: 'David Grusch — NewsNation Exclusive Interview' },
      { platform: 'youtube', id: 'KQ7Dw-739VY', title: 'Congressional UAP Hearing (Full) — C-SPAN' },
    ],
    accentColor: '#10b981',
    image: davidGruschImg,
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
    sources: [
      { label: 'New York Times (Dec 2017)', url: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html' },
      { label: '60 Minutes Interview', url: 'https://www.youtube.com/watch?v=ZBtMbBPzqHY' },
      { label: 'Pentagon Confirmation', url: 'https://www.defense.gov/News/Releases/' },
    ],
    videos: [
      { platform: 'youtube', id: 'ZBtMbBPzqHY', title: '60 Minutes — UFOs: Lue Elizondo Interview' },
    ],
    accentColor: '#8b5cf6',
    image: lueElizondoImg,
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
    sources: [
      { label: 'Disclosure Project Press Conference (2001)', url: 'https://www.youtube.com/watch?v=4DrcG7VGgQU' },
      { label: 'Sirius Documentary', url: 'https://www.imdb.com/title/tt2658076/' },
      { label: 'Unacknowledged (2017)', url: 'https://www.imdb.com/title/tt6400614/' },
    ],
    videos: [
      { platform: 'youtube', id: '4DrcG7VGgQU', title: 'Disclosure Project — National Press Club (2001)' },
    ],
    accentColor: '#f59e0b',
    image: stevenGreerImg,
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
    sources: [
      { label: 'Phil Schneider Lecture Series (1995)', url: 'https://www.youtube.com/watch?v=Slgb5U-OqFM' },
      { label: 'Cynthia Drayer Interview', url: 'https://www.youtube.com/results?search_query=cynthia+drayer+phil+schneider' },
    ],
    videos: [
      { platform: 'youtube', id: 'Slgb5U-OqFM', title: 'Phil Schneider — Last Lecture Before Death' },
    ],
    accentColor: '#ef4444',
    image: philSchneiderImg,
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
    sources: [
      { label: 'BBC Interview (2006)', url: 'https://www.bbc.co.uk/news/technology-18630275' },
      { label: 'Wired Magazine', url: 'https://www.wired.com/2006/06/ufo-hacker-tells-what-he-found/' },
      { label: 'The Guardian', url: 'https://www.theguardian.com/world/gary-mckinnon' },
    ],
    videos: [],
    accentColor: '#06b6d4',
    image: garyMckinnonImg,
  },
  {
    id: 'mark-mccandlish',
    image: markMccandlishImg,
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
    sources: [
      { label: 'Disclosure Project Testimony (2001)', url: 'https://www.youtube.com/watch?v=4DrcG7VGgQU' },
      { label: 'Zero Point Documentary', url: 'https://www.imdb.com/title/tt3908768/' },
    ],
    videos: [],
    accentColor: '#a855f7',
  },
  {
    id: 'bob-fish',
    image: bobFishImg,
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
    sources: [
      { label: 'WikiLeaks — Podesta Emails', url: 'https://wikileaks.org/podesta-emails/' },
      { label: 'The Black Vault Analysis', url: 'https://www.theblackvault.com/' },
    ],
    videos: [],
    accentColor: '#14b8a6',
  },
];
