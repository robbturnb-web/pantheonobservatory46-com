export type ArchiveItemType = 'investigation' | 'source' | 'echo' | 'note' | 'collection';

export interface ArchiveItem {
  id: string;
  type: ArchiveItemType;
  title: string;
  description?: string;
  href?: string;
  createdAt: string;
  tags?: string[];
  externalUrl?: string;
}

export const ARCHIVE_STORAGE_KEY = 'pantheon:archive:v1';

function isArchiveItem(value: unknown): value is ArchiveItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<ArchiveItem>;
  return typeof item.id === 'string'
    && typeof item.title === 'string'
    && typeof item.type === 'string'
    && typeof item.createdAt === 'string';
}

export function getArchive(): ArchiveItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(ARCHIVE_STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter(isArchiveItem) : [];
  } catch {
    return [];
  }
}

export function saveToArchive(item: Omit<ArchiveItem, 'createdAt'> & { createdAt?: string }) {
  const archive = getArchive().filter((entry) => entry.id !== item.id);
  const next = [{ ...item, createdAt: item.createdAt ?? new Date().toISOString() }, ...archive];
  try {
    if (typeof window !== 'undefined') localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage quotas and privacy settings must not crash the feature that attempted to save.
  }
  return next;
}

export function removeFromArchive(id: string) {
  const next = getArchive().filter((item) => item.id !== id);
  try {
    if (typeof window !== 'undefined') localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Keep the in-memory UI usable even when persistence is blocked.
  }
  return next;
}

export function isArchived(id: string) {
  return getArchive().some((item) => item.id === id);
}

export function clearArchive() {
  try {
    if (typeof window !== 'undefined') localStorage.removeItem(ARCHIVE_STORAGE_KEY);
  } catch {
    // Clearing storage is best-effort when browser storage is unavailable.
  }
}
