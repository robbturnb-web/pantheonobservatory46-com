/**
 * Single source of truth for primary navigation. Used by Navbar, footer,
 * mobile sheet, and the debug checklist.
 */

export interface NavItem {
  to: string;
  label: string;
  /** Optional grouping for footer / mega-menu display. */
  group?: 'core' | 'live' | 'archive' | 'community' | 'legal';
}

export const PRIMARY_NAV: NavItem[] = [
  { to: '/', label: 'Home', group: 'core' },
  { to: '/live-feeds', label: 'Live Feeds', group: 'live' },
  { to: '/the-46', label: 'Archives', group: 'archive' },
  { to: '/archive', label: 'My Archive', group: 'archive' },
  { to: '/star-seed', label: 'Starseed', group: 'core' },
  { to: '/gods', label: 'Pantheon / Gods', group: 'core' },
  { to: '/uap', label: 'UAP Disclosure', group: 'core' },
  { to: '/antarctica', label: 'Antarctica & Atlantis', group: 'archive' },
  { to: '/codex', label: 'Lore', group: 'archive' },
  { to: '/pyramids', label: 'Pyramids', group: 'archive' },
  { to: '/profile', label: 'Profile', group: 'community' },
  { to: '/missions', label: 'Missions', group: 'community' },
  { to: '/sources', label: 'Sources', group: 'community' },
];

export const SECONDARY_NAV: NavItem[] = [
  { to: '/about', label: 'About', group: 'legal' },
  { to: '/contact', label: 'Contact', group: 'legal' },
  { to: '/privacy', label: 'Privacy', group: 'legal' },
  { to: '/terms', label: 'Terms', group: 'legal' },
  { to: '/disclaimer', label: 'Disclaimer', group: 'legal' },
];
