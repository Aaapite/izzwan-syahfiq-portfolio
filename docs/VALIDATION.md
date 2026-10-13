# Validation record

## Local continuation — 13 October 2026

Read `README.md` and this record before editing. Continued only the separate portfolio project. The downloaded original was retained; the editable copy has its own Git root. No linked project repository was modified.

### Automated checks

- `npm ci` installed the existing lockfile without changing dependency versions.
- `npm test` passed all three tests on Windows with Node 24.12.0 and npm 11.6.2. The tests exercise both languages and the bundled interaction module, including filters, translation, portrait state, dialogs, menu Escape, preferences, clipboard success/failure and GSAP / Lenis cleanup.
- `npm run build` passed with Vite 7.3.7. Its content check validated two languages, thirteen projects, six training entries, six local assets and internal anchors.
- `npm run export:preview` regenerated `PREVIEW.html`. Fixed the exporter's Windows entry path by using `fileURLToPath` rather than a URL pathname.
- Compared the original and final content: all twelve other projects, all certificate statuses/dates, profile information, translations and public asset bytes were preserved. Only the portfolio project's source availability and validation progress were updated.

Happy DOM prints a warning about evaluating JavaScript in its test VM; these tests evaluate this repository's own bundled code. They are separate from the real-browser checks below.

### Real-browser review

Used the Codex in-app Chromium browser against local Vite development and production preview servers.

- Reviewed English and Bahasa Melayu layouts at phone, tablet and desktop widths: 320, 390, 600, 800, 1024 and 1280 CSS pixels. The document did not exceed the viewport width; checked headings, navigation, cards, certificates and contact wrapping.
- Reviewed portrait framing, focus preview and repeated keyboard/click activation. Found that focus/hover styling overrode an explicit return to the first photo. Explicit activation now controls the photo until the pointer leaves or focus moves away; temporary hover/focus preview remains available on the next visit.
- Checked mobile menu open/close, Escape, section anchors and menu closure after selecting a destination. Anchors cleared the sticky header.
- Exercised all five filters: Blue Team (6), Cloud security (4), AI & systems (2), Vibe Coding (1), and All work (6 selected / 13 expanded). Translation retained the chosen filter.
- Opened private/planned and public-source project dialogs. Checked content, narrow-screen internal scrolling, close button, Escape, native background inertness and focus return to the opening card. Public-source dialogs exposed their intended GitHub link.
- Checked motion pause/resume, remembered language/motion preferences, visible content after pausing, Lenis anchor movement and the scroll progress indicator. Browser console checks found no warnings or errors during the review.
- Copy email succeeded in the browser; permission failure feedback remains covered by the interaction test. Email links retained the intended `mailto:` destination.
- The page, both photos, CV PDF and all three certificate files returned HTTP 200 with the expected content types. Inspected external link destinations; external platform availability is not a deployment guarantee.
- Smoke-checked the regenerated self-contained preview served over local HTTP. Opening it directly with `file://` and every embedded download were not separately tested.

### GitHub state

Authenticated connector, browser session and Git Credential Manager identified `Aaapite`. Checked repository existence and remote state before committing/pushing. Created the separate public repository [Aaapite/izzwan-syahfiq-portfolio](https://github.com/Aaapite/izzwan-syahfiq-portfolio) with an empty `main` branch target. The source is maintained there; generated `dist/`, dependencies, local environment files and `PREVIEW.html` are ignored. Personal assets retain the README's ownership terms.

## Remaining deployment checks

Vercel / Cloudflare hosting is still pending. This review verifies local behavior, not a public website deployment. No live website URL, hosting success or independently earned credential is claimed.

After selecting a provider and deploying:

1. Repeat the language, portrait, phone menu, filters, dialogs and motion checks on the actual HTTPS website.
2. Verify the CV, certificate, verification, GitHub and LinkedIn links from that deployment.
3. Check the operating system's reduced-motion setting and a physical touch device. Reduced-motion behavior is covered by the simulated-DOM tests; this session did not change the operating system preference or use physical touch hardware.
4. Review caching, response headers, console/network errors and direct section links on the deployed origin.
5. Record the real URL and deployment result before adding canonical/social URL metadata.
