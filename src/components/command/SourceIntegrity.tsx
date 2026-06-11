import { Link } from 'react-router-dom';
import { ClaimBadge, type ClaimKind } from './ClaimBadge';

const CARDS: { kind: ClaimKind; title: string; desc: string }[] = [
  { kind: 'FACT',        title: 'Verified Sources',   desc: 'Primary documents, peer-reviewed science, and confirmed records.' },
  { kind: 'MYTH',        title: 'Myth & Lore',        desc: 'Folklore, scripture, and symbolic tradition — preserved as told.' },
  { kind: 'THEORY',      title: 'Open Theories',      desc: 'Debated frameworks under active investigation by researchers.' },
  { kind: 'SPECULATION', title: 'Speculative Archive',desc: 'Open mysteries, interpretations, and unverified leads.' },
];

export function SourceIntegrity() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[4px] text-emerald-300 mb-2">Source Integrity</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Facts vs Speculation
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Pantheon separates verified history, mythology, theory, and speculation so visitors can
            explore mysteries without confusing belief with evidence.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-background/55 backdrop-blur-xl p-5">
              <ClaimBadge kind={c.kind} />
              <h3 className="text-base font-bold text-foreground mt-3">{c.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/sources" className="text-xs uppercase tracking-[3px] text-primary hover:text-primary/80 transition-colors">
            See full trust system →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SourceIntegrity;
