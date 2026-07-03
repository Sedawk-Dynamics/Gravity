/**
 * Site-wide constants — real Gravity Academy details supplied by the client.
 */

/** Base URL of the separate WordPress/WooCommerce catalog (see §2 & §11).
 *  Either a path on the same domain (reverse-proxy setup) or a subdomain. */
export const WP_SHOP_BASE = import.meta.env.PUBLIC_WP_SHOP_BASE ?? 'https://www.gogravity.in/shop';

/** Feature flag: fetch live program data from the Woo Store API (§2.3).
 *  When false (default) or on failure, we render the local `programs.ts` list. */
export const USE_WP_API = (import.meta.env.PUBLIC_USE_WP_API ?? 'false') === 'true';

export const site = {
  name: 'Gravity Academy',
  kicker: 'Orbit',
  tagline: 'Building strong foundations. Creating bright futures.',
  description:
    'Gravity Academy is an outcome-focused coaching institute in Maragondanahalli, KR Puram, Bengaluru for Grades 6–12 — CBSE, ICSE, Karnataka State Board, Foundation, JEE, NEET UG and KCET. Concept-first teaching, small batches, personal mentoring.',
  url: 'https://www.gogravity.in',

  // Contact details.
  phone: '+91 79960 49555',
  phoneHref: 'tel:+917996049555',
  phone2: '+91 78893 62386',
  phone2Href: 'tel:+917889362386',
  whatsapp: '917996049555', // digits only, with country code
  email: 'info@gogravity.in',

  address: {
    line1: 'Achyutha Arcade, Near New Baldwin International School',
    line2: 'Maragondanahalli, KR Puram',
    city: 'Bengaluru',
    state: 'Karnataka',
    pin: '560036',
    country: 'India',
  },

  // Maragondanahalli, KR Puram, Bengaluru.
  geo: { lat: 13.0281, lng: 77.7080 },
  mapEmbed:
    'https://www.google.com/maps?q=Maragondanahalli+KR+Puram+Bengaluru&hl=en&z=15&output=embed',

  hours: [
    { days: 'Mon – Sat', time: '9:00 AM – 7:30 PM' },
    { days: 'Sunday', time: '10:00 AM – 2:00 PM (counselling only)' },
  ],

  social: {
    instagram: 'https://instagram.com/gravityacademy',
    youtube: 'https://youtube.com/@gravityacademy',
    facebook: 'https://facebook.com/gravityacademy',
    handles: ['@gravityacademy'],
  },

  boards: ['CBSE', 'ICSE', 'State Board'],
  exams: ['JEE Main', 'NEET UG', 'KCET'],
} as const;

export type Site = typeof site;
