import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// mascot-ai.com is served from GitHub Pages at the apex domain.
// Sitemap is a hand-written public/sitemap.xml (only 7 stable URLs) rather than
// @astrojs/sitemap, which is version-incompatible with this Astro line.
export default defineConfig({
  site: 'https://mascot-ai.com',
  integrations: [tailwind()],
  build: { format: 'directory' },
});
