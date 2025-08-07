import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Student Portal",
        short_name: "CSSP",
        description: "Concept School Student Portal",
        theme_color: "#0099cc",
        start_url: "/login",
        scope: "/",
        icons: [
          {
            src: "pwa-1.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-2.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-2.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        serviceworker: {
        src: "dist/sw.js", 
        scope: "/",
        type: "classic",     
      },
      },
      workbox: {
        navigateFallback: "/login",
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/dashboard") ||
              url.pathname.startsWith("/fees") ||
              url.pathname.startsWith("/examination") ||
              url.pathname.startsWith("/curriculums") ||
              url.pathname.startsWith("/school_fee") ||
              url.pathname.startsWith("/hostel_fee") ||
              url.pathname.startsWith("/transport_fee") ||
              url.pathname.startsWith("/time_table") ||
              url.pathname.startsWith("/profile_info") ,
            handler: "NetworkFirst",
            options: {
              cacheName: "dashboard-pages",
            },
          },
        ],
      },
    }),
  ],
  server: {
    historyApiFallback: true, 
  },
});
