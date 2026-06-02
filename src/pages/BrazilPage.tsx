import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { brazilEntries, brazilCategories } from '@/data/brazil';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function BrazilPage() {
  return (
    <>
      <SEO
        title="Brazil UAP Dossier — Pantheon Observatory"
        description="Varginha, Operação Prato, Trindade Island, the Noite Oficial dos OVNIs, and the Amazon chupa-chupa wave. Brazil's declassified UAP record — military files, photographs, and witness testimony."
        canonical="/brazil"
      />
      <DossierPageLayout
        theme={pageThemes.brazil}
        entries={brazilEntries}
        categories={brazilCategories}
        introSlot={
          <p>
            Brazil holds the most evidence-rich UAP record outside the United States.
            The Brazilian Air Force (FAB) has formally declassified its UFO archives
            under the <em>Sigilo Levantado</em> decree — releasing thousands of pages
            covering <strong>Operação Prato</strong>, the <strong>1986 Night of the UFOs</strong>,
            the <strong>Trindade Island photographs</strong>, and dozens of less-known
            military encounters. This dossier consolidates the verified cases, the
            witness testimony, and the visual record.
          </p>
        }
      />
    </>
  );
}
