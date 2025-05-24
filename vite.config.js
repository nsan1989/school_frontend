import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Student Portal',
        short_name: 'SASP',
        description: 'St.Anthony Student Portal',
        theme_color: '#004d00',
        icons: [
          {
            src: 'pwa-1.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-2.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-2.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
