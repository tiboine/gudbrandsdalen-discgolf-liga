-- Funn A: notifications INSERT was `auth.uid() IS NOT NULL`, letting any member
-- forge/spam notifications (and push) to anyone with arbitrary title/body.
--
-- Fix: route all CROSS-USER notification creation through SECURITY DEFINER RPCs
-- that derive the sender's display name server-side from profiles (so it cannot
-- be spoofed), then lock the direct INSERT policy to own-row only.
--
-- Self-notifications (badge_earned/badge_lost, admin self-tests) keep inserting
-- directly and are allowed by the tightened policy (auth.uid() = user_id).
--
-- Run in Supabase SQL Editor. Idempotent.

-- ---------------------------------------------------------------------------
-- RPCs (SECURITY DEFINER bypasses RLS; sender identity comes from auth.uid()).
-- ---------------------------------------------------------------------------

create or replace function notify_friend_request(target uuid)
returns void language plpgsql security definer set search_path = public as $$
declare sender_name text;
begin
  if auth.uid() is null or auth.uid() = target then return; end if;
  select coalesce(full_name, 'Noen') into sender_name from profiles where id = auth.uid();
  insert into notifications (user_id, type, title, body, data, read)
  values (
    target, 'friend_request', 'Ny venneforespørsel!',
    coalesce(sender_name, 'Noen') || ' vil legge deg til som venn',
    jsonb_build_object('from_user_id', auth.uid()), false
  );
end; $$;

create or replace function notify_friend_accepted(target uuid)
returns void language plpgsql security definer set search_path = public as $$
declare sender_name text;
begin
  if auth.uid() is null or auth.uid() = target then return; end if;
  -- Only allow if the caller is actually an accepted friend of target.
  if not exists (
    select 1 from friends f
    where f.user_id = auth.uid() and f.friend_id = target and f.status = 'accepted'
  ) then return; end if;
  select coalesce(full_name, 'Noen') into sender_name from profiles where id = auth.uid();
  insert into notifications (user_id, type, title, body, read)
  values (
    target, 'friend_accepted', 'Venneforespørsel godkjent!',
    coalesce(sender_name, 'Noen') || ' godtok venneforespørselen din', false
  );
end; $$;

create or replace function notify_round_registered(
  target uuid, p_course_name text, p_score text, p_course_id text, p_date text, p_group uuid
) returns void language plpgsql security definer set search_path = public as $$
declare sender_name text;
begin
  if auth.uid() is null or auth.uid() = target then return; end if;
  -- Only an accepted friend can register a round on someone's behalf.
  if not exists (
    select 1 from friends f
    where f.user_id = auth.uid() and f.friend_id = target and f.status = 'accepted'
  ) then return; end if;
  select coalesce(full_name, 'Noen') into sender_name from profiles where id = auth.uid();
  insert into notifications (user_id, type, title, body, data, read)
  values (
    target, 'round_registered', 'Runde registrert for deg!',
    coalesce(sender_name, 'Noen') || ' registrerte ' || coalesce(p_score, '') || ' for deg på ' || coalesce(p_course_name, 'en bane'),
    jsonb_build_object('course_id', p_course_id, 'date', p_date, 'group_id', p_group), false
  );
end; $$;

create or replace function notify_course_record(
  targets uuid[], p_course_name text, p_score text
) returns void language plpgsql security definer set search_path = public as $$
declare sender_name text; t uuid;
begin
  if auth.uid() is null then return; end if;
  select coalesce(full_name, 'Noen') into sender_name from profiles where id = auth.uid();
  foreach t in array targets loop
    if t is null or t = auth.uid() then continue; end if;
    insert into notifications (user_id, type, title, body, read)
    values (
      t, 'course_record', 'Ny banerekord! 🏆',
      coalesce(sender_name, 'Noen') || ' satte ny rekord på ' || coalesce(p_course_name, 'en bane') || ': ' || coalesce(p_score, ''), false
    );
  end loop;
end; $$;

grant execute on function notify_friend_request(uuid) to authenticated;
grant execute on function notify_friend_accepted(uuid) to authenticated;
grant execute on function notify_round_registered(uuid, text, text, text, text, uuid) to authenticated;
grant execute on function notify_course_record(uuid[], text, text) to authenticated;

-- ---------------------------------------------------------------------------
-- Lock direct INSERT to own-row only. Cross-user writes now go through the
-- SECURITY DEFINER RPCs above; self-notifications (badges, admin test) still work.
-- ---------------------------------------------------------------------------
drop policy if exists "Authenticated users can insert notifications" on notifications;
drop policy if exists "users can insert own notifications" on notifications;
create policy "users can insert own notifications" on notifications
  for insert with check (auth.uid() = user_id);
