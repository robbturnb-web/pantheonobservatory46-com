import type { DossierEntry } from '@/components/dossier/types';

/**
 * Atlantis — Submerged ruins / lost civilization dossier
 *
 * Each dossier traces one strand of the Atlantis mystery: Plato's primary
 * accounts, candidate sites (Bimini Road, Yonaguni, Cuban anomaly, Azores,
 * Eye of the Sahara, Santorini), and the major theorists (Cayce, Hancock).
 */
export const atlantisEntries: DossierEntry[] = [
  {
    id: 'plato-account',
    title: "Plato's Original Account",
    subtitle: 'Timaeus & Critias · c. 360 BCE',
    category: 'Primary Source',
    era: '360 BCE',
    location: 'Athens, Greece (text)',
    confidence: 'VERIFIED',
    symbol: '📜',
    summary:
      "The only ancient source for Atlantis is Plato. In two dialogues — Timaeus and the unfinished Critias — he describes a powerful naval island civilization 'beyond the Pillars of Heracles' that conquered the Mediterranean before sinking 'in a single day and night' roughly 9,000 years before Solon (i.e., c. 9600 BCE).",
    origin:
      "Plato attributes the story to the Athenian statesman Solon, who supposedly heard it from Egyptian priests at Saïs. The dialogues describe a circular island capital with concentric rings of land and water, advanced metallurgy (including the alloy 'orichalcum'), an aggressive military expansion, and ultimate destruction by earthquake and flood as divine punishment.\n\nWhether Plato intended the account as literal history, allegory of Athenian hubris, or a fictional foil for his Republic remains the central scholarly debate. He gives precise dimensions (the central plain was 3,000 by 2,000 stadia ≈ 555 × 370 km), which is either historical specificity or rhetorical embellishment depending on interpretation.",
    keyEvents: [
      'c.360 BCE: Plato writes Timaeus.',
      'Plato dies before completing Critias mid-sentence.',
      "9000 years before Solon (≈9600 BCE): Plato's stated date for Atlantis's destruction.",
      'Pillars of Heracles = Strait of Gibraltar in Greek geography.',
    ],
    evidence: [
      'Plato, Timaeus 24e–25d (the canonical first description).',
      'Plato, Critias 113c–121c (the geography, government, and military of Atlantis).',
      'Egyptian temple at Saïs is well-documented; whether priests there held such records is unverified.',
    ],
    skepticalView:
      "Most classicists (e.g., Aristotle, who said 'he who invented it also destroyed it') treat Atlantis as Plato's literary invention to dramatize his political philosophy in the Republic. The geography and dating do not match any known archaeological record.",
    videos: [
      { id: 'wkIfNcBmeJ0', title: "Plato Describes Atlantis · First Mention of the Island · 360 BC 'Critias'", channel: 'Voices of the Past' },
      { id: 'ErPsyBUCijM', title: 'Legend of Atlantis (Full Episode) | Drain the Oceans', channel: 'National Geographic' },
    ],
    sources: [
      { label: 'Plato — Timaeus & Critias (Perseus Digital Library)', url: 'https://www.perseus.tufts.edu/' },
      { label: 'Aristotle — Strabo, Geography II.3.6 (skeptical view)' },
    ],
  },
  {
    id: 'bimini-road',
    title: 'The Bimini Road',
    subtitle: 'Submerged limestone "wall" off the Bahamas',
    category: 'Site',
    era: 'Discovered 1968',
    location: 'North Bimini, Bahamas',
    confidence: 'DEBATED',
    symbol: '🪨',
    summary:
      'A half-mile-long arrangement of large, rectangular limestone blocks sitting in 5–6 m of water off Bimini. Discovered in 1968, it appears strikingly road-like or wall-like and has been claimed as the literal "Hall of Records" predicted by Edgar Cayce. Geologists identify it as natural beachrock fracture.',
    origin:
      'Pilot Robert Brush and zoologist Joseph Manson Valentine reported the formation in September 1968. The blocks are roughly square or rectangular, lying in a clear linear arrangement parallel to the shore. Several are over 4 m on a side; some appear stacked.\n\nEdgar Cayce, in a 1933 reading, predicted that records of Atlantis would re-emerge "in the Bahamas" — specifically near Bimini — in 1968. The discovery, the same year, electrified Atlantean researchers. Subsequent dives by Manson Valentine, Manson Valentine\'s associates, and the Association for Research and Enlightenment (ARE) reported "tongue-in-groove" jointing and possible artifact fragments.\n\nMainstream geological surveys (Eugene Shinn, USGS, 1978 and follow-ups) classify the formation as in-place beachrock that fractures naturally into rectangular slabs along bedding planes — a process documented at many tropical coastlines.',
    keyEvents: [
      '1933: Edgar Cayce reading predicts Atlantis remnants will rise off Bimini in 1968.',
      'Sept 2 1968: Brush and Valentine spot the formation from the air.',
      '1971: Cousteau Society conducts initial surveys.',
      '1978: Eugene Shinn (USGS) publishes natural-beachrock interpretation.',
      '2005+: Greg Little expeditions report new "second tier" stones.',
    ],
    evidence: [
      'Shinn, E.A. (1978) — "Atlantis: Bimini Hoax" — Sea Frontiers magazine, technical breakdown of beachrock formation.',
      'Little, Greg (2005) — "The ARE\'s Search for Atlantis" — counter-arguments from on-site dives.',
    ],
    skepticalView:
      'The blocks lie in a single horizontal plane, are uniform in mineralogy, and lack mortar or tooling marks. The "tongue-in-groove" jointing is consistent with thermal-stress fracturing of beachrock observed worldwide. No artificial artifacts have ever been recovered from the site.',
    videos: [
      { id: 'Hsnpqq_fnts', title: 'Unveiling the Mysteries of Bimini Road: Lost Atlantis?', channel: 'World Wonders' },
    ],
    sources: [
      { label: 'Shinn, E.A. (1978/2004) — USGS technical analysis of Bimini Road' },
      { label: 'A.R.E. — Edgar Cayce Bimini reading 996-12 (1933)', url: 'https://www.edgarcayce.org/' },
    ],
  },
  {
    id: 'yonaguni',
    title: 'Yonaguni Monument',
    subtitle: 'Underwater terraced structure off Japan',
    category: 'Site',
    era: 'Discovered 1986',
    location: 'Yonaguni-jima, Ryukyu Islands, Japan',
    confidence: 'DEBATED',
    symbol: '🏯',
    summary:
      'A massive submerged formation discovered by diver Kihachiro Aratake in 1986 — roughly 50 m long, 20 m wide, and 26 m tall — featuring sharp right angles, stepped terraces, and what some interpret as carved faces and arches. Marine geologist Masaaki Kimura argues it is artificial; geologist Robert Schoch maintains it is natural sandstone.',
    origin:
      'Aratake initially discovered the site in 1986 while scouting hammerhead-shark dive locations off the southern coast of Yonaguni. The monument sits at depths of 5–25 m and consists of layered sandstone with surfaces that meet at unusually clean 90° angles.\n\nProfessor Masaaki Kimura of the University of the Ryukyus has argued since the 1990s that the structure is a man-made stepped pyramid, possibly part of the lost Mu / Lemuria civilization, dating it to approximately 10,000 years BP — a period when sea levels were ~40 m lower and the site would have been on dry land.\n\nGeologist Robert Schoch (best known for his Sphinx weathering work) has dived the site and concluded it is a natural sandstone formation whose tabular jointing creates the appearance of architecture. The key debate is whether features such as a "turtle" carving, an "arch," and stairway-like terraces could form naturally.',
    keyEvents: [
      '1986: Kihachiro Aratake discovers the formation.',
      '1992: Masaaki Kimura begins systematic survey.',
      '1997: Graham Hancock dives the site for "Underworld."',
      '2007+: Robert Schoch publishes natural-formation analysis.',
    ],
    evidence: [
      'Kimura, M. (2007) — Various papers on Yonaguni geometry.',
      'Schoch, R. & Bauval, R. — "Origins of the Sphinx" / Yonaguni chapters.',
    ],
    skepticalView:
      'The site lies on the boundary of the Pacific Ring of Fire — extreme tectonic and erosion forces produce stepped sandstone formations elsewhere (e.g., the Giant\'s Causeway). No tools, mortar, or unambiguous carvings have been recovered.',
    videos: [
      { id: 'jYBJnX9AHOg', title: "Yonaguni Monument — Japan's Lost Atlantis", channel: 'Simply Scuba' },
      { id: 'h6mT7TD1ETo', title: "The truth behind Japan's mysterious 'Atlantis'", channel: 'BBC Global' },
    ],
    sources: [
      { label: 'Kimura, M. — University of the Ryukyus papers' },
      { label: 'Schoch, R. — "Voyages of the Pyramid Builders" (chapter on Yonaguni)' },
    ],
  },
  {
    id: 'cuban-anomaly',
    title: 'The Cuban Underwater "City"',
    subtitle: 'Sonar anomaly off Guanahacabibes Peninsula',
    category: 'Anomaly',
    era: 'Discovered 2001',
    location: 'Western Cuba, ~700 m depth',
    confidence: 'ALLEGED',
    symbol: '🌊',
    summary:
      'In May 2001, Canadian-Cuban survey company Advanced Digital Communications, scanning for shipwrecks for the Cuban government, captured side-scan sonar images of geometric structures resembling streets and buildings at ~700 m depth — far below any modern sea-level fluctuation. The site has never been adequately re-investigated.',
    origin:
      'The team — led by Paulina Zelitsky — was contracted by the Cuban government to survey for wrecks in the Yucatán Channel. Their sonar returned right-angle structures spread over a roughly 2 km² area. ROV imagery later that year reportedly showed pyramidal forms and a "sphinx-like" object.\n\nThe depth — about 700 m — is the central problem: even at the lowest sea-level stand of the last 100,000 years, this site would have been hundreds of meters underwater. Proponents propose tectonic subsidence; mainstream geologists note that no such rapid subsidence is recorded in the Caribbean Plate.\n\nNo follow-up expedition has ever produced peer-reviewed imagery. Zelitsky\'s ADC company stopped publishing on the site after 2003. Cuba has not authorized further independent surveys.',
    keyEvents: [
      'May 2001: ADC sonar captures geometric returns.',
      'July 2001: Reuters and National Geographic cover the discovery.',
      '2002: ROV imaging reportedly conducted; raw imagery never publicly released.',
      '2004+: All follow-up expeditions stalled or denied.',
    ],
    skepticalView:
      'The original sonar imagery has never been peer-reviewed. The depth is incompatible with any known sea-level fluctuation in the past 50,000 years, and "geometric" sonar returns are commonly produced by sediment slumps and tectonic blocks.',
    sources: [
      { label: 'National Geographic News — "Lost City of Cuba?" (2001)' },
      { label: 'Reuters — Paulina Zelitsky interview (2001)' },
    ],
  },
  {
    id: 'azores-hypothesis',
    title: 'The Azores Hypothesis',
    subtitle: 'Mid-Atlantic ridge as Plato\'s sunken kingdom',
    category: 'Theory',
    era: 'Modern (20th c. onward)',
    location: 'North Atlantic, Mid-Atlantic Ridge',
    confidence: 'DEBATED',
    symbol: '🌋',
    summary:
      'A long-standing geological hypothesis places Atlantis on the now-submerged plateau around the Azores in the Mid-Atlantic. Recent work by Randall Carlson and Graham Hancock revives the case using Younger Dryas impact data and isostatic rebound modeling.',
    origin:
      'Ignatius Donnelly\'s 1882 book "Atlantis: The Antediluvian World" first systematically argued for a North Atlantic location. The Azores Plateau — which today lies above sea level only at its highest peaks (Pico, 2,351 m) — is the largest mid-ocean elevated platform on Earth and matches several of Plato\'s geographical clues (beyond Gibraltar; mountainous and fertile).\n\nThe modern case combines: (1) Younger Dryas Impact Hypothesis evidence (Firestone et al. 2007) of a cosmic impact event ~12,800 years ago triggering catastrophic sea-level rise and global flooding, (2) isostatic rebound calculations showing a much larger Azores landmass during the Last Glacial Maximum, and (3) Plato\'s 9600 BCE date matching the Younger Dryas onset.\n\nCritics counter that the Azores Plateau has been continuously volcanic for millions of years, that no submerged archaeological remains have been recovered, and that bathymetric surveys show no sunken plain matching Plato\'s dimensions.',
    keyEvents: [
      '1882: Donnelly publishes "Atlantis: The Antediluvian World."',
      '2007: Firestone et al. propose Younger Dryas impact.',
      '2018: New impact crater found under Hiawatha Glacier (Greenland) supports YD hypothesis.',
      '2024–25: Hancock & Carlson publicly endorse Azores location.',
    ],
    skepticalView:
      'Plate tectonics rules out a continental landmass at the Azores in the past 10,000 years. The Mid-Atlantic Ridge is constantly spreading, not subsiding.',
    videos: [
      { id: 'aYgm1c3Q7zU', title: 'The Azores are Atlantis · Carlson & Hancock', channel: 'Apatheian' },
      { id: 'qSLs1-KwasM', title: 'Joe Rogan Experience #2215 — Graham Hancock', channel: 'PowerfulJRE' },
    ],
    sources: [
      { label: 'Donnelly, I. (1882) — Atlantis: The Antediluvian World' },
      { label: 'Firestone et al. (2007) — PNAS Younger Dryas impact paper' },
      { label: 'Kjær et al. (2018) — Hiawatha impact structure, Science Advances' },
    ],
  },
  {
    id: 'eye-of-sahara',
    title: 'Richat Structure — "Eye of the Sahara"',
    subtitle: 'Concentric ring formation in Mauritania',
    category: 'Site',
    era: 'Geological — recent reinterpretation',
    location: 'Mauritania, West Africa',
    confidence: 'DEBATED',
    symbol: '👁',
    summary:
      'A 50-km diameter geological feature in Mauritania consisting of perfectly concentric rings — strikingly similar to Plato\'s description of Atlantis\'s capital. YouTuber Jimmy Bright (and later mainstream investigators) noted the match in 2018; geologists explain it as an eroded geological dome.',
    origin:
      'The Richat Structure was first photographed from space by Gemini IV in 1965 and was initially mistaken for a meteorite impact crater. Detailed geological surveys eventually identified it as an alkaline igneous complex that has been deeply eroded to expose its concentric layers — Cambrian and Ordovician sedimentary strata uplifted around an igneous core.\n\nThe Atlantis match was popularized by amateur researcher Jimmy Bright in 2017–18, who pointed out: (1) concentric ring structure matching Plato\'s "rings of land and water," (2) location "beyond the Pillars of Heracles," (3) approximate diameter (~23 km of central plain) matching Plato\'s dimensions when scaled, and (4) evidence of past water flow through erosion patterns.\n\nGeologists agree the structure is real and visually striking, but it has been subaerial (above sea level) throughout its erosional history, with no oceanic submergence in the past several million years. The "rings of water" interpretation requires assuming long-vanished river or seasonal flooding.',
    keyEvents: [
      '1965: Gemini IV astronauts photograph the Richat Structure.',
      '2014: Cambridge geology paper confirms igneous-dome origin.',
      '2018: Bright Insight YouTube series popularizes Atlantis hypothesis.',
      '2022+: Multiple expeditions led by Bright Insight visit the site.',
    ],
    skepticalView:
      'The structure has been continuously eroding for ~100 million years. No archaeological artifacts have been recovered. The "rings" are bedded sedimentary strata, not constructed.',
    sources: [
      { label: 'Matton, G. & Jébrak, M. (2014) — "The Richat Structure: An Alkaline Magmatic Complex"' },
      { label: 'NASA Earth Observatory — Richat photographs', url: 'https://earthobservatory.nasa.gov/' },
    ],
  },
  {
    id: 'santorini',
    title: 'Santorini & the Minoan Theory',
    subtitle: 'Thera eruption · 1600 BCE',
    category: 'Theory',
    era: 'c. 1600 BCE',
    location: 'Aegean Sea',
    confidence: 'REPORTED',
    symbol: '🏛',
    summary:
      "The most academically respected 'rationalist' Atlantis theory: that Plato's account preserves a distorted memory of the Minoan civilization on Crete and the catastrophic Thera (Santorini) volcanic eruption that ended it.",
    origin:
      'Greek archaeologist Spyridon Marinatos first proposed the connection in 1939. Excavations at Akrotiri on Santorini reveal a Minoan-era port city with running water, multi-story buildings, and frescoes showing seafaring scenes — buried under volcanic ash from the Thera eruption (~1600 BCE).\n\nThe theory holds that Plato (or Solon, or the Egyptian source) confused stadia with smaller units, transposed digits in the dating (900 years instead of 9000), and described a Mediterranean civilization rather than an Atlantic one. The Minoan thalassocracy matches Plato\'s naval power; the eruption matches the destruction "in a day and night"; the Egyptian source aligns with documented Minoan-Egyptian trade.\n\nCritics point out that Plato is unambiguous about location (beyond Gibraltar), date (9,000 years ago), and the Atlantic Ocean. Reducing all three to scribal errors strains credulity.',
    keyEvents: [
      'c.1600 BCE: Thera eruption (one of the largest in human history).',
      '1939: Marinatos proposes Atlantis = Minoan Crete.',
      '1967: Akrotiri excavations begin under Marinatos.',
      '2018: Re-dating confirms 1600 BCE eruption.',
    ],
    skepticalView:
      'The Minoan/Santorini interpretation is the academic consensus where the question is engaged at all. Most classicists, however, regard the entire Atlantis tale as Platonic invention.',
    videos: [
      { id: '4UJ22jvzG7A', title: 'Beyond Myth: Decoding the Atlantis Enigma', channel: 'Get.factual' },
    ],
    sources: [
      { label: 'Marinatos, S. (1939) — "The Volcanic Destruction of Minoan Crete"' },
      { label: 'Akrotiri excavation reports — Greek Archaeological Society' },
    ],
  },
  {
    id: 'edgar-cayce',
    title: "Edgar Cayce's Atlantean Readings",
    subtitle: 'Trance prophecies · 1923–1944',
    category: 'Theory',
    era: '1923–1944',
    location: 'Virginia Beach, VA',
    confidence: 'ALLEGED',
    symbol: '🔮',
    summary:
      'Across more than 700 trance "readings," American clairvoyant Edgar Cayce described an Atlantean civilization with crystal-powered technology, a continent that subsided in three stages, refugees who became the founders of Egypt and Yucatán, and a "Hall of Records" awaiting rediscovery near Bimini, Egypt, and Yucatán.',
    origin:
      'Cayce (1877–1945) gave thousands of psychic readings on health, history, and spiritual topics while in self-induced trance. About 700 concerned Atlantis, beginning in 1923. He described:\n\n- A continent in the Atlantic that destroyed itself through misuse of "Tuaoi" / "Firestone" crystal technology.\n- Three submergences: ~50,000 BCE, ~28,000 BCE, and final c.10,500 BCE — the last roughly aligning with Plato.\n- Migration of survivors to Egypt (helping build the Great Pyramid in 10,500 BCE) and the Yucatán.\n- A "Hall of Records" buried in three locations: under the Great Sphinx, off Bimini, and on the Yucatán plateau — to be rediscovered "between 1958 and 1998."\n\nCayce remains influential in New Age and esoteric communities. The Association for Research and Enlightenment (A.R.E.) has continuously sponsored archaeological expeditions based on his readings — most notably the Bimini search.',
    keyEvents: [
      '1923: First Atlantis reading.',
      '1933: Bimini reading (996-12).',
      '1944: Last Atlantis reading; Cayce dies January 1945.',
      '1968: Bimini Road discovered (timing matches Cayce prediction).',
    ],
    skepticalView:
      'No physical evidence has been recovered from any Cayce-predicted site. His readings include numerous historical inaccuracies (e.g., misdating of Egyptian dynasties).',
    sources: [
      { label: 'Edgar Cayce Readings Database — A.R.E.', url: 'https://www.edgarcayce.org/' },
      { label: 'Cayce, E.E. — "Edgar Cayce on Atlantis" (compilation)' },
    ],
  },
  {
    id: 'younger-dryas',
    title: 'Younger Dryas & the Lost Civilization',
    subtitle: 'Cosmic impact c. 12,800 BP',
    category: 'Theory',
    era: 'c. 10,800 BCE',
    location: 'Global',
    confidence: 'DEBATED',
    symbol: '☄️',
    summary:
      'The Younger Dryas Impact Hypothesis proposes a cometary airburst ~12,800 years ago that triggered a 1,200-year cold snap, megafauna extinction, and catastrophic flooding — the same era Plato dates Atlantis. Graham Hancock\'s "Magicians of the Gods" frames this as evidence of a lost ice-age civilization, with Atlantis as one of its outposts.',
    origin:
      'Firestone et al. (2007) published a peer-reviewed PNAS paper proposing that elevated platinum, iridium, and microspherules in a sediment layer dated to ~12,800 BP indicated a cosmic impact. The hypothesis has been controversial but received major support from the 2018 discovery of a 31-km impact crater under Greenland\'s Hiawatha Glacier (Kjær et al., Science Advances).\n\nHancock\'s synthesis combines: YD impact + 100m sea-level rise from melting ice sheets + worldwide flood myths + Göbekli Tepe (built ~9600 BCE, immediately after the Younger Dryas) as evidence that an advanced ice-age civilization existed and was wiped out, with survivors transmitting knowledge to the founders of subsequent cultures.\n\nMainstream archaeology rejects the "lost civilization" extension while debate continues over the impact itself. The 2024 Pinkston-Brown re-analysis questioned several YDIH datasets; Sweatman (2021) defended the impact evidence.',
    keyEvents: [
      '12,800 BP: Younger Dryas cooling event begins.',
      '11,600 BP: Younger Dryas ends; megafauna extinction concludes.',
      '2007: Firestone et al. publish YDIH in PNAS.',
      '2018: Hiawatha crater discovered under Greenland ice.',
      '2021–24: Sweatman, Powell, and others publish further support.',
    ],
    videos: [
      { id: 'EGJ1hyYmmTc', title: 'Joe Rogan Experience #1897 — Graham Hancock & Randall Carlson', channel: 'PowerfulJRE' },
      { id: 'Xs6mbuc4tHQ', title: 'Journey to Find the Lost City of Atlantis with James Cameron', channel: 'National Geographic' },
      { id: '_liVtEeKQmw', title: 'The Sunken Cities That Inspired The Myth Of Atlantis', channel: 'Spark' },
    ],
    skepticalView:
      'The YDIH itself remains contested in geology. The leap from "an impact occurred" to "an advanced civilization existed and perished" is not supported by archaeological evidence.',
    sources: [
      { label: 'Firestone et al. (2007) — PNAS YDIH paper' },
      { label: 'Kjær et al. (2018) — Hiawatha impact structure, Science Advances' },
      { label: 'Hancock, G. — Magicians of the Gods (2015)' },
    ],
  },
];

export const atlantisCategories = ['All', 'Primary Source', 'Site', 'Anomaly', 'Theory'];
