import { writeFile } from 'node:fs/promises';
import { render, escape } from '../src/render.js';
import { profile, copy } from '../src/content.js';
import { initialThemeScript } from '../src/theme.js';

const schema = {
  '@context': 'https://schema.org', '@type': 'Person', name: profile.fullName,
  email: profile.email, sameAs: [profile.github, profile.linkedin],
  description: copy.en.description, affiliation: { '@type': 'CollegeOrUniversity', name: 'Universiti Kuala Lumpur MIIT' },
};
// The English content is generated before Vite starts, so it is also present without JavaScript.
const html = `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(copy.en.title)}</title><meta name="description" content="${escape(copy.en.description)}">
<meta name="theme-color" content="#faf8f3"><meta name="color-scheme" content="light dark">
<script>${initialThemeScript}</script>
<meta property="og:title" content="${escape(copy.en.title)}"><meta property="og:description" content="${escape(copy.en.description)}"><meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/src/style.css">
<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
</head><body><div id="app">${render('en')}</div>
<noscript><p style="padding:20px;text-align:center">English content and links are available. Enable JavaScript for Malay, theme switching, project notes, filters and scroll animations.</p><style>.more-projects,.project-filters,.language-switch,#menu-toggle,#copy-email,#motion-toggle,#theme-toggle{display:none}.project-open{pointer-events:none}.project-card .text-link{display:none}</style></noscript>
<script type="module" src="/src/main.js"></script></body></html>`;
await writeFile(new URL('../index.html', import.meta.url), html);
console.log('Generated the English document and metadata.');
