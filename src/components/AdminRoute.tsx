import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/use-user-role';

/**
 * Wraps any admin-only route. Shows a themed loader while resolving role,
 * redirects unauthenticated users to /auth, and non-admins to home.
 */
export function AdminRoute({ children }: { children: ReactNode }) {
  const { isAdmin, loading, roles } = useUserRole();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            Verifying clearance…
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    // No session at all → roles is [] and not loading → send to auth
    // Otherwise authenticated but not admin → home
    return <Navigate to={roles.length === 0 ? '/auth' : '/'} replace />;
  }

  return <>{children}</>;
}
