import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png',
          'Images/adomi-bridge-hero.jpg',
          'Images/hero-schools.jpg',
          'Images/ghana-attractions-bg.jpg',
          'Images/ghana-stay-bg.jpg',
          'Images/ghana-dining-bg.jpg',
          'Images/ghana-business-bg.jpg',
          'Images/ghana-events-bg.jpg',
        ],
        manifest: {
          name: 'Asuogyaman Tourism & Business Hub',
          short_name: 'ATBH',
          description: 'Explore the beauty, culture, and adventure of Asuogyaman - your gateway to the Volta Region',
          theme_color: '#1A1A1A',
          background_color: '#FDFBF7',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,woff,woff2,ico}'],
          // Images excluded from precaching — handled by runtime CacheFirst strategy below
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: /^https?:\/\/.*\/api\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24,
                },
                networkTimeoutSeconds: 10,
              },
            },
            {
              urlPattern: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|ico|avif)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'image-cache',
                expiration: {
                  maxEntries: 500,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
            {
              urlPattern: /^(https:)?\/\/www\.googletagmanager\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^(https:)?\/\/www\.google-analytics\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https?:\/\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'page-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24,
                },
                networkTimeoutSeconds: 5,
              },
            },
          ],
        },
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          manualChunks: {
            'vendor-motion': ['motion'],
            'vendor-icons': ['lucide-react'],
            'vendor-leaflet': ['leaflet', 'react-leaflet'],
            'vendor-clerk': ['@clerk/react'],
            'vendor-panorama': ['@photo-sphere-viewer/core'],
            'vendor-charts': ['recharts'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  };
});
