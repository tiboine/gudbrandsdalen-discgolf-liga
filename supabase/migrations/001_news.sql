-- News table for in-app announcements
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  important boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

create index if not exists news_created_at_idx on news (created_at desc);

alter table news enable row level security;

-- Anyone (logged-in or not) can read news
drop policy if exists "anyone can read news" on news;
create policy "anyone can read news" on news for select using (true);

-- Only admin emails can insert/update/delete. Add more emails to the IN-list as needed.
drop policy if exists "admin can insert news" on news;
create policy "admin can insert news" on news for insert with check (
  auth.email() in ('urbanthor@gmail.com')
);

drop policy if exists "admin can update news" on news;
create policy "admin can update news" on news for update using (
  auth.email() in ('urbanthor@gmail.com')
);

drop policy if exists "admin can delete news" on news;
create policy "admin can delete news" on news for delete using (
  auth.email() in ('urbanthor@gmail.com')
);
