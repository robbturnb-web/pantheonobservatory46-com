export function memberRedirect(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || /[\\\s]/.test(raw)) return '/profile';
  const url = new URL(raw, 'https://pantheonobservatory46.com');
  if (url.origin !== 'https://pantheonobservatory46.com' || ['/auth', '/reset-password'].includes(url.pathname)) return '/profile';
  return url.pathname + url.search + url.hash;
}

export function requiresEmailConfirmation(session: unknown): boolean {
  return session == null;
}