-- Backfill: frys historisk totalscore for gamle Lalm-runder.
--
-- Lalm ble rettet fra den utdaterte 12-hulls UDisc-oppforingen (par 36) til den
-- riktige 18-hulls-oppforingen (par 57). Appen rekonstruerer absolutt totalscore
-- som (score + course.par) for runder som mangler lagret total_score
-- (se App.jsx:1168 og :1931). Uten backfill ville gamle Lalm-runder plutselig
-- vist 21 slag for hoyt (57 - 36).
--
-- Dette fryser den historiske totalen (score + 36 = den gamle paren) for Lalm-runder
-- uten total_score. Poeng og ligatabell er IKKE berort (de bruker score mot par).
--
-- Kjor i Supabase SQL Editor. Idempotent (guard pa total_score IS NULL).

update rounds
set total_score = score + 36
where course_id = 'lalm'
  and total_score is null
  and score is not null;
