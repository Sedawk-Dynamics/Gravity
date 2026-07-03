import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Pages are statically pre-rendered by default; the enquiry API route opts into
// on-demand rendering via `export const prerender = false`, which the Vercel
// adapter deploys as a serverless function. Everything else ships as static CDN
// assets. (Swap `vercel()` for another adapter if you self-host — see README §11.)
export default defineConfig({
  site: 'https://www.gogravity.in',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
