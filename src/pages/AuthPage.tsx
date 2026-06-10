import { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { SEO } from '@/components/SEO';
import { XP_VALUES } from '@/lib/xp-events';

type Mode = 'signin' | 'signup' | 'forgot';

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = (searchParams.get('mode') as Mode) || 'signin';
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validate and resolve post-auth redirect target (in-app paths only)
  const rawRedirect = searchParams.get('redirect');
  const redirectTo =
    rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
      ? rawRedirect
      : '/echoverse';

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(redirectTo, { replace: true });
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate(redirectTo, { replace: true });
    });

    return () => subscription.subscription.unsubscribe();
  }, [navigate, redirectTo]);

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setOauthLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast({ title: `${provider === 'google' ? 'Google' : 'Apple'} sign-in failed`, description: String(result.error), variant: 'destructive' });
      }
    } catch (e: any) {
      toast({ title: `${provider === 'google' ? 'Google' : 'Apple'} sign-in failed`, description: e?.message ?? 'Unknown error', variant: 'destructive' });
    } finally {
      setOauthLoading(false);
    }
  };
  const handleGoogle = () => handleOAuth('google');
  const handleApple = () => handleOAuth('apple');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username: username || 'Starseed' },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        // Award sign-up XP via the secured RPC if a session was issued (auto-confirm flow).
        // Direct table writes are no longer allowed; award_xp() is SECURITY DEFINER and
        // performs idempotent, bounded XP grants.
        const newUserId = data.user?.id;
        if (newUserId && data.session) {
          await supabase.rpc('award_xp', {
            p_event_type: 'page',
            p_event_id: `sign_up:${newUserId}`,
            p_amount: XP_VALUES.SIGN_UP,
          });
        }
        toast({
          title: 'Welcome, Starseed',
          description: data.session
            ? `+${XP_VALUES.SIGN_UP} XP — your journey begins.`
            : 'We sent you a verification link. Click it to enter the Echoverse.',
        });
      } else if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: 'Welcome back, Starseed' });
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast({
          title: 'Reset link sent',
          description: 'Check your email for a link to reset your password.',
        });
        setMode('signin');
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <SEO
        title="Sign In · Pantheon Observatory"
        description="Access your Pantheon Observatory account to track XP, save sightings, and unlock Echo's deeper memory."
        canonical="/auth"
        noindex
      />
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(139,92,246,0.18), transparent 60%), radial-gradient(ellipse at bottom, rgba(34,211,238,0.10), transparent 60%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Observatory
        </Link>

        <div className="glass-cosmic rounded-2xl p-7 sm:p-8 border border-border/60">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center bg-primary/15 border border-primary/30 mb-4">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {mode === 'signin' && 'Welcome back'}
              {mode === 'signup' && 'Join the Observatory'}
              {mode === 'forgot' && 'Reset your password'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              {mode === 'signin' && 'Sign in to track your XP and join the Echoverse.'}
              {mode === 'signup' && 'Track your discoveries. Earn ranks. Chat with starseeds.'}
              {mode === 'forgot' && 'Enter your email and we will send you a reset link.'}
            </p>
          </div>

          {/* Tabs */}
          {mode !== 'forgot' && (
            <div className="flex bg-secondary/40 rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  mode === 'signin' ? 'bg-background text-foreground shadow' : 'text-muted-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  mode === 'signup' ? 'bg-background text-foreground shadow' : 'text-muted-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Google OAuth */}
          {mode !== 'forgot' && (
            <>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={oauthLoading || loading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 mb-4"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
                  <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 13.9-5.4l-6.4-5.4C29.4 34.7 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.4 5.4C41.3 36.5 44 31 44 24c0-1.3-.1-2.3-.4-3.5z" />
                </svg>
                {oauthLoading ? 'Redirecting…' : 'Continue with Google'}
              </button>

              <button
                type="button"
                onClick={handleApple}
                disabled={oauthLoading || loading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-black text-white font-semibold hover:bg-black/90 transition-colors disabled:opacity-50 mb-4 border border-white/10"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.365 1.43c0 1.14-.413 2.21-1.24 3.21-1 1.19-2.22 1.88-3.55 1.78-.02-1.12.45-2.27 1.27-3.22.96-1.11 2.36-1.83 3.52-1.77zM20.5 17.27c-.59 1.34-.87 1.94-1.63 3.13-1.06 1.65-2.55 3.71-4.39 3.73-1.64.02-2.06-1.07-4.28-1.06-2.22.01-2.69 1.08-4.33 1.06-1.84-.02-3.25-1.88-4.31-3.53C-1.55 17.06-1.92 11.32 1.74 8.59c1.3-.96 3-1.55 4.5-1.55 1.84 0 3 1.01 4.52 1.01 1.47 0 2.36-1.02 4.49-1.02 1.3 0 2.69.71 3.68 1.93-3.23 1.77-2.71 6.39.57 8.31z" />
                </svg>
                {oauthLoading ? 'Redirecting…' : 'Continue with Apple'}
              </button>


              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground uppercase tracking-widest">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Field icon={User} label="Display name">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your cosmic name"
                  className="bg-muted/20 border-border/40 pl-10"
                />
              </Field>
            )}

            <Field icon={Mail} label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="starseed@cosmos.io"
                required
                className="bg-muted/20 border-border/40 pl-10"
              />
            </Field>

            {mode !== 'forgot' && (
              <Field icon={Lock} label="Password">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="bg-muted/20 border-border/40 pl-10"
                />
              </Field>
            )}

            {mode === 'signin' && (
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-xs text-primary hover:underline ml-auto block"
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading || oauthLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send reset link'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to sign in
              </button>
            )}
          </form>

          {mode === 'signup' && (
            <p className="text-[11px] text-muted-foreground text-center mt-5 leading-relaxed">
              By signing up you agree to receive a verification email. We do not sell your data.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <div className="relative">
        <Icon className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        {children}
      </div>
    </div>
  );
}
