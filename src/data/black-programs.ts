import type { DossierEntry } from '@/components/dossier/types';
import rubiksImg from '@/assets/black-programs/rubiks-cube.jpg';
import immaculateImg from '@/assets/black-programs/immaculate-constellation.jpg';
import konaBlueImg from '@/assets/black-programs/kona-blue.jpg';
import aatipImg from '@/assets/black-programs/aatip-aawsap.jpg';
import legacyImg from '@/assets/black-programs/legacy-program.jpg';
import aquariusImg from '@/assets/black-programs/aquarius.jpg';
import blueBookImg from '@/assets/black-programs/blue-book-trilogy.jpg';
import mj12Img from '@/assets/black-programs/mj12.jpg';
import stargateImg from '@/assets/black-programs/stargate.jpg';
import pounceImg from '@/assets/black-programs/pounce.jpg';
import moonDustImg from '@/assets/black-programs/moon-dust.jpg';
import solarWardenImg from '@/assets/black-programs/solar-warden.jpg';
import yankeeBlueImg from '@/assets/black-programs/yankee-blue.jpg';
import nroZodiacImg from '@/assets/black-programs/nro-zodiac.jpg';
import uaptfImg from '@/assets/black-programs/uaptf-aaro.jpg';

/**
 * Black Programs Vault — every alleged / acknowledged UAP-related
 * Special Access Program, with Rubik's Cube as the flagship dossier.
 *
 * Confidence labels follow the project standard:
 *  VERIFIED  — official record exists (AATIP, Blue Book, AARO, Stargate)
 *  REPORTED  — surfaced by named whistleblowers / public reports
 *  ALLEGED   — claimed but not corroborated by hard evidence
 *  DEBATED   — official + counter-record disagree
 */
