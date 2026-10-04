// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://anandkumarmall.github.io',
  base: process.env.ASTRO_BASE !== undefined ? process.env.ASTRO_BASE : '/docuverse',
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
      },
      manifest: {
        name: 'DocuVerse',
        short_name: 'DocuVerse',
        description: '100% Private, Free Online PDF and Image Tools',
        theme_color: '#141413',
        background_color: '#f6f5f4',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
});
