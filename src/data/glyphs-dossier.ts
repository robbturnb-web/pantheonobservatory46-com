import type { DossierEntry } from '@/components/dossier/types';

/**
 * Glyphs Codex — Comparative undeciphered & sacred-script archive.
 * Each entry: literal academic meaning, the ancient-astronaut / esoteric
 * interpretation, and the open scholarly questions.
 */
export const glyphsEntries: DossierEntry[] = [
  {
    id: 'sumerian-cuneiform',
    title: 'Sumerian Cuneiform',
    subtitle: 'Uruk · ~3200 BCE',
    category: 'Script',
    era: '~3200 BCE — present-day Iraq',
    location: 'Uruk, Mesopotamia',
    confidence: 'VERIFIED',
    symbol: '𒀭',
    summary:
      'The world\'s oldest known writing system. Wedge-shaped marks pressed into wet clay, originally for grain accounting, that grew into the literature of Gilgamesh and the Anunnaki. The single sign 𒀭 ("AN/DINGIR") is placed before any name to mark it as divine — the original "god determinative".',
    origin:
      'Cuneiform emerged in southern Mesopotamia between 3400-3100 BCE, evolving from pictographic tokens used for trade. Within centuries it carried law (Hammurabi), epic (Gilgamesh), astronomy (the MUL.APIN tablets), and the Sumerian King List — which records eight kings reigning a combined 241,200 years before "the flood swept over."\n\nThe symbol 𒀭, transliterated AN or DINGIR, simultaneously means sky, heaven, and god. Zecharia Sitchin\'s 1976 translation argued these texts described the Anunnaki — "those who from heaven came" — as a literal flesh-and-blood crew from a planet called Nibiru. Mainstream Assyriologists reject Sitchin\'s renderings, but the texts themselves remain extraordinary: they describe sky-beings who descended, taught agriculture, and whose ruling councils numbered in the dozens.',
    keyEvents: [
      '~3200 BCE: Proto-cuneiform tablets at Uruk IV.',
      '~2400 BCE: Sumerian King List composed, recording pre-flood reigns of 28,800-43,200 years.',
      '~1750 BCE: Code of Hammurabi inscribed in Akkadian cuneiform.',
      '1857: Royal Asiatic Society "Cuneiform Test" — four scholars independently translate the same tablet, proving decipherment.',
      '1976: Zecharia Sitchin publishes "The 12th Planet" — Anunnaki-as-aliens hypothesis.',
    ],
    evidence: [
      'British Museum tablet K.143 — Sumerian King List (Weld-Blundell prism duplicate).',
      'MUL.APIN tablets — Babylonian astronomy catalog naming 66 stars/constellations.',
      'Adapa myth fragments — a mortal summoned to the sky-court of Anu.',
      'Enuma Elish — creation account on seven tablets.',
    ],
    skepticalView:
      'Academic Assyriology (Samuel Noah Kramer, Jeremy Black) reads the Anunnaki strictly as a pantheon of gods, the long reigns as ritual numerology, and Sitchin\'s "Nibiru = 12th planet" reading as a mistranslation of NIBIRU (a name for Marduk/Jupiter at conjunction). The script itself is fully deciphered.',
    videos: [
      { id: 'kKJ-iEHa_eU', title: 'How to Read Cuneiform — Met Museum', channel: 'Metropolitan Museum of Art' },
      { id: 'BNgRhLPo-yE', title: 'Sumerian King List Decoded', channel: 'World History Encyclopedia' },
    ],
    sources: [
      { label: 'CDLI — Cuneiform Digital Library Initiative', url: 'https://cdli.mpiwg-berlin.mpg.de/' },
      { label: 'ETCSL — Electronic Text Corpus of Sumerian Literature', url: 'https://etcsl.orinst.ox.ac.uk/' },
    ],
  },
  {
    id: 'egyptian-hieroglyphs',
    title: 'Egyptian Hieroglyphs',
    subtitle: 'Nile Valley · ~3200 BCE',
    category: 'Script',
    era: '~3200 BCE – 394 CE',
    location: 'Egypt',
    confidence: 'VERIFIED',
    symbol: '𓂀',
    summary:
      'Sacred carvings — "the words of the gods." Logographic, syllabic, and alphabetic all at once. Champollion cracked them with the Rosetta Stone in 1822. The Eye of Horus (𓂀) encodes the six fractions of grain measurement, and possibly a cross-section of the human pineal gland.',
    origin:
      'Hieroglyphs appear suddenly in nearly fully formed state on the Narmer Palette (~3100 BCE). Unlike Sumerian cuneiform, which we can watch evolve from pictographs, Egyptian script seems to step on stage already mature — a fact ancient-astronaut researchers cite and mainstream Egyptologists explain via lost transitional materials on perishable papyrus.\n\nThe Eye of Horus (Wedjat) is one of the most copied symbols in human history. Its components correspond to the fractions 1/2, 1/4, 1/8, 1/16, 1/32, 1/64 — used to measure grain rations. In the 1990s, neuroanatomist Andrew Gosline and others noted that overlaying the eye on a sagittal MRI of the human brain aligns the markings with the thalamus, hypothalamus, and pineal gland — the so-called "third eye."',
    keyEvents: [
      '~3100 BCE: Narmer Palette — earliest formal hieroglyphs.',
      '196 BCE: Rosetta Stone trilingual decree carved.',
      '394 CE: Last dated hieroglyphic inscription at Philae.',
      '1799: Rosetta Stone discovered by Napoleon\'s engineers.',
      '1822: Champollion decipherment letter to Académie.',
    ],
    evidence: [
      'Rosetta Stone (British Museum, EA24).',
      'Pyramid Texts of Unas — oldest religious writings on Earth.',
      'Dendera Light reliefs — debated as either lotus-and-snake symbolism or a Crookes-tube electrical apparatus.',
      'Abydos "helicopter" hieroglyphs — palimpsest of overlapping carvings re-read by some as modern aircraft.',
    ],
    skepticalView:
      'The Abydos glyphs are demonstrably a recarving over earlier text — the apparent "helicopter" is the overlap of two unrelated phrases. The Dendera reliefs match Egyptian iconography of the djed pillar and lotus. The Eye of Horus / pineal overlay is a modern coincidence, not Egyptian intent.',
    sources: [
      { label: 'British Museum — Rosetta Stone', url: 'https://www.britishmuseum.org/collection/object/Y_EA24' },
      { label: 'Pyramid Texts (Unas) — Allen translation', url: 'https://oi.uchicago.edu/research/publications/saoc/saoc-23-pyramid-texts-unas' },
    ],
  },
  {
    id: 'voynich-manuscript',
    title: 'Voynich Manuscript',
    subtitle: 'Vellum codex · early 1400s',
    category: 'Undeciphered',
    era: 'Carbon-dated 1404-1438 CE',
    location: 'Yale Beinecke Library, MS 408',
    confidence: 'DEBATED',
    symbol: '✒︎',
    summary:
      '240 pages of unknown script, illustrated with impossible plants, nude bathing women in green pools connected by tubing, and a foldout astronomical chart of unrecognizable constellations. A century of cryptographers — including WWII codebreakers — have failed to decode a single confirmed word.',
    origin:
      'The manuscript surfaced in 1912 when book dealer Wilfrid Voynich purchased it from the Jesuit Villa Mondragone in Italy. Carbon-14 dating in 2009 fixed the vellum to 1404-1438. The script — dubbed "Voynichese" — uses ~25-30 unique glyphs in patterns that pass statistical tests for natural language (Zipf\'s law, word-length distribution) but resist matching to any known tongue.\n\nProposals have included: a hoax by Voynich himself (refuted by C-14), a constructed language by 13th-century Roger Bacon, an early-modern alchemical cipher, a glossolalic text by a single anomic-aphasia author (Gerry Kennedy), and Turkish written in custom phonetics (Ahmet Ardıç, 2018). In 2019 University of Bristol\'s Gerard Cheshire claimed it was proto-Romance — a claim quickly rejected by medievalists.',
    keyEvents: [
      '1404-1438: Vellum produced (C-14 confirmed).',
      '1639: Earliest documented owner — Georg Baresch in Prague.',
      '1666: Sent to Athanasius Kircher for decipherment — failed.',
      '1912: Wilfrid Voynich purchases the manuscript.',
      '1944-45: WWII codebreakers (incl. William Friedman) attempt decipherment.',
      '2009: Yale C-14 dating published.',
    ],
    evidence: [
      'High-resolution scans freely available via Beinecke Digital Library.',
      'Statistical analyses (Reddy & Knight 2011) confirm language-like entropy.',
      'Botanical illustrations include some New World plants (sunflower, Capsicum) — anomalous for pre-1492 Europe if confirmed.',
    ],
    skepticalView:
      'Linguist Andrew Caplan argues the text may be a genuine but meaningless cipher generated by table-based pseudo-random methods — explaining why it passes some statistical tests but yields no semantics.',
    videos: [
      { id: '4qb5d6Wb6tw', title: 'The Voynich Manuscript Explained', channel: 'Atlas Pro' },
    ],
    sources: [
      { label: 'Yale Beinecke MS 408 — Full Digital Scan', url: 'https://collections.library.yale.edu/catalog/2002046' },
      { label: 'Reddy & Knight — Statistical Analysis (2011)', url: 'https://aclanthology.org/W11-2913/' },
    ],
  },
  {
    id: 'linear-a',
    title: 'Linear A',
    subtitle: 'Minoan Crete · ~1800-1450 BCE',
    category: 'Undeciphered',
    era: 'Middle / Late Minoan',
    location: 'Knossos, Phaistos, Hagia Triada',
    confidence: 'VERIFIED',
    symbol: '𐘀',
    summary:
      'The script of Bronze Age Crete. We can read its sounds — Linear B (its descendant) was cracked by Michael Ventris in 1952 — but the underlying Minoan language remains unidentified. ~1,400 inscriptions exist; almost all are accounting tablets and short religious dedications.',
    origin:
      'Linear A appears on clay tablets across Minoan Crete during the height of the palace civilization. When Mycenaean Greeks took Knossos around 1450 BCE, they adapted the script to write Greek — that adaptation is Linear B, deciphered in 1952. Applying the Linear B sound values to Linear A produces phonetically pronounceable but linguistically unrecognized text.\n\nProposed affiliations include Anatolian Luwian, a pre-Greek "Eteocretan", Indo-Iranian, and even Etruscan-related. None command consensus. The Phaistos Disc (~1700 BCE), discovered in 1908, is a related-but-separate puzzle — 241 tokens stamped from 45 unique pictographic signs in a spiral, the oldest known example of movable-type printing.',
    keyEvents: [
      '~1800 BCE: First Linear A tablets.',
      '~1450 BCE: Mycenaean conquest; Linear B emerges.',
      '1908: Phaistos Disc discovered by Luigi Pernier.',
      '1952: Ventris & Chadwick decipher Linear B as Greek.',
      '2024: Brent Davis (U. Melbourne) statistical work narrows Linear A toward an Anatolian-family substrate.',
    ],
    evidence: [
      'Hagia Triada tablet HT 31 — wine accounting.',
      'Phaistos Disc — Heraklion Archaeological Museum AE 1358.',
      'Inscribed gold pin from Mavro Spelio — possible religious formula.',
    ],
    skepticalView:
      'The mainstream view is that Linear A is the script of an extinct, isolated language — no aliens required. The "Phaistos Disc as alien artifact" theory ignores its likely Anatolian (Lydian) parallels.',
    sources: [
      { label: 'SigLA — Signs of Linear A Database', url: 'https://sigla.phis.me/' },
    ],
  },
  {
    id: 'indus-script',
    title: 'Indus Script',
    subtitle: 'Harappan civilization · ~2600-1900 BCE',
    category: 'Undeciphered',
    era: 'Mature Harappan',
    location: 'Indus Valley (Pakistan, NW India)',
    confidence: 'DEBATED',
    symbol: '✶',
    summary:
      'Found on ~5,500 stamp seals, pottery, and tablets across the Indus Valley civilization — a metropolis culture that built planned cities with covered sewage 2,500 years before Rome. The script averages just 5 signs per inscription. Some scholars argue this is too short to be a true language at all.',
    origin:
      'The Indus Valley civilization (Harappan) flourished from roughly 2600 BCE across modern Pakistan and northwest India, with cities like Mohenjo-daro and Harappa featuring grid streets, standardized brick sizes, and sophisticated drainage. Their writing — ~417 unique signs, written right-to-left, often topped with a "unicorn" emblem — has resisted decipherment for over a century.\n\nThe central debate is whether Indus signs encode actual language at all. In 2004, Steve Farmer, Richard Sproat, and Michael Witzel argued the inscriptions are too short and too sign-rich to represent speech, suggesting instead they\'re non-linguistic emblems (clan or trade marks). Asko Parpola and computational linguist Rajesh Rao countered with statistical work showing Zipfian distributions consistent with natural language. The matter remains unresolved.',
    keyEvents: [
      '~2600 BCE: Mature Harappan phase begins.',
      '~1900 BCE: Civilization declines; script falls out of use.',
      '1875: Alexander Cunningham publishes first Indus seal.',
      '2004: Farmer/Sproat/Witzel "non-linguistic" paper.',
      '2009: Rao et al. statistical rebuttal in Science.',
    ],
    evidence: [
      '~5,500 catalogued inscriptions in the EBIH database.',
      'Dholavira "signboard" — ten large signs above a city gate.',
      'Mesopotamian seals found in Indus context (and vice versa) — showing Bronze Age trade contact.',
    ],
    skepticalView:
      'Even if the script is linguistic, no bilingual "Rosetta" has been found. Without one, decipherment may be impossible regardless of which side of the debate is correct.',
    sources: [
      { label: 'Mahadevan Concordance (1977)', url: 'https://www.harappa.com/script/maha0.html' },
      { label: 'Rao et al. — Science (2009)', url: 'https://www.science.org/doi/10.1126/science.1170391' },
    ],
  },
  {
    id: 'rongorongo',
    title: 'Rongorongo',
    subtitle: 'Rapa Nui · pre-1864',
    category: 'Undeciphered',
    era: 'Pre-contact / early colonial',
    location: 'Easter Island',
    confidence: 'DEBATED',
    symbol: '𓆉',
    summary:
      'The only indigenous script in all of pre-colonial Oceania. ~25 surviving wooden tablets carved with thousands of pictographic glyphs that read in reverse-boustrophedon — every other line flipped upside-down. By the time linguists arrived, every Rapa Nui who could read the tablets had died of slave-raiding and disease.',
    origin:
      'When Father Eugène Eyraud arrived on Easter Island in 1864, he reported wooden tablets in nearly every house, covered in carved figures of birds, fish, plants, and humans. By the 1870s, Peruvian slave raids and smallpox had killed or removed most of the population — including the rongorongo readers. Bishop Tepano Jaussen of Tahiti collected several tablets in 1869 and recorded one elder, Metoro Tau\'a Ure, "reading" them — but his readings turned out to be descriptive, not literal.\n\nThe tablets are read in reverse-boustrophedon: left-to-right on one line, then the tablet is rotated 180° for the next line. Steven Fischer claimed a partial decipherment in 1995 (creation chants), Konstantin Pozdniakov has analyzed sign frequency, but no consensus reading exists. ~25 authentic tablets survive, scattered in museums from Santiago to Honolulu.',
    keyEvents: [
      'Pre-1864: Tablets in domestic use.',
      '1862-63: Peruvian slave raids decimate Rapa Nui population.',
      '1864: Father Eyraud reports the tablets.',
      '1869: Bishop Jaussen collects the first museum specimens.',
      '1995: Steven Fischer claims partial decipherment of Tablet I (Santiago Staff).',
    ],
    evidence: [
      '25 verified tablets — including the Santiago Staff (the longest, ~2,300 glyphs).',
      'Jaussen "list" — 19th-century glyph identifications, of disputed accuracy.',
      'Pozdniakov sign-frequency analysis showing repeated formulaic structures.',
    ],
    skepticalView:
      'Some researchers argue rongorongo may be a proto-writing or mnemonic system rather than full speech-encoding writing — which would explain why no Rosetta-style breakthrough has occurred.',
    sources: [
      { label: 'Rongorongo.org — Corpus & analysis', url: 'http://rongorongo.org/' },
    ],
  },
  {
    id: 'wandjina',
    title: 'Wandjina Rock Art',
    subtitle: 'Kimberley, Australia · ~4000 BCE',
    category: 'Pictograph',
    era: 'Holocene — possibly older',
    location: 'Kimberley region, Western Australia',
    confidence: 'REPORTED',
    symbol: '◉',
    summary:
      'Aboriginal sky-being depictions painted across hundreds of rock shelters in the Kimberley. Large white faces with massive black eyes, halos around the head, and — uniquely — no mouth. Aboriginal elders state the Wandjina came from the sky, created the land, and forbade depicting them with mouths because their voice was too powerful.',
    origin:
      'Wandjina ("cloud and rain spirits" in the Worora language) are depicted across the Kimberley in galleries at Raft Point, Munurru, and the Mowanjum lands. The figures share a remarkably consistent style — white-painted faces, no mouths, large dark eyes, and a halo of "feathers" or rays around the head. Worora, Ngarinyin, and Wunambal traditional owners maintain the Wandjina are creator beings who descended from the sky during the Lalai (creation period) and are still present in springs and storm clouds.\n\nThe paintings are repainted ritually — when an elder refreshes them, the act is said to regenerate the rains. Australian rock-art researcher Grahame Walsh dated some Wandjina images to ~4,000 years old, with underlying Bradshaw / Gwion Gwion figures possibly 17,000+ years old. Erich von Däniken cited Wandjina iconography in "Chariots of the Gods" as ancient depictions of helmeted spacefarers.',
    keyEvents: [
      '~4000 BCE: Earliest C-14 estimates for Wandjina layer.',
      '1838: George Grey expedition publishes the first European descriptions.',
      '1968: Erich von Däniken includes Wandjina in "Chariots of the Gods".',
      '2010: Worora elders successfully prosecute artist Vesna Tenodi for unauthorized Wandjina-style work — affirming continued cultural ownership.',
    ],
    evidence: [
      'Hundreds of documented galleries across Kimberley.',
      'Direct C-14 dating of overlying mud-wasp nests.',
      'Continuous oral tradition with present-day traditional owners.',
    ],
    skepticalView:
      'Anthropologists view Wandjina as straightforwardly indigenous spirit iconography — the lack of mouth and halo are stylistic conventions, not depictions of helmets or face-shields.',
    sources: [
      { label: 'AIATSIS — Wandjina cultural background', url: 'https://aiatsis.gov.au/' },
    ],
  },
  {
    id: 'dogon-sirius',
    title: 'Dogon Sirius Knowledge',
    subtitle: 'Mali, West Africa · pre-1500 CE',
    category: 'Cosmology',
    era: 'Oral tradition, recorded 1930s',
    location: 'Bandiagara Escarpment, Mali',
    confidence: 'DEBATED',
    symbol: '◎',
    summary:
      'The Dogon people of Mali allegedly possessed pre-telescope knowledge of Sirius B — an invisible white-dwarf companion to Sirius A confirmed by astronomers only in 1862. Their tradition attributes this knowledge to the Nommo, amphibious teachers who descended from the sky in a ship of fire and water.',
    origin:
      'French anthropologists Marcel Griaule and Germaine Dieterlen lived among the Dogon from 1931 to 1956. Their book "Le Renard pâle" (1965) recorded a complex Dogon cosmology naming "Po Tolo" (the Digitaria star) — invisible, extremely heavy, orbiting Sirius every 50 years. Sirius B has a 50.1-year orbit, was first telescopically resolved in 1862 by Alvan Graham Clark, and identified as a white dwarf in 1915.\n\nThe Dogon attribute this and other knowledge — including a third Sirius companion ("Emme Ya") and Saturn\'s rings — to the Nommo, fish-tailed beings who came down in a craft "of fire and water" and taught humanity. Carl Sagan and astronomer Ian Ridpath argued in the 1970s that European missionaries or visitors had transmitted the Sirius B information before Griaule\'s arrival. Robert Temple\'s "The Sirius Mystery" (1976) defended the original anomalistic interpretation.',
    keyEvents: [
      '1862: Alvan Graham Clark first resolves Sirius B telescopically.',
      '1931-56: Griaule & Dieterlen ethnography among the Dogon.',
      '1965: "Le Renard pâle" published.',
      '1976: Robert Temple — "The Sirius Mystery".',
      '1991: Walter van Beek revisit; reports modern Dogon do not recognize Griaule\'s account.',
    ],
    evidence: [
      'Griaule field notes, Musée du Quai Branly archives.',
      'Dogon ritual sand drawings showing Sirius system.',
      'Recorded interviews with Ogotemmêli (Griaule\'s primary informant).',
    ],
    skepticalView:
      'Anthropologist Walter van Beek\'s 1991 fieldwork found that contemporary Dogon priests did not recognize the cosmology Griaule described — suggesting Griaule may have inadvertently shaped or co-authored the account through leading questions.',
    sources: [
      { label: 'Temple, "The Sirius Mystery" (1976)', url: 'https://www.robert-temple.com/' },
      { label: 'van Beek (1991), Current Anthropology', url: 'https://www.journals.uchicago.edu/doi/10.1086/203939' },
    ],
  },
  {
    id: 'nazca-lines',
    title: 'Nazca Lines',
    subtitle: 'Peruvian coastal desert · 500 BCE – 500 CE',
    category: 'Geoglyph',
    era: 'Paracas / Nazca cultures',
    location: 'Nazca Desert, Peru',
    confidence: 'VERIFIED',
    symbol: '🐒',
    summary:
      'Hundreds of geoglyphs — some over 370 m wide — etched into the Peruvian desert by removing dark surface stones to reveal lighter ground. Most are only legible from the air. The "Astronaut" figure, with goggle-eyes and raised hand, has become an icon of the ancient-astronaut argument.',
    origin:
      'The Nazca Lines were brought to global attention by archaeologist Paul Kosok in 1939, who realized they aligned with solstices. German mathematician Maria Reiche spent 50 years (1940-1998) cataloging and protecting them. The lines were created by the Paracas (~500 BCE) and Nazca (~200 BCE-500 CE) cultures, removing the iron-oxidized surface pebbles to expose lighter soil beneath.\n\nDesigns include a 285m hummingbird, 180m monkey with a spiral tail, a spider, and the famous 32m "Astronaut" or "Owl-Man" on a hillside. In 2014 and again in 2022-2024, Yamagata University in Japan used satellite and AI analysis to discover an additional 300+ previously-unknown figures. Erich von Däniken proposed the long straight runways were landing strips for ancient craft; archaeologists interpret them as ceremonial pilgrimage paths and astronomical alignments.',
    keyEvents: [
      '~500 BCE – 500 CE: Lines created.',
      '1939: Paul Kosok recognizes solstice alignments.',
      '1940-98: Maria Reiche catalogs and protects the site.',
      '1968: Erich von Däniken — "Chariots of the Gods" landing-strip theory.',
      '2022-24: Yamagata U. + IBM AI uncovers 303 new geoglyphs.',
    ],
    evidence: [
      'UNESCO World Heritage Site since 1994.',
      'Yamagata University AI-discovery papers (2022-24).',
      'Reiche\'s 1949 book "Mystery on the Desert".',
    ],
    skepticalView:
      'Joe Nickell demonstrated in 1982 that small teams could replicate the lines in days using only ropes and stakes. The "landing strip" interpretation ignores that the soft sandy soil could not support landing aircraft.',
    videos: [
      { id: 'GBoz5y6m_2g', title: 'Nazca Lines — New Discoveries', channel: 'Smithsonian Channel' },
    ],
    sources: [
      { label: 'Yamagata U. Nasca Institute', url: 'https://www-yu-naskaproject.com/' },
    ],
  },
  {
    id: 'flower-of-life',
    title: 'Flower of Life',
    subtitle: 'Cross-cultural · attested ~600 BCE',
    category: 'Sacred Geometry',
    era: 'Earliest secure: Osirion temple, Egypt',
    location: 'Multi-site (Egypt, China, Israel, Italy)',
    confidence: 'REPORTED',
    symbol: '✿',
    summary:
      'Nineteen overlapping circles in hexagonal lattice, found burned (not carved) into the granite walls of the Osirion at Abydos, Egypt — and recurring across cultures with no apparent common origin. The pattern encodes the Platonic solids and the geometry of biological cell division.',
    origin:
      'The Flower of Life pattern appears at the Osirion (a granite temple behind Seti I\'s mortuary at Abydos), at the Forbidden City lions in Beijing, at Capernaum synagogue in Israel, and in Leonardo da Vinci\'s notebooks. The Osirion examples are particularly striking — the marks appear scorched into the stone surface using an unknown process, and were not part of the original temple construction.\n\nMathematically, the pattern contains within it the seed of all five Platonic solids and the Vesica Piscis. Drunvalo Melchizedek\'s "The Ancient Secret of the Flower of Life" (1999) popularized it as a sacred-geometry blueprint underlying matter itself. Mainstream archaeologists view the Osirion examples as Roman or later Coptic graffiti, possibly applied with hot metal templates.',
    keyEvents: [
      '~1300 BCE: Osirion temple constructed.',
      '~600 BCE – 300 CE: Likely date range for the Osirion markings (graffiti period).',
      '1999: Melchizedek publishes Volume 1 of "Flower of Life".',
    ],
    evidence: [
      'Osirion granite wall photographs (multiple researchers).',
      'Capernaum synagogue stone — verified Roman period.',
      'Leonardo da Vinci notebooks (Codex Atlanticus folios with the same pattern).',
    ],
    skepticalView:
      'Egyptologists attribute the Osirion marks to Roman or Byzantine-era visitors using burning oil or heated bronze templates — a known graffiti technique. The "sacred geometry" interpretation is a 20th-century overlay, not an ancient one.',
    sources: [
      { label: 'Osirion temple background', url: 'https://www.britannica.com/topic/Osireion' },
    ],
  },
  {
    id: 'crop-circles',
    title: 'Crop Circle Glyphs',
    subtitle: 'Modern phenomenon · 1976 – present',
    category: 'Modern',
    era: '1976 – present',
    location: 'Wiltshire, UK (epicenter)',
    confidence: 'DEBATED',
    symbol: '🌀',
    summary:
      'Thousands of geometric formations have appeared overnight in cropfields since the late 1970s, peaking around Stonehenge and Avebury. While Doug Bower and Dave Chorley confessed in 1991 to creating early circles with planks, dozens of formations show nodal expulsion cavities, magnetized soil iron, and mathematical encoding (Julia sets, Fibonacci, binary ASCII) that hoaxers have not replicated under controlled conditions.',
    origin:
      'The first widely-publicized circle appeared in 1976 in Wiltshire. By the 1990s the formations had grown into multi-hundred-meter geometrical compositions. Biophysicist W. C. Levengood (Burke et al., 1999, Physiologia Plantarum) published peer-reviewed analyses showing that plants from formations exhibited "expulsion cavities" — small holes blown through the nodal walls consistent with rapid internal heating from microwave-frequency radiation, distinguishable from mechanically-flattened plants.\n\nThe 2002 Crabwood formation depicted a "grey alien" holding a disc encoded with binary ASCII reading "Beware the bearers of FALSE gifts & their BROKEN PROMISES." Mathematician Gerald Hawkins, formerly of Boston U., catalogued multiple formations encoding novel Euclidean theorems not previously published. Most field researchers acknowledge a mixture of human-made and "anomalous" formations.',
    keyEvents: [
      '1976: First Wiltshire circle reported.',
      '1991: Doug Bower & Dave Chorley confess to plank-and-rope creation.',
      '1996: Julia Set formation appears beside Stonehenge in ~30 minutes (multiple witnesses).',
      '1999: BLT Research / Levengood paper in Physiologia Plantarum.',
      '2002: Crabwood ASCII binary formation.',
    ],
    evidence: [
      'BLT Research peer-reviewed plant analyses.',
      'Magnetic-iron soil residue measurements.',
      'Aerial photograph archives (CropCircleConnector).',
    ],
    skepticalView:
      'Skeptics including Joe Nickell argue all formations are man-made, the Bower/Chorley confession set off an art movement (Circlemakers), and apparent "anomalies" arise from confirmation bias on cherry-picked samples.',
    sources: [
      { label: 'BLT Research Team', url: 'https://www.bltresearch.com/' },
      { label: 'Crop Circle Connector archive', url: 'https://www.cropcircleconnector.com/' },
    ],
  },
  {
    id: 'phaistos-disc',
    title: 'Phaistos Disc',
    subtitle: 'Minoan Crete · ~1700 BCE',
    category: 'Undeciphered',
    era: 'Middle Minoan III',
    location: 'Heraklion Archaeological Museum',
    confidence: 'VERIFIED',
    symbol: '⊙',
    summary:
      'A 16cm clay disc discovered in 1908 at the palace of Phaistos. 241 tokens stamped from 45 unique pictographic seals into a spiral on both sides — making it the oldest known example of movable-type printing, more than 2,500 years before Gutenberg. Completely undeciphered.',
    origin:
      'Italian archaeologist Luigi Pernier discovered the disc in 1908 in a basement room of the main Minoan palace at Phaistos. Each of the 45 unique signs was pressed into the wet clay using a pre-made stamp — the same sign appears identically across the disc, proving stamps not freehand carving. The signs include human figures, animals, plants, tools, and a rosette.\n\nNo other artifact bearing the same script has ever been found, which makes decipherment essentially impossible without a Rosetta. Proposed readings range from a hymn to the goddess to a calendar, a board-game record, and a Lydian-related Anatolian text. In 2014 a "decipherment" by Gareth Owens at TEI of Crete claimed the disc was a hymn to a Minoan mother goddess; the claim is not accepted academically.',
    keyEvents: [
      '~1700 BCE: Disc manufactured.',
      '1908: Discovered by Luigi Pernier at Phaistos.',
      '2014: Owens & Coleman partial-reading claim.',
    ],
    evidence: [
      'Heraklion Archaeological Museum AE 1358.',
      'High-resolution photographs and 3D scans publicly available.',
    ],
    skepticalView:
      'A small number of scholars (Jerome Eisenberg, 2008) have argued the disc is a 1908 forgery; most archaeologists reject the forgery hypothesis but accept that the script is undecipherable without parallel inscriptions.',
    sources: [
      { label: 'Heraklion Museum — Phaistos Disc', url: 'https://heraklionmuseum.gr/en/' },
    ],
  },
];

export const glyphsCategories = [
  'All',
  'Script',
  'Undeciphered',
  'Pictograph',
  'Cosmology',
  'Geoglyph',
  'Sacred Geometry',
  'Modern',
];
