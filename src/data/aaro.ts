import type { DossierEntry } from '@/components/dossier/types';

/**
 * AARO Watch — All-domain Anomaly Resolution Office
 * Pentagon-level UAP investigation lineage:
 *  AATIP (2007-2012) → UAPTF (2020) → AOIMSG (2021) → AARO (2022-present)
 * Annual reports, leadership transitions, and congressional testimony.
 */
export const aaroEntries: DossierEntry[] = [
  {
    id: 'aatip-origin',
    title: 'AATIP — The Predecessor',
    subtitle: 'DIA · 2007 – 2012',
    category: 'Lineage',
    era: '2007 – 2012',
    location: 'Defense Intelligence Agency, Arlington VA',
    confidence: 'VERIFIED',
    symbol: '🗂️',
    summary:
      'The Advanced Aerospace Threat Identification Program — the secret $22M Pentagon UAP study quietly funded inside the DIA at the request of Senator Harry Reid. Run by Luis Elizondo from a fifth-floor SCIF, it produced the FLIR1, GIMBAL, and GOFAST videos that broke the modern disclosure cycle in 2017.',
    origin:
      'AATIP grew out of Senator Harry Reid (D-NV) inserting black-budget language into the 2008 Defense Authorization. The $22 million was routed through Bigelow Aerospace Advanced Space Studies (BAASS) in Las Vegas before moving inside DIA. Officially the program closed in 2012 when funding lapsed; Elizondo continued leading a small UAP cell on a volunteer basis until his October 2017 resignation.\n\nIn December 2017 the New York Times broke "Glowing Auras and Black Money" — the first major-press confirmation that the Pentagon had been investigating UAP. The piece was paired with the FLIR1 (Tic Tac, 2004), GIMBAL, and GOFAST (both 2015) Navy fighter-jet videos. The story collapsed the post-1969 Project Blue Book consensus that the U.S. government had stopped studying the phenomenon.',
    keyEvents: [
      '2007: Reid secures black-budget appropriation.',
      '2008-2010: BAASS conducts field studies at Skinwalker Ranch under DoD contract.',
      'Dec 2017: NYT publishes "Glowing Auras and Black Money."',
      'Apr 2020: DoD officially releases the three Navy videos.',
    ],
    evidence: [
      'NYT exposé (16 Dec 2017) — Helene Cooper, Ralph Blumenthal, Leslie Kean.',
      'DoD press release (27 Apr 2020) authenticating the FLIR1/GIMBAL/GOFAST videos.',
      'Luis Elizondo resignation letter to SecDef Mattis (Oct 2017).',
      'Reid letters to Deputy SecDef (2009) requesting Special Access Program protections — released via FOIA.',
    ],
    skepticalView:
      'Critics including Mick West and Chris Mellon\'s own former colleagues argue AATIP\'s remit was always advanced foreign aerospace, not non-human craft, and that Elizondo\'s direct UAP role has been disputed by DoD spokesperson Susan Gough. The released videos all have prosaic explanations under active study (parallax, IR glare, bird).',
    videos: [
      { id: 'mWpCqRXbGss', title: 'Pentagon Officially Releases UFO Videos', channel: 'CNN' },
      { id: 'auYUWoaY2Bs', title: 'GIMBAL: The First Official UAP Footage', channel: 'To The Stars Academy' },
    ],
    sources: [
      { label: 'NYT — Glowing Auras and Black Money (2017)', url: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html' },
      { label: 'DoD Press Release — Navy Video Authentication (2020)', url: 'https://www.defense.gov/News/Releases/Release/Article/2165713/' },
    ],
  },
  {
    id: 'uaptf-2020',
    title: 'UAP Task Force',
    subtitle: 'ONI · Aug 2020 – Nov 2021',
    category: 'Lineage',
    era: 'Aug 2020 – Nov 2021',
    location: 'Office of Naval Intelligence',
    confidence: 'VERIFIED',
    symbol: '⚓',
    summary:
      'The Unidentified Aerial Phenomena Task Force was the first formally chartered post-AATIP body, stood up under the Office of Naval Intelligence and tasked by the SECDEF with detecting, analyzing, and cataloging UAP that pose threats to U.S. national security.',
    origin:
      'On August 4, 2020, Deputy Secretary of Defense David Norquist formally established the UAPTF. It was created in direct response to repeated Navy fighter encounters along the East Coast (2014-2015 Roosevelt strike group) and West Coast (2004 Nimitz / Tic Tac). Its public output was the June 25, 2021 Preliminary Assessment delivered to Congress under Section 1652 of the Intelligence Authorization Act of 2021.\n\nThe nine-page unclassified assessment confirmed 144 reports between 2004-2021, was able to explain only one (a deflating balloon), and noted in 18 incidents UAP appeared to "demonstrate advanced technology." UAPTF was disbanded into AOIMSG (later AARO) in November 2021.',
    keyEvents: [
      'Aug 4 2020: UAPTF chartered under ONI.',
      'Jun 25 2021: Preliminary Assessment delivered to Congress.',
      'Nov 23 2021: AOIMSG charter — UAPTF folded.',
    ],
    evidence: [
      'ODNI Preliminary Assessment: Unidentified Aerial Phenomena (25 Jun 2021).',
      'Section 1652, Intelligence Authorization Act FY2021 (mandate).',
      'DepSecDef memo (Aug 4 2020) establishing the task force.',
    ],
    videos: [
      { id: 'IxQDr_mGOJ4', title: 'Pentagon UAP Report — What Was Released', channel: '60 Minutes' },
    ],
    sources: [
      { label: 'ODNI Preliminary Assessment (2021)', url: 'https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf' },
      { label: 'DepSecDef UAPTF Memo (2020)', url: 'https://media.defense.gov/2020/Aug/14/2002476297/-1/-1/1/ESTABLISHMENT-OF-UNIDENTIFIED-AERIAL-PHENOMENA-TASK-FORCE.PDF' },
    ],
  },
  {
    id: 'aoimsg-2021',
    title: 'AOIMSG — The Bridge',
    subtitle: 'OUSD(I&S) · Nov 2021 – Jul 2022',
    category: 'Lineage',
    era: 'Nov 2021 – Jul 2022',
    location: 'Office of the Under Secretary of Defense for Intelligence & Security',
    confidence: 'VERIFIED',
    symbol: '🌉',
    summary:
      'The Airborne Object Identification and Management Synchronization Group — the eight-month transitional body that absorbed the UAPTF and was itself reorganized into AARO in July 2022. Notable for expanding the remit from "aerial" to "airborne" objects and broadening DoD-IC coordination.',
    origin:
      'Established by Deputy SecDef Kathleen Hicks on November 23, 2021, AOIMSG was designed to standardize UAP reporting across the Services and integrate the Intelligence Community. The FY2022 NDAA, signed December 27 2021, then mandated a permanent office with a director and broader extra-atmospheric scope — leading to the July 2022 redesignation as AARO.',
    keyEvents: [
      'Nov 23 2021: AOIMSG established.',
      'Dec 27 2021: FY2022 NDAA mandates permanent office.',
      'Jul 15 2022: Redesignated AARO.',
    ],
    evidence: [
      'DepSecDef Hicks memo (Nov 23 2021).',
      'Section 1683 FY2022 NDAA (Public Law 117-81).',
    ],
    sources: [
      { label: 'NDAA FY2022 §1683', url: 'https://www.congress.gov/bill/117th-congress/senate-bill/1605/text' },
      { label: 'DepSecDef AOIMSG Memo (2021)', url: 'https://media.defense.gov/2021/Nov/23/2002898188/-1/-1/0/MEMORANDUM-FOR-ESTABLISHMENT-OF-THE-AIRBORNE-OBJECT-IDENTIFICATION-AND-MANAGEMENT-SYNCHRONIZATION-GROUP.PDF' },
    ],
  },
  {
    id: 'aaro-charter',
    title: 'AARO — Charter & Mission',
    subtitle: 'OUSD(I&S) · Jul 2022 – present',
    category: 'Office',
    era: 'Jul 15 2022 – present',
    location: 'The Pentagon, Arlington VA',
    confidence: 'VERIFIED',
    symbol: '🛡️',
    summary:
      'The All-domain Anomaly Resolution Office — the permanent DoD office responsible for synchronizing efforts across the Department of Defense and Intelligence Community to detect, identify, and attribute objects of interest in, on, or near military installations, operating areas, training areas, special-use airspace, and other areas of interest.',
    origin:
      'AARO was established by SECDEF memo on July 15, 2022 and codified by Section 1683 of the FY2022 NDAA and amended by Sections 1673-1687 of the FY2023 NDAA (the so-called "Schumer-Rounds" UAP Disclosure Act amendments). Its remit expanded the UAPTF mandate to include trans-medium (air, space, sea, undersea) objects and added a congressionally-protected secure reporting mechanism for current and former government employees and contractors.\n\nDirector: Dr. Sean Kirkpatrick (Jul 2022 – Dec 2023), then Acting Director Tim Phillips (Dec 2023 – Dec 2024), then Dr. Jon Kosloski (Dec 2024 – present). AARO maintains a public website (aaro.mil) and a secure UAP reporting form for active-duty personnel.',
    keyEvents: [
      'Jul 15 2022: SECDEF Austin memo establishes AARO.',
      'Dec 23 2022: FY2023 NDAA expands authorities and reporting protections.',
      'Aug 31 2023: aaro.mil public site launches.',
    ],
    evidence: [
      'SECDEF memo establishing AARO (15 Jul 2022).',
      'aaro.mil public charter and FAQ.',
      'NDAA FY2023 §§1673-1687 (Schumer-Rounds amendments).',
    ],
    videos: [
      { id: 'KQ7Hh4aD4eU', title: 'Inside AARO — Pentagon UAP Office', channel: 'NewsNation' },
    ],
    sources: [
      { label: 'AARO Official Site', url: 'https://www.aaro.mil/' },
      { label: 'SECDEF AARO Memo (2022)', url: 'https://media.defense.gov/2022/Jul/20/2003039392/-1/-1/0/ESTABLISHMENT-OF-THE-ALL-DOMAIN-ANOMALY-RESOLUTION-OFFICE.PDF' },
      { label: 'NDAA FY2023', url: 'https://www.congress.gov/bill/117th-congress/house-bill/7776/text' },
    ],
  },
  {
    id: 'kirkpatrick-tenure',
    title: 'Sean Kirkpatrick',
    subtitle: 'Director · Jul 2022 – Dec 2023',
    category: 'Leadership',
    era: 'Jul 2022 – Dec 2023',
    location: 'AARO HQ, the Pentagon',
    confidence: 'VERIFIED',
    symbol: '👤',
    summary:
      'A career physicist and senior intelligence official (formerly Chief Scientist at DIA Missile and Space Intelligence Center) who became AARO\'s first director. His tenure was defined by a hard "scientific resolution" stance — and by direct, on-record clashes with whistleblower David Grusch.',
    origin:
      'Kirkpatrick took office on July 15 2022 with a stated mission to "use the rigor of science" to resolve UAP cases. Under his leadership AARO published the first UAP Annual Report (Jan 2023), the Volume I Historical Record Report (Mar 2024, after his departure but written under his tenure), and explicitly assessed that AARO had found "no empirical evidence" for non-human craft or reverse-engineering programs.\n\nHis July 26 2023 written statement to the House Oversight Committee directly contradicted Grusch\'s testimony, and a contentious Scientific American op-ed in January 2024 doubled down on that position. He resigned in December 2023, citing personal reasons; Tim Phillips served as acting director through 2024.',
    keyEvents: [
      'Jul 15 2022: Sworn in as inaugural director.',
      'Apr 19 2023: Senate Armed Services subcommittee testimony.',
      'Jul 26 2023: House Oversight hearing — counter to Grusch.',
      'Dec 1 2023: Resignation announced.',
      'Jan 19 2024: Scientific American op-ed.',
    ],
    evidence: [
      'Kirkpatrick written statement to House Oversight (26 Jul 2023).',
      'Kirkpatrick / Loeb Scientific American op-ed (Jan 2024).',
      'AARO bio page (archived via Wayback Machine).',
    ],
    skepticalView:
      'Disclosure advocates including Christopher Mellon, Ross Coulthart, and Senator Marco Rubio publicly questioned AARO\'s investigative depth under Kirkpatrick, citing his refusal to interview certain whistleblowers and the office\'s failure to receive the promised compartmented program access.',
    videos: [
      { id: 'KQOxMLG4Ihk', title: 'Dr. Sean Kirkpatrick — Senate UAP Hearing', channel: 'Senate Armed Services' },
    ],
    sources: [
      { label: 'House Oversight Hearing (Jul 26 2023)', url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/' },
      { label: 'Scientific American op-ed (Jan 2024)', url: 'https://www.scientificamerican.com/article/the-truth-is-out-there-but-its-not-what-you-think/' },
    ],
  },
  {
    id: 'kosloski-tenure',
    title: 'Jon Kosloski',
    subtitle: 'Director · Dec 2024 – present',
    category: 'Leadership',
    era: 'Dec 2024 – present',
    location: 'AARO HQ, the Pentagon',
    confidence: 'VERIFIED',
    symbol: '🆕',
    summary:
      'A quantum physicist from the National Security Agency named the second permanent director of AARO. His public posture has been notably more open than Kirkpatrick\'s — emphasizing transparency, the value of high-fidelity sensor data, and willingness to investigate the most anomalous cases without prejudgment.',
    origin:
      'Dr. Jon Kosloski was appointed AARO director in December 2024 after a year of acting leadership under Tim Phillips. Kosloski came from the NSA Research Directorate where he led quantum sensing programs. His first major public appearance was the November 19 2024 Senate Armed Services subcommittee hearing, where he committed to publishing more video and case data and acknowledged that a small percentage of cases ("approximately 2-5%") remain "truly anomalous."\n\nUnder Kosloski, AARO has accelerated declassification of historical sensor data and case files, and publicly committed to investigating Tier 1 cases (involving anomalous flight characteristics) with renewed scientific rigor.',
    keyEvents: [
      'Dec 2024: Appointed director.',
      'Nov 19 2024: First Senate testimony.',
      '2025: Expanded case-file releases on aaro.mil.',
    ],
    evidence: [
      'Senate Armed Services subcommittee hearing record (19 Nov 2024).',
      'AARO leadership page (aaro.mil).',
      'NSA biographical record (declassified portions).',
    ],
    videos: [
      { id: 'L1k4qY9wQ0Y', title: 'Senate UAP Hearing — Kosloski Testimony', channel: 'Senate Armed Services' },
    ],
    sources: [
      { label: 'AARO Leadership', url: 'https://www.aaro.mil/About-Us/Leadership/' },
      { label: 'Senate UAP Hearing (Nov 19 2024)', url: 'https://www.armed-services.senate.gov/hearings/' },
    ],
  },
  {
    id: 'annual-report-2022',
    title: '2022 Annual Report',
    subtitle: 'ODNI/AARO · Jan 12 2023',
    category: 'Report',
    era: 'Reporting period: Mar 2021 – Aug 2022',
    confidence: 'VERIFIED',
    symbol: '📄',
    summary:
      'The first congressionally-mandated UAP Annual Report. Cataloged 510 reports total — 144 from the prior assessment plus 366 new — and noted that an "increasing percentage" of UAP reports were attributable to balloons and UAS, while a meaningful subset remained uncharacterized.',
    origin:
      'Required by Section 1683 of the FY2022 NDAA. Submitted to Congress in classified form on October 31 2022 and publicly released January 12 2023. AARO had only been operational for three months when the data window closed, so most of the analytic legwork was UAPTF\'s.\n\nThe report\'s headline finding: of 366 new reports, 195 were considered uninteresting (balloons, UAS, debris, birds, weather), and 171 remained "uncharacterized and unattributed." A subset of those displayed "interesting signatures" warranting deeper analysis.',
    keyEvents: [
      'Oct 31 2022: Classified version delivered.',
      'Jan 12 2023: Unclassified summary released.',
    ],
    sources: [
      { label: '2022 Annual Report (ODNI)', url: 'https://www.dni.gov/files/ODNI/documents/assessments/Unclassified-2022-Annual-Report-UAP.pdf' },
    ],
  },
  {
    id: 'annual-report-2023',
    title: '2023 Annual Report',
    subtitle: 'ODNI/AARO · Oct 18 2023',
    category: 'Report',
    era: 'Reporting period: Aug 2022 – Apr 2023',
    confidence: 'VERIFIED',
    symbol: '📄',
    summary:
      'Reported 291 new UAP cases. Highlighted that the FAA had begun forwarding civil-aviation reports, and noted that "none of these UAP reports have been verified to involve breakthrough aerospace technologies."',
    origin:
      'The first full reporting cycle under AARO leadership. The unclassified summary was released October 18 2023 and was notable for explicit statements that the office had identified no verifiable evidence of non-human intelligence or breakthrough physics — language widely interpreted as a direct response to the Grusch testimony three months prior.',
    sources: [
      { label: '2023 Annual Report (ODNI)', url: 'https://www.dni.gov/files/ODNI/documents/assessments/Unclassified-Report-on-UAP-October-2023.pdf' },
    ],
  },
  {
    id: 'historical-record-vol1',
    title: 'Historical Record Vol. I',
    subtitle: 'AARO · Mar 8 2024',
    category: 'Report',
    era: '1945 – 2023 retrospective',
    confidence: 'VERIFIED',
    symbol: '📚',
    summary:
      'AARO\'s 63-page retrospective concluded that "all investigative efforts… have determined that claims of hidden UAP reverse-engineering programs and exotic material recoveries are inaccurate." The most contested AARO product to date — disclosure advocates dispute its scope, methodology, and witness selection.',
    origin:
      'Mandated by §1673 of the FY2023 NDAA. Volume I covers 1945-October 2023. AARO investigators interviewed approximately 30 witnesses; Volume II is in development to cover post-October 2023 testimony.\n\nThe report became a flashpoint: its definitive conclusions were rejected by witnesses including David Grusch, Jacques Vallée, and Christopher Mellon, who argued AARO never received the SAP read-ins required to verify or falsify the claims being investigated.',
    keyEvents: [
      'Mar 8 2024: Volume I released.',
      '2024-2025: Volume II in development.',
    ],
    skepticalView:
      'AARO defenders, including Kirkpatrick himself, argue the office did receive sufficient access and that the absence of evidence after exhaustive search is itself meaningful. They note no whistleblower has produced documents, materials, or program names that survive scrutiny.',
    videos: [
      { id: 'eRsTr9p3oP4', title: 'Pentagon Report Finds No UFO Evidence', channel: 'NBC News' },
    ],
    sources: [
      { label: 'Historical Record Volume I (AARO)', url: 'https://media.defense.gov/2024/Mar/08/2003409233/-1/-1/0/DOPSR-CLEARED-508-COMPLIANT-HRRV1-08-MAR-2024-FINAL.PDF' },
    ],
  },
  {
    id: 'grusch-hearing',
    title: 'House Oversight UAP Hearing',
    subtitle: 'Capitol Hill · Jul 26 2023',
    category: 'Hearing',
    era: 'July 26 2023',
    location: 'Rayburn House Office Building',
    confidence: 'VERIFIED',
    symbol: '🏛️',
    summary:
      'The most-watched UAP hearing in U.S. history. Three witnesses — Cmdr. David Fravor (Tic Tac), Ryan Graves (Roosevelt encounters), and former intelligence officer David Grusch — testified under oath, with Grusch claiming the U.S. operates a "multi-decade" non-human craft retrieval and reverse-engineering program.',
    origin:
      'The hearing was convened by the House Oversight Subcommittee on National Security under Reps. Glenn Grothman and Jared Moskowitz. Grusch had filed a formal Inspector General-protected whistleblower complaint in 2022 with 40+ witnesses; portions were ruled "credible and urgent" by ICIG Thomas Monheim.\n\nGrusch testified under oath that the U.S. has recovered non-human "biologics" and craft, that he could not discuss specifics in open session, and that he had personally interviewed individuals with direct program knowledge. AARO\'s Sean Kirkpatrick provided a written counter-statement the same week disputing the characterizations.',
    keyEvents: [
      'May 2022: Grusch files PPD-19 whistleblower complaint.',
      'Jun 5 2023: Coulthart/Kean Debrief publishes Grusch interviews.',
      'Jul 26 2023: Open hearing.',
      'Nov 13 2024: Follow-up hearing — Lue Elizondo, Tim Gallaudet, Mike Gold, Mike Shellenberger testify.',
    ],
    evidence: [
      'Live C-SPAN feed and full transcript (House.gov).',
      'Grusch ICIG complaint (portions released).',
      'Kirkpatrick written counter-statement (26 Jul 2023).',
    ],
    videos: [
      { id: 'KQOxMLG4Ihk', title: 'Full UAP Hearing — Grusch, Fravor, Graves', channel: 'House Oversight' },
      { id: 'gAZ8b9C9Xww', title: 'David Grusch Opening Statement', channel: 'NewsNation' },
    ],
    sources: [
      { label: 'House Oversight Hearing Record', url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/' },
      { label: 'Debrief — Grusch Disclosure', url: 'https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-non-human-craft/' },
    ],
  },
  {
    id: 'uap-disclosure-act',
    title: 'UAP Disclosure Act',
    subtitle: 'Schumer-Rounds Amendment · 2023',
    category: 'Legislation',
    era: 'Introduced Jul 2023',
    confidence: 'VERIFIED',
    symbol: '⚖️',
    summary:
      'Senate Majority Leader Chuck Schumer and Senator Mike Rounds introduced the most ambitious UAP transparency legislation in U.S. history — modeled on the JFK Records Act — that would have created an independent review board with eminent-domain authority over private UAP material. The strongest provisions were stripped before passage.',
    origin:
      'The bill, formally the "Unidentified Anomalous Phenomena Disclosure Act," was introduced as an amendment to the FY2024 NDAA on July 13 2023. As written, it would have established a nine-member presidentially-appointed UAP Records Review Board with subpoena authority and would have required all federal agencies and contractors to disclose UAP-related records within 25 years (with eminent domain over recovered "technologies of unknown origin" and "biological evidence of non-human intelligence").\n\nIn conference committee, the eminent domain provisions and the Review Board\'s subpoena authority were stripped at the insistence of House Speaker Mike Johnson and Rep. Mike Turner. The diluted version that became law (Title XCVII of the FY2024 NDAA) did codify a controlled disclosure plan and protected reporting channels.',
    keyEvents: [
      'Jul 13 2023: Schumer-Rounds amendment introduced.',
      'Dec 14 2023: Conference committee strips eminent-domain language.',
      'Dec 22 2023: NDAA FY2024 signed with diluted version.',
      '2025: Schumer reintroduces stronger version.',
    ],
    evidence: [
      'Original amendment text (S.Amdt.797).',
      'Title XCVII, FY2024 NDAA (P.L. 118-31).',
      'Schumer floor statement (Jul 18 2023).',
    ],
    videos: [
      { id: 'L7LkxfQ7xAA', title: 'Schumer Floor Speech on UAP Disclosure', channel: 'C-SPAN' },
    ],
    sources: [
      { label: 'S.Amdt. 797 — Original Text', url: 'https://www.congress.gov/amendment/118th-congress/senate-amendment/797/text' },
      { label: 'NDAA FY2024 Title XCVII', url: 'https://www.congress.gov/bill/118th-congress/house-bill/2670/text' },
    ],
  },
];

export const aaroCategories = ['All', 'Lineage', 'Office', 'Leadership', 'Report', 'Hearing', 'Legislation'];
