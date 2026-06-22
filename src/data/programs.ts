import { WP_SHOP_BASE, USE_WP_API } from './site';

/** A program category. `slug` doubles as the WordPress catalog category path so
 *  every "View program" / "Enrol" CTA deep-links into the matching Woo URL. */
export interface Program {
  id: string;
  slug: string;
  name: string;
  /** One-line descriptor for cards and the mega-menu. */
  tagline: string;
  /** Who it's for. */
  audience: string;
  /** What the program covers — short bullet phrases. */
  covers: string[];
  /** Outcomes a parent/student should expect. */
  outcomes: string;
  /** Lucide icon name (rendered via lucide-static). */
  icon: string;
}

export const programs: Program[] = [
  {
    id: 'foundation',
    slug: 'foundation',
    name: 'Foundation (VI–X)',
    tagline: 'Concept-first grounding in Science, Maths and English.',
    audience: 'Students in Classes 6 to 10, across CBSE, ICSE and State Board.',
    covers: ['Core PCMB & languages', 'Board-aligned syllabus', 'Critical-thinking builders', 'Early olympiad exposure'],
    outcomes: 'Strong fundamentals, study discipline, and the confidence to handle senior-school rigour.',
    icon: 'atom',
  },
  {
    id: 'test-prep',
    slug: 'test-prep',
    name: 'Test Prep (XI–XII)',
    tagline: 'Board excellence with an entrance-exam edge.',
    audience: 'Students in Classes 11 and 12 balancing boards with competitive prep.',
    covers: ['Full board syllabus', 'Application-led problem sets', 'Timed mock papers', 'Doubt-clearing clinics'],
    outcomes: 'High board scores without sacrificing entrance-exam readiness.',
    icon: 'target',
  },
  {
    id: 'jee-foundation',
    slug: 'jee-foundation',
    name: 'JEE Foundation',
    tagline: 'Engineering aspirants, built from the ground up.',
    audience: 'Students aiming for JEE Main & Advanced, starting as early as Class 9.',
    covers: ['Physics, Chemistry, Maths depth', 'Conceptual derivations', 'Previous-year analysis', 'Rank-tracking tests'],
    outcomes: 'A long-runway, no-shortcuts path toward competitive engineering ranks.',
    icon: 'rocket',
  },
  {
    id: 'neet-foundation',
    slug: 'neet-foundation',
    name: 'NEET Foundation',
    tagline: 'Medical aspirants, grounded in biology and beyond.',
    audience: 'Students targeting NEET, with early or two-year intensive tracks.',
    covers: ['Physics, Chemistry, Biology', 'NCERT-deep coverage', 'High-yield revision', 'Full-length mocks'],
    outcomes: 'Exam-ready command of NEET concepts with steady, measured progress.',
    icon: 'stethoscope',
  },
  {
    id: 'olympiads',
    slug: 'olympiads',
    name: 'Olympiads',
    tagline: 'For students who want to go deeper than the syllabus.',
    audience: 'Curious, high-aptitude students across Classes 6 to 12.',
    covers: ['NSO / IMO / NSEP track', 'Problem-solving intensives', 'Proof & reasoning skills', 'Past-paper drills'],
    outcomes: 'Sharper reasoning and a genuine taste for problems beyond the textbook.',
    icon: 'medal',
  },
  {
    id: 'subject-coaching',
    slug: 'subject-coaching',
    name: 'Subject Coaching (PCM / PCB)',
    tagline: 'Focused help where it matters most.',
    audience: 'Students who need targeted depth in specific science streams.',
    covers: ['PCM or PCB combinations', 'Personalized pacing', 'Concept repair', 'Practical & numerical focus'],
    outcomes: 'Gaps closed and weak subjects turned into strengths.',
    icon: 'flask-conical',
  },
];

/** Build the deep-link into the WordPress catalog for a program. */
export const programUrl = (slug: string): string =>
  `${WP_SHOP_BASE.replace(/\/$/, '')}/product-category/${slug}`;

/**
 * Returns programs to render. When USE_WP_API is on (§2.3), attempts the public
 * WooCommerce Store API at build time and maps the response onto our local list
 * by slug (so icons/audience copy are preserved). ALWAYS falls back to the local
 * list on any error — it never blocks the build or drops the section. Because
 * this runs server-side at build, CORS doesn't apply; the live frontend stays
 * fully static.
 */
export async function getPrograms(): Promise<Program[]> {
  if (!USE_WP_API) return programs;
  try {
    const url = `${WP_SHOP_BASE.replace(/\/$/, '')}/wp-json/wc/store/products?per_page=24`;
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return programs;
    const wc = (await res.json()) as Array<{ slug: string; name: string; short_description?: string }>;
    if (!Array.isArray(wc) || wc.length === 0) return programs;

    // Merge: keep local design metadata, override copy from Woo where slugs match.
    return programs.map((local) => {
      const match = wc.find((p) => p.slug === local.slug);
      if (!match) return local;
      const tagline = (match.short_description ?? '').replace(/<[^>]+>/g, '').trim();
      return { ...local, name: match.name || local.name, tagline: tagline || local.tagline };
    });
  } catch {
    return programs; // network/CORS/timeout — silent, graceful fallback
  }
}
