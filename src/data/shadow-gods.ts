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
