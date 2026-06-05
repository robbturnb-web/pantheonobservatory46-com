import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Loader2, Lock } from 'lucide-react';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';



const orbSchema = z.object({
  location: z.string().trim().min(2, 'Location is required').max(120),
  date: z.string().trim().min(1, 'Date is required').max(40),
  description: z
    .string()
    .trim()
    .min(10, 'Tell us a bit more (10+ chars)')
    .max(2000),
  email: z
    .string()
    .trim()
    .email('Invalid email')
    .max(255)
    .optional()
    .or(z.literal('')),
});

export function OrbReportPage() {
  const [form, setForm] = useState({
    location: '',
    date: '',
    description: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setAuthChecked(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Sign in required', description: 'Log in to submit a sighting.', variant: 'destructive' });
      return;
    }
    const result = orbSchema.safeParse(form);
    if (!result.success) {
      toast({
        title: 'Check your sighting',
        description: result.error.errors[0]?.message ?? 'Invalid input',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('orb_sightings').insert({
      user_id: user.id,
      location: result.data.location,
      sighting_date: result.data.date,
      description: result.data.description,
      email: result.data.email || null,
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: 'Could not log sighting',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }
    setSubmitted(true);
    setForm({ location: '', date: '', description: '', email: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };



  return (
    <div className="relative">
      {/* Cinematic hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.20), transparent 55%), radial-gradient(circle at 20% 80%, rgba(16,185,129,0.10), transparent 50%), linear-gradient(180deg, rgba(5,3,13,0) 0%, hsl(var(--background)) 100%)',
          }}
        />
        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { left: '12%', top: '30%', size: 6, delay: 0 },
            { left: '78%', top: '20%', size: 4, delay: 1.5 },
            { left: '55%', top: '60%', size: 8, delay: 0.8 },
            { left: '30%', top: '70%', size: 5, delay: 2.2 },
            { left: '88%', top: '55%', size: 5, delay: 3 },
          ].map((o, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: o.left,
                top: o.top,
                width: o.size,
                height: o.size,
                background: '#10b981',
                boxShadow: '0 0 16px #10b981, 0 0 32px rgba(16,185,129,0.6)',
              }}
              animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: o.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-2xl mx-auto px-4 pt-20 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] mb-4"
              style={{ color: '#10b981' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              Citizen Reporting Channel
            </div>
            <motion.h1
              className="text-5xl sm:text-6xl mb-4 leading-tight"
              style={{
                fontFamily: 'Cinzel, serif',
                color: '#E5F8FF',
                textShadow: '0 0 28px rgba(16,185,129,0.4), 0 2px 12px rgba(0,0,0,0.7)',
              }}
            >
              Orb Sightings Log
            </motion.h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
              Report what you saw. Bledsoe orbs. New Jersey swarms. Backyard flickers. Every sighting feeds the archive.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12">


      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-cosmic text-center p-12 rounded-2xl"
        >
          <h2 className="text-2xl text-accent-neon mb-2">Thank you, Starseed.</h2>
          <p className="text-muted-foreground">
            Your sighting has been logged and will appear in the public feed after
            review.
          </p>
        </motion.div>
      ) : !authChecked ? (
        <div className="glass-cosmic rounded-2xl p-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : !user ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-cosmic rounded-2xl p-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 border border-primary/30 mb-5">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Sign in to log a sighting</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We gate submissions to keep the feed clean and traceable. Your account stays attached to your report — never shown publicly.
          </p>
          <Link
            to={`/auth?redirect=${encodeURIComponent('/orb-report')}`}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl px-6 py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            Sign in to continue
          </Link>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="glass-cosmic rounded-2xl p-8 space-y-5"
        >

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="City, State or Lat/Long"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              maxLength={120}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Date & Time
            </label>
            <input
              type="text"
              placeholder="e.g. April 16, 2026 — 9:47 PM"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              maxLength={40}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="What did you see? Color, movement, duration, witnesses..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              maxLength={2000}
              rows={6}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              placeholder="For follow-up only — never shared"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl px-6 py-3 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {submitting ? 'Logging…' : 'Submit Sighting'}
          </button>

        </form>
      )}
      </div>
    </div>
  );
}

