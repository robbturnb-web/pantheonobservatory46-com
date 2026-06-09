/**
 * UAP Disclosure Legislation Tracker.
 *
 * Authoritative timeline of U.S. federal legislation that creates,
 * funds, or constrains the disclosure of unidentified anomalous
 * phenomena (UAP) information. Sources cite congress.gov bill pages,
 * the official AARO site, and the public hearing record.
 *
 * Status reflects the public record as of the last `lastUpdated`
 * stamp below — update when a bill moves.
 */

export type BillStatus =
  | 'introduced'
  | 'committee'
  | 'passed-chamber'
  | 'enacted'
  | 'stalled'
  | 'failed';

export type BillChamber = 'senate' | 'house' | 'joint';

export interface LegislationSource {
  label: string;
  url: string;
}

export interface LegislationItem {
  id: string;
  /** Short title used as the card heading. */
  shortTitle: string;
  /** Formal bill number, e.g. "S. 2226" or "Sec. 1841, NDAA FY2024". */
  citation: string;
  congress: string;
  chamber: BillChamber;
  status: BillStatus;
  /** Year of introduction or most recent action. */
  year: number;
  introduced: string;
  lastAction: string;
  sponsors: string[];
  summary: string;
  /** Bullet list of the bill's disclosure-relevant provisions. */
  provisions: string[];
  /** Why it matters for the public disclosure timeline. */
  significance: string;
  sources: LegislationSource[];
}

export const LEGISLATION_LAST_UPDATED = '2026-06-09';

