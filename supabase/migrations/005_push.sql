-- Web Push subscriptions and per-user notification preferences.
-- Each device that opts in writes one row here. The send-push Edge Function
-- reads these to dispatch native push messages.

create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  ua text,
  created_at timestamptz not null default now(),
  unique (user_id, endpoint)
);

create index if not exists push_subscriptions_user_idx on push_subscriptions (user_id);

alter table push_subscriptions enable row level security;

drop policy if exists "users manage own push subs" on push_subscriptions;
create policy "users manage own push subs"
on push_subscriptions
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Default push prefs: important types on, low-signal types off.
-- Stored on profiles so it survives device changes (per user, not per device).
alter table profiles
  add column if not exists push_prefs jsonb not null default jsonb_build_object(
    'enabled', true,
    'round_registered', true,
    'friend_request', true,
    'friend_accepted', true,
    'new_feedback', true,
    'badge_earned', false,
    'badge_lost', false,
    'course_record', false,
    'weekly_best', true
  );
