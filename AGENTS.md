# Architecture rules

- Feed health views consume the same `use-live-data` hooks as dashboard panels so caching, polling, and retry backoff remain consistent.
- Account entry uses the shared auth-navigation helpers and the existing signup profile trigger; email confirmation never counts as a signed-in session. This preserves member profiles without duplicate tables.
- Research content labels source reliability (`SourceTierKey`) and claim status (`ClaimStatus`) separately via `src/lib/evidence.ts`; keeps "reliable source" from being read as "true claim".
- Homepage and research pages use the shared institution surface classes (`inst-*` in index.css, `inst` Tailwind colors); keeps the look consistent and themeable from one place.
