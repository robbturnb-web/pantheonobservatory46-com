export type ArchiveItemType = 'investigation' | 'source' | 'echo' | 'note' | 'collection';

export interface ArchiveItem {
  id: string;
  type: ArchiveItemType;
  title: string;
  description?: string;
  href?: string;
  createdAt: string;
  tags?: string[];
}

const KEY = 'pantheon:archive:v1';

export function getArchive(): ArchiveItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as ArchiveItem[];
  } catch {
    return [];
  }
}

export function saveToArchive(item: Omit<ArchiveItem, 'createdAt'> & { createdAt?: string }) {
  const archive = getArchive().filter((entry) => entry.id !== item.id);
  const next = [{ ...item, createdAt: item.createdAt ?? new Date().toISOString() }, ...archive];
  if (typeof window !== 'undefined') localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function removeFromArchive(id: string) {
  const next = getArchive().filter((item) => item.id !== id);
  if (typeof window !== 'undefined') localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function isArchived(id: string) {
  return getArchive().some((item) => item.id === id);
}

export function clearArchive() {
  if (typeof window !== 'undefined') localStorage.removeItem(KEY);
}
