import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { antarcticaEntries, antarcticaCategories } from '@/data/antarctica';
import { pageThemes } from '@/lib/page-themes';

export function AntarcticaPage() {
  return (
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
  );
}
