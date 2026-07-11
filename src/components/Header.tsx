'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';
import { programs } from '@/data/programs';
import { cn } from '@/lib/cn';
import Logo from './Logo';
import Button from './Button';
import Icon from './Icon';
import { useDemoModal } from './providers/DemoModalProvider';

interface Props {
  /** Start transparent over a dark hero, solidify on scroll. */
  transparent?: boolean;
}

const nav = [
  { label: 'Courses', href: '/courses', mega: true },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Header({ transparent = false }: Props) {
  const { open } = useDemoModal();
  const pathname = usePathname();
  const current = (pathname || '/').replace(/\/$/, '') || '/';
  const isActive = (href: string) => current === href.replace(/\/$/, '');

  const [isSolid, setIsSolid] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  // Drawer: `rendered` controls the `hidden` mount; `shown` toggles the
  // enter/exit transition classes (300ms out before unmount).
  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // --- Sticky solidify on scroll ---
  useEffect(() => {
    const onScroll = () => setIsSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- Escape closes the mega-menu ---
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [megaOpen]);

  // The header persists across client-side navigations, so reset the mega-menu
  // whenever the route changes (in Astro the full page reload did this for free).
  useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  // Focus the close button once the drawer is mounted-in.
  useEffect(() => {
    if (rendered) closeRef.current?.focus();
  }, [rendered]);

  const openDrawer = () => {
    setRendered(true);
    requestAnimationFrame(() => setShown(true));
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    setShown(false);
    document.body.style.overflow = '';
    window.setTimeout(() => setRendered(false), 300);
    toggleRef.current?.focus();
  };

  return (
    <>
      <header
        id="site-header"
        data-transparent={transparent ? '' : undefined}
        className={cn(
          'sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300',
          isSolid && 'is-solid'
        )}
      >
        <div className="container-x flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="rounded-md" aria-label={`${site.name} — home`}>
            <Logo variant="dark" className="logo-dark h-10 sm:h-11" />
            <Logo variant="light" className="logo-light hidden h-10 sm:h-11" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) =>
              item.mega ? (
                <div
                  key={item.href}
                  ref={megaRef}
                  className={cn('mega relative', megaOpen && 'is-open')}
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => {
                    // Keep it open if a child still holds keyboard focus.
                    if (!megaRef.current?.contains(document.activeElement)) setMegaOpen(false);
                  }}
                  onFocus={() => setMegaOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(false);
                  }}
                >
                  <button
                    type="button"
                    className="nav-link mega-trigger inline-flex items-center gap-1 rounded-md px-3 py-2 text-[0.95rem] font-medium"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    aria-controls="mega-programs"
                    onClick={() => setMegaOpen(true)}
                  >
                    {item.label}
                    <Icon name="chevron-down" size={16} className="mega-caret transition-transform duration-200" />
                  </button>

                  <div
                    id="mega-programs"
                    className="mega-panel invisible absolute left-1/2 top-full z-10 w-[min(92vw,760px)] -translate-x-1/2 translate-y-2 pt-2 opacity-0 transition-all duration-200"
                  >
                    <div className="rounded-card border border-mist bg-paper p-3 shadow-lift">
                      <div className="grid gap-1 sm:grid-cols-2">
                        {programs.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/programs/${p.slug}`}
                            onClick={() => setMegaOpen(false)}
                            className="group flex items-start gap-3 rounded-btn p-3 transition-colors hover:bg-paper-2"
                          >
                            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-btn bg-mist text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                              <Icon name={p.icon} size={18} />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-display text-[0.95rem] font-semibold text-navy">{p.name}</span>
                              <span className="block text-sm text-slate">{p.tagline}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-1 grid grid-cols-2 gap-2">
                        <Link
                          href="/courses"
                          onClick={() => setMegaOpen(false)}
                          className="flex items-center justify-between rounded-btn bg-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                        >
                          Browse all courses
                          <Icon name="arrow-right" size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setMegaOpen(false);
                            open();
                          }}
                          className="flex items-center justify-between rounded-btn bg-orange px-4 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                        >
                          Book a free demo
                          <Icon name="arrow-right" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link rounded-md px-3 py-2 text-[0.95rem] font-medium"
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={site.phoneHref} className="nav-link inline-flex items-center gap-2 rounded-md px-2 py-2 text-[0.92rem] font-semibold">
              <Icon name="phone" size={16} />
              <span>{site.phone}</span>
            </a>
            <Button variant="primary" size="md" onClick={open}>
              Book a free demo
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="nav-link grid h-11 w-11 place-items-center rounded-btn lg:hidden"
            aria-expanded={rendered}
            aria-controls="mobile-drawer"
            aria-label="Open menu"
            onClick={openDrawer}
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={cn('fixed inset-0 z-[60] lg:hidden', !rendered && 'hidden')}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onKeyDown={(e) => {
          if (e.key === 'Escape') closeDrawer();
        }}
      >
        <div
          className={cn('drawer-backdrop absolute inset-0 bg-ink/55 transition-opacity duration-300', !shown && 'opacity-0')}
          onClick={closeDrawer}
        />
        <div
          className={cn(
            'drawer-panel absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col bg-paper shadow-lift transition-transform duration-300',
            !shown && 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between border-b border-mist px-5 py-4">
            <Logo variant="dark" className="h-10" />
            <button
              ref={closeRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-btn text-navy hover:bg-paper-2"
              aria-label="Close menu"
              onClick={closeDrawer}
            >
              <Icon name="x" size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
            <Link href="/courses" onClick={closeDrawer} className="block rounded-btn px-4 py-3 text-base font-semibold text-navy hover:bg-paper-2">
              Courses
            </Link>
            <div className="mb-2 grid grid-cols-1 gap-0.5 pl-2">
              {programs.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  onClick={closeDrawer}
                  className="flex items-center gap-3 rounded-btn px-4 py-2.5 text-sm text-slate hover:bg-paper-2 hover:text-navy"
                >
                  <Icon name={p.icon} size={16} />
                  {p.name}
                </Link>
              ))}
            </div>
            {['About', 'Gallery', 'FAQ', 'Contact'].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                onClick={closeDrawer}
                className="block rounded-btn px-4 py-3 text-base font-semibold text-navy hover:bg-paper-2"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3 border-t border-mist px-5 py-4">
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-btn px-4 py-3 font-semibold text-navy ring-1 ring-slate/35"
            >
              <Icon name="phone" size={18} /> {site.phone}
            </a>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                closeDrawer();
                open();
              }}
            >
              Book a free demo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
