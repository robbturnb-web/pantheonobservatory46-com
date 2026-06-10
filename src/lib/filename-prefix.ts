/**
 * Authoritative filename-prefix validator.
 *
 * Used by the Daily Briefing PDF export (and any future edge function
 * that accepts a user-supplied filename prefix). The UI surfaces errors
 * inline, but `assertValidFilenamePrefix` is the hard guard that throws
 * regardless of UI state — so even if the input or disabled button is
 * bypassed (devtools, scripted call, programmatic invocation), an
 * invalid prefix can never reach `doc.save()` or any downstream write.
 */

export const FILENAME_PREFIX_MAX = 64;
export const FILENAME_PREFIX_PATTERN = /^[a-zA-Z0-9-_ ]+$/;
export const FILENAME_PREFIX_FALLBACK = 'briefing';

export class FilenamePrefixError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FilenamePrefixError';
  }
}

/** Returns a human-readable error string, or null when valid. */
export function validateFilenamePrefix(raw: unknown): string | null {
  if (typeof raw !== 'string') return 'Filename prefix must be text.';
  const trimmed = raw.trim();
  if (!trimmed) return 'Filename prefix cannot be empty.';
  if (trimmed.length > FILENAME_PREFIX_MAX) {
    return `Keep it under ${FILENAME_PREFIX_MAX} characters (currently ${trimmed.length}).`;
  }
  if (!FILENAME_PREFIX_PATTERN.test(trimmed)) {
    return 'Only letters, numbers, spaces, hyphens, and underscores are allowed.';
  }
  return null;
}

/** Throws FilenamePrefixError when invalid. Use at every write boundary. */
export function assertValidFilenamePrefix(raw: unknown): string {
  const err = validateFilenamePrefix(raw);
  if (err) throw new FilenamePrefixError(err);
  return (raw as string).trim();
}

/** Sanitizes a *validated* prefix into a filesystem-safe slug. */
export function sanitizeFilenamePrefix(validated: string): string {
  const slug = validated.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
  return slug || FILENAME_PREFIX_FALLBACK;
}
