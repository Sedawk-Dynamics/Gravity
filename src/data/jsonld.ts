import { site } from './site';

const sameAs = [site.social.instagram, site.social.x, site.social.facebook, site.social.linkedin];

const address = {
  '@type': 'PostalAddress',
  streetAddress: `${site.address.line1}, ${site.address.line2}`,
  addressLocality: site.address.city,
  addressRegion: site.address.state,
  postalCode: site.address.pin,
  addressCountry: 'IN',
};

/** Stable node id so Person/Course/LocalBusiness entities all resolve to the
 *  same organization in Google's knowledge graph. */
const ORG_ID = `${site.url}/#organization`;

export const educationalOrganizationLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: site.name,
  url: site.url,
  // Raster formats only — Google Images ignores SVG for logo/image properties.
  logo: `${site.url}/icon-512.png`,
  image: `${site.url}/og-default.png`,
  description: site.description,
  telephone: site.phoneHref.replace('tel:', ''),
  email: site.email,
  address,
  sameAs,
};

export const localBusinessLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#localbusiness`,
  name: site.name,
  image: `${site.url}/og-default.png`,
  url: site.url,
  telephone: site.phoneHref.replace('tel:', ''),
  email: site.email,
  priceRange: '₹₹',
  address,
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:30',
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '14:00' },
  ],
  sameAs,
};

export const faqLd = (faqs: { q: string; a: string }[]): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

/** Founder Person entity (about page) — surfaces "Ankush Koul" queries and ties
 *  his credentials to the organization node. */
export const founderPersonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ankush Koul',
  jobTitle: 'Founder & Academic Director',
  url: `${site.url}/about`,
  worksFor: { '@id': ORG_ID },
  alumniOf: 'M.Tech (Microelectronics)',
  knowsAbout: ['Physics', 'JEE preparation', 'NEET preparation', 'Academic mentoring'],
  description:
    'Physics educator and academic mentor with 14+ years of teaching experience; has mentored national rank holders including AIR 1 in NEET and AIR 5 in AIIMS.',
};

/** Site-level WebSite entity (home page). */
export const webSiteLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  inLanguage: 'en-IN',
  publisher: { '@type': 'EducationalOrganization', name: site.name, url: site.url },
};

/** Breadcrumb trail for a nested page. */
export const breadcrumbLd = (items: { name: string; path: string }[]): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: new URL(it.path, site.url).href,
  })),
});

/** schema.org/Course for a course detail page. */
export const courseLd = (c: { name: string; slug: string; tagline: string; subjects: string }): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: c.name,
  description: `${c.tagline} ${c.subjects}`,
  url: `${site.url}/courses/${c.slug}`,
  inLanguage: 'en-IN',
  provider: { '@type': 'EducationalOrganization', '@id': ORG_ID, name: site.name, url: site.url, sameAs },
  // Google's Course rich results require `offers` (category is the only
  // mandatory field; fees vary by batch so no fixed price is published).
  offers: { '@type': 'Offer', category: 'Paid', priceCurrency: 'INR' },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: ['Onsite', 'Online', 'Blended'],
    location: { '@type': 'Place', name: site.name, address },
  },
});
