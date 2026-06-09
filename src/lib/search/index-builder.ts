/**
 * Site-wide search index.
 * Pure client-side. Lazy-built on first query, cached for the session.
 *
 * Verifiable: every doc carries evidence grade when the source has one.
 * Linkable: every doc has a deep route.
 * Creditable: every doc passes through `sources` so the result card can show them.
 */
import MiniSearch from 'minisearch';
import { ROUTES, type RealmKey } from './route-registry';

export type SearchDocType =
  | 'route'
  | 'dossier'
  | 'finding'
  | 'case'
  | 'whistleblower'
  | 'expert'
  | 'god'
  | 'vault';

export interface SearchSource {
  label: string;
  url?: string;
}

export interface SearchDoc {
  id: string;
  title: string;
  summary: string;
  body: string;
  realm: RealmKey;
  route: string;
  type: SearchDocType;
  /** A/B/C/D | VERIFIED/REPORTED/ALLEGED/DEBATED — left verbatim from source */
  evidence?: string;
  sources?: SearchSource[];
  /** Optional badge like "DIA · 2007–2012" */
  meta?: string;
}

let _instance: { mini: MiniSearch<SearchDoc>; docs: Map<string, SearchDoc> } | null = null;
let _loading: Promise<typeof _instance> | null = null;

function newIndex() {
  return new MiniSearch<SearchDoc>({
    fields: ['title', 'summary', 'body', 'meta'],
    storeFields: ['id', 'title', 'summary', 'realm', 'route', 'type', 'evidence', 'sources', 'meta'],
    searchOptions: {
      boost: { title: 4, summary: 2, body: 1 },
      fuzzy: 0.2,
      prefix: true,
    },
  });
}

function pushRoutes(docs: SearchDoc[]) {
  for (const r of ROUTES) {
    docs.push({
      id: `route:${r.route}`,
      title: r.title,
      summary: r.summary,
      body: `${r.title} ${r.summary} ${r.keywords ?? ''} ${r.route}`,
      realm: r.realm,
      route: r.route,
      type: 'route',
    });
  }
}

function dossierRouteFor(file: string): { route: string; realm: RealmKey } {
  const map: Record<string, { route: string; realm: RealmKey }> = {
    aaro: { route: '/aaro', realm: 'disclosure' },
    antarctica: { route: '/antarctica', realm: 'ancient' },
    atlantis: { route: '/atlantis', realm: 'ancient' },
    'black-programs': { route: '/black-programs', realm: 'disclosure' },
    brazil: { route: '/brazil', realm: 'disclosure' },
    builders: { route: '/builders', realm: 'ancient' },
    cern: { route: '/cern', realm: 'consciousness' },
    'crash-retrieval': { route: '/crash-retrieval', realm: 'disclosure' },
    'entity-encounters': { route: '/encounters', realm: 'entity' },
    'extinct-species': { route: '/extinct', realm: 'entity' },
    federation: { route: '/federation', realm: 'consciousness' },
    'glyphs-dossier': { route: '/glyphs', realm: 'ancient' },
    'stone-faces': { route: '/stone-faces', realm: 'ancient' },
    'underground-bases': { route: '/underground', realm: 'entity' },
  };
  return map[file] ?? { route: '/', realm: 'archive' };
}

async function pushDossiers(docs: SearchDoc[]) {
  // Eagerly import all known dossier files in parallel.
  const loaders = [
    ['aaro', () => import('@/data/aaro').then((m) => m.aaroEntries)],
    ['antarctica', () => import('@/data/antarctica').then((m) => m.antarcticaEntries)],
    ['atlantis', () => import('@/data/atlantis').then((m) => m.atlantisEntries)],
    ['black-programs', () => import('@/data/black-programs').then((m) => m.blackProgramEntries)],
    ['brazil', () => import('@/data/brazil').then((m) => m.brazilEntries)],
    ['builders', () => import('@/data/builders').then((m) => m.builderEntries)],
    ['cern', () => import('@/data/cern').then((m) => m.cernEntries)],
    ['crash-retrieval', () => import('@/data/crash-retrieval').then((m) => m.crashRetrievalEntries)],
    ['entity-encounters', () => import('@/data/entity-encounters').then((m) => m.entityEncounterEntries)],
    ['extinct-species', () => import('@/data/extinct-species').then((m) => m.extinctSpeciesEntries)],
    ['federation', () => import('@/data/federation').then((m) => m.federationEntries)],
    ['glyphs-dossier', () => import('@/data/glyphs-dossier').then((m) => m.glyphsDossierEntries)],
    ['stone-faces', () => import('@/data/stone-faces').then((m) => m.stoneFacesEntries)],
    ['underground-bases', () => import('@/data/underground-bases').then((m) => m.undergroundBasesEntries)],
  ] as const;

  const results = await Promise.allSettled(loaders.map(([, fn]) => fn()));

  results.forEach((r, i) => {
    if (r.status !== 'fulfilled' || !Array.isArray(r.value)) return;
    const [file] = loaders[i];
    const { route, realm } = dossierRouteFor(file);
    for (const e of r.value) {
      if (!e || !e.id) continue;
      const body = [
        e.summary,
        e.origin,
        Array.isArray(e.keyEvents) ? e.keyEvents.join(' ') : '',
        Array.isArray(e.evidence) ? e.evidence.join(' ') : '',
        e.skepticalView,
        e.subtitle,
        e.location,
        e.era,
      ]
        .filter(Boolean)
        .join(' ');
      docs.push({
        id: `${file}:${e.id}`,
        title: e.title,
        summary: e.summary ?? '',
        body,
        realm,
        route: `${route}#${e.id}`,
        type: 'dossier',
        evidence: e.confidence,
        sources: e.sources,
        meta: [e.subtitle, e.era, e.location].filter(Boolean).join(' · '),
      });
    }
  });
}

