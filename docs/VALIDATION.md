# Validation record

## Hermes redesign implementation — 19 October 2026

This section supersedes the older pending-hosting and design-only status below. The owner reviewed the Figma proposal and explicitly authorized the requested revisions, GitHub upload and deployment. The existing original website was verified at [izzwan-syahfiq-portfolio.vercel.app](https://izzwan-syahfiq-portfolio.vercel.app); release of the redesigned code is not yet confirmed at this snapshot.

### Automated and source checks

- Reran `npm test`, `npm run build` and `npm run export:preview` sequentially after the OAuth callback-error fix on Node 24.12.0. All twelve tests passed. Vite 7.3.7 completed the production build; the content check validated two languages, thirteen projects, six training entries and eleven local assets. The offline preview was regenerated successfully.
- Existing interaction tests cover theme/language preferences, filters, dialogs, menu Escape, portrait toggling, copy feedback and GSAP/Lenis cleanup. Updated checks verify four decorative technology icons, the engraving, icon-only labelled CV links and no university mentions outside My Journey in either rendered language.
- Nine guestbook tests cover public configuration validation, Unicode-aware note limits, safe text rendering, unavailable/provider states, mocked posting/replies, tab-local drafts through translation, OAuth redirect construction, transport errors, cleanup and late initialization. Three regression checks verify query/fragment OAuth errors, retained callback error feedback after note loading, preserved unrelated URL parameters/section hashes, and PKCE initialization errors even when session lookup succeeds. These are client/mocked-transport checks, not successful provider sign-in.
- Source review found and corrected dynamic icon paths that would escape offline embedding, and a guestbook heading font-family mismatch. The exporter embeds local fonts, artwork, technology icons, original portraits and downloadable documents; it deliberately excludes live guestbook configuration.
- The oversized background name and decorative portrait border/background are absent. Original portraits and CV/certificate documents were retained; the photo backgrounds remain part of the original photos. Git, Python, Docker and Kubernetes use a bounded 38-second transform orbit, and pause/reduced motion clear the typing/ticker effects while showing complete interest labels.

### Dedicated guestbook backend

- Provisioned only the owner-selected White Tiger Free-tier Singapore project `izzwan-portfolio-guestbook` (`afmnsdfapykwnyuuktnl`) after the verified $0/month quote. Applied the `portfolio_guestbook` and `guestbook_policy_cleanup` migrations. Public note reading works; no unrelated project was changed.
- The transactional SQL smoke script passed anonymous read/write checks, forged-identity rejection, ownership restrictions, 501-character rejection, throttling, one-level replies, duplicate rejection, bans, moderator hiding and hidden-note visibility. All fixture users/notes were rolled back; a follow-up query confirmed zero notes, auth users and throttle records.
- Initial database RLS/policy checks passed. The latest security advisor includes a disabled leaked-password-protection warning; that control requires Pro and no upgrade was made. The unused email/password provider was disabled in its settings UI for the requested social-only login; its public-settings recheck remains pending. Performance advisors reported informational unused indexes on the new empty table. The browser uses only a public publishable key; service-role credentials were not requested or embedded.
- Supabase's Site URL is the verified production origin, with exact `https://izzwan-syahfiq-portfolio.vercel.app/?guestbook=1` and `http://localhost:5173/?guestbook=1` redirect entries. Both public build variables were saved in all three Vercel environments. No provider secret was added to a public build variable.
- Both GitHub and Google are configured/enabled, verified through public authentication settings. GitHub application `3944279` belongs to `Aaapite`. Google project `izzwan-portfolio-sign-in` is unbilled, uses the public support contact and has an In production OAuth app with basic profile/email scopes only. Provider secrets remain outside the source/public build variables. Public bilingual privacy and terms pages were added.
- Actual GitHub and Google OAuth returns to localhost displayed signed-in UI. A GitHub note/reply persisted across reload and appeared to an anonymous session in a separate browser; a too-soon post produced the per-minute error. Google's first posting attempt had a generic transient failure; reload/retry succeeded and its note was visible. The transient cause is not claimed resolved.
- With explicit owner approval, the verified `Aaapite` auth UUID was assigned private moderator membership and server-managed app metadata, both read back. The refreshed browser UI hide action remains pending.
- Production-origin OAuth/posting, concurrency/daily-limit exercises and final real-session moderation/cleanup remain pending. Local OAuth success is not production-origin verification. See [guestbook setup](GUESTBOOK.md) for the detailed release boundary.

### Current local browser review

- Reviewed the local website at 1280px in light and dark themes, 390px in BM/navy, 320px in BM/navy and 800px in English. Checked layouts at the reported widths without horizontal overflow.
- At 390px the guestbook filled the phone width and initially fetched the actual empty database note stream. Escape closed the drawer and returned focus to its opener. Subsequent provider-session tests are recorded above.
- At 320px, language, theme and paused-motion preferences survived reload; all three interest labels remained statically visible while paused. The mobile menu opened, closed on Escape and closed after an anchor selection. The Cloud filter showed four projects.
- The Kubernetes project dialog fit the 320px phone width and 680px viewport height, supported internal content review and closed with Escape. The top anchor returned to scroll position zero.
- Technology-icon transforms changed across real-time samples. The portrait border measured zero and the guardian/portrait centers were aligned within one pixel. Portrait tapping toggled both photo states.
- These are browser checks of the current local app, including the later real provider posting tests above. A physical touch device, operating-system preference changes, every offline-file interaction and production-origin OAuth were not verified by these checks.

### Figma and production boundaries

- A minimal revision read again returned the existing Starter MCP tool-call limit. No revised Figma nodes or `overview-v2.png` export were created. The linked frames and original exports are the earlier reviewed proposal and are stale relative to the latest owner revisions.
- The original design-only visual checks and earlier application browser checks below remain historical evidence. Neither they nor the local review above verifies deployment of the redesigned production release. Record its HTTPS checks and actual provider-session results after they pass.

## Figma design proposal — 19 October 2026

This was a design/documentation stage, not an application release. See [the design review handoff](design-review/README.md) for the editable file, frame links and saved exports.

- Created eight full portfolio frames, seven guestbook examples, an editable overview and design notes. The first six full frames and overview passed a structural read-back for editable node types, intended fonts and text containment. Discrete portrait/artwork image fills were distinguished from the editable interface.
- Visually inspected the English cream/navy desktop compositions and the combined overview, including mobile opening and signed-out guestbook. Fixed the observed horizontal auto-layout sizing issue before the reviewed exports were saved.
- The Figma Starter MCP call limit blocked additional screenshot calls. The final BM navy variants and the remaining guestbook/mobile views still require their recorded visual checks; full visual acceptance is not claimed.
- Verified documentation links, JSON/SVG validity, change scope and Git diff. No new application/browser test, build or offline-preview export is claimed. Original portraits, CV and certificate files were not edited. No code was deployed or pushed.

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

## Remaining release checks

The existing original Vercel website is verified at [izzwan-syahfiq-portfolio.vercel.app](https://izzwan-syahfiq-portfolio.vercel.app). Publishing and verifying the new Hermes-inspired release remain pending at this snapshot. Earlier statements that no hosting URL was known describe the historical handoffs, not the current verified origin.

Before closing the current release:

1. Deploy the verified redesigned build to the existing intended Vercel project, then repeat language, portrait, phone menu, filters, dialogs, typewriter/orbit and motion checks on the actual HTTPS website.
2. Verify the CV, certificate, verification, GitHub and LinkedIn links from that deployment.
3. Check the operating system's reduced-motion setting and a physical touch device. Reduced-motion behavior is covered by the simulated-DOM tests; this session did not change the operating system preference or use physical touch hardware.
4. Review caching, response headers, console/network errors and direct section links on the deployed origin.
5. Complete and verify the configured guestbook providers, OAuth callbacks, persistence and ownership/moderation with real sessions. Keep unavailable sign-in choices disabled until they are ready.
6. Record the source commit and verified deployment result; add canonical/social URL metadata only for the confirmed website origin.
