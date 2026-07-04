// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import alpinejs from "@astrojs/alpinejs";

import remarkInternalLinks from "./src/utils/remark-internal-links";

// https://astro.build/config
export default defineConfig({
    vite: {
        server: {
            allowedHosts: ["easynote", "easynote.local"],
        },
        plugins: [tailwindcss()],
    },

    integrations: [alpinejs()],

    markdown: {
        remarkPlugins: [remarkInternalLinks],
        gfm: true, // Ensures GitHub Flavored Markdown parses our cleaned footnotes correctly
    },
});
