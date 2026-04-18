import { motion } from 'framer-motion';
import { Activity, Sun, Mountain, Sparkles, ExternalLink } from 'lucide-react';
import { pulseUpdates, type PulseUpdate } from '@/data/pulse-updates';
import { Countdown } from '@/components/Countdown';
import { VideoStrip } from '@/components/VideoStrip';

const categoryIcon = (category: PulseUpdate['category']) => {
  switch (category) {
    case 'solar':
      return Sun;
    case 'seismic':
      return Mountain;
    case 'planetary':
      return Activity;
    case 'anomaly':
      return Sparkles;
  }
};

const urgencyClass = (urgency: PulseUpdate['urgency']) =>
  urgency === 'high'
    ? 'border-destructive/40 text-destructive'
    : 'border-accent-amber/40 text-accent-amber';

export function EarthPulsePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="text-xs uppercase tracking-[3px] text-accent-neon mb-3">
          LIVE PLANETARY MONITOR
        </div>
        <h1 className="text-5xl font-bold mb-4">EARTH PULSE</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Solar storms, seismic activity, planetary geometry, and anomalous events.
          Curated from Stefan Burns and other field researchers.
        </p>
      </motion.div>

      <div className="mb-12">
        <Countdown />
      </div>

      <div className="space-y-6">
        {pulseUpdates.map((update, i) => {
          const Icon = categoryIcon(update.category);
          return (
            <motion.article
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-cosmic rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {update.date}
                    </span>
                    <span
                      className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded-full border ${urgencyClass(
                        update.urgency,
                      )}`}
                    >
                      {update.urgency}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {update.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {update.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {update.summary}
                  </p>
                  {update.stefanLink && (
                    <a
                      href={update.stefanLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-sm text-accent-neon hover:underline"
                    >
                      Watch Stefan Burns update
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="-mx-4 mt-8">
        <VideoStrip
          topic="energy"
          title="Stefan Burns + Energy Updates"
          subtitle="Solar, Schumann, and planetary frequency monitoring."
          limit={3}
        />
      </div>
    </div>
  );
}
