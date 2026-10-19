# Development record

## 13 October 2026

- Read the portfolio requirements, corrected public contact email, current CV and three certificates.
- Inspected Raif's reference layout visually and reviewed the other reference structures.
- Created an isolated portfolio project with no changes to existing project repositories.
- Added custom English / Malay content and twelve project records with source-supported scope and progress labels.
- Built the earthy responsive layout, two-image portrait swap, project categories, project-note dialogs, navigation, email copy and contact links.
- Integrated GSAP / ScrollTrigger and Lenis, including motion preferences and native touch scrolling.
- Included the original supplied certificate bytes and two portrait files, plus a new public CV PDF.
- Added a lockfile, content validation, interaction tests, deployment configurations and editing / source / design documentation.
- Passed the production build and automated checks. Reviewed the generated CV visually.
- GitHub upload pending a new `izzwan-syahfiq-portfolio` repository. Repository creation through the browser timed out; no fallback into an existing repository was attempted.
- Vercel / Cloudflare hosting remains for the owner to choose and perform later.

## Next checkpoint

### Background motion and Vibe Coding update

- Added restrained animated orbit outlines and drifting points behind the introduction.
- Preserved manual motion-pause and operating-system reduced-motion behaviour.
- Added the portfolio itself as the thirteenth project in a new Vibe Coding category, with explicit AI-assisted authorship and pending hosting / browser acceptance.
- Added a Codex handoff guide for ongoing development in a local project.

### Local browser review and public source continuation

- Read the README and validation record first; retained the downloaded original and continued in a separate portfolio checkout.
- Inspected both languages in a real Chromium browser across phone, tablet and desktop sizes. No horizontal layout overflow was found.
- Fixed the portrait's focus/hover styling overriding an explicit toggle back to the first photo; preview styling resets when leaving the portrait.
- Verified category filtering, all-project expansion, translation, mobile navigation, native dialogs, focus return, motion pause/resume and copy-email feedback.
- Verified successful HTTP responses for all six local personal assets, retaining their original bytes.
- Fixed Windows path handling in the standalone-preview exporter and regenerated the preview.
- Passed `npm test`, `npm run build` and the export command on Node 24.12.0; refreshed `VALIDATION.md` with the observed checks and remaining limits.
- Checked GitHub authentication and the empty remote before preparing the initial source commit. Created the separate public `Aaapite/izzwan-syahfiq-portfolio` repository; no other repository's contents or visibility were changed.
- Updated only the portfolio project's source link and progress text. Other project scope, statuses and certificate records were preserved.

Next: connect this repository to the chosen Vercel / Cloudflare provider, then repeat the deployment checks in `VALIDATION.md` on the actual public website.

### Dark theme

- Added a theme toggle beside EN / BM with translated labels, keyboard operation and a remembered preference.
- Added warm charcoal surfaces, sage accents and cream text across sections, card artwork, navigation, controls and project dialogs.
- Applied initial theme selection in the generated document head and preserved automatic system-following until the visitor chooses a theme.
- Kept theme state across translation and kept the compact header usable down to 320px.
- Extended existing interaction coverage, passed tests/build, reviewed dark mode in the production browser preview, and regenerated `PREVIEW.html`.
- Preserved all project descriptions/statuses, certificate records and personal assets. Hosting remains pending.

### Blue Team palette

- Changed the identity colour from olive to blue in light mode and sky blue in dark mode, with navy dark surfaces.
- Updated the green-tinted section surfaces, illustration backgrounds, ambient details, browser colour metadata and favicon. Renamed the CSS colour tokens to `--accent` / `--accent-soft`.
- Checked both themes in the browser, including the narrow Malay navigation and dialog; sampled text contrast remained above 4.5:1.
- Passed tests/build, regenerated the offline preview and updated design/handoff notes. Project and certificate content was preserved.

### Social icons and Foundation GPA

- Replaced text social/contact actions with GitHub, LinkedIn and email SVG icons, with accessible names, tooltips and 44px targets.
- Kept the public email selectable and retained its copy action and feedback.
- Removed the Foundation GPA in both languages and removed the resulting empty organisation line.
- Checked keyboard access, desktop and phone layout, both themes and email-copy feedback; passed tests/build and regenerated the preview.

## 15 October 2026 — reusable project setup

- Added root `AGENTS.md` so new Codex chats in the repository inherit the source boundaries, owner preferences and verification workflow.
- Added `PROJECT-CONTEXT.md`, paste-ready ChatGPT project instructions and a one-time project setup guide, linked from the README and handoff.
- Verified six setup/context files and fourteen relative Markdown links, then checked the Git diff. This was a documentation-only change; application/browser checks were not rerun.
- The two project entries still require the owner's one-time creation/folder selection in the app UI. The source repository remains the shared source of truth.

## 19 October 2026 — Hermes-inspired Figma proposal

