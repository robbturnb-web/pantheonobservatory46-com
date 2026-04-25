import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { federationEntries, federationCategories } from '@/data/federation';
import { pageThemes } from '@/lib/page-themes';

export function FederationPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.federation}
      entries={federationEntries}
      categories={federationCategories}
      introSlot={
        <p>
          The embassy archive — every alleged interstellar council, treaty, and species delegation
          on the public record. From channeled Council of Nine sessions to Brig. Gen. Haim Eshed\'s
          2020 Galactic Federation disclosure, each sealed file is opened with both the claim and
          its skeptical counterweight.
        </p>
      }
    />
  );
}
