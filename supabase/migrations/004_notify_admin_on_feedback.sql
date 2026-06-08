-- Auto-notify admin when a user submits feedback.
-- Inserts a row into notifications targeting the admin user so the bell-icon
-- badge updates immediately. The trigger runs SECURITY DEFINER so it bypasses
-- RLS on the notifications table.
--
-- Add more admin emails to the IN-list as needed.

create or replace function notify_admin_on_feedback()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_id uuid;
  preview text;
begin
  preview := substring(new.message from 1 for 80);
  if length(new.message) > 80 then
    preview := preview || '…';
  end if;

  for admin_id in
    select id from auth.users where email in ('urbanthor@gmail.com')
  loop
    insert into notifications (user_id, type, title, body, read, data)
    values (
      admin_id,
      'new_feedback',
      'Ny tilbakemelding 💬',
      coalesce(new.user_name, 'Ukjent bruker') || ': ' || preview,
      false,
      jsonb_build_object('feedback_id', new.id, 'from_user_id', new.user_id)
    );
  end loop;

  return new;
end;
$$;

drop trigger if exists feedback_notify_admin on feedback;

create trigger feedback_notify_admin
after insert on feedback
for each row
execute function notify_admin_on_feedback();
