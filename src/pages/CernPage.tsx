import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { cernEntries, cernCategories } from '@/data/cern';
import { pageThemes } from '@/lib/page-themes';

export function CernPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.cern}
      entries={cernEntries}
      categories={cernCategories}
      introSlot={
        <p>
          The Large Hadron Collider is the most precise instrument humanity has ever built — and
          the most heavily mythologized. This watch-deck tracks the discoveries (Higgs, antimatter
          asymmetry, AMS-02 positron excess), the conspiracies (Mandela Effect, Shiva statue,
          black-hole fears), and the future (the 91-km FCC). Every entry separates verified physics
          from internet folklore.
        </p>
      }
    />
  );
}
