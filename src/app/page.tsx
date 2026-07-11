import type { CSSProperties } from 'react';
import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Section from '@/components/Section';
import SectionHead from '@/components/SectionHead';
import Button from '@/components/Button';
import HeroBanners from '@/components/HeroBanners';
import ImageMarquee from '@/components/ImageMarquee';
import ProgramCard from '@/components/ProgramCard';
import StatCard from '@/components/StatCard';
import TopperCard from '@/components/TopperCard';
import TestimonialCard from '@/components/TestimonialCard';
import CTABand from '@/components/CTABand';
import Icon from '@/components/Icon';
import { site } from '@/data/site';
import { getPrograms } from '@/data/programs';
import { toppers } from '@/data/toppers';
import { testimonials } from '@/data/testimonials';
import { educationalOrganizationLd, localBusinessLd, webSiteLd } from '@/data/jsonld';

export const metadata = buildMetadata({ title: 'Home', description: site.description, path: '/' });

const why = [
  { icon: 'users', title: 'Small batches', text: "Capped enrolment so every mentor knows each student's strengths and gaps." },
  { icon: 'lightbulb', title: 'Concept-first teaching', text: 'We build understanding from first principles — no rote, no shortcuts.' },
  { icon: 'graduation-cap', title: 'Personalized mentoring', text: 'One-to-one guidance that adapts to how each student learns.' },
  { icon: 'monitor', title: 'Hybrid learning', text: 'Learn your way — offline classroom, online-live, or a hybrid of both.' },
  { icon: 'trending-up', title: 'Student performance tracking', text: 'Regular tests, PTMs and progress updates so every student — and their family — always knows exactly where they stand.' },
];

// Client-supplied headline numbers.
const stats = [
  { value: 1000, suffix: '+', label: 'Students mentored' },
  { value: 50, suffix: '+', label: 'Years of collective teaching experience' },
  { value: 14, suffix: '+', label: 'Years of founder teaching experience' },
  { value: 18, suffix: '', label: 'Courses across Grades 6–12' },
];

const galleryStrip = [
  { src: '/gallery/students-founder.jpg', alt: 'Gravity Academy students with the founder' },
  { src: '/founder/aarambh.jpg', alt: 'Founder Ankush Koul addressing the Aarambh 2026 event' },
  { src: '/gallery/parent-orientation.jpg', alt: 'Parents at a Gravity Academy orientation' },
  { src: '/gallery/event-audience.jpg', alt: 'Guests and families at a Gravity Academy event' },
  { src: '/founder/milestones.jpg', alt: "Founder presenting the academy's milestones of growth" },
];

export default async function HomePage() {
  const programs = await getPrograms();
  // Toppers duplicated for the seamless auto-scroll.
  const topperLoop = [...toppers, ...toppers];

  return (
    <>
      <JsonLd data={[educationalOrganizationLd, localBusinessLd, webSiteLd]} />

      {/* SEO/a11y H1 — the hero is client-supplied banner imagery, so the page's
          primary heading lives here (visually hidden, keyword-rich). */}
      <h1 className="sr-only">
        Gravity Academy — concept-first coaching for Classes 6–12 in Bengaluru: CBSE, ICSE, State Board, JEE, NEET UG and KCET
      </h1>

      {/* 1. HERO — three auto-rotating banners */}
      <HeroBanners />

      {/* 2. TRUST STRIP */}
      <div className="border-y border-mist bg-paper-2">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-5 text-center sm:gap-x-8">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate">Aligned with</span>
          {site.boards.map((b) => (
            <span key={b} className="font-display text-sm font-semibold text-navy">
              {b}
            </span>
          ))}
          <span className="font-display text-sm font-semibold text-navy">JEE · NEET UG · KCET</span>
        </div>
      </div>

      {/* 3. RESULTS SLIDER */}
      <Section id="results" tone="paper">
        <SectionHead
          eyebrow="Results"
          title="Scores our students are proud of"
          intro="A snapshot of what our students achieved across CBSE and ICSE — concept mastery, turned into marks."
          align="center"
        />
        <div className="gv-marquee group relative mt-10" style={{ '--gv-speed': '46s' } as CSSProperties} data-reveal>
          <div className="gv-marquee-track gap-5">
            {topperLoop.map((t, i) => (
              <div key={i} className="w-56 shrink-0" aria-hidden={i >= toppers.length ? 'true' : undefined}>
                <TopperCard topper={t} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-paper to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-paper to-transparent sm:w-16" />
        </div>
      </Section>

      {/* 4. COURSE TRACKS */}
      <Section tone="paper-2">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow="Courses"
            title="Six tracks, one disciplined ecosystem"
            intro="Every course is built around concept mastery first, then exam technique — so progress compounds instead of cramming."
            className="!max-w-2xl"
          />
          <Button href="/courses" variant="ghost" icon="arrow-right" className="hidden sm:inline-flex">
            All courses
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <div key={p.slug} data-reveal style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as CSSProperties}>
              <ProgramCard program={p} />
            </div>
          ))}
        </div>
      </Section>

      {/* 4. STATS BAND */}
      <Section tone="navy">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead
            eyebrow="By the numbers"
            title="Outcomes that earn parent trust"
            intro="A disciplined, mentorship-driven system led by a mentor with a national track record."
            tone="dark"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} data-reveal className="h-full">
                <StatCard value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. WHY GRAVITY */}
      <Section tone="paper-2">
        <SectionHead eyebrow="Why Gravity" title="What makes the difference" />
        {/* 6-col grid: first 3 cards span 2 (≈33%), last 2 span 3 (50%) on desktop. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {why.map((w, i) => (
            <div
              key={w.title}
              className={`flex gap-4 rounded-card border border-mist bg-paper p-6 shadow-soft ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
              data-reveal
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-navy">
                <Icon name={w.icon} size={22} />
              </span>
              <div>
                <h3 className="font-display text-display-sm text-navy">{w.title}</h3>
                <p className="mt-1.5 text-slate">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. INSIDE GRAVITY — auto-scrolling image strip */}
      <Section tone="paper">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Inside Gravity" title="Life at the academy" className="!max-w-xl" />
          <Button href="/gallery" variant="ghost" icon="arrow-right" className="hidden sm:inline-flex">
            View gallery
          </Button>
        </div>
        <div className="mt-10" data-reveal>
          <ImageMarquee images={galleryStrip} speed={45} />
        </div>
      </Section>

      {/* 8. TESTIMONIALS */}
      <Section tone="paper-2">
        <SectionHead eyebrow="In their words" title="What parents and students say" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div key={t.id} data-reveal>
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </Section>

      {/* 9. CTA BAND */}
      <CTABand />
    </>
  );
}