- Inspected the Hermes Desktop, Richard Miculob, Afdal Kurniawan and Styfen Sagala references. Verified Afdal's typewriter/floating-icon behavior and Styfen's visible guestbook drawer/sign-in/reply flow.
- Created an editable Figma file with eight complete desktop/mobile language/theme frames, a combined overview, seven guestbook examples and design notes. Used the original portrait files and an original generated classical guardian engraving.
- Used the owner's chosen Git, Python, Docker and Kubernetes icons; specified three bilingual typewriter interests and an accessible icon-only CV action.
- Verified editable layer structure, fonts and text containment for the first six complete frames and overview. Visually reviewed English cream/navy desktop layouts plus the overview's mobile opening and guestbook. Corrected the observed layout-sizing defect.
- Figma's Starter tool limit prevented remaining visual checks, including the last BM navy variants. The handoff records the exact limit and unchecked areas.
- Added local preview exports, asset provenance and [the design handoff](design-review/README.md). Application source, CV/certificates and original photographs are unchanged. No commit, source upload, backend provisioning or deployment was performed.

At that design-only handoff, implementation and deployment awaited owner review. The continuation below supersedes that status.

## 19 October 2026 — owner revisions and website implementation

- The owner reviewed the Figma prototype and authorized the requested revisions, GitHub update and deployment. Removed the oversized background name, decorative portrait border/background and university mentions outside My Journey. Centered the original guardian artwork behind the original portrait and implemented gentle orbit motion for Git, Python, Docker and Kubernetes.
- Added locally bundled Oswald Variable, DM Sans Variable and IBM Plex Mono, the cobalt/cream/navy visual direction, three bilingual typewriter interests, accessible icon-only CV actions and the revised opening-through-About layout. Retained project scope/status, original portraits, CV/certificates, preferences and motion/accessibility controls.
- A single minimal Figma revision read was blocked by the existing Starter MCP tool limit. The earlier editable frames and saved exports remain unchanged and do not show the final requested revisions.
- Implemented the guestbook drawer with safe text rendering, Unicode-aware validation, tab-local drafts, one-level replies, session/provider handling and unavailable states. Added the dedicated Supabase schema with RLS, identity/ownership checks, moderator membership, bans, duplicate detection and per-user throttling.
- Created only the owner-selected White Tiger Free-tier Singapore project `izzwan-portfolio-guestbook` at the verified $0/month quote. Applied the named schema/policy migrations; public note reading works. Transactional SQL smoke checks passed and those test records/users were rolled back. Initial RLS/policy checks passed; the latest advisor has a disabled leaked-password-protection warning (Pro-only). No upgrade was made. Performance advisors reported informational unused indexes on the new empty table.
- Passed the final sequential `npm test` (12 tests), `npm run build` (Vite 7.3.7; 2 languages, 13 projects, 6 training entries and 11 local assets) and `npm run export:preview` on Node 24.12.0 after the OAuth callback-error fix. Corrected literal icon paths for offline embedding and matched the guestbook heading's installed font family. Added regression coverage for query/fragment callback errors and PKCE initialization failure without losing unrelated URL state.
- Reviewed the current local app at 1280px in both themes, 390px BM/navy, 320px BM/navy and 800px English. Verified no horizontal overflow, real public empty-note fetch, full-width phone drawer with Escape/focus return, saved preferences after reload, static complete roles while paused, menu/anchor behavior, four Cloud projects, phone project-dialog fit, portrait taps and changing icon transforms. Guardian/portrait centers aligned within one pixel; portrait border measured zero.
- Saved both public guestbook build variables in all three Vercel environments. Set Supabase's Site URL to the actual production origin and exact production/localhost:5173 guestbook redirects. Configured both GitHub/Google providers and verified their enabled public settings. Google project `izzwan-portfolio-sign-in` is unbilled with an In production basic-profile/email app and public support contact; GitHub application `3944279` belongs to `Aaapite`. Added bilingual public privacy/terms pages.
- Verified actual localhost OAuth returns for both providers. GitHub notes/replies persisted after reload and appeared anonymously in a separate browser; per-minute rejection passed. Google's first post had a generic transient failure; reload/retry posted successfully. The initial cause is not claimed resolved. Temporary browser-test content is separate from the rolled-back SQL fixtures.
- Assigned private moderator membership and server app metadata to the verified `Aaapite` auth identity after explicit owner approval. Browser hide verification remains pending. Disabled unused email/password sign-in in its settings UI; public-settings verification of that change remains pending.
- Verified the existing original Vercel website at https://izzwan-syahfiq-portfolio.vercel.app. Publishing and confirming the redesigned release remain pending at this snapshot; production-origin OAuth has not been verified. [Guestbook setup](GUESTBOOK.md) records the release boundary.

Next: complete moderator/UI and cleanup checks, publish the intended source changes, deploy the revised release and verify production-origin OAuth and the deployed website. The owner's deployment authorization is already present.
