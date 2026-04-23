import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { atlantisEntries, atlantisCategories } from '@/data/atlantis';
import { pageThemes } from '@/lib/page-themes';

export function AtlantisPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.atlantis}
      entries={atlantisEntries}
      categories={atlantisCategories}
      introSlot={
        <p>
          One ancient text. Nine candidate locations. Twelve millennia of debate.
          This archive consolidates Plato&apos;s primary account, every major
          submerged candidate site, and the modern theorists who keep the
          drowned kingdom alive.
        </p>
      }
    />
  );
}
