import type { DossierEntry } from '@/components/dossier/types';

/**
 * Entity Encounters — Witness interview transcript theme
 * Deeply documented humanoid / cryptid / non-human encounter cases.
 * Each entry leans on the strongest extant witness corpus, contemporaneous
 * news coverage, and the major skeptical counter-explanations.
 */
export const entityEncounterEntries: DossierEntry[] = [
  {
    id: 'pascagoula-1973',
    title: 'Pascagoula Abduction',
    subtitle: 'Hickson & Parker · Mississippi riverbank',
    category: 'Close Encounter — CE-IV',
    era: 'October 11, 1973',
    location: 'Pascagoula, Mississippi (Pascagoula River)',
    confidence: 'VERIFIED',
    symbol: '🎣',
    summary:
      "Two shipyard workers, Charles Hickson (42) and Calvin Parker (19), reported being floated aboard an oval craft by three robotic 'crab-claw' entities while night-fishing. Sheriff Diamond and Capt. Ryder secretly recorded their conversation in a holding cell — the unscripted dialogue, full of terror and confusion, became one of the strongest behavioral pieces of evidence in abduction literature.",
    origin:
      "On the evening of October 11, 1973, Hickson and Parker were fishing from an old shipyard pier on the west bank of the Pascagoula River. They reported a blue-grey, football-shaped craft about 30 feet long descending nearby with a pulsating glow. Three approximately five-foot-tall beings with grey, wrinkled skin, slits for eyes, and pincer-like 'crab claws' floated from the craft and carried both men aboard, where they were examined by a free-floating eye-like instrument.\n\nThe men reported the encounter to Keesler Air Force Base, which referred them to the Jackson County Sheriff's Office. Sheriff Fred Diamond and Capt. Glen Ryder, certain the men were running a hoax, left them alone in an interrogation room with a hidden tape recorder. The recording — released decades later — caught Hickson and Parker, alone and distraught, repeating the story to each other in shock. Parker can be heard saying he hopes 'they don't come back' and asking God for help. The recording is widely cited by even skeptical investigators as inconsistent with a fabrication.\n\nDr. J. Allen Hynek (then transitioning out of Project Blue Book) interviewed both men and concluded they were 'absolutely sincere'. Parker stayed silent for forty years before publishing 'Pascagoula — The Closest Encounter' in 2018; corroborating witness Maria Blair came forward in 2019 with a contemporaneous account from across the river.",
    keyEvents: [
      'Oct 11, 1973 ~ 9:00 PM: Encounter on the Pascagoula riverbank.',
      'Same night: Hickson & Parker drive directly to Keesler AFB, then sheriff.',
      'Hidden-mic recording captures unguarded post-interview conversation.',
      'Oct 12: Dr. J. Allen Hynek interviews both men; supports their sincerity.',
      '2018-19: Calvin Parker publishes book; Maria Blair corroborates from west bank.',
    ],
    evidence: [
      'Sheriff\'s Office hidden-microphone audio (released by Sheriff Diamond\'s estate).',
      'Hynek + Harder polygraph and regression notes (1973).',
      'Maria Blair corroborating witness statement (sworn 2019).',
      'Contemporaneous Mississippi Press front page coverage (Oct 12, 1973).',
    ],
    skepticalView:
      "Skeptics including Philip Klass argued for hypnagogic hallucination shared by suggestion, or a hoax for tabloid money — though both witnesses refused all paid offers and Hickson died in 2011 still attesting to the account. The 'crab claw' description has no precedent in 1973 pop culture, complicating a confabulation hypothesis.",
    videos: [
      { id: 'qD1B1FkdOVo', title: 'Pascagoula Abduction — Calvin Parker Speaks', channel: 'Documentary' },
      { id: 'XdGUKAUbiWk', title: 'The Hidden Recording — Sheriff\'s Office Tape', channel: 'Archive' },
    ],
    sources: [
      { label: 'Calvin Parker — "Pascagoula: The Closest Encounter" (2018)', url: 'https://www.flyingdiskpress.com/' },
      { label: 'Hynek archive — Pascagoula case file', url: 'http://www.cufos.org/' },
    ],
  },
  {
    id: 'zimbabwe-ariel-1994',
    title: 'Ariel School Encounter',
    subtitle: 'Ruwa, Zimbabwe · 62 child witnesses',
    category: 'Mass Sighting — Children',
    era: 'September 16, 1994',
    location: 'Ariel School, Ruwa, Zimbabwe',
    confidence: 'VERIFIED',
    symbol: '🏫',
    summary:
      'During morning recess, sixty-two students aged 6-12 reported watching a silver craft land in scrub beyond the playground and a tall, large-eyed black-suited being walk toward them. Children\'s drawings collected within hours independently match. Filmed interviews by Cynthia Hind, John Mack (Harvard), and BBC reporter Tim Leach remain the strongest mass-witness juvenile encounter on record.',
    origin:
      "On Friday September 16, 1994, students at the rural Ariel School near Ruwa (40 km east of Harare) were on morning break with no teachers in the playground. Multiple groups of children independently reported seeing one or more disc-shaped objects land or hover at the edge of the school grounds, beyond a fence in scrubland the children were not permitted to enter. A tall figure in tight black clothing with very large dark almond-shaped eyes either walked toward them or appeared atop the craft and 'communicated' telepathically — primarily a message about environmental destruction and humanity damaging the planet.\n\nWhen children rushed back to tell teachers, they were initially disbelieved. Cynthia Hind, MUFON's Africa coordinator, arrived within days with sketch paper. The drawings — produced separately by children who had not seen each other's pictures — show consistent craft geometry and being morphology. Dr. John Mack, Pulitzer-winning Harvard psychiatrist, traveled to Ruwa with documentary filmmaker Randall Nickerson and conducted lengthy filmed interviews. BBC's Tim Leach (a war correspondent skeptical going in) filed contemporaneous footage. Nickerson's documentary 'Ariel Phenomenon' (2022) revisits 30 of the now-adult witnesses, the majority still affirming the account.",
    keyEvents: [
      '~10:00 AM: Recess sighting begins; lasts 10-15 minutes.',
      'Same day: Children draw what they saw at teachers\' request.',
      'Days later: Cynthia Hind (MUFON) interviews students.',
      'November 1994: Dr. John Mack arrives with film crew.',
      '2022: Randall Nickerson releases "Ariel Phenomenon" documentary.',
    ],
    evidence: [
      '62 contemporaneous student drawings (held in Mack archive at Harvard).',
      'BBC Tim Leach interview footage (Sept 1994).',
      'John Mack PhD interview corpus (filmed Nov 1994).',
      '2022 follow-up interviews with 30 adult witnesses.',
    ],
    skepticalView:
      "Skeptic Brian Dunning argues mass childhood suggestion amplified through a charismatic adult investigator (Hind/Mack). Critics note Mack's existing belief framework. Defenders point out the children's drawings preceded any adult contact, were independently produced, and that decades-later interviews show no recantations.",
    videos: [
      { id: 'iXl-YbvUDwc', title: 'Ariel Phenomenon — Official Trailer', channel: 'Ariel Phenomenon' },
      { id: 'kIcSNonBLFY', title: 'Ariel School 1994 — Original BBC Footage', channel: 'BBC Archive' },
    ],
    sources: [
      { label: '"Ariel Phenomenon" (2022) documentary', url: 'https://www.arielphenomenon.com/' },
      { label: 'John Mack Institute — case archive', url: 'https://johnemackinstitute.org/' },
    ],
  },
  {
    id: 'travis-walton-1975',
    title: 'Travis Walton Abduction',
    subtitle: 'Apache-Sitgreaves Forest · 5-day disappearance',
    category: 'Abduction — CE-IV',
    era: 'November 5, 1975',
    location: 'Snowflake, Arizona (logging crew)',
    confidence: 'VERIFIED',
    symbol: '🌲',
    summary:
      'Logger Travis Walton vanished in front of six co-workers after approaching a glowing disc; he reappeared five days later, naked and dehydrated, near a phone booth in Heber. Six independent polygraphs of the witnesses all passed. Walton became the most-investigated American abductee of the 20th century.',
    origin:
      "On November 5, 1975, a seven-man logging crew driving home through the Apache-Sitgreaves National Forest spotted a luminous golden disc hovering above a forest clearing. Walton, 22, exited the truck and walked toward it. A blue-white beam struck him, lifting him off the ground. Crew foreman Mike Rogers panicked and drove off; when they returned minutes later, Walton was gone.\n\nThe Navajo County Sheriff's Office initially treated the men as murder suspects. Five of the six (Rogers, Allen Dalis, Steve Pierce, Ken Peterson, John Goulette) took APA-administered polygraphs within days; all five passed unambiguously. Five days after the disappearance, Walton called his sister from a Heber phone booth, naked and weighing 10 lbs less. He described waking on a table being examined by short, fetal-faced beings, then a taller human-looking man in a blue jumpsuit who led him into a hangar containing several discs. Subsequent polygraphs of Walton himself were mixed — one early test showed deception, later tests did not — but the witness consistency held.\n\nThe case spawned the 1993 film 'Fire in the Sky'. Crew members continue to maintain the account decades later. Mike Rogers had a logging contract penalty for missing the work week, undermining the financial-hoax motive.",
    keyEvents: [
      'Nov 5, 1975 ~ 6:15 PM: Walton lifted by beam in front of crew.',
      'Nov 5-10: Massive ground search; crew treated as murder suspects.',
      'Nov 10 just after midnight: Walton reappears in Heber phone booth.',
      'Nov 15: Five of six crew members pass polygraph (APA examiner).',
      '1993: "Fire in the Sky" film dramatization released.',
    ],
    evidence: [
      'Sheriff\'s Office investigation file (Navajo County, 1975-76).',
      'APA polygraph results (Cy Gilson examiner) on five witnesses.',
      'Contemporaneous Apache Sentinel & Phoenix Gazette coverage.',
      'Crew member sworn affidavits (decades-later interviews).',
    ],
    skepticalView:
      "Philip Klass argued the crew constructed the story to escape the logging contract penalty — but documentation shows the missed week cost Mike Rogers, not the crew. Skeptic Jerry Black noted Walton's first polygraph showed deception; supporters note examiner John McCarthy used a now-discredited test format. The witness durability is the case's strongest feature.",
    videos: [
      { id: '4sYFcSMLi9Q', title: 'Travis Walton — Logger Tells His Story (Joe Rogan)', channel: 'JRE' },
      { id: 'ZbR3fbwuevM', title: 'Fire in the Sky — Real Witnesses Speak', channel: 'Documentary' },
    ],
    sources: [
      { label: 'Travis Walton — "Fire in the Sky" (1996)', url: 'https://www.travis-walton.com/' },
      { label: 'APRO original case investigation file', url: 'https://www.nicap.org/walton.htm' },
    ],
  },
  {
    id: 'kelly-hopkinsville-1955',
    title: 'Kelly–Hopkinsville Encounter',
    subtitle: 'Sutton farmhouse siege',
    category: 'Goblin / Hostile Entity',
    era: 'August 21, 1955',
    location: 'Christian County, Kentucky',
    confidence: 'VERIFIED',
    symbol: '👽',
    summary:
      "Eleven members of the Sutton family barricaded themselves in a farmhouse for hours during a sustained 'siege' by 3-4-foot luminescent silver beings with oversized ears, talons, and floating gait. They emptied shotguns at point-blank range; rounds appeared to have no effect. The Hopkinsville Police, State Police, and US Air Force all responded. The 'Hopkinsville Goblins' became a foundational case in American cryptozoology.",
    origin:
      "On the night of August 21, 1955, near the village of Kelly outside Hopkinsville, Kentucky, the Sutton-Lankford household reported being attacked by multiple small humanoid creatures after one family member, Billy Ray Taylor, reported seeing a 'shooting star' land in a nearby gully. The beings — described as ~3.5 feet tall, with large pointed ears, glowing silver-grey skin, taloned hands, and oversized yellow eyes — would appear at windows and the door, then float or scuttle away when shot. The family fired shotguns and .22 rifles repeatedly at close range with no apparent effect.\n\nAround 11 PM the family fled to the Hopkinsville police station. Officer Russell Greenwell drove with seven police, four military police from Fort Campbell, and two state troopers back to the property. They found shotgun damage and shell casings everywhere, terrified witnesses, and a luminous patch on the lawn — but no creatures. The family resumed sightings after the police left. By morning the encounters had stopped.\n\nProject Blue Book reviewed the case (later officially 'unidentified'). Folklorist Dr. Bud Ledwith of WHOP radio collected detailed sketches the same week. Jerome Clark called it 'one of the most spectacular and most carefully investigated cases in the annals of UFO history'.",
    keyEvents: [
      'Aug 21, 1955 ~ 7:00 PM: Taylor reports glowing object landing in gully.',
      'Throughout night: Multiple goblin appearances; family fires repeatedly.',
      '~11:00 PM: Family flees to police; large multi-agency response follows.',
      'Aug 22 morning: Encounters cease at sunrise.',
      'Same week: Bud Ledwith conducts independent sketch interviews.',
    ],
    evidence: [
      'Hopkinsville Police Department incident report (Aug 22, 1955).',
      'Shotgun shell casings and physical damage to property.',
      'Bud Ledwith sketches collected days after event.',
      'Project Blue Book file (case classified "unidentified").',
    ],
    skepticalView:
      "Skeptics including Renaud Leclet have argued the Suttons mistook a great-horned owl family in a tree for invading creatures, frightened by Billy Ray Taylor's earlier 'shooting star' suggestion — a hypothesis disputed by witnesses and by the multi-witness nature of the floating gait and silvery glow. The Suttons, devout and rural, refused all financial offers.",
    videos: [
      { id: '1jzs6BoVHSo', title: 'The Hopkinsville Goblins — Lemmino Investigation', channel: 'Lemmino' },
      { id: 'Z7q3lCrnlEw', title: 'Kelly-Hopkinsville Encounter Documentary', channel: 'Documentary' },
    ],
    sources: [
      { label: 'Project Blue Book file — Hopkinsville', url: 'https://www.theblackvault.com/documentarchive/project-blue-book/' },
      { label: 'Jerome Clark — UFO Encyclopedia entry', url: 'https://archive.org/details/ufoencyclopediap0000clar' },
    ],
  },
  {
    id: 'flatwoods-monster-1952',
    title: 'Flatwoods Monster',
    subtitle: 'Braxton County, West Virginia',
    category: 'Tall Entity',
    era: 'September 12, 1952',
    location: 'Flatwoods, West Virginia (Bailey Fisher\'s farm)',
    confidence: 'VERIFIED',
    symbol: '👻',
    summary:
      "Seven witnesses (six children and Kathleen May) hiked up a hill to investigate a falling object and encountered a 10-foot tall hissing entity with a glowing red 'face' inside a heart-shaped hood, emitting a metallic mist that sickened multiple witnesses. The case made national news within 48 hours and remains West Virginia's defining UAP encounter.",
    origin:
      "At dusk on September 12, 1952, a group of children playing in Flatwoods, West Virginia saw a bright object streak across the sky and appear to land on the property of farmer G. Bailey Fisher. Joined by Kathleen May (mother of two of the boys) and West Virginia National Guardsman Eugene Lemon, the group of seven hiked the hill carrying a flashlight. Near the top they smelled a sulfurous metallic odor. The flashlight illuminated a tall figure beneath an oak — described variously as 10-12 feet tall with a glowing red face, large non-human eyes, and a heart-shaped cowl. The figure 'hissed' and floated toward them.\n\nThe witnesses fled in terror. Multiple, including Lemon, suffered nausea, vomiting, and irritation of the throat for days afterward — symptoms consistent with chemical exposure. Sheriff Robert Carr investigated and reported 'an oily substance' on grass at the site. Reporter A. Lee Stewart Jr. of the Braxton Democrat broke the story; AP and UPI carried it nationally within 48 hours.\n\nThe 'falling object' has been credibly identified as a Sept 12 meteor witnessed across three states. Skeptics propose the entity was a barn owl in trees with the heart-shape being its silver-feathered face — but the 10-foot height, the metallic mist, and the corroborated illness across multiple witnesses are not easily explained by an owl.",
    keyEvents: [
      'Sept 12, 1952 ~ 7:15 PM: Object seen falling; meteor confirmed.',
      'Witnesses hike Bailey Fisher hill with flashlight.',
      'Encounter with 10-ft entity; group flees.',
      'Multiple witnesses sick for days.',
      'Story breaks nationally Sept 14 via AP/UPI.',
    ],
    evidence: [
      'A. Lee Stewart Jr. on-site reporting (Braxton Democrat).',
      'Sheriff Carr investigation notes.',
      'Witness illness reports / contemporary medical attention.',
      'Sept 12, 1952 confirmed meteor sighting across WV/PA/MD.',
    ],
    skepticalView:
      "Joe Nickell of CSI proposed a barn owl in elevated branches with heart-shaped face plus a Sept 12 meteor (real) plus methane / aviation gas exposure (speculative) accounting for the symptoms. Defenders note the six child witnesses gave consistent height estimates and that owls do not glow red or hiss while floating.",
    videos: [
      { id: '_LDsy_BcPTc', title: 'The Flatwoods Monster — Strange Mysteries', channel: 'Documentary' },
      { id: 'YLPUAdkPKYo', title: 'Flatwoods 1952 — Witness Interviews', channel: 'Archive' },
    ],
    sources: [
      { label: 'Frank Feschino — "The Braxton County Monster" (2004)', url: 'https://www.amazon.com/Braxton-County-Monster-Frank-Feschino/dp/0975720910' },
      { label: 'Project Blue Book file — Flatwoods', url: 'https://www.theblackvault.com/' },
    ],
  },
  {
    id: 'mothman-1966',
    title: 'Mothman of Point Pleasant',
    subtitle: '13 months · 100+ witnesses · Silver Bridge collapse',
    category: 'Cryptid / Harbinger',
    era: 'November 15, 1966 — December 15, 1967',
    location: 'Point Pleasant, West Virginia (TNT area)',
    confidence: 'REPORTED',
    symbol: '🦇',
    summary:
      "From November 1966 to December 1967, dozens of independent witnesses around Point Pleasant reported a 7-foot winged entity with self-illuminating red eyes. The 13-month flap ended on the day the Silver Bridge collapsed (December 15, 1967), killing 46. John Keel's 1975 book 'The Mothman Prophecies' canonized the cryptid as a portent.",
    origin:
      "On the night of November 15, 1966, two young couples — Roger and Linda Scarberry, Steve and Mary Mallette — drove through the abandoned WWII-era West Virginia Ordnance Works ('TNT area') north of Point Pleasant. They reported a man-sized winged figure with glowing red eyes that pursued their car at speeds reaching 100 mph. The Mason County Sheriff's Office took the report seriously after seeing the witnesses' state.\n\nOver the next thirteen months, more than 100 independent witnesses reported a similar entity in the Point Pleasant region — the McDaniel family, multiple TNT-area visitors, Newell Partridge (with associated TV interference and missing-pet reports). Reporter Mary Hyre of the Athens Messenger documented the flap. Folklorist John Keel arrived from New York and recorded extensive witness interviews. On December 15, 1967, the Silver Bridge spanning the Ohio River between Point Pleasant and Gallipolis catastrophically failed during rush hour, killing 46 people. The Mothman sightings ceased.\n\nKeel's 1975 book 'The Mothman Prophecies' tied the entity to Men in Black sightings, electromagnetic phenomena, and the bridge collapse. The 2002 film starring Richard Gere brought the case to mainstream awareness. The annual Mothman Festival now draws ~15,000 people.",
    keyEvents: [
      'Nov 15, 1966: Scarberry/Mallette TNT-area encounter.',
      'Nov 1966 - Dec 1967: 100+ corroborating sightings.',
      'Dec 15, 1967: Silver Bridge collapses; 46 dead; sightings stop.',
      '1975: Keel publishes "The Mothman Prophecies".',
      '2002: Mark Pellington film starring Richard Gere.',
    ],
    evidence: [
      'Mason County Sheriff incident reports (1966-67).',
      'Mary Hyre — Athens Messenger contemporaneous coverage.',
      'John Keel field interview tapes (held at Conscious Hammer archive).',
      'NTSB Silver Bridge collapse report (corrosion in eyebar #330).',
    ],
    skepticalView:
      "Joe Nickell and Robert Smith identified the most likely culprit as a misidentified barred owl or sandhill crane. The bridge-collapse 'prophecy' link was popularized post-hoc by Keel — the structural failure was caused by a hairline fracture in eyebar #330, fully explained by metallurgy. The witness count, however, is unusually large for a misidentification flap of this duration.",
    videos: [
      { id: 'xnCzPYexlZk', title: 'Mothman — The True Story (Lemmino)', channel: 'Lemmino' },
      { id: 'lXDlCTFNkRc', title: 'Point Pleasant — Mothman Witness Interviews', channel: 'Documentary' },
    ],
    sources: [
      { label: 'John Keel — "The Mothman Prophecies" (1975)', url: 'https://www.amazon.com/Mothman-Prophecies-John-A-Keel/dp/0765342197' },
      { label: 'Mothman Museum — Point Pleasant', url: 'https://www.mothmanmuseum.com/' },
    ],
  },
  {
    id: 'allagash-1976',
    title: 'Allagash Abduction',
    subtitle: 'Four art-school witnesses · Maine canoe trip',
    category: 'Multi-witness Abduction',
    era: 'August 20, 1976',
    location: 'Allagash Wilderness, Maine',
    confidence: 'REPORTED',
    symbol: '🛶',
    summary:
      "Four Massachusetts College of Art students — twins Jack and Jim Weiner, Charlie Foltz, Chuck Rak — were canoeing on Eagle Lake when a glowing sphere descended and beamed them into a craft. All four passed independent polygraphs administered by Ernie Sheldon (former Boston PD). Their separately-drawn entity sketches matched.",
    origin:
      "On August 20, 1976, four art students on a wilderness trip in northern Maine had built a campfire bonfire on the shore of Eagle Lake before paddling out to night-fish. A bright spherical object appeared above them and approached. Charlie Foltz signaled it with a flashlight and it descended further, projecting a beam that engulfed the canoe. The next memory the four had was being back on shore — but the bonfire they had built large enough to last hours had burned to ash, indicating significant lost time.\n\nFor years afterward all four suffered repeating nightmares of medical examinations. In 1988 Ray Fowler conducted hypnotic regressions with each man independently. They produced consistent accounts of being floated aboard a craft, examined by tall thin entities with four-fingered hands and elongated heads. Each witness drew the entities separately; the four sketches are notably congruent. All four passed polygraph examinations administered separately by Ernie Sheldon, a Boston Police polygraph examiner with no connection to UFO research.",
    keyEvents: [
      'Aug 20, 1976 ~ 9:00 PM: Sphere descends over Eagle Lake.',
      '1976-87: Four men suffer matching recurring nightmares.',
      '1988: Ray Fowler regression hypnosis sessions.',
      '1989: Independent polygraphs — all four pass.',
      '1993: Fowler publishes "The Allagash Abductions".',
    ],
    evidence: [
      'Four independently-drawn entity sketches (1988).',
      'Ernie Sheldon polygraph reports (1989).',
      'Burned-down bonfire physical anomaly.',
      'Fowler regression session audio archives.',
    ],
    skepticalView:
      'Skeptics including Susan Clancy (Harvard) cite the well-documented unreliability of hypnotic regression; the men\'s congruent imagery may reflect post-1976 cultural saturation with abduction narratives. Defenders note the witnesses had no public-figure motive, refused major film offers for years, and that polygraphy was administered by a non-aligned examiner.',
    videos: [
      { id: 'EYE9XplyV2A', title: 'The Allagash Abduction — In Search Of', channel: 'Documentary' },
      { id: 'i1gVeb6ER6w', title: 'Jim Weiner — Allagash Witness Interview', channel: 'Archive' },
    ],
    sources: [
      { label: 'Raymond Fowler — "The Allagash Abductions" (1993)', url: 'https://www.amazon.com/Allagash-Abductions-Undeniable-Investigation-Encounters/dp/0934269157' },
      { label: 'MUFON Maine — Allagash file', url: 'https://mufon.com/' },
    ],
  },
  {
    id: 'voronezh-1989',
    title: 'Voronezh Park Landing',
    subtitle: 'Soviet Union · TASS official report',
    category: 'Mass Sighting — Children + State',
    era: 'September 27, 1989',
    location: 'Voronezh, Russian SFSR (South Park)',
    confidence: 'VERIFIED',
    symbol: '🌍',
    summary:
      "TASS — the official Soviet state news agency — issued a serious report on October 9, 1989 confirming a UFO landing witnessed by dozens of citizens in Voronezh's South Park. Three 9-foot-tall beings with small heads emerged from a craft alongside a 'robot'; one allegedly disintegrated a bystander with a tube-shaped instrument before he reappeared. Soviet scientists publicly stated radiation readings at the site were 'two times normal'.",
    origin:
      "On the evening of September 27, 1989, multiple children and adults in South Park (Yuzhny Park) in Voronezh — an industrial city about 320 miles south of Moscow — watched a deep-red sphere descend, hover, then land. Three (some accounts say four) beings approximately 9 feet tall emerged with small heads and three eyes (two regular, one luminous between), accompanied by a smaller robotic figure. One being allegedly pointed a tube-shaped device at a teenage boy who 'disappeared' for several seconds before reappearing.\n\nThe official Soviet news agency TASS distributed the story internationally on October 9, 1989 — an extraordinary confirmation given the agency's strict editorial discipline. Genrikh Silanov, head of the Voronezh Geophysical Laboratory, told the press his team had measured radiation levels at the landing site at two times background and identified soil deformation patterns. The story ran on the front page of major Western papers including the New York Times.\n\nLater Soviet investigators and the children's drawings were collected by Vladimir Azhazha and James Oberg (NASA, skeptic). Oberg's investigation found the witness pool authentic and the event actually witnessed, while questioning some embellished detail layered on by sensational Soviet press.",
    keyEvents: [
      'Sept 27, 1989 ~ 6:30 PM: Landing in Yuzhny Park witnessed by ~40.',
      'Oct 9, 1989: TASS distributes official confirmation worldwide.',
      'Same week: Voronezh Geophysical Lab measures radiation at site.',
      'Oct 11, 1989: NYT and major Western papers carry the story.',
      '1990: James Oberg (NASA) on-site investigation.',
    ],
    evidence: [
      'TASS official wire report (Oct 9, 1989).',
      'Voronezh Geophysical Lab field measurements.',
      'Children\'s drawings collected by Soviet investigators.',
      'New York Times Oct 11, 1989 front page.',
    ],
    skepticalView:
      "James Oberg's on-site investigation concluded the children genuinely witnessed something but that pre-press embellishment likely amplified the entity descriptions. Glasnost-era Soviet press was experimenting with sensational reporting after decades of restraint. The radiation finding was real but modest (2x background is not extreme).",
    videos: [
      { id: 'WAg0ZUFxXBE', title: 'Voronezh 1989 — Soviet UFO Landing', channel: 'Documentary' },
      { id: 'X6sFa2trVS8', title: 'TASS Report — The Voronezh Encounter', channel: 'Archive' },
    ],
    sources: [
      { label: 'New York Times — Soviet UFO Report (Oct 11, 1989)', url: 'https://www.nytimes.com/1989/10/11/world/tass-says-aliens-visit-russia.html' },
      { label: 'James Oberg — Voronezh investigation notes', url: 'http://www.jamesoberg.com/' },
    ],
  },
  {
    id: 'varginha-1996',
    title: 'Varginha ET Capture',
    subtitle: 'Brazilian military recovery operation',
    category: 'Live Capture / Death of Soldier',
    era: 'January 20, 1996',
    location: 'Varginha, Minas Gerais, Brazil',
    confidence: 'REPORTED',
    symbol: '🇧🇷',
    summary:
      'Three young women reported encountering a hunched, brown-skinned, V-headed entity with red eyes in a Varginha vacant lot. The Brazilian Army and Fire Brigade allegedly captured one or more of the beings. Soldier Marco Eli Cherese died of an unidentified infection within weeks. The case is the most documented live-entity recovery in modern UAP literature.',
    origin:
      "On the morning of January 20, 1996 in the city of Varginha (population ~120,000) in southern Minas Gerais, three young women — sisters Liliane and Valquíria Silva (16 and 14) and friend Katia Andrade Xavier (22) — reported encountering a strange creature in a vacant lot. They described it as approximately five feet tall, brown-skinned, with a V-shaped head, large red glowing eyes, and three small protrusions on the skull. They fled and reported it to their mother, who reported it to the Fire Brigade.\n\nIn the days that followed, residents reported a major military operation — Army and Fire Brigade vehicles converging on multiple sites including ESA (Sergeants School of the Army), the Varginha Regional Hospital (Humanitas), and Bragança Hospital in Campinas. Witnesses including hospital staff reported seeing an unusual being transported under heavy escort. Soldier Marco Eli Cherese, who allegedly handled one of the entities barehanded, was admitted to hospital and died on February 15, 1996 from an infection his medical record described as 'undetermined etiology'.\n\nDr. Ubirajara Franco Rodrigues, a Brazilian lawyer, conducted the most extensive civilian investigation, interviewing dozens of military and medical witnesses (many off-record). The Brazilian Air Force's 1996-97 internal investigation file was not released. Varginha now operates the case as part of its tourism identity, with a UFO-themed water tower at the city entrance.",
    keyEvents: [
      'Jan 20, 1996: Three girls encounter entity in vacant lot.',
      'Jan 20-22: Multiple military vehicle convoys reported citywide.',
      'Jan 22: Hospital transfer reports begin.',
      'Feb 15, 1996: Soldier Marco Eli Cherese dies in hospital.',
      'Throughout 1996-99: Rodrigues civilian investigation.',
    ],
    evidence: [
      'Hospital records re: Cherese (cause of death "indeterminate").',
      'Multiple corroborating military / medical witness statements.',
      'Civilian photographs of military convoy presence (Jan 1996).',
      'Brazilian Air Force acknowledged investigation file (unreleased).',
    ],
    skepticalView:
      "Skeptic Kentaro Mori (Brazil) argues the original girls' encounter may have involved a mentally-ill homeless man, with subsequent military activity being a pre-scheduled exercise. The Cherese death was real but typhoid was officially listed in some hospital records. The strongest counter-evidence remains the unusual number of independent military / medical witnesses with no incentive to fabricate.",
    videos: [
      { id: 'qAwNOGlj6kw', title: 'Varginha Brazil 1996 — Investigation', channel: 'Documentary' },
      { id: 'jW-1KoIGwJk', title: 'The Varginha Incident — Witness Interviews', channel: 'Archive' },
    ],
    sources: [
      { label: 'Ubirajara Franco Rodrigues — Varginha case report', url: 'https://www.varginhaufoincident.com/' },
      { label: 'Brazilian UFO Magazine — Varginha 25 years on', url: 'https://www.ufo.com.br/' },
    ],
  },
  {
    id: 'rendlesham-aliens-1980',
    title: 'Rendlesham Forest Entities',
    subtitle: 'USAF base · airmen + senior officer testimony',
    category: 'Military CE-III',
    era: 'December 26-28, 1980',
    location: 'RAF Woodbridge / Bentwaters, England',
    confidence: 'VERIFIED',
    symbol: '🌲',
    summary:
      "Beyond the famous craft sightings, multiple Rendlesham personnel — including Sgt Jim Penniston and Lt Col Charles Halt — described entity contact, telepathic 'binary code' downloads, and small beings in beams of light. Halt's audio cassette recording, made live during the second night, remains the most credible real-time military UAP audio in declassified Western archives.",
    origin:
      "Between December 26 and 28, 1980, US Air Force personnel stationed at the twin RAF bases of Woodbridge and Bentwaters in Suffolk, England (then operating nuclear weapons under NATO arrangement) reported a series of UAP encounters in adjacent Rendlesham Forest. Initial witnesses Sgt Jim Penniston and Airman John Burroughs reported a triangular metallic craft with hieroglyph-like symbols on its surface. Penniston later reported being 'downloaded' a binary code by touching the craft — a code he wrote down at the time and later (decades later) reportedly translated.\n\nOn the third night, Deputy Base Commander Lt Col Charles Halt led a team into the forest with a portable cassette recorder. The 18-minute Halt Tape captures live military officers responding in real time to a moving luminous object: 'It's still hovering... it just moved... that's strange.' Halt later filed an official memorandum (the Halt Memo) on January 13, 1981 to the UK Ministry of Defence describing the encounter. The Halt Memo was eventually declassified.\n\nThe entity claims layered on later — Penniston in regression sessions, and Larry Warren describing small beings in beams of light during what he called the 'third night underneath' — remain more disputed than the lights themselves. But the multi-witness, multi-night, multi-rank testimony combined with the contemporaneous Halt audio and memo make Rendlesham the strongest documented military CE-II/III in declassified Western archives.",
    keyEvents: [
      'Dec 26, 1980: Burroughs/Penniston initial sighting.',
      'Dec 28, 1980: Halt-led second-night investigation; cassette recorded.',
      'Jan 13, 1981: Halt Memo filed with UK MoD.',
      '1983: Halt Memo released under FOIA.',
      '2010: Penniston and Burroughs publicly affirm under their own names.',
    ],
    evidence: [
      'The Halt Tape (18-minute live cassette recording, Dec 28, 1980).',
      'The Halt Memo (Jan 13, 1981; declassified UK MoD file).',
      'Penniston notebook with claimed binary code (Dec 1980).',
      'Sworn statements from multiple ranking USAF personnel.',
    ],
    skepticalView:
      "Ian Ridpath argues the lights were the Orfordness lighthouse (which is visible from the forest in certain weather conditions) plus the Dec 26 fireball over southern England. Halt himself rejects this explanation. The Penniston binary code translation, produced decades after the event, is widely treated as far weaker evidence than the contemporary cassette / memo / multiple-witness corpus.",
    videos: [
      { id: 'NMIu-Xvve_Q', title: 'Rendlesham — Halt Speaks (Documentary)', channel: 'Documentary' },
      { id: 'XX6JI6NjhDw', title: 'The Halt Tape — Original Audio', channel: 'Archive' },
    ],
    sources: [
      { label: 'UK MoD — Halt Memo (declassified)', url: 'https://www.gov.uk/government/publications/ufo-policy-papers' },
      { label: 'Nick Pope — "Encounter in Rendlesham Forest"', url: 'https://www.nickpope.net/' },
    ],
  },
];
