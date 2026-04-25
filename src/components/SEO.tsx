import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  /** Optional canonical path (e.g. "/uap"). Defaults to current location. */
  canonical?: string;
}

/**
 * Lightweight SEO updater — mutates document.title and the description
 * meta tag at mount. No dependencies, no provider needed.
 *
 * For SPA crawlers that execute JS (Google, Bing) this is sufficient
 * to give each route a unique title + description.
 */
export function SEO({ title, description, canonical }: SEOProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    // Canonical link
    const href = canonical
      ? `https://pantheonobservatory.com${canonical}`
      : `https://pantheonobservatory.com${window.location.pathname}`;
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical]);

  return null;
}
