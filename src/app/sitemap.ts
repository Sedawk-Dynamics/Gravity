import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { programs } from '@/data/programs';
import { courses } from '@/data/courses';

/** Replaces @astrojs/sitemap — lists every static route plus the program and
 *  course detail pages. Served at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const lastModified = new Date();

  const staticPaths = ['/about', '/programs', '/courses', '/admissions', '/contact', '/gallery', '/faq'];
  const programPaths = programs.map((p) => `/programs/${p.slug}`);
  const coursePaths = courses.map((c) => `/courses/${c.slug}`);

  return [
    { url: base, lastModified, changeFrequency: 'weekly' as const, priority: 1 },
    ...staticPaths.map((path) => ({ url: `${base}${path}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...[...programPaths, ...coursePaths].map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.64,
    })),
  ];
}
