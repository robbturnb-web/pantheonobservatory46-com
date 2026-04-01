import { motion } from 'framer-motion';
import { consciousnessSections } from '../data/consciousness';
import { EvidenceBadge } from '../components/EvidenceBadge';

export function ConsciousnessPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Consciousness Research</h1>
        <p className="text-muted-foreground">From Stargate to the Gateway Process and beyond.</p>
      </motion.div>

      <div className="space-y-6">
        {consciousnessSections.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-cosmic rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              <EvidenceBadge grade={section.grade} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{section.subtitle}</p>
            <p className="text-sm text-foreground mb-4">{section.summary}</p>

            <div className="space-y-2 mb-4">
              {section.keyFacts.map((fact, fi) => (
                <div key={fi} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <p className="text-sm text-foreground">{fact}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground italic">{section.sourceNote}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
