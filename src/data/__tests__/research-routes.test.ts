import { describe, it, expect } from 'vitest';
import { ROUTES } from '@/lib/search/route-registry';
import { PRIMARY_NAV, SECONDARY_NAV } from '@/config/nav';

const paths = (xs: { path?: string; to?: string }[]) => xs.map((x) => x.path ?? x.to);

describe('research routes', () => {
  it('search index includes the disclosure hub, plasma page and UAP case files', () => {
    const p = ROUTES.map((r) => r.route);
    expect(p).toContain('/disclosure');
    expect(p).toContain('/plasma');
    expect(p).toContain('/uap');
  });
  it('nav keeps /uap and adds /disclosure and /plasma', () => {
    const p = paths([...PRIMARY_NAV, ...SECONDARY_NAV] as never);
    expect(p).toContain('/disclosure');
    expect(p).toContain('/plasma');
    expect(p).toContain('/uap');
  });
});
