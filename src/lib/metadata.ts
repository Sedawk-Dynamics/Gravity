import type { Metadata } from 'next';
import { site } from '@/data/site';

/** Twitter/X handle (also used for og). Update if the brand handle changes. */
const TWITTER_HANDLE = '@gogravity_';

interface Args {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

/**
 * Per-page metadata. Title rule: home (`/`) → "Name — Tagline"; everything else →
 * "Title · Name". Emits canonical + rich OpenGraph/Twitter (1200×630 PNG so link
 * previews actually render on Facebook/LinkedIn/WhatsApp/X) and robots directives.
 * `metadataBase` (root layout) resolves the relative OG image to an absolute URL.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og-default.png',
  noindex = false,
}: Args): Metadata {
  const fullTitle = path === '/' ? `${site.name} — ${site.tagline}` : `${title} · ${site.name}`;
  const canonical = new URL(path, site.url).href;

  return {
    // `absolute` so the root layout's title template isn't appended (buildMetadata
    // already produces the complete "… · Gravity Academy" / home title).
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: fullTitle,
      description,
      url: canonical,
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
