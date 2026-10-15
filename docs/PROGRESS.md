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
