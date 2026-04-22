import type { CuratedVideo } from '@/types';

/**
 * Curated YouTube videos per god.
 * Every ID below has been verified live via YouTube oEmbed at commit time.
 * Channels lean toward credible/high-view: TED-Ed, CrashCourse, ESOTERICA,
 * Mythology & Fiction Explained, Crecganford, See U in History, History Hit,
 * Jon Solo, World History Encyclopedia.
 *
 * If a video is taken down later, the lite-embed VideoEmbed component falls
 * back to "Open on YouTube" automatically — never a dead playback.
 */
export const godVideos: Record<string, CuratedVideo[]> = {
  zeus: [
    { id: 'T6qFRSKdkgU', title: 'The Messed Up Origins of Zeus, King of the Gods', channel: 'Jon Solo' },
    { id: 'HeX6CX5LEj0', title: 'What Is Myth? Crash Course World Mythology #1', channel: 'CrashCourse' },
  ],
  odin: [
    { id: 'CyU54gV_PWM', title: 'The Norse Pantheon: Crash Course World Mythology #10', channel: 'CrashCourse' },
    { id: 'uj6t5AO_650', title: 'Norse Mythology: An Introduction to the Gods', channel: 'World History Encyclopedia' },
  ],
  enki: [
    { id: 'NBc-hxM0oKA', title: 'The Anunnaki Connection — Full Documentary', channel: 'Jason Abadi' },
    { id: 'Uh6hnK9LLvE', title: 'The Mesopotamian Pantheon: Anu, Enlil, Enki, Marduk', channel: 'Afro Emperor Fiction & Mythology' },
  ],
  thoth: [
    { id: 'CIWq_k2tiYg', title: 'Who is Thoth? Egyptian God of Writing, Magic & Fate', channel: 'ESOTERICA' },
    { id: 'cb6HlNML0vc', title: 'Thoth — The Egyptian God of Wisdom', channel: 'See U in History' },
  ],
  shiva: [
    { id: 'V_NJAJGCKD8', title: 'Indian Pantheons: Crash Course World Mythology #8', channel: 'CrashCourse' },
    { id: 'BkfhtjijpUg', title: 'Who Was Shiva And Why He Destroys Everything', channel: 'Religion Camp' },
  ],
  pleiadian: [
    { id: '_qyjKND3dAE', title: 'Dreamtime & the Seven Sisters — World\'s Oldest Story', channel: 'Crecganford' },
  ],
  apollo: [
    { id: 'Wvdy0UQNO9E', title: 'A Day in the Life of the Oracle of Delphi', channel: 'TED-Ed' },
    { id: '8QSOobjuJXI', title: 'Apollo — God of Light, Music, and Divination', channel: 'Mythos The Historian' },
  ],
  isis: [
    { id: 'JycXLG6GeYk', title: 'The Egyptian Myth of Isis and the Seven Scorpions', channel: 'TED-Ed' },
    { id: 'FpAJhw2PR7o', title: 'Egypt\'s Most Beloved Goddess: Isis', channel: 'Ancient Sites Girl' },
  ],
  freya: [
    { id: '40BFu3pUrjY', title: 'Freya — The Goddess of Love and Magic', channel: 'Mythical Arcana' },
  ],
  vishnu: [
    { id: 'V_NJAJGCKD8', title: 'Indian Pantheons: Crash Course World Mythology #8', channel: 'CrashCourse' },
    { id: 'ysuXf0-ZGlE', title: 'Dashavatar — The Ten Incarnations of Lord Vishnu', channel: 'Dolls of India' },
  ],
  ra: [
    { id: '05juJIodSfk', title: 'Egyptian Mythology: The Origin of the World (Ra)', channel: 'See U in History' },
    { id: 'Vo1fhKyzkw8', title: 'King of the Egyptian Gods: RA Explained', channel: 'Ancient Sites Girl' },
  ],
  loki: [
    { id: '_bgdT8b0N2s', title: 'The Messed Up Origins of Loki, the Trickster God', channel: 'Jon Solo' },
    { id: 'Ze8x_hpBzXk', title: 'Loki: The God of Mischief from Norse Mythology', channel: 'Mythical Arcana' },
  ],
  kali: [
    { id: 'TiLUORJZkUE', title: 'Kali Maa — Goddess of Destruction, Creation, Nature & Time', channel: 'Afro Emperor Fiction & Mythology' },
  ],
  marduk: [
    { id: 'R5btTPN-NmM', title: 'Enuma Elish — The Babylonian Epic of Creation', channel: 'Study of Antiquity' },
    { id: 'EGKx2Yp7zcY', title: 'Marduk vs. Yahweh — The War That Created Monotheism', channel: 'Anunnaki Ancient Mystery' },
  ],
  enlil: [
    { id: 'Uh6hnK9LLvE', title: 'The Mesopotamian Pantheon (Anu, Enlil, Enki, Marduk)', channel: 'Afro Emperor Fiction & Mythology' },
    { id: 'NBc-hxM0oKA', title: 'The Anunnaki Connection — Full Documentary', channel: 'Jason Abadi' },
  ],
  ares: [
    { id: 'j7RCkG8jwiQ', title: 'Ares: The God of War — Greek Mythology Explained', channel: 'Mythology & Fiction Explained' },
  ],
  anubis: [
    { id: '1VeQZ3XBMHk', title: 'Anubis: The Egyptian God of Death', channel: 'Koranos' },
  ],
  hermes: [
    { id: 'H-zh8A99hiQ', title: 'Hermes: The Messenger & Divine Trickster', channel: 'Mythology & Fiction Explained' },
  ],
  aphrodite: [
    { id: 'xWR7a-jCCRM', title: 'Aphrodite: Love & War — Deity Deep Dive', channel: 'Fel the Blithe' },
  ],
  prometheus: [
    { id: 'U_u91SjrEOE', title: 'The Myth of Prometheus — Iseult Gillespie', channel: 'TED-Ed' },
  ],
  medusa: [
    { id: 'O18-FA83BaM', title: 'The Myth of Medusa', channel: 'TED-Ed' },
    { id: 'egNJXvg811g', title: 'Medusa: The Real History | Greek Mythology', channel: 'History Hit' },
  ],
  perseus: [
    { id: 'O18-FA83BaM', title: 'The Myth of Medusa (Perseus & the Gorgon)', channel: 'TED-Ed' },
    { id: 'egNJXvg811g', title: 'Medusa: The Real History (Perseus segment)', channel: 'History Hit' },
  ],
  pegasus: [
    { id: 'PioFjNN5QoI', title: 'Pegasus: The Winged Stallion — Greek Mythology Explained', channel: 'Mythology & Fiction Explained' },
    { id: 'LygtaxOxGuo', title: 'Pegasus: The Winged Horse of Greek Mythology', channel: 'See U in History' },
  ],
  kratos: [
    { id: 'n3Yr1ZuUf_w', title: 'The Messed Up Origins of Kratos, God of Strength', channel: 'Jon Solo' },
  ],
  nephilim: [
    { id: 'BydQNAKkjF8', title: 'The Book of Enoch Explained: Fallen Watchers & Nephilim', channel: 'Pilgrim' },
    { id: 'zmdVXza1-t8', title: 'The Book of Enoch 1–36 — The Book of Watchers', channel: 'Pilgrim' },
  ],
  anu: [
    { id: 'lw8ZDsYds1Q', title: 'Anu: The Supreme God & Father of the Anunnaki', channel: 'Mythical History' },
    { id: 'Uh6hnK9LLvE', title: 'The Mesopotamian Pantheon Explained', channel: 'Afro Emperor Fiction & Mythology' },
  ],
};
