import type { DossierEntry } from '@/components/dossier/types';
import roswell_1947Img from '@/assets/crash-roswell-1947.jpg';
import aztec_1948Img from '@/assets/crash-aztec-1948.jpg';
import kingman_1953Img from '@/assets/crash-kingman-1953.jpg';
import kecksburg_1965Img from '@/assets/crash-kecksburg-1965.jpg';
import varginha_1996Img from '@/assets/crash-varginha-1996.jpg';
import lazar_s4Img from '@/assets/crash-lazar-s4.jpg';
import grusch_2023Img from '@/assets/crash-grusch-2023.jpg';
import trinity_1945Img from '@/assets/crash-trinity-1945.jpg';
import wilson_davis_memoImg from '@/assets/crash-wilson-davis-memo.jpg';

/**
 * Crash Retrieval — Black-program recovery vault
 * Chronological catalog of alleged non-human craft retrievals,
 * the programs that allegedly handled them, and the whistleblower
 * record that has built around them.
 */
export const crashRetrievalEntries: DossierEntry[] = [
  {
    id: 'roswell-1947',
    heroImage: roswell_1947Img,
    title: 'Roswell',
    subtitle: 'Foster Ranch · July 1947',
    category: 'Crash',
    era: 'July 1947',
    location: 'Lincoln County, New Mexico',
    confidence: 'DEBATED',
    symbol: '🛸',
    summary:
      'The founding case of modern UFO crash-retrieval lore. The Army Air Force first announced a "flying disc" recovered from the Foster Ranch, then retracted within 24 hours and called it a weather balloon. Decades of declassification, Mogul-balloon revisions, and witness deathbed statements have kept the case unresolved.',
    origin:
      'On July 8, 1947, Roswell Army Air Field issued a press release stating the 509th Bomb Group — the only nuclear-armed unit in the world — had recovered a "flying disc" from a ranch outside Roswell. Within hours, Brigadier General Roger Ramey held a press conference in Fort Worth declaring the debris a weather balloon. The story died for thirty years.\n\nIt was resurrected in 1978 when nuclear physicist Stanton Friedman interviewed Major Jesse Marcel, the intelligence officer who personally handled the debris. Marcel insisted what he recovered was "not of this earth." A 1994 GAO report and a 1997 Air Force follow-up concluded the debris was Project Mogul (a classified high-altitude balloon array for detecting Soviet nuclear tests) and that "alien body" sightings were misremembered crash-test dummy drops. Witness testimony — including from Walter Haut, the original press officer — continues to contradict the official explanation.',
    keyEvents: [
      'July 4 1947: Foster Ranch debris field allegedly created.',
      'July 8 1947: RAAF press release — "flying disc" recovered.',
      'July 9 1947: Ramey press conference walks it back to a weather balloon.',
      '1978: Friedman / Marcel interview reignites the case.',
      '1994: GAO report — Project Mogul explanation released.',
      '2002 / 2007: Walter Haut affidavit (released posthumously) describes seeing bodies and craft.',
    ],
    evidence: [
      'Original RAAF press release (July 8 1947) preserved in 509th BG archives.',
      'Jesse Marcel testimony (1978-1986) — multiple recorded interviews.',
      'Walter Haut sworn affidavit (2002, released after his 2005 death).',
      'GAO/OSI-95-187 — "Government Records Concerning the Roswell, New Mexico, Crash" (July 1995).',
      'USAF "Roswell Report: Case Closed" (1997).',
    ],
    skepticalView:
      'The official Air Force position is that the debris was a Project Mogul balloon train (Flight 4) and that "alien body" memories conflated 1953-59 high-altitude anthropomorphic dummy drops with the 1947 event. Skeptics including Joe Nickell and Karl Pflock argue the deathbed testimony is unreliable and the physical evidence chain is broken.',
    videos: [
      { id: 'RCAHyclAmZs', title: "Roswell's First Witness Testimonial — History's Greatest Mysteries", channel: 'HISTORY' },
      { id: '7P8aK0O1-P8', title: 'Full UAP Hearing — Grusch, Fravor, Graves (07/26/2023)', channel: 'UAP Coalition' },
    ],
    sources: [
      { label: 'GAO/OSI-95-187 — Roswell Records (1995)', url: 'https://www.gao.gov/products/osi-95-187' },
      { label: 'USAF "Roswell Report: Case Closed" (1997)', url: 'https://media.defense.gov/2010/Oct/27/2001329884/-1/-1/0/AFD-101027-030.pdf' },
      { label: 'Walter Haut Affidavit (2002)', url: 'https://www.roswellproof.com/Haut_affidavit_2002.html' },
    ],
  },
  {
    id: 'aztec-1948',
    heroImage: aztec_1948Img,
    title: 'Aztec',
    subtitle: 'Hart Canyon · March 1948',
    category: 'Crash',
    era: 'March 25 1948',
    location: 'Aztec, New Mexico',
    confidence: 'ALLEGED',
    symbol: '🏜️',
    summary:
      'A 99.99-foot disc allegedly recovered intact from a New Mexico mesa, with 16 small humanoid bodies retrieved. Long dismissed as a Frank Scully-era hoax, it was re-investigated in the 1980s by researcher William Steinman and again by Scott and Suzanne Ramsey, who claim newly surfaced witnesses and FBI records support a real recovery.',
    origin:
      'The Aztec story was first published in Frank Scully\'s 1950 book "Behind the Flying Saucers", citing oilman Silas Newton and "Dr. Gee" (Leo GeBauer) as sources. By 1952, True magazine\'s J.P. Cahn exposed Newton and GeBauer as con men running a doodlebug oil-detection scam, and the case was relegated to hoax status for decades.\n\nIn 1986, William Steinman published "UFO Crash at Aztec" arguing primary witnesses had been ignored. Beginning in 1987, Scott Ramsey conducted a 25-year re-investigation, publishing "The Aztec UFO Incident" (2012). Ramsey claims to have located corroborating witnesses and an FBI memo (Guy Hottel memo, March 22 1950) describing three flying saucers recovered in New Mexico — though the FBI itself notes the memo is hearsay and contains no direct evidence.',
    keyEvents: [
      'March 25 1948: Alleged crash on Hart Canyon mesa.',
      '1949: Newton and "Dr. Gee" begin lecture circuit.',
      '1950: Scully publishes "Behind the Flying Saucers".',
      '1952: True magazine exposé brands case a hoax.',
      '1986: Steinman re-investigation.',
      '2012: Ramsey "The Aztec UFO Incident" published.',
    ],
    evidence: [
      'Guy Hottel FBI memo (March 22 1950) — describes three recovered saucers in NM, declassified by FBI Vault.',
      'Ramsey witness affidavits (1990s-2000s).',
      'Newton/GeBauer trial records (1953) — used by both sides.',
    ],
    skepticalView:
      'The original 1948-1952 case was demonstrably built by con men selling fake oil-detection devices, and the Hottel memo is FBI-acknowledged hearsay with no investigative weight. Ramsey\'s reopened case relies on late-life witness recollections that mainstream historians consider tainted by 60+ years of cultural narrative.',
    videos: [
      { id: 'QJxbyu-9Tj0', title: 'The 1948 Aztec, New Mexico UFO Crash Retrieval', channel: 'UAP Gerb' },
    ],
    sources: [
      { label: 'FBI Vault — Guy Hottel Memo', url: 'https://vault.fbi.gov/hottel_guy/Guy%20Hottel%20Part%201%20of%201/view' },
      { label: 'Scott Ramsey — The Aztec UFO Incident (2012)' },
      { label: 'J.P. Cahn — True Magazine, "The Flying Saucers and the Mysterious Little Men" (1952)' },
    ],
  },
  {
    id: 'kingman-1953',
    heroImage: kingman_1953Img,
    title: 'Kingman',
    subtitle: 'Arizona desert · May 1953',
    category: 'Crash',
    era: 'May 21 1953',
    location: 'Kingman, Arizona',
    confidence: 'ALLEGED',
    symbol: '🌵',
    summary:
      'An engineer named Arthur Stansel claimed under oath he was flown by C-54 to a remote site outside Kingman to inspect a 30-foot oval craft that had impacted soft sand at high speed. He described a single occupant — a four-foot humanoid in silver clothing — already dead inside.',
    origin:
      'The case surfaced publicly in 1973 via researcher Raymond Fowler, who interviewed an aerospace engineer he initially identified only as "Fritz Werner". Werner was later confirmed as Arthur G. Stansel, a USAF civilian engineer who signed an affidavit in 1973 stating he was one of approximately 15 specialists summoned to Indian Springs AFB and then bussed (windows blacked) to a desert site outside Kingman.\n\nStansel\'s sworn account: a 30-foot oval metallic craft, embedded ~20 inches into the sand, with no visible damage other than a hatch sprung open on impact. Inside was one occupant — humanoid, ~4 feet tall, dark-skinned, wearing a silver one-piece. The body was removed under separate guard. Stansel never recanted. A second alleged witness ("Major Daly") came forward in 1989 to corroborate the recovery.',
    keyEvents: [
      'May 20-21 1953: Alleged retrieval near Kingman, AZ.',
      '1971: Stansel first relates account privately to Fowler.',
      'June 7 1973: Stansel signs sworn affidavit.',
      '1989: Second witness "Major Daly" corroborates separately.',
    ],
    evidence: [
      'Stansel notarized affidavit (June 7 1973) — held in MUFON case files.',
      'Raymond Fowler — "Casebook of a UFO Investigator" (1981).',
      '"Major Daly" interview — Don Schmitt, 1989.',
    ],
    skepticalView:
      'No corroborating service records have been declassified placing Stansel at Indian Springs on the date claimed. Skeptics point out his affidavit is single-source and that some technical details (operational radius of the C-54 from the alleged staging field) are weak. No physical evidence has surfaced.',
    videos: [
      { id: '41V4Pf_8oo4', title: 'The 1953 Kingman, Arizona UFO Crash', channel: 'UAP Gerb' },
    ],
    sources: [
      { label: 'Raymond Fowler — Casebook of a UFO Investigator (1981)' },
      { label: 'MUFON Case File: Kingman 1953' },
    ],
  },
  {
    id: 'kecksburg-1965',
    heroImage: kecksburg_1965Img,
    title: 'Kecksburg',
    subtitle: 'Pennsylvania woods · December 1965',
    category: 'Crash',
    era: 'December 9 1965',
    location: 'Kecksburg, Pennsylvania',
    confidence: 'REPORTED',
    symbol: '🔔',
    summary:
      'A bell- or acorn-shaped object with hieroglyphic-like markings allegedly impacted in woods outside Kecksburg, PA. The Army cordoned the area, and witnesses describe a flatbed truck leaving with an object under tarp. The official explanation — meteorite or Soviet Kosmos 96 debris — has been actively contested, including by NASA in court.',
    origin:
      'On the evening of December 9 1965, a fireball was tracked across six U.S. states and Ontario. Witnesses outside Kecksburg, PA, reported a slowly-descending object that landed in the woods. State police and Army arrived within hours. Multiple residents — including volunteer fire chief James Mayes and reporter John Murphy — described seeing a 9-foot bronze acorn-shaped object with bands of hieroglyphic markings around its base before the area was sealed.\n\nIn 2003, journalist Leslie Kean filed a FOIA lawsuit against NASA seeking records related to the event. In 2007, NASA admitted in court it had lost the box of relevant records. The Air Force official explanation cycles between meteorite, Soviet Kosmos 96 spacecraft re-entry, and "no recovery occurred" — though Kosmos 96 is documented to have re-entered 13 hours earlier over Canada.',
    keyEvents: [
      'Dec 9 1965, ~4:47 PM EST: Fireball over six states.',
      '~6:30 PM: Object reportedly grounds in Kecksburg woods.',
      'Evening: Army cordons area; flatbed truck departs under tarp.',
      '2003: Leslie Kean / Sci-Fi Channel FOIA suit filed.',
      '2007: NASA acknowledges in federal court its box of records is missing.',
    ],
    evidence: [
      'Kean v. NASA (D.D.C. Civil Action No. 03-1907) — court filings public.',
      'WHJB radio reporter John Murphy original tape (later partially erased under pressure).',
      'Multi-witness drawings of the bell/acorn shape collected 1965-2005.',
    ],
    skepticalView:
      'Sky & Telescope and meteoriticist James Oberg argue the fireball was a single bright bolide that broke up over Canada, with no surviving impact body in PA. The "object" recovered is attributed to misidentification (a fallen tree, a tarp, or a separate maintenance operation) and witness conflation 30+ years later.',
    videos: [
      { id: 'HX_RrO7ZQaU', title: "America's Other Roswell: the Kecksburg UFO — HISTORY", channel: 'HISTORY' },
    ],
    sources: [
      { label: 'Coalition for Freedom of Information — Kean v. NASA filings', url: 'https://www.freedomofinforg.org/' },
      { label: 'Leslie Kean — UFOs: Generals, Pilots, and Government Officials Go on the Record (2010)' },
    ],
  },
  {
    id: 'varginha-1996',
    heroImage: varginha_1996Img,
    title: 'Varginha',
    subtitle: 'Brazilian highlands · January 1996',
    category: 'Encounter + Recovery',
    era: 'January 20 1996',
    location: 'Varginha, Minas Gerais, Brazil',
    confidence: 'REPORTED',
    symbol: '🇧🇷',
    summary:
      "Three young women allege they encountered a tripod-legged, brown, big-eyed entity hiding behind a brick wall in broad daylight. Brazilian military mobilized within hours, and a soldier — Marco Eli Cherese — died of an unexplained infection 41 days later. The Brazilian Air Force has formally acknowledged a UAP event but disputes details.",
    origin:
      "On the morning of January 20 1996, Liliane Silva, Valquíria Silva, and Kátia Xavier — ages 14, 16, and 22 — encountered an entity crouched behind a brick wall on Suécia Street in Varginha. They described it as a brown, oily-skinned humanoid roughly 1.6m tall with three protrusions on its head, large red eyes, and visible tremors as if injured.\n\nThe local fire brigade and Army's 3rd Cavalry Regiment Group of Three Rivers were observed cordoning sites and recovering at least two such entities. Soldier Marco Eli Cherese (Cabo Cherese), allegedly part of the recovery, was hospitalized with severe pneumonia and died on February 15 1996. Family says he had handled an entity. UFO researcher Ubirajara Franco Rodrigues and Vitório Pacaccini documented dozens of corroborating military and medical witnesses. In 2010, the Brazilian Air Force formally acknowledged unexplained activity in the area.",
    keyEvents: [
      'Jan 13 1996: ESPACE early-warning radar in Albrook AFB, Panama, allegedly tracks object descending toward Brazil.',
      'Jan 20 1996, ~3:30 PM: Three witnesses encounter entity on Suécia Street.',
      'Jan 20 1996, evening: Army cordons area, transports entities to Hospital Regional do Sul de Minas.',
      'Jan 22 1996: Entities allegedly transferred to UNICAMP for autopsy.',
      'Feb 15 1996: Cabo Marco Eli Cherese dies.',
      '2010: Brazilian Air Force confirms event in official statement.',
    ],
    evidence: [
      'Three eyewitness sworn statements (Civil Police of Minas Gerais).',
      'Hospital Regional do Sul de Minas internal records (partial release).',
      'Dr. Roger Leir / Pacaccini interviews of military personnel.',
      'Brazilian Air Force letter (acknowledgment, 2010).',
    ],
    skepticalView:
      'Skeptics argue the entity descriptions are consistent with a homeless intellectually disabled man known locally as "Mudinho" — an alternative theory promoted by some Brazilian journalists. The military mobilization is acknowledged to have happened but is attributed to a separate hot-air balloon retrieval. Cherese\'s death is officially recorded as bacterial pneumonia of natural origin.',
    videos: [
      { id: 'fjTivanFdx0', title: '1996 Varginha UFO — Mile Higher', channel: 'Mile Higher' },
    ],
    sources: [
      { label: 'Brazilian Air Force — Public letter on Varginha event (2010)' },
      { label: 'Pacaccini & Rodrigues — Incidente em Varginha (1996)' },
    ],
  },
  {
    id: 'lazar-s4',
    heroImage: lazar_s4Img,
    title: 'Bob Lazar & S-4',
    subtitle: 'Papoose Lake · 1988-1989',
    category: 'Reverse-Engineering',
    era: '1988-1989',
    location: 'S-4 facility, Papoose Lake, Nevada',
    confidence: 'DEBATED',
    symbol: '🛰️',
    summary:
      'Physicist Bob Lazar publicly claimed in 1989 he had been hired to back-engineer the propulsion system of one of nine non-human craft kept at S-4 — a facility 15 miles south of Area 51\'s Groom Lake. Centerpiece of his claim: a stable isotope of Element 115 used as antimatter-reactor fuel for a gravity-amplifier drive.',
    origin:
      'In November 1989, Bob Lazar appeared on KLAS-TV Las Vegas with reporter George Knapp, identified initially as "Dennis" then publicly. He stated he had been employed at S-4 (a complex inside the Nevada Test and Training Range near Papoose Lake) starting late 1988, working in a hangar housing nine recovered craft. His specific job was to reverse-engineer a sport-model disc, with focus on its reactor: a baseball-sized sphere fueled by Element 115 (Moscovium), bombarded with protons to produce antimatter that annihilated against gaseous matter to power a gravity-A-wave amplifier.\n\nLazar\'s educational and employment claims have been actively contested. Both MIT and Caltech have no record of his attendance; he says LANL purged his employment file. A 1990 LANL phone directory and a Los Alamos newspaper article identify a "Robert Lazar" as a physicist there, partially supporting his claim. Element 115 was indeed first synthesized at JINR Dubna in 2003 — 14 years after his prediction — though only in milliseconds-half-life isotopes, not the stable form he described.',
    keyEvents: [
      'Nov 1989: Lazar appears on KLAS-TV with George Knapp.',
      '1990: First public Element 115 claim (pre-discovery by 14 years).',
      '2003: IUPAC confirms first synthesis of Element 115.',
      '2018: Jeremy Corbell documentary "Bob Lazar: Area 51 & Flying Saucers" released.',
      '2019: FBI raids Lazar\'s United Nuclear scientific supply business — never publicly explained.',
    ],
    evidence: [
      'KLAS-TV original broadcast tapes (Nov 1989) — preserved.',
      'Los Alamos Monitor 1982 article identifying "physicist" Lazar at LANL.',
      '1990 LANL internal phone directory — partial Lazar listing.',
      'Element 115 synthesis prediction (1989) vs IUPAC confirmation (2003).',
    ],
    skepticalView:
      'Major institutional records contradicting his MIT/Caltech credentials are documented; physicist Stanton Friedman attempted to verify and concluded the educational claims are false. Mainstream physics holds that Element 115 isotopes have half-lives of milliseconds and no known route to stability that would permit machining a "wedge" of fuel. Lazar\'s defenders counter that the stable isotope (Mc-299) is theorized in the "Island of Stability" and was never claimed to be synthesizable on Earth.',
    videos: [
      { id: 'BEWz4SXfyCQ', title: 'Joe Rogan Experience #1315 — Bob Lazar & Jeremy Corbell', channel: 'PowerfulJRE' },
      { id: 'HcQnbRasYxI', title: 'A New Chapter In The Bob Lazar Saga — Reimagining S4', channel: 'Jeremy Corbell' },
    ],
    sources: [
      { label: 'KLAS-TV / George Knapp — Original Lazar broadcasts (1989)' },
      { label: 'Jeremy Corbell — "Bob Lazar: Area 51 & Flying Saucers" (2018)' },
      { label: 'IUPAC — Discovery of element 115', url: 'https://iupac.org/elements/' },
    ],
  },
  {
    id: 'grusch-2023',
    heroImage: grusch_2023Img,
    title: 'David Grusch Disclosure',
    subtitle: 'Congressional UAP testimony · 2023',
    category: 'Whistleblower',
    era: 'June-July 2023',
    location: 'Washington D.C.',
    confidence: 'REPORTED',
    symbol: '🏛️',
    summary:
      'Former NRO/NGA intelligence officer and Air Force Major David Grusch publicly alleges the U.S. has run a multi-decade program to recover and reverse-engineer non-human craft, including "biologics" of non-human pilots. Filed an Inspector General complaint deemed "credible and urgent". Testified under oath before Congress July 26 2023.',
    origin:
      'On June 5 2023, journalists Leslie Kean and Ralph Blumenthal published an exclusive in The Debrief: a 36-year-old former intelligence officer, David Charles Grusch, was alleging that the U.S. had run an illegal Unacknowledged Special Access Program (USAP) to retrieve and exploit non-human craft for decades, and that adversary nations (Russia, China) had recovered material as well.\n\nGrusch had served on the National Geospatial-Intelligence Agency\'s UAP Task Force and as the NGA\'s representative to the UAP Task Force at the Pentagon. He filed a formal Intelligence Community Inspector General (ICIG) whistleblower complaint, which the ICIG ruled "credible and urgent" — a legal threshold required to forward the complaint to congressional intelligence committees. On July 26 2023, Grusch testified under oath before the House Oversight Subcommittee on National Security, joined by retired Navy commander David Fravor (Nimitz Tic-Tac) and former Navy pilot Ryan Graves.',
    keyEvents: [
      'May 2022: Grusch files ICIG whistleblower complaint.',
      'July 2022: ICIG rules complaint "credible and urgent".',
      'June 5 2023: The Debrief publishes Kean/Blumenthal interview.',
      'July 26 2023: Sworn testimony, House Oversight subcommittee.',
      'Dec 2023: Schumer-Rounds UAP Disclosure Act partially passed in NDAA.',
      '2024: AARO Historical Report Vol. 1 disputes Grusch\'s claims; Grusch maintains his testimony.',
    ],
    evidence: [
      'ICIG "credible and urgent" determination — public record.',
      'July 26 2023 House Oversight transcript and video — congressional record.',
      'Schumer-Rounds UAP Disclosure Act text — entered into 2024 NDAA, mostly stripped in conference.',
    ],
    skepticalView:
      'AARO\'s "Report on the Historical Record of U.S. Government Involvement with UAP, Volume 1" (March 2024) found "no verifiable evidence" supporting Grusch\'s reverse-engineering claims. AARO interviewed 30+ people Grusch named or implied; none corroborated. Grusch and his attorney respond that AARO never granted him the secure interview environment required to cite specific programs.',
    videos: [
      { id: 'mXEsKfqZJhY', title: "UFO whistleblower David Grusch's UAP claims sparked hearings", channel: 'NewsNation' },
      { id: 'slLm4WhYhq0', title: "David Grusch Claims Government Found 'Nonhuman Biologics' On Crashed UFOs", channel: 'Newsweek' },
      { id: '7P8aK0O1-P8', title: 'Full UAP Hearing — Grusch, Fravor, Graves (07/26/2023)', channel: 'UAP Coalition' },
    ],
    sources: [
      { label: 'House Oversight UAP Hearing — Official record (July 26 2023)', url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/' },
      { label: 'AARO Historical Record Vol. 1 (March 2024)', url: 'https://www.aaro.mil/Portals/136/PDFs/HRRV1-08-Mar-2024_Final.pdf' },
      { label: 'The Debrief — Original Kean/Blumenthal article (June 5 2023)', url: 'https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-craft-of-non-human-origin/' },
    ],
  },
  {
    id: 'trinity-1945',
    heroImage: trinity_1945Img,
    title: 'Trinity / San Antonio',
    subtitle: 'New Mexico · August 1945',
    category: 'Crash',
    era: 'August 16 1945',
    location: 'San Antonio, New Mexico',
    confidence: 'ALLEGED',
    symbol: '☢️',
    summary:
      'Pre-Roswell. Two boys, Jose Padilla (then 9) and Reme Baca (then 7), allege they witnessed an avocado-shaped craft crash on Padilla family ranch one month after the Trinity nuclear test. Investigated decades later by Jacques Vallée and Paola Harris in their 2021 book "Trinity: The Best-Kept Secret".',
    origin:
      'On August 16 1945 — exactly one month after the Trinity atomic test 20 miles to the east — Jose Padilla and his cousin Reme Baca were riding horseback on the family\'s San Antonio, NM ranch when they say they saw a fireball strike the ground in a small canyon. They approached the next day and found an avocado-shaped craft, perhaps 30 feet long, with three small humanoid occupants visible inside. Over subsequent visits, they say they removed a thin metallic strip from the wreck. Military arrived within days and removed the craft on a flatbed.\n\nThe case lay dormant for sixty-five years until UFO researcher Paola Harris located Padilla in 2010 and brought astrophysicist Jacques Vallée — co-founder of the Center for UFO Studies — into the investigation. Vallée and Harris published "Trinity: The Best-Kept Secret" in 2021, including soil-sample analyses and metallic-strip composition reports. The case is unique in pre-dating Roswell by two years and being directly adjacent in time and space to the Manhattan Project.',
    keyEvents: [
      'July 16 1945: Trinity nuclear test detonated.',
      'Aug 16 1945: Alleged craft crash on Padilla ranch.',
      'Aug 1945: Multiple visits to wreck site by witnesses.',
      '2010: Paola Harris locates Padilla.',
      '2021: Vallée & Harris publish "Trinity: The Best-Kept Secret".',
    ],
    evidence: [
      'Padilla/Baca testimony — recorded interviews, sworn statements.',
      'Soil-sample analyses (Vallée 2019-2021) — anomalous element ratios.',
      'Metal strip — held by Padilla, partial composition published in book.',
    ],
    skepticalView:
      'Witness recollections are 65+ years removed from the alleged event. No corroborating military records have surfaced, though Vallée argues a 1945 USAAF document about a "search for downed equipment" near San Antonio is suggestive. Mainstream researchers note the crash conveniently follows Trinity — a pattern fitting the broader "ETs surveilled the bomb" narrative — and remain skeptical without physical artifact verification by independent labs.',
    videos: [
      { id: 'JegosOOZVKc', title: 'Jacques Vallee and Paola Harris — The Forgotten Trinity UFO Crash of 1945', channel: 'Whitley Strieber' },
    ],
    sources: [
      { label: 'Vallée & Harris — Trinity: The Best-Kept Secret (2021)' },
      { label: 'Paola Harris — paolaharris.com', url: 'https://paolaharris.com/' },
    ],
  },
  {
    id: 'wilson-davis-memo',
    heroImage: wilson_davis_memoImg,
    title: 'Wilson-Davis Memo',
    subtitle: 'Reverse-engineering paper trail · 2002',
    category: 'Document',
    era: 'October 2002',
    location: 'Las Vegas, Nevada',
    confidence: 'REPORTED',
    symbol: '📄',
    summary:
      'A 15-page memo allegedly authored by astrophysicist Dr. Eric Davis documenting an October 16 2002 meeting with retired Vice Admiral Thomas R. Wilson, then Director of the Defense Intelligence Agency. In the memo, Wilson confirms a private aerospace contractor was running a "crash-retrieval and reverse-engineering" program he was denied access to despite his rank.',
    origin:
      'The memo was leaked in 2019 to UFO researcher Steven Greer, then independently to journalist Ross Coulthart. It records a meeting at Davis\'s Las Vegas home in October 2002, during which Wilson allegedly recounted his 1997 attempt — as Vice Director of the Joint Staff for Intelligence — to access a Special Access Program inside an aerospace defense contractor. According to the memo, Wilson confirmed the program existed, was working on recovered "vehicle not made by us / not made by them [adversaries]" material, and that he was denied "need to know" access despite his rank — and was subsequently warned to drop the inquiry.\n\nWilson has denied the meeting occurred. Davis has neither confirmed nor denied authorship publicly. However, Davis was at the time under contract to BAASS / AAWSAP — the Robert Bigelow program working with DIA on UAP — and the memo\'s metadata, terminology, and writing style are consistent with his other published work.',
    keyEvents: [
      '1997: Wilson allegedly attempts to access SAP at named aerospace contractor.',
      'Oct 16 2002: Davis-Wilson meeting (per memo).',
      '2019: Memo leaked publicly via Greer.',
      '2020: Coulthart investigates and publishes corroborating reporting.',
      '2023: Memo cited in Grusch testimony briefings.',
    ],
    evidence: [
      'Full 15-page memo PDF (publicly circulated since 2019).',
      'Eric Davis confirmed contractor relationship to AAWSAP / BAASS via DIA documents.',
      'Wilson named in connection to UAP oversight in subsequent IG complaints.',
    ],
    skepticalView:
      'Wilson categorically denies the meeting and the memo\'s contents. Without contemporaneous corroboration outside the memo itself, mainstream press has treated it as unverified. Davis\'s silence neither confirms nor refutes; the memo\'s evidentiary weight depends entirely on its provenance, which remains contested.',
    videos: [
      { id: 'w4NCU6fUn7E', title: 'The Entire Eric Davis + Admiral Wilson UFO MEMO Read Aloud', channel: 'VETTED' },
      { id: 'VuCPbavls0U', title: 'Ross Coulthart reveals the night that convinced him to investigate UFOs', channel: 'NewsNation' },
    ],
    sources: [
      { label: 'Wilson-Davis Memo (full PDF) — archived by The Black Vault', url: 'https://www.theblackvault.com/documentarchive/the-admiral-wilson-leak-document-files/' },
      { label: 'Ross Coulthart — In Plain Sight (2021)' },
    ],
  },
];

export const crashRetrievalCategories = [
  'Crash',
  'Encounter + Recovery',
  'Reverse-Engineering',
  'Whistleblower',
  'Document',
];
