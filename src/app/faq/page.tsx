import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Accordion from '@/components/Accordion';
import DemoButton from '@/components/DemoButton';
import Icon from '@/components/Icon';
import { faqs } from '@/data/faqs';
import { site } from '@/data/site';
import { educationalOrganizationLd, faqLd } from '@/data/jsonld';

export const metadata = buildMetadata({
  title: 'FAQ',
  description:
    'Answers on batch sizes, fees and EMI, free demo classes, boards covered, online vs offline, results and our Bengaluru centre.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[educationalOrganizationLd, faqLd(faqs)]} />

      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered plainly"
        intro="The things parents and students ask us most. Still unsure about something? Call us or book a demo — we're happy to talk it through."
      />

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div data-reveal>
            <Accordion />
          </div>

          <aside className="rounded-card border border-mist bg-paper-2 p-6 shadow-soft lg:sticky lg:top-28" data-reveal>
            <h2 className="font-display text-display-sm text-navy">Still have a question?</h2>
            <p className="mt-2 text-slate">Talk to a counsellor — no scripts, no pressure.</p>
            <div className="mt-5 space-y-3">
              <DemoButton variant="primary" className="w-full">
                Book a free demo
              </DemoButton>
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 rounded-btn px-4 py-3 font-semibold text-navy ring-1 ring-slate/35 transition-colors hover:bg-paper"
              >
                <Icon name="phone" size={18} /> {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
