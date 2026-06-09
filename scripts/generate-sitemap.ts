// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://pantheonobservatory46-com.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().split("T")[0];

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "daily", priority: "1.0", lastmod: today },
  // Flagship realms
  { path: "/echo", changefreq: "daily", priority: "0.9", lastmod: today },
  { path: "/echoverse", changefreq: "daily", priority: "0.9", lastmod: today },
  { path: "/the-46", changefreq: "weekly", priority: "0.9", lastmod: today },
  { path: "/46", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/codex", changefreq: "weekly", priority: "0.8", lastmod: today },
  // Disclosure / UAP
  { path: "/uap", changefreq: "daily", priority: "0.9", lastmod: today },
  { path: "/orb-report", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/aaro", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/crash-retrieval", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/black-programs", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/whistleblowers", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/missing", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/encounters", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/underground", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/corbell", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/jeremy-corbell", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/brazil", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/documentaries", changefreq: "weekly", priority: "0.7", lastmod: today },
  // Cosmos
  { path: "/galaxy", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/telescopes", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/jwst", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/federation", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/species", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/extinct", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/star-seed", changefreq: "weekly", priority: "0.7", lastmod: today },
  // Consciousness & mythos
  { path: "/gods", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/consciousness", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/shadow-pantheon", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/frequencies", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/signals", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/origin", changefreq: "weekly", priority: "0.7", lastmod: today },
  // Earth & ancient
  { path: "/timeline", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/earth-pulse", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/pyramids", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/antarctica", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/atlantis", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/stone-faces", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/glyphs", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/elements", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/cern", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/rubiks-cube", changefreq: "monthly", priority: "0.5", lastmod: today },
  // Community & people
  { path: "/builders", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/experts", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/experts/stefan-burns", changefreq: "monthly", priority: "0.5", lastmod: today },
  // Search & other
  { path: "/search", changefreq: "weekly", priority: "0.5", lastmod: today },
  { path: "/video-vault", changefreq: "weekly", priority: "0.6", lastmod: today },
  { path: "/style-guide", changefreq: "monthly", priority: "0.3", lastmod: today },

];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
