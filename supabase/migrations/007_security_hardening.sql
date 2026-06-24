-- Security hardening based on multi-agent review + live pg_policies audit (juni 2026).
-- Run in Supabase SQL Editor. All statements are idempotent (safe to re-run).
--
-- Findings addressed:
--   B. feedback was world-readable (SELECT qual = true) — restrict to admin.
--   C. Admin could not disable/delete users (profiles UPDATE locked to own row, no DELETE).
--   D. Admin could not delete others' rounds or feedback (no admin DELETE policy).
--   E. Users could not delete their own notifications (no DELETE policy) — cleanup failed silently.
--   F. Friend registration was blocked (rounds INSERT locked to own user_id).
--
-- NOT addressed here (requires a product decision — see chat):
--   A. notifications INSERT = auth.uid() IS NOT NULL lets any member forge/spam notifications.
--      Proper fix is a SECURITY DEFINER RPC that sets title/body server-side.

-- Make sure RLS is on (no-op if already enabled).
alter table profiles      enable row level security;
alter table rounds         enable row level security;
alter table feedback       enable row level security;
alter table notifications  enable row level security;

-- ---------------------------------------------------------------------------
-- B. feedback: restrict reads to admin (the app only shows feedback in admin).
-- ---------------------------------------------------------------------------
drop policy if exists "Admin reads all" on feedback;
drop policy if exists "admin reads all feedback" on feedback;
create policy "admin reads all feedback" on feedback
  for select using (auth.email() = 'urbanthor@gmail.com');

-- ---------------------------------------------------------------------------
-- C + D. Admin management policies (mirrors the news admin pattern).
-- Multiple permissive policies for the same command are OR-ed, so these add
-- admin capability on top of the existing own-row policies.
-- ---------------------------------------------------------------------------
drop policy if exists "admin can update any profile" on profiles;
create policy "admin can update any profile" on profiles
  for update using (auth.email() = 'urbanthor@gmail.com');

drop policy if exists "admin can delete any profile" on profiles;
create policy "admin can delete any profile" on profiles
  for delete using (auth.email() = 'urbanthor@gmail.com');

drop policy if exists "admin can delete any round" on rounds;
create policy "admin can delete any round" on rounds
  for delete using (auth.email() = 'urbanthor@gmail.com');

drop policy if exists "admin can delete feedback" on feedback;
create policy "admin can delete feedback" on feedback
  for delete using (auth.email() = 'urbanthor@gmail.com');

-- ---------------------------------------------------------------------------
-- E. Let users delete their own notifications (cleanup currently no-ops).
-- ---------------------------------------------------------------------------
drop policy if exists "users can delete own notifications" on notifications;
create policy "users can delete own notifications" on notifications
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- F. Allow registering rounds for ACCEPTED friends (friend registration).
-- Friendship is stored bidirectionally with status='accepted', so a row
-- (user_id = me, friend_id = target, status='accepted') exists for the registrar.
-- This adds to the existing "users can insert own rounds" policy (OR-ed).
-- ---------------------------------------------------------------------------
drop policy if exists "users can insert rounds for accepted friends" on rounds;
create policy "users can insert rounds for accepted friends" on rounds
  for insert with check (
    auth.uid() = user_id
    or exists (
      select 1 from friends f
      where f.user_id = auth.uid()
        and f.friend_id = rounds.user_id
        and f.status = 'accepted'
    )
  );

-- Optional cleanup: drop the redundant duplicate SELECT policy on profiles.
drop policy if exists "Public profiles are viewable by everyone" on profiles;
