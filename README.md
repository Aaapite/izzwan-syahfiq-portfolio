# Izzwan Syahfiq Portfolio

A bilingual English and Bahasa Melayu portfolio for Izzwan Syahfiq, working towards Blue Team and SOC opportunities. It presents security labs, academic contributions, ongoing personal projects, education, experience and certificates with accurate progress labels. University identification is kept within My Journey on the website.

The website is a static Vite application with a Hermes-inspired visual direction: cobalt blue, cream/navy surfaces, condensed headings and an original classical guardian illustration behind the portrait. Git, Python, Docker and Kubernetes icons move around the portrait. GSAP and ScrollTrigger provide restrained entrance effects; Lenis supplies smooth mouse-wheel scrolling. The two original portraits crossfade on hover/focus and toggle by tap or click.

## Run locally

Use Node.js 22.12 or newer and npm. Node 24 was used for this implementation.

```sh
npm ci
npm run dev
```

Open the address printed by Vite. To check and build:

```sh
npm run check
npm test
npm run build
npm run preview
```

The build produces `dist/`. The portfolio builds without environment variables; the shared guestbook uses the dedicated Supabase backend and the public build variables documented in [guestbook setup](docs/GUESTBOOK.md). Without that configuration the drawer offers an honest unavailable state and email alternative. Public files in `public/` are copied into the deployment. Provider secrets and service-role credentials never belong in the browser bundle.

Generate `PREVIEW.html` after building with `npm run export:preview`. It embeds the content, scripts, styling, fonts, personal assets and policy pages for an offline preview. Certificate, CV and policy links download embedded copies in this preview; the deployed site opens their normal URLs. The offline guestbook uses the unavailable state and email alternative; shared notes and sign-in need the configured HTTPS website. Clipboard features can be restricted in a local file. Check [the validation record](docs/VALIDATION.md) for the browser checks actually completed. Deploy `dist/`, not the preview file.

## What is included

- English / Bahasa Melayu switch with a locally remembered preference.
- Blue accents, a cream light theme and a navy dark theme with responsive section navigation.
- Light / dark theme switch beside the language controls. It follows the system preference until a visitor chooses a theme, then remembers that choice locally.
- Two-photo portrait with an unframed transparent container, centered original decorative engraving, keyboard access and mobile tap support. The photographs themselves retain their original backgrounds.
- Three bilingual typewriter interests and four gently orbiting technology icons.
- Thirteen project entries, including this website under Vibe Coding, with category filters and project notes in native dialogs.
- Explicit documented-lab, academic, proposal and in-development labels.
- Public GitHub source links only where the repository is currently public.
- Certificates, a public CV PDF, education and real experience / activities.
- Email, LinkedIn, GitHub and CV icons with accessible labels, tooltips and copy-email feedback.
- GSAP reveals, Lenis scrolling, a remembered motion-pause control and reduced-motion support; paused/reduced motion displays the complete interest labels.
- Guestbook drawer with persistent database storage, safe text rendering, one-level replies, draft retention, ownership rules and database rate limits. Both providers passed local OAuth/posting and production sign-in checks; see [guestbook verification](docs/GUESTBOOK.md) for the exact posting/moderation coverage.
- Bilingual public privacy and terms pages for the guestbook.
- Generated English HTML for search engines and visitors without JavaScript.

## Repository structure

```text
src/content.js           English / Malay content, project data and links
src/render.js            Semantic page and project-note templates
src/main.js              Language, filters, dialogs, portrait and animations
src/theme.js             Theme selection before first paint
src/style.css            Palette, layout, responsive states and hover effects
src/guestbook.js          Guestbook session, notes, replies and drawer behavior
src/guestbook.css         Guestbook responsive drawer and states
backend/guestbook.sql     Dedicated database schema and access rules
backend/guestbook-smoke.sql Transactional backend smoke checks
public/images/           Original portraits and generated guardian illustration
public/icons/            Git, Python, Docker and Kubernetes SVG assets
public/documents/        Public CV PDF and three supplied certificates
scripts/generate.mjs     Generates the initial English HTML
scripts/check.mjs        Content, IDs, anchors and local-asset validation
tests/portfolio.test.mjs Render and interaction tests in a simulated DOM
tests/guestbook.test.mjs Guestbook validation, safe rendering and mocked transport
docs/                   Editing, deployment, design, content and validation records
index.html              Generated entry document; edit content.js rather than this
vercel.json              Vercel build configuration
wrangler.jsonc           Optional Cloudflare Workers static-assets configuration
```

## Edit and deploy

- [Set up Codex and ChatGPT Projects for future changes](docs/PROJECT-SETUP.md)
- [Current project context](docs/PROJECT-CONTEXT.md)
- [Editing content and adding projects](docs/EDITING.md)
- [Vercel and Cloudflare deployment](docs/DEPLOYMENT.md)
- [Design and animation decisions](docs/DESIGN.md)
- [Guestbook setup and release boundary](docs/GUESTBOOK.md)
- [Figma proposal and revision status](docs/design-review/README.md)
- [Content sources and project limitations](docs/CONTENT-SOURCES.md)
- [Validation and remaining checks](docs/VALIDATION.md)
- [Initial development record](docs/PROGRESS.md)

The portfolio is a separate project. Its GitHub links do not alter any linked repository. AgentSOC and EVA do not receive guessed repository links; NADI remains private.

Public source: [Aaapite/izzwan-syahfiq-portfolio](https://github.com/Aaapite/izzwan-syahfiq-portfolio). The redesigned website is live at [izzwan-syahfiq-portfolio.vercel.app](https://izzwan-syahfiq-portfolio.vercel.app). Application commit [`5be8022`](https://github.com/Aaapite/izzwan-syahfiq-portfolio/commit/5be8022b48c264849e3f83bd9c342dd6d99b72d8) was pushed to `main` and its Vercel production deployment was verified Ready. See [the validation record](docs/VALIDATION.md) for HTTPS/browser and guestbook results.

## Contact and ownership

Public contact: **izzsyahfiq@gmail.com**. GitHub: [Aaapite](https://github.com/Aaapite). LinkedIn: [Izzwan Syahfiq](https://www.linkedin.com/in/izzwansyahfiq).

Photos, CV and certificates belong to their respective owners and issuers. No open-source licence is granted for the personal assets. The project does not copy the reference websites' source code, portraits, biographies or claimed achievements. Reference links and the adaptation are documented in `docs/DESIGN.md`.
