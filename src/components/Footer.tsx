import Link from 'next/link';
import { site } from '@/data/site';
import { programs } from '@/data/programs';
import Logo from './Logo';
import Icon from './Icon';

const year = 2026;

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Results', href: '/#results' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { name: 'instagram', href: site.social.instagram, label: 'Instagram' },
  { name: 'x-twitter', href: site.social.x, label: 'X' },
  { name: 'facebook', href: site.social.facebook, label: 'Facebook' },
  { name: 'linkedin', href: site.social.linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="light" className="h-12" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            Concept-first coaching for Classes 6–12 in Bengaluru. Disciplined, mentorship-driven, built to last.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-btn bg-white/10 text-white transition-colors hover:bg-orange hover:text-navy"
              >
                <Icon name={s.name} size={18} />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate">{site.social.handles.join(' · ')}</p>
        </div>

        <nav aria-label="Courses">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Courses</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={`/programs/${p.slug}`} className="text-mist transition-colors hover:text-orange">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Quick links">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-mist transition-colors hover:text-orange">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-mist">
            <p className="flex gap-2.5">
              <Icon name="map-pin" size={18} className="mt-0.5 shrink-0 text-orange" />
              <span>
                {site.address.line1}, {site.address.line2}, {site.address.city}, {site.address.state} {site.address.pin}
              </span>
            </p>
            <p>
              <a href={site.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-orange">
                <Icon name="phone" size={18} className="text-orange" /> {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 transition-colors hover:text-orange">
                <Icon name="mail" size={18} className="text-orange" /> {site.email}
              </a>
            </p>
            {site.hours.map((h) => (
              <p key={h.days} className="flex items-center gap-2.5">
                <Icon name="clock" size={18} className="shrink-0 text-orange" />
                <span>
                  {h.days}: {h.time}
                </span>
              </p>
            ))}
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Aligned with CBSE · ICSE · State Board</p>
        </div>
      </div>
    </footer>
  );
}
