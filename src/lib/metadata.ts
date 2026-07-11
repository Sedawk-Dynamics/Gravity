import type { Metadata } from 'next';
import { site } from '@/data/site';

interface Args {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

/**
 * Reproduces SEO.astro: canonical + OpenGraph/Twitter from site.url, and the
 * title rule — home (`/`) → "Name — Tagline", everything else → "Title · Name".
 * `metadataBase` (set in the root layout) resolves the relative OG image.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og-default.svg',
  noindex = false,
}: Args): Metadata {
  const fullTitle = path === '/' ? `${site.name} — ${site.tagline}` : `${title} · ${site.name}`;
  const canonical = new URL(path, site.url).href;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: fullTitle,
      description,
      url: canonical,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
