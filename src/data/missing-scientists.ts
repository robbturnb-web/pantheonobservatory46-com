import type { Source } from '../components/SourceList';

export type CaseStatus = 'missing' | 'deceased' | 'murdered';
export type ConfidenceGrade = 'VERIFIED' | 'REPORTED' | 'ALLEGED' | 'UNDER_INVESTIGATION';
export type Program =
  | 'Los Alamos / NNSA'
  | 'NASA / JPL'
  | 'Caltech IPAC'
  | 'MIT / Fusion'
  | 'USAF / Wright-Patterson'
  | 'Aerojet Rocketdyne'
  | 'Kansas City NSC'
  | 'DoD / Novartis'
  | 'Independent / Anti-Gravity';

export interface Theory {
  label: 'Foreign intelligence' | 'Suppression / silencing' | 'Coincidence / random' | 'Personal / unrelated' | 'Targeted by non-state actor';
  body: string;
}

export interface MissingScientist {
  id: string;
  name: string;
  age?: number;
  status: CaseStatus;
  date: string; // YYYY-MM-DD
  location: string;
  field: string; // short tag e.g. "Nuclear physics"
  program: Program;
  programBlurb: string; // why this program matters
  portrait: 'male' | 'female' | 'military';
  // Long-form
  background: string; // education + career
  theProject: string; // what they specifically worked on, in plain English
  circumstances: string; // what happened
  officialExplanation: string; // what authorities have said (or not said)
  theories: Theory[]; // 2-4 theories
  connections: string[]; // names of others in this list they overlap with + brief context
  confidence: ConfidenceGrade;
  confidenceNote: string;
  sources: Source[];
}

export const programInfo: Record<Program, { name: string; description: string; accent: string }> = {
  'Los Alamos / NNSA': {
    name: 'Los Alamos National Laboratory',
    description:
      'A Department of Energy / National Nuclear Security Administration lab in northern New Mexico. Birthplace of the atomic bomb. Designs and certifies every nuclear weapon in the U.S. arsenal and conducts classified materials and energy research.',
    accent: '#a16207',
  },
  'NASA / JPL': {
    name: 'NASA Jet Propulsion Laboratory',
    description:
      'NASA\'s federally-funded research center in Pasadena, operated by Caltech. Builds and operates planetary missions and infrared sensor systems with dual-use military applications including tracking fast-moving satellites and hypersonic vehicles.',
    accent: '#1d4ed8',
  },
  'Caltech IPAC': {
    name: 'Caltech Infrared Processing & Analysis Center',
    description:
      'Operates the data pipelines for NASA infrared missions including Spitzer, WISE/NEOWISE. Validates the raw detections feeding planetary defense and asteroid catalogues.',
    accent: '#7c2d12',
  },
  'MIT / Fusion': {
    name: 'MIT Plasma Science & Fusion Center',
    description:
      'MIT\'s largest research lab. Solves the physics blocking commercial nuclear fusion. Partners directly with Commonwealth Fusion Systems, a $3B private demo-reactor program targeting net energy gain by 2027.',
    accent: '#0e7490',
  },
  'USAF / Wright-Patterson': {
    name: 'USAF / Wright-Patterson AFB / AFRL',
    description:
      'Air Force Research Laboratory and the home of the Special Access Program Oversight Committee. Runs $4.4B in directed-energy weapons, hypersonic propulsion, classified satellites, and advanced aerospace materials. Long-rumoured holding site for recovered non-human craft.',
    accent: '#374151',
  },
  'Aerojet Rocketdyne': {
    name: 'Aerojet Rocketdyne',
    description:
      'Primary U.S. rocket-engine builder for national-security launches. Co-developed Mondaloy — the nickel superalloy that finally let American engines match Russian RD-180 performance and end U.S. dependence on Russian propulsion.',
    accent: '#9a3412',
  },
  'Kansas City NSC': {
    name: 'Kansas City National Security Campus',
    description:
      'A DOE/NNSA facility that manufactures the non-nuclear components for every U.S. nuclear weapon. Top-tier security clearances required throughout.',
    accent: '#92400e',
  },
  'DoD / Novartis': {
    name: 'Novartis × Department of Defense contracts',
    description:
      'Pharmaceutical research with active DoD chemical-biology contracts. Drug-discovery work that crosses into dual-use bioscience.',
    accent: '#15803d',
  },
  'Independent / Anti-Gravity': {
    name: 'Independent — Anti-Gravity / Exotic Propulsion',
    description:
      'Outside the formal program structure. Researchers claiming experimental work on exotic propulsion and inertial-mass manipulation, frequently in tension with both classified programs and academic physics.',
    accent: '#6b21a8',
  },
};

