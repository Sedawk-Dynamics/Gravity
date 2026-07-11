/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { useDemoModal } from './providers/DemoModalProvider';

/**
 * Homepage hero: three approved, client-supplied banner designs
 * (Foundation VI–X · JEE Foundation · NEET Foundation). Each banner already
 * carries its own headline, tagline and artwork, so we only overlay the two
 * CTAs and the slider controls — kept in a bar BELOW the image and on the image
 * EDGES, so buttons and slider controls never overlap.
 * Auto-rotates (pauses on hover/focus); reduced-motion shows the first slide.
 *
 * Note: files live in /hero (NOT /banners) — folder names containing "banner"
 * are blocked by many browser ad-blockers and by some dev servers.
 */
const banners = [
  { jpg: '/hero/foundation.jpg', webp: '/hero/foundation.webp', alt: 'Foundation (VI–X) — where strong foundations create future toppers', href: '/programs/foundation', cta: 'Explore Foundation' },
  { jpg: '/hero/jee.jpg', webp: '/hero/jee.webp', alt: 'JEE Foundation — build a strong foundation for JEE success', href: '/programs/jee-foundation', cta: 'Explore JEE' },
  { jpg: '/hero/neet.jpg', webp: '/hero/neet.webp', alt: 'NEET Foundation — build a strong foundation for medical success', href: '/programs/neet-foundation', cta: 'Explore NEET' },
];

export default function HeroBanners() {
  const { open } = useDemoModal();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (n: number) => setI((n + banners.length) % banners.length);

  // Auto-rotate every 5.5s; re-arms on each change so manual nav also resets the
  // timer (mirrors the Astro restart()). Disabled under reduced motion / pause.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setI((n) => (n + 1) % banners.length), 5500);
    return () => window.clearInterval(timer);
  }, [i, paused]);

  return (
    <section
      id="hero-banners"
      className="bg-navy"
      aria-roledescription="carousel"
      aria-label="Programs"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Full-bleed hero banner: edge-to-edge, no radius, natural 16:9 so the
          COMPLETE banner image is always shown with nothing cropped. */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy">
        {banners.map((b, k) => (
          <picture
            key={b.jpg}
            className="hero-slide absolute inset-0 opacity-0 transition-opacity duration-700 ease-fall data-[active]:z-[1] data-[active]:opacity-100"
            data-active={k === i ? '' : undefined}
            aria-hidden={k === i ? 'false' : 'true'}
          >
            <source srcSet={b.webp} type="image/webp" />
            <img
              src={b.jpg}
              alt={b.alt}
              width={2000}
              height={1125}
              loading={k === 0 ? 'eager' : 'lazy'}
              fetchPriority={k === 0 ? 'high' : undefined}
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        ))}

        {/* Prev / next arrows on the image edges (vertically centred) */}
        <button
          type="button"
          onClick={() => go(i - 1)}
          className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-soft ring-1 ring-navy/10 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/50 sm:grid lg:left-5"
          aria-label="Previous slide"
        >
          <Icon name="chevron-right" size={22} className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(i + 1)}
          className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-soft ring-1 ring-navy/10 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/50 sm:grid lg:right-5"
          aria-label="Next slide"
        >
          <Icon name="chevron-right" size={22} />
        </button>
      </div>

      {/* CTAs + dots on a clean light bar (contrasts with the navy banner). */}
      <div className="border-b border-mist bg-paper">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-5 gap-y-3 py-4">
          <button
            type="button"
            onClick={open}
            className="group inline-flex items-center justify-center gap-2 rounded-btn bg-orange px-6 py-3 font-display font-semibold text-navy shadow-soft transition-all duration-200 ease-fall hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/45"
          >
            Book a free demo
            <Icon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <Link
            href={banners[i].href}
            className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 font-display font-semibold text-navy ring-1 ring-inset ring-navy/25 transition-colors hover:bg-navy hover:text-white"
          >
            {banners[i].cta}
          </Link>
          <div className="flex gap-2 sm:ml-2" role="tablist" aria-label="Choose slide">
            {banners.map((b, k) => (
              <button
                key={b.jpg}
                type="button"
                onClick={() => go(k)}
                className="hero-dot h-2.5 w-2.5 rounded-full bg-slate/40 transition-all duration-300 data-[active]:w-8 data-[active]:bg-orange"
                data-active={k === i ? '' : undefined}
                role="tab"
                aria-label={b.cta}
                aria-selected={k === i ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
