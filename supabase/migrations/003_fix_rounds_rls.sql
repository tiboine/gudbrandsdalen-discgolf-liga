-- Replaces the buggy "Maks 2 runder per bane per uke" INSERT policy on rounds.
--
-- The old policy compared `existing.course_id = existing.course_id` and a similar
-- date_trunc comparison — both are column-vs-itself, always true. The COUNT subquery
-- therefore returned the user's TOTAL rounds globally rather than rounds on the
-- same course and week, blocking any insert as soon as a user had 2+ rounds anywhere.
--
-- The app now enforces "best round per (course, season) counts for league points"
-- in JavaScript, so we don't need an RLS restriction on number of rounds. Multiple
-- rounds are explicitly allowed so badge stats (aces, birdies, eagles) can accumulate
-- across attempts.

drop policy if exists "Maks 2 runder per bane per uke" on rounds;
drop policy if exists "users can insert own rounds" on rounds;

create policy "users can insert own rounds"
on rounds for insert
with check (auth.uid() = user_id);
