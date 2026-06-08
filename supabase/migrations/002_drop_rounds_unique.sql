-- Allow multiple rounds per (user, course, date).
-- The app now keeps best round per (course, season) for league points, while all rounds
-- count toward badge stats. Any UNIQUE constraint that blocks duplicate registrations
-- must be removed so the new flow works.
--
-- Drops any constraint matching common names. If your constraint has a different name,
-- run: SELECT conname FROM pg_constraint WHERE conrelid = 'rounds'::regclass;
-- and add an explicit ALTER TABLE rounds DROP CONSTRAINT <name>;

alter table rounds drop constraint if exists rounds_user_id_course_id_date_key;
alter table rounds drop constraint if exists rounds_user_id_course_id_key;
alter table rounds drop constraint if exists rounds_unique_user_course_date;
alter table rounds drop constraint if exists rounds_unique_user_course;

-- Also drop any UNIQUE index covering the same columns, just in case
drop index if exists rounds_user_id_course_id_date_idx;
drop index if exists rounds_user_id_course_id_idx;
