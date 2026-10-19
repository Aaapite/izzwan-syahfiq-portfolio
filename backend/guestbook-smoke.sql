-- Transactional live SQL checks. Fixtures and test notes are always rolled back.
-- Run as postgres against only the dedicated portfolio project.
begin;
insert into auth.users(id, aud, role, email, raw_app_meta_data, raw_user_meta_data, is_anonymous)
values
  ('10101010-0000-4000-8000-000000000001', 'authenticated', 'authenticated', 'portfolio-smoke-one@example.invalid', '{"provider":"github"}', '{"full_name":"Smoke One"}', false),
  ('10101010-0000-4000-8000-000000000002', 'authenticated', 'authenticated', 'portfolio-smoke-two@example.invalid', '{"provider":"google"}', '{"full_name":"Smoke Two"}', false),
  ('10101010-0000-4000-8000-000000000003', 'authenticated', 'authenticated', 'portfolio-smoke-owner@example.invalid', '{"provider":"github"}', '{"full_name":"Smoke Owner"}', false);
insert into private.guestbook_moderators(user_id) values ('10101010-0000-4000-8000-000000000003');

set local role anon;
do $$ begin
  perform count(*) from public.guestbook_notes;
  begin
    insert into public.guestbook_notes(author_id,body) values ('10101010-0000-4000-8000-000000000001','anon must fail');
    raise exception 'Anonymous write unexpectedly allowed';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

select set_config('request.jwt.claims', '{"sub":"10101010-0000-4000-8000-000000000001","role":"authenticated"}', true);
set local role authenticated;
insert into public.guestbook_notes(author_id,body) values ('10101010-0000-4000-8000-000000000001','transactional smoke root');
do $$ begin
  if not exists(select 1 from public.guestbook_notes where body='transactional smoke root' and author_name='Smoke One') then
    raise exception 'Author name not derived from auth profile';
  end if;
  begin
    insert into public.guestbook_notes(author_id,body) values ('10101010-0000-4000-8000-000000000001','too soon');
    raise exception 'Rate limit unexpectedly bypassed';
  exception when raise_exception then if sqlerrm <> 'guestbook_rate_limit' then raise; end if; end;
  begin
    insert into public.guestbook_notes(author_id,body) values ('10101010-0000-4000-8000-000000000001',repeat('x',501));
    raise exception 'Overlength body unexpectedly accepted';
  exception when check_violation then null; end;
end $$;
reset role;

select set_config('request.jwt.claims', '{"sub":"10101010-0000-4000-8000-000000000002","role":"authenticated"}', true);
set local role authenticated;
insert into public.guestbook_notes(author_id,body,parent_id)
select '10101010-0000-4000-8000-000000000002','transactional smoke reply',id from public.guestbook_notes where body='transactional smoke root';
do $$ declare affected integer; begin
  delete from public.guestbook_notes where body='transactional smoke root';
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Cross-author deletion unexpectedly allowed'; end if;
  update public.guestbook_notes set hidden=true where body='transactional smoke root';
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Non-moderator hiding unexpectedly allowed'; end if;
  begin
    update public.guestbook_notes set body='tampered' where body='transactional smoke reply';
    raise exception 'Note editing unexpectedly allowed';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.guestbook_notes(author_id,body) values ('10101010-0000-4000-8000-000000000001','forged identity');
    raise exception 'Author impersonation unexpectedly allowed';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.guestbook_notes(author_id,body,parent_id)
      select '10101010-0000-4000-8000-000000000002','nested reply',id from public.guestbook_notes where body='transactional smoke reply';
    raise exception 'Nested reply unexpectedly accepted';
  exception when check_violation then null; end;
end $$;
reset role;

update private.guestbook_post_limits set last_post_at=now()-interval '2 minutes' where user_id='10101010-0000-4000-8000-000000000001';
select set_config('request.jwt.claims', '{"sub":"10101010-0000-4000-8000-000000000001","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  begin
    insert into public.guestbook_notes(author_id,body) values ('10101010-0000-4000-8000-000000000001','transactional smoke root');
    raise exception 'Duplicate content unexpectedly allowed';
  exception when raise_exception then if sqlerrm <> 'guestbook_duplicate' then raise; end if; end;
end $$;
reset role;

insert into private.guestbook_bans(user_id) values('10101010-0000-4000-8000-000000000002');
select set_config('request.jwt.claims', '{"sub":"10101010-0000-4000-8000-000000000002","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  begin
    insert into public.guestbook_notes(author_id,body) values ('10101010-0000-4000-8000-000000000002','banned account');
    raise exception 'Banned account unexpectedly allowed to post';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

select set_config('request.jwt.claims', '{"sub":"10101010-0000-4000-8000-000000000003","role":"authenticated"}', true);
set local role authenticated;
do $$ declare affected integer; begin
  update public.guestbook_notes set hidden=true where body='transactional smoke root';
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'Moderator could not hide a note'; end if;
end $$;
reset role;
set local role anon;
do $$ begin
  if exists(select 1 from public.guestbook_notes where body='transactional smoke root') then
    raise exception 'Hidden note unexpectedly publicly visible';
  end if;
end $$;
reset role;
select 'Anonymous read/write, identity, RLS, length, rate limit, replies, duplicate, bans, moderator hide and hidden-note visibility checks passed. Fixtures rolled back.' as result;
rollback;
