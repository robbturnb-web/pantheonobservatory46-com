# App Store Readiness Checklist — Pantheon Frequency 46

Pantheon ships as a web app today. Mobile conversion is via [Capacitor](https://capacitorjs.com/) (a thin native shell over the existing Vite/React build) — no rewrite. See the **Capacitor** section at the end for setup steps.

---

## 🌐 Web Launch

- [ ] Responsive design verified at 320 / 375 / 414 / 768 / 1024 / 1366 / 1920 widths
- [ ] All routes load without errors (run `/debug-checklist`)
- [ ] Every external link wrapped in `SourceLink` — no dead URLs in seed data
- [ ] Every claim tagged with a `ContentTrustBadge`
- [ ] Live feeds gracefully degrade (Verified / Cached / Offline / Unavailable / Needs API Key)
- [ ] `/privacy`, `/terms`, `/disclaimer`, `/contact` complete
- [ ] Footer links to all legal pages
- [ ] SEO meta + canonical tags reviewed on every public page
- [ ] Lighthouse: Performance ≥ 80, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] No console errors / warnings on Home, Live Feeds, Missions, Profile
- [ ] `bun run lint` clean
- [ ] `bunx vitest run` green
- [ ] Smoke tests (`bun run smoke`) green
- [ ] Supabase RLS policies reviewed (use `supabase--linter`)
- [ ] Service worker behavior verified (no stale caches)

## 🤖 Android (Google Play)

- [ ] Capacitor Android platform added (`npx cap add android`)
- [ ] `applicationId` set: `app.lovable.e98741257b6643139f9851a4f1b14d88` (or your custom ID)
- [ ] App name: **Pantheon Frequency 46**
- [ ] App icon (512 × 512 PNG)
- [ ] Adaptive icon foreground + background
- [ ] Splash screen (1080 × 1920 + 2160 × 3840)
- [ ] Feature graphic (1024 × 500)
- [ ] Play Store screenshots: phone (≥ 2), 7" tablet (≥ 2), 10" tablet (≥ 2)
- [ ] Short description (≤ 80 chars)
- [ ] Full description (≤ 4000 chars)
- [ ] Privacy policy URL: `https://pantheonobservatory46.com/privacy`
- [ ] Content rating questionnaire complete
- [ ] Data safety form complete (auth email, optional avatar, XP/mission progress)
- [ ] Target SDK matches current Play requirement
- [ ] Signed AAB built (`./gradlew bundleRelease`)
- [ ] Internal testing track release uploaded and verified

## 🍎 iOS (App Store)

- [ ] Capacitor iOS platform added (`npx cap add ios`)
- [ ] Bundle ID set: `app.lovable.e98741257b6643139f9851a4f1b14d88`
- [ ] App name: **Pantheon Frequency 46**
- [ ] App icon set (1024 × 1024 source, all sizes generated)
- [ ] Launch storyboard
- [ ] App Store screenshots: 6.7" (≥ 3), 6.5" (≥ 3), 5.5" (≥ 3), iPad 12.9" (≥ 3)
- [ ] Promotional text (≤ 170 chars)
- [ ] App description (≤ 4000 chars)
- [ ] Keywords (≤ 100 chars)
- [ ] Privacy policy URL: `https://pantheonobservatory46.com/privacy`
- [ ] App privacy questionnaire complete (data collected, linked, used for tracking)
- [ ] Content rights confirmed (mythology / lore is original or properly licensed)
- [ ] App Review notes: demo account credentials, UAP / cosmology nature explanation
- [ ] Xcode archive uploaded
- [ ] TestFlight build distributed and verified

---

## Capacitor setup (when ready)

```bash
bun add @capacitor/core
bun add -d @capacitor/cli
bun add @capacitor/ios @capacitor/android
npx cap init "Pantheon Frequency 46" app.lovable.e98741257b6643139f9851a4f1b14d88
npx cap add ios
npx cap add android
bun run build
npx cap sync
npx cap run ios       # requires Xcode on macOS
npx cap run android   # requires Android Studio
```

Follow the [Lovable + Capacitor mobile guide](https://docs.lovable.dev/integrations/capacitor) for hot-reload development from the sandbox preview.
