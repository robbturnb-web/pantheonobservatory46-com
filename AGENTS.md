# Architecture rules

- Feed health views consume the same `use-live-data` hooks as dashboard panels so caching, polling, and retry backoff remain consistent.
- Account entry uses the shared auth-navigation helpers and the existing signup profile trigger; email confirmation never counts as a signed-in session. This preserves member profiles without duplicate tables.
