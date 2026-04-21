import type { God } from '../types';

// Image imports
import zeusImg from '../assets/gods/zeus.jpg';
import odinImg from '../assets/gods/odin.jpg';
import enkiImg from '../assets/gods/enki.jpg';
import thothImg from '../assets/gods/thoth.jpg';
import shivaImg from '../assets/gods/shiva.jpg';
import pleiadianImg from '../assets/gods/pleiadian.jpg';
import apolloImg from '../assets/gods/apollo.jpg';
import isisImg from '../assets/gods/isis.jpg';
import freyaImg from '../assets/gods/freya.jpg';
import vishnuImg from '../assets/gods/vishnu.jpg';
import raImg from '../assets/gods/ra.jpg';
import lokiImg from '../assets/gods/loki.jpg';
import kaliImg from '../assets/gods/kali.jpg';
import mardukImg from '../assets/gods/marduk.jpg';
import enlilImg from '../assets/gods/enlil.jpg';
import aresImg from '../assets/gods/ares.jpg';
import anubisImg from '../assets/gods/anubis.jpg';
import hermesImg from '../assets/gods/hermes.jpg';
import aphroditeImg from '../assets/gods/aphrodite.jpg';
import prometheusImg from '../assets/gods/prometheus.jpg';
import medusaImg from '../assets/gods/medusa.jpg';
import perseusImg from '../assets/gods/perseus.jpg';
import pegasusImg from '../assets/gods/pegasus.jpg';
import kratosImg from '../assets/gods/kratos.jpg';
import nephilimImg from '../assets/gods/nephilim.jpg';
import anuImg from '../assets/gods/anu.jpg';

