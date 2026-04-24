import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { builderEntries, builderCategories } from '@/data/builders';
import { pageThemes } from '@/lib/page-themes';

export function BuildersArenaPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.builders}
      entries={builderEntries}
      categories={builderCategories}
      introSlot={
        <p>
          The drafting board for Earth's impossible builds. From the Great Pyramid's
          1/15th-degree cardinal alignment to Puma Punku's machine-grade andesite joints,
          Baalbek's 1,000-ton trilithon, and Ed Leedskalnin's solo Coral Castle — each
          dossier weighs the mainstream engineering reconstruction against the open
          questions that remain. Where consensus is solid we say so; where the math
          doesn't quite close, we mark it.
        </p>
      }
    />
  );
}
