-- Allow users to register multiple rounds on the same course/date.
-- The existing INSERT policy likely has extra restrictions (e.g. one-round-per-week,
-- one-per-course-per-season) that the app logic now handles client-side instead.
--
-- DIAGNOSTIC: first run this in Supabase SQL Editor to see what policies exist:
--
--   SELECT policyname, cmd, qual, with_check
--   FROM pg_policies
--   WHERE schemaname = 'public' AND tablename = 'rounds';
--
-- Then run the rest of this file to replace the INSERT policy with a clean one.

-- Drop any existing INSERT policy on rounds (covers common names)
drop policy if exists "Users can insert their own rounds" on rounds;
drop policy if exists "users can insert own rounds" on rounds;
drop policy if exists "rounds_insert" on rounds;
drop policy if exists "Enable insert for authenticated users only" on rounds;
drop policy if exists "Authenticated users can insert their own rounds" on rounds;
drop policy if exists "Insert own rounds" on rounds;
drop policy if exists "rounds insert policy" on rounds;
drop policy if exists "Allow insert for own user_id" on rounds;
drop policy if exists "rounds_insert_policy" on rounds;
drop policy if exists "Users can register rounds" on rounds;

-- Create clean INSERT policy: users can only insert rounds where user_id = their own auth uid.
-- App logic enforces best-per-course-per-season for league points; multiple rounds are allowed
-- so badge stats can accumulate across attempts.
create policy "users can insert own rounds"
on rounds for insert
with check (auth.uid() = user_id);

-- Also allow inserting rounds for friends if they share a group_id and you're logged in.
-- (Friend-registration sets the same group_id on the friend's row.)
-- Skip this if you don't use the friend-registration feature.
create policy "users can insert friend rounds via group"
on rounds for insert
with check (
  group_id is not null
  and exists (
    select 1 from rounds existing
    where existing.group_id = rounds.group_id
      and existing.user_id = auth.uid()
  )
);