export const legislation: LegislationItem[] = [
  {
    id: 'iaa-fy2022-sec-1683',
    shortTitle: 'Establishment of the UAP office (AOIMSG → AARO)',
    citation: 'Intelligence Authorization Act FY2022, §1683',
    congress: '117th Congress',
    chamber: 'joint',
    status: 'enacted',
    year: 2021,
    introduced: '2021-07-28',
    lastAction: 'Enacted as part of NDAA FY2022 (Pub. L. 117–81), Dec 27, 2021.',
    sponsors: ['Sen. Kirsten Gillibrand (D-NY)', 'Sen. Marco Rubio (R-FL)'],
    summary:
      'Directed the Secretary of Defense and Director of National Intelligence to stand up a permanent office to detect, identify, attribute, and mitigate UAP. The office was first chartered as the Airborne Object Identification and Management Synchronization Group (AOIMSG) and was reorganized in July 2022 as the All-domain Anomaly Resolution Office (AARO).',
    provisions: [
      'Permanent DoD/ODNI office with cross-domain (air, sea, space, transmedium) scope.',
      'Annual classified and unclassified reports to congressional defense and intelligence committees.',
      'Mandatory reporting channel for service-member UAP sightings.',
    ],
    significance:
      'First statutory recognition of UAP as a national-security topic since Project Blue Book closed in 1969.',
    sources: [
      { label: 'Public Law 117-81 (NDAA FY2022)', url: 'https://www.congress.gov/bill/117th-congress/senate-bill/1605/text' },
      { label: 'AARO official site', url: 'https://www.aaro.mil/' },
    ],
  },
  {
    id: 'ndaa-fy2023-sec-6802',
    shortTitle: 'AARO charter, immunity & retroactive whistleblower protection',
    citation: 'NDAA FY2023, §6802 (Pub. L. 117–263)',
    congress: '117th Congress',
    chamber: 'joint',
    status: 'enacted',
    year: 2022,
    introduced: '2022-07-11',
    lastAction: 'Signed into law by President Biden, Dec 23, 2022.',
    sponsors: ['Sen. Kirsten Gillibrand (D-NY)', 'Sen. Marco Rubio (R-FL)'],
    summary:
      'Expanded AARO\'s mandate and created the first secure, lawful channel for current and former U.S. government personnel and contractors to disclose UAP-related information — including programs that may have been previously compartmented in unacknowledged Special Access Programs (SAPs).',
    provisions: [
      'Authorized AARO to receive classified UAP testimony with retroactive whistleblower protection.',
      'Removed criminal liability for breaking prior non-disclosure agreements when reporting to AARO.',
      'Required a historical review of U.S. UAP programs from 1945 to present.',
    ],
    significance:
      'The legal cover for David Grusch, Dave Fravor, and Ryan Graves to testify openly to Congress in July 2023.',
    sources: [
      { label: 'Public Law 117-263 (NDAA FY2023)', url: 'https://www.congress.gov/bill/117th-congress/house-bill/7776/text' },
      { label: 'AARO secure reporting mechanism', url: 'https://www.aaro.mil/Contact/Secure-Reporting-Mechanism/' },
    ],
  },
  {
    id: 's-2226-schumer-rounds',
    shortTitle: 'UAP Disclosure Act of 2023 (Schumer–Rounds Amendment)',
    citation: 'S. 2226, §§9001–9013 (UAPDA)',
    congress: '118th Congress',
    chamber: 'senate',
    status: 'stalled',
    year: 2023,
    introduced: '2023-07-13',
    lastAction:
      'Senate passed S. 2226 with full UAPDA text on Jul 27, 2023; House conferees stripped the controlled-disclosure and eminent-domain provisions before NDAA FY2024 became law on Dec 22, 2023.',
    sponsors: [
      'Sen. Chuck Schumer (D-NY)',
      'Sen. Mike Rounds (R-SD)',
      'Sen. Kirsten Gillibrand (D-NY)',
      'Sen. Marco Rubio (R-FL)',
      'Sen. Todd Young (R-IN)',
      'Sen. Martin Heinrich (D-NM)',
    ],
    summary:
      'The most ambitious UAP transparency bill ever introduced in the U.S. Congress. Modeled on the President John F. Kennedy Assassination Records Collection Act of 1992, it would have created a 9-member Presidential Review Board with the power to declassify UAP records on a 25-year sunset and to use eminent domain over recovered non-human technology held by private contractors.',
    provisions: [
      'Independent UAP Records Review Board with subpoena power.',
      'Presumption of immediate disclosure, with narrow national-security exceptions reviewable by the Board.',
      'Mandatory inventory of all UAP-related material held by Federal agencies and their contractors within 300 days.',
      'Eminent-domain authority over biological evidence and recovered technologies of non-human origin.',
    ],
    significance:
      'Even in its stripped-down enacted form, UAPDA forced the federal government to publicly acknowledge — for the first time in statute — the concept of "non-human intelligence" and "technologies of unknown origin."',
    sources: [
      { label: 'S. 2226 full text (congress.gov)', url: 'https://www.congress.gov/bill/118th-congress/senate-bill/2226/text' },
      { label: 'Schumer floor statement, Jul 17 2023', url: 'https://www.democrats.senate.gov/newsroom/press-releases/majority-leader-schumer-floor-remarks-on-his-uap-amendment' },
    ],
  },
  {
    id: 'ndaa-fy2024-uapda-enacted',
    shortTitle: 'UAP Disclosure Act (enacted, narrowed)',
    citation: 'NDAA FY2024, §§1841–1843 (Pub. L. 118–31)',
    congress: '118th Congress',
    chamber: 'joint',
    status: 'enacted',
    year: 2023,
    introduced: '2023-12-06',
    lastAction: 'Signed into law by President Biden, Dec 22, 2023.',
    sponsors: ['Sen. Chuck Schumer (D-NY)', 'Sen. Mike Rounds (R-FL)'],
    summary:
      'The conference report kept the records-collection and review framework but dropped the Review Board, the controlled-disclosure scheme, and the eminent-domain authority that the Senate-passed version contained.',
    provisions: [
      'NARA-housed "UAP Records Collection" with mandatory agency transfer of UAP-related records.',
      '25-year postponement sunset with agency justification requirement.',
      'Statutory definitions of "non-human intelligence" and "technologies of unknown origin."',
    ],
    significance:
      'Created the legal architecture for UAP disclosure even though Congress did not yet authorize the independent board that would operate it.',
    sources: [
      { label: 'Public Law 118-31 (NDAA FY2024)', url: 'https://www.congress.gov/bill/118th-congress/house-bill/2670/text' },
      { label: 'NARA UAP Records Collection notice', url: 'https://www.archives.gov/research/uap' },
    ],
  },
  {
    id: 'house-oversight-hearing-2023',
    shortTitle: 'House Oversight UAP hearing (Grusch · Fravor · Graves)',
    citation: 'H. Oversight & Accountability, Subcomm. on Nat\'l Security',
    congress: '118th Congress',
    chamber: 'house',
    status: 'enacted',
    year: 2023,
    introduced: '2023-07-26',
    lastAction:
      'Public hearing held Jul 26, 2023. Testimony entered into the Congressional Record.',
    sponsors: ['Rep. Glenn Grothman (R-WI)', 'Rep. Jared Moskowitz (D-FL)', 'Rep. Tim Burchett (R-TN)', 'Rep. Anna Paulina Luna (R-FL)'],
    summary:
      'Three sworn witnesses — former NRO/NGA intelligence officer David Grusch, retired Navy commander David Fravor (Nimitz "Tic Tac" pilot), and former Navy lieutenant Ryan Graves — testified under oath about UAP encounters and alleged crash-retrieval programs.',
    provisions: [
      'On-record allegations of a multi-decade U.S. crash-retrieval and reverse-engineering program.',
      'Bipartisan calls for SCIF-cleared follow-on hearings and IG access.',
      'Direct catalyst for the Schumer-Rounds UAPDA amendment.',
    ],
    significance:
      'First sworn congressional testimony alleging recovered "non-human biologics" since the 1968 Symposium on Unidentified Flying Objects.',
    sources: [
      { label: 'Hearing record (oversight.house.gov)', url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/' },
      { label: 'Grusch opening statement (PDF)', url: 'https://oversight.house.gov/wp-content/uploads/2023/07/Grusch-Statement.pdf' },
    ],
  },
  {
    id: 'aaro-historical-record-report',
    shortTitle: 'AARO Historical Record Report — Volume I',
    citation: 'AARO report to Congress, mandated by NDAA FY2023',
    congress: '118th Congress',
    chamber: 'joint',
    status: 'enacted',
    year: 2024,
    introduced: '2024-03-08',
    lastAction:
      'Volume I released publicly Mar 8, 2024. Volume II covering 1969 to present remains pending.',
    sponsors: ['DoD All-domain Anomaly Resolution Office (AARO)'],
    summary:
      'AARO\'s first public review of U.S. government UAP investigative effort from 1945 to 1969. Concluded that no verifiable evidence exists in DoD records of recovered extraterrestrial technology or reverse-engineering programs — a finding that whistleblower David Grusch and Rep. Tim Burchett publicly dispute.',
    provisions: [
      'Reviewed Project Sign (1948), Project Grudge (1949), Project Blue Book (1952–1969).',
      'Disclosed previously-classified Air Force UAP investigation programs.',
      'Confirmed AARO secure reporting portal is operational.',
    ],
    significance:
      'First official U.S. government UAP history published under statutory requirement.',
    sources: [
      { label: 'AARO Historical Record Report Vol. I (PDF)', url: 'https://media.defense.gov/2024/Mar/08/2003409233/-1/-1/0/DOPSR-CLEARED-508-COMPLIANT-HRRV1-08-MAR-2024-FINAL.PDF' },
      { label: 'AARO press release', url: 'https://www.defense.gov/News/Releases/Release/Article/3699004/' },
    ],
  },
  {
    id: 'house-task-force-2024',
    shortTitle: 'House UAP Task Force established',
    citation: 'H. Oversight Task Force on UAP',
    congress: '118th Congress',
    chamber: 'house',
    status: 'enacted',
    year: 2024,
    introduced: '2024-09-09',
    lastAction:
      'Speaker Johnson formally established the bipartisan Task Force on UAP on Sep 9, 2024. Co-chaired by Rep. Anna Paulina Luna and Rep. Tim Burchett.',
    sponsors: ['Speaker Mike Johnson (R-LA)', 'Rep. Anna Paulina Luna (R-FL)', 'Rep. Tim Burchett (R-TN)'],
    summary:
      'A standing House task force with subpoena authority dedicated to investigating UAP-related programs, allegations of unacknowledged Special Access Programs, and DoD/IC compliance with the UAP Disclosure Act provisions enacted in 2023.',
    provisions: [
      'Bipartisan membership across Oversight, Intelligence, and Armed Services committees.',
      'Subpoena power for documents and witness testimony.',
      'Mandate to recommend follow-on legislation, including reintroduction of full UAPDA.',
    ],
    significance:
      'First standing congressional body with explicit UAP investigative jurisdiction.',
    sources: [
      { label: 'Task Force announcement (Speaker.gov)', url: 'https://www.speaker.gov/' },
      { label: 'Luna press release', url: 'https://luna.house.gov/' },
    ],
  },
  {
    id: 'house-oversight-hearing-nov-2024',
    shortTitle: 'House Task Force UAP hearing (Elizondo · Gold · Shellenberger · Gallaudet)',
    citation: 'H. Oversight Task Force, Public Hearing',
    congress: '118th Congress',
    chamber: 'house',
    status: 'enacted',
    year: 2024,
    introduced: '2024-11-13',
    lastAction: 'Public hearing held Nov 13, 2024. Testimony entered into the record.',
    sponsors: ['Rep. Anna Paulina Luna (R-FL)', 'Rep. Tim Burchett (R-TN)', 'Rep. Eric Burlison (R-MO)'],
    summary:
      'Second major sworn-testimony hearing. Witnesses included former AATIP director Luis Elizondo, retired Rear Adm. Tim Gallaudet (former NOAA Administrator), journalist Michael Shellenberger, and aerospace executive Michael Gold.',
    provisions: [
      'Sworn allegations of ongoing UAP-related programs operating outside congressional oversight.',
      'Calls to expand AARO funding and reintroduce the full UAPDA review board.',
      'Public reference to classified "transmedium" Navy encounters.',
    ],
    significance:
      'Reinforced the bipartisan momentum behind UAPDA reintroduction in the 119th Congress.',
    sources: [
      { label: 'Hearing video (oversight.house.gov)', url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-exposing-the-truth/' },
      { label: 'Elizondo prepared remarks', url: 'https://oversight.house.gov/wp-content/uploads/2024/11/Elizondo-Statement.pdf' },
    ],
  },
  {
    id: 'uapda-2024-reintroduction',
    shortTitle: 'UAP Disclosure Act of 2024 (Rounds–Schumer reintroduction)',
    citation: 'NDAA FY2025, Senate floor amendment',
    congress: '118th Congress',
    chamber: 'senate',
    status: 'stalled',
    year: 2024,
    introduced: '2024-07-11',
    lastAction:
      'Sen. Rounds and Majority Leader Schumer reintroduced a narrowed UAPDA as a Senate amendment to NDAA FY2025; the controlled-disclosure framework was again removed in conference.',
    sponsors: ['Sen. Mike Rounds (R-SD)', 'Sen. Chuck Schumer (D-NY)'],
    summary:
      'Second attempt at the original UAPDA framework. Retained the Review Board structure and presumption of immediate disclosure but trimmed the eminent-domain language that drew House Intelligence Committee opposition in 2023.',
    provisions: [
      'Re-proposed 9-member Presidential Review Board.',
      'Mandatory records inventory by every Federal department within 300 days.',
      'Removed standalone eminent-domain authority; replaced with right of first refusal.',
    ],
    significance:
      'Demonstrates bipartisan Senate commitment to the controlled-disclosure framework even after House conferees blocked it twice.',
    sources: [
      { label: 'Rounds press release', url: 'https://www.rounds.senate.gov/newsroom/press-releases' },
      { label: 'Schumer floor remarks', url: 'https://www.democrats.senate.gov/newsroom/press-releases' },
    ],
  },
  {
    id: 'ndaa-fy2025-aaro-funding',
    shortTitle: 'AARO authorization & funding floor',
    citation: 'NDAA FY2025, §1687 (Pub. L. 118–159)',
    congress: '118th Congress',
    chamber: 'joint',
    status: 'enacted',
    year: 2024,
    introduced: '2024-12-11',
    lastAction: 'Signed into law by President Biden, Dec 23, 2024.',
    sponsors: ['Sen. Kirsten Gillibrand (D-NY)', 'Sen. Roger Wicker (R-MS)'],
    summary:
      'Locked in a multi-year authorization for AARO, codified its director-level reporting line to the Deputy Secretary of Defense, and required quarterly classified UAP briefings to the Big Eight congressional leadership.',
    provisions: [
      'Multi-year authorization (FY25–FY29) for AARO staffing and analytic capability.',
      'Quarterly classified briefings to congressional leadership.',
      'Required AARO Volume II historical report on the 1969–present era.',
    ],
    significance:
      'Stabilizes the AARO office institutionally so that disclosure progress survives administration changes.',
    sources: [
      { label: 'Public Law 118-159 (NDAA FY2025)', url: 'https://www.congress.gov/bill/118th-congress/senate-bill/4638/text' },
      { label: 'AARO leadership page', url: 'https://www.aaro.mil/About-Us/Leadership/' },
    ],
  },
];

export const STATUS_LABEL: Record<BillStatus, string> = {
  introduced: 'Introduced',
  committee: 'In Committee',
  'passed-chamber': 'Passed Chamber',
  enacted: 'Enacted',
  stalled: 'Stalled',
  failed: 'Failed',
};

export const STATUS_TONE: Record<BillStatus, { ring: string; text: string; dot: string }> = {
  introduced:      { ring: 'ring-cyan-400/40',    text: 'text-cyan-200',    dot: 'bg-cyan-400' },
  committee:       { ring: 'ring-amber-400/40',   text: 'text-amber-200',   dot: 'bg-amber-400' },
  'passed-chamber':{ ring: 'ring-indigo-400/40',  text: 'text-indigo-200',  dot: 'bg-indigo-400' },
  enacted:         { ring: 'ring-emerald-400/50', text: 'text-emerald-200', dot: 'bg-emerald-400' },
  stalled:         { ring: 'ring-yellow-500/40',  text: 'text-yellow-200',  dot: 'bg-yellow-400' },
  failed:          { ring: 'ring-red-500/40',     text: 'text-red-200',     dot: 'bg-red-400' },
};

export const CHAMBER_LABEL: Record<BillChamber, string> = {
  senate: 'U.S. Senate',
  house: 'U.S. House',
  joint: 'Joint (Public Law)',
};
