import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import SectionHead from '@/components/SectionHead';
import Button from '@/components/Button';
import DemoButton from '@/components/DemoButton';
import Icon from '@/components/Icon';
import { site } from '@/data/site';
import { programs } from '@/data/programs';
import {
  courses,
  methodology,
  studyMaterial,
  performanceTracking,
  learningOutcomes,
  learningModes,
  courseFaqs,
  courseCatalogUrl,
} from '@/data/courses';
import { educationalOrganizationLd, faqLd, breadcrumbLd, courseLd } from '@/data/jsonld';

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return {};
    return buildMetadata({
      title: course.name,
      description: `${course.name} at Gravity Academy — ${course.tagline} ${course.subjects}`,
      path: `/courses/${course.slug}`,
    });
  });
}

const structure = [
  { icon: 'clock', label: 'Duration', value: 'Full academic year, aligned to your board and target exam' },
  { icon: 'monitor', label: 'Mode', value: learningModes.join(' · ') },
  { icon: 'users', label: 'Batch', value: 'Small batches (typically 12–18) for individual attention' },
  { icon: 'target', label: 'Assessments', value: 'Weekly & monthly tests with detailed analysis' },
  { icon: 'lightbulb', label: 'Doubt sessions', value: 'Dedicated doubt-solving clinics every week' },
];

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const parent = programs.find((p) => p.slug === course.category);

  const breadcrumb = breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: course.name, path: `/courses/${course.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[educationalOrganizationLd, faqLd(courseFaqs), breadcrumb, courseLd(course)]} />

      <PageHeader eyebrow={`${course.series} · ${course.level}`} title={course.name} intro={course.tagline}>
        <div className="mt-8 flex flex-wrap gap-3">
          <DemoButton variant="primary" size="lg" icon="arrow-right">
            Book a free demo
          </DemoButton>
          <Button
            href={courseCatalogUrl(course.slug)}
            variant="ghost"
            size="lg"
            external
            className="!text-white !ring-white/40 hover:!bg-white/10"
          >
            View in catalog
          </Button>
        </div>
        {parent && (
          <p className="mt-5 text-sm text-mist">
            Part of{' '}
            <Link href={`/programs/${parent.slug}`} className="font-semibold text-white underline underline-offset-4 hover:text-orange">
              {parent.name}
            </Link>
          </p>
        )}
      </PageHeader>

      {/* Who / Why */}
      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-card border border-mist bg-paper-2 p-7 shadow-soft" data-reveal>
            <p className="eyebrow">Who should join</p>
            <p className="mt-3 text-lg text-ink">{course.audience}</p>
          </div>
          <div className="rounded-card border border-mist bg-paper-2 p-7 shadow-soft" data-reveal style={{ '--reveal-delay': '80ms' } as CSSProperties}>
            <p className="eyebrow">Why this programme</p>
            <p className="mt-3 text-lg text-ink">{course.why}</p>
          </div>
        </div>
      </Section>

      {/* Subjects & Curriculum */}
      <Section tone="paper-2">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHead eyebrow="Subjects & curriculum" title="What you'll study" />
          <p className="text-lg leading-relaxed text-ink" data-reveal>
            {course.subjects}
          </p>
        </div>
      </Section>

      {/* Course structure */}
      <Section tone="paper">
        <SectionHead eyebrow="Course structure" title="How the programme runs" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {structure.map((s, i) => (
            <div
              key={s.label}
              className="flex gap-4 rounded-card border border-mist bg-paper p-6 shadow-soft"
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-navy">
                <Icon name={s.icon} size={20} />
              </span>
              <div>
                <h3 className="font-display font-semibold text-navy">{s.label}</h3>
                <p className="mt-1 text-sm text-slate">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Learning methodology (ordered) */}
      <Section tone="navy">
        <SectionHead
          eyebrow="Learning methodology"
          title="A loop built for mastery"
          tone="dark"
          intro="Every topic moves through the same disciplined cycle — so understanding compounds instead of fading."
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {methodology.map((step, i) => (
            <li key={step} className="relative rounded-card bg-white/5 p-5 ring-1 ring-white/10" data-reveal style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}>
              <span className="font-mono text-sm text-orange">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 font-display font-semibold text-white">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Study material + Performance tracking + Outcomes */}
      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            { icon: 'flask-conical', title: 'Study material', items: studyMaterial },
            { icon: 'trending-up', title: 'Performance tracking', items: performanceTracking },
            { icon: 'award', title: 'Learning outcomes', items: learningOutcomes },
          ].map((col, i) => (
            <div key={col.title} className="rounded-card border border-mist bg-paper-2 p-6 shadow-soft" data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}>
              <span className="grid h-11 w-11 place-items-center rounded-btn bg-navy text-white">
                <Icon name={col.icon} size={20} />
              </span>
              <h3 className="mt-4 font-display text-display-sm text-navy">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-slate">
                    <Icon name="check" size={16} className="mt-1 shrink-0 text-orange" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs (native, accessible) */}
      <Section tone="paper-2">
        <SectionHead eyebrow="FAQs" title="Good to know" />
        <div className="mt-8 divide-y divide-mist rounded-card border border-mist bg-paper">
          {courseFaqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-display text-[1.02rem] font-semibold text-navy md:px-6">
                {f.q}
                <Icon name="chevron-down" size={20} className="shrink-0 text-slate transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-slate md:px-6">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy" className="relative overflow-hidden">
        <div className="grid-motif pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center" data-reveal>
          <h2 className="font-display text-display-lg text-white">Ready to begin {course.short}?</h2>
          <p className="mt-4 max-w-xl text-lg text-mist">
            Book a free demo, visit the campus, or talk to a counsellor — whatever helps you decide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DemoButton variant="primary" size="lg" icon="arrow-right">
              Book a free demo
            </DemoButton>
            <Button href="/contact" variant="ghost" size="lg" className="!text-white !ring-white/40 hover:!bg-white/10">
              Visit campus
            </Button>
            <Button href={site.phoneHref} variant="ghost" size="lg" className="!text-white !ring-white/40 hover:!bg-white/10">
              Talk to a counsellor
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
