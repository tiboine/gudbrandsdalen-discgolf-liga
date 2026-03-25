import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Gudbrandsdalen Discgolf Liga',
        short_name: 'DG Liga',
        description: 'Ligaapp for discgolf i Gudbrandsdalen',
        theme_color: '#65A30D',
        background_color: '#f0f9e8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        lang: 'nb-NO',
        id: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
        screenshots: [
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', form_factor: 'narrow', label: 'Gudbrandsdalen Discgolf Liga' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'supabase-cache', expiration: { maxEntries: 50, maxAgeSeconds: 300 } },
          },
        ],
      },
    }),
  ],
})
