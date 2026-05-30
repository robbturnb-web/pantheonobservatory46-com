export type VaultStatus = 'pending-disclosure' | 'unlocked' | 'locked';

export interface VaultSlot {
  id: number;
  status: VaultStatus;
  codename: string;
  date?: string;
  platform?: string;
  area?: string;
  classification?: string;
  summary?: string;
  videoEmbedId?: string; // YouTube ID when revealed
  source?: string;
  /** ISO date when the file was released to the public, if ever. */
  releasedAt?: string;
  /** Direct link to the public source (X/YouTube/article). */
  publicUrl?: string;
}

export interface PublicSlot {
  id: string;
  codename: string;
  date: string;
  classification: string;
  summary: string;
  videoEmbedId: string;
  source: string;
}

// ============================================================
// THE 46 — Real codenames from the Crockett/Luna letter
// House Oversight Committee → Sec. Pete Hegseth · March 31, 2026
// Demand expired April 14, 2026
// Source: https://oversight.house.gov/wp-content/uploads/2026/03/UAP-Request-Letter-FINAL.pdf
// ============================================================

interface RawItem {
  codename: string;
  date?: string;
  platform?: string;
  area?: string;
}

const rawList: RawItem[] = [
  { codename: '4 UAP Formation', date: '2022-08-26', area: 'Iran' },
  { codename: 'Syrian UAP Instant Acceleration', date: '2021', area: 'Syria' },
  { codename: 'UAP USO Formation — Wiley 2X Zinc' },
  { codename: 'Cigar-Shaped / Fat Spherical UAP', date: '2022-10-15' },
  { codename: 'Spherical UAP Erratic Movement Remix (RUST)', date: '2022' },
  { codename: 'Spherical UAP Over AFG In/Out of Clouds', date: '2020-11-23', area: 'Afghanistan' },
  { codename: 'Spherical UAP Pulsing Over Water — Jacker 2X' },
  { codename: 'Spherical UAP In Clouds' },
  { codename: 'Voodoo 4X (Cranberry) UAP' },
  { codename: 'NGA UAP', date: '2010-06-01' },
  { codename: 'Spherical UAP — Warlock 4X (3 videos)', date: '2021-04-12' },
  { codename: 'AFSOC Kabul UAP', date: '2017', platform: 'AFSOC', area: 'Kabul, Afghanistan' },
  { codename: 'USCG C-144 Tic Tac IR Hot (Vid 1)', date: '2024-04-24', platform: 'USCG C-144' },
  { codename: 'USCG C-144 Tic Tac IR Hot (Vid 2)', date: '2024-04-24', platform: 'USCG C-144' },
  { codename: 'Multiple Spherical UAP USO — Sub. Cactus 1X', date: '2022-03-25' },
  { codename: 'IIR 1 666 SO151 23 — UAP via 5th Gen Aircraft', date: '2023-01-20', platform: '5th Generation Fighter' },
  { codename: 'F-18 FLIR UAP', platform: 'F-18 Super Hornet' },
  { codename: 'IIR 1 665 SO301 23 — Eglin AFB', area: 'Eglin AFB, FL', platform: 'USAF' },
  { codename: 'USAF ANG F-16C "AESIR11" Shoots Down UAP w/ AIM-9X', date: '2023-02-12', platform: 'F-16C', area: 'Lake Huron' },
  { codename: 'IIR 1777 J0032 22 — Karaganda UAP', area: 'Karaganda Intl Airport, Kazakhstan' },
  { codename: 'IIR 1 655 S0053 23 — Several UAP Columbus OH', area: 'Columbus, OH Airport' },
  { codename: 'MQ-9 Observed UAP — East China Sea', date: '2023-01-05', platform: 'MQ-9 Reaper' },
  { codename: 'Assault 1X (Steel) HD_20220613', date: '2022-06-13' },
  { codename: 'EP-3 Observed UAP — ECS', date: '2021-06-09', platform: 'EP-3 Aries', area: 'East China Sea' },
  { codename: 'Lightning (Lavender) Observes UAP', date: '2021-01-03' },
  { codename: 'Hackney 6 (Toxic 6) Tracks UAP (2 videos)', date: '2020-11-02', platform: 'MQ-9' },
  { codename: 'Toxic 6 (Mercury) — 3 Fast Moving UAPs', date: '2020-10-29', platform: 'MQ-9' },
  { codename: 'Toxic 6 (Hackney 6) Observes UAPs', date: '2020-10-20', platform: 'MQ-9' },
  { codename: 'Greed Observes UAP', date: '2020-10-18' },
  { codename: 'Greed Observes UAP', date: '2020-10-16' },
  { codename: 'Mad Dog 31 Observes UAP', date: '2020-10-17' },
  { codename: 'Regulator 73 Observes UAP', date: '2020-10-17' },
  { codename: 'Toxic 6 (Hackney 6) Observes UAP', date: '2020-09-16', platform: 'MQ-9' },
  { codename: 'UAP On East Coast', date: '2019-12-01', area: 'US East Coast' },
  { codename: 'Toxic 6 UAP', date: '2020-09-05', platform: 'MQ-9' },
  { codename: 'Toxic 6 (Hackney 6) Observes UAP (2 videos)', date: '2020-08-31', platform: 'MQ-9' },
  { codename: 'Hellhound 1X (Coffee) Observes UAP', date: '2020-08-24' },
  { codename: 'Toxic 6 — Persian Gulf UAP', date: '2020-08-21', area: 'Persian Gulf' },
  { codename: 'Hackney 6 (Toxic 6) UAP Observation', date: '2020-08-08', platform: 'MQ-9' },
  { codename: 'Hackney 6 (MQ-9) Gulf of Arabia Dual UAP', date: '2020-05-05', platform: 'MQ-9', area: 'Gulf of Arabia' },
  { codename: 'Hackney 5X (Mint) HD 2020-02-13', date: '2020-02-13' },
  { codename: 'Hackney 6 (MQ-9) UAP — Persian Gulf', date: '2020-05-20', platform: 'MQ-9', area: 'Persian Gulf' },
  { codename: 'HH-11 UAPs', date: '2018-07-03' },
  { codename: 'Hi-Res: Hackney 4X UAP at 2135Z', date: '2019-09-25', platform: 'MQ-9' },
  { codename: 'UFOs in Formation Over Persian Gulf', area: 'Persian Gulf' },
  { codename: 'Hi-Res: Hackney 4X UAPs at 1715Z', date: '2019-09-23', platform: 'MQ-9' },
];

