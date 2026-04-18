
The user is locking in the full Pantheon design system: black/navy bases, neon green H1s with glow, purple H2s, cyan highlights, gradient buttons. This finalizes the palette work from the last two turns.

## Plan: Lock in the full Pantheon design system

### 1. Base + surface tokens (`src/index.css`)

- `--background: #000000` (pure black base)
- `--card: rgba(26, 31, 58, 0.6)` (cosmic gray w/ transparency)
- `--popover: #0a0e1a` (space navy)
- `--secondary: rgba(26, 31, 58, 0.8)`
- `--muted: rgba(26, 31, 58, 0.5)`
- `--muted-foreground: #9ca3af` (metadata gray)
- `--foreground: #ffffff` (use sparingly per spec)
- `--border: rgba(157, 77, 237, 0.3)` (purple border)
- Body background → `linear-gradient(to bottom, #0a0e1a, #000000)`

### 2. Accent tokens (carry over greens + purples + blues + reds from prior plans)

- `--primary: #9d4edd`, `--accent-purple-deep: #7209b7`, `--accent-purple-glow: #c77dff`
- `--accent-neon: #00ff88`, `--accent-emerald: #00cc66`, `--accent-green-glow: #4ade80`
- `--accent-blue: #00d9ff`, `--accent-blue-deep: #4a7ba7`, `--accent-blue-bg: #1a1f3a`
- `--destructive: #ff3366`, `--accent-red-deep: #cc0033`

### 3. Typography rules (`@layer base` in `index.css`)

- `h1` → `color: #00ff88; text-shadow: 0 0 20px rgba(0,255,136,0.5);`
- `h2` → `color: #9d4edd;`
- `h3` → keep current foreground (white) for hierarchy
- `a` → `color: #00cc66; hover: #00ff88;`
- `.text-highlight` utility → cyan `#00d9ff` for important inline callouts
- Keep Space Grotesk font

### 4. New utility classes

- `.gradient-cta` → `background: linear-gradient(to right, #9d4edd, #00cc66); hover: filter: brightness(1.2);` (for buttons / CTAs)
- `.gradient-highlight` → `background: linear-gradient(135deg, rgba(157,77,237,0.1), rgba(0,255,136,0.1));` (for emphasized sections)
- `.glass-cosmic` → already exists; bump border to purple `rgba(157,77,237,0.3)`, shadow to new neon green/purple mix

### 5. Tailwind mapping (`tailwind.config.ts`)

Extend `accent` with: `purpleDeep`, `purpleGlow`, `greenGlow`, `blueDeep`, `blueBg`, `redDeep`. So utilities like `text-accent-purpleGlow`, `bg-accent-blueBg` work.

### 6. Component sweep (hard-coded → tokens)

Targeted only where hexes/tailwind colors are inline:
- `Hero.tsx`, `HomePage.tsx` (REVEALED banner, section cards)
- `WhistleblowerVaultPage.tsx` (alive status, CTAs)
- `SuspiciousDeathsSection.tsx` (filters, modal accents)
- `The46Page.tsx` / `VaultSlotCard.tsx` (unlocked greens, sealed reds)
- `ShadowPantheonPage.tsx` (red palette alignment)
- `XPBar.tsx`, `EchoBubble.tsx`, `Navbar.tsx`, `Footer.tsx`
- `EvidenceBadge.tsx` already token-driven via grade classes — just verify

### What stays the same

- Space Grotesk font, layout, animations, content
- Shadow Pantheon's red-heavy theme (it just inherits the new red tokens)
- Starfield, glass effects, vignette, film grain

### Out of scope

- No new pages, no new content, no new components
- No changes to Echo logic, /the-46 logic, or auth

### Result

One unified Pantheon design system:
- Black base, navy cards, gray sections
- Neon green H1s that glow, purple H2s, cyan highlights
- Gradient purple→green CTAs
- Token-driven so future palette tweaks are one-file changes