export const gods: God[] = [
  {
    id: 'zeus', name: 'Zeus', pantheon: 'Greek',
    domains: ['Sky', 'Thunder', 'Justice', 'Order', 'Kingship'],
    archetypeRole: 'The Sovereign — Authority over heaven and earth, divine law enforcer',
    reflectionQuestion: 'Where in your life are you claiming authority — or surrendering it?',
    atmosphericBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #2d4a7a 100%)',
    atmosphericDesc: 'Storm clouds gather over Olympus. Lightning splits the dark sky.',
    symbol: '⚡', image: zeusImg,
    originStory: `Born in secret on Mount Ida in Crete, Zeus was the youngest son of the Titans Cronus and Rhea. Cronus, terrified of a prophecy that one of his children would overthrow him, swallowed each newborn whole. When Zeus was born, Rhea wrapped a stone in swaddling cloth and handed it to Cronus, who devoured it without looking. The infant Zeus was hidden in a cave, raised on goat's milk and honey, his cries drowned by Curetes clashing their shields.

When he came of age, Zeus returned, forced his father to vomit up his swallowed siblings, and led the gods in the Titanomachy — the ten-year war that ended with the Titans cast into Tartarus and Zeus seated on the throne of heaven.`,
    keyMyths: [
      { title: 'The Titanomachy', body: 'Zeus and his Olympian siblings warred against Cronus and the Titans for ten years. Allied with the Hekatonchires (hundred-handed giants) and armed with thunderbolts forged by the Cyclopes, Zeus shattered Mount Othrys and chained the Titans in Tartarus.' },
      { title: 'Prometheus and Fire', body: 'When Prometheus stole fire from Olympus and gave it to humanity, Zeus chained him to the Caucasus and sent an eagle to eat his liver each day for eternity. Zeus then unleashed Pandora upon mankind as second punishment.' },
      { title: 'The Many Affairs', body: 'Zeus pursued countless mortals and goddesses — Europa as a bull, Leda as a swan, Danaë as a shower of gold, Alcmene by impersonating her husband. From these unions came Helen of Troy, Heracles, Perseus, and most heroes of the age.' },
    ],
    powersAndRelics: [
      'Thunderbolt — forged by the Cyclopes, can level mountains',
      'Aegis — the storm-shield bordered with serpents',
      'Omnipotence over weather — rain, wind, lightning, drought',
      'Shape-shifting — bull, swan, eagle, golden rain, mortal forms',
      'Final authority over Fate (though even he cannot fully overrule the Moirai)',
    ],
    relationships: [
      'Hera — sister and wife, jealous queen of the gods',
      'Poseidon & Hades — brothers; together drew lots for sky, sea, underworld',
      'Athena — favorite daughter, born fully armored from his skull',
      'Apollo & Artemis — twins by Leto',
      'Heracles — mortal son who became a god',
      'Cronus — father he overthrew',
    ],
    worship: 'The Olympic Games were held in his honor every four years at Olympia, where Phidias built one of the Seven Wonders — a 40-foot ivory-and-gold statue of Zeus enthroned. Sacred sites included Dodona (the oldest oracle, where his will was read in the rustling of an oak), Mount Olympus, and Mount Ida. Bulls, white animals, and the first-fruits of harvests were sacrificed at his altars.',
    modernRelevance: 'Zeus is the archetype of legitimate power — the moment authority must be claimed and wielded. Modern leaders, parents, and anyone who has had to step into a role they did not feel ready for face the Zeus crisis: claim the throne or watch chaos consume what you love. He warns equally against tyranny: the king who forgets justice becomes Cronus.',
    oracleLore: `In esoteric tradition, Zeus is the encoded memory of an off-world sovereign caste that ruled Earth in deep prehistory — the "sky beings" remembered across nearly every culture as thunder-gods (Indra, Thor, Baal, Tlaloc). His thunderbolt is consistently described in ways resembling directed-energy weaponry. The Titanomachy mirrors the Sumerian Anunnaki succession wars almost beat-for-beat: a younger generation of "gods" overthrowing their elders and dividing the realms by lot.

Some researchers reading Plato's Critias literally believe the Olympian order is the cultural memory of post-Atlantean rulership — an interregnum between cataclysms when surviving knowledge was concentrated in a small ruling council that mortals later deified.`,
    quotes: [
      'I shall hang the world from a golden chain, and not all of you together can drag me down.',
      'Of all creatures that breathe and move upon the earth, none is more wretched than man.',
    ],
    sources: [{ label: 'Theoi — Zeus', url: 'https://www.theoi.com/Olympios/Zeus.html' }],
  },

  {
    id: 'odin', name: 'Odin', pantheon: 'Norse',
    domains: ['Wisdom', 'War', 'Death', 'Magic', 'Poetry'],
    archetypeRole: 'The Seeker — Sacrificed an eye for wisdom; hung on Yggdrasil for nine days',
    reflectionQuestion: 'What would you sacrifice to gain true understanding of the cosmos?',
    atmosphericBg: 'linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 50%, #0a0020 100%)',
    atmosphericDesc: 'Dark Norse cosmos. Two ravens circle the World Tree at the edge of nine realms.',
    symbol: '🪬', image: odinImg,
    originStory: `Odin was the son of Bor and the giantess Bestla, born in the gap before the world existed. With his brothers Vili and Vé, he slew the primordial giant Ymir and shaped the cosmos from his body — Ymir's flesh became the earth, his blood the seas, his skull the dome of the sky, his brain the clouds. From two pieces of driftwood, the brothers carved the first humans, Ask and Embla, breathing into them spirit, intelligence, and warmth.

But Odin was never content to rule. Driven by an insatiable hunger to understand the fate of the world, he sacrificed an eye to drink from Mímir's well of wisdom, and later hung himself on the World Tree Yggdrasil for nine nights, pierced by his own spear, to seize the runes.`,
    keyMyths: [
      { title: 'The Hanging on Yggdrasil', body: '"I know that I hung on a windswept tree, nine long nights, wounded with a spear, dedicated to Odin, myself to myself." From his self-sacrifice he won the runes — the encoded grammar of fate itself.' },
      { title: 'The Mead of Poetry', body: 'Odin seduced the giantess Gunnlöð, drank the mead of poetry in three swallows, and escaped as an eagle. He spat the mead into vessels in Asgard, granting humans the gift of inspired speech.' },
      { title: 'Ragnarök', body: 'Odin knows he is doomed. The wolf Fenrir will swallow him at the end of the world. Yet he prepares anyway — gathering slain warriors in Valhalla for the final battle, knowing he will lose. This is the deepest Odinic teaching: act with full devotion even knowing the outcome.' },
    ],
    powersAndRelics: [
      'Gungnir — the spear that never misses its mark',
      'Sleipnir — eight-legged horse that runs through all nine worlds',
      'Huginn & Muninn — ravens "Thought" and "Memory" who scout the world daily',
      'Geri & Freki — wolf companions who eat what Odin will not',
      'Draupnir — the gold ring that drips eight new rings every nine nights',
      'Mastery of Seiðr — the most dangerous shamanic magic, taught to him by Freya',
    ],
    relationships: [
      'Frigg — wife, queen of Asgard, knows all fates but speaks none',
      'Thor — son by the giantess Jörð (Earth)',
      'Baldr — beloved son whose death he could not prevent',
      'Loki — blood brother and eventual betrayer',
      'Mímir — guardian of wisdom; Odin keeps his severed head',
      'The Valkyries — his shield-maidens who choose the slain',
    ],
    worship: 'Odin was worshipped at sacred groves, with rituals often involving hanging — both human sacrifice (at Uppsala, every nine years, nine of every species were hung) and self-mutilation echoing his own ordeal. Wednesday ("Woden\'s day") preserves his name. Berserkers and skalds called on him; farmers preferred Thor.',
    modernRelevance: 'Odin is the archetype of the seeker who pays the full price. He is not the wise old man who already knows — he is the obsessive who tears himself apart to learn. Modern researchers, scholars, addicts of truth, those who would rather know the worst than live in comfortable ignorance — these are Odin\'s. He warns: knowledge has a cost, and you will pay it in pieces of yourself.',
    oracleLore: `Odin's hanging on Yggdrasil is one of the clearest cross-cultural shamanic initiations in the historical record — paralleled by Siberian shamans, the Christ on the cross, Inanna on the meathook, and the inverted Hanged Man of the Tarot. The "runes" he won are not just an alphabet but a perceptual operating system — a way of seeing causality itself.

In disclosure-adjacent readings, the All-Father archetype reflects an ancient compact between humans and a non-terrestrial advisor caste who traded forbidden knowledge for ritual blood — an arrangement remembered as both gift and curse. Odin's missing eye is sometimes read as the price of contact: a partial blinding to one form of perception in exchange for sight into another.`,
    quotes: [
      'I gave my eye to see — what use are two when one is filled with truth?',
      'Cattle die, kinsmen die, you yourself must die. But the fair fame never dies of one who has earned it.',
    ],
    sources: [{ label: 'Norse Mythology — Odin', url: 'https://norse-mythology.org/gods-and-creatures/the-aesir-gods-and-goddesses/odin/' }],
  },

  {
    id: 'enki', name: 'Enki', pantheon: 'Anunnaki',
    domains: ['Water', 'Knowledge', 'Creation', 'Crafts', 'Intelligence'],
    archetypeRole: 'The Architect — Creator of humanity, guardian of the Abzu',
    reflectionQuestion: 'Was humanity created as a slave race, a divine experiment, or something more?',
    atmosphericBg: 'linear-gradient(135deg, #1a0d00 0%, #3d2b00 50%, #2a1800 100%)',
    atmosphericDesc: 'Ancient Sumerian temple at the confluence of the Tigris. Cuneiform glows amber.',
    symbol: '🌊', image: enkiImg,
    originStory: `Enki, son of Anu (the Sky Father) and Nammu (the primordial sea), dwells in the Abzu — the freshwater abyss beneath the earth. He is the second-born of the great Anunnaki triad (with Anu and Enlil), but the most beloved by humans, because in nearly every Sumerian text it is Enki who advocates for humanity when the council of gods turns against us.

The most explosive of these texts — the Atra-Hasis epic and the Enuma Elish — describe the creation of humanity not as an act of love but of labor relief. The lower-ranking Anunnaki had been mining gold for millennia and rebelled. Enki proposed the solution: mix the blood of a slain god with clay and create a new being to take over the work. He shaped that being himself.`,
    keyMyths: [
      { title: 'The Creation of Humanity', body: 'In the Atra-Hasis, Enki and the mother goddess Ninmah mixed divine blood with clay to create the first humans (lulu) — designed as workers for the Anunnaki gold mines in the Abzu.' },
      { title: 'The Flood Warning', body: 'When Enlil decreed humanity be destroyed by flood, Enki violated the divine council\'s vow of secrecy. He whispered the warning through a reed wall to Atra-Hasis (the Sumerian Noah), instructing him to build a vessel and save the seed of all life.' },
      { title: 'Enki and Inanna — The Stolen Me', body: 'The goddess Inanna got Enki drunk and made off with the "Me" — the divine decrees that govern civilization (kingship, music, law, sex, weaving, judgment). Enki sobered up, sent demons after her, but ultimately let her keep them. Civilization was born from her theft and his consent.' },
    ],
    powersAndRelics: [
      'Mastery over fresh water and the Abzu',
      'Holder of the Me — the cosmic decrees of civilization',
      'Architect of human form — knew the precise blueprint',
      'Craft, magic, incantation, and exorcism',
      'Symbol: two streams of water flowing from his shoulders, often with fish',
    ],
    relationships: [
      'Anu — father, supreme sky god',
      'Enlil — half-brother and rival, lord of air and authority',
      'Ninmah / Damkina — co-creator of humanity, his consort',
      'Marduk — son who would later eclipse him in Babylon',
      'Inanna — niece who stole the Me from him',
      'Humanity — his creation and his cause',
    ],
    worship: 'Enki\'s primary temple was the E-abzu at Eridu, the oldest known city in Sumer (founded c. 5400 BCE). Ritual involved purification rites with sacred water and the chanting of incantations he was said to have authored. As Ea in Babylon, his cult merged with Marduk\'s but never disappeared.',
    modernRelevance: 'Enki is the archetype of the creator who loves what he made more than he loves his orders. Whistleblowers, scientists who break ranks, doctors who tell the patient the truth, programmers who refuse to ship the dark pattern — they are all Enki\'s. He represents the moment a maker chooses the made over the council that commissioned them.',
    oracleLore: `Enki sits at the absolute center of the Anunnaki disclosure thesis advanced by Zecharia Sitchin and the broader Sumerian-contact research community. The texts describe him with startling literalness: he genetically engineered humanity from a hominid base (the lulu) by adding divine "blood" — language modern researchers read as DNA splicing. His Abzu is described not as a metaphysical realm but as a specific underground installation. His warning to Atra-Hasis was explicitly delivered "through a reed wall" — a deniable channel.

If even 10% of the literal reading is correct, Enki is the single most important figure in the human story: the engineer who built us, the rebel who saved us from extinction, and the one who taught us the technologies our overseers forbade.`,
    quotes: [
      'Reed wall, reed wall — listen! Tear down the house, build a boat. Abandon possessions and seek life.',
      'Let her bear the yoke; let humanity bear the toil of the gods.',
    ],
    sources: [{ label: 'World History — Enki', url: 'https://www.worldhistory.org/Enki/' }],
  },

  {
    id: 'thoth', name: 'Thoth', pantheon: 'Egyptian',
    domains: ['Writing', 'Wisdom', 'Magic', 'Moon', 'Science', 'Time'],
    archetypeRole: 'The Scribe — Keeper of the Akashic records, weigher of souls, master of all knowledge',
    reflectionQuestion: 'What knowledge have you been avoiding that might transform you?',
    atmosphericBg: 'linear-gradient(135deg, #0d0a00 0%, #2a1f00 50%, #1a1200 100%)',
    atmosphericDesc: 'The Hall of Records. Hieroglyphics pulse with soft golden light. An ibis watches.',
    symbol: '📜', image: thothImg,
    originStory: `Thoth's origin is uniquely strange: in some accounts he was self-created at the dawn of time, speaking himself into existence with the first word — a teaching that placed language before matter. In other texts he sprang from the lips of Ra, or from a quarrel between Horus and Set, born of their conflict as the principle of mediation.

He was the architect of the calendar, the inventor of writing, the measurer of time, and the recorder of every thought ever thought. He invented the 365-day year by winning five extra days from the Moon in a game of senet — days during which the gods Osiris, Isis, Set, Nephthys, and Horus the Elder could be born.`,
    keyMyths: [
      { title: 'The Weighing of the Heart', body: 'In the Hall of Two Truths, the dead must have their heart weighed against the feather of Ma\'at. Thoth stands beside the scale, recording the verdict in his scroll. He neither judges nor pleads — he records absolutely.' },
      { title: 'The Healing of the Eye of Horus', body: 'When Set tore out the eye of Horus, Thoth restored it — making it the Eye of Ra, the Wedjat, the symbol of wholeness restored from fragmentation. The eye became the unit of measure for all medicine and offerings.' },
      { title: 'The Books of Thoth', body: 'Legend held that Thoth wrote 42 sacred books containing all knowledge of the universe. Hidden in tombs and temples, they were said to grant absolute power to whoever read them — and a curse upon whoever did so unworthily.' },
    ],
    powersAndRelics: [
      'Inventor of hieroglyphics and the spoken word',
      'Master of magic ("heka") — words that change reality',
      'Lunar mathematics and the calendar',
      'Custodian of the Akashic records',
      'The ibis-headed staff and palette of the scribe',
      'Mediator between feuding gods — his judgment is final',
    ],
    relationships: [
      'Ma\'at — consort, the principle of cosmic truth and balance',
      'Ra — sometimes father, sometimes companion in the solar barque',
      'Horus & Set — eternal rivals he repeatedly mediated between',
      'Isis — taught her the magical names of power',
      'Hermes Trismegistus — his Greek syncretization, source of the Hermetica',
    ],
    worship: 'Thoth\'s great cult center was Khmun (Hermopolis), where his sacred ibises and baboons were mummified by the millions — entire necropolises of them have been excavated. Scribes invoked him before every act of writing. He was the patron of the Houses of Life, the temple libraries.',
    modernRelevance: 'Thoth is the archetype of the recorder — the one whose work is to witness and preserve, not to act. Journalists, archivists, programmers, biographers, and anyone who has felt the weight of being the only one who knows the truth — these are Thoth\'s. He is also the patron of those who speak things into being: writers, coders, ritualists, founders.',
    oracleLore: `In the Hermetic tradition, Thoth is identified with Hermes Trismegistus ("Thrice-Great Hermes"), the supposed author of the Corpus Hermeticum and the Emerald Tablet — texts that fueled Renaissance magic, alchemy, and ultimately the scientific revolution. Newton spent more years on Hermetic study than on physics.

In the disclosure-adjacent reading, Thoth is the archivist of an off-world library — the cultural memory of a being whose function was to record and transmit civilizational knowledge across resets. The "Books of Thoth" then become not metaphor but a specific informational cache. The Emerald Tablet's "as above, so below" then encodes a precise structural claim about the universe that modern physics is only now circling back toward.`,
    quotes: [
      'The lips of wisdom are closed except to the ears of understanding.',
      'As above, so below; as within, so without.',
    ],
    sources: [
      { label: 'Theoi — Hermes/Thoth', url: 'https://www.theoi.com/Olympios/HermesGoods.html' },
      { label: 'Ancient Egypt Online — Thoth', url: 'https://ancientegyptonline.co.uk/thoth/' },
    ],
  },

  {
    id: 'shiva', name: 'Shiva', pantheon: 'Hindu',
    domains: ['Destruction', 'Transformation', 'Meditation', 'Arts', 'Yoga'],
    archetypeRole: 'The Transformer — Destroys to create. The cosmic dance is the universe itself.',
    reflectionQuestion: 'What must be destroyed within you before something new can emerge?',
    atmosphericBg: 'linear-gradient(135deg, #0d001a 0%, #2a003d 50%, #1a0028 100%)',
    atmosphericDesc: 'Stars explode and reform in cosmic rhythm. The Nataraja dances at the center of creation.',
    symbol: '🔱', image: shivaImg,
    originStory: `Shiva is anadi — without beginning. Unlike most deities he was not born; he simply is, the eternal consciousness underlying all phenomena. His most ancient form, recorded in the Rig Veda as Rudra ("the Howler"), was a wild outsider god of storms, the wilderness, healing herbs, and arrows of plague — feared and propitiated rather than loved.

Over millennia, Rudra evolved into Shiva ("the Auspicious"), and the wild outsider became the supreme yogi, sitting in eternal meditation on Mount Kailash, his hair tangled with the crescent moon and the descended Ganges, his throat blue from drinking the world-poison Halahala that emerged when gods and demons churned the cosmic ocean.`,
    keyMyths: [
      { title: 'The Cosmic Dance (Tandava)', body: 'As Nataraja, Shiva dances the universe into and out of existence. One foot crushes the demon of ignorance; the other is raised in liberation. The drum in his hand sounds the first vibration of creation; the flame in his other hand is the fire of dissolution.' },
      { title: 'The Burning of Kama', body: 'When the love-god Kama tried to break Shiva\'s meditation by firing flower-arrows of desire, Shiva opened his third eye and incinerated him on the spot. Yet Parvati\'s devotion eventually moved him — proving that love that survives ego-death is the only love worth having.' },
      { title: 'The Drinking of the Poison', body: 'When the cosmic ocean was churned and the deadly Halahala poison threatened to destroy creation, only Shiva could drink it. He held it in his throat — turning it forever blue (Nilakantha) — saving every being at the cost of marking himself.' },
    ],
    powersAndRelics: [
      'Trishula — the trident representing creation, preservation, destruction',
      'Damaru — the hourglass drum whose beat is the heartbeat of the universe',
      'Third Eye — opens to incinerate falsity',
      'Mastery of all yoga — the original Adiyogi',
      'The crescent moon, the cobra Vasuki, the bull Nandi as mount',
      'Tandava — the dance that ends ages',
    ],
    relationships: [
      'Parvati / Sati / Durga / Kali — his consort across her many forms',
      'Ganesha — son, the elephant-headed remover of obstacles',
      'Kartikeya / Murugan — son, the warrior god',
      'Vishnu & Brahma — co-equals in the supreme triad (Trimurti)',
      'Nandi — the bull, his mount and most devoted disciple',
    ],
    worship: 'Shiva is worshipped most often as the lingam — an aniconic upright stone form representing infinite consciousness. His holiest sites are Kashi (Varanasi), Mount Kailash in Tibet, and the twelve Jyotirlinga shrines across India. Maha Shivaratri, the "Great Night of Shiva," is the most-observed Hindu festival in the world.',
    modernRelevance: 'Shiva is the archetype of necessary destruction — the truth that nothing new can be born without the death of what was. People moving through divorce, career collapse, ego dissolution, recovery, or radical reinvention are walking Shiva\'s path. He teaches that the dance is the meaning — not the products of the dance.',
    oracleLore: `Shiva\'s Nataraja form is famously installed at CERN, the European nuclear research facility — placed there because the dance of creation and destruction at the subatomic level mirrors the iconography exactly. Fritjof Capra wrote The Tao of Physics largely around this resonance.

In esoteric reading, Shiva is the consciousness-state that all advanced contemplative traditions describe: pure awareness witnessing its own activity. The "third eye" maps to the pineal gland and the experience of nondual perception. The Tandava is the cyclic universe of modern cosmology — the same dance the gods of every age have intuited.`,
    quotes: [
      'I am Time, the destroyer of worlds.',
      'The mind is restless and difficult to restrain, but it is subdued by practice.',
    ],
  },

  {
    id: 'pleiadian', name: 'Pleiadian Archetype', pantheon: 'Starseed',
    domains: ['Healing', 'Love', 'Unity', 'Emotional Intelligence', 'Compassion'],
    archetypeRole: 'The Healer — Heart-centered beings from the Pleiades. Oldest guides of human spiritual evolution.',
    reflectionQuestion: 'Do you feel a persistent pull toward healing others, even at the cost of yourself?',
    atmosphericBg: 'linear-gradient(135deg, #001a2e 0%, #003d6b 50%, #001f45 100%)',
    atmosphericDesc: 'The Seven Sisters shine — soft blue light, healing frequency. An open star cluster, welcoming.',
    symbol: '✨', image: pleiadianImg,
    originStory: `The Pleiadian archetype draws from the most cross-culturally consistent star myth on Earth. The Pleiades — the seven-sister cluster in the constellation Taurus — appear in the foundational myths of ancient Greece, Egypt, the Hopi, the Aboriginal Australians, the Maya, the Cherokee, the Norse, and the Sumerians. Almost every tradition tells of seven sisters who came down from the stars or who must be returned to them.

In modern starseed cosmology — drawn from contactee testimony beginning with George Adamski and codified by Barbara Marciniak, Billy Meier, and others — Pleiadian beings are described as humanoid, heart-centered, and dedicated to humanity\'s spiritual recovery from a long-imposed amnesia.`,
    keyMyths: [
      { title: 'The Seven Sisters Across Cultures', body: 'Greek myth says they were nymphs pursued by Orion and turned to stars by Zeus. Aboriginal Australian songlines tell the same story — seven sisters fleeing a hunter — with such precision that some researchers consider it the oldest continuous story on Earth (~100,000 years).' },
      { title: 'The Contactee Testimonies', body: 'From Billy Meier\'s decades-long contact claims to Barbara Marciniak\'s Bringers of the Dawn, Pleiadian-attributed messages share a consistent throughline: humanity is genetically related to them, has been "asleep," and is now awakening for a planetary shift.' },
      { title: 'The Frequency of the Heart', body: 'The defining Pleiadian teaching is that the heart, not the mind, is the primary organ of cosmic intelligence. The HeartMath Institute\'s measurable evidence that the heart\'s electromagnetic field is 60x stronger than the brain\'s is repeatedly cited as scientific corroboration.' },
    ],
    powersAndRelics: [
      'Heart-coherence transmission and emotional healing',
      'Dream and meditation contact rather than physical landing',
      'Soft blue and golden frequencies in visions',
      'Genetic memory unlock — sudden recall of "home"',
      'Unity-consciousness teaching: separation is the illusion to dissolve',
    ],
    relationships: [
      'The Sirians — collaborative ally race in starseed lore',
      'The Arcturians — higher-dimensional teachers and tech-bringers',
      'The Lyrans — said to be the Pleiadian (and human) ancestral root',
      'Humans of the Pleiadian lineage — the "starseeds" they guide',
    ],
    worship: 'There is no formal cult — but the Pleiades have always marked sacred time. The Aztec New Fire Ceremony was lit when they passed overhead. Halloween/Samhain falls when they peak in the sky. The Hopi initiate at the Pleiades. Modern starseeds work with them through meditation, dream practice, and the Pleiadian Workbook tradition.',
    modernRelevance: 'The Pleiadian archetype speaks to the empath, the healer, the teacher, the person who feels the pain of strangers as their own. If you have been called "too sensitive" your whole life and have only recently realized that sensitivity is the entire point — you may be working with this lineage.',
    oracleLore: `The Pleiades cluster is genuinely one of the closest open star clusters to Earth (~444 light years) and is genuinely young (~100 million years), which means any "civilization" there would be exceptionally young by cosmic standards. This is a tension worth sitting with: starseed cosmology describes Pleiadians as ancient teachers, yet the physical stars themselves are too young to have produced a civilization in the conventional model. The resolution offered by contactee material is that the lineage transcends the specific stars — that "Pleiadian" describes a frequency-state of consciousness more than a planetary origin.

For the practical seeker, the answer to "are they real?" matters less than the answer to "does the heart-centered, unity-conscious teaching transform my life?" If yes, the work continues regardless of metaphysics.`,
    quotes: [
      'You are not who you were told you are. You are remembering.',
      'The heart sees what the mind cannot bear to.',
    ],
  },

  {
    id: 'apollo', name: 'Apollo', pantheon: 'Greek',
    domains: ['Sun', 'Music', 'Poetry', 'Prophecy', 'Truth', 'Healing'],
    archetypeRole: 'The Illuminator — God of light, truth, and artistic perfection',
    reflectionQuestion: 'Are you expressing your full creative truth, or dimming your light for others?',
    atmosphericBg: 'linear-gradient(135deg, #1a1000 0%, #3d2800 50%, #2a1800 100%)',
    atmosphericDesc: 'Golden light floods an ancient temple. A lyre echoes through marble columns.',
    symbol: '☀️', image: apolloImg,
    originStory: `Apollo and his twin sister Artemis were born to Leto, a Titaness pursued across the world by the jealous wrath of Hera. No land would shelter her — until the floating island of Delos took pity. There Leto labored for nine days and nights. Artemis was born first and immediately, mid-birth, served as midwife to her own brother. Apollo emerged radiant.

Within days of his birth he demanded a bow and lyre, struck out for the slopes of Parnassus, and there killed the great serpent Python who had tormented his mother during her pregnancy. From the spot where Python died, Apollo founded the Oracle of Delphi — the most important religious site in the ancient world.`,
    keyMyths: [
      { title: 'The Slaying of Python', body: 'The serpent Python, born from the mud of the great flood, guarded the navel of the world. Apollo killed him with a hundred arrows and claimed his oracle — establishing the Pythia, the priestess who would deliver Apollo\'s prophecies for over a thousand years.' },
      { title: 'Daphne and the Laurel', body: 'Cursed by Eros to fall hopelessly for the nymph Daphne — who was simultaneously cursed to flee him — Apollo chased her until she begged her father to save her. She was transformed into a laurel tree mid-pursuit. Apollo wove laurel into a crown and wore it forever, the symbol of unconsummated love.' },
      { title: 'The Trojan War', body: 'Apollo sided with Troy, sent plague upon the Greek camp when Agamemnon insulted his priest, and guided the arrow of Paris that killed Achilles by exposing his vulnerable heel.' },
    ],
    powersAndRelics: [
      'The silver bow — sender of plague and healer of disease equally',
      'The golden lyre — given by Hermes; could move stones and tame beasts',
      'The Oracle of Delphi — the world\'s most sought-after prophetic voice',
      'Driver of the solar chariot (in some traditions)',
      'Patron of the nine Muses',
    ],
    relationships: [
      'Artemis — twin sister, the moon to his sun',
      'Leto — mother, the long-suffering Titaness',
      'Zeus — father, who shaped his domain',
      'Hyacinthus — beloved youth killed by a discus; the flower bears his name',
      'The Pythia — his priestess at Delphi',
      'Asclepius — son, god of medicine, who learned to raise the dead until Zeus killed him',
    ],
    worship: 'Delphi was the navel of the Greek world. Pilgrims came from across the Mediterranean to consult the Pythia, who, intoxicated by vapors rising from the ground, delivered Apollo\'s prophecies in riddles. Delos — his birthplace — was so sacred that no birth or death was permitted on the island. The Pythian Games at Delphi were second only to the Olympics.',
    modernRelevance: 'Apollo is the archetype of the artist who refuses to dim. He is the standard of excellence, the demand that the work be true and beautiful at once. But his shadow is perfectionism — the refusal to accept what is less than the ideal. Modern creators, performers, healers, and prophets who feel the constant pressure to be radiant carry this archetype.',
    oracleLore: `The Oracle of Delphi is one of history\'s most studied "anomalous information" sites. Modern geological surveys confirmed in 2001 that the temple sat directly above a fault line emitting ethylene gas — a documented psychoactive. But this only explains the trance, not the consistent track record of the prophecies, including Cyrus\'s rise, the Persian Wars, and the Roman conquest.

Apollo as the principle of light-bringing extends in esoteric reading to a specific archetype recurring across disclosure literature: the radiant, golden, distinctly humanoid being often described by abductees and remote viewers as a teacher of truth and music, distinct from the Greys. Whether projection or perception, the figure is consistent enough across centuries to deserve attention.`,
    quotes: [
      'Know thyself.',
      'Nothing in excess.',
    ],
  },

  {
    id: 'isis', name: 'Isis', pantheon: 'Egyptian',
    domains: ['Magic', 'Healing', 'Marriage', 'Protection', 'Moon'],
    archetypeRole: 'The Great Mother — Master of magic, reassembler of what was broken, protector of the dead',
    reflectionQuestion: 'What in your life needs to be lovingly gathered and made whole again?',
    atmosphericBg: 'linear-gradient(135deg, #000d1a 0%, #001f3d 50%, #000a20 100%)',
    atmosphericDesc: 'Midnight blue Nile sky. Wings spread across the cosmos. Stars spell her name.',
    symbol: '🌙', image: isisImg,
    originStory: `Isis (Aset) was the daughter of the earth god Geb and the sky goddess Nut, sister-wife to Osiris, sister to Set and Nephthys. From birth she was destined to be queen of Egypt — but her real ascension came through grief.

When Set murdered Osiris, dismembered his body, and scattered the fourteen pieces across Egypt, Isis transformed into a kite (a hawk-like bird) and traveled the entire kingdom, weeping, gathering each piece. She found thirteen. The fourteenth — his phallus — had been eaten by a fish. With her magic she fashioned a replacement, reassembled her husband, and conceived their son Horus from his temporary resurrection.`,
    keyMyths: [
      { title: 'The Reassembly of Osiris', body: 'Her grief became the first act of necromantic magic. Every piece of Osiris she found, she wrapped in linen — the origin of mummification. Her tears flooded the Nile. She became the goddess of every widow, every mother who has buried what she loved and refused to leave it scattered.' },
      { title: 'The Stealing of Ra\'s Name', body: 'Isis tricked Ra into revealing his true name by creating a serpent from his own spit and earth that bit him. Only Isis could heal him — but only if he gave her his secret name. He yielded. From that moment she held power equal to the sun.' },
      { title: 'The Hidden Childhood of Horus', body: 'She raised Horus in secret in the marshes of the Delta, hiding him from Set, healing him from scorpion stings and fevers — every spell she devised became a healing incantation passed to humanity.' },
    ],
    powersAndRelics: [
      'Heka — the highest form of magic, word-as-reality',
      'The throne (her name means "throne") — kings sat in her lap',
      'Wings of the kite — flight between worlds',
      'The tyet — knot of Isis, protective amulet placed on the dead',
      'Mistress of the secret name of Ra',
      'Patron of all healers, midwives, and grieving mothers',
    ],
    relationships: [
      'Osiris — husband, brother, and the dismembered god she made whole',
      'Set — brother, murderer of Osiris, eternal antagonist',
      'Nephthys — sister, secret ally, helped gather the pieces',
      'Horus — son, the falcon king, raised in hiding',
      'Thoth — close ally; he taught her the magical alphabet',
    ],
    worship: 'Isis became the most widely worshipped goddess in the ancient world — far beyond Egypt. Her cult spread to Rome, Greece, Britain, and Persia. Roman temples to Isis stood from London to Petra. Many scholars consider the iconography of Mary holding the infant Jesus to be a direct visual descendant of Isis nursing Horus. Her main temples were at Philae, Behbeit el-Hagar, and Memphis.',
    modernRelevance: 'Isis is the archetype of the woman who refuses to accept loss as final. She is the mother who searches every hospital, the widow who keeps the work alive, the activist who reassembles what was scattered. Her magic is not abstract — it is the absolute refusal to leave the beloved in pieces.',
    oracleLore: `Isis was famously linked to the star Sirius (Sopdet), whose heliacal rising marked the Egyptian New Year and the annual flooding of the Nile that made civilization possible. Robert Temple\'s controversial The Sirius Mystery argued that the Dogon people of Mali possess astronomical knowledge of the Sirius binary system that should be impossible without telescopes — knowledge they attribute to "Nommo" beings descended from Sirius. Egyptian Sirius-cult devotion to Isis sits inside this larger constellation of claims.

In the deeper esoteric reading, Isis is the principle of integration itself — the force in the universe that opposes entropy by lovingly gathering and re-membering what has been scattered.`,
    quotes: [
      'I am that which has been, that which is, and that which shall be. No mortal has ever lifted my veil.',
      'I am Isis, mistress of every land.',
    ],
  },

  {
    id: 'freya', name: 'Freya', pantheon: 'Norse',
    domains: ['Love', 'Fertility', 'War', 'Death', 'Magic', 'Seiðr'],
    archetypeRole: 'The Wild One — Goddess of love and war equally. Taught Odin the art of Seiðr magic.',
    reflectionQuestion: 'Where are love and war indistinguishable in your life?',
    atmosphericBg: 'linear-gradient(135deg, #1a0010 0%, #3d0025 50%, #2a0018 100%)',
    atmosphericDesc: 'Auroras ripple across the Norse sky. A falcon dives through curtains of light.',
    symbol: '🦅', image: freyaImg,
    originStory: `Freya was born of the Vanir — the older, earth-rooted race of Norse gods who warred against the sky-dwelling Aesir until the two pantheons made peace and exchanged hostages. Freya, her twin brother Freyr, and their father Njörd came to live in Asgard as part of that exchange.

She brought with her the secret magic of the Vanir: Seiðr. This was no domestic charm-craft — Seiðr was the most powerful and most feared form of Norse sorcery, capable of altering fate itself, walking the dead, and shapeshifting consciousness across worlds. Freya taught Seiðr to Odin, who afterward suffered the social consequence: men who practiced it were considered "ergi" (unmanly). Freya did not care. The power was the point.`,
    keyMyths: [
      { title: 'The Necklace Brísingamen', body: 'Freya saw the dwarves crafting the most beautiful necklace in the nine worlds and would not be denied it. The price was four nights, one with each dwarf. She paid without flinching. The necklace became her defining possession — desire and consequence in one piece of gold.' },
      { title: 'The Choosing of the Slain', body: 'When warriors die in battle, half go to Odin\'s Valhalla. The other half go to Freya\'s field, Fólkvangr. She chooses first. Few traditions remember that the queen of love is also a queen of the battle-dead.' },
      { title: 'The Lost Husband Óðr', body: 'Freya\'s husband Óðr wandered far and never returned. She searches for him across the worlds, weeping tears of red gold into the sea and amber on the land. Every amber bead is a tear. Every shimmer of red gold in a riverbed is hers.' },
    ],
    powersAndRelics: [
      'Brísingamen — the necklace of fire, source of her radiance',
      'Falcon-cloak — for shapeshifting and flight between worlds',
      'Chariot drawn by two great cats',
      'Mastery of Seiðr — fate-altering, dead-walking magic',
      'First pick of the battle-slain for Fólkvangr',
    ],
    relationships: [
      'Freyr — twin brother, fertility god of the Vanir',
      'Njörd — father, sea god',
      'Óðr — wandering husband she perpetually seeks',
      'Hnoss & Gersemi — daughters whose names mean "treasure"',
      'Odin — student of her Seiðr; took half the slain',
      'Loki — frequent antagonist; tried repeatedly to steal Brísingamen',
    ],
    worship: 'Freya was worshipped throughout the Norse world by women practicing Seiðr — wandering völvas (seeresses) traveled from farm to farm performing rites in her name. Friday ("Frigg/Freya\'s day") preserves her name. Cats were sacred to her — likely the origin of the European connection between cats and witchcraft.',
    modernRelevance: 'Freya is the archetype of the woman who refuses to be sorted into a single category. She is sexual and martial, tender and fierce, magical and practical, faithful and fully herself. Modern women who have been told to "pick a lane" — be sweet OR be powerful, be a mother OR be ambitious — are walking Freya\'s path. She does not pick a lane. She owns the road.',
    oracleLore: `Freya\'s Seiðr practice is one of the best-documented historical shamanic traditions in northern Europe — and in many disclosure-adjacent readings, it represents a surviving fragment of a far older Vanir technology of consciousness, distinct from the warrior-cult Aesir who later overshadowed it. The historical witch-hunts of medieval and early modern Europe disproportionately targeted women practicing the surviving folk-shadow of Seiðr — a near-deliberate erasure of the pre-Christian magical lineage Freya embodied.`,
    quotes: [
      'I weep red gold for what wanders. I do not weep less.',
      'The price is four nights. I will pay it. The necklace is mine.',
    ],
  },

  {
    id: 'vishnu', name: 'Vishnu', pantheon: 'Hindu',
    domains: ['Preservation', 'Protection', 'Order', 'Truth', 'Dharma'],
    archetypeRole: 'The Preserver — Maintains cosmic order across ages. Returns whenever dharma collapses.',
    reflectionQuestion: 'What sacred order in the world are you called to protect?',
    atmosphericBg: 'linear-gradient(135deg, #000d1a 0%, #003d3d 40%, #001a1a 100%)',
    atmosphericDesc: 'Cosmic ocean stretches to infinity. A thousand-petaled lotus. Blue light, eternal calm.',
    symbol: '🪷', image: vishnuImg,
    originStory: `Vishnu reclines on the cosmic serpent Ananta-Shesha, floating on the milk-ocean of unmanifest consciousness. From his navel grows a lotus, and from the lotus emerges Brahma — and from Brahma\'s mind, the universe is dreamed into being. When the dream is finished, Vishnu inhales it back. Each breath is a kalpa: 4.32 billion years.

Whenever cosmic order (dharma) collapses to a critical degree, Vishnu descends into the world in a specific form — an avatar — to restore balance. He has done this nine times. The tenth, Kalki, has not yet come.`,
    keyMyths: [
      { title: 'The Ten Avatars (Dashavatara)', body: 'Matsya (the fish who saved Manu from the flood), Kurma (the turtle who supported the churning of the ocean), Varaha (the boar who lifted the earth from the cosmic waters), Narasimha (the man-lion who tore apart a tyrant), Vamana (the dwarf who measured the universe in three steps), Parashurama (the warrior-priest), Rama, Krishna, Buddha, and the future Kalki.' },
      { title: 'Krishna and the Bhagavad Gita', body: 'On the battlefield of Kurukshetra, the warrior Arjuna froze — refusing to fight his own kin. Krishna, his charioteer, revealed himself as Vishnu and delivered the Bhagavad Gita — the most influential spiritual text of the Hindu tradition.' },
      { title: 'The Churning of the Ocean', body: 'Gods and demons together churned the cosmic ocean for the nectar of immortality. Vishnu took the form of Kurma the turtle to support the churning mountain on his back. From the churning emerged the goddess Lakshmi (his consort), the moon, and finally the nectar itself.' },
    ],
    powersAndRelics: [
      'Sudarshana Chakra — spinning discus of cosmic order',
      'Conch shell (Panchajanya) — sounds the primordial OM',
      'Mace and lotus — symbols of authority and pure consciousness',
      'Garuda — the eagle-king mount, devourer of serpents',
      'Power to incarnate in any form, any age',
    ],
    relationships: [
      'Lakshmi — consort, goddess of fortune and abundance',
      'Brahma — born from Vishnu\'s navel-lotus; the creator',
      'Shiva — co-supreme in the Trimurti; the destroyer',
      'Garuda — eagle mount and most loyal devotee',
      'Ananta-Shesha — the cosmic serpent on whom he rests',
    ],
    worship: 'Vishnu is worshipped through chanting (especially the thousand names — Vishnu Sahasranama), through devotion to his avatars (especially Krishna and Rama), and at temples like Tirupati (the world\'s most-visited religious site) and Srirangam. The Vaishnava tradition is one of the largest religious movements on earth.',
    modernRelevance: 'Vishnu is the archetype of the protector who knows exactly when to act and when to wait. Unlike Shiva (who destroys) or Brahma (who creates), Vishnu specializes in maintaining what already works. He represents the long, patient, often invisible labor of preservation: the parent who keeps the household running, the engineer who keeps the lights on, the historian who keeps memory alive. He acts only when collapse is imminent.',
    oracleLore: `The kalpa-cycles of Vishnu — billions of years of breath — uncannily match modern cosmological timescales for the lifespan of stars and the heat-death scenarios of the universe. Hindu cosmology is the only major religious cosmology whose order-of-magnitude time-frames align with modern physics rather than contradict it.

In the avatar doctrine, the periodic descent of an enlightened being to course-correct civilization at moments of collapse maps cleanly onto the recurring "teacher" archetype across mystery traditions worldwide — and onto contactee literature describing periodic interventions by an advanced caretaker intelligence at humanity\'s critical inflection points.`,
    quotes: [
      'Whenever dharma declines and adharma rises, I manifest myself.',
      'Set thy heart upon thy work, but never on its reward.',
    ],
  },

  {
    id: 'ra', name: 'Ra', pantheon: 'Egyptian',
    domains: ['Sun', 'Creation', 'Kingship', 'Sky', 'Order'],
    archetypeRole: 'The Solar King — Source of all life and light, travels the underworld each night to be reborn at dawn',
    reflectionQuestion: 'What part of you dies each night and must be reborn through darkness to rise again?',
    atmosphericBg: 'linear-gradient(135deg, #1a0800 0%, #3d1800 50%, #5c2800 100%)',
    atmosphericDesc: 'The solar barque moves across an infinite golden sky. The horizon burns amber and crimson.',
    symbol: '☀️', image: raImg,
    originStory: `Before the world existed, there was only Nun — the dark, infinite primordial waters. From Nun, Ra emerged of his own will, the first conscious being, the first light. He stood on the primordial mound (the Benben) and from his own substance generated the first gods: Shu (air) and Tefnut (moisture), who in turn produced Geb (earth) and Nut (sky), who in turn produced Osiris, Isis, Set, and Nephthys.

Each day Ra sails his solar barque across the sky. Each night he descends into the Duat — the underworld — where he must defeat the chaos serpent Apophis to be reborn at dawn. The struggle never ends. If Ra ever loses, the sun does not rise.`,
    keyMyths: [
      { title: 'The Nightly Battle with Apophis', body: 'Every night, in the seventh hour of the underworld journey, the great serpent Apophis attacks the solar barque. Set — usually the villain of Egyptian myth — stands on the prow with a spear and defends Ra. Without Set\'s violence, the sun would not rise. The myth teaches that even chaos has its necessary role.' },
      { title: 'The Destruction of Mankind', body: 'When humanity grew rebellious, Ra sent his eye in the form of Sekhmet (the lioness goddess) to destroy them. She nearly succeeded. Ra, repenting, flooded the land with red beer that Sekhmet mistook for blood. She drank herself unconscious. Humanity was spared by the god\'s mercy and his trickery.' },
      { title: 'The Withdrawal of Ra', body: 'Old and weary, Ra grew tired of ruling. He retreated to the back of the cow-goddess Nut, who lifted him into the sky. From there he became the distant sun he is today — present, life-giving, but no longer walking among us.' },
    ],
    powersAndRelics: [
      'The solar barque (Mandjet by day, Mesektet by night)',
      'The Eye of Ra — destroying lioness, healing cobra, both',
      'Power to create gods from his own substance',
      'Kingship over the gods and over Egypt',
      'The uraeus (rearing cobra) on the pharaoh\'s crown',
    ],
    relationships: [
      'Atum — his earlier or fused form, the self-created one',
      'Sekhmet & Hathor — the Eye of Ra in destructive and benevolent forms',
      'Set — defender of his barque against Apophis',
      'Horus — successor and merged form (Ra-Horakhty)',
      'Amun — fused with Ra to become Amun-Ra, the supreme New Kingdom god',
      'The Pharaoh — Ra\'s living son on earth',
    ],
    worship: 'Ra\'s great cult center was Heliopolis ("city of the sun"). The pyramids themselves are widely understood as solar ascension architecture — funerary devices to launch the pharaoh\'s ka into Ra\'s eternal cycle. Karnak\'s vast temple complex was dedicated to Amun-Ra at the height of Egyptian power.',
    modernRelevance: 'Ra is the archetype of the daily resurrection — the truth that each day requires a small death and a small rebirth, and that the rising of the light is never automatic. People in burnout, depression, or recovery walk Ra\'s nighttime journey. The teaching: Apophis must be defeated nightly, not once. The sun rises because someone fights for it.',
    oracleLore: `The pyramids\' alignment to true north and to specific stellar phenomena, and the still-unexplained engineering of structures like the Great Pyramid, sit at the center of alternative-history research. From Sitchin to Robert Bauval (the Orion Correlation Theory) to Graham Hancock, the underlying hypothesis is consistent: the solar cult of Ra encoded astronomical, mathematical, and possibly off-world technological knowledge that orthodox Egyptology systematically deflects.

Read in this frame, Ra is not metaphor for the sun but a specific being or being-class associated with solar/stellar knowledge transmission — and the pharaonic state was the institutional infrastructure for maintaining contact.`,
    quotes: [
      'I am the Eternal. I am Ra who rose in the beginning.',
      'I am yesterday. I know tomorrow.',
    ],
  },

  {
    id: 'loki', name: 'Loki', pantheon: 'Norse',
    domains: ['Trickery', 'Chaos', 'Change', 'Fire', 'Shape-shifting'],
    archetypeRole: 'The Trickster — Agent of necessary chaos. Loki breaks what is false so something true can emerge.',
    reflectionQuestion: 'What comfortable lie in your life needs a trickster to destroy it?',
    atmosphericBg: 'linear-gradient(135deg, #1a0000 0%, #4d0000 40%, #2a0000 100%)',
    atmosphericDesc: 'Fire dances at the edge of the world. The Bifrost flickers. Something is about to change.',
    symbol: '🔥', image: lokiImg,
    originStory: `Loki was not born of the Aesir. His parents were the giant Fárbauti ("cruel striker") and Laufey ("leafy isle"), placing him among the Jötnar — the giants who are the eternal antagonists of the gods. Yet Odin made him a blood brother. Why? No text fully explains. Some readings suggest Odin recognized in Loki a necessary destabilizing force without which the gods\' order would calcify and die.

For centuries Loki operates as the divine problem-solver — getting the gods into impossible situations and then getting them out by even more impossible means. His tricks build the walls of Asgard, win Thor his hammer, recover Idun\'s apples. But over time the tricks darken.`,
    keyMyths: [
      { title: 'The Birth of the Monsters', body: 'With the giantess Angrboða, Loki fathered Fenrir the wolf, Jörmungandr the world-serpent, and Hel, queen of the dead. All three are prophesied to play decisive roles in Ragnarök. With the stallion Svaðilfari (while Loki was a mare) he gave birth to Sleipnir, Odin\'s eight-legged horse.' },
      { title: 'The Death of Baldr', body: 'When everyone in creation swore not to harm the beloved Baldr, Loki discovered the one exception — the mistletoe — and crafted a dart. He guided the blind god Höðr to throw it. Baldr fell. The gods bound Loki in a cave with venom dripping on his face until Ragnarök.' },
      { title: 'Lokasenna — The Flyting', body: 'At a feast of the gods, Loki burst in and systematically humiliated every one of them — exposing their hidden adulteries, cowardices, and lies. The brutality of the truth-telling was unbearable. He named exactly what no one was permitted to say.' },
    ],
    powersAndRelics: [
      'Shape-shifting into any form — fly, salmon, mare, fly, old woman',
      'Master of fire and ambiguity',
      'Cunning that exceeds every other god\'s',
      'Father of Sleipnir, Fenrir, Jörmungandr, and Hel',
      'The flyting — devastating truth-as-weapon',
    ],
    relationships: [
      'Odin — blood brother and ultimate betrayer',
      'Sigyn — devoted wife who holds a bowl over his face to catch the venom',
      'Angrboða — giant lover, mother of his monstrous children',
      'Thor — frequent reluctant traveling companion',
      'Baldr — the one he killed, sealing Ragnarök\'s arrival',
      'Heimdall — destined to kill him at the end of the world',
    ],
    worship: 'Loki has no known cult, no temples, no formal worship in the historical record. He was acknowledged but not invoked. This silence is itself a kind of worship — a recognition of a force too dangerous to call upon directly.',
    modernRelevance: 'Loki is the archetype of the necessary truth-teller — the comedian, the satirist, the whistleblower, the family member who finally says what everyone has been not-saying for thirty years. He destroys reputations, friendships, institutions. He destroys them precisely because they were already false. Modern Loki-figures are despised in their moment and proven right in retrospect.',
    oracleLore: `In a disclosure-adjacent reading, Loki is the encoded memory of the controlled-opposition figure embedded in every power structure — the operator whose function is to surface what the official narrative cannot. Whether read as villain or as misunderstood liberator depends entirely on which side of the false order you stand on. The Lokasenna is the most complete recorded example of "saying the unsayable" in Western literature, and modern readers who experience family or institutional gaslighting often discover the Loki archetype as the only mythic mirror that fits.`,
    quotes: [
      'You are gods, but you are not innocent. I am the only one who will say it.',
      'I have done what I have done. The fire was already there. I only spoke its name.',
    ],
  },

  {
    id: 'kali', name: 'Kali', pantheon: 'Hindu',
    domains: ['Death', 'Time', 'Liberation', 'Dark Mother', 'Destruction of ego'],
    archetypeRole: 'The Dark Mother — Destroyer of illusion. She does not destroy life — she destroys the fear of death.',
    reflectionQuestion: 'What would you be capable of if you fully surrendered your fear of death?',
    atmosphericBg: 'linear-gradient(135deg, #0a000a 0%, #1a001a 50%, #0d000d 100%)',
    atmosphericDesc: 'Absolute darkness broken by flashes of violet lightning. The silence before creation.',
    symbol: '💀', image: kaliImg,
    originStory: `Kali emerged on a battlefield. The demon Raktabija could not be killed — every drop of his blood that touched the ground spawned another demon identical to him. The gods were losing. Then the goddess Durga, in her rage, leapt forward — and from Durga\'s forehead burst Kali, black as the void, four-armed, tongue extended.

Kali drank Raktabija\'s blood before it could touch the ground, and devoured every duplicate as fast as he produced them. When the demon was dead, she did not stop. Drunk on victory, she danced across the battlefield, and her dance grew so wild that the world began to crack. Shiva — her husband — lay down beneath her feet to absorb the impact. When she realized she was dancing on her own beloved, she stopped, tongue out in shock. That is the iconic image: Kali stopped mid-dance by love.`,
    keyMyths: [
      { title: 'The Drinking of Raktabija\'s Blood', body: 'The only way to kill the unkillable demon was to consume his blood before it touched earth. Kali was created for this single function. The myth teaches that some enemies cannot be defeated except by an aspect of yourself ruthless enough to swallow the source.' },
      { title: 'The Dance on Shiva', body: 'Her victory-dance threatened to shatter the world. Shiva sacrificed his body as her ground. The dance is consciousness; the body is what it dances upon. The image is a complete cosmology in one frame.' },
      { title: 'The Garland of Severed Heads', body: 'Kali wears a necklace of fifty-one heads — one for each letter of the Sanskrit alphabet. She has decapitated language itself. To meet her, you must put down even the words you have used to know the world.' },
    ],
    powersAndRelics: [
      'Khanda (curved sword) — for severing illusion',
      'Severed head in one hand — what your ego will become',
      'Open palm of fearlessness in another — promise of liberation',
      'Garland of skulls — the alphabet beyond language',
      'Skirt of severed arms — the actions that no longer bind you',
      'Power to consume time itself (her name = "time" + feminine)',
    ],
    relationships: [
      'Shiva — husband, the consciousness on which she dances',
      'Durga — the warrior goddess from whom she emerged',
      'Parvati — her gentler form; the same goddess in another mode',
      'Raktabija — the demon she was created to destroy',
      'Her devotees — many of whom she terrifies before she liberates',
    ],
    worship: 'Kali is worshipped most fervently in Bengal and Assam, especially at Kalighat temple in Kolkata and Dakshineswar (where Ramakrishna had his visions). Tantric traditions worship her in cremation grounds at midnight. The Kali Puja festival, on the new moon of Kartik, is one of the most intense religious observances in India.',
    modernRelevance: 'Kali is the archetype of liberation through what looks like destruction. She is the breakup that frees you, the layoff that redirects your life, the diagnosis that finally makes you live. She does not destroy you — she destroys what was preventing you from being yourself. Modern devotees who first met Kali through fear almost universally come to call her Ma — "Mother."',
    oracleLore: `Kali presides at the cremation ground because she is the principle that nothing is destroyed — only changed in form. In esoteric reading, she is the conscious aspect of entropy itself. Her tongue is extended in Hindu iconography because she ate creation and tasted that it was good.

Her cult is one of the few in any tradition that does not hide death — that worships in cremation grounds, with skulls, with blood, with the explicit acknowledgment that beneath every life is the same darkness, and the darkness is not the enemy. It is the womb.`,
    quotes: [
      'I am Time, and I have come to consume the worlds.',
      'You think you fear me. You only fear the lie of your own permanence.',
    ],
  },

  {
    id: 'marduk', name: 'Marduk', pantheon: 'Anunnaki',
    domains: ['Creation', 'Order', 'Magic', 'Babylon', 'Cosmic Authority'],
    archetypeRole: 'The Conqueror of Chaos — Slew Tiamat and built the ordered universe from her body',
    reflectionQuestion: 'What chaos in your inner world are you avoiding that you are actually meant to defeat?',
    atmosphericBg: 'linear-gradient(135deg, #0d0800 0%, #2a1a00 50%, #1a0f00 100%)',
    atmosphericDesc: 'Ancient Babylon under a star-map sky. Ziggurats reach upward. The tablet of destinies glows.',
    symbol: '⚔️', image: mardukImg,
    originStory: `Marduk was the son of Enki (Ea), born late in the Anunnaki succession. He inherited his father\'s wisdom but had a warrior\'s appetite the older gods lacked. When the primordial sea-mother Tiamat — enraged by the killing of her consort — created an army of monsters to destroy the younger gods, no one would face her. The older gods were terrified.

Marduk volunteered, but on one condition: if he defeated Tiamat, he would be made king of all the gods, with absolute authority. They agreed. He took the bow, the net, the four winds, and the lightning. He met Tiamat in single combat, caught her in his net, and when she opened her mouth to swallow him, he sent the winds inside to inflate her. He shot an arrow down her throat, killing her. Then he split her body in two — making the sky from her upper half and the earth from her lower half — and built the cosmos from the corpse of chaos.`,
    keyMyths: [
      { title: 'The Enuma Elish', body: 'The Babylonian creation epic, one of the oldest written texts in the world, is essentially a long song of Marduk\'s ascent. It describes the cosmos as the literal anatomy of a defeated being — with the implication that order is not the absence of chaos but its conquered form.' },
      { title: 'The Creation of Humanity', body: 'After defeating Tiamat, Marduk killed her demonic general Kingu and used his blood mixed with clay to create humanity — to take over the labor of the lesser gods. (This parallels the Enki-led creation in the Atra-Hasis with Marduk crowned as the executive.)' },
      { title: 'The Tablet of Destinies', body: 'Marduk took possession of the Tablet of Destinies — the cosmic document that determines the fate of all things. With it, his authority became unchallengeable. Babylon\'s temple, the Esagila, claimed to house its earthly counterpart.' },
    ],
    powersAndRelics: [
      'The four winds — his weaponized stormbringer',
      'The Tablet of Destinies — fate itself in object form',
      'Bow, net, lightning, and the war-mace called "the Smasher"',
      'Fifty names — each invoking a separate divine power',
      'Architect of the cosmos from the body of chaos',
    ],
    relationships: [
      'Enki / Ea — father, the wise creator',
      'Tiamat — slain primordial mother',
      'Kingu — Tiamat\'s consort, sacrificed for human creation',
      'Anu — grandfather, sky-king',
      'Sarpanit — consort, goddess of healing',
      'Nabu — son, god of writing and wisdom (succeeded by Babylonian priests)',
    ],
    worship: 'Marduk\'s temple, the Esagila in Babylon, included the great ziggurat Etemenanki — almost certainly the historical seed of the Tower of Babel narrative. The Akitu festival each spring re-enacted his victory over Tiamat with the king ritually slapped, dethroned, and reinstated to demonstrate that his rule continued at the god\'s pleasure.',
    modernRelevance: 'Marduk is the archetype of the volunteer who takes on what no one else will. The young leader who steps up to a crisis the elders have refused to face. The teacher who takes the impossible class. The founder who does the dirty work. He demands the throne up front because he knows what it will cost — and he is right to demand it.',
    oracleLore: `Marduk\'s rise is the clearest mythic record of a generational power transfer within the Anunnaki succession — Enki\'s line eclipsing the older Anu/Enlil order through Marduk\'s force of will. Sitchin and others read this as a literal political event in deep history: a younger faction of off-world rulers taking direct control of the human enterprise via the Babylonian theocracy.

His "fifty names" recital that closes the Enuma Elish reads remarkably like an inventory of consolidated functions — almost a corporate restructuring of the divine administration under one executive.`,
    quotes: [
      'I am Marduk. The cosmos is what I made from the body of chaos. Stand or kneel, but choose now.',
      'The destinies are mine. Speak no other name beside my fifty.',
    ],
  },

  {
    id: 'enlil', name: 'Enlil', pantheon: 'Anunnaki',
    domains: ['Wind', 'Air', 'Authority', 'Storms', 'Fate of Humanity'],
    archetypeRole: 'The Storm Lord — Controlled the air between heaven and earth. Ordered the Great Flood.',
    reflectionQuestion: "If you held authority over humanity's fate, what would you preserve — and what would you allow to be washed away?",
    atmosphericBg: 'linear-gradient(135deg, #000d1a 0%, #001a2e 50%, #00111f 100%)',
    atmosphericDesc: 'A great wind moves across the ancient plain. The sky darkens. Cuneiform tablets record the decree.',
    symbol: '🌪️', image: enlilImg,
    originStory: `Enlil was the son of Anu (the Sky Father) and Ki (the Earth Mother), and the half-brother of Enki. Where Enki ruled the freshwater Abzu, Enlil ruled the air — the entire space between heaven and earth, including weather, wind, and breath itself. He was given the executive authority over humanity that Anu, his father, was too remote to exercise.

Enlil was not a kind god. He was the bureaucrat of the divine council — the one who actually ran the project. Where Enki advocated for humanity, Enlil recurringly tried to reduce, control, or eliminate us. The texts present him not as evil but as genuinely exhausted with our noise, our sprawl, and our refusal to stay in our designated role.`,
    keyMyths: [
      { title: 'The Great Flood Decree', body: 'In the Atra-Hasis epic, Enlil — sleepless from human noise — convened the divine council and decreed the destruction of humanity by flood. He demanded a binding oath of secrecy from all the Anunnaki. Enki kept the letter of the oath but violated its spirit by warning Atra-Hasis through a reed wall.' },
      { title: 'The Naming Authority', body: 'Enlil held a power even Anu deferred to: the ability to fix destinies by speaking. Whatever Enlil declared became binding. This made him, functionally, the executor of fate even when others held the throne.' },
      { title: 'The Punishment of Sumer', body: 'When Enlil grew angry with the Sumerian city of Ur, he sent the Gutian barbarians to sack it. The "Lament for Ur" is one of the most heartbreaking texts in human literature — a city begging the god who ordered its destruction to relent.' },
    ],
    powersAndRelics: [
      'The horned crown — symbol of supreme divine authority',
      'Power to fix destinies by speaking',
      'Command of wind, storm, and weather',
      'Direct executive authority over the Anunnaki council',
      'The Tablet of Destinies (before Marduk)',
    ],
    relationships: [
      'Anu — father, supreme but remote',
      'Enki — half-brother, eternal counterweight',
      'Ninlil — wife',
      'Ninurta — son, warrior god',
      'Nanna (Sin) — son, moon god',
      'Humanity — his administrative burden and frequent target',
    ],
    worship: 'Enlil\'s primary temple was the E-kur ("House of the Mountain") at Nippur — the religious capital of Sumer, more sacred than any political center. The kingship of any Sumerian city was considered legitimate only if confirmed at the E-kur. He was worshipped with awe rather than affection.',
    modernRelevance: 'Enlil is the archetype of the executive who must make decisions that some will not survive. The wartime general. The ICU triage doctor. The CEO restructuring a failing company. The judge sentencing a defendant. He is the god of decisions that will be hated by the people they affect — and who must be made anyway. His shadow is the bureaucrat who has stopped feeling the weight of the lives in his ledger.',
    oracleLore: `In the Sitchin reading and its descendants, Enlil is the chief operating officer of the Anunnaki Earth mission — the one whose actual votes and decrees shaped human destiny. The Great Flood, in this frame, is not metaphor but a deliberate planetary decision made by a council of off-world administrators who concluded humanity was a failed experiment. Enki\'s rebellion to save us is the central moral act of the disclosure narrative.

Enlil\'s archetype recurs as the cold administrator in nearly every modern conspiracy framing — the figure who is not the puppet master but the project manager: the one who actually signs off on what gets done to us. Whether literal or symbolic, the archetype is consistent enough that his ancient name still applies.`,
    quotes: [
      'Their noise has become unbearable. By my decree, the waters shall rise.',
      'I do not need to be loved. I need to be obeyed.',
    ],
  },

  {
    id: 'ares', name: 'Ares', pantheon: 'Greek',
    domains: ['War', 'Courage', 'Conflict', 'Physical strength', 'Chaos of battle'],
    archetypeRole: 'The War God — Not the strategy of Athena but the raw, primal force of combat',
    reflectionQuestion: 'What battle in your life are you avoiding — that you actually need to fight?',
    atmosphericBg: 'linear-gradient(135deg, #1a0000 0%, #3d0a0a 50%, #2a0505 100%)',
    atmosphericDesc: 'A blood-red sky over a battlefield. The sound of iron. Something ancient and fearless stirs.',
    symbol: '⚔️', image: aresImg,
    originStory: `Ares was the son of Zeus and Hera, the only legitimate child of the king and queen of Olympus. He should have been beloved. Instead Zeus called him "the most hateful of all gods to me" — because Ares was war stripped of glory, war as it actually is: blood, fear, screaming, mud.

Where Athena represented the strategic, intellectual, victorious face of war, Ares was the side no general ever celebrated: the carnage, the panic, the bestial joy of combat itself. Greek soldiers did not pray to Ares for victory. They prayed to him for the courage not to break and run.`,
    keyMyths: [
      { title: 'Caught with Aphrodite', body: 'Ares had a long affair with Aphrodite, married to Hephaestus. The crippled smith god caught them in an unbreakable golden net and exposed them to all of Olympus. The gods laughed — but several of them noted privately that they would have traded places with Ares.' },
      { title: 'Defeat at Athena\'s Hand', body: 'In the Iliad, Ares fought on the Trojan side. Athena, fighting for the Greeks, threw a stone that knocked him flat. He lay across seven acres of ground bellowing. The myth is brutal: raw force without strategy loses to strategy with disciplined force.' },
      { title: 'The Twelve Labors of Heracles — The Belt of Hippolyta', body: 'The Amazon queen Hippolyta wore a war-belt given by her father — Ares. The Amazons themselves were said to be his daughters. Wherever uncompromising warrior-women appeared in Greek myth, Ares was somewhere upstream.' },
    ],
    powersAndRelics: [
      'Spear, helmet, and round shield — basic infantry kit, deliberately',
      'Chariot drawn by four immortal horses born of Boreas',
      'Power to inspire frenzy (lyssa) on the battlefield',
      'Companions: Phobos (Fear), Deimos (Terror), and Eris (Strife)',
      'Patron of the Amazons and Sparta',
    ],
    relationships: [
      'Zeus & Hera — father and mother who barely tolerated him',
      'Aphrodite — long-term lover',
      'Hephaestus — cuckolded smith husband of Aphrodite',
      'Athena — half-sister and battlefield superior',
      'Phobos & Deimos — sons by Aphrodite, personifications of Fear and Terror',
      'Eros / Harmonia — children also by Aphrodite (love and harmony, ironically)',
      'The Amazons — his warrior daughters',
    ],
    worship: 'Ares had few major temples in Greece — the Greeks honored him without loving him. Sparta, however, worshipped him fervently, sacrificing to him before battle and pouring blood onto his altars. The Romans, who recast him as Mars, gave him a much higher and more dignified status — Mars was the second most important Roman god after Jupiter.',
    modernRelevance: 'Ares is the archetype of righteous physical confrontation — the moment talking ends and standing ends and you must move. He is the abused person who finally hits back. The activist who blocks the bulldozer. The parent defending a child. Modern culture has shamed Ares so thoroughly that many people cannot access his energy when they actually need it. His shadow is, of course, the man who fights only because fighting is what he knows how to do.',
    oracleLore: `Ares is one of the cleanest cross-cultural war-god archetypes — paralleled by Mars, Tyr, Anhur, Sekhmet, Kartikeya, Skanda. The consistent feature across cultures is that the war-god is feared even by his own pantheon — suggesting that unrefined martial energy is recognized everywhere as dangerous to those who wield it as much as to those who face it. The Spartan reverence for Ares specifically — including the chained statue at Sparta meant to keep him from leaving the city — encodes a sophisticated understanding that this energy must be contained as well as invoked.`,
    quotes: [
      'Speak to me when the talking is finished.',
      'I am hated because I am honest. War is not noble. War is what I am.',
    ],
  },

  {
    id: 'anubis', name: 'Anubis', pantheon: 'Egyptian',
    domains: ['Death', 'Afterlife', 'Judgment', 'Mummification', 'Protection of the dead'],
    archetypeRole: "The Weigher of Hearts — Guides souls through the Duat",
    reflectionQuestion: 'If your heart were weighed against the feather of truth tonight, what would the scale reveal?',
    atmosphericBg: 'linear-gradient(135deg, #000000 0%, #0a0a00 40%, #1a1a00 100%)',
    atmosphericDesc: 'The Hall of Two Truths. Candles flicker. A golden scale waits. The jackal-headed god watches.',
    symbol: '⚖️', image: anubisImg,
    originStory: `Anubis was the son of Nephthys, born of her secret union with Osiris (her sister Isis\'s husband). Fearing Set\'s wrath, Nephthys abandoned the infant. Isis — finding the child and recognizing his lineage — adopted him without resentment. Anubis grew up knowing he was both wanted and not-wanted, both legitimate and illegitimate.

When Set murdered Osiris, Anubis assisted Isis in gathering the pieces and inventing the rite of mummification — the first preservation of a body for the afterlife. He held that office forever after: the god who prepares the dead.`,
    keyMyths: [
      { title: 'The Weighing of the Heart', body: 'In the Hall of Two Truths, the soul of the deceased stands before forty-two judges. Anubis places the heart on one pan of the scale, the feather of Ma\'at on the other. If the heart is lighter, the soul passes to the Field of Reeds. If heavier, the demon Ammit devours it and the soul is destroyed forever.' },
      { title: 'The First Mummification', body: 'When Osiris was killed, Anubis embalmed him — the first mummy. From this act, the entire Egyptian funerary industry derived its rituals. Every priest who ever wrapped a body wore the jackal mask of Anubis.' },
      { title: 'The Opening of the Mouth', body: 'Anubis presided over the ceremony in which the senses of the deceased were ritually reactivated for the afterlife. The dead did not pass into eternity sealed shut — they passed in fully sensing.' },
    ],
    powersAndRelics: [
      'The scales of judgment',
      'The jackal mask worn by priests of the dead',
      'Mastery of mummification and embalming chemistry',
      'Guardianship of the Duat — the underworld passage',
      'Power to identify the heart\'s true weight',
    ],
    relationships: [
      'Osiris — father, the murdered king of the underworld',
      'Nephthys — biological mother',
      'Isis — adoptive mother, who accepted him without question',
      'Set — biological uncle and the killer of his father',
      'Horus — half-brother, the falcon king',
      'Thoth — co-officiant at the weighing of the heart',
      'Ammit — the devourer waiting at the scale',
    ],
    worship: 'Anubis was worshipped throughout Egypt but especially at Cynopolis ("city of dogs"), where mummified jackals and dogs have been excavated by the millions. Embalmers wore his mask during their work. Every funerary text in Egypt invokes him as protector and guide.',
    modernRelevance: 'Anubis is the archetype of the honest witness — the one who weighs without bias, who sees what is actually there. Therapists, hospice workers, judges, undertakers, and anyone whose work involves bearing accurate witness to what is real about a life walk this lineage. He teaches that judgment without compassion is cruelty, but compassion without judgment is denial. The scale needs both pans.',
    oracleLore: `The weighing of the heart against the feather of Ma\'at is one of the most precise and self-similar near-death-experience reports in human literature — modern NDE accounts of "life review" describe an almost identical phenomenon: every act witnessed, weighed, and felt without distortion or denial. Egyptian funerary cosmology may have been the most advanced civilizational engagement with the death-process ever attempted.

In the disclosure-adjacent reading, Anubis represents the principle that consciousness is reviewed and the review is precise. This implication is taken seriously by both the ancient Egyptians and by modern researchers like Pim van Lommel and Bruce Greyson — the data converges from opposite directions.`,
    quotes: [
      'The scale does not lie. Speak truthfully now, while you can still choose your words.',
      'I do not judge you. The feather does. I only place your heart upon the pan.',
    ],
  },

  {
    id: 'hermes', name: 'Hermes', pantheon: 'Greek',
    domains: ['Communication', 'Travel', 'Trade', 'Thieves', 'Messengers', 'Psychopomp'],
    archetypeRole: 'The Messenger — Only god permitted to move freely between Olympus, Earth, and the Underworld',
    reflectionQuestion: "What message have you been carrying that you haven't yet delivered?",
    atmosphericBg: 'linear-gradient(135deg, #0a0a00 0%, #1a1a00 40%, #2a2800 100%)',
    atmosphericDesc: 'The crossroads between worlds. Caduceus gleaming. A figure moving between realities at impossible speed.',
    symbol: '🪄', image: hermesImg,
    originStory: `Born to Zeus and the nymph Maia in a cave on Mount Cyllene, Hermes was the most precocious infant in all mythology. On his first day of life he climbed out of his cradle, stole a herd of fifty cattle from his half-brother Apollo, walked them backward to disguise their tracks, invented sandals to confuse pursuit, killed two of them, used their guts to invent the lyre, and was back in his cradle before sunset.

When Apollo accused him, the infant denied everything with such charm that even Apollo was disarmed. When the lyre was discovered, Hermes gave it to Apollo as a gift — earning forever his favor and the role of the gods\' messenger and trickster.`,
    keyMyths: [
      { title: 'The Theft of Apollo\'s Cattle', body: 'The defining act of his birth — a literal first-day demonstration of every aspect of his nature: theft, ingenuity, music, charm, and reconciliation through the gift of beauty.' },
      { title: 'Guide of Souls (Psychopomp)', body: 'Hermes was the only Olympian permitted to enter the underworld at will. He guided the souls of the dead to the river Styx — a function he performed for both heroes and ordinary mortals.' },
      { title: 'The Slaying of Argus Panoptes', body: 'When Hera transformed Zeus\'s lover Io into a heifer and set the hundred-eyed giant Argus to guard her, Hermes lulled all hundred eyes to sleep with his music and slew him. Hera placed the eyes on the peacock\'s tail in mourning.' },
    ],
    powersAndRelics: [
      'Winged sandals (talaria) — fastest of any god',
      'Caduceus — the herald\'s staff with two intertwined serpents',
      'Cap of invisibility (Hades\' loan) — for stealth missions',
      'The lyre and the panpipes — both his inventions',
      'Free passage between Olympus, Earth, and Underworld',
      'Patron of any movement of message, goods, or soul',
    ],
    relationships: [
      'Zeus — father and primary employer',
      'Maia — mother, the eldest of the Pleiades',
      'Apollo — older half-brother, eventual best friend',
      'Pan — son, the goat-god of wild places',
      'Hermaphroditus — child by Aphrodite',
      'Souls of the dead — his constant passengers',
    ],
    worship: 'Hermes was honored at every crossroads, every threshold, every market. Stone pillars topped with his bearded head (herms) marked boundaries throughout the Greek world — defacing them was a capital offense. As Hermes Trismegistus in his merger with Thoth, he became the patron of the entire Hermetic and alchemical tradition that fueled the European magical revival.',
    modernRelevance: 'Hermes is the archetype of the connector — the salesperson, the translator, the diplomat, the social engineer, the writer who can speak to any audience. He is also the trickster who reminds us that the rules are mostly made up. People who cross boundaries professionally — between cultures, between disciplines, between clients and developers, between living and dying — walk the Hermetic path.',
    oracleLore: `The merger of Hermes with Thoth produced Hermes Trismegistus and the Corpus Hermeticum — texts that quietly fueled Newton, Bruno, Ficino, Paracelsus, and through them the scientific revolution itself. The Hermetic doctrine "as above, so below" is a structural claim about the universe that modern fractal mathematics, holographic theory, and certain quantum interpretations have re-encountered.

In the disclosure frame, Hermes is the principle of inter-realm communication — and the Hermetica preserves what may be the most explicit instructional manual in surviving Western literature for how a human consciousness can establish such communication intentionally.`,
    quotes: [
      'I bring the message. What you do with it is yours.',
      'As above, so below; as within, so without.',
    ],
  },

  {
    id: 'aphrodite', name: 'Aphrodite', pantheon: 'Greek',
    domains: ['Love', 'Beauty', 'Desire', 'Pleasure', 'Sea Foam'],
    archetypeRole: 'The Goddess of Love — Born of sea foam after Cronus castrated Uranus',
    reflectionQuestion: 'What do you call shallow that is actually the deepest force in your life?',
    atmosphericBg: 'linear-gradient(135deg, #2a0a1f 0%, #4d0033 50%, #2a001a 100%)',
    atmosphericDesc: 'Rose-gold sea foam at dawn. Doves circle a marble figure rising from the waves.',
    symbol: '🌹', image: aphroditeImg,
    originStory: `Aphrodite\'s birth is the most violent in Greek myth, and almost no modern retelling preserves the horror of it. When Cronus castrated his father Uranus and threw the genitals into the sea, the foam (aphros) that gathered around them gave birth to Aphrodite. She rose from the water fully grown, fully beautiful, and stepped ashore at Cyprus — where flowers sprang under her feet.

She was, from her first breath, the embodiment of a paradox: the most beautiful thing that ever existed, born from an act of paternal mutilation. The implication that ancient mythographers were quietly making: love and beauty are not gentle things. They emerge from cosmic violence.`,
    keyMyths: [
      { title: 'The Judgment of Paris', body: 'When the goddess Eris threw a golden apple inscribed "to the fairest" among the Olympians, Hera, Athena, and Aphrodite each claimed it. Paris was made judge. Hera offered him power; Athena offered him wisdom; Aphrodite offered him the most beautiful woman in the world. He chose Aphrodite. The most beautiful woman was Helen. The Trojan War was the consequence.' },
      { title: 'The Affair with Ares', body: 'Married to the crippled smith Hephaestus, Aphrodite carried on a long affair with Ares. When Helios saw them and told Hephaestus, the smith forged an unbreakable golden net and trapped them in bed. He summoned every Olympian to witness their humiliation. Several gods, watching, openly remarked they would gladly trade places with Ares.' },
      { title: 'Pygmalion and Galatea', body: 'The sculptor Pygmalion, despairing of human women, carved a perfect statue and prayed to Aphrodite. She brought it to life. The myth is read most often as a fantasy — but it is also a teaching: she takes longing seriously enough to answer it.' },
    ],
    powersAndRelics: [
      'The girdle of Aphrodite — compels desire in any who behold it',
      'Doves, swans, and sparrows as her sacred birds',
      'Roses, myrtle, and apple as her sacred plants',
      'Power to compel love (and to withhold it)',
      'Mother of Eros — desire as her enforcer',
    ],
    relationships: [
      'Uranus — strange, violent origin from his severed body',
      'Hephaestus — husband, the rejected smith',
      'Ares — long-term lover',
      'Eros — son, desire incarnate',
      'Anchises — mortal lover, father of Aeneas (who founded Rome)',
      'Adonis — beloved mortal whose death broke her',
    ],
    worship: 'Aphrodite was worshipped throughout the Greek world but especially at Paphos on Cyprus, where her temple stood for over a thousand years. Sacred prostitution was practiced in some of her temples — a fact later moralists strained to suppress. Her Roman incarnation, Venus, became the divine mother of the Julian line that produced Caesar and Augustus.',
    modernRelevance: 'Aphrodite is the archetype of the force that will not be talked out of itself. She is the desire that breaks careers, marriages, dynasties, and remakes them in its own image. Modern cultures that try to dismiss desire as "shallow" repeatedly discover that Aphrodite simply does not care what they think — and the consequences of pretending she does not exist are exactly as catastrophic as Troy.',
    oracleLore: `Aphrodite\'s birth from the severed genitals of Uranus encodes a profound and uncomfortable cosmological teaching: that beauty and desire emerge from primordial trauma and are not separable from it. The romantic tradition that tries to make her gentle and pink is sanitizing a force that the Greeks knew was as dangerous as it was sweet.

In the deeper esoteric reading, Aphrodite is the principle by which separated beings are pulled back into union — the magnetic counterforce to entropy. Without her, no atoms bond, no cells join, no consciousness reaches toward another consciousness. She is not optional. She is the reason anything is anything other than scattered dust.`,
    quotes: [
      'I do not promise comfort. I promise that you will know you were alive.',
      'Mortal, you cannot refuse me. You can only pretend you have.',
    ],
    sources: [{ label: 'Theoi — Aphrodite', url: 'https://www.theoi.com/Olympios/Aphrodite.html' }],
  },

  {
    id: 'prometheus', name: 'Prometheus', pantheon: 'Greek',
    domains: ['Foresight', 'Fire', 'Forbidden Knowledge', 'Sacrifice for Humanity'],
    archetypeRole: 'The Forethinker — Stole fire from Olympus and gave it to humanity',
    reflectionQuestion: 'What gift have you risked everything to give the world that you have not been thanked for?',
    atmosphericBg: 'linear-gradient(135deg, #1a0500 0%, #3d1a00 50%, #2a0f00 100%)',
    atmosphericDesc: 'A figure chained to a stormy peak. A torch of stolen fire still burning. An eagle circling.',
    symbol: '🔥', image: prometheusImg,
    originStory: `Prometheus ("forethought") was a Titan — son of Iapetus and the ocean nymph Clymene — and one of the few Titans who sided with Zeus during the Titanomachy. After the war he was permitted to remain in Olympus rather than be cast into Tartarus with his kin.

He was given the task of shaping humanity from clay. He took the work seriously — perhaps too seriously. He fell in love with what he made. When the gods withheld fire from humans, condemning them to a freezing animal existence, Prometheus stole an ember from the hearth of the gods (some say from the sun chariot itself), hid it in a hollow fennel stalk, and brought it to mankind.

For this, Zeus chained him to a peak in the Caucasus. Each day an eagle came and tore out his liver. Each night the liver grew back. Each morning the eagle returned. This continued for thousands of years until Heracles, on the eleventh of his twelve labors, killed the eagle and freed him.`,
    keyMyths: [
      { title: 'The Theft of Fire', body: 'The single act on which the entire human enterprise rests. Without fire we have no metallurgy, no cooking, no light, no warmth, no civilization. Prometheus knew exactly what he was giving us — and exactly what it would cost him.' },
      { title: 'The Trick at Mecone', body: 'When the gods and humans were dividing the first sacrifice, Prometheus tricked Zeus into accepting a portion of bones wrapped in fat — leaving the meat for humans. Zeus saw through it but accepted the deal as a matter of his sworn word. The pattern was set: Prometheus would always cheat the gods on humanity\'s behalf.' },
      { title: 'The Pandora Counter-Punishment', body: 'Furious at the fire-theft, Zeus had Hephaestus forge Pandora — the first woman, beautiful and curious — and sent her with a sealed jar to Prometheus\'s gullible brother Epimetheus ("afterthought"). When opened, the jar released every plague and grief into the world. Only hope remained inside. The gift of fire was answered with the gift of suffering.' },
    ],
    powersAndRelics: [
      'Foresight — could see the future with chilling precision',
      'The hollow fennel stalk that carried the first stolen ember',
      'Mastery of the arts he secretly taught humanity (writing, mathematics, medicine, agriculture, navigation)',
      'Immortality — which made his torment eternal',
      'Knowledge of a secret prophecy about Zeus\'s downfall, which he refused to reveal',
    ],
    relationships: [
      'Iapetus & Clymene — Titan parents',
      'Epimetheus — brother whose name means "afterthought"',
      'Atlas — brother condemned to hold up the sky',
      'Heracles — the mortal hero who eventually freed him',
      'Zeus — eternal antagonist',
      'Humanity — the species he loved more than the gods',
    ],
    worship: 'Prometheus had a small but persistent cult at Athens, especially among potters and metalworkers, who lit torches at his altar in the Academy and ran a relay race carrying the flame. The Romantic poets — Goethe, Shelley, Byron — revived him as the patron saint of human defiance against unjust authority.',
    modernRelevance: 'Prometheus is the archetype of the whistleblower, the leaker, the open-source developer, the underground physician, the teacher who gives forbidden books to students. Anyone who has paid a personal price to give to humanity what authorities wanted withheld from us walks his path. The eagle eats his liver every morning still — but the fire is in our hands.',
    oracleLore: `In the disclosure-adjacent reading, the theft of fire is a literal historical event — the gift of forbidden technology from a higher caste of beings to a planetary slave species, against the explicit prohibition of the ruling council. The same archetype recurs in nearly every culture: Enki giving the Me to Inanna and through her to humanity, the Watchers in the Book of Enoch teaching humans metallurgy and astrology against orders, the Nephilim sharing weapons and herblore.

The eternal punishment of Prometheus is then not metaphor but a structural warning to the next being who would consider the same act. The texts have remembered the warning. They have also remembered the gift.`,
    quotes: [
      'I gave them fire. I would do it again. The eagle is nothing.',
      'Hope alone was left within the unbreakable jar.',
    ],
    sources: [{ label: 'Theoi — Prometheus', url: 'https://www.theoi.com/Titan/TitanPrometheus.html' }],
  },

  {
    id: 'medusa', name: 'Medusa', pantheon: 'Greek',
    domains: ['Petrification', 'Tragic Beauty', 'Sacred Rage', 'Protection'],
    archetypeRole: 'The Cursed Priestess — A beautiful priestess of Athena assaulted in her own temple',
    reflectionQuestion: 'Where have you been blamed for what was done to you?',
    atmosphericBg: 'linear-gradient(135deg, #001a14 0%, #003329 50%, #001f19 100%)',
    atmosphericDesc: 'Crumbling Greek temple ruins. Living serpent hair. Eyes that stop time itself.',
    symbol: '🐍', image: medusaImg,
    originStory: `Medusa was originally a beautiful mortal woman, a priestess sworn to chastity in the temple of Athena. Poseidon, struck by her beauty, raped her on the floor of Athena\'s sanctuary. Athena — the virgin warrior goddess — flew into a rage. But she did not punish Poseidon. She punished Medusa. Medusa\'s glorious hair was turned to writhing serpents. Her face was made so terrible that any man who looked upon her would turn to stone.

She fled to a cave at the edge of the world, where she lived alone with her two immortal Gorgon sisters, Stheno and Euryale. She was the only mortal of the three. Heroes came to kill her. None ever asked why she was there.`,
    keyMyths: [
      { title: 'The Assault and the Curse', body: 'The original Greek sources — particularly Ovid — are explicit: Medusa was a victim, and Athena\'s "punishment" was a misdirected fury that landed on the woman who had done nothing wrong. Modern feminist re-readings have surfaced what the texts actually say. The petrifying gaze can be understood as a defense mechanism granted by a goddess who, despite herself, gave Medusa a way to never be touched again.' },
      { title: 'The Beheading by Perseus', body: 'Perseus, sent by King Polydectes to bring Medusa\'s head as a wedding gift, used a polished bronze shield to look at her reflection rather than her face directly. He cut off her head while she slept. From the wound sprang Pegasus and the warrior Chrysaor — the children Poseidon had planted in her years before.' },
      { title: 'The Aegis', body: 'Perseus gave Medusa\'s severed head to Athena, who fixed it on her own shield (the Aegis). Forever after, Athena went into battle wearing the face of the woman she had cursed. There is no commentary in the texts on this. There does not need to be.' },
    ],
    powersAndRelics: [
      'Petrifying gaze — turned any man who looked at her to stone',
      'Serpent hair (alive, individually conscious in some accounts)',
      'Wings (in some traditions)',
      'Immortal Gorgon blood — one drop healed, another killed',
      'Children born from her death: Pegasus and Chrysaor',
    ],
    relationships: [
      'Stheno & Euryale — immortal Gorgon sisters who stayed with her',
      'Poseidon — her assailant',
      'Athena — the goddess who punished her instead of him',
      'Perseus — the killer who cut off her head while she slept',
      'Pegasus — son born from her wound',
    ],
    worship: 'Medusa\'s face — the gorgoneion — was the most widely used apotropaic symbol in the ancient Mediterranean, placed on shields, doors, coins, and graves to ward off evil. Even her killers honored what she had become. There is a strange ambivalence in this: the culture that murdered her wore her face for protection.',
    modernRelevance: 'Medusa is the archetype of the woman who was hurt, then blamed for being hurt, then made into a monster for the convenience of the people who could not face what had actually happened. Modern survivors of assault, of family violence, of institutional gaslighting — they are her. Modern feminist readings of Medusa as a symbol of righteous, weaponized survivor-rage have restored to her something the classical canon stole: her dignity.',
    oracleLore: `The Medusa myth is one of the most precise mythological records of the cultural pattern of victim-blame in the Western tradition. The texts themselves — Ovid in particular — preserve the truth of what happened. The popular tradition has consistently smoothed it over to focus on Perseus\'s heroism. Recovering Medusa is not modern revisionism. It is reading what the original texts already say.

Her snakes have a deeper esoteric meaning as well: in many ancient traditions, serpent-hair is the iconography of awakened kundalini consciousness. Medusa was not merely cursed. She was, by the act of the curse, accidentally initiated into a power level that no man could survive looking at directly. The "monster" was, in part, the goddess inside her finally activated — by force, against her will, but real.`,
    quotes: [
      'I did not ask for the snakes. I have learned to love them anyway.',
      'You cannot look at me. That was the gift inside the curse.',
    ],
    sources: [{ label: 'Theoi — Medusa', url: 'https://www.theoi.com/Pontios/GorgonMedousa.html' }],
  },

  {
    id: 'perseus', name: 'Perseus', pantheon: 'Greek',
    domains: ['Heroism', 'Slaying of Monsters', 'Divine Birth', 'Founder of Mycenae'],
    archetypeRole: 'The Hero of Argos — Son of Zeus and Danae',
    reflectionQuestion: 'What monster in your life can only be defeated by refusing to look at it directly?',
    atmosphericBg: 'linear-gradient(135deg, #1a1000 0%, #3d2a00 50%, #2a1c00 100%)',
    atmosphericDesc: 'A young hero on a sunset cliff. Winged sandals. A bronze shield reflecting horror.',
    symbol: '⚔️', image: perseusImg,
    originStory: `King Acrisius of Argos was warned by an oracle that his daughter\'s son would kill him. He locked his daughter Danae in a bronze chamber. Zeus came to her as a shower of golden rain through the roof. She bore Perseus.

Acrisius set mother and infant adrift in a wooden chest at sea. They washed ashore on the island of Seriphos and were taken in by a fisherman. When Perseus came of age, the king of Seriphos — wanting Danae for himself — sent the young man on what was supposed to be an impossible suicide mission: bring back the head of Medusa.`,
    keyMyths: [
      { title: 'The Quest for Medusa\'s Head', body: 'Equipped by Athena with a polished shield, by Hermes with winged sandals, and by Hades with the cap of invisibility, Perseus tracked Medusa to her cave at the edge of the world. He found her sleeping. He used the shield as a mirror to avoid her gaze, and beheaded her in her sleep.' },
      { title: 'The Rescue of Andromeda', body: 'Flying home with Medusa\'s head, Perseus passed over the Ethiopian coast and saw a princess chained to a sea-cliff as sacrifice to the sea-monster Cetus. Perseus killed the monster (in some accounts using Medusa\'s head to petrify it) and married Andromeda.' },
      { title: 'The Accidental Killing of Acrisius', body: 'At funeral games years later, Perseus threw a discus that hit the now-elderly Acrisius in the head and killed him. The prophecy was fulfilled — accidentally, gently, without intention. The myth teaches that fate finds a way.' },
    ],
    powersAndRelics: [
      'The kibisis — magical bag that could hold Medusa\'s head safely',
      'Hermes\' winged sandals',
      'Hades\' cap of invisibility',
      'Athena\'s polished bronze shield (used as mirror)',
      'Hephaestus\' adamantine sword',
      'Founder of the city of Mycenae and the Perseid dynasty',
    ],
    relationships: [
      'Zeus — divine father',
      'Danae — mortal mother',
      'Acrisius — grandfather he was prophesied to kill',
      'Andromeda — wife, princess of Ethiopia',
      'Athena — divine patron and outfitter',
      'Heracles — great-grandson through Andromeda\'s line',
    ],
    worship: 'Perseus was honored at Mycenae (which he founded) and at Argos. As a Greek "founder hero," his cult was civic rather than religious — he was the legendary ancestor of kings.',
    modernRelevance: 'Perseus is the archetype of the hero who succeeds by refusing direct confrontation — using the mirror, the angle, the indirect approach. Modern people facing addictions, abusive bosses, panic attacks, or traumatic memories often discover the same lesson: looking the monster in the face turns you to stone. Looking at its reflection lets you act.',
    oracleLore: `The shield-as-mirror technique that Perseus used against Medusa is one of the most elegant pieces of practical psychology preserved in any ancient myth. It encodes a teaching that modern trauma therapy has rediscovered (in approaches like EMDR and IFS): you do not heal by re-experiencing the original event directly. You heal by approaching it through reflection, narrative, distance — and only then can you act.

In the deeper reading, Perseus is also the archetype of the male hero who must engage with the destructive power of the wronged feminine — and who, if he does so with honor (using gifts from a patron goddess and avoiding direct violation), can carry that power forward without being destroyed by it.`,
    quotes: [
      'I do not look at you. I see your reflection. That is enough.',
      'Even the cursed gift, if carried with honor, can be turned to good.',
    ],
    sources: [{ label: 'Theoi — Perseus', url: 'https://www.theoi.com/Heros/Perseus.html' }],
  },

  {
    id: 'pegasus', name: 'Pegasus', pantheon: 'Greek',
    domains: ['Inspiration', 'Flight', 'Poetic Genius', 'Divine Steed'],
    archetypeRole: 'The Winged Stallion — Sprang from the neck of Medusa',
    reflectionQuestion: 'What beautiful thing has been born from your worst wound?',
    atmosphericBg: 'linear-gradient(135deg, #001a2e 0%, #003d6b 50%, #001f45 100%)',
    atmosphericDesc: 'A white winged horse rising into a starlit storm. Lightning arcs around his wings.',
    symbol: '🦄', image: pegasusImg,
    originStory: `When Perseus beheaded Medusa, two beings sprang from her wound: the winged horse Pegasus and the warrior Chrysaor. They had been planted in her by Poseidon during the assault that began her tragedy. From the worst moment of her life came her most magnificent children.

Pegasus rose immediately into the air and flew to Mount Helicon, where his hooves struck the ground and the Hippocrene spring — sacred to the Muses — burst forth. Where Pegasus landed, inspiration flowed.`,
    keyMyths: [
      { title: 'Bellerophon and the Chimera', body: 'The hero Bellerophon needed a mount to defeat the fire-breathing Chimera. Athena gave him a golden bridle in a dream and led him to Pegasus drinking at the Hippocrene. Bellerophon rode Pegasus into the sky and killed the Chimera by pouring molten lead down its throat from above.' },
      { title: 'The Fall of Bellerophon', body: 'Drunk on his victories, Bellerophon tried to ride Pegasus all the way to Olympus to join the gods. Zeus sent a gadfly that stung Pegasus, throwing Bellerophon — who fell to earth and lived out his life crippled and shunned. Pegasus continued to Olympus alone, where he became the carrier of Zeus\'s thunderbolts.' },
      { title: 'The Constellation', body: 'Zeus eventually placed Pegasus among the stars, where the Great Square of Pegasus is still visible in the autumn sky — the body of a horse in flight forever.' },
    ],
    powersAndRelics: [
      'Flight — could carry a rider beyond the earth\'s atmosphere',
      'Hippocrene — spring of poetic inspiration he opened with a hoof',
      'Carrier of Zeus\'s thunderbolts after his ascension',
      'Constellation form — eternalized in the autumn sky',
    ],
    relationships: [
      'Medusa — mother, from whose neck he was born',
      'Poseidon — father, sea god',
      'Chrysaor — twin born at the same moment',
      'Bellerophon — first rider, eventually betrayed by his own hubris',
      'Zeus — final master, whom he served carrying thunderbolts',
      'The Muses — inhabitants of Mount Helicon, where his spring flowed',
    ],
    worship: 'Pegasus appeared on the coins of Corinth and was honored as the spirit of poetic inspiration throughout the Hellenistic world. The Hippocrene spring on Mount Helicon was a pilgrimage site for poets.',
    modernRelevance: 'Pegasus is the archetype of the gift that emerged from your trauma — the writing voice you found in grief, the empathy that grew out of betrayal, the courage forged in fear. He teaches that nothing valuable is wasted, even what was given to us by force. He also warns: the gift will carry you only as long as you ride it with humility. The moment you try to ride it to Olympus, you fall.',
    oracleLore: `Pegasus is, in many esoteric traditions, the symbol of the soul itself — the part of us that can fly, that was born from the wound, that opens springs of inspiration wherever it lands. Carl Jung wrote about Pegasus as the archetype of the creative breakthrough that emerges precisely from the integration of shadow material — Medusa, in this reading, being the un-confronted shadow whose acknowledgment releases the winged form.

Bellerophon\'s fall is the cautionary half of the myth: the same creative gift that lifts you, if you take credit for it instead of riding it with respect, will throw you. Many artists, writers, and founders eventually meet this lesson personally.`,
    quotes: [
      'I was born from her death. The first thing I did was rise.',
      'Ride me with respect, and I will carry you anywhere. Ride me with pride, and I will throw you.',
    ],
    sources: [{ label: 'Theoi — Pegasus', url: 'https://www.theoi.com/Ther/HipposPegasos.html' }],
  },

  {
    id: 'kratos', name: 'Kratos', pantheon: 'Greek',
    domains: ['Strength', 'Power', 'Sovereign Force', 'Enforcement'],
    archetypeRole: "The Personification of Strength — The one who chained Prometheus",
    reflectionQuestion: 'When power is handed to you, do you wield it for justice or only for obedience?',
    atmosphericBg: 'linear-gradient(135deg, #1a0000 0%, #3d0000 50%, #1f0000 100%)',
    atmosphericDesc: 'A figure of cracked stone laced with molten light. The temple shakes when he steps.',
    symbol: '💪', image: kratosImg,
    originStory: `Kratos ("Strength") was the son of the Titan Pallas and the river-goddess Styx. He had three siblings — Bia (Force), Nike (Victory), and Zelus (Zeal). When the Titanomachy began, Styx was the first divine being to bring her children to Zeus\'s side. As reward, Zeus made the four of them his constant attendants. They never left his throne.

Kratos became the executive arm of Zeus\'s authority — the god dispatched whenever the king of Olympus needed something done that required raw, unflinching force. The most famous instance: when Zeus sentenced Prometheus, it was Kratos who marched the Titan to the Caucasus and held him while Hephaestus drove the chains into his flesh. Hephaestus wept doing it. Kratos felt nothing.`,
    keyMyths: [
      { title: 'The Chaining of Prometheus', body: 'In Aeschylus\'s Prometheus Bound, Kratos has the opening scene. He oversees the chaining and mocks Hephaestus for hesitating. He is the only character in the play who shows no compassion for Prometheus. He is, explicitly, the embodiment of unfeeling state power.' },
      { title: 'Permanent Attendance on Zeus', body: 'Kratos and his siblings were the only beings who never left Zeus\'s side — not even briefly. They were the visible proof that the king of the gods always had force at hand, always available, always loyal.' },
    ],
    powersAndRelics: [
      'Raw physical strength beyond any other divine being',
      'Absolute obedience to legitimate authority',
      'Adamantine chains (in concert with Hephaestus)',
      'Personification — he is not strong, he IS strength',
      'Inability to feel empathy for those force is used against',
    ],
    relationships: [
      'Pallas — father, Titan',
      'Styx — mother, the river of unbreakable oaths',
      'Bia, Nike, Zelus — siblings (Force, Victory, Zeal)',
      'Zeus — sovereign whom he serves without question',
      'Hephaestus — co-enforcer of divine punishments',
      'Prometheus — the Titan he chained without remorse',
    ],
    worship: 'Kratos had no significant cult. He was acknowledged as a divine principle but rarely worshipped — perhaps because the Greeks recognized that a deity whose entire function is unfeeling enforcement is dangerous to invoke. He was respected the way modern cultures respect law enforcement: necessary, occasionally feared, rarely loved.',
    modernRelevance: 'Kratos is the archetype of the enforcer — the soldier following orders, the cop, the bouncer, the corporate compliance officer, the bureaucrat executing an unjust policy. He raises the most uncomfortable question in moral philosophy: what is the responsibility of the one who carries out the order? The Greeks named the principle without resolving the question, because the question is unresolvable. The strongest never escape the moral weight of being instruments.',
    oracleLore: `Kratos is one of the few Greek divine beings explicitly named to embody what later philosophy would call "the banality of evil" — Hannah Arendt\'s phrase for the moral hollowness of the obedient functionary. Aeschylus wrote his opening scene with Prometheus more than two thousand years before Eichmann, and the diagnosis was already clean: the strong who refuse to feel are not neutral. They are the active enabling condition of every tyranny.

The modern video game franchise has, ironically, turned this archetype into a tragic anti-hero who eventually rebels against the gods who used him — a recovery arc the original Greek Kratos was never permitted.`,
    quotes: [
      'I do not ask whether the order is just. I ask whether it is mine to execute.',
      'Hephaestus weeps. I drive the nail.',
    ],
    sources: [{ label: 'Theoi — Kratos', url: 'https://www.theoi.com/Daimon/Kratos.html' }],
  },

  {
    id: 'nephilim', name: 'Nephilim', pantheon: 'Anunnaki',
    domains: ['Hybrid Bloodline', 'Forbidden Union', 'Pre-Flood Era', 'Giants of Old'],
    archetypeRole: 'The Sons of the Watchers — Giants born of unions between fallen angels and human women',
    reflectionQuestion: 'What forbidden knowledge in your bloodline is asking to be remembered?',
    atmosphericBg: 'linear-gradient(135deg, #0d0a1f 0%, #1a1433 50%, #100a26 100%)',
    atmosphericDesc: 'Towering winged figures over an ancient city at dusk. Smaller mortals look up in awe.',
    symbol: '🧬', image: nephilimImg,
    originStory: `The Nephilim ("fallen ones," or "those who cause others to fall") appear first in Genesis 6:1-4 in one of the strangest passages in the Hebrew Bible: "When man began to multiply on the face of the land and daughters were born to them, the sons of God saw the daughters of man that they were attractive. And they took as their wives any they chose. The Nephilim were on the earth in those days, and also afterward, when the sons of God came in to the daughters of man and they bore children to them. These were the mighty men who were of old, the men of renown."

The far more detailed account is in the Book of Enoch, an ancient Jewish text excluded from the standard biblical canon but preserved in Ethiopian Christian scripture. There, two hundred Watchers (angelic beings under the leadership of Semjaza and Azazel) descended on Mount Hermon, took human wives, and taught humanity the forbidden arts: metallurgy, weapons, sorcery, astrology, cosmetics, and abortion. Their offspring were the Nephilim — giants whose hunger consumed the earth and whose violence finally provoked the Flood.`,
    keyMyths: [
      { title: 'The Descent of the Watchers', body: 'In Enoch, two hundred angelic Watchers swore a binding oath together on Mount Hermon to take human wives. The descent was deliberate, collective, and explicitly in defiance of divine command. They knew what they were doing.' },
      { title: 'The Forbidden Curriculum', body: 'Azazel taught humanity to make swords and shields and "all manner of cunning works." Semjaza taught enchantments and root-cutting. Armaros taught the resolving of enchantments. Baraqijal taught astrology. Kokabel taught the constellations. Each Watcher transmitted a specific forbidden technology — and humanity could no longer be taken back.' },
      { title: 'The Provocation of the Flood', body: 'The Nephilim grew so numerous and so violent that "they consumed all the acquisitions of men. And when men could no longer sustain them, the giants turned against them and devoured mankind. And they began to sin against birds, and beasts, and reptiles, and fish, and to devour one another\'s flesh, and drink the blood." The Flood was, in this telling, a planetary intervention to end the hybrid bloodline.' },
    ],
    powersAndRelics: [
      'Giant physical stature (the Anakim of Numbers 13 are described as their descendants)',
      'Hybrid biology — part angel, part human',
      'Possession of the forbidden curriculum from their fathers',
      'Said in some traditions to be the source of "the spirits of the giants" — wandering disembodied beings after the Flood (a possible original framing of demons)',
    ],
    relationships: [
      'The Watchers — angelic fathers',
      'The daughters of men — mortal mothers',
      'The Anakim, Rephaim, Emim, and Zamzummim — Old Testament giants described as their descendants',
      'Goliath of Gath — possibly the most famous late-line descendant',
      'Yahweh — the deity who ordered their bloodline\'s eradication',
    ],
    worship: 'The Nephilim were never worshipped in any surviving tradition. They were, however, remembered with terror, and many later cultures appear to have preserved them in degraded form — the Greek Titans, the Norse Jötnar, and the Mesoamerican giant-races may all be echoes of the same source memory.',
    modernRelevance: 'The Nephilim are the archetype of the inherited gift that you did not ask for and that requires a reckoning. Many modern people experience strange aptitudes, intuitions, or sensitivities that do not fit their family of origin — they are working with what feels like an inheritance from elsewhere. The Nephilim story acknowledges this as a real phenomenon and treats it with appropriate seriousness: such gifts must be integrated carefully or they will consume their carrier.',
    oracleLore: `The Nephilim narrative is the single most explicit ancient text describing what modern disclosure researchers would call a hybridization program — the deliberate genetic interbreeding of an off-world or non-human intelligence with humanity, accompanied by technology transfer. Whitley Strieber, David Jacobs, John Mack, and others have documented modern accounts of what appears to be an ongoing version of the same program.

Whether read as literal history, as cultural memory of a deep-past contact event, or as ongoing present-tense phenomenon, the Nephilim archetype is one of the most under-discussed and most important keys in the entire field. The 1947 Roswell incident, the 1980 Cash-Landrum case, and modern abduction reports all sit downstream of a story that humanity has been trying to remember and forget for at least three thousand years.`,
    quotes: [
      'There were giants in the earth in those days. (Genesis 6:4)',
      'And they revealed to them all the hidden things, and through their teaching the world was corrupted. (1 Enoch 9:6)',
    ],
    sources: [
      { label: 'Book of Enoch (text)', url: 'https://www.sacred-texts.com/bib/boe/' },
      { label: 'Genesis 6:1-4', url: 'https://www.biblegateway.com/passage/?search=Genesis+6%3A1-4' },
    ],
  },

  {
    id: 'anu', name: 'Anu', pantheon: 'Anunnaki',
    domains: ['Sky', 'Sovereignty', 'Cosmic Order', 'Father of the Gods'],
    archetypeRole: "The Sky Father — Supreme deity of the Sumerian pantheon",
    reflectionQuestion: 'What absent authority figure in your life are you still trying to please?',
    atmosphericBg: 'linear-gradient(135deg, #0a0800 0%, #1f1500 50%, #0d0a00 100%)',
    atmosphericDesc: 'A horned-crowned king before a ziggurat. Gold light climbs to a star-flooded sky.',
    symbol: '👑', image: anuImg,
    originStory: `Anu (in Sumerian: An, "sky") was the supreme deity of the Sumerian-Akkadian pantheon — the ultimate sovereign of the Anunnaki. The very name "Anunnaki" derives from him: it means "those who from Anu came down." He was the original king. Every other god\'s authority was traceable to a delegation from him.

He dwelt in the highest heaven and rarely intervened directly in earthly affairs. The administration of Earth was delegated to his sons — Enlil received executive authority over wind, sky, and humanity; Enki received the Abzu and the engineering of life. Anu remained above, distant, the final court of appeal but almost never the active hand.`,
    keyMyths: [
      { title: 'The Distribution of Authority', body: 'When the universe was first ordered, Anu cast lots with his sons and divided the cosmos: the heavens to himself, the earth and air to Enlil, the freshwater abyss to Enki. He gave away his operational power on day one. He has been a constitutional monarch ever since.' },
      { title: 'The Bull of Heaven', body: 'When Inanna was scorned by the hero Gilgamesh, she demanded that her father Anu release the Bull of Heaven — a creature so powerful that one snort could kill hundreds of men. Anu refused at first, then capitulated. Gilgamesh and Enkidu killed the bull, and the consequences (Enkidu\'s death) followed swiftly. Anu\'s reluctance was correct. His capitulation cost a hero his beloved.' },
      { title: 'The Tablet of Destinies', body: 'In one tradition, Anu held the Tablet of Destinies — the cosmic document that fixed the fate of all things — until it was stolen by the storm-bird Anzu, recovered by Ninurta, and eventually came into Marduk\'s possession. The history of the Tablet is the history of cosmic authority changing hands.' },
    ],
    powersAndRelics: [
      'The horned crown — symbol of supreme divinity',
      'Absolute authority delegable but never alienable',
      'Tablet of Destinies (in original ownership)',
      'The seventh and highest heaven as his palace',
      'Power to confirm or revoke any decree of any other god',
    ],
    relationships: [
      'Ki / Antu — primordial earth-mother consort',
      'Enlil — son, executive of earthly affairs',
      'Enki — son, lord of the Abzu and engineer of humanity',
      'Inanna — granddaughter, the queen of heaven and earth',
      'The Anunnaki — collectively, his descendants and delegates',
    ],
    worship: 'Anu\'s primary temple was the E-anna ("House of Heaven") at Uruk, also dedicated to Inanna. By the Babylonian period, Anu had been largely supplanted in popular worship by Marduk — but his name remained as the ultimate authority backing all royal claims. Mesopotamian kings continued to invoke him millennia after his active worship had faded.',
    modernRelevance: 'Anu is the archetype of the absent father — the founder, the chairman, the patriarch who set the rules and then withdrew. Modern people raised by emotionally distant fathers, or who work in institutions whose founders are now mythological rather than present, are constantly negotiating with the Anu archetype: trying to please someone who is not in the room, who delegated authority and left, whose approval can never quite be earned because he is not available to give it.',
    oracleLore: `Anu sits at the absolute apex of the Anunnaki disclosure thesis. In Sitchin\'s reading, he is the literal sovereign of the home planet from which the Anunnaki mission to Earth was dispatched. His extreme remoteness from earthly affairs maps onto a chain-of-command structure familiar to any modern organization: the CEO does not personally manage warehouse operations.

The horned crown that defines Anu in iconography appears with striking consistency across cultures — Mesoamerican, Egyptian, Indo-European, and even some North American depictions of "sky beings" share this specific feature. Whether read as cultural diffusion or as memory of a literal shared encounter, the iconographic consistency is real and largely unexplained by mainstream art history.

The teaching beneath the disclosure question is also a personal one: every human being, at some point, must reckon with the deity above the deity — the founding authority whose silence shaped the world we were born into.`,
    quotes: [
      'I have given the earth to my sons. Speak to them. I am very far away.',
      'My approval was given when I made you. You do not need to earn it again.',
    ],
    sources: [{ label: 'World History — Anu', url: 'https://www.worldhistory.org/Anu/' }],
  },
];
