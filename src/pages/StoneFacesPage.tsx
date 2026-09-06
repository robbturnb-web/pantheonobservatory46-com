import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { stoneFacesEntries, stoneFacesCategories } from '@/data/stone-faces';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function StoneFacesPage() {
  return (
    <>
    <SEO
      title="Stone Faces — Megalithic Sites the Textbook Can't Explain | Pantheon"
      description="Göbekli Tepe, Puma Punku, Baalbek and seven more dig sites pairing field record with contested chronology. The excavations rewriting the human timeline."
      path="/stone-faces"
      schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'Stone Faces Archive', url:'https://pantheonobservatory46.com/stone-faces', numberOfItems: stoneFacesEntries.length }}
    />
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
    </>
  );
}
