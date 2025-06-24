import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// No need to import tailwindcss plugin manually — Tailwind works via PostCSS
export default defineConfig({
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "./index.html",
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg", "pwa-192x192.png", "pwa-512x512.png"],
      manifest: {
        name: "Notes App",
        short_name: "Notes",
        description: "Offline-capable notes application",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
        globIgnores: ["**/node_modules/**/*", "**/sw.js", "**/workbox-*.js"],
      },
    }),
  ],
});
