# Deploy to Vercel or Cloudflare

The portfolio is live at [izzwan-syahfiq-portfolio.vercel.app](https://izzwan-syahfiq-portfolio.vercel.app). The Hermes redesign was deployed from `5be8022` on 19 October 2026. The existing Vercel project is `izzwan-syahfiq-portfolio` under `white-tiger3` (White Tiger, Hobby), linked to `Aaapite/izzwan-syahfiq-portfolio` on `main`. Reuse this project for future updates. See [validation](VALIDATION.md) for release evidence.

The frontend remains a static Vite build. Its guestbook uses the dedicated White Tiger Free-tier Supabase project described in [guestbook setup](GUESTBOOK.md). No billing, paid trial or custom domain was added. Cloudflare instructions below are alternatives for a future migration, not a second deployed site.

## Build settings

| Setting | Value |
| --- | --- |
| Repository | The separate `izzwan-syahfiq-portfolio` repository |
| Root directory | Repository root |
| Production branch | `main` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 22.12 or newer; use a currently supported 22 or 24 release |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public configuration) |

## Vercel

1. For this portfolio, reuse the existing verified project above. Only for a new environment, import the portfolio repository into a separate project with narrowly scoped GitHub access.
2. Select the Vite framework preset. Keep the root at the repository root. The included `vercel.json` specifies `npm run build` and `dist`.
3. Keep the free Hobby plan. The existing project has both public guestbook variables in Production, Preview and Development. Provider client secrets stay only in Supabase, never in `VITE_` variables or the repository.
4. Deploy and open the generated `vercel.app` address.
5. Confirm both languages, themes, motion, portrait swap, project notes, the CV/certificates and both guestbook sign-in flows. Supabase's Site URL and exact allowed return URLs must match the real origin; update those settings before migrating to another hostname.

Future commits to the connected production branch rebuild the site. Branches can generate previews. If you roll back, revert the relevant Git commit too so a later deployment does not restore the unwanted change.

Official guide: https://vercel.com/docs/frameworks/frontend/vite

## Cloudflare Pages

1. In Cloudflare, open Workers & Pages, create an application and choose Pages / Connect to Git.
2. Connect GitHub and select only the portfolio repository.
3. Set the production branch to `main`, build command to `npm run build` and output directory to `dist`. Use the Vite preset if offered; otherwise select no framework and enter those values manually.
4. Use the free plan and deploy. Open the supplied `pages.dev` address.
5. Run the same browser checks as above.

Both public and private GitHub repositories are supported. The tracked `public/_headers` file adds basic response headers on Pages. Repository changes trigger builds through Git integration.

Official guide: https://developers.cloudflare.com/pages/get-started/git-integration/

## Cloudflare Workers static assets

Cloudflare's current guidance favours Workers for new applications. This portfolio also includes a `wrangler.jsonc` static-assets configuration, so Workers is available without changing the website.

After building locally and signing in to your own Cloudflare account:

```sh
npm ci
npm run build
npx wrangler deploy
```

Wrangler's deployment uses `./dist` from the included configuration and provides a `workers.dev` address. It may prompt for account sign-in; use the official flow, and never commit credentials. Choose the free Workers plan. Git-connected Workers Builds can use the same build command and `npx wrangler deploy` as the deploy command.

A static asset site does not need a Worker JavaScript handler. `_headers` applies to asset responses; future server code needs its own header handling. Before deploying, verify current provider free-plan limits and select the free tier explicitly.

Official guide: https://developers.cloudflare.com/workers/static-assets/

## After the first deployment

Add your actual deployment URL to the GitHub repository description / website field. If you want canonical and social-card URL metadata, add the real URL after it exists rather than a guessed hostname. The site currently includes title, description and Person structured data, but no fabricated deployment URL or social-image URL.

## Troubleshooting

- **Build reports a missing asset:** confirm the exact case-sensitive filename under `public/` and its path in `src/content.js`.
- **Build reports missing content:** provide both `en` and `ms` text for every project field.
- **Wrong Node version:** select Node 22.12+ or 24. Do not remove dependency engine requirements to bypass the failure.
- **Certificate / CV gives 404:** preserve the `/documents/` paths or update the content data.
- **Copy email fails:** clipboard access can be restricted outside HTTPS or by browser permission. The address and email link remain available.
- **No motion:** check the site's Pause motion preference and the operating system's reduced-motion setting.