async function pushExtras(docs: SearchDoc[]) {
  // JWST findings
  try {
    const m = await import('@/data/jwst-findings');
    const arr: any[] = (m as any).jwstFindings ?? (m as any).default ?? [];
    for (const f of arr) {
      if (!f?.id) continue;
      docs.push({
        id: `jwst:${f.id}`,
        title: f.title,
        summary: f.subtitle ?? '',
        body: `${f.title} ${f.subtitle ?? ''} ${f.category ?? ''} ${f.instrument ?? ''} ${f.era ?? ''} ${f.target?.name ?? ''}`,
        realm: 'cosmos',
        route: `/jwst#${f.id}`,
        type: 'finding',
        meta: [f.category, f.instrument, f.era].filter(Boolean).join(' · '),
      });
    }
  } catch {}

  // UAP cases
  try {
    const m = await import('@/data/uap-cases');
    const arr: any[] = (m as any).uapCases ?? [];
    for (const c of arr) {
      if (!c?.id) continue;
      docs.push({
        id: `uap:${c.id}`,
        title: c.title,
        summary: c.summary ?? '',
        body: `${c.summary ?? ''} ${c.officialExplanation ?? ''} ${c.alternativeExplanation ?? ''} ${c.date ?? ''}`,
        realm: 'disclosure',
        route: `/uap#${c.id}`,
        type: 'case',
        evidence: c.grade,
        sources: c.sources,
        meta: c.date,
      });
    }
  } catch {}

  // Whistleblowers
  try {
    const m = await import('@/data/whistleblowers');
    const arr: any[] = (m as any).whistleblowers ?? (m as any).WHISTLEBLOWERS ?? [];
    for (const w of arr) {
      if (!w?.id) continue;
      docs.push({
        id: `wb:${w.id}`,
        title: w.name,
        summary: w.summary ?? w.role ?? '',
        body: `${w.name} ${w.role ?? ''} ${w.summary ?? ''} ${(w.keyClaims ?? []).join(' ')}`,
        realm: 'disclosure',
        route: `/whistleblowers#${w.id}`,
        type: 'whistleblower',
        evidence: w.grade,
        sources: w.sources,
        meta: w.role,
      });
    }
  } catch {}

  // Experts
  try {
    const m = await import('@/data/experts');
    const arr: any[] = (m as any).EXPERTS ?? (m as any).experts ?? [];
    for (const e of arr) {
      const slug = e?.slug;
      if (!slug) continue;
      docs.push({
        id: `expert:${slug}`,
        title: e.name,
        summary: e.tagline ?? e.bio ?? '',
        body: `${e.name} ${e.tagline ?? ''} ${e.bio ?? ''} ${(e.specialties ?? []).join(' ')}`,
        realm: 'archive',
        route: `/experts/${slug}`,
        type: 'expert',
        meta: e.role ?? e.specialty,
      });
    }
  } catch {}

  // Gods
  try {
    const m = await import('@/data/gods');
    const arr: any[] = (m as any).gods ?? (m as any).GODS ?? [];
    for (const g of arr) {
      if (!g?.id) continue;
      docs.push({
        id: `god:${g.id}`,
        title: g.name,
        summary: g.tagline ?? g.summary ?? '',
        body: `${g.name} ${g.pantheon ?? ''} ${g.tagline ?? ''} ${g.summary ?? ''} ${g.domain ?? ''}`,
        realm: 'gods',
        route: `/gods#${g.id}`,
        type: 'god',
        meta: g.pantheon,
      });
    }
  } catch {}

  // The 46 vault slots
  try {
    const m = await import('@/data/the-46');
    const arr: any[] = (m as any).publicSlots ?? (m as any).vaultSlots ?? [];
    for (const v of arr) {
      const id = String(v?.id ?? '');
      if (!id) continue;
      docs.push({
        id: `vault:${id}`,
        title: v.codename ?? `Vault Slot #${id}`,
        summary: v.summary ?? '',
        body: `${v.codename ?? ''} ${v.summary ?? ''} ${v.classification ?? ''} ${v.area ?? ''} ${v.platform ?? ''}`,
        realm: 'archive',
        route: `/the-46#${id}`,
        type: 'vault',
        meta: [v.date, v.classification].filter(Boolean).join(' · '),
      });
    }
  } catch {}
}

export async function getSearchIndex() {
  if (_instance) return _instance;
  if (_loading) return _loading;

  _loading = (async () => {
    const docs: SearchDoc[] = [];
    pushRoutes(docs);
    await pushDossiers(docs);
    await pushExtras(docs);

    // De-dupe by id (route ids can clash with dossier ids in pathological cases).
    const map = new Map<string, SearchDoc>();
    for (const d of docs) if (!map.has(d.id)) map.set(d.id, d);

    const mini = newIndex();
    mini.addAll(Array.from(map.values()));
    _instance = { mini, docs: map };
    return _instance;
  })();

  return _loading;
}
