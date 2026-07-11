import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A stray package-lock.json in the user's home dir made Next infer the wrong
  // workspace root for file tracing. Pin it to this project.
  outputFileTracingRoot: __dirname,
  // The site uses plain <img> with root-absolute /public paths (logos, hero,
  // gallery, etc.). Keep Next's image optimizer out of the way so those resolve
  // 1:1 exactly as they did under Astro.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
