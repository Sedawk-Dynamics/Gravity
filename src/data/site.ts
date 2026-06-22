/**
 * Site-wide constants. Everything factual that needs replacing with real values
 * is marked {{ REPLACE: ... }} in the string so it's greppable before launch.
 */

/** Base URL of the separate WordPress/WooCommerce catalog (see §2 & §11).
 *  Either a path on the same domain (reverse-proxy setup) or a subdomain. */
export const WP_SHOP_BASE = import.meta.env.PUBLIC_WP_SHOP_BASE ?? 'https://gravityacademy.in/shop';

/** Feature flag: fetch live program data from the Woo Store API (§2.3).
 *  When false (default) or on failure, we render the local `programs.ts` list. */
export const USE_WP_API = (import.meta.env.PUBLIC_USE_WP_API ?? 'false') === 'true';

export const site = {
  name: 'Gravity Academy',
  kicker: 'Orbit', // small descriptor that sits above the wordmark — not a co-brand
  tagline: 'Build the concepts that hold everything together.',
  description:
    'Concept-first coaching for Classes 6–12 across CBSE, ICSE and State Board in Bengaluru — plus JEE, NEET and Olympiad foundations. Small batches, mentorship-driven, personalized.',
  url: 'https://gravityacademy.in',

  // Contact details (sample values — verify before launch).
  phone: '+91 98860 12345',
  phoneHref: 'tel:+919886012345',
  whatsapp: '919886012345', // digits only, with country code
  email: 'admissions@gravityacademy.in',

  address: {
    line1: '3rd Floor, Pinnacle Tower',
    line2: '100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pin: '560038',
    country: 'India',
  },

  // Indiranagar, Bengaluru.
  geo: { lat: 12.9719, lng: 77.6412 },
  mapEmbed:
    'https://www.google.com/maps?q=12.9719,77.6412&hl=en&z=15&output=embed',

  hours: [
    { days: 'Mon – Sat', time: '9:00 AM – 7:30 PM' },
    { days: 'Sunday', time: '10:00 AM – 2:00 PM (counselling only)' },
  ],

  social: {
    instagram: 'https://instagram.com/gravityacademy',
    youtube: 'https://youtube.com/@gravityacademyindia',
    facebook: 'https://facebook.com/gravityacademyblr',
    handles: ['@gravityacademy', '@gravityacademyindia', '@gravityacademyblr'],
  },

  boards: ['CBSE', 'ICSE', 'State Board'],
} as const;

export type Site = typeof site;
