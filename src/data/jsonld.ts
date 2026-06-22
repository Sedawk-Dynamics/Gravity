import { site } from './site';

const sameAs = [site.social.instagram, site.social.youtube, site.social.facebook];

const address = {
  '@type': 'PostalAddress',
  streetAddress: `${site.address.line1}, ${site.address.line2}`,
  addressLocality: site.address.city,
  addressRegion: site.address.state,
  postalCode: site.address.pin,
  addressCountry: 'IN',
};

export const educationalOrganizationLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: site.name,
  url: site.url,
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
  image: `${site.url}/og-default.svg`,
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
