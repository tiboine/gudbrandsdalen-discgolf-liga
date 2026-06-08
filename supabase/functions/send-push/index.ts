// Supabase Edge Function: send-push
// Triggered by the notifications-after-insert trigger via pg_net.
// Looks up the target user's push subscriptions + push_prefs, then dispatches
// a Web Push to each subscription using VAPID auth.
//
// Required secrets (set with `supabase secrets set` or in the dashboard):
//   VAPID_PUBLIC_KEY    - same as VITE_VAPID_PUBLIC_KEY on the client
//   VAPID_PRIVATE_KEY   - paired private key, kept server-side only
//   VAPID_SUBJECT       - e.g. "mailto:urbanthor@gmail.com"
//   SUPABASE_URL        - autoinjected by Supabase
//   SUPABASE_SERVICE_ROLE_KEY - autoinjected, used to read tables bypassing RLS

// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "https://esm.sh/web-push@3.6.7";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const vapidPublic = Deno.env.get("VAPID_PUBLIC_KEY")!;
const vapidPrivate = Deno.env.get("VAPID_PRIVATE_KEY")!;
const vapidSubject = Deno.env.get("VAPID_SUBJECT") || "mailto:urbanthor@gmail.com";

webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);

const admin = createClient(supabaseUrl, supabaseServiceKey);

// Map notification type → URL path to navigate to when clicked
const TYPE_TO_PATH: Record<string, string> = {
  badge_earned: "/badges",
  badge_lost: "/badges",
  course_record: "/baner",
  round_registered: "/runder",
  weekly_best: "/tabell",
  friend_request: "/venner",
  friend_accepted: "/venner",
  new_feedback: "/admin",
};

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    // Accept both direct calls ({notification_id: "..."}) and Database Webhook
    // payloads ({type: "INSERT", record: {id: "..."}, ...}).
    const notification_id = body.notification_id || body.record?.id;
    if (!notification_id) {
      return new Response(JSON.stringify({ error: "missing notification_id" }), { status: 400 });
    }

    // Load notification
    const { data: notification, error: nErr } = await admin
      .from("notifications")
      .select("id, user_id, type, title, body, data")
      .eq("id", notification_id)
      .single();
    if (nErr || !notification) {
      return new Response(JSON.stringify({ error: "notification not found" }), { status: 404 });
    }

    // Check prefs on the profile
    const { data: profile } = await admin
      .from("profiles")
      .select("push_prefs")
      .eq("id", notification.user_id)
      .single();
    const prefs = profile?.push_prefs || {};
    if (prefs.enabled === false || prefs[notification.type] === false) {
      return new Response(JSON.stringify({ skipped: "type disabled in prefs" }), { status: 200 });
    }

    // Load all subscriptions for this user
    const { data: subs } = await admin
      .from("push_subscriptions")
      .select("id, endpoint, p256dh, auth")
      .eq("user_id", notification.user_id);
    if (!subs || subs.length === 0) {
      return new Response(JSON.stringify({ sent: 0, reason: "no subscriptions" }), { status: 200 });
    }

    const payload = JSON.stringify({
      title: notification.title,
      body: notification.body,
      tag: `dg-${notification.type}-${notification.id}`,
      data: {
        notification_id: notification.id,
        type: notification.type,
        path: TYPE_TO_PATH[notification.type] || "/",
        ...(notification.data || {}),
      },
    });

    let sent = 0;
    const expired: string[] = [];
    for (const sub of subs) {
      const pushSub = {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      };
      try {
        await webpush.sendNotification(pushSub, payload);
        sent++;
      } catch (e: any) {
        if (e?.statusCode === 410 || e?.statusCode === 404) {
          expired.push(sub.id);
        } else {
          console.error("push failed for sub", sub.id, e?.statusCode, e?.message);
        }
      }
    }

    // Clean up expired subscriptions
    if (expired.length > 0) {
      await admin.from("push_subscriptions").delete().in("id", expired);
    }

    return new Response(JSON.stringify({ sent, expired: expired.length }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
});
