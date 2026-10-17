import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE = 'https://pantheonobservatory46.com';

type SEOProps = {
  title: string;
  description: string;
  /** Route path like "/uap". */
  path?: string;
  /** Full canonical URL override, or a site-relative path. */
  canonical?: string;
  /** Optional JSON-LD schema object(s). */
  schema?: Record<string, unknown> | Record<string, unknown>[];
  /** noindex for gated/private routes and on-site search results. */
  noindex?: boolean;
  /** Absolute or site-relative social preview image URL. */
  image?: string;
};

function absoluteUrl(value: string, base = SITE): string {
  try {
    const url = new URL(value, base);
    // Canonicals should describe the page, not a transient query string or fragment.
    url.search = '';
    url.hash = '';
    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
    return url.toString();
  } catch {
    return SITE;
  }
}

/**
 * Per-route SEO: title, description, canonical, social metadata, optional JSON-LD.
 * index.html provides safe defaults for crawlers that do not execute client JavaScript.
 */
export function SEO({ title, description, path, canonical, schema, noindex, image }: SEOProps) {
  const location = useLocation();
  // Many route pages rely on this fallback; without it they all canonicalize to the homepage.
  const url = absoluteUrl(canonical ?? path ?? location.pathname ?? '/');
  const socialImage = image ? absoluteUrl(image) : undefined;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pantheon Observatory" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {socialImage && <meta property="og:image" content={socialImage} />}
      {socialImage && <meta property="og:image:alt" content={title} />}

      <meta name="twitter:card" content={socialImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {socialImage && <meta name="twitter:image" content={socialImage} />}
      {socialImage && <meta name="twitter:image:alt" content={title} />}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
