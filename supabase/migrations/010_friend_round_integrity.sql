-- Security audit (okt 2026), funn 1-4:
--   1. friends: a member could INSERT (me, anyone, 'accepted') directly, which satisfied
--      the rounds friend-INSERT policy and notify_round_registered (both only checked the
--      caller's OWN row). Result: register rounds on anyone's account + push-spam them.
--      Fix: friends INSERT only as 'pending'; acceptance only via accept_friend_request();
--      friendship = accepted rows in BOTH directions (are_friends()).
--   2. rounds: no server-side validation (score, date, user_id swap on update).
--      Fix: validate_round() trigger mirroring the client limits.
--   3. notify_course_record / notify_round_registered took free text + arbitrary targets.
--      Fix: both now take a round id and derive everything server-side, deduped.
--   4. profiles.disabled had no effect and users could clear it themselves.
--      Fix: only admin may change it; disabled users cannot write rounds.
--
-- Old (cached PWA) clients that accept friend requests via direct UPDATE/INSERT will
-- get an RLS error until they load the new app version.
--
-- Run in Supabase SQL Editor. Idempotent.
--
-- Pre-check (optional) - see what this migration replaces:
--   select tablename, policyname, cmd, qual, with_check from pg_policies
--   where schemaname = 'public' and tablename in ('friends', 'rounds') order by 1, 3;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select coalesce(auth.email() = 'urbanthor@gmail.com', false);
$$;

-- Accepted friendship in BOTH directions. The reverse row can only be created by
-- accept_friend_request(), i.e. with the other user's consent.
create or replace function public.are_friends(a uuid, b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select a is not null and b is not null and a <> b
    and exists (select 1 from friends where user_id = a and friend_id = b and status = 'accepted')
    and exists (select 1 from friends where user_id = b and friend_id = a and status = 'accepted');
$$;

revoke execute on function public.are_friends(uuid, uuid) from public, anon;
grant execute on function public.are_friends(uuid, uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- 1. friends: replace ALL existing policies (they were created in the UI and are
--    not in the repo) with an explicit set. No UPDATE policy: acceptance goes via RPC.
-- ---------------------------------------------------------------------------
alter table friends enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'friends' loop
    execute format('drop policy %I on public.friends', p.policyname);
  end loop;
end $$;

create policy "friends: read own" on friends
  for select using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "friends: send request" on friends
  for insert with check (auth.uid() = user_id and friend_id <> auth.uid() and status = 'pending');

-- Recipient declines, sender cancels, either side unfriends.
create policy "friends: delete own" on friends
  for delete using (auth.uid() = user_id or auth.uid() = friend_id);

create or replace function public.accept_friend_request(p_request_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  req friends%rowtype;
  sender_name text;
begin
  if auth.uid() is null then raise exception 'Ikke innlogget'; end if;
  select * into req from friends
    where id = p_request_id and friend_id = auth.uid() and status = 'pending';
  if not found then raise exception 'Fant ikke venneforespørselen'; end if;

  update friends set status = 'accepted' where id = req.id;
  if exists (select 1 from friends where user_id = auth.uid() and friend_id = req.user_id) then
    update friends set status = 'accepted' where user_id = auth.uid() and friend_id = req.user_id;
  else
    insert into friends (user_id, friend_id, status) values (auth.uid(), req.user_id, 'accepted');
  end if;

  select coalesce(full_name, 'Noen') into sender_name from profiles where id = auth.uid();
  insert into notifications (user_id, type, title, body, read)
  values (
    req.user_id, 'friend_accepted', 'Venneforespørsel godkjent!',
    coalesce(sender_name, 'Noen') || ' godtok venneforespørselen din', false
  );
end; $$;

grant execute on function public.accept_friend_request(uuid) to authenticated;

-- Legacy RPC (old clients): require a real two-way friendship.
create or replace function public.notify_friend_accepted(target uuid)
returns void language plpgsql security definer set search_path = public as $$
declare sender_name text;
begin
  if not public.are_friends(auth.uid(), target) then return; end if;
  select coalesce(full_name, 'Noen') into sender_name from profiles where id = auth.uid();
  insert into notifications (user_id, type, title, body, read)
  values (
    target, 'friend_accepted', 'Venneforespørsel godkjent!',
    coalesce(sender_name, 'Noen') || ' godtok venneforespørselen din', false
  );
end; $$;

-- ---------------------------------------------------------------------------
-- 1b. rounds INSERT: replace every INSERT policy (UI-created ones included).
-- ---------------------------------------------------------------------------
do $$
declare p record;
begin
  for p in select policyname, cmd from pg_policies
           where schemaname = 'public' and tablename = 'rounds' and cmd in ('INSERT', 'ALL') loop
    if p.cmd = 'ALL' then
      raise warning 'rounds has an ALL policy "%" - check it manually, it may allow inserts for anyone', p.policyname;
    else
      execute format('drop policy %I on public.rounds', p.policyname);
    end if;
  end loop;
end $$;

create policy "users can insert own rounds" on rounds
  for insert with check (auth.uid() = user_id);

create policy "users can insert rounds for accepted friends" on rounds
  for insert with check (public.are_friends(auth.uid(), user_id));

-- ---------------------------------------------------------------------------
-- 2 + 4. rounds validation (mirrors the client limits in App.jsx).
-- ---------------------------------------------------------------------------
create or replace function public.validate_round()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() then return new; end if;

  if tg_op = 'UPDATE' and new.user_id is distinct from old.user_id then
    raise exception 'Kan ikke flytte en runde til en annen spiller';
  end if;
  if exists (select 1 from profiles where id in (auth.uid(), new.user_id) and disabled is true) then
    raise exception 'Kontoen er deaktivert';
  end if;
  if new.score is null or new.score < -15 or new.score > 30 then
    raise exception 'Ugyldig score mot par (må være mellom -15 og +30)';
  end if;
  if new.total_score is not null and new.total_score < 1 then
    raise exception 'Ugyldig totalscore';
  end if;
  if new.date is null or new.date::date > (now() at time zone 'Europe/Oslo')::date
     or new.date::date < date '2020-01-01' then
    raise exception 'Ugyldig dato';
  end if;
  if coalesce(new.aces, 0) not between 0 and 30 or coalesce(new.eagles, 0) not between 0 and 30
     or coalesce(new.birdies, 0) not between 0 and 30 or coalesce(new.bogeys, 0) not between 0 and 30 then
    raise exception 'Ugyldig hullstatistikk';
  end if;
  return new;
end; $$;

drop trigger if exists rounds_validate on rounds;
create trigger rounds_validate
before insert or update on rounds
for each row execute function public.validate_round();

-- ---------------------------------------------------------------------------
-- 4. profiles.disabled: only admin may change it.
-- ---------------------------------------------------------------------------
create or replace function public.protect_profile_disabled()
returns trigger language plpgsql as $$
begin
  if new.disabled is distinct from old.disabled and not public.is_admin() then
    raise exception 'Kun admin kan endre deaktivering';
  end if;
  return new;
end; $$;

drop trigger if exists profiles_protect_disabled on profiles;
create trigger profiles_protect_disabled
before update on profiles
for each row execute function public.protect_profile_disabled();

-- ---------------------------------------------------------------------------
-- 3. Notification RPCs keyed on a round id. Text is built server-side and each
--    round notifies at most once (dedup on data->>'round_id').
-- ---------------------------------------------------------------------------
drop function if exists public.notify_round_registered(uuid, text, text, text, text, uuid);
drop function if exists public.notify_course_record(uuid[], text, text);

create or replace function public.format_vs_par(s int)
returns text language sql immutable as $$
  select case when s = 0 then 'E' when s > 0 then '+' || s else s::text end;
$$;

create or replace function public.notify_round_registered(p_round_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  rnd rounds%rowtype;
  sender_name text;
begin
  select * into rnd from rounds where id = p_round_id;
  if not found or rnd.user_id = auth.uid() then return; end if;
  if not public.are_friends(auth.uid(), rnd.user_id) then return; end if;
  if exists (select 1 from notifications where user_id = rnd.user_id and type = 'round_registered'
             and data->>'round_id' = p_round_id::text) then return; end if;

  select coalesce(full_name, 'Noen') into sender_name from profiles where id = auth.uid();
  insert into notifications (user_id, type, title, body, data, read)
  values (
    rnd.user_id, 'round_registered', 'Runde registrert for deg!',
    coalesce(sender_name, 'Noen') || ' registrerte ' || public.format_vs_par(rnd.score)
      || ' for deg på ' || coalesce(rnd.course_name, 'en bane'),
    jsonb_build_object('round_id', rnd.id, 'course_id', rnd.course_id, 'date', rnd.date,
                       'group_id', rnd.group_id, 'from_user_id', auth.uid()),
    false
  );
end; $$;

create or replace function public.notify_course_record(p_round_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  rnd rounds%rowtype;
  prev_best int;
  sender_name text;
begin
  select * into rnd from rounds where id = p_round_id and user_id = auth.uid();
  if not found then return; end if;
  if exists (select 1 from notifications where type = 'course_record'
             and data->>'round_id' = p_round_id::text) then return; end if;

  -- Strictly better than every other player's best on this course (a tie is no record).
  select min(score) into prev_best from rounds where course_id = rnd.course_id and user_id <> rnd.user_id;
  if prev_best is null or rnd.score >= prev_best then return; end if;

  select coalesce(full_name, 'Noen') into sender_name from profiles where id = auth.uid();
  insert into notifications (user_id, type, title, body, data, read)
  select distinct r.user_id, 'course_record', 'Ny banerekord! 🏆',
    coalesce(sender_name, 'Noen') || ' satte ny rekord på ' || coalesce(rnd.course_name, 'en bane')
      || ': ' || public.format_vs_par(rnd.score),
    jsonb_build_object('round_id', rnd.id, 'course_id', rnd.course_id),
    false
  from rounds r
  where r.course_id = rnd.course_id and r.user_id <> rnd.user_id;
end; $$;

grant execute on function public.notify_round_registered(uuid) to authenticated;
grant execute on function public.notify_course_record(uuid) to authenticated;
