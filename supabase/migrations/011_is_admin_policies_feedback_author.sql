-- Security audit (okt 2026), rest:
--   A. Admin policies hardcoded auth.email() = '...' in six places. They now all use
--      public.is_admin() (created in 010), so the admin list lives in ONE function.
--      (The feedback trigger in 004 still looks up admin users by email in auth.users.)
--   B. feedback.user_name/user_id came from the client and could be spoofed in the admin
--      notification. A BEFORE INSERT trigger now sets both server-side.
--
-- Requires 010. Run in Supabase SQL Editor. Idempotent.

-- ---------------------------------------------------------------------------
-- A. Admin policies via is_admin()
-- ---------------------------------------------------------------------------
drop policy if exists "admin can insert news" on news;
create policy "admin can insert news" on news for insert with check (public.is_admin());

drop policy if exists "admin can update news" on news;
create policy "admin can update news" on news for update using (public.is_admin());

drop policy if exists "admin can delete news" on news;
create policy "admin can delete news" on news for delete using (public.is_admin());

drop policy if exists "admin reads all feedback" on feedback;
create policy "admin reads all feedback" on feedback for select using (public.is_admin());

drop policy if exists "admin can delete feedback" on feedback;
create policy "admin can delete feedback" on feedback for delete using (public.is_admin());

drop policy if exists "admin can update any profile" on profiles;
create policy "admin can update any profile" on profiles for update using (public.is_admin());

drop policy if exists "admin can delete any profile" on profiles;
create policy "admin can delete any profile" on profiles for delete using (public.is_admin());

drop policy if exists "admin can delete any round" on rounds;
create policy "admin can delete any round" on rounds for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- B. feedback author set server-side
-- ---------------------------------------------------------------------------
create or replace function public.set_feedback_author()
returns trigger language plpgsql security definer set search_path = public as $$
declare display_name text;
begin
  new.user_id := auth.uid();
  if auth.uid() is not null then
    select full_name into display_name from profiles where id = auth.uid();
  end if;
  new.user_name := coalesce(nullif(trim(display_name), ''), auth.email(), 'Ukjent bruker');
  new.message := left(new.message, 2000);
  return new;
end; $$;

drop trigger if exists feedback_set_author on feedback;
create trigger feedback_set_author
before insert on feedback
for each row execute function public.set_feedback_author();
