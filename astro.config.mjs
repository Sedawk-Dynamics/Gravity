import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// Pages are statically pre-rendered by default; the enquiry API route opts into
// on-demand server rendering via `export const prerender = false`. The node
// adapter is what lets that single endpoint run server-side validation + email.
export default defineConfig({
  site: 'https://gravityacademy.in',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
