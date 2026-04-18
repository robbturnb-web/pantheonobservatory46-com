import type { EvidenceGrade } from '../types';
import type { Source } from '../components/SourceList';

export interface SuspiciousDeath {
  id: string;
  name: string;
  role: string;
  field: 'UAP' | 'Aerospace' | 'Microbiology' | 'Nuclear' | 'Intelligence' | 'Corporate';
  dateOfDeath: string; // ISO-ish "YYYY-MM-DD" or "Month YYYY"
  age?: number;
  location: string;
  officialCause: string;
  suspiciousCircumstances: string[];
  whatTheyKnew: string;
  aboutToReveal?: string;
  grade: EvidenceGrade;
  symbol: string; // emoji
  accentColor: string;
  pattern?: string; // e.g. "Marconi cluster", "Boeing 2024"
  sources: Source[];
}

export const suspiciousDeaths: SuspiciousDeath[] = [
  // ───────────────────────── BOEING WHISTLEBLOWERS (2024) ─────────────────────────
  {
    id: 'john-barnett',
    name: 'John Barnett',
    role: 'Boeing Quality Manager (32 years)',
    field: 'Aerospace',
    dateOfDeath: '2024-03-09',
    age: 62,
    location: 'Charleston, SC — hotel parking lot',
    officialCause: 'Self-inflicted gunshot wound (ruled suicide)',
    suspiciousCircumstances: [
      'Died mid-deposition against Boeing — had completed two days of testimony, third day pending',
      'Family, friends, and his attorney publicly stated he was not suicidal: "He was in good spirits and looking forward to putting this behind him"',
      'Found in his truck holding a gun, with a notebook reportedly reading "I pray Boeing pays"',
      'Charleston PD investigation took months; family hired private investigator',
      'Was the first major Boeing whistleblower of 2024 — set off a chain',
    ],
    whatTheyKnew:
      'Documented systemic safety defects on the 787 Dreamliner production line: shoddy oxygen systems (1 in 4 emergency masks failed), substandard parts pulled from scrap bins and installed on aircraft, and pressure to ignore defects to maintain delivery quotas.',
    aboutToReveal:
      'Final day of deposition was to cover retaliation by Boeing leadership and naming specific executives who suppressed his FAA complaints.',
    grade: 'DOCUMENTED',
    symbol: '✈️',
    accentColor: '#ef4444',
    pattern: 'Boeing 2024 cluster',
    sources: [
      { label: 'BBC — Boeing whistleblower found dead', url: 'https://www.bbc.com/news/world-us-canada-68534703' },
      { label: 'AP News — Charleston coroner ruling', url: 'https://apnews.com/article/boeing-whistleblower-john-barnett' },
      { label: 'Family attorney statement (Knight Law)', url: 'https://www.cbsnews.com/news/boeing-whistleblower-john-barnett-death-attorney/' },
    ],
  },
  {
    id: 'joshua-dean',
    name: 'Joshua Dean',
    role: 'Spirit AeroSystems Quality Auditor',
    field: 'Aerospace',
    dateOfDeath: '2024-04-30',
    age: 45,
    location: 'Wichita, KS — hospital',
    officialCause: 'Sudden infection (MRSA + influenza B + pneumonia)',
    suspiciousCircumstances: [
      'Healthy, athletic 45-year-old with no prior conditions',
      'Second Boeing-adjacent whistleblower to die in seven weeks (after John Barnett)',
      'Had publicly accused Spirit AeroSystems leadership of ignoring 737 MAX defects',
      'Was a named plaintiff in shareholder lawsuit against Spirit',
      'Died after rapid two-week decline from a bacterial infection that resists most antibiotics',
    ],
    whatTheyKnew:
      'Identified mis-drilled fuselage holes on 737 MAX aircraft built by Spirit (Boeing\'s primary supplier). Was fired in 2023 after reporting the defects internally — defects later confirmed by FAA after the Alaska Airlines door-plug blowout (Jan 2024).',
    grade: 'DOCUMENTED',
    symbol: '🔧',
    accentColor: '#ef4444',
    pattern: 'Boeing 2024 cluster',
    sources: [
      { label: 'Seattle Times — Spirit whistleblower dies', url: 'https://www.seattletimes.com/business/boeing-aerospace/second-boeing-whistleblower-dies/' },
      { label: 'Reuters — Joshua Dean death', url: 'https://www.reuters.com/business/aerospace-defense/boeing-supplier-whistleblower-joshua-dean-dies-2024-05-02/' },
    ],
  },

  // ───────────────────────── UAP / DR. JAMES MCDONALD ─────────────────────────
  {
    id: 'james-mcdonald',
    name: 'Dr. James E. McDonald',
    role: 'Senior Physicist, Univ. of Arizona Institute of Atmospheric Physics',
    field: 'UAP',
    dateOfDeath: '1971-06-13',
    age: 51,
    location: 'Tucson, AZ — desert wash near his home',
    officialCause: 'Self-inflicted gunshot wound',
    suspiciousCircumstances: [
      'Was the most credentialed scientist publicly demanding Congress investigate UFOs',
      'Had testified before the House Committee on Science and Astronautics (1968) calling Project Blue Book "scientifically worthless"',
      'Career was systematically destroyed by Air Force-linked academics in the 18 months prior',
      'First suicide attempt in March 1971 left him blind — his second attempt succeeded',
      'Family and colleagues reported he believed his career destruction was orchestrated',
    ],
    whatTheyKnew:
      'Personally interviewed over 500 UFO witnesses, including military pilots, radar operators, and police. Concluded the phenomenon represented "the greatest scientific problem of our times" and that the Air Force was actively suppressing data.',
    aboutToReveal:
      'Was preparing a comprehensive scientific paper synthesizing the Air Force\'s suppressed Blue Book case files.',
    grade: 'CREDIBLE',
    symbol: '🔭',
    accentColor: '#a855f7',
    sources: [
      { label: 'Firestorm: Dr. James E. McDonald\'s Fight for UFO Science (Druffel, 2003)', url: 'https://www.amazon.com/Firestorm-Dr-James-McDonald-Science/dp/1893183106' },
      { label: '1968 Congressional testimony', url: 'https://history.nasa.gov/sp4218/sp4218.htm' },
    ],
  },
  {
    id: 'morris-jessup',
    name: 'Morris K. Jessup',
    role: 'Astronomer / UFO researcher (Philadelphia Experiment)',
    field: 'UAP',
    dateOfDeath: '1959-04-20',
    age: 59,
    location: 'Dade County, FL — found in his car',
    officialCause: 'Carbon monoxide poisoning, ruled suicide',
    suspiciousCircumstances: [
      'Found dead days before a scheduled meeting with researcher Dr. J. Manson Valentine',
      'Had recently received the "Allende letters" annotating his book with claims about USS Eldridge teleportation',
      'ONR (Office of Naval Research) had taken unusual interest in his annotated copy',
      'Hose from exhaust pipe was wet — friends questioned whether he could have set it up himself',
    ],
    whatTheyKnew:
      'Author of The Case for the UFO. Had been investigating Navy claims of invisibility/teleportation experiments and was reportedly close to a breakthrough connection.',
    grade: 'SPECULATIVE',
    symbol: '⚓',
    accentColor: '#a855f7',
    sources: [
      { label: 'The Case for the UFO — Annotated edition (VARO press)', url: 'https://archive.org/details/CaseForTheUFO' },
    ],
  },

  // ───────────────────────── MICROBIOLOGISTS CLUSTER (2001-2005) ─────────────────────────
  {
    id: 'don-wiley',
    name: 'Dr. Don C. Wiley',
    role: 'Harvard biochemist / HHMI investigator (HIV, Ebola, influenza)',
    field: 'Microbiology',
    dateOfDeath: '2001-11-15',
    age: 57,
    location: 'Memphis, TN — body found in Mississippi River',
    officialCause: 'Accidental fall from Hernando de Soto Bridge',
    suspiciousCircumstances: [
      'Disappeared after a St. Jude conference dinner; rental car found on bridge with keys in ignition',
      'Body recovered 320 miles downriver, 1 month later',
      'World-renowned for structural work on viruses with bioweapon potential',
      'One of dozens of microbiologists to die suddenly between Oct 2001 and 2005 (the "dead microbiologists" cluster)',
    ],
    whatTheyKnew:
      'Pioneered understanding of how immune system recognizes viruses — knowledge directly relevant to designing vaccines AND engineered pathogens.',
    grade: 'CREDIBLE',
    symbol: '🧬',
    accentColor: '#22d3ee',
    pattern: 'Dead Microbiologists cluster (2001–2005)',
    sources: [
      { label: 'Harvard Magazine obituary', url: 'https://www.harvardmagazine.com/2002/01/in-memoriam-don-wiley.html' },
      { label: 'NYT — Scientist\'s Death Is Ruled an Accident', url: 'https://www.nytimes.com/2002/01/15/us/scientist-s-death-is-ruled-an-accident.html' },
    ],
  },
  {
    id: 'set-van-nguyen',
    name: 'Dr. Set Van Nguyen',
    role: 'Microbiologist, CSIRO Animal Diseases (Australia)',
    field: 'Microbiology',
    dateOfDeath: '2001-12-12',
    age: 44,
    location: 'Geelong, Australia — laboratory airlock',
    officialCause: 'Asphyxiation in nitrogen-filled airlock',
    suspiciousCircumstances: [
      'Worked at facility that engineered the mousepox virus (a model for weaponized smallpox)',
      'Death came 4 weeks after Don Wiley',
      'Lab safety protocols required oxygen monitoring that should have prevented this',
    ],
    whatTheyKnew:
      'CSIRO had inadvertently created a 100% lethal mousepox strain in 2000 — work with direct dual-use implications for smallpox bioweapons.',
    grade: 'CREDIBLE',
    symbol: '🧬',
    accentColor: '#22d3ee',
    pattern: 'Dead Microbiologists cluster (2001–2005)',
    sources: [
      { label: 'The Guardian — Mystery of dying microbiologists', url: 'https://www.theguardian.com/world/2002/feb/12/sciencenews.guardiansocietysupplement' },
    ],
  },
  {
    id: 'benito-que',
    name: 'Dr. Benito Que',
    role: 'Cell biologist, Univ. of Miami School of Medicine',
    field: 'Microbiology',
    dateOfDeath: '2001-12-06',
    age: 52,
    location: 'Miami, FL — parking lot near his lab',
    officialCause: 'Initially "mugging," later changed to stroke',
    suspiciousCircumstances: [
      'Found beaten in parking lot — witnesses reported seeing 4 men attack him',
      'Cause of death later revised to stroke despite head trauma',
      'Worked on infectious diseases / HIV',
      'Died in same window as Wiley and Nguyen',
    ],
    whatTheyKnew: 'Researched pathogen mechanisms with bioweapons relevance.',
    grade: 'SPECULATIVE',
    symbol: '🧬',
    accentColor: '#22d3ee',
    pattern: 'Dead Microbiologists cluster (2001–2005)',
    sources: [
      { label: 'Globe and Mail — Dying microbiologists list', url: 'https://www.theglobeandmail.com/news/world/death-cluster-of-microbiologists/article18430030/' },
    ],
  },

  // ───────────────────────── MARCONI / SDI CLUSTER (1982-1988) ─────────────────────────
  {
    id: 'vimal-dajibhai',
    name: 'Vimal Dajibhai',
    role: 'Marconi Underwater Systems software engineer',
    field: 'Aerospace',
    dateOfDeath: '1986-08-04',
    age: 24,
    location: 'Bristol, UK — fell from Clifton Suspension Bridge',
    officialCause: 'Suicide (fall)',
    suspiciousCircumstances: [
      'Worked on Tigerfish torpedo guidance — sensitive defense software',
      'No prior history of depression',
      'One of at least 25 Marconi/SDI defense scientists to die in unusual circumstances 1982–1988',
    ],
    whatTheyKnew: 'Guidance systems for UK\'s nuclear-armed torpedoes during peak Cold War / SDI era.',
    grade: 'CREDIBLE',
    symbol: '🛰️',
    accentColor: '#fb923c',
    pattern: 'Marconi / SDI cluster (1982–1988)',
    sources: [
      { label: 'Open Mind Magazine — The Marconi Deaths', url: 'https://web.archive.org/web/20100527030153/http://www.openmindmag.com/' },
    ],
  },
  {
    id: 'arshad-sharif',
    name: 'Arshad Sharif',
    role: 'Marconi Defence Systems programmer',
    field: 'Aerospace',
    dateOfDeath: '1986-10-28',
    age: 26,
    location: 'Bristol, UK',
    officialCause: 'Suicide by self-strangulation with rope tied to tree, then driving car away',
    suspiciousCircumstances: [
      'Method of death described by coroners as "almost without precedent"',
      'Second Marconi engineer to die in Bristol within 12 weeks',
      'Worked on defense communications',
    ],
    whatTheyKnew: 'Encrypted defense communications for UK MoD projects tied to Star Wars (SDI) program.',
    grade: 'CREDIBLE',
    symbol: '🛰️',
    accentColor: '#fb923c',
    pattern: 'Marconi / SDI cluster (1982–1988)',
    sources: [
      { label: 'BBC On This Day archive', url: 'https://news.bbc.co.uk/onthisday/' },
    ],
  },

  // ───────────────────────── NUCLEAR / KAREN SILKWOOD ─────────────────────────
  {
    id: 'karen-silkwood',
    name: 'Karen Silkwood',
    role: 'Kerr-McGee Cimarron plutonium fuel plant technician',
    field: 'Nuclear',
    dateOfDeath: '1974-11-13',
    age: 28,
    location: 'Crescent, OK — solo car crash',
    officialCause: 'Single-vehicle accident (ran off road)',
    suspiciousCircumstances: [
      'On her way to meet a NYT reporter and union official to deliver evidence of plutonium safety violations',
      'Manila folder of documents she was carrying was missing from the wreckage',
      'Rear of her car had fresh dent consistent with being rammed',
      'Had been contaminated with plutonium days earlier under unexplained circumstances',
    ],
    whatTheyKnew:
      'Falsified quality-control records on plutonium fuel rods, dangerous worker exposure, missing 40+ pounds of plutonium from inventory.',
    aboutToReveal: 'A folder of documentary evidence of QC fraud at the plant — never recovered.',
    grade: 'DOCUMENTED',
    symbol: '☢️',
    accentColor: '#facc15',
    sources: [
      { label: 'NYT — Kerr-McGee found liable', url: 'https://www.nytimes.com/1979/05/19/archives/jury-awards-105-million-in-plutonium-case.html' },
      { label: 'Silkwood v. Kerr-McGee (US Supreme Court)', url: 'https://supreme.justia.com/cases/federal/us/464/238/' },
    ],
  },

  // ───────────────────────── DR. DAVID KELLY ─────────────────────────
  {
    id: 'david-kelly',
    name: 'Dr. David Kelly',
    role: 'UK MoD biological weapons inspector (UN UNSCOM lead)',
    field: 'Intelligence',
    dateOfDeath: '2003-07-17',
    age: 59,
    location: 'Harrowdown Hill, Oxfordshire',
    officialCause: 'Suicide (wrist laceration + co-proxamol overdose)',
    suspiciousCircumstances: [
      'Outed as the BBC source who said the Iraq WMD dossier was "sexed up"',
      'Hutton Inquiry findings sealed for 70 years — extraordinary classification',
      'Multiple doctors publicly disputed cause: severed ulnar artery rarely fatal, blood loss insufficient',
      'No fingerprints on the knife or pill packets',
      '13 witnesses contradicted the "found by jogger" timeline',
    ],
    whatTheyKnew:
      'Iraq had no active WMD program. The September 2002 dossier used to justify UK\'s entry into the Iraq War was politically embellished by Alastair Campbell\'s team.',
    grade: 'DOCUMENTED',
    symbol: '🇬🇧',
    accentColor: '#60a5fa',
    sources: [
      { label: 'The Guardian — Kelly inquiry files', url: 'https://www.theguardian.com/politics/davidkelly' },
      { label: 'BMJ — Doctors challenge Hutton verdict', url: 'https://www.bmj.com/content/341/bmj.c4669' },
    ],
  },

  // ───────────────────────── PHIL SCHNEIDER ─────────────────────────
  {
    id: 'phil-schneider',
    name: 'Phil Schneider',
    role: 'Geologist / claimed Black Project structural engineer (Dulce Base)',
    field: 'UAP',
    dateOfDeath: '1996-01-17',
    age: 49,
    location: 'Wilsonville, OR — apartment',
    officialCause: 'Suicide by self-strangulation with catheter tubing',
    suspiciousCircumstances: [
      'Family insists no one strangles themselves with rubber tubing wrapped 3x around the neck',
      'Had survived 13 prior assassination attempts (his claim)',
      'Was on a national lecture tour exposing alleged underground bases and Dulce firefight',
      'His ex-wife said briefcase containing photos and minerals went missing after death',
    ],
    whatTheyKnew:
      'Claimed firsthand involvement in 1979 firefight between US Delta Force / engineers and "tall greys" at Dulce Underground Base, NM.',
    grade: 'SPECULATIVE',
    symbol: '⛏️',
    accentColor: '#a855f7',
    sources: [
      { label: 'Phil Schneider final lecture (1995)', url: 'https://www.youtube.com/watch?v=AHHRfwGrmqs' },
    ],
  },

  // ───────────────────────── GARY MCKINNON era / DANNY CASOLARO ─────────────────────────
  {
    id: 'danny-casolaro',
    name: 'Danny Casolaro',
    role: 'Investigative journalist ("The Octopus")',
    field: 'Intelligence',
    dateOfDeath: '1991-08-10',
    age: 44,
    location: 'Martinsburg, WV — Sheraton Hotel bathtub',
    officialCause: 'Suicide (12 deep cuts to both wrists)',
    suspiciousCircumstances: [
      'Right-handed but had 12 cuts on both wrists — unusual for self-inflicted',
      'Had told family "if anything happens to me, it wasn\'t suicide"',
      'Briefcase of research materials missing from the room',
      'Body embalmed before family was notified — preventing toxicology',
      'Was hours from meeting a source about INSLAW/PROMIS spy software scandal',
    ],
    whatTheyKnew:
      'Investigating "The Octopus" — alleged interlocking conspiracy connecting INSLAW PROMIS theft, Iran-Contra, BCCI, October Surprise, and intelligence-linked organized crime.',
    aboutToReveal: 'Final source meeting in West Virginia regarding stolen PROMIS surveillance software.',
    grade: 'CREDIBLE',
    symbol: '🐙',
    accentColor: '#f43f5e',
    sources: [
      { label: 'The Last Circle (Cheri Seymour)', url: 'https://www.amazon.com/Last-Circle-Cheri-Seymour/dp/1933665912' },
      { label: 'Wired — The INSLAW Octopus', url: 'https://www.wired.com/1993/01/inslaw/' },
    ],
  },

  // ───────────────────────── GARY WEBB ─────────────────────────
  {
    id: 'gary-webb',
    name: 'Gary Webb',
    role: 'Pulitzer-winning investigative journalist (San Jose Mercury News)',
    field: 'Intelligence',
    dateOfDeath: '2004-12-10',
    age: 49,
    location: 'Carmichael, CA — his home',
    officialCause: 'Suicide by TWO gunshots to the head',
    suspiciousCircumstances: [
      'Coroner ruled suicide despite two separate gunshot wounds to the head',
      'Career destroyed after "Dark Alliance" series exposed CIA-Contra-crack cocaine connection',
      'CIA Inspector General report (1998) later confirmed his core findings',
      'Posted handwritten notes to friends days before death indicating he expected to be killed',
    ],
    whatTheyKnew:
      'CIA-backed Nicaraguan Contras trafficked cocaine into US inner cities (especially LA) during the 1980s — fueling the crack epidemic with agency knowledge.',
    grade: 'DOCUMENTED',
    symbol: '📰',
    accentColor: '#f43f5e',
    sources: [
      { label: 'CIA OIG Volume II (1998) — Hitz Report', url: 'https://www.cia.gov/readingroom/document/0000497112' },
      { label: 'LA Times — Gary Webb death', url: 'https://www.latimes.com/archives/la-xpm-2004-dec-12-me-webb12-story.html' },
    ],
  },

  // ───────────────────────── EUGENE MALLOVE ─────────────────────────
  {
    id: 'eugene-mallove',
    name: 'Dr. Eugene Mallove',
    role: 'MIT-trained aerospace engineer / cold fusion advocate',
    field: 'Aerospace',
    dateOfDeath: '2004-05-14',
    age: 56,
    location: 'Norwich, CT — beaten to death at his childhood home',
    officialCause: 'Blunt-force trauma during alleged robbery',
    suspiciousCircumstances: [
      'Was the leading public scientific voice for cold fusion / LENR',
      'Had recently announced "imminent" replication breakthrough that would validate Pons-Fleischmann',
      'Two suspects later convicted but motive remained disputed',
      'Death came as he was finalizing major federal funding pitch for LENR research',
    ],
    whatTheyKnew:
      'Compiled extensive evidence that 1989 MIT replication of cold fusion had been deliberately mis-reported — accusing peers of scientific fraud to protect hot-fusion budgets.',
    grade: 'SPECULATIVE',
    symbol: '⚛️',
    accentColor: '#fb923c',
    sources: [
      { label: 'Infinite Energy Magazine archive', url: 'https://www.infinite-energy.com/' },
    ],
  },

  // ───────────────────────── PAUL BENNEWITZ ─────────────────────────
  {
    id: 'paul-bennewitz',
    name: 'Paul Bennewitz',
    role: 'Physicist / Thunder Scientific founder',
    field: 'UAP',
    dateOfDeath: '2003-06-23',
    age: 75,
    location: 'Albuquerque, NM',
    officialCause: 'Natural causes (after years of mental decline)',
    suspiciousCircumstances: [
      'Targeted by AFOSI disinformation campaign (Project Beta) confirmed by agents Doty and Collins',
      'Air Force deliberately fed him false alien documents to discredit him after he intercepted real Kirtland AFB signals',
      'Suffered psychiatric breakdown — institutionalized 1988',
      'NOT killed, but his mind was the target — a documented case of weaponized disinformation against a civilian',
    ],
    whatTheyKnew:
      'Intercepted unusual electromagnetic signals and filmed unidentified objects over Manzano Weapons Storage Area — evidence of something the Air Force did not want investigated.',
    grade: 'DOCUMENTED',
    symbol: '📡',
    accentColor: '#a855f7',
    sources: [
      { label: 'Project Beta (Greg Bishop, 2005)', url: 'https://www.amazon.com/Project-Beta-Story-Paul-Bennewitz/dp/1416505369' },
      { label: 'Richard Doty AFOSI confession (Mirage Men doc)', url: 'https://www.imdb.com/title/tt2378307/' },
    ],
  },
];

export const deathPatterns = Array.from(
  new Set(suspiciousDeaths.map((d) => d.pattern).filter(Boolean) as string[])
);

export const deathFields: SuspiciousDeath['field'][] = [
  'UAP',
  'Aerospace',
  'Microbiology',
  'Nuclear',
  'Intelligence',
  'Corporate',
];
