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
  warning?: string;
}

export const shadowGods: ShadowGod[] = [
  {
    id: 'set',
    name: 'Set',
    pantheon: 'Egyptian',
    domains: ['Chaos', 'Storms', 'Desert', 'Foreigners', 'Disorder'],
    archetypeRole: 'The Adversary — Murdered his brother Osiris and scattered him across Egypt. The necessary chaos that breaks the seal of order.',
    shadowAspect: 'The part of you that destroys what you love because you cannot bear its perfection.',
    reflectionQuestion: 'What have you sabotaged because you secretly believed you did not deserve it?',
    atmosphericBg: 'linear-gradient(135deg, #1a0000 0%, #3d0a00 50%, #2a0500 100%)',
    atmosphericDesc: 'Red desert under a black sun. Sandstorms that erase footprints. The howl of a creature with no name.',
    symbol: '🐺',
  },
  {
    id: 'apep',
    name: 'Apep (Apophis)',
    pantheon: 'Egyptian',
    domains: ['Chaos', 'Annihilation', 'Pre-Creation Void', 'The Devourer'],
    archetypeRole: 'The Eater of the Sun — A serpent of pure non-existence. Ra battles him every night to ensure dawn returns. If he wins once, all reality ends.',
    shadowAspect: 'The nihilism that whispers that nothing matters and nothing is real.',
    reflectionQuestion: 'When the void in you whispers "give up," what part of you fights to see another sunrise?',
    atmosphericBg: 'linear-gradient(135deg, #000000 0%, #0a0000 60%, #1a0a00 100%)',
    atmosphericDesc: 'A serpent of black light coiling around a dying sun. The silence of the moment before existence.',
    symbol: '🐍',
    warning: 'Pre-creation force. Do not invoke.',
  },
  {
    id: 'tezcatlipoca',
    name: 'Tezcatlipoca',
    pantheon: 'Aztec',
    domains: ['Night Sky', 'Obsidian Mirror', 'Memory', 'Sorcery', 'Discord'],
    archetypeRole: 'The Smoking Mirror — Sees every secret you have ever hidden. God of jaguars, hurricanes, and the obsidian blade of self-knowledge.',
    shadowAspect: 'The unflinching mirror that reflects the version of you that you refuse to acknowledge.',
    reflectionQuestion: 'If a mirror showed you everything you have hidden from yourself, would you still call it your face?',
    atmosphericBg: 'linear-gradient(135deg, #000000 0%, #1a0033 50%, #0a0020 100%)',
    atmosphericDesc: 'Obsidian smoke curling under a starless sky. A jaguar moves at the edge of vision.',
    symbol: '🪞',
  },
  {
    id: 'lilith',
    name: 'Lilith',
    pantheon: 'Mesopotamian / Hebraic',
    domains: ['Night', 'Sovereignty', 'Sexuality', 'Refusal', 'Wild Feminine'],
    archetypeRole: 'The First Refusal — Adam\'s first wife who left Eden rather than submit. Demonized by patriarchy, she is the archetype of the woman who will not kneel.',
    shadowAspect: 'The disowned wildness — the rage at being told to make yourself smaller.',
    reflectionQuestion: 'Where in your life have you been called "demon" for refusing to shrink?',
    atmosphericBg: 'linear-gradient(135deg, #0d0010 0%, #2a0020 50%, #1a0015 100%)',
    atmosphericDesc: 'Moonlight on black feathers. An owl with a woman\'s eyes. The garden gates left swinging open.',
    symbol: '🦉',
  },
  {
    id: 'hel',
    name: 'Hel',
    pantheon: 'Norse',
    domains: ['Underworld', 'Decay', 'The Unremembered Dead', 'Cold'],
    archetypeRole: 'The Half-Living Queen — Daughter of Loki. Half her face is beautiful, half is rotted. She rules those who die without glory.',
    shadowAspect: 'The acceptance of your own decay — the parts of you that are already dying.',
    reflectionQuestion: 'What in you has already died but you still drag through every doorway?',
    atmosphericBg: 'linear-gradient(135deg, #000a14 0%, #001a26 50%, #000f1a 100%)',
    atmosphericDesc: 'A frozen river under no sun. Mist that smells of damp earth. A throne of bone and ice.',
    symbol: '❄️',
  },
  {
    id: 'ahriman',
    name: 'Ahriman',
    pantheon: 'Zoroastrian',
    domains: ['Lies', 'Materialism', 'Mechanization', 'Spiritual Death'],
    archetypeRole: 'The Father of Lies — The cosmic adversary in Zoroastrian thought. Modern occultists name him as the spirit of pure materialism that severs spirit from matter.',
    shadowAspect: 'The voice that says only what can be measured is real.',
    reflectionQuestion: 'Where have you traded soul for certainty?',
    atmosphericBg: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0d0d0d 100%)',
    atmosphericDesc: 'Steel grey sky. Machinery clicking with no operator. A city without dreams.',
    symbol: '⚙️',
  },
  {
    id: 'tiamat',
    name: 'Tiamat',
    pantheon: 'Anunnaki / Babylonian',
    domains: ['Primordial Chaos', 'Salt Sea', 'Mother of Monsters', 'Pre-Order'],
    archetypeRole: 'The Slain Mother — The primordial dragon-goddess of chaos. Marduk killed her and built the universe from her body. Every creation rests on her corpse.',
    shadowAspect: 'The grief of the original wound — the mother who was destroyed to make the world ordered.',
    reflectionQuestion: 'What part of your wild origin was killed so that you could be acceptable?',
    atmosphericBg: 'linear-gradient(135deg, #001a14 0%, #003329 50%, #001f19 100%)',
    atmosphericDesc: 'A salt ocean under a green-black sky. Something massive coils beneath the waves. The water remembers her.',
    symbol: '🐉',
  },
  {
    id: 'hades',
    name: 'Hades',
    pantheon: 'Greek',
    domains: ['Underworld', 'Wealth', 'The Unseen', 'Inevitable End'],
    archetypeRole: 'The Unseen King — Not evil, but feared. Lord of the dead who rules with stillness. The Greeks would not say his name aloud.',
    shadowAspect: 'The part of you that knows you will die — and refuses to look at it.',
    reflectionQuestion: 'If you truly believed in your own ending, what would you stop pretending today?',
    atmosphericBg: 'linear-gradient(135deg, #0a000a 0%, #1a0014 50%, #0d000a 100%)',
    atmosphericDesc: 'A river of black water under a cavern of silver light. A three-headed dog drinks at its edge.',
    symbol: '🗝️',
  },
  {
    id: 'kali-shadow',
    name: 'Kali (Dark Aspect)',
    pantheon: 'Hindu',
    domains: ['Time', 'Death', 'Annihilation of the Ego', 'Blood Sacrifice'],
    archetypeRole: 'The Devourer of Time — Wears a necklace of skulls and a skirt of severed arms. She is what time does to everything you love.',
    shadowAspect: 'The terror of impermanence — the rage that nothing you hold can be kept.',
    reflectionQuestion: 'If you could not protect a single thing you love from being taken, would you still love it?',
    atmosphericBg: 'linear-gradient(135deg, #0a0000 0%, #1a0005 50%, #14000a 100%)',
    atmosphericDesc: 'A goddess dancing on the corpse of her lover, her tongue red, her eyes infinite. She is laughing.',
    symbol: '🗡️',
  },
  {
    id: 'loki-shadow',
    name: 'Loki (Bound)',
    pantheon: 'Norse',
    domains: ['Betrayal', 'Punishment', 'The Bound Trickster', 'Ragnarok'],
    archetypeRole: 'The Chained One — After murdering Baldr, Loki was bound under the earth with serpent venom dripping into his eyes. He waits. When he breaks free, the world ends.',
    shadowAspect: 'The grievance you have been chaining down — the resentment that is slowly becoming an apocalypse.',
    reflectionQuestion: 'What betrayal are you holding underground that, if released, would burn down everything?',
    atmosphericBg: 'linear-gradient(135deg, #1a0500 0%, #2a0a00 50%, #1f0700 100%)',
    atmosphericDesc: 'A cavern beneath the world. Chains of frozen god-entrails. Venom drips. The earth shakes when he flinches.',
    symbol: '⛓️',
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
