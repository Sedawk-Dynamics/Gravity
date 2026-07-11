import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Button from '@/components/Button';
import DemoButton from '@/components/DemoButton';
import DemoLink from '@/components/DemoLink';
import CTABand from '@/components/CTABand';
import Icon from '@/components/Icon';
import { getPrograms } from '@/data/programs';
import { educationalOrganizationLd } from '@/data/jsonld';

export const metadata = buildMetadata({
  title: 'Programs',
  description:
    "Explore Gravity Academy's six coaching tracks — Foundation, Test Prep, JEE, NEET, Olympiads and Subject Coaching — for Classes 6–12 in Bengaluru.",
  path: '/programs',
});

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <JsonLd data={[educationalOrganizationLd]} />

      <PageHeader
        eyebrow="Courses"
        title="Find the right track"
        intro="Six tracks built around concept mastery — from early foundations to competitive-exam intensity. Pick a track to explore its courses, batches and schedules."
      />

      <Section tone="paper">
        <div className="space-y-6">
          {programs.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="grid scroll-mt-28 gap-6 rounded-card border border-mist bg-paper p-6 shadow-soft md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:p-8"
              data-reveal
            >
              <span className="grid h-16 w-16 place-items-center rounded-card bg-mist text-navy">
                <Icon name={p.icon} size={30} />
              </span>

              <div>
                <h2 className="font-display text-display-md text-navy">{p.name}</h2>
                <p className="mt-1.5 text-lg text-slate">{p.tagline}</p>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow !text-slate">Who it&apos;s for</dt>
                    <dd className="mt-1 text-ink">{p.audience}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow !text-slate">Outcomes</dt>
                    <dd className="mt-1 text-ink">{p.outcomes}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="eyebrow !text-slate">What&apos;s covered</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {p.covers.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3 py-1 text-sm text-navy ring-1 ring-mist">
                          <Icon name="check" size={14} className="text-orange" /> {c}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-row gap-3 md:flex-col">
                <Button href={`/programs/${p.slug}`} variant="primary" icon="arrow-right">
                  View program
                </Button>
                <DemoButton variant="ghost">Book a demo</DemoButton>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 flex items-center gap-2 rounded-card bg-paper-2 p-4 text-sm text-slate ring-1 ring-mist">
          <Icon name="arrow-right" size={16} className="shrink-0 text-orange" />
          Each program opens onto its courses, batches and schedules. Prefer to talk it through?{' '}
          <DemoLink className="font-semibold text-navy underline underline-offset-4 hover:text-orange">Book a free demo.</DemoLink>
        </p>
      </Section>

      <CTABand
        title="Not sure which track fits?"
        text="Tell us your child's class and goals — a counsellor will recommend the right program in minutes."
      />
    </>
  );
}
