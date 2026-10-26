-- Security audit (okt 2026): Storage-bucket "avatars".
-- The bucket and its policies were created in the dashboard, so they are not in the repo.
-- This makes them explicit: anyone can read (the bucket is public, avatars are shown to
-- everyone), but a user can only write their OWN file. The app uploads to
-- avatars/<user id>.webp with upsert (App.jsx, avatar upload), which needs
-- SELECT + INSERT + UPDATE.
--
-- Pre-check (optional) - see what this replaces:
--   select policyname, cmd, qual, with_check from pg_policies
--   where schemaname = 'storage' and tablename = 'objects';
--   select id, public, file_size_limit, allowed_mime_types from storage.buckets where id = 'avatars';
--
-- Run in Supabase SQL Editor (as a separate run from 011). Idempotent.

-- Drop existing policies that mention the avatars bucket (dashboard-created names vary).
do $$
declare p record;
begin
  for p in select policyname from pg_policies
           where schemaname = 'storage' and tablename = 'objects'
             and (coalesce(qual, '') ilike '%avatars%' or coalesce(with_check, '') ilike '%avatars%') loop
    raise notice 'dropping storage policy: %', p.policyname;
    execute format('drop policy %I on storage.objects', p.policyname);
  end loop;
end $$;

create policy "avatars: public read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars: upload own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and name = 'avatars/' || auth.uid()::text || '.webp');

create policy "avatars: update own" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and name = 'avatars/' || auth.uid()::text || '.webp')
  with check (bucket_id = 'avatars' and name = 'avatars/' || auth.uid()::text || '.webp');

create policy "avatars: delete own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and name = 'avatars/' || auth.uid()::text || '.webp');

-- The app compresses to a ~500 px WebP before upload; 2 MB leaves room for browsers
-- (older Safari) that fall back to PNG from canvas.toBlob.
update storage.buckets
set file_size_limit = 2097152,
    allowed_mime_types = array['image/webp', 'image/png', 'image/jpeg']
where id = 'avatars';
