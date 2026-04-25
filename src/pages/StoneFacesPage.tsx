import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { stoneFacesEntries, stoneFacesCategories } from '@/data/stone-faces';
import { pageThemes } from '@/lib/page-themes';

export function StoneFacesPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.stoneFaces}
      entries={stoneFacesEntries}
      categories={stoneFacesCategories}
      introSlot={
        <p>
          Ten dig sites the textbook timeline cannot easily explain. Göbekli Tepe pulled the
          start of civilization back 6,000 years overnight. Puma Punku\'s blocks fit like cast
          metal at 13,000 ft. Baalbek\'s 1,650-tonne stone is the largest worked rock on Earth.
          Each entry pairs the field record with the contested chronology — and points to the
          excavations still in progress.
        </p>
      }
    />
  );
}
