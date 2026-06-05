import { Helmet } from 'react-helmet-async';

const SITE = 'https://pantheonobservatory46-com.lovable.app';

type SEOProps = {
  title: string;
  description: string;
  /** Route path like "/uap". Either `path` or `canonical` is required. */
  path?: string;
  /** Full canonical URL override. */
  canonical?: string;
  /** Optional JSON-LD schema object(s). */
  schema?: Record<string, unknown> | Record<string, unknown>[];
  /** noindex for gated/private routes. */
  noindex?: boolean;
  image?: string;
};

/**
 * Per-route SEO: title, description, canonical, og:*, optional JSON-LD.
 * Pair with the sitewide head in index.html (which provides social-crawler fallbacks).
 */
export function SEO({ title, description, path, canonical, schema, noindex, image }: SEOProps) {
  const url = canonical ?? `${SITE}${path ?? '/'}`;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
