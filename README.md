# Pantheon Observatory 46

A cinematic cosmic operating system and knowledge platform exploring UAP disclosure, ancient pantheons, consciousness research, and the mysteries connecting them. Built with React 18, Vite, TypeScript, Tailwind CSS, Three.js, and Supabase.

**Live URL:** [https://pantheonobservatory46.com](https://pantheonobservatory46.com)

---

## Prerequisites

- **Node.js** `>= 18.0.0` (recommended: 20 LTS)
- **Bun** `>= 1.0` (preferred package manager — [install bun](https://bun.sh/docs/installation))
- **Git** (optional, for version control)

> If you don't have Bun, the project also works with `npm` (Node's built-in package manager).

---

## 1. Extract the ZIP

```bash
# Unzip the archive
unzip pantheon-complete-source.zip -d pantheon-observatory-46

# Enter the project directory
cd pantheon-observatory-46
```

On Windows, you can also extract with File Explorer or PowerShell:
```powershell
Expand-Archive -Path pantheon-complete-source.zip -DestinationPath pantheon-observatory-46
Set-Location pantheon-observatory-46
```

---

## 2. Install Dependencies

### With Bun (recommended — faster)
```bash
bun install
```

### With npm
```bash
npm install
```

This installs all React, Vite, Tailwind, Three.js, Supabase, and shadcn/ui dependencies listed in `package.json`.

---

## 3. Configure Environment Variables

The project requires several environment variables. Create a `.env.local` file in the project root with the following values:

```bash
# Supabase (Backend / Auth / Database)
VITE_SUPABASE_URL=https://jsmndieejtfemhfldiza.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbW5kaWVlanRmZW1oZmxkaXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMDc0MTIsImV4cCI6MjA5MDU4MzQxMn0.1DwIXj7n5jfqTnPSndsyPU_Ai3vXg7QWHb3gC6TQqkE
VITE_SUPABASE_PROJECT_ID=jsmndieejtfemhfldiza

# Optional: Stripe (Payments integration — only needed if testing checkout features)
VITE_PAYMENTS_CLIENT_TOKEN=pk_test_51TRpCbBNeB0nXXCCHrLxQCPznU28dhkjz3D0cENRdFgIcxIzSK9er9bhWGgzsgYzB9Y6XT6XPR3anjfuSqsnehts00DfIzMCuS

# Optional: Google Maps (used for location-based features)
VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY=AIzaSyBmvJph4LmrbtW7skeczzpBIyb9WWzFKo4
VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID=56abe2ad1550f1460dab5dbe91386528
```

> **Note:** The Supabase keys above are the project's **publishable (anon)** keys — they are safe to expose in the frontend and are already present in the bundled source. They allow public read access to tables with appropriate Row-Level Security (RLS) policies.

### For Backend Edge Functions (optional)
If you plan to deploy or test Supabase Edge Functions locally, you'll need:
- **Supabase CLI** installed (`npm install -g supabase`)
- A `.env` file in `/supabase/functions/` with `LOVABLE_API_KEY` for AI features (Echo AI, Oracle-46)

---

## 4. Run the App Locally

### Development server (hot-reload)

```bash
# With Bun
bun run dev

# With npm
npm run dev
```

This starts Vite on `http://localhost:5173` (or the next available port). The `predev` script automatically generates `sitemap.xml` before starting.

Open your browser to the URL shown in the terminal (e.g., `http://localhost:5173`).

### Production preview (build + serve locally)

```bash
# Build the app
bun run build
# or
npm run build

# Preview the production build
bun run preview
# or
npm run preview
```

The preview server runs on `http://localhost:4173` by default.

---

## 5. Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Vite dev server with hot reload |
| `bun run build` | Build for production (`dist/`) |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Serve the production build locally |
| `bun run lint` | Run ESLint across the codebase |
| `bun run smoke` | Run Playwright smoke tests |
| `bunx tsx scripts/generate-sitemap.ts` | Manually regenerate `sitemap.xml` |

---

## 6. Running Tests

### Smoke Tests (Playwright)

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run smoke tests
bun run smoke
```

Smoke tests verify that key pages load without errors in a headless browser.

### Visual Regression Tests

```bash
# Run visual regression suite
npx playwright test --config=playwright.config.ts
```

---

## 7. Project Structure

```
pantheon-observatory-46/
├── public/                  # Static assets (favicon, sitemap, robots.txt)
├── src/
│   ├── components/           # React components (UI, cosmic, dossier, echo, etc.)
│   ├── data/                 # Static data modules (UAP cases, gods, whistleblowers, etc.)
│   ├── hooks/                # Custom React hooks (Echo chat, XP, audio, etc.)
│   ├── integrations/         # Supabase client & generated types
│   ├── lib/                  # Utility libraries (search, audio engine, star-seed classifier)
│   ├── pages/                # Route-level page components (50+ pages)
│   ├── services/             # Business logic services
│   ├── assets/               # Images and media assets
│   ├── App.tsx               # Root app component with routing
│   ├── index.css             # Global styles + Tailwind directives
│   └── main.tsx              # Entry point
├── supabase/
│   ├── functions/            # Edge Functions (echo-chat, oracle-46, email hooks, etc.)
│   └── migrations/           # Database schema migrations
├── scripts/                  # Build scripts (sitemap generator)
├── tests/                    # Playwright test suites
├── .env / .env.local         # Environment variables
├── index.html                # HTML entry point
├── package.json              # Dependencies & scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build configuration
```

---

## 8. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + Vite 5 + TypeScript 5 |
| **Styling** | Tailwind CSS 3 + shadcn/ui components |
| **3D / Visuals** | Three.js + React Three Fiber + Postprocessing |
| **Animation** | Framer Motion |
| **Backend** | Supabase (PostgreSQL, Auth, Edge Functions) |
| **AI** | Lovable AI Gateway (Claude Sonnet, Gemini) |
| **State** | TanStack Query, React hooks, localStorage |
| **Routing** | React Router DOM 6 |
| **Testing** | Playwright + Vitest |
| **Charts** | Recharts |
| **Search** | MiniSearch (client-side fuzzy search) |

---

## 9. Key Features

- **Echo AI** — Streaming AI chat powered by Claude Sonnet via Lovable AI Gateway
- **The 46 Vault** — Documented UAP cases with evidence grading (DOCUMENTED / CREDIBLE / SPECULATIVE)
- **12 Gods Pantheon Clock** — Interactive dossiers on 12 ancient deities arranged as a cosmic clock
- **Star-Seed Terminal** — Birth-date-based cosmic origin classifier
- **Echoverse** — Community channels and testimony submission
- **Earth Pulse** — Live solar flare, Schumann resonance, and geomagnetic data
- **Deep Archive** — Missing scientists, black projects, whistleblower vaults
- **JWST Explorer** — James Webb Space Telescope findings and comparisons
- **Oracle 46** — Frequency-based oracular AI responses

---

## 10. Supabase Edge Functions

The project uses several Supabase Edge Functions (Deno runtime):

| Function | Purpose |
|----------|---------|
| `echo-chat` | Streaming AI chat (Claude Sonnet) |
| `oracle-46` | Oracular AI responses (Gemini Flash) |
| `auth-email-hook` | Custom transactional emails |
| `process-email-queue` | Email queue processor |
| `compute-natal-chart` | Birth chart calculations |
| `nasa-webb-feed` | JWST image feed proxy |
| `jwst-daily-findings` | Daily JWST findings aggregator |

To deploy or test edge functions locally:
```bash
# Link to your Supabase project
supabase link --project-ref jsmndieejtfemhfldiza

# Serve functions locally
supabase functions serve

# Deploy all functions
supabase functions deploy
```

---

## 11. Troubleshooting

### "Cannot find module" errors
Make sure you ran `bun install` (or `npm install`) in the project root. If moving from another machine, delete `node_modules/` and reinstall.

### Port already in use
Vite will automatically try the next port (`5174`, `5175`, etc.). Check the terminal output for the actual URL.

### Environment variables not loading
Ensure your `.env.local` file is in the **project root** (same level as `package.json`). Vite only loads `.env` files at the root. Restart the dev server after creating or editing `.env.local`.

### Supabase connection errors
Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are correct. These are publishable keys and do not grant admin access — they rely on RLS policies in the database.

### Build fails with "out of memory"
For large builds, increase Node's memory limit:
```bash
NODE_OPTIONS="--max-old-space-size=4096" bun run build
```

---

## 12. Custom Domain

The project is configured for the custom domain `pantheonobservatory46.com`. If you're forking or redeploying, update:
- `public/sitemap.xml` — base URLs
- `index.html` — canonical meta tags
- `src/components/SEO.tsx` — default metadata

---

## License

This is a private project built for the Pantheon Observatory 46 platform. All rights reserved.

---

**Questions?** Open an issue or reach out through the project's support channels.
