# Hermes-inspired portfolio design review

Prepared on 19 October 2026. This file records the original editable Figma proposal that the owner reviewed. The revised website is now live at [izzwan-syahfiq-portfolio.vercel.app](https://izzwan-syahfiq-portfolio.vercel.app), with application commit `5be8022` deployed and verified Ready. The Figma frames and saved exports remain the earlier proposal because the existing Starter MCP quota blocked the revision attempt.

[Open the editable Figma overview](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=8-526).

## Owner revisions and current source

The owner explicitly authorized implementation, GitHub upload and deployment after reviewing the prototype. The current source removes the oversized background name, decorative white portrait line/border and painted portrait background; centers the original guardian artwork behind the photo; moves Git, Python, Docker and Kubernetes around the portrait; keeps a smaller personal greeting; and restricts university mentions to My Journey. The photos themselves keep their original backgrounds and pixels. Motion pause and reduced motion show static icons and the complete interest labels.

One minimal `use_figma` revision read returned: "You've reached the Figma MCP tool call limit on the Starter plan. Upgrade your plan for more tool calls." The account check confirmed Starter/View. The response did not include a remaining-call count or reset date. No Figma nodes changed and no `overview-v2.png` was produced. The old frames/exports should not be used as evidence that the requested refinements are absent from the application. See [current design decisions](../DESIGN.md) and [validation](../VALIDATION.md).

## Review contents

- `01 · Portfolio review`: an editable overview and eight complete portfolio frames, covering desktop (1440px) and mobile (390px), English and BM, cream and navy.
- `02 · Guestbook & interactions`: seven drawer examples, covering provider choices, empty notes, signed-in draft, validation, loading, mobile EN/BM, and an explicitly labelled sample reply thread.
- `03 · Design kit & decisions`: typography, palette, motion labels, accessibility requirements, development boundaries and the discrete source images. Shared button, CV/social icon and project-card components are also available outside the complete frames on the first page.

Useful direct links:

| View | Link |
| --- | --- |
| English desktop, cream | [Full frame](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=2-39) |
| English desktop, navy | [Full frame](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=2-40) |
| English mobile, cream | [Full frame](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=2-41) |
| English mobile, navy | [Full frame](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=2-42) |
| BM desktop, cream | [Full frame](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=2-43) |
| BM mobile, cream | [Full frame](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=2-44) |
| BM desktop, navy; visual check pending | [Full frame](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=8-658) |
| BM mobile, navy; visual check pending | [Full frame](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=8-996) |
| Guestbook provider choices | [Drawer](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=6-526) |
| Signed-in guestbook draft | [Drawer](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=6-554) |
| Sample note and reply, design only | [Drawer](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=7-544) |

## Direction and owner choices

The reference mix is:

- [Hermes Desktop](https://hermes-agent.nousresearch.com/desktop): condensed display typography, saturated blue, fine rules, generous spacing and classical decorative artwork. The proposal uses Oswald, DM Sans and IBM Plex Mono rather than copying the reference's font files.
- [Richard Miculob](https://richardmiculob-portfolio.vercel.app): oversized identity and portrait opening, followed by selected work, capabilities/toolkit and About. The original proposal used Izzwan's rectangular photographs with intentional framing; the subsequent implementation removes the large background identity and decorative framing at the owner's request.
- [Afdal Kurniawan](https://afdalkurniawan.my.id): looping typewriter interests and floating technology icons. The original interaction was verified as typing/deleting text, rather than a scrolling text marquee.
- [Styfen Sagala](https://styfensagala.vercel.app): guestbook side drawer, GitHub/Google sign-in choices, note stream and replies. Its visible interface was inspected without signing in or submitting a note. Its backend security and persistence implementation were not audited.

The owner selected **Git, Python, Docker and Kubernetes** for the floating background icons. They are used as monochrome editable SVG vectors.

| English typewriter label | BM equivalent |
| --- | --- |
| Blue Team Enthusiast | Peminat Blue Team |
| Aspiring SOC Analyst | Bakal Penganalisis SOC |
| Cybersecurity Explorer | Peneroka Keselamatan Siber |

The CV action is an icon-only file/download control. Implementation must give it a translated accessible name and a visible hover/focus tooltip, with a target of at least 44px. Existing portrait interaction, theme/language memory, motion pause, reduced-motion support, public contact icons and content boundaries remain requirements.

## What was checked

- Read back the first six full portfolio frames and the overview: they contain editable text, vectors, component instances and auto-layout containers. Each full frame contained 240–271 descendant layers. Their three raster fills are the two discrete photographs and the decorative engraving; no complete interface screenshot is embedded in the design.
- Verified the text uses Oswald, DM Sans and IBM Plex Mono, and that no text in those frames extends beyond a clipping parent.
- Visually reviewed the complete English cream and navy desktop compositions and the combined overview, including the mobile opening and signed-out guestbook. Fixed the observed horizontal-container sizing issue that initially obscured cards and biography content.
- Reviewed the original photographs before placing them. The files in `public/images/` were not edited. CV and certificate documents were not edited.
- Figma's Starter MCP tool-call limit stopped further screenshot calls. The last BM navy frames were created, but their visual review is pending. In particular, verify the cream floating icons and portrait borders after palette conversion. The other guestbook states and the full mobile page were created but did not receive a separate complete screenshot review.
- No application tests, build, offline-preview export or new website browser QA were run for this design-only work. These remain required when application changes are implemented.

## Original guestbook design and current boundary

These Figma frames are static design examples. Their proposed flow uses GitHub/Google sign-in, a public stream, a 500-character note composer and replies; all example visitor/reply content is explicitly illustrative. During the original design stage no provider account, database or callback was created.

The application now has the guestbook drawer and a dedicated owner-approved Free-tier Supabase database, including RLS, ownership/moderation rules, bans, rate limits, duplicate checks and safe text rendering. Backend transactional smoke checks passed and test fixtures were rolled back. Real provider sign-in and shared posting remain subject to the current [guestbook release boundary](../GUESTBOOK.md); they are not proven by these static frames.

## Local artifacts

- `overview.png`: reviewed Figma overview export.
- `desktop-en-cream.png`, `desktop-en-navy.png`: reviewed complete desktop exports.
- `mobile-en-cream.png`: complete mobile export; only its opening was separately reviewed in the overview.
- `guardian-engraving.png`: original generated decorative asset, with transparency.
- `icons/`: the four selected SVGs downloaded from `https://cdn.simpleicons.org/{name}`. Each SVG is retained with its title and original brand fill; Figma instances use a monochrome treatment.
- `figma-audit.json`: layer/font/image/containment evidence for the first six frames and overview.

The decorative engraving was generated with the built-in image-generation tool. Prompt: "Decorative illustration only for a cybersecurity student's portfolio, not a UI mockup. A refined original engraving of a classical Greek guardian inspired by Athena: helmeted marble bust in three-quarter profile, serene face, shoulder and shield fragments. Renaissance copperplate engraving with fine crosshatched lines and concentric orbital curves like an abstract celestial map. Cobalt blue ink with sparse ivory highlights; transparent outside the engraving. Tall composition, no text, no letters, no brand symbols, no copied artwork. Intended as a faint decorative layer behind editable typography."

No commit, push, backend provisioning or deployment was performed during the original design-only stage. The owner has since reviewed the proposal and authorized the implementation and deployment. Current source, backend and release checks are recorded in [the project context](../PROJECT-CONTEXT.md) and [validation](../VALIDATION.md); the original Figma screenshots remain historical artifacts.
