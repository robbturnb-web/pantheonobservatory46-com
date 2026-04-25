import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { antarcticaEntries, antarcticaCategories } from '@/data/antarctica';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function AntarcticaPage() {
  return (
    <>
      <SEO
        title="Antarctica Dossier — Pantheon Observatory"
        description="Operation Highjump, Lake Vostok, and the unexplained scientist deaths on the white continent. The verified record alongside the claims that refuse to thaw."
        canonical="/antarctica"
      />
      <DossierPageLayout
        theme={pageThemes.antarctica}
        entries={antarcticaEntries}
        categories={antarcticaCategories}
        introSlot={
          <p>
            The white continent has hosted the largest naval operation south of the equator,
            the longest-isolated freshwater lake on Earth, and a string of unexplained scientist
            deaths. This archive consolidates the verified record alongside the persistent
            claims that refuse to thaw.
          </p>
        }
      />
    </>
  );
}
