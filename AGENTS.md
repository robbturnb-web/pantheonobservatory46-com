# Architecture rules

- Feed health views consume the same `use-live-data` hooks as dashboard panels so caching, polling, and retry backoff remain consistent.