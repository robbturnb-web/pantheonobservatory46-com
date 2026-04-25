import type { DossierEntry } from '@/components/dossier/types';

/**
 * Galactic Federation — Council records, treaty hall dossiers.
 * Information-rich entries on every major "federation/council" claim
 * in the disclosure literature: historical contactee material, alleged
 * treaties, named councils, recurring delegations, and the principal
 * whistleblower / insider sources who described them.
 *
 * Tone: embassy archive — neutral cataloging, not advocacy.
 */
export const federationEntries: DossierEntry[] = [
  {
    id: 'galactic-federation-of-light',
    title: 'Galactic Federation of Light',
    subtitle: 'New Age channelings · 1950s – present',
    category: 'Council',
    era: '1952 – present',
    location: 'Channelled / contactee literature',
    confidence: 'ALLEGED',
    symbol: '✦',
    summary:
      'The most widely cited "federation" in modern UFO lore — a benevolent confederation of human and humanoid civilizations from Pleiades, Sirius, Andromeda, Arcturus and Lyra, said to monitor Earth and prepare humanity for "open contact." The construct entered the culture through 1950s contactees George Adamski and George Van Tassel and was systematized by channeller Sheldan Nidle in the 1990s.',
    origin:
      'The earliest "federation" framing comes from George Adamski\'s 1953 book Flying Saucers Have Landed, in which a long-haired Venusian named "Orthon" describes a council of worlds concerned about Earth\'s atomic tests. George Van Tassel\'s Giant Rock conventions (1953-1977) cemented the idea that benevolent space brothers operated through an organized council.\n\nFrom the 1990s the term "Galactic Federation of Light" was popularized by Sheldan Nidle (PAO) and later by Blossom Goodchild, whose 14 October 2008 channelled prediction of a giant ship over the southern hemisphere drew global attention when nothing appeared. The framework underpins virtually all "ascension" and "disclosure soon" channelling material online.',
    keyEvents: [
      '20 Nov 1952: Adamski claims first Orthon contact in the Mojave.',
      '1953-1977: Van Tassel Giant Rock conventions normalize the federation idea.',
      '1990s: Sheldan Nidle / PAO codifies the Galactic Federation of Light.',
      '14 Oct 2008: Goodchild prediction fails publicly.',
      '2020: Former Israeli space-security chief Haim Eshed claims a Galactic Federation exists and a Mars base is operational.',
    ],
    evidence: [
      'Adamski / Leslie — Flying Saucers Have Landed (1953).',
      'Van Tassel — I Rode a Flying Saucer (1952) and Spacecraft Convention transcripts.',
      'Sheldan Nidle / Planetary Activation Organization archives.',
      'Yedioth Ahronoth interview with Haim Eshed (8 Dec 2020).',
    ],
    skepticalView:
      'No physical evidence has ever been produced. Predictions made on behalf of the Federation (Goodchild 2008, Nidle multiple) have an uninterrupted record of public failure. Religious-studies scholars (Christopher Partridge, Susan Palmer) classify the construct as a UFO-religion belief system that mirrors older theosophical "ascended masters" hierarchies.',
    videos: [
      { id: 'KqHkAPbQqAQ', title: 'Former Israeli Space Security Chief Says Aliens Exist', channel: 'Jerusalem Post' },
    ],
    sources: [
      { label: 'Yedioth Ahronoth — Eshed interview (English summary)', url: 'https://www.jpost.com/omg/former-israeli-space-security-chief-says-aliens-exist-trump-knows-651405' },
      { label: 'Adamski Foundation', url: 'http://www.gafintl-adamski.com/' },
    ],
  },
  {
    id: 'eshed-galactic-federation-2020',
    title: 'Eshed Disclosure',
    subtitle: 'Haim Eshed · Dec 2020',
    category: 'Statement',
    era: 'Dec 2020',
    location: 'Tel Aviv',
    confidence: 'REPORTED',
    symbol: '🇮🇱',
    summary:
      'Professor Haim Eshed — three-time Israel Defense Prize laureate and the 30-year head of Israel\'s space security program — told Yedioth Ahronoth in December 2020 that a Galactic Federation has been in contact with the U.S. and Israel, that an underground joint-base on Mars is operational, and that disclosure was withheld to prevent "mass hysteria."',
    origin:
      'The interview was conducted to promote Eshed\'s autobiography "The Universe Beyond the Horizon — Conversations with Professor Haim Eshed." Eshed, then 87, named no other living officials but said President Trump had been on the verge of revealing the contact and was asked to wait. The Pentagon, NASA and the Israeli Ministry of Defense did not respond on the record.\n\nEshed\'s credentials are not in dispute — he ran Israel\'s satellite program from 1981 to 2010 — which placed major outlets (NBC, Jerusalem Post, Die Welt) in the unusual position of carrying the claim without dismissing the source.',
    keyEvents: [
      '8 Dec 2020: Yedioth Ahronoth Hebrew interview published.',
      '9 Dec 2020: Story crosses to English-language press.',
      'Late Dec 2020: Trump White House declines comment.',
    ],
    evidence: [
      'Eshed autobiography (Hebrew, 2020).',
      'Yedioth Ahronoth article (Hebrew original).',
      'Israeli Ministry of Defense — confirmation of Eshed\'s tenure and security clearance.',
    ],
    skepticalView:
      'Eshed offered no documents, no named witnesses, and no physical evidence. NASA publicly stated it has no joint Mars program with any other entity, human or otherwise. Skeptics (Mick West, Robert Sheaffer) note that retired senior officials making post-career UAP claims is a recurring pattern that has yet to produce verifiable disclosure.',
    sources: [
      { label: 'NBC News coverage (9 Dec 2020)', url: 'https://www.nbcnews.com/news/world/israeli-ex-space-security-chief-says-aliens-exist-humanity-not-n1250333' },
      { label: 'Jerusalem Post coverage', url: 'https://www.jpost.com/omg/former-israeli-space-security-chief-says-aliens-exist-trump-knows-651405' },
    ],
  },
  {
    id: 'pleiadian-council-of-nine',
    title: 'Council of Nine',
    subtitle: 'Andrija Puharich / Lab Nine · 1952 – 1980s',
    category: 'Council',
    era: '1952 – 1980s',
    location: 'Glen Cove ME · Ossining NY',
    confidence: 'ALLEGED',
    symbol: '☉',
    summary:
      'A nine-member discarnate "council" first contacted on 27 December 1952 through the medium D.G. Vinod by parapsychologist Dr. Andrija Puharich. The Nine identified themselves as principal Egyptian deities (Atum, Tefnut, Geb, Nut, etc.) and claimed to be the architects of human civilization. Their material later passed through Uri Geller, Phyllis Schlemmer and the Lab Nine group, and seeded much of the modern "ancient astronaut + benevolent council" mythology.',
    origin:
      'Puharich — a Pentagon-cleared neurologist who also ran U.S. Army research into ESP at Edgewood Arsenal — convened a circle in Glen Cove, Maine, in late 1952. Through Vinod, the Nine dictated the foundational text now known as "The Nine Principles and Forces."\n\nIn 1971 Puharich met Israeli psychic Uri Geller in Tel Aviv and re-established contact. Through 1974-1978 the group, now operating from Ossining NY as "Lab Nine," produced thousands of pages of channelled material via medium Phyllis Schlemmer. Selected transcripts were published as The Only Planet of Choice (Schlemmer, 1993). Members of the funding circle included Sir John Whitmore, Lyall Watson and (briefly) Gene Roddenberry — whose Deep Space Nine concept later borrowed the name.',
    keyEvents: [
      '27 Dec 1952: First Vinod transmission of the Nine Principles.',
      '1971: Puharich-Geller contact in Tel Aviv.',
      '1974-1978: Lab Nine sessions at Ossining.',
      '1993: Publication of The Only Planet of Choice.',
    ],
    evidence: [
      'The Nine Principles and Forces (1952 transcripts, Puharich archive).',
      'Schlemmer / Whitmore — The Only Planet of Choice (Gateway, 1993).',
      'Puharich — Uri: A Journal of the Mystery of Uri Geller (1974).',
    ],
    skepticalView:
      'Puharich\'s prior intelligence affiliations have led researchers (Jacques Vallée in Messengers of Deception, Adam Gorightly) to argue the Nine material was either an experimental psy-op or unconscious channeling shaped by Puharich\'s Egyptological reading. No external verification of any predictive claim exists.',
    sources: [
      { label: 'The Only Planet of Choice — overview', url: 'https://en.wikipedia.org/wiki/The_Council_of_Nine' },
      { label: 'Vallée — Messengers of Deception (1979)', url: 'https://www.jacquesvallee.net/' },
    ],
  },
  {
    id: 'andromeda-council',
    title: 'Andromeda Council',
    subtitle: 'Alex Collier · 1985 – present',
    category: 'Council',
    era: '1985 – present',
    location: 'Contactee material, Michigan',
    confidence: 'ALLEGED',
    symbol: '🌌',
    summary:
      'A claimed assembly of 139 star systems within the Andromedan galactic neighborhood, described by American contactee Alex Collier as the local oversight body for Earth\'s transition out of "tier-three" status. Collier says he has been in contact since age 8 (1964) with two Andromedans named Vasais and Moraney.',
    origin:
      'Collier emerged publicly in 1991 with extensive lecture material at conferences including the 1995 Global Sciences Congress. His core claims describe a regional council that meets above Saturn, a quarantine on Earth maintained by the Galactic Federation of Worlds, and an active draconian-reptilian opposition operating through "shadow government" channels.\n\nCollier withdrew from public life in 2002 after personal threats but resumed appearances in 2009. He has consistently refused payment for original lectures and his core narrative has remained internally consistent across 30 years — a point his supporters consider evidential.',
    keyEvents: [
      '1964: Collier reports first contact at age 8.',
      '1991: First public lectures.',
      '1995: Global Sciences Congress — Letters from Andromeda published.',
      '2009: Public return and Defending Sacred Ground re-issue.',
    ],
    evidence: [
      'Collier — Defending Sacred Ground (1996, revised 2009).',
      'Letters from Andromeda (1995).',
      'Project Camelot interviews (2009-2014).',
    ],
    skepticalView:
      'No physical artifacts, no second witness, and no falsifiable prediction. Astronomers note "Andromeda" in the contactee context refers to the constellation, not the M31 galaxy — which is 2.5 million light-years away and physically incompatible with the described contact frequency.',
    sources: [
      { label: 'Alex Collier official archive', url: 'https://alexcollier.org/' },
    ],
  },
  {
    id: 'tall-whites-charles-hall',
    title: 'Tall Whites · Indian Springs',
    subtitle: 'Sgt. Charles Hall · 1965 – 1967',
    category: 'Delegation',
    era: '1965 – 1967',
    location: 'Indian Springs AFAF, Nevada',
    confidence: 'ALLEGED',
    symbol: '⬜',
    summary:
      'USAF weather observer Sgt. Charles Hall claims that during a two-year tour at Indian Springs Auxiliary Air Field (now Creech AFB) he interacted regularly with a delegation of tall, pale, humanoid extraterrestrials operating from a small base in the Nevada desert under a treaty arrangement with the U.S. Air Force.',
    origin:
      'Hall served at Indian Springs from 1965-1967 and went public in 2002 with the four-volume Millennial Hospitality memoir series. He describes the "Tall Whites" as 7-9 feet tall, pale-skinned, with large blue eyes, traveling in a small scout craft and a larger "deep-space craft" parked in a hangar at the south end of the range. Hall consistently named living USAF colleagues who could (and did not) corroborate his claim.\n\nHall passed a polygraph examination administered for the History Channel\'s UFO Hunters in 2008. The encounters were said to be authorized by a treaty under which the Tall Whites traded technical assistance for atmospheric research samples.',
    keyEvents: [
      '1965-1967: Hall\'s Indian Springs tour.',
      '2002: Millennial Hospitality vol. 1 published.',
      '2008: Polygraph on UFO Hunters (History Channel).',
    ],
    evidence: [
      'Hall — Millennial Hospitality I-IV (2002-2006).',
      'UFO Hunters S2E10 polygraph segment.',
      'Hall\'s service record at Indian Springs (verified).',
    ],
    skepticalView:
      'No corroborating witness has ever come forward despite Hall naming dozens of fellow airmen. The named hangar at the south end of Indian Springs is documented as a standard aircraft maintenance bay. Polygraph results are not admissible as evidence and reflect belief, not truth.',
    sources: [
      { label: 'Hall — Millennial Hospitality (overview)', url: 'https://en.wikipedia.org/wiki/Charles_James_Hall' },
    ],
  },
  {
    id: 'greada-treaty-1954',
    title: 'Greada Treaty',
    subtitle: 'Holloman AFB · alleged Feb 1954',
    category: 'Treaty',
    era: 'Feb 1954',
    location: 'Holloman AFB, New Mexico',
    confidence: 'ALLEGED',
    symbol: '🤝',
    summary:
      'The most widely repeated "treaty" claim in UFO lore: that on or about 20-21 February 1954, President Dwight D. Eisenhower met with a delegation of greys (or tall blondes, depending on source) at Holloman or Edwards AFB and signed an exchange agreement permitting limited human abductions in return for technology. The claim originates with Gerald Light\'s April 1954 letter to Borderland Sciences, was elaborated by William Cooper in 1989, and remains unverified.',
    origin:
      'Eisenhower vacationed in Palm Springs CA from 17-22 February 1954. On the night of 20 February the press was briefly unable to locate him; the White House said he had broken a tooth and visited a dentist. The dentist (Dr. Francis A. Purcell) was real and the explanation was officially accepted at the time.\n\nGerald Light, a Borderland Sciences researcher, wrote a 16 April 1954 letter to BSRA director Meade Layne claiming he had personally been at Edwards AFB during a meeting with "five separate and distinct types of aircraft" and "etheric people." William Cooper later identified the alleged signatories as the "Greys from Orion" and gave the agreement the name "Greada" (a corruption variously spelled Greada, Grenada, or Greata) in his 1989 lectures and 1991 book Behold a Pale Horse.',
    keyEvents: [
      '20 Feb 1954: Eisenhower\'s "missing evening" in Palm Springs.',
      '16 Apr 1954: Gerald Light letter to Meade Layne.',
      '1989: William Cooper introduces the "Greada Treaty" name.',
      '1991: Cooper publishes Behold a Pale Horse.',
    ],
    evidence: [
      'Gerald Light letter (16 Apr 1954) — held in BSRA archive.',
      'Eisenhower presidential schedule (Feb 1954) — Eisenhower Library.',
      'Cooper — Behold a Pale Horse (Light Technology, 1991).',
    ],
    skepticalView:
      'No primary documentation has ever surfaced. The Eisenhower Library schedule is intact. Cooper himself later disavowed several of his earlier claims. Researchers Robert Sheaffer and Stanton Friedman (rare alignment) both classified the Greada Treaty story as folklore.',
    sources: [
      { label: 'Eisenhower Presidential Library — Feb 1954 schedule', url: 'https://www.eisenhowerlibrary.gov/' },
      { label: 'Cooper — Behold a Pale Horse archive', url: 'https://archive.org/details/BeholdAPaleHorse_201602' },
    ],
  },
  {
    id: 'project-serpo',
    title: 'Project Serpo',
    subtitle: 'Anonymous DIA "release" · 2005',
    category: 'Treaty',
    era: 'Alleged 1965 – 1978',
    location: 'Zeta Reticuli system (claimed)',
    confidence: 'ALLEGED',
    symbol: '🚀',
    summary:
      'An alleged classified exchange program in which 12 U.S. military personnel travelled to the home planet of the EBE-1 species ("Serpo," in the Zeta Reticuli binary system) from 1965 to 1978. The story emerged in November 2005 through an anonymous email correspondent calling himself "Anonymous" sending material to the UFO researcher Victor Martinez\'s private mailing list.',
    origin:
      'Anonymous claimed to be a retired DIA officer "with one foot out the door" releasing the program documents in 26 installments. The story was promoted by former AFOSI counter-intelligence officer Richard Doty (already a confirmed source of the Paul Bennewitz disinformation operation) and physicist Jack Sarfatti.\n\nPart of the 2005-2006 release rolled in extensive technical detail: the home star was named as Zeta Reticuli 2, the planet was tidally locked, and seven of the twelve crew returned alive in 1978 with permanent radiation injuries. By 2007 internal contradictions in the document set, combined with Doty\'s established disinformation history, led most serious researchers to reject the material as a fabrication.',
    keyEvents: [
      '2 Nov 2005: First Anonymous email to Victor Martinez.',
      'Nov 2005 – Jan 2006: 26 release postings on serpo.org.',
      '2006: Bill Ryan launches official Project Serpo site.',
      '2007: Ryan disavows the material as suspect.',
    ],
    evidence: [
      'serpo.org release archive (2005-2006).',
      'Doty / Bennewitz disinformation precedent (Bishop, Project Beta, 2005).',
    ],
    skepticalView:
      'The release\'s technical details (atmospheric composition, stellar parameters, biology) repeatedly contradict known physics and astronomy. Bill Ryan, who originally championed the material, later concluded "at least 80%" was disinformation. Most researchers treat Serpo as a continuation of the Doty disinformation pattern.',
    sources: [
      { label: 'Original Project Serpo archive', url: 'http://www.serpo.org/' },
      { label: 'Greg Bishop — Project Beta (2005)', url: 'https://www.simonandschuster.com/books/Project-Beta/Greg-Bishop/9781416505495' },
    ],
  },
  {
    id: 'goode-sphere-being-alliance',
    title: 'Sphere-Being Alliance',
    subtitle: 'Corey Goode · 2014 – present',
    category: 'Council',
    era: '2014 – present',
    location: 'Secret Space Program (claimed)',
    confidence: 'ALLEGED',
    symbol: '⚪',
    summary:
      'Claimed by Corey Goode (b. 1970) to be a five-member higher-density council — the Blue Avians, Golden Triangle Heads, Blue Orbs, and two unnamed groups — that arrived in our solar system in 2012 to oversee humanity\'s ascension and end the operations of a "Cabal" running a Secret Space Program.',
    origin:
      'Goode emerged on the Sphere-Being Alliance and Cosmic Disclosure (Gaia TV, with David Wilcock) in 2014-2015. He claims to have been recruited at age six into a 20-and-back program serving aboard the Solar Warden interplanetary fleet from 1987-2007.\n\nGoode\'s narrative sits at the intersection of Bill Tompkins\' Selected by Extraterrestrials (2015), Project Camelot\'s "Mr. X" testimony, and the Wilcock cosmology drawn from the Ra Material (Law of One). It has been the dominant narrative inside the post-2015 "full disclosure" community despite zero documentary corroboration.',
    keyEvents: [
      '1987-2007: Claimed 20-and-back service aboard Solar Warden.',
      '2014: Goode goes public.',
      '2015-2018: Cosmic Disclosure series on Gaia.',
      '2021: Goode files (and later loses) defamation actions against former associates.',
    ],
    evidence: [
      'Cosmic Disclosure transcripts (Gaia, 2015-2018).',
      'Goode-Wilcock joint material (Sphere-Being Alliance archive).',
      'Tompkins — Selected by Extraterrestrials (2015) for context.',
    ],
    skepticalView:
      'No documents, no second witness, no physical artifact, multiple legal disputes among insiders. Mainstream UFO researchers (Robert Powell, Richard Dolan with reservations) treat the Goode material as belief literature rather than testimony.',
    sources: [
      { label: 'Sphere-Being Alliance archive', url: 'https://spherebeingalliance.com/' },
    ],
  },
  {
    id: 'orion-grey-trade',
    title: 'Orion Grey Delegation',
    subtitle: 'Phil Schneider · alleged 1979',
    category: 'Delegation',
    era: 'Alleged 1979',
    location: 'Dulce, NM',
    confidence: 'ALLEGED',
    symbol: '👁️',
    summary:
      'Geological engineer Phil Schneider (1947-1996) claimed in 1995-1996 lectures that he had been employed in the construction of Deep Underground Military Bases including Dulce, where in August 1979 a firefight broke out between Delta Force / Black Berets and a delegation of Orion Greys, killing 60-66 humans. Schneider said he killed two greys and was permanently injured by an alien weapon.',
    origin:
      'Schneider went public in 1995 with a national lecture tour, displaying scars and what he claimed was missing fingers from the Dulce engagement. He named specific personnel and produced what he said were geological survey documents. He died on 17 January 1996, ruled a suicide by Clackamas County (OR) coroner; family and supporters have publicly disputed that ruling.\n\nThe Dulce Base narrative had been seeded earlier by Paul Bennewitz (the 1980-1983 target of the Doty / AFOSI disinformation operation) and Albuquerque hypnotherapist Leo Sprinkle. Schneider expanded it from a research base into a treaty-and-conflict scenario.',
    keyEvents: [
      'Aug 1979: Alleged Dulce firefight.',
      '1980-1983: Bennewitz / Project Beta disinformation operation establishes Dulce in lore.',
      '1995: Schneider lecture tour.',
      '17 Jan 1996: Schneider death (ruled suicide).',
    ],
    evidence: [
      'Schneider lecture recordings (1995, multiple venues).',
      'Greg Bishop — Project Beta (2005) on the Bennewitz / Dulce origin.',
      'Clackamas County coroner report (1996).',
    ],
    skepticalView:
      'Schneider\'s service record could not be independently verified. The specific personnel he named (Col. Charles Senn, Capt. James Snell) are not on record at the units he placed them. Project Beta documents the deliberate fabrication of much of the Dulce mythology by AFOSI in 1980-1983.',
    sources: [
      { label: 'Greg Bishop — Project Beta', url: 'https://www.simonandschuster.com/books/Project-Beta/Greg-Bishop/9781416505495' },
    ],
  },
  {
    id: 'rendlesham-binary-message',
    title: 'Rendlesham Binary',
    subtitle: 'Penniston / RAF Bentwaters · Dec 1980',
    category: 'Communication',
    era: 'Dec 26-28 1980',
    location: 'RAF Bentwaters / Woodbridge, UK',
    confidence: 'DEBATED',
    symbol: '0️⃣',
    summary:
      'During the Rendlesham Forest incident (26-28 December 1980), USAF SSgt. Jim Penniston says he touched a landed triangular craft and received — through telepathic download — a long binary code that he wrote into a notebook on the spot. The 16-page notebook entry was decoded in 2010 by computer scientist Nick Ciske into an apparent message containing precise geographic coordinates and the phrase "EXPLORATION OF HUMANITY."',
    origin:
      'Penniston did not disclose the binary download until 1994, citing security classification. The handwritten notebook was first photographed publicly in 2010. The decoded message reads (in part): "EXPLORATION OF HUMANITY 666 8100 52.0942532N 13.131269W CONTINUOUS FOR PLANETARY ADVANCE EYES OF YOUR EYES ORIGIN 52.0942532N 13.131269W ORIGIN YEAR 8100."\n\nThe 52.094N / 13.131W coordinates point to Hy-Brasil — a phantom island that appeared on Atlantic charts from 1325 to 1865. Skeptics note that Penniston is the sole source, the notebook surfaced 30 years later, and the phantom-island connection is suspiciously congruent with 1980-vintage occultist literature already in print at the time of the incident.',
    keyEvents: [
      '26-28 Dec 1980: Rendlesham incident at RAF Bentwaters / Woodbridge.',
      '1994: Penniston first mentions the binary.',
      '2010: Notebook photographed; Nick Ciske decode published.',
      '2010-present: Coordinate analysis (Hy-Brasil) widely debated.',
    ],
    evidence: [
      'Lt. Col. Charles Halt memo (13 Jan 1981) — declassified.',
      'Penniston notebook (photographed 2010).',
      'Larry Warren / Peter Robbins — Left at East Gate (1997).',
    ],
    skepticalView:
      'The binary appears in no period documentation. Halt\'s memo, the only contemporaneous record, contains nothing about Penniston touching the craft or receiving a download. Mainstream investigators (Ian Ridpath, David Clarke) attribute the original lights to the Orfordness lighthouse and a January 1981 fireball; the binary download is treated as a much later embellishment.',
    videos: [
      { id: 'klMl3jD80sc', title: 'Rendlesham Forest Incident — Jim Penniston Interview', channel: 'Open Minds' },
    ],
    sources: [
      { label: 'Halt Memo — National Archives copy', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB390/' },
      { label: 'Penniston notebook + Ciske decode', url: 'https://www.therendleshamforestincident.com/' },
    ],
  },
];

export const federationCategories = [
  'All',
  'Council',
  'Treaty',
  'Delegation',
  'Statement',
  'Communication',
];