export const blackProgramEntries: DossierEntry[] = [
  {
    id: 'rubiks-cube',
    heroImage: rubiksImg,
    title: "Rubik's Cube",
    subtitle: 'Alleged UAP material-analysis & psionic-pilot program · 2024-2025 disclosure',
    category: 'Retrieval',
    era: 'Active (alleged)',
    location: 'Compartmented · unspecified U.S. facility',
    confidence: 'REPORTED',
    symbol: '🧊',
    summary:
      "Surfaced publicly in 2024-2025 through Jake Barber, Ross Coulthart and the Shawn Ryan Show — Rubik's Cube is described as a compartmented retrieval / reverse-engineering program named for recovered NHI craft components that reportedly reconfigure their internal geometry like a Rubik's cube. The program allegedly used psionic operators to lure and recover \"egg-shaped\" craft.",
    origin:
      "In late 2024, former USAF Lt. Col. Jake Barber went on-record with NewsNation's Reality Check and the Shawn Ryan Show describing a compartmented program — referred to internally as \"Rubik's Cube\" — that recovered an intact egg-shaped craft using a team of trained \"psionic\" operators who mentally summoned it. The name reportedly comes from how recovered material samples physically rearrange their internal lattice when handled, like a cube being turned.\n\nThe disclosure is the most concrete first-hand SAP testimony since David Grusch's 2023 congressional appearance. It alleges the program operates outside congressional oversight, is contracted through aerospace primes, and has produced multiple retrievals — with material that allegedly responds to operator consciousness. Coulthart and Matt Ford have followed it with weekly NewsNation segments and the Liberation Times has run corroborating sourcing.",
    keyEvents: [
      'Dec 2024: Jake Barber goes on-record with NewsNation Reality Check.',
      "Jan 2025: 4+ hour Shawn Ryan Show interview drops — Barber + Matt Adams describe the \"egg\" retrieval and psionic team.",
      'Jan-Mar 2025: Coulthart publishes follow-up segments; Liberation Times runs corroborating sourcing.',
      "2025: \"Skywatcher\" / Merlin private retrieval team referenced as Barber's current civilian effort.",
    ],
    evidence: [
      'On-record video testimony — Barber + Adams, Shawn Ryan Show, January 2025.',
      'NewsNation Reality Check broadcast segments (Coulthart / Ford).',
      'Liberation Times investigative articles (Christopher Sharp).',
      'Photo of alleged "egg" craft presented during the interview (provenance contested).',
      'Adjacent corroboration from David Grusch (2023 hearings) and Tim Gallaudet (NOAA).',
    ],
    skepticalView:
      'The Pentagon\'s AARO has publicly stated no verified evidence of a non-human craft retrieval program exists. Skeptics including Mick West and Steven Greenstreet argue the imagery shown lacks chain-of-custody, the "psionic summoning" claim is unfalsifiable, and the program name conveniently surfaces only via paid interview circuits. Until physical material or a corroborating SAP code-name appears in IG / Senate Intelligence records, the claim remains REPORTED, not verified.',
    videos: [
      { id: 'qHnvuGph7Hg', title: 'Jake Barber — Shawn Ryan Show (Full Interview)', channel: 'Shawn Ryan Show' },
      { id: '5_bI3HfkbCY', title: 'Ross Coulthart on the Rubik\'s Cube Disclosure', channel: 'NewsNation' },
    ],
    sources: [
      { label: 'NewsNation — Reality Check', url: 'https://www.newsnationnow.com/space/ufo/' },
      { label: 'Liberation Times — UAP investigations', url: 'https://www.liberationtimes.com/' },
      { label: 'Shawn Ryan Show — Barber interview', url: 'https://www.youtube.com/@ShawnRyanShow' },
    ],
  },
  {
    id: 'immaculate-constellation',
    heroImage: immaculateImg,
    title: 'Immaculate Constellation',
    subtitle: 'Alleged umbrella UAP SAP · Matthew Brown report 2024',
    category: 'Umbrella',
    era: 'Active (alleged)',
    location: 'Cross-agency · executive-branch compartment',
    confidence: 'REPORTED',
    symbol: '✦',
    summary:
      "Surfaced November 2024 via a 12-page report authored by former DoD intelligence officer Michael 'Matthew' Brown, alleging an unacknowledged Special Access Program code-named Immaculate Constellation that collects, analyzes and conceals UAP material across the U.S. intelligence community.",
    origin:
      "On 7 November 2024, journalist Michael Shellenberger published the Immaculate Constellation report on his Public substack — a 12-page document by Matthew Brown describing what Brown calls an \"unacknowledged SAP\" tasked with consolidating UAP data outside any chartered oversight body. The report names no specific facilities, contractors or operators but lists categories of recovered material and describes the program as the de-facto inheritor of decades of legacy retrieval activity.\n\nThe document was submitted to the House Oversight Committee, the Senate Intelligence Committee, and ICIG. AARO Director Jon Kosloski testified in late 2024 that AARO has \"not found evidence\" of such a program, while Brown maintains the report is sourced from people still inside the compartment.",
    keyEvents: [
      'Nov 7 2024: Public.news publishes the report.',
      'Nov 13 2024: House Oversight UAP hearing — Brown\'s report cited live.',
      'Late 2024: Kosloski (AARO) testifies no evidence found.',
      '2025: Continued congressional referrals; report remains uncorroborated by AARO.',
    ],
    evidence: [
      'Immaculate Constellation report (Brown, 2024) — 12 pages, on Public.news.',
      'House Oversight UAP hearing transcript (Nov 2024).',
      'Brown\'s sworn submissions to Senate Intel and ICIG.',
    ],
    skepticalView:
      "AARO\'s public position is that no verifiable evidence of Immaculate Constellation has surfaced in classified or unclassified review. Critics note Brown's report contains no code-words, contractor names, or program element numbers that could be independently cross-checked.",
    videos: [
      { id: 'KQ7Dw-739hY', title: 'House Oversight UAP Hearing — November 2024', channel: 'Forbes Breaking News' },
    ],
    sources: [
      { label: 'Public — Immaculate Constellation report', url: 'https://public.substack.com/' },
      { label: 'House Oversight UAP hearing (Nov 2024)', url: 'https://oversight.house.gov/' },
    ],
  },
  {
    id: 'kona-blue',
    heroImage: konaBlueImg,
    title: 'Kona Blue',
    subtitle: 'DHS-proposed UAP SAP · proposed 2011, never funded (per DoD)',
    category: 'Umbrella',
    era: '2011 (proposed)',
    location: 'Department of Homeland Security',
    confidence: 'DEBATED',
    symbol: '🌊',
    summary:
      'A proposed Special Access Program intended as the successor to AAWSAP, pitched to DHS by Bigelow Aerospace contractors in 2011 to study recovered "exotic technology." AARO confirms Kona Blue was proposed and not approved; whistleblowers allege it was approved under a different code-name.',
    origin:
      "AARO's March 2024 historical report (Volume I) explicitly names Kona Blue as a proposal floated by ex-AAWSAP personnel to DHS leadership after AAWSAP wound down. AARO says DHS declined to fund or stand up the program. Whistleblowers including David Grusch and former AAWSAP staff have countered that the capability migrated under a different SAP code-word and that Kona Blue is being used as a public-record deflection. The dispute remains active.",
    keyEvents: [
      '2011: Kona Blue proposed to DHS.',
      '2012: DHS declines per AARO Vol I.',
      'Mar 2024: AARO Historical Report Volume I publicly identifies the proposal.',
      '2024: Grusch and others contest the "not funded" framing under oath.',
    ],
    evidence: [
      'AARO Historical Record Report Volume I (March 8, 2024).',
      'Grusch ICIG complaint (filed 2022, partly declassified).',
      'Senate Intelligence Committee referenced briefings.',
    ],
    skepticalView:
      'AARO\'s official position: Kona Blue was a proposal that was never approved, never funded, and never executed. No SAP record exists.',
    videos: [
      { id: '7P8aK0O1-P8', title: 'Full UAP Hearing — Grusch, Fravor, Graves (07/26/2023)', channel: 'UAP Coalition' },
    ],
    sources: [
      { label: 'AARO Historical Record Volume I (2024)', url: 'https://media.defense.gov/2024/Mar/08/2003409233/-1/-1/0/DOPSR-CLEARED-508-COMPLIANT-HRRV1-08-MAR-2024-FINAL.PDF' },
    ],
  },
  {
    id: 'aatip-aawsap',
    heroImage: aatipImg,
    title: 'AAWSAP / AATIP',
    subtitle: 'DIA / Bigelow · the publicly acknowledged seed program',
    category: 'Acknowledged',
    era: '2007-2012',
    location: 'Defense Intelligence Agency · Las Vegas',
    confidence: 'VERIFIED',
    symbol: '◎',
    summary:
      "The Advanced Aerospace Weapon System Applications Program (AAWSAP) — operated by Bigelow Aerospace under a $22M DIA contract championed by Sen. Harry Reid — and its sister effort AATIP. The program officially studied UAP, exotic propulsion, and Skinwalker Ranch phenomena before being publicly revealed by the New York Times in 2017.",
    origin:
      "AAWSAP was contracted from DIA to Bigelow Aerospace's BAASS in 2008 with a stated mission to study \"future aerospace weapons threats from foreign powers.\" Internally the program covered UAP encounters, Skinwalker Ranch field research, and produced 38 Defense Intelligence Reference Documents on topics including warp drives and traversable wormholes. Lue Elizondo claims he ran a successor effort, AATIP, inside DoD until 2017.\n\nThe program was made public by the December 16, 2017 New York Times piece by Helene Cooper, Ralph Blumenthal and Leslie Kean. AARO later disputed Elizondo's leadership role over AATIP specifically, which Elizondo has rebutted publicly.",
    keyEvents: [
      '2007: Sen. Reid requests black-program funding for UAP work.',
      '2008-2012: AAWSAP / BAASS contract active.',
      '2017: NYT publishes "Glowing Auras and Black Money."',
      '2022: AARO stands up; takes over UAP analysis brief.',
    ],
    evidence: [
      '38 DIRDs released via FOIA (warp drive, metamaterials, wormholes).',
      'NYT investigative reporting (Dec 16, 2017).',
      'Senate UAPDA legislative history.',
      'Elizondo memoir Imminent (2024).',
    ],
    skepticalView:
      "AARO\'s historical report frames AAWSAP as a counterintelligence-adjacent effort that produced no verified UAP material. AARO has also publicly stated AATIP, as Elizondo described it, was not a chartered DoD program.",
    videos: [
      { id: '7P8aK0O1-P8', title: 'Full UAP Hearing — Grusch, Fravor, Graves (07/26/2023)', channel: 'UAP Coalition' },
    ],
    sources: [
      { label: 'NYT — Glowing Auras and Black Money (2017)', url: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html' },
      { label: 'AARO Historical Record Volume I', url: 'https://media.defense.gov/2024/Mar/08/2003409233/-1/-1/0/DOPSR-CLEARED-508-COMPLIANT-HRRV1-08-MAR-2024-FINAL.PDF' },
    ],
  },
  {
    id: 'legacy-program',
    heroImage: legacyImg,
    title: 'The Legacy Program',
    subtitle: "Grusch\'s term for the multi-decade retrieval & reverse-engineering enterprise",
    category: 'Umbrella',
    era: '~1947 → present (alleged)',
    location: 'Multi-agency · contractor-hosted',
    confidence: 'ALLEGED',
    symbol: '⚙️',
    summary:
      "David Grusch's umbrella term during his 2023 testimony for the broader, decades-long crash-retrieval and reverse-engineering enterprise allegedly run through aerospace primes outside congressional oversight. Includes alleged biologics, intact craft, and material analysis.",
    origin:
      "Grusch — a decorated Air Force / NGA intelligence officer who served as the UAPTF's NRO co-lead — filed an ICIG urgent-concern complaint in 2022 and went public via Leslie Kean and Ralph Blumenthal in The Debrief (June 2023). He referred to the broader enterprise as \"the Legacy Program,\" describing it as a constellation of SAPs that have allegedly hidden retrieval activity from Congress since the late 1940s and into the present, hosted within defense contractors to defeat oversight.\n\nGrusch testified under oath to the House Oversight Committee on July 26, 2023, naming corroborating witnesses he could not identify publicly. The Legacy Program is not a single SAP code-name — it's Grusch's umbrella label.",
    keyEvents: [
      'May 2022: Grusch ICIG complaint filed.',
      'June 2023: Kean / Blumenthal Debrief publication.',
      'July 26 2023: House Oversight testimony under oath.',
      '2023-2024: Schumer-Rounds UAPDA partially passes — disclosure mechanism diluted.',
    ],
    evidence: [
      'Grusch sworn House Oversight testimony (July 2023).',
      'ICIG urgent concern complaint (2022, partial release).',
      'Kean / Blumenthal Debrief article (June 2023).',
    ],
    skepticalView:
      'AARO and DoD have publicly stated no verifiable evidence has been provided supporting Grusch\'s specific retrieval claims. Skeptics argue Grusch testifies to second-hand information.',
    videos: [
      { id: '7P8aK0O1-P8', title: 'David Grusch — House Oversight Hearing (Full)', channel: 'UAP Coalition' },
    ],
    sources: [
      { label: 'The Debrief — Grusch original article', url: 'https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-craft-of-non-human-origin/' },
    ],
  },
  {
    id: 'aquarius',
    heroImage: aquariusImg,
    title: 'Project Aquarius',
    subtitle: 'Alleged 1980s successor to Project Grudge · MJ-12 era',
    category: 'Historical',
    era: '1980s (alleged)',
    location: 'USAF / NSA (alleged)',
    confidence: 'ALLEGED',
    symbol: '♒',
    summary:
      "Alleged compartmented program first referenced in the disputed Aquarius Telex (1981) released by Air Force OSI agent Richard Doty. Said to consolidate UAP intelligence from Grudge / Sign / Blue Book and to maintain ongoing contact protocols with EBE (\"Extraterrestrial Biological Entity\").",
    origin:
      "The Aquarius name surfaced through the AFOSI-leaked 1981 Aquarius Telex sent to physicist Linda Moulton Howe and the subsequent 1980s Doty / Bennewitz affair. The document references EBEs, an alleged crashed craft, and the inheritance of records from Project Grudge. The U.S. Air Force later confirmed the Telex was a fabricated counterintelligence document Doty used to manipulate Paul Bennewitz.\n\nDespite the Telex's discredited origin, the Aquarius name has remained in UAP literature as the alleged code-word for the 1970s-80s retrieval program. No primary documentation exists outside the disinformation chain.",
    keyEvents: [
      '1980: Bennewitz begins reporting Kirtland AFB anomalies.',
      '1981: Aquarius Telex shown to Linda Moulton Howe.',
      '1989: Richard Doty publicly confirms AFOSI disinformation campaign.',
      '2024: Aquarius name re-emerges in disclosure discourse via veteran whistleblowers.',
    ],
    evidence: [
      'Aquarius Telex (1981, contested).',
      'Linda Moulton Howe interviews (multiple decades).',
      'Doty admissions on Mirage Men documentary (2013).',
    ],
    skepticalView:
      'The originating document is an admitted AFOSI counterintelligence fabrication. There is no chain of evidence to a real Aquarius program.',
    sources: [
      { label: 'Mirage Men (2013) — Doty disinformation documentary', url: 'https://www.imdb.com/title/tt2374243/' },
    ],
  },
  {
    id: 'blue-book-trilogy',
    heroImage: blueBookImg,
    title: 'Sign · Grudge · Blue Book',
    subtitle: 'The acknowledged 1947-1969 USAF UFO trilogy',
    category: 'Acknowledged',
    era: '1947-1969',
    location: 'Wright-Patterson AFB',
    confidence: 'VERIFIED',
    symbol: '📘',
    summary:
      "The three publicly chartered Air Force programs that officially studied UFOs from the post-Roswell era through Condon. Sign (1947) → Grudge (1949) → Blue Book (1952-1969). 12,618 cases logged; 701 left as \"unidentified\" at closure.",
    origin:
      "Project Sign was established by ATIC at Wright-Patterson after Kenneth Arnold and Roswell. Its first internal Estimate of the Situation reportedly concluded interplanetary origin — the document was destroyed on order of Gen. Hoyt Vandenberg. Sign was renamed Project Grudge in 1949 with a deliberate debunking posture. In 1952 it was rebooted as Project Blue Book under Capt. Edward Ruppelt.\n\nBlue Book closed in December 1969 following the Condon Committee report. Its successor for serious cases was rumored to be Project Moon Dust / Operation Blue Fly, with deeper material reportedly going to compartmented programs outside the public chain.",
    keyEvents: [
      '1947: Project Sign established.',
      '1949: Renamed Project Grudge.',
      '1952-1969: Project Blue Book; 12,618 cases.',
      '1969: Condon Report; Blue Book formally closed.',
    ],
    evidence: [
      'Full Blue Book archive — National Archives Record Group 341.',
      'Ruppelt, "The Report on Unidentified Flying Objects" (1956).',
      'Condon Committee final report (1968).',
    ],
    skepticalView:
      "Skeptics consider Blue Book\'s closure appropriate — the Condon Committee concluded UFO study had no scientific value. Believers consider Blue Book a deliberate front for the real classified work.",
    sources: [
      { label: 'National Archives — Project Blue Book', url: 'https://www.archives.gov/research/military/air-force/ufos' },
    ],
  },
  {
    id: 'mj12',
    heroImage: mj12Img,
    title: 'MJ-12 / Majestic',
    subtitle: 'Disputed foundational committee · 1947 (alleged)',
    category: 'Historical',
    era: '1947 (alleged)',
    location: 'White House / DoD (alleged)',
    confidence: 'DEBATED',
    symbol: '🎖️',
    summary:
      'An alleged 12-member control committee — military, intelligence, and scientific — said to have been established by executive order in September 1947 to manage the Roswell recovery and all subsequent UAP material. Documented only through leaked papers of contested authenticity.',
    origin:
      "MJ-12 entered public discourse in 1984 when filmmaker Jaime Shandera received a roll of undeveloped 35mm film containing the briefing document allegedly prepared for President-elect Eisenhower in 1952. The membership list includes Vannevar Bush, James Forrestal, Roscoe Hillenkoetter, and Donald Menzel. The FBI investigated the documents in 1988 and concluded they were \"bogus,\" but the document trail has continued to surface — including the more recent Burisch / Cooper papers.\n\nStanton Friedman dedicated decades to authentication; Philip Klass and others built equally exhaustive forensic challenges (typewriter typeface anachronisms, date-format inconsistencies). The MJ-12 question remains the canonical battle-line of UFO documentary evidence.",
    keyEvents: [
      'Sept 24 1947: Alleged Truman executive order establishing the committee.',
      '1984: Shandera receives the briefing film.',
      '1988: FBI investigation labels documents bogus.',
      'Continued releases of MJ-12 adjacent documents through 2010s.',
    ],
    evidence: [
      'Eisenhower Briefing Document (1952, contested).',
      'Cutler-Twining memo (1954, debated).',
      'Friedman, "Top Secret/Majic" (1996).',
    ],
    skepticalView:
      'FBI assessment: documents are forgeries. Typographic and procedural anomalies are well-documented by Klass, Nickell and others.',
    sources: [
      { label: 'FBI Vault — Majestic 12', url: 'https://vault.fbi.gov/Majestic%2012' },
    ],
  },
  {
    id: 'stargate',
    heroImage: stargateImg,
    title: 'Stargate · Gateway · Sunstreak',
    subtitle: 'CIA / DIA remote-viewing program · 1972-1995',
    category: 'Acknowledged',
    era: '1972-1995',
    location: 'SRI International · Fort Meade',
    confidence: 'VERIFIED',
    symbol: '👁️',
    summary:
      "The umbrella name for a 20+ year U.S. intelligence program in psychic remote viewing — funded by CIA, DIA and Army Intelligence, run out of SRI by physicists Hal Puthoff and Russell Targ. Includes the Monroe Institute's Gateway Process. Declassified 1995.",
    origin:
      "Initially funded in response to reports of Soviet psychotronics research, the program ran under successive code-names — SCANATE, GONDOLA WISH, GRILL FLAME, CENTER LANE, SUN STREAK and finally STAR GATE. Notable operational viewers included Ingo Swann, Pat Price, Joseph McMoneagle and Lyn Buchanan. The Monroe Institute's 1983 Gateway Experience analysis (rediscovered virally in 2017) examined consciousness, hemi-sync audio, and out-of-body experience as intelligence tools.\n\nThe program produced thousands of sessions, occasional notable hits (Price's Soviet crane factory description), and a contested overall efficacy. CIA declassified the archive in 1995 after the AIR review concluded the program lacked operational utility.",
    keyEvents: [
      '1972: SRI begins remote-viewing research under Puthoff.',
      '1983: Monroe Institute Gateway Experience analysis written.',
      '1995: STAR GATE declassified by CIA; AIR review released.',
      '2017: Gateway document goes viral after FOIA index re-release.',
    ],
    evidence: [
      'CIA STAR GATE archive (declassified, ~89,000 pages).',
      'AIR Final Review (1995).',
      'Monroe Institute Gateway Experience analysis (1983).',
    ],
    skepticalView:
      "Mainstream science considers remote viewing unverified. The AIR review concluded that even the program\'s best results lacked actionable utility.",
    sources: [
      { label: 'CIA STAR GATE collection', url: 'https://www.cia.gov/readingroom/collection/stargate' },
      { label: 'CIA Gateway Experience analysis (1983)', url: 'https://www.cia.gov/readingroom/document/cia-rdp96-00788r001700210016-5' },
    ],
  },
  {
    id: 'pounce',
    heroImage: pounceImg,
    title: 'Project Pounce',
    subtitle: 'Alleged USAF rapid-recovery team',
    category: 'Retrieval',
    era: '1970s → present (alleged)',
    location: 'USAF · Sandia / Kirtland',
    confidence: 'ALLEGED',
    symbol: '🐾',
    summary:
      'Alleged USAF rapid-response crash-recovery unit, named in Phil Schneider lectures and reinforced by Bob Lazar, said to deploy to any UAP recovery event in the continental United States.',
    origin:
      "Project Pounce appears in 1990s whistleblower lectures — Phil Schneider, Steve Lovekin, and indirectly through Lazar's S-4 testimony. The unit is described as a Sandia / Kirtland-hosted Quick-Reaction Force with EOD specialists, biohazard capability, and a cover designation as a generic missile-event response team. No primary documentation exists in declassified records.",
    keyEvents: [
      '1996: Phil Schneider lectures reference Pounce.',
      '2000s: Disclosure Project witnesses cite Pounce-like recovery doctrine.',
      '2023: Grusch alludes to recovery operations consistent with the Pounce profile (without naming).',
    ],
    evidence: [
      'Schneider lecture transcripts (1995-1996).',
      'Disclosure Project witness testimony (2001).',
    ],
    skepticalView:
      'No primary documentation. Project Pounce appears only in whistleblower retellings.',
    sources: [
      { label: 'Disclosure Project archive', url: 'https://siriusdisclosure.com/' },
    ],
  },
  {
    id: 'moon-dust',
    heroImage: moonDustImg,
    title: 'Moon Dust · Operation Blue Fly',
    subtitle: 'Declassified foreign-tech & space-debris recovery',
    category: 'Acknowledged',
    era: '1957-1980s',
    location: 'USAF Foreign Technology Division · Wright-Patterson',
    confidence: 'VERIFIED',
    symbol: '🌑',
    summary:
      "USAF programs chartered to recover foreign space hardware, downed Soviet aircraft, and \"objects of unknown origin\" — including suspected UAP debris. Confirmed via 1969 USAF regulation AFR 200-2 and FOIA-released cables.",
    origin:
      "Moon Dust was established to recover foreign space debris re-entering U.S. or allied territory. Operation Blue Fly was the associated rapid-deployment unit. AFR 200-2 (1953) and later Joint Army-Navy-Air Force Publication (JANAP) 146E specified reporting channels for both conventional debris and UAP. The CUFOS / Clifford Stone FOIA releases include cables describing Moon Dust recoveries of objects whose origin was officially classified as \"unidentified.\"\n\nBoth programs are publicly acknowledged. The UAP-adjacent character of certain recoveries is well-documented in the FOIA record.",
    keyEvents: [
      '1957: Moon Dust established.',
      '1961: JANAP 146E formalizes UAP reporting.',
      '1979: Programs publicly acknowledged via FOIA.',
      '1980s: Operations sunset / transition.',
    ],
    evidence: [
      'AFR 200-2 (1953).',
      'JANAP 146E reporting chain.',
      'Clifford Stone FOIA releases.',
    ],
    skepticalView:
      'Mainstream view: both programs handled conventional foreign space debris. UAP recoveries are presumed misidentified Soviet hardware.',
    sources: [
      { label: 'Black Vault — Moon Dust FOIA archive', url: 'https://www.theblackvault.com/documentarchive/project-moondust/' },
    ],
  },
  {
    id: 'solar-warden',
    heroImage: solarWardenImg,
    title: 'Solar Warden',
    subtitle: 'Alleged Secret Space Program · NRO / Navy (alleged)',
    category: 'Space',
    era: '1980s → present (alleged)',
    location: 'Unknown (alleged off-world basing)',
    confidence: 'ALLEGED',
    symbol: '🛰️',
    summary:
      'An alleged covert space fleet of triangular and rectangular craft, named in Gary McKinnon\'s 2002 NASA / DoD intrusion, said to be operated jointly by the U.S. Navy and NRO. Has no acknowledged document trail.',
    origin:
      "Gary McKinnon — facing extradition to the U.S. for the largest military computer hack ever conducted — claimed during his defense that he found a list of \"non-terrestrial officers,\" ship-to-ship transfer logs, and a fleet named Solar Warden in U.S. Space Command systems. McKinnon's claims are testimony, not documentation; the U.S. government has neither confirmed nor produced the underlying records.\n\nThe name was later picked up by Richard Dolan, Michael Salla, and the broader Secret Space Program literature. No primary documentation has surfaced. Among the most popularly cited and least evidenced of all alleged programs.",
    keyEvents: [
      '2001-2002: McKinnon intrusions into NASA / Pentagon networks.',
      '2002: U.S. indictment; extradition begins.',
      '2012: UK Home Secretary blocks extradition on health grounds.',
      '2010s: Solar Warden becomes SSP-community cornerstone.',
    ],
    evidence: [
      'McKinnon court testimony / interviews.',
      'Secondary references in Dolan, Salla, Tompkins literature.',
    ],
    skepticalView:
      'No documentary evidence has ever surfaced. McKinnon himself has stated he saved no screenshots.',
    sources: [
      { label: 'Gary McKinnon — BBC interviews', url: 'https://www.bbc.com/news/uk-19957138' },
    ],
  },
  {
    id: 'yankee-blue',
    heroImage: yankeeBlueImg,
    title: 'Yankee Blue',
    subtitle: 'Alleged USAF indoctrination / hazing program · AARO investigation finding',
    category: 'Indoctrination',
    era: 'Late 1980s-2010s',
    location: 'USAF compartmented facilities',
    confidence: 'REPORTED',
    symbol: '🪖',
    summary:
      "Named in AARO's 2024 historical report — an alleged indoctrination program in which select USAF personnel were briefed they were being read into a UAP-related SAP, signed NDAs, and only later realized the briefing had been an unsanctioned hazing / loyalty test. AARO calls it real but mischaracterized; whistleblowers say it was a cover.",
    origin:
      "AARO Volume I (March 2024) discusses Yankee Blue specifically: the report concludes that for decades, select Air Force personnel — including senior officers — were subjected to an unsanctioned, ad-hoc \"indoctrination\" in which they were told they had been read into a real UAP / non-human technology SAP. Many believed the briefing for years. AARO frames this as a long-running internal misconduct issue producing many of the witness narratives that fuel the disclosure community.\n\nWhistleblowers including Lue Elizondo have countered that Yankee Blue is being used to retroactively explain away real read-ins. AARO has stated the practice has been ordered stopped.",
    keyEvents: [
      'Mar 8 2024: AARO Volume I publishes the Yankee Blue finding.',
      'Mar 2024: AARO directs USAF to terminate the practice.',
      '2024-2025: Continued whistleblower pushback that the framing is itself a cover.',
    ],
    evidence: [
      'AARO Historical Record Report Volume I — section on indoctrination practices.',
      'USAF internal directives following AARO finding (referenced, not yet released).',
    ],
    skepticalView:
      "AARO\'s position is that Yankee Blue explains a large share of whistleblower narratives as misattributed memories from unsanctioned hazing. Disclosure-side critics call this a structural cover-up tool.",
    sources: [
      { label: 'AARO Historical Record Volume I (2024)', url: 'https://media.defense.gov/2024/Mar/08/2003409233/-1/-1/0/DOPSR-CLEARED-508-COMPLIANT-HRRV1-08-MAR-2024-FINAL.PDF' },
    ],
  },
  {
    id: 'nro-zodiac',
    heroImage: nroZodiacImg,
    title: 'NRO "Zodiac" & unnamed compartments',
    subtitle: 'Schumer Amendment / UAPDA — implied SAP constellations',
    category: 'Umbrella',
    era: '2023-present',
    location: 'NRO · IC compartments',
    confidence: 'REPORTED',
    symbol: '♓︎',
    summary:
      'The Schumer-Rounds UAP Disclosure Act (UAPDA, 2023) implicitly references multiple compartmented programs holding UAP-related material — collectively referred to in disclosure-side reporting as the Zodiac compartments. The legislation\'s controlled-disclosure section was largely stripped from the FY24 NDAA.',
    origin:
      "Sen. Chuck Schumer and Sen. Mike Rounds — building on Grusch testimony and Senate Intelligence Committee briefings — introduced the UAPDA in summer 2023 with a Review Board, eminent-domain authority over recovered material, and a 25-year declassification clock. Disclosure-side reporting (Marik von Rennenkampff, Christopher Sharp) refers to the implied constellation of programs as \"Zodiac\" code-words. The eminent-domain provisions were stripped in conference; a reduced version of the records-collection mandate became law.\n\nNo NRO program code-named Zodiac has been formally confirmed. The name functions as a community-side placeholder for the implied SAP constellation referenced in legislative briefings.",
    keyEvents: [
      'July 2023: UAPDA introduced.',
      'Dec 2023: FY24 NDAA strips eminent-domain provisions.',
      '2024-2025: Schumer / Rounds publicly state intent to re-introduce.',
    ],
    evidence: [
      'UAPDA legislative text (S.2226 Title XCII).',
      'Schumer Senate floor statements (July-Dec 2023).',
    ],
    skepticalView:
      'No confirmed NRO program code-named Zodiac exists. The label is a community-side placeholder.',
    sources: [
      { label: 'UAPDA legislative text', url: 'https://www.congress.gov/bill/118th-congress/senate-bill/2226' },
    ],
  },
  {
    id: 'uaptf-aaro',
    heroImage: uaptfImg,
    title: 'UAPTF · AOIMSG · AARO',
    subtitle: 'The acknowledged modern public-facing layer',
    category: 'Acknowledged',
    era: '2020-present',
    location: 'Office of the Under Secretary of Defense for Intelligence',
    confidence: 'VERIFIED',
    symbol: '🛡️',
    summary:
      'The chartered, named, congressionally-briefed UAP analysis line: Unidentified Aerial Phenomena Task Force (2020) → Airborne Object Identification and Management Synchronization Group (2021) → All-domain Anomaly Resolution Office (2022). The public face. The benchmark every alleged SAP is measured against.',
    origin:
      "Stood up after the 2020 declassification of the Navy Tic Tac / Gimbal / GoFast videos, the UAPTF produced the June 2021 ODNI Preliminary Assessment — which acknowledged 144 UAP encounters and declined to attribute them. AOIMSG briefly replaced it before AARO was chartered in July 2022 under Sean Kirkpatrick. Jon Kosloski took over as Director in 2024.\n\nAARO publishes the FY24 UAP Annual Report, the Historical Record Report Volume I, and maintains the public reporting channel. Its credibility is contested — disclosure advocates argue it is the wrong body to investigate compartmented SAPs it has no read-in to.",
    keyEvents: [
      'Aug 2020: UAPTF chartered.',
      'June 2021: ODNI Preliminary Assessment.',
      'July 2022: AARO chartered.',
      'Mar 2024: AARO Historical Report Volume I.',
      '2024: Kosloski replaces Kirkpatrick as Director.',
    ],
    evidence: [
      'ODNI Preliminary Assessment (2021).',
      'AARO Historical Record Volume I (2024).',
      'AARO Annual Reports.',
    ],
    skepticalView:
      "AARO\'s own conclusion is that all examined UAP cases trace to mundane explanations or remain unresolved due to data quality. Disclosure-side view: AARO lacks SAP read-in and is structurally incapable of finding what it\'s tasked to find.",
    videos: [
      { id: 'KQ7Dw-739hY', title: 'House Oversight UAP Hearing — November 2024', channel: 'Forbes Breaking News' },
    ],
    sources: [
      { label: 'AARO official site', url: 'https://www.aaro.mil/' },
      { label: 'ODNI Preliminary Assessment (2021)', url: 'https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf' },
    ],
  },
];

export const blackProgramCategories = [
  'All',
  'Retrieval',
  'Umbrella',
  'Acknowledged',
  'Historical',
  'Space',
  'Indoctrination',
];
