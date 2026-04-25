import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { glyphsEntries, glyphsCategories } from '@/data/glyphs-dossier';
import { pageThemes } from '@/lib/page-themes';

export function GlyphsPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.glyphs}
      entries={glyphsEntries}
      categories={glyphsCategories}
      introSlot={
        <p>
          Twelve scripts, sigils, and geoglyphs that humanity has either deciphered, half-decoded,
          or stared at for a century without cracking. Each entry separates the literal academic
          reading from the ancient-astronaut interpretation, then lays the open questions on the
          table. From cuneiform to crop circles — the codex is open.
        </p>
      }
    />
  );
}
