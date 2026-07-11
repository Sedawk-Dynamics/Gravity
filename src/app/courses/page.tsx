import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import CTABand from '@/components/CTABand';
import Icon from '@/components/Icon';
import { courses, courseSeries, learningModes } from '@/data/courses';
import { educationalOrganizationLd } from '@/data/jsonld';

export const metadata = buildMetadata({
  title: 'Courses',
  description:
    'Every Gravity Academy course — Foundation (Grades 6–8), Board Excellence (9–10), Grades 11–12 (PCM/PCB/PCMB), NEET, JEE Main, KCET and crash courses. Offline, online-live and hybrid.',
  path: '/courses',
});

const seriesBlurb: Record<string, string> = {
  LaunchPad: 'Foundation programmes for Grades 6–8 — build concepts, reasoning and study habits early.',
  Accelerate: 'Board excellence for Grades 9–10 across CBSE and ICSE, with a competitive-exam edge.',
  Elevate: 'Grades 11–12 — boards plus JEE, NEET and KCET across PCM, PCB and PCMB.',
  MedEdge: 'Focused NEET UG preparation, in one-year and two-year tracks.',
  TechEdge: 'Concept-first JEE Main preparation built on real problem solving.',
  'Karnataka Edge': 'Dedicated KCET preparation aligned to the Karnataka State Board.',
  'Rapid Revision': 'High-intensity crash courses to peak right before the exams.',
};

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={[educationalOrganizationLd]} />

      <PageHeader
        eyebrow="Courses"
        title="Every course, one clear path"
        intro="From Grade 6 foundations to NEET, JEE and KCET — pick the exact programme for your class, board and goal. All available offline, online-live or hybrid."
      />

      <Section tone="paper">
        <div className="mb-10 flex flex-wrap gap-2" data-reveal>
          {learningModes.map((m) => (
            <span key={m} className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3 py-1.5 text-sm font-medium text-navy ring-1 ring-mist">
              <Icon name="check" size={14} className="text-orange" /> {m}
            </span>
          ))}
        </div>

        <div className="space-y-14">
          {courseSeries.map((series) => {
            const group = courses.filter((c) => c.series === series);
            if (group.length === 0) return null;
            return (
              <div key={series} data-reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-mist pb-4">
                  <h2 className="font-display text-display-md text-navy">{series}</h2>
                  <p className="max-w-xl text-sm text-slate">{seriesBlurb[series]}</p>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/courses/${c.slug}`}
                      className="group flex flex-col rounded-card border border-mist bg-paper p-6 shadow-soft transition-all duration-300 ease-fall hover:-translate-y-1 hover:shadow-lift"
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
              </div>
            );
          })}
        </div>
      </Section>

      <CTABand
        title="Not sure which course fits?"
        text="Tell us your child's class, board and goal — a counsellor will recommend the right course in minutes."
      />
    </>
  );
}
