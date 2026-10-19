# Portfolio guestbook

The drawer is implemented in `src/guestbook.js` and `src/guestbook.css`. It supports GitHub and Google sign-in, public notes, one-level replies, tab-local drafts, Unicode-aware 500-character validation, loading and error states, deletion of your own notes, and owner moderation. Visitor text is rendered with DOM text nodes, never visitor HTML. There are no demonstration comments in the public stream and local drafts are never presented as shared storage.

## Current release boundary

On 19 October 2026 the owner explicitly selected **White Tiger, free tier only**. The quoted project cost was **$0/month** and the organization plan was verified as Free. A dedicated Singapore project, `izzwan-portfolio-guestbook` (`afmnsdfapykwnyuuktnl`), was created and the `portfolio_guestbook` and `guestbook_policy_cleanup` migrations were applied. No unrelated project was changed. Both GitHub and Google are configured and enabled in public auth settings; email/password and anonymous sign-in are disabled. Both providers completed real production OAuth and posting checks at [izzwan-syahfiq-portfolio.vercel.app](https://izzwan-syahfiq-portfolio.vercel.app).

Application commit `5be8022b48c264849e3f83bd9c342dd6d99b72d8` was pushed to `main`; its Vercel production deployment `dpl_61cK7pCgXMuQqNPBs9nvTpHbjv9G` was verified Ready through CLI and API against the intended project/commit. See [the release validation](VALIDATION.md).

GitHub OAuth application `3944279` belongs to `Aaapite`. Google project `izzwan-portfolio-sign-in` uses the owner's public support contact, `izzsyahfiq@gmail.com`, is unbilled, and its OAuth app is In production with only basic profile/email scopes. Secrets stay in provider settings and are not recorded here. Public bilingual [privacy](../public/privacy.html) and [terms](../public/terms.html) pages accompany the guestbook.

The public project URL is `https://afmnsdfapykwnyuuktnl.supabase.co`. The hosting build uses its public publishable key through the variables below. No service-role key was requested or used. Owner setup continues at [the project's provider settings](https://supabase.com/dashboard/project/afmnsdfapykwnyuuktnl/auth/providers).

## Setup

1. The dedicated project has already been created at the verified $0 quote in the owner's selected White Tiger organization. Keep it on the Free plan as requested. Keep NADI, Inkora and other projects separate.
2. The equivalent of [the bootstrap SQL](../backend/guestbook.sql) has already been applied to that project with two named remote migrations. The source file represents their final combined schema; do not run it again on the existing project. Use it for review or a new dedicated environment. A future CLI migration export must use the current CLI's generation commands; no timestamped local migration history was invented here.
3. GitHub and Google are enabled in Supabase Authentication with the owner's OAuth applications. Provider secrets go only in Supabase's provider settings, never in a `VITE_` variable or repository file. Both providers use `https://afmnsdfapykwnyuuktnl.supabase.co/auth/v1/callback` as their provider callback. Follow [GitHub setup](https://supabase.com/docs/guides/auth/social-login/auth-github) and [Google setup](https://supabase.com/docs/guides/auth/social-login/auth-google) when rotating credentials or creating another environment.
4. Supabase's Site URL is `https://izzwan-syahfiq-portfolio.vercel.app`. The exact allowed guestbook returns are `https://izzwan-syahfiq-portfolio.vercel.app/?guestbook=1` and `http://localhost:5173/?guestbook=1`. The static app uses the SDK's PKCE flow and detects/exchanges the callback code; it returns visitors to the open drawer. Query/fragment callback errors and PKCE initialization errors are handled without discarding unrelated URL state. See [redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls).
5. These **public** build variables were saved in all three Vercel environments and used by the verified production build. Future configuration changes require rebuilding/redeploying:

   ```dotenv
   VITE_SUPABASE_URL=https://afmnsdfapykwnyuuktnl.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_REPLACE_WITH_PUBLIC_KEY
   ```

   Only a publishable key (or legacy anonymous key) belongs in these variables. The client rejects secret keys and legacy JWTs whose role is not `anon`. No service-role key is needed for the website.
6. The owner explicitly approved the signed-in `Aaapite` account as moderator. Its verified auth UUID was added to the private moderator list and its server-managed app metadata was set and read back. Owner controls were visible and SQL moderation passed. The complete browser hide flow is unverified: automation could not control the native confirmation, and no verified success followed the owner's manual acceptance. For a future moderator, use the verified auth UUID:

   ```sql
   insert into private.guestbook_moderators(user_id) values ('OWNER_AUTH_USER_UUID');
   ```

   The SQL policy is the source of moderation authorization. To show moderation controls, use the Auth Admin UI/API to set that same user's **app metadata** `guestbook_moderator` to `true`, then refresh their session. Never use user-editable metadata for a role. If the UI role flag is stale, SQL-editor moderation remains available.

## Security and moderation

All tables have RLS enabled and all privileges are explicit. Public readers can see visible notes; authenticated authors may insert and delete their own notes; only private moderator membership permits hiding or deleting other notes. Members cannot update note bodies, author identities, names, timestamps or reply targets. The private schema is not exposed through the Data API. Its two narrow privileged functions exist only for moderator lookup and the insertion trigger; both check the current auth identity and have fixed empty search paths. Public execution privileges are revoked.

The trigger derives display names from the authenticated profile for display only, rejects anonymous/non-GitHub/non-Google accounts, checks bans, serializes each author's rate-limit row to prevent concurrent bypasses, permits one post per minute and 10 per UTC day, rejects duplicate recent content, and permits replies only to a visible root. Author emails, avatar URLs and OAuth tokens are not stored in public notes. Supabase Auth handles sessions and token refresh. User identity data still resides privately in Supabase Auth according to its configuration.

Owner actions in SQL, using verified IDs:

```sql
-- Hide a note. Hidden root notes also stop their threads appearing in the UI.
update public.guestbook_notes set hidden = true where id = 'NOTE_UUID';
-- Block future submissions from a persistent spam account.
insert into private.guestbook_bans(user_id, reason) values ('AUTH_USER_UUID', 'Spam');
-- Permanently delete a note and its replies, when required.
delete from public.guestbook_notes where id = 'NOTE_UUID';
```

The 60-second/per-account limits reduce spam but do not prevent a person from creating many provider accounts. Enable appropriate Supabase Auth abuse controls/CAPTCHA and monitor usage if that occurs. The app does not claim CAPTCHA or IP-wide enforcement is configured. The list is loaded on opening/refresh and after posting, not via a continuously open realtime connection. It pages root notes in groups of 20 and returns up to 500 replies for that page; a very large thread needs an additional reply paginator before all replies can be browsed.

The latest security advisor includes a warning that leaked-password protection is disabled. That protection requires Pro; no upgrade was made. Public authentication settings confirm the unused email/password provider and anonymous sign-in are disabled, retaining social-only login. This is an authentication configuration warning; earlier database RLS/policy checks passed, and no complete security certification is claimed. Performance advisors reported informational unused indexes on the new table.

## Verification completed

- Nine focused guestbook tests plus three portfolio tests passed, including query/fragment OAuth errors and PKCE initialization failures. The build and offline export passed after the callback fix.
- The live [transactional SQL smoke script](../backend/guestbook-smoke.sql) passed anonymous read/write checks, forged identity rejection, ownership restrictions, 501-character rejection, throttling, one-level replies, duplicate rejection, bans, moderator hiding and hidden-note visibility. Its users/notes were rolled back; the follow-up check then confirmed zero notes, auth users and throttle records. Later real browser verification created separate provider test content.
- GitHub and Google completed actual OAuth returns to localhost and displayed signed-in UI. A GitHub note and reply persisted, survived reload and were visible to an anonymous session in a separate browser. The per-minute posting limit produced its intended error.
- A first Google posting attempt returned a generic transient failure; reloading and retrying succeeded, and the Google note was visible. This successful retry does not establish that the initial transient cause was fixed.
- Local phone/desktop checks covered both themes, BM, full-width drawer, real note fetching, Escape/focus return, preference persistence, portrait taps and motion. See [the validation record](VALIDATION.md) for exact sizes and limits.
- Production GitHub OAuth returned `Aaapite`; a submitted note was confirmed in the database and appeared to an anonymous separate browser. Production Google OAuth returned the public-contact account; its note showed the success message and its database row/author were verified. Production sign-out worked, and console checks showed no warnings or errors.
- All five temporary QA records were hidden after verification; the database showed zero visible notes and five hidden test notes. These records were retained reversibly rather than deleted. The earlier zero-user/record result applies only to the rolled-back SQL-fixture stage.

## Remaining verification limits

- The full native-confirmation-to-success browser hide action was not accepted as passed; owner membership/metadata/buttons and SQL moderation were verified.
- Large concurrent submissions and the complete daily quota were not exercised. The observed per-minute error and transactional access/throttle smoke checks passed.
- Physical touch hardware, an actual operating-system reduced-motion change and every standalone offline-file interaction were not separately exercised.

These checks verify the recorded database access model, both production provider returns and posting, and the listed browser behavior; they are not a complete security or load certification. See [unused-index guidance](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index) if indexes remain unused after real traffic. The SQL source was reviewed against official [RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security) and the [OAuth SDK reference](https://supabase.com/docs/reference/javascript/auth-signinwithoauth).