export const missingScientists: MissingScientist[] = [
  // ───────────────────────── 1. McCASLAND ─────────────────────────
  {
    id: 'mccasland',
    name: 'Maj. Gen. William Neil McCasland (USAF, ret.)',
    age: 68,
    status: 'missing',
    date: '2026-02-27',
    location: 'Albuquerque, New Mexico',
    field: 'Air Force Research / Special Access Program oversight',
    program: 'USAF / Wright-Patterson',
    programBlurb:
      'Commanded the Air Force Research Laboratory at Wright-Patterson AFB and Phillips Research Site at Kirtland; executive secretary of the Special Access Program Oversight Committee — legal visibility over every compartmented program in the entire Department of Defense.',
    portrait: 'military',
    background:
      'Retired U.S. Air Force major general. Career spanned classified space-weapons programs and the directed-energy, hypersonic propulsion, and advanced aerospace-materials portfolios at Kirtland and Wright-Patterson — a $4.4 billion science and technology brief. Held the executive-secretary seat on the Pentagon\'s Special Access Program Oversight Committee, the body that coordinates every compartmented program across the Department of War.',
    theProject:
      'Oversaw the science and technology funding stream that paid for everything from nickel-superalloy rocket engines to infrared satellite sensors. As SAPOC executive secretary, he was one of the very small number of people legally cleared to know which Special Access Programs existed at all.',
    circumstances:
      'On the morning of February 27, 2026, McCasland walked out of his Albuquerque home on foot. He left his phone, his glasses, and his wearable devices on a table. He took a .38-caliber revolver and a backpack and has not been seen since. His wife told emergency dispatchers he appeared not to intend to return. The FBI joined the Bernalillo County Sheriff\'s search in March 2026.',
    officialExplanation:
      'Bernalillo County Sheriff classifies him as a missing endangered adult. His wife has stated publicly that he had no special knowledge of extraterrestrial bodies or debris and was not confused or disoriented when he left. Members of Congress held a classified briefing in March 2026 about his disappearance and its relationship to UAP programs; the contents have not been released.',
    theories: [
      {
        label: 'Suppression / silencing',
        body: 'McCasland is named in the 2016 Podesta WikiLeaks emails as having first-hand knowledge of crash retrieval programs and what was being held inside the laboratory he commanded. Tom DeLonge described him as a key advisor on planned UAP disclosure. Several sitting Congress members (Burchett, Burlison) have publicly stated the disappearance cannot be coincidence.',
      },
      {
        label: 'Foreign intelligence',
        body: 'Former FBI Assistant Director Chris Swecker told the Daily Mail that the McCasland case raises immediate red flags for a hostile-state recruitment or extraction operation, given his SAPOC clearances.',
      },
      {
        label: 'Personal / unrelated',
        body: 'McCasland\'s wife has publicly stated her husband did not want to be found and that the departure was deliberate. No body, ransom, or contact has surfaced — consistent with a self-initiated disappearance.',
      },
    ],
    connections: [
      'Funded Monica Reza\'s Mondaloy alloy program at Kirtland from 1999 onward',
      'Three additional Wright-Patterson personnel with top-secret clearances died in an October 2025 incident captured on security cameras',
      'Named in 2016 Podesta emails alongside UAP disclosure planning',
    ],
    confidence: 'VERIFIED',
    confidenceNote: 'Disappearance and FBI involvement confirmed by CNN, Newsweek, Military.com, NewsNation. UAP-program connections sourced to publicly released emails.',
    sources: [
      { label: 'CNN — FBI joins search', url: 'https://www.cnn.com/2026/03/17/us/fbi-search-william-mccasland-general-missing' },
      { label: 'Newsweek — UFO research links', url: 'https://www.newsweek.com/who-is-william-neil-mccasland-ex-us-general-linked-to-ufo-research-missing-11609887' },
      { label: 'NY Post — wife statement', url: 'https://nypost.com/2026/04/03/us-news/wife-of-missing-air-force-general-says-he-planned-not-to-be-found/' },
      { label: 'Military.com', url: 'https://www.military.com/daily-news/air-force/2026/03/15/missing-air-force-general-case-draws-fbi-and-online-conspiracy-theories.html' },
    ],
  },

  // ───────────────────────── 2. REZA ─────────────────────────
  {
    id: 'reza',
    name: 'Monica Jacinto Reza',
    age: 60,
    status: 'missing',
    date: '2025-06-22',
    location: 'Angeles National Forest, California',
    field: 'Aerospace materials / rocket superalloys',
    program: 'NASA / JPL',
    programBlurb:
      'Director of the Materials Processing Group at NASA Jet Propulsion Laboratory at the time of her disappearance; previously a Technical Fellow at Aerojet Rocketdyne where she co-invented Mondaloy.',
    portrait: 'female',
    background:
      'Aerospace engineer with decades at Aerojet Rocketdyne. Co-inventor (with Dallis Hardwick) of Mondaloy, a family of nickel-based superalloys engineered to survive the extreme heat and oxygen-rich environments inside rocket preburners and turbines. Joined NASA JPL as Director of Materials Processing less than a year before she disappeared.',
    theProject:
      'Mondaloy is the alloy that finally let American rocket engines match the performance of Soviet-built RD-180s, which the U.S. had relied on for decades to lift classified military satellites. By 2016, Aerojet Rocketdyne had used Mondaloy 200 in a test-fire milestone for the Hydrocarbon Boost program — described publicly by an Air Force general as central to ending U.S. dependence on Russian rocket propulsion. Reza\'s qualification data shipped directly into McCasland\'s laboratory at Kirtland.',
    circumstances:
      'Disappeared while hiking with a companion on the Upper West Ridge Trail near Mount Waterman, last seen at 9:10 a.m. waving from about 30 feet behind. Moments later her companion turned and she was gone. Helicopters, dogs, drones, and dozens of volunteer search teams found only a beanie and a tube of lip balm. No body. No forensic trail.',
    officialExplanation:
      'Open missing-persons case under Los Angeles County Sheriff\'s Homicide Bureau. No cause of disappearance officially established. The White House confirmed in April 2026 that the FBI is examining her case alongside others.',
    theories: [
      {
        label: 'Foreign intelligence',
        body: 'Mondaloy is precisely the category of dual-use technology that hostile state intelligence services (Russia, China) prioritise — propulsion alloys that strip the U.S. of dependence on foreign engines. Her move to JPL gave her additional access to sensor and propulsion architectures.',
      },
      {
        label: 'Suppression / silencing',
        body: 'Her former colleague Dallis Hardwick is also reportedly missing. The near-simultaneous vanishing of both Mondaloy co-inventors, together with the McCasland funding chain, fits a pattern of removing personnel with end-to-end knowledge of the propulsion stack.',
      },
      {
        label: 'Personal / unrelated',
        body: 'The Angeles National Forest is rugged terrain with regular hiker fatalities. With no body recovered the case remains formally open as a missing-persons matter rather than a criminal one.',
      },
    ],
    connections: [
      'Mondaloy alloy was funded and qualified through McCasland\'s lab at Kirtland from 1999',
      'Co-inventor Dallis Hardwick also reportedly missing',
      'Worked at NASA JPL alongside Hicks and Maiwald',
    ],
    confidence: 'VERIFIED',
    confidenceNote: 'Disappearance confirmed by LA County Sheriff. Mondaloy program details from SpaceNews, Aerojet Rocketdyne press materials, and USAF testing records.',
    sources: [
      { label: 'Newsweek — Reza case', url: 'https://www.newsweek.com/monica-reza-case-gains-attention-after-disappearance-us-general-11698172' },
      { label: 'SpaceNews — Mondaloy explainer', url: 'https://spacenews.com/what-is-mondaloy-and-why-should-you-care/' },
      { label: 'WION — both Mondaloy officials missing', url: 'https://www.wionews.com/trending/the-mondaloy-mystery-two-aerospace-experts-with-ties-to-special-projects-go-missing-triggering-security-concerns-1774248547608' },
    ],
  },

  // ───────────────────────── 3. GARCIA ─────────────────────────
  {
    id: 'garcia',
    name: 'Steven Garcia',
    age: 48,
    status: 'missing',
    date: '2025-08-28',
    location: 'Albuquerque, New Mexico',
    field: 'Nuclear weapons component manufacturing',
    program: 'Kansas City NSC',
    programBlurb:
      'Property custodian at the Kansas City National Security Campus — the DOE/NNSA facility that builds every non-nuclear component (electronics, mechanicals, casings) for the U.S. nuclear arsenal.',
    portrait: 'male',
    background:
      'Government contractor with high-level security clearance. Worked at the Kansas City National Security Campus\'s Albuquerque operations as a property custodian — a role with physical inventory access to nuclear-weapon components and the documentation that tracks them.',
    theProject:
      'The KCNSC manufactures roughly 80 percent of the non-nuclear parts inside U.S. nuclear warheads. Property custodians track the chain of custody for those parts and for the classified equipment used to build them — a job whose access reaches far beyond what its title implies.',
    circumstances:
      'Last seen on surveillance footage leaving his Albuquerque home on foot, August 28, 2025, carrying only a handgun. Mirror profile of the McCasland disappearance six months later — same city, same on-foot exit, same lone firearm.',
    officialExplanation:
      'Open missing-persons case. The DOE/NNSA confirmed to Fox News Digital in April 2026 that it is investigating the cluster of deaths and disappearances connected to its facilities.',
    theories: [
      {
        label: 'Foreign intelligence',
        body: 'A property custodian at a nuclear-weapon component facility carries an unusual amount of latent access. Hostile services have historically targeted exactly this sort of mid-tier cleared personnel, who attract less internal scrutiny than scientists.',
      },
      {
        label: 'Suppression / silencing',
        body: 'The structural similarity to McCasland — Albuquerque, on foot, single firearm, no contact — is striking enough that several lawmakers have publicly pointed to it as a pattern signature rather than a coincidence.',
      },
    ],
    connections: [
      'Identical disappearance pattern to McCasland (same city, six months apart, on foot with firearm)',
      'Both Garcia and the Los Alamos cases (Chavez, Casias) sit inside the New Mexico nuclear-complex corridor',
    ],
    confidence: 'REPORTED',
    confidenceNote: 'Disappearance confirmed by local NM media and Fox News; KCNSC role description from public DOE materials.',
    sources: [
      { label: 'BroBible — tenth person summary', url: 'https://brobible.com/culture/article/tenth-person-top-secret-research-die-missing/' },
      { label: 'British Brief — pattern reporting', url: 'https://britbrief.co.uk/crime/police/nuclear-secrets-contractor-vanishes-in-new-mexico-mystery.html' },
      { label: 'Vigilant Fox compilation', url: 'https://www.vigilantfox.com/p/tenth-scientist-reported-missing' },
    ],
  },

  // ───────────────────────── 4. CHAVEZ ─────────────────────────
  {
    id: 'chavez',
    name: 'Anthony Chavez',
    age: 78,
    status: 'missing',
    date: '2025-05-08',
    location: 'Los Alamos, New Mexico',
    field: 'Nuclear weapons design (retired)',
    program: 'Los Alamos / NNSA',
    programBlurb:
      'Retired in 2017 after decades at Los Alamos — the NNSA lab that designs and certifies every nuclear weapon in the U.S. arsenal.',
    portrait: 'male',
    background:
      'Career Los Alamos employee, retired in 2017 after decades on the lab\'s technical staff. Even in retirement, individuals with his level of historical access remain subject to ongoing security debriefing obligations.',
    theProject:
      'Los Alamos is the design house for U.S. nuclear weapons. Retired technical staff carry institutional memory that does not appear in any document — the kind of context a hostile service or an internal actor would value precisely because it is unwritten.',
    circumstances:
      'Vanished between May 4 and May 8, 2025. Last seen leaving his home on foot. Left behind his wallet, keys, cigarettes, and phone. His car was locked in the driveway with no signs of forced entry or struggle. Cadaver dogs found no trace.',
    officialExplanation:
      'Active missing-persons investigation by Los Alamos police. No public update on cause or persons of interest.',
    theories: [
      {
        label: 'Foreign intelligence',
        body: 'Retired senior weapons-design personnel are among the highest-priority recruitment targets for foreign services because they hold non-redundant institutional knowledge that survives long after access is revoked.',
      },
      {
        label: 'Suppression / silencing',
        body: 'Disappearance four days before Reza\'s and seven weeks before Casias\'s — three Los Alamos / California incidents in a single window — is statistically very unusual.',
      },
      {
        label: 'Personal / unrelated',
        body: 'At 78, age-related medical events (sudden disorientation, cardiac, stroke) cannot be ruled out. The on-foot exit pattern can match dementia presentations, though no such diagnosis is publicly documented.',
      },
    ],
    connections: [
      'Disappeared four days before Reza (CA) and seven weeks before Casias (Los Alamos)',
      'Same NNSA institution as Casias',
    ],
    confidence: 'VERIFIED',
    confidenceNote: 'Disappearance confirmed by Los Alamos County and the Los Alamos Reporter.',
    sources: [
      { label: 'Los Alamos County official', url: 'https://www.losalamosnm.gov/News-articles/Search-Continues-Anthony-Chavez' },
      { label: 'ExchangeMonitor — DOE briefing request', url: 'https://www.exchangemonitor.com/lawmakers-request-briefing-by-doe-on-10-missing-scientists/' },
    ],
  },

  // ───────────────────────── 5. CASIAS ─────────────────────────
  {
    id: 'casias',
    name: 'Melissa Casias',
    age: 53,
    status: 'missing',
    date: '2025-06-26',
    location: 'Los Alamos, New Mexico',
    field: 'Administrative — top secret clearance',
    program: 'Los Alamos / NNSA',
    programBlurb:
      'Administrative assistant at Los Alamos National Laboratory holding top security clearance — the kind of role that processes paperwork for every classified project flowing through the lab.',
    portrait: 'female',
    background:
      'Long-time administrative assistant inside Los Alamos with top-tier security clearance. In a national lab, an administrative role with that level of clearance is one of the most access-rich positions in the building — every meeting, every document, every visitor list.',
    theProject:
      'Administrative staff with TS clearances at NNSA labs see, log, and route the documents that working scientists generate. They are functionally a complete map of who is working on what — a position prized by counterintelligence on both sides.',
    circumstances:
      'Disappeared June 26, 2025. Surveillance footage shows her staggering down a road miles from her home without phone, wallet, or keys. Both her personal and work phones had been factory-reset before she was reported missing. Family-described behavior in the days prior has not been disclosed publicly.',
    officialExplanation:
      'Open missing-persons case. The factory-reset of both phones is the single most operationally suspicious detail — a pattern more associated with tradecraft than with personal crisis.',
    theories: [
      {
        label: 'Foreign intelligence',
        body: 'Phone factory-resets across personal and work devices before a disappearance is a classic scrubbing pattern. Combined with the staggering on the road (consistent with sedation), it reads as a possible exfiltration that went sideways.',
      },
      {
        label: 'Suppression / silencing',
        body: 'Casias and Chavez both disappeared from Los Alamos within seven weeks of each other. The simultaneous loss of one technical and one administrative-with-clearance staffer is the structural signature of someone systematically removing knowledge of a specific project.',
      },
      {
        label: 'Personal / unrelated',
        body: 'The staggering, the abandoned belongings, and the phone wipes could plausibly fit a mental-health crisis or self-harm scenario. No body has been recovered to confirm or rule this out.',
      },
    ],
    connections: [
      'Same lab as Chavez, disappeared four days after Reza',
      'Phone factory-reset pattern unique among the 11 cases',
    ],
    confidence: 'VERIFIED',
    confidenceNote: 'Disappearance confirmed by Los Alamos County, ExchangeMonitor, and the House Oversight Committee letter dated April 21, 2026.',
    sources: [
      { label: 'House Oversight letter (DocumentCloud)', url: 'https://www.documentcloud.org/documents/28060412-doe-missing-scientists-letter-42026/' },
      { label: 'Colorado Politics summary', url: 'https://www.coloradopolitics.com/2026/04/20/what-we-know-about-nearly-a-dozen-scientists-who-went-missing-died-or-were-murdered/' },
    ],
  },

  // ───────────────────────── 6. HICKS ─────────────────────────
  {
    id: 'hicks',
    name: 'Michael David Hicks',
    age: 59,
    status: 'deceased',
    date: '2023-07-30',
    location: 'California',
    field: 'Planetary defense / asteroid tracking',
    program: 'NASA / JPL',
    programBlurb:
      'NASA Jet Propulsion Laboratory, 1998–2022. Contributed to Deep Space 1, NEAT, Dawn, and DART — the planetary-defense mission that proved an asteroid\'s trajectory could be deliberately altered.',
    portrait: 'male',
    background:
      'Research scientist at NASA JPL for 24 years. Published more than 80 peer-reviewed scientific papers. Specialized in the physical properties of comets and asteroids.',
    theProject:
      'Deep Space 1 (1999) tested 12 experimental technologies in a single flight, including an ion engine. NEAT catalogued near-Earth objects. Dawn orbited the asteroid Vesta and the dwarf planet Ceres. DART (2022) confirmed for the first time in human history that a spacecraft impact can measurably alter the trajectory of an asteroid on a collision course with Earth — a capability with obvious dual-use military implications.',
    circumstances:
      'Died July 30, 2023, at age 59, roughly one year after leaving JPL. No cause of death has been publicly disclosed. No autopsy record is publicly available. His online memorials contain no reference to illness.',
    officialExplanation:
      'NASA and JPL have made no public statement about Hicks\'s death. The earliest of the cluster, his case attracted no scrutiny until later deaths formed a recognizable pattern.',
    theories: [
      {
        label: 'Coincidence / random',
        body: 'A 59-year-old man dying without disclosed cause is, in isolation, statistically unremarkable. The case only became investigative because of what came after.',
      },
      {
        label: 'Suppression / silencing',
        body: 'Hicks\'s expertise in asteroid composition and detection sits at the intersection of planetary defense and the categorisation of objects whose origin "falls outside standard catalogue classifications" — language used by colleagues at JPL referring to anomalous near-Earth detections.',
      },
    ],
    connections: [
      'Same JPL institution as Maiwald (died 2024) and Reza (missing 2025)',
      'Worked on the same asteroid-tracking pipelines that Grillmair processed at IPAC',
    ],
    confidence: 'REPORTED',
    confidenceNote: 'Death confirmed via family obituary on Forest Lawn. Career details from JPL publication record. No official cause of death.',
    sources: [
      { label: 'Forest Lawn obituary', url: 'https://obituaries.forestlawn.com/obituaries/michael-hicks' },
      { label: 'OAN — ninth scientist', url: 'https://www.oann.com/newsroom/ninth-scientist-added-to-growing-list-of-nasa-linked-deaths-and-disappearances/' },
      { label: 'Newsweek list', url: 'https://www.newsweek.com/list-dead-or-missing-scientists-suspicious-michael-david-hicks-11805585' },
    ],
  },

  // ───────────────────────── 7. MAIWALD ─────────────────────────
  {
    id: 'maiwald',
    name: 'Frank Werner Maiwald',
    age: 61,
    status: 'deceased',
    date: '2024-07-04',
    location: 'Los Angeles, California',
    field: 'Space instrumentation / subsurface ocean detection',
    program: 'NASA / JPL',
    programBlurb:
      '25 years at NASA Jet Propulsion Laboratory. Held the title of JPL Principal — an internal designation reserved for scientists making outstanding individual contributions.',
    portrait: 'male',
    background:
      'JPL Principal scientist for two and a half decades. Managed the Surface Biology and Geology Visible Shortwave Infrared (SBG-VSWIR) instrument and oversaw delivery of two instruments for the Advanced Microwave Radiometer Climate Quality program flying on European Sentinel satellites — sensors that measure ocean and atmospheric water with precision relevant to both climate monitoring and military navigation.',
    theProject:
      'Thirteen months before he died, Maiwald led a breakthrough in passive radio detection of subsurface liquid water on Jupiter\'s icy moons. The technique scans for oceans beneath the surface of Europa and Enceladus from orbit — the central instrument capability for finding life beyond Earth.',
    circumstances:
      'Died July 4, 2024, at 61, in Los Angeles. No cause of death has been publicly released. No autopsy record has been located. The only public record of his passing is a single online obituary in which colleagues describe his death as "sudden and shocking" with no mention of illness or health decline. He was actively engaged in ongoing projects and making future plans.',
    officialExplanation:
      'JPL declined to comment to media. NASA issued no press release. No memorial statement. No local news coverage. His Legacy.com obituary is the only public document of his death.',
    theories: [
      {
        label: 'Suppression / silencing',
        body: 'A senior NASA principal investigator dying without any institutional acknowledgment is itself anomalous. The combined silence from JPL, NASA, and local media — for a scientist of his stature — is the most discussed feature of the case.',
      },
      {
        label: 'Coincidence / random',
        body: 'Sudden death from undiagnosed cardiac or neurological events in 60-something men is medically common and would fit the absence of prior illness signals.',
      },
    ],
    connections: [
      'Same JPL institution as Hicks (died 2023) and Reza (missing 2025)',
      'Worked on the same infrared sensor architecture that Grillmair processed at IPAC',
    ],
    confidence: 'REPORTED',
    confidenceNote: 'Death confirmed by Legacy.com obituary. Career details from JPL publication record. Institutional silence is itself a documented anomaly.',
    sources: [
      { label: 'Legacy.com obituary', url: 'https://www.legacy.com/us/obituaries/legacyremembers/frank-maiwald-obituary?id=55630404' },
      { label: 'Sentinel Network — blind spot', url: 'https://thesentinel.network/p/the-blind-spot-rocks-are-falling' },
    ],
  },

  // ───────────────────────── 8. THOMAS ─────────────────────────
  {
    id: 'thomas',
    name: 'Jason Thomas',
    age: 46,
    status: 'deceased',
    date: '2026-03-17',
    location: 'Wakefield, Massachusetts (body recovered from Lake Quannapowitt)',
    field: 'Chemical biology / drug discovery',
    program: 'DoD / Novartis',
    programBlurb:
      'Assistant director of chemical biology at Novartis Institutes for BioMedical Research, with active Department of Defense contracts attached to his work.',
    portrait: 'male',
    background:
      'Pharmaceutical scientist holding advanced degrees in physics, biology, and biophysics. Assistant director-level lead in chemical biology at Novartis NIBR. The combination of physics + biology + active DoD contracting is unusual and points toward dual-use research at the boundary of small-molecule chemistry and human-protein engineering.',
    theProject:
      'Novartis NIBR\'s chemical-biology arm sits where small-molecule drug design meets target-protein engineering. DoD chemical-biology contracts in this domain typically cover countermeasures (anti-toxin, anti-bioagent), but the same platforms can be repurposed.',
    circumstances:
      'Disappeared from his home in Wakefield, MA on December 12, 2025. His body was recovered from Lake Quannapowitt on March 17, 2026 — three months and five days after he was reported missing. No foul play has been formally confirmed. No cause of death has been publicly disclosed.',
    officialExplanation:
      'Open death investigation by Massachusetts state and local authorities. The three-month gap between disappearance and body recovery has not been publicly explained.',
    theories: [
      {
        label: 'Personal / unrelated',
        body: 'Body recovered from a lake in winter is consistent with a range of causes, including suicide and accidental drowning. Without a public cause of death, this remains the default investigatory framework.',
      },
      {
        label: 'Suppression / silencing',
        body: 'A DoD-contracted biologist disappearing for three months before a body surfaces in a local lake echoes the post-2001 microbiologist cluster, in which a dozen bioscience researchers died under similar "personal" rulings in a five-month span.',
      },
    ],
    connections: [
      'Only DoD-contracted bioscience entry in the cluster — anchors the bridge to the post-2001 microbiologist precedent',
    ],
    confidence: 'REPORTED',
    confidenceNote: 'Disappearance and body recovery confirmed by Massachusetts authorities and the House Oversight Committee letter.',
    sources: [
      { label: 'Colorado Politics summary', url: 'https://www.coloradopolitics.com/2026/04/20/what-we-know-about-nearly-a-dozen-scientists-who-went-missing-died-or-were-murdered/' },
      { label: 'House Oversight letter', url: 'https://www.documentcloud.org/documents/28060412-doe-missing-scientists-letter-42026/' },
    ],
  },

  // ───────────────────────── 9. GRILLMAIR ─────────────────────────
  {
    id: 'grillmair',
    name: 'Carl Grillmair',
    age: 67,
    status: 'murdered',
    date: '2026-02-16',
    location: 'Llano, California',
    field: 'Astrophysics / infrared sensor pipeline',
    program: 'Caltech IPAC',
    programBlurb:
      'Caltech\'s Infrared Processing and Analysis Center. 29 years on NASA telescope missions including Hubble, Spitzer, and the Wide-field Infrared Survey Explorer (NEOWISE).',
    portrait: 'male',
    background:
      'Research scientist at Caltech IPAC. Logged more than 400 hours of Hubble time as principal investigator and 2,700 hours as co-investigator over 29 years. Published 147 peer-reviewed papers, with three more in preparation at the time of his death. In 2007 he led the first study to capture enough light from an exoplanet to identify specific molecules in its atmosphere, including water.',
    theProject:
      'Quality-assurance scientist and pipeline operator for the NEOWISE Science Data Center — processing every asteroid and comet detection produced by a space-based infrared telescope whose sensor technology has direct military application for tracking hypersonic missiles and maneuvering satellites. At the time of his death, he was installing new instrumentation at Palomar Observatory to monitor for meteor impacts on the Moon during a lunar eclipse.',
    circumstances:
      'Found at 6:10 a.m. on February 16, 2026, with a single gunshot wound to the torso on the front porch of his home in Llano, in the high desert 75 miles north of Los Angeles. A 29-year-old man, Freddy Snyder, was arrested and charged with murder. Snyder had previously been arrested for trespassing on Grillmair\'s property while carrying an unregistered rifle on December 20, 2025. That felony weapons charge was dropped and Snyder was released. Fifty-eight days later he allegedly returned and shot the man who had reported him.',
    officialExplanation:
      'LA County Sheriff is treating the case as a successful murder prosecution. Caltech\'s public statement described Grillmair as having "passed away suddenly," omitting the words shot, killed, or murder.',
    theories: [
      {
        label: 'Targeted by non-state actor',
        body: 'A trespasser-charge dismissal followed by the same trespasser returning to murder the witness 58 days later is unusual on its own. The structural fit — perimeter probe, charge drops, return-and-shoot — has been raised by retired investigators as compatible with directed harassment rather than random violence.',
      },
      {
        label: 'Personal / unrelated',
        body: 'The simplest reading is that Snyder was a disturbed individual with personal animus toward Grillmair after the trespass arrest. Many of the case\'s strange features are equally consistent with criminal-justice failure rather than directed action.',
      },
      {
        label: 'Suppression / silencing',
        body: 'Grillmair held end-to-end knowledge of what the NEOWISE sensor pipeline could and could not resolve at the limits of capability — the kind of internal ground-truth a hostile actor would value if they wanted to know what the U.S. was and was not detecting in near-Earth space.',
      },
    ],
    connections: [
      'Processed the same asteroid/comet data that Hicks (JPL) helped generate',
      'Second scientist shot at his home in two months (Loureiro killed Dec 15, 2025)',
    ],
    confidence: 'VERIFIED',
    confidenceNote: 'Murder confirmed by LA County Sheriff. Career details from Caltech IPAC public CV. Snyder charged.',
    sources: [
      { label: 'Caltech official obituary', url: 'https://www.caltech.edu/about/news/caltech-mourns-the-passing-of-carl-grillmair-19592026' },
      { label: 'Pasadena Now — slain astrophysicist', url: 'https://pasadenanow.com/main/la-county-board-honors-slain-caltech-astrophysicist-who-worked-in-pasadena-for-nearly-30-years' },
      { label: 'Wikipedia — Carl Grillmair', url: 'https://en.wikipedia.org/wiki/Carl_Grillmair' },
    ],
  },

  // ───────────────────────── 10. LOUREIRO ─────────────────────────
  {
    id: 'loureiro',
    name: 'Nuno Gomes Loureiro',
    age: 47,
    status: 'murdered',
    date: '2025-12-15',
    location: 'Brookline, Massachusetts',
    field: 'Plasma physics / nuclear fusion',
    program: 'MIT / Fusion',
    programBlurb:
      'Director of MIT\'s Plasma Science and Fusion Center — MIT\'s largest research lab. Recipient of the Presidential Early Career Award for Scientists and Engineers (January 2025), the highest U.S. government honour for young researchers.',
    portrait: 'male',
    background:
      'Theoretical plasma physicist trained in Lisbon and Oxford. Solved a 50-year-old problem in fusion physics: why magnetic reconnection — when opposing magnetic fields snap apart and reform — causes catastrophic plasma crashes inside fusion reactors. Loureiro showed the textbook half-century-old model was itself unstable and that the real mechanism is dramatically faster and more destructive than any prior model predicted.',
    theProject:
      'His lab worked in direct partnership with Commonwealth Fusion Systems, the MIT spinout that had raised close to $3 billion in private capital by late 2025 and was approximately 65 percent complete on a demonstration reactor targeting net energy gain by 2027. If achieved, that reactor changes the energy basis of every classified, energy-intensive program from directed-energy weapons to deep-space propulsion.',
    circumstances:
      'On December 15, 2025, Claudio Manuel Neves Valente rang the doorbell of Loureiro\'s home. Loureiro\'s 12-year-old daughter ran to answer it. Her father followed and told her to come back inside. Seconds later she heard three or four gunshots. Loureiro was transported to Beth Israel Deaconess Medical Center with multiple gunshot wounds and was pronounced dead in the early hours of December 16. Valente had driven directly to Loureiro\'s home from Brown University, where two days earlier he had allegedly shot 13 people in a campus building, killing two. Valente was identified as a former classmate of Loureiro\'s from their undergraduate physics program in Lisbon in the late 1990s. Valente was found dead in an apparent suicide in New Hampshire on December 16.',
    officialExplanation:
      'Active multi-jurisdiction investigation (Massachusetts, Rhode Island, New Hampshire). Valente\'s motive has not been publicly established. The Brown shooting and the Loureiro killing are being treated as related incidents by a single perpetrator now deceased.',
    theories: [
      {
        label: 'Personal / unrelated',
        body: 'A former classmate with a history of mental-health collapse goes on a multi-state shooting spree that ends with his suicide. The simplest reading — and the one currently being pursued — is targeted personal grievance with no third-party direction.',
      },
      {
        label: 'Targeted by non-state actor',
        body: 'The timing — weeks after Loureiro\'s lab announced major plasma-confinement progress and during Commonwealth Fusion Systems\' final reactor build-out — has been raised by physicists as too convenient for a purely random pattern. A targeted assassination wearing the camouflage of a spree shooting is a documented operational pattern.',
      },
    ],
    connections: [
      'First of two scientists shot at home in two months (Grillmair followed Feb 2026)',
      'His fusion work was the bridge between contained-plasma physics and the energy budget of every classified program McCasland funded',
    ],
    confidence: 'VERIFIED',
    confidenceNote: 'Murder confirmed by MIT, Newsweek, multiple Massachusetts and Rhode Island authorities. Suspect identified and deceased.',
    sources: [
      { label: 'MIT News — Loureiro obituary', url: 'https://news.mit.edu/2025/nuno-loureiro-professor-director-plasma-science-and-fusion-center-dies-1216' },
      { label: 'MIT President statement', url: 'https://president.mit.edu/writing-speeches/professor-nuno-loureiro-1977-2025' },
      { label: 'Newsweek — fatally shot', url: 'https://www.newsweek.com/mit-professor-fatally-shot-nuno-loureiro-research-11226085' },
      { label: 'Wikipedia — Nuno Loureiro', url: 'https://en.wikipedia.org/wiki/Nuno_Loureiro' },
    ],
  },

  // ───────────────────────── 11. ESKRIDGE ─────────────────────────
  {
    id: 'eskridge',
    name: 'Amy Eskridge',
    age: 34,
    status: 'deceased',
    date: '2022-01-01',
    location: 'United States',
    field: 'Anti-gravity / exotic propulsion (independent)',
    program: 'Independent / Anti-Gravity',
    programBlurb:
      'Co-founder, with her father (retired NASA engineer Richard Eskridge), of the Institute for Exotic Science. Outside the formal program structure.',
    portrait: 'female',
    background:
      'Independent researcher, daughter of a retired NASA engineer. Co-founded the Institute for Exotic Science to pursue claims around anti-gravity and exotic-propulsion physics. In a 2020 interview she stated that anti-gravity technology had already been invented and that the National Security Agency held "a list of five people that have independently discovered" the principle.',
    theProject:
      'Anti-gravity and inertial-mass research sits at the most contested edge of physics. Mainstream academia treats it as fringe; classified aerospace programs have repeatedly funded experimental work in the same space (the Pentagon\'s own AAWSAP/AATIP contracted DEW propulsion studies). Eskridge claimed access to the latter world from outside it — the most dangerous possible position for an independent researcher.',
    circumstances:
      'Reported as a suicide in 2022 at age 34. Prior to her death she had stated publicly — in a recorded YouTube interview — that she had faced repeated threats against her life, had hired a private security firm reportedly run by a former Northrop Grumman CIO with 35 years in Navy counter-espionage, and that he had told her: "I wish I could tell you that you were insane, but you\'re totally not. The stories you\'ve told me, I\'ve heard from other young women in technology positions. They do it on purpose."',
    officialExplanation:
      'Ruled a suicide. No published forensic autopsy record located in public sources.',
    theories: [
      {
        label: 'Suppression / silencing',
        body: 'Her own publicly-recorded testimony described a sustained harassment pattern targeted specifically at young women in technology positions, with the explicit aim of producing the appearance of psychological collapse before suicide. A suicide ruling against that documented backdrop is the central reason her case is included alongside the cleared-program scientists.',
      },
      {
        label: 'Personal / unrelated',
        body: 'Independent researchers operating outside institutional support structures have measurably elevated suicide risk regardless of the topic. Without a forensic record in the public domain her death cannot be conclusively attributed to anything beyond what is on the death certificate.',
      },
    ],
    connections: [
      'Earliest case in the cluster (2022) — establishes the temporal floor',
      'Only entry from outside the formal program structure — included for the documented threat pattern she described before her death',
    ],
    confidence: 'ALLEGED',
    confidenceNote: 'Death is publicly documented and ruled suicide. The threat pattern is sourced to her own recorded statements and is not independently verified.',
    sources: [
      { label: 'Eskridge interview (Jeremy Rys, 2020)', url: 'https://www.youtube.com/watch?v=l0O4cEIkUZc' },
      { label: 'Colorado Politics summary', url: 'https://www.coloradopolitics.com/2026/04/20/what-we-know-about-nearly-a-dozen-scientists-who-went-missing-died-or-were-murdered/' },
    ],
  },
];

