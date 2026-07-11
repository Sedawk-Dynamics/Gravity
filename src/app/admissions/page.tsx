import type { CSSProperties } from 'react';
import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import SectionHead from '@/components/SectionHead';
import EnquiryForm from '@/components/EnquiryForm';
import Icon from '@/components/Icon';
import { educationalOrganizationLd } from '@/data/jsonld';

export const metadata = buildMetadata({
  title: 'Admissions & Book a Demo',
  description:
    'Join Gravity Academy in four clear steps — enquire, get counselling, attend a free demo class, and enrol. Book your free demo today.',
  path: '/admissions',
});

// A genuine ordered sequence — the one place numbering is appropriate (§4).
const steps = [
  { title: 'Enquire', text: "Share your child's class, board and goals through the form or a quick call.", icon: 'mail' },
  { title: 'Counselling & assessment', text: 'A counsellor understands where your child stands and recommends the right track.', icon: 'users' },
  { title: 'Demo class', text: 'Sit in on a real, free demo class to see our concept-first teaching first-hand.', icon: 'lightbulb' },
  { title: 'Enrol', text: 'Pick a batch and schedule. Flexible fee and EMI options available.', icon: 'check' },
];

export default function AdmissionsPage() {
  return (
    <>
      <JsonLd data={[educationalOrganizationLd]} />

      <PageHeader
        eyebrow="Admissions"
        title="From enquiry to enrolment"
        intro="A clear, no-pressure process. Start with a free demo class — there's no commitment until you're sure."
      />

      {/* Process sequence (ordered) */}
      <Section tone="paper">
        <SectionHead eyebrow="How it works" title="Four steps to get started" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex flex-col rounded-card border border-mist bg-paper p-6 shadow-soft"
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-btn bg-navy text-white">
                  <Icon name={s.icon} size={20} />
                </span>
                <span className="font-mono text-display-md font-bold text-mist" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 font-display text-display-sm text-navy">{s.title}</h3>
              <p className="mt-1.5 text-slate">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Book a demo form */}
      <Section tone="paper-2">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div data-reveal>
            <SectionHead
              eyebrow="Book a free demo"
              title="Reserve your slot"
              intro="Tell us a little about your child and we'll set up a free demo class. A counsellor will call to confirm a time that works for you."
            />
            <ul className="mt-6 space-y-3">
              {['No payment required', 'A real class, not a sales pitch', 'Counsellor call within one working day'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-ink">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange text-navy">
                    <Icon name="check" size={16} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-mist bg-paper p-6 shadow-soft md:p-8" data-reveal>
            <EnquiryForm intent="demo" id="lead-form-demo" />
          </div>
        </div>
      </Section>
    </>
  );
}
