import { Activity, Radio, Database, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Animated status strip showing live operational state of the Observatory.
 * Sits below the hero; pure presentational, no business logic moved.
 */
export function CommandHeroBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const items = [
    { Icon: Radio,    label: 'Signal Online',       tone: 'text-emerald-300', dot: 'bg-emerald-400' },
    { Icon: Database, label: 'Archive Active',      tone: 'text-primary',     dot: 'bg-primary' },
    { Icon: Activity, label: 'Live Feed Monitoring',tone: 'text-cyan-300',    dot: 'bg-cyan-400' },
    { Icon: Clock,    label: `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      tone: 'text-amber-300', dot: 'bg-amber-400' },
  ];

  return (
    <section className="relative z-10 px-4 -mt-2 sm:-mt-4">
      <div className="max-w-6xl mx-auto rounded-xl border border-primary/25 bg-background/60 backdrop-blur-xl shadow-[0_0_40px_-12px_hsl(var(--primary)/0.35)]">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2.5">
          {items.map(({ Icon, label, tone, dot }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`relative w-1.5 h-1.5 rounded-full ${dot}`}>
                <span className={`absolute inset-0 rounded-full ${dot} animate-ping opacity-60`} />
              </span>
              <Icon className={`w-3.5 h-3.5 ${tone}`} />
              <span className="text-[10px] uppercase tracking-[2.5px] font-semibold text-foreground/80">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommandHeroBar;
