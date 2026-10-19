-- Portfolio guestbook bootstrap, applied to the dedicated portfolio database.
-- Run once in a new, dedicated Supabase project's SQL editor as postgres.
-- Private helper functions are intentionally outside the exposed public schema.
begin;

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create table private.guestbook_moderators (
  user_id uuid primary key references auth.users(id) on delete cascade
);
create table private.guestbook_bans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  reason text not null default '',
  created_at timestamptz not null default now()
);
create table private.guestbook_post_limits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_post_at timestamptz,
  day date not null default current_date,
  day_count integer not null default 0
);
alter table private.guestbook_moderators enable row level security;
alter table private.guestbook_bans enable row level security;
alter table private.guestbook_post_limits enable row level security;
create policy "No direct client access" on private.guestbook_moderators for all to anon, authenticated using (false) with check (false);
create policy "No direct client access" on private.guestbook_bans for all to anon, authenticated using (false) with check (false);
create policy "No direct client access" on private.guestbook_post_limits for all to anon, authenticated using (false) with check (false);
revoke all on private.guestbook_moderators, private.guestbook_bans, private.guestbook_post_limits from public, anon, authenticated;

create table public.guestbook_notes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null default 'Visitor' check (char_length(author_name) between 1 and 60),
  body text not null check (char_length(btrim(body)) between 1 and 500),
  parent_id uuid references public.guestbook_notes(id) on delete cascade,
  hidden boolean not null default false,
  created_at timestamptz not null default clock_timestamp()
);
create index guestbook_roots_created on public.guestbook_notes(created_at desc, id desc) where parent_id is null and hidden = false;
create index guestbook_replies_created on public.guestbook_notes(parent_id, created_at) where parent_id is not null;
create index guestbook_author_created on public.guestbook_notes(author_id, created_at desc);
alter table public.guestbook_notes enable row level security;

-- A narrow auth.uid()-checked lookup for policies, with no caller-supplied identity.
-- SECURITY DEFINER is needed only to read the protected moderator table.
create function private.is_guestbook_moderator()
returns boolean language sql stable security definer set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from private.guestbook_moderators m where m.user_id = auth.uid()
  );
$$;
revoke all on function private.is_guestbook_moderator() from public, anon;
grant execute on function private.is_guestbook_moderator() to authenticated;

create policy "Public visible notes" on public.guestbook_notes for select to anon
using (hidden = false);
create policy "Members read visible notes and moderators read hidden notes" on public.guestbook_notes for select to authenticated
using (hidden = false or (select private.is_guestbook_moderator()));
create policy "Members write their own notes" on public.guestbook_notes for insert to authenticated
with check (author_id = (select auth.uid()) and hidden = false);
create policy "Authors and moderators delete notes" on public.guestbook_notes for delete to authenticated
using (author_id = (select auth.uid()) or (select private.is_guestbook_moderator()));
create policy "Moderators hide notes" on public.guestbook_notes for update to authenticated
using ((select private.is_guestbook_moderator()))
with check ((select private.is_guestbook_moderator()));

revoke all on public.guestbook_notes from public, anon, authenticated;
grant select on public.guestbook_notes to anon, authenticated;
grant insert (author_id, body, parent_id) on public.guestbook_notes to authenticated;
grant update (hidden) on public.guestbook_notes to authenticated;
grant delete on public.guestbook_notes to authenticated;

-- A BEFORE INSERT trigger enforces these checks even if someone bypasses the UI.
-- It needs privileged access to the private throttle/bans and auth profile, but it
-- is not exposed as a callable RPC and always checks the signed-in identity.
create function private.guard_guestbook_insert()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  profile jsonb;
  limits private.guestbook_post_limits%rowtype;
  posted_at timestamptz := clock_timestamp();
  root public.guestbook_notes%rowtype;
begin
  if actor is null or actor <> new.author_id then
    raise exception 'guestbook_sign_in' using errcode = '42501';
  end if;
  select u.raw_user_meta_data into profile from auth.users u
    where u.id = actor and coalesce(u.is_anonymous, false) = false
      and u.raw_app_meta_data ->> 'provider' in ('github', 'google');
  if not found then raise exception 'guestbook_sign_in' using errcode = '42501'; end if;
  if exists (select 1 from private.guestbook_bans b where b.user_id = actor) then
    raise exception 'guestbook_blocked' using errcode = '42501';
  end if;
  new.body := btrim(new.body);
  if new.body is null or char_length(new.body) not between 1 and 500 then
    raise exception 'guestbook_invalid_note' using errcode = '23514';
  end if;
  new.author_name := left(coalesce(nullif(btrim(profile ->> 'full_name'), ''), nullif(btrim(profile ->> 'user_name'), ''), 'Visitor'), 60);
  new.hidden := false;
  new.created_at := posted_at;
  -- Only one reply level; lock the parent so a simultaneous delete/hide cannot
  -- accept a reply to a root that has already disappeared.
  if new.parent_id is not null then
    select * into root from public.guestbook_notes n where n.id = new.parent_id for share;
    if not found or root.hidden or root.parent_id is not null then
      raise exception 'guestbook_parent_missing' using errcode = '23514';
    end if;
  end if;
  insert into private.guestbook_post_limits(user_id) values (actor) on conflict do nothing;
  select * into limits from private.guestbook_post_limits l where l.user_id = actor for update;
  if limits.last_post_at > posted_at - interval '60 seconds'
    or (limits.day = (posted_at at time zone 'UTC')::date and limits.day_count >= 10) then
    raise exception 'guestbook_rate_limit' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.guestbook_notes n where n.author_id = actor
    and n.body = new.body and n.created_at > posted_at - interval '1 day') then
    raise exception 'guestbook_duplicate' using errcode = 'P0001';
  end if;
  update private.guestbook_post_limits set last_post_at = posted_at,
    day = (posted_at at time zone 'UTC')::date,
    day_count = case when limits.day = (posted_at at time zone 'UTC')::date then limits.day_count + 1 else 1 end
    where user_id = actor;
  return new;
end;
$$;
revoke all on function private.guard_guestbook_insert() from public, anon, authenticated;
create trigger guard_guestbook_insert before insert on public.guestbook_notes for each row execute function private.guard_guestbook_insert();

comment on table public.guestbook_notes is 'Public portfolio notes and one-level replies; no email, provider tokens or avatar URLs are stored.';
commit;
