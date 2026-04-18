export interface VaultSlot {
  id: number;
  status: 'locked' | 'unlocked';
  codename?: string;
  date?: string;
  classification?: string;
  summary?: string;
  videoEmbedId?: string; // YouTube ID when revealed
  source?: string;
}

// 46 sealed slots — most locked. As real disclosure happens, flip status to 'unlocked' and add metadata.
const buildSlot = (id: number): VaultSlot => ({
  id,
  status: 'locked',
});

export const vaultSlots: VaultSlot[] = Array.from({ length: 46 }, (_, i) => buildSlot(i + 1));

// Example of how to unlock a slot in the future:
// vaultSlots[0] = {
//   id: 1,
//   status: 'unlocked',
//   codename: 'TIC TAC',
//   date: '2004-11-14',
//   classification: 'PARTIALLY DECLASSIFIED',
//   summary: 'USS Nimitz FLIR1. Cmdr. David Fravor. Object descended from 80,000ft to sea level in seconds.',
//   videoEmbedId: 'VxF8w2x_3vE',
//   source: 'DoD / TTSA release 2017',
// };

export const VAULT_LORE = {
  title: 'THE 46',
  subtitle: 'Sealed Vault of Undisclosed Visual Records',
  intro:
    'Forty-six. The cosmic frequency. The number of complete revelation. Whispers from inside the disclosure community speak of forty-six pieces of visual evidence — held back, classified, awaiting their moment. This vault tracks every rumored slot. As each is officially revealed, it unlocks here.',
  warning: 'UNVERIFIED — The "46" is a tracked rumor pattern, not confirmed inventory. Locked slots are placeholders awaiting authenticated disclosure.',
};
