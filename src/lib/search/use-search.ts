import { useEffect, useMemo, useRef, useState } from 'react';
import type { SearchDoc, SearchDocType } from './index-builder';
import { getSearchIndex } from './index-builder';
import type { RealmKey } from './route-registry';

export interface SearchHit extends SearchDoc {
  score: number;
}

export interface SearchFilters {
  realm?: RealmKey | 'all';
  type?: SearchDocType | 'all';
}

export function useSiteSearch(query: string, filters: SearchFilters = {}, limit = 40) {
  const [ready, setReady] = useState(false);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [total, setTotal] = useState(0);
  const tokenRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    getSearchIndex().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const token = ++tokenRef.current;
    if (!ready) return;
    const q = query.trim();
    if (!q) {
      setHits([]);
      setTotal(0);
      return;
    }
    let cancelled = false;
    getSearchIndex().then(({ mini, docs }) => {
      if (cancelled || token !== tokenRef.current) return;
      const raw = mini.search(q);
      let mapped: SearchHit[] = [];
      for (const r of raw) {
        const doc = docs.get(String(r.id));
        if (!doc) continue;
        if (filters.realm && filters.realm !== 'all' && doc.realm !== filters.realm) continue;
        if (filters.type && filters.type !== 'all' && doc.type !== filters.type) continue;
        mapped.push({ ...doc, score: r.score });
      }
      setTotal(mapped.length);
      setHits(mapped.slice(0, limit));
    });
    return () => { cancelled = true; };
  }, [query, ready, filters.realm, filters.type, limit]);

  return { ready, hits, total };
}

/** Build a "recent searches" stack in localStorage. */
const RECENT_KEY = 'pantheon:search:recent';
export function useRecentSearches() {
  const [items, setItems] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]');
    } catch { return []; }
  });
  const push = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setItems((prev) => {
      const next = [trimmed, ...prev.filter((x) => x !== trimmed)].slice(0, 8);
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const clear = () => {
    setItems([]);
    try { localStorage.removeItem(RECENT_KEY); } catch {}
  };
  return { items, push, clear };
}

export const TYPE_LABEL: Record<SearchDocType, string> = {
  route: 'Section',
  dossier: 'Dossier',
  finding: 'JWST finding',
  case: 'UAP case',
  whistleblower: 'Whistleblower',
  expert: 'Expert',
  god: 'Deity',
  vault: 'Vault slot',
};
