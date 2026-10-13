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

## Dark theme update — 13 October 2026

- Added the earthy dark palette and a sun/moon header toggle in both languages, including remembered choices and initial system preference. No project records, certificate statuses or personal assets changed.
- Extended the existing interaction tests to cover system-following behavior, explicit preference precedence, head initialization, remembered dark selection, theme state and labels across translation, and blocked storage. All three tests and `npm run build` passed.
- Reviewed the production preview in real Chromium at 320, 390, 600, 800, 801, 1024 and 1280 CSS pixels in English and Malay. The added control did not introduce horizontal overflow; the narrow menu and project dialog remained usable.
- Checked keyboard toggling, light and dark choices across reload, translated tooltips, motion pause/resume, dark card surfaces, contact and certificate sections, and native dialog close/focus return. Browser console checks found no warnings or errors.
- Sampled eight dark-theme text/background token pairs. Contrast ratios ranged from 6.75:1 to 14.08:1; this is a targeted palette check, not a complete accessibility audit.
- Regenerated the self-contained preview with theme support. The operating system preference itself was not changed during browser review; system-change and blocked-storage behavior were exercised in the interaction test.

## Blue palette update — 13 October 2026

- Replaced olive/sage accents with blue in both themes, including buttons, headings, borders, portrait framing, status labels, selected filters, illustration surfaces and ambient motion. Dark surfaces now use navy; the favicon and browser theme metadata match.
- Reviewed both themes on desktop and the narrow Malay layout and project dialog at 320px. Theme choice persisted after reload, navigation closed after an anchor selection, and no horizontal overflow or browser console errors were found.
- Sampled eight text/background pairs in each theme: light ratios ranged from 4.65:1 to 12.37:1; dark ratios ranged from 6.75:1 to 13.94:1. These are palette checks, not a complete accessibility audit.
- `npm test` passed all three tests, `npm run build` passed, and `npm run export:preview` regenerated the standalone preview. Updated the current design and handoff guidance to retain the blue identity.
- Project content, certificate statuses, photographs and document bytes were preserved. Hosting remains pending.

## Contact icons and Foundation detail — 13 October 2026

- Converted GitHub, LinkedIn and email profile/contact actions to inline SVG icons with 44px targets, accessible names and tooltips. Confirmed all six icon links retained the intended destinations and their visible text was empty.
- Removed the Foundation GPA from the English and Malay education entries and omitted the empty organisation line. Checked the rendered Foundation entry and confirmed GPA text was absent from source content and generated HTML.
- Reviewed desktop introduction/education and the 320px Malay contact section in both themes. Keyboard navigation reached the icon links; translated email names and copy-email success feedback worked. No horizontal overflow or console errors were found.
- `npm test` passed all three tests, `npm run build` passed, and `npm run export:preview` regenerated the offline preview. Project records, certificate statuses, photographs and downloadable documents were preserved.

## Remaining deployment checks

Vercel / Cloudflare hosting is still pending. This review verifies local behavior, not a public website deployment. No live website URL, hosting success or independently earned credential is claimed.

After selecting a provider and deploying:

1. Repeat the language, portrait, phone menu, filters, dialogs and motion checks on the actual HTTPS website.
2. Verify the CV, certificate, verification, GitHub and LinkedIn links from that deployment.
3. Check the operating system's reduced-motion setting and a physical touch device. Reduced-motion behavior is covered by the simulated-DOM tests; this session did not change the operating system preference or use physical touch hardware.
4. Review caching, response headers, console/network errors and direct section links on the deployed origin.
5. Record the real URL and deployment result before adding canonical/social URL metadata.
