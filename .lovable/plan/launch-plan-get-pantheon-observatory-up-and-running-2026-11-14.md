# Launch Plan: Get Pantheon Observatory Up and Running

Goal: real visitors can join, sign in, explore, and come back — then we invite the first explorers.

## Step 1 — Verify real accounts (top priority)
- Create a fresh test account through the homepage Join button.
- Confirm the confirmation email arrives and its link works on the live domain.
- Sign in, open the Profile page, confirm the member profile was created automatically.
- Check sign-out, sign back in, and password reset.
- Fix anything that breaks along the way.

## Step 2 — Full site check on phone and desktop
- Homepage, navigation menu, Join/Sign in buttons.
- Live Feed, Dashboard, Health page: Kp, flares, solar wind, alerts, earthquakes, ISS show real readings.
- Spot-check main archives (Gods, UAP, Codex, Academy, Lost Places) for broken images, videos, or links.
- No sideways scrolling or covered content on phone screens.

## Step 3 — Security and quality pass
- Run a fresh security scan; fix new issues (keeping shared Echoverse chat as you chose).
- Confirm search and social preview info (title, description, share card) is correct on the live domain.

## Step 4 — Publish
- Publish the verified version to pantheonobservatory46.com.
- Re-check signup and homepage on the live domain after publishing.

## Step 5 — Invite the first explorers
- You provide: 5–10 names/emails (people into space, mythology, UAP) and how to send (email from Pantheon, or text/DM you send yourself).
- I draft a short personal invitation with a tracked link and one feedback question.
- If sending by email from Pantheon, set up a sending domain first.

## Step 6 — Measure after one week
- Review visits, signups, and archive entries opened (your north star).
- Decide next growth move (search visibility, social posts, communities).

## What I need from you
- Recipient list and sending channel (Step 5).
- Okay to create one test account on the live site (Step 1).

## Technical notes
- Use existing auth-navigation helpers and signup profile trigger; email confirmation never counts as signed in.
- Verify with Playwright against preview, then live domain; run auth-navigation and use-live-data tests.
- TanStack migration stays paused; not part of launch.
