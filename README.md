# Izzwan Syahfiq Portfolio

A bilingual English and Bahasa Melayu portfolio for Izzwan Syahfiq, a Computer System Security student at UniKL MIIT working towards Blue Team and SOC roles. It presents security labs, academic contributions, ongoing personal projects, education, experience and certificates with accurate progress labels.

The website is a static Vite application. GSAP and ScrollTrigger provide restrained entrance and scroll-scrub effects; Lenis supplies smooth mouse-wheel scrolling. The portrait crossfades to a second photo on hover or keyboard focus and can be toggled by tapping on mobile.

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

The build produces `dist/`. It requires no environment variables, API keys, paid services or server backend. Public files in `public/` are copied into the deployment.

The handoff ZIP also includes `PREVIEW.html`. Extract the ZIP and open that file in your browser for a self-contained offline preview. It embeds the same content, scripts, styling and personal assets. Certificate and CV links download embedded copies in the preview; the deployed site opens their normal URLs. Clipboard features can be restricted in a local file. Real-browser QA of the Vite website is recorded in `docs/VALIDATION.md`; the standalone file has only had an HTTP-served smoke check. Regenerate it after building with `npm run export:preview`; deploy `dist/`, not the preview file.

## What is included

- English / Bahasa Melayu switch with a locally remembered preference.
- Earthy cream, olive, brown and charcoal palette and responsive section navigation.
- Light / dark theme switch beside the language controls. It follows the system preference until a visitor chooses a theme, then remembers that choice locally.
- Two-photo portrait, keyboard access and mobile tap support.
- Thirteen project entries, including this website under Vibe Coding, with category filters and project notes in native dialogs.
- Explicit documented-lab, academic, proposal and in-development labels.
- Public GitHub source links only where the repository is currently public.
- Certificates, a public CV PDF, education and real experience / activities.
- Email, LinkedIn and GitHub contact links and copy-email feedback.
- GSAP reveals, gentle scroll scrub, a subtle animated earthy background and Lenis scrolling with a motion-pause control and reduced-motion support.
- Generated English HTML for search engines and visitors without JavaScript.

## Repository structure

```text
src/content.js           English / Malay content, project data and links
src/render.js            Semantic page and project-note templates
src/main.js              Language, filters, dialogs, portrait and animations
src/theme.js             Theme selection before first paint
src/style.css            Palette, layout, responsive states and hover effects
public/images/           Two original supplied portraits
public/documents/        Public CV PDF and three supplied certificates
scripts/generate.mjs     Generates the initial English HTML
scripts/check.mjs        Content, IDs, anchors and local-asset validation
tests/portfolio.test.mjs Render and interaction tests in a simulated DOM
docs/                   Editing, deployment, design, content and validation records
index.html              Generated entry document; edit content.js rather than this
vercel.json              Vercel build configuration
wrangler.jsonc           Optional Cloudflare Workers static-assets configuration
```

## Edit and deploy

- [Editing content and adding projects](docs/EDITING.md)
- [Vercel and Cloudflare deployment](docs/DEPLOYMENT.md)
- [Design and animation decisions](docs/DESIGN.md)
- [Content sources and project limitations](docs/CONTENT-SOURCES.md)
- [Validation and remaining checks](docs/VALIDATION.md)
- [Initial development record](docs/PROGRESS.md)

The portfolio is a separate project. Its GitHub links do not alter any linked repository. AgentSOC and EVA do not receive guessed repository links; NADI remains private.

Public source: [Aaapite/izzwan-syahfiq-portfolio](https://github.com/Aaapite/izzwan-syahfiq-portfolio). Vercel / Cloudflare hosting remains pending; no deployed website URL is claimed.

## Contact and ownership

Public contact: **izzsyahfiq@gmail.com**. GitHub: [Aaapite](https://github.com/Aaapite). LinkedIn: [Izzwan Syahfiq](https://www.linkedin.com/in/izzwansyahfiq).

Photos, CV and certificates belong to their respective owners and issuers. No open-source licence is granted for the personal assets. The project does not copy the reference websites' source code, portraits, biographies or claimed achievements. Reference links and the adaptation are documented in `docs/DESIGN.md`.
