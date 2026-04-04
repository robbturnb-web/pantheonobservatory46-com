import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface KnowledgeLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function KnowledgeLink({ href, children, className = '' }: KnowledgeLinkProps) {
  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 transition-colors ${className}`}
      >
        {children}
        <ExternalLink className="w-3 h-3 shrink-0" />
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={`inline-flex items-center gap-1 text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
