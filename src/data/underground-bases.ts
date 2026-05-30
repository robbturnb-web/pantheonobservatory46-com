import type { DossierEntry } from '@/components/dossier/types';
import dulce_baseImg from '@/assets/bases-dulce-base.jpg';
import s4_papooseImg from '@/assets/bases-s4-papoose.jpg';
import mount_weatherImg from '@/assets/bases-mount-weather.jpg';
import cheyenne_mountainImg from '@/assets/bases-cheyenne-mountain.jpg';
import raven_rockImg from '@/assets/bases-raven-rock.jpg';
import pine_gapImg from '@/assets/bases-pine-gap.jpg';
import yamantauImg from '@/assets/bases-yamantau.jpg';
import montaukImg from '@/assets/bases-montauk.jpg';
import sauder_dumbsImg from '@/assets/bases-sauder-dumbs.jpg';

/**
 * Underground Bases — Subterranean schematic
 * From declassified continuity-of-government bunkers (Mount Weather, Cheyenne)
 * to alleged DUMBs in the Sauder canon (Dulce, Yamantau).
 */
export const undergroundBaseEntries: DossierEntry[] = [
  {
    id: 'dulce-base',
    heroImage: dulce_baseImg,
    title: 'Dulce Base',
    subtitle: 'Archuleta Mesa · Northern New Mexico',
    category: 'DUMB',
    era: '1979 — present (alleged)',
    location: 'Dulce, New Mexico (Jicarilla Apache Nation)',
    confidence: 'ALLEGED',
    symbol: '⛏️',
    summary:
      "Most-cited deep underground military base in UFO lore. Phil Schneider's 1995 lectures and the so-called 'Dulce Papers' attributed to Thomas Castello describe a seven-level joint human-Grey facility under Archuleta Mesa, with a 1979 firefight between Delta operators and resident extraterrestrials. No physical evidence has surfaced.",
    origin:
      "The Dulce mythology coalesced through three sources: Paul Bennewitz's 1979 surveillance of strange lights and signals over the mesa (later shown to have been amplified by an Air Force disinformation operation against him, run by Richard Doty), Phil Schneider's 1995-96 lecture circuit alleging he was a structural engineer who survived an underground firefight, and the 'Dulce Papers' purportedly leaked by security officer Thomas Castello before his disappearance.\n\nThe canonical claim: a 7-level facility, with humans operating the upper floors and Greys / hybrid programs on lower floors. Level 6 — 'Nightmare Hall' — allegedly houses biogenetic experiments. The 1979 'Dulce War' supposedly killed 66 Delta operators. None of these claims has produced photographic, geological, or insider documentary corroboration that survives independent review. The terrain is geologically active and FOIA returns on the area are sparse but not anomalous.",
    keyEvents: [
      '1979: Bennewitz begins recording lights / signals near Archuleta Mesa.',
      '1980-84: AFOSI / Doty disinformation campaign feeds Bennewitz fabricated documents.',
      '1991: Castello allegedly leaks 25 photos and security manual ("Dulce Papers").',
      '1995: Phil Schneider lecture tour — describes underground firefight.',
      'January 1996: Schneider found dead in his apartment (ruled suicide; family disputes).',
    ],
    evidence: [
      'Bennewitz audio recordings of unknown VLF signals (held by APRO archive).',
      'Schneider lecture videotapes (multiple venues 1995-96).',
      'Disputed "Dulce Papers" — never authenticated.',
      'Greg Bishop, "Project Beta" (2005) — documents the AFOSI disinfo operation.',
    ],
    skepticalView:
      "Greg Bishop's investigative work establishes that much of the early Bennewitz material was deliberately seeded by USAF counterintelligence to discredit a UFO researcher who was also detecting real classified signals. Schneider's biographical claims (Marine combat record, structural engineering credentials, Delta clearance) have been challenged by veterans' researchers as unverifiable or false. The Dulce Papers have no chain of custody.",
    videos: [
      { id: 'cqAU2YyPMHk', title: 'Phil Schneider — 1995 Lecture (Underground Bases)', channel: 'Archive' },
      { id: '4yNfzEwS-Lw', title: 'The Dulce Base Conspiracy — Investigative Overview', channel: 'Documentary' },
    ],
    sources: [
      { label: 'Greg Bishop — "Project Beta" (2005)', url: 'https://www.simonandschuster.com/books/Project-Beta/Greg-Bishop/9780743470926' },
      { label: 'Bennewitz disinformation file (FOIA, AFOSI)', url: 'https://www.theblackvault.com/documentarchive/paul-bennewitz-fbi-files/' },
    ],
  },
  {
    id: 's4-papoose',
    heroImage: s4_papooseImg,
    title: 'S-4 / Papoose Lake',
    subtitle: 'NTTR · Lazar disclosure site',
    category: 'Black Site',
    era: '1989 — present',
    location: 'Papoose Mountain, Nevada',
    confidence: 'ALLEGED',
    symbol: '🛸',
    summary:
      "Bob Lazar's 1989 KLAS-TV disclosure described a hangar facility 12 miles south of Area 51, embedded into the base of Papoose Mountain, holding nine recovered craft. The 'sport model' he allegedly worked on is the most-described non-human craft in the public record. The facility's existence has never been declassified.",
    origin:
      "In November 1989 Bob Lazar, using the pseudonym 'Dennis', appeared on Las Vegas station KLAS-TV with reporter George Knapp. He described being hired through EG&G in late 1988 to back-engineer the propulsion system of a flying disc at S-4, a facility built into the base of Papoose Mountain about 12 miles south of Groom Lake. He described nine craft in nine adjoining hangars built with sloped doors flush to the mountainside.\n\nLazar described an antigravity reactor fueled by 'Element 115' (then unknown to chemistry, synthesized in 2003 and named Moscovium in 2016). He described W-2 forms, Los Alamos employment, and degrees from MIT and Caltech — all of which mainstream investigators have failed to verify in standard records, though Knapp located a 1982 Los Alamos newsletter listing Lazar. Jeremy Corbell's 2018 documentary 'Bob Lazar: Area 51 & Flying Saucers' presented a fresh round of supporting evidence.",
    keyEvents: [
      'Late 1988: Lazar allegedly hired at S-4.',
      'November 1989: KLAS-TV interview airs.',
      '2003: Element 115 (Moscovium) synthesized at JINR Dubna.',
      '2017: AATIP / Pentagon UAP program disclosure.',
      '2018: Corbell documentary released.',
      '2019: FBI raid on Lazar\'s United Nuclear facility.',
    ],
    evidence: [
      'KLAS-TV original 1989 interview (broadcast tape preserved).',
      'Los Alamos newsletter (June 1982) listing "Bob Lazar, physicist".',
      'W-2 form from "Department of Naval Intelligence" (disputed).',
      'Element 115 / Moscovium synthesis (2003) — corroborates pre-discovery name.',
    ],
    skepticalView:
      "Stanton Friedman's investigations failed to confirm Lazar's MIT and Caltech degrees. Both schools deny attendance. EG&G and Los Alamos give limited / contradictory employment confirmations. Skeptics argue the Moscovium 'prediction' was already a published theoretical island-of-stability candidate by 1969 (Seaborg). The S-4 facility has never been imaged or geologically confirmed.",
    videos: [
      { id: 'BEWz4SXfyCQ', title: 'Bob Lazar — Original 1989 KLAS Interview', channel: 'KLAS / Knapp Archive' },
      { id: 'CvZpkO1mYz8', title: 'Bob Lazar Returns — Corbell Documentary Trailer', channel: 'Jeremy Corbell' },
    ],
    sources: [
      { label: 'George Knapp — Lazar Disclosure (KLAS)', url: 'https://www.mystery-wire.com/bob-lazar/' },
      { label: 'JINR Element 115 synthesis (2003)', url: 'https://www.iupac.org/news/news-detail/article/iupac-announces-the-names-of-the-elements-113-115-117-and-118.html' },
    ],
  },
  {
    id: 'mount-weather',
    heroImage: mount_weatherImg,
    title: 'Mount Weather',
    subtitle: 'Mount Weather Emergency Operations Center · FEMA',
    category: 'Continuity Site',
    era: '1959 — present',
    location: 'Bluemont, Virginia',
    confidence: 'VERIFIED',
    symbol: '🏔️',
    summary:
      "FEMA's hardened underground operations facility on the Virginia-West Virginia border. Originally built as the COG (Continuity of Government) bunker, it would house the federal civilian leadership in event of a nuclear strike. Confirmed to exist; the precise interior layout remains classified.",
    origin:
      "Mount Weather sits 48 miles west of Washington, D.C., in the Blue Ridge Mountains. Construction of the underground facility began in 1954 under the Eisenhower administration and was operational by 1959, originally code-named 'High Point Special Facility'. It was designed as the seat of a 'shadow government' that would assume civilian functions if Washington were destroyed.\n\nThe surface facility is openly acknowledged as FEMA's National Emergency Coordination Center. The underground complex was inadvertently exposed in a 1974 TWA Flight 514 crash investigation, when reporters discovered the wreckage near a heavily-restricted facility. Subsequent FOIA work and James Bamford's reporting established a multi-acre underground complex with sleeping quarters, water reservoir, communications gear, and helipad. It was activated on 9/11 to receive Cabinet officials.",
    keyEvents: [
      '1954-59: Construction under Eisenhower civil defense program.',
      'December 1 1974: TWA Flight 514 crash exposes facility to press.',
      '1979: FEMA created; Mount Weather transferred to FEMA.',
      'September 11 2001: Activated for Cabinet evacuation.',
    ],
    evidence: [
      'FEMA acknowledgment of MWEOC as Continuity of Operations site.',
      'James Bamford, "Mount Weather" reporting (1976).',
      '9/11 Commission Report — references to COG activation.',
      'GAO reports on continuity programs.',
    ],
    skepticalView:
      "Mount Weather is a real, declassified facility — there is no 'mystery' to its existence. Lore claims of nine-level depth and citizen lottery files have never been substantiated. The realistic mission is straightforward COG, and FEMA has progressively unclassified its operational role.",
    videos: [
      { id: 'zUZAR6EoEXI', title: 'Inside Mount Weather — 60 Minutes Archive', channel: 'CBS News' },
    ],
    sources: [
      { label: 'FEMA Mount Weather overview', url: 'https://www.fema.gov/' },
      { label: 'Bamford "Mount Weather" — original 1976 article', url: 'https://www.washingtonpost.com/' },
    ],
  },
  {
    id: 'cheyenne-mountain',
    heroImage: cheyenne_mountainImg,
    title: 'Cheyenne Mountain Complex',
    subtitle: 'NORAD · 2,000 ft of granite',
    category: 'Military',
    era: '1966 — present',
    location: 'Colorado Springs, Colorado',
    confidence: 'VERIFIED',
    symbol: '🛡️',
    summary:
      'The most-photographed underground military facility in the world. NORAD\'s Cheyenne Mountain Complex sits under 2,000 feet of granite, behind 25-ton blast doors, with the entire 5-acre facility mounted on 1,319 steel springs to absorb a near-miss nuclear blast. Now an alternate command center for NORAD/USNORTHCOM.',
    origin:
      "Construction began in 1961 as a hardened command post for North American Aerospace Defense Command (NORAD). The complex is a city of 15 buildings carved into a granite chamber inside Cheyenne Mountain, southwest of Colorado Springs. The 25-ton blast doors are designed to seal in 45 seconds. The interior buildings sit on 1,319 helical steel springs, each rated for 1,000 pounds, allowing the complex to absorb the shock wave from a nuclear detonation as close as one mile.\n\nFrom 1966 to 2008 it served as NORAD's primary command center. In 2006 NORAD relocated daily operations to Peterson AFB and Cheyenne Mountain became an alternate / training site, but it has been periodically reactivated — most notably in 2015 when CYBERCOM concerns about EMP-vulnerable surface facilities led to renewed investment. Public tours have run intermittently.",
    keyEvents: [
      '1961-66: Construction.',
      '1966: NORAD operational at Cheyenne Mountain.',
      '2006: Operations move to Peterson AFB.',
      '2015: $700M renewal investment for EMP-hardened C2.',
    ],
    evidence: [
      'NORAD / USNORTHCOM official tour and fact sheets.',
      'Declassified engineering specifications.',
      'Wide press / documentary coverage (Discovery, BBC, NHK).',
    ],
    skepticalView:
      "Cheyenne is fully acknowledged and no 'hidden levels' have ever been substantiated. The realistic mystery is operational rather than structural — what the C2 capability looks like in 2024.",
    videos: [
      { id: 'l5Y9D7g0v4Y', title: 'Inside Cheyenne Mountain — Smithsonian Channel', channel: 'Smithsonian' },
    ],
    sources: [
      { label: 'NORAD Cheyenne Mountain fact sheet', url: 'https://www.norad.mil/About-NORAD/Cheyenne-Mountain-Air-Force-Station/' },
    ],
  },
  {
    id: 'raven-rock',
    heroImage: raven_rockImg,
    title: 'Raven Rock (Site R)',
    subtitle: 'Underground Pentagon · Continuity of Operations',
    category: 'Continuity Site',
    era: '1953 — present',
    location: 'Adams County, Pennsylvania',
    confidence: 'VERIFIED',
    symbol: '🪖',
    summary:
      "Known internally as 'The Rock' or 'Site R', Raven Rock Mountain Complex is the Department of Defense's underground emergency relocation site — the military counterpart to Mount Weather. Confirmed by DOD, profiled in Garrett Graff's 2017 book 'Raven Rock'. Sleeps thousands; full backup Pentagon command authority.",
    origin:
      "Construction began in 1951 alongside Camp David, originally code-named 'Site R'. The five-acre complex is excavated into Raven Rock Mountain on the Pennsylvania-Maryland border, six miles north of Camp David. Three operational buildings sit inside the mountain, with their own water supply, power generation, hospital, dining halls, and chapel.\n\nThe facility was designed to host the Joint Chiefs of Staff and key DOD leadership during a Soviet first strike. It was kept in 24/7 readiness throughout the Cold War, and was activated on 9/11 — Vice President Cheney was reportedly evacuated through Site R protocols. Garrett Graff's 'Raven Rock' (2017) is the most thorough open-source history; it draws on FOIA, congressional testimony, and former-staff interviews.",
    keyEvents: [
      '1951: Construction begins.',
      '1953: Operational.',
      'September 11 2001: Activated as backup national command center.',
      '2017: Graff publishes "Raven Rock", consolidating open record.',
    ],
    evidence: [
      'DOD acknowledgment of Site R as alternate joint communications center.',
      'Garrett Graff, "Raven Rock: The Story of the U.S. Government\'s Secret Plan to Save Itself" (2017).',
      'Congressional testimony on continuity-of-government programs.',
    ],
    skepticalView:
      "Raven Rock is real, acknowledged, and well-documented. There are no credible claims of non-government activity or extraterrestrial connection — it is a 1950s civil-defense engineering project that remains operational.",
    videos: [
      { id: 'YV1vKZ_p_eQ', title: 'Garrett Graff on Raven Rock — C-SPAN', channel: 'C-SPAN' },
    ],
    sources: [
      { label: 'Garrett Graff — Raven Rock (2017)', url: 'https://www.simonandschuster.com/books/Raven-Rock/Garrett-M-Graff/9781476735429' },
    ],
  },
  {
    id: 'pine-gap',
    heroImage: pine_gapImg,
    title: 'Pine Gap',
    subtitle: 'Joint Defence Facility · US-Australia SIGINT',
    category: 'Black Site',
    era: '1970 — present',
    location: 'Alice Springs, Northern Territory, Australia',
    confidence: 'VERIFIED',
    symbol: '📡',
    summary:
      "The most strategically important US satellite ground station outside the continental United States. Operates as a joint NSA / NRO / Australian Signals Directorate SIGINT facility. The unclassified mission is well-known; long-running claims of underground levels and UFO activity remain unproven.",
    origin:
      "Pine Gap was established in 1966 by treaty between the US and Australian governments and became operational in 1970. Officially called the 'Joint Defence Facility Pine Gap' (JDFPG), it sits 18 km southwest of Alice Springs in the Australian outback. Its primary mission is downlinking signals intelligence from US geosynchronous SIGINT satellites, including the Mentor / Orion family operated by the National Reconnaissance Office.\n\nDeclassified material released through Snowden disclosures (2013-15) and Australian academic Des Ball's 30+ years of research established the SIGINT mission. UFO lore around Pine Gap dates to the 1980s with Bill Cooper and others describing underground levels and joint extraterrestrial programs — none of these claims has surfaced in declassified material. The facility's surface architecture (giant white radomes) is well-photographed; what sits below ground level is officially limited to standard secure data centers.",
    keyEvents: [
      '1966: US-Australia treaty signed.',
      '1970: Operational.',
      '1980s: Cooper / Lear-era UFO claims emerge.',
      '2013-15: Snowden disclosures detail SIGINT mission.',
    ],
    evidence: [
      'Snowden cache (NSA/NRO files referencing Pine Gap).',
      'Des Ball — "Pine Gap" academic monograph series.',
      'Australian Parliamentary records on JDFPG oversight.',
    ],
    skepticalView:
      "The SIGINT mission is the realistic and adequate explanation for Pine Gap's importance. UFO claims rest entirely on pre-Snowden lore and have not surfaced in any of the major intel leaks.",
    videos: [
      { id: 'Mx6L8wTwKjg', title: 'Pine Gap — Australia\'s Top-Secret US Base (Documentary)', channel: 'ABC Australia' },
    ],
    sources: [
      { label: 'Nautilus Institute — Des Ball Pine Gap archive', url: 'https://nautilus.org/' },
      { label: 'The Intercept — Pine Gap files (Snowden)', url: 'https://theintercept.com/2017/08/19/nsa-spy-pine-gap-australia/' },
    ],
  },
  {
    id: 'yamantau',
    heroImage: yamantauImg,
    title: 'Yamantau Mountain',
    subtitle: 'Mezhgorye complex · South Urals',
    category: 'Foreign DUMB',
    era: '1990s construction · purpose undisclosed',
    location: 'Republic of Bashkortostan, Russia',
    confidence: 'REPORTED',
    symbol: '🏔️',
    summary:
      "Massive Russian underground complex inside Mount Yamantau ('Bad Mountain') in the Southern Urals. Subject of a 1996 New York Times exposé and recurring US congressional concern. Russia has never disclosed its purpose; satellite imagery confirms surface construction on a city-sized scale.",
    origin:
      "Construction at Yamantau accelerated in the early 1990s — paradoxically, after the end of the Cold War. The closed cities of Mezhgorye-1 and Mezhgorye-2 were built nearby to house tens of thousands of workers. In April 1996, Michael Gordon of the New York Times broke the story citing US intelligence officials concerned that an enormous excavation continued through the post-Soviet collapse, suggesting a strategic priority that survived regime change.\n\nUS Representative Roscoe Bartlett (R-MD), a longtime Soviet/Russian strategic-systems hawk, repeatedly raised Yamantau in House Armed Services Committee hearings. Speculation includes: a deep nuclear command bunker for Russian leadership (the most likely), a strategic weapons storage complex, a 'dead hand' Perimeter retaliation facility, or a mining/resources operation. Russia has never confirmed any function. Commercial satellite imagery (Maxar / Planet) consistently shows tunnel entrances and substantial surface infrastructure.",
    keyEvents: [
      'Late 1970s: Construction reportedly begins.',
      '1991: Soviet collapse — construction continues uninterrupted.',
      'April 16 1996: NYT publishes Gordon exposé.',
      '2000s: Repeated congressional testimony from Bartlett.',
    ],
    evidence: [
      'New York Times article (Michael Gordon, April 16 1996).',
      'House Armed Services Committee testimony (Bartlett, multiple years).',
      'Commercial satellite imagery (publicly available).',
    ],
    skepticalView:
      "The most parsimonious explanation is a hardened command bunker for Russian senior leadership — strategically rational and consistent with Russian Cold War doctrine. UFO/extraterrestrial claims are absent from the credible record.",
    videos: [
      { id: 'GqGxYJh2Wu0', title: 'Yamantau — Russia\'s Mysterious Underground Complex', channel: 'Mark Felton Productions' },
    ],
    sources: [
      { label: 'Michael Gordon — NYT 1996', url: 'https://www.nytimes.com/1996/04/16/world/despite-cold-war-s-end-russian-atomic-arsenal-is-growing.html' },
    ],
  },
  {
    id: 'montauk',
    heroImage: montaukImg,
    title: 'Camp Hero / Montauk',
    subtitle: 'Decommissioned AFS · Long Island',
    category: 'Black Site',
    era: '1942 — 1981 (decommissioned) · claims continue',
    location: 'Montauk Point, New York',
    confidence: 'DEBATED',
    symbol: '⚡',
    summary:
      "Decommissioned Air Force radar station turned New York state park. The 'Montauk Project' lore — Preston Nichols's 1992 book series alleging time-travel, mind-control, and Philadelphia Experiment continuation programs — sits on top of a real, mostly-declassified Cold War facility. Inspired Stranger Things.",
    origin:
      "Camp Hero was activated in 1942 as a coastal artillery installation defending New York Harbor. After WWII it was transferred to the Air Force as Montauk Air Force Station, hosting an AN/FPS-35 long-range search radar — a giant rotating SAGE-network antenna that still stands. The site was decommissioned in 1981 and most of it is now Camp Hero State Park.\n\nThe paranormal mythology was launched by Preston Nichols in 'The Montauk Project: Experiments in Time' (1992), co-written with Peter Moon. Nichols, an electrical engineer, claimed he had recovered memories of working on consciousness-altering experiments, time-travel chairs, and the continuation of the Philadelphia Experiment under Camp Hero. The series expanded across multiple sequels. The Duffer Brothers explicitly cited the Montauk lore as the original working title and inspiration for 'Stranger Things'.",
    keyEvents: [
      '1942: Camp Hero activated.',
      '1957: AN/FPS-35 radar operational.',
      '1981: Decommissioned.',
      '1992: Nichols publishes "The Montauk Project".',
      '2016: Stranger Things premieres.',
    ],
    evidence: [
      'Camp Hero State Park (real, walkable, photographed).',
      'AN/FPS-35 radar tower (still standing).',
      'Nichols book series (claims, not evidence).',
    ],
    skepticalView:
      "There is a real Cold War radar facility here. There is zero corroborating documentary, photographic, or witness evidence for the Nichols claims, which rely entirely on his recovered memories and have been thoroughly examined by skeptics including Brian Dunning. The cultural footprint vastly exceeds the evidentiary basis.",
    videos: [
      { id: 'eEvf4mn2WqA', title: 'Inside Camp Hero — The Real Montauk Site', channel: 'Bright Insight' },
    ],
    sources: [
      { label: 'NY State Parks — Camp Hero', url: 'https://parks.ny.gov/parks/97/' },
      { label: 'Skeptoid — Montauk Project', url: 'https://skeptoid.com/episodes/4445' },
    ],
  },
  {
    id: 'sauder-dumbs',
    heroImage: sauder_dumbsImg,
    title: 'DUMBs Network',
    subtitle: 'Richard Sauder · Academic survey',
    category: 'Research',
    era: '1995 — present',
    location: 'United States (mapped network)',
    confidence: 'REPORTED',
    symbol: '📚',
    summary:
      "Dr. Richard Sauder's published research catalogs 'Deep Underground Military Bases' (DUMBs) using only public, FOIA-released, and engineering-journal sources. His maps and tunnel-boring-machine inventories form the most academically defensible case that a network of large underground facilities exists beyond the publicly acknowledged ones.",
    origin:
      "Sauder holds a PhD in political science (University of Toronto) and originally researched government use of mind-control technologies. His 1995 book 'Underground Bases and Tunnels: What is the Government Trying to Hide?' compiled hundreds of declassified, unclassified, and engineering-trade-press references to underground construction projects — many on military reservations, many far larger than their publicly stated mission required.\n\nSauder's 2001 follow-up 'Underwater and Underground Bases' added marine work. His method is conservative: he excludes anonymous-source claims and works only from documents that can be re-pulled. His thesis is that the cumulative tunnel-boring capacity demonstrated in the public record (Robbins TBMs, NMSU mining-engineering studies, Department of Energy waste-isolation work) implies a substantial subterranean footprint that the government has not catalogued in any single public document.",
    keyEvents: [
      '1995: "Underground Bases and Tunnels" published.',
      '2001: "Underwater and Underground Bases" published.',
      '2010s: Sauder consults for Coast to Coast AM and academic conferences.',
    ],
    evidence: [
      'Robbins Co. TBM project records (public, industry-press).',
      'DOE Waste Isolation Pilot Plant (WIPP) engineering reports.',
      'NMSU mining engineering archives.',
      'FOIA returns Sauder reproduces in book appendices.',
    ],
    skepticalView:
      "Sauder's individual citations are largely real and verifiable. The contested step is the inference — that the aggregate tunnel-boring activity implies a hidden coordinated network. Skeptics argue most projects are mundane (Continuity-of-Government, mining, waste isolation, civil infrastructure) and the connective conspiracy is unproven.",
    videos: [
      { id: 'lNqhHpMhSGE', title: 'Richard Sauder on DUMBs — Open Minds Interview', channel: 'Open Minds' },
    ],
    sources: [
      { label: 'Adventures Unlimited — Sauder author page', url: 'https://www.adventuresunlimitedpress.com/' },
      { label: 'DOE WIPP project documentation', url: 'https://www.wipp.energy.gov/' },
    ],
  },
];

export const undergroundBaseCategories = ['All', 'DUMB', 'Black Site', 'Continuity Site', 'Military', 'Foreign DUMB', 'Research'];
