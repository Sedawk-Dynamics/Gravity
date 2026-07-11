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
import CTABand from '@/components/CTABand';
import Icon from '@/components/Icon';
import { programs, programUrl } from '@/data/programs';
import { coursesByCategory } from '@/data/courses';
import { educationalOrganizationLd } from '@/data/jsonld';

export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const program = programs.find((p) => p.slug === slug);
    if (!program) return {};
    return buildMetadata({
      title: program.name,
      description: `${program.name} at Gravity Academy — ${program.tagline} ${program.outcomes}`,
      path: `/programs/${program.slug}`,
    });
  });
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const related = coursesByCategory(program.slug);

  return (
    <>
      <JsonLd data={[educationalOrganizationLd]} />

      <PageHeader eyebrow="Course track" title={program.name} intro={program.tagline}>
        <div className="mt-8 flex flex-wrap gap-3">
          <DemoButton variant="primary" size="lg" icon="arrow-right">
            Book a free demo
          </DemoButton>
          <Button
            href={programUrl(program.slug)}
            variant="ghost"
            size="lg"
            external
            className="!text-white !ring-white/40 hover:!bg-white/10"
          >
            View in catalog
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-card border border-mist bg-paper-2 p-6 shadow-soft" data-reveal>
            <span className="grid h-12 w-12 place-items-center rounded-btn bg-navy text-white">
              <Icon name="users" size={22} />
            </span>
            <h2 className="mt-4 font-display text-display-sm text-navy">Who it&apos;s for</h2>
            <p className="mt-2 text-slate">{program.audience}</p>
          </div>
          <div className="rounded-card border border-mist bg-paper-2 p-6 shadow-soft" data-reveal style={{ '--reveal-delay': '80ms' } as CSSProperties}>
            <span className="grid h-12 w-12 place-items-center rounded-btn bg-navy text-white">
              <Icon name="trending-up" size={22} />
            </span>
            <h2 className="mt-4 font-display text-display-sm text-navy">Outcomes</h2>
            <p className="mt-2 text-slate">{program.outcomes}</p>
          </div>
          <div className="rounded-card border border-mist bg-paper-2 p-6 shadow-soft" data-reveal style={{ '--reveal-delay': '160ms' } as CSSProperties}>
            <span className="grid h-12 w-12 place-items-center rounded-btn bg-navy text-white">
              <Icon name={program.icon} size={22} />
            </span>
            <h2 className="mt-4 font-display text-display-sm text-navy">What&apos;s covered</h2>
            <ul className="mt-3 space-y-2">
              {program.covers.map((c) => (
                <li key={c} className="flex items-start gap-2 text-ink">
                  <Icon name="check" size={16} className="mt-1 shrink-0 text-orange" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="paper-2">
          <SectionHead
            eyebrow="Courses in this program"
            title="Choose your batch"
            intro="Each course runs offline, online-live or hybrid, with small batches and regular assessments."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="group flex flex-col rounded-card border border-mist bg-paper p-6 shadow-soft transition-all duration-300 ease-fall hover:-translate-y-1 hover:shadow-lift"
                data-reveal
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-btn bg-mist text-navy transition-colors group-hover:bg-orange group-hover:text-navy">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wide text-slate">{c.level}</span>
                </div>
                <h3 className="mt-4 font-display text-display-sm text-navy">{c.short}</h3>
                <p className="mt-1.5 flex-1 text-sm text-slate">{c.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-navy group-hover:text-orange">
                  View course <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTABand
        title={`Ready to explore ${program.name}?`}
        text="Book a free demo class and see our concept-first teaching in action — no commitment."
      />
    </>
  );
}
