import setImg from '../assets/shadow/set.jpg';
import apepImg from '../assets/shadow/apep.jpg';
import tezcatlipocaImg from '../assets/shadow/tezcatlipoca.jpg';
import lilithImg from '../assets/shadow/lilith.jpg';
import helImg from '../assets/shadow/hel.jpg';
import ahrimanImg from '../assets/shadow/ahriman.jpg';
import tiamatImg from '../assets/shadow/tiamat.jpg';
import hadesImg from '../assets/shadow/hades.jpg';
import kaliShadowImg from '../assets/shadow/kali-shadow.jpg';
import lokiShadowImg from '../assets/shadow/loki-shadow.jpg';

export interface ShadowGod {
  id: string;
  name: string;
  pantheon: string;
  domains: string[];
  archetypeRole: string;
  shadowAspect: string;
  reflectionQuestion: string;
  atmosphericBg: string;
  atmosphericDesc: string;
  symbol: string;
  image: string;
  whyTheyreBad: string;       // What makes them "bad" — lore + behavior
  purpose: string;            // Why they exist in THIS app — what they teach
  ritualLore?: string;        // Oracle-tier (1000 XP): historical invocation/ritual details
  warning?: string;
  sources?: { label: string; url: string }[];
}

export const shadowGods: ShadowGod[] = [
  {
    id: 'set',
    name: 'Set',
    pantheon: 'Egyptian',
    image: setImg,
    domains: ['Chaos', 'Storms', 'Desert', 'Foreigners', 'Disorder'],
    archetypeRole: 'The Adversary — Murdered his brother Osiris and scattered him across Egypt. The necessary chaos that breaks the seal of order.',
    shadowAspect: 'The part of you that destroys what you love because you cannot bear its perfection.',
    whyTheyreBad: 'Set committed the original act of fratricide in Egyptian myth — luring Osiris into a coffin, killing him, and dismembering his body into 14 pieces scattered across the Nile. He represents the desert that consumes the green, the sandstorm that erases the path, and the brother who turns on his own. Yet the Egyptians did not erase him — they understood that without an adversary, there is no resurrection.',
    purpose: 'Set teaches you to recognize the inner saboteur — the part of you that destroys what you build because comfort threatens identity. He is in this codex because every initiate must meet the brother-killer within before the king inside can be resurrected.',
    reflectionQuestion: 'What have you sabotaged because you secretly believed you did not deserve it?',
    ritualLore: 'In the Late Period (664–332 BCE), Set worship persisted in the eastern Delta city of Avaris. Priests offered red-haired oxen and donkeys — animals associated with his desert chaos — by hurling them from cliffs. During the "Great Procession" festivals, effigies of Set were ritually dismembered in mirror of what he did to Osiris. In execration rites, his name was carved on red ceramic pots which were then smashed at temple thresholds, sealing the chaos outside. The Hyksos foreign rulers identified Set with their storm god Baal and built him a temple at Avaris where his cult included scapegoat rites — a single donkey was driven into the desert bearing the sins of the city.',
    atmosphericBg: 'linear-gradient(135deg, #1a0000 0%, #3d0a00 50%, #2a0500 100%)',
    atmosphericDesc: 'Red desert under a black sun. Sandstorms that erase footprints. The howl of a creature with no name.',
    symbol: '🐺',
    sources: [
      { label: 'Britannica — Set', url: 'https://www.britannica.com/topic/Seth-Egyptian-god' },
      { label: 'Pyramid Texts — Osiris myth', url: 'https://en.wikipedia.org/wiki/Osiris_myth' },
    ],
  },
  {
    id: 'apep',
    name: 'Apep (Apophis)',
    pantheon: 'Egyptian',
    image: apepImg,
    domains: ['Chaos', 'Annihilation', 'Pre-Creation Void', 'The Devourer'],
    archetypeRole: 'The Eater of the Sun — A serpent of pure non-existence. Ra battles him every night to ensure dawn returns.',
    shadowAspect: 'The nihilism that whispers that nothing matters and nothing is real.',
    whyTheyreBad: 'Apep is older than the gods themselves. He is what existed before existence — pure entropy, given form. Egyptian priests performed daily rituals against him because they believed if Ra ever lost the nightly battle, the sun would not rise. He was so feared his name was carved and ceremonially destroyed in the "Book of Overthrowing Apep." He has no temple, no offerings — only enemies.',
    purpose: 'Apep is in this codex as the symbol of the depressive void — the moment when nothing seems real and you wonder if the sun is worth the fight. To name him is to recognize the nihilism that has tried to swallow you, and to choose to face the dawn anyway.',
    reflectionQuestion: 'When the void in you whispers "give up," what part of you fights to see another sunrise?',
    ritualLore: 'Apep was never invoked — only un-invoked. The "Book of Overthrowing Apep" (Bremner-Rhind Papyrus, c. 310 BCE) contains the priestly liturgy: at dawn and dusk in the Temple of Karnak, priests of Amun-Ra would inscribe his name on papyrus and on wax serpent figures, then spit on them, slash them with flint knives, trample them, bind them with red thread, and finally burn them in a fire of brushwood — the smoke believed to drive his essence back into the void. The ritual was performed every day for 3,000 years. To even speak his name aloud outside the rite was to give him form. He has no priesthood — only an unbroken chain of executioners.',
    atmosphericBg: 'linear-gradient(135deg, #000000 0%, #0a0000 60%, #1a0a00 100%)',
    atmosphericDesc: 'A serpent of black light coiling around a dying sun. The silence of the moment before existence.',
    symbol: '🐍',
    warning: 'Pre-creation force. Do not invoke.',
    sources: [
      { label: 'Britannica — Apep', url: 'https://www.britannica.com/topic/Apopis-Egyptian-mythology' },
      { label: 'Book of Overthrowing Apep (text)', url: 'https://en.wikipedia.org/wiki/Apep' },
    ],
  },
  {
    id: 'tezcatlipoca',
    name: 'Tezcatlipoca',
    pantheon: 'Aztec',
    image: tezcatlipocaImg,
    domains: ['Night Sky', 'Obsidian Mirror', 'Memory', 'Sorcery', 'Discord'],
    archetypeRole: 'The Smoking Mirror — Sees every secret you have ever hidden. God of jaguars, hurricanes, and the obsidian blade of self-knowledge.',
    shadowAspect: 'The unflinching mirror that reflects the version of you that you refuse to acknowledge.',
    whyTheyreBad: 'Tezcatlipoca tricked his brother Quetzalcoatl into shame so deep that the feathered serpent exiled himself from the world. He demands human hearts, sows discord in marriages, and his obsidian mirror shows men what they fear most about themselves until they break. He is the patron of sorcerers, jaguars, and those who use truth as a weapon. He cannot lie — but he chooses what truth to show.',
    purpose: 'Tezcatlipoca is here to teach radical self-witness. Every spiritual path eventually requires looking into the mirror that does not flatter. He is the practice of honest self-inventory that comes BEFORE forgiveness — because you cannot integrate what you refuse to see.',
    reflectionQuestion: 'If a mirror showed you everything you have hidden from yourself, would you still call it your face?',
    ritualLore: 'The Aztec festival of Toxcatl (held during the fifth month) was Tezcatlipoca\'s great rite. For one full year, a chosen youth — flawless in form — lived as the god\'s ixiptla (living image). He wore turquoise jewelry, played the flute, was attended by four wives modeled on goddesses, and walked the streets revered as the god incarnate. At year\'s end, he ascended the steps of a small pyramid at Tlacochcalco, broke his flutes one by one, and laid himself across the sacrificial stone. Priests cut out his heart and offered it to the smoking mirror. Another youth was chosen the same day. The rite enacted the truth Tezcatlipoca embodies: every face you wear is loaned, and the mirror always demands its return.',
    atmosphericBg: 'linear-gradient(135deg, #000000 0%, #1a0033 50%, #0a0020 100%)',
    atmosphericDesc: 'Obsidian smoke curling under a starless sky. A jaguar moves at the edge of vision.',
    symbol: '🪞',
    sources: [
      { label: 'Britannica — Tezcatlipoca', url: 'https://www.britannica.com/topic/Tezcatlipoca' },
      { label: 'Mexicolore — Smoking Mirror', url: 'https://www.mexicolore.co.uk/aztecs/gods/tezcatlipoca' },
    ],
  },
  {
    id: 'lilith',
    name: 'Lilith',
    pantheon: 'Mesopotamian / Hebraic',
    image: lilithImg,
    domains: ['Night', 'Sovereignty', 'Sexuality', 'Refusal', 'Wild Feminine'],
    archetypeRole: 'The First Refusal — Adam\'s first wife who left Eden rather than submit. Demonized by patriarchy, she is the archetype of the woman who will not kneel.',
    shadowAspect: 'The disowned wildness — the rage at being told to make yourself smaller.',
    whyTheyreBad: 'Medieval rabbinical and Sumerian texts call her a baby-killer, a succubus, mother of demons, queen of screech-owls. She refused to lie beneath Adam and spoke the unspeakable name of God to escape Eden. For 3000 years she has been called witch, whore, demon — the file cabinet of every "bad woman" archetype. Her crime: she would not shrink.',
    purpose: 'Lilith is in this codex as the rage of the disowned feminine — the parts of women (and men) that have been called demonic for refusing to be small, quiet, or pliable. To meet her is to reclaim what religion taught you to call evil about your own wildness.',
    reflectionQuestion: 'Where in your life have you been called "demon" for refusing to shrink?',
    ritualLore: 'Lilith was never publicly worshipped — she was warded against. Babylonian incantation bowls (4th–7th century CE) found across Mesopotamia were inscribed in concentric spirals with her name and buried upside-down beneath the thresholds and corners of homes to trap her. Jewish protective amulets for newborns named the three angels (Senoy, Sansenoy, and Semangelof) sent to retrieve her — and bore the inscription "Adam and Eve, OUT Lilith." Mirrors were covered in birthing rooms because she was said to enter through reflective surfaces. Modern reclamation rituals — practiced quietly since the 1970s — invert this: women light a single red candle on the new moon, recite the names she was called (witch, harlot, demon), then speak aloud the qualities those names tried to bury.',
    atmosphericBg: 'linear-gradient(135deg, #0d0010 0%, #2a0020 50%, #1a0015 100%)',
    atmosphericDesc: 'Moonlight on black feathers. An owl with a woman\'s eyes. The garden gates left swinging open.',
    symbol: '🦉',
    sources: [
      { label: 'JSTOR — Lilith in Jewish folklore', url: 'https://www.jstor.org/stable/1454152' },
      { label: 'Britannica — Lilith', url: 'https://www.britannica.com/topic/Lilith-Jewish-folklore' },
    ],
  },
  {
    id: 'hel',
    name: 'Hel',
    pantheon: 'Norse',
    image: helImg,
    domains: ['Underworld', 'Decay', 'The Unremembered Dead', 'Cold'],
    archetypeRole: 'The Half-Living Queen — Daughter of Loki. Half her face is beautiful, half is rotted. She rules those who die without glory.',
    shadowAspect: 'The acceptance of your own decay — the parts of you that are already dying.',
    whyTheyreBad: 'Cast down by Odin to rule Niflheim, Hel keeps every dead Viking who did not die in glorious battle — the cowards, the sick, the women, the old. She refused to release Baldr from her halls because not even one tear in all the worlds was withheld from him — Loki disguised as a giantess refused to weep — so Baldr stayed dead. She is rot, slow death, the silence after fame ends.',
    purpose: 'Hel sits in this codex as the practice of memento mori — the willingness to look at decay honestly. She teaches that not everything in you is destined for glory; some things are destined for the slow turn back into earth. To honor her is to stop dragging dead parts of yourself through every doorway.',
    reflectionQuestion: 'What in you has already died but you still drag through every doorway?',
    ritualLore: 'There were no temples to Hel — only burial customs that acknowledged her. The Norse practiced "double burials" for those who died of sickness or old age: the body was placed in the ground, then a heavy stone was set on the chest to ensure she kept what was hers and the dead would not return as a draugr. Niflheim was approached only in the funerary chant Helreið ("Hel-ride"). Modern Heathen practice marks her with the Disablot in early winter — a quiet meal set with one empty plate, one black candle, and a single piece of bread broken in half: one half eaten, one half buried. The rite is not invocation but acknowledgment — a vow to stop pretending the dying parts of the self are still alive.',
    atmosphericBg: 'linear-gradient(135deg, #000a14 0%, #001a26 50%, #000f1a 100%)',
    atmosphericDesc: 'A frozen river under no sun. Mist that smells of damp earth. A throne of bone and ice.',
    symbol: '❄️',
    sources: [
      { label: 'Norse Mythology — Hel', url: 'https://norse-mythology.org/gods-and-creatures/giants/hel/' },
      { label: 'Prose Edda (Snorri Sturluson)', url: 'https://en.wikipedia.org/wiki/Hel_(being)' },
    ],
  },
  {
    id: 'ahriman',
    name: 'Ahriman',
    pantheon: 'Zoroastrian',
    image: ahrimanImg,
    domains: ['Lies', 'Materialism', 'Mechanization', 'Spiritual Death'],
    archetypeRole: 'The Father of Lies — The cosmic adversary in Zoroastrian thought. The spirit of pure materialism that severs spirit from matter.',
    shadowAspect: 'The voice that says only what can be measured is real.',
    whyTheyreBad: 'Ahriman is the original adversary — older than Satan, who was modeled on him. In Zoroastrian theology he is the eternal opponent of Ahura Mazda (the wise lord of light), the principle that opposes truth not with another truth but with corruption. Modern occultists (Steiner especially) reframed him as the spirit of soulless industry — the impulse that turns humans into productivity units, art into content, meaning into metrics.',
    purpose: 'Ahriman is in this codex because we are living in the age he was prophesied to dominate — algorithms, surveillance, dopamine slot machines, spiritual flattening. To name him is to recognize the system you are participating in and to consciously preserve what cannot be measured: awe, intuition, the soul.',
    reflectionQuestion: 'Where have you traded soul for certainty?',
    ritualLore: 'Ahriman has no liturgy because Zoroastrians refuse to give him one. The Vendidad (a section of the Avesta) instead prescribes purification rites against him: the barashnum, a nine-night ritual of washing with bull urine (gomez), sand, and water in 15 successive holes dug north-to-south, designed to expel his contamination from a defiled body. His name is spoken only when followed by the formula "may he be smashed." Rudolf Steiner, in his 1919 lecture cycle, claimed the ahrimanic incarnation would manifest in the third millennium through technologies that promise convenience while severing the human from the spiritual — what we now call the algorithmic feed. The modern counter-rite is silence: 20 minutes daily with no screen, no measurement, no input. He cannot survive the unmeasured hour.',
    atmosphericBg: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0d0d0d 100%)',
    atmosphericDesc: 'Steel grey sky. Machinery clicking with no operator. A city without dreams.',
    symbol: '⚙️',
    sources: [
      { label: 'Britannica — Ahriman', url: 'https://www.britannica.com/topic/Ahriman' },
      { label: 'Rudolf Steiner — The Ahrimanic Deception', url: 'https://wn.rsarchive.org/Lectures/19191027p01.html' },
    ],
  },
  {
    id: 'tiamat',
    name: 'Tiamat',
    pantheon: 'Anunnaki / Babylonian',
    image: tiamatImg,
    domains: ['Primordial Chaos', 'Salt Sea', 'Mother of Monsters', 'Pre-Order'],
    archetypeRole: 'The Slain Mother — Primordial dragon-goddess of chaos. Marduk killed her and built the universe from her body.',
    shadowAspect: 'The grief of the original wound — the mother who was destroyed to make the world ordered.',
    whyTheyreBad: 'In the Babylonian Enuma Elish, Tiamat is the saltwater goddess who births the gods, then turns on them when they kill her consort. She births an army of monsters — vipers, dragons, scorpion-men — and is finally split in two by Marduk, who makes the sky from her upper half and the earth from her lower half. She is "evil" in the texts only because she resisted being remade. The world we live on is literally her corpse.',
    purpose: 'Tiamat is in this codex as the mythic memory of the matriarchal chaos that was overthrown to install patriarchal order. To meet her is to grieve the wild mother in yourself that was civilized into compliance — and ask whether the trade was worth it.',
    reflectionQuestion: 'What part of your wild origin was killed so that you could be acceptable?',
    ritualLore: 'The Babylonian New Year festival, Akitu (held over 12 days in March/April), was a public re-enactment of Tiamat\'s death. On the fourth day, the Enuma Elish was read aloud in its entirety inside the Esagila temple at Babylon. On the fifth day, the king was stripped of his crown, struck across the face by the high priest of Marduk, and forced to kneel and confess he had not violated the city — only then was his rule renewed. On the eleventh day, a clay effigy of Tiamat was carried through the streets and ritually split in two with a bronze blade — sky and earth re-separated for another year. The rite encoded a permanent truth: the order we live in is built from a body that was once whole, and every spring requires us to remember the splitting.',
    atmosphericBg: 'linear-gradient(135deg, #001a14 0%, #003329 50%, #001f19 100%)',
    atmosphericDesc: 'A salt ocean under a green-black sky. Something massive coils beneath the waves. The water remembers her.',
    symbol: '🐉',
    sources: [
      { label: 'Enuma Elish — full translation', url: 'https://www.ancient.eu/article/225/enuma-elish---the-babylonian-epic-of-creation---fu/' },
      { label: 'World History — Tiamat', url: 'https://www.worldhistory.org/Tiamat/' },
    ],
  },
  {
    id: 'hades',
    name: 'Hades',
    pantheon: 'Greek',
    image: hadesImg,
    domains: ['Underworld', 'Wealth', 'The Unseen', 'Inevitable End'],
    archetypeRole: 'The Unseen King — Not evil, but feared. Lord of the dead who rules with stillness. The Greeks would not say his name aloud.',
    shadowAspect: 'The part of you that knows you will die — and refuses to look at it.',
    whyTheyreBad: 'Hades is not malicious — but the Greeks called him "the unseen one" because saying his name was thought to summon him. He abducted Persephone to be his queen and tricked her with pomegranate seeds so she could never fully leave. He is utterly inflexible: no soul who enters his realm leaves except by his decree. He is the only Olympian with no temples to speak of — fear made him invisible.',
    purpose: 'Hades is in this codex not as evil but as the death you refuse to face. Every spiritual tradition agrees: the person who has not made peace with their own ending lives a smaller life. He sits here as the mirror of your mortality and the wealth (his other domain) hidden in finally accepting it.',
    reflectionQuestion: 'If you truly believed in your own ending, what would you stop pretending today?',
    ritualLore: 'The Greeks did not invoke Hades — they petitioned him by striking the earth. Sacrifices to him (and to all chthonic gods) were inverted: black animals — usually a black ram or black-fleeced sheep — were slaughtered at night over a bothros (a deep pit) so the blood drained downward into his realm. The worshipper turned their face away during the killing and never spoke his name, calling him only Plouton ("the wealthy one") or Eubouleus ("good counselor") to avoid summoning his attention. Libations of honey, milk, and wine (never undiluted) were poured directly onto graves on the third, ninth, and thirtieth day after a death. His one named sanctuary, the Necromanteion of Ephyra in Epirus, allowed pilgrims to consult the dead through priestly oracles after a multi-day fast on barley bread and lupin beans — preparation for stepping briefly into his quiet kingdom and returning.',
    atmosphericBg: 'linear-gradient(135deg, #0a000a 0%, #1a0014 50%, #0d000a 100%)',
    atmosphericDesc: 'A river of black water under a cavern of silver light. A three-headed dog drinks at its edge.',
    symbol: '🗝️',
    sources: [
      { label: 'Theoi — Hades', url: 'https://www.theoi.com/Khthonios/Haides.html' },
      { label: 'Britannica — Hades', url: 'https://www.britannica.com/topic/Hades-Greek-mythology' },
    ],
  },
  {
    id: 'kali-shadow',
    name: 'Kali (Dark Aspect)',
    pantheon: 'Hindu',
    image: kaliShadowImg,
    domains: ['Time', 'Death', 'Annihilation of the Ego', 'Blood Sacrifice'],
    archetypeRole: 'The Devourer of Time — Wears a necklace of skulls and a skirt of severed arms. She is what time does to everything you love.',
    shadowAspect: 'The terror of impermanence — the rage that nothing you hold can be kept.',
    whyTheyreBad: 'In her Maha-Kali aspect, Kali killed the demon Raktabija by drinking every drop of his blood before it touched the ground (every drop would become a new demon). Her bloodlust grew so great she danced on the battlefield until the corpse-pile reached the sky. Only Shiva throwing himself beneath her feet stopped her. Worshippers in some Tantric sects offered animal — and historically human — blood. She is "bad" because she shows what unbounded destruction looks like when nothing is left to lose.',
    purpose: 'Kali in her dark aspect is here to teach the practice of radical impermanence. To stand in her presence (in meditation, not ritual) is to feel the truth that nothing — not your body, not your love, not your name — can be kept. The freedom on the other side of that terror is what every spiritual tradition calls liberation.',
    reflectionQuestion: 'If you could not protect a single thing you love from being taken, would you still love it?',
    ritualLore: 'In the Tantric Vamachara ("left-hand path") tradition still practiced at Kalighat in Kolkata and Kamakhya in Assam, Kali in her Maha-Kali aspect is approached at the cremation ground (shmashana) at midnight on the new moon (amavasya). The rite traditionally included the panchamakara — five forbidden offerings whose names all begin with the Sanskrit "ma": madya (wine), mamsa (meat), matsya (fish), mudra (parched grain), and maithuna (ritual union) — each transformed by mantra from indulgence into liberation. Animal blood (historically goat) was offered in a kapala (skull-cup). Modern lineage-sanctioned practice has largely substituted symbolic offerings — red hibiscus flowers (her favored bloom), pomegranate juice for blood, and the recitation of her 108 names. The rite is dangerous not from her, but because it dissolves attachment so quickly the practitioner can lose the world they were trying to free themselves from.',
    atmosphericBg: 'linear-gradient(135deg, #0a0000 0%, #1a0005 50%, #14000a 100%)',
    atmosphericDesc: 'A goddess dancing on the corpse of her lover, her tongue red, her eyes infinite. She is laughing.',
    symbol: '🗡️',
    sources: [
      { label: 'Britannica — Kali', url: 'https://www.britannica.com/topic/Kali' },
      { label: 'Devi Mahatmya (text)', url: 'https://en.wikipedia.org/wiki/Devi_Mahatmya' },
    ],
  },
  {
    id: 'loki-shadow',
    name: 'Loki (Bound)',
    pantheon: 'Norse',
    image: lokiShadowImg,
    domains: ['Betrayal', 'Punishment', 'The Bound Trickster', 'Ragnarok'],
    archetypeRole: 'The Chained One — After murdering Baldr, Loki was bound under the earth with serpent venom dripping into his eyes. He waits.',
    shadowAspect: 'The grievance you have been chaining down — the resentment that is slowly becoming an apocalypse.',
    whyTheyreBad: 'The trickster crossed the line. Loki engineered the murder of Baldr — the most beloved god — by tricking the blind god Hod into throwing mistletoe at him. When the gods caught him, they bound him with the entrails of his own murdered son. A serpent was hung above him to drip venom in his eyes for eternity. His wife Sigyn catches the venom in a bowl, but every time she empties it, drops fall and he convulses — and Earth shakes. At Ragnarok, his chains will break and he will lead the giants in destroying the cosmos.',
    purpose: 'Loki Bound is in this codex as the buried resentment you have refused to process. Every grudge you stuff underground does not die — it grows in silence until it has the weight of an apocalypse. He teaches that what is denied integration eventually demands destruction.',
    reflectionQuestion: 'What betrayal are you holding underground that, if released, would burn down everything?',
    ritualLore: 'Loki had no temples in the Viking Age — Snorri Sturluson notes specifically that "no man has loved him enough to build him one." His only acknowledged rite was the symbel toast at certain feasts in Iceland, where the third horn of mead was raised to "the bound one" with the words held silent — to speak his name was to risk loosening a single chain. Modern Heathen practice (Lokean tradition, formalized in the 1990s) approaches him through a personal devotional: a black candle, a bowl of water set above a small offering plate (mirroring Sigyn catching the venom), and a written confession of a buried grievance — read aloud, then burned. The rite is not for him; it is for the practitioner, to release what would otherwise grow into the giant that breaks the world.',
    atmosphericBg: 'linear-gradient(135deg, #1a0500 0%, #2a0a00 50%, #1f0700 100%)',
    atmosphericDesc: 'A cavern beneath the world. Chains of frozen god-entrails. Venom drips. The earth shakes when he flinches.',
    symbol: '⛓️',
    sources: [
      { label: 'Norse Mythology — Loki', url: 'https://norse-mythology.org/gods-and-creatures/the-aesir-gods-and-goddesses/loki/' },
      { label: 'Prose Edda — Binding of Loki', url: 'https://en.wikipedia.org/wiki/Loki' },
    ],
  },
];

export const SHADOW_LORE = {
  title: 'SHADOW PANTHEON',
  subtitle: 'The Gods They Told You Not to Name',
  intro:
    'Every culture has light deities — and the ones spoken of in whispers. The Shadow Pantheon collects the adversaries, devourers, and bound ones. They are not evil for evil\'s sake. They are the cosmic mirrors of what you have refused to integrate. To know them is to begin shadow work at the mythic scale.',
  warning:
    'INTEGRATION NOT INVOCATION — These archetypes are presented for psychological and mythological study. Reflect, do not summon. The shadow integrates through awareness, not ritual.',
};
