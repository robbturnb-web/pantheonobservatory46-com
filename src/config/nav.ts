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
  { to: '/the-46', label: 'The 46', group: 'archive' },
  { to: '/gods', label: 'Mythology', group: 'core' },
  { to: '/uap', label: 'Disclosure', group: 'core' },
  { to: '/documentaries', label: 'Documentaries', group: 'archive' },
  { to: '/whistleblowers', label: 'Whistleblowers', group: 'archive' },
  { to: '/crash-retrieval', label: 'Crash Retrieval', group: 'archive' },
  { to: '/consciousness', label: 'Consciousness', group: 'core' },
  { to: '/echo', label: 'Echo AI', group: 'core' },
  { to: '/pyramids', label: 'Pyramids', group: 'archive' },
  { to: '/profile', label: 'Profile', group: 'community' },
];

export const SECONDARY_NAV: NavItem[] = [
  { to: '/about', label: 'About', group: 'legal' },
  { to: '/contact', label: 'Contact', group: 'legal' },
  { to: '/privacy', label: 'Privacy', group: 'legal' },
  { to: '/terms', label: 'Terms', group: 'legal' },
  { to: '/disclaimer', label: 'Disclaimer', group: 'legal' },
];
