-- Triggers an HTTP call to the send-push Edge Function whenever a row is
-- inserted into notifications. Requires the pg_net extension which is
-- available on Supabase but must be enabled in the database dashboard:
--   Dashboard → Database → Extensions → search "pg_net" → enable.
--
-- Also requires these app settings to be configured:
--   - app.settings.supabase_url    (e.g. https://abcd1234.supabase.co)
--   - app.settings.functions_url   (e.g. https://abcd1234.functions.supabase.co)
--   - app.settings.anon_key        (the anon JWT used to invoke the function)
--
-- Set them with:
--   ALTER DATABASE postgres SET app.settings.supabase_url = '...';
--   ALTER DATABASE postgres SET app.settings.functions_url = '...';
--   ALTER DATABASE postgres SET app.settings.anon_key = '...';
-- (or set as project secrets - see comments in 005_push.sql).

create or replace function notify_push_on_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  functions_url text;
  anon_key text;
begin
  functions_url := current_setting('app.settings.functions_url', true);
  anon_key := current_setting('app.settings.anon_key', true);
  if functions_url is null or anon_key is null then
    -- Settings not configured yet — silently skip so we don't block insert
    return new;
  end if;

  perform net.http_post(
    url := functions_url || '/send-push',
    headers := jsonb_build_object(
      'content-type', 'application/json',
      'authorization', 'Bearer ' || anon_key
    ),
    body := jsonb_build_object('notification_id', new.id)
  );

  return new;
end;
$$;

drop trigger if exists notification_push_dispatch on notifications;

create trigger notification_push_dispatch
after insert on notifications
for each row
execute function notify_push_on_notification();
