import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update service worker
      manifest: {
        name: 'Cngen Services',
        short_name: 'Cngen',
        description:
          'Cngen services include multiple services like car wash bike wash',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // Make app installable like a native app
        start_url: '/',
        icons: [
          {
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Optional: Customize the service worker behavior
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api\.com\/.*$/,
            handler: 'NetworkFirst', // Customize as per your app requirements
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400, // 1 day
              },
            },
          },
        ],
      },
    }),
  ],
});
