// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      allowedHosts: ["easynote", "easynote.local"],
    },
    plugins: [tailwindcss()],
  },

  integrations: [alpinejs()],
});