// ───────────────────────── HISTORICAL PRECEDENT (shorter dossiers) ─────────────────────────

export interface HistoricalCase {
  id: string;
  name: string; // can be a person or a cluster
  era: string;
  field: string;
  summary: string;
  whyItMatters: string;
  sources: Source[];
}

export const historicalPrecedent: HistoricalCase[] = [
  {
    id: 'marconi-cluster',
    name: 'The Marconi / SDI Cluster',
    era: '1982–1988',
    field: 'UK defense electronics — Strategic Defense Initiative',
    summary:
      'At least 25 scientists and engineers connected to GEC-Marconi (the defence arm of GEC) and the Sting Ray torpedo and SDI ("Star Wars") work died under unusual circumstances in a six-year window. Causes ranged from car crashes and apparent suicides to one researcher tying his own hands behind his back, putting a rope around his neck, and falling off a bridge. UK Parliament debated the cluster but no consolidated investigation was ever produced.',
    whyItMatters:
      'The closest historical analogue to the current cluster: a defined defense-tech program, geographically concentrated personnel, deaths officially ruled non-suspicious individually but statistically extreme as a group, and zero coordinated state response. The 11 names Congress is now asking about have already been publicly compared to Marconi by retired investigators and current legislators.',
    sources: [
      { label: 'Project Camelot tribute (25 names)', url: 'https://projectcamelot.org/marconi.html' },
      { label: 'CrimeReads — Star Wars deaths', url: 'https://crimereads.com/the-many-real-life-deaths-surrounding-the-star-wars-defense-initiative/' },
    ],
  },
  {
    id: 'microbiologist-cluster',
    name: 'The Post-9/11 Microbiologist Cluster',
    era: 'Nov 2001 – Mar 2002',
    field: 'Bioweapons defense / infectious disease research',
    summary:
      'Beginning with Harvard\'s Don Wiley vanishing from the Memphis-Arkansas Bridge on November 15, 2001, at least 11 prominent microbiologists died in a four-month window. Causes included a stab wound, a hit-and-run, a "homeless attacker," a fall in a parking garage, and several rulings that contradicted family statements. The cluster overlapped with the still-unsolved 2001 anthrax-letter attacks.',
    whyItMatters:
      'The most direct precedent in the post-9/11 era for a cluster of mysterious bioscience deaths covered by mainstream press, dismissed as coincidence by federal officials, and never aggregated into a single investigation. The 80+ names compiled in subsequent years suggest the cluster did not stop in 2002.',
    sources: [
      { label: 'Globe and Mail — under the microscope', url: 'https://www.theglobeandmail.com/news/world/scientists-deaths-are-under-the-microscope/article4134797/' },
      { label: 'NYT Magazine — The Odds of That (Belkin, 2002)', url: 'http://mba.tuck.dartmouth.edu/mdm/AlumniLearningLinks/TheOddsOfThat.htm' },
      { label: 'List of dead scientists (PDF)', url: 'https://static1.squarespace.com/static/650f4d435ef4386d76a3c05f/t/65411a32dbbf23229dfe46fa/1698765363156/Dead-Scientists.pdf' },
    ],
  },
  {
    id: 'iranian-nuclear',
    name: 'Iranian Nuclear Scientist Assassinations',
    era: '2010–2020',
    field: 'Nuclear physics — Iran',
    summary:
      'A documented and partially-acknowledged campaign of targeted killings of Iranian nuclear scientists. Methods included motorcycle-mounted magnetic-bomb attacks, a remote-controlled satellite-guided machine-gun (Mohsen Fakhrizadeh, 2020), and several poisonings. Israeli involvement has been reported and in some cases tacitly confirmed.',
    whyItMatters:
      'Establishes that targeted assassination of scientists working on strategic-weapons programs is a real and current state-craft tool, executed across borders with sophisticated weaponry. It is the template the Marconi and current U.S. clusters would resemble if state actors were involved.',
    sources: [
      { label: 'BBC — Fakhrizadeh killing', url: 'https://www.bbc.com/news/world-middle-east-55203381' },
    ],
  },
  {
    id: 'frank-olson',
    name: 'Frank Olson',
    era: '1953',
    field: 'CIA — biological warfare research',
    summary:
      'U.S. Army biochemist working on the CIA\'s MKUltra program who fell from a 13th-floor New York hotel window nine days after being secretly dosed with LSD by his colleagues. Officially ruled suicide. The CIA admitted the dosing in 1975. A 1994 exhumation by his family found injuries consistent with a blow to the head before the fall.',
    whyItMatters:
      'The foundational, government-acknowledged case of a U.S. scientist with classified program access dying in a "suicide" later complicated by physical evidence of homicide. The pattern — sudden death, ruling that contradicts the body, decades of denial, eventual partial admission — is the template every subsequent suspicious-death cluster has been measured against.',
    sources: [
      { label: 'NYT — Olson family settlement', url: 'https://www.nytimes.com/2012/07/05/us/family-of-frank-olson-cia-scientist-loses-bid-to-sue.html' },
    ],
  },
  {
    id: 'eugene-mallove',
    name: 'Eugene Mallove',
    era: '2004',
    field: 'MIT-trained engineer — cold fusion',
    summary:
      'MIT-educated engineer and journalist who left MIT in 1991 alleging the university had falsified its own data refuting cold fusion. Founded Infinite Energy magazine. Was beaten to death outside his childhood home in Norwich, Connecticut, on May 14, 2004. Two suspects were eventually convicted in 2012, though the official motive — a botched property dispute — has continued to be disputed by his colleagues, who note the timing aligned with a planned major cold-fusion announcement.',
    whyItMatters:
      'A scientist working at the contested edge of physics killed in a manner officially attributed to local crime, with persistent dispute by his peers. The structural similarity to the Loureiro and Grillmair cases — local perpetrator, official prosecution, peer suspicion of deeper context — is direct.',
    sources: [
      { label: 'Hartford Courant — Mallove convictions', url: 'https://www.courant.com/2012/08/02/mosley-gets-58-years-for-eugene-mallove-killing/' },
    ],
  },
  {
    id: 'hutchison',
    name: 'The Hutchison Effect Researchers',
    era: '1985–present',
    field: 'Anomalous gravitational and electromagnetic effects',
    summary:
      'A loose network of independent researchers, beginning with Canadian John Hutchison in the 1980s, who claim to have produced repeatable anomalous physical effects (levitation, metal fusing) using combined high-voltage electromagnetic fields. Several have died under unexplained circumstances or reported sustained harassment.',
    whyItMatters:
      'Provides longer-arc precedent for the Eskridge entry: independent researchers operating outside institutional support claiming experimental access to physics that would, if real, undermine the technology base of multiple defense industries. The harassment-pattern testimony is consistent across decades and across researchers who never met.',
    sources: [
      { label: 'Wikipedia — Hutchison effect', url: 'https://en.wikipedia.org/wiki/Hutchison_effect' },
    ],
  },
];
