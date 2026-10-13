# Editing the portfolio

Most updates happen in `src/content.js`. It separates text and project data from styling and behaviour. Update both English (`en`) and Malay (`ms`) when adding or changing content, then run `npm run build`.

## Personal details and navigation

Edit `profile` for the name, email, GitHub, LinkedIn, location, CV path and portrait paths. Edit `copy.en` and `copy.ms` for introduction, biography, labels, education, experience, skills and contact copy. The Malay locale code is `ms`; its visible button reads BM.

The public email is `izzsyahfiq@gmail.com`. Browser storage remembers only the language and motion preference. Visitors can use the site even if browser storage is unavailable.

## Add a project

Add an object to `projects`, following an existing entry:

```js
{
  id: 'my-new-lab',
  title: 'My New Lab',
  category: 'blue',
  status: 'development',
  featured: false,
  tags: ['Python', 'Log analysis'],
  visibility: 'planned',
  repo: null,
  summary: { en: 'Short English summary.', ms: 'Ringkasan Bahasa Melayu.' },
  context: { en: 'Why I worked on it.', ms: 'Sebab saya mengusahakannya.' },
  contribution: { en: 'My actual contribution.', ms: 'Sumbangan sebenar saya.' },
  outcome: { en: 'Current progress and limits.', ms: 'Kemajuan semasa dan batasannya.' },
}
```

Use a unique ID. Categories are `blue`, `cloud`, `systems` or `vibe` (Vibe Coding). Statuses are `documented`, `academic`, `proposal` or `development`. Set `featured: true` to show it in the initial selected-work view; otherwise it appears after Show all projects. Category filters show every matching project, including unfeatured ones.

For a publicly accessible repository, set `visibility: 'public'` and `repo` to its full HTTPS URL. For private repositories use `visibility: 'private'` and `repo: null`; for unpublished projects use `visibility: 'planned'` and `repo: null`. Updating the website never creates or changes a project repository.

## Update a project’s status

Change its `status` and `outcome` together. Describe what you actually ran, what evidence exists and what remains unfinished. Preserve group attribution. A proposal, course plan or draft report alone does not establish completed implementation or a passed test.

Example: after the AgentSOC prototype and evaluation exist, update its contribution and results with measured evidence. Before then, retain the proposal label. NADI's scoped completed phases do not mean the full assistant is finished.

## Certificates and CV

Add certificates to `certificates`. Allowed statuses are `completed`, `participation`, `inProgress`, `training` and `preparing`. Use an ISO date such as `2026-09-28` when known. Unknown dates stay `null`. A `file` points to `/documents/name.pdf` or an image in `public/documents/`. An optional `verification` is the issuer's actual credential URL.

Replace `public/documents/izzwan-syahfiq-cv.pdf` with a new public CV to keep the existing button working. The initial PDF is based on the supplied Word CV with certificate details updated from the supplied evidence. It includes the chosen public email and general location; it omits the phone number and detailed address from the original CV. The original Word CV is not part of this repository.

## Photos and colours

The primary image is `public/images/portrait-outdoor.jpg`, with `portrait-casual.jpg` as the second image. Replace those files or update `profile.portraits`. CSS uses `object-fit` to frame them; the source images were not altered. Adjust `.portrait-main` / `.portrait-second` `object-position` in `src/style.css` if a new photo needs a different crop.

The palette is defined in `:root` in `src/style.css`. Change those variables first. Responsive rules are near the end of the file.

## Update from GitHub

Open `src/content.js` in your repository, choose Edit, change the relevant data and commit. If Vercel or Cloudflare Git integration is connected, the new commit triggers a new build. If it fails, inspect the build log for a missing translation, file path or syntax error and correct it. Never edit generated `dist/` files manually.

For larger changes, use a branch and preview deployment. After deployment, check both languages, mobile layout, project notes and certificate links. The contact section uses `mailto:`; it does not claim to send messages through a server.
