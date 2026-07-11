import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import EnquiryForm from '@/components/EnquiryForm';
import Icon from '@/components/Icon';
import { site } from '@/data/site';
import { localBusinessLd } from '@/data/jsonld';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Visit or reach Gravity Academy in Bengaluru. Call, WhatsApp, email or send an enquiry — we usually respond within one working day.',
  path: '/contact',
});

const whatsappHref = `https://wa.me/${site.whatsapp}`;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[localBusinessLd]} />

      <PageHeader
        eyebrow="Contact"
        title="Talk to us"
        intro="Have a question, or ready to start? Reach out however suits you — phone, WhatsApp, email, or the form below."
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Details + map */}
          <div data-reveal>
            <h2 className="font-display text-display-md text-navy">Visit the centre</h2>
            <dl className="mt-6 space-y-5">
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-navy">
                  <Icon name="map-pin" size={20} />
                </span>
                <div>
                  <dt className="font-display font-semibold text-navy">Address</dt>
                  <dd className="text-slate">
                    {site.address.line1}, {site.address.line2}, {site.address.city}, {site.address.state} {site.address.pin}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-navy">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <dt className="font-display font-semibold text-navy">Phone</dt>
                  <dd>
                    <a href={site.phoneHref} className="text-slate transition-colors hover:text-orange">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-navy">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <dt className="font-display font-semibold text-navy">Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="text-slate transition-colors hover:text-orange">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-navy">
                  <Icon name="clock" size={20} />
                </span>
                <div>
                  <dt className="font-display font-semibold text-navy">Hours</dt>
                  {site.hours.map((h) => (
                    <dd key={h.days} className="text-slate">
                      {h.days}: {h.time}
                    </dd>
                  ))}
                </div>
              </div>
            </dl>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-btn bg-[#25D366] px-5 py-3 font-display font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
            >
              <Icon name="whatsapp" size={20} /> Chat on WhatsApp
            </a>

            <div className="mt-8 overflow-hidden rounded-card border border-mist shadow-soft">
              <iframe
                src={site.mapEmbed}
                title="Gravity Academy location on Google Maps"
                width="100%"
                height={320}
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Enquiry form */}
          <div className="rounded-card border border-mist bg-paper-2 p-6 shadow-soft md:p-8" data-reveal>
            <h2 className="font-display text-display-md text-navy">Send an enquiry</h2>
            <p className="mt-2 text-slate">Fill this in and a counsellor will get back to you, usually within one working day.</p>
            <div className="mt-6">
              <EnquiryForm intent="enquiry" id="lead-form-contact" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
