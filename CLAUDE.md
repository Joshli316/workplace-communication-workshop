# Communicating at Work Workshop (Workshop 11)

Bilingual (Simplified Chinese primary, English subtitle) workshop slide deck for Chinatown Service Center. Employment Outreach Specialist projection deck — 30-minute session.

## Tech Stack
Vanilla HTML/CSS/JS — no build step, no framework.

## Structure
- `index.html` — 13-slide projection deck (click + keyboard navigation)
- `resources.html` — bilingual participant reference (printable)
- `styles.css` — design system (dark sky + sunshine palette)
- `print.css` — print-only overrides
- `app.js` — slide controller, lang toggle, reveal gating
- `resources.js` — resources page lang + print
- `qrcode.min.js` — local QR generator
- `sw.js` — service worker, cache-first, skips cross-origin
- `_headers` — strict CSP, allows Google Fonts
- `robots.txt` · `sitemap.xml`

## Slides (13, linear)
1. Title · 职场英语沟通 / Communicating at Work
2. Agenda (Speaking · Email · Asking)
3. How to Talk to Your Supervisor (formal vs casual)
4. Asking for Help (4 scripts)
5. **Activity:** Which Response Is More Professional? (3-card, two-phase reveal)
6. 10 Basic Work Phrases (bilingual grid)
7. Writing a Simple Work Email (annotated template)
8. Calling in Sick (4-step + example)
9. Asking for a Day Off (4-step + example)
10. **Quiz:** True/False (2 questions, multi-phase reveal)
11. When You Have a Problem at Work (3-step escalation)
12. CSC Services
13. Resources + QR

Interactive slides: 5, 10 — gated until reveal button clicked.

## Visual Design — Dark Sky + Sunshine
- `--primary: #0c4a6e` (sky-900)
- `--primary-dark: #082f49` (sky-950)
- `--accent: #facc15` (yellow-400 sunshine)
- `--accent-text: #a16207` (yellow-700, AA on white)
- `--bg: #f0f9ff` (sky-50)
- Distinct from siblings (driving=orange, worker-rights=navy, job-search=teal/amber)

## Bilingual
- `body.zh` class default (Simplified Chinese primary)
- Language toggle stored in `localStorage` key `wcm_lang`
- Both `app.js` and `resources.js` use the same key
- Chinese: 28–32px body, 48px headings, PingFang SC / Noto Sans SC
- English: 16–22px

## Navigation
- Click anywhere or arrow keys → advance
- Interactive slides (5, 10) gate `#nextBtn` until reveal clicked
- Home button returns to slide 1

## Tests
Playwright smoke suite on port **4828** (`reuseExistingServer: false`).
Run: `NODE_PATH=~/.local/share/playwright-test/node_modules npx playwright test`

## Deployment
Cloudflare Pages → `workplace-communication-workshop.pages.dev`
- `./build.sh` → curated `dist/`
- `wrangler pages deploy dist --project-name workplace-communication-workshop --branch main`
- Verify via unique deployment hash URL before trusting bare prod
- Bump `sw.js` `CACHE` version on each redeploy

## Hub
Sibling to driving / job-offers / worker-rights / etc. **Do not** update the hub from this workshop's commands — hub deploys are explicit.
