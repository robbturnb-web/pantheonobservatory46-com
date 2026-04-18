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

const buildSlot = (id: number): VaultSlot => ({
  id,
  status: 'locked',
});

// Initialize all 46 sealed
export const vaultSlots: VaultSlot[] = Array.from({ length: 46 }, (_, i) => buildSlot(i + 1));

// Seed the 4 publicly disclosed Pentagon/TTSA UAP videos
vaultSlots[0] = {
  id: 1,
  status: 'unlocked',
  codename: 'TIC TAC',
  date: '2004-11-14',
  classification: 'DECLASSIFIED — DoD',
  summary:
    'USS Nimitz FLIR1. Commander David Fravor and Lt. Cmdr. Chad Underwood engaged a 40ft white tic-tac shaped craft off the coast of San Diego. The object descended from 80,000ft to sea level in under a second, exhibited no visible propulsion, and disappeared at hypersonic speeds. Confirmed by multiple radar systems and pilots.',
  videoEmbedId: 'auGTQYHj_KQ',
  source: 'DoD official release (April 2020) via TTSA (2017)',
};

vaultSlots[1] = {
  id: 2,
  status: 'unlocked',
  codename: 'GIMBAL',
  date: '2015-01-21',
  classification: 'DECLASSIFIED — DoD',
  summary:
    'F/A-18 Super Hornet ATFLIR footage from the USS Theodore Roosevelt carrier group off the East Coast. Object rotates mid-air against 120-knot winds with no visible means of propulsion. Pilots audibly react: "There\'s a whole fleet of them."',
  videoEmbedId: 'MzeFXVCLrx0',
  source: 'DoD official release (April 2020) via TTSA',
};

vaultSlots[2] = {
  id: 3,
  status: 'unlocked',
  codename: 'GO FAST',
  date: '2015-01-21',
  classification: 'DECLASSIFIED — DoD',
  summary:
    'East Coast encounter. ATFLIR pod tracks a small object skimming just above the ocean surface at extreme velocity. Parallax analysis suggests the object is actually slow-moving — but its small size and lack of visible exhaust remain unexplained.',
  videoEmbedId: 'PPN8c3wfzbg',
  source: 'DoD official release (April 2020) via TTSA',
};

vaultSlots[3] = {
  id: 4,
  status: 'unlocked',
  codename: 'AGUADILLA',
  date: '2013-04-25',
  classification: 'LEAKED — DHS / CBP',
  summary:
    'US Customs and Border Protection DHC-8 thermal footage over Aguadilla Airport, Puerto Rico. A small unidentified craft enters the ocean, splits into two, and continues underwater — exhibiting transmedium capability. Analyzed by SCU (Scientific Coalition for UAP Studies).',
  videoEmbedId: 'tmCCKDcoqUY',
  source: 'DHS / CBP — leaked 2013, analyzed by SCU 2019',
};

// Example template for unlocking future slots:
// vaultSlots[4] = {
//   id: 5,
//   status: 'unlocked',
//   codename: 'CODENAME',
//   date: 'YYYY-MM-DD',
//   classification: 'DECLASSIFIED' | 'LEAKED' | 'PARTIALLY DECLASSIFIED',
//   summary: '...',
//   videoEmbedId: 'YOUTUBE_ID',
//   source: '...',
// };

export const VAULT_LORE = {
  title: 'THE 46',
  subtitle: 'Sealed Vault of Undisclosed Visual Records',
  intro:
    'Forty-six. The cosmic frequency. The number of complete revelation. Whispers from inside the disclosure community speak of forty-six pieces of visual evidence — held back, classified, awaiting their moment. This vault tracks every rumored slot. As each is officially revealed, it unlocks here.',
  warning:
    'UNVERIFIED — The "46" is a tracked rumor pattern, not confirmed inventory. Locked slots are placeholders awaiting authenticated disclosure. Slots 1–4 contain publicly disclosed Pentagon/DHS footage.',
};
