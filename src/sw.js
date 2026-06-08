// Custom service worker for the discgolf league PWA.
// Workbox handles precaching of the built assets, runtime caching for Supabase
// API calls, and we add native Web Push handlers on top.
//
// This file is consumed by vite-plugin-pwa in `injectManifest` mode — the
// `self.__WB_MANIFEST` placeholder is replaced at build time with the list of
// assets to precache.

import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

self.skipWaiting();
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

// Cache Supabase REST requests with NetworkFirst so offline-ish reads still work.
registerRoute(
  ({ url }) => /\.supabase\.co\//i.test(url.href),
  new NetworkFirst({
    cacheName: "supabase-cache",
    plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 300 })],
  })
);

// ---- Web Push handlers ----

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { title: "Gudbrandsdalen Discgolf Liga", body: event.data?.text() || "" };
  }
  const title = payload.title || "Ny varsling";
  const body = payload.body || "";
  const tag = payload.tag || `dg-${Date.now()}`;
  const data = payload.data || {};

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag,
      renotify: false,
      data,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetPath = event.notification.data?.path || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.focus();
          if (targetPath && targetPath !== "/") {
            client.postMessage({ type: "navigate", path: targetPath });
          }
          return;
        }
      }
      return self.clients.openWindow(targetPath);
    })
  );
});
