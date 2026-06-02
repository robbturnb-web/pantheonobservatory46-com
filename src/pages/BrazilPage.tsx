import { useState } from 'react';
import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { DossierModal } from '@/components/dossier/DossierModal';
import { BrazilMap } from '@/components/brazil/BrazilMap';
import { brazilEntries, brazilCategories } from '@/data/brazil';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';
import type { DossierEntry } from '@/components/dossier/types';

export function BrazilPage() {
  const theme = pageThemes.brazil;
  const [mapEntry, setMapEntry] = useState<DossierEntry | null>(null);

  return (
    <>
      <SEO
        title="Brazil UAP Dossier — Pantheon Observatory"
        description="Varginha, Operação Prato, Trindade Island, the Noite Oficial dos OVNIs, and the Amazon chupa-chupa wave. Brazil's declassified UAP record — military files, photographs, and witness testimony."
        canonical="/brazil"
      />
      <DossierPageLayout
        theme={theme}
        entries={brazilEntries}
        categories={brazilCategories}
        introSlot={
          <>
            <p>
              Brazil holds the most evidence-rich UAP record outside the United States.
              The Brazilian Air Force (FAB) has formally declassified its UFO archives
              under the <em>Sigilo Levantado</em> decree — releasing thousands of pages
              covering <strong>Operação Prato</strong>, the <strong>1986 Night of the UFOs</strong>,
              the <strong>Trindade Island photographs</strong>, and dozens of less-known
              military encounters. This dossier consolidates the verified cases, the
              witness testimony, and the visual record.
            </p>
            <div className="mt-8">
              <BrazilMap
                entries={brazilEntries}
                accent={theme.accent}
                accentAlt={theme.accentAlt}
                surface={theme.cardSurface}
                border={theme.cardBorder}
                fg={theme.heroFg}
                onSelect={(e) => setMapEntry(e)}
              />
            </div>
          </>
        }
      />
      <DossierModal entry={mapEntry} theme={theme} onClose={() => setMapEntry(null)} />
    </>
  );
}
