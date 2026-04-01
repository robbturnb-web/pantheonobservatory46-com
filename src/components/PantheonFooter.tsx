import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

export function PantheonFooter() {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg">
            <Eye className="w-5 h-5" />
            PANTHEON OBSERVATORY
          </Link>
          <p className="text-sm text-muted-foreground text-center">
            Knowledge platform · Not affiliated with any government or institution · Open source
          </p>
          <p className="text-xs text-muted-foreground">CC0 · Public Domain</p>
        </div>
      </div>
    </footer>
  );
}