export const vaultSlots: VaultSlot[] = rawList.map((item, i) => ({
  id: i + 1,
  status: 'pending-disclosure' as const,
  codename: item.codename,
  date: item.date,
  platform: item.platform,
  area: item.area,
  classification: 'CLASSIFIED — DEMANDED BY CONGRESS',
}));

// ============================================================
// ALREADY PUBLIC — 4 declassified DoD UAP videos
// (Separate from "The 46" — these are public record)
// ============================================================
export const publicSlots: PublicSlot[] = [
  {
    id: 'tic-tac',
    codename: 'TIC TAC',
    date: '2004-11-14',
    classification: 'DECLASSIFIED — DoD',
    summary:
      'USS Nimitz FLIR1. Cmdr. David Fravor and Lt. Cmdr. Chad Underwood engaged a 40ft white tic-tac shaped craft off the coast of San Diego. Object descended from 80,000ft to sea level in under a second, exhibited no visible propulsion, disappeared at hypersonic speeds.',
    videoEmbedId: 'auGTQYHj_KQ',
    source: 'DoD official release (April 2020) via TTSA (2017)',
  },
  {
    id: 'gimbal',
    codename: 'GIMBAL',
    date: '2015-01-21',
    classification: 'DECLASSIFIED — DoD',
    summary:
      'F/A-18 Super Hornet ATFLIR footage from USS Theodore Roosevelt. Object rotates mid-air against 120-knot winds with no visible propulsion. Pilot: "There\'s a whole fleet of them."',
    videoEmbedId: 'MzeFXVCLrx0',
    source: 'DoD official release (April 2020) via TTSA',
  },
  {
    id: 'go-fast',
    codename: 'GO FAST',
    date: '2015-01-21',
    classification: 'DECLASSIFIED — DoD',
    summary:
      'East Coast encounter. ATFLIR pod tracks small object skimming above ocean at extreme apparent velocity. Parallax suggests slow movement — but small size and lack of exhaust remain unexplained.',
    videoEmbedId: 'PPN8c3wfzbg',
    source: 'DoD official release (April 2020) via TTSA',
  },
  {
    id: 'aguadilla',
    codename: 'AGUADILLA',
    date: '2013-04-25',
    classification: 'LEAKED — DHS / CBP',
    summary:
      'CBP DHC-8 thermal footage over Aguadilla Airport, Puerto Rico. Small craft enters ocean, splits in two, continues underwater — exhibiting transmedium capability. Analyzed by SCU.',
    videoEmbedId: 'tmCCKDcoqUY',
    source: 'DHS / CBP — leaked 2013, analyzed by SCU 2019',
  },
];

export const VAULT_LORE = {
  title: 'THE 46',
  subtitle: 'Sealed Vault of Undisclosed UAP Records — Demanded by Congress',
  letterDate: '2026-03-31',
  dueDate: '2026-04-14',
  requestedBy:
    'Rep. Anna Paulina Luna (R-FL), Chairwoman · Task Force on the Declassification of Federal Secrets · House Oversight Committee',
  letterUrl: 'https://oversight.house.gov/wp-content/uploads/2026/03/UAP-Request-Letter-FINAL.pdf',
  intro:
    'On March 31, 2026, Chairwoman Anna Paulina Luna sent a four-page letter to Secretary of War Pete Hegseth demanding the delivery of forty-six specific classified UAP video files no later than April 14, 2026. The list was compiled from whistleblower testimony confirming AARO holds additional video records beyond what has been disclosed. The deadline came and went. The Pentagon has not delivered the files. This vault tracks every single one — by codename, date, and platform — until they are released.',
  warning:
    'These are real codenames from real Department of Defense files. Names, dates, and platforms transcribed verbatim from the congressional letter. Sourced directly from oversight.house.gov.',
};

export const ALREADY_PUBLIC_LORE = {
  title: 'Already Public',
  subtitle: 'The 4 declassified DoD UAP videos — for context, not part of the 46.',
  intro:
    'These four videos are publicly released. They are not part of the 46 demanded by Congress. They are included here so the distinction is clear: the 46 are still hidden — the public has only ever seen these four.',
};

export function daysOverdue(): number {
  const due = new Date(VAULT_LORE.dueDate + 'T23:59:59Z').getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - due) / (1000 * 60 * 60 * 24)));
}
