# Design and interaction decisions

## Current references and adaptation

- [Hermes Desktop](https://hermes-agent.nousresearch.com/desktop): condensed display typography, cobalt blue, fine rules, generous spacing and classical decorative artwork. The portfolio uses locally bundled Oswald Variable, DM Sans Variable and IBM Plex Mono, plus an original generated guardian engraving.
- [Richard Miculob](https://richardmiculob-portfolio.vercel.app): the opening portrait composition and the progression through selected work, focus/toolkit and About. The owner subsequently requested removal of the oversized name behind the portrait and a simpler, unframed composition.
- [Afdal Kurniawan](https://afdalkurniawan.my.id): looping typewriter interests and floating background technology icons. The portfolio uses Izzwan's own three bilingual labels and the owner's chosen Git, Python, Docker and Kubernetes SVGs.
- [Styfen Sagala](https://styfensagala.vercel.app): a guestbook side drawer, GitHub/Google sign-in choices, public notes and replies. Only its visible flow was inspected; its backend implementation was not copied or audited. This portfolio has its own dedicated database access rules.

Earlier references were [Raif Kaya](https://raifkaya.nl/), [Fadhil](https://fdhlsfi.site/) and [Satvik](https://www.satvik.live/) for the initial navigation, project context, portrait interaction and content structure. The current design supersedes the initial oval portrait and ambient dot-grid direction.

Reference source code, personal assets, biographies and achievements were not copied. Custom semantic templates, CSS and decorative project diagrams present only Izzwan's supported facts. Decorative artwork is never represented as operational evidence.

## Palette, typography and layout

The light palette uses cream `#f7f4ea`, cobalt `#1932da`, ink `#15223b`, muted text `#5b6273` and fine borders `#cdd1ca`. The opening remains cobalt with cream text. Dark mode uses navy `#0b1428`, secondary surface `#12223b`, cream text and sky-blue `#9fb8ff`. Shared theme tokens cover cards, filters, illustrations, dialogs and contact surfaces.

Oswald Variable provides condensed display headings, DM Sans Variable provides body copy and the smaller personal greeting, and IBM Plex Mono provides navigation, labels and metadata. Font files are bundled with the site and embedded in the offline preview; no external font service is required.

The flow is introduction, selected work, focus, skills, About, My Journey, certificates, guestbook invitation and contact. Desktop uses two columns around the opening portrait and About, three project/focus columns and four skill columns. Smaller screens progressively stack content and use the compact navigation menu. The mobile opening places the portrait between the greeting and interest labels. Longer project notes remain in native dialogs.

The portrait container has no white line, decorative border, painted background or box shadow. The original rectangular photos retain their pixels and backgrounds; no subject cutout is claimed. An original transparent guardian engraving is centered behind the portrait area, with four monochrome technology icons moving around it. The large background name from the Figma proposal was removed. University identification appears only within My Journey on the website; honest academic project labels and study statuses remain.

The header's sun/moon button is a labelled native toggle with an `aria-pressed` state and English / Malay tooltips. The site follows `prefers-color-scheme` until an explicit theme is chosen, then remembers `portfolio-theme` in local storage. System changes continue to update the theme before an explicit choice. Theme selection runs in the generated document head before CSS; translation rebuilds the control while preserving the current theme. Storage denial leaves switching available for the current visit. A CSS fallback follows the system theme without JavaScript, with the inactive toggle hidden.

## Motion

The typewriter cycles through Blue Team Enthusiast, Aspiring SOC Analyst and Cybersecurity Explorer, with equivalent BM labels. Assistive technology receives the complete static list rather than every typed character. Reserved heading space limits layout movement while labels change.

Technology icons follow a gentle ellipse around the portrait on a 38-second cycle. A single GSAP ticker drives their transform updates and Lenis scrolling; frame deltas are bounded and hidden documents do not advance the orbit. Icons retain their upright orientation. The artwork remains a quiet stationary layer behind them.

GSAP animates the opening greeting and restrained section reveals. ScrollTrigger controls when sections enter; Lenis smooths mouse-wheel scrolling while touch scrolling remains native. The old ambient grid/orbit decoration is hidden in the current composition.

The remembered Pause motion control clears the typing timer, removes the ticker, reverts GSAP effects and destroys Lenis. System reduced motion applies the same disabled state. The complete interest list remains visible and technology icons stay at static positions. Content is visible by default if JavaScript fails. No mandatory loading animation, autoplay audio or background video is included.

The portrait uses an opacity crossfade between the two supplied images. Hover and keyboard focus reveal the second photo. Click / tap toggles it. Reduced motion makes the state change immediate. CSS performs framing without modifying the original image bytes.

The engraving and icons ignore pointer events and are hidden from assistive technology. Their transparent assets and transform updates preserve the minimal portrait composition.

## Accessibility and behaviour

Semantic navigation and sections, one H1, visible focus outlines, a skip link, labelled controls and `aria-pressed` language / filter / portrait states are included. Native project and guestbook dialogs provide modal background inertness, Close/Escape handling and focus return. Guestbook scrolling is contained within its drawer, with Lenis stopped while it is open. Email-copy and guestbook feedback use live status regions.

The language preference uses the standard `ms` locale and a visible BM button. Translation updates content, title, description and the document's language. Project filtering is retained when changing language. The CV and certificates remain in the language of their original documents.

Social profile, email and CV actions use SVG icons with accessible names, tooltips and usable targets. CV controls have no visible text. The email action label follows the selected language. The contact address is selectable text with a copy button. Foundation education displays its title, completion date and description; its GPA was removed at Izzwan's request.

## Guestbook and external services

The drawer supports public notes, one-level replies, a Unicode-aware 500-character composer, tab-local drafts, loading/error states and deletion of one's own notes. Visitor content uses text nodes rather than inserted HTML. The dedicated Supabase backend enforces identity, RLS ownership, bans, duplicate checks, one post per minute and 10 posts per UTC day. Only the public URL/publishable key can enter the client build. See [guestbook setup and release boundary](GUESTBOOK.md) for live provider configuration and completed checks.

The website makes no background GitHub API requests. It links to public sources explicitly; repository visibility and project outcomes should be reviewed as work progresses. It includes no analytics, tracking scripts or embedded social feeds.

## Figma revision status

The [editable Figma proposal](https://www.figma.com/design/x8JPs7EHFCyF7YUpufRnio?node-id=8-526) and local exports record the design that the owner reviewed. The owner then authorized the simpler portrait/artwork/icon revisions and deployment. Figma's existing Starter MCP quota blocked the attempted revision read, so those frames are stale relative to the current source. No replacement screenshot or successful Figma update is claimed. See [the design handoff](design-review/README.md).
