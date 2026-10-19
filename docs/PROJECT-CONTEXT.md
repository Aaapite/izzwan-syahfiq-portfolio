# Portfolio project context

Context snapshot: 19 October 2026. Repository files and current Git state take precedence over uploaded copies of this document. Update this brief after meaningful product/content changes.

## Current redesign and release status

The owner reviewed the editable [Hermes-inspired Figma proposal](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=8-526), requested a simpler portrait composition, and explicitly authorized implementation, GitHub upload and deployment. The website source now implements the direction with a smaller greeting, no oversized name behind the portrait, no decorative portrait border/background, the original guardian artwork centered behind it, and smoothly orbiting Git, Python, Docker and Kubernetes icons. University mentions appear only in My Journey on the website. CV actions use accessible icons.

The redesign is deployed at [izzwan-syahfiq-portfolio.vercel.app](https://izzwan-syahfiq-portfolio.vercel.app). Application commit `5be8022b48c264849e3f83bd9c342dd6d99b72d8` is on `main`; Vercel deployment `dpl_61cK7pCgXMuQqNPBs9nvTpHbjv9G` was verified Ready against that commit/project through CLI and API. Production HTTP/browser checks passed as recorded in [validation](VALIDATION.md).

The Figma frames and saved exports remain the earlier proposal: another minimal tool read was blocked by the existing Starter MCP quota, so they do not show the latest revisions. See [the design handoff](design-review/README.md). Current source and the deployed website take precedence for revised behavior.

The guestbook UI and dedicated Supabase backend are live. The owner selected White Tiger on the Free plan at a verified $0/month quote. The dedicated Singapore project is `izzwan-portfolio-guestbook` (`afmnsdfapykwnyuuktnl`). Transactional access-rule fixtures were rolled back. Both providers passed local and production OAuth/posting. A GitHub production note was verified in the database and appeared to an anonymous separate browser; Google's production note showed success and its database row/author were verified. Production sign-out worked. See [guestbook verification](GUESTBOOK.md).

Supabase's Site URL matches the actual Vercel production origin, with exact production and localhost:5173 `/?guestbook=1` redirects. Both public guestbook build variables were saved in all three Vercel environments. The local app passed twelve tests, build/export and desktop/phone browser checks. Google project `izzwan-portfolio-sign-in` is unbilled, its OAuth app is In production with basic profile/email scopes only, and public privacy/terms pages were added. GitHub app `3944279` belongs to `Aaapite`.

The owner explicitly approved `Aaapite` as guestbook moderator; private membership, server app metadata and visible owner controls were verified. SQL moderation passed. The full browser hide flow was not accepted as passed: automation could not control the native confirmation and no verified success followed the owner's manual acceptance. Public auth settings confirm GitHub/Google enabled, email/password disabled and anonymous sign-in disabled. The latest advisor warns that leaked-password protection is disabled (Pro-only); no paid upgrade was made. Database RLS checks passed, but no blanket security certification is claimed. All five temporary QA notes were hidden; the final database check showed zero visible notes and five hidden test notes.

## Identity and source

- Owner: Izzwan Syahfiq, working towards Blue Team / SOC opportunities. Preserve accurate qualifications in My Journey without repeating university identity in other website sections.
- Public repository: https://github.com/Aaapite/izzwan-syahfiq-portfolio
- Primary branch: `main`.
- Live website: https://izzwan-syahfiq-portfolio.vercel.app. The redesigned source and exact production deployment are verified; retain the current production origin for provider callbacks.
- This portfolio is independent of NADI, Inkora and the security lab repositories. Linked projects are content references, not permission to modify them.

## Current website and owner preferences

- Static Vite application with English and Bahasa Melayu (`ms`, shown as BM).
- Hermes-inspired cobalt identity, cream light theme and navy/sky-blue dark theme. Oswald Variable, DM Sans Variable and IBM Plex Mono are bundled locally. Theme follows the system initially and remembers an explicit selection.
- LinkedIn, GitHub and email use SVG social/contact icons with accessible names and tooltips. The public email is selectable and has a copy action.
- The Foundation in Computer Technology education entry retains its completion date and description; its GPA is intentionally omitted from both website languages.
- Two supplied portraits crossfade on hover/focus and toggle by click/tap. Original image bytes are retained.
- GSAP / ScrollTrigger, Lenis, typewriter interests, smooth 38-second technology orbits, motion pause and reduced-motion support are included. Pause/reduced motion shows complete static interest labels.
- Thirteen project entries, category filtering, selected/all-project views and native project-note dialogs. The website itself is in Vibe Coding.
- Contact, My Journey, experience, icon-only public CV and supplied certificate links are present. The original photo and document bytes are preserved.
- The guestbook uses a native modal drawer, GitHub/Google provider choices, a 500-character composer, one-level replies and tab-local drafts. Database RLS, identity checks, bans, ownership and rate limits protect writes. Public settings keep unavailable sign-in providers disabled.

## Facts to preserve

Project descriptions distinguish documented labs, academic/group contributions, proposals and work in development. AgentSOC is a proposed two-person read-only Wazuh investigation FYP. EVA is a separate four-person concept/early project. NADI is a personal assistant in development with private source. Keep their limitations and ownership/contribution wording.

TryHackMe Pre Security and ASEAN AI Career Readiness are completed training. Builders Sandbox #1 is attendance/participation. Blue Team Fundamentals, the Blue Team learning path and Security+ retain their existing study/training/preparation labels. Current details live in `src/content.js` and `docs/CONTENT-SOURCES.md`.

## How to continue

Codex instructions live in root `AGENTS.md`. Read that file, `README.md` and `docs/VALIDATION.md` in a new coding chat. For GitHub changes, check the remote/authentication, implement, verify, document, then commit and push as requested. Hosting uses a separate provider connection and deployment step.

Uploaded ChatGPT Project files are context snapshots. Use the current repository through an available GitHub connection or a Codex checkout when the task requires current source or code changes.
