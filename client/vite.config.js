import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({

 plugins:[
   react(),
   tailwindcss(),
   VitePWA({
     // We already hand-author and link manifest.webmanifest in
     // index.html (it needs the apple-* meta tags alongside it for
     // iOS home-screen support anyway), so let this plugin focus on
     // generating and registering the service worker only.
     manifest: false,
     registerType: 'autoUpdate',
     includeAssets: ['favicon.svg', 'icons.svg', 'apple-touch-icon.png'],
     workbox: {
       // Cache the built app shell (JS/CSS/HTML/icons) so repeat visits
       // on mobile are instant and the app still loads with a flaky
       // connection. API calls to the backend are intentionally left
       // uncached — health data must always come from the network.
       globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
       navigateFallback: '/index.html',
       runtimeCaching: [
         {
           urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
           handler: 'NetworkOnly',
         },
       ],
     },
   }),
 ]

})