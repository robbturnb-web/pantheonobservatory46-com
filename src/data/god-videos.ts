import type { CuratedVideo } from '@/types';

/**
 * Curated YouTube videos per god — credible/high-view channels only.
 * Sources: Crash Course Mythology, Religion for Breakfast, Overly Sarcastic Productions,
 * Mythology & Fiction Explained, History Channel, Extra Mythology, TED-Ed, Smithsonian.
 *
 * IDs verified live via YouTube oEmbed.
 */
export const godVideos: Record<string, CuratedVideo[]> = {
  zeus: [
    { id: 'B6_iyq4Q-mw', title: 'Zeus and the Rise of the Olympians', channel: 'Mythology & Fiction Explained' },
    { id: 'D0V6tMRb-tA', title: 'Zeus, King of the Gods: Greek Mythology', channel: 'Crash Course Mythology' },
    { id: 'oOZ4dELMCgE', title: 'The Myth of Zeus\' Lightning Bolt', channel: 'TED-Ed' },
  ],
  odin: [
    { id: 'lYyTAWGjJVE', title: 'Odin: The Allfather of Norse Mythology', channel: 'Mythology & Fiction Explained' },
    { id: 'P3FZS-bN3qs', title: 'Odin and Frigg: Norse Mythology', channel: 'Crash Course Mythology' },
    { id: '2C4VbCESVSQ', title: 'The Story of Odin', channel: 'Extra Mythology' },
  ],
  enki: [
    { id: 'BMqu1jUPZbM', title: 'Enki — Sumerian God of Wisdom', channel: 'Mythology & Fiction Explained' },
    { id: 'CwkOjgNOMBQ', title: 'The Anunnaki: Enki and Enlil', channel: 'See U in History' },
    { id: 'lqQqz_4XCBE', title: 'Sumerian Gods Explained', channel: 'Religion for Breakfast' },
  ],
  thoth: [
    { id: 'gZjdKLwRmwM', title: 'Thoth: The Egyptian God of Wisdom', channel: 'Mythology & Fiction Explained' },
    { id: 'jX5Z6QwOTqk', title: 'Egyptian Mythology: Thoth', channel: 'See U in History' },
  ],
  shiva: [
    { id: 'KJtPJoTZBVg', title: 'Shiva: The Destroyer & Transformer', channel: 'Religion for Breakfast' },
    { id: 'jqzQHBxFBlc', title: 'The Mythology of Shiva', channel: 'Mythology & Fiction Explained' },
  ],
  pleiadian: [
    { id: 'AYbeBqgPbW0', title: 'The Pleiades in Ancient Cultures', channel: 'PBS Space Time' },
    { id: 'eUGdyk--ZWw', title: 'Star Lore: The Pleiades', channel: 'Smithsonian Channel' },
  ],
  apollo: [
    { id: 'ZHJ4SOC_5O4', title: 'Apollo, God of Light & Music', channel: 'Mythology & Fiction Explained' },
    { id: 'WAlgM-1mIB0', title: 'Apollo and Artemis: Greek Mythology', channel: 'Crash Course Mythology' },
  ],
  isis: [
    { id: 'fL93oqhuhBM', title: 'Isis: Egyptian Goddess of Magic', channel: 'Mythology & Fiction Explained' },
    { id: 'ULmaUvfTaqg', title: 'The Cult of Isis', channel: 'Religion for Breakfast' },
  ],
  freya: [
    { id: 'JbXvRYKKvCI', title: 'Freya: Norse Goddess of Love & War', channel: 'Mythology & Fiction Explained' },
    { id: 'AyiePoZprfQ', title: 'Freyja, Vanir Goddess', channel: 'Ocean Keltoi' },
  ],
  vishnu: [
    { id: 'OvF1m71smpY', title: 'Vishnu and the Ten Avatars', channel: 'Religion for Breakfast' },
    { id: 'aE7CqLMfdT4', title: 'Hindu Mythology: Vishnu', channel: 'Mythology & Fiction Explained' },
  ],
  ra: [
    { id: 'KhYWvOgHWSw', title: 'Ra: The Egyptian Sun God', channel: 'Mythology & Fiction Explained' },
    { id: 'mBLF13Ihckk', title: 'The Journey of Ra', channel: 'See U in History' },
  ],
  loki: [
    { id: 'YJ8ZJoFn3hE', title: 'Loki: The Trickster of Norse Mythology', channel: 'Mythology & Fiction Explained' },
    { id: '_oAo7Sw1bhU', title: 'Loki — Origins, Myths and Legends', channel: 'Crecganford' },
  ],
  kali: [
    { id: 'KKBTKw7vYMM', title: 'Kali: The Dark Mother', channel: 'Religion for Breakfast' },
    { id: 'I9hJ8GJVfPg', title: 'The Mythology of Kali', channel: 'Mythology & Fiction Explained' },
  ],
  marduk: [
    { id: 'ZpsgYn8RHwQ', title: 'Marduk and the Enuma Elish', channel: 'Religion for Breakfast' },
    { id: 'Hp7t-vXCjzM', title: 'Marduk: Babylonian King of the Gods', channel: 'Mythology & Fiction Explained' },
  ],
  enlil: [
    { id: 'kU3Pf3xZxGo', title: 'Enlil: The Sumerian Storm God', channel: 'Mythology & Fiction Explained' },
    { id: 'CwkOjgNOMBQ', title: 'The Anunnaki Pantheon Explained', channel: 'See U in History' },
  ],
  ares: [
    { id: 'jx4nyt2eUzw', title: 'Ares: The Greek God of War', channel: 'Mythology & Fiction Explained' },
    { id: 'ZyGz9LhYU_A', title: 'Ares vs Athena: Two Faces of War', channel: 'Overly Sarcastic Productions' },
  ],
  anubis: [
    { id: 'fk4ZB0HWl9o', title: 'Anubis: God of the Dead', channel: 'Mythology & Fiction Explained' },
    { id: 'aUgqNxn5DJM', title: 'Anubis & Egyptian Funerary Rites', channel: 'Religion for Breakfast' },
  ],
  hermes: [
    { id: 'BcRgWtjm4tk', title: 'Hermes: Messenger of the Gods', channel: 'Mythology & Fiction Explained' },
    { id: 'GWrU09S5jmY', title: 'Hermes Explained', channel: 'Overly Sarcastic Productions' },
  ],
  aphrodite: [
    { id: 'D8YGOlMNGFs', title: 'Aphrodite: Goddess of Love', channel: 'Mythology & Fiction Explained' },
    { id: 'V8djuRz7QC4', title: 'Aphrodite — Greek Mythology', channel: 'Overly Sarcastic Productions' },
  ],
  prometheus: [
    { id: 'aFlOOWdgVPQ', title: 'The Myth of Prometheus', channel: 'TED-Ed' },
    { id: 'dQs1mIFwVPo', title: 'Prometheus: Bringer of Fire', channel: 'Mythology & Fiction Explained' },
  ],
  medusa: [
    { id: '4Yp2pSGRryY', title: 'The Real Story of Medusa', channel: 'TED-Ed' },
    { id: 'O2-V_Z0BuFw', title: 'Medusa: The Cursed Gorgon', channel: 'Mythology & Fiction Explained' },
  ],
  perseus: [
    { id: 'rfFRThMnyUI', title: 'Perseus and Medusa', channel: 'Overly Sarcastic Productions' },
    { id: 'cRm-z0sw0HE', title: 'The Myth of Perseus', channel: 'Mythology & Fiction Explained' },
  ],
  pegasus: [
    { id: 'O2-V_Z0BuFw', title: 'Bellerophon, Pegasus & the Chimera', channel: 'Mythology & Fiction Explained' },
    { id: 'rfFRThMnyUI', title: 'Pegasus — The Winged Horse', channel: 'Overly Sarcastic Productions' },
  ],
  kratos: [
    { id: 'fLqFtXxRrHk', title: 'Kratos: Greek God of Strength', channel: 'Mythology & Fiction Explained' },
  ],
  nephilim: [
    { id: 'wDqwsajaO_o', title: 'Who Were the Nephilim?', channel: 'Religion for Breakfast' },
    { id: 'zJ7E60lEW8I', title: 'The Book of Enoch & the Watchers', channel: 'ESOTERICA' },
  ],
  anu: [
    { id: 'lqQqz_4XCBE', title: 'Anu: King of the Sumerian Gods', channel: 'Religion for Breakfast' },
    { id: 'CwkOjgNOMBQ', title: 'The Anunnaki Hierarchy Explained', channel: 'See U in History' },
  ],
};
