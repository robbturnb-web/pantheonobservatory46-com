import type { DossierEntry } from '@/components/dossier/types';

/**
 * CERN Watch — Particle collider control room.
 * Catalogs the experiments, anomalies, and conspiracies that orbit
 * the Large Hadron Collider and its parent organization.
 */
export const cernEntries: DossierEntry[] = [
  {
    id: 'higgs-discovery',
    title: 'Higgs Boson Discovery',
    subtitle: 'ATLAS + CMS detectors · July 4, 2012',
    category: 'Discovery',
    era: '2012',
    location: 'LHC, Geneva',
    confidence: 'VERIFIED',
    symbol: '⚛︎',
    summary:
      'The capstone of the Standard Model. Predicted in 1964 by Peter Higgs, François Englert, and Robert Brout, the Higgs boson was confirmed at 5-sigma significance by both the ATLAS and CMS detectors at 125 GeV/c² on July 4, 2012. It is the particle whose field gives mass to all other particles.',
    origin:
      'In 1964, six physicists in three independent papers (PRL 13) proposed a mechanism by which gauge bosons could acquire mass — the Brout-Englert-Higgs mechanism. The mechanism predicted a new fundamental scalar particle. Finding it required the Large Hadron Collider, a 27-km circular accelerator built across the French-Swiss border at a cost of $4.75 billion, operating at 7 TeV per beam at the time of discovery.\n\nOn July 4, 2012, both the ATLAS and CMS collaborations independently announced detection of a new boson at 125.10 ± 0.14 GeV/c² with the predicted spin and parity. Higgs and Englert received the 2013 Nobel Prize. Subsequent measurements have confirmed the boson\'s couplings match Standard Model predictions to within experimental uncertainty — closing the Standard Model but offering no immediate hint at physics beyond it.',
    keyEvents: [
      '1964: Brout-Englert-Higgs papers published.',
      '1981: First proposal for the LHC.',
      '2008: LHC first beam circulates (and immediately suffers magnet quench).',
      '2010: First 7 TeV collisions.',
      'July 4 2012: Higgs discovery announced.',
      '2013: Higgs & Englert win Nobel Prize.',
    ],
    evidence: [
      'ATLAS + CMS combined 5-sigma (later 7-sigma) excess at 125 GeV.',
      'Decay channels (γγ, ZZ → 4ℓ, WW → ℓνℓν) all consistent with Standard Model predictions.',
    ],
    skepticalView:
      'No skeptical position remains within physics — the discovery is among the most rigorously confirmed in particle physics history.',
    sources: [
      { label: 'CERN — Higgs Discovery Press Page', url: 'https://home.cern/science/physics/higgs-boson' },
    ],
  },
  {
    id: 'antimatter-asymmetry',
    title: 'Antimatter Asymmetry',
    subtitle: 'LHCb experiment · 2010 – present',
    category: 'Anomaly',
    era: 'Ongoing',
    location: 'LHC, Geneva',
    confidence: 'VERIFIED',
    symbol: '∂',
    summary:
      'The Big Bang should have produced equal amounts of matter and antimatter, which would have annihilated to leave a universe of pure radiation. Instead, matter dominates by 1 part in 10⁹. CERN\'s LHCb experiment is dedicated to measuring CP-violation — the small asymmetry that explains why we exist.',
    origin:
      'In 1967, Andrei Sakharov outlined three conditions necessary for the matter-antimatter asymmetry of the universe (the "Sakharov conditions"): baryon-number violation, C and CP symmetry violation, and departure from thermal equilibrium. The Standard Model includes CP violation in the quark sector via the CKM matrix, but quantitatively this is too weak by ~10⁹ to explain the observed asymmetry.\n\nLHCb (Large Hadron Collider beauty experiment) has measured CP violation in B-meson decays since 2011, including the first observation of CP violation in charm-meson decays in 2019 (a 5.3-sigma result in D⁰ → K⁺K⁻ and π⁺π⁻ decays). All measurements remain consistent with the Standard Model — meaning we still cannot explain the matter universe.',
    keyEvents: [
      '1967: Sakharov conditions proposed.',
      '1964: First CP violation observed in K-meson decays (Cronin & Fitch).',
      '2011: LHCb observes CP violation in B mesons.',
      '2019: LHCb observes CP violation in D mesons (charm sector).',
    ],
    evidence: [
      'LHCb measurements consistent with Standard Model predictions.',
      'Observed cosmic baryon-to-photon ratio of ~6 × 10⁻¹⁰.',
    ],
    skepticalView:
      'There is no mystery in the data — the mystery is theoretical: the Standard Model\'s CP violation is too small to explain the observed cosmic asymmetry by ~9 orders of magnitude.',
    sources: [
      { label: 'LHCb Collaboration', url: 'https://lhcb-public.web.cern.ch/' },
    ],
  },
  {
    id: 'mandela-effect',
    title: 'Mandela Effect Hypothesis',
    subtitle: 'Pop-culture conspiracy · 2010s – present',
    category: 'Conspiracy',
    era: 'Post-2008',
    location: 'Internet folklore',
    confidence: 'ALLEGED',
    symbol: '🌀',
    summary:
      'A persistent online theory that LHC operations have shifted the universe into a parallel reality, evidenced by collective false memories: Nelson Mandela dying in prison in the 1980s (he died in 2013), the "Berenstein/Berenstain Bears" spelling, and the "Sinbad genie movie" that never existed. CERN officially denies any reality-altering side effects.',
    origin:
      'Paranormal researcher Fiona Broome coined "Mandela Effect" around 2009 after discovering that many people, including herself, vividly remembered Nelson Mandela dying in prison in the 1980s. Mandela actually died in 2013. Other commonly cited examples: the Bears\' name being "Berenstein" not "Berenstain"; "Looney Toons" instead of "Looney Tunes"; a 1990s Sinbad genie comedy ("Shazaam") that has never been documented.\n\nThe theory gained momentum around the time the LHC began full-energy operations (2010-2012). Conspiracy proponents argue CERN has either opened an interdimensional portal, summoned an entity (frequent claims point to the Shiva statue at CERN HQ), or shifted the timeline. Mainstream cognitive science (Wilma Bainbridge, Univ of Chicago, 2022) attributes the phenomenon to "visual schema" — collective memories that converge on plausible-but-wrong details due to similar prior knowledge structures.',
    keyEvents: [
      '2008: LHC first activated.',
      '2009: Fiona Broome coins "Mandela Effect".',
      '2010: First 7 TeV collisions.',
      '2013: Nelson Mandela actually dies.',
      '2022: Bainbridge "visual Mandela effect" paper published.',
    ],
    evidence: [
      'Reproducible false-memory studies (Bainbridge 2022).',
      'Internet survey data showing widespread agreement on specific false memories.',
      'CERN public statements explicitly denying reality-altering experiments.',
    ],
    skepticalView:
      'Cognitive science fully explains the phenomenon as memory schema convergence. No physical mechanism connects LHC operations to memory of historical events. The theory survives because the false memories themselves are real — the misattribution is what\'s incorrect.',
    sources: [
      { label: 'Bainbridge 2022 — Visual Mandela Effect', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0010027722000865' },
    ],
  },
  {
    id: 'shiva-statue',
    title: 'Shiva Nataraja Statue',
    subtitle: 'CERN main campus · gifted 2004',
    category: 'Symbol',
    era: '2004 – present',
    location: 'CERN, Meyrin, Switzerland',
    confidence: 'VERIFIED',
    symbol: '🕉',
    summary:
      'A 2m bronze statue of Shiva performing the Tandava cosmic dance, installed at CERN\'s main entrance in 2004 — a gift from the Indian government commemorating CERN-India scientific collaboration. The statue\'s presence has fueled conspiracy theories that CERN engages in occult ritual to its "destroyer god".',
    origin:
      'In June 2004, the Indian government formally gifted CERN a 2m bronze Nataraja sculpture — a Chola-era depiction of Shiva as the cosmic dancer who simultaneously creates and destroys the universe. The gift commemorated India becoming an Observer State at CERN. Physicist Fritjof Capra had drawn the parallel between Shiva\'s dance and subatomic particle interactions in his 1975 book "The Tao of Physics" — the gift was inspired by that connection.\n\nThe statue stands outside Building 39 with a bronze plaque quoting Capra. In 2016, a viral video purporting to show a CERN "human sacrifice" ritual at the statue spread widely online; CERN confirmed the video was a staged prank by employees and reported the matter to Geneva authorities. The conspiracy persists in fringe communities, often linked with the Mandela Effect and CERN-portal theories.',
    keyEvents: [
      '1975: Capra publishes "The Tao of Physics".',
      'June 18 2004: Statue formally unveiled at CERN.',
      'August 2016: Staged "sacrifice" prank video goes viral; CERN issues statement.',
    ],
    evidence: [
      'Public statue at CERN main campus.',
      'Indian Ministry of External Affairs gift records.',
      'CERN press release on the 2016 prank video.',
    ],
    skepticalView:
      'The statue is a diplomatic gift with documented scientific symbolism. The 2016 viral video was an admitted prank. No evidence of any ritual practice exists.',
    sources: [
      { label: 'CERN Statement on Shiva statue', url: 'https://home.cern/about/who-we-are/our-history' },
    ],
  },
  {
    id: 'strangelet-fear',
    title: 'Strangelet & Black Hole Fears',
    subtitle: 'Pre-LHC startup · 2008',
    category: 'Conspiracy',
    era: '2008',
    location: 'CERN, Geneva',
    confidence: 'DEBATED',
    symbol: '⚫',
    summary:
      'Before LHC startup in 2008, lawsuits in Hawaii and Germany attempted to halt operations on the basis that high-energy collisions might create stable strangelets (hypothetical strange-quark matter) or microscopic black holes that would consume the Earth. Courts rejected the suits; CERN published a Safety Assessment Group report demonstrating cosmic-ray collisions of equal energy have occurred constantly throughout Earth\'s 4.5-billion-year history without incident.',
    origin:
      'In 2008, retired radiation safety officer Walter Wagner and Spanish science writer Luis Sancho filed suit in U.S. District Court (Hawaii) seeking an injunction against LHC startup. They argued the collider might produce: (1) microscopic black holes that, contrary to Hawking radiation theory, might not evaporate; (2) magnetic monopoles that could catalyze proton decay; (3) "strangelets" — stable agglomerations of strange quarks that could convert all ordinary matter into more strangelets in a runaway reaction.\n\nCERN\'s Safety Assessment Group published "Review of the Safety of LHC Collisions" in 2008. Its core argument: cosmic-ray protons routinely strike Earth\'s atmosphere with energies vastly exceeding LHC capabilities, and have done so for ~4.5 billion years. If LHC could destroy the Earth, cosmic rays would have done so eons ago. The court dismissed the lawsuit. The Hadron Collider has now operated for 16 years without incident.',
    keyEvents: [
      'March 2008: Wagner & Sancho file lawsuit.',
      'June 2008: CERN publishes Safety Assessment Group report.',
      'Sept 2008: U.S. court dismisses suit.',
      'Sept 10 2008: LHC first beam.',
      'Sept 19 2008: First major magnet quench (unrelated to safety concerns).',
    ],
    evidence: [
      'CERN LHC Safety Assessment Group report (2008).',
      'U.S. District Court Hawaii ruling.',
      '16+ years of safe LHC operation.',
    ],
    skepticalView:
      'The strangelet/black-hole concerns were theoretical possibilities rejected on solid physical grounds (cosmic-ray argument). The 16-year operational record is empirical confirmation.',
    sources: [
      { label: 'LHC Safety Assessment Group 2008', url: 'https://cds.cern.ch/record/1120625' },
    ],
  },
  {
    id: 'aleph-anomaly',
    title: 'AMS-02 Antimatter Excess',
    subtitle: 'ISS · 2011 – present',
    category: 'Anomaly',
    era: 'Ongoing',
    location: 'International Space Station',
    confidence: 'DEBATED',
    symbol: '∇',
    summary:
      'The Alpha Magnetic Spectrometer (AMS-02), a CERN-built detector mounted on the ISS, has recorded an unexpected excess of cosmic-ray positrons above 25 GeV — possibly evidence of dark matter annihilation, possibly emission from nearby pulsars, possibly something new. The anomaly has persisted across 13 years of data.',
    origin:
      'AMS-02 is a 7-tonne particle detector built by an international CERN-led collaboration and installed on the International Space Station by Space Shuttle Endeavour in May 2011. Its purpose: search for antimatter and dark matter signatures in cosmic rays. Lead investigator Samuel Ting (1976 Nobel laureate) reported in 2013 that the positron fraction (positrons / [positrons + electrons]) rises above the expected secondary-production background starting at ~10 GeV and continues rising past 25 GeV.\n\nProposed explanations: (1) annihilation of dark matter particles (favored interpretation if dark matter is a WIMP of mass 0.5-1 TeV); (2) nearby pulsars (Geminga, Monogem) accelerating positrons; (3) new astrophysics. As of 2024, the data still cannot distinguish among these hypotheses. Ting has stated repeatedly that AMS-02 will continue collecting data until ~2030 to resolve the question.',
    keyEvents: [
      'May 2011: AMS-02 installed on ISS.',
      '2013: First positron-fraction anomaly reported.',
      '2019: 8-year update — anomaly persists, statistics improved.',
      '2030: Projected mission end.',
    ],
    evidence: [
      'Positron fraction rising above background from ~10 GeV.',
      'Antiproton-to-proton ratio higher than predicted by secondary production alone.',
      'Possible structure in 50-500 GeV range (statistically marginal).',
    ],
    skepticalView:
      'The pulsar hypothesis can explain the anomaly without invoking new physics. The dark-matter interpretation requires fine-tuning and has been challenged by complementary direct-detection null results from XENON1T, LZ, and PandaX.',
    sources: [
      { label: 'AMS Collaboration', url: 'https://ams02.space/' },
    ],
  },
  {
    id: 'fcc-future',
    title: 'Future Circular Collider',
    subtitle: 'Proposed 91-km successor · feasibility 2025',
    category: 'Discovery',
    era: 'Planning phase',
    location: 'CERN, Geneva (proposed)',
    confidence: 'REPORTED',
    symbol: '⊚',
    summary:
      'A proposed 91-km ring under Lake Geneva, three times the LHC\'s circumference, that would reach 100 TeV collision energies — seven times the LHC. Estimated cost: €30 billion. Feasibility study delivers final report in 2025. If approved, first collisions could occur in the 2040s.',
    origin:
      'The Future Circular Collider (FCC) is CERN\'s proposed successor to the LHC. The 91-km tunnel would loop under Lake Geneva and the Jura mountains, dwarfing the existing 27-km LHC. Two phases are envisioned: FCC-ee (electron-positron collider) starting in the late 2040s for precision Higgs studies, followed by FCC-hh (proton-proton) reaching 100 TeV — energies sufficient to probe the unification of forces and the nature of dark matter.\n\nThe project has prompted public debate over cost (€30B), environmental impact (boring under Geneva), and scientific return (no guaranteed discovery beyond the Standard Model). Competing proposals include Japan\'s ILC (linear electron-positron collider, postponed indefinitely) and China\'s CEPC (Chinese counterpart to FCC-ee). The FCC feasibility study delivers its final report in 2025; CERN Council decides on construction in 2027-28.',
    keyEvents: [
      '2014: FCC study launched.',
      '2019: Conceptual Design Report published.',
      '2021-2025: Feasibility study.',
      '2027-28: Anticipated construction decision by CERN Council.',
      '~2045: Earliest possible FCC-ee operations.',
    ],
    evidence: [
      'CERN Conceptual Design Report (2019).',
      'Geological surveys completed for tunnel route.',
      'International Particle Physics Strategy Update (2020) endorses FCC as priority.',
    ],
    skepticalView:
      'Critics including Sabine Hossenfelder argue that with no specific theoretical prediction guiding the energy scale, building a more powerful collider is a €30B gamble that may produce no new physics. Defenders counter that all major precision Higgs measurements require FCC-class energies.',
    sources: [
      { label: 'CERN FCC Project', url: 'https://home.cern/science/accelerators/future-circular-collider' },
    ],
  },
];

export const cernCategories = [
  'All',
  'Discovery',
  'Anomaly',
  'Conspiracy',
  'Symbol',
];
